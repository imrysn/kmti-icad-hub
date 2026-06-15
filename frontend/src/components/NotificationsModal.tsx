import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, X, RefreshCw, Eye } from 'lucide-react';
import { Modal } from './Modal';
import { api } from '../services/api';
import { useNotification } from '../context/NotificationContext';

interface NotificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
    const { showNotification } = useNotification();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/v1/notifications');
            setNotifications(response.data || []);
        } catch (err) {
            console.error('Failed to load notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    const handleMarkAsRead = async (id: number) => {
        try {
            await api.post(`/api/v1/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            // Dispatch event to refresh unread count in header
            window.dispatchEvent(new CustomEvent('kmti-refresh-unread-count'));
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await api.post('/api/v1/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            showNotification('All notifications marked as read.', 'success');
            window.dispatchEvent(new CustomEvent('kmti-refresh-unread-count'));
        } catch (err) {
            showNotification('Failed to mark notifications as read.', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/api/v1/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
            window.dispatchEvent(new CustomEvent('kmti-refresh-unread-count'));
        } catch (err) {
            console.error('Failed to delete notification:', err);
        }
    };

    const handleClearAll = async () => {
        if (!window.confirm('Are you sure you want to clear all notifications?')) return;
        try {
            await api.delete('/api/v1/notifications/clear-all');
            setNotifications([]);
            showNotification('All notifications cleared.', 'success');
            window.dispatchEvent(new CustomEvent('kmti-refresh-unread-count'));
        } catch (err) {
            showNotification('Failed to clear notifications.', 'error');
        }
    };

    const getRelativeTimeString = (dateString: string) => {
        const date = new Date(dateString);
        const diffMs = new Date().getTime() - date.getTime();
        if (diffMs <= 0) return 'Just now';
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d ago`;
    };

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Notification Center"
            tag="NOTIFICATIONS_CENTER"
            size="md"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '350px', maxHeight: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {unreadCount} unread • {notifications.length} total
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={fetchNotifications}
                            disabled={loading}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                color: 'var(--text-main)',
                                padding: '4px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                height: '28px'
                            }}
                            title="Refresh"
                        >
                            <RefreshCw size={12} className={loading ? 'spinning' : ''} />
                        </button>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                style={{
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    borderRadius: '4px',
                                    color: 'var(--color-primary)',
                                    padding: '4px 8px',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    height: '28px'
                                }}
                            >
                                Read All
                            </button>
                        )}
                        {notifications.length > 0 && (
                            <button
                                onClick={handleClearAll}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '4px',
                                    color: 'var(--color-error)',
                                    padding: '4px 8px',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    height: '28px'
                                }}
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '4px' }}>
                    {loading && notifications.length === 0 ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, color: 'var(--text-muted)' }}>
                            <div className="spinner" style={{ width: '24px', height: '24px', borderWidth: '2px' }}></div>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, opacity: 0.6, padding: '2rem 0' }}>
                            <Bell size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
                            <h4 style={{ margin: 0, color: 'var(--text-main)' }}>No notifications yet</h4>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                You will see activity logs and event alerts here.
                            </p>
                        </div>
                    ) : (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                style={{
                                    background: notif.is_read ? 'rgba(255, 255, 255, 0.01)' : 'rgba(221, 77, 250, 0.03)',
                                    border: notif.is_read ? '1px solid var(--border-color)' : '1px solid rgba(221, 77, 250, 0.2)',
                                    borderRadius: '6px',
                                    padding: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    position: 'relative',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {!notif.is_read && (
                                    <div style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: '3px',
                                        background: 'var(--color-primary)',
                                        borderTopLeftRadius: '6px',
                                        borderBottomLeftRadius: '6px'
                                    }} />
                                )}
                                <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-muted)',
                                    flexShrink: 0
                                }}>
                                    <Bell size={14} />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                                        {notif.message}
                                    </p>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                                        {getRelativeTimeString(notif.created_at)}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                                    {!notif.is_read && (
                                        <button
                                            onClick={() => handleMarkAsRead(notif.id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--color-primary)',
                                                cursor: 'pointer',
                                                padding: '2px',
                                                borderRadius: '3px'
                                            }}
                                            title="Mark as Read"
                                        >
                                            <Check size={14} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(notif.id)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--text-dim)',
                                            cursor: 'pointer',
                                            padding: '2px',
                                            borderRadius: '3px'
                                        }}
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Modal>
    );
};
