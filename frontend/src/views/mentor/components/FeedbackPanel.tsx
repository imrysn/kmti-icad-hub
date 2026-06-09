import React from 'react';
import { CheckCircle2, XCircle, Upload } from 'lucide-react';
import { AssessmentSubmission } from '../../../services/assessmentService';

interface FeedbackPanelProps {
    latestSubmission: AssessmentSubmission;
    feedbackComments: string;
    setFeedbackComments: (val: string) => void;
    feedbackFile: File | null;
    setFeedbackFile: (file: File | null) => void;
    isSubmittingFeedback: boolean;
    handleSubmitFeedback: (status: 'approved' | 'rejected') => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
    latestSubmission,
    feedbackComments,
    setFeedbackComments,
    feedbackFile,
    setFeedbackFile,
    isSubmittingFeedback,
    handleSubmitFeedback
}) => {
    return (
        <div className="action-panel">
            <div className="review-task-info">
                <span className="label">Current Status</span>
                <div className={`status-badge large ${latestSubmission.status}`}>
                    {latestSubmission.status.toUpperCase()}
                </div>
            </div>

            {latestSubmission.status === 'pending' ? (
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
                    <h3>Task {latestSubmission.status}</h3>
                    <p>This attempt has already been reviewed. If the trainee resubmits, it will appear as a new attempt.</p>
                </div>
            )}
        </div>
    );
};
