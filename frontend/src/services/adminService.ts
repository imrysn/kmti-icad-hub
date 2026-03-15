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
    },

    async createUser(data: any): Promise<any> {
        const response = await api.post('/admin/users', data);
        return response.data;
    },

    async updateUser(userId: number, data: any): Promise<any> {
        const response = await api.put(`/admin/users/${userId}`, data);
        return response.data;
    },

    async sendBroadcast(message: string, level: string = 'info'): Promise<void> {
        await api.post(`/admin/broadcast`, null, { params: { message, level } });
    },

    async getActiveBroadcasts(): Promise<any[]> {
        const response = await api.get('/admin/broadcasts/active');
        return response.data;
    },

    async getHeatmap(): Promise<{ course_id: string; count: number }[]> {
        const response = await api.get('/admin/heatmap');
        return response.data;
    },

    async triggerReindex(): Promise<void> {
        await api.post('/admin/reindex');
    },

    async downloadProgressExport(userId?: number): Promise<void> {
        const response = await api.get('/admin/export/progress', { 
            params: { user_id: userId },
            responseType: 'blob' 
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const filename = userId ? `trainee_report_${userId}.csv` : 'trainee_progress.csv';
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};
