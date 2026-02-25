import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';

const Layout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold">{user?.name}</p>
                            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                        </div>
                        <div className="relative profile-dropdown-container">
                            <button
                                onClick={() => setDropdownOpen(!isDropdownOpen)}
                                className={`p-2 rounded-full transition-colors ${isDropdownOpen ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                <UserIcon size={20} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Account</p>
                                    </div>
                                    <a
                                        href="/settings"
                                        onClick={() => setDropdownOpen(false)}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2 transition-colors"
                                    >
                                        <UserIcon size={16} />
                                        <span>Profile Settings</span>
                                    </a>
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            logout();
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
