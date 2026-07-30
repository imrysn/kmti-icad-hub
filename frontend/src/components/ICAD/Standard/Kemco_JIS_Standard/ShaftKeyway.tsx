import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import shaftKeywayImg from "../../../../assets/Standard/Kemco_JIS_Standard/Shaft_Keyway.png";

interface ShaftKeywayProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Please review the Shaft Keyway reference",
];

const ShaftKeyway: React.FC<ShaftKeywayProps> = ({
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
        currentCharIndex,
        registerText,
    } = useLessonCore("shaft-keyway");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "shaft-keyway" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "shaft-keyway",
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
                    <div
                        className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}
                        data-reading-index="1"
                    >
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <KaraokeLessonText
                                as="span"
                                className="step-label"
                                text="Please review the Shaft Keyway reference"
                                isActive={isSpeaking && currentIndex === 1}
                                currentCharIndex={currentCharIndex}
                            />
                        </div>
                    </div>

                    {/* ── Shaft Keyway Image ── */}
                    <div className="step-description" style={{ marginTop: "1rem", alignItems: "center" }}>
                        <img
                            src={shaftKeywayImg}
                            alt="Shaft Keyway"
                            className="software-screenshot"
                            style={{ maxWidth: "80%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                        />
                    </div>

                    {/* Page Navigation */}
                    <div className="lesson-navigation mt-12">
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

export default ShaftKeyway;
