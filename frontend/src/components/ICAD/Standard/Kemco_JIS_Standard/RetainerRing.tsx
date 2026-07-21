import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import retainerRing1Img from "../../../../assets/Standard/Kemco_JIS_Standard/RetainerRing1.png";
import retainerRing2Img from "../../../../assets/Standard/Kemco_JIS_Standard/RetainerRing2.png";
import retainerRing3Img from "../../../../assets/Standard/Kemco_JIS_Standard/RetainerRing3.png";
import retainerRing4Img from "../../../../assets/Standard/Kemco_JIS_Standard/RetainerRing4.png";

interface RetainerRingProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    subLessonId?: string;
}

const reminderSteps = [
    "Retainer Ring (JIS Standard)",
    "Retainer Ring Specifications (OCHIAI)",
];

const RetainerRing: React.FC<RetainerRingProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
    subLessonId = 'retainer-ring-main'
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
    } = useLessonCore("retainer-ring");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "retainer-ring" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "retainer-ring",
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

            {(!subLessonId || subLessonId === 'retainer-ring-main' || subLessonId === 'retainer-ring') && (
                <>
                    {/* ── Section 1: Retainer Ring (JIS Standard) ── */}
                    <section className="lesson-intro">
                        <KaraokeLessonText
                            as="h3"
                            className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                            data-reading-index="0"
                            text="Retainer Ring (JIS Standard)"
                            isActive={isSpeaking && currentIndex === 0}
                            currentCharIndex={currentCharIndex}
                        />
                    </section>

                    <div className="lesson-grid single-card">
                        <div className="lesson-card tab-content fade-in">
                            {/* Image 1 */}
                            <div className="step-description" style={{ marginTop: "1rem" }}>
                                <img
                                    src={retainerRing1Img}
                                    alt="Retainer Ring 1"
                                    className="software-screenshot mt-4"
                                    style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                />
                            </div>

                            {/* Image 2 */}
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img
                                    src={retainerRing2Img}
                                    alt="Retainer Ring 2"
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
                </>
            )}

            {subLessonId === 'retainer-ring-spec' && (
                <>
                    <section className="lesson-intro">
                        <KaraokeLessonText
                            as="h3"
                            className={`section-title ${currentIndex === 1 ? "reading-active" : ""}`}
                            data-reading-index="1"
                            text="Retainer Ring Specifications (OCHIAI)"
                            isActive={isSpeaking && currentIndex === 1}
                            currentCharIndex={currentCharIndex}
                        />
                    </section>
                    
                    <div className="lesson-grid single-card">
                        <div className="lesson-card tab-content fade-in">
                            <div
                                className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}
                                data-reading-index="1"
                                style={{ marginTop: "1rem" }}
                            >
                                {/* Image 3 */}
                                <div className="step-description">
                                    <img
                                        src={retainerRing3Img}
                                        alt="Retainer Ring Specifications 3"
                                        className="software-screenshot mt-4"
                                        style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                    />
                                </div>

                                {/* Image 4 */}
                                <div className="step-description" style={{ marginTop: "2rem" }}>
                                    <img
                                        src={retainerRing4Img}
                                        alt="Retainer Ring Specifications 4"
                                        className="software-screenshot mt-4"
                                        style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                    />
                                </div>
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
                </>
            )}
        </div>
    );
};

export default RetainerRing;
