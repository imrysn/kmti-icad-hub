import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import { parseBackendError } from '../../utils/errorUtils';
import '../Registration/RegistrationView.css';

export const PasswordResetView: React.FC = () => {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(token ? '' : 'This password reset link is incomplete.');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setError('');
    if (password.length < 8) return setError('Use at least 8 characters.');
    if (password !== confirm) return setError('The passwords do not match.');
    setBusy(true);
    try { setMessage((await authService.resetPassword(token, password)).message); }
    catch (cause) { setError(parseBackendError(cause, 'This password reset link is invalid or expired.')); }
    finally { setBusy(false); }
  };

  return <div className="registration-page"><section className="registration-card registration-result">
    <span className="registration-eyebrow">KMTI TRAINING HUB</span>
    <h1>{message ? 'Password reset complete' : 'Create a new password'}</h1>
    {message ? <><p>{message}</p><Link to="/login">Return to sign in</Link></> : <form className="registration-resend" onSubmit={submit}>
      {error && <p className="registration-error">{error}</p>}
      <label>New password<input type="password" minLength={8} maxLength={128} required value={password} onChange={e => setPassword(e.target.value)} /></label>
      <label>Confirm password<input type="password" minLength={8} maxLength={128} required value={confirm} onChange={e => setConfirm(e.target.value)} /></label>
      <button disabled={busy || !token}>{busy ? 'Resetting…' : 'Reset password'}</button>
      <Link to="/login">Return to sign in</Link>
    </form>}
  </section></div>;
};
