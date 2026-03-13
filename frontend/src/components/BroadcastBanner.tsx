import React, { useState, useEffect, useRef } from 'react';
import { adminService } from '../services/adminService';
import { X, AlertCircle, Info, BellRing } from 'lucide-react';
import '../styles/BroadcastBanner.css';

interface Broadcast {
    id: number;
    message: string;
    level: 'info' | 'warning' | 'critical';
    sender_name: string;
    created_at: string;
}

export const BroadcastBanner: React.FC = () => {
    const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
    const [dismissedIds, setDismissedIds] = useState<number[]>(() => {
        const saved = localStorage.getItem('dismissed_broadcasts');
        return saved ? JSON.parse(saved) : [];
    });
    const [timeLeft, setTimeLeft] = useState(5000);
    const [isPaused, setIsPaused] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Use a ref to track the last ID we alerted for to prevent infinite repeats
    const lastAlertedId = useRef<number | null>(null);

    // Audio synthesis for premium alerts
    const playAlert = (type: string) => {
        const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;
        if (type === 'critical') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(440, now + 0.5);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.5);
        } else if (type === 'warning') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(660, now);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.3);
        } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.2);
        }

        osc.start();
        osc.stop(now + 0.5);
    };

    // Electron taskbar flash
    const triggerFlash = () => {
        try {
            const electron = (window as any).require ? (window as any).require('electron') : null;
            if (electron && electron.remote) {
                const win = electron.remote.getCurrentWindow();
                if (!win.isFocused()) {
                    win.flashFrame(true);
                }
            }
        } catch (e) {
            // Silently fail if not in Electron
        }
    };

    const fetchBroadcasts = async () => {
        try {
            const data = await adminService.getActiveBroadcasts();
            setBroadcasts(data);
        } catch (err) {
            console.error('Failed to fetch broadcasts', err);
        }
    };

    // Polling effect
    useEffect(() => {
        fetchBroadcasts();
        const interval = setInterval(fetchBroadcasts, 5000);
        return () => clearInterval(interval);
    }, []);

    const dismiss = (id: number) => {
        setDismissedIds(prev => {
            const updated = [...prev, id];
            localStorage.setItem('dismissed_broadcasts', JSON.stringify(updated));
            return updated;
        });
    };

    // Logic for latest broadcast
    const activeBroadcasts = broadcasts.filter(b => !dismissedIds.includes(b.id));
    const latest = activeBroadcasts.length > 0 ? activeBroadcasts[0] : null;

    // Reset expansion and alert on new broadcast
    useEffect(() => {
        if (latest && latest.id !== lastAlertedId.current) {
            lastAlertedId.current = latest.id;
            setIsExpanded(false);
            playAlert(latest.level);
            triggerFlash();
            setTimeLeft(5000);
        }
    }, [latest?.id]);

    // Countdown logic
    useEffect(() => {
        if (!latest || isPaused || timeLeft <= 0 || isExpanded) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 100) {
                    dismiss(latest.id);
                    return 5000;
                }
                return prev - 100;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [latest?.id, isPaused, timeLeft === 0, isExpanded]);

    if (!latest) return null;

    const categoryMap: Record<string, { label: string; icon: JSX.Element }> = {
        info: { label: 'General Announcement', icon: <Info size={16} /> },
        warning: { label: 'System Alert', icon: <AlertCircle size={16} /> },
        critical: { label: 'Priority Emergency', icon: <BellRing size={16} /> }
    };

    const category = categoryMap[latest.level] || categoryMap.info;
    const progress = (timeLeft / 5000) * 100;

    return (
        <div 
            className={`broadcast-banner ${latest.level} ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="banner-island">
                <div className="banner-header">
                    <div className="category-tag">
                        {category.icon}
                        <span>{category.label}</span>
                    </div>
                    <div className="header-actions">
                        <button className="dismiss-btn" onClick={() => dismiss(latest.id)} aria-label="Dismiss">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="banner-body">
                    <p className="message-text">{latest.message}</p>
                    <div className="banner-footer">
                        <div className="sender-chip">
                            <span className="dot"></span>
                            Sent by: {latest.sender_name}
                        </div>
                        <button className="expand-toggle-icon" onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }} aria-label={isExpanded ? 'Show Less' : 'View More'}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={isExpanded ? 'rotated' : ''}>
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
                {!isExpanded && (
                    <div className="banner-progress">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};
