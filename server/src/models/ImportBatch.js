const mongoose = require('mongoose');

const importBatchSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        source: {
            type: String,
            enum: ['LinkedIn', 'CSV'],
            required: true,
        },
        totalLeads: {
            type: Number,
            default: 0,
        },
        importedLeads: {
            type: Number,
            default: 0,
        },
        failedLeads: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'failed'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const ImportBatch = mongoose.model('ImportBatch', importBatchSchema);

module.exports = ImportBatch;
