const mongoose = require('mongoose');

const leadSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        company: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        source: {
            type: String,
            enum: ['LinkedIn', 'CSV', 'Manual'],
            default: 'Manual',
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'in-progress', 'closed'],
            default: 'new',
        },
        region: {
            type: String,
            enum: ['US', 'UK', 'UAE', 'Other'],
            default: 'US',
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        importBatchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ImportBatch',
        },
    },
    {
        timestamps: true,
    }
);

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
