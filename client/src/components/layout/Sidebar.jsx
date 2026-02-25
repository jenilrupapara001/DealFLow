import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, PieChart, Settings, Mail, BarChart3 } from 'lucide-react';

const Sidebar = ({ isOpen, toggle }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Leads', icon: Users, path: '/leads' },
        { name: 'Pipeline', icon: PieChart, path: '/pipeline' },
        { name: 'Email Campaigns', icon: Mail, path: '/campaigns' },
        { name: 'Analytics', icon: BarChart3, path: '/analytics' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-20'} h-full bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}>
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">D</span>
                </div>
                {isOpen && <span className="ml-3 font-bold text-xl text-primary">DealFlow</span>}
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <item.icon size={20} />
                            {isOpen && <span className="ml-3 font-medium">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {isOpen && (
                <div className="p-4 m-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">Professional Plan</p>
                    <button className="text-xs text-primary font-bold mt-2 hover:underline">Upgrade Now</button>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
