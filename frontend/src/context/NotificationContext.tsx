import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    duration?: number;
    redirectTo?: string;
}

interface NotificationContextType {
    notifications: Notification[];
    showNotification: (message: string, type?: NotificationType, duration?: number, redirectTo?: string) => void;
    dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const lastInfoTimeRef = useRef<number>(0);

    const dismissNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const showNotification = useCallback((message: string, type: NotificationType = 'success', duration: number = 3000, redirectTo?: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        const now = Date.now();
        
        let delay = 0;
        if (type === 'success' || type === 'error') {
            const timeSinceLastInfo = now - lastInfoTimeRef.current;
            if (timeSinceLastInfo < 3000) {
                delay = 3000 - timeSinceLastInfo;
            }
        }

        if (type === 'info') {
            lastInfoTimeRef.current = now;
        }

        const trigger = () => {
            const newNotification: Notification = { id, message, type, duration, redirectTo };
            setNotifications(prev => [...prev, newNotification]);

            if (duration > 0) {
                setTimeout(() => {
                    dismissNotification(id);
                }, duration);
            }
        };

        if (delay > 0) {
            setTimeout(trigger, delay);
        } else {
            trigger();
        }
    }, [dismissNotification]);

    return (
        <NotificationContext.Provider value={{ notifications, showNotification, dismissNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
