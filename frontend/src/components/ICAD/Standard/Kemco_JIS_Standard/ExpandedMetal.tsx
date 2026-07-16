import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import expandedMetal1Img from "../../../../assets/Standard/Kemco_JIS_Standard/expanded_metal1.png";
import expandedMetal2Img from "../../../../assets/Standard/Kemco_JIS_Standard/expanded_metal2.png";

interface ExpandedMetalProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Expanded Metal",
    "Please review the Expanded Metal reference.",
];

const ExpandedMetal: React.FC<ExpandedMetalProps> = ({
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
    } = useLessonCore("expanded-metal");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "expanded-metal" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "expanded-metal",
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
                    text="Expanded Metal"
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
                                text="Please review the Expanded Metal reference."
                                isActive={isSpeaking && currentIndex === 1}
                                currentCharIndex={currentCharIndex}
                            />
                        </div>
                    </div>

                    {/* ── Expanded Metal Image 1 ── */}
                    <div className="step-description" style={{ marginTop: "2rem" }}>
                        <img
                            src={expandedMetal1Img}
                            alt="Expanded Metal 1"
                            className="software-screenshot mt-4"
                            style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                        />
                    </div>

                    {/* ── Expanded Metal Image 2 ── */}
                    <div className="step-description" style={{ marginTop: "2rem" }}>
                        <img
                            src={expandedMetal2Img}
                            alt="Expanded Metal 2"
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

export default ExpandedMetal;
