/** * 3D_Interference.tsx * Interference Check lesson */

import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Assets */
import leftClick from "../../assets/3D_Image_File/left_click.png";
import interfCheckIcon from "../../assets/3D_Image_File/interf_check.png";
import interfCommandMenu from "../../assets/3D_Image_File/interf_command_menu.png";
import interferenceResult from "../../assets/3D_Image_File/interference.png";
import listInterfIcon from "../../assets/3D_Image_File/list_all_detected_interf.png";
import listDisplayWindow from "../../assets/3D_Image_File/list_display_window.png";
import interferenceCheckImg from "../../assets/3D_Image_File/interference_check.png";

interface InterferenceLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const InterferenceLesson: React.FC<InterferenceLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore('interference');

  const interferenceSteps = [
    "Step 1: Select Interference Check from the icon menu.",
    "Step 2: On the command menu, unselect High-speed detection for a thorough check.",
    "Step 3: Select specific entities and click GO. A dialog will show the number of detected interferences. Alternatively, right-click the 3D space to check the entire drawing.",
    "Step 4: Analyze countermeasures to fix the parts. Use Undo or Ctrl Z to remove the red CGS solid highlighting the interference.",
    "Step 5 (List Tool): Select the list tool from the icon menu and click GO.",
    "Step 6 (Display): The List Display window will appear, showing all interfering parts for your review."
  ];

  const getStepClass = (stepId: string) => "instruction-step";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          Interference Check
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(interferenceSteps)} onStop={stop} />
        </h3>
        <p className="p-flush">
          Interferences are overlapping areas of 3D entities. These are problems that must be fixed on the 3D Modeling.
        </p>
        <p className="lesson-subtitle mt-4">These following tools are used to detect interferences on the 3D Modeling.</p>
        <div className="screenshot-wrapper mt-4">
          <img src={interferenceResult} alt="Interference Results" className="software-screenshot screenshot-small" style={{ width: '14rem' }} />
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="card-header">
            <h4>INTERFERENCE CHECK</h4>
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(interferenceSteps)} onStop={stop} />
          </div>

          <div className={`${getStepClass("i1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">1 </span>
              <span className="step-label">Select <strong className="red-text">Interference Check</strong> from the icon menu.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={interfCommandMenu} alt="Interference Command Menu" className="software-screenshot" style={{ height: 'auto', width: '200px', marginBottom: "-1rem" }} />
              </div>
            </div>
          </div>

          <div className={`${getStepClass("i2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">2 </span>
              <span className="step-label">On the command menu, unselect High-speed detection.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={interfCheckIcon} alt="Interference Check Icon" className="software-screenshot" style={{ height: 'auto', width: '450px', marginBottom: "-1rem"  }} />
              </div>
            </div>
          </div>

          <div className={`${getStepClass("i3")} ${currentIndex === 2 ? "reading-active" : ""}`} style={{ marginBottom:"-2rem"}}>
            <div className="step-header">
              <span className="step-number">3 </span>
              <span className="step-label" style={{marginTop: "-1.5rem"}}>Select specific entities to check if there are interferences &gt; GO 
                <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
              </span>
            </div>
            <div className="step-description">
              <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>A dialog box will appear showing the number of detected interferences.</p>
              <div className="screenshot-wrapper">
                <img src={interferenceCheckImg} alt="Interference Check Dialog" className="software-screenshot" style={{width: "900px", marginTop: "1rem", marginBottom: "0rem"}} />
              </div>
              <div>
              <span className="p-flush"><strong className="text-highlight">OR</strong></span>
              </div> 
              <span className="p-flush">Right-click on the 3D Space to check the entire drawing for interferences.</span>
            </div>
          </div>

          <div className={`${getStepClass("i4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">4 </span>
              <span className="step-label">Analyze possible countermeasures to remove the interference on the parts.</span>
            </div>
              <p className="p-flush mb-4" style={{marginLeft: "3rem", marginTop: "-1rem"}}>To remove the red CGS solid, use Undo or Ctrl+Z.</p>
          </div>

            <div className="step-description mt-4">
              <span className="p-flush mb-4" style={{ marginTop: "1rem", fontWeight: "700px",}}>Tool use to display the list of all detected interferences.</span>
              <div className="screenshot-wrapper">
                <img src={listInterfIcon} alt="Display List Tool Icon" className="software-screenshot" style={{ height: 'auto', width: '200px', marginBottom: "0rem", marginTop: "1rem" }} />
              </div>
          </div>


          <div className={`${getStepClass("li1")} ${currentIndex === 0 ? "reading-active" : ""}`} style={{ marginBottom:"-2rem"}} >
            <div className="step-header">
              <span className="step-number">1 </span>
              <span className="step-label" style={{marginTop: "-1.5rem"}}>Select the tool on the icon menu &gt; GO
                <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
              </span>
            </div>
          </div>

          <div className={`${getStepClass("li2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
            <div className="step-header">
              <span className="step-number">2 </span>
              <span className="step-label">The List Display window will appear showing all the 3D part names that interfere with each other.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={listDisplayWindow} alt="List Display Window" className="software-screenshot" style={{ width: '900px' }} />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterferenceLesson;
