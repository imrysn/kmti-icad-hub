import React, { useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";

/* Static Assets */
import crossRefImg from "../../../../assets/Standard/Kemco_JIS_Standard/crossref_&_previousdwg.png";

interface CrossRefPreviousDwgProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Please review the Cross Ref. No. & Previous Dwg. No. reference",
];

const images = [
    { src: crossRefImg, label: "Cross Ref. No. & Previous Dwg. No.", alt: "Cross Reference Drawing", number: 1 }
];

const CrossRefPreviousDwg: React.FC<CrossRefPreviousDwgProps> = ({
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
    } = useLessonCore("cross-ref");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "cross-ref" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "cross-ref",
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

            <ImageGalleryViewer
                images={images}
                onPrev={handlePrev}
                onNext={handleNext}
                nextLabel={nextLabel}
                prevDisabled={!onPrevLesson}
            />
        </div>
    );
};

export default CrossRefPreviousDwg;
