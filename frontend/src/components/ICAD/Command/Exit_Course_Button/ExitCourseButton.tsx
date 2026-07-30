import React, { useState, useEffect } from 'react';
import { useUI } from '../../../../context/UIContext';


interface ExitCourseButtonProps {
    onExit: () => void;
}


function useCurrentTheme(): 'light' | 'dark' {
    const getTheme = () =>
        document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

    const [theme, setTheme] = useState<'light' | 'dark'>(getTheme);

    useEffect(() => {
        const observer = new MutationObserver(() => setTheme(getTheme()));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return theme;
}


export function useExitCourseHandler(onExit: () => void) {
    const { requestConfirmation } = useUI();

    const handleExitCourse = async () => {
        const confirmed = await requestConfirmation({
            title: 'SUSPEND LEARNING SESSION',
            message: 'Are you sure you want to disconnect? Your current progress has been safely synchronized. You will be returned to the module hub.',
            confirmText: 'Suspend Session',
            type: 'info'
        });
        if (confirmed) {
            onExit();
        }
    };

    return handleExitCourse;
}

function ExitCourseButton({ onExit }: ExitCourseButtonProps) {
    const handleExitCourse = useExitCourseHandler(onExit);
    const [isExitHovered, setIsExitHovered] = useState(false);
    const theme = useCurrentTheme();

    const exitButtonColors = theme === 'dark'
        ? {
            background: isExitHovered ? '#FCA5A5' : '#000000',
            border: isExitHovered ? '1px solid #FCA5A5' : '1px solid rgba(248, 81, 73, 0.6)',
            color: isExitHovered ? '#ffffffff' : '#FCA5A5',
        }
        : {

            background: isExitHovered ? '#cf222e' : 'rgba(252, 165, 165, 0.28)',
            border: '1px solid #FCA5A5',
            color: isExitHovered ? '#ffffffff' : '#FCA5A5',
        };

    return (
        <button
            className="exit-course-btn"
            onClick={handleExitCourse}
            onMouseEnter={() => setIsExitHovered(true)}
            onMouseLeave={() => setIsExitHovered(false)}
            style={{
                fontFamily: 'var(--font-main)',
                fontSize: '12.8px',
                padding: '8px 16px',
                letterSpacing: '0.3px',
                borderRadius: '6px',
                boxSizing: 'border-box',
                lineHeight: '1.6',
                fontWeight: 700,
                transition: 'background-color 0.15s ease, color 0.15s ease',
                textAlign: 'center',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                ...exitButtonColors,
            }}
        >
            EXIT COURSE
        </button>
    );
}

export default ExitCourseButton;