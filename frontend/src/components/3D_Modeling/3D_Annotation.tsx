/** * 3D_Annotation.tsx * 3D Annotation and Drafting lesson */

import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Assets */
import draftingMenu from "../../assets/3D_Image_File/annotation.png";
import dimensionExample from "../../assets/3D_Image_File/annotation2_dimension.png";
import editDraftingTool from "../../assets/3D_Image_File/annotation2_edits_drafting.png";

interface AnnotationLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const AnnotationLesson: React.FC<AnnotationLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore('annotation');

  const annotationSteps = [
    "Step 1: Select the Drafting tab from the main menu to access 3D annotation tools.",
    "Step 2: Choose specific annotation tools such as Dimension, Note, or Geometric Tolerance from the command groups.",
    "Step 3: Apply 3D dimensions directly to the entity by selecting edges or points. These dimensions remain visible in the 3D workspace.",
    "Step 4: Use the Edit Drafting Element tool to modify the text, size, or properties of existing annotations."
  ];

  const getStepClass = (stepId: string) => "instruction-step";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h4 className="section-title">
          3D Annotation & Drafting
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(annotationSteps)} onStop={stop} />
        </h4>
        <p className="p-flush">
          Annotations in 3D modeling are used to provide dimensions, notes, and technical specifications directly on the 3D entity. This information is critical for manufacturing and assembly.
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          <div className="card-header">
            <h4>DRAFTING TOOLS</h4>
          </div>

          <div className={`${getStepClass("a1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select the <strong className="text-highlight">Drafting</strong> tab from the main menu.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={draftingMenu} alt="Drafting Menu" className="software-screenshot screenshot-small" style={{ height: '300px' }} />
              </div>
            </div>
          </div>

          <div className={`${getStepClass("a2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">Choose specific tools like <strong className="text-highlight">Dimension</strong>, <strong className="text-highlight">Note</strong>, or <strong className="text-highlight">Geometric Tolerance</strong>.</span>
            </div>
          </div>

          <div className={`${getStepClass("a3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-label">Apply 3D dimensions directly to the model.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={dimensionExample} alt="3D Dimension Example" className="software-screenshot screenshot-medium" style={{ height: '400px' }} />
              </div>
            </div>
          </div>

          <div className={`${getStepClass("a4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">4</span>
              <span className="step-label">Use <strong className="text-highlight">Edit Drafting Element</strong> to modify existing annotations.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={editDraftingTool} alt="Edit Drafting Tool" className="software-screenshot screenshot-small" />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous Module
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotationLesson;
