import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Zap, AlertCircle, Loader2 } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, demoMode } = useAuth();
    const navigate = useNavigate();

    const handleDemoFill = () => {
        setEmail('admin@dealflow.com');
        setPassword('password123');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 hover:scale-110 transition-transform">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl">
                            D
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 mt-2 font-medium italic">Ready for the next big deal?</p>
                </div>

                {demoMode && (
                    <div className="mb-8 p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-20"><ShieldCheck className="text-primary" size={48} /></div>
                        <div className="relative">
                            <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-3 flex items-center space-x-2">
                                <Zap size={14} fill="currentColor" />
                                <span>Demo Mode Active</span>
                            </h4>
                            <div className="space-y-1 mb-4">
                                <p className="text-sm text-slate-300">Email: <span className="font-mono text-white">admin@dealflow.com</span></p>
                                <p className="text-sm text-slate-300">Pass: <span className="font-mono text-white">password123</span></p>
                            </div>
                            <button
                                onClick={handleDemoFill}
                                type="button"
                                className="w-full py-2.5 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all transform active:scale-95"
                            >
                                Auto-fill Demo Account
                            </button>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 text-center flex items-center justify-center space-x-2">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex justify-between items-center">
                            <span>Password</span>
                            {!demoMode && <a href="#" className="text-primary hover:underline lowercase font-medium tracking-normal normal-case">Forgot?</a>}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-4 mt-2 text-lg font-black flex items-center justify-center space-x-2 shadow-xl shadow-primary/20"
                    >
                        {loading && <Loader2 size={20} className="animate-spin" />}
                        <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-500 text-sm">
                        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Get started</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
