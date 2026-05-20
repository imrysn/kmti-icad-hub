import api from './api';
import { User } from './authService';

export interface AssessmentTask {
    id: number;
    set_number: number;
    task_code: string;
    title: string;
    description: string;
    master_file_path: string;
    order: number;
}

export interface AssessmentSubmission {
    id: number;
    user_id: number;
    task_id: number;
    submission_file_path: string;
    status: 'pending' | 'approved' | 'rejected';
    trainer_id?: number;
    submitted_at: string;
    updated_at: string;
    user?: User;
    task?: AssessmentTask;
    feedback?: any[];
}

export const assessmentService = {
    getTasks: async (): Promise<AssessmentTask[]> => {
        const response = await api.get('/api/v1/assessments/tasks');
        return response.data;
    },

    getMySubmissions: async (): Promise<AssessmentSubmission[]> => {
        const response = await api.get('/api/v1/assessments/my-submissions');
        return response.data;
    },

    getMasterFileBlob: async (taskId: number): Promise<Blob> => {
        const response = await api.get(`/api/v1/assessments/tasks/${taskId}/download`, {
            responseType: 'blob'
        });
        return response.data;
    },

    getDownloadUrl: (taskId: number): string => {
        return `${api.defaults.baseURL}/api/v1/assessments/tasks/${taskId}/download`;
    },

    getFeedbackDownloadUrl: (feedbackId: number): string => {
        return `${api.defaults.baseURL}/api/v1/assessments/feedback/${feedbackId}/download`;
    },

    submitTask: async (taskId: number, file: File): Promise<AssessmentSubmission> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post(`/api/v1/assessments/submit/${taskId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getTrainerSubmissions: async (status: string = 'pending'): Promise<AssessmentSubmission[]> => {
        const response = await api.get(`/api/v1/assessments/trainer/submissions`, {
            params: { status }
        });
        return response.data;
    },

    provideFeedback: async (submissionId: number, status: 'approved' | 'rejected', file?: File, comments?: string) => {
        const formData = new FormData();
        formData.append('status', status);
        if (file) formData.append('file', file);
        if (comments) formData.append('comments', comments);
        
        const response = await api.post(`/api/v1/assessments/feedback/${submissionId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    replyToFeedback: async (feedbackId: number, reply: string) => {
        const formData = new FormData();
        formData.append('reply', reply);
        const response = await api.post(`/api/v1/assessments/feedback/${feedbackId}/reply`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getTrainerTraineesProgress: async (): Promise<any[]> => {
        const response = await api.get('/api/v1/assessments/trainer/trainees-progress');
        return response.data;
    },

    // Admin Methods
    getTrainerMappings: async () => {
        const response = await api.get('/api/v1/assessments/admin/mappings');
        return response.data;
    },

    createTask: async (taskData: any, file: File) => {
        const formData = new FormData();
        formData.append('set_number', taskData.set_number.toString());
        formData.append('task_code', taskData.task_code);
        formData.append('title', taskData.title);
        if (taskData.description) formData.append('description', taskData.description);
        formData.append('file', file);

        const response = await api.post('/api/v1/assessments/admin/tasks', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    bulkCreateTasks: async (setNumber: number, files: File[]) => {
        const formData = new FormData();
        formData.append('set_number', setNumber.toString());
        files.forEach(file => {
            formData.append('files', file);
        });

        const response = await api.post('/api/v1/assessments/admin/tasks/bulk', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    assignTrainer: async (mapping: { trainer_id: number; trainee_id: number }) => {
        const response = await api.post('/api/v1/assessments/admin/assign', mapping);
        return response.data;
    },

    deleteTask: async (taskId: number) => {
        const response = await api.delete(`/api/v1/assessments/admin/tasks/${taskId}`);
        return response.data;
    },

    deleteMapping: async (mappingId: number) => {
        const response = await api.delete(`/api/v1/assessments/admin/mappings/${mappingId}`);
        return response.data;
    },

    updateTask: async (taskId: number, taskData: any, file?: File) => {
        const formData = new FormData();
        formData.append('set_number', taskData.set_number.toString());
        formData.append('task_code', taskData.task_code);
        formData.append('title', taskData.title);
        if (taskData.description) formData.append('description', taskData.description);
        if (file) formData.append('file', file);

        const response = await api.put(`/api/v1/assessments/admin/tasks/${taskId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    deleteSubmission: async (submissionId: number) => {
        const response = await api.delete(`/api/v1/assessments/submissions/${submissionId}`);
        return response.data;
    }
};
