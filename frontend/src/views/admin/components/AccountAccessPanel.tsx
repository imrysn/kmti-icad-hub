import { Loader2, ShieldCheck, X } from 'lucide-react';
import React from 'react';
import { AdminUserAccess, adminService } from '../../../services/adminService';
import { User } from '../../../services/authService';
import '../../../styles/AccountAccessPanel.css';

interface Props { user: User; onClose: () => void; onSaved: () => Promise<void>; }
const AREA_LABELS = { content: 'Content Editor', organization: 'Organization', platform: 'Platform' } as const;

export const AccountAccessPanel: React.FC<Props> = ({ user, onClose, onSaved }) => {
    const [form, setForm] = React.useState<AdminUserAccess | null>(null);
    const [reason, setReason] = React.useState('');
    const [reauthPassword, setReauthPassword] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => { adminService.getUserAccess(user.id).then(setForm).catch(() => setError('Unable to load account access.')).finally(() => setLoading(false)); }, [user.id]);

    const toggleArea = (area: keyof typeof AREA_LABELS) => {
        if (!form) return;
        const current = new Set(form.admin_areas); current.has(area) ? current.delete(area) : current.add(area);
        setForm({ ...form, admin_areas: Array.from(current) });
    };
    const submit = async (event: React.FormEvent) => {
        event.preventDefault(); if (!form) return; setSaving(true); setError(null);
        try {
            const updated = await adminService.updateUserAccess(user.id, { role_code: form.role_code, admin_areas: form.role_code === 'admin' ? form.admin_areas : [], account_status: form.account_status, reason: reason.trim(), reauth_password: reauthPassword });
            setForm(updated); setReason(''); setReauthPassword(''); await onSaved();
        } catch (err: any) { setError(err?.response?.data?.detail || 'Account access could not be updated.'); }
        finally { setSaving(false); }
    };
    return <div className="account-access-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="account-access-panel" role="dialog" aria-modal="true">
        <header><div><span>ACCOUNT ADMINISTRATION</span><h2>{user.full_name}</h2><p>{user.email}</p></div><button onClick={onClose}><X size={18} /></button></header>
        {error && <div className="account-access-error">{error}</div>}
        {loading || !form ? <div className="account-access-loading"><Loader2 className="spin" /> Loading access…</div> : <form onSubmit={submit}>
            <section><h3>Primary role</h3><p>Controls the user’s main responsibilities and navigation.</p><div className="account-role-grid">{(['learner','instructor','admin'] as const).map((role) => <button type="button" key={role} className={form.role_code === role ? 'selected' : ''} onClick={() => setForm({ ...form, role_code: role, admin_areas: role === 'admin' ? form.admin_areas : [] })}>{role}</button>)}</div></section>
            {form.role_code === 'admin' && <section><h3>Admin Panel areas</h3><p>Platform access requires separate Platform grant authority.</p><div className="account-area-list">{(Object.keys(AREA_LABELS) as Array<keyof typeof AREA_LABELS>).map((area) => <label key={area}><input type="checkbox" checked={form.admin_areas.includes(area)} onChange={() => toggleArea(area)} /><span><strong>{AREA_LABELS[area]}</strong><small>{area === 'content' ? 'Curriculum and assessment content' : area === 'organization' ? 'Users, registrations, plans, and reports' : 'Security and technical configuration'}</small></span></label>)}</div></section>}
            <section><h3>Account status</h3><p>Suspension blocks sign-in without deleting learning history.</p><select value={form.account_status} onChange={(e) => setForm({ ...form, account_status: e.target.value as AdminUserAccess['account_status'] })}><option value="active">Active</option><option value="suspended">Suspended</option><option value="deactivated">Deactivated</option></select></section>
            <section><h3>Reason for change</h3><textarea required minLength={3} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Required for the audit record" /></section>
            <section><h3>Confirm your identity</h3><p>Enter your current password. It is verified securely and is never stored in the audit record.</p><input required type="password" autoComplete="current-password" value={reauthPassword} onChange={(e) => setReauthPassword(e.target.value)} placeholder="Current password" /></section>
            <button className="account-access-save" disabled={saving || reason.trim().length < 3 || !reauthPassword}>{saving ? <><Loader2 className="spin" size={16} /> Saving…</> : <><ShieldCheck size={16} /> Verify and save changes</>}</button>
        </form>}
    </section></div>;
};
