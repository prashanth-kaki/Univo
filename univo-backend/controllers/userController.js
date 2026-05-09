const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

// =========================
// GET ALL USERS
// ADMIN ONLY
// =========================
exports.getAllUsers = async (req, res, next) => {
    try {
        const {
            role,
            branch,
            year,
            page = 1,
            limit = 20,
            search
        } = req.query;

        const query = { isActive: true };

        if (role) query.role = role;
        if (branch) query.branch = branch;
        if (year) query.year = parseInt(year);

        if (search) {
            query.name = {
                $regex: search,
                $options: 'i'
            };
        }

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find(query)
                .select('-password')
                .sort({ name: 1 })
                .skip(skip)
                .limit(parseInt(limit)),

            User.countDocuments(query)
        ]);

        sendSuccess(res, {
            users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (err) {
        next(err);
    }
};

// =========================
// GET PROFILE
// =========================
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password');

        if (!user) {
            return sendError(res, 'User not found', 404);
        }

        sendSuccess(res, { user });

    } catch (err) {
        next(err);
    }
};

// =========================
// UPDATE PROFILE
// =========================
exports.updateProfile = async (req, res, next) => {
    try {
        const {
            name,
            phone,
            branch,
            section,
            year,
            bio
        } = req.body;

        const update = {};

        if (name) update.name = name;
        if (phone) update.phone = phone;
        if (branch) update.branch = branch;
        if (section) update.section = section;
        if (year) update.year = year;
        if (bio) update.bio = bio;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            update,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        sendSuccess(
            res,
            { user },
            'Profile updated successfully'
        );

    } catch (err) {
        next(err);
    }
};

// =========================
// UPLOAD AVATAR
// =========================
exports.uploadAvatar = async (req, res, next) => {
    try {

        if (!req.file) {
            return sendError(
                res,
                'Avatar image required',
                400
            );
        }

        const avatarUrl =
            req.file.location || req.file.path;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                avatar: avatarUrl
            },
            {
                new: true
            }
        ).select('-password');

        sendSuccess(
            res,
            {
                avatar: avatarUrl,
                user
            },
            'Avatar uploaded successfully'
        );

    } catch (err) {
        next(err);
    }
};

// =========================
// GET FACULTY LIST
// =========================
exports.getFacultyList = async (req, res, next) => {
    try {

        const { branch } = req.query;

        const query = {
            role: 'faculty',
            isActive: true
        };

        if (branch) {
            query.branch = branch;
        }

        const faculty = await User.find(query)
            .select('name email branch department avatar');

        sendSuccess(res, { faculty });

    } catch (err) {
        next(err);
    }
};

// =========================
// TOGGLE USER STATUS
// ADMIN ONLY
// =========================
exports.toggleUserStatus = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return sendError(
                res,
                'User not found',
                404
            );
        }

        user.isActive = !user.isActive;

        await user.save();

        sendSuccess(
            res,
            { user },
            `User ${user.isActive ? 'activated' : 'deactivated'}`
        );

    } catch (err) {
        next(err);
    }
};

// =========================
// GET USER BY ID
// =========================
exports.getUserById = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id)
            .select('-password');

        if (!user) {
            return sendError(
                res,
                'User not found',
                404
            );
        }

        sendSuccess(res, { user });

    } catch (err) {
        next(err);
    }
};