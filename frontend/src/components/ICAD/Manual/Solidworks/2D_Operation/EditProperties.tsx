import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import filePropertiesImg from "../../../../../assets/Solidworks/2D_Operation/2D_File_Properties.png";
import fileProperties1Img from "../../../../../assets/Solidworks/2D_Operation/2D_File_Properties1.png";
import editPropertiesImg from "../../../../../assets/Solidworks/2D_Operation/2D_Edit_Properties.png";

interface EditPropertiesProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const EditProperties: React.FC<EditPropertiesProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-edit-properties");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">Edit Properties</h4>
                    </div>

                    <div className="fade-in" style={{ marginTop: '2rem' }}>
                        {/* Step 1 */}
                        <div className="instruction-step">
                            <div className="step-header">
                                <span className="step-number">1</span>
                                <span className="step-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    In the <strong>Menu Bar</strong>, click <strong>File Properties</strong>
                                    <img src={filePropertiesImg} alt="File Properties Icon" style={{ height: '1.2rem', verticalAlign: 'middle' }} />
                                </span>
                            </div>
                            <div className="step-description">
                                <div className="image-wrapper" style={{ marginTop: '0.2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <img
                                        src={fileProperties1Img}
                                        alt="File Properties Dialog"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>

                                {/* Summary Information Section */}
                                <div className="instruction-box" style={{ marginTop: '2.5rem' }}>
                                    <h5 style={{ color: 'var(--text-normal)', marginBottom: '1rem', fontSize: '1.05rem' }}>
                                        Summary Information
                                    </h5>
                                    <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                        The Summary Information will appear.
                                    </p>

                                    <h5 style={{ color: 'var(--text-normal)', marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: 600 }}>
                                        Notes:
                                    </h5>
                                    <ul style={{ paddingLeft: '1.25rem', margin: '0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>
                                            Summary Information allows the user to fill up the necessary details on the title block.
                                        </li>
                                        <li>
                                            It varies depending on the project.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="instruction-step">
                            <div className="step-header">
                                <span className="step-number">2</span>
                                <span className="step-label">Edit the Properties.</span>
                            </div>
                            <div className="step-description">
                                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                    <img
                                        src={editPropertiesImg}
                                        alt="Edit Properties"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>
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

export default EditProperties;
