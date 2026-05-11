const express =
    require('express');

const router =
    express.Router();

const {

    getActivityLogs,

    getActivityLogById,

    createActivityLog,

    deleteActivityLog,

    clearAllActivityLogs,

} = require(
    '../controllers/activityController'
);

const {
    protect,
} = require(
    '../middleware/auth'
);

const {
    authorizeRoles,
} = require(
    '../middleware/roleMiddleware'
);

// ======================================
// ADMIN PROTECTION
// ======================================

router.use(
    protect,
    authorizeRoles(
        'admin'
    )
);

// ======================================
// ROUTES
// ======================================

// GET ALL LOGS

router.get(
    '/logs',
    getActivityLogs
);

// GET SINGLE LOG

router.get(
    '/logs/:id',
    getActivityLogById
);

// CREATE LOG

router.post(
    '/logs',
    createActivityLog
);

// DELETE SINGLE LOG

router.delete(
    '/logs/:id',
    deleteActivityLog
);

// CLEAR ALL LOGS

router.delete(
    '/logs',
    clearAllActivityLogs
);

module.exports =
    router;