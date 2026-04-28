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
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          Interference check
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
            <h4>INTERFERENCE CHECK PROCEDURE</h4>
            <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(interferenceSteps)} onStop={stop} />
          </div>

          <div className={`${getStepClass("i1")} ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
            <div className="step-header">
              <span className="step-number">1 </span>
              <span className="step-label">Select <strong className="text-highlight">Interference Check</strong> from the icon menu.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={interfCommandMenu} alt="Interference Command Menu" className="software-screenshot screenshot-medium" style={{ height: '200px', width: '270px' }} />
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className={`${getStepClass("i2")} ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
            <div className="step-header">
              <span className="step-number">2 </span>
              <span className="step-label">On the command menu, unselect <strong className="text-highlight">High-speed detection</strong>.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={interfCheckIcon} alt="Interference Check Icon" className="software-screenshot screenshot-wide" style={{ height: '270px', width: '780px' }} />
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className={`${getStepClass("i3")} ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
            <div className="step-header">
              <span className="step-number">3 </span>
              <span className="step-label">Select entities &gt; <strong className="text-highlight">GO</strong>
                <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
              </span>
            </div>
            <div className="step-description">
              <p className="p-flush mb-4">A dialog box will appear showing the number of detected interferences.</p>
              <div className="screenshot-wrapper">
                <img src={interferenceCheckImg} alt="Interference Check Dialog" className="software-screenshot screenshot-wide" />
              </div>
              <div className="instruction-box instruction-box--warning mt-8">
                <p className="p-flush"><strong className="text-highlight">TIP:</strong> Right-click on the 3D Space to check the entire drawing for interferences.</p>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className={`${getStepClass("i4")} ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
            <div className="step-header">
              <span className="step-number">4 </span>
              <span className="step-label">Analyze countermeasures. Use <strong className="text-highlight">Undo</strong> or <strong className="text-highlight">Ctrl+Z</strong> to remove highlighting.</span>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="instruction-step">
            <div className="card-header"><h4>DETECTION LIST TOOL</h4></div>
            <div className="step-description mt-4">
              <p className="p-flush mb-4">Displays a list of all detected interferences for detailed review.</p>
              <div className="screenshot-wrapper">
                <img src={listInterfIcon} alt="Display List Tool Icon" className="software-screenshot screenshot-small" style={{ height: '180px' }} />
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className={`${getStepClass("li1")} ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
            <div className="step-header">
              <span className="step-number">5 </span>
              <span className="step-label">Select the list tool on the icon menu &gt; <strong className="text-highlight">GO</strong>
                <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
              </span>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className={`${getStepClass("li2")} ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
            <div className="step-header">
              <span className="step-number">6 </span>
              <span className="step-label">The <strong className="text-highlight">List Display</strong> window will appear showing all interfering parts.</span>
            </div>
            <div className="step-description">
              <div className="screenshot-wrapper">
                <img src={listDisplayWindow} alt="List Display Window" className="software-screenshot screenshot-wide" style={{ width: '700px' }} />
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
