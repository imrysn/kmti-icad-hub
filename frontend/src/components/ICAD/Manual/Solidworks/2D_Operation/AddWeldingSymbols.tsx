import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import oilLeakageImg from "../../../../../assets/Solidworks/2D_Operation/2D_Oil_Leakage.png";
import weldSymbolImg from "../../../../../assets/Solidworks/2D_Operation/2D_Weld_Symbol.png";
import weldingPropertiesImg from "../../../../../assets/Solidworks/2D_Operation/2D_Welding_Properties.png";

interface AddWeldingSymbolsProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const AddWeldingSymbols: React.FC<AddWeldingSymbolsProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-welding-symbols");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">Add welding symbols</h4>
                    </div>

                    {/* Reference Image */}
                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                        <img
                            src={oilLeakageImg}
                            alt="Welding Symbols Reference"
                            className="software-screenshot screenshot-wide"
                        />
                    </div>

                    {/* Step 1 */}
                    <div className="instruction-step">
                        <div className="step-header" style={{padding:'8px 0px'}}>
                            <span className="step-number">1</span>
                            <span className="step-label">Under Annotation, click Weld Symbol.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                <img
                                    src={weldSymbolImg}
                                    alt="Weld Symbol"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header" style={{padding:'8px 0px'}}>
                            <span className="step-number">2</span>
                            <span className="step-label">Welding Properties will appear.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                <img
                                    src={weldingPropertiesImg}
                                    alt="Welding Properties"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="instruction-step">
                        <div className="step-header" style={{padding:'8px 0px'}}>
                            <span className="step-number">3</span>
                            <span className="step-label">Place the welding symbol.</span>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="instruction-step">
                        <div className="step-header" style={{padding:'8px 0px'}}>
                            <span className="step-number">4</span>
                            <span className="step-label">Click OK</span>
                        </div>
                    </div>

                    {/* Lesson Navigation */}
                    <div className="lesson-navigation" style={{ marginTop: "3rem" }}>
                        <button
                            className="nav-button"
                            onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                            <ChevronLeft size={18} /> Previous
                        </button>
                        <button
                            className="nav-button next"
                            onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        >
                            {nextLabel || 'Next'} <ChevronRight size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddWeldingSymbols;
    