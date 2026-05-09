const express = require("express");

const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/auth");

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
  authorize(
    "hod",
    "faculty",
    "coordinator",
    "admin"
  ),
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