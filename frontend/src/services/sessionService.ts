import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

let refreshInFlight: Promise<string> | null = null;
export const clearSessionStorage = () => {
  sessionStorage.removeItem('access_token'); sessionStorage.removeItem('refresh_token'); sessionStorage.removeItem('user');
};
export const refreshAccessToken = (): Promise<string> => {
  if (refreshInFlight) return refreshInFlight;
  const refreshToken = sessionStorage.getItem('refresh_token');
  if (!refreshToken) return Promise.reject(new Error('No refresh session'));
  refreshInFlight = axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, { refresh_token: refreshToken }).then(response => {
    sessionStorage.setItem('access_token', response.data.access_token);
    sessionStorage.setItem('refresh_token', response.data.refresh_token);
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.access_token as string;
  }).catch(error => { clearSessionStorage(); throw error; }).finally(() => { refreshInFlight = null; });
  return refreshInFlight;
};
