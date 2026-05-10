const express = require('express');

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateProfile,
  changePassword,
  sendRegisterOTP,
  verifyOTP,
  sendForgotPasswordOTP,
  resetPassword,
} = require('../controllers/authController');

const {
  protect,
} = require('../middleware/auth');

const {
  authorizeRoles,
} = require('../middleware/roleMiddleware');

const router = express.Router();

// ======================================
// AUTH ROUTES
// ======================================

// Register User
router.post(
  '/register',
  registerUser
);

// Login User
router.post(
  '/login',
  loginUser
);

// Send Registration OTP
router.post(
  '/send-register-otp',
  sendRegisterOTP
);

// Verify OTP
router.post(
  '/verify-otp',
  verifyOTP
);

// Forgot Password OTP
router.post(
  '/forgot-password-otp',
  sendForgotPasswordOTP
);

// Reset Password
router.post(
  '/reset-password',
  resetPassword
);

// ======================================
// USER ROUTES
// ======================================

// Get Current User
router.get(
  '/me',
  protect,
  getCurrentUser
);

// Logout
router.post(
  '/logout',
  protect,
  logoutUser
);

// Update Profile
router.put(
  '/profile',
  protect,
  updateProfile
);

// Change Password
router.put(
  '/change-password',
  protect,
  changePassword
);

// ======================================
// ROLE TEST ROUTES
// ======================================

// Admin Test
router.get(
  '/admin-test',
  protect,
  authorizeRoles('admin'),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Welcome Admin',
    });
  }
);

// Faculty/HOD Test
router.get(
  '/faculty-hod-test',
  protect,
  authorizeRoles(
    'faculty',
    'hod'
  ),
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        'Welcome Faculty/HOD',
    });
  }
);

// Coordinator Test
router.get(
  '/coordinator-test',
  protect,
  authorizeRoles(
    'coordinator'
  ),
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        'Welcome Coordinator',
    });
  }
);

// Student Test
router.get(
  '/student-test',
  protect,
  authorizeRoles(
    'student'
  ),
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        'Welcome Student',
    });
  }
);

module.exports = router;