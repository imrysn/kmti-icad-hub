import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import newBranchImg from "../../../../../assets/Solidworks/2D_Operation/2D_New_Branch.png";
import jogLeaderImg from "../../../../../assets/Solidworks/2D_Operation/2D_Jog_Leader.png";
import arrowHeadImg from "../../../../../assets/Solidworks/2D_Operation/2D_Arrow_Head.png";
import addJogPointImg from "../../../../../assets/Solidworks/2D_Operation/2D_Add_Jog_Point.png";
import jogPointImg from "../../../../../assets/Solidworks/2D_Operation/2D_Jog_Point.png";

interface InsertNewBranchAndJogPointProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
    subLessonId?: string;
}

const InsertNewBranchAndJogPoint: React.FC<InsertNewBranchAndJogPointProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
    subLessonId,
}) => {
    const { scrollProgress, containerRef } = useLessonCore(subLessonId || "sw-2d-insert-new-branch-base");
    
    const isJogPoint = subLessonId === 'sw-2d-add-jog-point';

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">
                            {isJogPoint ? 'Add Jog Point' : 'Insert New Branch'}
                        </h4>
                    </div>

                    {!isJogPoint ? (
                        <div className="fade-in" style={{ marginTop: '2rem' }}>
                            {/* Step 1 */}
                            <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">1</span>
                                    <span className="step-label">Right click on the leader of the welding symbol.</span>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="instruction-step" style={{ padding: '2rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">2</span>
                                    <span className="step-label">Click Insert New Branch.</span>
                                </div>
                                <div className="step-description">
                                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                        <img
                                            src={newBranchImg}
                                            alt="Insert New Branch"
                                            className="software-screenshot screenshot-wide"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">3</span>
                                    <span className="step-label">Position the new branch.</span>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="instruction-step" style={{ padding: '2rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">4</span>
                                    <span className="step-label">Double click the welding symbol to display the properties.</span>
                                </div>
                                <div className="step-description">
                                    <p className="p-flush" style={{ color: 'var(--text-normal)' }}>
                                        Uncheck <strong>Use multi jog leader</strong>, then click <strong>OK</strong>.
                                    </p>
                                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                        <img
                                            src={jogLeaderImg}
                                            alt="Use multi jog leader"
                                            className="software-screenshot screenshot-wide"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">5</span>
                                    <span className="step-label">Change the Arrow Head.</span>
                                </div>
                                <div className="step-description">
                                    <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                    </p>
                                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                        <img
                                            src={arrowHeadImg}
                                            alt="Change Arrow Head"
                                            className="software-screenshot screenshot-wide"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="fade-in" style={{ marginTop: '2rem' }}>
                            {/* Step 1 */}
                            <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">1</span>
                                    <span className="step-label">Right click on the leader of the welding symbol.</span>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="instruction-step" style={{ padding: '2rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">2</span>
                                    <span className="step-label">Click Add Jog Point.</span>
                                </div>
                                <div className="step-description">
                                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                        <img
                                            src={addJogPointImg}
                                            alt="Add Jog Point"
                                            className="software-screenshot screenshot-wide"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">3</span>
                                    <span className="step-label">Click on the leader line.</span>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="instruction-step" style={{ padding: '2rem 0' }}>
                                <div className="step-header">
                                    <span className="step-number">4</span>
                                    <span className="step-label">Adjust the Jog Point.</span>
                                </div>
                                <div className="step-description">
                                    <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                        <img
                                            src={jogPointImg}
                                            alt="Adjust Jog Point"
                                            className="software-screenshot screenshot-wide"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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

export default InsertNewBranchAndJogPoint;
