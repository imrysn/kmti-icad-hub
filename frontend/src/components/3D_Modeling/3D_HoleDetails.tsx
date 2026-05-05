import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
    currentIndex,
    currentCharIndex
  } = useLessonCore('hole-details');

  const holeSteps = [
    "HOLE DETAILS",
    "Step 1: Select Arrange Machine Part from the icon menu.",
    "Step 2: A window will appear showing the list of available tools, such as drill holes and counterbores.",
    "Step 3: After setting the desired specifications, click OK.",
    "Step 4: Click the location of the hole on the solid entity then GO to create the cut",
    "Note: Tapped holes must be painted green to indicate that those are threaded and to distinguish it from drill holes."
  ];

  const getStepClass = (stepId: string) => "instruction-step";
  const tabs = [{ id: "holeDetails", label: "Hole Details" }];

  const introTitle = "Creating Hole Details on Parts";
  const introSubtitle = "We have standard tools for creating holes such as drill holes, tapping holes and counterbores on the parts.";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
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
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            speak([introTitle, introSubtitle, ...holeSteps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <div className="screenshot-wrapper mt-4">
          <img src={partsPlacement} alt="Part Placement" className="software-screenshot screenshot-large" style={{ height: '180px' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="card-header">
            <h4 className={`${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <KaraokeLessonText
                as="span"
                text="HOLE DETAILS"
                isActive={isSpeaking && currentIndex === 2}
                currentCharIndex={currentCharIndex}
              />
            </h4>
          </div>

          <div className={`${getStepClass("hole-1")} ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
            <div className="step-header">
              <span className="step-number">1 </span>
              <KaraokeLessonText
                as="span"
                className="step-label"
                text="Select Arrange Machine Part from the icon menu."
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={arrangeMachinePart} alt="Arrange Machine Part" className="software-screenshot screenshot-small" style={{ height: '100px', marginBottom: "-1rem" }} />
              </div>
            </div>
          </div>



          <div className={`${getStepClass("hole-2")} ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
            <div className="step-header">
              <span className="step-number">2 </span>
              <span className="step-label">
                <KaraokeLessonText
                  as="span"
                  text="A window will appear showing the list of available tools, such as drill holes and counterbores."
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={listTools} alt="List of available tools" className="software-screenshot" style={{ width: '900px', marginBottom: "-2rem" }} />
              </div>
            </div>
          </div>



          <div className={`${getStepClass("hole-3")} ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
            <div className="step-header">
              <span className="step-number">3 </span>
              <span className="step-label">
                <KaraokeLessonText
                  as="span"
                  text="After setting the specifications, click OK"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </span>
            </div>
          </div>



          <div className={`${getStepClass("hole-4")} ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
            <div className="step-header">
              <span className="step-number">4 </span>
              <span className="step-label">
                <KaraokeLessonText
                  as="span"
                  text="Click the location of the hole on the solid entity &gt; GO"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
                <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
              </span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={holeResult} alt="Hole Creation Result" className="software-screenshot" style={{ width: '900px', marginTop: "1rem" }} />
              </div>
            </div>
          </div>

          <div className={`instruction-box ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: '0rem' }}>
            <KaraokeLessonText
              as="p"
              className="p-flush red-text"
              text="Note: Tapped holes must be painted green to indicate that those are threaded and to distinguish it from drill holes."
              isActive={isSpeaking && currentIndex === 7}
              currentCharIndex={currentCharIndex}
            />
          </div>
          <div className={`screenshot-wrapper ${currentIndex === 7 ? "reading-active" : ""}`}>
            <img src={tappedHoles} alt="Tapped Holes Examples" className="software-screenshot screenshot-wide" />
          </div>
        </div>

        <div className="lesson-navigation">
          <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> Previous</button>
          <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
        </div>
      </div>

    </div>
  );
};

export default HoleDetailsLesson;

