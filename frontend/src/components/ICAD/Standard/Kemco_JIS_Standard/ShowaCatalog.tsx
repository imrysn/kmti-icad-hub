import React, { useState, useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import "../../../../styles/2D_Drawing/CourseLesson.css";
import ImageGalleryViewer from "../ImageGalleryViewer";

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
        registerText,
    } = useLessonCore("showa-catalog");

    const [activeTab, setActiveTab] = useState<"page1" | "page2">("page1");

    let currentGalleryImages: { src: string; label: string; number: number; }[] = [];
    if (activeTab === "page1") {
        currentGalleryImages = [
            { src: showaCatalog1, label: "SHOWA Catalog Page 1 - 1/7", number: 1 },
            { src: showaCatalog2, label: "SHOWA Catalog Page 1 - 2/7", number: 2 },
            { src: showaCatalog3, label: "SHOWA Catalog Page 1 - 3/7", number: 3 },
            { src: showaCatalog4, label: "SHOWA Catalog Page 1 - 4/7", number: 4 },
            { src: showaCatalog5, label: "SHOWA Catalog Page 1 - 5/7", number: 5 },
            { src: showaCatalog6, label: "SHOWA Catalog Page 1 - 6/7", number: 6 },
            { src: showaCatalog7, label: "SHOWA Catalog Page 1 - 7/7", number: 7 },
        ];
    } else {
        currentGalleryImages = [
            { src: showaCatalog8, label: "SHOWA Catalog Page 2 - 1/7", number: 1 },
            { src: showaCatalog9, label: "SHOWA Catalog Page 2 - 2/7", number: 2 },
            { src: showaCatalog10, label: "SHOWA Catalog Page 2 - 3/7", number: 3 },
            { src: showaCatalog11, label: "SHOWA Catalog Page 2 - 4/7", number: 4 },
            { src: showaCatalog12, label: "SHOWA Catalog Page 2 - 5/7", number: 5 },
            { src: showaCatalog13, label: "SHOWA Catalog Page 2 - 6/7", number: 6 },
            { src: showaCatalog14, label: "SHOWA Catalog Page 2 - 7/7", number: 7 },
        ];
    }

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

            <ImageGalleryViewer
                images={currentGalleryImages}
                showCounter={false}
                onPrev={handlePrev}
                onNext={handleNext}
                nextLabel={nextLabel}
                prevDisabled={!onPrevLesson}
            />
        </div>
    );
};

export default ShowaCatalog;
