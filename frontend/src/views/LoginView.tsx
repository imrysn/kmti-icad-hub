import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; import { Eye, EyeOff, User as UserIcon, Lock, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth'; import { authService } from '../services/authService';
import '../styles/LoginView.css';
import kmtiLogo from '../assets/kmti-training-hub.png';
import LightPillar from '../components/LightPillar';
import { parseBackendError } from '../utils/errorUtils';
import { Modal } from '../components/Modal';

export const LoginView: React.FC = () => {
    const { login, isLoggingIn, error } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' }); const [localError, setLocalError] = useState('');
    const [showPassword, setShowPassword] = useState(false); const [rememberMe, setRememberMe] = useState(false);

    // Custom API Server Settings State
    const [showApiSettingsModal, setShowApiSettingsModal] = useState(false);
    const [customApiUrl, setCustomApiUrl] = useState(localStorage.getItem('custom_api_url') || '');

    // Forgot Password State
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState(''); const [isForgotPasswordSubmitting, setIsForgotPasswordSubmitting] = useState(false);

    // Load remembered username on mount and check for session expiration
    useEffect(() => {
        const rememberedUser = localStorage.getItem('remembered_username');
        if (rememberedUser) {
            setFormData(prev => ({ ...prev, username: rememberedUser }));
            setRememberMe(true);
        }

        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('expired') === 'true') {
            setLocalError('YOUR SESSION HAS EXPIRED. PLEASE LOG IN AGAIN.');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (!formData.username || !formData.password) {
            setLocalError('PLEASE ENTER BOTH USER NAME AND PASSWORD');
            return;
        }

        try {
            // Handle Remember Me persistence
            if (rememberMe) {
                localStorage.setItem('remembered_username', formData.username);
            } else {
                localStorage.removeItem('remembered_username');
            }

            await login({
                username: formData.username,
                password: formData.password,
                remember_me: rememberMe
            });
            // Explicitly navigate to home to trigger role-based redirect in App.tsx
            if (window.electronAPI) {
                window.electronAPI.maximize();
            }
            navigate('/');
        } catch (err: any) {
            setLocalError(err.message || 'LOGIN FAILED. CHECK YOUR CREDENTIALS.');
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
            setForgotPasswordMessage(parseBackendError(err, 'Failed to send reset request. Please try again later.'));
        } finally {
            setIsForgotPasswordSubmitting(false);
        }
    };

    const handleSaveApiUrl = () => {
        if (customApiUrl.trim()) {
            localStorage.setItem('custom_api_url', customApiUrl.trim());
        } else {
            localStorage.removeItem('custom_api_url');
        }
        setShowApiSettingsModal(false);
        window.location.reload();
    };

    return (
        <div className="unified-login-container">
            <div className="app-drag-region"></div>
            <LightPillar />
            <div className="ambient-particles"></div>

            <button
                type="button"
                className="login-settings-btn"
                onClick={() => setShowApiSettingsModal(true)}
                title="API Server Settings"
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: '#a0aec0',
                    cursor: 'pointer',
                    zIndex: 110,
                    WebkitAppRegion: 'no-drag',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Settings size={20} />
            </button>

            <div className="login-brand-header">
                <span className="login-logo-text">KMTI</span>
                <div className="brand-subtitle">ICAD MANUAL</div>
                <div className="brand-subtitle">TRAINING AND ASSISTANT</div>
            </div>

            <div className="login-form-wrapper">

                <form onSubmit={handleSubmit} className="glass-form">
                    <div className="input-group">
                        <label>USERNAME</label>
                        <div className="input-wrapper">
                            <UserIcon className="input-icon" size={20} />
                            <input type="text" name="username" value={formData.username} onChange={handleInputChange} disabled={isLoggingIn} placeholder="Enter username" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>PASSWORD</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} disabled={isLoggingIn} placeholder="••••••••" />
                            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {localError && <div className="local-error-msg">{localError}</div>}

                    <button type="submit" className="glass-login-btn" disabled={isLoggingIn}>
                        {isLoggingIn ? 'Logging...' : 'SIGN IN'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <button type="button" className="forgot-password-btn" onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                    </div>
                </form>
            </div>

            {/* Forgot Password Modal */}
            <Modal
                isOpen={showForgotPasswordModal}
                onClose={handleForgotPasswordCancel}
                title="Forgot Password"
                tag="AUTH_RECOVERY"
                size="sm"
            >
                {forgotPasswordMessage && (
                    <p className="modal-success-msg">{forgotPasswordMessage}</p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="input-group">
                        <label htmlFor="forgot-email" className="modal-field-label">Email or Username</label>
                        <input id="forgot-email" type="text" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            placeholder="Email or Username"
                            disabled={isForgotPasswordSubmitting}
                            style={{
                                width: '100%',
                                padding: '0.625rem 0.875rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-surface)',
                                color: 'var(--text-main)',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div className="modal-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button onClick={handleForgotPasswordCancel} className="cancel-button" disabled={isForgotPasswordSubmitting}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            Cancel
                        </button>
                        <button onClick={handleForgotPasswordSubmit} className="submit-button" disabled={!forgotPasswordEmail.trim() || isForgotPasswordSubmitting}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '8px',
                                fontSize: '0.8125rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'var(--primary)',
                                color: '#ffffff'
                            }}
                        >
                            {isForgotPasswordSubmitting ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* API Settings Modal */}
            <Modal
                isOpen={showApiSettingsModal}
                onClose={() => setShowApiSettingsModal(false)}
                title="API Server Configuration"
                tag="SYSTEM_CONFIG"
                size="sm"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Configure the remote server URL (e.g. http://192.168.200.105:3001). Leave empty to use local server.
                    </p>
                    <div className="input-group">
                        <label htmlFor="custom-api-url" className="modal-field-label">Server URL</label>
                        <input
                            id="custom-api-url"
                            type="text"
                            value={customApiUrl}
                            onChange={(e) => setCustomApiUrl(e.target.value)}
                            placeholder="http://127.0.0.1:3001"
                            style={{
                                width: '100%',
                                padding: '0.625rem 0.875rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-surface)',
                                color: 'var(--text-main)',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div className="modal-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button onClick={() => setShowApiSettingsModal(false)} className="cancel-button"
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            Cancel
                        </button>
                        <button onClick={handleSaveApiUrl} className="submit-button"
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '8px',
                                fontSize: '0.8125rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'var(--primary)',
                                color: '#ffffff'
                            }}
                        >
                            Save & Restart
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
