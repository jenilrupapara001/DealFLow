const Lead = require('../models/Lead');
const ImportBatch = require('../models/ImportBatch');
const { parse } = require('csv-parse/sync');

const importLeadsFromFile = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.files.file;
        const records = parse(file.data, {
            columns: true,
            skip_empty_lines: true
        });

        const batch = await ImportBatch.create({
            userId: req.user._id,
            source: 'file',
            status: 'processing',
            totalRows: records.length
        });

        let successCount = 0;
        let failCount = 0;

        for (const record of records) {
            try {
                await Lead.create({
                    userId: req.user._id,
                    name: record.name || record.Name,
                    email: record.email || record.Email,
                    company: record.company || record.Company,
                    phone: record.phone || record.Phone,
                    region: record.region || record.Region || 'US',
                    status: 'new',
                    source: 'CSV',
                    importBatchId: batch._id
                });
                successCount++;
            } catch (err) {
                failCount++;
            }
        }

        batch.status = 'completed';
        batch.successCount = successCount;
        batch.failCount = failCount;
        batch.completedAt = Date.now();
        await batch.save();

        res.status(200).json({
            message: `Import completed: ${successCount} success, ${failCount} failed`,
            batchId: batch._id
        });
    } catch (error) {
        console.error('Import error:', error);
        res.status(500).json({ message: 'Internal Server Error during import' });
    }
};

const importLeadsFromLinkedIn = async (req, res) => {
    // Placeholder for real OAuth integration
    res.status(200).json({ message: 'LinkedIn Social OAuth integration requested. Please configure API credentials.' });
};

module.exports = {
    importLeadsFromFile,
    importLeadsFromLinkedIn
};
