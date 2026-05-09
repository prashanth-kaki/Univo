const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Technology', 'Business', 'Science', 'Achievement', 'World', 'Campus', 'Other'],
      default: 'Technology',
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: {
      filename: String,
      url: String,
      key: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    readTime: { type: String, default: '3 min' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

forumSchema.index({ createdAt: -1 });
forumSchema.index({ category: 1 });

module.exports = mongoose.model('Forum', forumSchema);
