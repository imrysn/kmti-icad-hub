import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import boltAndBoltImg from "../../../../assets/Standard/Kemco_JIS_Standard/bolt_and_bolt.png";
import boltLengthImg from "../../../../assets/Standard/Kemco_JIS_Standard/bolt_length.png";

interface BoltingKemcoStandardProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Bolt Hole Diameter Standard",
    "Bolt Length Standard",
];

const BoltingKemcoStandard: React.FC<BoltingKemcoStandardProps> = ({
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
    } = useLessonCore("bolting-kemco");

    const [activeTab, setActiveTab] = useState<'bolt-hole' | 'bolt-length'>('bolt-hole');

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "bolting-kemco" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "bolting-kemco",
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

            <div className="lesson-tabs" style={{ marginTop: "0", marginBottom: "1rem" }}>
                <button
                    className={`tab-button ${activeTab === "bolt-hole" ? "active" : ""}`}
                    onClick={() => setActiveTab("bolt-hole")}
                >
                    Bolt Hole
                </button>
                <button
                    className={`tab-button ${activeTab === "bolt-length" ? "active" : ""}`}
                    onClick={() => setActiveTab("bolt-length")}
                >
                    Bolt Length
                </button>
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {/* ── Section 1: Bolt Hole Diameter Standard ── */}
                    {activeTab === 'bolt-hole' && (
                    <>
                    <div className="card-header">
                        <h4 className="section-title"> Bolt Hole </h4>
                    </div>
                    {/* Bolt Hole Diameter Image */}
                    <div className="step-description" style={{ marginTop: "1rem", alignItems: "center" }}>
                        <img
                            src={boltAndBoltImg}
                            alt="Bolt Hole Diameter Standard"
                            className="software-screenshot"
                            style={{ maxWidth: "90%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                        />
                    </div>
                    </>
                    )}

                    {/* ── Section 2: Bolt Length Standard ── */}
                    {activeTab === 'bolt-length' && (
                    <>
                    <div className="card-header">
                        <h4 className="section-title"> Bolt Length </h4>
                    </div>
                    <div>
                        <div className="step-description" style={{ alignItems: "center" }}>
                            <img
                                src={boltLengthImg}
                                alt="Bolt Length Standard"
                                className="software-screenshot"
                                style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                            />
                        </div>
                    </div>
                    </>
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

export default BoltingKemcoStandard;
