import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, Download, Upload, Eye, Search, FileText, ChevronDown, ChevronUp, MessageSquare, Play, TrendingUp, User, Settings, UploadCloud, Bell, Trash2 } from 'lucide-react';
import { assessmentService, AssessmentSubmission } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { api } from '../../../services/api';
import { useNotification } from '../../../context/NotificationContext';
import { useWebSocket } from '../../../context/WebSocketContext';
import { useUI } from '../../../context/UIContext';
import { TraineeSetConfiguration } from './TraineeSetConfiguration';
import { useBulkDownload } from '../../../hooks/useBulkDownload';
import { Modal } from '../../../components/Modal';
import '../../../styles/mentor/PracticalTrainerDashboard.css';

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

export const PracticalTrainerDashboard: React.FC = () => {
    const { showNotification } = useNotification();
    const { requestConfirmation } = useUI();
    const location = useLocation();
    const navigate = useNavigate();
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
    const [activeMainTab, setActiveMainTab] = useState<'assessments' | 'progress' | 'sets' | 'notifications'>(() => {
        const params = new URLSearchParams(window.location.search);
        const subtabParam = params.get('subtab');
        if (subtabParam === 'assessments' || subtabParam === 'progress' || subtabParam === 'sets' || subtabParam === 'notifications') {
            return subtabParam as any;
        }
        return 'assessments';
    });
    const [traineeProgressData, setTraineeProgressData] = useState<any[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [isTelemetryOpen, setIsTelemetryOpen] = useState(true);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const response = await api.get('/api/v1/notifications');
            const data = response.data;
            setNotifications(data);
            setUnreadCount(data.filter((n: any) => !n.is_read).length);
        } catch (err) {
            console.error('Failed to load notifications:', err);
        }
    };

    const handleMarkAsRead = async (id: number) => {
        try {
            await api.post(`/api/v1/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await api.post('/api/v1/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
            showNotification('All notifications marked as read.', 'success');
        } catch (err) {
            showNotification('Failed to mark notifications as read.', 'error');
        }
    };

    const handleDeleteNotification = async (id: number) => {
        const confirmed = await requestConfirmation({
            title: 'Delete Notification',
            message: 'Are you sure you want to delete this notification? This action cannot be undone.',
            confirmText: 'Delete',
            type: 'danger'
        });
        if (!confirmed) return;

        try {
            await api.delete(`/api/v1/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
            // Recalculate unread count
            setUnreadCount(prev => {
                const notif = notifications.find(n => n.id === id);
                if (notif && !notif.is_read) {
                    const nextVal = Math.max(0, prev - 1);
                    setTimeout(() => window.dispatchEvent(new CustomEvent('kmti-refresh-unread-count')), 0);
                    return nextVal;
                }
                return prev;
            });
        } catch (err) {
            console.error('Failed to delete notification:', err);
            showNotification('Failed to delete notification.', 'error');
        }
    };

    const handleClearAll = async () => {
        const confirmed = await requestConfirmation({
            title: 'Clear All Notifications',
            message: 'Are you sure you want to permanently delete all notifications? This action cannot be undone.',
            confirmText: 'Clear All',
            type: 'danger'
        });
        if (!confirmed) return;

        try {
            await api.delete('/api/v1/notifications/clear-all');
            setNotifications([]);
            setUnreadCount(0);
            showNotification('All notifications cleared.', 'success');
            window.dispatchEvent(new CustomEvent('kmti-refresh-unread-count'));
        } catch (err) {
            showNotification('Failed to clear notifications.', 'error');
        }
    };

    useEffect(() => {
        fetchTraineeProgress();
        fetchNotifications();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subtabParam = params.get('subtab');
        if (subtabParam === 'assessments' || subtabParam === 'progress' || subtabParam === 'sets' || subtabParam === 'notifications') {
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

    const fetchTraineeProgress = async (silent = false) => {
        if (!silent) setLoadingProgress(true);
        try {
            const data = await assessmentService.getTrainerTraineesProgress();
            setTraineeProgressData(data);
        } catch (err) {
            showNotification('Failed to load trainee progress data.', 'error');
        } finally {
            if (!silent) setLoadingProgress(false);
        }
    };

    useEffect(() => {
        if (activeMainTab === 'progress') {
            fetchTraineeProgress();
        } else if (activeMainTab === 'notifications') {
            fetchNotifications();
        }
    }, [activeMainTab]);

    useEffect(() => {
        const handleProgressRefresh = (e: Event) => {
            if (activeMainTab === 'progress') {
                const silent = e instanceof CustomEvent ? !!e.detail?.silent : false;
                fetchTraineeProgress(silent);
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

    const fetchSubmissions = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            const data = await assessmentService.getTrainerSubmissions(statusFilter);
            setSubmissions(data);
        } catch (err) {
            showNotification('Failed to load submissions.', 'error');
        } finally {
            if (!silent) setLoading(false);
        }
    }, [statusFilter, showNotification]);

    useEffect(() => {
        fetchSubmissions();
    }, [fetchSubmissions]);

    // Use the shared WebSocket context — no duplicate connection needed
    const { subscribe } = useWebSocket();

    useEffect(() => {
        // Subscribe to all WS events that should trigger a submission refresh
        const unsub = subscribe('*', (data: any) => {
            if (data?.event === 'TRAINEE_TELEMETRY') return;
            fetchSubmissions(true);
            fetchNotifications();
            window.dispatchEvent(new CustomEvent('kmti-refresh-trainee-progress', { detail: { silent: true } }));
            if (data?.message) {
                showNotification(data.message, 'info');
                if (window.electronAPI && typeof window.electronAPI.flashWindow === 'function') {
                    window.electronAPI.flashWindow();
                }
            }
        });

        const handleSubmissionsRefresh = () => {
            fetchSubmissions(true);
            fetchNotifications();
        };
        window.addEventListener('kmti-refresh-submissions', handleSubmissionsRefresh);
        return () => {
            unsub();
            window.removeEventListener('kmti-refresh-submissions', handleSubmissionsRefresh);
        };
    }, [fetchSubmissions, subscribe, showNotification]);

    useEffect(() => {
        const unsub = subscribe('TRAINEE_TELEMETRY', (data: any) => {
            let shouldToast = false;
            let traineeName = '';

            setTraineeProgressData(prev => {
                const target = prev.find(t => t.id === data.trainee_id);
                if (target) {
                    traineeName = target.full_name || target.username;
                    // Only toast if status transitions from offline to online
                    if (data.is_online && !target.is_online) {
                        shouldToast = true;
                    }
                }
                return prev.map(t => {
                    if (t.id === data.trainee_id) {
                        return {
                            ...t,
                            is_online: data.is_online,
                            current_activity: data.current_activity,
                            online_since: data.online_since,
                            last_updated: data.last_updated
                        };
                    }
                    return t;
                });
            });

            if (shouldToast && traineeName) {
                showNotification(`Trainee ${traineeName} is now online.`, 'success');
            }
        });
        return () => unsub();
    }, [subscribe]);

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
        setExpandedTrainees(prev => prev.includes(id) ? [] : [id]);
    };

    const toggleSet = (key: string) => {
        setExpandedSets(prev => prev.includes(key) ? [] : [key]);
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
        <div className="practical-trainer-wrapper" style={{ display: 'flex', height: '100%', width: '100%', overflow: 'hidden' }}>
            <div className="admin-sidebar" style={{ height: '100%', borderRight: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
                <div className="sidebar-nav" style={{ paddingTop: '1.5rem' }}>

                    <button
                        className={`nav-item ${activeMainTab === 'assessments' ? 'active' : ''}`}
                        onClick={() => navigate('/assistant?tab=assessment&subtab=assessments')}
                        data-tooltip="Practical Submissions"
                    >
                        <div className="nav-icon"><FileText size={20} /></div>
                    </button>
                    <button
                        className={`nav-item ${activeMainTab === 'progress' ? 'active' : ''}`}
                        onClick={() => navigate('/assistant?tab=assessment&subtab=progress')}
                        data-tooltip="Trainee Progress Tracker"
                    >
                        <div className="nav-icon"><CheckCircle2 size={20} /></div>
                    </button>
                    <button
                        className={`nav-item ${activeMainTab === 'sets' ? 'active' : ''}`}
                        onClick={() => navigate('/assistant?tab=assessment&subtab=sets')}
                        data-tooltip="Set Configuration"
                    >
                        <div className="nav-icon"><Settings size={20} /></div>
                    </button>
                </div>
            </div>

            <div className="trainer-dashboard animate-fade-in">

                <div className="trainer-header">
                    <div className="header-info">
                        <h2>
                            {activeMainTab === 'assessments' ? "Assessment Review Portal" :
                                activeMainTab === 'progress' ? "Trainee Progress Tracker" :
                                activeMainTab === 'notifications' ? "Recent Activity Notifications" :
                                    "Trainee Set Configuration"}
                        </h2>
                        <p>
                            {activeMainTab === 'assessments'
                                ? "Manage and verify practical drafting submissions from trainees"
                                : activeMainTab === 'progress'
                                    ? "Monitor lesson scores, curriculum completion rates, and practical assessment attempts"
                                    : activeMainTab === 'notifications'
                                        ? "Review real-time trainee actions, submissions, and course completions"
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
                        <button
                            onClick={() => setIsTelemetryOpen(!isTelemetryOpen)}
                            className={`sub-tab-btn ${isTelemetryOpen ? 'active' : ''}`}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '6px', 
                                height: '38px', 
                                padding: '0 12px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                background: isTelemetryOpen ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                color: isTelemetryOpen ? 'var(--accent-blue)' : 'var(--text-main)',
                                transition: 'all 0.2s ease',
                                fontWeight: 500
                            }}
                            title="Toggle Telemetry Sidebar"
                        >
                            <User size={16} /> {isTelemetryOpen ? "Hide Presence" : "Show Presence"}
                        </button>
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
                                                                            const latestSubmissions = tasks.flatMap((subs: any) => {
                                                                                const latestByKey: Record<string, any> = {};
                                                                                for (const sub of subs) {
                                                                                    const fileName = sub.submission_file_path?.split(/[\\/]/).pop() || 'unknown';
                                                                                    const ext = fileName.split('.').pop()?.toLowerCase() || 'unknown';
                                                                                    const key = (ext === 'zip' || ext === 'rar') ? fileName : ext;
                                                                                    if (!latestByKey[key]) {
                                                                                        latestByKey[key] = sub;
                                                                                    }
                                                                                }
                                                                                return Object.values(latestByKey);
                                                                            });
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
                                                                            // Get the latest submission for each file extension per task
                                                                            const latestSubmissions = tasks.flatMap((subs: any) => {
                                                                                const latestByKey: Record<string, any> = {};
                                                                                for (const sub of subs) {
                                                                                    const fileName = sub.submission_file_path?.split(/[\\/]/).pop() || 'unknown';
                                                                                    const ext = fileName.split('.').pop()?.toLowerCase() || 'unknown';
                                                                                    const key = (ext === 'zip' || ext === 'rar') ? fileName : ext;
                                                                                    if (!latestByKey[key]) {
                                                                                        latestByKey[key] = sub;
                                                                                    }
                                                                                }
                                                                                return Object.values(latestByKey);
                                                                            });
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
                                                <div style={{ position: 'relative' }}>
                                                    <div className="avatar-circle">
                                                        {trainee.full_name?.[0] || 'U'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4>{trainee.full_name}</h4>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                                        <span style={{ color: 'var(--text-muted)' }}>@{trainee.username}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="trainee-header-right">
                                                <span className="status-badge approved">
                                                    {trainee.progress?.assessments?.approved || 0} Approved Submissions
                                                </span>
                                                {trainee.progress?.assessments?.pending > 0 && (
                                                    <span className="status-badge pending">
                                                        {trainee.progress?.assessments?.pending} Pending Review
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="trainee-group-body" style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                                        {/* 3D Modeling Course Progress */}
                                        <div className="set-group" style={{ margin: 0 }}>
                                            <div className="set-group-header" style={{ cursor: 'default', borderRadius: '6px' }}>
                                                <h4>3D Modeling Course</h4>
                                                <span className="task-count-dim">{trainee.progress?.course_3d?.completed || 0}/{trainee.progress?.course_3d?.total || 0} completed</span>
                                            </div>
                                            <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border-color, #334155)', marginTop: '6px', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%',
                                                    borderRadius: '3px',
                                                    background: 'var(--accent-blue, #3b82f6)',
                                                    width: `${trainee.progress?.course_3d?.percentage || 0}%`,
                                                    transition: 'width 0.4s ease'
                                                }} />
                                            </div>
                                        </div>

                                        {/* 3D Practical Assessment */}
                                        <div className="set-group" style={{ margin: 0 }}>
                                            <div className="set-group-header" style={{ cursor: 'default', borderRadius: '6px' }}>
                                                <h4>3D Practical Assessment</h4>
                                                <span className="task-count-dim">{trainee.progress?.practical_3d?.completed || 0}/{trainee.progress?.practical_3d?.total || 0} approved</span>
                                            </div>
                                            <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border-color, #334155)', marginTop: '6px', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%',
                                                    borderRadius: '3px',
                                                    background: 'var(--accent-green, #22c55e)',
                                                    width: `${trainee.progress?.practical_3d?.percentage || 0}%`,
                                                    transition: 'width 0.4s ease'
                                                }} />
                                            </div>
                                        </div>

                                        {/* 2D Detailing Course Progress */}
                                        <div className="set-group" style={{ margin: 0 }}>
                                            <div className="set-group-header" style={{ cursor: 'default', borderRadius: '6px' }}>
                                                <h4>2D Detailing Course</h4>
                                                <span className="task-count-dim">{trainee.progress?.course_2d?.completed || 0}/{trainee.progress?.course_2d?.total || 0} completed</span>
                                            </div>
                                            <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border-color, #334155)', marginTop: '6px', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%',
                                                    borderRadius: '3px',
                                                    background: 'var(--color-secondary, #ec4899)',
                                                    width: `${trainee.progress?.course_2d?.percentage || 0}%`,
                                                    transition: 'width 0.4s ease'
                                                }} />
                                            </div>
                                        </div>

                                        {/* 2D Detailing Assessment */}
                                        <div className="set-group" style={{ margin: 0 }}>
                                            <div className="set-group-header" style={{ cursor: 'default', borderRadius: '6px' }}>
                                                <h4>2D Detailing Assessment</h4>
                                                <span className="task-count-dim">{trainee.progress?.practical_2d?.completed || 0}/{trainee.progress?.practical_2d?.total || 0} approved</span>
                                            </div>
                                            <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border-color, #334155)', marginTop: '6px', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%',
                                                    borderRadius: '3px',
                                                    background: 'var(--accent-orange, #f59e0b)',
                                                    width: `${trainee.progress?.practical_2d?.percentage || 0}%`,
                                                    transition: 'width 0.4s ease'
                                                }} />
                                            </div>
                                        </div>
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

                {/* Notifications Tab */}
                {activeMainTab === 'notifications' && (
                    <div className="notifications-tab-container" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100% - 110px)', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>Recent Activities</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {unreadCount > 0 && (
                                    <button 
                                        onClick={handleMarkAllAsRead}
                                        style={{
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            borderRadius: '6px',
                                            color: 'var(--accent-blue, #3b82f6)',
                                            padding: '6px 12px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                                        }}
                                    >
                                        Mark all as read
                                    </button>
                                )}
                                {notifications.length > 0 && (
                                    <button 
                                        onClick={handleClearAll}
                                        style={{
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            borderRadius: '6px',
                                            color: 'var(--accent-red, #ef4444)',
                                            padding: '6px 12px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                        }}
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>

                        {notifications.length === 0 ? (
                            <div className="no-submissions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', opacity: 0.6 }}>
                                <Bell size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                                <h3>No notifications yet</h3>
                                <p>You will be notified when your trainees perform actions like submitting assignments or completing quizzes.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {notifications.map((notif) => {
                                    const getRelativeTimeString = (dateString: string) => {
                                        const date = new Date(dateString);
                                        const diffMs = new Date().getTime() - date.getTime();
                                        if (diffMs <= 0) return 'Just now';
                                        const diffMins = Math.floor(diffMs / 60000);
                                        if (diffMins < 1) return 'Just now';
                                        if (diffMins < 60) return `${diffMins}m ago`;
                                        const diffHours = Math.floor(diffMins / 60);
                                        if (diffHours < 24) return `${diffHours}h ago`;
                                        const diffDays = Math.floor(diffHours / 24);
                                        return `${diffDays}d ago`;
                                    };
                                    return (
                                        <div
                                            key={notif.id}
                                            onClick={() => {
                                                if (!notif.is_read) {
                                                    handleMarkAsRead(notif.id);
                                                }
                                                // Handle navigation/tab switching based on type
                                                if (notif.type === 'new_submission' || notif.type === 'feedback_reply') {
                                                    setActiveMainTab('assessments');
                                                    if (notif.sender_id) {
                                                        setExpandedTrainees(prev => prev.includes(notif.sender_id) ? prev : [...prev, notif.sender_id]);
                                                    }
                                                } else if (notif.type === 'lesson_passed' || notif.type === 'course_completed') {
                                                    setActiveMainTab('progress');
                                                }
                                            }}
                                            style={{
                                                background: notif.is_read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(59, 130, 246, 0.04)',
                                                border: notif.is_read ? '1px solid var(--border-color)' : '1px solid rgba(59, 130, 246, 0.25)',
                                                borderRadius: '8px',
                                                padding: '1rem',
                                                display: 'flex',
                                                gap: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                position: 'relative'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'none';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            {/* Left color bar indicator for unread */}
                                            {!notif.is_read && (
                                                <div style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    bottom: 0,
                                                    width: '4px',
                                                    background: 'var(--accent-blue, #3b82f6)',
                                                    borderTopLeftRadius: '8px',
                                                    borderBottomLeftRadius: '8px'
                                                }} />
                                            )}

                                            <div className="avatar-circle" style={{ width: '40px', height: '40px', minWidth: '40px', fontSize: '1rem' }}>
                                                {notif.sender?.full_name?.[0] || 'S'}
                                            </div>

                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                                        {notif.sender?.full_name || 'System'}
                                                    </span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                            {getRelativeTimeString(notif.created_at)}
                                                        </span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteNotification(notif.id);
                                                            }}
                                                            style={{
                                                                background: 'transparent',
                                                                border: 'none',
                                                                color: 'var(--text-muted)',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                padding: '2px',
                                                                borderRadius: '4px',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.color = 'var(--accent-red, #ef4444)';
                                                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.color = 'var(--text-muted)';
                                                                e.currentTarget.style.background = 'transparent';
                                                            }}
                                                            title="Delete Notification"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.9, lineHeight: 1.4 }}>
                                                    {notif.message}
                                                </p>
                                                {notif.type && (
                                                    <div style={{ marginTop: '4px' }}>
                                                        <span style={{
                                                            fontSize: '0.75rem',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em',
                                                            fontWeight: 600,
                                                            color: notif.type === 'new_submission' ? 'var(--accent-blue, #3b82f6)' :
                                                                   notif.type === 'feedback_reply' ? 'var(--accent-orange, #f59e0b)' :
                                                                   notif.type === 'course_completed' ? 'var(--accent-green, #22c55e)' :
                                                                   'var(--text-muted)'
                                                        }}>
                                                            {notif.type.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
                {/* Review Modal with History & Chat */}
                <Modal
                    isOpen={!!(isReviewing && selectedTaskSubmissions && selectedTaskSubmissions.length > 0)}
                    onClose={() => setIsReviewing(false)}
                    title={`Review: ${selectedTaskSubmissions?.[0]?.user?.full_name} - Set ${selectedTaskSubmissions?.[0]?.task?.set_number} Unit ${selectedTaskSubmissions?.[0]?.task?.task_code}`}
                    tag="SUBMISSION_REVIEW"
                    size="xl"
                >
                    {selectedTaskSubmissions && selectedTaskSubmissions.length > 0 && (
                        <div className="modal-body split-layout" style={{ display: 'flex', gap: '2rem', height: '100%', minHeight: '500px' }}>
                            {/* Left Side: Submission History & Chat */}
                            <div className="history-chat-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
                                <h4><MessageSquare size={16} /> Submission History & Feedback</h4>
                                <div className="history-timeline">
                                    {selectedTaskSubmissions.map((sub, index) => (
                                        <div key={sub.id} className="history-node" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div className="node-marker" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div className={`node-dot ${sub.status}`} style={{ width: '12px', height: '12px', borderRadius: '50%', background: sub.status === 'approved' ? 'var(--color-success)' : sub.status === 'rejected' ? 'var(--color-error)' : 'var(--color-warning)' }}></div>
                                                {index !== selectedTaskSubmissions.length - 1 && <div className="node-line" style={{ width: '2px', flex: 1, background: 'var(--border-color)', marginTop: '4px' }}></div>}
                                            </div>
                                            <div className="node-content" style={{ flex: 1 }}>
                                                <div className="node-header" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                                    <span className="node-title" style={{ fontWeight: 600 }}>Attempt {selectedTaskSubmissions.length - index}</span>
                                                    <span className="node-date">{new Date(sub.submitted_at).toLocaleString()}</span>
                                                </div>
                                                <div className="node-file" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', marginBottom: '0.75rem' }}>
                                                    <FileText size={14} />
                                                    <span className="file-name" title={sub.submission_file_path?.split(/[\\/]/).pop()} style={{ fontSize: '0.85rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {sub.submission_file_path?.split(/[\\/]/).pop()}
                                                    </span>
                                                    <div className="node-file-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            className="action-icon-btn primary"
                                                            onClick={() => handleOpenInIJCAD(sub)}
                                                            title="Open in CAD"
                                                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                                        >
                                                            <Play size={14} /> Open
                                                        </button>
                                                        <button
                                                            className="action-icon-btn"
                                                            onClick={() => handleDownloadTraineeFile(sub)}
                                                            title="Download File"
                                                            style={{ padding: '0.25rem' }}
                                                        >
                                                            <Download size={14} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Chat / Feedback Section */}
                                                {sub.feedback && sub.feedback.length > 0 ? (
                                                    sub.feedback.map(fb => (
                                                        <div key={fb.id} className="chat-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                            <div className="chat-bubble trainer-chat" style={{ background: 'rgba(221, 77, 250, 0.05)', border: '1px solid rgba(221, 77, 250, 0.1)', padding: '0.75rem', borderRadius: '8px', width: 'fit-content', maxWidth: '85%' }}>
                                                                <span className="chat-author" style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>You (Trainer)</span>
                                                                <p style={{ margin: 0, fontSize: '0.85rem' }}>{fb.comments || "No comments provided."}</p>
                                                                {fb.checkback_file_path && (
                                                                    <div className="chat-attachment" onClick={() => handleDownloadCheckback(fb)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.5rem', textDecoration: 'underline' }}>
                                                                        <FileText size={12} /> Checkback File
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {fb.trainee_reply && (
                                                                <div className="chat-bubble trainee-chat" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '8px', width: 'fit-content', maxWidth: '85%', alignSelf: 'flex-end', marginLeft: 'auto' }}>
                                                                    <span className="chat-author" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{sub.user?.full_name} (Trainee)</span>
                                                                    <p style={{ margin: 0, fontSize: '0.85rem' }}>{fb.trainee_reply}</p>
                                                                    {fb.replied_at && <span className="chat-time" style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.25rem', textAlign: 'right' }}>{new Date(fb.replied_at).toLocaleString()}</span>}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="empty-chat-state" style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>
                                                        <MessageSquare size={24} className="empty-chat-icon" style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                                                        <p style={{ margin: 0, fontSize: '0.8rem' }}>{sub.status === 'pending' ? 'Awaiting your review. This is the first attempt.' : 'No feedback left for this attempt.'}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Action Form */}
                            <div className="action-panel" style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="review-task-info">
                                    <span className="label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Current Status</span>
                                    <div className={`status-badge large ${selectedTaskSubmissions[0].status}`} style={{ fontSize: '1rem', fontWeight: 700, padding: '0.5rem 1rem', borderRadius: '6px', textAlign: 'center', marginTop: '0.25rem', width: '100%', background: selectedTaskSubmissions[0].status === 'approved' ? 'rgba(34, 197, 94, 0.1)' : selectedTaskSubmissions[0].status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: selectedTaskSubmissions[0].status === 'approved' ? 'var(--color-success)' : selectedTaskSubmissions[0].status === 'rejected' ? 'var(--color-error)' : 'var(--color-warning)' }}>
                                        {selectedTaskSubmissions[0].status.toUpperCase()}
                                    </div>
                                </div>

                                <div className="feedback-form-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <h4>Provide Feedback</h4>
                                    <div className="form-group">
                                        <label>Comments</label>
                                        <textarea
                                            placeholder="Provide constructive comments..."
                                            value={feedbackComments}
                                            onChange={(e) => setFeedbackComments(e.target.value)}
                                            style={{ width: '100%', minHeight: '100px', padding: '0.5rem', borderRadius: '6px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                                        ></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label>Excel Checkback File (Optional)</label>
                                        <div className="file-upload-area" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <input
                                                type="file"
                                                id="checkback-file"
                                                accept=".xlsx,.xls"
                                                onChange={(e) => setFeedbackFile(e.target.files?.[0] || null)}
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="checkback-file" className={feedbackFile ? 'has-file' : ''} style={{ flex: 1, padding: '0.5rem', border: '1px dashed var(--border-color)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>
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
                                                    style={{ padding: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}
                                                >
                                                    <XCircle size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="modal-action-buttons" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                        <button
                                            className="btn-reject"
                                            onClick={() => handleSubmitFeedback('rejected')}
                                            disabled={isSubmittingFeedback}
                                            style={{ flex: 1, padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--color-error)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                                        >
                                            <XCircle size={16} /> Reject
                                        </button>
                                        <button
                                            className="btn-approve"
                                            onClick={() => handleSubmitFeedback('approved')}
                                            disabled={isSubmittingFeedback}
                                            style={{ flex: 1, padding: '0.6rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', color: 'var(--color-success)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                                        >
                                            <CheckCircle2 size={16} /> Approve
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

            {/* Bulk Review Modal for Entire Set */}
            <Modal
                isOpen={!!(isReviewingSet && selectedSetSubmissions && selectedSetSubmissions.length > 0)}
                onClose={() => setIsReviewingSet(false)}
                title={`Review Entire Set ${selectedSetSubmissions?.[0]?.task?.set_number} for ${selectedSetSubmissions?.[0]?.user?.full_name}`}
                tag="BULK_SET_REVIEW"
                size="lg"
            >
                {selectedSetSubmissions && selectedSetSubmissions.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="bulk-review-info" style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
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

                        <div className="feedback-form-panel" style={{ background: 'rgba(255,255,255,0.01)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h4>Provide Bulk Feedback</h4>
                            <div className="form-group">
                                <label>Overall Comments</label>
                                <textarea
                                    placeholder="Provide overall feedback for the entire set..."
                                    value={feedbackComments}
                                    onChange={(e) => setFeedbackComments(e.target.value)}
                                    style={{ width: '100%', minHeight: '120px', padding: '0.5rem', borderRadius: '6px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Excel Checkback File (Optional, applies to all)</label>
                                <div className="file-upload-area" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="file"
                                        id="bulk-checkback-file"
                                        accept=".xlsx,.xls"
                                        onChange={(e) => setFeedbackFile(e.target.files?.[0] || null)}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="bulk-checkback-file" className={feedbackFile ? 'has-file' : ''} style={{ flex: 1, padding: '0.5rem', border: '1px dashed var(--border-color)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>
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
                                            style={{ padding: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}
                                        >
                                            <XCircle size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="modal-action-buttons" style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                                <button
                                    className="btn-reject"
                                    onClick={() => handleBulkSubmitFeedback('rejected')}
                                    disabled={isSubmittingFeedback}
                                    style={{ flex: 1, padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--color-error)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                                >
                                    <XCircle size={16} /> Reject Entire Set
                                </button>
                                <button
                                    className="btn-approve"
                                    onClick={() => handleBulkSubmitFeedback('approved')}
                                    disabled={isSubmittingFeedback}
                                    style={{ flex: 1, padding: '0.6rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', color: 'var(--color-success)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                                >
                                    <CheckCircle2 size={16} /> Approve Entire Set
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
            </div>

            {/* Right Telemetry Sidebar Panel */}
            {isTelemetryOpen && (
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
            )}
        </div>
    );
};
