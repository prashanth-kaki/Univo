// routes/forum.js

const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middleware/auth");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

// ======================================
// CONTROLLERS
// ======================================

const {
  createForumPost,
  getForumPosts,
  getForumPostById,
  updateForumPost,
  deleteForumPost,
} = require(
  "../controllers/forumController"
);

// ======================================
// ALL ROUTES PROTECTED
// ======================================

router.use(protect);

// ======================================
// CREATE FORUM POST
// Coordinator / Admin
// ======================================

router.post(
  "/",
  authorizeRoles(
    "coordinator",
    "admin"
  ),
  createForumPost
);

// ======================================
// GET ALL FORUM POSTS
// ======================================

router.get(
  "/",
  getForumPosts
);

// ======================================
// GET SINGLE FORUM POST
// ======================================

router.get(
  "/:id",
  getForumPostById
);

// ======================================
// UPDATE FORUM POST
// ======================================

router.put(
  "/:id",
  authorizeRoles(
    "coordinator",
    "admin"
  ),
  updateForumPost
);

// ======================================
// DELETE FORUM POST
// ======================================

router.delete(
  "/:id",
  authorizeRoles(
    "coordinator",
    "admin"
  ),
  deleteForumPost
);

module.exports = router;