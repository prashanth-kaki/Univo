// controllers/taskController.js

exports.createTask = async (
    req,
    res
) => {
    res.status(201).json({
        success: true,
        message:
            "Task created successfully",
    });
};

exports.getTasks = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: [],
    });
};

exports.getTaskById = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: {},
    });
};

exports.updateTask = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Task updated successfully",
    });
};

exports.deleteTask = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Task deleted successfully",
    });
};