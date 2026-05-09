// routes/bookmarks.js

const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middleware/auth");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

// ======================================
// GET BOOKMARKS
// Student Only
// ======================================

router.get(
  "/",
  protect,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        data: [],
      });
    } catch (error) {
      console.error(
        "GET BOOKMARKS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error while fetching bookmarks",
        error: error.message,
      });
    }
  }
);

// ======================================
// ADD BOOKMARK
// Student Only
// ======================================

router.post(
  "/",
  protect,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      res.status(201).json({
        success: true,
        message:
          "Bookmark added successfully",
      });
    } catch (error) {
      console.error(
        "ADD BOOKMARK ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error while adding bookmark",
        error: error.message,
      });
    }
  }
);

// ======================================
// DELETE BOOKMARK
// Student Only
// ======================================

router.delete(
  "/:id",
  protect,
  authorizeRoles("student"),
  async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message:
          "Bookmark removed successfully",
      });
    } catch (error) {
      console.error(
        "DELETE BOOKMARK ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server error while deleting bookmark",
        error: error.message,
      });
    }
  }
);

module.exports = router;