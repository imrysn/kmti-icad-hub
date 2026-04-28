import { useState, useCallback } from 'react'; import { chatService, ImagePayload, ChatSource } from '../../../../services/searchService';
import { ChatEntry, StoredSession } from './types';

interface UseChatStreamProps {
    sessions: StoredSession[];
    setSessions: React.Dispatch<React.SetStateAction<StoredSession[]>>;
    scrollToBottom: () => void;
    setLiveMessage: (msg: string) => void;
    showModal: (title: string, message: string, type: 'confirm' | 'danger' | 'info') => void;
    updateSessionMessages: (id: string, messages: ChatEntry[]) => void;
    forcedLanguage: string;
}

export const useChatStream = ({
    sessions,
    setSessions,
    scrollToBottom,
    setLiveMessage,
    showModal,
    updateSessionMessages,
    forcedLanguage
}: UseChatStreamProps) => {
    const [isThinking, setIsThinking] = useState(false);
    const [latestSources, setLatestSources] = useState<ChatSource[]>([]);
    const [regeneratingIdx, setRegeneratingIdx] = useState<number | null>(null);

    const handleStream = useCallback(async (
        trimmed: string, 
        selectedImages: ImagePayload[], 
        targetSessionId: string, 
        isNew: boolean,
        history: ChatEntry[]
    ) => {
        const imagesToSubmit = [...selectedImages];
        setIsThinking(true);
        setLatestSources([]);
        scrollToBottom();
        setLiveMessage(`You: ${trimmed}`);

        try {
            await chatService.stream(
                {
                    message: trimmed,
                    history: history.map(m => ({ role: m.role, content: m.content })),
                    session_id: targetSessionId,
                    images: imagesToSubmit,
                    language: forcedLanguage
                },
                (chunk) => {
                    setSessions(prev => prev.map(s => {
                        if (s.id !== targetSessionId) return s;
                        const msgs = [...s.messages];
                        const last = msgs[msgs.length - 1];
                        if (last && last.role === 'assistant') {
                            const updatedLast = { ...last };
                            if (chunk.type === 'content') {
                                updatedLast.content += (chunk.delta || '');
                            } else if (chunk.type === 'end') {
                                updatedLast.sources = chunk.sources || [];
                                updatedLast.suggestions = chunk.suggestions || [];
                            } else if (chunk.type === 'metadata') {
                                updatedLast.log_id = chunk.log_id || null;
                            }
                            msgs[msgs.length - 1] = updatedLast;
                        }
                        return { ...s, messages: msgs };
                    }));

                    if (chunk.type === 'content') scrollToBottom();
                    if (chunk.type === 'end') setLatestSources(chunk.sources || []);
                }
            );

            // Auto-naming
            if (isNew) {
                try {
                    const aiTitle = await chatService.generateTitle(trimmed, [{ role: 'user', content: trimmed }]);
                    if (aiTitle) {
                        setSessions(prev => prev.map(s => s.id === targetSessionId ? { ...s, title: aiTitle } : s));
                    }
                } catch (e) {
                    console.error('Auto-naming failed:', e);
                }
            }
        } catch (error) {
            const errorMsg: ChatEntry = {
                role: 'assistant',
                content: 'Failed to connect to Intelligence Node. Please check your connection and try again.',
                isError: true,
                retryPayload: { trimmed, currentHistory: history, sessionId: targetSessionId, imagesToSubmit },
            };
            setSessions(prev => prev.map(s => {
                if (s.id !== targetSessionId) return s;
                const msgs = [...s.messages];
                if (msgs.length > 0 && msgs[msgs.length - 1].role === 'assistant') {
                    msgs[msgs.length - 1] = errorMsg;
                } else {
                    msgs.push(errorMsg);
                }
                return { ...s, messages: msgs };
            }));
            setLiveMessage('Error: Failed to get response');
        } finally {
            setIsThinking(false);
            scrollToBottom();
        }
    }, [forcedLanguage, scrollToBottom, setLiveMessage, setSessions]);

    const handleRegenerate = useCallback(async (sessionId: string, msgIdx: number) => {
        const session = sessions.find(s => s.id === sessionId);
        if (!session) return;

        const msg = session.messages[msgIdx];
        if (!msg || msg.role !== 'assistant' || !msg.userPrompt) return;

        setRegeneratingIdx(msgIdx);
        scrollToBottom();

        try {
            const historyBeforeMsg = session.messages.slice(0, msgIdx);
            const assistantMsg: ChatEntry = {
                role: 'assistant',
                content: '',
                sources: [],
                log_id: null,
                feedback: null,
                suggestions: [],
                userPrompt: msg.userPrompt,
                userImages: msg.userImages,
            };

            const updatedMessages = [...session.messages];
            updatedMessages[msgIdx] = assistantMsg;
            updateSessionMessages(sessionId, updatedMessages);

            await chatService.stream(
                {
                    message: msg.userPrompt,
                    history: historyBeforeMsg.map(m => ({ role: m.role, content: m.content })),
                    session_id: sessionId,
                    images: msg.userImages || [],
                    language: forcedLanguage,
                    is_regeneration: true
                },
                (chunk) => {
                    if (chunk.type === 'content') {
                        assistantMsg.content += chunk.delta || '';
                        updateSessionMessages(sessionId, [...updatedMessages]);
                        scrollToBottom();
                    } else if (chunk.type === 'end') {
                        assistantMsg.sources = chunk.sources || [];
                        assistantMsg.suggestions = chunk.suggestions || [];
                        updateSessionMessages(sessionId, [...updatedMessages]);
                        setLatestSources(chunk.sources || []);
                    } else if (chunk.type === 'metadata') {
                        assistantMsg.log_id = chunk.log_id || null;
                        updateSessionMessages(sessionId, [...updatedMessages]);
                    }
                }
            );
            setLiveMessage(`Response regenerated.`);
        } catch (error) {
            showModal('Regeneration Failed', 'Failed to regenerate response. Please try again.', 'info');
        } finally {
            setRegeneratingIdx(null);
            scrollToBottom();
        }
    }, [sessions, forcedLanguage, scrollToBottom, updateSessionMessages, showModal, setLiveMessage]);

    return {
        isThinking,
        setIsThinking,
        latestSources,
        setLatestSources,
        regeneratingIdx,
        handleStream,
        handleRegenerate
    };
};
