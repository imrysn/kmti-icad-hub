import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import saveIconImg from "../../../../../assets/Solidworks/3D_Operation/3D_Save1.png";
import fileNameImg from "../../../../../assets/Solidworks/2D_Operation/2D_File_Name.png";

interface SavingDetailsProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const SavingDetails: React.FC<SavingDetailsProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-saving-detail");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">

                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">Saving 2D Detail</h4>
                    </div>

                    <div className="fade-in" style={{ marginTop: '1rem' }}>
                        {/* Step 1 */}
                        <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">1</span>
                                <span className="step-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    In the <strong>Menu Bar</strong>, click <strong>Save</strong>
                                    <img src={saveIconImg} alt="Save Icon" style={{ height: '60px', verticalAlign: 'middle' }} />
                                    or press <strong>Ctrl + S</strong> to save the file.
                                </span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="instruction-step" style={{ marginTop: '2rem' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">2</span>
                                <span className="step-label">When this dialog box appears, edit the <strong>File Name</strong>, then click <strong>Save</strong>.</span>
                            </div>
                            <div className="step-description">
                                <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                    <img
                                        src={fileNameImg}
                                        alt="Edit File Name"
                                        className="software-screenshot screenshot-wide"
                                    />
                                </div>
                                
                                {/* Filename Extension Section */}
                                <div className="instruction-box" style={{ marginTop: '2.5rem' }}>
                                    <h5 style={{ color: 'var(--text-normal)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                                        Filename Extension
                                    </h5>
                                    <ul style={{ paddingLeft: '1.25rem', margin: '0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                        <li>
                                            <strong>2D Detail</strong> — <strong style={{ color: '#ef4444' }}>.SLDDRW</strong>
                                        </li>
                                    </ul>
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
                            {nextLabel || 'Finish Module'} <ChevronRight size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SavingDetails;
