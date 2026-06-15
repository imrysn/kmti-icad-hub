import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

export type AdminTab = 'overview' | 'users' | 'progress' | 'assessments' | 'practical' | 'logs';

export const AdminMode: React.FC = () => {
    const location = useLocation();
    
    // Derive active tab from URL path
    const pathParts = location.pathname.split('/');
    const activeTab = (pathParts[pathParts.length - 1] as AdminTab) || 'overview';

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

                    <Routes>
                        <Route path="overview" element={ <ErrorBoundary>
                                {stats && (
                                    <div className="dashboard-scrollable">
                                        <SystemAnalytics stats={stats} cpuLoad={cpuLoad} memoryUsage={memoryUsage} sysStatus={sysStatus} heatmap={heatmap} />
                                    </div>
                                )}
                            </ErrorBoundary>
                        } />
                        <Route path="users" element={ <ErrorBoundary>
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
                        } />
                        <Route path="progress" element={ <ErrorBoundary>
                                {!selectedTrainee ? (
                                    <PerformanceDirectory progress={progress} setSelectedTrainee={setSelectedTrainee} />
                                ) : (
                                    <TraineeDetail 
                                        selectedTrainee={selectedTrainee} 
                                        setSelectedTrainee={setSelectedTrainee} 
                                        onExport={handleExport} 
                                        onRefresh={fetchData} 
                                    />
                                )}
                            </ErrorBoundary>
                        } />

                        <Route path="assessments" element={<ErrorBoundary><AssessmentManagement /></ErrorBoundary>} />
                        <Route path="practical" element={<ErrorBoundary><PracticalManagement /></ErrorBoundary>} />
                        <Route path="logs" element={<ErrorBoundary><AuditLogs logs={logs} /></ErrorBoundary>} />
                        <Route path="/" element={<Navigate to="overview" replace />} />
                    </Routes>

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
