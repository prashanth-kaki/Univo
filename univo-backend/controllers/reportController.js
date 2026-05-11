const Report =
    require('../models/Report');

const User =
    require('../models/User');

// ======================================
// GET ALL REPORTS
// ======================================

const getReports =
    async (req, res) => {

        try {

            const reports =
                await Report.find()

                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                count:
                    reports.length,

                data:
                    reports,
            });

        } catch (error) {

            console.error(
                'GET REPORTS ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to fetch reports',
            });
        }
    };

// ======================================
// GET REPORT STATS
// ======================================

const getReportStats =
    async (req, res) => {

        try {

            const pending =
                await Report.countDocuments({
                    status: 'pending'
                });

            const resolved =
                await Report.countDocuments({
                    status: 'resolved'
                });

            const dismissed =
                await Report.countDocuments({
                    status: 'dismissed'
                });

            const banned =
                await Report.countDocuments({
                    status: 'banned'
                });

            res.status(200).json({

                success: true,

                data: {

                    pending,

                    resolved,

                    dismissed,

                    banned,
                },
            });

        } catch (error) {

            console.error(
                'GET REPORT STATS ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to fetch report stats',
            });
        }
    };

// ======================================
// CREATE REPORT
// ======================================

const createReport =
    async (req, res) => {

        try {

            const {

                type,

                targetUser,

                reporter,

                reason,

                description,

                evidence,

            } = req.body;

            const report =
                await Report.create({

                    type,

                    targetUser,

                    reporter,

                    reason,

                    description,

                    evidence,
                });

            res.status(201).json({

                success: true,

                message:
                    'Report submitted successfully',

                data:
                    report,
            });

        } catch (error) {

            console.error(
                'CREATE REPORT ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to create report',
            });
        }
    };

// ======================================
// RESOLVE REPORT
// ======================================

const resolveReport =
    async (req, res) => {

        try {

            const report =
                await Report.findById(
                    req.params.id
                );

            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        'Report not found',
                });
            }

            report.status =
                'resolved';

            report.resolvedBy =
                req.user._id;

            report.resolvedAt =
                new Date();

            await report.save();

            res.status(200).json({

                success: true,

                message:
                    'Report resolved successfully',

                data:
                    report,
            });

        } catch (error) {

            console.error(
                'RESOLVE REPORT ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to resolve report',
            });
        }
    };

// ======================================
// DISMISS REPORT
// ======================================

const dismissReport =
    async (req, res) => {

        try {

            const report =
                await Report.findById(
                    req.params.id
                );

            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        'Report not found',
                });
            }

            report.status =
                'dismissed';

            report.resolvedBy =
                req.user._id;

            report.resolvedAt =
                new Date();

            await report.save();

            res.status(200).json({

                success: true,

                message:
                    'Report dismissed successfully',

                data:
                    report,
            });

        } catch (error) {

            console.error(
                'DISMISS REPORT ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to dismiss report',
            });
        }
    };

// ======================================
// BAN USER FROM REPORT
// ======================================

const banUserFromReport =
    async (req, res) => {

        try {

            const report =
                await Report.findById(
                    req.params.id
                );

            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        'Report not found',
                });
            }

            const user =
                await User.findOne({

                    email:
                        report.targetUser
                });

            if (user) {

                user.isActive =
                    false;

                user.isBanned =
                    true;

                await user.save();
            }

            report.status =
                'banned';

            report.banIssued =
                true;

            report.resolvedBy =
                req.user._id;

            report.resolvedAt =
                new Date();

            await report.save();

            res.status(200).json({

                success: true,

                message:
                    'User banned successfully',

                data:
                    report,
            });

        } catch (error) {

            console.error(
                'BAN USER ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to ban user',
            });
        }
    };

// ======================================
// DELETE REPORT
// ======================================

const deleteReport =
    async (req, res) => {

        try {

            const report =
                await Report.findById(
                    req.params.id
                );

            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        'Report not found',
                });
            }

            await report.deleteOne();

            res.status(200).json({

                success: true,

                message:
                    'Report deleted successfully',
            });

        } catch (error) {

            console.error(
                'DELETE REPORT ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to delete report',
            });
        }
    };

// ======================================
// EXPORTS
// ======================================

module.exports = {

    getReports,

    getReportStats,

    createReport,

    resolveReport,

    dismissReport,

    banUserFromReport,

    deleteReport,
};