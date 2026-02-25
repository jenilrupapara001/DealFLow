const express = require('express');
const router = express.Router();
const {
    getCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
} = require('../controllers/campaignController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCampaigns)
    .post(protect, authorize('admin', 'manager'), createCampaign);

router.route('/:id')
    .put(protect, authorize('admin', 'manager'), updateCampaign)
    .delete(protect, authorize('admin'), deleteCampaign);

module.exports = router;
