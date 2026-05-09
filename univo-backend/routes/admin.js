// routes/admin.js

const express = require("express");

const router =
    express.Router();

const {
    protect,
    authorize,
} = require("../middleware/auth");

const User =
    require("../models/User");

// ======================================
// APPLY ADMIN PROTECTION
// ======================================

router.use(
    protect,
    authorize("admin")
);

// ======================================
// GET ALL USERS
// ======================================

router.get(
    "/users",
    async (req, res) => {

        try {

            const users =
                await User.find()
                    .select(
                        "-password"
                    )
                    .sort({
                        createdAt: -1,
                    });

            res.status(200).json({
                success: true,
                count:
                    users.length,
                data: users,
            });

        } catch (error) {

            console.error(
                "ADMIN GET USERS ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while fetching users",
                error:
                    error.message,
            });
        }
    }
);

// ======================================
// GET DASHBOARD STATS
// ======================================

router.get(
    "/dashboard-stats",
    async (req, res) => {

        try {

            const totalUsers =
                await User.countDocuments();

            const totalStudents =
                await User.countDocuments(
                    {
                        role:
                            "student",
                    }
                );

            const totalFaculty =
                await User.countDocuments(
                    {
                        role:
                            "faculty",
                    }
                );

            const totalHods =
                await User.countDocuments(
                    {
                        role:
                            "hod",
                    }
                );

            const totalCoordinators =
                await User.countDocuments(
                    {
                        role:
                            "coordinator",
                    }
                );

            const totalAdmins =
                await User.countDocuments(
                    {
                        role:
                            "admin",
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
                "ADMIN DASHBOARD ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while fetching dashboard stats",
                error:
                    error.message,
            });
        }
    }
);

// ======================================
// CREATE STAFF ACCOUNT
// ======================================

router.post(
    "/staff",
    async (req, res) => {

        try {

            const {
                name,
                email,
                password,
                role,
                branch,
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
                            "All required fields are required",
                    });
            }

            // ==============================
            // ALLOWED STAFF ROLES
            // ==============================

            const allowedRoles =
                [
                    "faculty",
                    "hod",
                    "coordinator",
                    "admin",
                ];

            if (
                !allowedRoles.includes(
                    role
                )
            ) {

                return res
                    .status(403)
                    .json({
                        success: false,
                        message:
                            "Invalid staff role",
                    });
            }

            // ==============================
            // EXISTING USER CHECK
            // ==============================

            const existingUser =
                await User.findOne({
                    email,
                });

            if (
                existingUser
            ) {

                return res
                    .status(409)
                    .json({
                        success: false,
                        message:
                            "User already exists",
                    });
            }

            // ==============================
            // CREATE USER
            // ==============================

            const user =
                await User.create({
                    name,
                    email,
                    password,
                    role,
                    branch,
                    phoneNumber,
                    isVerified: true,
                });

            res.status(201).json({
                success: true,
                message:
                    `${role} account created successfully`,
                data: user,
            });

        } catch (error) {

            console.error(
                "CREATE STAFF ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while creating staff account",
                error:
                    error.message,
            });
        }
    }
);

// ======================================
// ACTIVATE USER
// ======================================

router.put(
    "/users/:id/activate",
    async (req, res) => {

        try {

            const user =
                await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        isActive: true,
                    },
                    {
                        new: true,
                    }
                ).select(
                    "-password"
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "User not found",
                    });
            }

            res.status(200).json({
                success: true,
                message:
                    "User activated successfully",
                data: user,
            });

        } catch (error) {

            console.error(
                "ACTIVATE USER ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while activating user",
                error:
                    error.message,
            });
        }
    }
);

// ======================================
// DEACTIVATE USER
// ======================================

router.put(
    "/users/:id/deactivate",
    async (req, res) => {

        try {

            const user =
                await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        isActive: false,
                    },
                    {
                        new: true,
                    }
                ).select(
                    "-password"
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "User not found",
                    });
            }

            res.status(200).json({
                success: true,
                message:
                    "User deactivated successfully",
                data: user,
            });

        } catch (error) {

            console.error(
                "DEACTIVATE USER ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while deactivating user",
                error:
                    error.message,
            });
        }
    }
);

// ======================================
// UPDATE USER ROLE
// ======================================

router.put(
    "/users/:id/role",
    async (req, res) => {

        try {

            const {
                role,
            } = req.body;

            const allowedRoles =
                [
                    "student",
                    "faculty",
                    "hod",
                    "coordinator",
                    "admin",
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
                            "Invalid role",
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
                    "-password"
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "User not found",
                    });
            }

            res.status(200).json({
                success: true,
                message:
                    "User role updated successfully",
                data: user,
            });

        } catch (error) {

            console.error(
                "UPDATE ROLE ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while updating role",
                error:
                    error.message,
            });
        }
    }
);

// ======================================
// DELETE USER
// ======================================

router.delete(
    "/users/:id",
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
                            "User not found",
                    });
            }

            await user.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "User deleted successfully",
            });

        } catch (error) {

            console.error(
                "DELETE USER ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while deleting user",
                error:
                    error.message,
            });
        }
    }
);

module.exports =
    router;