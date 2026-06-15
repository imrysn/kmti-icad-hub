import axios from 'axios';

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

// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
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
