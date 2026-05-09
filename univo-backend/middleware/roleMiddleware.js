// middleware/roleMiddleware.js

// ======================================
// ROLE-BASED AUTHORIZATION MIDDLEWARE
// ======================================

exports.authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // ==================================
            // CHECK AUTH USER EXISTS
            // ==================================

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message:
                        "Unauthorized access. User not authenticated",
                });
            }

            // ==================================
            // CHECK ROLE ACCESS
            // ==================================

            if (
                !allowedRoles.includes(req.user.role)
            ) {
                return res.status(403).json({
                    success: false,
                    message: `Access denied. Role '${req.user.role}' is not allowed to access this resource`,
                });
            }

            next();
        } catch (error) {
            console.error(
                "ROLE MIDDLEWARE ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Server error during role authorization",
                error: error.message,
            });
        }
    };
};

// ======================================
// OPTIONAL HELPER MIDDLEWARES
// ======================================

// Admin only
exports.adminOnly = exports.authorizeRoles(
    "admin"
);

// HOD only
exports.hodOnly = exports.authorizeRoles(
    "hod"
);

// Faculty only
exports.facultyOnly =
    exports.authorizeRoles("faculty");

// Student only
exports.studentOnly =
    exports.authorizeRoles("student");

// Faculty + HOD
exports.facultyOrHod =
    exports.authorizeRoles(
        "faculty",
        "hod"
    );

// Coordinator + Admin
exports.coordinatorOrAdmin =
    exports.authorizeRoles(
        "coordinator",
        "admin"
    );

// All academic staff
exports.academicStaff =
    exports.authorizeRoles(
        "faculty",
        "hod",
        "coordinator",
        "admin"
    );