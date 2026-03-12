import React, { useState, useEffect } from 'react';
import { 
    Users, Database, Activity, RefreshCw, 
    BarChart3, FileText, Search, Trash2, 
    CheckCircle2, XCircle, Shield, User as UserIcon
} from 'lucide-react';
import { authService, User } from '../services/authService';
import { adminService, SystemStats, TraineeProgress, SystemAuditLog } from '../services/adminService';
import '../styles/AdminMode.css';

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

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const me = await authService.getCurrentUser();
            setCurrentUser(me);

            if (activeTab === 'overview') {
                const s = await adminService.getStats();
                setStats(s);
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

    const filteredUsers = users.filter((u: User) => 
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Safe system metric helpers — backend may not return stats.system
    const cpuLoad     = stats?.system?.cpu_load     ?? 0;
    const memoryUsage = stats?.system?.memory_usage  ?? 0;
    const sysStatus   = stats?.system?.status        ?? 'Unknown';

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="logo-section">
                        <Shield className="logo-icon" size={24} />
                        <h2>Training Hub</h2>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {[
                        { id: 'overview', icon: Activity, label: 'Analytics' },
                        { id: 'users', icon: Users, label: 'Users' },
                        { id: 'progress', icon: BarChart3, label: 'Performance' },
                        { id: 'logs', icon: Shield, label: 'Audit Logs' }
                    ].map((item) => (
                        <button 
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id as AdminTab)}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-info">
                        <div className="avatar">
                            {currentUser?.username?.[0].toUpperCase() || 'A'}
                        </div>
                        <div className="info">
                            <span className="name">{currentUser?.full_name || 'Administrator'}</span>
                            <span className="role">System Administrator</span>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="admin-main">
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

                <div className="page-content">
                    {error && (
                        <div className="admin-error-banner">
                            <XCircle size={18} /> {error}
                        </div>
                    )}

                    {activeTab === 'overview' && stats && (
                        <div className="overview-content">
                            <div className="stats-cards">
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <Users className="icon" size={18} />
                                        <span className="label">Total Workforce</span>
                                    </div>
                                    <div className="stat-value">
                                        <span className="main">{stats.users.total}</span>
                                        <span className="trend positive">↑ 4%</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <CheckCircle2 className="icon" size={18} />
                                        <span className="label">Active Sessions</span>
                                    </div>
                                    <div className="stat-value">
                                        <span className="main">{stats.users.active}</span>
                                        <span className="status">Optimal</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <Database className="icon" size={18} />
                                        <span className="label">Intelligence Node</span>
                                    </div>
                                    <div className="stat-value">
                                        <span className="main">{stats.knowledge_base.total_documents}</span>
                                        <span className="sub">Vectors Ready</span>
                                    </div>
                                </div>
                            </div>

                            <div className="system-health">
                                <h3>Engine Intelligence</h3>
                                <div className="health-metrics">
                                    <div className="metric-item">
                                        <div className="metric-header">
                                            <span>Compute Intensity</span>
                                            <span className="pct">{cpuLoad.toFixed(1)}%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-bar-fill" style={{ width: `${cpuLoad}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="metric-item">
                                        <div className="metric-header">
                                            <span>Memory Buffer</span>
                                            <span className="pct">{memoryUsage.toFixed(1)}%</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-bar-fill" style={{ width: `${memoryUsage}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="metric-item">
                                        <div className="metric-header">
                                            <span>Knowledge Base</span>
                                            <span className="pct">{stats.knowledge_base.total_documents} docs</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-bar-fill" style={{ width: `${Math.min((stats.knowledge_base.total_documents / 200) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="status-indicator operational">
                                    <Activity size={16} /> System Status: {sysStatus}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <section className="user-management">
                            <div className="toolbar">
                                <div className="search-box">
                                    <Search size={16} color="#94a3b8" />
                                    <input 
                                        type="text" 
                                        placeholder="Search by name, email, or role..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
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
                                                    <button 
                                                        className="toggle-btn"
                                                        onClick={() => handleToggleStatus(u.id)}
                                                        disabled={u.id === currentUser?.id}
                                                    >
                                                        {u.is_active ? 'Revoke' : 'Permit'}
                                                    </button>
                                                    <button 
                                                        className="delete-btn"
                                                        onClick={() => handleDeleteUser(u.id)}
                                                        disabled={u.id === currentUser?.id}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {activeTab === 'progress' && !selectedTrainee && (
                        <section className="trainee-progress">
                            <div className="progress-grid">
                                {progress.map(p => (
                                    <div key={p.id} className="trainee-stat-card" onClick={() => setSelectedTrainee(p)}>
                                        <div className="card-top">
                                            <div className="profile-brief">
                                                <div className="mini-avatar">{p.full_name[0]}</div>
                                                <div className="names">
                                                    <span className="name">{p.full_name}</span>
                                                    <span className="user">@{p.username}</span>
                                                </div>
                                            </div>
                                            <div className="mastery-score">
                                                <span className="val">{p.average_score}%</span>
                                                <span className="lab">Score</span>
                                            </div>
                                        </div>
                                        <div className="card-metrics">
                                            <div className="metric-row">
                                                <span className="label">Curriculum Progress</span>
                                                <span className="count">{p.completed_lessons}/15</span>
                                            </div>
                                            <div className="progress-track">
                                                <div className="track-fill" style={{ width: `${(p.completed_lessons/15)*100}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="card-action">
                                            <span>Last active: {p.last_login ? new Date(p.last_login).toLocaleDateString() : 'Never'}</span>
                                            <button className="view-link">Details →</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === 'progress' && selectedTrainee && (
                        <section className="trainee-detail-view">
                            <button className="back-btn" onClick={() => setSelectedTrainee(null)}>
                                ← Return to Directory
                            </button>
                            
                            <div className="detail-container">
                                <div className="detail-sidebar">
                                    <div className="trainee-profile-large">
                                        <div className="avatar-large">{selectedTrainee.username[0].toUpperCase()}</div>
                                        <h3>{selectedTrainee.full_name}</h3>
                                        <p>Candidate Roadmap</p>
                                        <div className="large-stat">
                                            <span className="val">{selectedTrainee.average_score}%</span>
                                            <span className="lab">Global Mastery</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="detail-main">
                                    <div className="history-section road-map">
                                        <h3><FileText size={18} /> Knowledge Milestones</h3>
                                        <div className="history-list">
                                            {selectedTrainee.lessons_history.length > 0 ? (
                                                selectedTrainee.lessons_history.map((l, i) => (
                                                    <div key={i} className="history-item">
                                                        <div className="item-v-line"></div>
                                                        <div className="icon-circle">
                                                            <CheckCircle2 size={12} />
                                                        </div>
                                                        <div className="content">
                                                            <div className="title">{l.course_id}</div>
                                                            <div className="sub">Score: {l.percentage}%</div>
                                                            <div className="achievement-pill">Achieved</div>
                                                        </div>
                                                        <div className="date">
                                                            {l.last_accessed ? new Date(l.last_accessed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Historical'}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="empty-state">No curriculum milestones recorded.</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="history-section evaluation">
                                        <h3><BarChart3 size={18} /> Assessment Matrix</h3>
                                        <div className="history-list">
                                            {selectedTrainee.quizzes_history.length > 0 ? (
                                                selectedTrainee.quizzes_history.map((q, i) => (
                                                    <div key={i} className="history-item evaluation-card">
                                                        <div className="score-pillar-container">
                                                            <div className="score-pillar-track">
                                                                <div className="score-pillar-fill" style={{ height: `${q.score}%` }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="content">
                                                            <div className="title">{q.course_id} Assessment</div>
                                                            <div className="sub">Score: {q.score}%</div>
                                                            <div className={`status-pill ${q.score >= 80 ? 'pass' : 'attention'}`}>
                                                                {q.score >= 80 ? 'Pass' : 'Needs Improvement'}
                                                            </div>
                                                        </div>
                                                        <div className="assessment-date">
                                                            {q.completed_at ? new Date(q.completed_at).toLocaleDateString() : 'Pending'}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="empty-state">No assessment data available.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'logs' && (
                        <section className="audit-logs">
                            <div className="logs-list">
                                {logs.map(l => (
                                    <div key={l.id} className={`log-entry ${l.level.toLowerCase()}`}>
                                        <div className="log-time">{new Date(l.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                                        <div className="log-context">
                                            {l.context === 'AUTH' && <Shield size={14} />}
                                            {l.context === 'USER_MGMT' && <Users size={14} />}
                                            {l.context}
                                        </div>
                                        <div className="log-msg">{l.message}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                    </div>
                )}
            </main>
        </div>
    );
};
