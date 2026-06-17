import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import '../styles/Modal.css';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
    tag?: string;
    overlayClassName?: string;
    containerClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
    tag,
    overlayClassName = '',
    containerClassName = ''
}) => {
    // Escape key listener to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={`global-modal-overlay ${overlayClassName}`} onClick={onClose}>
            <div 
                className={`global-modal-container ${size} ${containerClassName}`} 
                onClick={e => e.stopPropagation()}
            >
                {/* Technical Markers for tech aesthetic */}
                <div className="global-modal-marker tl" />
                <div className="global-modal-marker br" />

                {(title || tag || showCloseButton) && (
                    <div className="global-modal-header">
                        <div className="global-modal-header-left">
                            {tag && (
                                <div className="global-modal-tag">
                                    <span className="bit" />
                                    {tag}
                                </div>
                            )}
                            {title && <h3 className="global-modal-title">{title}</h3>}
                        </div>
                        {showCloseButton && (
                            <button className="global-modal-close-btn" onClick={onClose} aria-label="Close modal">
                                <X size={18} />
                            </button>
                        )}
                    </div>
                )}

                <div className="global-modal-body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

