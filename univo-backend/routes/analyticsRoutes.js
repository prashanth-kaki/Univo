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

    getOverviewAnalytics,

    getUserGrowthAnalytics,

    getDepartmentAnalytics,

    getContentDistributionAnalytics,

    getPeakActivityAnalytics,

    exportAnalyticsReport,

} = require(
    '../controllers/analyticsController'
);

// ======================================
// APPLY ADMIN PROTECTION
// ======================================

router.use(
    protect,
    authorizeRoles('admin')
);

// ======================================
// OVERVIEW ANALYTICS
// ======================================

router.get(
    '/overview',
    getOverviewAnalytics
);

// ======================================
// USER GROWTH
// ======================================

router.get(
    '/user-growth',
    getUserGrowthAnalytics
);

// ======================================
// DEPARTMENT ENGAGEMENT
// ======================================

router.get(
    '/department-engagement',
    getDepartmentAnalytics
);

// ======================================
// CONTENT DISTRIBUTION
// ======================================

router.get(
    '/content-distribution',
    getContentDistributionAnalytics
);

// ======================================
// PEAK ACTIVITY
// ======================================

router.get(
    '/peak-activity',
    getPeakActivityAnalytics
);

// ======================================
// EXPORT REPORT
// ======================================

router.get(
    '/export',
    exportAnalyticsReport
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
                'Analytics routes working successfully',

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