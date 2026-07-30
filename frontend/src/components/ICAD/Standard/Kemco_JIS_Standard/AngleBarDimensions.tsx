import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import unequalLegImg from "../../../../assets/Standard/Kemco_JIS_Standard/angle_bar_unequal_leg.png";
import equalLegImg from "../../../../assets/Standard/Kemco_JIS_Standard/angle_bar_equal_leg.png";

interface AngleBarDimensionsLessonProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Unequal Leg",
    "Equal Leg"
];

const AngleBarDimensionsLesson: React.FC<AngleBarDimensionsLessonProps> = ({
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
    } = useLessonCore("angle-bar-dimensions");

    const [activeTab, setActiveTab] = useState<'unequal' | 'equal'>('unequal');

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "angle-bar-dimensions" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "angle-bar-dimensions",
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

            {/* Navigation Bar — above the header */}
            <div className="lesson-tabs" style={{ marginTop: "0", marginBottom: "1rem" }}>
                <button
                    className={`tab-button ${activeTab === "unequal" ? "active" : ""}`}
                    onClick={() => setActiveTab("unequal")}
                >
                    Unequal Leg
                </button>
                <button
                    className={`tab-button ${activeTab === "equal" ? "active" : ""}`}
                    onClick={() => setActiveTab("equal")}
                >
                    Equal Leg
                </button>
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {/* Section: Unequal Leg */}
                    {activeTab === 'unequal' && (
                        <div
                            className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}
                            data-reading-index="1"
                        >
                            <div className="step-description" style={{ alignItems: "center" }}>
                                <img
                                    src={unequalLegImg}
                                    alt="Unequal Leg Angle Bar Dimensions"
                                    className="software-screenshot"
                                    style={{ maxWidth: "70%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Section: Equal Leg */}
                    {activeTab === 'equal' && (
                        <div
                            className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}
                            data-reading-index="2"
                        >
                            <div className="step-description" style={{ alignItems: "center" }}>
                                <img
                                    src={equalLegImg}
                                    alt="Equal Leg Angle Bar Dimensions"
                                    className="software-screenshot"
                                    style={{ maxWidth: "70%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                                />
                            </div>
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
        </div>
    );
};

export default AngleBarDimensionsLesson;

