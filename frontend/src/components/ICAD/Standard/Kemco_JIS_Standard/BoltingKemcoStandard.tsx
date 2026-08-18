import React, { useState, useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";

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
        if (activeTab === "bolt-hole") setActiveTab("bolt-length");
        else if (onNextLesson) onNextLesson();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrev = () => {
        stop();
        if (activeTab === "bolt-length") setActiveTab("bolt-hole");
        else if (onPrevLesson) onPrevLesson();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    const currentImages = activeTab === 'bolt-hole' ? [
        { src: boltAndBoltImg, label: "Bolt Hole", number: 1 }
    ] : [
        { src: boltLengthImg, label: "Bolt Length", number: 1 }
    ];

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

            <ImageGalleryViewer
                images={currentImages}
                showCounter={false}
                onPrev={handlePrev}
                onNext={handleNext}
                nextLabel={activeTab === "bolt-hole" ? "Next" : (nextLabel || "Next Lesson")}
                prevDisabled={activeTab === "bolt-hole" && !onPrevLesson}
            />
        </div>
    );
};

export default BoltingKemcoStandard;
