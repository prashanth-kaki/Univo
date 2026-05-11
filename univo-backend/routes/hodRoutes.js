// routes/hodRoutes.js
const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const hodController = require('../controllers/hodController');

// All HOD routes require authentication and HOD role
router.use(protect);
router.use(authorizeRoles('hod'));

// Dashboard
router.get('/dashboard-stats', hodController.getDashboardStats);
router.get('/dashboard-activity', hodController.getDashboardActivity);

// Faculty
router.get('/faculty', hodController.getFacultyList);
router.post('/faculty', hodController.createFaculty);
router.put('/faculty/:id', hodController.updateFaculty);
router.delete('/faculty/:id', hodController.deleteFaculty);

// Students
router.get('/students', hodController.getStudentList);

// Subjects
router.get('/subjects', hodController.getSubjects);
router.post('/subjects', hodController.createSubject);
router.put('/subjects/:id', hodController.updateSubject);
router.delete('/subjects/:id', hodController.deleteSubject);

// Resources
router.get('/resources', hodController.getResources);
router.patch('/resources/:id/status', hodController.updateResourceStatus);
router.delete('/resources/:id', hodController.deleteResource);

// Announcements
router.get('/announcements', hodController.getAnnouncements);
router.post('/announcements', hodController.createAnnouncement);
router.delete('/announcements/:id', hodController.deleteAnnouncement);

// Moderation
router.get('/moderation', hodController.getModerationQueue);
router.patch('/moderation/:id', hodController.resolveReport);

// Analytics
router.get('/analytics', hodController.getAnalytics);

// Activity Logs
router.get('/activity', hodController.getActivityLogs);

// Settings
router.get('/settings', hodController.getSettings);
router.put('/settings', hodController.updateSettings);

module.exports = router;
