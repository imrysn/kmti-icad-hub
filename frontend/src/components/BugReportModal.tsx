import { Bug, ImagePlus, Send } from 'lucide-react';
import React, { FormEvent, useEffect, useState } from 'react';
import { api } from '../services/api';
import { parseBackendError } from '../utils/errorUtils';
import { Modal } from './Modal';

export const BugReportModal: React.FC<{ isOpen: boolean; onClose: () => void; onSent: () => void }> = ({ isOpen, onClose, onSent }) => {
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => { if (isOpen) { setDescription(''); setScreenshot(null); setError(''); } }, [isOpen]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (description.trim().length < 10) { setError('Please describe what happened in at least 10 characters.'); return; }
    const data = new FormData();
    data.append('description', description.trim());
    data.append('page_url', window.location.href);
    if (screenshot) data.append('screenshot', screenshot);
    setSending(true); setError('');
    try { await api.post('/support/bug-reports', data); onSent(); onClose(); }
    catch (cause) { setError(parseBackendError(cause, 'The bug report could not be sent.')); }
    finally { setSending(false); }
  };

  return <Modal isOpen={isOpen} onClose={onClose} title="Report a bug" tag="SUPPORT" size="md" closeOnOutsideClick={!sending}>
    <form className="bug-report-form" onSubmit={submit}>
      <div className="bug-report-heading"><Bug size={20}/><div><strong>What happened?</strong><p>Describe what you expected and what happened instead.</p></div></div>
      <textarea value={description} onChange={e => setDescription(e.target.value)} maxLength={5000} rows={7} placeholder="Tell us about the issue you encountered…" required />
      <label className="bug-screenshot-picker"><ImagePlus size={18}/><span>{screenshot ? screenshot.name : 'Add a screenshot (PNG, JPG, or WebP — max 5 MB)'}</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => setScreenshot(e.target.files?.[0] || null)} /></label>
      {error && <div className="profile-settings-error" role="alert">{error}</div>}
      <div className="global-modal-footer"><button type="button" className="global-btn-secondary" onClick={onClose}>Cancel</button><button type="submit" className="global-btn-primary" disabled={sending}><Send size={16}/>{sending ? 'Sending…' : 'Send report'}</button></div>
    </form>
  </Modal>;
};
