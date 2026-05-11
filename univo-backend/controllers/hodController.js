// controllers/hodController.js
const User = require('../models/User');
const Subject = require('../models/Subject');
const Resource = require('../models/Resource');
const Announcement = require('../models/Announcement');
const Report = require('../models/Report');
const ActivityLog = require('../models/ActivityLog');
const HodSettings = require('../models/HodSettings');
const { sendAccountCreatedEmail } = require('../services/emailService');

// Helper for logging HOD actions
const logHodAction = async (user, type, message, severity = 'low', metadata = {}) => {
  try {
    await ActivityLog.create({
      user: user.name,
      type,
      message,
      severity,
      metadata: { ...metadata, branch: user.branch, role: 'hod' },
      ipAddress: ''
    });
  } catch (error) {
    console.error('Failed to log HOD activity:', error);
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const branch = req.user.branch;
    const [totalStudents, totalFaculty, totalSubjects, resourcesUploaded, activeAnnouncements, flaggedPosts] = await Promise.all([
      User.countDocuments({ role: 'student', branch }),
      User.countDocuments({ role: 'faculty', branch }),
      Subject.countDocuments({ branch }),
      Resource.countDocuments({ branch }),
      Announcement.countDocuments({ branch, isActive: true, expiresAt: { $gt: Date.now() } }),
      Report.countDocuments({ status: 'pending' }) // Assume reports are global or we need to filter if possible
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalStudents, totalFaculty, totalSubjects, resourcesUploaded,
        activeAnnouncements, pendingTasks: flaggedPosts, flaggedPosts,
        attendancePercent: 92
      }
    });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getDashboardActivity = async (req, res) => {
  try {
    const branch = req.user.branch;
    const activities = await ActivityLog.find({ 'metadata.branch': branch }).sort({ createdAt: -1 }).limit(10);
    const formatted = activities.map(act => ({
      id: act._id, user: act.user, action: act.message, time: act.createdAt, type: act.type
    }));
    res.status(200).json({ success: true, data: formatted });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// ================= FACULTY ================= //
exports.getFacultyList = async (req, res) => {
  try {
    const branch = req.user.branch;
    const faculty = await User.find({ role: 'faculty', branch }).select('-password');
    const facultyWithDetails = await Promise.all(faculty.map(async (fac) => {
      const subjectsCount = await Subject.countDocuments({ faculty: fac._id });
      const resourcesCount = await Resource.countDocuments({ uploadedBy: fac._id });
      return {
        id: fac._id, name: fac.name, role: fac.designation || 'Faculty', email: fac.email,
        subjects: subjectsCount, uploads: resourcesCount, status: fac.isActive ? 'Active' : 'Disabled', profileImage: fac.profileImage
      };
    }));
    res.status(200).json({ success: true, data: facultyWithDetails });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.createFaculty = async (req, res) => {
  try {
    const branch = req.user.branch;
    const { name, email, password, designation } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

    const newFaculty = await User.create({
      name, email, password, role: 'faculty', branch, designation, isVerified: true, isActive: true
    });

    try {
      await sendAccountCreatedEmail({
        name,
        email,
        password, // Using plain password from request to send in email
        role: 'Faculty',
        branch
      });
    } catch (emailError) {
      console.error('Failed to send account creation email:', emailError);
      // We don't block the response, the account is already created
    }

    await logHodAction(req.user, 'user_management', `Added new faculty: ${name}`);
    res.status(201).json({ success: true, data: newFaculty });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, isActive } = req.body;
    const faculty = await User.findOneAndUpdate(
      { _id: id, role: 'faculty', branch: req.user.branch },
      { name, designation, isActive },
      { new: true }
    );
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    
    await logHodAction(req.user, 'user_management', `Updated faculty: ${faculty.name}`);
    res.status(200).json({ success: true, data: faculty });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await User.findOneAndDelete({ _id: id, role: 'faculty', branch: req.user.branch });
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    await logHodAction(req.user, 'user_management', `Deleted faculty: ${faculty.name}`);
    res.status(200).json({ success: true, message: 'Faculty deleted successfully' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// ================= STUDENTS ================= //
exports.getStudentList = async (req, res) => {
  try {
    const branch = req.user.branch;
    const { year, section } = req.query;
    const query = { role: 'student', branch };
    if (year) query.year = year;
    if (section) query.section = section;

    const students = await User.find(query).select('name email rollNumber year section isActive profileImage createdAt').sort({ year: 1, section: 1, rollNumber: 1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// ================= SUBJECTS ================= //
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ branch: req.user.branch }).populate('faculty', 'name email');
    res.status(200).json({ success: true, data: subjects });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.createSubject = async (req, res) => {
  try {
    const { name, code, credits, year, semester, facultyId } = req.body;
    
    // Check if subject code already exists in the same branch
    const existingSubject = await Subject.findOne({ code, branch: req.user.branch });
    if (existingSubject) {
      return res.status(400).json({ success: false, message: 'Subject code already exists in this branch' });
    }

    const subject = await Subject.create({
      name, code, credits, year, semester, branch: req.user.branch, faculty: facultyId || null
    });
    if (facultyId) {
       await User.findByIdAndUpdate(facultyId, { $addToSet: { subjects: subject._id } });
    }
    await logHodAction(req.user, 'subject_management', `Added subject: ${name}`);
    res.status(201).json({ success: true, data: subject });
  } catch (error) { 
    // Fallback for MongoDB duplicate key error E11000
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Subject code already exists in this branch' });
    }
    res.status(500).json({ success: false, message: error.message }); 
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Check if updating to a code that already exists in the branch
    if (updates.code) {
      const existingSubject = await Subject.findOne({ 
        code: updates.code, 
        branch: req.user.branch,
        _id: { $ne: id } 
      });
      if (existingSubject) {
        return res.status(400).json({ success: false, message: 'Subject code already exists in this branch' });
      }
    }

    const subject = await Subject.findOneAndUpdate({ _id: id, branch: req.user.branch }, updates, { new: true }).populate('faculty', 'name');
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    
    if (updates.faculty) {
      await User.findByIdAndUpdate(updates.faculty, { $addToSet: { subjects: subject._id } });
    }
    await logHodAction(req.user, 'subject_management', `Updated subject: ${subject.name}`);
    res.status(200).json({ success: true, data: subject });
  } catch (error) { 
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Subject code already exists in this branch' });
    }
    res.status(500).json({ success: false, message: error.message }); 
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findOneAndDelete({ _id: id, branch: req.user.branch });
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    await logHodAction(req.user, 'subject_management', `Deleted subject: ${subject.name}`);
    res.status(200).json({ success: true, message: 'Subject deleted successfully' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// ================= RESOURCES ================= //
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ branch: req.user.branch }).populate('uploadedBy', 'name role').populate('subject', 'name code').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: resources });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.updateResourceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const resource = await Resource.findOneAndUpdate({ _id: id, branch: req.user.branch }, { status }, { new: true });
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    await logHodAction(req.user, 'content_moderation', `Updated resource ${resource.title} status to ${status}`);
    res.status(200).json({ success: true, data: resource });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({ _id: req.params.id, branch: req.user.branch });
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    await logHodAction(req.user, 'content_moderation', `Deleted resource ${resource.title}`, 'medium');
    res.status(200).json({ success: true, message: 'Resource deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// ================= ANNOUNCEMENTS ================= //
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ branch: req.user.branch }).populate('sender', 'name role profileImage').sort({ isPinned: -1, createdAt: -1 });
    res.status(200).json({ success: true, data: announcements });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, targetAudience, targetYear, targetSection, isPinned, expiresAt } = req.body;
    const announcement = await Announcement.create({
      title, 
      message: content, 
      sender: req.user._id, 
      senderRole: 'hod', 
      branch: req.user.branch, 
      year: targetYear || 1, // Default year required by schema
      section: targetSection, 
      isPinned, 
      expiresAt
    });
    await logHodAction(req.user, 'announcement', `Created announcement: ${title}`);
    res.status(201).json({ success: true, data: announcement });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const ann = await Announcement.findOneAndDelete({ _id: req.params.id, branch: req.user.branch });
    if (!ann) return res.status(404).json({ success: false, message: 'Announcement not found' });
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// ================= OTHER ================= //
exports.getModerationQueue = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: [] });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.resolveReport = async (req, res) => {
  try { res.status(200).json({ success: true, message: 'Report resolved' }); } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getAnalytics = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        attendanceTrends: [{ name: 'Week 1', 'Year 1': 95, 'Year 2': 92, 'Year 3': 88, 'Year 4': 85 }],
        facultyUploads: []
      }
    });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ 'metadata.branch': req.user.branch }).sort({ createdAt: -1 }).limit(50);
    res.status(200).json({ success: true, data: logs });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.getSettings = async (req, res) => {
  try {
    let settings = await HodSettings.findOne({ branch: req.user.branch });
    if (!settings) settings = await HodSettings.create({ branch: req.user.branch });
    res.status(200).json({ success: true, data: settings });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await HodSettings.findOne({ branch: req.user.branch });
    if (!settings) settings = new HodSettings({ branch: req.user.branch });
    Object.assign(settings, req.body);
    await settings.save();
    await logHodAction(req.user, 'system_settings', 'Updated department settings');
    res.status(200).json({ success: true, data: settings });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
