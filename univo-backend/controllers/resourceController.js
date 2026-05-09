// controllers/resourceController.js

exports.createResource = async (
    req,
    res
) => {
    res.status(201).json({
        success: true,
        message:
            "Resource created successfully",
    });
};

exports.getResources = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: [],
    });
};

exports.getResourceById = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: {},
    });
};

exports.updateResource = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Resource updated successfully",
    });
};

exports.deleteResource = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Resource deleted successfully",
    });
};