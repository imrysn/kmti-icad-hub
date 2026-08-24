import {
    Activity, Archive, BookOpen, Bug, ClipboardCheck, Database, FileSearch, Gauge,
    ChevronDown, Languages, Mail, Send, Settings, Shield, UserCheck, UserPlus, Users,
} from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminArea } from '../../../services/authService';

interface AdminSidebarProps { adminAreas: AdminArea[]; }

export const AREA_NAV = {
    content: {
        label: 'Content Editor', icon: BookOpen,
        items: [
            { id: 'curriculum', icon: BookOpen, label: 'Curriculum' },
            { id: 'assessments', icon: ClipboardCheck, label: 'Quizzes and assessments' },
            { id: 'knowledge-base', icon: FileSearch, label: 'Knowledge-base content' },
            { id: 'media-translations', icon: Languages, label: 'Media and translations' },
        ],
    },
    organization: {
        label: 'Organization', icon: Users,
        items: [
            { id: 'registration-approvals', icon: UserCheck, label: 'Registration approvals' },
            { id: 'invitations', icon: Send, label: 'Invitations' },
            { id: 'users', icon: Users, label: 'Users' },
            { id: 'instructors', icon: UserPlus, label: 'Instructors' },
            { id: 'access-plans', icon: Gauge, label: 'Access plans' },
            { id: 'reports-broadcasts', icon: Activity, label: 'Reports and broadcasts' },
        ],
    },
    platform: {
        label: 'Platform', icon: Settings,
        items: [
            { id: 'system-health', icon: Activity, label: 'System health' },
            { id: 'audit-records', icon: FileSearch, label: 'Audit records' },
            { id: 'bug-reports', icon: Bug, label: 'Bug reports' },
            { id: 'security', icon: Shield, label: 'Security' },
            { id: 'email-integrations', icon: Mail, label: 'Email and integrations' },
            { id: 'storage-backups', icon: Archive, label: 'Storage and backups' },
            { id: 'technical-settings', icon: Database, label: 'Technical settings' },
        ],
    },
} satisfies Record<AdminArea, { label: string; icon: React.ElementType; items: Array<{ id: string; icon: React.ElementType; label: string }> }>;

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ adminAreas }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const activeArea = adminAreas.find((area) => location.pathname.startsWith(`/admin/${area}`));
    const [expandedArea, setExpandedArea] = React.useState<AdminArea | null>(activeArea || adminAreas[0] || null);

    React.useEffect(() => {
        if (activeArea) setExpandedArea(activeArea);
    }, [activeArea]);

    return (
        <aside className="admin-sidebar" aria-label="Admin Panel">
            <div className="admin-sidebar-heading">
                <span className="admin-sidebar-eyebrow">Administration</span>
                <strong>Admin Panel</strong>
            </div>
            <nav className="sidebar-nav">
                {adminAreas.map((area) => {
                    const group = AREA_NAV[area];
                    const AreaIcon = group.icon;
                    const areaActive = location.pathname.startsWith(`/admin/${area}`);
                    return (
                        <section key={area} aria-label={group.label} className="admin-nav-group">
                            <button className={`nav-item area-nav-item ${areaActive ? 'active' : ''}`}
                                onClick={() => setExpandedArea((current) => current === area ? null : area)}
                                aria-expanded={expandedArea === area}
                                data-tooltip={group.label} aria-label={group.label}>
                                <div className="nav-icon"><AreaIcon size={18} /></div>
                                <span className="nav-label">{group.label}</span>
                                <ChevronDown className={`area-chevron ${expandedArea === area ? 'expanded' : ''}`} size={16} />
                            </button>
                            {expandedArea === area && <div className="admin-sub-nav">
                            {group.items.map((item) => (
                                <button key={item.id}
                                    className={`nav-item admin-sub-nav-item ${location.pathname.endsWith(`/${item.id}`) ? 'active' : ''}`}
                                    onClick={() => navigate(`/admin/${area}/${item.id}`)}
                                    data-tooltip={`${group.label}: ${item.label}`} aria-label={`${group.label}: ${item.label}`}>
                                    <div className="nav-icon"><item.icon size={16} /></div>
                                    <span className="nav-label">{item.label}</span>
                                </button>
                            ))}
                            </div>}
                        </section>
                    );
                })}
            </nav>
        </aside>
    );
};
