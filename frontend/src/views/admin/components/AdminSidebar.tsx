import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; import { Shield, Activity, Users, BarChart3, Brain, MessageSquare, ClipboardList, Zap } from 'lucide-react';
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

            <nav className="sidebar-nav">
                {[
                    { id: 'overview', icon: Activity, label: 'Analytics' },
                    { id: 'users', icon: Users, label: 'Users' },
                    { id: 'progress', icon: BarChart3, label: 'Performance' },
                    { id: 'assessments', icon: ClipboardList, label: 'Quizzes' },
                    { id: 'practical', icon: Zap, label: 'Practical Units' },
                    { id: 'logs', icon: Shield, label: 'Audit Logs' }
                ].map((item) => (
                    <button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => navigate(`/admin/${item.id}`)}
                        data-tooltip={item.label}
                    >
                        <div className="nav-icon">
                            <item.icon size={18} />
                        </div>
                    </button>
                ))}
            </nav>
        </aside>
    );
};
