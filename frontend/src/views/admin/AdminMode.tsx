import React, { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { authService, User } from '../../services/authService';
import { adminService, SystemStats, TraineeProgress, SystemAuditLog } from '../../services/adminService';
import '../../styles/AdminMode.css';

// Components
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { SystemAnalytics } from './components/SystemAnalytics';
import { UserManagement } from './components/UserManagement';
import { PerformanceDirectory } from './components/PerformanceDirectory';
import { TraineeDetail } from './components/TraineeDetail';
import { AuditLogs } from './components/AuditLogs';
import { BroadcastCenter } from './components/BroadcastCenter';
import { UserModal } from './components/UserModal';

type AdminTab = 'overview' | 'users' | 'progress' | 'logs';

export const AdminMode: React.FC = () => {
    // State
    const [activeTab, setActiveTab] = useState<AdminTab>('overview');
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [progress, setProgress] = useState<TraineeProgress[]>([]);
    const [logs, setLogs] = useState<SystemAuditLog[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTrainee, setSelectedTrainee] = useState<TraineeProgress | null>(null);
    const [heatmap, setHeatmap] = useState<{course_id: string, count: number}[]>([]);

    // User CRUD state
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const me = await authService.getCurrentUser();
            setCurrentUser(me);

            if (activeTab === 'overview') {
                const [s, h] = await Promise.all([
                    adminService.getStats(),
                    adminService.getHeatmap()
                ]);
                setStats(s);
                setHeatmap(h);
            } else if (activeTab === 'users') {
                const u = await authService.getUsers();
                setUsers(u);
            } else if (activeTab === 'progress') {
                const p = await adminService.getTraineeProgress();
                setProgress(p);
                // Update selected trainee if open
                if (selectedTrainee) {
                    const updated = p.find(t => t.id === selectedTrainee.id);
                    if (updated) setSelectedTrainee(updated);
                }
            } else if (activeTab === 'logs') {
                const l = await adminService.getLogs();
                setLogs(l);
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to load data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        if (activeTab !== 'progress') setSelectedTrainee(null);
    }, [activeTab]);

    const handleToggleStatus = async (userId: number) => {
        try {
            const updated = await authService.toggleUserStatus(userId);
            setUsers((prev: User[]) => prev.map(u => u.id === updated.id ? { ...u, is_active: updated.is_active } : u));
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to update user status.');
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) return;
        try {
            await adminService.deleteUser(userId);
            setUsers((prev: User[]) => prev.filter(u => u.id !== userId));
            if (activeTab === 'overview') fetchData();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to delete user.');
        }
    };

    const handleSaveUser = async (userData: any) => {
        try {
            if (selectedUser) {
                await adminService.updateUser(selectedUser.id, userData);
            } else {
                await adminService.createUser(userData);
            }
            await fetchData();
            setIsUserModalOpen(false);
        } catch (err: any) {
            throw err; // Propagate to modal for display
        }
    };

    const handleReindex = async () => {
        if (!window.confirm('Trigger full knowledge base re-indexing? This may take a moment.')) return;
        setLoading(true);
        try {
            await adminService.triggerReindex();
            alert('Re-indexing complete!');
            fetchData();
        } catch (err: any) {
            setError('Re-indexing failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async (userId?: number) => {
        try {
            await adminService.downloadProgressExport(userId);
        } catch (err) {
            setError('Export failed.');
        }
    };

    // Safe system metric helpers
    const cpuLoad     = stats?.system?.cpu_load     ?? 0;
    const memoryUsage = stats?.system?.memory_usage  ?? 0;
    const sysStatus   = stats?.system?.status        ?? 'Unknown';

    return (
        <div className="admin-layout">
            <AdminSidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                currentUser={currentUser} 
            />

            <main className="admin-main">
                <AdminHeader 
                    activeTab={activeTab} 
                    stats={stats} 
                    selectedTrainee={selectedTrainee} 
                    fetchData={fetchData} 
                    loading={loading} 
                />

                <div className="page-content">
                    {error && (
                        <div className="admin-error-banner">
                            <XCircle size={18} /> {error}
                        </div>
                    )}

                    {activeTab === 'overview' && stats && (
                        <div className="dashboard-scrollable">
                            <SystemAnalytics 
                                stats={stats} 
                                cpuLoad={cpuLoad} 
                                memoryUsage={memoryUsage} 
                                sysStatus={sysStatus} 
                                heatmap={heatmap}
                                onReindex={handleReindex}
                            />
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <UserManagement 
                            users={users} 
                            currentUser={currentUser} 
                            searchQuery={searchQuery} 
                            setSearchQuery={setSearchQuery} 
                            handleToggleStatus={handleToggleStatus} 
                            handleDeleteUser={handleDeleteUser} 
                            onAddUser={() => {
                                setSelectedUser(null);
                                setIsUserModalOpen(true);
                            }}
                            onEditUser={(user) => {
                                setSelectedUser(user);
                                setIsUserModalOpen(true);
                            }}
                        />
                    )}

                    {activeTab === 'progress' && !selectedTrainee && (
                        <PerformanceDirectory 
                            progress={progress} 
                            setSelectedTrainee={setSelectedTrainee} 
                        />
                    )}

                    {activeTab === 'progress' && selectedTrainee && (
                        <TraineeDetail 
                            selectedTrainee={selectedTrainee} 
                            setSelectedTrainee={setSelectedTrainee} 
                            onExport={handleExport}
                        />
                    )}

                    {activeTab === 'logs' && (
                        <AuditLogs logs={logs} />
                    )}
                </div>

                {loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                    </div>
                )}
            </main>
            <BroadcastCenter />

            <UserModal 
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onSave={handleSaveUser}
                user={selectedUser}
            />
        </div>
    );
};
