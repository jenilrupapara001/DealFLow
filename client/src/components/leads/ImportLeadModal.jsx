import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const ImportLeadModal = ({ isOpen, onClose, onRefresh }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data } = await axios.post('/api/leads/import/file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult({ success: true, message: data.message });
            setTimeout(() => {
                onRefresh();
                onClose();
                setResult(null);
                setFile(null);
            }, 2000);
        } catch (err) {
            console.error(err);
            setResult({ success: false, message: err.response?.data?.message || 'Failed to import leads' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Import Leads</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                {result ? (
                    <div className={`p-6 rounded-xl flex flex-col items-center text-center space-y-4 ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                        {result.success ? (
                            <CheckCircle size={48} className="text-green-500" />
                        ) : (
                            <AlertCircle size={48} className="text-red-500" />
                        )}
                        <div>
                            <p className={`font-bold ${result.success ? 'text-green-800' : 'text-red-800'}`}>{result.message}</p>
                            {result.success && <p className="text-sm text-green-600 mt-1">Refreshing your list now...</p>}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-primary/50 transition-colors bg-slate-50/50">
                            <div className="p-4 bg-white rounded-full shadow-sm text-primary">
                                <Upload size={32} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-slate-800">Click to upload or drag and drop</p>
                                <p className="text-xs text-slate-500 mt-1">CSV files only (Max. 10MB)</p>
                            </div>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>

                        {file && (
                            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <FileText className="text-primary" size={20} />
                                <span className="text-sm font-medium text-slate-700 truncate flex-1">{file.name}</span>
                                <button type="button" onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        <div className="pt-4 flex space-x-3">
                            <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!file || loading}
                                className="flex-1 btn-primary py-3 font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Importing...' : 'Start Import'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CSV Format Guide</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Ensure your CSV has headers: <code className="bg-white px-1 border border-slate-200 rounded">name</code>, <code className="bg-white px-1 border border-slate-200 rounded">email</code>, <code className="bg-white px-1 border border-slate-200 rounded">company</code>, <code className="bg-white px-1 border border-slate-200 rounded">phone</code>, <code className="bg-white px-1 border border-slate-200 rounded">region</code>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImportLeadModal;
