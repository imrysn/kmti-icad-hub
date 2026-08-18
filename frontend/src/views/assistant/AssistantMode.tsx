import React,{ useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import MentorMode from '../mentor/MentorMode';
import { PracticalTrainerDashboard } from '../mentor/components/PracticalTrainerDashboard';

import '../../styles/AssistantMode.css';

/**
 * Assistant Mode: Workspace for employees housing training review and assessments
 */
const AssistantMode: React.FC = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>(() => {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        if (tabParam) {
            return tabParam;
        }
        return localStorage.getItem('assistant-active-tab') || 'training';
    });

    useEffect(() => {
        localStorage.setItem('assistant-active-tab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tabParam = params.get('tab');
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [location.search]);

    return (
        <div className="assistant-mode-container">
            <div className="assistant-tab-content">
                {activeTab === 'assessment' ? (
                    <PracticalTrainerDashboard />
                ) : (
                    <div className="assistant-training-wrapper">
                        <MentorMode isEmployeeSide={true} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssistantMode;
