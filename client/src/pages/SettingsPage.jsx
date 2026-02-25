import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Shield, Users, Mail, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SettingsPage = () => {
    const { user, updateProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Profile State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    // Security State
    const [securityData, setSecurityData] = useState({
        password: '',
        confirmPassword: ''
    });

    // Team State
    const [team, setTeam] = useState([]);
    const [teamLoading, setTeamLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'team') {
            fetchTeam();
        }
    }, [activeTab]);

    const fetchTeam = async () => {
        setTeamLoading(true);
        try {
            const { data } = await axios.get('/api/users');
            setTeam(data);
        } catch (err) {
            console.error(err);
        } finally {
            setTeamLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        try {
            await updateProfile(profileData);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (securityData.password !== securityData.confirmPassword) {
            return setError('Passwords do not match');
        }
        setLoading(true);
        setSuccess('');
        setError('');
        try {
            await updateProfile({ password: securityData.password });
            setSuccess('Password updated successfully!');
            setSecurityData({ password: '', confirmPassword: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        ...(user?.role === 'admin' || user?.role === 'manager' ? [{ id: 'team', label: 'Team Management', icon: Users }] : [])
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-black text-slate-900 flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <SettingsIcon size={24} />
                    </div>
                    <span>Account Settings</span>
                </h1>
                <p className="text-slate-500 mt-2 font-medium">Manage your personal presence and team workspace settings.</p>
            </div>

            {/* Notification Bar */}
            {(success || error) && (
                <div className={`p-4 rounded-2xl border flex items-center space-x-3 text-sm font-semibold transition-all ${success ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
                    }`}>
                    {success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{success || error}</span>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSuccess('');
                                setError('');
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                                }`}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[400px]">
                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div className="flex items-center space-x-4 pb-6 border-b border-slate-100">
                                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-4 border-white shadow-inner">
                                    <User size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{profileData.name}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-black">{user?.role}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Display Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <User size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            className="input-field pl-10"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Mail size={16} />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            className="input-field pl-10"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
                            >
                                {loading && <Loader2 size={18} className="animate-spin" />}
                                <span>{loading ? 'Saving Changes...' : 'Update Profile'}</span>
                            </button>
                        </form>
                    )}

                    {activeTab === 'security' && (
                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Update Password</h3>
                                <p className="text-sm text-slate-500 mb-6">Ensure your account is using a long, random password to stay secure.</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Lock size={16} />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            className="input-field pl-10"
                                            placeholder="••••••••"
                                            value={securityData.password}
                                            onChange={(e) => setSecurityData({ ...securityData, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Lock size={16} />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            className="input-field pl-10"
                                            placeholder="••••••••"
                                            value={securityData.confirmPassword}
                                            onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
                            >
                                {loading && <Loader2 size={18} className="animate-spin" />}
                                <span>{loading ? 'Securing Account...' : 'Update Password'}</span>
                            </button>
                        </form>
                    )}

                    {activeTab === 'team' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Team Directory</h3>
                                <p className="text-sm text-slate-500 mb-6">View and manage your team members and their roles.</p>
                            </div>

                            {teamLoading ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                                    <Loader2 size={32} className="text-primary animate-spin" />
                                    <p className="text-sm text-slate-400 font-medium">Loading your team...</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {team.map((member) => (
                                        <div key={member._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-bold shadow-sm">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{member.name}</p>
                                                    <p className="text-xs text-slate-500">{member.email}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${member.role === 'admin' ? 'bg-indigo-100 text-indigo-700' :
                                                    member.role === 'manager' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                                                }`}>
                                                {member.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
