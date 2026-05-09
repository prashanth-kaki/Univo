// routes/buzz.js

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
  createBuzz,
  getBuzzPosts,
  getBuzzById,
  updateBuzz,
  deleteBuzz,
} = require(
  "../controllers/buzzController"
);

// ======================================
// ALL ROUTES PROTECTED
// ======================================

router.use(protect);

// ======================================
// CREATE BUZZ POST
// Coordinator / Admin
// ======================================

router.post(
  "/",
  authorizeRoles(
    "coordinator",
    "admin"
  ),
  createBuzz
);

// ======================================
// GET ALL BUZZ POSTS
// ======================================

router.get(
  "/",
  getBuzzPosts
);

// ======================================
// GET SINGLE BUZZ POST
// ======================================

router.get(
  "/:id",
  getBuzzById
);

// ======================================
// UPDATE BUZZ POST
// ======================================

router.put(
  "/:id",
  authorizeRoles(
    "coordinator",
    "admin"
  ),
  updateBuzz
);

// ======================================
// DELETE BUZZ POST
// ======================================

router.delete(
  "/:id",
  authorizeRoles(
    "coordinator",
    "admin"
  ),
  deleteBuzz
);

module.exports = router;