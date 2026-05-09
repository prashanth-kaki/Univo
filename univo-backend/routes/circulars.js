// routes/circulars.js

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
  createCircular,
  getCirculars,
  getCircularById,
  updateCircular,
  deleteCircular,
} = require(
  "../controllers/circularController"
);

// ======================================
// ALL ROUTES PROTECTED
// ======================================

router.use(protect);

// ======================================
// CREATE CIRCULAR
// HOD / Faculty / Coordinator / Admin
// ======================================

router.post(
  "/",
  authorizeRoles(
    "hod",
    "faculty",
    "coordinator",
    "admin"
  ),
  createCircular
);

// ======================================
// GET ALL CIRCULARS
// ======================================

router.get(
  "/",
  getCirculars
);

// ======================================
// GET SINGLE CIRCULAR
// ======================================

router.get(
  "/:id",
  getCircularById
);

// ======================================
// UPDATE CIRCULAR
// ======================================

router.put(
  "/:id",
  authorizeRoles(
    "hod",
    "faculty",
    "coordinator",
    "admin"
  ),
  updateCircular
);

// ======================================
// DELETE CIRCULAR
// ======================================

router.delete(
  "/:id",
  authorizeRoles(
    "hod",
    "faculty",
    "coordinator",
    "admin"
  ),
  deleteCircular
);

module.exports = router;