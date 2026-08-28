import { CheckCircle2, Clock3, EyeOff, Save, Wrench } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useContentAvailability } from '../../../hooks/useContentAvailability';
import { availabilityService, AvailabilityStatus, ContentAvailability } from '../../../services/availabilityService';

const STATUS_OPTIONS: { value: AvailabilityStatus; label: string }[] = [
    { value: 'available', label: 'Available' },
    { value: 'coming_soon', label: 'Coming Soon' },
    { value: 'maintenance', label: 'Under Maintenance' },
    { value: 'hidden', label: 'Hidden' },
];

const StatusIcon = ({ status }: { status: AvailabilityStatus }) => {
    if (status === 'available') return <CheckCircle2 size={18} />;
    if (status === 'coming_soon') return <Clock3 size={18} />;
    if (status === 'maintenance') return <Wrench size={18} />;
    return <EyeOff size={18} />;
};

export const CourseAvailabilityManagement: React.FC = () => {
    const { items, loading, error, setItems } = useContentAvailability();
    const [drafts, setDrafts] = useState<Record<string, { status: AvailabilityStatus; message: string }>>({});
    const [saving, setSaving] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    useEffect(() => {
        setDrafts(Object.fromEntries(items.map(item => [item.resource_key, { status: item.status, message: item.message || '' }])));
    }, [items]);

    const save = async (item: ContentAvailability) => {
        const draft = drafts[item.resource_key];
        if (!draft) return;
        setSaving(item.resource_key);
        setNotice(null);
        try {
            const updated = await availabilityService.update(item.resource_key, draft.status, draft.message);
            setItems(current => current.map(entry => entry.resource_key === updated.resource_key ? updated : entry));
            window.dispatchEvent(new Event('courseAvailabilityChanged'));
            setNotice(`${item.display_name} availability updated.`);
        } catch {
            setNotice(`Could not update ${item.display_name}.`);
        } finally {
            setSaving(null);
        }
    };

    if (loading) return <div className="availability-admin-state">Loading course availability…</div>;
    if (error) return <div className="admin-error-banner">{error}</div>;

    return (
        <section className="availability-admin-panel">
            {notice && <div className="availability-admin-notice" role="status">{notice}</div>}
            <div className="availability-admin-grid">
                {items.map(item => {
                    const draft = drafts[item.resource_key] || { status: item.status, message: item.message || '' };
                    const changed = draft.status !== item.status || draft.message.trim() !== (item.message || '');
                    return (
                        <article className="availability-admin-card" key={item.resource_key}>
                            <header>
                                <div className={`availability-status-icon status-${draft.status}`}><StatusIcon status={draft.status} /></div>
                                <div><h3>{item.display_name}</h3><code>{item.resource_key}</code></div>
                            </header>
                            <label>
                                Learner visibility
                                <select value={draft.status} onChange={event => setDrafts(current => ({ ...current, [item.resource_key]: { ...draft, status: event.target.value as AvailabilityStatus } }))}>
                                    {STATUS_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                                </select>
                            </label>
                            <label>
                                Learner-facing message
                                <textarea maxLength={500} value={draft.message} placeholder="Explain why this course is unavailable." onChange={event => setDrafts(current => ({ ...current, [item.resource_key]: { ...draft, message: event.target.value } }))} />
                            </label>
                            <button className="global-btn-primary availability-save-button" disabled={!changed || saving === item.resource_key} onClick={() => void save(item)}>
                                <Save size={16} /> {saving === item.resource_key ? 'Saving…' : 'Save Changes'}
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
