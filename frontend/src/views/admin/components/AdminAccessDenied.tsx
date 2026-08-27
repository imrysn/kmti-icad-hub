import { Lock } from 'lucide-react';
import React from 'react';

interface AdminAccessDeniedProps {
    area: string;
}

export const AdminAccessDenied: React.FC<AdminAccessDeniedProps> = ({ area }) => (
    <section
        role="alert"
        style={{
            margin: 'auto',
            maxWidth: 560,
            padding: '2.5rem',
            textAlign: 'center',
            color: 'var(--text-primary)',
        }}
    >
        <Lock size={44} aria-hidden="true" />
        <h1>Admin access required</h1>
        <p>
            Your account does not have access to the <strong>{area}</strong> administration area.
            Contact an authorized KMTI administrator if you believe this is inCorrect!
        </p>
    </section>
);
