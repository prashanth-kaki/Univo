// routes/resources.js

const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

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

  createResource,

  getResources,

  getResourceById,

  updateResource,

  deleteResource,

  getFacultyResources,

  getStudentResources,

} = require(
  "../controllers/resourceController"
);

// ======================================
// ALL ROUTES PROTECTED
// ======================================

router.use(protect);

// ======================================
// CREATE RESOURCE
// ======================================

router.post(
  "/",

  authorizeRoles(
    "faculty",
    "hod",
    "coordinator",
    "admin"
  ),

  upload.single("file"),

  createResource
);

// ======================================
// GET ALL RESOURCES
// ======================================

router.get(
  "/",
  getResources
);

// ======================================
// GET FACULTY RESOURCES
// ======================================

router.get(
  "/faculty/my-uploads",

  authorizeRoles(
    "faculty",
    "hod",
    "coordinator",
    "admin"
  ),

  getFacultyResources
);

// ======================================
// GET STUDENT RESOURCES
// ======================================

router.get(
  "/student",

  authorizeRoles(
    "student"
  ),

  getStudentResources
);

// ======================================
// GET SINGLE RESOURCE
// ======================================

router.get(
  "/:id",
  getResourceById
);

// ======================================
// UPDATE RESOURCE
// ======================================

router.put(
  "/:id",

  authorizeRoles(
    "faculty",
    "hod",
    "coordinator",
    "admin"
  ),

  updateResource
);

// ======================================
// DELETE RESOURCE
// ======================================

router.delete(
  "/:id",

  authorizeRoles(
    "faculty",
    "hod",
    "coordinator",
    "admin"
  ),

  deleteResource
);

module.exports = router;