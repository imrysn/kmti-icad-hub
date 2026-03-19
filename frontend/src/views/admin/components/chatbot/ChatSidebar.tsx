import React, { useCallback } from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { StoredSession } from './types';

interface ChatSidebarProps {
    sessions: StoredSession[];
    activeSessionId: string | null;
    onNewChat: () => void;
    onSwitchSession: (id: string) => void;
    onDeleteSession: (id: string, e: React.MouseEvent) => void;
    onClearAll: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
    sessions,
    activeSessionId,
    onNewChat,
    onSwitchSession,
    onDeleteSession,
    onClearAll
}) => {
    const formatDate = useCallback((iso: string) =>
        new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), []);

    return (
        <aside className="chatbot-sidebar" aria-label="Chat sessions">
            <button className="new-chat-btn" onClick={onNewChat} aria-label="Start new chat conversation">
                <MessageSquare size={15} />
                New Chat
            </button>
            <p className="chatbot-sidebar-label">
                Recent Chats
                {sessions.length > 0 && (
                    <button className="clear-sessions-btn" onClick={onClearAll} title="Clear all history" aria-label="Clear all chat history">
                        <Trash2 size={10} />
                        Clear All
                    </button>
                )}
            </p>
            <div className="sessions-list" role="list">
                {sessions.length === 0 && <p className="no-sessions">No conversations yet</p>}
                {sessions.map(session => (
                    <div
                        key={session.id}
                        className={`session-item ${activeSessionId === session.id ? 'active' : ''}`}
                        onClick={() => onSwitchSession(session.id)}
                        role="listitem"
                        tabIndex={0}
                        aria-label={`Chat session: ${session.title}`}
                        aria-current={activeSessionId === session.id ? 'true' : 'false'}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSwitchSession(session.id); } }}
                    >
                        <div className="session-info">
                            <span className="session-title">{session.title}</span>
                            <span className="session-date">{formatDate(session.createdAt)}</span>
                        </div>
                        <button
                            className="session-delete"
                            onClick={(e) => onDeleteSession(session.id, e)}
                            aria-label={`Delete conversation ${session.title}`}
                        >
                            <Trash2 size={13} />
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
};
