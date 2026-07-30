import React, { useState, useEffect } from "react";
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
    "Retaining Rings-C (JIS Standard)",
    "Retaining Rings Specifications (OCHIAI)",
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

    const [activeTab, setActiveTab] = useState<"internal" | "external">("external");

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
                    {/* Navigation Bar */}
                    <div className="lesson-tabs" style={{ marginTop: "0", marginBottom: "1rem" }}>
                        <button
                            className={`tab-button ${activeTab === "external" ? "active" : ""}`}
                            onClick={() => setActiveTab("external")}
                        >
                            External
                        </button>
                        <button
                            className={`tab-button ${activeTab === "internal" ? "active" : ""}`}
                            onClick={() => setActiveTab("internal")}
                        >
                            Internal
                        </button>
                    </div>

                    <div className="lesson-grid single-card">
                        <div className="lesson-card tab-content fade-in">
                            {/* Images for JIS Standard */}
                            {activeTab === "internal" ? (
                                <div className="step-description" style={{ marginTop: "1rem", alignItems: "center" }}>
                                    <img
                                        src={retainerRing2Img}
                                        alt="Retaining Ring Internal"
                                        className="software-screenshot"
                                        style={{ maxWidth: "90%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                    />
                                </div>
                            ) : (
                                <div className="step-description" style={{ marginTop: "1rem", alignItems: "center" }}>
                                    <img
                                        src={retainerRing1Img}
                                        alt="Retaining Ring External"
                                        className="software-screenshot"
                                        style={{ maxWidth: "90%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                    />
                                </div>
                            )}

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
                    
                    <div className="lesson-grid single-card">
                        <div className="lesson-card tab-content fade-in">
                            <div
                                className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}
                                data-reading-index="1"
                                style={{ marginTop: "1rem" }}
                            >
                                {/* Image 3 */}
                                <div className="step-description" style={{ alignItems: "center" }}>
                                    <img
                                        src={retainerRing3Img}
                                        alt="Retaining Ring Specifications Internal"
                                        className="software-screenshot"
                                        style={{ maxWidth: "90%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                    />
                                </div>

                                {/* Image 4 */}
                                <div className="step-description" style={{ marginTop: "1rem", alignItems: "center" }}>
                                    <img
                                        src={retainerRing4Img}
                                        alt="Retaining Ring Specifications External"
                                        className="software-screenshot"
                                        style={{ maxWidth: "90%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
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
