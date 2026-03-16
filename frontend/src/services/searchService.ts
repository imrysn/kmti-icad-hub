import { api } from './api';

export interface MediaAsset {
    media_type: 'video' | 'image' | '3d_model';
    media_url: string;
    timestamp_start?: number;
    timestamp_end?: number;
    description?: string;
}

export interface SearchResult {
    id: string;
    content: string;
    source: string;
    score: number | null;
    media?: MediaAsset[];
}

export interface SearchResponse {
    query: string;
    results: SearchResult[];
    total: number;
}

export const searchService = {
    async query(query: string): Promise<SearchResponse> {
        const response = await api.get('/search', { params: { query } });
        return response.data;
    }
};

// Chat
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatSource {
    id: string;
    content: string;
    source: string;
    score: number | null;
    media?: MediaAsset[];
}

export interface ChatResponse {
    answer: string;
    sources: ChatSource[];
    cached?: boolean;
    log_id?: number | null;
}

export const feedbackService = {
    async submit(logId: number, rating: 'up' | 'down'): Promise<void> {
        await api.post('/chat/feedback', { chat_log_id: logId, rating });
    }
};

export const chatService = {
    async send(message: string, history: ChatMessage[]): Promise<ChatResponse> {
        const response = await api.post('/chat', { message, history });
        return response.data;
    }
};
