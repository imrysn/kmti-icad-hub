import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import hiddenVisibleImg from "../../../../../assets/Solidworks/2D_Operation/2D_HIdden_Visible.png";
import modelViewImg from "../../../../../assets/Solidworks/2D_Operation/2D_Model_View.png";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import projectViewImg from "../../../../../assets/Solidworks/2D_Operation/2D_Project_View.png";
import projectView1Img from "../../../../../assets/Solidworks/2D_Operation/2D_Project_View1.png";
import hiddenRemoveImg from "../../../../../assets/Solidworks/2D_Operation/2D_HIdden_Remove.png";
import tangentEdgesRemovedImg from "../../../../../assets/Solidworks/2D_Operation/2D_Tandgent_Edges_Removed.png";
import clickLineImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Line.png";
import clickHideImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Hide.png";
import clickShowImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Show.png";
import centerLineImg from "../../../../../assets/Solidworks/2D_Operation/2D_Center_Line.png";
import twoEdgesImg from "../../../../../assets/Solidworks/2D_Operation/2D_Two_Edges.png";
import centerMarkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Center_Mark.png";
import centerMark1Img from "../../../../../assets/Solidworks/2D_Operation/2D_Center_Mark1.png";

interface InsertMainViewsProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const InsertMainViews: React.FC<InsertMainViewsProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-insert-main-views");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">
                    
                    {/* Section 1: Insert main views */}
                    <div className="card-header">
                        <h4 className="section-title">Insert main views of the parts/assy</h4>
                    </div>
                    <div className="instruction-step" style={{ padding: '0', marginTop: '1.5rem', marginBottom: '2rem' }}>
                        <div className="step-description">
                            <div className="instruction-box" style={{ border: 'none', background: 'transparent', padding: 0 }}>
                                <p className="p-flush red-text">
                                    ※ In page 21, No.3 Insert Parts, Use No.1 for inserting the part.
                                </p>
                            </div>
                            
                            <ol style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-normal)', lineHeight: '2.2' }}>
                                <li>
                                    On Display Style, Click the Hidden Lines Visible <img src={hiddenVisibleImg} alt="Hidden Lines Visible" style={{ height: '24px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                                </li>
                                <li>
                                    Click Use Custom Scale then set the scale to 1:2.
                                </li>
                                <li>
                                    Click on the sheet to drop the part.
                                </li>
                                <li>
                                    Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                                </li>
                            </ol>

                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img
                                    src={modelViewImg}
                                    alt="Insert Main Views"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Projected View */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title">Projected View</h4>
                    </div>
                    <div className="instruction-step" style={{ padding: '0', marginTop: '1.5rem', marginBottom: '2rem' }}>
                        <div className="step-description">
                            <div style={{ color: 'var(--text-normal)', lineHeight: '2.2' }}>
                                <p className="p-flush">1 Right click on the area of the View.</p>
                                <p className="p-flush">2 Click Projected View.</p>
                                <p className="p-flush">3 Position the view needed.</p>
                                <p className="p-flush">4 Click on the sheet to drop the view.</p>
                                <p className="p-flush">5 Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></p>
                            </div>

                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img
                                    src={projectViewImg}
                                    alt="Projected View Step 1"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent', padding: 0 }}>
                                <p className="p-flush red-text">
                                    ※ Projected View are automatically aligned to the Main view except views projected diagonally.
                                </p>
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent', padding: 0 }}>
                                <p className="p-flush red-text">
                                    ※ Project view until all the needed views are inserted.<br/>
                                    <span style={{ color: 'var(--text-normal)' }}>(See page 23 Projected View)</span>
                                </p>
                            </div>

                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img
                                    src={projectView1Img}
                                    alt="Projected View Step 2"
                                    className="software-screenshot screenshot-wide"
                                />
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent', padding: 0 }}>
                                <p className="p-flush red-text">※ Click the Isometric view.</p>
                                <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                                    ※ On Display Style, Click Hidden Lines Removed <img src={hiddenRemoveImg} alt="Hidden Lines Removed" style={{ height: '24px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Hide/Show Lines */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title">Hide/Show Lines</h4>
                    </div>
                    <div className="instruction-step" style={{ padding: '0', marginTop: '1.5rem', marginBottom: '2rem' }}>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-normal)' }}>
                                There are 2 ways to hide/show lines.
                            </p>

                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                                {/* Column 1: Tangent Edge */}
                                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                                    <div className="instruction-step" style={{ padding: '0' }}>
                                        <div className="step-header">
                                            <span className="step-number">1 </span>
                                            <span className="step-label">Tangent Edge</span>
                                        </div>
                                        <div className="step-description">
                                            <ol style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-normal)', lineHeight: '2.2' }}>
                                                <li>Click a view.</li>
                                                <li>Right click on the view then point on Tangent Edge.</li>
                                                <li>Click Tangent Edges Removed.</li>
                                            </ol>
                                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                                <img
                                                    src={tangentEdgesRemovedImg}
                                                    alt="Tangent Edges Removed"
                                                    className="software-screenshot"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Column 2: Hide/Show Edges */}
                                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                                    <div className="instruction-step" style={{ padding: '0' }}>
                                        <div className="step-header">
                                            <span className="step-number">2 </span>
                                            <span className="step-label">Hide/Show Edges</span>
                                        </div>
                                        <div className="step-description">
                                            <ol style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-normal)', lineHeight: '2.2' }}>
                                                <li>Click a line.</li>
                                            </ol>
                                            <div className="image-wrapper" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                                                <img
                                                    src={clickLineImg}
                                                    alt="Click Line"
                                                    className="software-screenshot"
                                                />
                                            </div>
                                            <ol start={2} style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-normal)', lineHeight: '2.2' }}>
                                                <li>Click Hide/Show Edges.</li>
                                            </ol>
                                            <div className="image-wrapper" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                                                <img
                                                    src={clickHideImg}
                                                    alt="Click Hide"
                                                    className="software-screenshot"
                                                />
                                            </div>
                                            <div className="image-wrapper" style={{ marginTop: '0.5rem' }}>
                                                <img
                                                    src={clickShowImg}
                                                    alt="Click Show"
                                                    className="software-screenshot"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="instruction-box" style={{ marginTop: '2rem', border: 'none', background: 'transparent', padding: 0 }}>
                                        <p className="p-flush red-text">
                                            ※ Press CTRL then pick line will able the user to select another line then hide lines simultaneously.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Centerline */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title">Centerline</h4>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">In Annotation, click Center line.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={centerLineImg} alt="Center line" className="software-screenshot" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Select two edges to manually insert centerlines.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={twoEdgesImg} alt="Two edges" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                        </div>
                    </div>

                    {/* Section 5: Center Mark */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title">Center Mark</h4>
                    </div>
                    
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">In Annotation, click Center Mark.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={centerMarkImg} alt="Center Mark Properties" className="software-screenshot" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Select hole/slot hole.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={centerMark1Img} alt="Select hole" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                        </div>
                        <div className="step-description">
                            <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent', padding: 0 }}>
                                <p className="p-flush red-text">
                                    ※ Click the holes to manually insert center mark.
                                </p>
                            </div>
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

export default InsertMainViews;
