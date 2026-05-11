// controllers/adminController.js

const User =
    require('../models/User');

const {
    sendAccountCreatedEmail,
} = require('../services/emailService');

// ======================================
// GET ALL USERS
// ======================================

exports.getAllUsers =
    async (req, res) => {

        try {

            const users =
                await User.find()
                    .select(
                        '-password'
                    )
                    .sort({
                        createdAt: -1,
                    });

            res.status(200).json({
                success: true,
                total:
                    users.length,
                data: users,
            });

        } catch (error) {

            console.error(
                'GET USERS ERROR:',
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ======================================
// GET DASHBOARD STATS
// ======================================

exports.getDashboardStats =
    async (req, res) => {

        try {

            const totalUsers =
                await User.countDocuments();

            const totalStudents =
                await User.countDocuments(
                    {
                        role:
                            'student',
                    }
                );

            const totalFaculty =
                await User.countDocuments(
                    {
                        role:
                            'faculty',
                    }
                );

            const totalHods =
                await User.countDocuments(
                    {
                        role:
                            'hod',
                    }
                );

            const totalCoordinators =
                await User.countDocuments(
                    {
                        role:
                            'coordinator',
                    }
                );

            const totalAdmins =
                await User.countDocuments(
                    {
                        role:
                            'admin',
                    }
                );

            const activeUsers =
                await User.countDocuments(
                    {
                        isActive: true,
                    }
                );

            const inactiveUsers =
                await User.countDocuments(
                    {
                        isActive: false,
                    }
                );

            res.status(200).json({
                success: true,

                data: {
                    totalUsers,
                    totalStudents,
                    totalFaculty,
                    totalHods,
                    totalCoordinators,
                    totalAdmins,
                    activeUsers,
                    inactiveUsers,
                },
            });

        } catch (error) {

            console.error(
                'DASHBOARD STATS ERROR:',
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ======================================
// CREATE USER
// ======================================

exports.createUser =
    async (req, res) => {

        try {

            const {
                name,
                email,
                password,
                role,
                branch,
                year,
                semester,
                section,
                rollNumber,
                phoneNumber,
            } = req.body;

            // ==============================
            // VALIDATION
            // ==============================

            if (
                !name ||
                !email ||
                !password ||
                !role ||
                !branch
            ) {

                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'All required fields are required',
                    });
            }

            // ==============================
            // CHECK EXISTING USER
            // ==============================

            const existingUser =
                await User.findOne({
                    email:
                        email.toLowerCase(),
                });

            if (
                existingUser
            ) {

                return res
                    .status(409)
                    .json({
                        success: false,
                        message:
                            'User already exists',
                    });
            }

            // ==============================
            // CREATE USER
            // ==============================

            const user =
                await User.create({
                    name,

                    email:
                        email.toLowerCase(),

                    password,

                    role,

                    branch,

                    year,

                    semester,

                    section,

                    rollNumber,

                    phoneNumber,

                    isVerified:
                        true,

                    isActive: true,
                });

            // ==============================
            // SEND EMAIL
            // ==============================

            try {

                await sendAccountCreatedEmail(
                    {
                        name:
                            user.name,

                        email:
                            user.email,

                        password,

                        role:
                            user.role,

                        branch:
                            user.branch,
                    }
                );

            } catch (emailError) {

                console.error(
                    'EMAIL ERROR:',
                    emailError
                );
            }

            // ==============================
            // RESPONSE
            // ==============================

            res.status(201).json({
                success: true,

                message:
                    `${role} account created successfully`,

                data: user,
            });

        } catch (error) {

            console.error(
                'CREATE USER ERROR:',
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ======================================
// TOGGLE USER STATUS
// ======================================

exports.toggleUserStatus =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.params.id
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            'User not found',
                    });
            }

            user.isActive =
                !user.isActive;

            await user.save();

            res.status(200).json({
                success: true,

                message:
                    user.isActive
                        ? 'User activated successfully'
                        : 'User deactivated successfully',

                data: user,
            });

        } catch (error) {

            console.error(
                'TOGGLE USER STATUS ERROR:',
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ======================================
// UPDATE USER ROLE
// ======================================

exports.updateUserRole =
    async (req, res) => {

        try {

            const {
                role,
            } = req.body;

            const allowedRoles =
                [
                    'student',
                    'faculty',
                    'hod',
                    'coordinator',
                    'admin',
                ];

            if (
                !allowedRoles.includes(
                    role
                )
            ) {

                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            'Invalid role',
                    });
            }

            const user =
                await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        role,
                    },
                    {
                        new: true,
                    }
                ).select(
                    '-password'
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            'User not found',
                    });
            }

            res.status(200).json({
                success: true,

                message:
                    'User role updated successfully',

                data: user,
            });

        } catch (error) {

            console.error(
                'UPDATE ROLE ERROR:',
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ======================================
// BAN / UNBAN USER
// ======================================

exports.banUser =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.params.id
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            'User not found',
                    });
            }

            user.isActive =
                !user.isActive;

            await user.save();

            res.status(200).json({
                success: true,

                message:
                    user.isActive
                        ? 'User unbanned successfully'
                        : 'User banned successfully',

                data: user,
            });

        } catch (error) {

            console.error(
                'BAN USER ERROR:',
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ======================================
// DELETE USER
// ======================================

exports.deleteUser =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.params.id
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            'User not found',
                    });
            }

            await user.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    'User deleted successfully',
            });

        } catch (error) {

            console.error(
                'DELETE USER ERROR:',
                error
            );

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };