import React, { useEffect, useState } from 'react';
import { TraineeProgress } from '../../../services/adminService';
import { assessmentService } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { useAuthContext } from '../../../context/AuthContext';
import { useWebSocket } from '../../../context/WebSocketContext';
import { Search, Filter } from 'lucide-react';
import { getAvatarColor } from '../../../utils/avatarUtils';

interface PerformanceDirectoryProps {
    progress: TraineeProgress[];
    setSelectedTrainee: (trainee: TraineeProgress | null) => void;
}

export const PerformanceDirectory: React.FC<PerformanceDirectoryProps> = ({ progress, setSelectedTrainee }) => {
    const { user } = useAuthContext();
    const [telemetryMap, setTelemetryMap] = useState<Record<number, any>>({});
    const [userRoleMap, setUserRoleMap] = useState<Record<number, string>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | 'trainee' | 'employee'>('all');
    const { subscribe } = useWebSocket();

    useEffect(() => {
        const fetchTelemetry = async () => {
            try {
                const data = await assessmentService.getTrainerTraineesProgress();
                const map: Record<number, any> = {};
                data.forEach(t => {
                    map[t.id] = t;
                });
                setTelemetryMap(map);
            } catch (err) {
                console.error("Failed to fetch telemetry", err);
            }
        };

        const fetchUserRoles = async () => {
            try {
                const users = await authService.getUsers();
                const map: Record<number, string> = {};
                users.forEach(u => {
                    map[u.id] = u.role;
                });
                setUserRoleMap(map);
            } catch (err) {
                console.error("Failed to fetch user roles", err);
            }
        };

        fetchTelemetry();
        fetchUserRoles();
        // Fallback REST API refresh every 60 seconds
        const interval = setInterval(fetchTelemetry, 60000);

        // Real-time WebSocket telemetry updates
        const unsub = subscribe('TRAINEE_TELEMETRY', (data: any) => {
            setTelemetryMap(prev => {
                const current = prev[data.trainee_id];
                if (!current) return prev;
                return {
                    ...prev,
                    [data.trainee_id]: {
                        ...current,
                        is_online: data.is_online,
                        current_activity: data.current_activity,
                        last_seen: data.last_updated || data.last_seen
                    }
                };
            });
        });

        return () => {
            clearInterval(interval);
            unsub();
        };
    }, [subscribe]);

    const filteredProgress = progress.filter(p => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery ||
            (p.full_name?.toLowerCase().includes(searchLower) ?? false) ||
            (p.username?.toLowerCase().includes(searchLower) ?? false);
        const role = (p.role || userRoleMap[p.id] || 'trainee').toLowerCase();
        const matchesRole = roleFilter === 'all' || role === roleFilter.toLowerCase();
        return matchesSearch && matchesRole;
    });

    useEffect(() => {
        console.log("Debug: progress data", progress);
    }, [progress]);

    return (
        <section className="trainee-progress">
            {user?.role !== 'employee' && (
                <div className="dashboard-sub-header">
                    <div className="toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
                        <div className="search-box" style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', width: '350px' }}>
                            <Search size={16} color="#94a3b8" style={{ marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Search by name or username..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ border: 'none', background: 'transparent', color: 'var(--text-main)', outline: 'none', width: '100%' }}
                            />
                        </div>
                        <div className="filter-box" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0 1rem', borderRadius: '8px', height: '38px' }}>
                            <Filter size={14} color="var(--text-muted)" />
                            <select 
                                value={roleFilter} 
                                onChange={(e) => setRoleFilter(e.target.value as 'all' | 'trainee' | 'employee')}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', fontSize: '0.875rem', cursor: 'pointer', padding: '0.25rem' }}
                            >
                                <option value="all" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>All Roles</option>
                                <option value="employee" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Employee</option>
                                <option value="trainee" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Trainee</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
            <div className="progress-grid">
                {filteredProgress.map(p => {
                    const telemetry = telemetryMap[p.id];
                    const isOnline = telemetry?.is_online;
                    const activity = telemetry?.current_activity || 'Offline';

                    return (
                        <div key={p.id} className="trainee-stat-card" onClick={() => setSelectedTrainee(p)}>
                            <div className="card-top">
                                <div className="profile-brief">
                                    <div className="mini-avatar" style={{ position: 'relative', background: getAvatarColor(p.full_name) }}>
                                        {p.full_name[0]}
                                        <span style={{
                                            position: 'absolute',
                                            bottom: -2,
                                            right: -2,
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            backgroundColor: isOnline ? '#10b981' : '#6b7280',
                                            border: '2px solid var(--bg-card)'
                                        }}></span>
                                    </div>
                                    <div className="names">
                                        <span className="name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {p.full_name}
                                        </span>
                                        <span className="user" style={{ color: isOnline ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
                                            {activity}
                                        </span>
                                    </div>
                                </div>
                                <div className="mastery-score">
                                    <span className="val">{p.average_score}%</span>
                                    <span className="lab">Mastery Index</span>
                                </div>
                            </div>
                            <div className="card-metrics">
                                <div className="metric-row">
                                    <span className="label">Curriculum Progress</span>
                                    <span className="count">{p.completed_lessons}/15</span>
                                </div>
                                <div className="progress-track">
                                    <div className="track-fill" style={{ '--percent': `${(p.completed_lessons / 15) * 100}%` } as React.CSSProperties}></div>
                                </div>
                            </div>
                            <div className="card-action">
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {telemetry?.last_seen
                                        ? `Last seen: ${new Date(telemetry.last_seen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                                        : `Last active: ${p.last_login ? new Date(p.last_login).toLocaleDateString() : 'Never'}`}
                                </span>
                                <button className="view-link">Details →</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
