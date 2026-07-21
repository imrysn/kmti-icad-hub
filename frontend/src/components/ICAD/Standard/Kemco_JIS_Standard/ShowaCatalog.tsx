import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets - Page 1 */
import showaCatalog1 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog1.png";
import showaCatalog2 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog2.png";
import showaCatalog3 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog3.png";
import showaCatalog4 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog4.png";
import showaCatalog5 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog5.png";
import showaCatalog6 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog6.png";
import showaCatalog7 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog7.png";

/* Static Assets - Page 2 */
import showaCatalog8 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog8.png";
import showaCatalog9 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog9.png";
import showaCatalog10 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog10.png";
import showaCatalog11 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog11.png";
import showaCatalog12 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog12.png";
import showaCatalog13 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog13.png";
import showaCatalog14 from "../../../../assets/Standard/Kemco_JIS_Standard/Showa_Catalog14.png";

interface ShowaCatalogProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "SHOWA Catalog",
    "Please review the SHOWA Catalog for reference.",
];

const ShowaCatalog: React.FC<ShowaCatalogProps> = ({
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
    } = useLessonCore("showa-catalog");

    const [activeTab, setActiveTab] = useState<"page1" | "page2">("page1");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "showa-catalog" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "showa-catalog",
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
                    text="SHOWA Catalog"
                    isActive={isSpeaking && currentIndex === 0}
                    currentCharIndex={currentCharIndex}
                />
                
                {/* Navigation Bar */}
                <div className="lesson-tabs" style={{ marginTop: "1rem", marginBottom: "0" }}>
                    <button
                        className={`tab-button ${activeTab === "page1" ? "active" : ""}`}
                        onClick={() => setActiveTab("page1")}
                    >
                        Page 1
                    </button>
                    <button
                        className={`tab-button ${activeTab === "page2" ? "active" : ""}`}
                        onClick={() => setActiveTab("page2")}
                    >
                        Page 2
                    </button>
                </div>
            </section>

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {/* Step 1 */}
                    <div
                        className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}
                        data-reading-index="1"
                    >
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <KaraokeLessonText
                                as="span"
                                className="step-label"
                                text="Please review the SHOWA Catalog for reference."
                                isActive={isSpeaking && currentIndex === 1}
                                currentCharIndex={currentCharIndex}
                            />
                        </div>
                    </div>

                    {/* Images Page 1 */}
                    {activeTab === "page1" && (
                        <>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog1} alt="SHOWA Catalog 1" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog2} alt="SHOWA Catalog 2" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog3} alt="SHOWA Catalog 3" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog4} alt="SHOWA Catalog 4" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog5} alt="SHOWA Catalog 5" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog6} alt="SHOWA Catalog 6" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog7} alt="SHOWA Catalog 7" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                        </>
                    )}

                    {/* Images Page 2 */}
                    {activeTab === "page2" && (
                        <>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog8} alt="SHOWA Catalog 8" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog9} alt="SHOWA Catalog 9" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog10} alt="SHOWA Catalog 10" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog11} alt="SHOWA Catalog 11" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog12} alt="SHOWA Catalog 12" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog13} alt="SHOWA Catalog 13" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
                            </div>
                            <div className="step-description" style={{ marginTop: "2rem" }}>
                                <img src={showaCatalog14} alt="SHOWA Catalog 14" className="software-screenshot mt-4" style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
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

export default ShowaCatalog;
