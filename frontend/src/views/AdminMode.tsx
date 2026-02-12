import React, { useState, useEffect } from 'react';
import { Users, Database, Activity } from 'lucide-react';
import { authService, User } from '../services/authService';
import '../styles/AdminMode.css';

interface UserListItem {
    id: number;
    username: string;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    last_login: string;
}

export const AdminMode: React.FC = () => {
    const [users, setUsers] = useState<UserListItem[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // Determine current user
        authService.getCurrentUser().then(setCurrentUser);

        // Mock data for display
        setUsers([
            { id: 1, username: 'trainee', email: 'trainee@kmti.com', full_name: 'Test Trainee', role: 'trainee', is_active: true, last_login: '2023-10-27T10:00:00Z' },
            { id: 2, username: 'employee', email: 'employee@kmti.com', full_name: 'Test Employee', role: 'employee', is_active: true, last_login: '2023-10-27T11:30:00Z' },
            { id: 3, username: 'admin', email: 'admin@kmti.com', full_name: 'System Admin', role: 'admin', is_active: true, last_login: '2023-10-27T09:15:00Z' },
        ]);
    }, []);

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
                    <p className="stat-value">{users.length}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <Database size={24} color="#68d391" />
                        <h3>Knowledge Base</h3>
                    </div>
                    <p className="stat-value">Active</p>
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
                    <button className="action-btn">
                        Add User
                    </button>
                </div>

                <div className="trainee-table-container">
                    <table className="trainee-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Full Name</th>
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
                                        <button className="btn-icon edit">Edit</button>
                                        <button className="btn-icon delete">Disable</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
