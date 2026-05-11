// routes/users.js

const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middleware/auth");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

const User = require("../models/User");

// ======================================
// GET ALL USERS
// Admin Only
// ======================================

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.error(
        "GET USERS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error while fetching users",
        error: error.message,
      });
    }
  }
);

// ======================================
// GET USER BY ID
// Admin Only
// ======================================

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error(
        "GET USER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error while fetching user",
        error: error.message,
      });
    }
  }
);

// ======================================
// UPDATE USER STATUS
// Admin Only
// ======================================

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { isActive } = req.body;

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.isActive = isActive;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "User status updated successfully",
        data: user,
      });
    } catch (error) {
      console.error(
        "UPDATE USER STATUS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error while updating user status",
        error: error.message,
      });
    }
  }
);

// ======================================
// DELETE USER
// Admin Only
// ======================================

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
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
        error: error.message,
      });
    }
  }
);

module.exports = router;