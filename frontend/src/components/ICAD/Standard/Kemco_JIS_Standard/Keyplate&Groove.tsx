import React, { useEffect } from "react";
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

            {/* ── Section 1: Key Plate & Groove ── */}
            <section className="lesson-intro">
                <KaraokeLessonText
                    as="h3"
                    className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                    data-reading-index="0"
                    text="Key Plate & Groove"
                    isActive={isSpeaking && currentIndex === 0}
                    currentCharIndex={currentCharIndex}
                />
            </section>

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {/* Key Plate & Groove Image */}
                    <div className="step-description" style={{ marginTop: "1rem" }}>
                        <img
                            src={keywayPlateImg}
                            alt="Key Plate & Groove"
                            className="software-screenshot mt-4"
                            style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                        />
                    </div>

                    {/* ── Section 2: Oil Groove ── */}
                    <div
                        className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}
                        data-reading-index="1"
                        style={{ marginTop: "3rem" }}
                    >
                        <div className="step-header">
                            <KaraokeLessonText
                                as="h4"
                                className="step-label"
                                text="Oil Groove"
                                isActive={isSpeaking && currentIndex === 1}
                                currentCharIndex={currentCharIndex}
                                style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "1rem" }}
                            />
                        </div>
                        <div className="step-description">
                            <img
                                src={oilGrooveImg}
                                alt="Oil Groove"
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
        </div>
    );
};

export default KeyplateGroove;
