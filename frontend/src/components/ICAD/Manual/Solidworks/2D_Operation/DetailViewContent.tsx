import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import viewLayoutImg from "../../../../../assets/Solidworks/2D_Operation/2D_View_Layout.png";
import sketchCircleImg from "../../../../../assets/Solidworks/2D_Operation/2D_Sketch_Circle.png";
import propertyManagerImg from "../../../../../assets/Solidworks/2D_Operation/2D_Property_Manager.png";

interface DetailViewProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const DetailView: React.FC<DetailViewProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-detail-view");

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">
                    
                    {/* Header */}
                    <div className="card-header">
                        <h4 className="section-title">Detail View</h4>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header"  style={{padding:'8px 0px'}}>
                            <span className="step-number">1</span>
                            <span className="step-label">In View Layout, click Detail View.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                <img src={viewLayoutImg} alt="View Layout" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step">
                        <div className="step-header"  style={{padding:'8px 0px'}}>
                            <span className="step-number">2</span>
                            <span className="step-label">Sketch a circle.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                <img src={sketchCircleImg} alt="Sketch a circle" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    <div className="instruction-step" style={{ paddingBottom: '0', marginBottom: '0.5rem' }}>
                        <div className="step-header"  style={{padding:'8px 0px'}}>
                            <span className="step-number">3</span>
                            <span className="step-label">Edit Detail View Property Manager.</span>
                        </div>
                    </div>

                    <div className="instruction-step" style={{ paddingBottom: '0', paddingTop: '0', marginBottom: '0.5rem' }}>
                        <div className="step-header"  style={{padding:'8px 0px'}}>
                            <span className="step-number">4</span>
                            <span className="step-label">Position the created view.</span>
                        </div>
                    </div>

                    <div className="instruction-step" style={{ paddingTop: '0' }}>
                        <div className="step-header"  style={{padding:'8px 0px'}}>
                            <span className="step-number">5</span>
                            <span className="step-label">Add necessary dimensions and note.</span>
                        </div>
                    </div>

                    {/* Section: Detail View Property Manager */}
                    <div className="card-header" style={{ marginTop: '3rem' }}>
                        <h4 className="section-title">Detail View Property Manager</h4>
                    </div>

                    <div className="instruction-step">
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '0.2rem', marginBottom: '2rem' }}>
                                <img src={propertyManagerImg} alt="Detail View Property Manager" className="software-screenshot screenshot-wide" style={{ maxWidth: '1000px', width: '100%' }} />
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

export default DetailView;
