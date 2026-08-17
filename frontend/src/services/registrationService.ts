import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

const publicApi = axios.create({ baseURL: `${API_BASE_URL.replace(/\/$/, '')}/api/v1`, timeout: 10000 });

export interface PublicAccessPlan { id: number; code: string; name: string; description?: string; }
export interface RegistrationPayload {
  username: string; email: string; password: string; full_name: string; requested_plan_id: number;
  company_name?: string; department?: string; job_title?: string; country_code?: string;
  reason_for_access?: string; preferred_language: 'en' | 'ja'; timezone: string;
  privacy_policy_version: string; terms_version: string; privacy_accepted: boolean; terms_accepted: boolean;
}

export const registrationService = {
  async getPlans(): Promise<PublicAccessPlan[]> {
    return (await publicApi.get('/public/access-plans')).data;
  },
  async submit(payload: RegistrationPayload): Promise<{ message: string; verification_token?: string }> {
    return (await publicApi.post('/registrations', payload)).data;
  },
  async verifyEmail(token: string): Promise<{ message: string }> {
    return (await publicApi.post('/registrations/verify-email', { token })).data;
  },
};
