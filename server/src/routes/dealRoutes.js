const express = require('express');
const router = express.Router();
const {
    getDeals,
    createDeal,
    updateDeal,
} = require('../controllers/dealController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getDeals)
    .post(protect, createDeal);

router.route('/:id')
    .put(protect, updateDeal);

module.exports = router;
