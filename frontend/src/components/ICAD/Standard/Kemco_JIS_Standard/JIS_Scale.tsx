import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import jisScaleImg from "../../../../assets/Standard/Kemco_JIS_Standard/jis_scale.png";

interface JISScaleProps {
    nextLabel?: string;
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
}

const reminderSteps = [
    "Please review the JIS Scale reference",
];

const JISScale: React.FC<JISScaleProps> = ({
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
    } = useLessonCore("jis-scale");

    useEffect(() => {
        registerText(reminderSteps, 0);
    }, [registerText]);

    const tabsList = [{ id: "jis-scale" }];

    useTTSAutoplay(
        isSpeaking,
        currentIndex,
        "jis-scale",
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

            <div className="lesson-grid single-card">
                <div className="lesson-card tab-content fade-in">

                    {/* Step 1 */}
                    <div className="card-header">
                        <h4 className="section-title"> JIS Scale </h4>
                    </div>

                    {/* ── JIS Scale Table ── */}
                    <div className="step-description lesson-table-container" style={{ marginTop: "1rem", width: "100%", maxWidth: "900px", margin: "1rem auto 0 auto" }}>
                        <table className="lesson-table" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th style={{ background: 'rgba(221, 77, 250, 0.1)', color: '#DD4DFA', borderBottom: '2px solid #DD4DFA', width: "30%", textAlign: "center" }}>TYPE</th>
                                    <th style={{ background: 'rgba(221, 77, 250, 0.1)', color: '#DD4DFA', borderBottom: '2px solid #DD4DFA', textAlign: "center" }}>SCALE JIS Z 8314</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { type: "CURRENT MEASURE", values: "1:1" },
                                    { type: "Upsize (1)", values: "2:1、 5:1、 10:1、 20:1、 50:1" },
                                    { type: "Upsize (2)", values: "√2:1\u00A0\u00A02.5:√2:1\u00A0\u00A0100:1" },
                                    { type: "Down Size (1)", values: "1:2、 (1:3)、 (1:4)、 1:5、 1:10、 1:20、 1:50" },
                                    { type: "Down Size (2)", values: "1:√2\u00A0\u00A01:2.5\u00A0\u00A01:2√2\u00A0\u00A01:3\u00A0\u00A01:4\u00A0\u00A01:5√2\u00A0\u00A01:25\u00A0\u00A01:250" },
                                ].map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td style={{ textAlign: "center" }}>{row.type}</td>
                                        <td style={{ textAlign: "left", letterSpacing: "1px" }}>{row.values}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default JISScale;
