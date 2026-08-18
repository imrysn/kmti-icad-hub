import React, { useState, useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";

/* Static Assets */
import retainingRing1Img from "../../../../assets/Standard/Kemco_JIS_Standard/RetainerRing1.png";
import retainingRing2Img from "../../../../assets/Standard/Kemco_JIS_Standard/RetainerRing2.png";
import retainingRing3Img from "../../../../assets/Standard/Kemco_JIS_Standard/RetainerRing3.png";
import retainingRing4Img from "../../../../assets/Standard/Kemco_JIS_Standard/RetainerRing4.png";

interface RetainerRingProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    subLessonId?: string;
}

const reminderSteps = [
    "C-type Retaining Ring For Shaft",
    "C-Type Concentric Retaining Ring for shaft",
    "C-type retaining ring for hole",
    "C-type Concentric retaining ring for hole"
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
        registerText,
    } = useLessonCore("retainer-ring");

    const [activeTab, setActiveTab] = useState<'external' | 'internal'>('external');

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
        if (isMain && activeTab === "external") setActiveTab("internal");
        else if (onNextLesson) onNextLesson();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePrev = () => {
        stop();
        if (isMain && activeTab === "internal") setActiveTab("external");
        else if (onPrevLesson) onPrevLesson();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const isMain = !subLessonId || subLessonId === 'retainer-ring-main';

    const imagesMainExternal = [{ src: retainingRing1Img, label: "Retaining Rings-C Type-External", number: 1 }];
    const imagesMainInternal = [{ src: retainingRing2Img, label: "Retaining Rings-C Type-Internal", number: 1 }];
    const imagesSpec = [
        { src: retainingRing3Img, label: "Retaining Rings (External)", number: 1 },
        { src: retainingRing4Img, label: "Retaining Rings (External)", number: 2 }
    ];

    const currentImages = isMain
        ? (activeTab === 'external' ? imagesMainExternal : imagesMainInternal)
        : imagesSpec;

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            {isMain && (
                <div className="lesson-tabs" style={{ marginTop: "0", marginBottom: "1rem" }}>
                    <button
                        className={`tab-button ${activeTab === 'external' ? "active" : ""}`}
                        onClick={() => setActiveTab('external')}
                    >
                        EXTERNAL
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'internal' ? "active" : ""}`}
                        onClick={() => setActiveTab('internal')}
                    >
                        INTERNAL
                    </button>
                </div>
            )}

            <ImageGalleryViewer
                images={currentImages}
                showCounter={true}
                onPrev={handlePrev}
                onNext={handleNext}
                nextLabel={isMain && activeTab === "external" ? "Next" : (nextLabel || "Next Lesson")}
                prevDisabled={!onPrevLesson && (!isMain || activeTab === "external")}
            />
        </div>
    );
};

export default RetainerRing;
