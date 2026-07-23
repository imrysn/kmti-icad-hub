import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Content Components ---
import Video_SolidWorks_Interface from "./Video_SolidWorks_Interface";
import MouseControlContent from "./MouseControlContent";
import KeyboardShortcutsContent from "./KeyboardShortcutsContent";
import MenuBarContent from "./MenuBarContent";
import CommandManagerContent from "./CommandManagerContent";
import HeadsUpViewToolbarContent from "./HeadsUpViewToolbarContent";
import FeatureManagerTreeViewContent from "./FeatureManagerTreeViewContent";
import CoordinateSystemContent from "./CoordinateSystemContent";
import StatusBarContent from "./StatusBarContent";

interface SolidworkIntroProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
    subLessonId?: string;
}

const SolidworkIntroLesson: React.FC<SolidworkIntroProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
    subLessonId,
}) => {
    if (!subLessonId || subLessonId === 'sw-interface') {
        return <Video_SolidWorks_Interface onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    }

    const { scrollProgress, containerRef } = useLessonCore(subLessonId);

    const sectionTitle = subLessonId === 'sw-mouse-control'
        ? 'MOUSE CONTROL'
        : subLessonId === 'sw-keyboard-shortcuts'
            ? 'KEYBOARD SHORTCUTS'
            : subLessonId === 'sw-menu-bar'
                ? 'MENU BAR'
                : subLessonId === 'sw-command-manager'
                    ? 'COMMAND MANAGER'
                    : subLessonId === 'sw-heads-up-view-toolbar'
                        ? 'HEADS-UP VIEW TOOLBAR'
                        : subLessonId === 'sw-feature-manager-tree-view'
                            ? 'FEATUREMANAGER TREE VIEW'
                            : subLessonId === 'sw-coordinate-system'
                                ? 'COORDINATE SYSTEM'
                                : subLessonId === 'sw-status-bar'
                                    ? 'STATUS BAR'
                                    : 'SOLIDWORKS INTERFACE';

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">{sectionTitle}</h4>
                    </div>
                    {subLessonId === 'sw-mouse-control' && <MouseControlContent />}
                    {subLessonId === 'sw-keyboard-shortcuts' && <KeyboardShortcutsContent />}
                    {subLessonId === 'sw-menu-bar' && <MenuBarContent />}
                    {subLessonId === 'sw-command-manager' && <CommandManagerContent />}
                    {subLessonId === 'sw-heads-up-view-toolbar' && <HeadsUpViewToolbarContent />}
                    {subLessonId === 'sw-feature-manager-tree-view' && <FeatureManagerTreeViewContent />}
                    {subLessonId === 'sw-coordinate-system' && <CoordinateSystemContent />}
                    {subLessonId === 'sw-status-bar' && <StatusBarContent />}

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
        </div>
    );
};

export default SolidworkIntroLesson;
