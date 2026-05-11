// models/Announcement.js

const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    emoji: {
      type: String,
      required: true,
      enum: [
        "👍",
        "❤️",
        "🔥",
        "👏",
        "😂",
        "😮",
        "🎉",
      ],
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

const announcementSchema =
  new mongoose.Schema(
    {
      // ==================================
      // BASIC INFO
      // ==================================

      title: {
        type: String,
        required: [
          true,
          "Announcement title is required",
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
          "Announcement message is required",
        ],
        trim: true,
        maxlength: [
          5000,
          "Message cannot exceed 5000 characters",
        ],
      },

      // ==================================
      // SENDER INFO
      // ==================================

      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      senderRole: {
        type: String,
        required: true,
        enum: [
          "faculty",
          "hod",
          "coordinator",
          "admin",
        ],
      },

      // ==================================
      // TARGETING
      // ==================================

      branch: {
        type: String,
        required: true,
        uppercase: true,
        enum: [
          "CSE",
          "ECE",
          "EEE",
          "MECH",
          "CIVIL",
          "IT",
          "AIML",
          "DS",
        ],
        index: true,
      },

      year: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
        index: true,
      },

      section: {
        type: String,
        uppercase: true,
        trim: true,
      },

      // ==================================
      // ATTACHMENTS
      // ==================================

      attachments: [
        {
          fileName: {
            type: String,
            trim: true,
          },

          fileUrl: {
            type: String,
            trim: true,
          },

          fileType: {
            type: String,
            trim: true,
          },

          fileSize: {
            type: Number,
          },
        },
      ],

      // ==================================
      // REACTIONS
      // ==================================

      reactions: [reactionSchema],

      // ==================================
      // ANNOUNCEMENT SETTINGS
      // ==================================

      isPinned: {
        type: Boolean,
        default: false,
        index: true,
      },

      isActive: {
        type: Boolean,
        default: true,
        index: true,
      },

      allowReactions: {
        type: Boolean,
        default: true,
      },

      visibility: {
        type: String,
        enum: [
          "year",
          "section",
          "branch-wide",
        ],
        default: "year",
      },

      // ==================================
      // READ TRACKING
      // ==================================

      viewedBy: [
        {
          user: {
            type:
              mongoose.Schema.Types.ObjectId,
            ref: "User",
          },

          viewedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      // ==================================
      // OPTIONAL TAGS
      // ==================================

      tags: [
        {
          type: String,
          trim: true,
          lowercase: true,
        },
      ],

      // ==================================
      // EXPIRY
      // ==================================

      expiresAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

// ======================================
// INDEXES
// ======================================

announcementSchema.index({
  branch: 1,
  year: 1,
  createdAt: -1,
});

announcementSchema.index({
  sender: 1,
  createdAt: -1,
});

announcementSchema.index({
  isPinned: -1,
  createdAt: -1,
});

// ======================================
// VIRTUAL: REACTION COUNT
// ======================================

announcementSchema.virtual(
  "reactionCount"
).get(function () {
  return this.reactions.length;
});

// ======================================
// VIRTUAL: VIEW COUNT
// ======================================

announcementSchema.virtual(
  "viewCount"
).get(function () {
  return this.viewedBy.length;
});

// ======================================
// ENSURE VIRTUALS IN JSON
// ======================================

announcementSchema.set(
  "toJSON",
  {
    virtuals: true,
  }
);

announcementSchema.set(
  "toObject",
  {
    virtuals: true,
  }
);

// ======================================
// EXPORT MODEL
// ======================================

const Announcement =
  mongoose.model(
    "Announcement",
    announcementSchema
  );

module.exports = Announcement;