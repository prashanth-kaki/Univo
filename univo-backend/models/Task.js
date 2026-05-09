const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    proof: {
      filename: String,
      originalName: String,
      url: String,
      key: String,
      size: Number,
    },
    submittedAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    note: { type: String },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    branch: { type: String, required: true },
    targetYear: { type: Number, enum: [1, 2, 3, 4], required: true },
    targetSection: { type: String, default: 'all' },
    targetStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // specific students
    deadline: { type: Date, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    submissions: [submissionSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

taskSchema.index({ branch: 1, targetYear: 1 });
taskSchema.index({ assignedBy: 1 });
taskSchema.index({ deadline: 1 });

module.exports = mongoose.model('Task', taskSchema);
