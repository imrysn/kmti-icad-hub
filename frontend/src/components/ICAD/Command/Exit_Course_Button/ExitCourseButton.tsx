import { LogOut } from 'lucide-react';
import { useUI } from '../../../../context/UIContext';
import { ICADCommandView } from '../../../../views/mentor/components/ICADCommandView';

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

    return (
        <div
            className="lesson-action-cluster command-exit-action-cluster"
            style={{
                width: '100%',
            }}
        >
            <button
                className="exit-course-btn command-exit-course-btn"
                onClick={handleExitCourse}
                style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '12.8px',
                    padding: '8px 16px',
                    letterSpacing: '0.3px',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    lineHeight: '1.6',
                    fontWeight: 700,
                    transition: 'color 0.15s ease',
                    textAlign: 'center',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                }}
            >
                <LogOut size={16} aria-hidden="true" />
                <span>EXIT COURSE</span>
            </button>
        </div>
    );
}

export default ExitCourseButton;
