import axios from 'axios';

// Single source of truth for the API base URL.
// authService.ts previously hardcoded 'http://localhost:8000' — now uses the
// shared config so VITE_API_URL is honoured in all environments.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface LoginCredentials {
    username: string;
    password: string;
    remember_me?: boolean;
    required_role?: "trainee" | "employee" | "admin" | "user";
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    full_name: string;
    role: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    created_at?: string;
    last_login?: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
    user: User;
}

// Shared Axios instance — reuses the same interceptors as api.ts so that
// 401 handling, token injection, and base URL config are all in one place.
const authApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Bearer token to every request
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Automatically clear auth state on 401 (expired / invalid token)
authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only redirect if NOT a login attempt AND not already on the login page.
        // This prevents failed logins from refreshing the page and clearing error messages.
        const isLoginRequest = error.config.url?.includes('login');
        const isAtLoginRoot = window.location.pathname === '/' || window.location.pathname === '/login';

        if (error.response?.status === 401 && !isLoginRequest && !isAtLoginRoot) {
            console.warn('Authentication failure - clearing session and redirecting');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            
            if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    /**
     * Login with username and password
     */
    async login(credentials: LoginCredentials): Promise<TokenResponse> {
        const response = await authApi.post<TokenResponse>('/auth/login', credentials);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    },

    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<User> {
        const response = await authApi.post<User>('/auth/register', data);
        return response.data;
    },

    /**
     * Get current user information
     */
    async getCurrentUser(): Promise<User> {
        const response = await authApi.get<User>('/auth/me');
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    },

    /**
     * Request a password reset
     */
    async forgotPassword(usernameOrEmail: string): Promise<{ message: string }> {
        const response = await authApi.post('/auth/forgot-password', {
            username_or_email: usernameOrEmail
        });
        return response.data;
    },

    /**
     * Fetch all users (admin only)
     */
    async getUsers(): Promise<User[]> {
        const response = await authApi.get<User[]>('/auth/users');
        return response.data;
    },

    /**
     * Toggle a user's active status (admin only)
     */
    async toggleUserStatus(userId: number): Promise<{ id: number; username: string; is_active: boolean }> {
        const response = await authApi.patch(`/auth/users/${userId}/status`);
        return response.data;
    },

    /**
     * Get lesson progress for a specific course
     */
    async getLessonProgress(course_id: string): Promise<any[]> {
        const response = await authApi.get<any[]>(`/auth/progress/${course_id}`);
        return response.data;
    },

    /**
     * Submit a quiz score for a specific lesson
     */
    async submitQuiz(data: { course_id: string, lesson_id: string, score: number }): Promise<any> {
        const response = await authApi.post<any>('/auth/submit-quiz', data);
        return response.data;
    },

    /**
     * Logout and clear local storage
     */
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    },

    /**
     * Get stored user information
     */
    getStoredUser(): User | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};
