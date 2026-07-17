import React, { useMemo, useState } from 'react';
import { Modal } from '../../../components/Modal';
import { AssessmentTask, AssessmentSubmission } from '../../../services/assessmentService';
import { Clock, Filter, Copy } from 'lucide-react';
import { useNotification } from '../../../context/NotificationContext';

interface TimeRecordModalProps {
    isOpen: boolean;
    onClose: () => void;
    tasks: AssessmentTask[];
    submissions: AssessmentSubmission[];
    userId: number;
    getSetDisplayNumber: (s: number) => number;
}

export const TimeRecordModal: React.FC<TimeRecordModalProps> = ({ isOpen, onClose, tasks, submissions, userId, getSetDisplayNumber }) => {
    const [selectedSet, setSelectedSet] = useState<number | 'ALL'>('ALL');
    const { showNotification } = useNotification();

    // Group submissions by Set
    const groupedSubmissions = useMemo(() => {
        const grouped: { [set: number]: AssessmentSubmission[] } = {};
        
        // Show submissions (we can include those with 0 seconds for testing)
        let validSubmissions = submissions.filter(sub => sub.time_spent_seconds !== undefined && sub.time_spent_seconds !== null);
        
        // Filter to only keep the latest attempt for each unique task (cumulative time)
        const latestSubmissionsMap = new Map<number, AssessmentSubmission>();
        validSubmissions.forEach(sub => {
            const taskId = sub.task_id || sub.task?.id;
            if (!taskId) return;
            const existing = latestSubmissionsMap.get(taskId);
            if (!existing || new Date(sub.submitted_at).getTime() > new Date(existing.submitted_at).getTime()) {
                latestSubmissionsMap.set(taskId, sub);
            }
        });
        
        validSubmissions = Array.from(latestSubmissionsMap.values());
        
        validSubmissions.forEach(sub => {
            const task = tasks.find(t => t.id === (sub.task_id || sub.task?.id));
            if (!task) return;
            
            if (!grouped[task.set_number]) {
                grouped[task.set_number] = [];
            }
            // Attach task to sub for easy rendering
            sub.task = task;
            grouped[task.set_number].push(sub);
        });
        
        // Sort submissions within each set by task order/id
        Object.keys(grouped).forEach(key => {
            grouped[Number(key)].sort((a, b) => {
                const orderA = a.task?.order || a.task?.id || 0;
                const orderB = b.task?.order || b.task?.id || 0;
                if (orderA !== orderB) return orderA - orderB;
                // For multiple attempts of the same task, show the latest first
                return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
            });
        });
        
        return grouped;
    }, [submissions, tasks, isOpen]);

    const availableSets = Object.keys(groupedSubmissions).map(Number).sort((a, b) => a - b);
    
    // Filter the sets based on selection
    const setsToRender = selectedSet === 'ALL' 
        ? Object.entries(groupedSubmissions)
        : Object.entries(groupedSubmissions).filter(([setStr]) => Number(setStr) === selectedSet);

    const handleCopyToExcel = (subs: AssessmentSubmission[]) => {
        let tsv = '';
        subs.forEach(sub => {
            let fileName = sub.submission_file_path?.split(/[\\/]/).pop() || 'Unknown File';
            const lastDot = fileName.lastIndexOf('.');
            if (lastDot > 0) fileName = fileName.substring(0, lastDot);

            const timeSeconds = sub.time_spent_seconds || 0;
            const finishedDate = new Date(sub.submitted_at);
            const startedDate = new Date(finishedDate.getTime() - timeSeconds * 1000);
            const formatMin = (Math.round((timeSeconds / 60) * 100) / 100).toFixed(2);
            const dateStr1 = startedDate.toLocaleDateString();
            const dateStr2 = finishedDate.toLocaleDateString();
            
            // F(Title) \t G \t H \t I \t J \t K \t L(Date Started) \t M(Date Finished) \t N(Time)
            tsv += `${fileName}\t\t\t\t\t\t${dateStr1}\t${dateStr2}\t${formatMin}\n`;
        });

        // Use traditional copy since clipboard API is blocked in this environment
        const textArea = document.createElement("textarea");
        textArea.value = tsv;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification('Copied to clipboard! You can now click on cell F in Excel and Paste.', 'success');
            } else {
                showNotification('Copy failed. Your browser blocked it.', 'error');
            }
        } catch (err) {
            console.error('Fallback copy failed', err);
            showNotification('Copy failed. Please manually copy the table.', 'error');
        }
        document.body.removeChild(textArea);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Time Records" size="lg">
            <div style={{ padding: '1.5rem', maxHeight: '75vh', overflowY: 'auto' }}>
                
                {availableSets.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                            <Filter size={16} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Filter by Set:</span>
                        </div>
                        <select 
                            value={selectedSet} 
                            onChange={(e) => setSelectedSet(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                            style={{ 
                                padding: '0.4rem 0.8rem', 
                                borderRadius: '4px', 
                                backgroundColor: 'var(--surface-color)', 
                                color: 'var(--text-main)', 
                                border: '1px solid var(--border-color)',
                                outline: 'none',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            <option value="ALL" style={{ backgroundColor: '#1e293b', color: '#fff' }}>All Sets</option>
                            {availableSets.map(setNum => (
                                <option key={setNum} value={setNum} style={{ backgroundColor: '#1e293b', color: '#fff' }}>Set {getSetDisplayNumber(setNum)}</option>
                            ))}
                        </select>
                    </div>
                )}

                {Object.keys(groupedSubmissions).length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                        <Clock size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <p>No completed time records found yet.</p>
                        <p style={{ fontSize: '0.85rem' }}>Upload a file after the timer runs to see records here.</p>
                    </div>
                ) : (
                    setsToRender.map(([setStr, subs]) => {
                        const setNum = parseInt(setStr, 10);

                        return (
                            <div key={setNum} style={{ marginBottom: '2.5rem', backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <h4 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '1.1rem' }}>Set {getSetDisplayNumber(setNum)}</h4>
                                        <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '12px' }}>
                                            {subs.length} records
                                        </span>
                                    </div>
                                    <button 
                                        className="btn-primary" 
                                        onClick={() => handleCopyToExcel(subs)}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        <Copy size={14} /> Copy for Excel
                                    </button>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', tableLayout: 'fixed' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '40%', padding: '1rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 600, position: 'sticky', left: 0, backgroundColor: 'var(--surface-color)', zIndex: 1, borderRight: '1px solid var(--border-color)' }}>Title</th>
                                                
                                                {/* Hidden spacer columns to match Excel F to L gap (Qty, Mat'l Weight, Total Mat'l Weight, Finished Weight, Total Finished Weight) */}
                                                <th style={{ width: 0, padding: 0, border: 'none' }}></th>
                                                <th style={{ width: 0, padding: 0, border: 'none' }}></th>
                                                <th style={{ width: 0, padding: 0, border: 'none' }}></th>
                                                <th style={{ width: 0, padding: 0, border: 'none' }}></th>
                                                <th style={{ width: 0, padding: 0, border: 'none' }}></th>

                                                <th style={{ width: '20%', padding: '1rem', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>Date Started</th>
                                                <th style={{ width: '20%', padding: '1rem', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>Date Finished</th>
                                                <th style={{ width: '20%', padding: '1rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap' }}>Time (mins)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subs.map((sub, i) => {
                                                let fileName = sub.submission_file_path?.split(/[\\/]/).pop() || 'Unknown File';
                                                const lastDot = fileName.lastIndexOf('.');
                                                if (lastDot > 0) fileName = fileName.substring(0, lastDot);

                                                const timeSeconds = sub.time_spent_seconds || 0;
                                                
                                                // Calculate Date Started: Finished - Time Elapsed
                                                const finishedDate = new Date(sub.submitted_at);
                                                const startedDate = new Date(finishedDate.getTime() - timeSeconds * 1000);
                                                
                                                const formatMin = (Math.round((timeSeconds / 60) * 100) / 100).toFixed(2);
                                                
                                                // Only show Date, not time
                                                const formatDate = (date: Date) => {
                                                    return date.toLocaleDateString();
                                                };

                                                return (
                                                    <tr key={sub.id} style={{ backgroundColor: 'transparent' }}>
                                                        <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-main)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', position: 'sticky', left: 0, backgroundColor: 'var(--surface-color)', zIndex: 1, borderRight: '1px solid var(--border-color)' }} title={fileName}>{fileName}</td>
                                                        
                                                        {/* Empty tds for Excel gap */}
                                                        <td style={{ width: 0, padding: 0, border: 'none', opacity: 0 }}></td>
                                                        <td style={{ width: 0, padding: 0, border: 'none', opacity: 0 }}></td>
                                                        <td style={{ width: 0, padding: 0, border: 'none', opacity: 0 }}></td>
                                                        <td style={{ width: 0, padding: 0, border: 'none', opacity: 0 }}></td>
                                                        <td style={{ width: 0, padding: 0, border: 'none', opacity: 0 }}></td>

                                                        <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid var(--border-color)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                                                            {formatDate(startedDate)}
                                                        </td>
                                                        <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid var(--border-color)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                                                            {formatDate(finishedDate)}
                                                        </td>
                                                        <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'right', fontFamily: 'monospace', color: 'var(--success-color, #22c55e)', whiteSpace: 'nowrap', fontSize: '0.95rem' }}>
                                                            {formatMin}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                <button className="btn-secondary" onClick={onClose} style={{ padding: '0.5rem 1.5rem', borderRadius: '4px', border: '1px solid #555', background: 'var(--surface-color)', color: '#fff', cursor: 'pointer', fontWeight: 500 }}>Close</button>
            </div>
        </Modal>
    );
};
