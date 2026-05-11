// routes/admin.js

const express =
    require('express');

const router =
    express.Router();

const {
    protect,
} = require('../middleware/auth');

const {
    authorizeRoles,
} = require('../middleware/roleMiddleware');

const {

    getAllUsers,

    getDashboardStats,

    createUser,

    toggleUserStatus,

    updateUserRole,

    banUser,

    deleteUser,

} = require(
    '../controllers/adminController'
);

// ======================================
// APPLY ADMIN PROTECTION
// ======================================

router.use(
    protect,
    authorizeRoles('admin')
);

// ======================================
// DASHBOARD ROUTES
// ======================================

// GET DASHBOARD STATS

router.get(
    '/dashboard-stats',
    getDashboardStats
);

// ======================================
// USER MANAGEMENT ROUTES
// ======================================

// GET ALL USERS

router.get(
    '/users',
    getAllUsers
);

// CREATE USER

router.post(
    '/create-user',
    createUser
);

// TOGGLE ACTIVE/INACTIVE STATUS

router.put(
    '/users/:id/toggle',
    toggleUserStatus
);

// ======================================
// UPDATE USER ROLE
// ======================================

router.patch(
    '/users/:id/role',
    updateUserRole
);

// ======================================
// BAN / UNBAN USER
// ======================================

router.patch(
    '/users/:id/ban',
    banUser
);

// ======================================
// DELETE USER
// ======================================

router.delete(
    '/users/:id',
    deleteUser
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
                'Admin routes working successfully',
            admin:
                req.user,
        });
    }
);

module.exports =
    router;