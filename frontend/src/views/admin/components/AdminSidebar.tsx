import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; import { Shield, Activity, Users, BarChart3, Brain, MessageSquare } from 'lucide-react';
import { User } from '../../../services/authService';

interface AdminSidebarProps {
    currentUser: User | null;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentUser }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const activeTab = location.pathname.split('/').pop();

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
                    { id: 'intelligence', icon: Brain, label: 'Intelligence' },
                    { id: 'chatbot', icon: MessageSquare, label: 'AI Chatbot' },
                    { id: 'logs', icon: Shield, label: 'Audit Logs' }
                ].map((item) => (
                    <button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => navigate(`/admin/${item.id}`)}
                        title={item.label}
                    >
                        <div className="nav-glow" />
                        <div className="nav-icon">
                            <item.icon size={18} />
                        </div>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};
