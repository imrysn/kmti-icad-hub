import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Sub-lesson Content Components ---
import AddDimensionsAndNotesContent from "./AddDimensionsAndNotesContent";
import DimensioningHoleContent from "./DimensioningHoleContent";
import DimensioningChamferContent from "./DimensioningChamferContent";
import AddingNotesContent from "./AddingNotesContent";

interface AddDimentionAndNotesProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
    subLessonId?: string;
}

const AddDimentionAndNotes: React.FC<AddDimentionAndNotesProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
    subLessonId,
}) => {
    const { scrollProgress, containerRef } = useLessonCore(subLessonId || "sw-2d-add-dimension-notes");

    const sectionTitle = subLessonId === 'sw-2d-dimensioning-hole'
        ? 'Dimensioning Hole'
        : subLessonId === 'sw-2d-dimensioning-chamfer'
            ? 'Dimensioning Chamfer'
            : subLessonId === 'sw-2d-adding-notes'
                ? 'Adding Notes'
                : 'Add dimensions and notes';

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

                    {(subLessonId === 'sw-2d-add-dimension-notes' || !subLessonId || subLessonId === 'sw-2d-add-dimension-notes-base') && <AddDimensionsAndNotesContent />}
                    {subLessonId === 'sw-2d-dimensioning-hole' && <DimensioningHoleContent />}
                    {subLessonId === 'sw-2d-dimensioning-chamfer' && <DimensioningChamferContent />}
                    {subLessonId === 'sw-2d-adding-notes' && <AddingNotesContent />}

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

export default AddDimentionAndNotes;
