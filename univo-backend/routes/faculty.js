const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const { protect, authorize } = require('../middleware/auth');

// Apply protection and restrict to 'faculty' and higher roles
router.use(protect);
router.use(authorize('faculty', 'hod', 'admin', 'superadmin'));

// Fetch all assigned subjects for the logged-in faculty
router.get('/subjects', facultyController.getAssignedSubjects);

// Fetch all students belonging to the faculty's assigned subjects
router.get('/students', facultyController.getAssignedStudents);

// Fetch dashboard statistics (student counts, assignment counts, etc.)
router.get('/dashboard-stats', facultyController.getDashboardStats);

// Fetch upcoming classes (schedule)
router.get('/upcoming-classes', facultyController.getUpcomingClasses);

module.exports = router;
