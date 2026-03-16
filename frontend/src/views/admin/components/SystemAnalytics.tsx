import React from 'react';
import { Users, CheckCircle2, Database, Activity, HelpCircle } from 'lucide-react';
import { SystemStats } from '../../../services/adminService';

interface SystemAnalyticsProps {
    stats: SystemStats;
    cpuLoad: number;
    memoryUsage: number;
    sysStatus: string;
    heatmap: { course_id: string; count: number }[];
}

export const SystemAnalytics: React.FC<SystemAnalyticsProps> = ({ 
    stats, 
    cpuLoad, 
    memoryUsage, 
    sysStatus, 
    heatmap
}) => {
    // Heatmap color logic
    const getHeatmapColor = (count: number) => {
        if (count > 50) return '#4f46e5'; // Indigo-600
        if (count > 20) return '#6366f1'; // Indigo-500
        if (count > 5)  return '#818cf8'; // Indigo-400
        return '#c7d2fe'; // Indigo-200
    };

    return (
        <div className="overview-content">
            <div className="stats-cards">
                <div className="stat-card">
                    <div className="stat-header">
                        <Users className="icon" size={18} />
                        <span className="label">Total Workforce</span>
                    </div>
                    <div className="stat-value">
                        <span className="main">{stats.users.total}</span>
                        <span className="trend positive">↑ 4%</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <CheckCircle2 className="icon" size={18} />
                        <span className="label">Active Sessions</span>
                    </div>
                    <div className="stat-value">
                        <span className="main">{stats.users.active}</span>
                        <span className="status">Optimal</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <Database className="icon" size={18} />
                        <span className="label">Intelligence Node</span>
                        <div className="tooltip-trigger">
                            <HelpCircle size={14} color="#94a3b8" />
                            <span className="tooltip-text">Vectorized manuals from 'knowledge_base/' used by AI Assistant & Mentor.</span>
                        </div>
                    </div>
                    <div className="stat-value">
                        <span className="main">{stats.knowledge_base.total_documents}</span>
                        <span className="sub">Vectors Ready</span>
                    </div>
                </div>
            </div>

            <div className="system-health">
                <h3>Engine Intelligence</h3>
                <div className="health-metrics">
                    <div className="metric-item">
                        <div className="metric-header">
                            <span>Compute Intensity</span>
                            <span className="pct">{cpuLoad.toFixed(1)}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ '--percent': `${cpuLoad}%` } as React.CSSProperties}></div>
                        </div>
                    </div>
                    <div className="metric-item">
                        <div className="metric-header">
                            <span>Memory Buffer</span>
                            <span className="pct">{memoryUsage.toFixed(1)}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ '--percent': `${memoryUsage}%` } as React.CSSProperties}></div>
                        </div>
                    </div>
                    <div className="metric-item">
                        <div className="metric-header">
                            <span>Knowledge Health</span>
                            <div className="tooltip-trigger inline">
                                <HelpCircle size={12} color="#94a3b8" />
                                <span className="tooltip-text">Reflects indexed document status. Re-index to sync new files.</span>
                            </div>
                            <span className="pct">{stats.knowledge_base.total_documents} docs</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ '--percent': `${Math.min((stats.knowledge_base.total_documents / 200) * 100, 100)}%` } as React.CSSProperties}></div>
                        </div>
                    </div>
                </div>
                <div className="status-indicator operational">
                    <Activity size={16} /> System Status: {sysStatus}
                </div>

                <div className="heatmap-container">
                    <div className="heatmap-header">
                        <h3>Live Training Heatmap</h3>
                        <span className="activity-window">Last 60 Minutes</span>
                    </div>
                    <div className="heatmap-grid">
                        {heatmap.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="heatmap-cell"
                                style={{ backgroundColor: getHeatmapColor(item.count) }}
                                title={`Course: ${item.course_id} - ${item.count} active users`}
                            >
                                {item.course_id.toUpperCase()}
                            </div>
                        ))}
                        {heatmap.length === 0 && <p className="text-muted">No recent training activity.</p>}
                    </div>
                </div>

            </div>
        </div>
    );
};
