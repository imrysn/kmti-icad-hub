import { Box,FileText,LayoutDashboard,PenTool,Settings,Users } from 'lucide-react';
import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { SystemStats,TraineeProgress } from '../../../services/adminService';
import { AdminTab } from '../AdminMode';

interface AdminHeaderProps {
    activeTab: AdminTab;
    stats: SystemStats | null;
    selectedTrainee: TraineeProgress | null;
    fetchData: () => Promise<void>;
    loading: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, stats, selectedTrainee }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const subtab = params.get('subtab') || (activeTab === 'assessments' ? '3D_Modeling' : (activeTab === 'practical' ? 'tasks_3d' : 'overview'));
    const pageCopy: Partial<Record<AdminTab, [string, string]>> = {
        curriculum: ['Curriculum', 'Organize courses, lessons, learning paths, and completion rules'],
        assessments: ['Quizzes and assessments', 'Create and manage quizzes, questions, and evaluation criteria'],
        'knowledge-base': ['Knowledge-base content', 'Manage searchable reference material for learners'],
        'media-translations': ['Media and translations', 'Manage learning media and multilingual content'],
        'registration-approvals': ['Registration approvals', 'Review and approve new self-registration requests'],
        invitations: ['Invitations', 'Invite people and control their initial access'],
        users: ['Users', 'Manage platform access and user roles'],
        instructors: ['Instructors', 'Manage instructors and their course responsibilities'],
        'access-plans': ['Access plans', 'Control Beginner, Intermediate, and Full Access entitlements'],
        'reports-broadcasts': ['Reports and broadcasts', 'Review learner performance, export reports, and send announcements'],
        'system-health': ['System health', `${stats?.users.total || '0'} active users monitored`],
        'audit-records': ['Audit records', 'Review important administrative and system activity'],
        'bug-reports': ['Bug reports', 'Review issues and screenshots submitted by learners'],
        security: ['Security', 'Control administrative permissions and account protection'],
        'email-integrations': ['Email and integrations', 'Configure communication and connected services'],
        'storage-backups': ['Storage and backups', 'Manage data retention, backups, and recovery'],
        'technical-settings': ['Technical settings', 'Configure platform-wide operational behavior'],
    };
    const currentCopy = pageCopy[activeTab];

    return (
        <header className="page-header">
            <div className="header-left">
                <h1>{currentCopy?.[0] || ({ overview: 'System health', progress: 'Reports and broadcasts', logs: 'Audit records', practical: 'Training Sets', trainees: 'Trainee Overview' } as Partial<Record<AdminTab, string>>)[activeTab]}</h1>
                <p className="subtitle">
                    {selectedTrainee && (activeTab === 'progress' || activeTab === 'reports-broadcasts')
                        ? `Overview: ${selectedTrainee.full_name}`
                        : currentCopy?.[1] || ({ overview: `${stats?.users.total || '0'} active users monitored`, progress: 'Trainee performance and mastery tracking', logs: 'Detailed record of critical system security events', practical: 'Manage 3D and 2D assessment units and assign to trainers', trainees: 'Monitor practical drafting attempts, course progression, and config mappings' } as Partial<Record<AdminTab, string>>)[activeTab]}
                </p>
            </div>
            {(activeTab === 'progress' || activeTab === 'reports-broadcasts') && !selectedTrainee && (
                <div className="header-right" style={{ display: 'flex', gap: '10px' }}>
                    <button className={`sub-tab-btn ${subtab === 'overview' ? 'active' : ''}`} onClick={() => navigate('/admin/organization/reports-broadcasts?subtab=overview')}><LayoutDashboard size={16} /> Overview & Telemetry</button>
                    <button className={`sub-tab-btn ${subtab === 'assessments' ? 'active' : ''}`} onClick={() => navigate('/admin/organization/reports-broadcasts?subtab=assessments')}><FileText size={16} /> Practical Submissions</button>
                    <button className={`sub-tab-btn ${subtab === 'sets' ? 'active' : ''}`} onClick={() => navigate('/admin/organization/reports-broadcasts?subtab=sets')}><Settings size={16} /> Set Configuration</button>
                </div>
            )}
            {activeTab === 'assessments' && (
                <div className="header-right" style={{ display: 'flex', gap: '10px' }}>
                    <button className={`sub-tab-btn ${subtab === '3D_Modeling' ? 'active' : ''}`} onClick={() => navigate('/admin/content/assessments?subtab=3D_Modeling')}><Box size={16} /> 3D Modeling</button>
                    <button className={`sub-tab-btn ${subtab === '2D_Drawing' ? 'active' : ''}`} onClick={() => navigate('/admin/content/assessments?subtab=2D_Drawing')}><PenTool size={16} /> 2D Drawing</button>
                </div>
            )}
            {activeTab === 'practical' && (
                <div className="header-right" style={{ display: 'flex', gap: '10px' }}>
                    <button className={`sub-tab-btn ${subtab === 'tasks_3d' ? 'active' : ''}`} onClick={() => navigate('/admin/content/practical?subtab=tasks_3d')}><Box size={16} /> 3D Units & Tasks</button>
                    <button className={`sub-tab-btn ${subtab === 'tasks_2d' ? 'active' : ''}`} onClick={() => navigate('/admin/content/practical?subtab=tasks_2d')}><PenTool size={16} /> 2D Units & Tasks</button>
                    <button className={`sub-tab-btn ${subtab === 'assignments' ? 'active' : ''}`} onClick={() => navigate('/admin/content/practical?subtab=assignments')}><Users size={16} /> Trainer Assignments</button>
                </div>
            )}
        </header>
    );
};
