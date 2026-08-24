import { Camera, KeyRound } from 'lucide-react';
import React, { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState, WheelEvent } from 'react';
import { createPortal } from 'react-dom';
import { authService, User } from '../services/authService';
import { api } from '../services/api';
import { API_BASE_URL } from '../config/apiConfig';
import { parseBackendError } from '../utils/errorUtils';
import { Modal } from './Modal';
import '../styles/ProfileSettings.css';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSaved: () => Promise<void>;
}

const createCroppedAvatar = async (source: string, originalFile: File, zoom: number, positionX: number, positionY: number): Promise<File> => {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const candidate = new Image();
    candidate.onload = () => resolve(candidate);
    candidate.onerror = reject;
    candidate.src = source;
  });
  const cropSize = Math.min(image.naturalWidth, image.naturalHeight) / zoom;
  const maxX = image.naturalWidth - cropSize;
  const maxY = image.naturalHeight - cropSize;
  const sourceX = maxX * (positionX / 100);
  const sourceY = maxY * (positionY / 100);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Image cropping is unavailable in this browser.');
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, sourceX, sourceY, cropSize, cropSize, 0, 0, 512, 512);
  const outputType = originalFile.type === 'image/jpeg' || originalFile.type === 'image/webp' ? originalFile.type : 'image/png';
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('The cropped image could not be created.')), outputType, 0.9));
  const extension = outputType === 'image/jpeg' ? 'jpg' : outputType.split('/')[1];
  return new File([blob], `profile-avatar.${extension}`, { type: outputType });
};

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  user,
  onClose,
  onSaved,
}) => {
  const [fullName, setFullName] = useState(user.full_name);
  const [username, setUsername] = useState(user.username);
  const [avatarCode, setAvatarCode] = useState(user.avatar_code || 'blue');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [cropSource, setCropSource] = useState('');
  const [cropFile, setCropFile] = useState<File|null>(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropX, setCropX] = useState(50);
  const [cropY, setCropY] = useState(50);
  const [cropImageSize, setCropImageSize] = useState({ width: 0, height: 0 });
  const cropDrag = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const avatarOrigin = API_BASE_URL.replace(/\/api\/v1\/?$/, '');

  const uploadAvatar = async (file: File | undefined) => {
    if (!file) return;
    const data = new FormData(); data.append('avatar', file);
    setSaving(true); setError('');
    try { await api.post('/account/avatar', data); await onSaved(); }
    catch (cause) { setError(parseBackendError(cause, 'The profile picture could not be uploaded.')); }
    finally { setSaving(false); }
  };

  const prepareAvatarCrop = (file: File | undefined) => {
    if (!file) return;
    if (cropSource) URL.revokeObjectURL(cropSource);
    setCropFile(file); setCropSource(URL.createObjectURL(file)); setCropZoom(1); setCropX(50); setCropY(50); setCropImageSize({ width: 0, height: 0 }); setError('');
  };

  const closeCrop = () => {
    if (cropSource) URL.revokeObjectURL(cropSource);
    setCropSource(''); setCropFile(null);
  };

  const applyAvatarCrop = async () => {
    if (!cropSource || !cropFile) return;
    setSaving(true); setError('');
    try { const cropped = await createCroppedAvatar(cropSource, cropFile, cropZoom, cropX, cropY); closeCrop(); await uploadAvatar(cropped); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'The profile picture could not be cropped.'); setSaving(false); }
  };

  const handleCropPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    cropDrag.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: cropX, originY: cropY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCropPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = cropDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontalTravel = ((event.clientX - drag.startX) / bounds.width) * 100;
    const verticalTravel = ((event.clientY - drag.startY) / bounds.height) * 100;
    setCropX(Math.max(0, Math.min(100, drag.originX - horizontalTravel)));
    setCropY(Math.max(0, Math.min(100, drag.originY - verticalTravel)));
  };

  const handleCropPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (cropDrag.current?.pointerId === event.pointerId) cropDrag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleCropWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setCropZoom(value => Math.max(1, Math.min(3, value + (event.deltaY < 0 ? 0.1 : -0.1))));
  };

  const cropPreviewStyle = (() => {
    if (!cropImageSize.width || !cropImageSize.height) return undefined;
    const cropSize = Math.min(cropImageSize.width, cropImageSize.height) / cropZoom;
    const sourceX = (cropImageSize.width - cropSize) * (cropX / 100);
    const sourceY = (cropImageSize.height - cropSize) * (cropY / 100);
    return {
      width: `${(cropImageSize.width / cropSize) * 100}%`,
      height: `${(cropImageSize.height / cropSize) * 100}%`,
      left: `${-(sourceX / cropSize) * 100}%`,
      top: `${-(sourceY / cropSize) * 100}%`,
    };
  })();

  useEffect(() => {
    if (!isOpen) return;
    setFullName(user.full_name);
    setUsername(user.username);
    setAvatarCode(user.avatar_code || 'blue');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordFields(false);
    setError('');
    closeCrop();
  }, [isOpen, user.full_name, user.username, user.avatar_code]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const cleanedName = fullName.trim();
    if (!cleanedName) {
      setError('Full name is required.');
      return;
    }
    const cleanedUsername = username.trim();
    if (cleanedUsername.length < 2) {
      setError('Username must contain at least 2 characters.');
      return;
    }
    if (newPassword && newPassword.length < 8) {
      setError('The new password must contain at least 8 characters.');
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError('The new passwords do not match.');
      return;
    }
    if (newPassword && !currentPassword) {
      setError('Enter your current password to choose a new password.');
      return;
    }

    setSaving(true);
    try {
      await authService.updateCurrentUserProfile({
        full_name: cleanedName,
        username: cleanedUsername,
        avatar_code: avatarCode,
        ...(newPassword ? { current_password: currentPassword, new_password: newPassword } : {}),
      });
      await onSaved();
      onClose();
    } catch (cause) {
      setError(parseBackendError(cause, 'Your profile could not be updated.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} title="Edit profile" size="md" closeOnOutsideClick={!saving} containerClassName="profile-settings-modal">
      <form className="profile-settings-form" onSubmit={handleSubmit}>
        <div className="profile-avatar-hero">
          <div className={`profile-avatar-large avatar-${avatarCode}`}>
            {user.avatar_url ? <img src={`${avatarOrigin}${user.avatar_url}`} alt="Current profile" /> : <span>{(fullName || username || 'U').trim().slice(0,2).toUpperCase()}</span>}
            <label className="profile-camera-button" aria-label="Upload and crop profile picture"><Camera size={15}/><input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => {prepareAvatarCrop(event.target.files?.[0]);event.currentTarget.value='';}}/></label>
          </div>
        </div>

        <label className="profile-field compact-profile-field"><span>Display name</span><input value={fullName} onChange={event=>setFullName(event.target.value)} maxLength={200} autoComplete="name" required/></label>
        <label className="profile-field compact-profile-field"><span>Username</span><input value={username} onChange={event=>setUsername(event.target.value)} maxLength={100} autoComplete="username" required/></label>

        <button type="button" className="profile-password-toggle" onClick={()=>setShowPasswordFields(open=>!open)} aria-expanded={showPasswordFields}><KeyRound size={15}/><span>Change password</span></button>
        {showPasswordFields&&<div className="profile-password-fields">
          <label className="profile-field compact-profile-field"><span>Current password</span><input type="password" value={currentPassword} onChange={event=>setCurrentPassword(event.target.value)} autoComplete="current-password"/></label>
          <label className="profile-field compact-profile-field"><span>New password</span><input type="password" value={newPassword} onChange={event=>setNewPassword(event.target.value)} minLength={8} autoComplete="new-password"/></label>
          <label className="profile-field compact-profile-field"><span>Confirm new password</span><input type="password" value={confirmPassword} onChange={event=>setConfirmPassword(event.target.value)} minLength={8} autoComplete="new-password"/></label>
        </div>}

        {error && <div className="profile-settings-error" role="alert">{error}</div>}

        <div className="global-modal-footer">
          <button type="button" className="global-btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="global-btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    </Modal>
    {cropSource && createPortal(
        <div className="profile-crop-backdrop">
          <section className="profile-crop-dialog" role="dialog" aria-modal="true" aria-labelledby="profile-crop-title">
            <header>
              <h4 id="profile-crop-title">Crop profile picture</h4>
              <button type="button" onClick={closeCrop} aria-label="Close crop">×</button>
            </header>
            <div
              className="profile-crop-preview"
              onPointerDown={handleCropPointerDown}
              onPointerMove={handleCropPointerMove}
              onPointerUp={handleCropPointerEnd}
              onPointerCancel={handleCropPointerEnd}
              onWheel={handleCropWheel}
            >
              <img
                src={cropSource}
                alt="Crop preview"
                draggable={false}
                onLoad={event => setCropImageSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}
                style={cropPreviewStyle}
              />
              <span className="profile-crop-hint">Drag to reposition</span>
            </div>
            <label className="profile-crop-control">
              <span>Zoom</span>
              <input type="range" min="1" max="3" step="0.05" value={cropZoom} onChange={event => setCropZoom(Number(event.target.value))} />
            </label>
            <footer>
              <button type="button" className="global-btn-secondary" onClick={closeCrop}>Cancel</button>
              <button type="button" className="global-btn-primary" onClick={applyAvatarCrop} disabled={saving}>{saving ? 'Uploading…' : 'Crop & upload'}</button>
            </footer>
          </section>
        </div>
      , document.body)}
    </>
  );
};
