const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: ['Academic', 'Administrative', 'Event', 'Exam', 'Scholarship', 'Other'],
      default: 'Academic',
    },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    file: {
      filename: String,
      originalName: String,
      url: String,
      key: String,
      size: Number,
      mimetype: String,
    },
    targetBranch: { type: String, default: 'all' },
    targetYear: { type: Number, enum: [0, 1, 2, 3, 4], default: 0 }, // 0 = all years
    targetSection: { type: String, default: 'all' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

circularSchema.index({ targetBranch: 1, targetYear: 1, createdAt: -1 });
circularSchema.index({ category: 1 });

module.exports = mongoose.model('Circular', circularSchema);
