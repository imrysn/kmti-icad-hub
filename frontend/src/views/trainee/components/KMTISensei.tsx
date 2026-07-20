import React from 'react';

interface Props {
    title?: string;
    message?: string;
    text?: string;
    visible?: boolean;
    onClose?: () => void;
    onNext?: () => void;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    step?: number;
    totalSteps?: number;
}

export const KMTISensei = ({ title, message, text, visible = true, onClose, onNext, position = 'bottom', step, totalSteps }: Props) => {
    if (!visible) return null;
    return (
        <div className={`kmti-sensei-tutorial ${position}`} style={{ padding: '1rem', background: '#ffe', border: '1px solid #ccc', borderRadius: '8px', zIndex: 9999, position: 'absolute' }}>
            {title && <strong>{title}</strong>}
            <p>{message || text}</p>
            {step && totalSteps && <small>Step {step} of {totalSteps}</small>}
            <div style={{ marginTop: '10px' }}>
                {onClose && <button onClick={onClose} style={{ marginRight: '10px' }}>Close</button>}
                {onNext && <button onClick={onNext}>Next</button>}
            </div>
        </div>
    );
}


export default KMTISensei;
