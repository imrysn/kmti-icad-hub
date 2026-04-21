import React from 'react';
import { FileText, CheckCircle2, BarChart3, RotateCw, Check, X } from 'lucide-react'; 
import { TraineeProgress } from '../../../services/adminService';
import { ICAD_2D_LESSONS, ICAD_3D_LESSONS } from '../../mentor/mentorConstants';

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
    const getLessonTitle = (lessonId: string, courseId: string) => {
        const lessons = courseId === '2' ? ICAD_2D_LESSONS : ICAD_3D_LESSONS;
        
        // Search in top level
        const topLesson = lessons.find(l => l.id === lessonId);
        if (topLesson) return topLesson.quiz?.title || topLesson.title;
        
        // Search in children
        for (const lesson of lessons) {
            if (lesson.children) {
                const child = lesson.children.find(c => c.id === lessonId);
                if (child) return child.quiz?.title || child.title;
            }
        }
        
        return `${courseId === '2' ? '2D' : '3D'} Assessment`;
    };

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

                        {/* Assessment Matrix - 3D Modeling */}
                        <div className="history-section matrix-section">
                            <h3><BarChart3 size={18} /> ICAD OPERATION MANUAL 3D MODELING</h3>
                            <div className="history-list">
                                {selectedTrainee.quizzes_history.filter(q => q.course_id === '1').length > 0 ? (
                                    selectedTrainee.quizzes_history
                                        .filter(q => q.course_id === '1')
                                        .map((q, i) => (
                                            <div key={i} className="history-item evaluation-card">
                                                <div className="score-pillar-container">
                                                    <div className="score-pillar-track">
                                                        <div className="score-pillar-fill" style={{ '--percent': `${q.score}%` } as React.CSSProperties}></div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="title">{getLessonTitle(q.lesson_id, q.course_id)}</div>
                                                    <div className="assessment-meta">
                                                        <span className="score-val">Score: {q.score}%</span>
                                                        <span className="attempt-val">
                                                            <RotateCw size={12} /> {q.attempts_count || 1} {q.attempts_count === 1 ? 'Attempt' : 'Attempts'}
                                                        </span>
                                                    </div>
                                                    <div className={`status-pill ${q.score >= 80 ? 'pass' : 'fail'}`}>
                                                        {q.score >= 80 ? <Check size={12} /> : <X size={12} />}
                                                        {q.score >= 80 ? 'Passed' : 'Failed'}
                                                    </div>
                                                </div>
                                                <div className="assessment-date">
                                                    {q.completed_at ? new Date(q.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="empty-state">No 3D modeling assessments recorded.</div>
                                )}
                            </div>
                        </div>

                        {/* Assessment Matrix - 2D Drawing */}
                        <div className="history-section matrix-section">
                            <h3><FileText size={18} /> ICAD OPERATION MANUAL 2D DRAWING</h3>
                            <div className="history-list">
                                {selectedTrainee.quizzes_history.filter(q => q.course_id === '2').length > 0 ? (
                                    selectedTrainee.quizzes_history
                                        .filter(q => q.course_id === '2')
                                        .map((q, i) => (
                                            <div key={i} className="history-item evaluation-card">
                                                <div className="score-pillar-container">
                                                    <div className="score-pillar-track">
                                                        <div className="score-pillar-fill" style={{ '--percent': `${q.score}%` } as React.CSSProperties}></div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="title">{getLessonTitle(q.lesson_id, q.course_id)}</div>
                                                    <div className="assessment-meta">
                                                        <span className="score-val">Score: {q.score}%</span>
                                                        <span className="attempt-val">
                                                            <RotateCw size={12} /> {q.attempts_count || 1} {q.attempts_count === 1 ? 'Attempt' : 'Attempts'}
                                                        </span>
                                                    </div>
                                                    <div className={`status-pill ${q.score >= 80 ? 'pass' : 'fail'}`}>
                                                        {q.score >= 80 ? <Check size={12} /> : <X size={12} />}
                                                        {q.score >= 80 ? 'Passed' : 'Failed'}
                                                    </div>
                                                </div>
                                                <div className="assessment-date">
                                                    {q.completed_at ? new Date(q.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="empty-state">No 2D drawing assessments recorded.</div>
                                )}
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
};
