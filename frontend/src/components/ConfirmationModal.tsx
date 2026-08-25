import { AlertTriangle,CheckCircle2,Info } from 'lucide-react';
import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import './ConfirmationModal.css';
import { Modal } from './Modal';

export interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
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
    confirmText,
    cancelText,
    type = 'confirm',
    onConfirm,
    onCancel
}) => {
    const { t } = useTranslation();
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
                    {cancelText || t('common.cancel')}
                </button>
                <button className={`global-btn-${type === 'danger' ? 'danger' : 'primary'}`} onClick={onConfirm}>
                    {confirmText || t('common.confirm_action')}
                </button>
            </div>
        </Modal>
    );
};
