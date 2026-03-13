import React, { useState } from 'react';
import { Send, AlertTriangle, Info, Bell } from 'lucide-react';
import { adminService } from '../../../services/adminService';

export const BroadcastCenter: React.FC = () => {
    const [message, setMessage] = useState('');
    const [level, setLevel] = useState<'info' | 'warning' | 'critical'>('info');
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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

    return (
        <div className="admin-card broadcast-center">
            <div className="card-header">
                <div className="header-title">
                    <Bell size={18} />
                    <h3>System Broadcast</h3>
                </div>
            </div>

            <div className="broadcast-form">
                <textarea
                    placeholder="Type a message to all users..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    disabled={isSending}
                />

                <div className="broadcast-controls">
                    <div className="level-selector">
                        <button 
                            className={`level-btn ${level === 'info' ? 'active info' : ''}`}
                            onClick={() => setLevel('info')}
                        >
                            <Info size={14} /> Info
                        </button>
                        <button 
                            className={`level-btn ${level === 'warning' ? 'active warning' : ''}`}
                            onClick={() => setLevel('warning')}
                        >
                            <AlertTriangle size={14} /> Warning
                        </button>
                    </div>

                    <button 
                        className="btn-primary send-btn"
                        onClick={handleSend}
                        disabled={isSending || !message.trim()}
                    >
                        {isSending ? 'Sending...' : 'Send Broadcast'}
                        <Send size={16} />
                    </button>
                </div>

                {status && (
                    <div className={`status-pill ${status.type}`}>
                        {status.text}
                    </div>
                )}
            </div>
        </div>
    );
};
