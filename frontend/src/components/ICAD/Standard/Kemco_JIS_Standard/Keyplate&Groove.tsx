import React, { useState, useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";

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

    const currentImages = activeTab === "keyplate" ? [
        { src: keywayPlateImg, label: "Key Plate & Groove", number: 1 }
    ] : [
        { src: oilGrooveImg, label: "Oil Groove", number: 1 }
    ];

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

            <ImageGalleryViewer
                images={currentImages}
                showCounter={false}
                onPrev={handlePrev}
                onNext={handleNext}
                nextLabel={nextLabel}
                prevDisabled={!onPrevLesson}
            />
        </div>
    );
};

export default KeyplateGroove;
