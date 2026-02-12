import React from 'react';
import '../styles/Skeleton.css';

/**
 * Skeleton for a Course Card in Mentor Mode
 * Matches: Title, Description, Button
 */
export const CourseCardSkeleton: React.FC = () => {
    return (
        <div className="course-card skeleton-container">
            {/* Title */}
            <div className="skeleton skeleton-title" />

            {/* Description (3 lines) */}
            <div className="skeleton-text-group">
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line w-90" />
                <div className="skeleton skeleton-line w-60" />
            </div>

            {/* Button */}
            <div className="skeleton skeleton-btn" />
        </div>
    );
};

/**
 * Skeleton for a Search Result in Assistant Mode
 * Matches: Header (Icon+Source), Content, Media Chips
 */
export const SearchResultSkeleton: React.FC = () => {
    return (
        <div className="result-card skeleton-result-card">
            {/* Header: Icon + Source */}
            <div className="skeleton-header">
                <div className="skeleton skeleton-icon" />
                <div className="skeleton skeleton-source" />
            </div>

            {/* Content paragraph */}
            <div className="skeleton-content-group">
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line w-95" />
                <div className="skeleton skeleton-line w-85" />
            </div>

            {/* Media Chips Row */}
            <div className="skeleton-chips-row">
                <div className="skeleton skeleton-chip" />
                <div className="skeleton skeleton-chip" />
            </div>
        </div>
    );
};

/**
 * Skeleton for Admin Stats Card
 */
export const StatCardSkeleton: React.FC = () => {
    return (
        <div className="stat-card skeleton-stat-card">
            <div className="skeleton-stat-header">
                <div className="skeleton skeleton-stat-icon" />
                <div className="skeleton skeleton-stat-value" />
            </div>
            <div className="skeleton skeleton-stat-value" />
        </div>
    );
};
