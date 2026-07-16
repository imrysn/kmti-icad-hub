import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import crossRefImg from "../../../../assets/Standard/Kemco_JIS_Standard/crossref_&_previousdwg.png";

interface CrossRefPreviousDwgProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Cross Ref. No. & Previous Dwg. No.",
    "Please review the Cross Ref. No. & Previous Dwg. No. reference.",
];

const CrossRefPreviousDwg: React.FC<CrossRefPreviousDwgProps> = ({
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
    } = useLessonCore("cross-ref");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "cross-ref" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "cross-ref",
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

            <section className="lesson-intro">
                <KaraokeLessonText
                    as="h3"
                    className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                    data-reading-index="0"
                    text="Cross Ref. No. & Previous Dwg. No."
                    isActive={isSpeaking && currentIndex === 0}
                    currentCharIndex={currentCharIndex}
                />
            </section>

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
                                text="Please review the Cross Ref. No. & Previous Dwg. No. reference."
                                isActive={isSpeaking && currentIndex === 1}
                                currentCharIndex={currentCharIndex}
                            />
                        </div>
                    </div>

                    {/* ── Cross Ref & Previous Dwg Image ── */}
                    <div className="step-description" style={{ marginTop: "2rem" }}>
                        <img
                            src={crossRefImg}
                            alt="Cross Ref. No. & Previous Dwg. No."
                            className="software-screenshot mt-4"
                            style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
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

export default CrossRefPreviousDwg;
