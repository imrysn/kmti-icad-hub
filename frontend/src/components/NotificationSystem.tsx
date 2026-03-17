import React from 'react';
import { useNotification, Notification } from '../context/NotificationContext';
import { CheckCircle2, AlertCircle, Info, Megaphone, X } from 'lucide-react';
import '../styles/NotificationSystem.css';

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { dismissNotification } = useNotification();

    const icons = {
        success: <CheckCircle2 size={18} />,
        error: <AlertCircle size={18} />,
        info: <Info size={18} />,
        warning: <Megaphone size={18} />,
    };

    return (
        <div className={`notification-item ${notification.type}`}>
            <div className="notification-icon">
                {icons[notification.type]}
            </div>
            <div className="notification-message">
                {notification.message}
            </div>
            <button 
                className="notification-close" 
                onClick={() => dismissNotification(notification.id)}
                aria-label="Close"
            >
                <X size={16} />
            </button>
            {notification.duration && notification.duration > 0 && (
                <div 
                    className="notification-progress" 
                    style={{ animationDuration: `${notification.duration}ms` }} 
                />
            )}
        </div>
    );
};

export const NotificationSystem: React.FC = () => {
    const { notifications } = useNotification();

    return (
        <div className="notification-system">
            {notifications.map(n => (
                <NotificationItem key={n.id} notification={n} />
            ))}
        </div>
    );
};
