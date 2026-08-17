import { CalendarClock,Edit2,Filter,Search,Shield,ShieldCheck,User as UserIcon,UserPlus } from 'lucide-react';
import React,{ useState } from 'react';
import { User } from '../../../services/authService';
import { PlanAssignmentPanel } from './PlanAssignmentPanel';
import { AccountAccessPanel } from './AccountAccessPanel';

interface UserManagementProps {
    users: User[];
    currentUser: User | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onAddUser: () => void;
    onEditUser: (user: User) => void;
    onRefresh: () => Promise<void>;
}

export const UserManagement: React.FC<UserManagementProps> = ({
    users,
    currentUser,
    searchQuery,
    setSearchQuery,
    onAddUser,
    onEditUser,
    onRefresh
}) => {
    const [roleFilter, setRoleFilter] = useState<string>('All');
    const [planUser, setPlanUser] = useState<User | null>(null);
    const [accessUser, setAccessUser] = useState<User | null>(null);

    const filteredUsers = users.filter((u: User) => {
        const matchesSearch = u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRole = roleFilter === 'All' || u.role.toLowerCase() === roleFilter.toLowerCase();

        return matchesSearch && matchesRole;
    });

    return (
        <section className="user-management">
            <div className="toolbar">
                <div className="search-box">
                    <Search size={16} color="#94a3b8" />
                    <input type="text" placeholder="Search by name, email, or role..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-box" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', marginRight: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0 1rem', borderRadius: '8px', height: '38px' }}>
                    <Filter size={14} color="var(--text-muted)" />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', fontSize: '0.875rem', cursor: 'pointer', padding: '0.25rem' }}
                    >
                        <option value="All" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>All Roles</option>
                        <option value="Employee" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Employee</option>
                        <option value="Trainee" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Trainee</option>
                        <option value="Admin" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Admin</option>
                    </select>
                </div>
                <button className="toolbar-btn" onClick={onAddUser}>
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
                                    <span className={`status-pill ${u.account_status === 'active' || (!u.account_status && u.is_active) ? 'active' : 'inactive'}`}>
                                        {u.account_status || (u.is_active ? 'Active' : 'Inactive')}
                                    </span>
                                </td>
                                <td>{u.created_at ? new Date(u.created_at.endsWith('Z') || u.created_at.includes('+') ? u.created_at : u.created_at + 'Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</td>
                                <td className="actions-cell">
                                    <div className="action-buttons">
                                        <button className="action-icon-btn edit-btn" onClick={() => onEditUser(u)}
                                            title="Edit User"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        {u.role === 'trainee' && <button className="action-icon-btn plan-btn" onClick={() => setPlanUser(u)} title="Manage access plan"><CalendarClock size={14} /></button>}
                                        <button className="action-icon-btn" onClick={() => setAccessUser(u)}
                                            disabled={u.id === currentUser?.id}
                                            title="Manage role, Admin areas, and account status"
                                        >
                                            <ShieldCheck size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {planUser && <PlanAssignmentPanel user={planUser} onClose={() => setPlanUser(null)} />}
            {accessUser && <AccountAccessPanel user={accessUser} onClose={() => setAccessUser(null)} onSaved={onRefresh} />}
        </section>
    );
};
