import React from 'react';
import '../styles/Skeleton.css';
import '../styles/LoadingScreen.css';

export const LoadingScreen: React.FC = () => {
    return (
        <div className="loading-screen">
            <div className="skeleton loading-header" />

            <div className="loading-content">
                <div className="loading-top-bar">
                    <div className="skeleton loading-btn" />
                    <div className="skeleton loading-btn" />
                    <div className="skeleton loading-btn" />
                </div>

                <div className="loading-grid">
                    <div className="skeleton loading-card" />
                    <div className="skeleton loading-card" />
                    <div className="skeleton loading-card" />
                </div>

                <div className="loading-rows">
                    <div className="skeleton loading-row" />
                    <div className="skeleton loading-row" />
                    <div className="skeleton loading-row" />
                </div>
            </div>
        </div>
    );
};
