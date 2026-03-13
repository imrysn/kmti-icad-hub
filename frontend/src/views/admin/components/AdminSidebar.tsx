import React from 'react';
import { Shield, Activity, Users, BarChart3 } from 'lucide-react';
import { User } from '../../../services/authService';

type AdminTab = 'overview' | 'users' | 'progress' | 'logs';

interface AdminSidebarProps {
    activeTab: AdminTab;
    setActiveTab: (tab: AdminTab) => void;
    currentUser: User | null;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, currentUser }) => {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <div className="logo-section">
                    <Shield className="logo-icon" size={24} />
                    <h2>Training Hub</h2>
                </div>
            </div>

            <nav className="sidebar-nav">
                {[
                    { id: 'overview', icon: Activity, label: 'Analytics' },
                    { id: 'users', icon: Users, label: 'Users' },
                    { id: 'progress', icon: BarChart3, label: 'Performance' },
                    { id: 'logs', icon: Shield, label: 'Audit Logs' }
                ].map((item) => (
                    <button 
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id as AdminTab)}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="admin-info">
                    <div className="avatar">
                        {currentUser?.username?.[0].toUpperCase() || 'A'}
                    </div>
                    <div className="info">
                        <span className="name">{currentUser?.full_name || 'Administrator'}</span>
                        <span className="role">System Administrator</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
