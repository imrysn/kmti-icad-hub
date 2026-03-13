import React from 'react';
import { RefreshCw } from 'lucide-react';
import { SystemStats, TraineeProgress } from '../../../services/adminService';

type AdminTab = 'overview' | 'users' | 'progress' | 'logs';

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
    return (
        <header className="page-header">
            <div className="header-left">
                <h1>
                    {activeTab === 'overview' && 'System Analytics'}
                    {activeTab === 'users' && 'User Management'}
                    {activeTab === 'progress' && 'Performance Directory'}
                    {activeTab === 'logs' && 'Security Audit'}
                </h1>
                <p className="subtitle">
                    {activeTab === 'overview' && `${stats?.users.total || '0'} active users monitored`}
                    {activeTab === 'users' && `Manage platform access and user roles`}
                    {activeTab === 'progress' && (selectedTrainee ? `Overview: ${selectedTrainee.full_name}` : `Trainee performance and mastery tracking`)}
                    {activeTab === 'logs' && `Detailed record of critical system security events`}
                </p>
            </div>
            <div className="header-actions">
                <button className="refresh-btn" onClick={fetchData} disabled={loading}>
                    <RefreshCw size={24} className={loading ? 'spinning' : ''} />
                </button>
            </div>
        </header>
    );
};
