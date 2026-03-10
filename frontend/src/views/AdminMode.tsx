import React, { useState, useEffect } from 'react';
import { Users, Database, Activity, RefreshCw } from 'lucide-react';
import { authService, User } from '../services/authService';
import '../styles/AdminMode.css';

export const AdminMode: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        setError(null);
        try {
            const [me, allUsers] = await Promise.all([
                authService.getCurrentUser(),
                authService.getUsers(),
            ]);
            setCurrentUser(me);
            setUsers(allUsers);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to load users.');
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (userId: number) => {
        try {
            const updated = await authService.toggleUserStatus(userId);
            setUsers(prev =>
                prev.map(u => u.id === updated.id ? { ...u, is_active: updated.is_active } : u)
            );
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to update user status.');
        }
    };

    const activeCount = users.filter(u => u.is_active).length;

    return (
        <div className="admin-mode">
            <header className="admin-header">
                <h1>System Administration</h1>
                <p>Manage users and system settings</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <Users size={24} color="#63b3ed" />
                        <h3>Total Users</h3>
                    </div>
                    <p className="stat-value">{loadingUsers ? '—' : users.length}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <Database size={24} color="#68d391" />
                        <h3>Active Users</h3>
                    </div>
                    <p className="stat-value">{loadingUsers ? '—' : activeCount}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <Activity size={24} color="#f687b3" />
                        <h3>System Status</h3>
                    </div>
                    <p className="stat-value text-operational">Operational</p>
                </div>
            </div>

            <section className="admin-section">
                <div className="section-header">
                    <h2 className="section-title">User Management</h2>
                    <button className="action-btn" onClick={fetchUsers} title="Refresh">
                        <RefreshCw size={14} className="action-btn__icon" />
                        Refresh
                    </button>
                </div>

                {error && (
                    <div className="api-error api-error--spaced">
                        {error}
                    </div>
                )}

                <div className="trainee-table-container">
                    {loadingUsers ? (
                        <p className="table-loading-msg">Loading users…</p>
                    ) : (
                        <table className="trainee-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.username}</td>
                                        <td>{u.full_name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span className={`status-badge status-${u.role}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${u.is_active ? 'status-active' : 'status-inactive'}`}>
                                                {u.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn-icon ${u.is_active ? 'delete' : 'edit'}`}
                                                onClick={() => handleToggleStatus(u.id)}
                                                disabled={u.id === currentUser?.id}
                                                title={u.id === currentUser?.id ? 'Cannot disable your own account' : undefined}
                                            >
                                                {u.is_active ? 'Disable' : 'Enable'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
};
