import React from 'react';
import { TraineeProgress } from '../../../services/adminService';
import { CheckCircle2, Award, Calendar, User, BarChart3 } from 'lucide-react';

interface ProgressReportPrintProps {
    trainee: TraineeProgress;
}

export const ProgressReportPrint: React.FC<ProgressReportPrintProps> = ({ trainee }) => {
    return (
        <div className="print-report-container">
            <header className="report-header">
                <div className="brand">
                    <h1>KMTI WORKSTATION</h1>
                    <p>ENGINEERING COMPETENCY REPORT</p>
                </div>
                <div className="report-meta">
                    <p>Generated: {new Date().toLocaleDateString()}</p>
                    <p>Report ID: TR-{trainee.id}-{Date.now().toString().slice(-6)}</p>
                </div>
            </header>

            <section className="trainee-info-section">
                <div className="info-grid">
                    <div className="info-item">
                        <label>Candidate Name</label>
                        <p>{trainee.full_name}</p>
                    </div>
                    <div className="info-item">
                        <label>System Username</label>
                        <p>@{trainee.username}</p>
                    </div>
                    <div className="info-item">
                        <label>Current Status</label>
                        <p>{trainee.completed_lessons >= 15 ? 'CERTIFIED' : 'IN TRAINING'}</p>
                    </div>
                </div>
            </section>

            <section className="mastery-overview">
                <div className="mastery-card">
                    <div className="mastery-val">{trainee.average_score}%</div>
                    <label>WEIGHTED MASTERY INDEX</label>
                    <p className="desc">Balanced metric considering best score vs. attempt efficiency.</p>
                </div>
                <div className="stats-row">
                    <div className="stat">
                        <span className="val">{trainee.completed_lessons}</span>
                        <span className="lab">Modules Completed</span>
                    </div>
                    <div className="stat">
                        <span className="val">{trainee.raw_average_score}%</span>
                        <span className="lab">Raw Success Rate</span>
                    </div>
                </div>
            </section>

            <section className="curriculum-breakdown">
                <h2><BarChart3 size={18} /> ASSESSMENT TRANSCRIPT</h2>
                <table className="transcript-table">
                    <thead>
                        <tr>
                            <th>Module / Assessment</th>
                            <th>Category</th>
                            <th>Best Score</th>
                            <th>Attempts</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainee.quizzes_history.map((q, idx) => (
                            <tr key={idx}>
                                <td>{q.lesson_id}</td>
                                <td>{q.course_id === '1' ? '3D Modeling' : '2D Drawing'}</td>
                                <td>{q.score}%</td>
                                <td>{q.attempts_count}</td>
                                <td className={q.score >= 80 ? 'pass' : 'fail'}>
                                    {q.score >= 80 ? 'COMPETENT' : 'RE-EVALUATE'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {trainee.completed_lessons >= 15 && (
                <section className="certificate-footer">
                    <Award size={48} className="award-icon" />
                    <div className="cert-text">
                        <h3>KMTI CERTIFIED OPERATOR</h3>
                        <p>This candidate has demonstrated full technical competency across the standard KMTI ICAD Operation Manual curriculum.</p>
                    </div>
                </section>
            )}

            <footer className="report-footer">
                <p>KMTI Technical Training Department • Confidential Engineering Document</p>
                <div className="signatures">
                    <div className="sig-line">Instructor Signature</div>
                    <div className="sig-line">Date</div>
                </div>
            </footer>

            <style>{`
                @media screen {
                    .print-report-container { display: none; }
                }
                @media print {
                    @page { margin: 2cm; }
                    body * { visibility: hidden; }
                    .print-report-container, .print-report-container * { visibility: visible; }
                    .print-report-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        display: block !important;
                        color: #000;
                        background: #fff;
                        font-family: 'Inter', sans-serif;
                    }
                    .report-header {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 2px solid #000;
                        padding-bottom: 1rem;
                        margin-bottom: 2rem;
                    }
                    .brand h1 { margin: 0; font-size: 1.5rem; letter-spacing: 0.1em; }
                    .brand p { margin: 0; font-size: 0.8rem; color: #666; }
                    .info-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 2rem;
                        margin-bottom: 2rem;
                    }
                    .info-item label { font-size: 0.7rem; color: #666; text-transform: uppercase; display: block; }
                    .info-item p { margin: 0.2rem 0; font-weight: 700; font-size: 1rem; }
                    .mastery-overview {
                        background: #f8f9fa;
                        padding: 2rem;
                        text-align: center;
                        margin-bottom: 2rem;
                        border-radius: 8px;
                    }
                    .mastery-val { font-size: 3rem; font-weight: 800; }
                    .mastery-card label { font-weight: 700; font-size: 0.8rem; }
                    .mastery-card .desc { font-size: 0.7rem; color: #666; }
                    .stats-row { display: flex; justify-content: center; gap: 4rem; margin-top: 1rem; }
                    .stat .val { display: block; font-size: 1.2rem; font-weight: 700; }
                    .stat .lab { font-size: 0.7rem; color: #666; }
                    .transcript-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                    .transcript-table th { text-align: left; font-size: 0.8rem; border-bottom: 1px solid #ddd; padding: 0.5rem; }
                    .transcript-table td { padding: 0.5rem; border-bottom: 1px solid #eee; font-size: 0.8rem; }
                    .pass { color: #059669; font-weight: 700; }
                    .fail { color: #dc2626; font-weight: 700; }
                    .certificate-footer {
                        margin-top: 3rem;
                        display: flex;
                        align-items: center;
                        gap: 2rem;
                        border: 2px solid #fbbf24;
                        padding: 1.5rem;
                        background: #fffbeb;
                        border-radius: 8px;
                    }
                    .cert-text h3 { margin: 0; color: #92400e; }
                    .cert-text p { margin: 0.5rem 0 0 0; font-size: 0.8rem; }
                    .report-footer { margin-top: 4rem; font-size: 0.7rem; color: #666; border-top: 1px solid #eee; padding-top: 1rem; }
                    .signatures { display: flex; justify-content: space-between; margin-top: 3rem; }
                    .sig-line { border-top: 1px solid #000; width: 200px; text-align: center; padding-top: 0.5rem; }
                }
            `}</style>
        </div>
    );
};
