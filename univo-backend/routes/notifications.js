const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { sendSuccess } = require('../utils/response');
const Notification = require('../models/Notification');

// @GET /api/notifications
router.get('/', protect, async (req, res, next) => {
  try {
    const { page = 1, limit = 30, unread } = req.query;
    const skip = (page - 1) * limit;

    const query = { recipient: req.user._id };
    if (unread === 'true') query.isRead = false;

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Notification.countDocuments(query),
      Notification.countDocuments({ recipient: req.user._id, isRead: false }),
    ]);

    sendSuccess(res, { notifications, total, unreadCount });
  } catch (err) { next(err); }
});

// @PUT /api/notifications/:id/read
router.put('/:id/read', protect, async (req, res, next) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true, readAt: new Date() }
    );
    sendSuccess(res, {}, 'Marked as read');
  } catch (err) { next(err); }
});

// @PUT /api/notifications/read-all
router.put('/read-all/mark', protect, async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    sendSuccess(res, {}, 'All marked as read');
  } catch (err) { next(err); }
});

// @DELETE /api/notifications/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Notification.findOneAndDelete({ _id: req.params.id, recipient: req.user._id });
    sendSuccess(res, {}, 'Notification deleted');
  } catch (err) { next(err); }
});

module.exports = router;
