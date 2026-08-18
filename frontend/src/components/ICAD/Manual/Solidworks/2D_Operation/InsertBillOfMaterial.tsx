import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import insertMenuImg from "../../../../../assets/Solidworks/2D_Operation/2D_Insert_Menu.png";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import bomImg from "../../../../../assets/Solidworks/2D_Operation/2D_BOM.png";
import bom1Img from "../../../../../assets/Solidworks/2D_Operation/2D_BOM1.png";
import bom2Img from "../../../../../assets/Solidworks/2D_Operation/2D_BOM2.png";
import flagImg from "../../../../../assets/Solidworks/2D_Operation/2D_Flag.png";
import flagIconsImg from "../../../../../assets/Solidworks/2D_Operation/2D_Flag_Icons.png";

interface InsertBillOfMaterialProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const InsertBillOfMaterial: React.FC<InsertBillOfMaterialProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-insert-bom");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">Insert Bill of Material (BOM)</h4>
                    </div>

                    <div className="fade-in" style={{ marginTop: '2rem' }}>
                        {/* Step 1 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">1</span>
                                <span className="step-label">In the <strong>Insert</strong> menu, under <strong>Tables</strong>, click <strong>Bill of Materials</strong>.</span>
                            </div>
                            <img src={insertMenuImg} alt="Insert Menu Image" style={{height:'20rem', width:'30rem'}}/>
                        </div>

                        {/* Step 2 */}
                        <div className="instruction-step" style={{ padding: '2rem 0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">2</span>
                                <span className="step-label">Click the part/assembly drawing.</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">3</span>
                                <span className="step-label">Edit the <strong>Table Template</strong>.</span>
                            </div>
                            <div className="step-description">
                                <div className="instruction-box" style={{ marginTop: '0.5rem' }}>
                                    <p className="p-flush red-text">
                                        ※ Choose <strong>BOM-JFE</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="instruction-step" style={{ padding: '2rem 0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">4</span>
                                <span className="step-label">Edit <strong>BOM Type</strong>, then select <strong>Top-level only</strong>.</span>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">5</span>
                                <span className="step-label">
                                    Click <img src={checkImg} alt="Check mark" style={{ height: '25px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />
                                </span>
                            </div>
                        </div>

                        {/* Step 6 */}
                        <div className="instruction-step" style={{ padding: '2rem 0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">6</span>
                                <span className="step-label">Position the Bill of Material.</span>
                            </div>
                            <div className="step-description">
                                <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                    <img
                                        src={bomImg}
                                        alt="Position BOM"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>
                                
                                {/* Additional Information Section */}
                                <div className="instruction-box" style={{ marginTop: '2rem' }}>
                                    <h5 style={{ color: 'var(--text-normal)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                                        Table Template
                                    </h5>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                        It varies depending on the project.
                                    </p>

                                    <h5 style={{ color: 'var(--text-normal)', marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                                        BOM Type
                                    </h5>
                                    <ul style={{ paddingLeft: '1.25rem', margin: '0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>
                                            <strong>Top-level only</strong> – Show part/sub-assembly on the FeatureManager Design Tree.
                                        </li>
                                        <li style={{ marginBottom: '0.5rem' }}>
                                            <strong>Parts only</strong> – Show all parts.
                                        </li>
                                        <li>
                                            <strong>Indented</strong> – Show sub-assemblies including their parts.
                                        </li>
                                    </ul>
                                </div>

                                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                    <p className="p-flush" style={{ color: 'var(--text-normal)', marginBottom: '1rem', fontWeight: 500 }}>
                                        After positioning the Bill of Material.
                                    </p>
                                    <img
                                        src={bom1Img}
                                        alt="BOM Positioned"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 7 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">7</span>
                                <span className="step-label">Click the Bill of Material.</span>
                            </div>
                            <div className="step-description">
                                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                    <img
                                        src={bom2Img}
                                        alt="Click BOM"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>

                                <div style={{ marginTop: '2rem' }}>
                                    <p className="p-flush" style={{ color: 'var(--text-normal)', lineHeight: '2' }}>
                                        By clicking this{' '}
                                        <img 
                                            src={flagImg} 
                                            alt="Flag icon" 
                                            style={{ height: '35px', verticalAlign: 'middle', display: 'inline-block', margin: '0 6px', border: '1px solid #ccc', borderRadius: '2px' }} 
                                        />{' '}
                                        these icons will appear.
                                    </p>
                                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                        <img
                                            src={flagIconsImg}
                                            alt="Flag Icons"
                                            className="software-screenshot screenshot-wide"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lesson Navigation */}
                    <div className="lesson-navigation">
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
                            {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InsertBillOfMaterial;
