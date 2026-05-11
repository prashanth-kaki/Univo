const express =
    require('express');

const router =
    express.Router();

// ======================================
// MIDDLEWARE
// ======================================

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
// CONTROLLERS
// ======================================

const {

    getReports,

    getReportStats,

    createReport,

    resolveReport,

    dismissReport,

    banUserFromReport,

    deleteReport,

} = require(
    '../controllers/reportController'
);

// ======================================
// APPLY ADMIN PROTECTION
// ======================================

router.use(
    protect,
    authorizeRoles('admin')
);

// ======================================
// REPORT ROUTES
// ======================================

// GET ALL REPORTS

router.get(
    '/',
    getReports
);

// GET REPORT STATS

router.get(
    '/stats',
    getReportStats
);

// CREATE REPORT

router.post(
    '/',
    createReport
);

// RESOLVE REPORT

router.patch(
    '/:id/resolve',
    resolveReport
);

// DISMISS REPORT

router.patch(
    '/:id/dismiss',
    dismissReport
);

// BAN USER

router.patch(
    '/:id/ban',
    banUserFromReport
);

// DELETE REPORT

router.delete(
    '/:id',
    deleteReport
);

// ======================================
// TEST ROUTE
// ======================================

router.get(
    '/test',

    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                'Report routes working successfully',

            admin:
                req.user,
        });
    }
);

// ======================================
// EXPORT ROUTER
// ======================================

module.exports =
    router;