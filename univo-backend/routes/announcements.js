const express = require("express");

const router = express.Router();
const upload =
  require("../config/multer");
const {
  protect,
  authorize,
} = require("../middleware/auth");
const {
  authorizeRoles,
} = require(
  "../middleware/roleMiddleware"
);
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  togglePinAnnouncement,
  sendAnnouncementNotification,
} = require("../controllers/announcementController");


// ======================================
// GET ALL ANNOUNCEMENTS
// ======================================

router.get(
  "/",
  protect,
  getAnnouncements
);

// ======================================
// CREATE ANNOUNCEMENT
// ======================================

router.post(
  "/",

  protect,

  authorizeRoles(
    "faculty",
    "hod",
    "coordinator",
    "admin"
  ),

  upload.single("attachment"),

  createAnnouncement
);

// ======================================
// UPDATE ANNOUNCEMENT
// ======================================

router.put(
  "/:id",

  protect,

  authorize(
    "hod",
    "faculty",
    "coordinator",
    "admin"
  ),

  upload.single("attachment"),

  updateAnnouncement
);

// ======================================
// DELETE ANNOUNCEMENT
// ======================================

router.delete(
  "/:id",
  protect,
  authorize(
    "hod",
    "faculty",
    "coordinator",
    "admin"
  ),
  deleteAnnouncement
);

// ======================================
// PIN / UNPIN
// ======================================

router.patch(
  "/:id/pin",
  protect,
  authorize(
    "hod",
    "faculty",
    "coordinator",
    "admin"
  ),
  togglePinAnnouncement
);

// ======================================
// SEND NOTIFICATION
// ======================================

router.post(
  "/:id/notify",
  protect,
  authorize(
    "hod",
    "faculty",
    "coordinator",
    "admin"
  ),
  sendAnnouncementNotification
);

module.exports = router;