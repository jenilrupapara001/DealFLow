const mongoose = require('mongoose');

const dealSchema = mongoose.Schema(
    {
        leadId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Lead',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        dealValue: {
            type: Number,
            required: true,
            default: 0,
        },
        stage: {
            type: String,
            enum: ['proposal', 'negotiation', 'closed-won', 'closed-lost'],
            default: 'proposal',
        },
        expectedCloseDate: {
            type: Date,
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
