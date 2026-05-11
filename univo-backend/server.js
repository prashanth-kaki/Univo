// server.js

require('dotenv').config();

// ======================================
// CORE IMPORTS
// ======================================

const express =
  require('express');

const http =
  require('http');

const path =
  require('path');

// ======================================
// SECURITY + UTILITIES
// ======================================

const cors =
  require('cors');

const helmet =
  require('helmet');

const morgan =
  require('morgan');

const rateLimit =
  require('express-rate-limit');

const mongoSanitize =
  require('express-mongo-sanitize');

const cookieParser =
  require('cookie-parser');

const compression =
  require('compression');

// ======================================
// DATABASE
// ======================================

const connectDB =
  require('./config/db');

// ======================================
// ERROR HANDLER
// ======================================

const errorHandler =
  require(
    './middleware/errorMiddleware'
  );

// ======================================
// ROUTES
// ======================================

const authRoutes =
  require('./routes/auth');

const userRoutes =
  require('./routes/users');

const adminRoutes =
  require('./routes/admin');

const reportRoutes =
  require('./routes/reportRoutes');

const analyticsRoutes =
  require('./routes/analyticsRoutes');

const activityRoutes =
  require('./routes/activityRoutes');

const announcementRoutes =
  require(
    './routes/announcements'
  );

const circularRoutes =
  require(
    './routes/circulars'
  );

const subjectRoutes =
  require(
    './routes/subjects'
  );

const resourceRoutes =
  require(
    './routes/resources'
  );

const taskRoutes =
  require('./routes/tasks');

const bookmarkRoutes =
  require(
    './routes/bookmarks'
  );

const buzzRoutes =
  require('./routes/buzz');

const forumRoutes =
  require('./routes/forum');

const hodRoutes =
  require('./routes/hodRoutes');

// ======================================
// EXPRESS APP
// ======================================

const app =
  express();

// ======================================
// HTTP SERVER
// ======================================

const server =
  http.createServer(app);

// ======================================
// CONNECT DATABASE
// ======================================

connectDB();

// ======================================
// TRUST PROXY
// ======================================

app.set(
  'trust proxy',
  1
);

// ======================================
// SECURITY MIDDLEWARE
// ======================================

app.use(

  helmet({

    crossOriginResourcePolicy:
    {
      policy:
        'cross-origin',
    },
  })
);

// ======================================
// ENABLE COMPRESSION
// ======================================

app.use(
  compression()
);

// ======================================
// CORS CONFIG
// ======================================

app.use(

  cors({

    origin: [

      'http://localhost:3000',

      'http://localhost:3001',

      'http://127.0.0.1:3000',

      'http://127.0.0.1:3001',
    ],

    credentials: true,
  })
);

// ======================================
// COOKIE PARSER
// ======================================

app.use(
  cookieParser()
);

// ======================================
// BODY PARSERS
// ======================================

app.use(

  express.json({

    limit: '10mb',
  })
);

app.use(

  express.urlencoded({

    extended: true,

    limit: '10mb',
  })
);

// ======================================
// SANITIZE REQUESTS
// ======================================

app.use(
  mongoSanitize()
);

// ======================================
// REQUEST LOGGING
// ======================================

if (
  process.env.NODE_ENV ===
  'development'
) {

  app.use(
    morgan('dev')
  );
}

// ======================================
// RATE LIMITERS
// ======================================

const globalLimiter =
  rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 300,

    standardHeaders:
      true,

    legacyHeaders:
      false,

    message: {

      success: false,

      message:
        'Too many requests. Please try again later.',
    },
  });

const authLimiter =
  rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 20,

    standardHeaders:
      true,

    legacyHeaders:
      false,

    message: {

      success: false,

      message:
        'Too many authentication attempts. Try again later.',
    },
  });

const otpLimiter =
  rateLimit({

    windowMs:
      10 * 60 * 1000,

    max: 5,

    message: {

      success: false,

      message:
        'Too many OTP requests. Please wait before trying again.',
    },
  });

// ======================================
// APPLY RATE LIMITERS
// ======================================

app.use(
  '/api/',
  globalLimiter
);

app.use(
  '/api/auth/login',
  authLimiter
);

app.use(
  '/api/auth/register',
  authLimiter
);

app.use(
  '/api/auth/send-register-otp',
  otpLimiter
);

app.use(
  '/api/auth/forgot-password-otp',
  otpLimiter
);

// ======================================
// STATIC FILES
// ======================================

app.use(

  '/uploads',

  express.static(
    path.join(
      __dirname,
      'uploads'
    )
  )
);

// ======================================
// ROOT ROUTE
// ======================================

app.get(
  '/',
  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        'Welcome to Univo API 🚀',
    });
  }
);

// ======================================
// HEALTH CHECK
// ======================================

app.get(
  '/api/health',
  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        'Univo API Running Successfully 🚀',

      environment:
        process.env.NODE_ENV ||
        'development',

      timestamp:
        new Date().toISOString(),

      uptime:
        process.uptime(),
    });
  }
);

// ======================================
// API ROUTES
// ======================================

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/users',
  userRoutes
);

app.use(
  '/api/admin',
  adminRoutes
);

app.use(
  '/api/reports',
  reportRoutes
);

app.use(
  '/api/analytics',
  analyticsRoutes
);

app.use(
  '/api/activity',
  activityRoutes
);

app.use(
  '/api/announcements',
  announcementRoutes
);

app.use(
  '/api/circulars',
  circularRoutes
);

app.use(
  '/api/subjects',
  subjectRoutes
);

app.use(
  '/api/resources',
  resourceRoutes
);

app.use(
  '/api/tasks',
  taskRoutes
);

app.use(
  '/api/bookmarks',
  bookmarkRoutes
);

app.use(
  '/api/buzz',
  buzzRoutes
);

app.use(
  '/api/forum',
  forumRoutes
);

app.use(
  '/api/hod',
  hodRoutes
);

// ======================================
// 404 ROUTE HANDLER
// ======================================

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      message:
        `Route ${req.originalUrl} not found`,
    });
  }
);

// ======================================
// GLOBAL ERROR HANDLER
// ======================================

app.use(
  errorHandler
);

// ======================================
// PORT
// ======================================

const PORT =
  process.env.PORT ||
  5000;

// ======================================
// START SERVER
// ======================================

server.listen(
  PORT,
  () => {

    console.log(
      `\n🚀 Univo Server running on port ${PORT}`
    );

    console.log(
      `📡 Environment: ${process.env.NODE_ENV ||
      'development'
      }`
    );

    console.log(
      `🔗 API Health: http://localhost:${PORT}/api/health\n`
    );
  }
);

// ======================================
// HANDLE UNHANDLED REJECTIONS
// ======================================

process.on(
  'unhandledRejection',

  (err) => {

    console.error(
      'UNHANDLED REJECTION:',
      err
    );

    server.close(
      () =>
        process.exit(1)
    );
  }
);

// ======================================
// HANDLE UNCAUGHT EXCEPTIONS
// ======================================

process.on(
  'uncaughtException',

  (err) => {

    console.error(
      'UNCAUGHT EXCEPTION:',
      err
    );

    process.exit(1);
  }
);

// ======================================
// GRACEFUL SHUTDOWN
// ======================================

process.on(
  'SIGTERM',

  () => {

    console.log(
      'SIGTERM RECEIVED. Shutting down gracefully...'
    );

    server.close(
      () => {

        console.log(
          'Process terminated.'
        );

        process.exit(0);
      }
    );
  }
);

// ======================================
// EXPORTS
// ======================================

module.exports = {
  app,
  server,
};