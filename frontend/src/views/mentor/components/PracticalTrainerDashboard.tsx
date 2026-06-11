import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, Download, Upload, Eye, Search, FileText, ChevronDown, ChevronUp, MessageSquare, Play, TrendingUp, User, Settings, UploadCloud } from 'lucide-react';
import { assessmentService, AssessmentSubmission } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { api } from '../../../services/api';
import { useNotification } from '../../../context/NotificationContext';
import { TraineeSetConfiguration } from './TraineeSetConfiguration';
import { useBulkDownload } from '../../../hooks/useBulkDownload';
import '../../../styles/mentor/PracticalTrainerDashboard.css';

export const PracticalTrainerDashboard: React.FC = () => {
    const { showNotification } = useNotification();
    const location = useLocation();
    const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTaskSubmissions, setSelectedTaskSubmissions] = useState<AssessmentSubmission[] | null>(null);
    const [isReviewing, setIsReviewing] = useState(false);
    
    // New states for Bulk Set Review
    const [selectedSetSubmissions, setSelectedSetSubmissions] = useState<AssessmentSubmission[] | null>(null);
    const [isReviewingSet, setIsReviewingSet] = useState(false);

    const [feedbackComments, setFeedbackComments] = useState('');
    const [feedbackFile, setFeedbackFile] = useState<File | null>(null);
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
    const [statusFilter, setStatusFilter] = useState<'pending' | 'all'>('pending');
    const [expandedTrainees, setExpandedTrainees] = useState<number[]>([]);
    const [expandedSets, setExpandedSets] = useState<string[]>([]);

    const { handleBulkDownload, isDownloading: isBulkDownloading } = useBulkDownload();

    // Main Tabs & Progress Tracking
    const [activeMainTab, setActiveMainTab] = useState<'assessments' | 'progress' | 'sets'>('assessments');
    const [traineeProgressData, setTraineeProgressData] = useState<any[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subtabParam = params.get('subtab');
        if (subtabParam === 'assessments' || subtabParam === 'progress' || subtabParam === 'sets') {
            setActiveMainTab(subtabParam as any);
        }
    }, [location.search]);

    // Dynamic Deep-Link auto-expand and highlighting
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const targetTraineeId = params.get('traineeId');
        const targetSet = params.get('set');

        if (targetTraineeId) {
            const traineeIdNum = Number(targetTraineeId);
            setExpandedTrainees(prev => prev.includes(traineeIdNum) ? prev : [...prev, traineeIdNum]);

            if (targetSet) {
                const setKey = `${targetTraineeId}-${targetSet}`;
                setExpandedSets(prev => prev.includes(setKey) ? prev : [...prev, setKey]);
            }
        }
    }, [location.search, submissions]);

    // Auto-Scroll to highlighted card
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const targetUnit = params.get('unit');
        const targetTraineeId = params.get('traineeId');
        if (targetUnit && targetTraineeId) {
            const timer = setTimeout(() => {
                const element = document.querySelector('.highlighted-submission-card');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [location.search, submissions]);

    const fetchTraineeProgress = async () => {
        setLoadingProgress(true);
        try {
            const data = await assessmentService.getTrainerTraineesProgress();
            setTraineeProgressData(data);
        } catch (err) {
            showNotification('Failed to load trainee progress data.', 'error');
        } finally {
            setLoadingProgress(false);
        }
    };

    useEffect(() => {
        if (activeMainTab === 'progress') {
            fetchTraineeProgress();
        }
    }, [activeMainTab]);

    useEffect(() => {
        const handleProgressRefresh = () => {
            if (activeMainTab === 'progress') {
                fetchTraineeProgress();
            }
        };
        window.addEventListener('kmti-refresh-trainee-progress', handleProgressRefresh);
        return () => window.removeEventListener('kmti-refresh-trainee-progress', handleProgressRefresh);
    }, [activeMainTab]);

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
        ws.onmessage = () => {
            fetchSubmissions();
        };

        window.addEventListener('kmti-refresh-submissions', fetchSubmissions);
        return () => {
            ws.close();
            window.removeEventListener('kmti-refresh-submissions', fetchSubmissions);
        };
    }, [statusFilter]);

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
        const url = `${api.defaults.baseURL || 'http://localhost:3001'}/api/v1/assessments/submissions/${submission.id}/download`;
        const token = authService.getToken();

        fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const ext = submission.submission_file_path?.split('.').pop() || 'dwg';
                a.download = `Submission_${submission.user?.username}_Set${submission.task?.set_number}_${submission.task?.task_code}.${ext}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(err => showNotification('Download failed.', 'error'));
    };

    const handleOpenInIJCAD = async (submission: AssessmentSubmission, appName?: string) => {
        if (window.electronAPI && window.electronAPI.downloadAndOpen) {
            try {
                const url = `${api.defaults.baseURL || 'http://localhost:3001'}/api/v1/assessments/submissions/${submission.id}/download`;
                const token = authService.getToken() || '';
                const ext = submission.submission_file_path?.split('.').pop() || 'dwg';
                const filename = `Submission_${submission.user?.username}_Set${submission.task?.set_number}_${submission.task?.task_code}.${ext}`;

                showNotification(`Opening submission in ${appName ? appName : 'CAD'}...`, 'info');
                await window.electronAPI.downloadAndOpen({ url, filename, token, appName });
                showNotification(`Submission opened.`, 'success');
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

    const handleBulkSubmitFeedback = async (status: 'approved' | 'rejected') => {
        if (!selectedSetSubmissions || selectedSetSubmissions.length === 0) return;

        if (status === 'rejected' && !feedbackComments) {
            showNotification('Please provide comments for rejection.', 'warning');
            return;
        }

        setIsSubmittingFeedback(true);
        let successCount = 0;
        let failCount = 0;

        try {
            for (const sub of selectedSetSubmissions) {
                try {
                    await assessmentService.provideFeedback(
                        sub.id,
                        status,
                        feedbackFile || undefined,
                        feedbackComments
                    );
                    successCount++;
                } catch (err) {
                    console.error(`Failed to submit feedback for submission ${sub.id}`, err);
                    failCount++;
                }
            }

            if (failCount > 0) {
                showNotification(`Successfully ${status} ${successCount} tasks. Failed on ${failCount}.`, 'warning');
            } else {
                showNotification(`Successfully ${status} all ${successCount} tasks in the set.`, 'success');
            }

            setIsReviewingSet(false);
            setSelectedSetSubmissions(null);
            setFeedbackComments('');
            setFeedbackFile(null);
            fetchSubmissions();
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
        // Only run default expand if there are no deep-link parameters in URL
        const params = new URLSearchParams(location.search);
        if (params.get('traineeId')) return;

        if (Object.keys(grouped).length > 0 && expandedTrainees.length === 0) {
            const firstTraineeId = Number(Object.keys(grouped)[0]);
            setExpandedTrainees([firstTraineeId]);
            const firstSet = Object.keys(grouped[firstTraineeId].sets)[0];
            if (firstSet) {
                setExpandedSets([`${firstTraineeId}-${firstSet}`]);
            }
        }
    }, [grouped, expandedTrainees.length, location.search]);

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
            <div className="trainer-main-nav">
                <button
                    className={`main-nav-btn ${activeMainTab === 'assessments' ? 'active' : ''}`}
                    onClick={() => setActiveMainTab('assessments')}
                >
                    <FileText size={18} /> Practical Submissions
                </button>
                <button
                    className={`main-nav-btn ${activeMainTab === 'progress' ? 'active' : ''}`}
                    onClick={() => setActiveMainTab('progress')}
                >
                    <CheckCircle2 size={18} /> Trainee Progress Tracker
                </button>
                <button
                    className={`main-nav-btn ${activeMainTab === 'sets' ? 'active' : ''}`}
                    onClick={() => setActiveMainTab('sets')}
                >
                    <Settings size={18} /> Set Configuration
                </button>
            </div>

            <div className="trainer-header">
                <div className="header-info">
                    <h2>
                        {activeMainTab === 'assessments' ? "Assessment Review Portal" : 
                         activeMainTab === 'progress' ? "Trainee Progress Tracker" : 
                         "Trainee Set Configuration"}
                    </h2>
                    <p>
                        {activeMainTab === 'assessments'
                            ? "Manage and verify practical drafting submissions from trainees"
                            : activeMainTab === 'progress'
                                ? "Monitor lesson scores, curriculum completion rates, and practical assessment attempts"
                                : "Configure which assessment sets each trainee can see and access"}
                    </p>
                </div>
                <div className="header-controls">
                    {activeMainTab === 'assessments' && (
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
                    )}
                    <div className="search-bar">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder={activeMainTab === 'assessments' ? "Search trainee or task..." : "Search trainee name..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Assessments Tab */}
            {activeMainTab === 'assessments' && (
                <div className="grouped-submissions-container">
                    {Object.keys(grouped).length > 0 ? (
                        Object.values(grouped).map((traineeGroup: any) => {
                            const traineeId = traineeGroup.user.id;
                            const isTraineeExpanded = expandedTrainees.includes(traineeId);

                            let pendingCount = 0;
                            Object.values(traineeGroup.sets).forEach((setGroup: any) => {
                                Object.values(setGroup.tasks).forEach((subs: any) => {
                                    const latest = subs.sort((a: any, b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())[0];
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
                                            {Object.keys(traineeGroup.sets).sort((a, b) => Number(a) - Number(b)).map(setNum => {
                                                const setKey = `${traineeId}-${setNum}`;
                                                const isSetExpanded = expandedSets.includes(setKey);
                                                const tasks = Object.values(traineeGroup.sets[setNum].tasks);

                                                return (
                                                    <div key={setKey} className="set-group">
                                                        <div className="set-group-header" onClick={() => toggleSet(setKey)}>
                                                            <h4>Set {setNum} <span className="task-count-dim">({tasks.length} tasks)</span></h4>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                    <button 
                                                                        className="task-action-btn primary"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            const latestSubmissions = tasks.map((subs: any) => subs[0]);
                                                                            if (latestSubmissions.length === 0) {
                                                                                showNotification('No submissions to review in this set.', 'info');
                                                                                return;
                                                                            }
                                                                            setSelectedSetSubmissions(latestSubmissions);
                                                                            setIsReviewingSet(true);
                                                                        }}
                                                                        title="Review Entire Set"
                                                                        style={{ padding: '0.2rem 0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff' }}
                                                                    >
                                                                        <Eye size={14} style={{ marginRight: '4px' }} /> Review Set {setNum}
                                                                    </button>
                                                                    <button 
                                                                        className={`task-action-btn primary ${isBulkDownloading ? 'disabled' : ''}`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            // Get the latest submission for each task
                                                                            const latestSubmissions = tasks.map((subs: any) => subs[0]);
                                                                            handleBulkDownload(latestSubmissions, 'submissions');
                                                                        }}
                                                                        disabled={isBulkDownloading}
                                                                        title="Download Trainee Submissions"
                                                                        style={{ padding: '0.2rem 0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff' }}
                                                                    >
                                                                        <UploadCloud size={14} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} /> Download Submissions
                                                                    </button>
                                                                    {isSetExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                                </div>
                                                            </div>

                                                        {isSetExpanded && (
                                                            <div className="set-tasks-grid">
                                                                {tasks.map((taskSubmissions: any) => {
                                                                    const sortedSubs = [...taskSubmissions].sort((a: any, b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
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
            )}

            {/* Progress Tab */}
            {activeMainTab === 'progress' && (
                <div className="progress-tracker-container">
                    {loadingProgress ? (
                        <div className="skeleton-cards">
                            <div className="skeleton-card"></div>
                            <div className="skeleton-card"></div>
                            <div className="skeleton-card"></div>
                        </div>
                    ) : traineeProgressData.length === 0 ? (
                        <div className="no-submissions">
                            <TrendingUp size={48} />
                            <h3>No progress data available</h3>
                            <p>Trainee progress will appear here once they begin their curriculum.</p>
                        </div>
                    ) : (
                        traineeProgressData
                            .filter((t: any) =>
                                !searchTerm ||
                                t.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                t.username?.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((trainee: any) => (
                                <div key={trainee.id} className="trainee-group-card">
                                    <div className="trainee-group-header" style={{ cursor: 'default' }}>
                                        <div className="trainee-info">
                                            <div className="avatar-circle">
                                                {trainee.full_name?.[0] || 'U'}
                                            </div>
                                            <div>
                                                <h4>{trainee.full_name}</h4>
                                                <span>@{trainee.username}</span>
                                            </div>
                                        </div>
                                        <div className="trainee-header-right">
                                            {trainee.practical_completion_rate !== undefined && (
                                                <span className="pending-badge" style={{ background: 'var(--accent-green, #22c55e)' }}>
                                                    {Math.round(trainee.practical_completion_rate)}% Practical
                                                </span>
                                            )}
                                            {trainee.lesson_completion_rate !== undefined && (
                                                <span className="pending-badge">
                                                    {Math.round(trainee.lesson_completion_rate)}% Lessons
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="trainee-group-body" style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                                        {(trainee.sets || []).map((set: any) => (
                                            <div key={set.set_number} className="set-group" style={{ margin: 0 }}>
                                                <div className="set-group-header" style={{ cursor: 'default', borderRadius: '6px' }}>
                                                    <h4>Set {set.set_number}</h4>
                                                    <span className="task-count-dim">{set.completed}/{set.total} done</span>
                                                </div>
                                                <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border-color, #334155)', marginTop: '6px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        borderRadius: '3px',
                                                        background: 'var(--accent-blue, #3b82f6)',
                                                        width: `${set.total > 0 ? Math.round((set.completed / set.total) * 100) : 0}%`,
                                                        transition: 'width 0.4s ease'
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                        {(!trainee.sets || trainee.sets.length === 0) && (
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', gridColumn: '1/-1' }}>No set data available.</p>
                                        )}
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            )}

            {/* Set Configuration Tab */}
            {activeMainTab === 'sets' && (
                <TraineeSetConfiguration />
            )}

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
                                <h4><MessageSquare size={16} /> Submission History & Feedback</h4>
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
                                                                        <FileText size={12} /> Checkback File
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

                                <div className="feedback-form-panel">
                                    <h4>Provide Feedback</h4>
                                    {selectedTaskSubmissions[0].status !== 'pending' && (
                                        <div style={{ padding: '0.75rem', background: 'rgba(255, 165, 0, 0.1)', border: '1px solid orange', borderRadius: '6px', marginBottom: '1rem', color: 'orange', fontSize: '0.85rem' }}>
                                            <Eye size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}/>
                                            This attempt is already marked as <strong>{selectedTaskSubmissions[0].status}</strong>. Submitting feedback will update the existing review.
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label>Comments</label>
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
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Review Modal for Entire Set */}
            {isReviewingSet && selectedSetSubmissions && selectedSetSubmissions.length > 0 && (
                <div className="modal-overlay" onClick={() => setIsReviewingSet(false)}>
                    <div className="review-modal enhanced animate-slide-up" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Review Entire Set {selectedSetSubmissions[0].task?.set_number} for {selectedSetSubmissions[0].user?.full_name}</h3>
                            <button className="close-btn" onClick={() => setIsReviewingSet(false)}>
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="bulk-review-info" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Eye size={18} /> You are reviewing {selectedSetSubmissions.length} tasks
                                </h4>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    The feedback and status you provide below will be applied to all <strong>{selectedSetSubmissions.length}</strong> tasks simultaneously.
                                </p>
                                <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {selectedSetSubmissions.map(sub => (
                                        <span key={sub.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                                            Unit {sub.task?.task_code}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="feedback-form-panel" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                <h4>Provide Bulk Feedback</h4>
                                <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <label>Overall Comments</label>
                                    <textarea
                                        placeholder="Provide overall feedback for the entire set..."
                                        value={feedbackComments}
                                        onChange={(e) => setFeedbackComments(e.target.value)}
                                        style={{ minHeight: '120px' }}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label>Excel Checkback File (Optional, applies to all)</label>
                                    <div className="file-upload-area">
                                        <input
                                            type="file"
                                            id="bulk-checkback-file"
                                            accept=".xlsx,.xls"
                                            onChange={(e) => setFeedbackFile(e.target.files?.[0] || null)}
                                        />
                                        <label htmlFor="bulk-checkback-file" className={feedbackFile ? 'has-file' : ''}>
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
                                                    const fileInput = document.getElementById('bulk-checkback-file') as HTMLInputElement;
                                                    if (fileInput) fileInput.value = '';
                                                }}
                                                title="Remove selected file"
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-action-buttons" style={{ marginTop: '2rem' }}>
                                    <button
                                        className="btn-reject"
                                        onClick={() => handleBulkSubmitFeedback('rejected')}
                                        disabled={isSubmittingFeedback}
                                    >
                                        <XCircle size={16} /> Reject Entire Set
                                    </button>
                                    <button
                                        className="btn-approve"
                                        onClick={() => handleBulkSubmitFeedback('approved')}
                                        disabled={isSubmittingFeedback}
                                    >
                                        <CheckCircle2 size={16} /> Approve Entire Set
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
