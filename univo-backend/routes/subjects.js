// routes/subjects.js

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
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require(
  "../controllers/subjectController"
);

// ======================================
// ALL ROUTES PROTECTED
// ======================================

router.use(protect);

// ======================================
// CREATE SUBJECT
// HOD / Coordinator / Admin
// ======================================

router.post(
  "/",
  authorizeRoles(
    "hod",
    "coordinator",
    "admin"
  ),
  createSubject
);

// ======================================
// GET ALL SUBJECTS
// ======================================

router.get(
  "/",
  getSubjects
);

// ======================================
// GET SINGLE SUBJECT
// ======================================

router.get(
  "/:id",
  getSubjectById
);

// ======================================
// UPDATE SUBJECT
// ======================================

router.put(
  "/:id",
  authorizeRoles(
    "hod",
    "coordinator",
    "admin"
  ),
  updateSubject
);

// ======================================
// DELETE SUBJECT
// ======================================

router.delete(
  "/:id",
  authorizeRoles(
    "hod",
    "coordinator",
    "admin"
  ),
  deleteSubject
);

module.exports = router;