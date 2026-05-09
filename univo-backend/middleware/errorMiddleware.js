// middleware/errorMiddleware.js

// ======================================
// GLOBAL ERROR HANDLER
// ======================================

const errorMiddleware = (
    err,
    req,
    res,
    next
) => {
    console.error("GLOBAL ERROR:", err);

    // ==================================
    // DEFAULT ERROR VALUES
    // ==================================

    let statusCode = err.statusCode || 500;

    let message =
        err.message || "Internal Server Error";

    // ==================================
    // MONGOOSE INVALID OBJECT ID
    // ==================================

    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // ==================================
    // MONGOOSE DUPLICATE KEY
    // ==================================

    if (err.code === 11000) {
        const duplicateField = Object.keys(
            err.keyValue
        )[0];

        statusCode = 409;

        message = `${duplicateField} already exists`;
    }

    // ==================================
    // MONGOOSE VALIDATION ERROR
    // ==================================

    if (err.name === "ValidationError") {
        const errors = Object.values(
            err.errors
        ).map((val) => val.message);

        statusCode = 400;

        return res.status(statusCode).json({
            success: false,
            message: "Validation failed",
            errors,
        });
    }

    // ==================================
    // JWT INVALID TOKEN
    // ==================================

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    // ==================================
    // JWT TOKEN EXPIRED
    // ==================================

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message =
            "Token expired. Please login again";
    }

    // ==================================
    // MULTER FILE UPLOAD ERRORS
    // ==================================

    if (err.name === "MulterError") {
        statusCode = 400;

        if (
            err.code === "LIMIT_FILE_SIZE"
        ) {
            message =
                "File size exceeds allowed limit";
        } else {
            message = err.message;
        }
    }

    // ==================================
    // FINAL RESPONSE
    // ==================================

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV ===
            "development" && {
            stack: err.stack,
        }),
    });
};

module.exports = errorMiddleware;