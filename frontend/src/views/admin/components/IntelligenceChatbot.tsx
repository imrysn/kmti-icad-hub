import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { adminService } from '../../../services/adminService';
import { ConfirmationModal } from '../../../components/ConfirmationModal';
import { ImageLightbox, FilePreviewModal } from './Overlays';
import { feedbackService, ChatSource, ImagePayload } from '../../../services/searchService';

// Refactored Components
import { ChatSidebar } from './chatbot/ChatSidebar';
import { MessageList } from './chatbot/MessageList';
import { SourcesPanel } from './chatbot/SourcesPanel';
import { ChatInput } from './chatbot/ChatInput';

// Custom Hooks
import { useChatSessions } from './chatbot/useChatSessions';
import { useSpeech } from './chatbot/useSpeech';
import { useImagePaste } from './chatbot/useImagePaste';
import { useChatStream } from './chatbot/useChatStream';

// Types
import { ChatEntry, StoredSession, LightboxImage } from './chatbot/types';

import '../../../styles/IntelligenceChatbot.css';

export const IntelligenceChatbot: React.FC = () => {
    // State for common UI elements
    const [chatInput, setChatInput] = useState('');
    const [forcedLanguage, setForcedLanguage] = useState<'en-US' | 'ja-JP' | 'fil-PH'>('en-US');
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [liveMessage, setLiveMessage] = useState('');
    const [previewFile, setPreviewFile] = useState<string | null>(null);
    const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    // Modal State
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: 'confirm' | 'danger' | 'info';
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: () => { }
    });

    const showModal = useCallback((title: string, message: string, type: 'confirm' | 'danger' | 'info' = 'info', onConfirm?: () => void) => {
        setModalConfig({
            isOpen: true,
            title,
            message,
            type,
            onConfirm: onConfirm || (() => setModalConfig(prev => ({ ...prev, isOpen: false })))
        });
    }, []);

    const closeModal = useCallback(() => setModalConfig(prev => ({ ...prev, isOpen: false })), []);

    // Initialize Hooks
    const { sessions, setSessions, activeSessionId, setActiveSessionId, updateSessionMessages, deleteSession, clearAllSessions } = useChatSessions(showModal);
    const { currentlyReadingIdx, speakText } = useSpeech(forcedLanguage);
    const { selectedImages, setSelectedImages, handlePaste, removeSelectedImage } = useImagePaste(showModal);
    
    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            const chatMessages = document.querySelector('.chat-messages');
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }, 100);
    }, []);

    const { isThinking, latestSources, regeneratingIdx, handleStream, handleRegenerate, setLatestSources } = useChatStream({
        sessions,
        setSessions,
        forcedLanguage,
        scrollToBottom,
        setLiveMessage,
        showModal,
        updateSessionMessages
    });

    // Alert Override
    useEffect(() => {
        const originalAlert = window.alert;
        (window as any).alert = (msg?: string) => showModal('System Message', msg || '', 'info');
        return () => { window.alert = originalAlert; };
    }, [showModal]);

    // Focus Management
    useEffect(() => {
        if (!isThinking) {
            const timer = setTimeout(() => {
                const input = document.getElementById('chat-input');
                input?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isThinking]);

    // Helpers
    const copyToClipboard = useCallback((text: string, idx: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(null), 2000);
        });
    }, []);

    const openLightbox = useCallback((url: string, caption: string, source: string) => {
        setLightboxImages([{ url, caption, source }]);
        setLightboxIndex(0);
        setLightboxOpen(true);
    }, []);

    const openFile = useCallback((filename: string) => {
        setPreviewFile(filename);
    }, []);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const diff = target.scrollHeight - target.scrollTop - target.clientHeight;
        setShowScrollBtn(diff > 300);
    }, []);

    const activeSession = useMemo(() => sessions.find(s => s.id === activeSessionId) ?? null, [sessions, activeSessionId]);
    const chatHistory: ChatEntry[] = useMemo(() => activeSession?.messages ?? [], [activeSession]);

    // Handlers
    const createNewSession = useCallback(() => {
        const id = `session_${Date.now()}`;
        setSessions(prev => {
            const newSessions = [{ id, title: 'New Chat', messages: [], createdAt: new Date().toISOString() }, ...prev];
            return newSessions.slice(0, 20);
        });
        setActiveSessionId(id);
        setLatestSources([]);
        setChatInput('');
        setSelectedImages([]);
    }, [setActiveSessionId, setLatestSources, setSelectedImages, setSessions]);

    const handleClearAll = useCallback(() => {
        showModal(
            'Clear History',
            'Are you sure you want to clear all chat history? This cannot be undone.',
            'danger',
            () => {
                clearAllSessions();
                setLatestSources([]);
                closeModal();
            }
        );
    }, [showModal, clearAllSessions, closeModal, setLatestSources]);

    const handleBranch = useCallback((msgIdx: number) => {
        const session = sessions.find(s => s.id === activeSessionId);
        if (!session) return;

        const branchedMessages = session.messages.slice(0, msgIdx + 1).map(m => ({ ...m }));
        const id = `session_${Date.now()}`;
        const newSession: StoredSession = {
            id,
            title: `Branch from ${session.title}`,
            messages: branchedMessages,
            createdAt: new Date().toISOString()
        };

        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(id);

        const lastAssistant = [...branchedMessages].reverse().find(m => m.role === 'assistant');
        setLatestSources(lastAssistant?.sources ?? []);
    }, [sessions, activeSessionId, setActiveSessionId, setLatestSources, setSessions]);

    const handleRetry = useCallback((payload: any) => {
        const { trimmed, currentHistory, sessionId, imagesToSubmit } = payload;
        const filteredHistory = currentHistory.filter((m: ChatEntry) => !m.isError);
        updateSessionMessages(sessionId, filteredHistory);
        handleStream(trimmed, imagesToSubmit, sessionId, false, filteredHistory);
    }, [updateSessionMessages, handleStream]);

    const handleSuggestionClick = useCallback((suggestion: string) => {
        setChatInput(suggestion);
        setTimeout(() => handleSubmit(), 100);
    }, [setChatInput]);

    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = chatInput.trim();
        if (!trimmed && selectedImages.length === 0) return;
        if (isThinking) return;

        if (window.speechSynthesis) window.speechSynthesis.cancel();

        const targetSessionId = activeSessionId || `session_${Date.now()}`;
        const isNewSession = !activeSessionId;

        const userMsg: ChatEntry = {
            role: 'user',
            content: trimmed,
            user_images: selectedImages.length > 0 ? selectedImages.map(img => `data:${img.mime};base64,${img.data}`) : undefined
        };

        const assistantMsg: ChatEntry = {
            role: 'assistant',
            content: '',
            sources: [],
            log_id: null,
            feedback: null,
            suggestions: [],
            userPrompt: trimmed,
            userImages: [...selectedImages],
        };

        setSessions(prev => {
            if (isNewSession) {
                return [{ id: targetSessionId, title: trimmed.slice(0, 45), messages: [userMsg, assistantMsg], createdAt: new Date().toISOString() }, ...prev];
            } else {
                return prev.map(s => s.id === targetSessionId ? { ...s, messages: [...s.messages, userMsg, assistantMsg] } : s);
            }
        });

        if (isNewSession) setActiveSessionId(targetSessionId);

        const historyForStream = chatHistory;
        setChatInput('');
        const imagesToSubmit = [...selectedImages];
        setSelectedImages([]);

        handleStream(trimmed, imagesToSubmit, targetSessionId, isNewSession, [...historyForStream, userMsg]);
    }, [chatInput, selectedImages, isThinking, activeSessionId, chatHistory, handleStream, setActiveSessionId, setSelectedImages, setSessions]);

    const handleFeedback = useCallback(async (sessionId: string, msgIdx: number, rating: 'up' | 'down') => {
        const session = sessions.find(s => s.id === sessionId);
        if (!session) return;
        const msg = session.messages[msgIdx];
        if (!msg || msg.role !== 'assistant' || !msg.log_id) return;

        const newRating = msg.feedback === rating ? null : rating;
        const previousFeedback = msg.feedback;

        setSessions(prev => prev.map(s => {
            if (s.id !== sessionId) return s;
            const msgs = [...s.messages];
            msgs[msgIdx] = { ...msgs[msgIdx], feedback: newRating };
            return { ...s, messages: msgs };
        }));

        try {
            await feedbackService.submit(msg.log_id, newRating as 'up' | 'down' | null);
        } catch {
            setSessions(prev => prev.map(s => {
                if (s.id !== sessionId) return s;
                const msgs = [...s.messages];
                msgs[msgIdx] = { ...msgs[msgIdx], feedback: previousFeedback };
                return { ...s, messages: msgs };
            }));
        }
    }, [sessions, setSessions]);

    const switchSession = useCallback((id: string) => {
        setActiveSessionId(id);
        const session = sessions.find(s => s.id === id);
        const lastAssistant = session ? [...session.messages].reverse().find(m => m.role === 'assistant') : null;
        setLatestSources(lastAssistant?.sources ?? []);
    }, [sessions, setActiveSessionId, setLatestSources]);

    return (
        <div className="chatbot-layout">
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {liveMessage}
            </div>

            <ChatSidebar
                sessions={sessions}
                activeSessionId={activeSessionId}
                onNewChat={createNewSession}
                onSwitchSession={switchSession}
                onDeleteSession={(id, e) => { e.stopPropagation(); deleteSession(id); }}
                onClearAll={handleClearAll}
            />

            <div className="chatbot-main">
                <MessageList
                    chatHistory={chatHistory}
                    activeSessionId={activeSessionId}
                    currentlyReadingIdx={currentlyReadingIdx}
                    copiedIdx={copiedIdx}
                    regeneratingIdx={regeneratingIdx}
                    isThinking={isThinking}
                    showScrollBtn={showScrollBtn}
                    onScroll={handleScroll}
                    scrollToBottom={scrollToBottom}
                    onSpeak={speakText}
                    onCopy={copyToClipboard}
                    onFeedback={handleFeedback}
                    onOpenLightbox={openLightbox}
                    onRetry={handleRetry}
                    onRegenerate={handleRegenerate}
                    onBranch={handleBranch}
                    onSuggestionClick={handleSuggestionClick}
                />

                <SourcesPanel 
                    sources={latestSources} 
                    onOpenImage={openLightbox} 
                    onOpenFile={openFile} 
                />

                <ChatInput
                    input={chatInput}
                    setInput={setChatInput}
                    selectedImages={selectedImages}
                    removeImage={removeSelectedImage}
                    onPaste={handlePaste}
                    onSubmit={handleSubmit}
                    isThinking={isThinking}
                    forcedLanguage={forcedLanguage}
                    setForcedLanguage={setForcedLanguage}
                />
            </div>

            {lightboxOpen && (
                <ImageLightbox
                    images={lightboxImages}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}

            {previewFile && (
                <FilePreviewModal
                    filename={previewFile}
                    onClose={() => setPreviewFile(null)}
                    onDownload={(f) => adminService.downloadKBFile(f)}
                    onPreview={(f) => adminService.previewKBFile(f)}
                />
            )}

            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                confirmText={modalConfig.type === 'danger' ? 'Clear Everything' : 'Got it'}
                onConfirm={modalConfig.onConfirm}
                onCancel={closeModal}
            />
        </div>
    );
};
