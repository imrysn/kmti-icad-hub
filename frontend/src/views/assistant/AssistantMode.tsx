import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Brain, GraduationCap, ClipboardList } from 'lucide-react';
import { IntelligenceChatbot } from '../admin/components/IntelligenceChatbot';
import MentorMode from '../mentor/MentorMode';
import { PracticalTrainerDashboard } from '../mentor/components/PracticalTrainerDashboard';

import '../../styles/AssistantMode.css';

/**
 * Assistant Mode: Dual-purpose workspace for employees
 * - Intelligence Assistant: AI Chatbot
 * - Training Review: Refresher training from Mentor Mode
 */
const AssistantMode: React.FC = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'assistant' | 'training' | 'assessment'>(() => {
        return (localStorage.getItem('assistant-active-tab') as any) || 'assistant';
    });

    useEffect(() => {
        localStorage.setItem('assistant-active-tab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tabParam = params.get('tab');
        if (tabParam === 'assessment' || tabParam === 'assistant' || tabParam === 'training') {
            setActiveTab(tabParam as any);
        }
    }, [location.search]);

    return (
        <div className="assistant-mode-container">
            <div className="assistant-tab-content">
                {activeTab === 'assistant' ? (
                    <div className="assistant-chatbot-wrapper">
                        <IntelligenceChatbot isAdmin={true} />
                    </div>
                ) : activeTab === 'training' ? (
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
