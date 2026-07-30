import { Eye, EyeOff, Lock, User as UserIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import '../styles/LoginView.css';
import { parseBackendError } from '../utils/errorUtils';
import { useTranslation } from '../context/LanguageContext';
import kmtiSymbolLogo from '../assets/logo/kmti_logo.png';

export const LoginView: React.FC = () => {
    const { t } = useTranslation();
    const { login, isLoggingIn } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' }); const [localError, setLocalError] = useState('');
    const [showPassword, setShowPassword] = useState(false); const [rememberMe, setRememberMe] = useState(false);

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

    return (
        <div className="unified-login-container">
            <div className="app-drag-region"></div>
            <div className="ambient-particles"></div>

            <button
                type="button"
                className="login-close-btn"
                onClick={() => {
                    if (window.electronAPI) {
                        window.electronAPI.close();
                    } else {
                        window.close();
                    }
                }}
                title="Close Application"
            >
                <X size={20} />
            </button>

            <div className="login-brand-header">
                <div className="login-logo-stack" aria-label="KMTI">
                    <img className="login-symbol-logo" src={kmtiSymbolLogo} alt="KMTI" draggable={false} />
                </div>
                <div className="brand-subtitle">{t('login.subtitle_1') || 'ICAD COURSE'}</div>
                <div className="brand-subtitle">{t('login.subtitle_2') || 'COMPLETE TRAINING & PRACTICES'}</div>
            </div>

            <div className="login-form-wrapper">

                <form onSubmit={handleSubmit} className="glass-form">
                    <div className="input-group">
                        <label>{t('login.username')}</label>
                        <div className="input-wrapper">
                            <UserIcon className="input-icon" size={20} />
                            <input type="text" name="username" value={formData.username} onChange={handleInputChange} disabled={isLoggingIn} placeholder={t('login.username_placeholder') || 'Enter username'} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>{t('login.password')}</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} disabled={isLoggingIn} placeholder="••••••••" />
                            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="login-options-row">
                        <label className="remember-me-checkbox">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>{t('login.remember_me')}</span>
                        </label>
                        <button type="button" className="forgot-password-btn" onClick={handleForgotPassword}>
                            {t('login.forgot_password')}
                        </button>
                    </div>

                    {localError && <div className="local-error-msg">{localError}</div>}

                    <button type="submit" className="glass-login-btn" disabled={isLoggingIn}>
                        {isLoggingIn ? (t('common.loading') || 'Logging...') : t('login.btn')}
                    </button>
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
        </div >
    );
};
