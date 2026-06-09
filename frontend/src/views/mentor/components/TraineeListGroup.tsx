import React from 'react';
import { ChevronUp, ChevronDown, CheckCircle2, Clock, XCircle, Download, Eye } from 'lucide-react';
import { AssessmentSubmission } from '../../../services/assessmentService';

interface TraineeListGroupProps {
    grouped: Record<number, any>;
    expandedTrainees: number[];
    toggleTrainee: (id: number) => void;
    expandedSets: string[];
    toggleSet: (key: string) => void;
    handleDownloadTraineeFile: (submission: AssessmentSubmission) => void;
    setSelectedTaskSubmissions: (subs: AssessmentSubmission[]) => void;
    setIsReviewing: (val: boolean) => void;
}

export const TraineeListGroup: React.FC<TraineeListGroupProps> = ({
    grouped,
    expandedTrainees,
    toggleTrainee,
    expandedSets,
    toggleSet,
    handleDownloadTraineeFile,
    setSelectedTaskSubmissions,
    setIsReviewing
}) => {
    return (
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
                                                    {isSetExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
    );
};
