// services/notificationService.js

const Notification = require("../models/Notification");
const User = require("../models/User");

// ======================================
// CREATE SINGLE NOTIFICATION
// ======================================

exports.createNotification = async ({
  userId,
  title,
  message,
  type,
  sender = null,
  senderRole = null,
  link = "",
  image = "",
  priority = "medium",
  branch = null,
  year = null,
  relatedId = null,
  relatedModel = null,
  io = null,
}) => {
  try {
    // ==============================
    // VALIDATION
    // ==============================

    if (
      !userId ||
      !title ||
      !message ||
      !type
    ) {
      throw new Error(
        "Missing required notification fields"
      );
    }

    // ==============================
    // CREATE NOTIFICATION
    // ==============================

    const notification =
      await Notification.create({
        user: userId,
        title,
        message,
        type,
        sender,
        senderRole,
        link,
        image,
        priority,
        branch,
        year,
        relatedId,
        relatedModel,
        delivered: true,
        deliveredAt: new Date(),
      });

    // ==============================
    // POPULATE NOTIFICATION
    // ==============================

    const populatedNotification =
      await Notification.findById(
        notification._id
      )
        .populate(
          "user",
          "name email role"
        )
        .populate(
          "sender",
          "name role profileImage"
        );

    // ==============================
    // REALTIME SOCKET EMIT
    // ==============================

    if (io) {
      io.to(userId.toString()).emit(
        "notification:new",
        populatedNotification
      );
    }

    return populatedNotification;
  } catch (error) {
    console.error(
      "CREATE NOTIFICATION ERROR:",
      error
    );

    throw error;
  }
};

// ======================================
// CREATE BULK NOTIFICATIONS
// ======================================

exports.createBulkNotifications =
  async ({
    users,
    title,
    message,
    type,
    sender = null,
    senderRole = null,
    link = "",
    image = "",
    priority = "medium",
    branch = null,
    year = null,
    relatedId = null,
    relatedModel = null,
    io = null,
  }) => {
    try {
      // ============================
      // VALIDATION
      // ============================

      if (
        !users ||
        !Array.isArray(users) ||
        users.length === 0
      ) {
        throw new Error(
          "Users array is required"
        );
      }

      // ============================
      // PREPARE NOTIFICATIONS
      // ============================

      const notifications =
        users.map((userId) => ({
          user: userId,
          title,
          message,
          type,
          sender,
          senderRole,
          link,
          image,
          priority,
          branch,
          year,
          relatedId,
          relatedModel,
          delivered: true,
          deliveredAt: new Date(),
        }));

      // ============================
      // INSERT MANY
      // ============================

      const createdNotifications =
        await Notification.insertMany(
          notifications
        );

      // ============================
      // SOCKET EMIT
      // ============================

      if (io) {
        users.forEach((userId) => {
          io.to(userId.toString()).emit(
            "notification:new",
            {
              title,
              message,
              type,
              priority,
              link,
            }
          );
        });
      }

      return createdNotifications;
    } catch (error) {
      console.error(
        "BULK NOTIFICATION ERROR:",
        error
      );

      throw error;
    }
  };

// ======================================
// SEND BRANCH-YEAR NOTIFICATIONS
// ======================================

exports.notifyBranchYearUsers =
  async ({
    branch,
    year,
    title,
    message,
    type,
    sender = null,
    senderRole = null,
    link = "",
    relatedId = null,
    relatedModel = null,
    io = null,
  }) => {
    try {
      // ============================
      // FETCH TARGET USERS
      // ============================

      const users = await User.find({
        branch,
        year,
        isActive: true,
      }).select("_id");

      const userIds = users.map(
        (user) => user._id
      );

      // ============================
      // CREATE NOTIFICATIONS
      // ============================

      return await exports.createBulkNotifications(
        {
          users: userIds,
          title,
          message,
          type,
          sender,
          senderRole,
          branch,
          year,
          link,
          relatedId,
          relatedModel,
          io,
        }
      );
    } catch (error) {
      console.error(
        "BRANCH-YEAR NOTIFICATION ERROR:",
        error
      );

      throw error;
    }
  };

// ======================================
// MARK SINGLE NOTIFICATION AS READ
// ======================================

exports.markAsRead = async (
  notificationId,
  userId
) => {
  try {
    const notification =
      await Notification.findOne({
        _id: notificationId,
        user: userId,
      });

    if (!notification) {
      throw new Error(
        "Notification not found"
      );
    }

    notification.isRead = true;

    await notification.save();

    return notification;
  } catch (error) {
    console.error(
      "MARK READ ERROR:",
      error
    );

    throw error;
  }
};

// ======================================
// MARK ALL AS READ
// ======================================

exports.markAllAsRead = async (
  userId
) => {
  try {
    await Notification.updateMany(
      {
        user: userId,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    return true;
  } catch (error) {
    console.error(
      "MARK ALL READ ERROR:",
      error
    );

    throw error;
  }
};

// ======================================
// GET USER NOTIFICATIONS
// ======================================

exports.getUserNotifications =
  async ({
    userId,
    page = 1,
    limit = 20,
    unreadOnly = false,
  }) => {
    try {
      const skip = (page - 1) * limit;

      const filter = {
        user: userId,
        isDeleted: false,
      };

      if (unreadOnly) {
        filter.isRead = false;
      }

      const notifications =
        await Notification.find(filter)
          .populate(
            "sender",
            "name role profileImage"
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit);

      const total =
        await Notification.countDocuments(
          filter
        );

      const unreadCount =
        await Notification.countDocuments({
          user: userId,
          isRead: false,
          isDeleted: false,
        });

      return {
        notifications,
        total,
        unreadCount,
        currentPage: page,
        totalPages: Math.ceil(
          total / limit
        ),
      };
    } catch (error) {
      console.error(
        "GET USER NOTIFICATIONS ERROR:",
        error
      );

      throw error;
    }
  };

// ======================================
// DELETE NOTIFICATION
// ======================================

exports.deleteNotification =
  async (
    notificationId,
    userId
  ) => {
    try {
      const notification =
        await Notification.findOne({
          _id: notificationId,
          user: userId,
        });

      if (!notification) {
        throw new Error(
          "Notification not found"
        );
      }

      notification.isDeleted = true;

      await notification.save();

      return true;
    } catch (error) {
      console.error(
        "DELETE NOTIFICATION ERROR:",
        error
      );

      throw error;
    }
  };

// ======================================
// DELETE ALL NOTIFICATIONS
// ======================================

exports.deleteAllNotifications =
  async (userId) => {
    try {
      await Notification.updateMany(
        {
          user: userId,
        },
        {
          isDeleted: true,
        }
      );

      return true;
    } catch (error) {
      console.error(
        "DELETE ALL NOTIFICATIONS ERROR:",
        error
      );

      throw error;
    }
  };