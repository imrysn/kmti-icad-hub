import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Content Components ---
import Video_SolidWorks_Interface from "./Video_SolidWorks_Interface";
import MouseControlContent from "./MouseControlContent";
import KeyboardShortcutsContent from "./KeyboardShortcutsContent";

interface SolidworkIntroProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
    subLessonId?: string;
    setActiveLessonId?: (id: string) => void;
}

const INTRO_TABS = [
    { id: 'sw-interface', label: 'Interface' },
    { id: 'sw-mouse-control', label: 'Mouse Control' },
    { id: 'sw-keyboard-shortcuts', label: 'Keyboard Shortcuts' },
];

const SolidworkIntroLesson: React.FC<SolidworkIntroProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
    subLessonId = 'sw-interface',
    setActiveLessonId,
}) => {
    // Initialize scroll progress and indices for the active sub-lesson
    const { scrollProgress, containerRef, currentIndex } = useLessonCore(subLessonId);

    const sectionTitle = subLessonId === 'sw-mouse-control'
        ? 'MOUSE CONTROL'
        : subLessonId === 'sw-keyboard-shortcuts'
            ? 'KEYBOARD SHORTCUTS'
            : 'SOLIDWORKS INTERFACE';

    return (
        <div className="course-lesson-container" ref={containerRef}>
            {/* Unified Progress Bar at the very top */}
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            {/* Unified Lesson Tabs below the progress bar */}
            <div className="lesson-tabs" style={{ marginTop: '1rem' }}>
                {INTRO_TABS.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${subLessonId === tab.id ? 'active' : ''}`}
                        onClick={() => {
                            if (setActiveLessonId) setActiveLessonId(tab.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Sub-lesson content */}
            {subLessonId === 'sw-interface' ? (
                <Video_SolidWorks_Interface 
                    onNextLesson={onNextLesson} 
                    onPrevLesson={onPrevLesson} 
                    nextLabel={nextLabel} 
                    currentIndex={currentIndex}
                />
            ) : (
                <div className="lesson-grid single-card">
                    <div className="lesson-card fade-in">
                        {/* Header */}
                        <div className="card-header">
                            <h4 className="section-title">{sectionTitle}</h4>
                        </div>
                        {subLessonId === 'sw-mouse-control' && <MouseControlContent />}
                        {subLessonId === 'sw-keyboard-shortcuts' && <KeyboardShortcutsContent />}

                        {/* Lesson Navigation */}
                        <div className="lesson-navigation" style={{ marginTop: "2rem" }}>
                            <button
                                className="nav-button"
                                onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            >
                                <ChevronLeft size={18} /> Previous
                            </button>
                            <button
                                className="nav-button next"
                                onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            >
                                {nextLabel || 'Next'} <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SolidworkIntroLesson;
