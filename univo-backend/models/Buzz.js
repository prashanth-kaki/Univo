const mongoose = require('mongoose');

const buzzSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Event', 'Opportunity', 'Sports', 'Workshop', 'Job', 'Camp', 'Other'],
      default: 'Event',
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: {
      filename: String,
      url: String,
      key: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

buzzSchema.index({ createdAt: -1 });
buzzSchema.index({ category: 1 });

module.exports = mongoose.model('Buzz', buzzSchema);
