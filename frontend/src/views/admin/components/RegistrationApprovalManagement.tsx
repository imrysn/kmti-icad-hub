import React from 'react';
import { Check, RefreshCw, X } from 'lucide-react';
import { AccessPlan, adminService, RegistrationApplication } from '../../../services/adminService';
import './RegistrationApprovalManagement.css';

export const RegistrationApprovalManagement: React.FC = () => {
  const [applications, setApplications] = React.useState<RegistrationApplication[]>([]);
  const [plans, setPlans] = React.useState<AccessPlan[]>([]);
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState<number | null>(null);
  const load = React.useCallback(async () => {
    try { setError(''); const [items, availablePlans] = await Promise.all([adminService.getRegistrationApplications(), adminService.getAccessPlans()]); setApplications(items); setPlans(availablePlans.filter(plan => plan.is_active)); }
    catch { setError('Unable to load registration applications.'); }
  }, []);
  React.useEffect(() => { void load(); }, [load]);

  const approve = async (application: RegistrationApplication, planId: number) => {
    setBusy(application.id); try { await adminService.approveRegistration(application.id, application.version, planId, 'Approved through Registration Approvals'); await load(); } catch { setError('The application could not be approved. It may have been reviewed already.'); } finally { setBusy(null); }
  };
  const reject = async (application: RegistrationApplication) => {
    const reason = window.prompt('Internal rejection reason (not shown to applicant):'); if (!reason) return;
    setBusy(application.id); try { await adminService.rejectRegistration(application.id, application.version, reason); await load(); } catch { setError('The application could not be rejected.'); } finally { setBusy(null); }
  };

  return <section className="approval-management">
    <div className="approval-toolbar"><div><strong>{applications.length}</strong><span> awaiting review</span></div><button onClick={() => void load()}><RefreshCw size={16}/> Refresh</button></div>
    {error && <div className="approval-error">{error}</div>}
    {!error && applications.length === 0 && <div className="approval-empty"><Check size={28}/><h3>No pending applications</h3><p>New verified applications will appear here.</p></div>}
    <div className="approval-list">{applications.map(application => <article key={application.id}>
      <div className="approval-person"><span>{application.full_name.slice(0,1).toUpperCase()}</span><div><h3>{application.full_name}</h3><p>{application.email}</p></div></div>
      <dl><div><dt>Organization</dt><dd>{application.company_name || 'Not provided'}</dd></div><div><dt>Role / department</dt><dd>{[application.job_title, application.department].filter(Boolean).join(' · ') || 'Not provided'}</dd></div><div><dt>Requested plan</dt><dd>{application.requested_plan_name}</dd></div><div><dt>Reason</dt><dd>{application.reason_for_access || 'Not provided'}</dd></div></dl>
      <div className="approval-actions"><select defaultValue={application.requested_plan_id} id={`plan-${application.id}`}>{plans.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select><button className="reject" disabled={busy === application.id} onClick={() => void reject(application)}><X size={16}/> Reject</button><button className="approve" disabled={busy === application.id} onClick={() => { const select = document.getElementById(`plan-${application.id}`) as HTMLSelectElement; void approve(application, Number(select.value)); }}><Check size={16}/> Approve</button></div>
    </article>)}</div>
  </section>;
};
