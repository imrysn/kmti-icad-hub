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
        >
            <button
                className="exit-course-btn command-exit-course-btn"
                onClick={handleExitCourse}
            >
                <LogOut size={16} aria-hidden="true" />
                <span>EXIT COURSE</span>
            </button>
        </div>
    );
}

export default ExitCourseButton;
