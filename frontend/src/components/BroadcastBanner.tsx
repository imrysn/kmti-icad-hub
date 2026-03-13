import React, { useState, useEffect, useRef } from 'react';
import { adminService } from '../services/adminService';
import { X, AlertCircle, Info, Megaphone } from 'lucide-react';
import '../styles/BroadcastBanner.css';

interface Broadcast {
    id: number;
    message: string;
    level: 'info' | 'warning' | 'critical';
    sender_name: string;
    created_at: string;
}

// Sub-component for individual banner cards to isolate state
const BannerCard: React.FC<{ 
    broadcast: Broadcast; 
    index: number; 
    onDismiss: (id: number) => void;
}> = ({ broadcast, index, onDismiss }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const messageRef = useRef<HTMLParagraphElement>(null);

    const checkTruncation = () => {
        if (messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            setCanExpand(scrollHeight > clientHeight);
        }
    };

    useEffect(() => {
        checkTruncation();
        const resizeObserver = new ResizeObserver(checkTruncation);
        if (messageRef.current) resizeObserver.observe(messageRef.current);
        window.addEventListener('resize', checkTruncation);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', checkTruncation);
        };
    }, [broadcast.message]);

    const categoryMap: Record<string, { label: string; icon: JSX.Element }> = {
        info: { label: 'General Announcement', icon: <Info size={16} /> },
        warning: { label: 'System Alert', icon: <AlertCircle size={16} /> },
        critical: { label: 'URGENT', icon: <Megaphone size={16} /> }
    };

    const category = categoryMap[broadcast.level] || categoryMap.info;

    // Calc stack styles
    const offset = index * 12;
    const scale = 1 - (index * 0.05);
    const opacity = 1 - (index * 0.3);
    const zIndex = 100 - index;

    return (
        <div 
            className={`broadcast-banner ${broadcast.level} ${isExpanded ? 'expanded' : ''}`}
            style={{
                transform: `translateY(${offset}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: index === 0 ? 'auto' : 'none' // Only top card is interactive
            }}
        >
            <div className="banner-island">
                <div className="banner-header">
                    <div className="category-tag">
                        {category.icon}
                        <span>{category.label}</span>
                    </div>
                    <div className="header-actions">
                        <button className="dismiss-btn" onClick={() => onDismiss(broadcast.id)} aria-label="Dismiss">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="banner-body">
                    <p className="message-text" ref={messageRef}>{broadcast.message}</p>
                    <div className="banner-footer">
                        <div className="sender-chip">
                            <span className="dot"></span>
                            Sent by: {broadcast.sender_name}
                        </div>
                        {(canExpand || isExpanded) && (
                            <button className="expand-toggle-icon" onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }} aria-label={isExpanded ? 'Show Less' : 'View More'}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={isExpanded ? 'rotated' : ''}>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const BroadcastBanner: React.FC = () => {
    const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
    const [dismissedIds, setDismissedIds] = useState<number[]>(() => {
        const saved = localStorage.getItem('dismissed_broadcasts');
        return saved ? JSON.parse(saved) : [];
    });
    
    const lastAlertedId = useRef<number | null>(null);

    // Audio synthesis
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
            osc.frequency.setValueAtTime(880, now);
            gain.gain.setValueAtTime(0.2, now);
        } else if (type === 'warning') {
            osc.frequency.setValueAtTime(660, now);
            gain.gain.setValueAtTime(0.15, now);
        } else {
            osc.frequency.setValueAtTime(523.25, now);
            gain.gain.setValueAtTime(0.1, now);
        }
        osc.start();
        osc.stop(now + 0.5);
    };

    const triggerFlash = () => {
        if ((window as any).electronAPI?.flashWindow) {
            (window as any).electronAPI.flashWindow();
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

    const activeBroadcasts = broadcasts.filter(b => !dismissedIds.includes(b.id));

    // Handle arrival and alerts
    useEffect(() => {
        const latest = activeBroadcasts[0];
        if (latest && latest.id !== lastAlertedId.current) {
            lastAlertedId.current = latest.id;
            playAlert(latest.level);
            triggerFlash();
        }
    }, [activeBroadcasts]);

    if (activeBroadcasts.length === 0) return null;

    return (
        <div className="broadcast-banner-container">
            {activeBroadcasts.slice(0, 3).map((b, idx) => (
                <BannerCard 
                    key={b.id} 
                    broadcast={b} 
                    index={idx} 
                    onDismiss={dismiss} 
                />
            ))}
        </div>
    );
};
