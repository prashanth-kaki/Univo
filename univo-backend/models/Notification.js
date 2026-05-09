// models/Notification.js

const mongoose = require("mongoose");

const notificationSchema =
  new mongoose.Schema(
    {
      // ==================================
      // RECEIVER
      // ==================================

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      // ==================================
      // NOTIFICATION CONTENT
      // ==================================

      title: {
        type: String,
        required: [
          true,
          "Notification title is required",
        ],
        trim: true,
        maxlength: [
          200,
          "Title cannot exceed 200 characters",
        ],
      },

      message: {
        type: String,
        required: [
          true,
          "Notification message is required",
        ],
        trim: true,
        maxlength: [
          1000,
          "Message cannot exceed 1000 characters",
        ],
      },

      // ==================================
      // TYPE
      // ==================================

      type: {
        type: String,
        required: true,
        enum: [
          "announcement",
          "circular",
          "task",
          "discussion",
          "chat",
          "resource",
          "forum",
          "buzz",
          "system",
        ],
        index: true,
      },

      // ==================================
      // OPTIONAL REDIRECT LINK
      // ==================================

      link: {
        type: String,
        trim: true,
        default: "",
      },

      // ==================================
      // OPTIONAL IMAGE / ICON
      // ==================================

      image: {
        type: String,
        default: "",
      },

      // ==================================
      // READ STATUS
      // ==================================

      isRead: {
        type: Boolean,
        default: false,
        index: true,
      },

      readAt: {
        type: Date,
      },

      // ==================================
      // SENDER
      // ==================================

      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      senderRole: {
        type: String,
        enum: [
          "student",
          "faculty",
          "hod",
          "coordinator",
          "admin",
        ],
      },

      // ==================================
      // PRIORITY
      // ==================================

      priority: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
          "urgent",
        ],
        default: "medium",
      },

      // ==================================
      // TARGET INFO
      // ==================================

      branch: {
        type: String,
        uppercase: true,
      },

      year: {
        type: Number,
        min: 1,
        max: 4,
      },

      // ==================================
      // RELATED ENTITY
      // ==================================

      relatedId: {
        type:
          mongoose.Schema.Types.ObjectId,
      },

      relatedModel: {
        type: String,
        enum: [
          "Announcement",
          "Circular",
          "Task",
          "Discussion",
          "Message",
          "Resource",
          "Forum",
          "Buzz",
        ],
      },

      // ==================================
      // DELIVERY STATUS
      // ==================================

      delivered: {
        type: Boolean,
        default: false,
      },

      deliveredAt: {
        type: Date,
      },

      // ==================================
      // SOFT DELETE
      // ==================================

      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

// ======================================
// INDEXES
// ======================================

notificationSchema.index({
  user: 1,
  createdAt: -1,
});

notificationSchema.index({
  user: 1,
  isRead: 1,
});

notificationSchema.index({
  type: 1,
  createdAt: -1,
});

notificationSchema.index({
  branch: 1,
  year: 1,
});

// ======================================
// AUTO SET READ TIME
// ======================================

notificationSchema.pre(
  "save",
  function (next) {
    if (
      this.isModified("isRead") &&
      this.isRead
    ) {
      this.readAt = new Date();
    }

    next();
  }
);

// ======================================
// VIRTUAL: TIME AGO
// ======================================

notificationSchema.virtual(
  "timeAgo"
).get(function () {
  const now = new Date();
  const diff =
    Math.floor(
      (now - this.createdAt) / 1000
    );

  if (diff < 60)
    return `${diff} seconds ago`;

  if (diff < 3600)
    return `${Math.floor(
      diff / 60
    )} minutes ago`;

  if (diff < 86400)
    return `${Math.floor(
      diff / 3600
    )} hours ago`;

  return `${Math.floor(
    diff / 86400
  )} days ago`;
});

// ======================================
// INCLUDE VIRTUALS
// ======================================

notificationSchema.set(
  "toJSON",
  {
    virtuals: true,
  }
);

notificationSchema.set(
  "toObject",
  {
    virtuals: true,
  }
);

// ======================================
// EXPORT MODEL
// ======================================

const Notification =
  mongoose.model(
    "Notification",
    notificationSchema
  );

module.exports = Notification;