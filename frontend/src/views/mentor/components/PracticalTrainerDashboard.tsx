import React, { useState, useEffect } from 'react';
import { User, CheckCircle2, XCircle, Clock, Download, Upload, Eye, ChevronRight, Search, FileText } from 'lucide-react';
import { assessmentService, AssessmentSubmission } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { useNotification } from '../../../context/NotificationContext';
import '../../../styles/mentor/PracticalTrainerDashboard.css';

export const PracticalTrainerDashboard: React.FC = () => {
    const { showNotification } = useNotification();
    const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState<AssessmentSubmission | null>(null);
    const [isReviewing, setIsReviewing] = useState(false);
    const [feedbackComments, setFeedbackComments] = useState('');
    const [feedbackFile, setFeedbackFile] = useState<File | null>(null);
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
    const [statusFilter, setStatusFilter] = useState<'pending' | 'all'>('pending');

    useEffect(() => {
        fetchSubmissions();
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
        // Since we are in the web dashboard (could be browser or Electron),
        // we'll use a direct link for now. 
        // In Electron, we could use a similar logic to download-and-open.
        const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/assessments/submissions/${submission.id}/download`;
        const token = authService.getToken();
        
        // Open in a new tab with auth token (or use a fetch blob download)
        // For simplicity, let's use the fetch blob download
        fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
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

    const handleSubmitFeedback = async (status: 'approved' | 'rejected') => {
        if (!selectedSubmission) return;
        if (status === 'rejected' && !feedbackComments) {
            showNotification('Please provide comments for rejection.', 'warning');
            return;
        }

        setIsSubmittingFeedback(true);
        try {
            await assessmentService.provideFeedback(
                selectedSubmission.id, 
                status, 
                feedbackFile || undefined, 
                feedbackComments
            );
            showNotification(`Submission ${status} successfully.`, 'success');
            setIsReviewing(false);
            setSelectedSubmission(null);
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

    if (loading) {
        return <div className="trainer-loading">Loading submissions...</div>;
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

            <div className="submissions-grid">
                {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map(s => (
                        <div key={s.id} className="submission-card">
                            <div className="card-header">
                                <div className="trainee-info">
                                    <div className="avatar-circle">
                                        {s.user?.full_name?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <h4>{s.user?.full_name}</h4>
                                        <span>@{s.user?.username}</span>
                                    </div>
                                </div>
                                <div className={`status-badge ${s.status}`}>
                                    {s.status === 'approved' && <CheckCircle2 size={12} />}
                                    {s.status === 'pending' && <Clock size={12} />}
                                    {s.status === 'rejected' && <XCircle size={12} />}
                                    <span>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span>
                                </div>
                            </div>
                            
                            <div className="task-preview">
                                <span className="set-tag">Set {s.task?.set_number} Unit {s.task?.task_code}</span>
                                <h3>{s.task?.title}</h3>
                                <div className="submission-meta">
                                    <Clock size={14} /> Submitted {new Date(s.submitted_at).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="card-actions">
                                <button className="btn-secondary" onClick={() => handleDownloadTraineeFile(s)}>
                                    <Download size={16} /> DWG
                                </button>
                                <button className="btn-primary" onClick={() => {
                                    setSelectedSubmission(s);
                                    setIsReviewing(true);
                                }}>
                                    <Eye size={16} /> Review
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-submissions">
                        <CheckCircle2 size={48} />
                        <h3>All caught up!</h3>
                        <p>No pending submissions require your review at this time.</p>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {isReviewing && selectedSubmission && (
                <div className="modal-overlay">
                    <div className="review-modal animate-slide-up">
                        <div className="modal-header">
                            <h3>Review Submission: {selectedSubmission.user?.full_name}</h3>
                            <button className="close-btn" onClick={() => setIsReviewing(false)}>
                                <XCircle size={24} />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="review-task-info">
                                <span className="label">Assessment Task</span>
                                <h4>Set {selectedSubmission.task?.set_number} • {selectedSubmission.task?.title}</h4>
                            </div>

                            <div className="feedback-form">
                                <div className="form-group">
                                    <label>Trainer Comments</label>
                                    <textarea 
                                        placeholder="Provide detailed feedback for the trainee..."
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
                                        <label htmlFor="checkback-file">
                                            <Upload size={18} />
                                            <span>{feedbackFile ? feedbackFile.name : 'Upload Excel Checkback'}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                className="btn-reject" 
                                onClick={() => handleSubmitFeedback('rejected')}
                                disabled={isSubmittingFeedback}
                            >
                                <XCircle size={16} /> Reject with Feedback
                            </button>
                            <button 
                                className="btn-approve" 
                                onClick={() => handleSubmitFeedback('approved')}
                                disabled={isSubmittingFeedback}
                            >
                                <CheckCircle2 size={16} /> Approve & Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
