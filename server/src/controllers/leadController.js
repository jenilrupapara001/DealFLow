const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const count = await Lead.countDocuments({ ...keyword });
    const leads = await Lead.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('assignedTo', 'name email');

    res.json({ leads, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Get lead by ID
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = async (req, res) => {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');

    if (lead) {
        res.json(lead);
    } else {
        res.status(404);
        throw new Error('Lead not found');
    }
};

// @desc    Create a lead
// @route   POST /api/leads
// @access  Private/Admin/Manager
const createLead = async (req, res) => {
    const { name, email, company, phone, region, source } = req.body;

    const lead = new Lead({
        name,
        email,
        company,
        phone,
        region,
        source,
        userId: req.user._id,
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
    const { name, email, company, phone, status, region, assignedTo } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (lead) {
        lead.name = name || lead.name;
        lead.email = email || lead.email;
        lead.company = company || lead.company;
        lead.phone = phone || lead.phone;
        lead.status = status || lead.status;
        lead.region = region || lead.region;
        lead.assignedTo = assignedTo || lead.assignedTo;

        const updatedLead = await lead.save();
        res.json(updatedLead);
    } else {
        res.status(404);
        throw new Error('Lead not found');
    }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
const deleteLead = async (req, res) => {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
        await lead.deleteOne();
        res.json({ message: 'Lead removed' });
    } else {
        res.status(404);
        throw new Error('Lead not found');
    }
};

// @desc    Bulk update/delete leads
// @route   POST /api/leads/bulk
// @access  Private
const bulkUpdateLeads = async (req, res) => {
    const { leadIds, action, data } = req.body;

    if (!Array.isArray(leadIds) || leadIds.length === 0) {
        res.status(400);
        throw new Error('No leads selected');
    }

    if (action === 'delete') {
        await Lead.deleteMany({ _id: { $in: leadIds } });
        res.json({ message: 'Leads removed' });
    } else if (action === 'update') {
        await Lead.updateMany({ _id: { $in: leadIds } }, { $set: data });
        res.json({ message: 'Leads updated' });
    } else {
        res.status(400);
        throw new Error('Invalid action');
    }
};

// @desc    Get all leads for export
// @route   GET /api/leads/export
// @access  Private
const getLeadsForExport = async (req, res) => {
    const leads = await Lead.find({}).populate('assignedTo', 'name email');
    res.json(leads);
};

module.exports = {
    getLeads,
    getLeadById,
    createLead,
    updateLead,
    deleteLead,
    bulkUpdateLeads,
    getLeadsForExport,
};
