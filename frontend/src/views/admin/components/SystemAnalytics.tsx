import React from 'react';
import { Users, CheckCircle2, Database, Activity } from 'lucide-react';
import { SystemStats } from '../../../services/adminService';

interface SystemAnalyticsProps {
    stats: SystemStats;
    cpuLoad: number;
    memoryUsage: number;
    sysStatus: string;
}

export const SystemAnalytics: React.FC<SystemAnalyticsProps> = ({ stats, cpuLoad, memoryUsage, sysStatus }) => {
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
                            <span>Knowledge Base</span>
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
            </div>
        </div>
    );
};
