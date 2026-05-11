const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, uppercase: true },
    branch: { type: String, required: true },
    year: { type: Number, enum: [1, 2, 3, 4], required: true },
    semester: { type: Number, min: 1, max: 8, required: true },
    section: { type: String, default: 'all' },
    credits: { type: Number, default: 3 },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

subjectSchema.index({ branch: 1, year: 1, semester: 1 });
subjectSchema.index({ faculty: 1 });
subjectSchema.index({ code: 1, branch: 1 }, { unique: true });

module.exports = mongoose.model('Subject', subjectSchema);
