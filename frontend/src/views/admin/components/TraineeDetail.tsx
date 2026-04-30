import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, CheckCircle2, BarChart3, RotateCw, Check, X, RotateCcw, Loader2 } from 'lucide-react';
import { TraineeProgress, adminService } from '../../../services/adminService';
import { useLessons } from '../../../hooks/useLessons';
import { useUI } from '../../../context/UIContext';
import { ProgressReportPrint } from './ProgressReportPrint';

interface TraineeDetailProps {
    selectedTrainee: TraineeProgress;
    setSelectedTrainee: (trainee: TraineeProgress | null) => void;
    onExport: (userId: number) => void;
    onRefresh: () => Promise<void>;
}

export const TraineeDetail: React.FC<TraineeDetailProps> = ({
    selectedTrainee,
    setSelectedTrainee,
    onExport,
    onRefresh
}) => {
    const { requestConfirmation } = useUI();
    const [reopeningId, setReopeningId] = useState<string | null>(null);
    const [isReopeningAll, setIsReopeningAll] = useState(false);
    const [isClosingAll, setIsClosingAll] = useState(false);
    const [targetScope, setTargetScope] = useState<'all' | '2D_Drawing' | '3D_Modeling'>('all');

    // Detailed Breakdown State
    const [breakdownData, setBreakdownData] = useState<any | null>(null);
    const [loadingBreakdownId, setLoadingBreakdownId] = useState<string | null>(null);

    // Fetch lessons for both courses to map IDs to titles
    const { lessons: modelingLessons } = useLessons(1);
    const { lessons: drawingLessons } = useLessons(2);

    const getLessonTitle = (lessonId: string, courseId: string) => {
        const lessons = courseId === '2' ? drawingLessons : modelingLessons;

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

    const handleReopenAssessment = async (quizSlug: string) => {
        const confirmed = await requestConfirmation({
            title: 'Reopen Assessment',
            message: `Are you sure you want to reopen the assessment "${quizSlug}" for ${selectedTrainee.full_name}? This will permanently delete their current score and all question attempts for this quiz.`,
            confirmText: 'Reopen & Reset',
            type: 'danger'
        });

        if (!confirmed) return;

        setReopeningId(quizSlug);
        try {
            await adminService.reopenAssessment(selectedTrainee.id, quizSlug);
            await onRefresh();
        } catch (error) {
            console.error('Failed to reopen assessment:', error);
            // Fallback to basic alert if endpoint fails (likely needs backend restart)
            alert('Failed to reopen assessment. Please ensure the backend server has been restarted to pick up the new changes.');
        } finally {
            setReopeningId(null);
        }
    };

    const handleReopenAll = async () => {
        const scopeLabel = targetScope === 'all' ? 'ALL' : (targetScope === '2D_Drawing' ? '2D Drawing' : '3D Modeling');
        const confirmed = await requestConfirmation({
            title: `Reset ${scopeLabel} Assessments`,
            message: `Are you sure you want to reset ${scopeLabel} assessment progress for ${selectedTrainee.full_name}? This will permanently delete scores and attempts for the selected scope. This action cannot be undone.`,
            confirmText: 'Reset Progress',
            type: 'danger'
        });

        if (!confirmed) return;

        setIsReopeningAll(true);
        try {
            await adminService.reopenAllAssessments(selectedTrainee.id, targetScope === 'all' ? undefined : targetScope);
            await onRefresh();
        } catch (error) {
            console.error('Failed to reset assessments:', error);
            alert('Failed to reset assessments. Please ensure the backend server is running.');
        } finally {
            setIsReopeningAll(false);
        }
    };

    const handleCloseAll = async () => {
        const scopeLabel = targetScope === 'all' ? 'ALL' : (targetScope === '2D_Drawing' ? '2D Drawing' : '3D Modeling');
        const confirmed = await requestConfirmation({
            title: `Close ${scopeLabel} Assessments`,
            message: `Are you sure you want to CLOSE (Complete) ${scopeLabel} assessments for ${selectedTrainee.full_name}? This will mark every module in the selected scope as 100% completed.`,
            confirmText: 'Complete All',
            type: 'danger'
        });

        if (!confirmed) return;

        setIsClosingAll(true);
        try {
            await adminService.closeAllAssessments(selectedTrainee.id, targetScope === 'all' ? undefined : targetScope);
            await onRefresh();
        } catch (error) {
            console.error('Failed to close assessments:', error);
            alert('Failed to close assessments. Please ensure the backend server is running.');
        } finally {
            setIsClosingAll(false);
        }
    };

    // Toggle global class for header blurring/layering (Full Screen Modal effect)
    React.useEffect(() => {
        if (breakdownData) {
            document.documentElement.classList.add('quiz-mode-active');
        } else {
            document.documentElement.classList.remove('quiz-mode-active');
        }
        return () => document.documentElement.classList.remove('quiz-mode-active');
    }, [breakdownData]);

    const handleViewBreakdown = async (quizSlug: string) => {
        setLoadingBreakdownId(quizSlug);
        try {
            const data = await adminService.getTraineeQuizAttempts(selectedTrainee.id, quizSlug);
            setBreakdownData(data);
        } catch (error) {
            console.error('Failed to fetch breakdown:', error);
            alert('Could not retrieve assessment breakdown.');
        } finally {
            setLoadingBreakdownId(null);
        }
    };

    const handlePrintReport = () => {
        window.print();
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
                        <div className="large-stat mastery-stat">
                            <span className="val">{selectedTrainee.average_score}%</span>
                            <span className="lab">Weighted Mastery Index</span>
                        </div>
                        {selectedTrainee.raw_average_score !== undefined && (
                            <div className="stat-sub-info" style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                                Raw Success Rate: {selectedTrainee.raw_average_score}%
                            </div>
                        )}

                        <button className="btn-secondary export-detail-btn" onClick={handlePrintReport}
                            style={{ marginTop: '1.5rem', width: '100%', gap: '0.5rem' }}
                        >
                            <FileText size={16} /> Export Progress Report
                        </button>

                        <div className="admin-action-scope" style={{ marginTop: '2rem' }}>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>BULK ACTION SCOPE</p>
                            <div className="scope-toggle" style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '2px', marginBottom: '1rem' }}>
                                <button
                                    className={`scope-btn ${targetScope === 'all' ? 'active' : ''}`}
                                    onClick={() => setTargetScope('all')}
                                    style={{ flex: 1, padding: '0.4rem', fontSize: '0.7rem', borderRadius: '6px', border: 'none', background: targetScope === 'all' ? 'rgba(255,255,255,0.1)' : 'transparent', color: targetScope === 'all' ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                                >
                                    ALL
                                </button>
                                <button
                                    className={`scope-btn ${targetScope === '2D_Drawing' ? 'active' : ''}`}
                                    onClick={() => setTargetScope('2D_Drawing')}
                                    style={{ flex: 1, padding: '0.4rem', fontSize: '0.7rem', borderRadius: '6px', border: 'none', background: targetScope === '2D_Drawing' ? 'rgba(255,255,255,0.1)' : 'transparent', color: targetScope === '2D_Drawing' ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                                >
                                    2D
                                </button>
                                <button
                                    className={`scope-btn ${targetScope === '3D_Modeling' ? 'active' : ''}`}
                                    onClick={() => setTargetScope('3D_Modeling')}
                                    style={{ flex: 1, padding: '0.4rem', fontSize: '0.7rem', borderRadius: '6px', border: 'none', background: targetScope === '3D_Modeling' ? 'rgba(255,255,255,0.1)' : 'transparent', color: targetScope === '3D_Modeling' ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                                >
                                    3D
                                </button>
                            </div>
                        </div>

                        <button className="reset-all-btn" onClick={handleReopenAll} disabled={isReopeningAll}
                            style={{ width: '100%', gap: '0.5rem' }}
                        >
                            {isReopeningAll ? <Loader2 size={16} className="spin" /> : <RotateCcw size={16} />}
                            Reset Assessments
                        </button>

                        <button className="reset-all-btn close-all-btn" onClick={handleCloseAll} disabled={isClosingAll}
                            style={{ marginTop: '0.5rem', width: '100%', gap: '0.5rem', background: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)', color: '#34d399' }}
                        >
                            {isClosingAll ? <Loader2 size={16} className="spin" /> : <CheckCircle2 size={16} />}
                            Close Assessments
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

                                                <div className="efficiency-breakdown" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.8rem', fontSize: '0.7rem' }}>
                                                    <div className="eff-item" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                                        1st Try: <span style={{ color: q.first_attempt_score && q.first_attempt_score >= 80 ? '#34d399' : '#f87171' }}>{q.first_attempt_score ?? 'N/A'}%</span>
                                                    </div>
                                                    <div className="eff-item" style={{
                                                        color: q.attempts_count > 5 ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                                                        fontWeight: q.attempts_count > 5 ? 600 : 400
                                                    }}>
                                                        Struggle Factor: {q.attempts_count > 5 ? 'High' : (q.attempts_count > 2 ? 'Moderate' : 'Low')}
                                                    </div>
                                                    <button
                                                        className="view-breakdown-link"
                                                        onClick={() => handleViewBreakdown(q.lesson_id)}
                                                        disabled={loadingBreakdownId === q.lesson_id}
                                                        style={{
                                                            marginLeft: 'auto',
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#60a5fa',
                                                            fontSize: '0.7rem',
                                                            textDecoration: 'underline',
                                                            cursor: 'pointer',
                                                            padding: 0
                                                        }}
                                                    >
                                                        {loadingBreakdownId === q.lesson_id ? 'Loading...' : 'View Breakdown'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="assessment-actions">
                                                <div className="assessment-date">
                                                    {q.completed_at ? new Date(q.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}
                                                </div>
                                                <button
                                                    className="reopen-btn"
                                                    title="Reopen Assessment (Clear Score)"
                                                    onClick={() => handleReopenAssessment(q.lesson_id)}
                                                    disabled={reopeningId === q.lesson_id}
                                                >
                                                    {reopeningId === q.lesson_id ? <Loader2 size={14} className="spin" /> : <RotateCcw size={14} />}
                                                    Reopen
                                                </button>
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
                                            <div className="assessment-actions">
                                                <div className="assessment-date">
                                                    {q.completed_at ? new Date(q.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}
                                                </div>
                                                <button
                                                    className="reopen-btn"
                                                    title="Reopen Assessment (Clear Score)"
                                                    onClick={() => handleReopenAssessment(q.lesson_id)}
                                                    disabled={reopeningId === q.lesson_id}
                                                >
                                                    {reopeningId === q.lesson_id ? <Loader2 size={14} className="spin" /> : <RotateCcw size={14} />}
                                                    Reopen
                                                </button>
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

            {/* Breakdown Modal - Rendered via Portal to ensure it sits above the title bar */}
            {breakdownData && createPortal(
                <div className="breakdown-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(var(--glass-blur))', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div className="breakdown-modal-content" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '850px', maxHeight: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
                        <div className="modal-header" style={{ padding: '2rem 2.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h2 style={{ margin: 0, color: 'var(--text-white)', fontSize: '1.5rem', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)' }}>Assessment Analytics</h2>
                                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                    {breakdownData.quiz_title} • <span style={{ color: 'var(--color-primary)' }}>{selectedTrainee.full_name}</span>
                                </p>
                            </div>
                            <button onClick={() => setBreakdownData(null)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-main)', width: '40px', height: '40px', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', boxShadow: 'var(--shadow-glow)' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body" style={{ padding: '2rem 2.5rem', overflowY: 'auto', flex: 1 }}>
                            {/* Performance Bar Graph Summary */}
                            <div className="performance-summary-section" style={{ marginBottom: '2.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.85rem', fontWeight: 600 }}>
                                    <span style={{ color: 'var(--text-muted)' }}>PERFORMANCE DISTRIBUTION</span>
                                    <span style={{ color: 'var(--text-white)' }}>
                                        {breakdownData.attempts.filter((a: any) => a.is_correct).length} / {breakdownData.attempts.length} Correct
                                    </span>
                                </div>
                                <div className="perf-bar-container" style={{ height: '12px', background: 'var(--bg-card)', borderRadius: 'var(--radius-full)', overflow: 'hidden', display: 'flex', border: '1px solid var(--border-color)' }}>
                                    {/* Correct Bar */}
                                    <div style={{ 
                                        width: `${(breakdownData.attempts.filter((a: any) => a.is_correct).length / breakdownData.attempts.length) * 100}%`,
                                        background: 'linear-gradient(90deg, #10b981, #34d399)',
                                        height: '100%'
                                    }}></div>
                                    {/* Incorrect Bar */}
                                    <div style={{ 
                                        width: `${(breakdownData.attempts.filter((a: any) => !a.is_correct).length / breakdownData.attempts.length) * 100}%`,
                                        background: 'linear-gradient(90deg, #ef4444, #f87171)',
                                        height: '100%'
                                    }}></div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                        CORRECT ({Math.round((breakdownData.attempts.filter((a: any) => a.is_correct).length / breakdownData.attempts.length) * 100)}%)
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                                        WRONG ({Math.round((breakdownData.attempts.filter((a: any) => !a.is_correct).length / breakdownData.attempts.length) * 100)}%)
                                    </div>
                                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                        AVG SPEED: <span style={{ color: 'var(--text-white)' }}>{Math.round(breakdownData.attempts.reduce((acc: number, curr: any) => acc + (curr.seconds_spent || 0), 0) / breakdownData.attempts.length)}s/q</span>
                                    </div>
                                </div>
                            </div>

                            <div className="attempts-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>QUESTION LOG</p>
                                {breakdownData.attempts.map((item: any, idx: number) => (
                                    <div key={idx} className="breakdown-item" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '1.2rem', border: `1px solid ${item.is_correct ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}`, boxShadow: 'var(--shadow-inner)' }}>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: item.is_correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: item.is_correct ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {item.is_correct ? <Check size={16} /> : <X size={16} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <p style={{ margin: 0, fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.8rem', lineHeight: 1.5, flex: 1 }}>{item.question_text}</p>
                                                    <span style={{ fontSize: '0.7rem', color: item.seconds_spent > 90 ? '#ef4444' : 'var(--text-muted)', fontWeight: 700, marginLeft: '1rem', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px' }}>
                                                        {item.seconds_spent}s
                                                    </span>
                                                </div>
                                                
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem' }}>
                                                    <div style={{ color: item.is_correct ? '#10b981' : '#ef4444' }}>
                                                        <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>Answer:</span>
                                                        <strong>{item.user_answer_index !== null ? item.options[item.user_answer_index] : 'No Answer'}</strong>
                                                    </div>
                                                    {!item.is_correct && (
                                                        <div style={{ color: '#10b981' }}>
                                                            <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>Correct Answer:</span>
                                                            <strong>{item.options[item.correct_answer_index]}</strong>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Hidden component for printing */}
            <ProgressReportPrint trainee={selectedTrainee} />
        </section>
    );
};
