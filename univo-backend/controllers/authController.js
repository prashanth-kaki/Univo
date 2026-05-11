// controllers/authController.js

const jwt =
    require('jsonwebtoken');

const otpGenerator =
    require('otp-generator');

const User =
    require('../models/User');

const {
    sendOTPEmail,
} = require(
    '../services/emailService'
);

// ======================================
// GENERATE JWT TOKEN
// ======================================

const generateToken =
    (userId) => {

        return jwt.sign(

            {
                id: userId,
            },

            process.env.JWT_SECRET,

            {
                expiresIn:
                    process.env.JWT_EXPIRE ||
                    '7d',
            }
        );
    };

// ======================================
// SEND TOKEN RESPONSE
// ======================================

const sendTokenResponse =
    (
        user,
        statusCode,
        res,
        message
    ) => {

        const token =
            generateToken(
                user._id
            );

        res.status(
            statusCode
        ).json({

            success: true,

            message,

            token,

            user: {

                _id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email,

                role:
                    user.role,

                branch:
                    user.branch,

                year:
                    user.year,

                section:
                    user.section,
            },
        });
    };

// ======================================
// SEND REGISTER OTP
// ======================================

exports.sendRegisterOTP =
    async (req, res) => {

        try {

            const {
                email,
            } = req.body;

            if (!email) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Email is required',
                    });
            }

            // CHECK EXISTING USER

            const existingUser =
                await User.findOne({

                    email:
                        email.toLowerCase(),
                });

            // REAL USER EXISTS

            if (

                existingUser &&

                existingUser.name !==
                'Temp User'
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'User already exists',
                    });
            }

            // GENERATE OTP

            const otp =
                otpGenerator.generate(
                    6,
                    {

                        upperCaseAlphabets:
                            false,

                        lowerCaseAlphabets:
                            false,

                        specialChars:
                            false,
                    }
                );

            const otpExpiry =
                Date.now() +
                10 * 60 * 1000;

            // UPDATE TEMP USER

            if (existingUser) {

                existingUser.otp =
                    otp;

                existingUser.otpExpiry =
                    otpExpiry;

                await existingUser.save();

            } else {

                // CREATE TEMP USER

                await User.create({

                    name:
                        'Temp User',

                    email:
                        email.toLowerCase(),

                    password:
                        'temp123456',

                    role:
                        'student',

                    branch:
                        'CSE',

                    otp,

                    otpExpiry,

                    isVerified:
                        false,
                });
            }

            // SEND EMAIL

            await sendOTPEmail(

                email,

                otp,

                'Registration'
            );

            return res
                .status(200)
                .json({

                    success: true,

                    message:
                        'OTP sent successfully',
                });

        } catch (error) {

            console.error(
                'SEND OTP ERROR:',
                error
            );

            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        'Failed to send OTP',
                });
        }
    };

// ======================================
// VERIFY OTP
// ======================================

exports.verifyOTP =
    async (
        req,
        res
    ) => {

        try {

            const {
                email,
                otp,
            } = req.body;

            const user =
                await User.findOne({

                    email:
                        email.toLowerCase(),
                });

            if (!user) {

                return res
                    .status(404)
                    .json({

                        success: false,

                        message:
                            'User not found',
                    });
            }

            if (
                user.otp !== otp
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Invalid OTP',
                    });
            }

            if (
                user.otpExpiry <
                Date.now()
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'OTP expired',
                    });
            }

            user.isVerified =
                true;

            await user.save();

            res.status(200).json({

                success: true,

                message:
                    'OTP verified successfully',
            });

        } catch (error) {

            console.error(
                'VERIFY OTP ERROR:',
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
// SEND FORGOT PASSWORD OTP
// ======================================

exports.sendForgotPasswordOTP =
    async (req, res) => {

        try {

            const {
                email,
            } = req.body;

            const user =
                await User.findOne({

                    email:
                        email.toLowerCase(),
                });

            if (!user) {

                return res
                    .status(404)
                    .json({

                        success: false,

                        message:
                            'User not found',
                    });
            }

            const otp =
                otpGenerator.generate(
                    6,
                    {

                        upperCaseAlphabets:
                            false,

                        lowerCaseAlphabets:
                            false,

                        specialChars:
                            false,
                    }
                );

            user.otp =
                otp;

            user.otpExpiry =
                Date.now() +
                10 * 60 * 1000;

            await user.save();

            await sendOTPEmail(

                email,

                otp,

                'Password Reset'
            );

            res.status(200).json({

                success: true,

                message:
                    'OTP sent successfully',
            });

        } catch (error) {

            console.error(
                'FORGOT PASSWORD OTP ERROR:',
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
// RESET PASSWORD
// ======================================

exports.resetPassword =
    async (req, res) => {

        try {

            const {

                email,

                otp,

                password,

            } = req.body;

            const user =
                await User.findOne({

                    email:
                        email.toLowerCase(),
                }).select(
                    '+password'
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

            // OTP CHECK

            if (
                user.otp !== otp
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Invalid OTP',
                    });
            }

            // OTP EXPIRY

            if (
                user.otpExpiry <
                Date.now()
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'OTP expired',
                    });
            }

            // UPDATE PASSWORD

            user.password =
                password;

            user.otp =
                undefined;

            user.otpExpiry =
                undefined;

            await user.save();

            res.status(200).json({

                success: true,

                message:
                    'Password reset successful',
            });

        } catch (error) {

            console.error(
                'RESET PASSWORD ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to reset password',
            });
        }
    };

// ======================================
// REGISTER USER
// ======================================

exports.registerUser =
    async (req, res) => {

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

                role,

            } = req.body;

            const existingUser =
                await User.findOne({

                    email:
                        email.toLowerCase(),
                });

            // REAL USER EXISTS

            if (

                existingUser &&

                existingUser.name !==
                'Temp User'
            ) {

                return res
                    .status(409)
                    .json({

                        success: false,

                        message:
                            'User already exists',
                    });
            }

            let user;

            // UPDATE TEMP USER

            if (existingUser) {

                existingUser.name =
                    name;

                existingUser.password =
                    password;

                existingUser.branch =
                    branch;

                existingUser.year =
                    year;

                existingUser.section =
                    section;

                existingUser.semester =
                    semester;

                existingUser.rollNumber =
                    rollNumber;

                existingUser.phoneNumber =
                    phoneNumber;

                existingUser.role =
                    role ||
                    'student';

                user =
                    await existingUser.save();

            } else {

                // CREATE NEW USER

                user =
                    await User.create({

                        name,

                        email:
                            email.toLowerCase(),

                        password,

                        branch,

                        year,

                        section,

                        semester,

                        rollNumber,

                        phoneNumber,

                        role:
                            role ||
                            'student',
                    });
            }

            res.status(201).json({

                success: true,

                message:
                    'User registered successfully',
            });

        } catch (error) {

            console.error(
                'REGISTER ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Server error during registration',

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
        res
    ) => {

        try {

            const {
                email,
                password,
            } = req.body;

            // REQUIRED FIELD CHECK

            if (
                !email ||
                !password
            ) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            'Email and password are required',
                    });
            }

            // FIND USER

            const user =
                await User.findOne({

                    email:
                        email.toLowerCase(),
                }).select(
                    '+password'
                );

            // INVALID EMAIL

            if (!user) {

                return res
                    .status(404)
                    .json({

                        success: false,

                        message:
                            'Invalid email',
                    });
            }

            // ACCOUNT DISABLED

            if (
                !user.isActive
            ) {

                return res
                    .status(403)
                    .json({

                        success: false,

                        message:
                            'Your account has been deactivated',
                    });
            }

            // PASSWORD CHECK

            const isPasswordMatched =
                await user.comparePassword(
                    password
                );

            // WRONG PASSWORD

            if (
                !isPasswordMatched
            ) {

                return res
                    .status(401)
                    .json({

                        success: false,

                        message:
                            'Wrong password',
                    });
            }

            // UPDATE LAST LOGIN

            user.lastLogin =
                new Date();

            await user.save({

                validateBeforeSave:
                    false,
            });

            // SUCCESS

            sendTokenResponse(

                user,

                200,

                res,

                'Login successful'
            );

        } catch (error) {

            console.error(
                'LOGIN ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Server error during login',

                error:
                    error.message,
            });
        }
    };

// ======================================
// GET CURRENT USER
// ======================================

exports.getCurrentUser =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                ).populate(
                    'subjects'
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

                data: user,
            });

        } catch (error) {

            console.error(
                'GET CURRENT USER ERROR:',
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
// LOGOUT USER
// ======================================

exports.logoutUser =
    async (req, res) => {

        res.status(200).json({

            success: true,

            message:
                'Logged out successfully',
        });
    };

// ======================================
// UPDATE PROFILE
// ======================================

exports.updateProfile =
    async (req, res) => {

        try {

            const allowedFields = [

                'name',

                'phoneNumber',

                'bio',

                'profileImage',

                'section',

                'semester',
            ];

            const updateData =
                {};

            allowedFields.forEach(
                (field) => {

                    if (
                        req.body[
                        field
                        ] !==
                        undefined
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

                        runValidators:
                            true,
                    }
                );

            res.status(200).json({

                success: true,

                message:
                    'Profile updated successfully',

                data: updatedUser,
            });

        } catch (error) {

            console.error(
                'UPDATE PROFILE ERROR:',
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
// CHANGE PASSWORD
// ======================================

exports.changePassword =
    async (req, res) => {

        try {

            const {

                currentPassword,

                newPassword,

            } = req.body;

            const user =
                await User.findById(
                    req.user.id
                ).select(
                    '+password'
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
                            'Current password is incorrect',
                    });
            }

            user.password =
                newPassword;

            await user.save();

            sendTokenResponse(

                user,

                200,

                res,

                'Password changed successfully'
            );

        } catch (error) {

            console.error(
                'CHANGE PASSWORD ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    error.message,
            });
        }
    };