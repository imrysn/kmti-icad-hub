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

    // For ICAD and SOLIDWORKS, Employee mode renders MentorMode but we must pass ?view=... 
    // Wait, MentorMode reads view from window.location.search in App.tsx navigation? 
    // Yes! navigate(`/assistant?tab=icad_standard`) means location.search has ?tab=icad_standard.
    // MentorMode reads searchParams.get('view').
    // So we need to ensure MentorMode reads the correct view when used in AssistantMode, or we update MentorMode to check `view` OR `tab`.
    // Actually, in AssistantMode we can just render MentorMode. MentorMode reads `view` from location.search, so let's make sure App.tsx navigates to `/assistant?tab=icad_standard&view=icad_standard` OR we just update MentorMode to check `view` or `tab`.
    // Let's just render MentorMode for any tab that is not 'assessment'

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
