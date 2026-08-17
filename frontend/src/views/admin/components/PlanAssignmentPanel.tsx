import { CalendarClock, History, Loader2, X } from 'lucide-react';
import React from 'react';
import { AccessPlan, adminService, PlanAssignment } from '../../../services/adminService';
import { User } from '../../../services/authService';
import '../../../styles/PlanAssignmentPanel.css';

interface Props { user: User; onClose: () => void; }

const localDateTime = (date = new Date()) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const displayDate = (value?: string) => value ? new Date(value.endsWith('Z') || value.includes('+') ? value : `${value}Z`).toLocaleString() : 'No expiration';

export const PlanAssignmentPanel: React.FC<Props> = ({ user, onClose }) => {
    const [plans, setPlans] = React.useState<AccessPlan[]>([]);
    const [history, setHistory] = React.useState<PlanAssignment[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [form, setForm] = React.useState({ plan_id: '', starts_at: localDateTime(), ends_at: '', reason: '' });

    const load = React.useCallback(async () => {
        try {
            setError(null);
            const [loadedPlans, loadedHistory] = await Promise.all([adminService.getAccessPlans(), adminService.getUserPlanHistory(user.id)]);
            setPlans(loadedPlans.filter((plan) => plan.is_active)); setHistory(loadedHistory);
        } catch { setError('Unable to load this learner’s plan history.'); }
        finally { setLoading(false); }
    }, [user.id]);
    React.useEffect(() => { load(); }, [load]);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault(); setSaving(true); setError(null);
        try {
            await adminService.assignUserPlan(user.id, {
                plan_id: Number(form.plan_id), starts_at: new Date(form.starts_at).toISOString(),
                ...(form.ends_at ? { ends_at: new Date(form.ends_at).toISOString() } : {}), reason: form.reason.trim(),
            });
            setForm((current) => ({ ...current, reason: '' })); await load();
        } catch (err: any) { setError(err?.response?.data?.detail || 'The plan assignment could not be saved.'); }
        finally { setSaving(false); }
    };

    return <div className="plan-panel-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
        <section className="plan-panel" role="dialog" aria-modal="true" aria-label={`Plan access for ${user.full_name}`}>
            <header><div><span>LEARNER ACCESS</span><h2>{user.full_name}</h2><p>{user.email}</p></div><button onClick={onClose} aria-label="Close"><X size={18} /></button></header>
            {error && <div className="plan-panel-error">{error}</div>}
            {loading ? <div className="plan-panel-loading"><Loader2 className="spin" /> Loading plan details…</div> : <>
                <form onSubmit={submit} className="plan-assignment-form">
                    <h3><CalendarClock size={17} /> Assign or schedule plan</h3>
                    <label><span>Access plan</span><select required value={form.plan_id} onChange={(e) => setForm({ ...form, plan_id: e.target.value })}><option value="">Select a plan</option>{plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label>
                    <div className="plan-date-grid">
                        <label><span>Starts</span><input required type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} /></label>
                        <label><span>Ends (optional)</span><input type="datetime-local" min={form.starts_at} value={form.ends_at} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} /></label>
                    </div>
                    <label><span>Reason</span><textarea required maxLength={500} placeholder="Example: Approved upgrade to Professional" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></label>
                    <button className="plan-save-button" disabled={saving || !form.plan_id || !form.reason.trim()}>{saving ? <><Loader2 className="spin" size={16} /> Saving…</> : 'Save assignment'}</button>
                </form>
                <div className="plan-history"><h3><History size={17} /> Assignment history</h3>{history.length === 0 ? <p className="plan-history-empty">No plan has been assigned.</p> : history.map((item) => <article key={item.id}><div><strong>{item.plan_name}</strong><span className={`plan-history-status ${item.status}`}>{item.status}</span></div><p>{displayDate(item.starts_at)} → {displayDate(item.ends_at)}</p>{item.reason && <small>{item.reason}</small>}</article>)}</div>
            </>}
        </section>
    </div>;
};
