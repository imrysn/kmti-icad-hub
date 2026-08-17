import { BookOpen, Check, Layers, Loader2 } from 'lucide-react';
import React from 'react';
import { AccessPlan, adminService } from '../../../services/adminService';
import '../../../styles/AccessPlanManagement.css';

export const AccessPlanManagement: React.FC = () => {
    const [plans, setPlans] = React.useState<AccessPlan[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [savingId, setSavingId] = React.useState<number | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const load = React.useCallback(async () => {
        try { setError(null); setPlans(await adminService.getAccessPlans()); }
        catch { setError('Unable to load access plans.'); }
        finally { setLoading(false); }
    }, []);
    React.useEffect(() => { load(); }, [load]);

    const update = async (plan: AccessPlan, changes: Partial<AccessPlan>) => {
        setSavingId(plan.id); setError(null);
        try {
            const updated = await adminService.updateAccessPlan(plan.id, changes);
            setPlans((current) => current.map((item) => item.id === updated.id ? updated : item));
        } catch { setError('The access plan could not be updated.'); }
        finally { setSavingId(null); }
    };

    if (loading) return <div className="access-plans-loading"><Loader2 className="spin" size={22} /> Loading access plans…</div>;
    return <section className="access-plan-management">
        {error && <div className="access-plans-error">{error}</div>}
        <div className="access-plans-summary">
            <div><strong>{plans.filter((plan) => plan.is_active).length}</strong><span>Active plans</span></div>
            <div><strong>{plans.filter((plan) => plan.is_publicly_requestable).length}</strong><span>Public choices</span></div>
            <div><strong>{plans.reduce((sum, plan) => sum + plan.entitlements.length, 0)}</strong><span>Configured entitlements</span></div>
        </div>
        <div className="access-plan-grid">
            {plans.map((plan, index) => <article className="access-plan-card" key={plan.id}>
                <div className="access-plan-card-top">
                    <div className="access-plan-icon">{index === 0 ? <BookOpen size={20} /> : <Layers size={20} />}</div>
                    <span className={`access-plan-status ${plan.is_active ? 'active' : ''}`}>{plan.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                <span className="access-plan-code">{plan.code}</span>
                <h2>{plan.name}</h2>
                <p>{plan.description}</p>
                <div className="access-plan-entitlements"><Check size={15} /><span>{plan.entitlements.length} configured entitlements</span></div>
                <div className="access-plan-controls">
                    <label><span>Plan active</span><input type="checkbox" checked={plan.is_active} disabled={savingId === plan.id} onChange={(event) => update(plan, { is_active: event.target.checked })} /></label>
                    <label><span>Available on registration</span><input type="checkbox" checked={plan.is_publicly_requestable} disabled={savingId === plan.id || !plan.is_active} onChange={(event) => update(plan, { is_publicly_requestable: event.target.checked })} /></label>
                </div>
                {savingId === plan.id && <span className="access-plan-saving"><Loader2 className="spin" size={14} /> Saving…</span>}
            </article>)}
        </div>
    </section>;
};
