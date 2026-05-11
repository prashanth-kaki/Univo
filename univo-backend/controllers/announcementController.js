// controllers/announcementController.js

const Announcement = require("../models/Announcement");
const User = require("../models/User");

// ======================================
// CREATE ANNOUNCEMENT
// ======================================

exports.createAnnouncement = async (
    req,
    res
) => {
    try {

        const {
            title,
            message,
            branch,
            year,
            section,
            visibility,
            tags,
            expiresAt,
        } = req.body;

        // VALIDATION

        if (
            !title ||
            !message ||
            !branch ||
            !year
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, message, branch and year are required",
            });
        }

        // ROLE CHECK

        if (
            ![
                "faculty",
                "hod",
                "coordinator",
                "admin",
            ].includes(req.user.role)
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to create announcements",
            });
        }

        // ATTACHMENTS

        let attachments = [];

        if (
            req.files &&
            req.files.length > 0
        ) {
            attachments = req.files.map(
                (file) => ({
                    fileName:
                        file.originalname,
                    fileUrl:
                        file.path ||
                        file.location,
                    fileType:
                        file.mimetype,
                    fileSize:
                        file.size,
                })
            );
        }

        // CREATE

        const announcement =
            await Announcement.create({
                title,
                message,
                sender:
                    req.user._id,
                senderRole:
                    req.user.role,
                branch,
                year,
                section,
                visibility:
                    visibility ||
                    "year",
                tags:
                    tags || [],
                expiresAt,
                attachments,
                isPinned: false,
            });

        const populatedAnnouncement =
            await Announcement.findById(
                announcement._id
            ).populate(
                "sender",
                "name role profileImage"
            );

        res.status(201).json({
            success: true,
            message:
                "Announcement created successfully",
            data:
                populatedAnnouncement,
        });

    } catch (error) {

        console.error(
            "CREATE ANNOUNCEMENT ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Server error while creating announcement",
            error:
                error.message,
        });
    }
};

// ======================================
// GET ALL ANNOUNCEMENTS
// ======================================

exports.getAnnouncements =
    async (req, res) => {

        try {

            const page =
                parseInt(
                    req.query.page
                ) || 1;

            const limit =
                parseInt(
                    req.query.limit
                ) || 20;

            const skip =
                (page - 1) * limit;

            const search =
                req.query.search ||
                "";

            const filter = {
                isActive: true,
                branch: req.user.branch, // Scope to user's branch for everyone
            };

            // STUDENT FILTERING
            if (req.user.role === "student") {
                filter.year = req.user.year;
                filter.$or = [
                    { targetAudience: 'All Department' },
                    { targetAudience: 'All Students' },
                    { targetAudience: `Year ${req.user.year}` },
                    { targetSection: req.user.section }
                ];
            } else if (req.user.role === "faculty") {
                filter.$or = [
                    { targetAudience: 'All Department' },
                    { targetAudience: 'All Faculty' },
                    { senderRole: 'faculty' } // Include their own or peers
                ];
            }

            // SEARCH

            if (search) {

                filter.$or = [
                    {
                        title: {
                            $regex:
                                search,
                            $options:
                                "i",
                        },
                    },
                    {
                        message: {
                            $regex:
                                search,
                            $options:
                                "i",
                        },
                    },
                ];
            }

            // FETCH

            const announcements =
                await Announcement.find(
                    filter
                )
                    .populate(
                        "sender",
                        "name role profileImage"
                    )
                    .sort({
                        isPinned: -1,
                        createdAt: -1,
                    })
                    .skip(skip)
                    .limit(limit);

            const total =
                await Announcement.countDocuments(
                    filter
                );

            res.status(200).json({
                success: true,
                message:
                    "Announcements fetched successfully",
                currentPage:
                    page,
                totalPages:
                    Math.ceil(
                        total / limit
                    ),
                totalAnnouncements:
                    total,
                data:
                    announcements,
            });

        } catch (error) {

            console.error(
                "GET ANNOUNCEMENTS ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while fetching announcements",
                error:
                    error.message,
            });
        }
    };

// ======================================
// GET SINGLE
// ======================================

exports.getAnnouncementById =
    async (req, res) => {

        try {

            const announcement =
                await Announcement.findById(
                    req.params.id
                )
                    .populate(
                        "sender",
                        "name role profileImage"
                    )
                    .populate(
                        "reactions.user",
                        "name role"
                    );

            if (
                !announcement
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Announcement not found",
                    });
            }

            // TRACK VIEW

            const alreadyViewed =
                announcement.viewedBy.some(
                    (view) =>
                        view.user.toString() ===
                        req.user._id.toString()
                );

            if (
                !alreadyViewed
            ) {

                announcement.viewedBy.push(
                    {
                        user:
                            req.user._id,
                    }
                );

                await announcement.save();
            }

            res.status(200).json({
                success: true,
                message:
                    "Announcement fetched successfully",
                data:
                    announcement,
            });

        } catch (error) {

            console.error(
                "GET ANNOUNCEMENT ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while fetching announcement",
                error:
                    error.message,
            });
        }
    };

// ======================================
// UPDATE
// ======================================

exports.updateAnnouncement =
    async (req, res) => {

        try {

            const announcement =
                await Announcement.findById(
                    req.params.id
                );

            if (
                !announcement
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Announcement not found",
                    });
            }

            // OWNER CHECK

            if (
                announcement.sender.toString() !==
                req.user._id.toString() &&
                req.user.role !==
                "admin"
            ) {
                return res
                    .status(403)
                    .json({
                        success: false,
                        message:
                            "You are not authorized to update this announcement",
                    });
            }

            const updatedAnnouncement =
                await Announcement.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate(
                    "sender",
                    "name role profileImage"
                );

            res.status(200).json({
                success: true,
                message:
                    "Announcement updated successfully",
                data:
                    updatedAnnouncement,
            });

        } catch (error) {

            console.error(
                "UPDATE ANNOUNCEMENT ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while updating announcement",
                error:
                    error.message,
            });
        }
    };

// ======================================
// DELETE
// ======================================

exports.deleteAnnouncement =
    async (req, res) => {

        try {

            const announcement =
                await Announcement.findById(
                    req.params.id
                );

            if (
                !announcement
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Announcement not found",
                    });
            }

            // OWNER CHECK

            if (
                announcement.sender.toString() !==
                req.user._id.toString() &&
                req.user.role !==
                "admin"
            ) {
                return res
                    .status(403)
                    .json({
                        success: false,
                        message:
                            "You are not authorized to delete this announcement",
                    });
            }

            await announcement.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Announcement deleted successfully",
            });

        } catch (error) {

            console.error(
                "DELETE ANNOUNCEMENT ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while deleting announcement",
                error:
                    error.message,
            });
        }
    };

// ======================================
// PIN / UNPIN
// ======================================

exports.togglePinAnnouncement =
    async (req, res) => {

        try {

            const announcement =
                await Announcement.findById(
                    req.params.id
                );

            if (
                !announcement
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Announcement not found",
                    });
            }

            announcement.isPinned =
                !announcement.isPinned;

            await announcement.save();

            res.status(200).json({
                success: true,
                message:
                    announcement.isPinned
                        ? "Announcement pinned"
                        : "Announcement unpinned",
                data:
                    announcement,
            });

        } catch (error) {

            console.error(
                "PIN ANNOUNCEMENT ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while pinning announcement",
                error:
                    error.message,
            });
        }
    };

// ======================================
// SEND NOTIFICATION
// ======================================

exports.sendAnnouncementNotification =
    async (req, res) => {

        try {

            const announcement =
                await Announcement.findById(
                    req.params.id
                );

            if (
                !announcement
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Announcement not found",
                    });
            }

            res.status(200).json({
                success: true,
                message:
                    "Notification sent successfully",
            });

        } catch (error) {

            console.error(
                "NOTIFICATION ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while sending notification",
                error:
                    error.message,
            });
        }
    };

// ======================================
// REACT
// ======================================

exports.reactToAnnouncement =
    async (req, res) => {

        try {

            const {
                emoji,
            } = req.body;

            if (!emoji) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Emoji is required",
                    });
            }

            const announcement =
                await Announcement.findById(
                    req.params.id
                );

            if (
                !announcement
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Announcement not found",
                    });
            }

            // REMOVE OLD

            announcement.reactions =
                announcement.reactions.filter(
                    (reaction) =>
                        reaction.user.toString() !==
                        req.user._id.toString()
                );

            // ADD NEW

            announcement.reactions.push(
                {
                    user:
                        req.user._id,
                    emoji,
                }
            );

            await announcement.save();

            res.status(200).json({
                success: true,
                message:
                    "Reaction added successfully",
                data:
                    announcement.reactions,
            });

        } catch (error) {

            console.error(
                "REACTION ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while reacting to announcement",
                error:
                    error.message,
            });
        }
    };

// ======================================
// REMOVE REACTION
// ======================================

exports.removeReaction =
    async (req, res) => {

        try {

            const announcement =
                await Announcement.findById(
                    req.params.id
                );

            if (
                !announcement
            ) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Announcement not found",
                    });
            }

            announcement.reactions =
                announcement.reactions.filter(
                    (reaction) =>
                        reaction.user.toString() !==
                        req.user._id.toString()
                );

            await announcement.save();

            res.status(200).json({
                success: true,
                message:
                    "Reaction removed successfully",
                data:
                    announcement.reactions,
            });

        } catch (error) {

            console.error(
                "REMOVE REACTION ERROR:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Server error while removing reaction",
                error:
                    error.message,
            });
        }
    };