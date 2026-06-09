import React from 'react';
import { MessageSquare, FileText, Play, Download } from 'lucide-react';
import { AssessmentSubmission } from '../../../services/assessmentService';

interface SubmissionTimelineProps {
    selectedTaskSubmissions: AssessmentSubmission[];
    handleOpenInIJCAD: (submission: AssessmentSubmission) => void;
    handleDownloadTraineeFile: (submission: AssessmentSubmission) => void;
    handleDownloadCheckback: (feedback: any) => void;
}

export const SubmissionTimeline: React.FC<SubmissionTimelineProps> = ({
    selectedTaskSubmissions,
    handleOpenInIJCAD,
    handleDownloadTraineeFile,
    handleDownloadCheckback
}) => {
    return (
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
    );
};
