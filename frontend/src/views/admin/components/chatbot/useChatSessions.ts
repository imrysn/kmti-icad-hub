import { useState, useCallback, useEffect } from 'react';
import { StoredSession, ChatEntry } from './types';
import { authService } from '../../../../services/authService';

function getStorageKey(): string {
    const user = authService.getStoredUser();
    const uid = user?.id ?? 'guest';
    return `icad_chatbot_history_${uid}`;
}

export const useChatSessions = (showModal: (title: string, message: string, type: 'confirm' | 'danger' | 'info') => void) => {
    const [sessions, setSessions] = useState<StoredSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

    // Load sessions from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(getStorageKey());
            if (stored) {
                const parsed: StoredSession[] = JSON.parse(stored);
                const limited = parsed.slice(0, 20);
                setSessions(limited);
                if (limited.length > 0) {
                    setActiveSessionId(limited[0].id);
                }
            }
        } catch {
            localStorage.removeItem(getStorageKey());
        }
    }, []);

    // LocalStorage quota handling with auto-pruning
    useEffect(() => {
        if (sessions.length > 0) {
            const prunedSessions = sessions.map(s => {
                if (s.id === activeSessionId) return s;
                return {
                    ...s,
                    messages: s.messages.map(m => ({ ...m, user_images: undefined }))
                };
            });

            try {
                localStorage.setItem(getStorageKey(), JSON.stringify(prunedSessions));
            } catch (e: any) {
                if (e.name === 'QuotaExceededError') {
                    const trimmed = prunedSessions.slice(0, 10);
                    try {
                        localStorage.setItem(getStorageKey(), JSON.stringify(trimmed));
                        setSessions(trimmed);
                        showModal('Storage Full', 'Older conversations were archived to save space.', 'info');
                    } catch {
                        localStorage.removeItem(getStorageKey());
                        setSessions([]);
                        setActiveSessionId(null);
                        showModal('Storage Critical', 'Chat history cleared to free space.', 'danger');
                    }
                }
            }
        } else {
            localStorage.removeItem(getStorageKey());
        }
    }, [sessions, activeSessionId, showModal]);

    const updateSessionMessages = useCallback((id: string, messages: ChatEntry[]) => {
        setSessions(prev => {
            const exists = prev.some(s => s.id === id);
            if (!exists) return prev;
            return prev.map(s => {
                if (s.id !== id) return s;
                return { ...s, messages };
            });
        });
    }, []);

    const deleteSession = useCallback((id: string) => {
        setSessions(prev => prev.filter(s => s.id !== id));
        if (activeSessionId === id) {
            setActiveSessionId(prev => {
                const remaining = sessions.filter(s => s.id !== id);
                return remaining.length > 0 ? remaining[0].id : null;
            });
        }
    }, [activeSessionId, sessions]);

    const clearAllSessions = useCallback(() => {
        setSessions([]);
        setActiveSessionId(null);
    }, []);

    return {
        sessions,
        setSessions,
        activeSessionId,
        setActiveSessionId,
        updateSessionMessages,
        deleteSession,
        clearAllSessions
    };
};
