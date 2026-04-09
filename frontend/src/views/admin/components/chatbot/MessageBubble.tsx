import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Brain, Zap, RefreshCw, ThumbsUp, ThumbsDown, Volume2, VolumeX, Copy, Check, GitBranch, Sparkles } from 'lucide-react'; import { ChatEntry } from './types';
import { ChatSource, MediaAsset } from '../../../../services/searchService'; import { MediaCard } from './SourcesPanel';

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

interface MessageBubbleProps {
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
}

export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({ 
    msg, 
    idx, 
    sessionId, 
    currentlyReadingIdx, 
    copiedIdx, 
    regeneratingIdx, 
    onSpeak, 
    onCopy, 
    onFeedback, 
    onOpenLightbox, 
    onRetry, 
    onRegenerate, 
    onBranch, 
    onSuggestionClick 
}) => {
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
                    <sup key={i} className="citation-marker" title={source ? `Source: ${source.source}` : 'Reference'}>
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

                        {/* Retry button for error messages */}
                        {msg.isError && msg.retryPayload && onRetry && (
                            <button className="retry-btn" onClick={() => onRetry(msg.retryPayload)}
                                aria-label="Retry failed request"
                            >
                                <RefreshCw size={14} /> Retry
                            </button>
                        )}

                        {msg.user_images && msg.user_images.length > 0 && (
                            <div className="user-uploaded-images-grid">
                                {msg.user_images.map((img, i) => (
                                    <div key={i} className="user-uploaded-image" onClick={() => onOpenLightbox(img, `Attachment ${i + 1}`, 'User')}
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

                        {/* Smart suggestions */}
                        {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && onSuggestionClick && (
                            <div className="suggestions-container">
                                <div className="suggestions-label">
                                    <Sparkles size={11} />
                                    <span>Continue the conversation:</span>
                                </div>
                                <div className="suggestions-grid">
                                    {msg.suggestions.map((suggestion, sIdx) => (
                                        <button key={sIdx} className="suggestion-chip" onClick={() => onSuggestionClick(suggestion)}
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
                                {/* Regenerate button */}
                                {msg.userPrompt && onRegenerate && sessionId && (
                                    <button className="feedback-btn regenerate-btn" onClick={() => onRegenerate(sessionId, idx)}
                                        aria-label="Regenerate response"
                                        title="Try again with a different response"
                                    >
                                        <RefreshCw size={13} />
                                    </button>
                                )}
                                {onBranch && (
                                    <button className="feedback-btn branch-btn" onClick={() => onBranch(idx)}
                                        aria-label="Branch conversation"
                                        title="Start a new chat from this point"
                                    >
                                        <GitBranch size={13} />
                                    </button>
                                )}
                                <button className={`feedback-btn speak-btn ${currentlyReadingIdx === idx ? 'speaking' : ''}`} onClick={() => onSpeak(msg.content, idx)}
                                    aria-label={currentlyReadingIdx === idx ? 'Stop reading aloud' : 'Read aloud'}
                                    aria-pressed={currentlyReadingIdx === idx}
                                >
                                    {currentlyReadingIdx === idx ? <VolumeX size={13} /> : <Volume2 size={13} />}
                                </button>
                                <button className={`feedback-btn copy-btn ${copiedIdx === idx ? 'copied' : ''}`} onClick={() => onCopy(msg.content, idx)}
                                    aria-label="Copy to clipboard"
                                >
                                    {copiedIdx === idx ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                                </button>
                                <button className={`feedback-btn ${msg.feedback === 'up' ? 'active-up' : ''}`} onClick={() => sessionId && onFeedback(sessionId, idx, 'up')}
                                    aria-label={msg.log_id ? 'Mark as helpful' : 'Mark as helpful (not logged)'}
                                    disabled={!msg.log_id && msg.feedback !== 'up'}
                                >
                                    <ThumbsUp size={13} />
                                </button>
                                <button className={`feedback-btn ${msg.feedback === 'down' ? 'active-down' : ''}`} onClick={() => sessionId && onFeedback(sessionId, idx, 'down')}
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
        prevProps.msg.log_id === nextProps.msg.log_id &&
        prevProps.currentlyReadingIdx === nextProps.currentlyReadingIdx &&
        prevProps.copiedIdx === nextProps.copiedIdx &&
        prevProps.msg.cached === nextProps.msg.cached &&
        prevProps.msg.isError === nextProps.msg.isError &&
        prevProps.regeneratingIdx === nextProps.regeneratingIdx &&
        JSON.stringify(prevProps.msg.suggestions) === JSON.stringify(nextProps.msg.suggestions)
    );
});

MessageBubble.displayName = 'MessageBubble';
