/** * 3D_HoleDetails.tsx — "Creating Hole Details on Parts" Lesson */

import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Asset Imports */
import arrangeMachinePart from "../../assets/3D_Image_File/hole_details_arrange_machine_part.png";
import partsPlacement from "../../assets/3D_Image_File/hole_details_parts_placement.png";
import listTools from "../../assets/3D_Image_File/hole_details_list_tools.png";
import holeResult from "../../assets/3D_Image_File/hole_details_hole.png";
import tappedHoles from "../../assets/3D_Image_File/hole_details_tapped_holes.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";

interface HoleDetailsLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const HoleDetailsLesson: React.FC<HoleDetailsLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore('hole-details');

  const holeSteps = [
    "Step 1: Select Arrange Machine Part from the icon menu.",
    "Step 2: A window will appear showing the list of available tools, such as drill holes and counterbores.",
    "Step 3: After setting the desired specifications, click OK.",
    "Step 4: Click the location of the hole on the solid entity and click GO to create the cut."
  ];

  const getStepClass = (stepId: string) => "instruction-step";
  const tabs = [{ id: "holeDetails", label: "Hole Details" }];

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map((tab) => (
          <button key={tab.id} className={`tab-button active`}>
            {tab.label}
          </button>
        ))}
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">Creating Hole Details on Parts</h3>
        <p className="p-flush">
          We have standard tools for creating holes such as drill holes, tapping holes and counterbores on the parts.
        </p>
        <div className="screenshot-wrapper mt-4">
          <img src={partsPlacement} alt="Part Placement" className="software-screenshot screenshot-large" style={{ height: '180px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="card-header">
            <h4>HOLE DETAILS</h4>
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(holeSteps)} onStop={stop} />
          </div>

          <div className={`${getStepClass("hole-1")} ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <div className="step-header">
              <span className="step-number">1 </span>
              <span className="step-label">Select <strong className="red-text">Arrange Machine Parts</strong> from the icon menu.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={arrangeMachinePart} alt="Arrange Machine Part" className="software-screenshot screenshot-small" style={{ height: '100px', marginBottom: "-1rem" }} />
              </div>
            </div>
          </div>

 

          <div className={`${getStepClass("hole-2")} ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
            <div className="step-header">
              <span className="step-number">2 </span>
              <span className="step-label">A window will appear showing the list of tools available.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={listTools} alt="List of available tools" className="software-screenshot" style={{ width: '900px', marginBottom: "-2rem"}} />
              </div>
            </div>
          </div>

       

          <div className={`${getStepClass("hole-3")} ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
            <div className="step-header" style={{ marginBottom: "-2rem"}}>
              <span className="step-number">3 </span>
              <span className="step-label">After setting the specifications, click OK</span>
            </div>
          </div>

         

          <div className={`${getStepClass("hole-4")} ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
            <div className="step-header">
              <span className="step-number">4 </span>
              <span className="step-label" style={{ marginTop: "-1rem"}}>Click the location of the hole on the solid entity &gt; GO
                <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 8px' }} /> to create the cut.
              </span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={holeResult} alt="Hole Creation Result" className="software-screenshot" style={{ width: '900px', marginTop: "1rem"}} />
              </div>
            </div>
          </div>
        
            <div className="instruction-box" style={{ marginTop: '0rem' }}>
              <p className="p-flush">
                <strong className="red-text">Note:</strong> Tapped holes must be painted green to indicate that those are threaded and to distinguish it from drill holes.
              </p>
            </div>
            <div className="screenshot-wrapper">
              <img src={tappedHoles} alt="Tapped Holes Examples" className="software-screenshot screenshot-wide" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>

    </div>
  );
};

export default HoleDetailsLesson;
