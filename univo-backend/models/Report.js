const mongoose =
    require('mongoose');

// ======================================
// REPORT SCHEMA
// ======================================

const reportSchema =
    new mongoose.Schema(

        {

            // ======================================
            // REPORT TYPE
            // ======================================

            type: {

                type: String,

                enum: [

                    'Post',
                    'Comment',
                    'User Profile',
                    'Resource',
                    'Message',
                ],

                required: true,
            },

            // ======================================
            // TARGET USER
            // ======================================

            targetUser: {

                type: String,

                required: true,
            },

            // ======================================
            // REPORTER
            // ======================================

            reporter: {

                type: String,

                required: true,
            },

            // ======================================
            // REPORT REASON
            // ======================================

            reason: {

                type: String,

                enum: [

                    'Spam',
                    'Harassment',
                    'Fake Identity',
                    'Academic Dishonesty',
                    'Copyright Violation',
                    'Abuse',
                    'Other',
                ],

                default:
                    'Other',
            },

            // ======================================
            // DESCRIPTION
            // ======================================

            description: {

                type: String,

                required: true,

                trim: true,
            },

            // ======================================
            // OPTIONAL EVIDENCE
            // ======================================

            evidence: {

                type: String,

                default: '',
            },

            // ======================================
            // STATUS
            // ======================================

            status: {

                type: String,

                enum: [

                    'pending',
                    'resolved',
                    'dismissed',
                    'banned',
                ],

                default:
                    'pending',
            },

            // ======================================
            // BAN ISSUED
            // ======================================

            banIssued: {

                type: Boolean,

                default: false,
            },

            // ======================================
            // RESOLVED BY
            // ======================================

            resolvedBy: {

                type: mongoose.Schema.Types.ObjectId,

                ref: 'User',

                default: null,
            },

            // ======================================
            // RESOLVED AT
            // ======================================

            resolvedAt: {

                type: Date,

                default: null,
            },
        },

        {

            timestamps: true,
        }
    );

// ======================================
// EXPORT MODEL
// ======================================

module.exports =
    mongoose.model(
        'Report',
        reportSchema
    );