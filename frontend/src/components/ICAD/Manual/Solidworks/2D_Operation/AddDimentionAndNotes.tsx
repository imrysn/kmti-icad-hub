import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import smartDimension2Img from "../../../../../assets/Solidworks/2D_Operation/2D_Smart_Dimension2.png";
import dragDimensionImg from "../../../../../assets/Solidworks/2D_Operation/2D_Drag_Dimension.png";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import smartDimensionImg from "../../../../../assets/Solidworks/2D_Operation/2D_Smart_Dimension.png";
import smartDimension3Img from "../../../../../assets/Solidworks/2D_Operation/2D_Smart_Dimension3.png";
import numberHolesImg from "../../../../../assets/Solidworks/2D_Operation/2D_Number_Holes.png";
import chamferDimensionImg from "../../../../../assets/Solidworks/2D_Operation/2D_Chamfer_Dimension.png";
import chamferEdgeImg from "../../../../../assets/Solidworks/2D_Operation/2D_Chamfer_Edge.png";
import notesImg from "../../../../../assets/Solidworks/2D_Operation/2D_Notes.png";
import plImg from "../../../../../assets/Solidworks/2D_Operation/2D_PL.png";
import arrowTypeImg from "../../../../../assets/Solidworks/2D_Operation/2D_Arrow_Type.png";
import rightClickImg from "../../../../../assets/Solidworks/2D_Operation/2D_Right_Click.png";

interface AddDimentionAndNotesProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const AddDimentionAndNotes: React.FC<AddDimentionAndNotesProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-add-dimension-notes");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">Add dimensions and notes</h4>
                    </div>

                    {/* Section 1: Dimensioning */}
                    <div className="card-header" style={{ marginTop: '2rem' }}>
                        <h4 className="section-title">Dimensioning</h4>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">Under Annotation, Select Smart Dimension.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={smartDimension2Img} alt="Smart Dimension" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Select line(s) &gt; drag dimension</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={dragDimensionImg} alt="Drag Dimension" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">4 </span>
                            <span className="step-label">Repeat Step 1 to 3</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                Until all the necessary dimensions are indicated.
                            </p>
                            <div className="instruction-box" style={{ marginTop: '1rem', border: 'none', background: 'transparent', padding: 0 }}>
                                <p className="p-flush red-text">
                                    ※ It includes dimensioning of radius.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Dimensioning Hole */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title">Dimensioning Hole</h4>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">Click Smart Dimension</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={smartDimensionImg} alt="Smart Dimension" className="software-screenshot" />
                            </div>
                            <p className="p-flush" style={{ color: 'var(--text-normal)', marginTop: '1.5rem' }}>
                                &gt; Select the hole to dimension.
                            </p>
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={smartDimension3Img} alt="Select hole to dimension" className="software-screenshot" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Edit the dimension properties if needed.</span>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={numberHolesImg} alt="Number of Holes" className="software-screenshot screenshot-wide" />
                            </div>
                            <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent', padding: 0 }}>
                                <p className="p-flush red-text">
                                    ※ Number of Holes are depending on the number of holes/slot holes in the part/assembly.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Dimensioning Chamfer */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title">Dimensioning Chamfer</h4>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">Under Smart Dimension.</span>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Click Chamfer Dimension.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={chamferDimensionImg} alt="Chamfer Dimension" className="software-screenshot screenshot-wide" />
                            </div>
                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img src={chamferEdgeImg} alt="Chamfer Edge" className="software-screenshot" />
                            </div>
                            <ol style={{ paddingLeft: '1.25rem', margin: '1.5rem 0 0 0', color: 'var(--text-normal)', lineHeight: '2.2' }}>
                                <li>Select the chamfered edge.</li>
                                <li>Select one of the lead-in edges.</li>
                                <li>Place the dimension.</li>
                                <li>Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></li>
                            </ol>
                        </div>
                    </div>

                    {/* Section 4: Adding Notes */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title">Adding Notes</h4>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">Under Annotation, click Note.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                <img src={notesImg} alt="Notes" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Click on the edge or face of part to add note.</span>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Position the Note then type PL2.3.</span>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">4 </span>
                            <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '18px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img src={plImg} alt="PL Note" className="software-screenshot screenshot-wide" />
                            </div>

                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img src={arrowTypeImg} alt="Arrow Type" className="software-screenshot" />
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent', padding: 0 }}>
                                <p className="p-flush red-text">
                                    <img src={rightClickImg} alt="Right Click" style={{ height: '40px', verticalAlign: 'middle', display: 'inline-block', marginRight: '8px' }} />
                                    ※ To change the arrow head, right click on the arrow head then pick on the Arrow head types.
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

export default AddDimentionAndNotes;
