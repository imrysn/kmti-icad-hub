import React from 'react';
import { RefreshCw, LayoutDashboard, FileText, Settings, Box, PenTool, ClipboardList, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SystemStats, TraineeProgress } from '../../../services/adminService';
import { AdminTab } from '../AdminMode';

interface AdminHeaderProps {
    activeTab: AdminTab;
    stats: SystemStats | null;
    selectedTrainee: TraineeProgress | null;
    fetchData: () => Promise<void>;
    loading: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
    activeTab,
    stats,
    selectedTrainee,
    fetchData,
    loading
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const subtab = params.get('subtab') || (activeTab === 'assessments' ? '3D_Modeling' : (activeTab === 'practical' ? 'tasks' : 'overview'));

    return (
        <header className="page-header">
            <div className="header-left">
                <h1>
                    {activeTab === 'overview' && 'System Analytics'}
                    {activeTab === 'users' && 'User Management'}
                    {activeTab === 'progress' && 'Performance Directory'}
                    {activeTab === 'logs' && 'Security Audit'}
                    {activeTab === 'assessments' && 'Assessment Management'}
                    {activeTab === 'practical' && 'Training Sets'}
                    {activeTab === 'trainees' && 'Trainee Overview'}
                </h1>
                <p className="subtitle">
                    {activeTab === 'overview' && `${stats?.users.total || '0'} active users monitored`}
                    {activeTab === 'users' && `Manage platform access and user roles`}
                    {activeTab === 'progress' && (selectedTrainee ? `Overview: ${selectedTrainee.full_name}` : `Trainee performance and mastery tracking`)}
                    {activeTab === 'logs' && `Detailed record of critical system security events`}
                    {activeTab === 'assessments' && `Create and manage quizzes, questions, and evaluation criteria`}
                    {activeTab === 'practical' && `Manage assessment units and assign to trainers`}
                    {activeTab === 'trainees' && `Monitor practical drafting attempts, course progression, and config mappings`}
                </p>
            </div>
            {activeTab === 'progress' && !selectedTrainee && (
                <div className="header-right" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className={`sub-tab-btn ${subtab === 'overview' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/progress?subtab=overview')}
                    >
                        <LayoutDashboard size={16} /> Overview & Telemetry
                    </button>
                    <button
                        className={`sub-tab-btn ${subtab === 'assessments' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/progress?subtab=assessments')}
                    >
                        <FileText size={16} /> Practical Submissions
                    </button>
                    <button
                        className={`sub-tab-btn ${subtab === 'sets' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/progress?subtab=sets')}
                    >
                        <Settings size={16} /> Set Configuration
                    </button>
                </div>
            )}

            {activeTab === 'assessments' && (
                <div className="header-right" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className={`sub-tab-btn ${subtab === '3D_Modeling' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/assessments?subtab=3D_Modeling')}
                    >
                        <Box size={16} /> 3D Modeling
                    </button>
                    <button
                        className={`sub-tab-btn ${subtab === '2D_Drawing' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/assessments?subtab=2D_Drawing')}
                    >
                        <PenTool size={16} /> 2D Drawing
                    </button>
                </div>
            )}

            {activeTab === 'practical' && (
                <div className="header-right" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className={`sub-tab-btn ${subtab === 'tasks' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/practical?subtab=tasks')}
                    >
                        <ClipboardList size={16} /> Units & Tasks
                    </button>
                    <button
                        className={`sub-tab-btn ${subtab === 'assignments' ? 'active' : ''}`}
                        onClick={() => navigate('/admin/practical?subtab=assignments')}
                    >
                        <Users size={16} /> Trainer Assignments
                    </button>
                </div>
            )}
        </header>
    );
};
