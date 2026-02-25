import React, { useState, useEffect } from 'react';
import { X, Send, Users, FileText, CheckCircle, AlertCircle, Info } from 'lucide-react';
import axios from 'axios';

const CreateCampaignModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        content: '',
        recipientIds: [],
        status: 'draft',
        scheduledAt: ''
    });
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

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
            await axios.post('/api/campaigns', formData);
            onRefresh();
            onClose();
            setFormData({ name: '', subject: '', content: '', recipientIds: [], status: 'draft', scheduledAt: '' });
            setStep(1);
        } catch (err) {
            console.error(err);
            alert('Failed to create campaign');
        } finally {
            setLoading(false);
        }
    };

    const toggleRecipient = (id) => {
        setFormData(prev => ({
            ...prev,
            recipientIds: prev.recipientIds.includes(id)
                ? prev.recipientIds.filter(i => i !== id)
                : [...prev.recipientIds, id]
        }));
    };

    const selectAllLeads = () => {
        setFormData(prev => ({
            ...prev,
            recipientIds: prev.recipientIds.length === leads.length ? [] : leads.map(l => l._id)
        }));
    };

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Create Campaign</h2>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className={`h-1.5 w-12 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-slate-200'}`}></span>
                            <span className={`h-1.5 w-12 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></span>
                            <span className={`h-1.5 w-12 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-slate-200'}`}></span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-lg text-slate-400 shadow-sm border border-transparent hover:border-slate-100 transition-all">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                                <FileText size={20} className="text-primary" />
                                <span>Campaign Details</span>
                            </h3>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Internal Campaign Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="e.g. Q1 Product Update"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Subject Line</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="Something catchy..."
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Tip: Keep it under 60 characters for best open rates</p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                                    <Users size={20} className="text-primary" />
                                    <span>Select Recipients</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={selectAllLeads}
                                    className="text-xs font-bold text-primary hover:underline"
                                >
                                    {formData.recipientIds.length === leads.length ? 'Deselect All' : 'Select All Leads'}
                                </button>
                            </div>
                            <div className="border border-slate-100 rounded-xl max-h-60 overflow-y-auto divide-y divide-slate-50 bg-slate-50/30">
                                {leads.length === 0 ? (
                                    <div className="p-8 text-center text-slate-400 text-sm italic">No leads available. Please add leads first.</div>
                                ) : (
                                    leads.map(lead => (
                                        <div
                                            key={lead._id}
                                            className={`p-3 flex items-center justify-between cursor-pointer hover:bg-white transition-colors ${formData.recipientIds.includes(lead._id) ? 'bg-white' : ''}`}
                                            onClick={() => toggleRecipient(lead._id)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.recipientIds.includes(lead._id) ? 'bg-primary border-primary' : 'bg-white border-slate-300'}`}>
                                                    {formData.recipientIds.includes(lead._id) && <CheckCircle size={12} className="text-white" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                                                    <p className="text-xs text-slate-500">{lead.email} • {lead.company}</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full font-bold text-slate-500 uppercase">{lead.status}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl flex items-start space-x-3">
                                <Info size={18} className="text-primary mt-0.5" />
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    You have selected <span className="font-bold text-primary">{formData.recipientIds.length}</span> recipient(s) for this campaign.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                                <Send size={20} className="text-primary" />
                                <span>Compose & Schedule</span>
                            </h3>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Content (HTML Supported)</label>
                                <textarea
                                    required
                                    className="input-field h-48 pt-3 font-mono text-sm leading-relaxed"
                                    placeholder="Hello {{name}}, we have exciting news..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Campaign Status</label>
                                    <select
                                        className="input-field"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="scheduled">Scheduled</option>
                                        <option value="sending">Send Immediately</option>
                                    </select>
                                </div>
                                {formData.status === 'scheduled' && (
                                    <div className="animate-in fade-in zoom-in-95 duration-200">
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Schedule Time</label>
                                        <input
                                            type="datetime-local"
                                            required={formData.status === 'scheduled'}
                                            className="input-field"
                                            value={formData.scheduledAt}
                                            onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </form>

                <div className="p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <button
                        type="button"
                        onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                        className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-white transition-colors shadow-sm"
                    >
                        {step === 1 ? 'Cancel' : 'Back'}
                    </button>
                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step + 1)}
                            disabled={step === 1 && !formData.name || step === 2 && formData.recipientIds.length === 0}
                            className="px-8 py-3 btn-primary font-bold shadow-lg shadow-blue-200 disabled:opacity-50"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || !formData.content}
                            className="px-8 py-3 btn-primary font-bold shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center space-x-2"
                        >
                            <Send size={18} />
                            <span>{loading ? 'Creating...' : formData.status === 'sending' ? 'Launch Campaign' : 'Save Campaign'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCampaignModal;
