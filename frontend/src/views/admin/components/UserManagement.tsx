import React from 'react';
import { Search, Shield, User as UserIcon, Trash2, Edit2, UserPlus } from 'lucide-react'; import { User } from '../../../services/authService';

interface UserManagementProps {
    users: User[];
    currentUser: User | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleToggleStatus: (id: number) => Promise<void>;
    handleDeleteUser: (id: number) => Promise<void>;
    onAddUser: () => void;
    onEditUser: (user: User) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ 
    users, 
    currentUser, 
    searchQuery, 
    setSearchQuery, 
    handleToggleStatus, 
    handleDeleteUser,
    onAddUser,
    onEditUser
}) => {
    const filteredUsers = users.filter((u: User) => 
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="user-management">
            <div className="toolbar">
                <div className="search-box">
                    <Search size={16} color="#94a3b8" />
                    <input type="text" placeholder="Search by name, email, or role..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="add-user-btn" onClick={onAddUser}>
                    <UserPlus size={16} /> Add New User
                </button>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Privileges</th>
                            <th>Current Status</th>
                            <th>Joined On</th>
                            <th>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(u => (
                            <tr key={u.id}>
                                <td>
                                    <div className="user-cell">
                                        <div className="avatar-small">
                                            {u.username[0].toUpperCase()}
                                        </div>
                                        <div className="info">
                                            <span className="name">{u.full_name}</span>
                                            <span className="email">{u.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`role-badge ${u.role}`}>
                                        {u.role === 'admin' ? <Shield size={12} /> : <UserIcon size={12} />}
                                        {u.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-pill ${u.is_active ? 'active' : 'inactive'}`}>
                                        {u.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>{new Date(u.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                <td className="actions-cell">
                                    <div className="action-buttons">
                                        <button className="action-icon-btn edit-btn" onClick={() => onEditUser(u)}
                                            title="Edit User"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button className="action-icon-btn toggle-btn" onClick={() => handleToggleStatus(u.id)}
                                            disabled={u.id === currentUser?.id}
                                            title={u.is_active ? 'Deactivate' : 'Activate'}
                                        >
                                            {u.is_active ? 'Revoke' : 'Permit'}
                                        </button>
                                        <button className="action-icon-btn delete-btn" onClick={() => handleDeleteUser(u.id)}
                                            disabled={u.id === currentUser?.id}
                                            title="Delete User"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
