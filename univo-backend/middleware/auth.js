// middleware/auth.js

const jwt =
  require('jsonwebtoken');

const User =
  require('../models/User');

// ======================================
// PROTECT MIDDLEWARE
// ======================================

const protect =
  async (
    req,
    res,
    next
  ) => {

    try {

      let token;

      // ==================================
      // GET TOKEN
      // ==================================

      if (

        req.headers.authorization &&

        req.headers.authorization.startsWith(
          'Bearer'
        )
      ) {

        token =
          req.headers.authorization.split(
            ' '
          )[1];
      }

      // ==================================
      // TOKEN CHECK
      // ==================================

      if (!token) {

        return res
          .status(401)
          .json({
            success: false,

            message:
              'Not authorized. No token provided.',
          });
      }

      // ==================================
      // VERIFY TOKEN
      // ==================================

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      // ==================================
      // FIND USER
      // ==================================

      const user =
        await User.findById(
          decoded.id
        ).select(
          '-password'
        );

      // ==================================
      // USER EXISTS?
      // ==================================

      if (!user) {

        return res
          .status(401)
          .json({
            success: false,

            message:
              'User not found',
          });
      }

      // ==================================
      // ACCOUNT ACTIVE?
      // ==================================

      if (
        !user.isActive
      ) {

        return res
          .status(403)
          .json({
            success: false,

            message:
              'Your account has been deactivated',
          });
      }

      // ==================================
      // ACCOUNT DELETED?
      // ==================================

      if (
        user.isDeleted
      ) {

        return res
          .status(403)
          .json({
            success: false,

            message:
              'This account no longer exists',
          });
      }

      // ==================================
      // PASSWORD CHANGED AFTER TOKEN?
      // ==================================

      if (
        user.changedPasswordAfter &&
        user.changedPasswordAfter(
          decoded.iat
        )
      ) {

        return res
          .status(401)
          .json({
            success: false,

            message:
              'Password recently changed. Please login again.',
          });
      }

      // ==================================
      // ACCOUNT LOCKED?
      // ==================================

      if (
        user.isLocked
      ) {

        return res
          .status(423)
          .json({
            success: false,

            message:
              'Account temporarily locked due to multiple failed login attempts',
          });
      }

      // ==================================
      // UPDATE LAST ACTIVE
      // ==================================

      user.lastActive =
        new Date();

      await user.save({
        validateBeforeSave:
          false,
      });

      // ==================================
      // ATTACH USER
      // ==================================

      req.user = user;

      next();

    } catch (error) {

      console.error(
        'AUTH ERROR:',
        error
      );

      return res
        .status(401)
        .json({
          success: false,

          message:
            'Not authorized. Invalid token.',
        });
    }
  };

// ======================================
// AUTHORIZE ROLES
// ======================================

const authorize =
  (...roles) => {

    return (
      req,
      res,
      next
    ) => {

      if (
        !req.user
      ) {

        return res
          .status(401)
          .json({
            success: false,

            message:
              'Authentication required',
          });
      }

      if (
        !roles.includes(
          req.user.role
        )
      ) {

        return res
          .status(403)
          .json({
            success: false,

            message:
              `Role '${req.user.role}' is not authorized to access this resource`,
          });
      }

      next();
    };
  };

// ======================================
// OPTIONAL PERMISSION MIDDLEWARE
// ======================================

const authorizePermissions =
  (...permissions) => {

    return (
      req,
      res,
      next
    ) => {

      if (
        !req.user
      ) {

        return res
          .status(401)
          .json({
            success: false,

            message:
              'Authentication required',
          });
      }

      // SUPERADMIN BYPASS

      if (
        req.user.role ===
        'superadmin'
      ) {

        return next();
      }

      const hasPermission =
        permissions.some(
          (
            permission
          ) =>
            req.user.permissions?.includes(
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
              'Insufficient permissions',
          });
      }

      next();
    };
  };

// ======================================
// EXPORTS
// ======================================

module.exports = {

  protect,

  authorize,

  authorizePermissions,
};