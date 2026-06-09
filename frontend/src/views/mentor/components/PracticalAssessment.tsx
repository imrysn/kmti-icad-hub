import React, { useState, useEffect } from 'react';
import { FileText, Upload, Play, CheckCircle2, AlertCircle, Clock, Download, Lock, Zap, Edit3, Trash2, FileSpreadsheet, ChevronRight, UploadCloud } from 'lucide-react';
import { assessmentService, AssessmentTask, AssessmentSubmission } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { useNotification } from '../../../context/NotificationContext';
import '../../../styles/mentor/PracticalAssessment.css';
import '../../../styles/3D_Modeling/CourseLesson.css';

interface PracticalAssessmentProps {
    onBack: () => void;
}

/** Ordinal label helper */
const getSetLabel = (n: number): string => {
    const ordinals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
    const suffix = n <= 3 ? 'Set Parts' : 'Set Parts and Assembly';
    return `${ordinals[n - 1]} ${suffix}`;
};

export const PracticalAssessment: React.FC<PracticalAssessmentProps> = ({ onBack }) => {
    const { showNotification } = useNotification();
    const [tasks, setTasks] = useState<AssessmentTask[]>([]);
    const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeSet, setActiveSet] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [expandedFeedbackId, setExpandedFeedbackId] = useState<number | null>(null);
    const [uploadingTaskId, setUploadingTaskId] = useState<number | null>(null);

    useEffect(() => {
        fetchData();
        
        // Polling for updates every 10 seconds (silent background refresh)
        const pollInterval = setInterval(() => fetchData(true), 10000);
        
        return () => clearInterval(pollInterval);
    }, []);

    const fetchData = async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        try {
            const [tasksData, submissionsData] = await Promise.all([
                assessmentService.getTasks(),
                assessmentService.getMySubmissions()
            ]);
            setTasks(tasksData);
            setSubmissions(submissionsData);
        } catch (err) {
            if (!isSilent) showNotification('Failed to load assessment data.', 'error');
        } finally {
            if (!isSilent) setLoading(false);
        }
    };

    const sets = Array.from({ length: 10 }, (_, i) => i + 1);
    const currentSetTasks = tasks.filter(t => t.set_number === activeSet);

    const handleOpenInIJCAD = async (task: AssessmentTask) => {
        if (window.electronAPI && window.electronAPI.downloadAndOpen) {
            try {
                const url = assessmentService.getDownloadUrl(task.id);
                const filename = `Set${task.set_number}_${task.task_code}_Master.dwg`;
                const token = authService.getToken();

                if (!token) {
                    showNotification('Session expired. Please login again.', 'error');
                    return;
                }

                showNotification(`Preparing ${task.title}...`, 'info');
                await window.electronAPI.downloadAndOpen({ url, filename, token });
                showNotification(`${task.title} opened in iJCAD.`, 'success');
            } catch (err) {
                console.error('Failed to open in iJCAD:', err);
                showNotification('Failed to launch iJCAD. Please check if it is installed.', 'error');
            }
        } else {
            showNotification('iJCAD integration is only available in the Desktop App.', 'warning');
        }
    };

    const handleOpenFeedbackExcel = async (submission: AssessmentSubmission) => {
        if (!submission.feedback || submission.feedback.length === 0) return;
        const feedback = submission.feedback[0];

        if (window.electronAPI && window.electronAPI.downloadAndOpen) {
            try {
                const url = assessmentService.getFeedbackDownloadUrl(feedback.id);
                const filename = `Checkback_${submission.user?.username}_${submission.task?.task_code}.xlsx`;
                const token = authService.getToken();

                if (!token) return;

                showNotification('Opening checkback file...', 'info');
                await window.electronAPI.downloadAndOpen({ url, filename, token });
            } catch (err) {
                console.error('Failed to open Excel:', err);
                showNotification('Failed to open Excel file.', 'error');
            }
        } else {
            handleDownloadFeedback(submission);
        }
    };

    const handleDownloadFeedback = async (submission: AssessmentSubmission) => {
        if (!submission.feedback || submission.feedback.length === 0) return;
        const feedback = submission.feedback[0];
        const token = authService.getToken();

        if (!token) {
            showNotification('Session expired. Please login again.', 'error');
            return;
        }

        try {
            showNotification('Preparing download...', 'info');
            const response = await fetch(assessmentService.getFeedbackDownloadUrl(feedback.id), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 403 || response.status === 401) {
                    showNotification('Authentication failed. Please login again.', 'error');
                } else {
                    throw new Error('Download failed');
                }
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `Checkback_${submission.user?.username}_${submission.task?.task_code}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            showNotification('Download started.', 'success');
        } catch (err) {
            console.error('Download error:', err);
            showNotification('Failed to download file.', 'error');
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, task: AssessmentTask) => {
        if (!e.target.files?.[0]) return;
        
        const file = e.target.files[0];
        const validExtensions = ['.dwg', '.icd', '.dxf', '.step', '.stp', '.iges', '.igs', '.sat', '.3dm'];
        const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
        if (!validExtensions.includes(ext)) {
            showNotification('Please upload a valid CAD file (.dwg, .icd, .dxf, .step, etc.).', 'error');
            return;
        }

        setUploadingTaskId(task.id);
        setIsSubmitting(true);
        try {
            await assessmentService.submitTask(task.id, file);
            showNotification('Task submitted successfully! Awaiting trainer review.', 'success');
            fetchData();
        } catch (err) {
            showNotification('Failed to submit task.', 'error');
        } finally {
            setIsSubmitting(false);
            setUploadingTaskId(null);
        }
    };

    if (loading) {
        return (
            <div className="assessment-loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', width: '100%', gap: '1rem' }}>
                <div className="spinner"></div>
                <p style={{ margin: 0 }}>Preparing your assessment environment...</p>
            </div>
        );
    }

    return (
        <>
            {/* ── Sidebar: Set Pill Navigator ── */}
            <aside className="assessment-sidebar">
                <div className="sidebar-inner-container">
                    <div className="sidebar-course-header">
                        <div className="sidebar-course-meta">
                            <h2 className="sidebar-course-title">Assessment Sets</h2>
                        </div>
                        <span className="task-count">{sets.length} Sets</span>
                    </div>

                    <div className="sidebar-set-list">
                        {sets.map(s => {
                            const setTasks = tasks.filter(t => t.set_number === s);
                            const isCompleted = setTasks.length > 0 && setTasks.every(t => 
                                submissions.some(sub => sub.task_id === t.id && sub.status === 'approved')
                            );

                            let isLocked = false;
                            if (s > 1) {
                                const prevSetTasks = tasks.filter(t => t.set_number === s - 1);
                                const isPrevCompleted = prevSetTasks.length > 0 && prevSetTasks.every(t => 
                                    submissions.some(sub => sub.task_id === t.id && (sub.status === 'approved' || sub.status === 'pending'))
                                );
                                isLocked = !isPrevCompleted;
                            }

                            return (
                                <button 
                                    key={s} 
                                    className={`sidebar-set-pill ${activeSet === s ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                                    onClick={() => !isLocked && setActiveSet(s)}
                                    disabled={isLocked}
                                >
                                    <span className="sidebar-set-indicator">
                                        {isLocked ? <Lock size={14} /> : isCompleted ? <CheckCircle2 size={14} /> : <span className="set-number-badge">{s}</span>}
                                    </span>
                                    <span className="sidebar-set-label">{getSetLabel(s)}</span>
                                    <span className="sidebar-set-task-count">{setTasks.length} tasks</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="main-content-viewer">
                {/* Sticky Header */}
                <div className="sticky-lesson-controls" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                            {getSetLabel(activeSet)}
                        </h3>
                        <span className="task-count">{currentSetTasks.length} Tasks</span>
                    </div>
                    <button className="exit-course-btn" onClick={onBack}>
                        EXIT COURSE
                    </button>
                </div>

                {/* Task Row Cards */}
                <div className="lesson-split-layout">
                    <div className="lesson-scroll-area assessment-scroll-override">
                        <div className="lesson-content-body">
                            <div className="assessment-task-grid">
                                {currentSetTasks.length > 0 ? (
                                    currentSetTasks.map((task, index) => {
                                        const taskSubmissions = submissions.filter(s => {
                                            const subTaskId = s.task?.id || s.task_id;
                                            return Number(subTaskId) === Number(task.id);
                                        }).sort((a, b) => {
                                            const dateA = new Date(a.submitted_at).getTime();
                                            const dateB = new Date(b.submitted_at).getTime();
                                            return dateB - dateA;
                                        });
                                        
                                        const latestSubmission = taskSubmissions[0];
                                        // Find the most recent submission that has feedback (for rejection comments)
                                        const feedbackSubmission = taskSubmissions.find(s => s.feedback && s.feedback.length > 0) || latestSubmission;
                                        
                                        const isUploading = uploadingTaskId === task.id && isSubmitting;
                                        const uploadId = `cad-upload-${task.id}`;

                                        return (
                                            <div key={task.id} className="task-row-card animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                                {/* Row Header */}
                                                <div className="task-row-header">
                                                    <div className="task-row-info">
                                                        <div className="task-row-code">{task.task_code}</div>
                                                        <div className="task-row-meta">
                                                            <h4 className="task-row-title">{task.title}</h4>
                                                            <p className="task-row-desc">
                                                                {task.description || "Follow the drafting standards specified in the master drawing."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="task-row-actions">
                                                        <button className="task-action-btn primary" onClick={() => handleOpenInIJCAD(task)}>
                                                            <Play size={14} /> Open in iJCAD
                                                        </button>
                                                        <button className="task-action-btn secondary" onClick={() => handleOpenInIJCAD(task)}>
                                                            <Download size={14} /> Download
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Row Body: Upload + Feedback side by side */}
                                                <div className="task-row-body">
                                                    {/* Upload Section */}
                                                    <div className="task-row-upload">
                                                        <div className="upload-header-row">
                                                            <span className="task-row-section-label">Your Submissions {taskSubmissions.length > 0 ? `(${taskSubmissions.length})` : ''}</span>
                                                            <label htmlFor={uploadId} className={`resubmit-trigger-btn ${isUploading ? 'disabled' : ''}`}>
                                                                <Upload size={14} /> {latestSubmission ? 'Resubmit' : 'Upload'}
                                                            </label>
                                                        </div>

                                                        <div className="submissions-history-list">
                                                            {taskSubmissions.length > 0 ? (
                                                                taskSubmissions.map((sub, sIdx) => (
                                                                    <div key={sub.id} className={`uploaded-file-card history-item ${sIdx === 0 ? 'latest' : ''}`}>
                                                                        <div className="uploaded-file-info">
                                                                            <FileText size={18} />
                                                                            <div className="file-meta-stack">
                                                                                <span className="uploaded-file-name">
                                                                                    {sub.submission_file_path?.split(/[\\/]/).pop()}
                                                                                </span>
                                                                                <div className="history-badges">
                                                                                    {sIdx === 0 && <span className="history-badge latest">Latest</span>}
                                                                                    {sIdx > 0 && <span className="history-badge resubmit">Attempt {taskSubmissions.length - sIdx}</span>}
                                                                                    <div className={`assessment-status-badge ${sub.status}`}>
                                                                                        {sub.status === 'approved' && <CheckCircle2 size={12} />}
                                                                                        {sub.status === 'pending' && <Clock size={12} />}
                                                                                        {sub.status === 'rejected' && <AlertCircle size={12} />}
                                                                                        <span>{sub.status}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="table-actions-horizontal">
                                                                            <button 
                                                                                className="action-btn-styled delete" 
                                                                                title="Delete submission"
                                                                                onClick={async () => {
                                                                                    if (window.confirm("Are you sure you want to delete this submission?")) {
                                                                                        try {
                                                                                            await assessmentService.deleteSubmission(sub.id);
                                                                                            showNotification('Submission deleted.', 'success');
                                                                                            fetchData();
                                                                                        } catch (err) {
                                                                                            showNotification('Failed to delete.', 'error');
                                                                                        }
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Trash2 size={14} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="no-submissions-yet">
                                                                    <div className="empty-upload-placeholder">
                                                                        <UploadCloud size={24} />
                                                                        <p>No files uploaded yet</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <input 
                                                            type="file" id={uploadId}
                                                            accept=".dwg,.icd,.dxf,.step,.stp,.iges,.igs,.sat,.3dm" 
                                                            onChange={(e) => handleFileUpload(e, task)}
                                                            disabled={isUploading}
                                                            style={{ display: 'none' }}
                                                        />
                                                    </div>

                                                    {/* Trainer Feedback Section */}
                                                    <div className="task-row-feedback">
                                                        <span className="task-row-section-label">Trainer Feedback</span>
                                                        {feedbackSubmission?.status && feedbackSubmission.status !== 'pending' ? (
                                                            <>
                                                                {expandedFeedbackId === feedbackSubmission.id ? (
                                                                    <div className={`feedback-container ${feedbackSubmission.status} animate-scale-in`}>
                                                                        <div className="feedback-header-row" onClick={() => setExpandedFeedbackId(null)}>
                                                                            <div className="feedback-status-info">
                                                                                {feedbackSubmission.status === 'approved' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                                                                <span>{feedbackSubmission.status === 'approved' ? 'Submission Approved' : 'Revision Required'}</span>
                                                                            </div>
                                                                            <span className="close-feedback-btn">Close</span>
                                                                        </div>
                                                                        
                                                                        {feedbackSubmission.feedback && feedbackSubmission.feedback.length > 0 && (
                                                                            <div className="feedback-details">
                                                                                {feedbackSubmission.feedback[0].comments && (
                                                                                    <div className="feedback-comment">
                                                                                        <p>{feedbackSubmission.feedback[0].comments}</p>
                                                                                    </div>
                                                                                )}

                                                                                {/* Trainee Reply Display */}
                                                                                {feedbackSubmission.feedback[0].trainee_reply && (
                                                                                    <div className="feedback-trainee-reply">
                                                                                        <div className="reply-header">
                                                                                            <span className="reply-badge">Your Reply</span>
                                                                                            {feedbackSubmission.feedback[0].replied_at && (
                                                                                                <small>{new Date(feedbackSubmission.feedback[0].replied_at).toLocaleDateString()}</small>
                                                                                            )}
                                                                                        </div>
                                                                                        <p>{feedbackSubmission.feedback[0].trainee_reply}</p>
                                                                                    </div>
                                                                                )}

                                                                                {/* Reply Input (only if no reply yet) */}
                                                                                {!feedbackSubmission.feedback[0].trainee_reply && (
                                                                                    <div className="feedback-reply-input-group">
                                                                                        <textarea 
                                                                                            placeholder="Reply to trainer comment..."
                                                                                            className="reply-textarea"
                                                                                            id={`reply-to-${feedbackSubmission.feedback[0].id}`}
                                                                                        />
                                                                                        <button 
                                                                                            className="reply-submit-btn"
                                                                                            onClick={async () => {
                                                                                                const feedbackItems = feedbackSubmission.feedback;
                                                                                                if (!feedbackItems || feedbackItems.length === 0) return;
                                                                                                
                                                                                                const feedbackId = feedbackItems[0].id;
                                                                                                const textarea = document.getElementById(`reply-to-${feedbackId}`) as HTMLTextAreaElement;
                                                                                                const text = textarea?.value?.trim();
                                                                                                if (!text) return;
                                                                                                
                                                                                                try {
                                                                                                    await assessmentService.replyToFeedback(feedbackId, text);
                                                                                                    showNotification('Reply sent successfully!', 'success');
                                                                                                    fetchData();
                                                                                                } catch (err: any) {
                                                                                                    const errorData = err.response?.data?.detail;
                                                                                                    const errorMsg = Array.isArray(errorData) 
                                                                                                        ? errorData[0].msg 
                                                                                                        : (typeof errorData === 'string' ? errorData : 'Failed to send reply.');
                                                                                                    showNotification(errorMsg, 'error');
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            Send Reply
                                                                                        </button>
                                                                                    </div>
                                                                                )}
                                                                                
                                                                                {feedbackSubmission.feedback[0].checkback_file_path && (
                                                                                    <div className="feedback-file-actions">
                                                                                        <button 
                                                                                            className="checkback-open-btn"
                                                                                            onClick={() => handleOpenFeedbackExcel(feedbackSubmission)}
                                                                                        >
                                                                                            <FileSpreadsheet size={16} />
                                                                                            Open in Excel
                                                                                        </button>
                                                                                        <a 
                                                                                            href="#"
                                                                                            className="checkback-download-icon-btn"
                                                                                            title="Download copy"
                                                                                            onClick={(e) => {
                                                                                                e.preventDefault();
                                                                                                e.stopPropagation();
                                                                                                handleDownloadFeedback(feedbackSubmission);
                                                                                            }}
                                                                                        >
                                                                                            <Download size={14} />
                                                                                        </a>
                                                                                    </div>
                                                                                )}
                                                                                {feedbackSubmission.status === 'rejected' && latestSubmission?.status === 'rejected' && (
                                                                                    <div className="feedback-resubmit-action">
                                                                                        <button 
                                                                                            className="btn-primary resubmit-work-btn"
                                                                                            onClick={() => document.getElementById(uploadId)?.click()}
                                                                                        >
                                                                                            <Upload size={14} /> Resubmit Corrected Work
                                                                                        </button>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div 
                                                                        className={`feedback-message ${feedbackSubmission.status} clickable animate-fade-in`}
                                                                        onClick={() => setExpandedFeedbackId(feedbackSubmission.id)}
                                                                    >
                                                                        {feedbackSubmission.status === 'approved' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                                                        <span className="feedback-preview-text">
                                                                            {feedbackSubmission.feedback?.[0]?.comments || (feedbackSubmission.status === 'approved' ? 'Approved by trainer' : 'Revision required')}
                                                                        </span>
                                                                        <ChevronRight size={14} className="expand-icon" />
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <div className="feedback-message empty">
                                                                {latestSubmission?.status === 'pending' ? <Clock size={14} /> : <FileText size={14} />}
                                                                <span>{latestSubmission?.status === 'pending' ? 'Waiting for trainer review' : 'No feedback yet'}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="no-task-selected-portal animate-fade-in">
                                        <div className="portal-aura"></div>
                                        <div className="portal-content">
                                            <div className="portal-icon-wrapper">
                                                <Zap size={64} className="portal-icon" />
                                            </div>
                                            <h2>No Tasks Available</h2>
                                            <p>There are no tasks assigned for {getSetLabel(activeSet)} yet. Check back later or contact your trainer.</p>
                                            <div className="portal-hint">
                                                <div className="hint-item">
                                                    <div className="hint-dot"></div>
                                                    <span>10 Sequential Sets</span>
                                                </div>
                                                <div className="hint-item">
                                                    <div className="hint-dot"></div>
                                                    <span>Direct iJCAD Integration</span>
                                                </div>
                                                <div className="hint-item">
                                                    <div className="hint-dot"></div>
                                                    <span>Trainer Checkback System</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
