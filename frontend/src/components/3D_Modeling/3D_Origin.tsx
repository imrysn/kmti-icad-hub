import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
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

const OriginLesson: React.FC<OriginLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const [activeTab, setActiveTab] = useState<"projections" | "layout">(() => {
    return (localStorage.getItem('3d-origin-active-tab') as any) || "projections";
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore("3d-origin");

  useEffect(() => {
    localStorage.setItem('3d-origin-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const LESSON_DATA = {
    projections: {
      title: 'ORIGIN',
      subtitle: "A point where the coordinates of the X,Y and Z-axis are (0, 0, 0). It also sets the layout/orientation of views of an object/entity. Origin location is a case-by-case basis. It depends on the shape/structure of the part.",
      importantNotes: "※ The origin must be in the same position 3D and 2D"
    },
    layout: {
      title: 'CHANGE 3D PART LAYOUT',
      subtitle: "Use this tool to set the location of origin.",
      steps: [
        "Step 1: Select the Change 3D Part Layout from the icon menu.",
        "Step 2: Right-click to show the current location of the origin.",
        "Step 3: Left-click on the point of the desired new location of origin.",
        "Step 4: Left-click on a 2nd point to set the X-axis.",
        "Step 5: Left-click on a 3rd point to set the Y-axis. The XY-plane will be front view."
      ]
    }
  };

  const currentLesson = activeTab === 'projections' ? LESSON_DATA.projections : LESSON_DATA.layout;

  const handleNext = () => {
    if (activeTab === "projections") {
      setActiveTab("layout");
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === "layout") {
      setActiveTab("projections");
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    const steps = activeTab === 'part' ? partSteps : assemblySteps;
    registerText(steps, 0);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'part' ? partSteps : assemblySteps;
  const tabsList = [{ id: 'part' }, { id: 'assembly' }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    0
  );

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
                <KaraokeLessonText
                  as="h4"
                  className={`section-title ${currentIndex === 0 ? 'reading-active' : ''}`}
                  data-reading-index="0"
                  text="ORIGIN"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />

              </div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <KaraokeLessonText
                  className="p-flush"
                  text={currentLesson.subtitle}
                  isActive={isSpeaking && currentIndex === 1}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="red-text" style={{ marginBottom: "2rem", marginTop: "-1rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text={LESSON_DATA.projections.importantNotes}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={originOverview} alt="Origin Overview" className="software-screenshot screenshot-wide mt-4" />
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="card-header">
                <KaraokeLessonText
                  as="h4"
                  className={`section-title ${currentIndex === 0 ? 'reading-active' : ''}`}
                  data-reading-index="0"
                  text="CHANGE 3D PART LAYOUT"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />

              </div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <KaraokeLessonText
                  className="p-flush"
                  text={currentLesson.subtitle}
                  isActive={isSpeaking && currentIndex === 1}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text='Select the Change 3D Part Layout from the icon menu.'
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={toolSelection} alt="Tool Selection" className="software-screenshot" style={{ height: 'auto', width: "400px" }} />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header" style={{ marginTop: "-1rem" }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Right-click to show the current location of the origin."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Left-click on the point of the desired new location of origin."
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Left-click on a 2nd point to set the X-axis."
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Left-click on a 3rd point to set the Y-axis."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush"
                    style={{ marginBottom: "3rem" }}
                    text="The XY-plane will be front view."
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={interactionSteps} alt="Interaction Steps" className="software-screenshot screenshot-medium mt-4" />
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
