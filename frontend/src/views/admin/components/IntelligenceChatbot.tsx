import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Brain, RefreshCw, Search, MessageSquare, Trash2, ChevronDown, ChevronUp, FileSpreadsheet, ThumbsUp, ThumbsDown, Zap, FileText, Video, Image as ImageIcon, ExternalLink, XCircle, Mic, Volume2, VolumeX, Copy, Check, ArrowDown, Sparkles, GitBranch } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatService, feedbackService, ChatMessage, ChatSource, MediaAsset, ImagePayload } from '../../../services/searchService';
import { adminService } from '../../../services/adminService';
import { authService } from '../../../services/authService';
import { ConfirmationModal } from '../../../components/ConfirmationModal';
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
    feedback?: 'up' | null | 'down';
    cached?: boolean;
    user_images?: string[];
    // PHASE 2 FIX #2: Retry support
    isError?: boolean;
    retryPayload?: {
        trimmed: string;
        currentHistory: ChatEntry[];
        sessionId: string;
        imagesToSubmit: ImagePayload[];
    };
    // PHASE 3 FEATURE #3: Smart suggestions
    suggestions?: string[];
    // PHASE 3 FEATURE #1: Message regeneration - store user prompt
    userPrompt?: string;
    userImages?: ImagePayload[];
}

interface StoredSession {
    id: string;
    title: string;
    messages: ChatEntry[];
    createdAt: string;
}

// Collects media ONLY from sources that are actually cited in the content string
function collectMedia(sources: ChatSource[], content: string): { asset: MediaAsset; source: string }[] {
    const out: { asset: MediaAsset; source: string }[] = [];
    
    // Extract cited indices: Look for [1], [2], etc.
    const citationMatches = Array.from(content.matchAll(/\[(\d+)\]/g));
    const citedIndices = new Set(citationMatches.map(m => parseInt(m[1]) - 1));

    sources.forEach((src, idx) => {
        // Only include media if this source index was cited in the text
        if (citedIndices.has(idx) && src.media) {
            for (const asset of src.media) {
                if (asset.media_type === 'image') {
                    out.push({ asset, source: src.source });
                }
            }
        }
    });
    return out;
}

// Single image card — clicking opens the lightbox
const MediaCard: React.FC<{
    asset: MediaAsset;
    source: string;
    onOpen: (url: string, caption: string, source: string) => void;
}> = React.memo(({ asset, source, onOpen }) => {
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
});

MediaCard.displayName = 'MediaCard';

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
                <button className="sources-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Toggle sources visibility">
                    <Search size={12} />
                    <span>Sources ({sources.length})</span>
                    {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                {uniqueFiles.length > 0 && (
                    <div className="sources-file-btns">
                        {uniqueFiles.map(f => (
                            <button key={f} className="source-file-btn" onClick={() => onOpenFile(f)} title={`Open ${f}`} aria-label={`Open file ${f}`}>
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
                        const videos = src.media?.filter(m => m.media_type === 'video') ?? [];

                        return (
                            <div key={idx} className="source-row">
                                <div className="source-row-header">
                                    <span className="source-name">
                                        {src.source.toLowerCase().endsWith('.xlsx') || src.source.toLowerCase().endsWith('.csv')
                                            ? <FileSpreadsheet size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                            : <FileText size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                        }
                                        {src.source}
                                    </span>
                                    {score !== null && (
                                        <span className="source-score">{(score * 100).toFixed(0)}% Match</span>
                                    )}
                                </div>
                                <p className="source-content-preview">{src.content.slice(0, 200)}{src.content.length > 200 ? '…' : ''}</p>

                                {(images.length > 0 || videos.length > 0) && (
                                    <div className="source-media-badges">
                                        {images.length > 0 && (
                                            <span className="media-badge image">
                                                <ImageIcon size={10} /> {images.length} Image{images.length > 1 ? 's' : ''}
                                            </span>
                                        )}
                                        {videos.length > 0 && (
                                            <span className="media-badge video">
                                                <Video size={10} /> {videos.length} Video{videos.length > 1 ? 's' : ''}
                                            </span>
                                        )}
                                    </div>
                                )}

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

// PHASE 2 FIX #1: Memoized MessageBubble component
const MessageBubble: React.FC<{
    msg: ChatEntry;
    idx: number;
    sessionId: string | null;
    currentlyReadingIdx: number | null;
    copiedIdx: number | null;
    regeneratingIdx: number | null;
    onSpeak: (text: string, idx: number) => void;
    onCopy: (text: string, idx: number) => void;
    onFeedback: (sessionId: string, msgIdx: number, rating: 'up' | 'down') => void;
    onOpenLightbox: (url: string, caption: string, source: string) => void;
    onRetry?: (payload: any) => void;
    onRegenerate?: (sessionId: string, msgIdx: number) => void;
    onBranch?: (msgIdx: number) => void;
    onSuggestionClick?: (suggestion: string) => void;
}> = React.memo(({ msg, idx, sessionId, currentlyReadingIdx, copiedIdx, regeneratingIdx, onSpeak, onCopy, onFeedback, onOpenLightbox, onRetry, onRegenerate, onBranch, onSuggestionClick }) => {
    const media = msg.role === 'assistant' && msg.sources ? collectMedia(msg.sources, msg.content) : [];
    const isRegenerating = regeneratingIdx === idx;

    // Show a skeleton or just the avatar while waiting for first tokens
    const isEmptyAssistant = msg.role === 'assistant' && !msg.content && !isRegenerating && !msg.isError;

    // Citations Parser: Convert [1], [2] to superscripts
    const renderContent = (content: any) => {
        if (typeof content !== 'string') return content;
        const parts = content.split(/(\[\d+\])/g);
        return parts.map((part, i) => {
            const match = part.match(/^\[(\d+)\]$/);
            if (match) {
                const sourceIdx = parseInt(match[1]) - 1;
                const source = msg.sources?.[sourceIdx];
                return (
                    <sup
                        key={i}
                        className="citation-marker"
                        title={source ? `Source: ${source.source}` : 'Reference'}
                    >
                        {match[1]}
                    </sup>
                );
            }
            return part;
        });
    };

    return (
        <div className={`chat-bubble ${msg.role}`}>
            {msg.role === 'assistant' && (
                <div className="bubble-avatar" aria-hidden="true"><Brain size={14} /></div>
            )}
            <div className="bubble-content">
                {/* Cache indicator */}
                {msg.role === 'assistant' && msg.cached && !isRegenerating && (
                    <div className="bubble-cached-badge">
                        <Zap size={10} /> Cached response
                    </div>
                )}

                {/* Regenerating indicator */}
                {isRegenerating && (
                    <div className="bubble-regenerating-badge">
                        <RefreshCw size={10} className="spinning" /> Regenerating...
                    </div>
                )}

                {!isRegenerating && (
                    <>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // Use code component for citations or just post-process the text
                                p: ({ children }) => <p>{renderContent(children as any)}</p>
                            }}
                        >
                            {msg.content}
                        </ReactMarkdown>
                        {isEmptyAssistant && (
                            <div className="bubble-content thinking inline" aria-label="Assistant is typing">
                                <span></span><span></span><span></span>
                            </div>
                        )}

                        {/* PHASE 2 FIX #2: Retry button for error messages */}
                        {msg.isError && msg.retryPayload && onRetry && (
                            <button
                                className="retry-btn"
                                onClick={() => onRetry(msg.retryPayload)}
                                aria-label="Retry failed request"
                            >
                                <RefreshCw size={14} /> Retry
                            </button>
                        )}

                        {msg.user_images && msg.user_images.length > 0 && (
                            <div className="user-uploaded-images-grid">
                                {msg.user_images.map((img, i) => (
                                    <div
                                        key={i}
                                        className="user-uploaded-image"
                                        onClick={() => onOpenLightbox(img, `Attachment ${i + 1}`, 'User')}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`View attachment ${i + 1}`}
                                    >
                                        <img src={img} alt={`User upload ${i + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                        {media.length > 0 && (
                            <div className="bubble-media-grid">
                                {media.map((m, mIdx) => (
                                    <MediaCard key={mIdx} asset={m.asset} source={m.source} onOpen={onOpenLightbox} />
                                ))}
                            </div>
                        )}

                        {/* PHASE 3 FEATURE #3: Smart suggestions */}
                        {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && onSuggestionClick && (
                            <div className="suggestions-container">
                                <div className="suggestions-label">
                                    <Sparkles size={11} />
                                    <span>Continue the conversation:</span>
                                </div>
                                <div className="suggestions-grid">
                                    {msg.suggestions.map((suggestion, sIdx) => (
                                        <button
                                            key={sIdx}
                                            className="suggestion-chip"
                                            onClick={() => onSuggestionClick(suggestion)}
                                            aria-label={`Ask: ${suggestion}`}
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Feedback buttons — only visible on assistant messages with content */}
                        {msg.role === 'assistant' && !msg.isError && msg.content.trim() !== '' && (
                            <div className="bubble-feedback">
                                {/* PHASE 3 FEATURE #1: Regenerate button */}
                                {msg.userPrompt && onRegenerate && sessionId && (
                                    <button
                                        className="feedback-btn regenerate-btn"
                                        onClick={() => onRegenerate(sessionId, idx)}
                                        aria-label="Regenerate response"
                                        title="Try again with a different response"
                                    >
                                        <RefreshCw size={13} />
                                    </button>
                                )}
                                {onBranch && (
                                    <button
                                        className="feedback-btn branch-btn"
                                        onClick={() => onBranch(idx)}
                                        aria-label="Branch conversation"
                                        title="Start a new chat from this point"
                                    >
                                        <GitBranch size={13} />
                                    </button>
                                )}
                                <button
                                    className={`feedback-btn speak-btn ${currentlyReadingIdx === idx ? 'speaking' : ''}`}
                                    onClick={() => onSpeak(msg.content, idx)}
                                    aria-label={currentlyReadingIdx === idx ? 'Stop reading aloud' : 'Read aloud'}
                                    aria-pressed={currentlyReadingIdx === idx}
                                >
                                    {currentlyReadingIdx === idx ? <VolumeX size={13} /> : <Volume2 size={13} />}
                                </button>
                                <button
                                    className={`feedback-btn copy-btn ${copiedIdx === idx ? 'copied' : ''}`}
                                    onClick={() => onCopy(msg.content, idx)}
                                    aria-label="Copy to clipboard"
                                >
                                    {copiedIdx === idx ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                                </button>
                                <button
                                    className={`feedback-btn ${msg.feedback === 'up' ? 'active-up' : ''}`}
                                    onClick={() => sessionId && onFeedback(sessionId, idx, 'up')}
                                    aria-label={msg.log_id ? 'Mark as helpful' : 'Mark as helpful (not logged)'}
                                    disabled={!msg.log_id && msg.feedback !== 'up'}
                                >
                                    <ThumbsUp size={13} />
                                </button>
                                <button
                                    className={`feedback-btn ${msg.feedback === 'down' ? 'active-down' : ''}`}
                                    onClick={() => sessionId && onFeedback(sessionId, idx, 'down')}
                                    aria-label={msg.log_id ? 'Mark as not helpful' : 'Mark as not helpful (not logged)'}
                                    disabled={!msg.log_id && msg.feedback !== 'down'}
                                >
                                    <ThumbsDown size={13} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    // Only re-render if these specific props change
    return (
        prevProps.msg.content === nextProps.msg.content &&
        prevProps.msg.feedback === nextProps.msg.feedback &&
        prevProps.currentlyReadingIdx === nextProps.currentlyReadingIdx &&
        prevProps.copiedIdx === nextProps.copiedIdx &&
        prevProps.msg.cached === nextProps.msg.cached &&
        prevProps.msg.isError === nextProps.msg.isError &&
        prevProps.regeneratingIdx === nextProps.regeneratingIdx &&
        JSON.stringify(prevProps.msg.suggestions) === JSON.stringify(nextProps.msg.suggestions)
    );
});

MessageBubble.displayName = 'MessageBubble';

export const IntelligenceChatbot: React.FC = () => {
    const [sessions, setSessions] = useState<StoredSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [chatInput, setChatInput] = useState('');
    const [latestSources, setLatestSources] = useState<ChatSource[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Image Paste State
    const [selectedImages, setSelectedImages] = useState<ImagePayload[]>([]);

    // Voice & Language State
    const [forcedLanguage, setForcedLanguage] = useState<'en-US' | 'ja-JP' | 'fil-PH'>('en-US');
    const [currentlyReadingIdx, setCurrentlyReadingIdx] = useState<number | null>(null);
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    // PHASE 2 FIX #4: Live region for screen reader announcements
    const [liveMessage, setLiveMessage] = useState('');

    // PHASE 3 FEATURE #1: Regeneration state
    const [regeneratingIdx, setRegeneratingIdx] = useState<number | null>(null);

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

    // PHASE 1 FIX #4: Fixed modal dependency array and removed broken window.confirm override
    useEffect(() => {
        const originalAlert = window.alert;

        (window as any).alert = (msg?: string) => showModal('System Message', msg || '', 'info');

        return () => {
            window.alert = originalAlert;
        };
    }, [showModal]);

    // Helper to find the best Asian voice for the current language
    const getAsianVoice = useCallback((lang: string): SpeechSynthesisVoice | null => {
        if (!window.speechSynthesis) return null;
        const voices = window.speechSynthesis.getVoices();

        // Priority maps for Asian-localed voices
        const priorities: Record<string, string[]> = {
            'en-US': ['en-PH', 'en-SG', 'en-MY', 'en-JP', 'en-HK', 'en-IN'],
            'ja-JP': ['ja-JP'],
            'fil-PH': ['fil-PH', 'en-PH']
        };

        const searchLangs = priorities[lang] || [lang];

        for (const target of searchLangs) {
            const found = voices.find(v => v.lang.toLowerCase().includes(target.toLowerCase()));
            if (found) return found;
        }

        // Fallback to exact lang match
        return voices.find(v => v.lang.toLowerCase().includes(lang.toLowerCase())) || null;
    }, []);

    // PHASE 1 FIX #1: Fixed race condition in speech synthesis with timeout
    const speakText = useCallback((text: string, idx: number) => {
        if (!window.speechSynthesis) return;

        // If clicking the same message that is currently playing, stop it
        if (currentlyReadingIdx === idx) {
            window.speechSynthesis.cancel();
            setCurrentlyReadingIdx(null);
            return;
        }

        // Cancel previous utterance
        window.speechSynthesis.cancel();

        // Add small delay to ensure cancel completes before starting new speech
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);

            // Set voice and lang
            const voice = getAsianVoice(forcedLanguage);
            if (voice) {
                utterance.voice = voice;
            }
            utterance.lang = forcedLanguage;

            // State handlers
            utterance.onstart = () => setCurrentlyReadingIdx(idx);
            utterance.onend = () => setCurrentlyReadingIdx(null);
            utterance.onerror = () => setCurrentlyReadingIdx(null);

            window.speechSynthesis.speak(utterance);
        }, 50);
    }, [currentlyReadingIdx, forcedLanguage, getAsianVoice]);

    const copyToClipboard = useCallback((text: string, idx: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(null), 2000);
        });
    }, []);

    // Lightbox state
    const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // File preview state
    const [previewFile, setPreviewFile] = useState<string | null>(null);

    const openLightbox = useCallback((url: string, caption: string, source: string) => {
        setLightboxImages([{ url, caption, source }]);
        setLightboxIndex(0);
        setLightboxOpen(true);
    }, []);

    const openFile = useCallback((filename: string) => {
        setPreviewFile(filename);
    }, []);

    // Load sessions from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(getStorageKey());
            if (stored) {
                const parsed: StoredSession[] = JSON.parse(stored);
                // Ensure session limit (20) - oldest sessions are at the end of the array
                const limited = parsed.slice(0, 20);
                setSessions(limited);
                if (limited.length > 0) {
                    setActiveSessionId(limited[0].id);
                    // Restore sources from last assistant message of the active session
                    const lastAssistant = [...limited[0].messages].reverse().find(m => m.role === 'assistant');
                    if (lastAssistant?.sources) setLatestSources(lastAssistant.sources);
                }
            }
        } catch {
            localStorage.removeItem(getStorageKey());
        }
    }, []);

    // PHASE 1 FIX #3: Added localStorage quota handling with auto-pruning
    useEffect(() => {
        if (sessions.length > 0) {
            // Storage Pruning: Strip heavy user_images from sessions other than the active one 
            // to keep localStorage under the 5MB limit.
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
                    // Auto-prune: keep only last 10 sessions
                    const trimmed = prunedSessions.slice(0, 10);
                    try {
                        localStorage.setItem(getStorageKey(), JSON.stringify(trimmed));
                        setSessions(trimmed); // Sync state
                        showModal('Storage Full', 'Older conversations were archived to save space.', 'info');
                    } catch {
                        // Last resort: clear everything
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

    // Restore focus after thinking ends
    useEffect(() => {
        if (!isThinking) {
            const timer = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(timer);
        }
    }, [isThinking]);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const diff = target.scrollHeight - target.scrollTop - target.clientHeight;
        setShowScrollBtn(diff > 300);
    }, []);

    const activeSession = useMemo(() => sessions.find(s => s.id === activeSessionId) ?? null, [sessions, activeSessionId]);
    const chatHistory: ChatEntry[] = useMemo(() => activeSession?.messages ?? [], [activeSession]);

    // PHASE 2 FIX #3: Debounced scroll function
    const scrollToBottom = useCallback(() => {
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, []);

    const createNewSession = useCallback(() => {
        const id = `session_${Date.now()}`;
        setSessions(prev => {
            const newSessions = [{ id, title: 'New Chat', messages: [], createdAt: new Date().toISOString() }, ...prev];
            return newSessions.slice(0, 20); // Maintain 20 limit
        });
        setActiveSessionId(id);
        setLatestSources([]);
        setChatInput('');
        setSelectedImages([]);
        setTimeout(() => inputRef.current?.focus(), 100);
    }, []);

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        let imagesFound = 0;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.includes('image')) {
                imagesFound++;
                if (selectedImages.length + imagesFound > 3) {
                    showModal('Limit Reached', 'You can only attach up to 3 images per prompt.', 'info');
                    return;
                }

                const file = item.getAsFile();
                if (!file) continue;

                if (file.size > 4 * 1024 * 1024) {
                    showModal('File Too Large', 'Each pasted image must be smaller than 4MB', 'info');
                    continue;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    const result = event.target?.result as string;
                    const parts = result.split(',');
                    const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
                    const data = parts[1];

                    setSelectedImages(prev => [...prev, { data, mime }]);
                };
                reader.readAsDataURL(file);
            }
        }
    }, [selectedImages.length, showModal]);

    const removeSelectedImage = useCallback((index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        inputRef.current?.focus();
    }, []);

    const clearAllSessions = useCallback(() => {
        showModal(
            'Clear History',
            'Are you sure you want to clear all chat history? This cannot be undone.',
            'danger',
            () => {
                setSessions([]);
                setActiveSessionId(null);
                setLatestSources([]);
                closeModal();
            }
        );
    }, [showModal, closeModal]);

    const deleteSession = useCallback((id: string) => {
        setSessions(prev => prev.filter(s => s.id !== id));
        if (activeSessionId === id) {
            const remaining = sessions.filter(s => s.id !== id);
            setActiveSessionId(remaining.length > 0 ? remaining[0].id : null);
            setLatestSources([]);
        }
    }, [activeSessionId, sessions]);

    const updateSessionMessages = useCallback((id: string, messages: ChatEntry[]) => {
        setSessions(prev => {
            const exists = prev.some(s => s.id === id);
            if (!exists) return prev; // Avoid updating if session was deleted mid-stream
            return prev.map(s => {
                if (s.id !== id) return s;
                return { ...s, messages };
            });
        });
    }, []);

    const handleBranch = useCallback((msgIdx: number) => {
        const session = sessions.find(s => s.id === activeSessionId);
        if (!session) return;

        const branchedMessages = session.messages.slice(0, msgIdx + 1).map(m => ({
            ...m
        }));

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
    }, [sessions, activeSessionId]);

    // PHASE 2 FIX #2: Retry handler
    const handleRetry = useCallback(async (payload: any) => {
        const { trimmed, currentHistory, sessionId, imagesToSubmit } = payload;

        // Remove the error message
        const filteredHistory = currentHistory.filter((m: ChatEntry) => !m.isError);
        updateSessionMessages(sessionId, filteredHistory);

        setIsThinking(true);
        setLatestSources([]);
        scrollToBottom();

        try {
            const response = await chatService.send(
                trimmed,
                filteredHistory.map((m: ChatEntry) => ({ role: m.role, content: m.content })),
                sessionId,
                imagesToSubmit,
                forcedLanguage
            );
            const assistantMsg: ChatEntry = {
                role: 'assistant',
                content: response.answer,
                sources: response.sources,
                log_id: response.log_id ?? null,
                feedback: null,
                cached: response.cached ?? false,
                suggestions: response.suggestions,
                userPrompt: trimmed,
                userImages: imagesToSubmit,
            };
            updateSessionMessages(sessionId, [...filteredHistory, assistantMsg]);
            setLatestSources(response.sources);
            setLiveMessage(`Assistant responded: ${response.answer.slice(0, 100)}...`);
        } catch (error) {
            const errorMsg: ChatEntry = {
                role: 'assistant',
                content: 'Failed to connect to Intelligence Node. Please check your connection and try again.',
                isError: true,
                retryPayload: payload,
            };
            updateSessionMessages(sessionId, [...filteredHistory, errorMsg]);
            setLiveMessage('Error: Failed to get response');
        } finally {
            setIsThinking(false);
            scrollToBottom();
        }
    }, [forcedLanguage, scrollToBottom, updateSessionMessages]);

    // PHASE 3 FEATURE #1: Message regeneration handler
    const handleRegenerate = useCallback(async (sessionId: string, msgIdx: number) => {
        const session = sessions.find(s => s.id === sessionId);
        if (!session) return;

        const msg = session.messages[msgIdx];
        if (!msg || msg.role !== 'assistant' || !msg.userPrompt) return;

        setRegeneratingIdx(msgIdx);
        scrollToBottom();

        try {
            // Get history up to but not including this message
            const historyBeforeMsg = session.messages.slice(0, msgIdx);

            // Prepare a fresh assistant message for streaming
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
    }, [sessions, forcedLanguage, scrollToBottom, updateSessionMessages, showModal]);

    // PHASE 3 FEATURE #3: Suggestion click handler
    const handleSuggestionClick = useCallback((suggestion: string) => {
        setChatInput(suggestion);
        inputRef.current?.focus();
        // Auto-submit after a brief delay
        setTimeout(() => {
            handleSubmit();
        }, 100);
    }, []);

    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = chatInput.trim();
        if (!trimmed && selectedImages.length === 0) return;
        if (isThinking) return;

        if (window.speechSynthesis) window.speechSynthesis.cancel();
        setCurrentlyReadingIdx(null);

        // 1. Determine or create session ID upfront
        const targetSessionId = activeSessionId || `session_${Date.now()}`;
        const isNewSession = !activeSessionId;

        // 2. Prepare user and placeholder assistant messages
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

        // 3. Atomically update sessions state
        setSessions(prev => {
            if (isNewSession) {
                const newSession: StoredSession = {
                    id: targetSessionId,
                    title: trimmed.slice(0, 45),
                    messages: [userMsg, assistantMsg],
                    createdAt: new Date().toISOString()
                };
                return [newSession, ...prev];
            } else {
                return prev.map(s => {
                    if (s.id !== targetSessionId) return s;
                    return { ...s, messages: [...s.messages, userMsg, assistantMsg] };
                });
            }
        });

        if (isNewSession) setActiveSessionId(targetSessionId);

        // 4. Reset input and start thinking
        setChatInput('');
        const imagesToSubmit = [...selectedImages];
        const historyForStream = sessions.find(s => s.id === targetSessionId)?.messages ?? [];
        setSelectedImages([]);
        setIsThinking(true);
        setLatestSources([]);
        scrollToBottom();

        // PHASE 2 FIX #4: Announce to screen readers
        setLiveMessage(`You: ${trimmed}`);

        try {
            await chatService.stream(
                {
                    message: trimmed,
                    history: historyForStream.map(m => ({ role: m.role, content: m.content })),
                    session_id: targetSessionId,
                    images: imagesToSubmit,
                    language: forcedLanguage
                },
                (chunk) => {
                    // Use strictly functional updates to avoid stale closures
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

            // Auto-naming only if it was a new chat or generic title
            const session = sessions.find(s => s.id === targetSessionId);
            const isDefaultTitle = session?.title === 'New Chat' || !session?.title;

            if (isNewSession || isDefaultTitle) {
                try {
                    const aiTitle = await chatService.generateTitle(trimmed, [userMsg]);
                    if (aiTitle) {
                        setSessions(prev => prev.map(s => s.id === targetSessionId ? { ...s, title: aiTitle } : s));
                    }
                } catch (e) {
                    console.error('Auto-naming failed:', e);
                }
            }
        } catch (error) {
            // Error with retry support
            const errorMsg: ChatEntry = {
                role: 'assistant',
                content: 'Failed to connect to Intelligence Node. Please check your connection and try again.',
                isError: true,
                retryPayload: { trimmed, currentHistory: historyForStream, sessionId: targetSessionId, imagesToSubmit },
            };
            setSessions(prev => prev.map(s => {
                if (s.id !== targetSessionId) return s;
                const msgs = [...s.messages];
                // Replace the empty assistant message with the error message
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
    }, [chatInput, selectedImages, isThinking, activeSessionId, sessions, forcedLanguage, scrollToBottom]);

    // PHASE 1 FIX #2: Fixed feedback toggle to always send API call (including null/deletion)
    const handleFeedback = useCallback(async (sessionId: string, msgIdx: number, rating: 'up' | 'down') => {
        const session = sessions.find(s => s.id === sessionId);
        if (!session) return;
        const msg = session.messages[msgIdx];
        if (!msg || msg.role !== 'assistant' || !msg.log_id) return;

        // Toggle off if same rating clicked again
        const newRating = msg.feedback === rating ? null : rating;
        const previousFeedback = msg.feedback; // Store for revert

        // Optimistic UI update
        setSessions(prev => prev.map(s => {
            if (s.id !== sessionId) return s;
            const msgs = [...s.messages];
            msgs[msgIdx] = { ...msgs[msgIdx], feedback: newRating };
            return { ...s, messages: msgs };
        }));

        try {
            // Always send the API call, even for null (deletion)
            await feedbackService.submit(msg.log_id, newRating as 'up' | 'down' | null);
        } catch {
            // Revert on error
            setSessions(prev => prev.map(s => {
                if (s.id !== sessionId) return s;
                const msgs = [...s.messages];
                msgs[msgIdx] = { ...msgs[msgIdx], feedback: previousFeedback };
                return { ...s, messages: msgs };
            }));
        }
    }, [sessions]);

    const formatDate = useCallback((iso: string) =>
        new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), []);

    // Switch session and restore its latest sources
    const switchSession = useCallback((id: string) => {
        setActiveSessionId(id);
        const session = sessions.find(s => s.id === id);
        const lastAssistant = session ? [...session.messages].reverse().find(m => m.role === 'assistant') : null;
        setLatestSources(lastAssistant?.sources ?? []);
    }, [sessions]);

    return (
        <div className="chatbot-layout">
            {/* PHASE 2 FIX #4: Screen reader live region */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {liveMessage}
            </div>

            {/* Sidebar */}
            <aside className="chatbot-sidebar" aria-label="Chat sessions">
                <button className="new-chat-btn" onClick={createNewSession} aria-label="Start new chat conversation">
                    <MessageSquare size={15} />
                    New Chat
                </button>
                <p className="chatbot-sidebar-label">
                    Recent Chats
                    {sessions.length > 0 && (
                        <button className="clear-sessions-btn" onClick={clearAllSessions} title="Clear all history" aria-label="Clear all chat history">
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
                            onClick={() => switchSession(session.id)}
                            role="listitem"
                            tabIndex={0}
                            aria-label={`Chat session: ${session.title}`}
                            aria-current={activeSessionId === session.id ? 'true' : 'false'}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchSession(session.id); } }}
                        >
                            <div className="session-info">
                                <span className="session-title">{session.title}</span>
                                <span className="session-date">{formatDate(session.createdAt)}</span>
                            </div>
                            <button
                                className="session-delete"
                                onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                                aria-label={`Delete conversation ${session.title}`}
                            >
                                <Trash2 size={13} />
                            </button>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main chat */}
            <div className="chatbot-main">
                <div className="chat-messages" onScroll={handleScroll} role="log" aria-label="Chat messages">
                    {chatHistory.length === 0 && (
                        <div className="chat-empty-state">
                            <Brain size={44} aria-hidden="true" />
                            <p>Intelligence Chatbot</p>
                            <span>Answers are grounded in indexed iCAD documents</span>
                            <div className="suggested-prompts">
                                {[
                                    'What are the code colors used in iCAD?',
                                    'Explain 3D modeling operations',
                                    'What is orthographic projection?',
                                ].map((prompt, i) => (
                                    <button
                                        key={i}
                                        className="prompt-chip"
                                        onClick={() => { setChatInput(prompt); inputRef.current?.focus(); }}
                                        aria-label={`Quick prompt: ${prompt}`}
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {chatHistory.map((msg, idx) => (
                        <MessageBubble
                            key={idx}
                            msg={msg}
                            idx={idx}
                            sessionId={activeSessionId}
                            currentlyReadingIdx={currentlyReadingIdx}
                            copiedIdx={copiedIdx}
                            regeneratingIdx={regeneratingIdx}
                            onSpeak={speakText}
                            onCopy={copyToClipboard}
                            onFeedback={handleFeedback}
                            onOpenLightbox={openLightbox}
                            onRetry={handleRetry}
                            onRegenerate={handleRegenerate}
                            onBranch={handleBranch}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    ))}

                    {/* Generic thinking dots only if no assistant bubble is already in history */}
                    {isThinking && chatHistory.filter(m => m.role === 'assistant').length === 0 && (
                        <div className="chat-bubble assistant">
                            <div className="bubble-avatar" aria-hidden="true"><Brain size={14} /></div>
                            <div className="bubble-content thinking" aria-label="Assistant is typing">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />

                    {showScrollBtn && (
                        <button className="scroll-bottom-btn" onClick={scrollToBottom} aria-label="Scroll to bottom">
                            <ArrowDown size={14} />
                        </button>
                    )}
                </div>

                {/* Sources accordion */}
                <SourcesPanel sources={latestSources} onOpenImage={openLightbox} onOpenFile={openFile} />

                {/* Input */}
                <div className="chat-input-row">
                    <div className="chat-controls-top">
                        {selectedImages.length > 0 && (
                            <div className="selected-images-preview-row" role="list" aria-label="Selected images">
                                {selectedImages.map((img, idx) => (
                                    <div key={idx} className="selected-image-preview" role="listitem">
                                        <div className="preview-container">
                                            <img src={`data:${img.mime};base64,${img.data}`} alt={`Selected image ${idx + 1}`} />
                                            <button
                                                className="remove-image-btn"
                                                onClick={() => removeSelectedImage(idx)}
                                                aria-label={`Remove image ${idx + 1}`}
                                            >
                                                <XCircle size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <form className="chat-input-box" onSubmit={handleSubmit}>
                        <div className="voice-lang-wrapper">
                            <label htmlFor="language-select" className="sr-only">Select response language</label>
                            <select
                                id="language-select"
                                className="voice-lang-select"
                                value={forcedLanguage}
                                onChange={(e) => setForcedLanguage(e.target.value as any)}
                                aria-label="Set AI Response Language"
                            >
                                <option value="en-US">EN</option>
                                <option value="ja-JP">JP</option>
                                <option value="fil-PH">PH</option>
                            </select>
                        </div>

                        <label htmlFor="chat-input" className="sr-only">Chat message input</label>
                        <input
                            id="chat-input"
                            ref={inputRef}
                            type="text"
                            className="chat-input"
                            placeholder={selectedImages.length > 0 ? "Describe these image/s...." : "What's on your mind?"}
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onPaste={handlePaste}
                            disabled={isThinking}
                            autoFocus
                            aria-label="Type your message"
                        />
                        <button
                            className="chat-send-btn"
                            type="submit"
                            disabled={isThinking || (!chatInput.trim() && selectedImages.length === 0)}
                            aria-label={isThinking ? 'Sending message...' : 'Send message'}
                        >
                            {isThinking
                                ? <RefreshCw size={15} className="spinning" aria-hidden="true" />
                                : <MessageSquare size={15} aria-hidden="true" />
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

            {/* Confirmation Modal */}
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
