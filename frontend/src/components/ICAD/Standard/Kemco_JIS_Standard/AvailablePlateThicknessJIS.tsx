import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */

interface AvailablePlateThicknessJISProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Please review the available plate thickness reference.",
];

const AvailablePlateThicknessJIS: React.FC<AvailablePlateThicknessJISProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const {
        scrollProgress,
        containerRef,
        speak,
        stop,
        isSpeaking,
        currentIndex,
        registerText,
    } = useLessonCore("available-plate-thickness-jis");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "available-plate-thickness-jis" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "available-plate-thickness-jis",
        reminderSteps.length,
        tabsList,
        () => { if (onNextLesson) onNextLesson(); },
        speak,
        reminderSteps,
        0
    );

    const handleNext = () => {
        stop();
        if (onNextLesson) onNextLesson();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrev = () => {
        stop();
        if (onPrevLesson) onPrevLesson();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {/* Step 1 */}

                    {/* ── Plate Thickness Table ── */}
                    <div className="card-header">
                        <h4 className="section-title"> Plate Thickness </h4>
                    </div>
                    <div className="step-description lesson-table-container" style={{ marginTop: "1rem", width: "100%", maxWidth: "900px", margin: "1rem auto 0 auto" }}>
                        <table className="lesson-table" style={{ width: "100%", textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th colSpan={4}>
                                        AVAILABLE PLATE THICKNESS<br />(JIS)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["2.3mm", "12mm", "28mm", "45mm"],
                                    ["3.2mm", "16mm", "32mm", "50mm"],
                                    ["4.5mm", "19mm", "36mm", "63mm"],
                                    ["6mm", "22mm", "38mm", ""],
                                    ["9mm", "25mm", "40mm", ""]
                                ].map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, colIndex) => (
                                            <td key={colIndex}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Page Navigation */}
                    <div className="lesson-navigation">
                        <button
                            className="nav-button"
                            onClick={handlePrev}
                            disabled={!onPrevLesson}
                        >
                            <ChevronLeft size={18} /> Previous
                        </button>
                        <button className="nav-button next" onClick={handleNext}>
                            {nextLabel || "Next Lesson"} <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailablePlateThicknessJIS;
