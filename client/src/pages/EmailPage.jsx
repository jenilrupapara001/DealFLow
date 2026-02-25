import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Send, Clock, BarChart2, Plus, MoreVertical, Trash2, Edit3, CheckCircle, Pause, Play, Users } from 'lucide-react';
import CreateCampaignModal from '../components/email/CreateCampaignModal';

const EmailPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/campaigns');
            setCampaigns(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this campaign?')) return;
        try {
            await axios.delete(`/api/campaigns/${id}`);
            fetchCampaigns();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'paused' ? 'sending' : 'paused';
        try {
            await axios.put(`/api/campaigns/${id}`, { status: newStatus });
            fetchCampaigns();
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'sending': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'completed': return 'bg-green-50 text-green-600 border-green-100';
            case 'paused': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'scheduled': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const stats = {
        active: campaigns.filter(c => c.status === 'sending').length,
        totalSent: campaigns.reduce((acc, c) => acc + (c.sentCount || 0), 0),
        avgOpen: campaigns.length ? (campaigns.reduce((acc, c) => acc + (c.openCount || 0), 0) / (campaigns.reduce((acc, c) => acc + (c.sentCount || 1), 0)) * 100).toFixed(1) : 0
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 leading-tight">Email Automation</h1>
                    <p className="text-slate-500 font-medium">Manage your drip campaigns and high-conversion templates.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center space-x-2 shadow-lg shadow-blue-200">
                    <Plus size={18} />
                    <span>Create Campaign</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Send size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Campaigns</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.active}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-50 rounded-xl text-green-600">
                            <BarChart2 size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Emails Sent</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.totalSent.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. Open Rate</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.avgOpen}%</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Campaign History</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Campaign Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Recipients</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Performance</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400">Loading campaigns...</td></tr>
                            ) : campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <Mail size={48} className="text-slate-200 mb-3" />
                                            <p className="text-slate-400 font-medium">No campaigns found. Start by creating one!</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : campaigns.map(campaign => (
                                <tr key={campaign._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{campaign.name}</p>
                                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{campaign.subject}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(campaign.status)}`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Users size={14} className="text-slate-400" />
                                            <span className="text-sm font-bold text-slate-700">{campaign.recipients?.length || 0}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                                                <span>Opens</span>
                                                <span>{campaign.sentCount > 0 ? ((campaign.openCount / campaign.sentCount) * 100).toFixed(1) : 0}%</span>
                                            </div>
                                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${campaign.sentCount > 0 ? (campaign.openCount / campaign.sentCount) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                                            <Clock size={14} />
                                            <span>{campaign.scheduledAt ? new Date(campaign.scheduledAt).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => toggleStatus(campaign._id, campaign.status)}
                                                className={`p-2 transition-colors bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-100 ${campaign.status === 'paused' ? 'text-green-500 hover:text-green-600' : 'text-orange-500 hover:text-orange-600'}`}
                                            >
                                                {campaign.status === 'paused' ? <Play size={16} /> : <Pause size={16} />}
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-primary transition-colors bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-100">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(campaign._id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-100">
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-100">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateCampaignModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={fetchCampaigns}
            />
        </div>
    );
};

export default EmailPage;
