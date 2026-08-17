import { api,cachedGet } from './api';

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
    role?: string;
    username: string;
    full_name: string;
    last_login: string | null;
    completed_lessons: number;
    average_score: number; // Weighted Mastery Index
    raw_average_score?: number;
    lessons_history: {
        course_id: string;
        percentage: number;
        last_accessed: string | null;
    }[];
    quizzes_history: {
        course_id: string;
        lesson_id: string;
        score: number;
        first_attempt_score?: number;
        attempts_count: number;
        completed_at: string | null;
        first_attempt_at?: string | null;
    }[];
    is_online?: boolean;
    current_activity?: string;
    online_since?: string;
    last_updated?: string;
}

export interface SystemAuditLog {
    id: number;
    level: 'INFO' | 'WARNING' | 'ERROR';
    message: string;
    context: string;
    created_at: string;
}

export interface AccessPlan {
    id: number;
    code: string;
    name: string;
    description?: string;
    display_order: number;
    is_active: boolean;
    is_publicly_requestable: boolean;
    entitlements: Array<{ id: number; plan_id: number; resource_type: string; resource_id: string; permission_code: string; limits_json?: string }>;
}

export interface CourseResource {
    id: number; title: string; description?: string; course_type: string; order: number;
}
export interface CurriculumCourse extends CourseResource {
    lifecycle_status: 'draft'|'in_review'|'published'|'archived'; published_at?:string; updated_at?:string;
}
export interface Cohort {id:number;code:string;name:string;description?:string;is_active:boolean;created_at:string}
export interface CourseRun {id:number;course_id:number;course_title:string;cohort_id:number;cohort_name:string;title:string;instructor_user_id?:number;instructor_name?:string;starts_at:string;ends_at?:string;status:string;enrollment_count:number}

export interface PracticalSetResource {
    resource_id: string; assessment_type: string; set_number: number; name: string;
}

export interface PlanAssignment {
    id: number; user_id: number; plan_id: number; plan_code: string; plan_name: string;
    starts_at: string; ends_at?: string; status: 'active' | 'scheduled' | 'expired' | 'cancelled'; reason?: string; created_at: string;
}
export interface EntitlementOverride {
    id: number; user_id: number; resource_type: 'course' | 'practical_set'; resource_id: string;
    permission_code: string; effect: 'allow' | 'deny'; starts_at: string; ends_at: string;
    reason: string; revoked_at?: string; created_at: string;
}
export interface AdminUserAccess {
    user_id: number; role_code: 'learner' | 'instructor' | 'admin';
    admin_areas: Array<'content' | 'organization' | 'platform'>;
    account_status: 'active' | 'suspended' | 'deactivated'; is_active: boolean;
}
export interface AdminPermissionItem { code:string; description:string; area:'content'|'organization'|'platform'; enabled:boolean; }
export interface AdminUserPermissions { user_id:number; permissions:AdminPermissionItem[]; }

export interface RegistrationApplication {
    id: number; user_id: number; email: string; full_name: string; company_name?: string;
    department?: string; job_title?: string; country_code?: string; reason_for_access?: string;
    requested_plan_id: number; assigned_plan_id?: number; requested_plan_name?: string;
    assigned_plan_name?: string; status: string; submitted_at: string; email_verified_at?: string;
    reviewed_at?: string; internal_review_notes?: string; applicant_message?: string; version: number;
}

export interface AccountInvitation {
    id:number; email:string; full_name:string; role_code:'learner'|'instructor'|'admin'; preferred_language:string;
    status:string; plan_id?:number; plan_name?:string; admin_areas:string[]; expires_at:string; accepted_at?:string;
    created_at:string; acceptance_token?:string;
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
    async getCurriculumCourses():Promise<CurriculumCourse[]>{ return (await api.get('/admin/curriculum/courses')).data; },
    async createCurriculumCourse(data:{title:string;description?:string;course_type:string;order?:number}):Promise<CurriculumCourse>{ return (await api.post('/admin/curriculum/courses',data)).data; },
    async changeCourseLifecycle(id:number,status:CurriculumCourse['lifecycle_status'],reason:string):Promise<CurriculumCourse>{ return (await api.post(`/admin/curriculum/courses/${id}/lifecycle`,{status,reason})).data; },
    async getCohorts():Promise<Cohort[]>{return (await api.get('/admin/course-delivery/cohorts')).data;},
    async createCohort(data:{code:string;name:string;description?:string}):Promise<Cohort>{return (await api.post('/admin/course-delivery/cohorts',data)).data;},
    async getCourseRuns():Promise<CourseRun[]>{return (await api.get('/admin/course-delivery/runs')).data;},
    async createCourseRun(data:{course_id:number;cohort_id:number;title:string;starts_at:string;ends_at?:string;instructor_user_id?:number}):Promise<CourseRun>{return (await api.post('/admin/course-delivery/runs',data)).data;},
    async assignRunInstructor(runId:number,instructor_user_id:number,reason:string):Promise<CourseRun>{return (await api.put(`/admin/course-delivery/runs/${runId}/instructor`,{instructor_user_id,reason})).data;},
    async enrollLearner(runId:number,learner_user_id:number,reason:string):Promise<void>{await api.post(`/admin/course-delivery/runs/${runId}/enrollments`,{learner_user_id,reason});},
    async getInvitations():Promise<AccountInvitation[]>{ return (await api.get('/admin/invitations')).data; },
    async createInvitation(data:{email:string;full_name:string;role_code:string;preferred_language:string;plan_id?:number;admin_areas:string[];expires_in_days:number}):Promise<AccountInvitation>{ return (await api.post('/admin/invitations',data)).data; },
    async resendInvitation(id:number):Promise<AccountInvitation>{ return (await api.post(`/admin/invitations/${id}/resend`)).data; },
    async cancelInvitation(id:number):Promise<AccountInvitation>{ return (await api.post(`/admin/invitations/${id}/cancel`)).data; },
    async getRegistrationApplications(status = 'pending_approval'): Promise<RegistrationApplication[]> {
        return (await api.get('/admin/registration-applications', { params: { status } })).data;
    },

    async approveRegistration(id: number, version: number, assignedPlanId: number, internalReason?: string): Promise<RegistrationApplication> {
        return (await api.post(`/admin/registration-applications/${id}/approve`, { version, assigned_plan_id: assignedPlanId, internal_reason: internalReason })).data;
    },

    async rejectRegistration(id: number, version: number, internalReason?: string, applicantMessage?: string): Promise<RegistrationApplication> {
        return (await api.post(`/admin/registration-applications/${id}/reject`, { version, internal_reason: internalReason, applicant_message: applicantMessage })).data;
    },

    async getAccessPlans(): Promise<AccessPlan[]> {
        const response = await api.get('/admin/access-plans');
        return response.data;
    },

    async updateAccessPlan(planId: number, data: Partial<Pick<AccessPlan, 'name' | 'description' | 'display_order' | 'is_active' | 'is_publicly_requestable'>>): Promise<AccessPlan> {
        const response = await api.patch(`/admin/access-plans/${planId}`, data);
        return response.data;
    },

    async getAccessPlanCourseResources(): Promise<CourseResource[]> {
        return (await api.get('/admin/access-plan-resources/courses')).data;
    },

    async getAccessPlanPracticalSetResources(): Promise<PracticalSetResource[]> {
        return (await api.get('/admin/access-plan-resources/practical-sets')).data;
    },

    async replaceAccessPlanEntitlements(planId: number, entitlements: Array<{ resource_type: string; resource_id: string; permission_code: string; limits_json?: string }>): Promise<AccessPlan> {
        return (await api.put(`/admin/access-plans/${planId}/entitlements`, entitlements)).data;
    },

    async getUserPlanHistory(userId: number): Promise<PlanAssignment[]> {
        return (await api.get(`/admin/users/${userId}/plan-history`)).data;
    },

    async assignUserPlan(userId: number, data: { plan_id: number; starts_at: string; ends_at?: string; reason: string }): Promise<PlanAssignment> {
        return (await api.post(`/admin/users/${userId}/plan-assignments`, data)).data;
    },

    async getUserEntitlementOverrides(userId: number): Promise<EntitlementOverride[]> {
        return (await api.get(`/admin/users/${userId}/entitlement-overrides`)).data;
    },

    async createUserEntitlementOverride(userId: number, data: { resource_type: 'course' | 'practical_set'; resource_id: string; effect: 'allow' | 'deny'; starts_at: string; ends_at: string; reason: string }): Promise<EntitlementOverride> {
        return (await api.post(`/admin/users/${userId}/entitlement-overrides`, data)).data;
    },

    async revokeUserEntitlementOverride(userId: number, overrideId: number): Promise<EntitlementOverride> {
        return (await api.delete(`/admin/users/${userId}/entitlement-overrides/${overrideId}`)).data;
    },

    async getUserAccess(userId: number): Promise<AdminUserAccess> {
        return (await api.get(`/admin/users/${userId}/access`)).data;
    },

    async updateUserAccess(userId: number, data: { role_code: AdminUserAccess['role_code']; admin_areas: AdminUserAccess['admin_areas']; account_status: AdminUserAccess['account_status']; reason: string; reauth_password: string }): Promise<AdminUserAccess> {
        return (await api.put(`/admin/users/${userId}/access`, data)).data;
    },

    async getUserPermissions(userId: number): Promise<AdminUserPermissions> {
        return (await api.get(`/admin/users/${userId}/permissions`)).data;
    },

    async updateUserPermissions(userId: number, data: { enabled_codes:string[]; reason:string; reauth_password:string }): Promise<AdminUserPermissions> {
        return (await api.put(`/admin/users/${userId}/permissions`, data)).data;
    },

    async getStats(): Promise<SystemStats> {
        return cachedGet('/admin/stats');
    },

    async getTraineeProgress(): Promise<TraineeProgress[]> {
        return cachedGet('/admin/progress');
    },

    async getLogs(): Promise<SystemAuditLog[]> {
        return cachedGet('/admin/logs');
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

    async deleteBroadcast(broadcastId: number): Promise<void> {
        await api.delete(`/admin/broadcasts/${broadcastId}`);
    },

    async getHeatmap(): Promise<{ course_id: string; count: number }[]> {
        return cachedGet('/admin/heatmap');
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
        return cachedGet('/admin/quizzes');
    },

    async getQuizDetail(quizId: number): Promise<Quiz> {
        return cachedGet(`/admin/quizzes/${quizId}`);
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
    },

    async getTraineeQuizAttempts(userId: number, quizSlug: string): Promise<any> {
        const response = await api.get(`/admin/trainee/${userId}/attempts/${quizSlug}`);
        return response.data;
    },

    // System Settings
    async getSetting(key: string): Promise<{ key: string; value: string; description?: string }> {
        const response = await api.get(`/settings/${key}`);
        return response.data;
    },

    async updateSetting(key: string, value: string): Promise<{ key: string; value: string; description?: string }> {
        const response = await api.put(`/settings/${key}`, { value });
        return response.data;
    }
};
