import React from 'react';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import '../styles/ConfirmationModal.css';

export interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'confirm' | 'danger' | 'info';
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm Action',
    cancelText = 'Cancel',
    type = 'confirm',
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        const iconSize = 24;
        switch (type) {
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
            tag={`SYSTEM_REQUEST // ${type.toUpperCase()}`}
            size="sm"
        >
            <div className="hybrid-modal-body">
                <div className={`hybrid-icon-wrapper ${type}`}>
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
                <button className={`global-btn-${type === 'danger' ? 'danger' : 'primary'}`} onClick={onConfirm}>
                    {confirmText}
                </button>
            </div>
        </Modal>
    );
};
