import React, { createContext, useContext, useState, useCallback } from 'react';
import { ConfirmationModal, ConfirmationModalProps } from '../components/ConfirmationModal';

interface UIContextType {
    requestConfirmation: (options: Omit<ConfirmationModalProps, 'isOpen' | 'onConfirm' | 'onCancel'>) => Promise<boolean>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalState, setModalState] = useState<ConfirmationModalProps & { resolve: (val: boolean) => void } | null>(null);

    const requestConfirmation = useCallback((options: Omit<ConfirmationModalProps, 'isOpen' | 'onConfirm' | 'onCancel'>) => {
        console.log('UIContext: requestConfirmation called', options);
        return new Promise<boolean>((resolve) => {
            setModalState({
                ...options,
                isOpen: true,
                onConfirm: () => {
                    setModalState(null);
                    resolve(true);
                },
                onCancel: () => {
                    setModalState(null);
                    resolve(false);
                },
                resolve
            });
        });
    }, []);

    return (
        <UIContext.Provider value={{ requestConfirmation }}>
            {children}
            {modalState && (
                <ConfirmationModal 
                    {...modalState}
                />
            )}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
