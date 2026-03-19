import React, { useRef, useEffect } from 'react';
import { Brain, ArrowDown } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { ChatEntry } from './types';
import { ChatFrontier } from './ChatFrontier';

interface MessageListProps {
    chatHistory: ChatEntry[];
    activeSessionId: string | null;
    currentlyReadingIdx: number | null;
    copiedIdx: number | null;
    regeneratingIdx: number | null;
    isThinking: boolean;
    showScrollBtn: boolean;
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    scrollToBottom: () => void;
    onSpeak: (text: string, idx: number) => void;
    onCopy: (text: string, idx: number) => void;
    onFeedback: (sessionId: string, msgIdx: number, rating: 'up' | 'down') => void;
    onOpenLightbox: (url: string, caption: string, source: string) => void;
    onRetry: (payload: any) => void;
    onRegenerate: (sessionId: string, msgIdx: number) => void;
    onBranch: (msgIdx: number) => void;
    onSuggestionClick: (suggestion: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
    chatHistory,
    activeSessionId,
    currentlyReadingIdx,
    copiedIdx,
    regeneratingIdx,
    isThinking,
    showScrollBtn,
    onScroll,
    scrollToBottom,
    onSpeak,
    onCopy,
    onFeedback,
    onOpenLightbox,
    onRetry,
    onRegenerate,
    onBranch,
    onSuggestionClick
}) => {
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when history changes or thinking starts
    useEffect(() => {
        if (isThinking || chatHistory.length > 0) {
            scrollToBottom();
        }
    }, [chatHistory.length, isThinking, scrollToBottom]);

    return (
        <div className="chat-messages" onScroll={onScroll} role="log" aria-label="Chat messages">
            {chatHistory.length === 0 && (
                <ChatFrontier onSuggestionClick={onSuggestionClick} />
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
                    onSpeak={onSpeak}
                    onCopy={onCopy}
                    onFeedback={onFeedback}
                    onOpenLightbox={onOpenLightbox}
                    onRetry={onRetry}
                    onRegenerate={onRegenerate}
                    onBranch={onBranch}
                    onSuggestionClick={onSuggestionClick}
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
    );
};
