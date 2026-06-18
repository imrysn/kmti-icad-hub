import React, { useState, useEffect } from 'react';
import { TrendingUp, User } from 'lucide-react';

const TraineeStatusLabel: React.FC<{ isOnline: boolean; lastUpdated: string | null | undefined }> = ({ isOnline, lastUpdated }) => {
    const [statusText, setStatusText] = useState<string>('');

    useEffect(() => {
        if (isOnline) {
            setStatusText('Online');
            return;
        }

        const updateStatus = () => {
            if (!lastUpdated) {
                setStatusText('Inactive');
                return;
            }
            const date = new Date(lastUpdated);
            const diffMs = new Date().getTime() - date.getTime();
            if (diffMs <= 0) {
                setStatusText('Active just now');
                return;
            }
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 1) {
                setStatusText('Active just now');
                return;
            }
            if (diffMins < 60) {
                setStatusText(`Active ${diffMins}m ago`);
                return;
            }
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) {
                setStatusText(`Active ${diffHours}h ago`);
                return;
            }
            const diffDays = Math.floor(diffHours / 24);
            setStatusText(`Active ${diffDays}d ago`);
        };

        updateStatus();
        if (!isOnline) {
            const interval = setInterval(updateStatus, 60000);
            return () => clearInterval(interval);
        }
    }, [isOnline, lastUpdated]);

    return (
        <span style={{
            fontSize: '0.75rem',
            color: isOnline ? 'var(--accent-green, #22c55e)' : 'var(--text-muted, #64748b)',
            background: isOnline ? 'rgba(34, 197, 94, 0.1)' : 'rgba(100, 116, 139, 0.1)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 600
        }}>
            {statusText}
        </span>
    );
};

interface TraineeTelemetrySidebarProps {
    isTelemetryOpen: boolean;
    traineeProgressData: any[];
}

export const TraineeTelemetrySidebar: React.FC<TraineeTelemetrySidebarProps> = ({
    isTelemetryOpen,
    traineeProgressData
}) => {
    if (!isTelemetryOpen) return null;

    return (
        <div className="telemetry-sidebar animate-fade-in" style={{
            width: '320px',
            minWidth: '320px',
            borderLeft: '1px solid var(--border-color)',
            background: 'var(--bg-surface)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
        }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={18} style={{ color: 'var(--accent-blue)' }} /> Trainee Presence
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {traineeProgressData.filter(t => t.is_online).length} online
                </span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }} className="telemetry-list">
                {traineeProgressData.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '2rem' }}>
                        Loading trainee list...
                    </div>
                ) : (
                    traineeProgressData.map((trainee) => (
                        <div key={trainee.id} style={{
                            padding: '12px',
                            borderRadius: '8px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid var(--border-color)',
                            marginBottom: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                                            {trainee.full_name?.[0] || 'U'}
                                        </div>
                                        <span style={{
                                            position: 'absolute',
                                            bottom: '-1px',
                                            right: '-1px',
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            background: trainee.is_online ? 'var(--accent-green, #22c55e)' : '#64748b',
                                            border: '2px solid var(--bg-surface)'
                                        }} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{trainee.full_name}</h4>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@{trainee.username}</span>
                                    </div>
                                </div>
                                <TraineeStatusLabel isOnline={!!trainee.is_online} lastUpdated={trainee.last_updated} />
                            </div>
                            <div style={{
                                padding: '6px 8px',
                                background: trainee.is_online ? 'rgba(34, 197, 94, 0.04)' : 'rgba(255,255,255,0.01)',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                color: 'var(--text-main)',
                                border: '1px solid rgba(255,255,255,0.02)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }} title={trainee.current_activity || 'Offline'}>
                                <span style={{ fontWeight: 600, color: trainee.is_online ? 'var(--accent-green, #22c55e)' : 'var(--text-muted)', marginRight: '4px' }}>
                                    {trainee.is_online ? "Active:" : "Last Seen:"}
                                </span>
                                {trainee.current_activity || 'No activity recorded'}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
