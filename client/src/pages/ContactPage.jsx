import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    MessageSquare,
    Globe,
    MapPin,
    Send,
    CheckCircle2,
    Loader2,
    ArrowLeft,
    Building2,
    X,
    AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await axios.post('/api/inquiries', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary selection:text-white">
            {/* Header */}
            <div className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative">
                    <Link to="/" className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-12 text-sm font-black uppercase tracking-widest group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back Home</span>
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight"
                    >
                        Let's build your <br /><span className="text-primary italic">pipeline together.</span>
                    </motion.h1>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar Info */}
                    <div className="lg:col-span-1 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-3xl shadow-slate-200/50"
                        >
                            <h3 className="text-xl font-black mb-8 border-b border-slate-50 pb-4">Our Presence</h3>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-2">Dealflow HQ</h4>
                                        <p className="font-bold text-slate-900">454 CRM Blvd, Suite 100<br />San Francisco, CA 94103</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-2">Social</h4>
                                        <p className="font-bold text-slate-900">@dealflowhq</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <Building2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-2">Business</h4>
                                        <p className="font-bold text-slate-900">Registered in Delaware, USA</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100/50">
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Enterprise Sales</h4>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                Looking for custom volume or dedicated support? Reach out directly to
                                <span className="text-primary ml-1 underline cursor-pointer">sales@dealflow.com</span>
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 bg-white p-10 md:p-16 rounded-[50px] border border-slate-100 shadow-3xl shadow-slate-200/50 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Mail size={200} /></div>

                        <div className="relative">
                            <h2 className="text-4xl font-black tracking-tight mb-2">Get in touch</h2>
                            <p className="text-slate-500 font-medium mb-12">Average response time: &lt; 2 hours during business hours.</p>

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-200">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Message Received!</h3>
                                        <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10">
                                            Thank you for reaching out. One of our specialists will be in touch shortly via your email.
                                        </p>
                                        <button
                                            onClick={() => setStatus(null)}
                                            className="px-8 py-3 bg-white text-emerald-600 border border-emerald-100 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Your Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="input-field py-4 bg-slate-50/50 border-slate-100 hover:border-primary transition-colors focus:bg-white"
                                                    placeholder="John Wick"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="input-field py-4 bg-slate-50/50 border-slate-100 hover:border-primary transition-colors focus:bg-white"
                                                    placeholder="wick@continental.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Subject</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="input-field py-4 bg-slate-50/50 border-slate-100 hover:border-primary transition-colors focus:bg-white"
                                                placeholder="Requesting a Personalized Demo"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">How can we help?</label>
                                            <textarea
                                                rows="5"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="input-field py-4 bg-slate-50/50 border-slate-100 hover:border-primary transition-colors focus:bg-white resize-none"
                                                placeholder="Tell us about your pipeline challenges..."
                                            ></textarea>
                                        </div>

                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center space-x-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-2xl border border-red-100"
                                            >
                                                <AlertCircle size={18} />
                                                <span>Failed to send message. Please try again or email us directly.</span>
                                            </motion.div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn-primary w-full py-6 text-xl font-black flex items-center justify-center space-x-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:bg-slate-300 transition-all"
                                        >
                                            {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                                            <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-sm font-black uppercase tracking-widest">© 2026 DealFlow Systems Inc. High fidelity always.</p>
            </footer>
        </div>
    );
};

export default ContactPage;
