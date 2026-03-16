import React from 'react';
import { AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';
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
        const iconSize = 18;
        switch (type) {
            case 'danger': return <AlertTriangle size={iconSize} />;
            case 'info': return <Info size={iconSize} />;
            default: return <CheckCircle2 size={iconSize} />;
        }
    };

    return (
        <div className="modal-overlay hybrid-overlay" onClick={onCancel}>
            <div className={`hybrid-modal-container ${type}`} onClick={e => e.stopPropagation()}>
                {/* Subtle Technical Markers */}
                <div className="hybrid-marker tl" />
                <div className="hybrid-marker br" />
                
                <div className="hybrid-modal-header">
                    <div className="hybrid-context-tag">
                        <span className="bit" />
                        SYSTEM_REQUEST // {type.toUpperCase()}
                    </div>
                </div>

                <div className="hybrid-modal-body">
                    <div className={`hybrid-icon-wrapper ${type}`}>
                        {getIcon()}
                    </div>
                    <div className="hybrid-text-wrapper">
                        <h3 className="hybrid-title">{title}</h3>
                        <p className="hybrid-message">{message}</p>
                    </div>
                </div>
                
                <div className="hybrid-modal-footer">
                    <button className="hybrid-btn-secondary" onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button 
                        className={`hybrid-btn-primary ${type}`} 
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
