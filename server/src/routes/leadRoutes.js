const express = require('express');
const router = express.Router();
const {
    getLeads,
    getLeadById,
    createLead,
    updateLead,
    deleteLead,
    bulkUpdateLeads,
    getLeadsForExport,
} = require('../controllers/leadController');
const {
    importLeadsFromFile,
    importLeadsFromLinkedIn,
} = require('../controllers/importController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/import/file', protect, authorize('admin', 'manager'), importLeadsFromFile);
router.post('/import/linkedin', protect, authorize('admin', 'manager'), importLeadsFromLinkedIn);
router.post('/bulk', protect, bulkUpdateLeads);
router.get('/export', protect, getLeadsForExport);


router.route('/')
    .get(protect, getLeads)
    .post(protect, authorize('admin', 'manager', 'sales'), createLead);

router.route('/:id')
    .get(protect, getLeadById)
    .put(protect, updateLead)
    .delete(protect, authorize('admin'), deleteLead);

module.exports = router;
