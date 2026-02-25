import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShieldAlert } from 'lucide-react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, demoMode } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (demoMode) return;
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            const { data } = await axios.post('/api/users', { name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (demoMode) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-12 border border-slate-100 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                        <ShieldAlert size={40} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Registration Disabled</h1>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                        To maintain a consistent experience for all reviewers, account creation is disabled in the Live Demo environment.
                    </p>
                    <Link to="/login" className="btn-primary w-full py-4 text-lg font-black block">
                        Use Demo Credentials
                    </Link>
                    <Link to="/" className="mt-6 text-sm font-bold text-slate-400 hover:text-primary block transition-colors">
                        Back to Landing Page
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 hover:scale-110 transition-transform">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl">
                            D
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-500 mt-2 font-medium">Join the next generation of sales CRM</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
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
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-4 mt-4 text-lg font-black shadow-xl shadow-primary/20"
                    >
                        {loading ? 'Processing...' : 'Create My Account'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Already part of the team? <Link to="/login" className="text-primary font-black hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
