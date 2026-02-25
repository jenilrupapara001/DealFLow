import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend, FunnelChart, Funnel, LabelList
} from 'recharts';
import {
    Download, Calendar, Filter, TrendingUp, DollarSign, Users, CheckCircle,
    ArrowUpRight, Globe, Layers, Activity
} from 'lucide-react';

const AnalyticsPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/dashboard/analytics');
            setData(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const COLORS = ['#1A73E8', '#34A853', '#FF7A45', '#EA4335', '#FBBC04', '#46BDC6'];

    const formatMonth = (m) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[m - 1];
    };

    const revenueChartData = data?.revenueTrends.map(item => ({
        name: formatMonth(item._id.month),
        revenue: item.revenue
    })) || [];

    const sourceChartData = data?.sourceDistribution.map(item => ({
        name: item._id,
        value: item.count
    })) || [];

    const funnelData = data?.funnel.map(item => ({
        value: item.count,
        name: item.stage,
        fill: COLORS[data.funnel.indexOf(item) % COLORS.length]
    })) || [];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin text-primary">
                        <Activity size={40} />
                    </div>
                    <p className="text-slate-500 font-medium font-inter text-slate-400">Analyzing your business growth...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-slate-500 font-medium">Failed to load analytics. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Advanced Analytics</h1>
                    <p className="text-slate-500 font-medium">Deep insights into your sales velocity and conversion cycles.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Calendar size={18} />
                        <span>Last 12 Months</span>
                    </button>
                    <button className="btn-primary flex items-center space-x-2 shadow-lg shadow-blue-200 px-6">
                        <Download size={18} />
                        <span>Export BI</span>
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue (LTM)', value: `$${(data?.overview.totalRevenue || 0).toLocaleString()}`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Avg. Deal Size', value: `$${(data?.overview.avgDealSize || 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Win Rate', value: `${data?.overview.winRate || 0}%`, icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Active Opportunities', value: data?.funnel[1].count || 0, icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                                <ArrowUpRight size={12} className="mr-1" />
                                12.5%
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Revenue Performance</h3>
                            <p className="text-sm text-slate-500">Trailing 12-month revenue aggregation</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 bg-primary rounded-full"></span>
                                <span className="text-xs font-bold text-slate-500 uppercase">Revenue</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueChartData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#1A73E8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#1A73E8" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" animationDuration={1500} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Conversion Funnel</h3>
                    <p className="text-sm text-slate-500 mb-8">Lead to Closed Won progression</p>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <FunnelChart>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                                <Funnel
                                    dataKey="value"
                                    data={funnelData}
                                    isAnimationActive
                                >
                                    <LabelList position="right" fill="#64748b" stroke="none" dataKey="name" fontSize={11} fontWeight={700} />
                                </Funnel>
                            </FunnelChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Source Distribution */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center space-x-2 mb-8">
                        <Globe size={20} className="text-slate-400" />
                        <h3 className="text-lg font-bold text-slate-900">Distribution by Source</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sourceChartData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sourceChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4">
                            {sourceChartData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                        <span className="text-sm font-bold text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Regional Distribution */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center space-x-2 mb-8">
                        <Layers size={20} className="text-slate-400" />
                        <h3 className="text-lg font-bold text-slate-900">Regional Performance</h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data?.regionDistribution.map(r => ({ name: r._id, count: r.count }))} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={40}>
                                    {data?.regionDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Team Performance Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Team Conversion Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Representative</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Total Deals</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Won Deals</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Win Rate</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Pipeline Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {data?.teamPerformance.map((user, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-bold text-slate-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-center font-bold text-slate-600">{user.totalDeals}</td>
                                    <td className="px-8 py-4 text-center">
                                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold">{user.wonDeals}</span>
                                    </td>
                                    <td className="px-8 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: `${user.winRate}%` }}></div>
                                            </div>
                                            <span className="font-bold text-slate-900">{user.winRate.toFixed(1)}%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-right font-black text-slate-900">
                                        ${user.totalValue.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
