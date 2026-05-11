// models/HodSettings.js
const mongoose = require('mongoose');

const hodSettingsSchema = new mongoose.Schema({
  branch: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true,
    enum: ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AIML', 'DS']
  },
  announcementSettings: {
    allowFacultyAnnouncements: { type: Boolean, default: true },
    requireHodApproval: { type: Boolean, default: false }
  },
  moderationSettings: {
    autoFlagKeywords: [{ type: String }],
    strictMode: { type: Boolean, default: false }
  },
  notificationPreferences: {
    emailAlerts: { type: Boolean, default: true },
    dailyDigest: { type: Boolean, default: true },
    reportAlerts: { type: Boolean, default: true }
  },
  branding: {
    logoUrl: { type: String, default: '' },
    themeColor: { type: String, default: '#4f46e5' }
  }
}, { timestamps: true });

module.exports = mongoose.model('HodSettings', hodSettingsSchema);
