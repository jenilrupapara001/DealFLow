import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layout,
    Zap,
    BarChart3,
    Send,
    Users,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    ChevronRight,
    Star,
    MousePointer2,
    PieChart,
    Target,
    Layers,
    Globe,
    Building2,
    Check,
    HelpCircle,
    Mail,
    Plus,
    X
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const features = [
        {
            icon: <Users className="text-blue-500" size={24} />,
            title: "Lead Intelligence",
            desc: "Centralize your pipeline. Track every interaction and never let a prospect go cold.",
            color: "bg-blue-500/10",
            size: "col-span-2 row-span-1"
        },
        {
            icon: <Zap className="text-amber-500" size={24} />,
            title: "Lightning Pursuit",
            desc: "Follow up in seconds, not hours.",
            color: "bg-amber-500/10",
            size: "col-span-1 row-span-1"
        },
        {
            icon: <BarChart3 className="text-emerald-500" size={24} />,
            title: "Live Analytics",
            desc: "Real-time revenue visualization.",
            color: "bg-emerald-500/10",
            size: "col-span-1 row-span-2"
        },
        {
            icon: <Send className="text-indigo-500" size={24} />,
            title: "Outreach 2.0",
            desc: "AI-driven automated sequences.",
            color: "bg-indigo-500/10",
            size: "col-span-2 row-span-1"
        },
    ];

    const pricing = [
        {
            name: "Starter",
            price: "$0",
            desc: "For solo founders and small teams.",
            features: ["Up to 100 leads", "Basic Pipeline", "Email sequences", "Community Support"],
            cta: "Get Started",
            highlight: false
        },
        {
            name: "Professional",
            price: "$49",
            desc: "Everything you need to scale revenue.",
            features: ["Unlimited leads", "Advanced Analytics", "Custom stages", "Priority Support", "AI Assistant"],
            cta: "Try Professional",
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            desc: "Advanced security and dedicated support.",
            features: ["SSO/SAML", "Unlimited teams", "Audit logs", "Dedicated Account Manager", "White-labeling"],
            cta: "Contact Sales",
            highlight: false
        }
    ];

    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Head of Sales at TechStream",
            content: "DealFlow revolutionized our pipeline visibility. We increased our conversion rate by 34% in just two months.",
            avatar: "https://i.pravatar.cc/100?u=sarah"
        },
        {
            name: "Marcus Chen",
            role: "Founder, GrowthOps",
            content: "The analytics engine is breathtaking. It's the first CRM that actually understands our revenue funnel.",
            avatar: "https://i.pravatar.cc/100?u=marcus"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-white overflow-x-hidden">
            {/* Nav */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-8'}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:rotate-6 transition-transform">
                            <Layout size={24} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-900">DealFLow</span>
                    </div>

                    <div className="hidden lg:flex items-center space-x-10 text-sm font-black text-slate-500 uppercase tracking-widest">
                        <a href="#features" className="hover:text-primary transition-colors">Platform</a>
                        <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
                        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                        <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link to="/login" className="hidden sm:block text-sm font-black text-slate-700 hover:text-primary uppercase tracking-widest transition-colors">Log In</Link>
                        <Link to="/contact" className="btn-primary px-8 py-3 text-sm font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">Contact Us</Link>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 lg:pt-64 lg:pb-40">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center space-x-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-8"
                            >
                                <Zap size={14} fill="currentColor" />
                                <span>Built for winners</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.85] text-slate-900 mb-8"
                            >
                                Stop guessing.<br /><span className="text-primary italic">Start closing.</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12"
                            >
                                DealFLow is the high-fidelity sales platform that gives your team the velocity they deserve. Automate your operations, visualize your impact, and exceed your goals.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16"
                            >
                                <button onClick={() => navigate('/login')} className="btn-primary w-full sm:w-auto px-12 py-6 text-xl font-black group shadow-3xl shadow-primary/30">
                                    <span>Enter the Dashboard</span>
                                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                                </button>
                                <div className="flex items-center space-x-2 text-slate-400 font-bold ml-4">
                                    <ShieldCheck size={20} className="text-primary" />
                                    <span>Instant Access</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex items-center justify-center lg:justify-start space-x-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            >
                                <div className="flex items-center space-x-2"><Building2 size={24} /> <span className="font-black text-lg">HYPER</span></div>
                                <div className="flex items-center space-x-2"><Target size={24} /> <span className="font-black text-lg">QUANT</span></div>
                                <div className="flex items-center space-x-2"><Globe size={24} /> <span className="font-black text-lg">NEXUS</span></div>
                            </motion.div>
                        </div>

                        {/* Visual Asset */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: 20, rotateX: 5 }}
                            animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
                            transition={{ duration: 1.2, delay: 0.4 }}
                            className="flex-1 w-full relative perspective-[1000px]"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-blue-500/20 to-indigo-500/20 rounded-[40px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="relative bg-white border border-slate-200 rounded-[32px] shadow-3xl overflow-hidden p-3 transform-gpu hover:-translate-y-2 transition-transform duration-500">
                                    <div className="bg-slate-50 min-h-[500px] rounded-[24px] border border-slate-100 flex overflow-hidden">
                                        <div className="w-16 border-r border-slate-200/50 p-4 space-y-6 flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-xl bg-primary shadow-lg shadow-primary/20" />
                                            <div className="w-8 h-8 rounded-lg bg-slate-200" />
                                            <div className="w-8 h-8 rounded-lg bg-slate-200" />
                                            <div className="w-8 h-8 rounded-lg bg-slate-200" />
                                        </div>
                                        <div className="flex-1 p-8">
                                            <div className="flex justify-between items-center mb-10">
                                                <div className="space-y-2">
                                                    <div className="h-2 w-32 bg-slate-200 rounded" />
                                                    <div className="h-8 w-64 bg-slate-900 rounded-lg animate-pulse" />
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-slate-200" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="h-40 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                                                    <div className="flex justify-between items-end h-full">
                                                        {[30, 70, 45, 90, 60].map((h, i) => (
                                                            <div key={i} className="w-4 bg-primary/20 rounded-t-xs" style={{ height: `${h}%` }} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="h-40 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                                                    <div className="h-3 w-1/2 bg-slate-100 rounded" />
                                                    <div className="h-3 w-3/4 bg-slate-100 rounded" />
                                                    <div className="h-3 w-1/3 bg-slate-100 rounded" />
                                                </div>
                                            </div>
                                            <div className="mt-8 h-32 bg-primary/5 rounded-3xl border border-primary/10 p-6 overflow-hidden">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                                                        <Plus size={20} className="text-primary" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="h-2 w-24 bg-primary/20 rounded" />
                                                        <div className="h-4 w-48 bg-primary/40 rounded" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating UI cards */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-10 -right-10 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-48 z-10"
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white"><Check size={16} /></div>
                                        <span className="text-xs font-black uppercase text-slate-400">Deal Won</span>
                                    </div>
                                    <div className="text-xl font-black text-slate-900">$12,400</div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 15, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute -bottom-10 -left-10 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-48 z-10"
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"><Users size={16} /></div>
                                        <span className="text-xs font-black uppercase text-slate-400">New Lead</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-blue-500 w-2/3" />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section id="features" className="py-24 lg:py-48">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8">Precision-engineered for growth.</motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-slate-500 font-medium">Unlike generic CRMs, DealFLow is optimized for the actual workflows of high-growth sales teams.</motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`${f.size} bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 ${f.color} rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000`} />
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                        {f.icon}
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 mb-4">{f.title}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>

                                    <div className="mt-10 flex items-center text-primary text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                                        <span>Explore Feature</span>
                                        <ChevronRight size={14} className="ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Visual Sections */}
            <section id="solutions" className="py-24 lg:py-48 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/10 rounded-full text-white text-xs font-black uppercase tracking-widest mb-8">
                            <PieChart size={14} />
                            <span>Data-Driven Control</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10">Analytics that actually teach.</h2>

                        <div className="space-y-12">
                            {[
                                { title: "Cohort Analysis", desc: "Understand exactly how your segments perform over time.", icon: <Target className="text-primary" /> },
                                { title: "Funnel Velocity", desc: "Identify bottlenecks where leads are dropping off.", icon: <Zap className="text-amber-400" /> },
                                { title: "Team Performance", desc: "Automated leaderboards and activity tracking.", icon: <Users className="text-blue-400" /> }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                    className="flex items-start space-x-6 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black mb-2">{item.title}</h4>
                                        <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="bg-slate-800 border border-slate-700 rounded-[40px] p-8 shadow-4xl relative overflow-hidden">
                            {/* Mock Chart UI */}
                            <div className="flex justify-between items-center mb-12">
                                <div className="space-y-2">
                                    <div className="h-2 w-24 bg-slate-700 rounded" />
                                    <div className="text-3xl font-black">$244k <span className="text-sm text-emerald-400 font-bold tracking-tight">+12%</span></div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary" />
                                    <div className="w-8 h-8 rounded-lg bg-slate-700" />
                                </div>
                            </div>
                            <div className="flex items-end space-x-3 h-48 mb-6">
                                {[40, 20, 60, 45, 90, 70, 44, 55, 80, 60, 95].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.05 }}
                                        className="flex-1 bg-primary/40 rounded-t-sm relative group"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-black p-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {h}%
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-20 bg-slate-700/30 rounded-2xl border border-slate-700/50 p-4" />
                                <div className="h-20 bg-slate-700/30 rounded-2xl border border-slate-700/50 p-4" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 lg:py-48 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8">Ready to move faster?</h2>
                        <p className="text-xl text-slate-500 font-medium">Simple, transparent pricing. No long-term contracts. No hidden fees.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricing.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`p-10 rounded-[40px] transition-all duration-500 ${p.highlight ? 'bg-primary text-white shadow-3xl shadow-primary/30 scale-105 relative z-10' : 'bg-white border border-slate-200 text-slate-900 hover:shadow-xl'}`}
                            >
                                {p.highlight && (
                                    <div className="absolute top-0 right-10 -translate-y-1/2 py-2 px-4 bg-white text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-black mb-2">{p.name}</h3>
                                <p className={`text-sm mb-10 font-medium ${p.highlight ? 'text-white/70' : 'text-slate-400'}`}>{p.desc}</p>
                                <div className="flex items-end space-x-2 mb-10">
                                    <span className="text-6xl font-black tracking-tighter">{p.price}</span>
                                    <span className={`text-lg font-black tracking-tight mb-2 ${p.highlight ? 'text-white/60' : 'text-slate-300'}`}>{p.price !== 'Custom' && '/mo'}</span>
                                </div>

                                <div className="space-y-4 mb-12">
                                    {p.features.map((f, fi) => (
                                        <div key={fi} className="flex items-center space-x-3 text-sm font-black">
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${p.highlight ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>
                                                <Check size={12} />
                                            </div>
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={() => navigate('/login')} className={`w-full py-5 rounded-[20px] text-lg font-black transition-all active:scale-95 ${p.highlight ? 'bg-white text-primary shadow-xl shadow-black/10 hover:shadow-2xl' : 'bg-slate-900 text-white hover:bg-primary'}`}>
                                    {p.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 lg:py-48 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-12">Don't take our word for it.</h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
                                Over 500+ teams have dumped their legacy CRMs for the performance of DealFLow.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-10">
                                <div>
                                    <div className="text-4xl font-black text-slate-900 mb-1">34%</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Avg. Growth</div>
                                </div>
                                <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                                <div>
                                    <div className="text-4xl font-black text-slate-900 mb-1">2.4x</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Team Velocity</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                    className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden"
                                >
                                    <Star className="absolute top-10 right-10 text-primary/10" size={100} fill="currentColor" />
                                    <p className="text-2xl font-black text-slate-900 tracking-tight leading-relaxed mb-10 relative">
                                        “{t.content}”
                                    </p>
                                    <div className="flex items-center space-x-4 relative">
                                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
                                            <img src={t.avatar} alt={t.name} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 leading-tight">{t.name}</h4>
                                            <p className="text-sm font-bold text-slate-400 italic">@{t.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-24 lg:py-48">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8">Common Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "Is DealFLow free to use?", a: "Yes, our Starter plan is 100% free for up to 100 leads. No credit card required to start." },
                            { q: "Can I migrate my data from Salesforce or HubSpot?", a: "Absolutely. We have a native CSV import tool and a direct integration suite for most major CRMs." },
                            { q: "How secure is my data?", a: "We use enterprise-grade encryption (AES-256) and offer SSO/SAML for our Enterprise customers." },
                            { q: "Do you offer a free trial?", a: "Our Starter plan is free forever, and we offer a 14-day free trial of our Professional features." }
                        ].map((qa, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-primary transition-colors group cursor-pointer">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-xl font-black group-hover:text-primary transition-colors tracking-tight">{qa.q}</h4>
                                    <Plus size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                                </div>
                                <p className="text-slate-500 font-medium">{qa.a}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-10 bg-primary/5 rounded-[40px] border border-primary/10 flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h4 className="text-2xl font-black text-slate-900 mb-2">Still have questions?</h4>
                            <p className="text-slate-500 font-bold">We're here to help you close more deals.</p>
                        </div>
                        <button className="btn-primary px-10 py-4 font-black">Contact Support</button>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 lg:py-48 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-slate-900 rounded-[60px] p-12 lg:p-32 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-[-20%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

                        <div className="relative">
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="text-6xl md:text-[120px] font-black text-white leading-[0.8] tracking-tighter mb-16"
                            >
                                Fortune favors <br /><span className="text-primary italic"> the bold.</span>
                            </motion.h2>
                            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-20 leading-relaxed">
                                Join the elite sales teams who have upgraded their infrastructure to DealFLow.
                                Set up your dashboard in less than 5 minutes.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <button onClick={() => navigate('/login')} className="btn-primary w-full sm:w-auto px-16 py-8 text-2xl font-black shadow-4xl shadow-primary/30 transform hover:scale-105 transition-all">
                                    Get Started for Free
                                </button>
                                <button className="w-full sm:w-auto px-12 py-8 text-xl font-black text-white border-2 border-white/10 rounded-[28px] hover:bg-white/5 transition-all">
                                    Book a Demo
                                </button>
                            </div>

                            <div className="mt-20 flex flex-wrap justify-center gap-12 grayscale opacity-40">
                                <Building2 size={32} />
                                <Target size={32} />
                                <Globe size={32} />
                                <Layers size={32} />
                                <Building2 size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                                    <Layout size={24} />
                                </div>
                                <span className="text-2xl font-black tracking-tighter">DealFLow</span>
                            </div>
                            <p className="text-slate-400 font-bold mb-10">High-fidelity sales workspace for teams that refuse to settle.</p>
                            <div className="flex space-x-6">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"><Target size={18} /></div>
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"><Globe size={18} /></div>
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"><Building2 size={18} /></div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-10">Product</h4>
                            <ul className="space-y-6 text-slate-500 font-bold">
                                <li className="hover:text-primary cursor-pointer transition-colors">Features</li>
                                <li className="hover:text-primary cursor-pointer transition-colors">Integrations</li>
                                <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
                                <li className="hover:text-primary cursor-pointer transition-colors">Changelog</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-10">Company</h4>
                            <ul className="space-y-6 text-slate-500 font-bold">
                                <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
                                <Link to="/contact" className="hover:text-primary block cursor-pointer transition-colors">Contact</Link>
                                <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
                                <li className="hover:text-primary cursor-pointer transition-colors">Terms</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-10">Newsletter</h4>
                            <p className="text-slate-400 font-bold mb-8 text-sm">Get the latest sales tactics delivered weekly.</p>
                            <div className="flex rounded-2xl overflow-hidden border border-slate-200">
                                <input type="email" placeholder="Email" className="flex-1 px-4 py-4 bg-slate-50 focus:outline-none font-bold" />
                                <button className="bg-slate-900 text-white px-6 font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-colors">Join</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between py-10 border-t border-slate-100 text-slate-400 text-sm font-bold">
                        <p>© {new Date().getFullYear()} DealFlow Systems Inc. All rights reserved.</p>
                        <div className="flex space-x-10 mt-6 md:mt-0">
                            <span>Status</span>
                            <span>Security</span>
                            <span>Cookies</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
