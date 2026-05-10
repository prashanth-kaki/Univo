// middleware/roleMiddleware.js

// ======================================
// ROLE-BASED AUTHORIZATION MIDDLEWARE
// ======================================

exports.authorizeRoles =
    (...allowedRoles) => {

        return (
            req,
            res,
            next
        ) => {

            try {

                // ==================================
                // CHECK USER AUTHENTICATION
                // ==================================

                if (!req.user) {

                    return res
                        .status(401)
                        .json({
                            success: false,

                            message:
                                'Unauthorized access. User not authenticated',
                        });
                }

                // ==================================
                // SUPERADMIN BYPASS
                // ==================================

                if (
                    req.user.role ===
                    'superadmin'
                ) {

                    return next();
                }

                // ==================================
                // CHECK ROLE ACCESS
                // ==================================

                if (
                    !allowedRoles.includes(
                        req.user.role
                    )
                ) {

                    return res
                        .status(403)
                        .json({
                            success: false,

                            message:
                                `Access denied. Role '${req.user.role}' is not allowed to access this resource`,
                        });
                }

                next();

            } catch (error) {

                console.error(
                    'ROLE MIDDLEWARE ERROR:',
                    error
                );

                return res
                    .status(500)
                    .json({
                        success: false,

                        message:
                            'Server error during role authorization',

                        error:
                            error.message,
                    });
            }
        };
    };

// ======================================
// PERMISSION-BASED AUTHORIZATION
// ======================================

exports.authorizePermissions =
    (...requiredPermissions) => {

        return (
            req,
            res,
            next
        ) => {

            try {

                if (!req.user) {

                    return res
                        .status(401)
                        .json({
                            success: false,

                            message:
                                'Unauthorized access',
                        });
                }

                // SUPERADMIN FULL ACCESS

                if (
                    req.user.role ===
                    'superadmin'
                ) {

                    return next();
                }

                const userPermissions =
                    req.user.permissions ||
                    [];

                const hasPermission =
                    requiredPermissions.some(
                        (
                            permission
                        ) =>
                            userPermissions.includes(
                                permission
                            )
                    );

                if (
                    !hasPermission
                ) {

                    return res
                        .status(403)
                        .json({
                            success: false,

                            message:
                                'Insufficient permissions to access this resource',
                        });
                }

                next();

            } catch (error) {

                console.error(
                    'PERMISSION MIDDLEWARE ERROR:',
                    error
                );

                return res
                    .status(500)
                    .json({
                        success: false,

                        message:
                            'Server error during permission authorization',

                        error:
                            error.message,
                    });
            }
        };
    };

// ======================================
// ROLE HELPERS
// ======================================

// SUPERADMIN ONLY

exports.superAdminOnly =
    exports.authorizeRoles(
        'superadmin'
    );

// ADMIN ONLY

exports.adminOnly =
    exports.authorizeRoles(
        'admin',
        'superadmin'
    );

// HOD ONLY

exports.hodOnly =
    exports.authorizeRoles(
        'hod',
        'admin',
        'superadmin'
    );

// FACULTY ONLY

exports.facultyOnly =
    exports.authorizeRoles(
        'faculty',
        'admin',
        'superadmin'
    );

// STUDENT ONLY

exports.studentOnly =
    exports.authorizeRoles(
        'student'
    );

// COORDINATOR ONLY

exports.coordinatorOnly =
    exports.authorizeRoles(
        'coordinator',
        'admin',
        'superadmin'
    );

// FACULTY + HOD

exports.facultyOrHod =
    exports.authorizeRoles(
        'faculty',
        'hod',
        'admin',
        'superadmin'
    );

// COORDINATOR + ADMIN

exports.coordinatorOrAdmin =
    exports.authorizeRoles(
        'coordinator',
        'admin',
        'superadmin'
    );

// ALL ACADEMIC STAFF

exports.academicStaff =
    exports.authorizeRoles(
        'faculty',
        'hod',
        'coordinator',
        'admin',
        'superadmin'
    );

// MANAGEMENT STAFF

exports.managementStaff =
    exports.authorizeRoles(
        'hod',
        'admin',
        'superadmin'
    );

// ADMIN + HOD

exports.adminOrHod =
    exports.authorizeRoles(
        'admin',
        'hod',
        'superadmin'
    );

// ALL STAFF EXCEPT STUDENTS

exports.staffOnly =
    exports.authorizeRoles(
        'faculty',
        'hod',
        'coordinator',
        'admin',
        'superadmin'
    );