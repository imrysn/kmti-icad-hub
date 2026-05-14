import React, { useState, useEffect } from 'react';
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
    const [activeTab, setActiveTab] = useState<'assistant' | 'training' | 'assessment'>(() => {
        return (localStorage.getItem('assistant-active-tab') as any) || 'assistant';
    });

    useEffect(() => {
        localStorage.setItem('assistant-active-tab', activeTab);
    }, [activeTab]);

    return (
        <div className="assistant-mode-container">
            <nav className="assistant-tabs">
                <button className={`assistant-tab-btn ${activeTab === 'assistant' ? 'active' : ''}`} onClick={() => setActiveTab('assistant')}
                >
                    <Brain size={18} />
                    <span>Intelligence Assistant</span>
                </button>
                <button className={`assistant-tab-btn ${activeTab === 'training' ? 'active' : ''}`} onClick={() => setActiveTab('training')}
                >
                    <GraduationCap size={18} />
                    <span>iCAD Manuals and Standard</span>
                </button>
                <button className={`assistant-tab-btn ${activeTab === 'assessment' ? 'active' : ''}`} onClick={() => setActiveTab('assessment')}
                >
                    <ClipboardList size={18} />
                    <span>Assessment Review</span>
                </button>
            </nav>

            <div className="assistant-tab-content">
                {activeTab === 'assistant' ? (
                    <IntelligenceChatbot />
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
