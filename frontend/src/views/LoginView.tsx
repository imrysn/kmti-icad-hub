import { Eye, EyeOff, Lock, User as UserIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUILD_INFO } from '../generated/buildInfo';
import { useAuth } from '../hooks/useAuth';
import { getSystemStatus } from '../services/api';
import '../styles/LoginView.css';

interface LoginSystemStatus {
    version: string;
    uptimeSeconds: number;
    databaseOnline: boolean | null;
}

const formatUptime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
};

export const LoginView: React.FC = () => {
    const { login, isLoggingIn } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' }); const [localError, setLocalError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [systemStatus, setSystemStatus] = useState<LoginSystemStatus>({
        version: BUILD_INFO.version,
        uptimeSeconds: 0,
        databaseOnline: null,
    });

    // Clear legacy remembered-user data and check for session expiration.
    useEffect(() => {
        localStorage.removeItem('remembered_username');

        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('expired') === 'true') {
            setLocalError('YOUR SESSION HAS EXPIRED. PLEASE LOG IN AGAIN.');
        }

        const refreshSystemStatus = async () => {
            const status = await getSystemStatus();
            setSystemStatus({
                version: BUILD_INFO.version,
                uptimeSeconds: Number(status.uptime_seconds) || 0,
                databaseOnline: typeof status.database_online === 'boolean'
                    ? status.database_online
                    : status.status === 'online',
            });
        };

        void refreshSystemStatus();
        const statusInterval = window.setInterval(refreshSystemStatus, 60000);
        return () => window.clearInterval(statusInterval);
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
            await login({
                username: formData.username,
                password: formData.password,
                remember_me: false
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
                <div className="brand-product-title">TRAINING HUB</div>
                <div className="brand-description">ICAD &amp; SOLIDWORKS TRAINING MANUAL</div>
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
                </form>
            </div>

            <footer className="login-system-footer" aria-live="polite">
                <span>VER {systemStatus.version}</span>
                <span>© {new Date().getFullYear()} KMTI</span>
                <span className="login-footer-status">
                    <span className="login-status-dot is-online" aria-hidden="true" />
                    Uptime: {formatUptime(systemStatus.uptimeSeconds)}
                </span>
                <span className={systemStatus.databaseOnline === false ? 'is-offline' : ''}>
                    <span
                        className={`login-status-dot ${systemStatus.databaseOnline === null ? 'is-checking' : systemStatus.databaseOnline ? 'is-online' : 'is-offline'}`}
                        aria-hidden="true"
                    />
                    Database: {systemStatus.databaseOnline === null ? 'CHECKING' : systemStatus.databaseOnline ? 'ONLINE' : 'OFFLINE'}
                </span>
            </footer>
        </div>
    );
};
