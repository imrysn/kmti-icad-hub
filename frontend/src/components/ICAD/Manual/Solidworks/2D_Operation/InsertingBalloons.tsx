import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import balloonImg from "../../../../../assets/Solidworks/2D_Operation/2D_Balloon.png";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import balloon1Img from "../../../../../assets/Solidworks/2D_Operation/2D_Balloon1.png";
import balloon2Img from "../../../../../assets/Solidworks/2D_Operation/2D_Balloon2.png";
import balloon3Img from "../../../../../assets/Solidworks/2D_Operation/2D_Balloon3.png";

interface InsertingBalloonsProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const InsertingBalloons: React.FC<InsertingBalloonsProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-inserting-balloons");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">Inserting Balloons</h4>
                    </div>

                    <div className="fade-in" style={{ marginTop: '2rem' }}>
                        {/* Step 1 */}
                        <div className="instruction-step" style={{ padding: '0.2rem 0' }}>
                            <div className="step-header">
                                <span className="step-number">1 </span>
                                <span className="step-label">In <strong>Annotation</strong> toolbar, click <strong>Balloon</strong>.</span>
                            </div>
                            <div className="step-description">
                                <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                    <img
                                        src={balloonImg}
                                        alt="Balloon toolbar"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="instruction-step" style={{ padding: '2rem 0' }}>
                            <div className="step-header">
                                <span className="step-number">2 </span>
                                <span className="step-label">Select edge/face of part to add balloon.</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header">
                                <span className="step-number">3 </span>
                                <span className="step-label">Position the balloon.</span>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="instruction-step" style={{ padding: '2rem 0' }}>
                            <div className="step-header">
                                <span className="step-number">4 </span>
                                <span className="step-label">
                                    Click <img src={checkImg} alt="Check mark" style={{ height: '24px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                                </span>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header">
                                <span className="step-number">5 </span>
                                <span className="step-label">
                                    Repeat 1, 2 and 3 until all necessary balloons are inserted then click <img src={checkImg} alt="Check mark" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                                </span>
                            </div>
                            <div className="step-description">
                                <div className="image-wrapper" style={{ marginTop: '0.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <img
                                        src={balloon1Img}
                                        alt="Balloon positioning 1"
                                        className="software-screenshot screenshot-wide"
                                    />
                                    <img
                                        src={balloon2Img}
                                        alt="Balloon positioning 2"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>
                                
                                {/* Note Section */}
                                <div className="instruction-box" style={{ marginTop: '2rem' }}>
                                    <p className="p-flush red-text">
                                        ※ Edit balloon leader if needed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Edit Balloon Leader Section */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title" style={{ fontSize: '1.1rem' }}>Edit Balloon Leader</h4>
                    </div>

                    <div className="fade-in" style={{ marginTop: '0.5rem' }}>
                        {/* Step 1 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header">
                                <span className="step-number">1 </span>
                                <span className="step-label">Click the balloon.</span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="instruction-step" style={{ padding: '2rem 0' }}>
                            <div className="step-header">
                                <span className="step-number">2 </span>
                                <span className="step-label">Click <strong>More Properties</strong>.</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header">
                                <span className="step-number">3 </span>
                                <span className="step-label">Edit Balloon Leader. (Use <strong>Multi-jog Leader</strong>)</span>
                            </div>
                            <div className="step-description">
                                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                    <img
                                        src={balloon3Img}
                                        alt="Edit Balloon Leader"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Note */}
                    <div className="instruction-box" style={{ marginTop: '2rem' }}>
                        <p className="p-flush red-text" style={{ textAlign: 'center', width: '100%', fontWeight: 500 }}>
                            ※ Leader can be changed depending on the need of the balloon.
                        </p>
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

export default InsertingBalloons;
