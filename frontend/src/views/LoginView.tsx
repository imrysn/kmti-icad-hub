import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import '../styles/LoginView.css';
import kmtiLogo from '../assets/kmti_logo.png';
import LightPillar from '../components/LightPillar';

export const LoginView: React.FC = () => {
    const { login, isLoggingIn, error } = useAuth();
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

    // Load remembered username on mount
    useEffect(() => {
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
            // Navigation will happen automatically via App.tsx when user state updates
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
            <LightPillar />
            <div className="main-login-card">
                {/* Left Side - Welcome Section */}
                <div className="welcome-section">
                    <div className="welcome-content">
                        <div className="logo-container">
                            <img src={kmtiLogo} alt="KMTI Logo" className="login-logo" />
                        </div>
                        <div className="system-name">
                            <p>iCAD Manual Hub</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="login-section">
                    <div className="login-form-container">
                        <div className="login-header">
                            <h2>Sign in</h2>
                        </div>

                        {/* Toggle Switch */}
                        <div className="login-toggle">
                            <button
                                type="button"
                                className={`toggle-switch ${loginType}`}
                                onClick={handleToggle}
                                aria-label={`Switch to ${loginType === 'user' ? 'Admin' : 'User'} login`}
                            >
                                <span className="toggle-slider"></span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled={isLoggingIn}
                                    placeholder="User Name"
                                    className={localError ? 'error' : ''}
                                />
                            </div>

                            <div className="form-group">
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={isLoggingIn}
                                        placeholder="Password"
                                        className={localError ? 'error' : ''}
                                    />
                                    <button
                                        type="button"
                                        className="show-password-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'HIDE' : 'SHOW'}
                                    </button>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="remember-me">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className="checkmark"></span>
                                    Remember me
                                </label>
                                <button
                                    type="button"
                                    className="forgot-password"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {(error || localError) && (
                                <div className="api-error">
                                    {error || localError}
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`login-button ${loginType}`}
                                disabled={isLoggingIn}
                            >
                                {isLoggingIn ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
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
