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
    // PHASE 3 FEATURE #3: Smart suggestions
    suggestions?: string[];
}

// PHASE 1 FIX #2: Updated to accept null rating for feedback deletion
export const feedbackService = {
    async submit(logId: number, rating: 'up' | 'down' | null): Promise<void> {
        await api.post('/chat/feedback', { chat_log_id: logId, rating });
    }
};

export interface ImagePayload {
    data: string;
    mime: string;
}

export const chatService = {
    async send(
        message: string, 
        history: ChatMessage[], 
        sessionId?: string, 
        images: ImagePayload[] = [], 
        language: string = "en-US",
        isRegeneration: boolean = false
    ): Promise<ChatResponse> {
        const response = await api.post('/chat', { 
            message, 
            history, 
            session_id: sessionId,
            images,
            language,
            is_regeneration: isRegeneration
        });
        return response.data;
    },

    async stream(
        payload: {
            message: string;
            history: ChatMessage[];
            session_id?: string;
            images: ImagePayload[];
            language: string;
            is_regeneration?: boolean;
        },
        onChunk: (chunk: { type: string; delta?: string; sources?: ChatSource[]; suggestions?: string[]; log_id?: number }) => void
    ): Promise<void> {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const token = sessionStorage.getItem('access_token');

        const response = await fetch(`${API_BASE}/chat/stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: payload.message,
                history: payload.history,
                session_id: payload.session_id,
                images: payload.images,
                language: payload.language,
                is_regeneration: payload.is_regeneration
            })
        });

        if (!response.ok) throw new Error('Streaming failed');
        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep partial line in buffer

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine) continue;

                if (trimmedLine.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(trimmedLine.slice(6));
                        onChunk(data);
                    } catch (e) {
                        console.error('Error parsing SSE chunk:', trimmedLine, e);
                    }
                }
            }
        }
    },

    async generateTitle(message: string, history: ChatMessage[]): Promise<string> {
        const response = await api.post('/chat/name-session', { message, history: history.slice(-4) });
        return response.data.title;
    }
};
