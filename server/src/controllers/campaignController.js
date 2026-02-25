const Campaign = require('../models/Campaign');
const Lead = require('../models/Lead');

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Private
const getCampaigns = async (req, res) => {
    const campaigns = await Campaign.find({ userId: req.user._id }).sort('-createdAt');
    res.json(campaigns);
};

// @desc    Create a campaign
// @route   POST /api/campaigns
// @access  Private
const createCampaign = async (req, res) => {
    const { name, subject, content, recipientIds, status, scheduledAt } = req.body;

    const campaign = new Campaign({
        name,
        subject,
        content,
        recipients: recipientIds,
        status,
        scheduledAt,
        userId: req.user._id,
    });

    const createdCampaign = await campaign.save();
    res.status(201).json(createdCampaign);
};

// @desc    Update a campaign
// @route   PUT /api/campaigns/:id
// @access  Private
const updateCampaign = async (req, res) => {
    const { name, subject, content, recipientIds, status, scheduledAt } = req.body;

    const campaign = await Campaign.findById(req.params.id);

    if (campaign) {
        campaign.name = name || campaign.name;
        campaign.subject = subject || campaign.subject;
        campaign.content = content || campaign.content;
        campaign.recipients = recipientIds || campaign.recipients;
        campaign.status = status || campaign.status;
        campaign.scheduledAt = scheduledAt || campaign.scheduledAt;

        const updatedCampaign = await campaign.save();
        res.json(updatedCampaign);
    } else {
        res.status(404);
        throw new Error('Campaign not found');
    }
};

// @desc    Delete a campaign
// @route   DELETE /api/campaigns/:id
// @access  Private
const deleteCampaign = async (req, res) => {
    const campaign = await Campaign.findById(req.params.id);

    if (campaign) {
        await campaign.deleteOne();
        res.json({ message: 'Campaign removed' });
    } else {
        res.status(404);
        throw new Error('Campaign not found');
    }
};

module.exports = {
    getCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
};
