import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import '../styles/LoginView.css';
import kmtiLogo from '../assets/kmti_logo.png';
import LightPillar from '../components/LightPillar';

declare global {
    interface Window {
        electronAPI: {
            flashWindow: () => void;
            setWindowSize: (width: number, height: number, resizable: boolean) => void;
        };
    }
}

export const LoginView: React.FC = () => {
    const { login, isLoggingIn, error } = useAuth();
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [localError, setLocalError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Forgot Password State
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
    const [isForgotPasswordSubmitting, setIsForgotPasswordSubmitting] = useState(false);

    // Load remembered username on mount and set window size
    useEffect(() => {
        // Set small fixed size for login
        if (window.electronAPI) {
            window.electronAPI.setWindowSize(440, 550, false);
        }

        const rememberedUser = localStorage.getItem('remembered_username');
        if (rememberedUser) {
            setFormData(prev => ({ ...prev, username: rememberedUser }));
            setRememberMe(true);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (localError) setLocalError('');
    };

    const handleToggle = () => {
        setLoginType(prev => prev === 'user' ? 'admin' : 'user');
        // Pre-fill username if toggle changes but remember me was active
        const rememberedUser = localStorage.getItem('remembered_username');
        setFormData({
            username: rememberedUser || '',
            password: ''
        });
        setLocalError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (!formData.username || !formData.password) {
            setLocalError('Please enter both username and password');
            return;
        }

        try {
            // Handle Remember Me persistence
            if (rememberMe) {
                localStorage.setItem('remembered_username', formData.username);
            } else {
                localStorage.removeItem('remembered_username');
            }

            // Pass required_role to enforce toggle logic on the backend
            // Admin toggle requires 'admin' role
            // User toggle requires NO 'admin' role (handled by 'user' check in backend)
            const required_role = loginType === 'admin' ? 'admin' : 'user';
            await login({
                username: formData.username,
                password: formData.password,
                remember_me: rememberMe,
                required_role
            });
            // Explicitly navigate to home to trigger role-based redirect in App.tsx
            if (window.electronAPI) {
                window.electronAPI.setWindowSize(1280, 720, true);
            }
            navigate('/');
        } catch (err: any) {
            setLocalError(err.message || 'Login failed');
        }
    };

    const handleForgotPassword = () => {
        setShowForgotPasswordModal(true);
        setForgotPasswordEmail('');
        setForgotPasswordMessage('');
    };

    const handleForgotPasswordCancel = () => {
        setShowForgotPasswordModal(false);
        setForgotPasswordEmail('');
        setForgotPasswordMessage('');
    };

    const handleForgotPasswordSubmit = async () => {
        if (!forgotPasswordEmail.trim()) return;

        setIsForgotPasswordSubmitting(true);
        try {
            const response = await authService.forgotPassword(forgotPasswordEmail);
            setForgotPasswordMessage(response.message);
            // Close modal after delay
            setTimeout(() => {
                setShowForgotPasswordModal(false);
            }, 3000);
        } catch (err: any) {
            setForgotPasswordMessage(err.response?.data?.detail || 'Failed to send reset request. Please try again later.');
        } finally {
            setIsForgotPasswordSubmitting(false);
        }
    };

    return (
        <div className="unified-login-container">
            <div className="app-drag-region"></div>
            <LightPillar />
            <div className="ambient-particles"></div>

            <div className="login-brand-header">
                <span className="login-logo-text">KMTI</span>
                <h1 className="brand-title">ICAD MANUAL <br /> TRAINING AND ASSISTANT </h1>
            </div>

            <div className="login-form-wrapper">

                <form onSubmit={handleSubmit} className="glass-form">
                    <div className="input-group">
                        <label>Email address</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={isLoggingIn}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoggingIn}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="password-toggle-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="glass-login-btn"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
                <div className="modal-overlay" onClick={handleForgotPasswordCancel}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {forgotPasswordMessage && (
                            <p className="modal-success-msg">{forgotPasswordMessage}</p>
                        )}
                        <label htmlFor="forgot-email" className="modal-field-label">Email or Username</label>
                        <input
                            id="forgot-email"
                            type="text"
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            placeholder="Email or Username"
                            disabled={isForgotPasswordSubmitting}
                        />
                        <div className="modal-buttons">
                            <button
                                onClick={handleForgotPasswordCancel}
                                className="cancel-button"
                                disabled={isForgotPasswordSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleForgotPasswordSubmit}
                                className="submit-button"
                                disabled={!forgotPasswordEmail.trim() || isForgotPasswordSubmitting}
                            >
                                {isForgotPasswordSubmitting ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
