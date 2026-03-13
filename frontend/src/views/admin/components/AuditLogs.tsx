import React from 'react';
import { Shield, Users } from 'lucide-react';
import { SystemAuditLog } from '../../../services/adminService';

interface AuditLogsProps {
    logs: SystemAuditLog[];
}

export const AuditLogs: React.FC<AuditLogsProps> = ({ logs }) => {
    return (
        <section className="audit-logs">
            <div className="logs-list">
                {logs.map(l => (
                    <div key={l.id} className={`log-entry ${l.level.toLowerCase()}`}>
                        <div className="log-time">
                            {new Date(l.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <div className="log-context">
                            {l.context === 'AUTH' && <Shield size={14} />}
                            {l.context === 'USER_MGMT' && <Users size={14} />}
                            {l.context}
                        </div>
                        <div className="log-msg">{l.message}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};
