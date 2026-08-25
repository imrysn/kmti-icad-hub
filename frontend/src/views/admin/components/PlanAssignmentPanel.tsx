import { CalendarClock, History, KeyRound, Loader2, X } from 'lucide-react';
import React from 'react';
import { createPortal } from 'react-dom';
import { AccessPlan, adminService, CourseResource, EntitlementOverride, PlanAssignment, PracticalSetResource } from '../../../services/adminService';
import { User } from '../../../services/authService';
import './PlanAssignmentPanel.css';

interface Props { user: User; onClose: () => void; }

const localDateTime = (date = new Date()) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const displayDate = (value?: string) => value ? new Date(value.endsWith('Z') || value.includes('+') ? value : `${value}Z`).toLocaleString() : 'No expiration';

export const PlanAssignmentPanel: React.FC<Props> = ({ user, onClose }) => {
    const [plans, setPlans] = React.useState<AccessPlan[]>([]);
    const [history, setHistory] = React.useState<PlanAssignment[]>([]);
    const [courses, setCourses] = React.useState<CourseResource[]>([]);
    const [practicalSets, setPracticalSets] = React.useState<PracticalSetResource[]>([]);
    const [overrides, setOverrides] = React.useState<EntitlementOverride[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [form, setForm] = React.useState({ plan_id: '', starts_at: localDateTime(), ends_at: '', reason: '' });
    const [exception, setException] = React.useState({ resource_type: 'course' as 'course' | 'practical_set', resource_id: '', effect: 'allow' as 'allow' | 'deny', starts_at: localDateTime(), ends_at: localDateTime(new Date(Date.now() + 7 * 86400000)), reason: '' });

    const load = React.useCallback(async () => {
        try {
            setError(null);
            const [loadedPlans, loadedHistory, loadedCourses, loadedSets, loadedOverrides] = await Promise.all([
                adminService.getAccessPlans(), adminService.getUserPlanHistory(user.id), adminService.getAccessPlanCourseResources(),
                adminService.getAccessPlanPracticalSetResources(), adminService.getUserEntitlementOverrides(user.id)
            ]);
            setPlans(loadedPlans.filter((plan) => plan.is_active)); setHistory(loadedHistory); setCourses(loadedCourses); setPracticalSets(loadedSets); setOverrides(loadedOverrides);
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

    const submitException = async (event: React.FormEvent) => {
        event.preventDefault(); setSaving(true); setError(null);
        try {
            await adminService.createUserEntitlementOverride(user.id, {
                ...exception, starts_at: new Date(exception.starts_at).toISOString(), ends_at: new Date(exception.ends_at).toISOString(), reason: exception.reason.trim(),
            });
            setException((current) => ({ ...current, resource_id: '', reason: '' })); await load();
        } catch (err: any) { setError(err?.response?.data?.detail || 'The temporary exception could not be saved.'); }
        finally { setSaving(false); }
    };

    const revokeException = async (id: number) => {
        setSaving(true); setError(null);
        try { await adminService.revokeUserEntitlementOverride(user.id, id); await load(); }
        catch { setError('The temporary exception could not be revoked.'); }
        finally { setSaving(false); }
    };

    const exceptionResources = exception.resource_type === 'course'
        ? courses.map((item) => ({ id: item.course_type, label: item.title }))
        : practicalSets.map((item) => ({ id: item.resource_id, label: `${item.assessment_type} · ${item.name}` }));

    return createPortal(<div className="plan-panel-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
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
                <form onSubmit={submitException} className="plan-assignment-form entitlement-exception-form">
                    <h3><KeyRound size={17} /> Temporary access exception</h3>
                    <div className="plan-date-grid">
                        <label><span>Resource type</span><select value={exception.resource_type} onChange={(e) => setException({ ...exception, resource_type: e.target.value as 'course' | 'practical_set', resource_id: '' })}><option value="course">Course</option><option value="practical_set">Practical set</option></select></label>
                        <label><span>Effect</span><select value={exception.effect} onChange={(e) => setException({ ...exception, effect: e.target.value as 'allow' | 'deny' })}><option value="allow">Temporarily grant</option><option value="deny">Temporarily block</option></select></label>
                    </div>
                    <label><span>Course or set</span><select required value={exception.resource_id} onChange={(e) => setException({ ...exception, resource_id: e.target.value })}><option value="">Select a resource</option>{exceptionResources.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
                    <div className="plan-date-grid"><label><span>Starts</span><input required type="datetime-local" value={exception.starts_at} onChange={(e) => setException({ ...exception, starts_at: e.target.value })} /></label><label><span>Ends</span><input required type="datetime-local" min={exception.starts_at} value={exception.ends_at} onChange={(e) => setException({ ...exception, ends_at: e.target.value })} /></label></div>
                    <label><span>Reason</span><textarea required maxLength={500} placeholder="Example: Temporary access for August workshop" value={exception.reason} onChange={(e) => setException({ ...exception, reason: e.target.value })} /></label>
                    <button className="plan-save-button" disabled={saving || !exception.resource_id || !exception.reason.trim()}>{saving ? <><Loader2 className="spin" size={16} /> Saving…</> : 'Add temporary exception'}</button>
                </form>
                <div className="plan-history entitlement-exception-history"><h3><KeyRound size={17} /> Exception history</h3>{overrides.length === 0 ? <p className="plan-history-empty">No temporary exceptions.</p> : overrides.map((item) => {
                    const inactive = Boolean(item.revoked_at) || new Date(item.ends_at) <= new Date();
                    return <article key={item.id}><div><strong>{item.resource_type === 'course' ? courses.find((course) => course.course_type === item.resource_id)?.title || item.resource_id : practicalSets.find((set) => set.resource_id === item.resource_id)?.name || item.resource_id}</strong><span className={`plan-history-status ${inactive ? 'expired' : item.effect}`}>{item.revoked_at ? 'revoked' : inactive ? 'expired' : item.effect}</span></div><p>{displayDate(item.starts_at)} → {displayDate(item.ends_at)}</p><small>{item.reason}</small>{!inactive && <button type="button" className="revoke-exception" disabled={saving} onClick={() => revokeException(item.id)}>Revoke</button>}</article>;
                })}</div>
                <div className="plan-history"><h3><History size={17} /> Assignment history</h3>{history.length === 0 ? <p className="plan-history-empty">No plan has been assigned.</p> : history.map((item) => <article key={item.id}><div><strong>{item.plan_name}</strong><span className={`plan-history-status ${item.status}`}>{item.status}</span></div><p>{displayDate(item.starts_at)} → {displayDate(item.ends_at)}</p>{item.reason && <small>{item.reason}</small>}</article>)}</div>
            </>}
        </section>
    </div>, document.body);
};
