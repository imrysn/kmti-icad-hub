import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import originOverview from "../../assets/3D_Image_File/origin.png";
import toolSelection from "../../assets/3D_Image_File/origin_change_3d_part_layout.png";
import interactionSteps from "../../assets/3D_Image_File/origin_change_3d_part_layout_2345.png";

interface OriginLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const OriginLesson: React.FC<OriginLessonProps> = ({
  subLessonId,
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const [activeTab, setActiveTab] = useState<"projections" | "layout">(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || "projections";
  });
  
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const LESSON_DATA = {
    projections: {
      steps: [
        "Origin concept: A point where the coordinates of the X, Y, and Z axes are 0, 0, 0. It sets the layout and orientation of views for an entity.",
        "Important note: The origin must stay in the same position in both 3D and 2D environments."
      ]
    },
    layout: {
      steps: [
        "Step 1: Select Change 3D Part Layout from the icon menu.",
        "Step 2: Right-click to show the current location of the origin.",
        "Step 3: Left-click on the point where you want the new origin location to be.",
        "Step 4: Left-click on a second point to set the X-axis direction.",
        "Step 5: Left-click on a third point to set the Y-axis. The X Y plane will become your front view."
      ]
    }
  };

  const handleNext = () => {
    if (activeTab === "projections") {
      setActiveTab("layout");
    } else if (onNextLesson) {
      onNextLesson();
    }
  };

  const handlePrev = () => {
    if (activeTab === "layout") {
      setActiveTab("projections");
    } else if (onPrevLesson) {
      onPrevLesson();
    }
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        <button className={`tab-button ${activeTab === "projections" ? "active" : ""}`} onClick={() => setActiveTab("projections")}>
          Origin
        </button>
        <button className={`tab-button ${activeTab === "layout" ? "active" : ""}`} onClick={() => setActiveTab("layout")}>
          Change 3D Part Layout
        </button>
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          {activeTab === "projections" ? (
            <div className="fade-in"> 
              <div className="card-header"> 
                <h4>ORIGIN</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(LESSON_DATA.projections.steps)} onStop={stop} />
              </div>
              <p className="p-flush">
                A point where the coordinates of the X, Y and Z-axis are <strong className="text-highlight">(0, 0, 0)</strong>. It also sets the layout/orientation of views of an object/entity. Origin location is a case-by-case basis. It depends on the shape/structure of the part.
              </p>
              <p className="red-text" style={{marginBottom: "3rem", marginTop: "1rem"}}> <strong>※ The origin must be in the same position 3D and 2D </strong></p>  
              <div className="screenshot-wrapper mt-8">
                <img src={originOverview} alt="Origin Overview" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="card-header">
                <h4>CHANGE 3D PART LAYOUT</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(LESSON_DATA.layout.steps)} onStop={stop} />
              </div>
              <p className="p-flush" style={{marginBottom: "2rem"}}> Use this tool to set or modify the location of the origin.</p>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select the <strong className="red-text">Change 3D Part layout</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={toolSelection} alt="Tool Selection" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Right-click to show the <strong className="text-highlight">current location</strong> of the origin.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">Left-click on the point of the desired new location of origin.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">Left-click on a 2nd point to set the X-axis.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <span className="step-label">Left-click on a 3rd point to set the Y-axis.</span>
                </div>
                <div className="step-description">
                  <p className="p-flush" style={{marginLeft:"3rem", marginBottom: "3rem"}}>The XY-plane will be front view.</p>
                  <div className="screenshot-wrapper mt-4" style={{marginLeft: "3rem"}}>
                    <img src={interactionSteps} alt="Interaction Steps" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev} disabled={!onPrevLesson && activeTab === 'projections'}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginLesson;
