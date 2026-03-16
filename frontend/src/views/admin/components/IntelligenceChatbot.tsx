import React, { useState, useEffect, useRef } from 'react';
import { Brain, RefreshCw, Search, MessageSquare, Trash2, ChevronDown, ChevronUp, FileSpreadsheet, ThumbsUp, ThumbsDown, Zap } from 'lucide-react';
import { chatService, feedbackService, ChatMessage, ChatSource, MediaAsset } from '../../../services/searchService';
import { adminService } from '../../../services/adminService';
import { authService } from '../../../services/authService';
import { ImageLightbox, LightboxImage, FilePreviewModal } from './Overlays';
import '../../../styles/IntelligenceChatbot.css';

// Storage key is namespaced per user so different accounts on the same
// browser never share or see each other's chat history.
function getStorageKey(): string {
    const user = authService.getStoredUser();
    const uid = user?.id ?? 'guest';
    return `icad_chatbot_history_${uid}`;
}
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Extend ChatMessage to carry sources + feedback state for assistant turns
interface ChatEntry extends ChatMessage {
    sources?: ChatSource[];
    log_id?: number | null;
    feedback?: 'up' | 'down' | null;
    cached?: boolean;
}

interface StoredSession {
    id: string;
    title: string;
    messages: ChatEntry[];
    createdAt: string;
}

// Collects all media from sources that have images
function collectMedia(sources: ChatSource[]): { asset: MediaAsset; source: string }[] {
    const out: { asset: MediaAsset; source: string }[] = [];
    for (const src of sources) {
        if (src.media) {
            for (const asset of src.media) {
                if (asset.media_type === 'image') {
                    out.push({ asset, source: src.source });
                }
            }
        }
    }
    return out;
}

// Single image card — clicking opens the lightbox
const MediaCard: React.FC<{
    asset: MediaAsset;
    source: string;
    onOpen: (url: string, caption: string, source: string) => void;
}> = ({ asset, source, onOpen }) => {
    const url = `${API_BASE}/src/${asset.media_url}`;
    return (
        <div className="bubble-media-card" onClick={() => onOpen(url, asset.description || '', source)}>
            <img
                src={url}
                alt={asset.description || 'Reference image'}
                className="bubble-media-img"
                loading="lazy"
                title="Click to open"
            />
            {asset.description && (
                <p className="bubble-media-caption">{asset.description}</p>
            )}
            <span className="bubble-media-source">{source}</span>
        </div>
    );
};

// Sources accordion
const SourcesPanel: React.FC<{
    sources: ChatSource[];
    onOpenImage: (url: string, caption: string, source: string) => void;
    onOpenFile: (filename: string) => void;
}> = ({ sources, onOpenImage, onOpenFile }) => {
    const [open, setOpen] = useState(false);
    if (sources.length === 0) return null;

    // Unique filenames across all sources
    const uniqueFiles = [...new Set(sources.map(s => s.source).filter(s =>
        s.toLowerCase().endsWith('.csv') || s.toLowerCase().endsWith('.xlsx')
    ))];

    return (
        <div className="chat-sources">
            <div className="sources-header-row">
                <button className="sources-toggle" onClick={() => setOpen(o => !o)}>
                    <Search size={12} />
                    <span>Sources ({sources.length})</span>
                    {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                {uniqueFiles.length > 0 && (
                    <div className="sources-file-btns">
                        {uniqueFiles.map(f => (
                            <button key={f} className="source-file-btn" onClick={() => onOpenFile(f)} title={`Open ${f}`}>
                                <FileSpreadsheet size={12} />
                                <span>{f}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {open && (
                <div className="sources-expanded">
                    {sources.map((src, idx) => {
                        const score = src.score !== null ? Math.max(0, src.score) : null;
                        const images = src.media?.filter(m => m.media_type === 'image') ?? [];
                        return (
                            <div key={idx} className="source-row">
                                <div className="source-row-header">
                                    <span className="source-name">{src.source}</span>
                                    {score !== null && (
                                        <span className="source-score">{(score * 100).toFixed(0)}%</span>
                                    )}
                                </div>
                                <p className="source-content-preview">{src.content.slice(0, 160)}{src.content.length > 160 ? '…' : ''}</p>
                                {images.length > 0 && (
                                    <div className="source-images">
                                        {images.map((img, iIdx) => (
                                            <MediaCard key={iIdx} asset={img} source={src.source} onOpen={onOpenImage} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export const IntelligenceChatbot: React.FC = () => {
    const [sessions, setSessions] = useState<StoredSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [chatInput, setChatInput] = useState('');
    const [latestSources, setLatestSources] = useState<ChatSource[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Lightbox state
    const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // File preview state
    const [previewFile, setPreviewFile] = useState<string | null>(null);

    const openLightbox = (url: string, caption: string, source: string) => {
        setLightboxImages([{ url, caption, source }]);
        setLightboxIndex(0);
        setLightboxOpen(true);
    };

    const openFile = (filename: string) => {
        setPreviewFile(filename);
    };

    // Load sessions from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(getStorageKey());
            if (stored) {
                const parsed: StoredSession[] = JSON.parse(stored);
                setSessions(parsed);
                if (parsed.length > 0) {
                    setActiveSessionId(parsed[0].id);
                    // Restore sources from last assistant message of the active session
                    const lastAssistant = [...parsed[0].messages].reverse().find(m => m.role === 'assistant');
                    if (lastAssistant?.sources) setLatestSources(lastAssistant.sources);
                }
            }
        } catch {
            localStorage.removeItem(getStorageKey());
        }
    }, []);

    // Persist on every session change
    useEffect(() => {
        if (sessions.length > 0) {
            localStorage.setItem(getStorageKey(), JSON.stringify(sessions));
        } else {
            localStorage.removeItem(getStorageKey());
        }
    }, [sessions]);

    const activeSession = sessions.find(s => s.id === activeSessionId) ?? null;
    const chatHistory: ChatEntry[] = activeSession?.messages ?? [];

    const scrollToBottom = () => {
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
    };

    const createNewSession = () => {
        const id = `session_${Date.now()}`;
        setSessions(prev => [{ id, title: 'New Chat', messages: [], createdAt: new Date().toISOString() }, ...prev]);
        setActiveSessionId(id);
        setLatestSources([]);
        setChatInput('');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const deleteSession = (id: string) => {
        setSessions(prev => prev.filter(s => s.id !== id));
        if (activeSessionId === id) {
            const remaining = sessions.filter(s => s.id !== id);
            setActiveSessionId(remaining.length > 0 ? remaining[0].id : null);
            setLatestSources([]);
        }
    };

    const updateSessionMessages = (id: string, messages: ChatEntry[]) => {
        setSessions(prev => prev.map(s => {
            if (s.id !== id) return s;
            const title = messages.find(m => m.role === 'user')?.content.slice(0, 45) || 'New Chat';
            return { ...s, messages, title };
        }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = chatInput.trim();
        if (!trimmed || isThinking) return;

        let sessionId = activeSessionId;
        if (!sessionId) {
            const id = `session_${Date.now()}`;
            setSessions(prev => [{ id, title: trimmed.slice(0, 45), messages: [], createdAt: new Date().toISOString() }, ...prev]);
            setActiveSessionId(id);
            sessionId = id;
        }

        const userMsg: ChatEntry = { role: 'user', content: trimmed };
        const currentHistory = sessions.find(s => s.id === sessionId)?.messages ?? [];
        const updatedHistory = [...currentHistory, userMsg];

        updateSessionMessages(sessionId, updatedHistory);
        setChatInput('');
        setIsThinking(true);
        setLatestSources([]);
        scrollToBottom();

        try {
            const response = await chatService.send(trimmed, currentHistory.map(m => ({ role: m.role, content: m.content })));
            const assistantMsg: ChatEntry = {
                role: 'assistant',
                content: response.answer,
                sources: response.sources,
                log_id: response.log_id ?? null,
                feedback: null,
                cached: response.cached ?? false,
            };
            updateSessionMessages(sessionId, [...updatedHistory, assistantMsg]);
            setLatestSources(response.sources);
        } catch {
            updateSessionMessages(sessionId, [...updatedHistory, {
                role: 'assistant',
                content: 'Intelligence Node failed to respond. Check backend connection.',
            }]);
        } finally {
            setIsThinking(false);
            scrollToBottom();
        }
    };

    const handleFeedback = async (sessionId: string, msgIdx: number, rating: 'up' | 'down') => {
        const session = sessions.find(s => s.id === sessionId);
        if (!session) return;
        const msg = session.messages[msgIdx];
        if (!msg || msg.role !== 'assistant' || !msg.log_id) return;

        // Toggle off if same rating clicked again
        const newRating = msg.feedback === rating ? null : rating;

        // Optimistic UI update
        setSessions(prev => prev.map(s => {
            if (s.id !== sessionId) return s;
            const msgs = [...s.messages];
            msgs[msgIdx] = { ...msgs[msgIdx], feedback: newRating };
            return { ...s, messages: msgs };
        }));

        try {
            if (newRating) {
                await feedbackService.submit(msg.log_id, newRating);
            }
        } catch {
            // Revert on error
            setSessions(prev => prev.map(s => {
                if (s.id !== sessionId) return s;
                const msgs = [...s.messages];
                msgs[msgIdx] = { ...msgs[msgIdx], feedback: msg.feedback };
                return { ...s, messages: msgs };
            }));
        }
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    // Switch session and restore its latest sources
    const switchSession = (id: string) => {
        setActiveSessionId(id);
        const session = sessions.find(s => s.id === id);
        const lastAssistant = session ? [...session.messages].reverse().find(m => m.role === 'assistant') : null;
        setLatestSources(lastAssistant?.sources ?? []);
    };

    return (
        <div className="chatbot-layout">
            {/* Sidebar */}
            <aside className="chatbot-sidebar">
                <button className="new-chat-btn" onClick={createNewSession}>
                    <MessageSquare size={15} />
                    New Chat
                </button>
                <p className="chatbot-sidebar-label">Recent Chats</p>
                <div className="sessions-list">
                    {sessions.length === 0 && <p className="no-sessions">No conversations yet</p>}
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            className={`session-item ${activeSessionId === session.id ? 'active' : ''}`}
                            onClick={() => switchSession(session.id)}
                        >
                            <div className="session-info">
                                <span className="session-title">{session.title}</span>
                                <span className="session-date">{formatDate(session.createdAt)}</span>
                            </div>
                            <button
                                className="session-delete"
                                onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                                title="Delete conversation"
                            >
                                <Trash2 size={13} />
                            </button>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main chat */}
            <div className="chatbot-main">
                <div className="chat-messages">
                    {chatHistory.length === 0 && (
                        <div className="chat-empty-state">
                            <Brain size={44} />
                            <p>Intelligence Chatbot</p>
                            <span>Answers are grounded in indexed iCAD documents</span>
                            <div className="suggested-prompts">
                                {[
                                    'What are the code colors used in iCAD?',
                                    'Explain 3D modeling operations',
                                    'What is orthographic projection?',
                                ].map((prompt, i) => (
                                    <button key={i} className="prompt-chip"
                                        onClick={() => { setChatInput(prompt); inputRef.current?.focus(); }}>
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {chatHistory.map((msg, idx) => {
                        const media = msg.role === 'assistant' && msg.sources
                            ? collectMedia(msg.sources)
                            : [];
                        return (
                            <div key={idx} className={`chat-bubble ${msg.role}`}>
                                {msg.role === 'assistant' && (
                                    <div className="bubble-avatar"><Brain size={14} /></div>
                                )}
                                <div className="bubble-content">
                                    {/* Cache indicator */}
                                    {msg.role === 'assistant' && msg.cached && (
                                        <div className="bubble-cached-badge">
                                            <Zap size={10} /> Cached response
                                        </div>
                                    )}
                                    <p>{msg.content}</p>
                                    {media.length > 0 && (
                                        <div className="bubble-media-grid">
                                            {media.map((m, mIdx) => (
                                                <MediaCard key={mIdx} asset={m.asset} source={m.source} onOpen={openLightbox} />
                                            ))}
                                        </div>
                                    )}
                                    {/* Feedback buttons — always visible on assistant messages */}
                                    {msg.role === 'assistant' && (
                                        <div className="bubble-feedback">
                                            <button
                                                className={`feedback-btn ${msg.feedback === 'up' ? 'active-up' : ''}`}
                                                onClick={() => activeSessionId && handleFeedback(activeSessionId, idx, 'up')}
                                                title={msg.log_id ? 'Helpful' : 'Helpful (not logged)'}
                                                disabled={!msg.log_id && msg.feedback !== 'up'}
                                            >
                                                <ThumbsUp size={13} />
                                            </button>
                                            <button
                                                className={`feedback-btn ${msg.feedback === 'down' ? 'active-down' : ''}`}
                                                onClick={() => activeSessionId && handleFeedback(activeSessionId, idx, 'down')}
                                                title={msg.log_id ? 'Not helpful' : 'Not helpful (not logged)'}
                                                disabled={!msg.log_id && msg.feedback !== 'down'}
                                            >
                                                <ThumbsDown size={13} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {isThinking && (
                        <div className="chat-bubble assistant">
                            <div className="bubble-avatar"><Brain size={14} /></div>
                            <div className="bubble-content thinking">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Sources accordion */}
                <SourcesPanel sources={latestSources} onOpenImage={openLightbox} onOpenFile={openFile} />

                {/* Input */}
                <div className="chat-input-row">
                    <form className="chat-input-box" onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            className="chat-input"
                            placeholder="Ask the Intelligence Node..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            disabled={isThinking}
                            autoFocus
                        />
                        <button className="chat-send-btn" type="submit"
                            disabled={isThinking || !chatInput.trim()}>
                            {isThinking
                                ? <RefreshCw size={15} className="spinning" />
                                : <MessageSquare size={15} />
                            }
                        </button>
                    </form>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <ImageLightbox
                    images={lightboxImages}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}

            {/* File preview */}
            {previewFile && (
                <FilePreviewModal
                    filename={previewFile}
                    onClose={() => setPreviewFile(null)}
                    onDownload={(f) => adminService.downloadKBFile(f)}
                    onPreview={(f) => adminService.previewKBFile(f)}
                />
            )}
        </div>
    );
};
