import axios from 'axios';

// Migration logic removed to allow testing on port 8000 locally
const isElectron = navigator.userAgent.toLowerCase().includes('electron');
const defaultHost = isElectron ? '127.0.0.1' : (typeof window !== 'undefined' && window.location && window.location.hostname ? window.location.hostname : '127.0.0.1');

const storedApiUrl = (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') ? window.localStorage.getItem('custom_api_url') : null;
const API_BASE_URL = storedApiUrl || (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) || `http://${defaultHost}:3001`;

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
    (error) => {
        const method = error.config?.method?.toLowerCase();
        if (method && ['post', 'put', 'delete', 'patch'].includes(method)) {
            invalidateCache();
        }

        // Token expired or invalid - force auto-logout
        const isLoginRequest = error?.config?.url?.includes('login');
        const isAtLoginRoot = window.location.hash === '#/' || window.location.hash.startsWith('#/login');

        if (error.response?.status === 401 && !isLoginRequest && !isAtLoginRoot) {
            console.warn('Authentication failure - token expired. Auto-logging out.');
            
            // Clear session data
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('kmti_') || key.startsWith('assistant-') || key.startsWith('properties-')) {
                    localStorage.removeItem(key);
                }
            });
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user');
            
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

export const quotationApi = {
    get: (id: number | string) => api.get(`/api/v1/quotations/${id}`),
    list: (params?: any) => api.get('/api/v1/quotations/', { params }),
    create: (data: any) => api.post('/api/v1/quotations/', data),
    update: (id: number | string, data: any) => api.patch(`/api/v1/quotations/${id}`, data),
    delete: (id: number | string, workstation?: string, permanent?: boolean, computer_name?: string) => 
        api.delete(`/api/v1/quotations/${id}`, { params: { workstation, permanent, computer_name } }),
    getSessions: () => api.get('/api/v1/quotations/sessions'),
    restore: (id: number | string, password?: string) => api.post(`/api/v1/quotations/${id}/restore`, { password }),
    verifyPassword: (id: number | string, password?: string) => api.post(`/api/v1/quotations/${id}/verify`, { password }),
    updateBilling: (id: number | string, data: any) => api.patch(`/api/v1/quotations/${id}/billing`, data),
    getHistory: (id: number | string) => api.get(`/api/v1/quotations/${id}/history`),
    restoreHistory: (id: number | string, historyId: number | string) => api.post(`/api/v1/quotations/${id}/history/${historyId}/restore`)
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
