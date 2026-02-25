import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, TrendingUp, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
        <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-${color}`}>
            <Icon size={24} className={color} />
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                {trend && <span className="text-xs font-bold text-green-500">+{trend}%</span>}
            </div>
        </div>
    </div>
);

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('/api/dashboard/stats');
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const chartData = stats?.pipeline?.length > 0
        ? stats.pipeline.map(p => ({ name: p._id, val: p.totalValue }))
        : [
            { name: 'Proposal', val: 0 },
            { name: 'Negotiation', val: 0 },
            { name: 'Closed Won', val: 0 },
        ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Leads" value={stats?.totalLeads || '0'} icon={Users} color="text-blue-600" />
                <StatCard title="Active Deals" value={stats?.totalDeals || '0'} icon={PieChartIcon} color="text-orange-500" />
                <StatCard title="Revenue (MTD)" value={`$${(stats?.revenueMTD || 0).toLocaleString()}`} icon={DollarSign} color="text-green-600" />
                <StatCard title="Conversion Rate" value={`${stats?.conversionRate || 0}%`} icon={TrendingUp} color="text-purple-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Pipeline Value</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="val" fill="#1A73E8" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {(stats?.recentDeals?.length ? stats.recentDeals : []).map((deal, i) => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
                                        {deal.leadId?.name?.[0] || 'L'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            {deal.leadId?.name || 'Unknown Lead'}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {deal.leadId?.company || 'No Company'} • {deal.stage}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900">
                                        ${deal.dealValue?.toLocaleString() || '0'}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {new Date(deal.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {!stats?.recentDeals?.length && (
                            <p className="text-center text-slate-400 py-12">No recent activity found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
