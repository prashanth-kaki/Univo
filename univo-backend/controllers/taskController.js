const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
    try {
        const { title, description, deadline, requiresProof, targetType, targetYear, targetSection, targetRollNumbers, branch } = req.body;

        const taskData = {
            title,
            description,
            deadline,
            requiresProof: requiresProof === 'true' || requiresProof === true,
            targetType,
            branch: branch || req.user.branch,
            assignedBy: req.user._id,
            isActive: true
        };

        if (targetType === 'year') {
            taskData.targetYear = targetYear;
        } else if (targetType === 'section') {
            taskData.targetYear = targetYear;
            taskData.targetSection = targetSection;
        } else if (targetType === 'rollNumbers') {
            taskData.targetRollNumbers = typeof targetRollNumbers === 'string' ? targetRollNumbers.split(',').map(r => r.trim()) : targetRollNumbers;
        }

        if (req.file) {
            taskData.attachment = {
                filename: req.file.key,
                originalName: req.file.originalname,
                url: req.file.location,
                key: req.file.key,
                size: req.file.size,
                mimetype: req.file.mimetype
            };
        }

        const task = await Task.create(taskData);
        res.status(201).json({ success: true, message: "Task created successfully", data: task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        let query = {};
        
        if (req.user.role === 'student') {
            query = {
                branch: req.user.branch,
                $or: [
                    { targetType: 'all' },
                    { targetType: 'year', targetYear: req.user.year },
                    { targetType: 'section', targetYear: req.user.year, targetSection: req.user.section },
                    { targetType: 'rollNumbers', targetRollNumbers: req.user.rollNumber }
                ],
                isActive: true
            };
        } else if (req.user.role === 'faculty') {
            query = { assignedBy: req.user._id };
        }

        const tasks = await Task.find(query).populate('assignedBy', 'name email').sort({ createdAt: -1 });
        
        // For students, filter submissions to only show their own
        if (req.user.role === 'student') {
             const tasksWithMySubmissions = tasks.map(task => {
                 const t = task.toObject();
                 t.mySubmission = t.submissions.find(s => s.student.toString() === req.user._id.toString());
                 delete t.submissions; // Students shouldn't see others' submissions
                 return t;
             });
             return res.status(200).json({ success: true, data: tasksWithMySubmissions });
        }

        // For faculty, populate student details in submissions
        await Task.populate(tasks, { path: 'submissions.student', select: 'name rollNumber email section year' });
        
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedBy', 'name');
        if (!task) return res.status(404).json({ success: false, message: "Task not found" });
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, message: "Task updated successfully", data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Student submits task
exports.submitTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: "Task not found" });
        
        let proof = null;
        if (task.requiresProof) {
            if (!req.file) return res.status(400).json({ success: false, message: "Proof file is required" });
            proof = {
                filename: req.file.key,
                originalName: req.file.originalname,
                url: req.file.location,
                key: req.file.key,
                size: req.file.size,
                mimetype: req.file.mimetype
            };
        }

        // Check if already submitted and pending
        const existingSubIndex = task.submissions.findIndex(s => s.student.toString() === req.user._id.toString());
        
        const finalStatus = task.requiresProof ? 'pending' : 'accepted';
        
        if (existingSubIndex > -1) {
            if (task.submissions[existingSubIndex].status === 'accepted') {
                return res.status(400).json({ success: false, message: "Already accepted" });
            }
            if (task.submissions[existingSubIndex].status === 'rejected') {
                return res.status(400).json({ success: false, message: "Submission was rejected, cannot resubmit." });
            }
            // Update existing (resubmit)
            task.submissions[existingSubIndex].proof = proof || task.submissions[existingSubIndex].proof;
            task.submissions[existingSubIndex].status = finalStatus;
            task.submissions[existingSubIndex].submittedAt = Date.now();
        } else {
            // New submission
            task.submissions.push({
                student: req.user._id,
                proof,
                status: finalStatus
            });
        }

        await task.save();
        res.status(200).json({ success: true, message: "Task submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Faculty reviews task
exports.reviewSubmission = async (req, res) => {
    try {
        const { studentId, status, reviewNote } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: "Task not found" });

        const subIndex = task.submissions.findIndex(s => s.student.toString() === studentId);
        if (subIndex === -1) return res.status(404).json({ success: false, message: "Submission not found" });

        task.submissions[subIndex].status = status;
        task.submissions[subIndex].reviewNote = reviewNote;
        task.submissions[subIndex].verifiedBy = req.user._id;
        task.submissions[subIndex].verifiedAt = Date.now();

        await task.save();
        res.status(200).json({ success: true, message: "Submission reviewed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};