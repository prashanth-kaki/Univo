const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { sendSuccess, sendError } = require('../utils/response');
const { createNotification } = require('../services/notificationService');
const Message = require('../models/Message');
const mongoose = require('mongoose');

// @GET /api/chat/conversations - list of unique conversations
router.get('/conversations', protect, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $lt: ['$sender', '$receiver'] },
              { a: '$sender', b: '$receiver' },
              { a: '$receiver', b: '$sender' },
            ],
          },
          lastMessage: { $first: '$$ROOT' },
          unread: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ['$receiver', userId] }, { $eq: ['$isRead', false] }] },
                1, 0,
              ],
            },
          },
        },
      },
      { $sort: { 'lastMessage.createdAt': -1 } },
      { $limit: 30 },
    ]);

    // Populate partner info
    const populatedConvos = await Promise.all(
      conversations.map(async (conv) => {
        const partnerId =
          conv.lastMessage.sender.toString() === userId.toString()
            ? conv.lastMessage.receiver
            : conv.lastMessage.sender;

        const partner = await mongoose.model('User').findById(partnerId).select('name role avatar branch');
        return { partner, lastMessage: conv.lastMessage, unread: conv.unread };
      })
    );

    sendSuccess(res, { conversations: populatedConvos });
  } catch (err) { next(err); }
});

// @GET /api/chat/messages/:userId - messages between me and :userId
router.get('/messages/:userId', protect, async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('sender', 'name role avatar')
      .populate('receiver', 'name role avatar');

    // Mark as read
    await Message.updateMany(
      { sender: req.params.userId, receiver: req.user._id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    sendSuccess(res, { messages: messages.reverse() });
  } catch (err) { next(err); }
});

// @POST /api/chat/send
router.post(
  '/send',
  protect,
  [
    body('receiverId').notEmpty().withMessage('Receiver required'),
    body('content').trim().notEmpty().withMessage('Message content required'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { receiverId, content, subjectId } = req.body;

      const message = await Message.create({
        sender: req.user._id,
        receiver: receiverId,
        content,
        subject: subjectId || undefined,
      });

      await message.populate(['sender', 'receiver']);

      // Notify recipient
      await createNotification({
        recipients: [receiverId],
        type: 'new_message',
        title: `New message from ${req.user.name}`,
        body: content.substring(0, 80),
        refModel: 'Message',
        refId: message._id,
      });

      // Emit via socket to receiver's room
      if (req.app.get('io')) {
        req.app.get('io').to(`user:${receiverId}`).emit('newMessage', message);
      }

      sendSuccess(res, { message }, 'Sent', 201);
    } catch (err) { next(err); }
  }
);

// @PUT /api/chat/read/:userId - mark all messages from user as read
router.put('/read/:userId', protect, async (req, res, next) => {
  try {
    await Message.updateMany(
      { sender: req.params.userId, receiver: req.user._id, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    sendSuccess(res, {}, 'Messages marked as read');
  } catch (err) { next(err); }
});

module.exports = router;
