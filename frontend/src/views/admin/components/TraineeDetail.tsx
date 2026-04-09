import React from 'react';
import { FileText, CheckCircle2, BarChart3 } from 'lucide-react'; import { TraineeProgress } from '../../../services/adminService';

interface TraineeDetailProps {
    selectedTrainee: TraineeProgress;
    setSelectedTrainee: (trainee: TraineeProgress | null) => void;
    onExport: (userId: number) => void;
}

export const TraineeDetail: React.FC<TraineeDetailProps> = ({ 
    selectedTrainee, 
    setSelectedTrainee,
    onExport
}) => {
    return (
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

                        <button className="btn-secondary export-detail-btn" onClick={() => onExport(selectedTrainee.id)}
                            style={{ marginTop: '1.5rem', width: '100%', gap: '0.5rem' }}
                        >
                            <FileText size={16} /> Export Progress Report
                        </button>
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
                                                <div className="score-pillar-fill" style={{ '--percent': `${q.score}%` } as React.CSSProperties}></div>
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
    );
};
