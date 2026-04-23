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
    <div className="course-lesson-container" ref={containerRef}>
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
        <h4 className="section-title">Creating hole details on parts</h4>
        <p className="p-flush">
          We have standard tools for creating holes such as drill holes, tapping holes and counterbores on the parts.
        </p>
        <div className="instruction-box">
          <div className="screenshot-wrapper mt-4">
            <img src={partsPlacement} alt="Part Placement" className="software-screenshot screenshot-large" style={{ height: '250px' }} />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          <div className="tab-content-area">
            <div className="tab-pane">
              <div className="card-header">
                <h4>HOLE DETAILS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(holeSteps)} onStop={stop} />
              </div>
              <div className={`${getStepClass("hole-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">
                    Select <strong className="text-highlight"> Arrange Machine Part </strong> from the icon menu.
                  </span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4">
                    <img src={arrangeMachinePart} alt="Arrange Machine Part" className="software-screenshot screenshot-small" style={{ height: '120px' }} />
                  </div>
                </div>
              </div>

              <div className={`${getStepClass("hole-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">
                    A window will appear showing the list of tools available.
                  </span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4">
                    <img src={listTools} alt="List of available tools" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className={`${getStepClass("hole-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">
                    After setting the specifications, click <strong className="text-highlight">OK</strong>.
                  </span>
                </div>
              </div>

              <div className={`${getStepClass("hole-4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">4</span>
                  <span className="step-label">
                    Click the location of the hole on the solid entity &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} /> to create the cut.
                  </span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={holeResult} alt="Hole Creation Result" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className="info-box mt-8">
                <p className="p-flush">
                  <strong className="text-highlight">Note:</strong> Tapped holes must be painted green to indicate that those are threaded and to distinguish it from drill holes.
                </p>
                <div className="screenshot-wrapper mt-4">
                  <img src={tappedHoles} alt="Tapped Holes Examples" className="software-screenshot" />
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
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

export default HoleDetailsLesson;
