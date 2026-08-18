import React, { useState, useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";

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

    const currentImages = activeTab === "unequal" ? [
        { src: unequalLegImg, label: "Angle (unequal Leg) Standard Sizes", number: 1 }
    ] : [
        { src: equalLegImg, label: "Equal Angle Standard", number: 1 }
    ];

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

export default AngleBarDimensionsLesson;

