import { ArrowLeft, Check, CreditCard, Pencil, Plus, Smartphone, Target, WalletCards, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { authService, EffectiveEntitlements } from '../services/authService';
import '../styles/AccountCenter.css';
import '../styles/BillingModal.css';
import '../styles/UpgradePlan.css';

type Page = 'plans' | 'billing' | 'help' | 'terms' | 'privacy';

type PlanCode = 'icad-foundations' | 'icad-professional' | 'icad-complete';
type PlanActionKind = 'current' | 'get' | 'upgrade' | 'switch';
type PlanCard = {
  code: PlanCode;
  name: string;
  shortName: 'Foundations' | 'Professionals' | 'Complete';
  level: number;
  price: string;
  popular?: boolean;
  outcome: string;
  features: string[];
};
type BillingProfile = { billing_email:string; full_name:string|null; country:string|null; address_line1:string|null; address_line2:string|null; city:string|null; postal_code:string|null; province:string|null };

const planCards: PlanCard[] = [
  { code:'icad-foundations', name:'iCAD Foundations', shortName:'Foundations', level:1, price:'29', outcome:'Master the fundamental layout, tools, and basic navigation of iCAD. By the end, you’ll be comfortable exploring the software and creating simple 3D primitives.', features:['Beginner-friendly tutorials','Basic UI navigation & origin','Direct Mentor Chat'] },
  { code:'icad-professional', name:'iCAD Professional', shortName:'Professionals', level:2, price:'99', popular:true, outcome:'Learn advanced 3D modeling operations and 2D detailing. By the end, you’ll be able to create complex industrial parts and prepare them for manufacturing.', features:['Everything in Foundations','Advanced 3D Modeling manual','2D Detailing manual','Practical Assignments'] },
  { code:'icad-complete', name:'iCAD Complete', shortName:'Complete', level:3, price:'199', outcome:'Master the entire workflow, from 3D modeling to full evaluation and certification. Achieve true proficiency, backed by priority support and a verifiable certificate.', features:['Everything in Professionals','Excel evaluation workflows','Priority Support','Certification of Completion'] },
];

const getPlanAction = (currentPlanCode: string | undefined, target: PlanCard): { kind: PlanActionKind; label: string } => {
  const currentPlan = planCards.find(plan => plan.code === currentPlanCode);
  if (currentPlan?.code === target.code) return { kind: 'current', label: 'YOUR CURRENT PLAN' };

  if (!currentPlan) {
    return { kind: 'get', label: target.code === 'icad-complete' ? 'GET THE COMPLETE' : `GET ${target.shortName.toUpperCase()}` };
  }

  if (target.level > currentPlan.level) {
    if (currentPlan.code === 'icad-foundations' && target.code === 'icad-complete') {
      return { kind: 'get', label: 'GET THE COMPLETE' };
    }
    return { kind: 'upgrade', label: `UPGRADE TO ${target.shortName.toUpperCase()}` };
  }

  return { kind: 'switch', label: `SWITCH TO ${target.shortName.toUpperCase()}` };
};

export const AccountCenterView: React.FC<{ page: Page }> = ({ page }) => {
  const navigate = useNavigate(); const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [access, setAccess] = useState<EffectiveEntitlements | null>(null);
  const [accessLoading, setAccessLoading] = useState(true);
  const [method, setMethod] = useState<'card' | 'gcash'>('card'); const [message, setMessage] = useState('');
  const [billingProfile, setBillingProfile] = useState<BillingProfile|null>(null);
  const [billingDraft, setBillingDraft] = useState<BillingProfile|null>(null);
  const [editingBilling, setEditingBilling] = useState(false);
  const [editingPayment, setEditingPayment] = useState(false);
  const selectedPlan = planCards.find(plan => plan.code === searchParams.get('plan'));
  const selectedAction = searchParams.get('action');
  const closeBilling = () => navigate(selectedPlan ? '/plans' : '/mentor');
  useEffect(() => { authService.getCurrentUserEntitlements().then(setAccess).catch(() => undefined).finally(() => setAccessLoading(false)); }, []);
  useEffect(() => { if(page==='billing') api.get('/account/billing-profile').then(response=>{setBillingProfile(response.data);setBillingDraft(response.data);}).catch(()=>undefined); }, [page]);
  useEffect(() => {
    if (page === 'plans') document.body.classList.add('upgrade-plan-overlay-active');
    if (page === 'billing') document.body.classList.add('billing-modal-open');
    const handleEscape = (event: KeyboardEvent) => { if (page === 'billing' && event.key === 'Escape') closeBilling(); };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.classList.remove('upgrade-plan-overlay-active', 'billing-modal-open');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [page, selectedPlan]);
  const cancel = async () => { if (!window.confirm('Cancel your current plan now? Your course access will end immediately.')) return; try { await api.post('/account/billing/cancel'); setMessage('Your plan has been cancelled.'); setAccess(await authService.getCurrentUserEntitlements()); } catch { setMessage('Unable to cancel the plan. Contact KMTI administration.'); } };
  const saveBillingProfile = async () => { if(!billingDraft)return; try { const response=await api.put('/account/billing-profile',{full_name:billingDraft.full_name,country:billingDraft.country,address_line1:billingDraft.address_line1,address_line2:billingDraft.address_line2,city:billingDraft.city,postal_code:billingDraft.postal_code,province:billingDraft.province}); setBillingProfile(response.data);setBillingDraft(response.data);setEditingBilling(false);setMessage('Billing information updated.'); } catch { setMessage('Unable to update billing information.'); } };
  const title = { plans: 'Choose your training plan', billing: 'Billing', help: 'Help Center', terms: 'Terms of Service', privacy: 'Privacy Policy' }[page];
  if (page === 'plans') return <div className="upgrade-plan-page"><button className="upgrade-close" onClick={() => navigate('/mentor')} aria-label="Close upgrade plans"><X size={22}/></button><header><h1>Upgrade your plan</h1><p>Choose the training level that matches your iCAD goals.</p></header><main className="upgrade-plan-grid">{planCards.map(plan=>{const action=getPlanAction(access?.plan?.code,plan);const current=action.kind==='current';return <article key={plan.code} className={`${plan.popular?'popular':''} ${current?'current':''}`}>{plan.popular&&<span className="upgrade-popular-badge">MOST POPULAR</span>}{current&&<span className="upgrade-current-badge"><Check size={13}/>CURRENT PLAN</span>}<h2>{plan.name}</h2><div className="plan-price"><sup>$</sup><strong>{plan.price}</strong><span>/user/month</span></div><button className={`plan-action-button plan-action-${action.kind}`} disabled={accessLoading||current} onClick={()=>navigate(`/billing?plan=${plan.code}&action=${action.kind}`)}>{accessLoading?'CHECKING CURRENT PLAN…':action.label}</button><div className="plan-divider"/><div className="plan-outcome"><Target size={18}/><div><strong>What you’ll achieve:</strong><p>{plan.outcome}</p></div></div><ul>{plan.features.map(feature=><li key={feature}><Check size={17}/><span>{feature}</span></li>)}</ul></article>})}</main></div>;
  if (page === 'billing') return <div className="billing-modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)closeBilling();}}><section className="billing-modal billing-account-panel" role="dialog" aria-modal="true" aria-labelledby="billing-modal-title"><header className="billing-modal-header"><h1 id="billing-modal-title">Billing</h1><button onClick={closeBilling} aria-label="Close billing"><X size={21}/></button></header><div className="billing-modal-content">
    {selectedPlan&&<section className="billing-selected-plan"><div><span>{selectedAction==='switch'?'SELECTED PLAN CHANGE':'SELECTED UPGRADE'}</span><h2>{selectedPlan.name}</h2></div><div className="billing-selected-price"><strong>${selectedPlan.price}</strong><span>/user/month</span></div></section>}
    <section className="billing-section billing-plan-section"><div><h2>{access?.plan?.name || 'No active plan'}</h2><p>{access?.ends_at ? `Your access is active until ${new Date(access.ends_at).toLocaleDateString()}.` : access?.plan ? 'Your plan is currently active.' : 'Choose a plan to begin training.'}</p></div><button className="billing-outline-button" onClick={() => navigate('/plans')}>Upgrade</button></section>
    <section className="billing-section"><h2>Transaction history</h2><div className="empty-billing">No online transactions yet.</div></section>
    <section className="billing-section"><div className="billing-section-heading"><h2>Billing information</h2><button className="billing-outline-button" onClick={()=>setEditingBilling(true)}><Pencil size={14}/>Edit</button></div><dl className="billing-details"><div><dt>Billing email</dt><dd>{billingProfile?.billing_email||user?.email}</dd></div><div><dt>Name</dt><dd>{billingProfile?.full_name||user?.full_name||'Not provided'}</dd></div><div><dt>Address</dt><dd>{[billingProfile?.address_line1,billingProfile?.address_line2,billingProfile?.city,billingProfile?.province,billingProfile?.postal_code,billingProfile?.country].filter(Boolean).join(', ')||'Not provided'}</dd></div></dl></section>
    <section className="billing-section"><div className="billing-section-heading"><h2>Payment methods</h2><button className="billing-outline-button" onClick={()=>setEditingPayment(true)}><Plus size={15}/>Add new</button></div><div className="billing-payment-empty"><CreditCard size={20}/><div><strong>No saved payment method</strong><span>Connect debit/credit card or GCash through the secure payment provider.</span></div></div></section>
    <section className="billing-section billing-cancel-section"><div><h2>Cancel plan</h2><p>Cancellation ends the current training access assignment immediately.</p></div><button onClick={cancel} disabled={!access?.plan}>Cancel</button></section>{message&&<p className="billing-message">{message}</p>}
  </div></section>
  {editingBilling&&billingDraft&&<div className="billing-submodal-backdrop"><form className="billing-submodal" onSubmit={event=>{event.preventDefault();saveBillingProfile();}}><header><h2>Edit billing information</h2><button type="button" onClick={()=>setEditingBilling(false)} aria-label="Close edit billing"><X size={20}/></button></header><label><span>Billing email</span><input value={billingDraft.billing_email} disabled/></label><label><span>Full name</span><input value={billingDraft.full_name||''} onChange={event=>setBillingDraft({...billingDraft,full_name:event.target.value})}/></label><label><span>Country or region</span><input value={billingDraft.country||''} onChange={event=>setBillingDraft({...billingDraft,country:event.target.value})}/></label><label><span>Address line 1</span><input value={billingDraft.address_line1||''} onChange={event=>setBillingDraft({...billingDraft,address_line1:event.target.value})}/></label><label><span>Address line 2</span><input value={billingDraft.address_line2||''} onChange={event=>setBillingDraft({...billingDraft,address_line2:event.target.value})}/></label><label><span>City</span><input value={billingDraft.city||''} onChange={event=>setBillingDraft({...billingDraft,city:event.target.value})}/></label><div className="billing-field-row"><label><span>Postal code</span><input value={billingDraft.postal_code||''} onChange={event=>setBillingDraft({...billingDraft,postal_code:event.target.value})}/></label><label><span>Province</span><input value={billingDraft.province||''} onChange={event=>setBillingDraft({...billingDraft,province:event.target.value})}/></label></div><button className="billing-save-button" type="submit">Save</button></form></div>}
  {editingPayment&&<div className="billing-submodal-backdrop"><section className="billing-submodal"><header><h2>Add payment method</h2><button onClick={()=>setEditingPayment(false)} aria-label="Close payment method"><X size={20}/></button></header><p className="billing-provider-note">Payment credentials will be collected and tokenized by the configured secure payment provider. KMTI Training Hub will not store complete card or GCash credentials.</p><div className="payment-methods"><button className={method==='card'?'selected':''} onClick={()=>setMethod('card')}><WalletCards size={20}/>Debit or credit card</button><button className={method==='gcash'?'selected':''} onClick={()=>setMethod('gcash')}><Smartphone size={20}/>GCash</button></div><button className="billing-save-button" disabled>Secure provider setup required</button></section></div>}
  </div>;
  return <div className="account-center"><header><button onClick={() => navigate('/mentor')}><ArrowLeft size={17}/>Back to training</button><h1>{title}</h1></header><main>
    {page === 'help' && <article className="legal-copy"><h2>How can we help?</h2><p>For account approval, access plans, billing, or course availability, contact your KMTI training administrator.</p><h2>Lesson support</h2><p>Use Report a Bug when a page fails to load, a control does not work, or lesson content is displayed incorrectly. Include the page and a screenshot whenever possible.</p><h2>Account security</h2><p>You can update your display name, username, password, and profile picture from Profile. If you cannot sign in, use the password recovery option on the sign-in page.</p></article>}
    {page === 'terms' && <article className="legal-copy"><p>Effective: August 2026</p><h2>Using KMTI Training Hub</h2><p>You may use the platform only through your approved account and access plan. Do not share credentials, copy restricted course materials, interfere with platform security, or submit another learner’s work as your own.</p><h2>Training content and results</h2><p>Course materials are provided for training purposes. Completion, quiz results, and practical submissions may be reviewed by authorized KMTI personnel. Access may be suspended for misuse or policy violations.</p><h2>Availability and changes</h2><p>KMTI may update lessons, assessments, plans, and these terms. Material changes will be communicated through the platform.</p><h2>Contact</h2><p>Contact your KMTI training administrator with questions about these terms.</p></article>}
    {page === 'privacy' && <article className="legal-copy"><p>Effective: August 2026</p><h2>Information we collect</h2><p>We process account information, registration details, course activity, assessment results, support reports, and security records required to operate the training platform.</p><h2>How information is used</h2><p>Information is used to provide access, track learning progress, review assessments, support users, prevent abuse, and administer the platform.</p><h2>Files and screenshots</h2><p>Files submitted for assessments or bug reports are available only to authorized personnel and are retained according to KMTI operational requirements.</p><h2>Your choices</h2><p>You may update supported profile fields and request account or privacy assistance from a KMTI administrator.</p></article>}
  </main></div>;
};
