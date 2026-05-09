// server.js

require("dotenv").config();

const express = require("express");
const http = require("http");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const path = require("path");

// ======================================
// DATABASE
// ======================================

const connectDB = require("./config/db");

// ======================================
// ERROR HANDLER
// ======================================

const errorHandler = require(
  "./middleware/errorMiddleware"
);

// ======================================
// ROUTES
// ======================================

const authRoutes = require(
  "./routes/auth"
);

const userRoutes = require(
  "./routes/users"
);

const adminRoutes = require(
  "./routes/admin"
);

const announcementRoutes = require(
  "./routes/announcements"
);

const circularRoutes = require(
  "./routes/circulars"
);

const subjectRoutes = require(
  "./routes/subjects"
);

const resourceRoutes = require(
  "./routes/resources"
);

const taskRoutes = require(
  "./routes/tasks"
);

const bookmarkRoutes = require(
  "./routes/bookmarks"
);

const buzzRoutes = require(
  "./routes/buzz"
);

const forumRoutes = require(
  "./routes/forum"
);

// ======================================
// EXPRESS APP
// ======================================

const app = express();

// ======================================
// HTTP SERVER
// ======================================

const server =
  http.createServer(app);

// ======================================
// SECURITY MIDDLEWARE
// ======================================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// ======================================
// CORS
// ======================================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
    ],

    credentials: true,
  })
);

// ======================================
// BODY PARSERS
// ======================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ======================================
// SANITIZE MONGO
// ======================================

app.use(mongoSanitize());

// ======================================
// LOGGING
// ======================================

if (
  process.env.NODE_ENV ===
  "development"
) {
  app.use(morgan("dev"));
}

// ======================================
// RATE LIMITERS
// ======================================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 200,

  message: {
    success: false,

    message:
      "Too many requests. Please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 20,

  message: {
    success: false,

    message:
      "Too many authentication attempts.",
  },
});

// ======================================
// APPLY RATE LIMITS
// ======================================

app.use("/api/", limiter);

app.use(
  "/api/auth/login",
  authLimiter
);

app.use(
  "/api/auth/register",
  authLimiter
);

// ======================================
// STATIC FILES
// ======================================

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

// ======================================
// CONNECT DATABASE
// ======================================

connectDB();

// ======================================
// HEALTH ROUTE
// ======================================

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,

      message:
        "Univo API Running 🚀",

      version: "1.0.0",

      timestamp:
        new Date().toISOString(),
    });
  }
);

// ======================================
// API ROUTES
// ======================================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

app.use(
  "/api/announcements",
  announcementRoutes
);

app.use(
  "/api/circulars",
  circularRoutes
);

app.use(
  "/api/subjects",
  subjectRoutes
);

app.use(
  "/api/resources",
  resourceRoutes
);

app.use("/api/tasks", taskRoutes);

app.use(
  "/api/bookmarks",
  bookmarkRoutes
);

app.use("/api/buzz", buzzRoutes);

app.use("/api/forum", forumRoutes);

// ======================================
// 404 HANDLER
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: `Route ${req.originalUrl} not found`,
  });
});

// ======================================
// GLOBAL ERROR HANDLER
// ======================================

app.use(errorHandler);

// ======================================
// SERVER PORT
// ======================================

const PORT =
  process.env.PORT || 5000;

// ======================================
// START SERVER
// ======================================

server.listen(PORT, () => {
  console.log(
    `\n🚀 Univo Server running on port ${PORT}`
  );

  console.log(
    `📡 Environment: ${process.env.NODE_ENV ||
    "development"
    }`
  );

  console.log(
    `🔗 Health: http://localhost:${PORT}/api/health\n`
  );
});

// ======================================
// GRACEFUL SHUTDOWN
// ======================================

process.on("SIGTERM", () => {
  console.log(
    "SIGTERM received. Shutting down gracefully..."
  );

  server.close(() =>
    process.exit(0)
  );
});

// ======================================
// HANDLE UNHANDLED REJECTIONS
// ======================================

process.on(
  "unhandledRejection",
  (err) => {
    console.error(
      "Unhandled Rejection:",
      err.message
    );
  }
);

module.exports = {
  app,
  server,
};