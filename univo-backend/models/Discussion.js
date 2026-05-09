const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema(
  {
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true },
    parentPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', default: null },
    isReply: { type: Boolean, default: false },
    isResolved: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

discussionSchema.index({ subject: 1, createdAt: -1 });
discussionSchema.index({ parentPost: 1 });
discussionSchema.index({ author: 1 });

module.exports = mongoose.model('Discussion', discussionSchema);
