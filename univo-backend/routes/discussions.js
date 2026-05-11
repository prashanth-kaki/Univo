const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { sendSuccess, sendError } = require('../utils/response');
const { createNotification } = require('../services/notificationService');
const Discussion = require('../models/Discussion');
const Subject = require('../models/Subject');

// @GET /api/discussions?subjectId=
router.get('/', protect, async (req, res, next) => {
  try {
    const { subjectId, page = 1, limit = 30 } = req.query;
    if (!subjectId) return sendError(res, 'subjectId required');

    const skip = (page - 1) * limit;

    // Get top-level posts
    const [posts, total] = await Promise.all([
      Discussion.find({ subject: subjectId, isReply: false })
        .populate('author', 'name role avatar rollNumber')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Discussion.countDocuments({ subject: subjectId, isReply: false }),
    ]);

    // Attach replies
    const postIds = posts.map((p) => p._id);
    const replies = await Discussion.find({ parentPost: { $in: postIds }, isReply: true })
      .populate('author', 'name role avatar rollNumber')
      .sort({ createdAt: 1 });

    const replyMap = {};
    replies.forEach((r) => {
      const key = r.parentPost.toString();
      if (!replyMap[key]) replyMap[key] = [];
      replyMap[key].push(r);
    });

    const enriched = posts.map((p) => ({
      ...p.toObject(),
      replies: replyMap[p._id.toString()] || [],
    }));

    sendSuccess(res, { posts: enriched, total });
  } catch (err) { next(err); }
});

// @POST /api/discussions - create post or reply
router.post(
  '/',
  protect,
  [
    body('content').trim().notEmpty().withMessage('Content required'),
    body('subjectId').notEmpty().withMessage('Subject required'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { content, subjectId, parentPostId } = req.body;

      const subject = await Subject.findById(subjectId).populate('faculty', '_id');
      if (!subject) return sendError(res, 'Subject not found', 404);

      const isReply = !!parentPostId;
      const post = await Discussion.create({
        subject: subjectId,
        author: req.user._id,
        content,
        parentPost: parentPostId || null,
        isReply,
      });

      await post.populate('author', 'name role avatar rollNumber');

      // If student posted, notify faculty
      if (req.user.role === 'student' && !isReply && subject.faculty) {
        await createNotification({
          recipients: [subject.faculty._id],
          type: 'new_discussion',
          title: `New question in ${subject.name}`,
          body: content.substring(0, 100),
          refModel: 'Discussion',
          refId: post._id,
        });
      }

      // If faculty replied, notify original poster
      if (isReply && parentPostId) {
        const parent = await Discussion.findById(parentPostId);
        if (parent && parent.author.toString() !== req.user._id.toString()) {
          await createNotification({
            recipients: [parent.author],
            type: 'discussion_reply',
            title: `${req.user.name} replied to your question`,
            body: content.substring(0, 100),
            refModel: 'Discussion',
            refId: post._id,
          });
        }
      }

      // Emit to subject room
      if (req.app.get('io')) {
        req.app.get('io').to(`subject:${subjectId}`).emit('newDiscussion', post);
      }

      sendSuccess(res, { post }, 'Posted', 201);
    } catch (err) { next(err); }
  }
);

// @POST /api/discussions/:id/like
router.post('/:id/like', protect, async (req, res, next) => {
  try {
    const post = await Discussion.findById(req.params.id);
    if (!post) return sendError(res, 'Not found', 404);

    const idx = post.likes.indexOf(req.user._id);
    if (idx > -1) post.likes.splice(idx, 1);
    else post.likes.push(req.user._id);

    await post.save();
    sendSuccess(res, { likes: post.likes.length });
  } catch (err) { next(err); }
});

// @PUT /api/discussions/:id/resolve
router.put('/:id/resolve', protect, async (req, res, next) => {
  try {
    const post = await Discussion.findByIdAndUpdate(req.params.id, { isResolved: true }, { new: true });
    if (!post) return sendError(res, 'Not found', 404);
    sendSuccess(res, { post }, 'Marked as resolved');
  } catch (err) { next(err); }
});

// @DELETE /api/discussions/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await Discussion.findById(req.params.id);
    if (!post) return sendError(res, 'Not found', 404);
    if (post.author.toString() !== req.user._id.toString() && !['admin', 'hod'].includes(req.user.role)) {
      return sendError(res, 'Not authorized', 403);
    }
    await post.deleteOne();
    sendSuccess(res, {}, 'Deleted');
  } catch (err) { next(err); }
});

module.exports = router;
