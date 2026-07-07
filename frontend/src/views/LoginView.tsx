import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; import { Eye, EyeOff, User as UserIcon, Lock, X, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth'; import { authService } from '../services/authService';
import '../styles/LoginView.css';
import kmtiLogo from '../assets/kmti-training-hub.png';
import LightPillar from '../components/LightPillar';
import { parseBackendError } from '../utils/errorUtils';
import { Modal } from '../components/Modal';

export const LoginView: React.FC = () => {
    const { login, isLoggingIn, error } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
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
            setLocalError(t('login.session_expired'));
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
            setLocalError(t('login.both_required'));
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
            setLocalError(err.message || t('login.failed'));
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
            setForgotPasswordMessage(parseBackendError(err, t('forgot_password.failed')));
        } finally {
            setIsForgotPasswordSubmitting(false);
        }
    };

    const handleSaveApiUrl = () => {
        let url = customApiUrl.trim();
        if (url) {
            // Strip trailing slashes and duplicate /api/v1 suffix to avoid double pathing
            url = url.replace(/\/$/, '').replace(/\/api\/v1$/, '');
            localStorage.setItem('custom_api_url', url);
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
            >
                <Settings size={20} />
            </button>

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
                <span className="login-logo-text">KMTI</span>
                <div className="brand-subtitle">{t('login.brand_subtitle_1')}</div>
                <div className="brand-subtitle">{t('login.brand_subtitle_2')}</div>
            </div>

            <div className="login-form-wrapper">

                <form onSubmit={handleSubmit} className="glass-form">
                    <div className="input-group">
                        <label>{t('login.username')}</label>
                        <div className="input-wrapper">
                            <UserIcon className="input-icon" size={20} />
                            <input type="text" name="username" value={formData.username} onChange={handleInputChange} disabled={isLoggingIn} placeholder={t('login.placeholder_username')} />
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
                        {isLoggingIn ? t('login.signing_in') : t('login.signin')}
                    </button>
                </form>
            </div>

            {/* Forgot Password Modal */}
            <Modal
                isOpen={showForgotPasswordModal}
                onClose={handleForgotPasswordCancel}
                title={t('forgot_password.title')}
                tag="AUTH_RECOVERY"
                size="sm"
            >
                {forgotPasswordMessage && (
                    <p className="modal-success-msg">{forgotPasswordMessage}</p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="input-group">
                        <label htmlFor="forgot-email" className="modal-field-label">{t('forgot_password.email_label')}</label>
                        <input id="forgot-email" type="text" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            placeholder={t('forgot_password.email_placeholder')}
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
                            {t('forgot_password.cancel')}
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
                            {isForgotPasswordSubmitting ? t('forgot_password.sending') : t('forgot_password.send')}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* API Settings Modal */}
            <Modal
                isOpen={showApiSettingsModal}
                onClose={() => setShowApiSettingsModal(false)}
                title="Settings"
                tag="SYSTEM_CONFIG"
                size="sm"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Language Selection */}
                    <div>
                        <label className="modal-field-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                            {t('api_settings.language_label')}
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {(['en', 'ja'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => {
                                        i18n.changeLanguage(lang);
                                        localStorage.setItem('app-language', lang);
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        borderRadius: '8px',
                                        fontSize: '0.8125rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        border: '1px solid',
                                        transition: 'all 0.2s ease',
                                        background: i18n.language === lang ? 'var(--primary)' : 'transparent',
                                        color: i18n.language === lang ? '#ffffff' : 'var(--text-muted)',
                                        borderColor: i18n.language === lang ? 'var(--primary)' : 'var(--border-color)',
                                    }}
                                >
                                    {lang === 'en' ? '🇺🇸  English' : '🇯🇵  日本語'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid var(--border-color)' }} />

                    {/* API Server URL */}
                    <div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                            {t('api_settings.description')}
                        </p>
                        <div className="input-group">
                            <label htmlFor="custom-api-url" className="modal-field-label">{t('api_settings.server_url_label')}</label>
                            <input
                                id="custom-api-url"
                                type="text"
                                value={customApiUrl}
                                onChange={(e) => setCustomApiUrl(e.target.value)}
                                placeholder={t('api_settings.server_url_placeholder')}
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
                    </div>

                    <div className="modal-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
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
                            {t('common.cancel')}
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
                            {t('api_settings.save')}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
