const ActivityLog =
    require('../models/ActivityLog');

// ======================================
// GET ALL ACTIVITY LOGS
// ======================================

exports.getActivityLogs =
    async (req, res) => {

        try {

            const {

                page = 1,

                limit = 10,

                search = '',

                type = '',

                date = '',
            } = req.query;

            const query = {};

            // SEARCH

            if (search) {

                query.$or = [

                    {

                        message: {

                            $regex: search,

                            $options: 'i',
                        },
                    },

                    {

                        user: {

                            $regex: search,

                            $options: 'i',
                        },
                    },
                ];
            }

            // FILTER TYPE

            if (type) {

                query.type =
                    type;
            }

            // FILTER DATE

            if (date) {

                const start =
                    new Date(date);

                start.setHours(
                    0,
                    0,
                    0,
                    0
                );

                const end =
                    new Date(date);

                end.setHours(
                    23,
                    59,
                    59,
                    999
                );

                query.createdAt = {

                    $gte: start,

                    $lte: end,
                };
            }

            const logs =
                await ActivityLog
                    .find(query)

                    .sort({
                        createdAt: -1,
                    })

                    .skip(
                        (page - 1) *
                        limit
                    )

                    .limit(
                        Number(limit)
                    );

            const total =
                await ActivityLog.countDocuments(
                    query
                );

            res.status(200).json({

                success: true,

                total,

                count:
                    logs.length,

                data: logs,
            });

        } catch (error) {

            console.error(
                'GET ACTIVITY LOGS ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to fetch activity logs',
            });
        }
    };

// ======================================
// GET SINGLE ACTIVITY LOG
// ======================================

exports.getActivityLogById =
    async (req, res) => {

        try {

            const log =
                await ActivityLog.findById(
                    req.params.id
                );

            if (!log) {

                return res
                    .status(404)
                    .json({

                        success: false,

                        message:
                            'Activity log not found',
                    });
            }

            res.status(200).json({

                success: true,

                data: log,
            });

        } catch (error) {

            console.error(
                'GET ACTIVITY BY ID ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to fetch activity log',
            });
        }
    };

// ======================================
// CREATE ACTIVITY LOG
// ======================================

exports.createActivityLog =
    async (req, res) => {

        try {

            const {

                user,

                type,

                message,

                severity,

                metadata,
            } = req.body;

            const log =
                await ActivityLog.create({

                    user,

                    type,

                    message,

                    severity,

                    metadata,

                    ipAddress:
                        req.ip,
                });

            res.status(201).json({

                success: true,

                message:
                    'Activity log created',

                data: log,
            });

        } catch (error) {

            console.error(
                'CREATE ACTIVITY ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to create activity log',
            });
        }
    };

// ======================================
// DELETE SINGLE ACTIVITY LOG
// ======================================

exports.deleteActivityLog =
    async (req, res) => {

        try {

            const log =
                await ActivityLog.findById(
                    req.params.id
                );

            if (!log) {

                return res
                    .status(404)
                    .json({

                        success: false,

                        message:
                            'Activity log not found',
                    });
            }

            await log.deleteOne();

            res.status(200).json({

                success: true,

                message:
                    'Activity log deleted successfully',
            });

        } catch (error) {

            console.error(
                'DELETE ACTIVITY ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to delete activity log',
            });
        }
    };

// ======================================
// CLEAR ALL ACTIVITY LOGS
// ======================================

exports.clearAllActivityLogs =
    async (req, res) => {

        try {

            await ActivityLog.deleteMany(
                {}
            );

            res.status(200).json({

                success: true,

                message:
                    'All activity logs cleared',
            });

        } catch (error) {

            console.error(
                'CLEAR ACTIVITY LOGS ERROR:',
                error
            );

            res.status(500).json({

                success: false,

                message:
                    'Failed to clear activity logs',
            });
        }
    };