import { Eye,EyeOff,Key,Save,Shield,User as UserIcon } from 'lucide-react';
import { useTranslation } from '../../../context/LanguageContext';
import React,{ useEffect,useState } from 'react';
import { Modal } from '../../../components/Modal';
import { User } from '../../../services/authService';
import { parseBackendError } from '../../../utils/errorUtils';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (userData: any) => Promise<void>;
    user: User | null; // null for 'Add', existing user for 'Edit'
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ username: '', full_name: '', role: 'trainee', password: '', is_active: true });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                full_name: user.full_name,
                role: user.role,
                password: '', // Don't show hashed password
                is_active: user.is_active
            });
        } else {
            setFormData({
                username: '',
                full_name: '',
                role: 'trainee',
                password: '',
                is_active: true
            });
        }
        setError(null);
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await onSave(formData);
            onClose();
        } catch (err: any) {
            setError(parseBackendError(err, 'Failed to save user.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={user ? 'Edit User' : 'Add New User'}
            tag={user ? 'USER_UPDATE' : 'USER_CREATE'}
            size="md"
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {error && <div className="modal-error">{error}</div>}

                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                    <div className="form-group full" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}><Shield size={14} /> {t("admin.system_role")}</label>
                        <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="trainee">{t("admin.role_trainee")}</option>
                            <option value="employee">{t("admin.role_employee")}</option>
                            <option value="admin">{t("admin.role_admin")}</option>
                        </select>
                    </div>

                    <div className="form-group full" style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{t("admin.full_name")}</label>
                        <input type="text" value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder={t("admin.placeholder_name")}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}><UserIcon size={14} /> {t("admin.username")}</label>
                        <input type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })}
                            placeholder="e.g. jd"
                            minLength={2}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}><Key size={14} /> {user ? 'New Password (Optional)' : 'Password'}</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                placeholder={user ? "Leave blank to keep" : "Min 4 characters"}
                                minLength={4}
                                required={!user}
                                style={{ width: '100%', paddingRight: '2rem', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'normal' }}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.5rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4px',
                                    borderRadius: '4px'
                                }}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="global-modal-footer" style={{ marginTop: '1rem' }}>
                    <button type="submit" className="global-btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                        {loading ? <div className="spinner-small"></div> : <Save size={16} />}
                        {user ? 'Update User' : 'Create User'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
