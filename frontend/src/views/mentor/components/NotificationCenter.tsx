import React from 'react';
import { Bell, Trash2, Unlock } from 'lucide-react';

interface NotificationCenterProps {
    unreadCount: number;
    notifications: any[];
    handleMarkAllAsRead: () => void;
    handleClearAll: () => void;
    handleMarkAsRead: (id: number) => void;
    handleDeleteNotification: (id: number) => void;
    handleReviewLaterAndOpenNext: (notif: any) => void;
    setActiveMainTab: (tab: 'assessments' | 'progress' | 'sets' | 'notifications') => void;
    setExpandedTrainees: React.Dispatch<React.SetStateAction<number[]>>;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
    unreadCount,
    notifications,
    handleMarkAllAsRead,
    handleClearAll,
    handleMarkAsRead,
    handleDeleteNotification,
    handleReviewLaterAndOpenNext,
    setActiveMainTab,
    setExpandedTrainees
}) => {
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

    return (
        <div className="notifications-tab-container" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100% - 110px)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>Recent Activities</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '6px',
                                color: 'var(--accent-blue, #3b82f6)',
                                padding: '6px 12px',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            }}
                        >
                            Mark all as read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '6px',
                                color: 'var(--accent-red, #ef4444)',
                                padding: '6px 12px',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                            }}
                        >
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {notifications.length === 0 ? (
                <div className="no-submissions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', opacity: 0.6 }}>
                    <Bell size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <h3>No notifications yet</h3>
                    <p>You will be notified when your trainees perform actions like submitting assignments or completing quizzes.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {notifications.map((notif) => {
                        return (
                            <div
                                key={notif.id}
                                onClick={() => {
                                    if (!notif.is_read) {
                                        handleMarkAsRead(notif.id);
                                    }
                                    if (notif.type === 'new_submission' || notif.type === 'feedback_reply') {
                                        setActiveMainTab('assessments');
                                        if (notif.sender_id) {
                                            setExpandedTrainees(prev => prev.includes(notif.sender_id) ? prev : [...prev, notif.sender_id]);
                                        }
                                    } else if (notif.type === 'lesson_passed' || notif.type === 'course_completed') {
                                        setActiveMainTab('progress');
                                    }
                                }}
                                style={{
                                    background: notif.is_read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(59, 130, 246, 0.04)',
                                    border: notif.is_read ? '1px solid var(--border-color)' : '1px solid rgba(59, 130, 246, 0.25)',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    display: 'flex',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {!notif.is_read && (
                                    <div style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: '4px',
                                        background: 'var(--accent-blue, #3b82f6)',
                                        borderTopLeftRadius: '8px',
                                        borderBottomLeftRadius: '8px'
                                    }} />
                                )}

                                <div className="avatar-circle" style={{ width: '40px', height: '40px', minWidth: '40px', fontSize: '1rem' }}>
                                    {notif.sender?.full_name?.[0] || 'S'}
                                </div>

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                            {notif.sender?.full_name || 'System'}
                                        </span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                {getRelativeTimeString(notif.created_at)}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteNotification(notif.id);
                                                }}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: 'var(--text-muted)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '2px',
                                                    borderRadius: '4px',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = 'var(--accent-red, #ef4444)';
                                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = 'var(--text-muted)';
                                                    e.currentTarget.style.background = 'transparent';
                                                }}
                                                title="Delete Notification"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.9, lineHeight: 1.4 }}>
                                        {notif.message}
                                    </p>
                                    {notif.type && (
                                        <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                fontWeight: 600,
                                                color: notif.type === 'new_submission' ? 'var(--accent-blue, #3b82f6)' :
                                                    notif.type === 'feedback_reply' ? 'var(--accent-orange, #f59e0b)' :
                                                        notif.type === 'course_completed' ? 'var(--accent-green, #22c55e)' :
                                                            notif.type === 'assessment_completion' ? 'var(--accent-purple, #a855f7)' :
                                                                'var(--text-muted)'
                                            }}>
                                                {notif.type.replace('_', ' ')}
                                            </span>
                                            {notif.type === 'assessment_completion' && notif.sender_id && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleReviewLaterAndOpenNext(notif);
                                                    }}
                                                    style={{
                                                        padding: '4px 8px',
                                                        fontSize: '0.75rem',
                                                        background: 'var(--bg-main)',
                                                        border: '1px solid var(--border-color)',
                                                        borderRadius: '4px',
                                                        color: 'var(--text-main)',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-main)'}
                                                >
                                                    <Unlock size={12} /> Review Later & Open Next Set
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
