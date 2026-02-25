const Deal = require('../models/Deal');

// @desc    Get all deals
// @route   GET /api/deals
// @access  Private
const getDeals = async (req, res) => {
    const deals = await Deal.find({ userId: req.user._id })
        .populate('leadId', 'name company email')
        .sort('-createdAt');
    res.json(deals);
};

// @desc    Create a deal
// @route   POST /api/deals
// @access  Private
const createDeal = async (req, res) => {
    const { leadId, dealValue, stage, expectedCloseDate, notes } = req.body;

    const deal = new Deal({
        leadId,
        dealValue,
        stage,
        expectedCloseDate,
        notes,
        userId: req.user._id,
    });

    const createdDeal = await deal.save();
    res.status(201).json(createdDeal);
};

// @desc    Update a deal stage/value
// @route   PUT /api/deals/:id
// @access  Private
const updateDeal = async (req, res) => {
    const { dealValue, stage, expectedCloseDate, notes } = req.body;

    const deal = await Deal.findById(req.params.id);

    if (deal) {
        deal.dealValue = dealValue || deal.dealValue;
        deal.stage = stage || deal.stage;
        deal.expectedCloseDate = expectedCloseDate || deal.expectedCloseDate;
        deal.notes = notes || deal.notes;

        const updatedDeal = await deal.save();
        res.json(updatedDeal);
    } else {
        res.status(404);
        throw new Error('Deal not found');
    }
};

module.exports = {
    getDeals,
    createDeal,
    updateDeal,
};
