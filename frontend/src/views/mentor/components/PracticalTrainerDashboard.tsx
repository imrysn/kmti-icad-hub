import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, Download, Upload, Eye, Search, FileText, ChevronDown, ChevronUp, MessageSquare, Play, TrendingUp, User, Settings, UploadCloud, Bell, Trash2, Unlock, Box, PenTool } from 'lucide-react';
import { assessmentService, AssessmentSubmission } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { api } from '../../../services/api';
import { useNotification } from '../../../context/NotificationContext';
import { useWebSocket } from '../../../context/WebSocketContext';
import { useUI } from '../../../context/UIContext';
import { TraineeSetConfiguration } from './TraineeSetConfiguration';
import { useBulkDownload } from '../../../hooks/useBulkDownload';
import { Modal } from '../../../components/Modal';
import { TraineeTelemetrySidebar } from './TraineeTelemetrySidebar';
import { NotificationCenter } from './NotificationCenter';
import { PerformanceDirectory } from '../../admin/components/PerformanceDirectory';
import { TraineeDetail } from '../../admin/components/TraineeDetail';
import { TraineeProgress } from '../../../services/adminService';
import '../../../styles/mentor/PracticalTrainerDashboard.css';
import { getUnitCodeBadgeClass } from '../../../utils/unitCodeUtils';

export const PracticalTrainerDashboard: React.FC = () => {
    const { showNotification } = useNotification();
    const { requestConfirmation } = useUI();
    const location = useLocation();
    const navigate = useNavigate();
    const isAdmin = location.pathname.startsWith('/admin');
    const getTabUrl = (subtab: string) => {
        return isAdmin
            ? `/admin/trainees?subtab=${subtab}`
            : `/assistant?tab=assessment&subtab=${subtab}`;
    };
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
    const [statusFilter, setStatusFilter] = useState<'pending' | 'reviewed'>('pending');
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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subtabParam = params.get('subtab');
        if (subtabParam && ['assessments', 'progress', 'sets', 'notifications'].includes(subtabParam)) {
            setActiveMainTab(subtabParam as any);
        }
    }, [location.search]);
    const [performanceData, setPerformanceData] = useState<TraineeProgress[]>([]);
    const [selectedTrainee, setSelectedTrainee] = useState<TraineeProgress | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeType, setActiveType] = useState<'3D' | '2D'>('3D');

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

    const handleOpenNextSet = async (traineeId: number, currentSetNum: number, notifId?: number) => {
        try {
            const nextSetNum = currentSetNum + 1;
            const res = await api.get(`/api/v1/assessments/trainer/trainees/${traineeId}/set-mappings`);
            const currentMappings = res.data;

            const existingMapping = currentMappings.find((m: any) => m.actual_set_number === nextSetNum);
            let newMappings;

            if (existingMapping) {
                if (existingMapping.display_set_number < 0) {
                    showNotification(`Set ${nextSetNum} is already open.`, 'info');
                    if (notifId) handleDeleteNotification(notifId);
                    return;
                }
                // Update display_set_number to be negative (explicitly unlocked)
                newMappings = currentMappings.map((m: any) =>
                    m.actual_set_number === nextSetNum
                        ? { ...m, display_set_number: -Math.abs(m.display_set_number) }
                        : m
                );
            } else {
                if (currentMappings.length === 0) {
                    // Trainee was on default progression. We map both Set 1 (standard) and Set 2 (unlocked/negative).
                    newMappings = [
                        { actual_set_number: 1, display_set_number: 1 },
                        { actual_set_number: nextSetNum, display_set_number: -nextSetNum }
                    ];
                } else {
                    const maxDisplay = Math.max(...currentMappings.map((m: any) => Math.abs(m.display_set_number)));
                    newMappings = [...currentMappings, { actual_set_number: nextSetNum, display_set_number: -(maxDisplay + 1) }];
                }
            }

            await api.post(`/api/v1/assessments/trainer/trainees/${traineeId}/set-mappings`, newMappings);
            showNotification(`Set ${nextSetNum} opened for trainee!`, 'success');

            if (notifId) handleDeleteNotification(notifId);
        } catch (error) {
            showNotification('Failed to open next set.', 'error');
        }
    };

    const handleReviewLaterAndOpenNext = async (notif: any) => {
        const traineeId = notif.sender_id;
        const match = notif.message.match(/Set (\d+)/);
        if (!match || !traineeId) return;
        await handleOpenNextSet(traineeId, parseInt(match[1]), notif.id);
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
            const data = await assessmentService.getTrainerProgress();
            setPerformanceData(data);
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
            const data = await assessmentService.getTrainerSubmissions('all');
            setSubmissions(data);
        } catch (err) {
            showNotification('Failed to load submissions.', 'error');
        } finally {
            if (!silent) setLoading(false);
        }
    }, [showNotification]);

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

            setPerformanceData((prev: TraineeProgress[]) => {
                const target = prev.find((t: TraineeProgress) => t.id === data.trainee_id);
                if (target) {
                    traineeName = target.full_name || target.username;
                    // Only toast if status transitions from offline to online
                    if (data.is_online && !target.is_online) {
                        shouldToast = true;
                    }
                }
                return prev.map((t: TraineeProgress) => {
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
            <div className="trainer-dashboard animate-fade-in">
                <div className="dashboard-sub-header">
                    {!isAdmin && (
                        <div className="sub-header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div className="header-title-area">
                                <h2>
                                    {activeMainTab === 'assessments' ? "Assessment Review Portal" :
                                        activeMainTab === 'progress' ? "Trainee Progress Tracker" :
                                            activeMainTab === 'notifications' ? "Recent Activity Notifications" :
                                                "Trainee Set Configuration"}
                                </h2>
                                <p className="subtitle">
                                    {activeMainTab === 'assessments'
                                        ? "Manage and verify practical drafting submissions from trainees"
                                        : activeMainTab === 'progress'
                                            ? "Monitor lesson scores, curriculum completion rates, and practical assessment attempts"
                                            : activeMainTab === 'notifications'
                                                ? "Review real-time trainee actions, submissions, and course completions"
                                                : "Configure which assessment sets each trainee can see and access"}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <button
                                    className={`sub-tab-btn ${activeMainTab === 'assessments' ? 'active' : ''}`}
                                    onClick={() => navigate(getTabUrl('assessments'))}
                                    style={{ height: '36px' }}
                                >
                                    <FileText size={16} /> Practical Submissions
                                </button>
                                <button
                                    className={`sub-tab-btn ${activeMainTab === 'progress' ? 'active' : ''}`}
                                    onClick={() => navigate(getTabUrl('progress'))}
                                    style={{ height: '36px' }}
                                >
                                    <CheckCircle2 size={16} /> Trainee Progress Tracker
                                </button>
                                <button
                                    className={`sub-tab-btn ${activeMainTab === 'sets' ? 'active' : ''}`}
                                    onClick={() => navigate(getTabUrl('sets'))}
                                    style={{ height: '36px' }}
                                >
                                    <Settings size={16} /> Set Configuration
                                </button>
                            </div>
                        </div>
                    )}

                    {activeMainTab !== 'notifications' && (
                        <div className="toolbar">
                            <div className="search-box">
                                <Search size={16} color="#94a3b8" />
                                <input
                                    type="text"
                                    placeholder={activeMainTab === 'assessments' ? "Search trainee or task..." : "Search trainee name..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                {activeMainTab === 'assessments' && (
                                    <div className="review-filter-tabs">
                                        <button
                                            className={`filter-tab-btn ${statusFilter === 'pending' ? 'active' : ''}`}
                                            onClick={() => setStatusFilter('pending')}
                                        >
                                            <Clock size={16} /> Pending Reviews
                                        </button>
                                        <button
                                            className={`filter-tab-btn ${statusFilter === 'reviewed' ? 'active' : ''}`}
                                            onClick={() => setStatusFilter('reviewed')}
                                        >
                                            <CheckCircle2 size={16} /> Approved History
                                        </button>
                                    </div>
                                )}
                                {activeMainTab === 'sets' && (
                                    <div className="review-filter-tabs">
                                        <button
                                            className={`filter-tab-btn ${activeType === '3D' ? 'active' : ''}`}
                                            onClick={() => setActiveType('3D')}
                                        >
                                            <Box size={16} /> 3D Modeling Sets
                                        </button>
                                        <button
                                            className={`filter-tab-btn ${activeType === '2D' ? 'active' : ''}`}
                                            onClick={() => setActiveType('2D')}
                                        >
                                            <PenTool size={16} /> 2D Drawing Sets
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Assessments Tab */}
                {activeMainTab === 'assessments' && (
                    <div className="grouped-submissions-container">
                        {(() => {
                            const renderedTrainees = Object.values(grouped).filter((traineeGroup: any) => {
                                let hasMatchingTask = false;
                                Object.values(traineeGroup.sets).forEach((setGroup: any) => {
                                    Object.values(setGroup.tasks).forEach((subs: any) => {
                                        const latest = subs.sort((a: any, b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())[0];
                                        const matchesFilter = statusFilter === 'pending'
                                            ? latest.status === 'pending'
                                            : (latest.status === 'approved' || latest.status === 'rejected');
                                        if (matchesFilter) {
                                            hasMatchingTask = true;
                                        }
                                    });
                                });
                                return hasMatchingTask;
                            });

                            if (renderedTrainees.length === 0) {
                                return (
                                    <div className="no-submissions">
                                        <CheckCircle2 size={48} />
                                        <h3>All caught up!</h3>
                                        <p>No submissions match your current filter.</p>
                                    </div>
                                );
                            }

                            return renderedTrainees.map((traineeGroup: any) => {
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
                                                {Object.keys(traineeGroup.sets)
                                                    .sort((a, b) => Number(a) - Number(b))
                                                    .filter(setNum => {
                                                        const tasksInSet = Object.values(traineeGroup.sets[setNum].tasks);
                                                        return tasksInSet.some((subs: any) => {
                                                            const latest = subs.sort((a: any, b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())[0];
                                                            return statusFilter === 'pending'
                                                                ? latest.status === 'pending'
                                                                : (latest.status === 'approved' || latest.status === 'rejected');
                                                        });
                                                    })
                                                    .map((setNum, index) => {
                                                        const displaySetNum = index + 1;
                                                        const setKey = `${traineeId}-${setNum}`;
                                                        const isSetExpanded = expandedSets.includes(setKey);

                                                        const allTasks = Object.values(traineeGroup.sets[setNum].tasks);
                                                        const filteredTasks = allTasks.filter((subs: any) => {
                                                            const latest = subs.sort((a: any, b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())[0];
                                                            return statusFilter === 'pending'
                                                                ? latest.status === 'pending'
                                                                : (latest.status === 'approved' || latest.status === 'rejected');
                                                        });

                                                        const tasks = filteredTasks.sort((a: any, b: any) => {
                                                            const taskA = a[0]?.task;
                                                            const taskB = b[0]?.task;
                                                            if (!taskA || !taskB) return 0;

                                                            // A1-Ax before P1-Px
                                                            const isAssemblyA = taskA.is_assembly || taskA.task_code?.startsWith('A');
                                                            const isAssemblyB = taskB.is_assembly || taskB.task_code?.startsWith('A');

                                                            if (isAssemblyA !== isAssemblyB) {
                                                                return isAssemblyA ? -1 : 1;
                                                            }

                                                            // Natural sort on task_code (e.g. A1, A2, P1, P2)
                                                            const codeA = taskA.task_code || '';
                                                            const codeB = taskB.task_code || '';
                                                            return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
                                                        });

                                                        return (
                                                            <div key={setKey} className="set-group">
                                                                <div className="set-group-header" onClick={() => toggleSet(setKey)}>
                                                                    <h4>Set {displaySetNum} <span className="task-count-dim">({tasks.length} tasks)</span></h4>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                        <button
                                                                            className="task-action-btn secondary"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleOpenNextSet(traineeId, Number(setNum));
                                                                            }}
                                                                            title="Review Later & Open Next Set"
                                                                            style={{ padding: '0.35rem 0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                                                                        >
                                                                            <Unlock size={14} style={{ marginRight: '4px' }} /> Review Later & Open Next Set
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
                                                                            style={{ padding: '0.35rem 0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                                                                        >
                                                                            <UploadCloud size={14} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} /> Download Submissions
                                                                        </button>
                                                                        {isSetExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                                    </div>
                                                                </div>

                                                                {isSetExpanded && (
                                                                    <div className="set-tasks-list">
                                                                        {tasks.map((taskSubmissions: any) => {
                                                                            const sortedSubs = [...taskSubmissions].sort((a: any, b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
                                                                            const latestSub = sortedSubs[0];

                                                                            return (
                                                                                <div key={latestSub.task.id} className="task-list-row">
                                                                                    <div className="task-list-left">
                                                                                        <div className={`task-status-dot ${latestSub.status}`} title={latestSub.status.toUpperCase()}>
                                                                                            {latestSub.status === 'approved' && <CheckCircle2 size={14} />}
                                                                                            {latestSub.status === 'pending' && <Clock size={14} />}
                                                                                            {latestSub.status === 'rejected' && <XCircle size={14} />}
                                                                                        </div>
                                                                                        <span className={`task-code-badge ${getUnitCodeBadgeClass(latestSub.task.task_code)}`}>Unit {latestSub.task.task_code}</span>
                                                                                        <span className="task-list-title" title={latestSub.task.title}>{latestSub.task.title}</span>
                                                                                    </div>
                                                                                    <div className="task-list-right">
                                                                                        {sortedSubs.length > 1 && <span className="task-attempt-tag">{sortedSubs.length} attempts</span>}
                                                                                        <span className="task-date"><Clock size={12} /> {new Date(latestSub.submitted_at).toLocaleDateString()} {new Date(latestSub.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                                                        <div className="task-row-actions">
                                                                                            <button className="row-btn-primary" onClick={() => {
                                                                                                setSelectedTaskSubmissions(sortedSubs);
                                                                                                setIsReviewing(true);
                                                                                            }}>
                                                                                                <Eye size={13} /> Review
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
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
                                                                                title={`Review Set ${displaySetNum}`}
                                                                                style={{ width: '100%', padding: '0.75rem', background: '#DD3DFA', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, boxShadow: '0 2px 8px rgba(221, 61, 250, 0.3)' }}
                                                                            >
                                                                                <Eye size={16} /> REVIEW SET {displaySetNum}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </div>
                                );
                            });
                        })()}
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
                        ) : performanceData.length === 0 ? (
                            <div className="no-submissions">
                                <TrendingUp size={48} />
                                <h3>No progress data available</h3>
                                <p>Trainee progress will appear here once you have assigned trainees and they begin their curriculum.</p>
                            </div>
                        ) : selectedTrainee ? (
                            <TraineeDetail
                                selectedTrainee={selectedTrainee}
                                setSelectedTrainee={setSelectedTrainee}
                                onExport={async (id) => {
                                    window.open(`/api/v1/assessments/export/progress?user_id=${id}`, '_blank');
                                }}
                                onRefresh={async () => {
                                    await fetchTraineeProgress(true);
                                    if (selectedTrainee) {
                                        const updated = performanceData.find(t => t.id === selectedTrainee.id);
                                        if (updated) setSelectedTrainee(updated);
                                    }
                                }}
                            />
                        ) : (
                            <PerformanceDirectory 
                                progress={performanceData.filter(p =>
                                    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    p.username?.toLowerCase().includes(searchTerm.toLowerCase())
                                )} 
                                setSelectedTrainee={setSelectedTrainee} 
                            />
                        )}
                    </div>
                )}

                {/* Set Configuration Tab */}
                {activeMainTab === 'sets' && (
                    <TraineeSetConfiguration searchTerm={searchTerm} activeType={activeType} />
                )}

                {/* Notifications Tab */}
                {activeMainTab === 'notifications' && (
                    <NotificationCenter
                        unreadCount={unreadCount}
                        notifications={notifications}
                        handleMarkAllAsRead={handleMarkAllAsRead}
                        handleClearAll={handleClearAll}
                        handleMarkAsRead={handleMarkAsRead}
                        handleDeleteNotification={handleDeleteNotification}
                        handleReviewLaterAndOpenNext={handleReviewLaterAndOpenNext}
                        setActiveMainTab={setActiveMainTab}
                        setExpandedTrainees={setExpandedTrainees}
                    />
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
                        <div className="modal-body split-layout" style={{ display: 'flex', gap: '2.5rem', height: '100%', minHeight: '550px', padding: '1rem 0.5rem' }}>
                            {/* Left Side: Submission History & Chat */}
                            <div className="history-chat-panel" style={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '1rem', maxHeight: '70vh', overflowY: 'auto' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0, paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <MessageSquare size={18} style={{ color: 'var(--accent-blue)' }} /> Submission History & Feedback
                                </h4>
                                <div className="history-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '0.5rem' }}>
                                    {selectedTaskSubmissions.map((sub, index) => {
                                        const isApproved = sub.status === 'approved';
                                        const isRejected = sub.status === 'rejected';
                                        const statusColor = isApproved ? 'var(--color-success)' : isRejected ? 'var(--color-error)' : 'var(--color-warning)';
                                        return (
                                            <div key={sub.id} className="history-node" style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.5rem' }}>
                                                <div className="node-marker" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.25rem' }}>
                                                    <div className={`node-dot ${sub.status}`} style={{ width: '14px', height: '14px', borderRadius: '50%', background: statusColor, boxShadow: `0 0 12px ${statusColor}` }}></div>
                                                    {index !== selectedTaskSubmissions.length - 1 && <div className="node-line" style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)', marginTop: '8px', minHeight: '40px' }}></div>}
                                                </div>
                                                <div className="node-content" style={{ flex: 1, background: 'rgba(255,255,255,0.015)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                                                >
                                                    <div className="node-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                        <span className="node-title" style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Attempt {selectedTaskSubmissions.length - index}</span>
                                                        <span className="node-date" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '4px 10px', borderRadius: '20px' }}>{new Date(sub.submitted_at).toLocaleString()}</span>
                                                    </div>
                                                    <div className="node-file" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '1.25rem' }}>
                                                        <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: 'var(--accent-blue)' }}>
                                                            <FileText size={18} />
                                                        </div>
                                                        <span className="file-name" title={sub.submission_file_path?.split(/[\\/]/).pop()} style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-light)' }}>
                                                            {sub.submission_file_path?.split(/[\\/]/).pop()}
                                                        </span>
                                                        <div className="node-file-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                                                            <button
                                                                className="action-icon-btn primary"
                                                                onClick={() => handleOpenInIJCAD(sub)}
                                                                title="Open in CAD"
                                                                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', background: 'var(--accent-blue)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s' }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.4)'; }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                                                            >
                                                                <Play size={14} /> Open
                                                            </button>
                                                            <button
                                                                className="action-icon-btn"
                                                                onClick={() => handleDownloadTraineeFile(sub)}
                                                                title="Download File"
                                                                style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'var(--text-light)', cursor: 'pointer', transition: 'all 0.2s' }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                                            >
                                                                <Download size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Chat / Feedback Section */}
                                                    <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(255,255,255,0.02)' }}>
                                                        {sub.feedback && sub.feedback.length > 0 ? (
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                                {sub.feedback.map(fb => (
                                                                    <div key={fb.id} className="chat-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                                        <div className="chat-bubble trainer-chat" style={{ background: 'linear-gradient(145deg, rgba(221, 77, 250, 0.1), rgba(221, 77, 250, 0.02))', border: '1px solid rgba(221, 77, 250, 0.2)', padding: '1rem', borderRadius: '12px 12px 12px 0', width: 'fit-content', maxWidth: '90%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                                                            <span className="chat-author" style={{ fontSize: '0.75rem', color: '#e879f9', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e879f9' }} /> You (Trainer)</span>
                                                                            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-light)' }}>{fb.comments || "No comments provided."}</p>
                                                                            {fb.checkback_file_path && (
                                                                                <div className="chat-attachment" onClick={() => handleDownloadCheckback(fb)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#e879f9', marginTop: '0.75rem', padding: '6px 10px', background: 'rgba(221, 77, 250, 0.1)', borderRadius: '6px', transition: 'all 0.2s', fontWeight: 600 }}
                                                                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(221, 77, 250, 0.2)'; }}
                                                                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(221, 77, 250, 0.1)'; }}
                                                                                >
                                                                                    <FileText size={14} /> Download Checkback
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        {fb.trainee_reply && (
                                                                            <div className="chat-bubble trainee-chat" style={{ background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '12px 12px 0 12px', width: 'fit-content', maxWidth: '90%', alignSelf: 'flex-end', marginLeft: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                                                                <span className="chat-author" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{sub.user?.full_name} (Trainee) <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} /></span>
                                                                                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-main)' }}>{fb.trainee_reply}</p>
                                                                                {fb.replied_at && <span className="chat-time" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.5rem', textAlign: 'right' }}>{new Date(fb.replied_at).toLocaleString()}</span>}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="empty-chat-state" style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                                                                <MessageSquare size={32} className="empty-chat-icon" style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                                                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>
                                                                    {sub.status === 'pending'
                                                                        ? `Awaiting your review (Attempt ${selectedTaskSubmissions.length - index}).`
                                                                        : 'No feedback history for this attempt.'
                                                                    }
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Side: Action Form */}
                            <div className="action-panel" style={{ flex: '0.8', minWidth: '340px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                                <div className="review-task-info" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                                    <span className="label" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>Current Status</span>
                                    <div className={`status-badge large ${selectedTaskSubmissions[0].status}`} style={{ fontSize: '1.1rem', fontWeight: 800, padding: '0.75rem 1rem', borderRadius: '8px', textAlign: 'center', marginTop: '0.5rem', width: '100%', textTransform: 'uppercase', letterSpacing: '2px', background: selectedTaskSubmissions[0].status === 'approved' ? 'rgba(34, 197, 94, 0.15)' : selectedTaskSubmissions[0].status === 'rejected' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: selectedTaskSubmissions[0].status === 'approved' ? 'var(--color-success)' : selectedTaskSubmissions[0].status === 'rejected' ? 'var(--color-error)' : 'var(--color-warning)', border: `1px solid ${selectedTaskSubmissions[0].status === 'approved' ? 'rgba(34, 197, 94, 0.3)' : selectedTaskSubmissions[0].status === 'rejected' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`, boxShadow: `0 0 15px ${selectedTaskSubmissions[0].status === 'approved' ? 'rgba(34, 197, 94, 0.1)' : selectedTaskSubmissions[0].status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'}` }}>
                                        {selectedTaskSubmissions[0].status}
                                    </div>
                                </div>

                                <div className="feedback-form-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Provide Feedback</h4>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Comments</label>
                                        <textarea
                                            placeholder="Write your feedback here..."
                                            value={feedbackComments}
                                            onChange={(e) => setFeedbackComments(e.target.value)}
                                            style={{ width: '100%', minHeight: '140px', padding: '1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.5, resize: 'vertical', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                                            onFocus={(e) => { e.target.style.borderColor = 'var(--accent-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                                        ></textarea>
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Excel Checkback (Optional)</label>
                                        <div className="file-upload-area" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <input
                                                type="file"
                                                id="checkback-file"
                                                accept=".xlsx,.xls"
                                                onChange={(e) => setFeedbackFile(e.target.files?.[0] || null)}
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="checkback-file" className={feedbackFile ? 'has-file' : ''} style={{ flex: 1, padding: '0.8rem', background: feedbackFile ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0,0,0,0.2)', border: feedbackFile ? '1px solid var(--accent-blue)' : '1px dashed rgba(255,255,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: feedbackFile ? 'var(--accent-blue)' : 'var(--text-muted)', transition: 'all 0.2s', fontWeight: 500 }}
                                                onMouseEnter={(e) => { if (!feedbackFile) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; } }}
                                                onMouseLeave={(e) => { if (!feedbackFile) { e.currentTarget.style.background = 'rgba(0,0,0,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; } }}
                                            >
                                                <Upload size={18} />
                                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{feedbackFile ? feedbackFile.name : 'Upload File'}</span>
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
                                                    title="Remove file"
                                                    style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ flex: 1 }}></div>

                                    <div className="modal-action-buttons" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <button
                                            className="btn-reject"
                                            onClick={() => handleSubmitFeedback('rejected')}
                                            disabled={isSubmittingFeedback}
                                            style={{ flex: 1, padding: '0.8rem', background: 'linear-gradient(to bottom, #ef4444, #dc2626)', border: 'none', color: '#fff', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)', transition: 'all 0.2s', opacity: isSubmittingFeedback ? 0.7 : 1 }}
                                            onMouseEnter={(e) => { if (!isSubmittingFeedback) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)'; } }}
                                            onMouseLeave={(e) => { if (!isSubmittingFeedback) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)'; } }}
                                        >
                                            <XCircle size={18} /> Reject
                                        </button>
                                        <button
                                            className="btn-approve"
                                            onClick={() => handleSubmitFeedback('approved')}
                                            disabled={isSubmittingFeedback}
                                            style={{ flex: 1, padding: '0.8rem', background: 'linear-gradient(to bottom, #22c55e, #16a34a)', border: 'none', color: '#fff', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)', transition: 'all 0.2s', opacity: isSubmittingFeedback ? 0.7 : 1 }}
                                            onMouseEnter={(e) => { if (!isSubmittingFeedback) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)'; } }}
                                            onMouseLeave={(e) => { if (!isSubmittingFeedback) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.3)'; } }}
                                        >
                                            <CheckCircle2 size={18} /> Approve
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
                                        <span key={sub.id} className={`task-code-badge ${getUnitCodeBadgeClass(sub.task?.task_code)}`} style={{ fontSize: '0.85rem' }}>
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


        </div>
    );
};
