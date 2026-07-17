import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/3D_Modeling/CourseLesson.css";

/* Assets */
import originPlacementImg from "../../../../assets/3D_Image_File/origin_change_3d_part_layout_2345.png";
import materialsLayersImg from "../../../../assets/Standard/Kemco_JIS_Standard/3d_standard_materials&layers.png";

interface ThreeDStandardLessonProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "3D STANDARD",
    "REMINDER:",
    "Place the origin in the correct position for both the parts and the assembly.",
    "Ensure all dimensions are applied in 3D.",
    "Apply materials and layers to all 3D parts and assemblies, particularly the purchased parts.",
    "Please remember to check interference in the 3D assemblies.",
];

const ThreeDStandardLesson: React.FC<ThreeDStandardLessonProps> = ({
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
    } = useLessonCore("kemco-3d-standard");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "kemco-3d-standard" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "kemco-3d-standard",
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

            <section className="lesson-intro">
                <KaraokeLessonText
                    as="h3"
                    className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                    data-reading-index="0"
                    text="3D STANDARD"
                    isActive={isSpeaking && currentIndex === 0}
                    currentCharIndex={currentCharIndex}
                />
                <KaraokeLessonText
                    className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
                    data-reading-index="1"
                    text="REMINDER:"
                    isActive={isSpeaking && currentIndex === 1}
                    currentCharIndex={currentCharIndex}
                />
            </section>

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {/* Item 1 */}
                    <div
                        className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}
                        data-reading-index="2"
                    >
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <KaraokeLessonText
                                as="span"
                                className="step-label"
                                text="Place the origin in the correct position for both the parts and the assembly."
                                isActive={isSpeaking && currentIndex === 2}
                                currentCharIndex={currentCharIndex}
                            />
                        </div>
                        <div className="step-description">
                            <img
                                src={originPlacementImg}
                                alt="Origin Placement"
                                className="software-screenshot mt-4"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div
                        className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}
                        data-reading-index="3"
                    >
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <KaraokeLessonText
                                as="span"
                                className="step-label"
                                text="Ensure all dimensions are applied in 3D."
                                isActive={isSpeaking && currentIndex === 3}
                                currentCharIndex={currentCharIndex}
                            />
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div
                        className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`}
                        data-reading-index="4"
                    >
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <KaraokeLessonText
                                as="span"
                                className="step-label"
                                text="Apply materials and layers to all 3D parts and assemblies, particularly the purchased parts."
                                isActive={isSpeaking && currentIndex === 4}
                                currentCharIndex={currentCharIndex}
                            />
                        </div>
                        <div className="step-description">
                            <img
                                src={materialsLayersImg}
                                alt="Materials and Layers"
                                className="software-screenshot mt-4"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div
                        className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`}
                        data-reading-index="5"
                    >
                        <div className="step-header">
                            <span className="step-number">4 </span>
                            <KaraokeLessonText
                                as="span"
                                className="step-label"
                                text="Please remember to check interference in the 3D assemblies."
                                isActive={isSpeaking && currentIndex === 5}
                                currentCharIndex={currentCharIndex}
                            />
                        </div>
                    </div>

                    <div className="lesson-navigation">
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

export default ThreeDStandardLesson;
