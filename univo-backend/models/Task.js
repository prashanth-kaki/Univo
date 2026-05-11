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
      mimetype: String
    },
    submittedAt: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected', 'resubmit'], 
      default: 'pending' 
    },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    note: { type: String }, // General note
    reviewNote: { type: String }, // Faculty feedback for reject/resubmit
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    subjectName: { type: String }, // To hold text if ObjectId is bypassed or just for display
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // New fields
    requiresProof: { type: Boolean, default: false },
    attachment: {
      filename: String,
      originalName: String,
      url: String,
      key: String,
      size: Number,
      mimetype: String
    },
    targetType: { 
      type: String, 
      enum: ['section', 'year', 'rollNumbers', 'all'], 
      default: 'year' 
    },
    targetRollNumbers: [{ type: String, uppercase: true }], // Used if targetType === 'rollNumbers'
    
    // Existing targets
    branch: { type: String, required: true },
    targetYear: { type: Number, enum: [1, 2, 3, 4] }, // Optional now if target is roll numbers
    targetSection: { type: String, default: 'all' },
    targetStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Keep for backward compatibility or specific targeting

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
