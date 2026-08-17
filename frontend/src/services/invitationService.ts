import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

const publicApi = axios.create({ baseURL: `${API_BASE_URL.replace(/\/$/, '')}/api/v1`, timeout: 10000 });

export interface InvitationPreview { email:string; full_name:string; role_code:string; plan_name?:string; admin_areas:string[]; expires_at:string; }

export const invitationService = {
  async validate(token:string):Promise<InvitationPreview>{ return (await publicApi.get('/invitations/validate',{params:{token}})).data; },
  async accept(payload:{token:string;username:string;password:string;privacy_policy_version:string;terms_version:string;privacy_accepted:boolean;terms_accepted:boolean}):Promise<{message:string;username:string}>{ return (await publicApi.post('/invitations/accept',payload)).data; },
};
