import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import keywayPlateImg from "../../../../assets/Standard/Kemco_JIS_Standard/Keyway_Plates&Shaft_Ends.png";
import oilGrooveImg from "../../../../assets/Standard/Kemco_JIS_Standard/Oil_Groove_Shape.png";

interface KeyplateGrooveProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Key Plate & Groove",
    "Oil Groove",
];

const KeyplateGroove: React.FC<KeyplateGrooveProps> = ({
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
    } = useLessonCore("keyplate-groove");

    const [activeTab, setActiveTab] = useState<"keyplate" | "oil groove">("keyplate");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "keyplate-groove" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "keyplate-groove",
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

            {/* Navigation Bar */}
            <div className="lesson-tabs" style={{ marginTop: "0", marginBottom: "1rem" }}>
                <button
                    className={`tab-button ${activeTab === "keyplate" ? "active" : ""}`}
                    onClick={() => setActiveTab("keyplate")}
                >
                    Keyplate
                </button>
                <button
                    className={`tab-button ${activeTab === "oil groove" ? "active" : ""}`}
                    onClick={() => setActiveTab("oil groove")}
                >
                    Oil Groove
                </button>
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {activeTab === "keyplate" ? (
                        <div className="step-description" style={{ marginTop: "1rem", alignItems: "center"}}>
                            <img
                                src={keywayPlateImg}
                                alt="Key Plate & Groove"
                                className="software-screenshot"
                                style={{ maxWidth: "80%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                            />
                        </div>
                    ) : (
                        <div
                            className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}
                            data-reading-index="1"
                            style={{ marginTop: "1rem" }}
                        >
                            <div className="step-description" style={{ marginTop: "0rem", alignItems: "center"}}>
                                <img
                                    src={oilGrooveImg}
                                    alt="Oil Groove"
                                    className="software-screenshot"
                                    style={{ maxWidth: "90%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
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

export default KeyplateGroove;
