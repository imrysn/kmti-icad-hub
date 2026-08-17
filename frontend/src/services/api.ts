import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import { clearSessionStorage, refreshAccessToken } from './sessionService';

export const API_BASE = API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token to headers and prepend /api/v1 prefix
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        if (config.url && !config.url.startsWith('/api/v1') && !config.url.startsWith('http') && !config.url.startsWith('//')) {
            config.url = `/api/v1${config.url.startsWith('/') ? '' : '/'}${config.url}`;
        }
        // Prepend baseURL explicitly for relative URLs to avoid errors in JSDOM environment
        let base = config.baseURL || API_BASE_URL;
        if (config.url && !config.url.startsWith('http') && !config.url.startsWith('//') && base) {
            base = base.replace(/\/$/, '');
            let url = config.url;
            if (base.endsWith('/api/v1') && url.startsWith('/api/v1')) {
                url = url.substring(7); // Remove duplicate '/api/v1' segment
            }
            config.url = `${base}${url}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors and automatic cache invalidation
api.interceptors.response.use(
    (response) => {
        const method = response.config.method?.toLowerCase();
        if (method && ['post', 'put', 'delete', 'patch'].includes(method)) {
            invalidateCache();
        }
        return response;
    },
    async (error) => {
        const method = error.config?.method?.toLowerCase();
        if (method && ['post', 'put', 'delete', 'patch'].includes(method)) {
            invalidateCache();
        }

        // Token expired or invalid - force auto-logout
        const isLoginRequest = error?.config?.url?.includes('login');
        const isAtLoginRoot = window.location.hash === '#/' || window.location.hash.startsWith('#/login');

        const original = error.config;
        if (error.response?.status === 401 && !isLoginRequest && !original?.url?.includes('/auth/refresh') && !original?._retry && sessionStorage.getItem('refresh_token')) {
            original._retry = true;
            try { original.headers.Authorization = `Bearer ${await refreshAccessToken()}`; return api(original); } catch { /* expire below */ }
        }
        if (error.response?.status === 401 && !isLoginRequest && !isAtLoginRoot) {
            console.warn('Authentication failure - token expired. Auto-logging out.');
            
            // Clear session data
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('kmti_') || key.startsWith('assistant-') || key.startsWith('properties-')) {
                    localStorage.removeItem(key);
                }
            });
            clearSessionStorage();
            
            // Redirect to login
            window.location.hash = '#/login';
        }
        return Promise.reject(error);
    }
);

// Simple in-memory cache for GET requests
const requestCache = new Map<string, { data: any; timestamp: number }>();

export const cachedGet = async (url: string, ttlMs: number = 15000, options: any = {}) => {
    const cacheKey = `${url}_${JSON.stringify(options.params || {})}`;
    const cached = requestCache.get(cacheKey);
    const now = Date.now();
    if (cached && (now - cached.timestamp < ttlMs)) {
        return cached.data;
    }
    const response = await api.get(url, options);
    requestCache.set(cacheKey, { data: response.data, timestamp: now });
    return response.data;
};

export const invalidateCache = (urlPattern?: string) => {
    if (!urlPattern) {
        requestCache.clear();
    } else {
        for (const key of requestCache.keys()) {
            if (key.includes(urlPattern)) {
                requestCache.delete(key);
            }
        }
    }
};

export default api;
export { api };

// Get system status (DB mode, NAS reachability)
export const getSystemStatus = async () => {
    try {
        const response = await api.get('/api/v1/system/status');
        return response.data;
    } catch (error) {
        console.error('Error fetching system status:', error);
        return { status: 'offline', db_mode: 'unknown', nas_reachable: false };
    }
};


// Get available courses
// Force Vite HMR reload
export const getCourses = async () => {
    const response = await api.get('/api/v1/courses/');
    return response.data;
};

// Get user progress for a course
export const getUserProgress = async (courseId: string, userId: string) => {
    const response = await api.get(`/api/v1/courses/${courseId}/progress/${userId}`);
    return response.data;
};

// Get hierarchical lessons for a specific course
export const getCourseLessons = async (courseId: string | number) => {
    const response = await api.get(`/api/v1/courses/${courseId}/lessons`);
    return response.data;
};

export const clientsApi = {
    list: (params?: any) => api.get('/api/v1/clients', { params }),
    create: (data: any) => api.post('/api/v1/clients', data)
};

export const projectInchargesApi = {
    list: (params?: any) => api.get('/api/v1/project-incharges', { params }),
    create: (data: any) => api.post('/api/v1/project-incharges', data)
};

export const telemetryApi = {
    getStatuses: () => Promise.resolve({ data: [] }) // Fallback since backend route doesn't exist yet
};
