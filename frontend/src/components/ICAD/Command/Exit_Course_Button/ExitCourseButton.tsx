import React, { useState, useEffect } from 'react';
import { useUI } from '../../../../context/UIContext';
import { ICADCommandView } from '../../../../views/mentor/components/ICADCommandView';

interface ExitCourseButtonProps {
    onExit?: (view?: typeof ICADCommandView) => void;
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

export function useExitCourseHandler(onExit?: (view?: typeof ICADCommandView) => void) {
    const { requestConfirmation } = useUI();

    const handleExitCourse = async () => {
        try {
            const confirmed = await requestConfirmation({
                title: 'SUSPEND LEARNING SESSION',
                message: 'Are you sure you want to disconnect? Your current progress has been safely synchronized. You will be returned to the module hub.',
                confirmText: 'Suspend Session',
                type: 'info'
            });
            if (confirmed) {
                if (onExit) {
                    onExit(ICADCommandView);
                }
                window.dispatchEvent(new CustomEvent('resetCourseView'));
            }
        } catch (err) {
            console.error('[handleExitCourse] Confirmation failed:', err);
        }
    };

    return handleExitCourse;
}

interface ExitCourseButtonComponentProps {
    onExit?: (view?: typeof ICADCommandView) => void;
}

function ExitCourseButton({ onExit }: ExitCourseButtonComponentProps) {
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
        <div
            style={{
                position: 'sticky',
                top: 0,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '56px',
                padding: '0 20px',
                backgroundColor: theme === 'dark' ? '#000000' : 'transparent',
                borderBottom: '1px solid var(--border-color)',
                boxSizing: 'border-box',
            }}
        >
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
        </div>
    );
}

export default ExitCourseButton;