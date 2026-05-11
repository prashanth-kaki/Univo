// routes/tasks.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/multer");

// Controllers
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  submitTask,
  reviewSubmission
} = require("../controllers/taskController");

router.use(protect);

// Faculty / HOD / Coordinator / Admin routes
router.post(
  "/",
  authorizeRoles("faculty", "hod", "coordinator", "admin"),
  upload.single("file"), // File attachment for assignment
  createTask
);

router.put(
  "/:id",
  authorizeRoles("faculty", "hod", "coordinator", "admin"),
  updateTask
);

router.delete(
  "/:id",
  authorizeRoles("faculty", "hod", "coordinator", "admin"),
  deleteTask
);

router.post(
  "/:id/review",
  authorizeRoles("faculty", "hod", "coordinator", "admin"),
  reviewSubmission
);

// Student routes
router.post(
  "/:id/submit",
  authorizeRoles("student"),
  upload.single("proof"), // File proof upload
  submitTask
);

// General routes
router.get("/", getTasks);
router.get("/:id", getTaskById);

module.exports = router;