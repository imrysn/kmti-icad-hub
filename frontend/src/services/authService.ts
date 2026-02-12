import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface LoginCredentials {
    username: string;
    password: string;
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
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

const authApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    /**
     * Login with username and password
     */
    async login(credentials: LoginCredentials): Promise<TokenResponse> {
        const response = await authApi.post<TokenResponse>('/auth/login', credentials);

        // Store token in localStorage
        localStorage.setItem('access_token', response.data.access_token);

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

        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));

        return response.data;
    },

    /**
     * Logout - clear stored credentials
     */
    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    },

    /**
     * Get stored user from localStorage
     */
    getStoredUser(): User | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    }
};
