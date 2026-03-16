import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, User as UserIcon, Mail, Shield, Key } from 'lucide-react';
import { User } from '../../../services/authService';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (userData: any) => Promise<void>;
    user: User | null; // null for 'Add', existing user for 'Edit'
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        full_name: '',
        role: 'trainee',
        password: '',
        is_active: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                password: '', // Don't show hashed password
                is_active: user.is_active
            });
        } else {
            setFormData({
                username: '',
                email: '',
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
            setError(err.response?.data?.detail || 'Failed to save user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal-content user-modal">
                <header className="admin-modal-header">
                    <div className="title-area">
                        {user ? <UserIcon size={20} /> : <UserPlus size={20} />}
                        <h3>{user ? 'Edit User' : 'Add New User'}</h3>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </header>

                <form onSubmit={handleSubmit} className="modal-body">
                    {error && <div className="modal-error">{error}</div>}

                    <div className="form-grid">
                        <div className="form-group full">
                            <label><UserIcon size={14} /> Username</label>
                            <input 
                                type="text" 
                                value={formData.username} 
                                onChange={e => setFormData({...formData, username: e.target.value})}
                                disabled={!!user} // Username usually immutable
                                placeholder="e.g. jdoe"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label><Mail size={14} /> Email Address</label>
                            <input 
                                type="email" 
                                value={formData.email} 
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                placeholder="john.doe@example.com"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                value={formData.full_name} 
                                onChange={e => setFormData({...formData, full_name: e.target.value})}
                                placeholder="John Doe"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label><Shield size={14} /> System Role</label>
                            <select 
                                value={formData.role} 
                                onChange={e => setFormData({...formData, role: e.target.value})}
                            >
                                <option value="trainee">Trainee</option>
                                <option value="employee">Employee</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><Key size={14} /> {user ? 'New Password (Optional)' : 'Password'}</label>
                            <input 
                                type="password" 
                                value={formData.password} 
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                placeholder={user ? "Leave blank to keep current" : "Min 8 characters"}
                                required={!user}
                            />
                        </div>
                    </div>

                    <div className="admin-modal-footer">
                        <button type="button" className="admin-btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="admin-btn-primary" disabled={loading}>
                            {loading ? <div className="spinner-small"></div> : <Save size={16} />}
                            {user ? 'Update User' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
