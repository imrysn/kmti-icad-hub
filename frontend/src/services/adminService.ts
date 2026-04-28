import { api } from './api';

export interface KBFile {
    name: string;
    size: number;
    modified: string;
}

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
        lesson_id: string;
        score: number;
        attempts_count: number;
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

export interface Quiz {
    id: number;
    slug: string;
    title: string;
    description: string;
    course_type: string;
    created_at: string;
    updated_at: string;
    questions?: Question[];
}

export interface Question {
    id: number;
    quiz_id: number;
    text: string;
    options_json: string;
    correct_answer: number;
    explanation: string;
    order: number;
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
    },

    async getKBFiles(): Promise<KBFile[]> {
        const response = await api.get('/admin/kb/files');
        return response.data;
    },

    async uploadKBFiles(files: File[]): Promise<void> {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        await api.post('/admin/kb/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    async deleteKBFile(filename: string): Promise<void> {
        await api.delete(`/admin/kb/files/${filename}`);
    },

    async previewKBFile(filename: string): Promise<any> {
        const response = await api.get(`/admin/kb/files/${encodeURIComponent(filename)}/preview`);
        return response.data;
    },

    async getChatLogs(params?: { limit?: number; offset?: number; username?: string }): Promise<any> {
        const response = await api.get('/admin/chat-logs', { params });
        return response.data;
    },

    async getChatLogStats(): Promise<any> {
        const response = await api.get('/admin/chat-logs/stats');
        return response.data;
    },

    async deleteChatLog(logId: number): Promise<void> {
        await api.delete(`/admin/chat-logs/${logId}`);
    },

    async getFeedbackStats(): Promise<any> {
        const response = await api.get('/admin/feedback/stats');
        return response.data;
    },

    async getCacheStats(): Promise<any> {
        const response = await api.get('/admin/cache/stats');
        return response.data;
    },

    async clearCache(): Promise<void> {
        await api.delete('/admin/cache');
    },

    async downloadKBFile(filename: string): Promise<void> {
        const response = await api.get(`/admin/kb/files/${encodeURIComponent(filename)}/download`, {
            responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    },

    // Assessment Management
    async getQuizzes(): Promise<Quiz[]> {
        const response = await api.get('/admin/quizzes');
        return response.data;
    },

    async getQuizDetail(quizId: number): Promise<Quiz> {
        const response = await api.get(`/admin/quizzes/${quizId}`);
        return response.data;
    },

    async createQuiz(data: Partial<Quiz>): Promise<Quiz> {
        const response = await api.post('/admin/quizzes', data);
        return response.data;
    },

    async updateQuiz(quizId: number, data: Partial<Quiz>): Promise<Quiz> {
        const response = await api.put(`/admin/quizzes/${quizId}`, data);
        return response.data;
    },

    async deleteQuiz(quizId: number): Promise<void> {
        await api.delete(`/admin/quizzes/${quizId}`);
    },

    async createQuestion(quizId: number, data: Partial<Question>): Promise<Question> {
        const response = await api.post(`/admin/quizzes/${quizId}/questions`, data);
        return response.data;
    },

    async updateQuestion(questionId: number, data: Partial<Question>): Promise<Question> {
        const response = await api.put(`/admin/questions/${questionId}`, data);
        return response.data;
    },

    async deleteQuestion(questionId: number): Promise<void> {
        await api.delete(`/admin/questions/${questionId}`);
    },

    async reopenAssessment(userId: number, quizSlug: string): Promise<void> {
        await api.post('/admin/reopen-assessment', null, { params: { user_id: userId, quiz_slug: quizSlug } });
    },

    async reopenAllAssessments(userId: number, courseType?: string): Promise<void> {
        await api.post('/admin/reopen-all-assessments', null, { params: { user_id: userId, course_type: courseType } });
    },

    async closeAllAssessments(userId: number, courseType?: string): Promise<void> {
        await api.post('/admin/close-all-assessments', null, { params: { user_id: userId, course_type: courseType } });
    }
};
