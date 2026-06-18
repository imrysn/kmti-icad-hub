import axios from 'axios';

// Auto-migrate legacy port 8000 to 3001
if (typeof window !== 'undefined') {
    const legacyUrl = window.localStorage.getItem('custom_api_url');
    if (legacyUrl && legacyUrl.includes(':8000')) {
        const migratedUrl = legacyUrl.replace(':8000', ':3001');
        window.localStorage.setItem('custom_api_url', migratedUrl);
    }
}

const isElectron = navigator.userAgent.toLowerCase().includes('electron');
const defaultHost = isElectron ? '127.0.0.1' : (typeof window !== 'undefined' && window.location && window.location.hostname ? window.location.hostname : '127.0.0.1');

const storedApiUrl = typeof window !== 'undefined' ? window.localStorage.getItem('custom_api_url') : null;
const API_BASE_URL = storedApiUrl || (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) || `http://${defaultHost}:3001`;

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
        const base = config.baseURL || API_BASE_URL;
        if (config.url && !config.url.startsWith('http') && !config.url.startsWith('//') && base) {
            config.url = `${base.replace(/\/$/, '')}${config.url}`;
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

        // Token expired or invalid - clear auth and redirect to login
        const isLoginRequest = error?.config?.url?.includes('login');
        const isAtLoginRoot = window.location.pathname === '/' || window.location.pathname === '/login';

        if (error.response?.status === 401 && !isLoginRequest && !isAtLoginRoot) {
            console.warn('Authentication failure - clearing session and redirecting');
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user');
            
            if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
                window.location.href = '/login?expired=true'; 
            }
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
