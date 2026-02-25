import React, { useState, useEffect } from 'react';
import { X, DollarSign, Calendar } from 'lucide-react';
import axios from 'axios';

const AddDealModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        leadId: '',
        dealValue: '',
        stage: 'proposal',
        expectedCloseDate: '',
        notes: ''
    });
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const fetchLeads = async () => {
                try {
                    const { data } = await axios.get('/api/leads');
                    setLeads(data.leads || []);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchLeads();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/deals', formData);
            onRefresh();
            onClose();
            setFormData({ leadId: '', dealValue: '', stage: 'proposal', expectedCloseDate: '', notes: '' });
        } catch (err) {
            console.error(err);
            alert('Failed to add deal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Add New Deal</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Select Lead</label>
                        <select
                            required
                            className="input-field"
                            value={formData.leadId}
                            onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
                        >
                            <option value="">-- Choose a Lead --</option>
                            {leads.map(lead => (
                                <option key={lead._id} value={lead._id}>{lead.name} ({lead.company})</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Deal Value</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="number"
                                    required
                                    className="pl-10 input-field"
                                    placeholder="5000"
                                    value={formData.dealValue}
                                    onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Close Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="date"
                                    className="pl-10 input-field"
                                    value={formData.expectedCloseDate}
                                    onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Pipeline Stage</label>
                        <select
                            className="input-field"
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        >
                            <option value="proposal">Proposal</option>
                            <option value="negotiation">Negotiation</option>
                            <option value="closed-won">Closed Won</option>
                            <option value="closed-lost">Closed Lost</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Notes</label>
                        <textarea
                            className="input-field h-24 pt-2"
                            placeholder="Key requirements, budget, etc."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    <div className="pt-6 flex space-x-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="flex-1 btn-primary py-3 font-bold shadow-lg shadow-blue-200">
                            {loading ? 'Creating...' : 'Create Deal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDealModal;
