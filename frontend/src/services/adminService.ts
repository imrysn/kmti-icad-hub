import { api } from './api';

export interface SystemStats {
    users: {
        total: number;
        active: number;
        admins: number;
    };
    knowledge_base: {
        total_documents: number;
    };
    system?: {
        status: string;
        cpu_load: number;
        memory_usage: number;
        disk?: number;
    };
}

export interface TraineeProgress {
    id: number;
    username: string;
    full_name: string;
    last_login: string | null;
    completed_lessons: number;
    average_score: number;
    lessons_history: {
        course_id: string;
        percentage: number;
        last_accessed: string | null;
    }[];
    quizzes_history: {
        course_id: string;
        score: number;
        completed_at: string | null;
    }[];
}

export interface SystemAuditLog {
    id: number;
    level: 'INFO' | 'WARNING' | 'ERROR';
    message: string;
    context: string;
    created_at: string;
}

export const adminService = {
    async getStats(): Promise<SystemStats> {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    async getTraineeProgress(): Promise<TraineeProgress[]> {
        const response = await api.get('/admin/progress');
        return response.data;
    },

    async getLogs(): Promise<SystemAuditLog[]> {
        const response = await api.get('/admin/logs');
        return response.data;
    },

    async deleteUser(userId: number): Promise<void> {
        await api.delete(`/admin/users/${userId}`);
    }
};
