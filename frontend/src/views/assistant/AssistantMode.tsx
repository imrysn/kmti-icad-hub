import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MentorMode from '../mentor/MentorMode';
import { PracticalTrainerDashboard } from '../mentor/components/PracticalTrainerDashboard';

import '../../styles/AssistantMode.css';

/**
 * Assistant Mode: Workspace for employees housing training review and assessments
 */
const AssistantMode: React.FC = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'training' | 'assessment'>(() => {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        if (tabParam === 'assessment' || tabParam === 'training') {
            return tabParam as any;
        }
        return (localStorage.getItem('assistant-active-tab') as any) || 'training';
    });

    useEffect(() => {
        localStorage.setItem('assistant-active-tab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tabParam = params.get('tab');
        if (tabParam === 'assessment' || tabParam === 'training') {
            setActiveTab(tabParam as any);
        }
    }, [location.search]);

    return (
        <div className="assistant-mode-container">
            <div className="assistant-tab-content">
                {activeTab === 'training' ? (
                    <div className="assistant-training-wrapper">
                        <MentorMode isEmployeeSide={true} />
                    </div>
                ) : (
                    <PracticalTrainerDashboard />
                )}
            </div>
        </div>
    );
};

export default AssistantMode;
