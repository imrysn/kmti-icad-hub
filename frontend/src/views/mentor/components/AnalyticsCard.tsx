import React from 'react';
import { Trophy, Target, BarChart2, Zap } from 'lucide-react';

interface AnalyticsCardProps {
    completionPercentage: number;
    averageScore: number;
    lessonsCompleted: number;
    totalLessons: number;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
    completionPercentage,
    averageScore,
    lessonsCompleted,
    totalLessons
}) => {
    // Determine mastery level
    const getMasteryLevel = () => {
        if (completionPercentage === 100) return 'Expert';
        if (completionPercentage >= 75) return 'Master';
        if (completionPercentage >= 50) return 'Pro';
        if (completionPercentage >= 25) return 'Learner';
        return 'Novice';
    };

    return (
        <div className="analytics-card">
            <div className="analytics-header">
                <div className="analytics-title">
                    <Zap size={14} className="analytics-icon-zap" />
                    <span>Learning Dashboard</span>
                </div>
                <div className={`analytics-badge ${getMasteryLevel().toLowerCase()}`}>
                    {getMasteryLevel()}
                </div>
            </div>

            <div className="analytics-progress-section">
                <div className="analytics-progress-info">
                    <span className="analytics-label">Course Completion</span>
                    <span className="analytics-value">{Math.round(completionPercentage)}%</span>
                </div>
                <div className="analytics-progress-bar-bg">
                    <div 
                        className="analytics-progress-bar-fill" 
                        style={{ width: `${completionPercentage}%` }}
                    />
                </div>
            </div>

            <div className="analytics-stats-grid">
                <div className="analytics-stat">
                    <div className="stat-icon-bg trophy">
                        <Trophy size={14} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{averageScore.toFixed(1)}</span>
                        <span className="stat-label">Avg. Score</span>
                    </div>
                </div>
                <div className="analytics-stat">
                    <div className="stat-icon-bg target">
                        <Target size={14} />
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{lessonsCompleted}/{totalLessons}</span>
                        <span className="stat-label">Lessons</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
