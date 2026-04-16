import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
        // Skip redirect for login attempts so UI can show error message
        const isLoginRequest = error.config.url?.includes('login');
        const isAtLoginRoot = window.location.pathname === '/' || window.location.pathname === '/login';

        if (error.response?.status === 401 && !isLoginRequest && !isAtLoginRoot) {
            console.warn('Authentication failure - clearing session and redirecting');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            
            // Avoid redundant reloads if already redirecting
            if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
                window.location.href = '/'; 
            }
        }
        return Promise.reject(error);
    }
);

export default api;
export { api };

// Search knowledge base
export const searchKnowledgeBase = async (query: string) => {
    const response = await api.get(`/search?query=${encodeURIComponent(query)}`);
    return response.data;
};

// Get available courses
export const getCourses = async () => {
    const response = await api.get('/courses');
    return response.data;
};

// Get user progress for a course
export const getUserProgress = async (courseId: string, userId: string) => {
    const response = await api.get(`/courses/${courseId}/progress/${userId}`);
    return response.data;
};
