import React, { useState, useEffect } from 'react';
import { User, CheckCircle2, XCircle, Clock, Download, Upload, Eye, ChevronRight, Search, FileText, ChevronDown, ChevronUp, MessageSquare, Play } from 'lucide-react';
import { assessmentService, AssessmentSubmission } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { useNotification } from '../../../context/NotificationContext';
import '../../../styles/mentor/PracticalTrainerDashboard.css';

export const PracticalTrainerDashboard: React.FC = () => {
    const { showNotification } = useNotification();
    const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTaskSubmissions, setSelectedTaskSubmissions] = useState<AssessmentSubmission[] | null>(null);
    const [isReviewing, setIsReviewing] = useState(false);
    const [feedbackComments, setFeedbackComments] = useState('');
    const [feedbackFile, setFeedbackFile] = useState<File | null>(null);
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
    const [statusFilter, setStatusFilter] = useState<'pending' | 'all'>('pending');
    const [expandedTrainees, setExpandedTrainees] = useState<number[]>([]);
    const [expandedSets, setExpandedSets] = useState<string[]>([]);

    // Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isReviewing) {
                setIsReviewing(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isReviewing]);

    useEffect(() => {
        fetchSubmissions();
    }, [statusFilter]);

    // WebSocket connection for real-time updates
    useEffect(() => {
        const token = authService.getToken();
        if (!token) return;

        // Determine correct WebSocket URL based on current host
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.hostname}:8000/notifications/ws?token=${token}`;
        
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log("Connected to Real-Time Notification Server");
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.event === "NEW_SUBMISSION") {
                    showNotification(`${data.trainee_name} just submitted Set ${data.set_number} Task ${data.task_code}`, 'info', 6000);
                    fetchSubmissions(); // Auto-refresh the dashboard
                } else if (data.event === "NEW_REPLY") {
                    showNotification(`${data.trainee_name} replied to your feedback.`, 'info', 6000);
                    fetchSubmissions(); // Auto-refresh the dashboard
                }
            } catch (err) {
                console.error("Failed to parse websocket message", err);
            }
        };

        ws.onclose = () => {
            console.log("Disconnected from Real-Time Notification Server");
        };

        return () => {
            ws.close();
        };
    }, []);

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const data = await assessmentService.getTrainerSubmissions(statusFilter);
            setSubmissions(data);
        } catch (err) {
            showNotification('Failed to load submissions.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadTraineeFile = (submission: AssessmentSubmission) => {
        const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/assessments/submissions/${submission.id}/download`;
        const token = authService.getToken();
        
        fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Submission_${submission.user?.username}_Set${submission.task?.set_number}_${submission.task?.task_code}.dwg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(err => showNotification('Download failed.', 'error'));
    };

    const handleOpenInIJCAD = async (submission: AssessmentSubmission) => {
        if (window.electronAPI && window.electronAPI.downloadAndOpen) {
            try {
                const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/assessments/submissions/${submission.id}/download`;
                const token = authService.getToken() || '';
                const filename = `Submission_${submission.user?.username}_Set${submission.task?.set_number}_${submission.task?.task_code}.dwg`;
                
                showNotification('Opening submission in CAD...', 'info');
                await window.electronAPI.downloadAndOpen({ url, filename, token });
                showNotification(`Submission opened in CAD.`, 'success');
            } catch (err) {
                console.error('Failed to open in CAD:', err);
                showNotification('Failed to launch CAD application. Please check if it is installed.', 'error');
            }
        } else {
            // Fallback to regular download if not in Electron or IPC missing
            handleDownloadTraineeFile(submission);
        }
    };
    
    const handleDownloadCheckback = async (feedback: any) => {
        const token = authService.getToken();
        if (!token) return;
        try {
            const response = await fetch(assessmentService.getFeedbackDownloadUrl(feedback.id), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Download failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Checkback.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            showNotification('Failed to download checkback file.', 'error');
        }
    };

    const handleSubmitFeedback = async (status: 'approved' | 'rejected') => {
        if (!selectedTaskSubmissions || selectedTaskSubmissions.length === 0) return;
        const latestSubmission = selectedTaskSubmissions[0];
        
        if (status === 'rejected' && !feedbackComments) {
            showNotification('Please provide comments for rejection.', 'warning');
            return;
        }

        setIsSubmittingFeedback(true);
        try {
            await assessmentService.provideFeedback(
                latestSubmission.id, 
                status, 
                feedbackFile || undefined, 
                feedbackComments
            );
            showNotification(`Submission ${status} successfully.`, 'success');
            setIsReviewing(false);
            setSelectedTaskSubmissions(null);
            setFeedbackComments('');
            setFeedbackFile(null);
            fetchSubmissions();
        } catch (err) {
            showNotification('Failed to submit feedback.', 'error');
        } finally {
            setIsSubmittingFeedback(false);
        }
    };

    const filteredSubmissions = submissions.filter(s => 
        s.user?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.task?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Grouping: Trainee -> Set -> Task -> Submissions Array
    const grouped = filteredSubmissions.reduce((acc, sub) => {
        if (!sub.user || !sub.task) return acc;
        const traineeId = sub.user.id;
        const setNum = sub.task.set_number;
        const taskId = sub.task.id;
        
        if (!acc[traineeId]) acc[traineeId] = { user: sub.user, sets: {} };
        if (!acc[traineeId].sets[setNum]) acc[traineeId].sets[setNum] = { tasks: {} };
        if (!acc[traineeId].sets[setNum].tasks[taskId]) acc[traineeId].sets[setNum].tasks[taskId] = [];
        
        acc[traineeId].sets[setNum].tasks[taskId].push(sub);
        return acc;
    }, {} as Record<number, any>);

    const toggleTrainee = (id: number) => {
        setExpandedTrainees(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleSet = (key: string) => {
        setExpandedSets(prev => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]);
    };
    
    useEffect(() => {
        if (Object.keys(grouped).length > 0 && expandedTrainees.length === 0) {
            const firstTraineeId = Number(Object.keys(grouped)[0]);
            setExpandedTrainees([firstTraineeId]);
            const firstSet = Object.keys(grouped[firstTraineeId].sets)[0];
            if (firstSet) {
                setExpandedSets([`${firstTraineeId}-${firstSet}`]);
            }
        }
    }, [grouped, expandedTrainees.length]);

    if (loading) {
        return (
            <div className="trainer-dashboard">
                <div className="trainer-header skeleton-header">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-search"></div>
                </div>
                <div className="skeleton-cards">
                    <div className="skeleton-card"></div>
                    <div className="skeleton-card"></div>
                    <div className="skeleton-card"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="trainer-dashboard animate-fade-in">
            <div className="trainer-header">
                <div className="header-info">
                    <h2>Assessment Review Portal</h2>
                    <p>Manage and verify practical drafting submissions from trainees</p>
                </div>
                <div className="header-controls">
                    <div className="admin-sub-tabs">
                        <button 
                            className={`sub-tab-btn ${statusFilter === 'pending' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('pending')}
                        >
                            <Clock size={16} /> Pending Reviews
                        </button>
                        <button 
                            className={`sub-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('all')}
                        >
                            <CheckCircle2 size={16} /> Review History
                        </button>
                    </div>
                    <div className="search-bar">
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Search trainee or task..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grouped-submissions-container">
                {Object.keys(grouped).length > 0 ? (
                    Object.values(grouped).map((traineeGroup: any) => {
                        const traineeId = traineeGroup.user.id;
                        const isTraineeExpanded = expandedTrainees.includes(traineeId);
                        
                        let pendingCount = 0;
                        Object.values(traineeGroup.sets).forEach((setGroup: any) => {
                             Object.values(setGroup.tasks).forEach((subs: any) => {
                                 const latest = subs.sort((a: any,b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())[0];
                                 if (latest.status === 'pending') pendingCount++;
                             });
                        });

                        return (
                            <div key={traineeId} className="trainee-group-card">
                                <div className="trainee-group-header" onClick={() => toggleTrainee(traineeId)}>
                                    <div className="trainee-info">
                                        <div className="avatar-circle">
                                            {traineeGroup.user.full_name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <h4>{traineeGroup.user.full_name}</h4>
                                            <span>@{traineeGroup.user.username}</span>
                                        </div>
                                    </div>
                                    <div className="trainee-header-right">
                                        {pendingCount > 0 && <span className="pending-badge">{pendingCount} Pending</span>}
                                        {isTraineeExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>

                                {isTraineeExpanded && (
                                    <div className="trainee-group-body">
                                        {Object.keys(traineeGroup.sets).sort((a,b)=>Number(a)-Number(b)).map(setNum => {
                                            const setKey = `${traineeId}-${setNum}`;
                                            const isSetExpanded = expandedSets.includes(setKey);
                                            const tasks = Object.values(traineeGroup.sets[setNum].tasks);
                                            
                                            return (
                                                <div key={setKey} className="set-group">
                                                    <div className="set-group-header" onClick={() => toggleSet(setKey)}>
                                                        <h4>Set {setNum} <span className="task-count-dim">({tasks.length} tasks)</span></h4>
                                                        {isSetExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                    </div>
                                                    
                                                    {isSetExpanded && (
                                                        <div className="set-tasks-grid">
                                                            {tasks.map((taskSubmissions: any) => {
                                                                const sortedSubs = [...taskSubmissions].sort((a: any,b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
                                                                const latestSub = sortedSubs[0];
                                                                
                                                                return (
                                                                    <div key={latestSub.task.id} className="submission-card small">
                                                                        <div className="card-header compact">
                                                                            <span className="set-tag">Unit {latestSub.task.task_code}</span>
                                                                            <div className={`status-badge ${latestSub.status}`}>
                                                                                {latestSub.status === 'approved' && <CheckCircle2 size={12} />}
                                                                                {latestSub.status === 'pending' && <Clock size={12} />}
                                                                                {latestSub.status === 'rejected' && <XCircle size={12} />}
                                                                                <span>{latestSub.status.charAt(0).toUpperCase() + latestSub.status.slice(1)}</span>
                                                                            </div>
                                                                        </div>
                                                                        <h3 className="task-title-trunc">{latestSub.task.title}</h3>
                                                                        <div className="submission-meta compact-meta">
                                                                            <Clock size={12} /> {new Date(latestSub.submitted_at).toLocaleDateString()}
                                                                            {sortedSubs.length > 1 && <span className="attempt-badge">{sortedSubs.length} Attempts</span>}
                                                                        </div>
                                                                        <div className="card-actions compact-actions">
                                                                            <button className="btn-secondary" onClick={() => handleDownloadTraineeFile(latestSub)}>
                                                                                <Download size={14} /> DWG
                                                                            </button>
                                                                            <button className="btn-primary" onClick={() => {
                                                                                setSelectedTaskSubmissions(sortedSubs);
                                                                                setIsReviewing(true);
                                                                            }}>
                                                                                <Eye size={14} /> Review
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="no-submissions">
                        <CheckCircle2 size={48} />
                        <h3>All caught up!</h3>
                        <p>No pending submissions require your review at this time.</p>
                    </div>
                )}
            </div>

            {/* Review Modal with History & Chat */}
            {isReviewing && selectedTaskSubmissions && selectedTaskSubmissions.length > 0 && (
                <div className="modal-overlay" onClick={() => setIsReviewing(false)}>
                    <div className="review-modal enhanced animate-slide-up" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Review: {selectedTaskSubmissions[0].user?.full_name} - Set {selectedTaskSubmissions[0].task?.set_number} Unit {selectedTaskSubmissions[0].task?.task_code}</h3>
                            <button className="close-btn" onClick={() => setIsReviewing(false)}>
                                <XCircle size={24} />
                            </button>
                        </div>
                        
                        <div className="modal-body split-layout">
                            {/* Left Side: Submission History & Chat */}
                            <div className="history-chat-panel">
                                <h4><MessageSquare size={16}/> Submission History & Feedback</h4>
                                <div className="history-timeline">
                                    {selectedTaskSubmissions.map((sub, index) => (
                                        <div key={sub.id} className="history-node">
                                            <div className="node-marker">
                                                <div className={`node-dot ${sub.status}`}></div>
                                                {index !== selectedTaskSubmissions.length - 1 && <div className="node-line"></div>}
                                            </div>
                                            <div className="node-content">
                                                <div className="node-header">
                                                    <span className="node-title">Attempt {selectedTaskSubmissions.length - index}</span>
                                                    <span className="node-date">{new Date(sub.submitted_at).toLocaleString()}</span>
                                                </div>
                                                <div className="node-file">
                                                    <FileText size={14} /> 
                                                    <span className="file-name" title={sub.submission_file_path?.split(/[\\/]/).pop()}>
                                                        {sub.submission_file_path?.split(/[\\/]/).pop()}
                                                    </span>
                                                    <div className="node-file-actions">
                                                        <button 
                                                            className="action-icon-btn primary" 
                                                            onClick={() => handleOpenInIJCAD(sub)}
                                                            title="Open in CAD"
                                                        >
                                                            <Play size={14} /> Open
                                                        </button>
                                                        <button 
                                                            className="action-icon-btn" 
                                                            onClick={() => handleDownloadTraineeFile(sub)}
                                                            title="Download File"
                                                        >
                                                            <Download size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {/* Chat / Feedback Section */}
                                                {sub.feedback && sub.feedback.length > 0 ? (
                                                    sub.feedback.map(fb => (
                                                        <div key={fb.id} className="chat-container">
                                                            <div className="chat-bubble trainer-chat">
                                                                <span className="chat-author">You (Trainer)</span>
                                                                <p>{fb.comments || "No comments provided."}</p>
                                                                {fb.checkback_file_path && (
                                                                    <div className="chat-attachment" onClick={() => handleDownloadCheckback(fb)}>
                                                                        <FileText size={12}/> Checkback File
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {fb.trainee_reply && (
                                                                <div className="chat-bubble trainee-chat">
                                                                    <span className="chat-author">{sub.user?.full_name} (Trainee)</span>
                                                                    <p>{fb.trainee_reply}</p>
                                                                    {fb.replied_at && <span className="chat-time">{new Date(fb.replied_at).toLocaleString()}</span>}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="empty-chat-state">
                                                        <MessageSquare size={24} className="empty-chat-icon" />
                                                        <p>{sub.status === 'pending' ? 'Awaiting your review. This is the first attempt.' : 'No feedback left for this attempt.'}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Action Form */}
                            <div className="action-panel">
                                <div className="review-task-info">
                                    <span className="label">Current Status</span>
                                    <div className={`status-badge large ${selectedTaskSubmissions[0].status}`}>
                                        {selectedTaskSubmissions[0].status.toUpperCase()}
                                    </div>
                                </div>

                                {selectedTaskSubmissions[0].status === 'pending' ? (
                                    <div className="feedback-form">
                                        <div className="form-scroll-area">
                                            <div className="form-group">
                                                <label>Your Feedback / Comments</label>
                                                <textarea 
                                                    placeholder="Provide detailed feedback for the latest attempt..."
                                                    value={feedbackComments}
                                                    onChange={(e) => setFeedbackComments(e.target.value)}
                                                ></textarea>
                                            </div>

                                            <div className="form-group">
                                                <label>Excel Checkback File (Optional)</label>
                                                <div className="file-upload-area">
                                                    <input 
                                                        type="file" 
                                                        id="checkback-file" 
                                                        accept=".xlsx,.xls"
                                                        onChange={(e) => setFeedbackFile(e.target.files?.[0] || null)}
                                                    />
                                                    <label htmlFor="checkback-file" className={feedbackFile ? 'has-file' : ''}>
                                                        <Upload size={18} />
                                                        <span>{feedbackFile ? feedbackFile.name : 'Upload Excel Checkback'}</span>
                                                    </label>
                                                    {feedbackFile && (
                                                        <button 
                                                            type="button" 
                                                            className="clear-file-btn" 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setFeedbackFile(null);
                                                                const fileInput = document.getElementById('checkback-file') as HTMLInputElement;
                                                                if (fileInput) fileInput.value = '';
                                                            }}
                                                            title="Remove selected file"
                                                        >
                                                            <XCircle size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="modal-action-buttons">
                                            <button 
                                                className="btn-reject" 
                                                onClick={() => handleSubmitFeedback('rejected')}
                                                disabled={isSubmittingFeedback}
                                            >
                                                <XCircle size={16} /> Reject
                                            </button>
                                            <button 
                                                className="btn-approve" 
                                                onClick={() => handleSubmitFeedback('approved')}
                                                disabled={isSubmittingFeedback}
                                            >
                                                <CheckCircle2 size={16} /> Approve
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="already-reviewed">
                                        <CheckCircle2 size={48} className="success-icon" />
                                        <h3>Task {selectedTaskSubmissions[0].status}</h3>
                                        <p>This attempt has already been reviewed. If the trainee resubmits, it will appear as a new attempt.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
