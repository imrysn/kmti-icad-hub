export interface Course {
    id: string;
    title: string;
    description: string;
}

export interface MediaAsset {
    media_type: string;  // "video" | "image" | "3d_model"
    media_url: string;
    timestamp_start?: number;
    timestamp_end?: number;
    description: string;
}

export interface SearchResult {
    content: string;
    source: string;
    score?: number;
    media?: MediaAsset[];  // Linked multimedia assets
}

export interface SearchResponse {
    query: string;
    results: SearchResult[];
}

export interface CourseListResponse {
    courses: Course[];
}

export type AppMode = 'mentor' | 'assistant' | 'admin';
