import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, Info, Megaphone, MessageSquare, ChevronDown, Trash2, Clock } from 'lucide-react';
import { adminService } from '../../../services/adminService';
import '../../../styles/BroadcastCenter.css';

export const BroadcastCenter: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');
    const [level, setLevel] = useState<'info' | 'warning' | 'critical'>('info');
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [broadcasts, setBroadcasts] = useState<any[]>([]);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const hasMovedRef = useRef(false);

    // Global click listener for "Click Outside to Collapse"
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isExpanded && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isExpanded) return; // Only draggable when collapsed
        setIsDragging(true);
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        hasMovedRef.current = false;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            
            const dx = e.clientX - dragStartRef.current.x;
            const dy = e.clientY - dragStartRef.current.y;
            
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                hasMovedRef.current = true;
            }
            
            setPosition(prev => ({
                x: prev.x + dx,
                y: prev.y + dy
            }));
            
            dragStartRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const fetchBroadcasts = async () => {
        try {
            const data = await adminService.getActiveBroadcasts();
            setBroadcasts(data);
        } catch (err) {
            console.error('Failed to fetch broadcasts', err);
        }
    };

    useEffect(() => {
        if (isExpanded) {
            fetchBroadcasts();
        }
    }, [isExpanded]);

    const handleSend = async () => {
        if (!message.trim()) return;

        setIsSending(true);
        setStatus(null);
        try {
            await adminService.sendBroadcast(message, level);
            setStatus({ type: 'success', text: 'Broadcast sent successfully!' });
            setMessage('');
            fetchBroadcasts();
            setTimeout(() => setStatus(null), 3000);
        } catch (err) {
            setStatus({ type: 'error', text: 'Failed to send broadcast.' });
        } finally {
            setIsSending(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await adminService.deleteBroadcast(id);
            setStatus({ type: 'success', text: 'Broadcast deleted successfully!' });
            fetchBroadcasts();
            setTimeout(() => setStatus(null), 3000);
        } catch (err) {
            setStatus({ type: 'error', text: 'Failed to delete broadcast.' });
        }
    };

    const formatDateTime = (dateStr: string) => {
        try {
            const d = new Date(dateStr);
            const pad = (n: number) => n.toString().padStart(2, '0');
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
        } catch (e) {
            return dateStr;
        }
    };

    if (!isExpanded) {
        return (
            <div className={`broadcast-center-floating ${isDragging ? 'dragging' : ''}`} ref={containerRef} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
                <button className="chatbox-bubble" onMouseDown={handleMouseDown} onClick={() => {
                        if (!hasMovedRef.current) {
                            setIsExpanded(true);
                        }
                    }}
                    aria-label="Open Broadcast Center"
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                    <Megaphone size={22} strokeWidth={2.5} />
                    <span className="bubble-label">BROADCAST</span>
                </button>
            </div>
        );
    }

    return (
        <div className="broadcast-center-floating" ref={containerRef} style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
            <div className="chatbox-expanded" style={{ display: 'flex', flexDirection: 'column', maxHeight: '550px' }}>
                <div className="chatbox-header">
                    <h3>
                        <MessageSquare size={18} />
                        Broadcast Center
                    </h3>
                    <button className="minimize-btn" onClick={() => setIsExpanded(false)}
                        aria-label="Minimize"
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>

                <div className="chatbox-form" style={{ flex: 1, overflowY: 'auto' }}>
                    <textarea placeholder="Broadcast message to all users..." value={message} onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        disabled={isSending}
                        autoFocus
                    />

                    <div className="chatbox-controls">
                        <div className="level-picker">
                            <button className={`lvl-chip ${level === 'info' ? 'active info' : ''}`} onClick={() => setLevel('info')}
                            >
                                <Info size={14} /> Info
                            </button>
                            <button className={`lvl-chip ${level === 'warning' ? 'active warning' : ''}`} onClick={() => setLevel('warning')}
                            >
                                <AlertTriangle size={14} /> Alert
                            </button>
                            <button className={`lvl-chip ${level === 'critical' ? 'active critical' : ''}`} onClick={() => setLevel('critical')}
                            >
                                <Megaphone size={14} /> URGENT
                            </button>
                        </div>

                        <button className="send-action" onClick={handleSend} disabled={isSending || !message.trim()}>
                            {isSending ? 'Sending...' : 'Send Now'}
                            <Send size={16} />
                        </button>
                    </div>

                    {status && (
                        <div className={`chat-status ${status.type}`}>
                            {status.text}
                        </div>
                    )}

                    <div className="active-broadcasts-section" style={{ marginTop: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Active Broadcasts ({broadcasts.length})
                        </h4>

                        {broadcasts.length === 0 ? (
                            <div style={{ padding: '15px 0', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                                No active broadcasts.
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {broadcasts.map((b) => (
                                    <div key={b.id} className={`active-broadcast-item level-${b.level}`} style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.4', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                                                {b.message}
                                            </p>
                                            <button 
                                                onClick={() => handleDelete(b.id)}
                                                style={{ background: 'none', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', opacity: 0.7 }}
                                                title="Delete Broadcast"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                            <span style={{ textTransform: 'capitalize', fontWeight: 600, color: b.level === 'critical' ? 'var(--error-color)' : b.level === 'warning' ? 'var(--warning-color)' : 'var(--accent-blue)' }}>
                                                {b.level === 'critical' ? 'URGENT' : b.level}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={12} />
                                                {formatDateTime(b.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
