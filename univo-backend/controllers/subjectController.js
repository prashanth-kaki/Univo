// controllers/subjectController.js

exports.createSubject = async (
    req,
    res
) => {
    res.status(201).json({
        success: true,
        message:
            "Subject created successfully",
    });
};

exports.getSubjects = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: [],
    });
};

exports.getSubjectById = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        data: {},
    });
};

exports.updateSubject = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Subject updated successfully",
    });
};

exports.deleteSubject = async (
    req,
    res
) => {
    res.status(200).json({
        success: true,
        message:
            "Subject deleted successfully",
    });
};