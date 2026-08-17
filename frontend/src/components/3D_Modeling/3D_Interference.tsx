/** * 3D_Interference.tsx * Interference Check lesson */

import { ChevronLeft,ChevronRight } from 'lucide-react';
import React from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Assets */
import interfCheckIcon from "../../assets/3D_Image_File/interf_check.png";
import interfCommandMenu from "../../assets/3D_Image_File/interf_command_menu.png";
import interferenceResult from "../../assets/3D_Image_File/interference.png";
import interferenceCheckImg from "../../assets/3D_Image_File/interference_check.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";
import listInterfIcon from "../../assets/3D_Image_File/list_all_detected_interf.png";
import listDisplayWindow from "../../assets/3D_Image_File/list_display_window.png";

interface InterferenceLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const InterferenceLesson: React.FC<InterferenceLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    currentIndex
  } = useLessonCore('interference');


  const getStepClass = (_stepId: string) => "instruction-step";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          Interference Check

        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
         Interferences are overlapping areas of 3D entities. These are problems that must be fix on the 3D Modeling..
        </p>
        <p className="lesson-subtitle mt-4" style={{marginTop: "-1rem"}}>These following tools are used to detect interferences on the 3D Modeling.</p>
        <img src={interferenceResult} alt="Interference Results" className="software-screenshot screenshot-small mt-4" style={{ width: '14rem' }} />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className={`card-header ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
            <h4>INTERFERENCE CHECK</h4>
          </div>

          <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
            <div className="step-header">
              <span className="step-number">1 </span>
              <span className="step-label">Select Interference Check from the icon menu.</span>
            </div>
            <div className="step-description">
                    <img src={interfCommandMenu} alt="Interference Command Menu" className="software-screenshot mt-4" style={{ height: 'auto', width: '200px', marginBottom: "-1rem" }} />
            </div>
          </div>

          <div className={`${getStepClass("i2")} ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
            <div className="step-header">
              <span className="step-number">2 </span>
              <span className="step-label">On the command menu, unselect High-speed detection.</span>
            </div>
            <div className="step-description">
                    <img src={interfCheckIcon} alt="Interference Check Icon" className="software-screenshot mt-4" style={{ height: 'auto', width: '450px', marginBottom: "-1rem"  }} />
            </div>
          </div>

          <div className={`${getStepClass("i3")} ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom:"-2rem"}}>
            <div className="step-header">
              <span className="step-number">3 </span>
              <span className="step-label" style={{marginTop: "-1.5rem"}}>Select specific entities to check if there are interferences, then Right Click
                <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
              </span>
            </div>
            <div className="step-description">
              <p className="p-flush mb-4" style={{ marginTop: "-1rem" }}>A dialog box will appear showing the number of detected interferences.</p>
                    <img src={interferenceCheckImg} alt="Interference Check Dialog" className="software-screenshot mt-4" style={{width: "900px", marginTop: "1rem", marginBottom: "0rem"}} />
              <div>
              <span className="p-flush"><strong className="text-highlight">OR</strong></span>
              </div>
              <span className="p-flush">Right-click on the 3D Space to check the entire drawing for interferences.</span>
            </div>
          </div>

          <div className={`${getStepClass("i4")} ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
            <div className="step-header">
              <span className="step-number">4 </span>
              <span className="step-label">Analyze possible countermeasures to remove the interference on the parts.</span>
            </div>
              <p className="p-flush mb-4" style={{ marginTop: "-1rem" }}>To remove the red CGS solid, use Undo or Ctrl+Z.</p>
          </div>

          <div className={`${getStepClass("li-intro")} ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">

            <div className="step-description mt-4">
              <span className="p-flush mb-4" style={{ marginTop: "1rem", fontWeight: "700px",}}>Tool use to display the list of all detected interferences.</span>
                    <img src={listInterfIcon} alt="Display List Tool Icon" className="software-screenshot mt-4" style={{ height: 'auto', width: '200px', marginBottom: "-1rem", marginTop: "1rem" }} />
            </div>
          </div>
          <div className={`step-header ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{marginTop: "2rem"}}>
              <span className="step-number">1 </span>
              <span className="step-label" style={{marginTop: "-1.5rem"}} >Select the tool on the icon menu, then Right Click <strong className="text-highlight"></strong>
                <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
              </span>
            </div>


          <div className={`${getStepClass("li2")} ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">The List Display window will appear showing all the 3D part names that interfere with each other.</span>
            </div>
            <div className="step-description">
                    <img src={listDisplayWindow} alt="List Display Window" className="software-screenshot mt-4" style={{ width: '900px' }} />
            </div>
          </div>

          <div className="lesson-navigation">

            <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); setTimeout(() => document.querySelector('.lesson-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' }), 50); }}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); setTimeout(() => document.querySelector('.lesson-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' }), 50); }}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterferenceLesson;


