import React from 'react';
import { RefreshCw } from 'lucide-react'; 
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
    return (
        <header className="page-header">
            <div className="header-left">
                <h1>
                    {activeTab === 'overview' && 'System Analytics'}
                    {activeTab === 'users' && 'User Management'}
                    {activeTab === 'progress' && 'Performance Directory'}
                    {activeTab === 'intelligence' && 'Intelligence Hub'} 
                    {activeTab === 'chatbot' && 'Intelligence Chatbot'}
                    {activeTab === 'logs' && 'Security Audit'}
                    {activeTab === 'assessments' && 'Assessment Management'}
                    {activeTab === 'practical' && 'Practical Unit Dashboard'}
                </h1>
                <p className="subtitle">
                    {activeTab === 'overview' && `${stats?.users.total || '0'} active users monitored`}
                    {activeTab === 'users' && `Manage platform access and user roles`}
                    {activeTab === 'progress' && (selectedTrainee ? `Overview: ${selectedTrainee.full_name}` : `Trainee performance and mastery tracking`)}
                    {activeTab === 'intelligence' && `Chat analytics, query monitoring & knowledge base management`}
                    {activeTab === 'chatbot' && `Ask questions grounded in the indexed knowledge base`}
                    {activeTab === 'logs' && `Detailed record of critical system security events`}
                    {activeTab === 'assessments' && `Create and manage quizzes, questions, and evaluation criteria`}
                    {activeTab === 'practical' && `Manage assessment units and assign to trainers`}
                </p>
            </div>
        </header>
    );
};
