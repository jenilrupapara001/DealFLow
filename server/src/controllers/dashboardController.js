const Lead = require('../models/Lead');
const Deal = require('../models/Deal');

// @desc    Get dashboard metrics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments({ userId: req.user._id });
        const totalDeals = await Deal.countDocuments({ userId: req.user._id });

        // Pipeline aggregation
        const dealPipeline = await Deal.aggregate([
            { $match: { userId: req.user._id } },
            { $group: { _id: '$stage', count: { $sum: 1 }, totalValue: { $sum: '$dealValue' } } },
        ]);

        // Revenue MTD
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const revenueStats = await Deal.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    stage: 'closed-won',
                    createdAt: { $gte: startOfMonth }
                }
            },
            { $group: { _id: null, total: { $sum: '$dealValue' } } }
        ]);

        const revenueMTD = revenueStats.length > 0 ? revenueStats[0].total : 0;

        // Recent Deals
        const recentDeals = await Deal.find({ userId: req.user._id })
            .populate('leadId', 'name company')
            .sort('-createdAt')
            .limit(5);

        res.json({
            totalLeads,
            totalDeals,
            revenueMTD,
            pipeline: dealPipeline,
            recentDeals,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get advanced analytics (Charts, Funnels, Source Distribution)
// @route   GET /api/dashboard/analytics
// @access  Private
const getAdvancedAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Revenue Trends (Last 12 Months)
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);

        const revenueTrends = await Deal.aggregate([
            {
                $match: {
                    userId,
                    stage: 'closed-won',
                    createdAt: { $gte: lastYear }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    revenue: { $sum: "$dealValue" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // 2. Conversion Funnel (Leads -> Deals -> Won)
        const totalLeads = await Lead.countDocuments({ userId });
        const totalDeals = await Deal.countDocuments({ userId });
        const closedWon = await Deal.countDocuments({ userId, stage: 'closed-won' });

        const funnel = [
            { stage: 'Total Leads', count: totalLeads },
            { stage: 'Opportunities (Deals)', count: totalDeals },
            { stage: 'Closed Won', count: closedWon }
        ];

        // 3. Lead Source Distribution
        const sourceDistribution = await Lead.aggregate([
            { $match: { userId } },
            { $group: { _id: "$source", count: { $sum: 1 } } }
        ]);

        // 4. Region Distribution
        const regionDistribution = await Lead.aggregate([
            { $match: { userId } },
            { $group: { _id: "$region", count: { $sum: 1 } } }
        ]);

        // 5. Team/User Performance
        const teamPerformance = await Deal.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: "$assignedTo",
                    totalDeals: { $sum: 1 },
                    wonDeals: {
                        $sum: { $cond: [{ $eq: ["$stage", "closed-won"] }, 1, 0] }
                    },
                    totalValue: { $sum: "$dealValue" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    name: "$userDetails.name",
                    totalDeals: 1,
                    wonDeals: 1,
                    totalValue: 1,
                    winRate: {
                        $multiply: [
                            { $divide: ["$wonDeals", { $cond: [{ $eq: ["$totalDeals", 0] }, 1, "$totalDeals"] }] },
                            100
                        ]
                    }
                }
            }
        ]);

        res.json({
            revenueTrends,
            funnel,
            sourceDistribution,
            regionDistribution,
            teamPerformance,
            overview: {
                totalRevenue: revenueTrends.reduce((acc, curr) => acc + curr.revenue, 0),
                avgDealSize: totalDeals > 0 ? (revenueTrends.reduce((acc, curr) => acc + curr.revenue, 0) / closedWon || 0) : 0,
                winRate: totalDeals > 0 ? ((closedWon / totalDeals) * 100).toFixed(1) : 0
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats, getAdvancedAnalytics };
