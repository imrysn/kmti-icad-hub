import React, { useRef } from 'react';
import { MessageSquare, RefreshCw, XCircle, Trash2 } from 'lucide-react'; import { ImagePayload } from '../../../../services/searchService';

interface ChatInputProps {
    input: string;
    setInput: (val: string) => void;
    selectedImages: ImagePayload[];
    removeImage: (idx: number) => void;
    onPaste: (e: React.ClipboardEvent) => void;
    onSubmit: (e?: React.FormEvent) => void;
    isThinking: boolean;
    forcedLanguage: string;
    setForcedLanguage: (lang: any) => void;
    onClearAll: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    input,
    setInput,
    selectedImages,
    removeImage,
    onPaste,
    onSubmit,
    isThinking,
    forcedLanguage,
    setForcedLanguage,
    onClearAll
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="chat-input-row">
            <div className="chat-controls-top">
                {selectedImages.length > 0 && (
                    <div className="selected-images-preview-row" role="list" aria-label="Selected images">
                        {selectedImages.map((img, idx) => (
                            <div key={idx} className="selected-image-preview" role="listitem">
                                <div className="preview-container">
                                    <img src={`data:${img.mime};base64,${img.data}`} alt={`Selected image ${idx + 1}`} />
                                    <button className="remove-image-btn" onClick={() => removeImage(idx)}
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
            <form className="chat-input-box" onSubmit={onSubmit}>
                <div className="voice-lang-wrapper">
                    <label htmlFor="language-select" className="sr-only">Select response language</label>
                    <select id="language-select" className="voice-lang-select" value={forcedLanguage} onChange={(e) => setForcedLanguage(e.target.value as any)}
                        aria-label="Set AI Response Language"
                    >
                        <option value="en-US">EN</option>
                        <option value="ja-JP">JP</option>
                        <option value="fil-PH">PH</option>
                    </select>
                </div>

                <button 
                    type="button" 
                    className="chat-clear-btn" 
                    onClick={onClearAll}
                    title="Clear history"
                    aria-label="Clear chat history"
                    disabled={isThinking}
                >
                    <Trash2 size={15} />
                </button>

                <label htmlFor="chat-input" className="sr-only">Chat message input</label>
                <input id="chat-input" ref={inputRef} type="text" className="chat-input" placeholder={selectedImages.length> 0 ? "Describe these image/s...." : "What's on your mind?"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onPaste={onPaste}
                    disabled={isThinking}
                    autoFocus
                    aria-label="Type your message"
                />
                <button className="chat-send-btn" type="submit" disabled={isThinking || (!input.trim() && selectedImages.length === 0)} aria-label={isThinking ? 'Sending message...' : 'Send message'}>
                    {isThinking
                        ? <RefreshCw size={15} className="spinning" aria-hidden="true" />
                        : <MessageSquare size={15} aria-hidden="true" />
                    }
                </button>
            </form>
        </div>
    );
};
