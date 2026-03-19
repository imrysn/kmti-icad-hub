import React, { useMemo } from 'react';
import { Brain, Sparkles, Lightbulb, BookOpen, MessageSquare } from 'lucide-react';

interface ChatFrontierProps {
    onSuggestionClick: (suggestion: string) => void;
}

const ALL_PROMPTS = [
    'What are the code colors used in iCAD?',
    'Explain 3D modeling operations',
    'What is orthographic projection?',
    'How do I manage project revisions?',
    'What are the keyboard shortcuts for iCAD?',
    'Explain the layering system in iCAD',
    'How to export models to 3D printing formats?',
    'What is the difference between part and assembly?',
    'How to use the constraint engine?',
    'Explain parametric design principles'
];

export const ChatFrontier: React.FC<ChatFrontierProps> = ({ onSuggestionClick }) => {
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }, []);

    // Randomize and pick 4 suggestions
    const suggestions = useMemo(() => {
        return [...ALL_PROMPTS]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    }, []);

    const categories = [
        { icon: <BookOpen size={14} />, label: 'Learning' },
        { icon: <Lightbulb size={14} />, label: 'TIPS' },
        { icon: <Sparkles size={14} />, label: 'Advanced' }
    ];

    return (
        <div className="chat-frontier-container">
            <div className="frontier-header">
                <div className="frontier-brain-icon">
                    <Brain size={64} />
                    <div className="icon-glow" />
                </div>
                <h1 className="frontier-title">{greeting}, let's build something today.</h1>
                <p className="frontier-subtitle">
                    Your personal iCAD technical instructor is ready. 
                    Grounded in official documentation and best practices.
                </p>
            </div>

            <div className="frontier-suggestions-section">
                <div className="suggestions-category-row">
                    {categories.map((cat, i) => (
                        <div key={i} className="suggestion-category-tag">
                            {cat.icon}
                            <span>{cat.label}</span>
                        </div>
                    ))}
                </div>
                
                <div className="frontier-suggestions-grid">
                    {suggestions.map((prompt, i) => (
                        <button
                            key={i}
                            className="frontier-prompt-card"
                            onClick={() => onSuggestionClick(prompt)}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="prompt-card-content">
                                <MessageSquare size={16} className="prompt-icon" />
                                <span>{prompt}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="frontier-footer">
                <span>Enterprise Grade AI • Grounded in iCAD Knowledge Base</span>
            </div>
        </div>
    );
};
