const Subject = require('../models/Subject');
const User = require('../models/User');
const Task = require('../models/Task');

// Get all subjects assigned to the logged-in faculty
exports.getAssignedSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({ faculty: req.user._id, isActive: true });
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error fetching subjects' });
    }
};

// Get all students enrolled in the faculty's assigned subjects
exports.getAssignedStudents = async (req, res) => {
    try {
        // 1. Get faculty's subjects
        const subjects = await Subject.find({ faculty: req.user._id, isActive: true });
        
        if (!subjects || subjects.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // 2. Build OR query for students matching branch, year, semester, section
        const orConditions = subjects.map(sub => {
            const cond = {
                role: 'student',
                branch: sub.branch,
                year: sub.year,
                semester: sub.semester
            };
            if (sub.section !== 'all') {
                cond.section = sub.section;
            }
            return cond;
        });

        const students = await User.find({ $or: orConditions })
            .select('-password -otp -refreshToken')
            .sort({ rollNumber: 1 });

        res.status(200).json({ success: true, data: students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error fetching students' });
    }
};

// Get Dashboard Stats for Faculty
exports.getDashboardStats = async (req, res) => {
    try {
        const facultyId = req.user._id;

        // Count assigned subjects
        const subjects = await Subject.find({ faculty: facultyId, isActive: true });
        const assignedSubjectsCount = subjects.length;

        // Count students
        let totalStudents = 0;
        if (subjects.length > 0) {
            const orConditions = subjects.map(sub => {
                const cond = { role: 'student', branch: sub.branch, year: sub.year, semester: sub.semester };
                if (sub.section !== 'all') cond.section = sub.section;
                return cond;
            });
            totalStudents = await User.countDocuments({ $or: orConditions });
        }

        // Count pending active tasks (assignments) created by this faculty
        const pendingAssignments = await Task.countDocuments({ createdBy: facultyId }); // We could refine this to active ones

        res.status(200).json({
            success: true,
            data: {
                assignedSubjects: assignedSubjectsCount,
                totalStudents: totalStudents,
                pendingAssignments: pendingAssignments,
                resourcesUploaded: 0, // Implement real resource count if Resource schema exists
                attendancePercent: 0, // Placeholder until attendance is implemented
                unreadDiscussions: 0  // Placeholder until discussions are implemented
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error fetching dashboard stats' });
    }
};

// Get Upcoming Classes (Using subjects as a proxy for now until Schedule schema exists)
exports.getUpcomingClasses = async (req, res) => {
    try {
        const subjects = await Subject.find({ faculty: req.user._id, isActive: true });
        
        // Mock schedule generation based on real subjects
        const classes = subjects.map((sub, index) => ({
            id: sub._id,
            subject: sub.name,
            time: `10:00 AM`, // Placeholder
            room: `Room ${101 + index}`, // Placeholder
            section: `${sub.branch}-${sub.section}`
        }));

        res.status(200).json({ success: true, data: classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error fetching classes' });
    }
};
