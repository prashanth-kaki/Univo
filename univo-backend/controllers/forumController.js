// controllers/forumController.js

exports.createForumPost = async (
    req,
    res
) => {
    res.status(201).json({
        success: true,
        message:
            "Forum post created successfully",
    });
};

exports.getForumPosts = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: [],
    });
};

exports.getForumPostById = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: {},
    });
};

exports.updateForumPost = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Forum post updated successfully",
    });
};

exports.deleteForumPost = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Forum post deleted successfully",
    });
};