import { Activity,BarChart3,BookOpenCheck,ClipboardList,Shield,Users,Zap } from 'lucide-react';
import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { User } from '../../../services/authService';

interface AdminSidebarProps {
    currentUser: User | null;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ }) => {
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
                    { id: 'practical', icon: Zap, label: 'Training Set' },
                    { id: 'availability', icon: BookOpenCheck, label: 'Course Availability' },
                    { id: 'logs', icon: Shield, label: 'Audit Logs' }
                ].map((item) => (
                    <button key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => navigate(`/admin/${item.id}`)}
                        data-tooltip={item.label} aria-label={item.label} title={item.label}
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
