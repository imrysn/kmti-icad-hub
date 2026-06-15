import api from './api';
import { User } from './authService';

export interface AssessmentTask {
    id: number;
    set_number: number;
    task_code?: string;
    unit_name?: string;
    file_name?: string;
    is_assembly?: boolean;
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
    assessment_type: '3D' | '2D';
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

    getSubmissionDownloadUrl: (submissionId: number): string => {
        return `${api.defaults.baseURL}/api/v1/assessments/submissions/${submissionId}/download`;
    },

    getFeedbackDownloadUrl: (feedbackId: number): string => {
        return `${api.defaults.baseURL}/api/v1/assessments/feedback/${feedbackId}/download`;
    },

    submitTask: async (taskId: number, file: File, assessmentType: '3D' | '2D' = '3D'): Promise<AssessmentSubmission> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('assessment_type', assessmentType);
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

    getTraineeSetMappings: async (traineeId: number) => {
        const response = await api.get(`/api/v1/assessments/trainer/trainees/${traineeId}/set-mappings`);
        return response.data;
    },

    updateTraineeSetMapping: async (traineeId: number, mappings: { display_set_number: number, actual_set_number: number }[]) => {
        const payload = mappings.map(m => ({ ...m, trainee_id: traineeId }));
        const response = await api.post(`/api/v1/assessments/trainer/trainees/${traineeId}/set-mappings`, payload);
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
        formData.append('is_assembly', taskData.is_assembly ? 'true' : 'false');
        formData.append('file', file);

        const response = await api.post('/api/v1/assessments/admin/tasks', formData);
        return response.data;
    },

    bulkCreateTasks: async (setNumber: number, files: File[]) => {
        const formData = new FormData();
        formData.append('set_number', setNumber.toString());
        files.forEach(file => {
            formData.append('files', file);
        });

        const response = await api.post('/api/v1/assessments/admin/tasks/bulk', formData);
        return response.data;
    },

    syncTasks: async () => {
        const response = await api.post('/api/v1/assessments/admin/tasks/sync');
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
        if (taskData.is_assembly !== undefined) formData.append('is_assembly', taskData.is_assembly ? 'true' : 'false');
        if (file) formData.append('file', file);

        for (let pair of formData.entries()) {
            console.log('FormData entry:', pair[0], pair[1]);
        }

        const response = await api.put(`/api/v1/assessments/admin/tasks/${taskId}`, formData);
        return response.data;
    },

    reorderTasks: async (updates: { id: number; set_number: number; order: number; task_code: string }[]) => {
        const response = await api.patch('/api/v1/assessments/admin/tasks/reorder', updates);
        return response.data;
    },

    getTaskFileTree: async (taskId: number) => {
        const response = await api.get(`/api/v1/assessments/admin/tasks/${taskId}/files`);
        return response.data;
    },

    createTaskSubfolder: async (taskId: number, path: string) => {
        const response = await api.post(`/api/v1/assessments/admin/tasks/${taskId}/folders`, { path });
        return response.data;
    },

    uploadTaskFile: async (taskId: number, path: string, file: File) => {
        const formData = new FormData();
        formData.append('path', path);
        formData.append('file', file);
        const response = await api.post(`/api/v1/assessments/admin/tasks/${taskId}/files`, formData);
        return response.data;
    },

    deleteTaskFile: async (taskId: number, path: string) => {
        const response = await api.delete(`/api/v1/assessments/admin/tasks/${taskId}/files`, {
            data: { path }
        });
        return response.data;
    },

    deleteSubmission: async (submissionId: number) => {
        const response = await api.delete(`/api/v1/assessments/submissions/${submissionId}`);
        return response.data;
    }
};
