import { Eye, EyeOff, Lock, User as UserIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import '../styles/LoginView.css';
import { parseBackendError } from '../utils/errorUtils';

export const LoginView: React.FC = () => {
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
                <span className="login-logo-text">KMTI</span>
                <div className="brand-subtitle">TRAINING HUB</div>
                <div className="brand-subtitle">ICAD MANUAL AND STANDARD</div>
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

                    <div className="login-options-row">
                        <label className="remember-me-checkbox">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>REMEMBER ME</span>
                        </label>
                        <button type="button" className="forgot-password-btn" onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                    </div>

                    {localError && <div className="local-error-msg">{localError}</div>}

                    <button type="submit" className="glass-login-btn" disabled={isLoggingIn}>
                        {isLoggingIn ? 'Logging...' : 'SIGN IN'}
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
                containerClassName="login-theme-modal"
            >
                {forgotPasswordMessage && (
                    <p className="modal-success-msg">{forgotPasswordMessage}</p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="input-group">
                        <label htmlFor="forgot-email" className="modal-field-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.45rem', color: 'inherit', opacity: 0.7 }}>EMAIL OR USERNAME</label>
                        <input id="forgot-email" type="text" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            placeholder="Email or Username"
                            disabled={isForgotPasswordSubmitting}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'inherit',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <div className="modal-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button onClick={handleForgotPasswordCancel} className="global-btn-secondary" disabled={isForgotPasswordSubmitting}>
                            Cancel
                        </button>
                        <button onClick={handleForgotPasswordSubmit} className="global-btn-primary" disabled={!forgotPasswordEmail.trim() || isForgotPasswordSubmitting}>
                            {isForgotPasswordSubmitting ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
