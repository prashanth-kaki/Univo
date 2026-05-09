const express = require("express");

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/auth");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Current User
router.get(
  "/me",
  protect,
  getCurrentUser
);

// Logout
router.post(
  "/logout",
  protect,
  logoutUser
);

// Update Profile
router.put(
  "/profile",
  protect,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  protect,
  changePassword
);

// Admin Test
router.get(
  "/admin-test",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

// Faculty/HOD Test
router.get(
  "/faculty-hod-test",
  protect,
  authorizeRoles(
    "faculty",
    "hod"
  ),
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Welcome Faculty/HOD",
    });
  }
);

module.exports = router;