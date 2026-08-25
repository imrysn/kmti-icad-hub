import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { registrationService, PublicAccessPlan, RegistrationPayload } from '../../services/registrationService';
import './RegistrationView.css';
import './RegistrationVerification.css';

const initialForm: RegistrationPayload = {
  username: '', email: '', password: '', full_name: '', requested_plan_id: 0,
  company_name: '', department: '', job_title: '', country_code: 'PH', reason_for_access: '',
  preferred_language: 'en', timezone: 'Asia/Manila', privacy_policy_version: '2026-08',
  terms_version: '2026-08', privacy_accepted: false, terms_accepted: false,
};

export const RegistrationView: React.FC = () => {
  const [params] = useSearchParams();
  const verificationToken = params.get('token');
  const [plans, setPlans] = React.useState<PublicAccessPlan[]>([]);
  const [form, setForm] = React.useState(initialForm);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [resendEmail, setResendEmail] = React.useState('');
  const [developmentToken, setDevelopmentToken] = React.useState('');

  React.useEffect(() => {
    if (verificationToken) {
      setBusy(true);
      registrationService.verifyEmail(verificationToken).then(r => setMessage(r.message)).catch(() => setError('This verification link is invalid or expired.')).finally(() => setBusy(false));
      return;
    }
    registrationService.getPlans().then(result => {
      setPlans(result);
      const planParam = params.get('plan');
      if (planParam) {
        const matchingPlan = result.find(p => p.code.toLowerCase() === planParam.toLowerCase());
        if (matchingPlan) {
          setForm(current => ({ ...current, requested_plan_id: matchingPlan.id }));
          return;
        }
      }
      if (result[0]) setForm(current => ({ ...current, requested_plan_id: result[0].id }));
    }).catch(() => setError('Access plans are temporarily unavailable.'));
  }, [verificationToken]);

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const checked = event.target instanceof HTMLInputElement ? event.target.checked : false;
    setForm(current => ({ ...current, [name]: event.target instanceof HTMLInputElement && event.target.type === 'checkbox' ? checked : name === 'requested_plan_id' ? Number(value) : value }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const result = await registrationService.submit(form);
      setMessage(result.message);
      setResendEmail(form.email);
      if (result.verification_token) setDevelopmentToken(result.verification_token);
    } catch (err: any) { setError(err?.response?.data?.detail || 'Registration could not be submitted.'); }
    finally { setBusy(false); }
  };

  const resend = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const result = await registrationService.resendVerification(resendEmail);
      setMessage(result.message); setDevelopmentToken(result.verification_token || '');
    } catch { setError('Verification instructions could not be requested. Please try again later.'); }
    finally { setBusy(false); }
  };

  if (verificationToken || message) return <div className="registration-page"><section className="registration-card registration-result"><span className="registration-eyebrow">KMTI TRAINING HUB</span><h1>{error ? 'Verification unavailable' : verificationToken ? 'Email verified' : 'Check your email'}</h1><p>{error || message || (busy ? 'Checking your link…' : '')}</p>{developmentToken && <p className="registration-dev-link"><strong>Development only:</strong> <Link to={`/register?token=${developmentToken}`}>Open verification link</Link></p>}{!verificationToken && <form className="registration-resend" onSubmit={resend}><label>Email address<input required type="email" value={resendEmail} onChange={event => setResendEmail(event.target.value)} /></label><button disabled={busy}>{busy ? 'Requesting…' : 'Resend verification'}</button></form>}<Link to="/login">Return to sign in</Link></section></div>;

  return <div className="registration-page"><section className="registration-card">
    <header><span className="registration-eyebrow">KMTI TRAINING HUB</span><h1>Apply for training access</h1><p>Create a learner application. Access begins only after email verification and administrator approval.</p></header>
    <form onSubmit={submit}>
      <div className="registration-grid">
        <label>Full name<input required name="full_name" value={form.full_name} onChange={update} /></label>
        <label>Username<input required minLength={2} name="username" value={form.username} onChange={update} /></label>
        <label>Email address<input required type="email" name="email" value={form.email} onChange={update} /></label>
        <label>Password<input required minLength={8} type="password" name="password" value={form.password} onChange={update} /></label>
        <label>Company or organization<input name="company_name" value={form.company_name} onChange={update} /></label>
        <label>Department<input name="department" value={form.department} onChange={update} /></label>
        <label>Job title<input name="job_title" value={form.job_title} onChange={update} /></label>
        <label>Country code<input maxLength={2} name="country_code" value={form.country_code} onChange={update} /></label>
      </div>
      <fieldset><legend>Requested access plan</legend><div className="registration-plans">{plans.map(plan => <label className={form.requested_plan_id === plan.id ? 'selected' : ''} key={plan.id}><input type="radio" name="requested_plan_id" value={plan.id} checked={form.requested_plan_id === plan.id} onChange={update} /><strong>{plan.name}</strong><span>{plan.description}</span></label>)}</div></fieldset>
      <label>Why do you need access?<textarea name="reason_for_access" value={form.reason_for_access} onChange={update} rows={3} /></label>
      <div className="registration-consent"><label><input type="checkbox" name="privacy_accepted" checked={form.privacy_accepted} onChange={update} /> I accept the privacy policy.</label><label><input type="checkbox" name="terms_accepted" checked={form.terms_accepted} onChange={update} /> I accept the terms of use.</label></div>
      {error && <div className="registration-error">{error}</div>}
      <footer><Link to="/login">Already have an account?</Link><button disabled={busy || !form.privacy_accepted || !form.terms_accepted || !form.requested_plan_id}>{busy ? 'Submitting…' : 'Submit application'}</button></footer>
    </form>
  </section></div>;
};
