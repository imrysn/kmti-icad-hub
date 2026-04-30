import React from 'react';
import { TraineeProgress } from '../../../services/adminService';

interface PerformanceDirectoryProps {
    progress: TraineeProgress[];
    setSelectedTrainee: (trainee: TraineeProgress | null) => void;
}

export const PerformanceDirectory: React.FC<PerformanceDirectoryProps> = ({ progress, setSelectedTrainee }) => {
    return (
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
                            <span>Last active: {p.last_login ? new Date(p.last_login).toLocaleDateString() : 'Never'}</span>
                            <button className="view-link">Details →</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
