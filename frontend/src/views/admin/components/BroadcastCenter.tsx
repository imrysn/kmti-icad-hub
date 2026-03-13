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
    const containerRef = useRef<HTMLDivElement>(null);

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
            <div className="broadcast-center-floating" ref={containerRef}>
                <button 
                    className="chatbox-bubble"
                    onClick={() => setIsExpanded(true)}
                    aria-label="Open Broadcast Center"
                >
                    <Megaphone size={22} strokeWidth={2.5} />
                    <span className="bubble-label">BROADCAST</span>
                </button>
            </div>
        );
    }

    return (
        <div className="broadcast-center-floating" ref={containerRef}>
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
