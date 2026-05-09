// routes/resources.js

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
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require(
  "../controllers/resourceController"
);

// ======================================
// ALL ROUTES PROTECTED
// ======================================

router.use(protect);

// ======================================
// CREATE RESOURCE
// Faculty / HOD / Coordinator / Admin
// ======================================

router.post(
  "/",
  authorizeRoles(
    "faculty",
    "hod",
    "coordinator",
    "admin"
  ),
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