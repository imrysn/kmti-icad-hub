import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import createImg from "../../../../../assets/Solidworks/2D_Operation/2D_Create.png";
import jfeImg from "../../../../../assets/Solidworks/2D_Operation/2D_JFE.png";
import okImg from "../../../../../assets/Solidworks/2D_Operation/2D_Ok.png";
import layoutImg from "../../../../../assets/Solidworks/2D_Operation/2D_Layout.png";
import dragImg from "../../../../../assets/Solidworks/2D_Operation/2D_Drag.png";
import clickImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click.png";
import makeImg from "../../../../../assets/Solidworks/2D_Operation/2D_Make.png";
import viewImg from "../../../../../assets/Solidworks/2D_Operation/2D_View.png";

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
                            <span className="step-number">1</span>
                            <span className="step-label">Create New File</span>
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
                            <span className="step-number">2</span>
                            <span className="step-label">Select New Document</span>
                        </div>
                        <div className="step-description">
                            <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                
                                    Click <strong>A2 - JFE</strong>{'                '}
                                    <span className="image-wrapper-flush">
                                        <img src={jfeImg} alt="A2 - JFE icon" style={{ height: '40px', verticalAlign: 'middle' }} />
                                    </span>
                                
                                <div></div>
                                    Click <strong>OK</strong> or Double click <strong>A2 - JFE</strong>.
                                
                            </ol>

                            <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                <img
                                    src={okImg}
                                    alt="Select New Document Dialog"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <div className="instruction-box" style={{ marginTop: '0.5rem' }}>
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
                            <span className="step-number">3</span>
                            <span className="step-label">Insert Parts/ Assembly</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                There are <strong>3 ways</strong> on inserting parts/assy in dwg.
                            </p>

                            <div className="instruction-step" style={{ paddingTop: '1rem', paddingBottom: '0' }}>
                                <div className="step-header">
                                    <span className="step-number">1</span>
                                    <span className="step-label">View Layout &gt; Model View &gt; Browse file from the folder &gt; Click Assem1 then Open.</span>
                                </div>
                                <div className="step-description">
                                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                        <img src={layoutImg} alt="Insert Parts/Assembly via View Layout" className="software-screenshot screenshot-wide" />
                                    </div>
                                    <div className="instruction-box" style={{ marginTop: '0.5rem' }}>
                                        <p className="p-flush red-text">※ It only inserts a part/assy view individually.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="instruction-step" style={{ paddingTop: '1.5rem', paddingBottom: '0' }}>
                                <div className="step-header">
                                    <span className="step-number">2</span>
                                    <span className="step-label">Drag and Drop</span>
                                </div>
                                <div className="step-description">
                                    <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                                        <p className="p-flush red-text">※ Hold the part/assy file from the folder then drag to the dwg sheet.</p>
                                    </div>
                                    <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                        <img src={dragImg} alt="Drag and Drop" className="software-screenshot screenshot-wide" />
                                    </div>
                                </div>
                            </div>

                            <div className="instruction-step" style={{ paddingTop: '1.5rem', paddingBottom: '0' }}>
                                <div className="step-header">
                                    <span className="step-number">3</span>
                                    <span className="step-label">Make drawing from Part/Assy</span>
                                </div>
                                <div className="step-description">
                                    <p className="p-flush" style={{ color: 'var(--text-normal)' }}>
                                        Open the 3D part/assy &gt; Click <img src={clickImg} alt="Click" style={{ height: '60px', verticalAlign: 'middle', display: 'inline-block', margin: '0 4px' }} /> &gt; Make Drawing from Part/Assembly
                                    </p>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
                                            <div className="image-wrapper">
                                                <img src={makeImg} alt="Make Drawing from Part/Assembly" className="software-screenshot screenshot-wide" />
                                            </div>
                                        </div>
                                        <div style={{ flex: '0 1 auto', minWidth: '200px' }}>
                                            <div className="instruction-box" style={{ marginTop: '0.2rem' }}>
                                                <p className="p-flush red-text">
                                                    ※ It uses <strong>View Palette</strong> where<br />
                                                    the user can choose then<br />
                                                    drag and drop the view.
                                                </p>
                                            </div>
                                            <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                                <img src={viewImg} alt="View Palette" className="software-screenshot" style={{ maxHeight: '400px', width: 'auto' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
