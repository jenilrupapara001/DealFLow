import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import axios from 'axios';

const EditLeadModal = ({ isOpen, onClose, lead, onRefresh, users }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        region: 'US',
        status: 'new',
        assignedTo: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (lead) {
            setFormData({
                name: lead.name || '',
                email: lead.email || '',
                company: lead.company || '',
                phone: lead.phone || '',
                region: lead.region || 'US',
                status: lead.status || 'new',
                assignedTo: lead.assignedTo?._id || lead.assignedTo || ''
            });
        }
    }, [lead]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/api/leads/${lead._id}`, formData);
            onRefresh();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to update lead');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await axios.delete(`/api/leads/${lead._id}`);
                onRefresh();
                onClose();
            } catch (err) {
                console.error(err);
                alert('Failed to delete lead');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-50">
                    <h2 className="text-xl font-bold text-slate-900">Edit Lead Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className="input-field"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                            <select
                                className="input-field"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="proposal">Proposal</option>
                                <option value="negotiation">Negotiation</option>
                                <option value="closed">Closed</option>
                                <option value="lost">Lost</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Region</label>
                            <select
                                className="input-field"
                                value={formData.region}
                                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                            >
                                <option value="US">USA</option>
                                <option value="UK">UK</option>
                                <option value="UAE">UAE</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Assign To</label>
                            <select
                                className="input-field"
                                value={formData.assignedTo}
                                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                            >
                                <option value="">Unassigned</option>
                                {users.map(u => (
                                    <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 flex items-center justify-between border-t border-slate-50">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="flex items-center space-x-2 text-red-500 font-bold hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={18} />
                            <span>Delete Lead</span>
                        </button>
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all"
                            >
                                <Save size={18} />
                                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLeadModal;
