import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import '../../styles/AdminMode.css'; 

// Components 
import ErrorBoundary from '../../components/ErrorBoundary'; 
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { SystemAnalytics } from './components/SystemAnalytics';
import { UserManagement } from './components/UserManagement';
import { PerformanceDirectory } from './components/PerformanceDirectory';
import { TraineeDetail } from './components/TraineeDetail';
import { AuditLogs } from './components/AuditLogs';
import { AssessmentManagement } from './components/AssessmentManagement';
import { PracticalManagement } from './components/PracticalManagement';
import { BroadcastCenter } from './components/BroadcastCenter';
import { UserModal } from './components/UserModal';
import { PracticalTrainerDashboard } from '../mentor/components/PracticalTrainerDashboard';

export type AdminTab = 'overview' | 'users' | 'progress' | 'assessments' | 'practical' | 'logs' | 'trainees';

export const AdminMode: React.FC = () => {
    const location = useLocation();
    
    // Derive active tab from URL path
    const pathParts = location.pathname.split('/');
    const activeTab = (pathParts[pathParts.length - 1] as AdminTab) || 'overview';

    const navigate = useNavigate();
    React.useEffect(() => {
        const path = location.pathname;
        if (path === '/admin' || path === '/admin/') {
            navigate('/admin/overview', { replace: true });
        }
    }, [location.pathname, navigate]);

    const {
        stats,
        users,
        progress,
        logs,
        currentUser,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedTrainee,
        setSelectedTrainee,
        heatmap,
        isUserModalOpen,
        setIsUserModalOpen,
        selectedUser,
        setSelectedUser,
        fetchData,
        handleToggleStatus,
        handleDeleteUser,
        handleSaveUser,
        handleExport
    } = useAdminDashboard(activeTab);

    // Safe system metric helpers
    const cpuLoad     = stats?.system?.cpu_load     ?? 0;
    const memoryUsage = stats?.system?.memory_usage  ?? 0;
    const sysStatus   = stats?.system?.status        ?? 'Unknown';

    // Prevent full-page flashing/flickering by only displaying overlay when switching to an empty tab
    const isTabDataEmpty =
        (activeTab === 'overview' && !stats) ||
        (activeTab === 'users' && users.length === 0) ||
        (activeTab === 'progress' && progress.length === 0) ||
        (activeTab === 'logs' && logs.length === 0);

    const showLoader = loading && isTabDataEmpty;

    return (
        <div className="admin-layout">
            <AdminSidebar currentUser={currentUser} />

            <main className="admin-main">
                <AdminHeader activeTab={activeTab} stats={stats} selectedTrainee={selectedTrainee} fetchData={fetchData} loading={loading} />

                <div className="page-content" style={{ position: 'relative' }}>
                    {error && (
                        <div className="admin-error-banner">
                            <XCircle size={18} /> {error}
                        </div>
                    )}

                    <div style={{ display: activeTab === 'overview' ? 'block' : 'none' }}>
                        <ErrorBoundary>
                            {stats && (
                                <div className="dashboard-scrollable">
                                    <SystemAnalytics stats={stats} cpuLoad={cpuLoad} memoryUsage={memoryUsage} sysStatus={sysStatus} heatmap={heatmap} />
                                </div>
                            )}
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'users' ? 'block' : 'none' }}>
                        <ErrorBoundary>
                            <UserManagement users={users} currentUser={currentUser} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleToggleStatus={handleToggleStatus} handleDeleteUser={handleDeleteUser} onAddUser={() => {
                                    setSelectedUser(null);
                                    setIsUserModalOpen(true);
                                }}
                                onEditUser={(user) => {
                                    setSelectedUser(user);
                                    setIsUserModalOpen(true);
                                }}
                             />
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'progress' ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0 }}>
                        <ErrorBoundary>
                            {(() => {
                                const params = new URLSearchParams(location.search);
                                const subtab = params.get('subtab') || 'overview';
                                
                                if (subtab === 'assessments' || subtab === 'sets') {
                                    return <PracticalTrainerDashboard />;
                                }

                                return !selectedTrainee ? (
                                    <PerformanceDirectory progress={progress} setSelectedTrainee={setSelectedTrainee} />
                                ) : (
                                    <TraineeDetail 
                                        selectedTrainee={selectedTrainee} 
                                        setSelectedTrainee={setSelectedTrainee} 
                                        onExport={handleExport} 
                                        onRefresh={fetchData} 
                                    />
                                );
                            })()}
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'assessments' ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0 }}>
                        <ErrorBoundary>
                            <AssessmentManagement />
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'practical' ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0 }}>
                        <ErrorBoundary>
                            <PracticalManagement />
                        </ErrorBoundary>
                    </div>

                    <div style={{ display: activeTab === 'logs' ? 'block' : 'none' }}>
                        <ErrorBoundary>
                            <AuditLogs logs={logs} />
                        </ErrorBoundary>
                    </div>

                    {showLoader && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                        </div>
                    )}
                </div>
            </main>
            <BroadcastCenter />

            <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)}
                onSave={handleSaveUser}
                user={selectedUser}
            />
        </div>
    );
};
