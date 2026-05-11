// controllers/subjectController.js
const Subject = require('../models/Subject');

exports.createSubject = async (req, res) => {
    res.status(201).json({ success: true, message: "Subject created successfully" });
};

exports.getSubjects = async (req, res) => {
    try {
        const filter = {};
        
        // If user is faculty, only return their assigned subjects
        if (req.user.role === 'faculty') {
            filter.faculty = req.user._id;
        } else if (req.user.role === 'student') {
            // Students only see subjects for their branch, year, and section
            filter.branch = req.user.branch;
            filter.year = req.user.year;
            // Depending on how sections are assigned, might need to filter by section too
        } else {
            // HODs, Coordinators, Admins typically see subjects for their branch
            filter.branch = req.user.branch;
        }
        
        const subjects = await Subject.find(filter)
            .populate('faculty', 'name email profileImage')
            .sort({ year: 1, semester: 1, name: 1 });
            
        res.status(200).json({
            success: true,
            data: subjects,
        });
    } catch (error) {
        console.error("GET SUBJECTS ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getSubjectById = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: {},
    });
};

exports.updateSubject = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Subject updated successfully",
    });
};

exports.deleteSubject = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Subject deleted successfully",
    });
};