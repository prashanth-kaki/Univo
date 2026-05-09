// routes/tasks.js

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
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require(
  "../controllers/taskController"
);

// ======================================
// ALL ROUTES PROTECTED
// ======================================

router.use(protect);

// ======================================
// CREATE TASK
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
  createTask
);

// ======================================
// GET ALL TASKS
// ======================================

router.get(
  "/",
  getTasks
);

// ======================================
// GET SINGLE TASK
// ======================================

router.get(
  "/:id",
  getTaskById
);

// ======================================
// UPDATE TASK
// ======================================

router.put(
  "/:id",
  authorizeRoles(
    "faculty",
    "hod",
    "coordinator",
    "admin"
  ),
  updateTask
);

// ======================================
// DELETE TASK
// ======================================

router.delete(
  "/:id",
  authorizeRoles(
    "faculty",
    "hod",
    "coordinator",
    "admin"
  ),
  deleteTask
);

module.exports = router;