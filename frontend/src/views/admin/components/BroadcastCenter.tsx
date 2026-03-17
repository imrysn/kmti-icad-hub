import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, Info, Megaphone, MessageSquare, ChevronDown } from 'lucide-react';
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

    const handleSend = async () => {
        if (!message.trim()) return;

        setIsSending(true);
        setStatus(null);
        try {
            await adminService.sendBroadcast(message, level);
            setStatus({ type: 'success', text: 'Broadcast sent successfully!' });
            setMessage('');
            setTimeout(() => setStatus(null), 3000);
        } catch (err) {
            setStatus({ type: 'error', text: 'Failed to send broadcast.' });
        } finally {
            setIsSending(false);
        }
    };

    if (!isExpanded) {
        return (
            <div 
                className={`broadcast-center-floating ${isDragging ? 'dragging' : ''}`} 
                ref={containerRef}
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            >
                <button 
                    className="chatbox-bubble"
                    onMouseDown={handleMouseDown}
                    onClick={() => {
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
        <div 
            className="broadcast-center-floating" 
            ref={containerRef}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
            <div className="chatbox-expanded">
                <div className="chatbox-header">
                    <h3>
                        <MessageSquare size={18} />
                        Broadcast Center
                    </h3>
                    <button 
                        className="minimize-btn" 
                        onClick={() => setIsExpanded(false)}
                        aria-label="Minimize"
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>

                <div className="chatbox-form">
                    <textarea
                        placeholder="Broadcast message to all users..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
                            <button 
                                className={`lvl-chip ${level === 'info' ? 'active info' : ''}`}
                                onClick={() => setLevel('info')}
                            >
                                <Info size={14} /> Info
                            </button>
                            <button 
                                className={`lvl-chip ${level === 'warning' ? 'active warning' : ''}`}
                                onClick={() => setLevel('warning')}
                            >
                                <AlertTriangle size={14} /> Alert
                            </button>
                            <button 
                                className={`lvl-chip ${level === 'critical' ? 'active critical' : ''}`}
                                onClick={() => setLevel('critical')}
                            >
                                <Megaphone size={14} /> URGENT
                            </button>
                        </div>

                        <button 
                            className="send-action"
                            onClick={handleSend}
                            disabled={isSending || !message.trim()}
                        >
                            {isSending ? 'Sending...' : 'Send Now'}
                            <Send size={16} />
                        </button>
                    </div>

                    {status && (
                        <div className={`chat-status ${status.type}`}>
                            {status.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
