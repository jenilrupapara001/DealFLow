const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['draft', 'scheduled', 'sending', 'completed', 'paused'],
            default: 'draft',
        },
        recipients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lead',
            },
        ],
        sentCount: {
            type: Number,
            default: 0,
        },
        openCount: {
            type: Number,
            default: 0,
        },
        clickCount: {
            type: Number,
            default: 0,
        },
        scheduledAt: {
            type: Date,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
