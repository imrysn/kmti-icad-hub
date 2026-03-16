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
