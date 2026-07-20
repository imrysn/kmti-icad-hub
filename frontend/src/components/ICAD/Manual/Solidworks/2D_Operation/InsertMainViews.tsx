import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Components ---
import InsertMainViewsContent from "./InsertMainViewsContent";
import ProjectedViewContent from "./ProjectedViewContent";
import HideShowLinesContent from "./HideShowLinesContent";
import CenterlineContent from "./CenterlineContent";
import CenterMarkContent from "./CenterMarkContent";

interface InsertMainViewsProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
    subLessonId?: string;
}

const InsertMainViews: React.FC<InsertMainViewsProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
    subLessonId,
}) => {
    const { scrollProgress, containerRef } = useLessonCore(subLessonId || "sw-2d-insert-main-views");

    const sectionTitle = subLessonId === 'sw-2d-projected-view'
        ? 'Projected View'
        : subLessonId === 'sw-2d-hide-show-lines'
            ? 'Hide/Show Lines'
            : subLessonId === 'sw-2d-centerline'
                ? 'Centerline'
                : subLessonId === 'sw-2d-center-mark'
                    ? 'Center Mark'
                    : 'Insert main views of the parts/assy';

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

                    {(subLessonId === 'sw-2d-insert-main-views' || !subLessonId || subLessonId === 'sw-2d-insert-main-views-base') && <InsertMainViewsContent />}
                    {subLessonId === 'sw-2d-projected-view' && <ProjectedViewContent />}
                    {subLessonId === 'sw-2d-hide-show-lines' && <HideShowLinesContent />}
                    {subLessonId === 'sw-2d-centerline' && <CenterlineContent />}
                    {subLessonId === 'sw-2d-center-mark' && <CenterMarkContent />}

                    {/* Lesson Navigation */}
                    <div className="lesson-navigation" style={{ marginTop: "3rem" }}>
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

export default InsertMainViews;
