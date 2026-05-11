const express =
  require('express');

const {
  getDepartmentStats,
  getFacultyList,
  getDepartmentActivity,
  getDepartmentAnalytics,
  createAnnouncement,
  getAnnouncements,
  createFaculty,
} =
  require(
    '../controllers/hodController'
  );

const {
  protect,
  authorize,
} =
  require(
    '../middleware/auth'
  );

const router =
  express.Router();

// =====================================
// PROTECT ALL HOD ROUTES
// =====================================

router.use(
  protect,
  authorize(
    'hod'
  )
);

// =====================================
// DASHBOARD
// =====================================

router.get(
  '/stats',
  getDepartmentStats
);

router.get(
  '/activity',
  getDepartmentActivity
);

// =====================================
// FACULTY
// =====================================

router.get(
  '/faculty',
  getFacultyList
);

router.post(
  '/faculty',
  createFaculty
);

// =====================================
// ANALYTICS
// =====================================

router.get(
  '/analytics',
  getDepartmentAnalytics
);

// =====================================
// ANNOUNCEMENTS
// =====================================

router.get(
  '/announcements',
  getAnnouncements
);

router.post(
  '/announcements',
  createAnnouncement
);

module.exports =
  router;