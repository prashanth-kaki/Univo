const mongoose = require('mongoose');

const aiChatLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    sessionId: { type: String, required: true },
  },
  { timestamps: true }
);

aiChatLogSchema.index({ user: 1, createdAt: -1 });
aiChatLogSchema.index({ sessionId: 1 });

module.exports = mongoose.model('AIChatLog', aiChatLogSchema);
