// controllers/authController.js

const jwt = require("jsonwebtoken");

const User = require("../models/User");

// ======================================
// GENERATE JWT TOKEN
// ======================================

const generateToken = (
    userId
) => {

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn:
                process.env.JWT_EXPIRE ||
                "7d",
        }
    );
};

// ======================================
// SEND TOKEN RESPONSE
// ======================================

const sendTokenResponse = (
    user,
    statusCode,
    res,
    message
) => {

    const token =
        generateToken(
            user._id
        );

    res.status(statusCode).json({
        success: true,
        message,
        token,
        data: user,
    });
};

// ======================================
// REGISTER USER
// ======================================

exports.registerUser =
    async (
        req,
        res,
        next
    ) => {

        try {

            const {
                name,
                email,
                password,
                branch,
                year,
                section,
                semester,
                rollNumber,
                phoneNumber,
            } = req.body;

            // ==================================
            // ROLE
            // ==================================

            const role =
                req.body.role ||
                "student";

            // ==================================
            // VALIDATION
            // ==================================

            if (
                !name ||
                !email ||
                !password ||
                !branch
            ) {

                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Name, email, password and branch are required",
                    });
            }

            // ==================================
            // STUDENT VALIDATION ONLY
            // ==================================

            if (
                role ===
                "student" &&
                (
                    !year ||
                    !section ||
                    !rollNumber
                )
            ) {

                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Year, section and roll number are required",
                    });
            }

            // ==================================
            // VALID ROLES
            // ==================================

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

            // ==================================
            // EXISTING USER CHECK
            // ==================================

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

            // ==================================
            // CREATE USER
            // ==================================

            const user =
                await User.create({
                    name,
                    email,
                    password,
                    role,
                    branch,
                    year,
                    section,
                    semester,
                    rollNumber,
                    phoneNumber,
                });

            sendTokenResponse(
                user,
                201,
                res,

                role === "student"
                    ? "Student registered successfully"
                    : `${role} account created successfully`
            );

        } catch (error) {

            console.error(
                "REGISTER ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error during registration",
                error:
                    error.message,
            });
        }
    };

// ======================================
// LOGIN USER
// ======================================

exports.loginUser =
    async (
        req,
        res,
        next
    ) => {

        try {

            const {
                email,
                password,
            } = req.body;

            // ==================================
            // VALIDATION
            // ==================================

            if (
                !email ||
                !password
            ) {

                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Email and password are required",
                    });
            }

            // ==================================
            // FIND USER
            // ==================================

            const user =
                await User.findOne({
                    email,
                }).select(
                    "+password"
                );

            if (!user) {

                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "Invalid credentials",
                    });
            }

            // ==================================
            // ACTIVE CHECK
            // ==================================

            if (
                !user.isActive
            ) {

                return res
                    .status(403)
                    .json({
                        success: false,
                        message:
                            "Your account has been deactivated",
                    });
            }

            // ==================================
            // PASSWORD CHECK
            // ==================================

            const isPasswordMatched =
                await user.comparePassword(
                    password
                );

            if (
                !isPasswordMatched
            ) {

                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "Invalid credentials",
                    });
            }

            // ==================================
            // LAST LOGIN
            // ==================================

            user.lastLogin =
                new Date();

            await user.save({
                validateBeforeSave:
                    false,
            });

            sendTokenResponse(
                user,
                200,
                res,
                "Login successful"
            );

        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error during login",
                error:
                    error.message,
            });
        }
    };

// ======================================
// GET CURRENT USER
// ======================================

exports.getCurrentUser =
    async (
        req,
        res,
        next
    ) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                ).populate(
                    "subjects"
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
                    "Current user fetched",
                data: user,
            });

        } catch (error) {

            console.error(
                "GET CURRENT USER ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while fetching user",
                error:
                    error.message,
            });
        }
    };

// ======================================
// LOGOUT USER
// ======================================

exports.logoutUser =
    async (
        req,
        res,
        next
    ) => {

        try {

            res.status(200).json({
                success: true,
                message:
                    "Logged out successfully",
            });

        } catch (error) {

            console.error(
                "LOGOUT ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error during logout",
                error:
                    error.message,
            });
        }
    };

// ======================================
// UPDATE PROFILE
// ======================================

exports.updateProfile =
    async (
        req,
        res,
        next
    ) => {

        try {

            const allowedFields =
                [
                    "name",
                    "phoneNumber",
                    "bio",
                    "profileImage",
                    "section",
                    "semester",
                ];

            const updateData =
                {};

            allowedFields.forEach(
                (field) => {

                    if (
                        req.body[
                        field
                        ] !== undefined
                    ) {

                        updateData[
                            field
                        ] =
                            req.body[
                            field
                            ];
                    }
                }
            );

            const updatedUser =
                await User.findByIdAndUpdate(
                    req.user.id,
                    updateData,
                    {
                        new: true,
                        runValidators: true,
                    }
                );

            res.status(200).json({
                success: true,
                message:
                    "Profile updated successfully",
                data: updatedUser,
            });

        } catch (error) {

            console.error(
                "UPDATE PROFILE ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while updating profile",
                error:
                    error.message,
            });
        }
    };

// ======================================
// CHANGE PASSWORD
// ======================================

exports.changePassword =
    async (
        req,
        res,
        next
    ) => {

        try {

            const {
                currentPassword,
                newPassword,
            } = req.body;

            if (
                !currentPassword ||
                !newPassword
            ) {

                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Current password and new password are required",
                    });
            }

            const user =
                await User.findById(
                    req.user.id
                ).select(
                    "+password"
                );

            const isMatched =
                await user.comparePassword(
                    currentPassword
                );

            if (!isMatched) {

                return res
                    .status(401)
                    .json({
                        success: false,
                        message:
                            "Current password is incorrect",
                    });
            }

            user.password =
                newPassword;

            await user.save();

            sendTokenResponse(
                user,
                200,
                res,
                "Password changed successfully"
            );

        } catch (error) {

            console.error(
                "CHANGE PASSWORD ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while changing password",
                error:
                    error.message,
            });
        }
    };