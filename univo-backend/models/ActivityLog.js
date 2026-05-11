const mongoose =
    require('mongoose');

// ======================================
// ACTIVITY LOG SCHEMA
// ======================================

const activityLogSchema =
    new mongoose.Schema(

        {

            user: {

                type: String,

                required: true,
            },

            type: {

                type: String,

                required: true,

                enum: [

                    'auth',

                    'user_management',

                    'content_moderation',

                    'system_settings',

                    'reports',

                    'analytics',

                    'general',
                ],
            },

            message: {

                type: String,

                required: true,
            },

            severity: {

                type: String,

                enum: [

                    'low',

                    'medium',

                    'high',
                ],

                default: 'low',
            },

            metadata: {

                type: Object,

                default: {},
            },

            ipAddress: {

                type: String,

                default: '',
            },

            createdAt: {

                type: Date,

                default: Date.now,
            },
        },

        {

            timestamps: true,
        }
    );

// ======================================
// MODEL
// ======================================

module.exports =
    mongoose.model(
        'ActivityLog',
        activityLogSchema
    );