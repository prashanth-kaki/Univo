const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['notes', 'assignment', 'record', 'mid_questions', 'internal_questions', 'external_questions', 'other'],
      required: true,
    },
    file: {
      filename: String,
      originalName: String,
      url: String,
      key: String,
      size: Number,
      mimetype: String,
    },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

resourceSchema.index({ subject: 1, type: 1 });
resourceSchema.index({ uploadedBy: 1 });

module.exports = mongoose.model('Resource', resourceSchema);
