import React from 'react';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import '../styles/ConfirmationModal.css';

export interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    confirmText?: string;
    confirmLabel?: string;
    cancelText?: string;
    type?: 'confirm' | 'danger' | 'info';
    variant?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    confirmText,
    confirmLabel,
    cancelText = 'Cancel',
    type,
    variant,
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    const effectiveConfirmText = confirmLabel || confirmText || 'Confirm Action';
    const effectiveType = type || (variant === 'danger' ? 'danger' : variant === 'info' ? 'info' : 'confirm');

    const getIcon = () => {
        const iconSize = 24;
        switch (effectiveType) {
            case 'danger': return <AlertTriangle size={iconSize} />;
            case 'info': return <Info size={iconSize} />;
            default: return <CheckCircle2 size={iconSize} />;
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onCancel} 
            title={title} 
            tag={`SYSTEM_REQUEST // ${effectiveType.toUpperCase()}`}
            size="sm"
        >
            <div className="hybrid-modal-body">
                <div className={`hybrid-icon-wrapper ${effectiveType}`}>
                    {getIcon()}
                </div>
                <div className="hybrid-text-wrapper">
                    <p className="hybrid-message">{message}</p>
                </div>
            </div>
            
            <div className="global-modal-footer">
                <button className="global-btn-secondary" onClick={onCancel}>
                    {cancelText}
                </button>
                <button className={`global-btn-${effectiveType === 'danger' ? 'danger' : 'primary'}`} onClick={onConfirm}>
                    {effectiveConfirmText}
                </button>
            </div>
        </Modal>
    );
};
