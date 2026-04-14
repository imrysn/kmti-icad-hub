import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import "../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import originOverview from "../../assets/3D_Image_File/origin.png";
import toolSelection from "../../assets/3D_Image_File/origin_change_3d_part_layout.png";
import interactionSteps from "../../assets/3D_Image_File/origin_change_3d_part_layout_2345.png";

interface OriginLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

/**
 * OriginLesson component for 3D Modeling curriculum.
 * Refactored to use useLessonCore hook and standardized layout.
 */
const OriginLesson: React.FC<OriginLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const [activeTab, setActiveTab] = useState<"projections" | "layout">("projections");

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(activeTab); // Use activeTab as the subLessonId equivalent

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

  useEffect(() => {
    // Scroll to top when tab changes
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activeTab, containerRef]);

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

      <section className="lesson-intro">
        <h3 className="section-title">
          <span>Origin Control</span>
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(LESSON_DATA[activeTab].steps)}
            onStop={stop}
          />
        </h3>
        <p className="section-description">
          Define and manage the origin point (0, 0, 0) for your 3D parts. The origin location is critical for orientation and alignment.
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          <div className="lesson-tabs">
            <button className={`tab-button ${activeTab === "projections" ? "active" : ""}`} onClick={() => setActiveTab("projections")}
            >
              Origin
            </button>
            <button className={`tab-button ${activeTab === "layout" ? "active" : ""}`} onClick={() => setActiveTab("layout")}
            >
              Change 3D Part Layout
            </button>
          </div>

          <div className="tab-content-area">
            {activeTab === "projections" ? (
              <div className="tab-pane">
                <p className={currentIndex === 0 ? "reading-active p-highlight" : "p"}>
                  A point where the coordinates of the X, Y and Z-axis are (0, 0, 0). It also sets the layout/orientation of views of an object/entity.
                </p>
                <p className={currentIndex === 1 ? "reading-active p-highlight" : "p"}>
                  ※ The origin must be in the same position in 3D and 2D.
                </p>
                <div className="image-wrapper-flush">
                  <img src={originOverview} alt="Origin Overview" className="software-screenshot screenshot-large" />
                </div>
              </div>
            ) : (
              <div className="tab-pane">
                <div className="card-header">
                  <h4>Change 3D Part Layout Tool</h4>
                </div>

                <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select <strong>Change 3D Part Layout</strong> from the icon menu.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={toolSelection} alt="Tool Selection" className="software-screenshot screenshot-medium" style={{ height: '200px' }} />
                  </div>
                </div>

                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Right-click to show the current location of the origin.</span>
                  </div>
                </div>

                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <span className="step-label">Left-click on the desired new location point.</span>
                  </div>
                </div>

                <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">4</span>
                    <span className="step-label">Left-click on a 2nd point to set the X-axis.</span>
                  </div>
                </div>

                <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">5</span>
                    <span className="step-label">Left-click on a 3rd point to set the Y-axis. The XY-plane becomes the front view.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={interactionSteps} alt="Interaction Steps" className="software-screenshot screenshot-large" />
                  </div>
                </div>
              </div>
            )}
          </div>

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
