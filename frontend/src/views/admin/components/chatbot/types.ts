import { ChatMessage, ChatSource, MediaAsset, ImagePayload } from '../../../../services/searchService';

export interface ChatEntry extends ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    sources?: ChatSource[];
    log_id?: number | null;
    feedback?: 'up' | null | 'down';
    cached?: boolean;
    user_images?: string[];
    isError?: boolean;
    retryPayload?: {
        trimmed: string;
        currentHistory: ChatEntry[];
        sessionId: string;
        imagesToSubmit: ImagePayload[];
    };
    suggestions?: string[];
    userPrompt?: string;
    userImages?: ImagePayload[];
}

export interface StoredSession {
    id: string;
    title: string;
    messages: ChatEntry[];
    createdAt: string;
}

export interface LightboxImage {
    url: string;
    caption: string;
    source: string;
}
