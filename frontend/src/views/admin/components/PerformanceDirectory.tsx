import React, { useEffect, useState } from 'react';
import { TraineeProgress } from '../../../services/adminService';
import { assessmentService } from '../../../services/assessmentService';

interface PerformanceDirectoryProps {
    progress: TraineeProgress[];
    setSelectedTrainee: (trainee: TraineeProgress | null) => void;
}

export const PerformanceDirectory: React.FC<PerformanceDirectoryProps> = ({ progress, setSelectedTrainee }) => {
    const [telemetryMap, setTelemetryMap] = useState<Record<number, any>>({});

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

        fetchTelemetry();
        // Optional: refresh every 10 seconds or listen to event
        const interval = setInterval(fetchTelemetry, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="trainee-progress">
            <div className="progress-grid">
                {progress.map(p => {
                    const telemetry = telemetryMap[p.id];
                    const isOnline = telemetry?.is_online;
                    const activity = telemetry?.current_activity || 'Offline';
                    
                    return (
                        <div key={p.id} className="trainee-stat-card" onClick={() => setSelectedTrainee(p)}>
                            <div className="card-top">
                                <div className="profile-brief">
                                    <div className="mini-avatar" style={{ position: 'relative' }}>
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
                                <div className="track-fill" style={{ '--percent': `${(p.completed_lessons/15)*100}%` } as React.CSSProperties}></div>
                            </div>
                        </div>
                        <div className="card-action">
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {telemetry?.last_seen 
                                    ? `Last seen: ${new Date(telemetry.last_seen).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` 
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
