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
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Reset gallery index when tab changes
    useEffect(() => {
        setGalleryIndex(0);
    }, [activeTab]);

    let currentGalleryImages: { src: string; label: string; number: number; }[] = [];
    if (activeTab === "page1") {
        currentGalleryImages = [
            { src: showaCatalog1, label: "SHOWA Catalog Page 1", number: 1 },
            { src: showaCatalog2, label: "SHOWA Catalog Page 1", number: 2 },
            { src: showaCatalog3, label: "SHOWA Catalog Page 1", number: 3 },
            { src: showaCatalog4, label: "SHOWA Catalog Page 1", number: 4 },
            { src: showaCatalog5, label: "SHOWA Catalog Page 1", number: 5 },
            { src: showaCatalog6, label: "SHOWA Catalog Page 1", number: 6 },
            { src: showaCatalog7, label: "SHOWA Catalog Page 1", number: 7 },
        ];
    } else {
        currentGalleryImages = [
            { src: showaCatalog8, label: "SHOWA Catalog Page 2", number: 1 },
            { src: showaCatalog9, label: "SHOWA Catalog Page 2", number: 2 },
            { src: showaCatalog10, label: "SHOWA Catalog Page 2", number: 3 },
            { src: showaCatalog11, label: "SHOWA Catalog Page 2", number: 4 },
            { src: showaCatalog12, label: "SHOWA Catalog Page 2", number: 5 },
            { src: showaCatalog13, label: "SHOWA Catalog Page 2", number: 6 },
            { src: showaCatalog14, label: "SHOWA Catalog Page 2", number: 7 },
        ];
    }

    const safeGalleryIndex = galleryIndex >= currentGalleryImages.length ? 0 : galleryIndex;

    const handleGalleryNext = () => {
        setGalleryIndex((prev) => (prev + 1) % currentGalleryImages.length);
    };

    const handleGalleryPrev = () => {
        setGalleryIndex((prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length);
    };

    const minSwipeDistance = 50;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart === null || touchEnd === null) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleGalleryNext();
        } else if (isRightSwipe) {
            handleGalleryPrev();
        }
    };

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

            {/* Navigation Bar — above the header */}
            <div className="lesson-tabs" style={{ marginTop: "0", marginBottom: "1rem" }}>
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

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {/* Step 1 */}

                    {/* ── Image Gallery ── */}
                    <div
                        className="gallery-container mt-2"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                            width: "100%",
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Image Frame */}
                        <div
                            style={{
                                width: "100%",
                                height: "1300px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                borderRadius: "8px",
                            }}
                        >
                            <img
                                src={currentGalleryImages[safeGalleryIndex].src}
                                alt={currentGalleryImages[safeGalleryIndex].label}
                                loading="lazy"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </div>

                        {/* Slider Controls & Indicators */}
                        {currentGalleryImages.length > 1 && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "1rem",
                                    width: "100%",
                                    marginTop: "1rem"
                                }}
                            >
                                <button
                                    onClick={handleGalleryPrev}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "var(--accent)",
                                        padding: "0.25rem",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={22} />
                                </button>

                                <div style={{ textAlign: "center" }}>
                                    <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)", display: "block" }}>
                                        {currentGalleryImages[safeGalleryIndex].label}
                                    </span>
                                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                        Image {currentGalleryImages[safeGalleryIndex].number} of {currentGalleryImages.length}
                                    </span>
                                </div>

                                <button
                                    onClick={handleGalleryNext}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "var(--accent)",
                                        padding: "0.25rem",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </div>
                        )}
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

export default ShowaCatalog;
