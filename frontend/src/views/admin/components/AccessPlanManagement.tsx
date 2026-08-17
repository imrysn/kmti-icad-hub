import { BookOpen, Check, Layers, Loader2 } from 'lucide-react';
import React from 'react';
import { AccessPlan, adminService, CourseResource, PracticalSetResource } from '../../../services/adminService';
import '../../../styles/AccessPlanManagement.css';

export const AccessPlanManagement: React.FC = () => {
    const [plans, setPlans] = React.useState<AccessPlan[]>([]);
    const [courses, setCourses] = React.useState<CourseResource[]>([]);
    const [practicalSets, setPracticalSets] = React.useState<PracticalSetResource[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [savingId, setSavingId] = React.useState<number | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const load = React.useCallback(async () => {
        try {
            setError(null);
            const [loadedPlans, loadedCourses, loadedSets] = await Promise.all([
                adminService.getAccessPlans(), adminService.getAccessPlanCourseResources(), adminService.getAccessPlanPracticalSetResources()
            ]);
            setPlans(loadedPlans); setCourses(loadedCourses); setPracticalSets(loadedSets);
        }
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

    const togglePracticalSet = async (plan: AccessPlan, resourceId: string, included: boolean) => {
        setSavingId(plan.id); setError(null);
        try {
            const retained = plan.entitlements.filter((item) => item.resource_type !== 'practical_set')
                .map(({ resource_type, resource_id, permission_code, limits_json }) => ({ resource_type, resource_id, permission_code, limits_json }));
            const selected = new Set(plan.entitlements.filter((item) => item.resource_type === 'practical_set').map((item) => item.resource_id));
            included ? selected.add(resourceId) : selected.delete(resourceId);
            const practicalEntitlements = Array.from(selected).map((resource_id) => ({ resource_type: 'practical_set', resource_id, permission_code: 'view' }));
            const updated = await adminService.replaceAccessPlanEntitlements(plan.id, [...retained, ...practicalEntitlements]);
            setPlans((current) => current.map((item) => item.id === updated.id ? updated : item));
        } catch { setError('Practical-set access could not be saved.'); }
        finally { setSavingId(null); }
    };

    const toggleCourse = async (plan: AccessPlan, courseType: string, included: boolean) => {
        setSavingId(plan.id); setError(null);
        try {
            const other = plan.entitlements.filter((item) => item.resource_type !== 'course')
                .map(({ resource_type, resource_id, permission_code, limits_json }) => ({ resource_type, resource_id, permission_code, limits_json }));
            const selected = new Set(plan.entitlements.filter((item) => item.resource_type === 'course').map((item) => item.resource_id));
            included ? selected.add(courseType) : selected.delete(courseType);
            const courseEntitlements = Array.from(selected).map((resource_id) => ({ resource_type: 'course', resource_id, permission_code: 'view' }));
            const updated = await adminService.replaceAccessPlanEntitlements(plan.id, [...other, ...courseEntitlements]);
            setPlans((current) => current.map((item) => item.id === updated.id ? updated : item));
        } catch { setError('Course access could not be saved.'); }
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
                <fieldset className="access-plan-course-list" disabled={savingId === plan.id || !plan.is_active}>
                    <legend>Included courses</legend>
                    {courses.length === 0 && <span className="access-plan-empty">No curriculum courses are available yet.</span>}
                    {courses.map((course) => <label key={course.id}>
                        <input type="checkbox"
                            checked={plan.entitlements.some((item) => item.resource_type === 'course' && item.resource_id === course.course_type)}
                            onChange={(event) => toggleCourse(plan, course.course_type, event.target.checked)} />
                        <span>{course.title}</span>
                    </label>)}
                </fieldset>
                <fieldset className="access-plan-course-list" disabled={savingId === plan.id || !plan.is_active}>
                    <legend>Included practical sets</legend>
                    {practicalSets.length === 0 && <span className="access-plan-empty">No practical sets are available yet.</span>}
                    {practicalSets.map((item) => <label key={item.resource_id}>
                        <input type="checkbox"
                            checked={plan.entitlements.some((entitlement) => entitlement.resource_type === 'practical_set' && entitlement.resource_id === item.resource_id)}
                            onChange={(event) => togglePracticalSet(plan, item.resource_id, event.target.checked)} />
                        <span>{item.assessment_type} · {item.name}</span>
                    </label>)}
                </fieldset>
                <div className="access-plan-controls">
                    <label><span>Plan active</span><input type="checkbox" checked={plan.is_active} disabled={savingId === plan.id} onChange={(event) => update(plan, { is_active: event.target.checked })} /></label>
                    <label><span>Available on registration</span><input type="checkbox" checked={plan.is_publicly_requestable} disabled={savingId === plan.id || !plan.is_active} onChange={(event) => update(plan, { is_publicly_requestable: event.target.checked })} /></label>
                </div>
                {savingId === plan.id && <span className="access-plan-saving"><Loader2 className="spin" size={14} /> Saving…</span>}
            </article>)}
        </div>
    </section>;
};
