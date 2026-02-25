import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, Download, Upload, MoreVertical, ExternalLink, CheckSquare, Square, Trash2, Mail, Edit3, UserPlus } from 'lucide-react';
import AddLeadModal from '../components/leads/AddLeadModal';
import EditLeadModal from '../components/leads/EditLeadModal';
import ImportLeadModal from '../components/leads/ImportLeadModal';

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All Status');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/leads?keyword=${searchTerm}`);
            setLeads(data.leads || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/users');
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    useEffect(() => {
        fetchLeads();
        fetchUsers();
    }, [searchTerm]);

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`/api/leads/${id}`, { status });
            fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAssignLead = async (id, assignedTo) => {
        try {
            await axios.put(`/api/leads/${id}`, { assignedTo });
            fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const handleBulkAction = async (action) => {
        if (selectedIds.length === 0) return;

        if (action === 'delete' && !window.confirm(`Are you sure you want to delete ${selectedIds.length} leads?`)) return;

        try {
            await axios.post('/api/leads/bulk', { leadIds: selectedIds, action });
            setSelectedIds([]);
            fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const handleExport = async () => {
        try {
            const { data } = await axios.get('/api/leads/export');
            const headers = ['Name', 'Email', 'Company', 'Phone', 'Region', 'Status', 'Source', 'Assigned To'];
            const csvContent = [
                headers.join(','),
                ...data.map(l => [
                    `"${l.name}"`,
                    `"${l.email}"`,
                    `"${l.company || ''}"`,
                    `"${l.phone || ''}"`,
                    `"${l.region}"`,
                    `"${l.status}"`,
                    `"${l.source}"`,
                    `"${l.assignedTo?.name || 'Unassigned'}"`
                ].join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Export failed:', err);
            alert('Export failed. Please try again.');
        }
    };

    const toggleSelection = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const selectAll = () => {
        setSelectedIds(selectedIds.length === leads.length ? [] : leads.map(l => l._id));
    };

    const filteredLeads = leads.filter(l => filterStatus === 'All Status' || l.status === filterStatus.toLowerCase());

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
                    <p className="text-slate-500">View and manage your acquisition pipeline.</p>
                </div>
                <div className="flex items-center space-x-3">
                    {selectedIds.length > 0 && (
                        <div className="flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-lg animate-in fade-in slide-in-from-top-2">
                            <span className="text-sm font-bold text-slate-700">{selectedIds.length} selected</span>
                            <button onClick={() => handleBulkAction('delete')} className="p-1.5 text-red-500 hover:bg-white rounded-md transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                    <button onClick={handleExport} className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                        <Download size={18} />
                        <span>Export</span>
                    </button>
                    <button onClick={() => setIsImportModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                        <Upload size={18} />
                        <span>Import</span>
                    </button>
                    <button onClick={() => setIsAddModalOpen(true)} className="btn-primary flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add Lead</span>
                    </button>
                </div>
            </div>

            <AddLeadModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onRefresh={fetchLeads}
            />

            <EditLeadModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                lead={selectedLead}
                onRefresh={fetchLeads}
                users={users}
            />

            <ImportLeadModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onRefresh={fetchLeads}
            />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, company, or email..."
                            className="pl-10 input-field"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                            <Filter size={16} />
                            <span>Status:</span>
                            <select
                                className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option>All Status</option>
                                <option>New</option>
                                <option>Contacted</option>
                                <option>Qualified</option>
                                <option>Proposal</option>
                                <option>Negotiation</option>
                                <option>Closed</option>
                                <option>Lost</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 w-10">
                                    <button onClick={selectAll} className="text-slate-400 hover:text-primary transition-colors">
                                        {selectedIds.length === leads.length && leads.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lead Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assignment</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Region</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">Loading leads...</td>
                                </tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">No leads found.</td>
                                </tr>
                            ) : filteredLeads.map((lead) => (
                                <tr key={lead._id} className={`hover:bg-slate-50 transition-colors group ${selectedIds.includes(lead._id) ? 'bg-blue-50/30' : ''}`}>
                                    <td className="px-6 py-4">
                                        <button onClick={() => toggleSelection(lead._id)} className={`${selectedIds.includes(lead._id) ? 'text-primary' : 'text-slate-300'} hover:text-primary transition-colors`}>
                                            {selectedIds.includes(lead._id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer" onClick={() => { setSelectedLead(lead); setIsEditModalOpen(true); }}>{lead.name}</p>
                                            <p className="text-xs text-slate-500">{lead.company} • {lead.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={lead.status}
                                            onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                                            className={`px-2 py-1 rounded-full text-xs font-bold capitalize border-none focus:ring-2 focus:ring-primary/20 cursor-pointer ${lead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                                                lead.status === 'closed' ? 'bg-green-50 text-green-600' :
                                                    lead.status === 'lost' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                                                }`}
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="proposal">Proposal</option>
                                            <option value="negotiation">Negotiation</option>
                                            <option value="closed">Closed</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={lead.assignedTo?._id || lead.assignedTo || ''}
                                                onChange={(e) => handleAssignLead(lead._id, e.target.value)}
                                                className="text-sm text-slate-600 bg-transparent border-b border-transparent hover:border-slate-200 focus:outline-none focus:border-primary transition-all cursor-pointer"
                                            >
                                                <option value="">Unassigned</option>
                                                {users.map(u => (
                                                    <option key={u._id} value={u._id}>{u.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{lead.region}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {lead.source}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setSelectedLead(lead); setIsEditModalOpen(true); }}
                                                className="p-2 text-slate-400 hover:text-primary bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-100 transition-all"
                                                title="Edit Lead"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <a
                                                href={`mailto:${lead.email}`}
                                                className="p-2 text-slate-400 hover:text-primary bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-100 transition-all"
                                                title="Send Email"
                                            >
                                                <Mail size={16} />
                                            </a>
                                            <button className="p-2 text-slate-400 hover:text-primary bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-100 transition-all">
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
        </div>
    );
};

export default LeadsPage;
