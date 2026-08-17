import { Construction } from 'lucide-react';
import React from 'react';

interface AdminComingSoonProps { title: string; description: string; available?: string[]; }

export const AdminComingSoon: React.FC<AdminComingSoonProps> = ({ title, description, available = [] }) => (
    <section className="admin-coming-soon" aria-labelledby="coming-soon-title">
        <div className="coming-soon-icon"><Construction size={30} /></div>
        <span className="coming-soon-status">Planned</span>
        <h2 id="coming-soon-title">{title}</h2>
        <p>{description}</p>
        {available.length > 0 && <div className="coming-soon-foundation">
            <strong>Foundation already available</strong>
            <ul>{available.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>}
    </section>
);
