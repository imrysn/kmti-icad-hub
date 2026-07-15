import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import createImg from "../../../../../assets/Solidworks/2D_Operation/2D_Create.png";
import jfeImg from "../../../../../assets/Solidworks/2D_Operation/2D_JFE.png";
import okImg from "../../../../../assets/Solidworks/2D_Operation/2D_Ok.png";
import layoutImg from "../../../../../assets/Solidworks/2D_Operation/2D_Layout.png";

interface Page1Props {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const Page1Lesson: React.FC<Page1Props> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-operation-page1");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">Insert Components in the Part</h4>
                    </div>

                    {/* Step 1 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">Create New File (See page 3 No. 2)</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img
                                    src={createImg}
                                    alt="Create New File"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Select New Document (See page 3 No. 3)</span>
                        </div>
                        <div className="step-description">
                            <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                <li>
                                    Click <strong>A2 - JFE</strong>{'                '}
                                    <span className="image-wrapper-flush">
                                        <img src={jfeImg} alt="A2 - JFE icon" style={{ height: '40px', verticalAlign: 'middle' }} />
                                    </span>
                                </li>
                                <li>
                                    Click <strong>OK</strong> or Double click <strong>A2 - JFE</strong>.
                                </li>
                            </ol>

                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img
                                    src={okImg}
                                    alt="Select New Document Dialog"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                                <p className="p-flush red-text">
                                    ※ It varies depending on the project.
                                </p>
                                <p className="p-flush red-text" style={{ marginTop: '0.25rem' }}>
                                    ※ KMTI is making new template for each project to lessen the time of editing the properties of title block.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Insert Parts/ Assembly</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                There are <strong>3 ways</strong> on inserting parts/assy in dwg.
                            </p>
                            
                            <p className="p-flush" style={{ color: 'var(--text-normal)', marginTop: '1.5rem', fontWeight: 'bold' }}>
                                1. View Layout &gt; Model View &gt; Browse file from the folder &gt; Click Assem1 then Open.
                            </p>

                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img
                                    src={layoutImg}
                                    alt="Insert Parts/Assembly via View Layout"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                                <p className="p-flush red-text">
                                    ※ It only inserts a part/assy view individually.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lesson Navigation */}
                    <div className="lesson-navigation" style={{ marginTop: "2rem" }}>
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

export default Page1Lesson;
