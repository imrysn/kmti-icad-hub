import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Search, XCircle } from 'lucide-react';
import { assessmentService, AssessmentSubmission } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { api } from '../../../services/api';
import { useNotification } from '../../../context/NotificationContext';
import { SubmissionTimeline } from './SubmissionTimeline';
import { FeedbackPanel } from './FeedbackPanel';
import { TraineeListGroup } from './TraineeListGroup';
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

        // Determine correct WebSocket URL based on current api baseURL
        const apiBase = api.defaults.baseURL || `http://127.0.0.1:3001`;
        const wsBase = apiBase.replace(/^http/, 'ws');
        const wsUrl = `${wsBase}/notifications/ws?token=${token}`;
        
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
        const url = `${api.defaults.baseURL || 'http://localhost:3001'}/api/v1/assessments/submissions/${submission.id}/download`;
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
                const url = `${api.defaults.baseURL || 'http://localhost:3001'}/api/v1/assessments/submissions/${submission.id}/download`;
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

            <TraineeListGroup
                grouped={grouped}
                expandedTrainees={expandedTrainees}
                toggleTrainee={toggleTrainee}
                expandedSets={expandedSets}
                toggleSet={toggleSet}
                handleDownloadTraineeFile={handleDownloadTraineeFile}
                setSelectedTaskSubmissions={setSelectedTaskSubmissions}
                setIsReviewing={setIsReviewing}
            />

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
                            <SubmissionTimeline
                                selectedTaskSubmissions={selectedTaskSubmissions}
                                handleOpenInIJCAD={handleOpenInIJCAD}
                                handleDownloadTraineeFile={handleDownloadTraineeFile}
                                handleDownloadCheckback={handleDownloadCheckback}
                            />

                            <FeedbackPanel
                                latestSubmission={selectedTaskSubmissions[0]}
                                feedbackComments={feedbackComments}
                                setFeedbackComments={setFeedbackComments}
                                feedbackFile={feedbackFile}
                                setFeedbackFile={setFeedbackFile}
                                isSubmittingFeedback={isSubmittingFeedback}
                                handleSubmitFeedback={handleSubmitFeedback}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
