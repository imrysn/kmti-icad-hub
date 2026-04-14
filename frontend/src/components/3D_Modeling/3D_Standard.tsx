/** * 3D_Standard.tsx – Lessons on KEMCO Standard details */

import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Assets */
import oilHole from "../../assets/3D_Image_File/kemco_std_oilhole.png";
import gasDischarge from "../../assets/3D_Image_File/kemco_std_gas_discharge.png";
import oilGroove from "../../assets/3D_Image_File/kemco_std_oilgroove.png";
import grooveDesign from "../../assets/3D_Image_File/oilgroove_design.png";
import tapGageHole from "../../assets/3D_Image_File/kemco_std_tap-gage-hole.png";
import greaseNipple1 from "../../assets/3D_Image_File/kemco_std_grease_nipple.png";
import greaseNipple2 from "../../assets/3D_Image_File/grease_nipple_1.png";
import greaseNipple3 from "../../assets/3D_Image_File/grease_nipple_2.png";

interface StandardLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const StandardLesson: React.FC<StandardLessonProps> = ({ subLessonId = "standard-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  const std1Steps = [
    "Oil Hole: Drilled holes for oil supply. Must be painted green on ICAD.",
    "Gas Discharge: Holes added to square pipes for gas discharge to prevent deformation during welding. One drill hole per pipe is sufficient."
  ];

  const std2Steps = [
    "Oil Groove: A groove in the surface that distributes lubricating oil injected through an oil hole.",
    "Design: Groove width is usually 5mm and depth is 1.5mm. Standard R-angle is used."
  ];

  const std3Steps = [
    "Tap-Gage Hole: Used as a standard measurement point and for moving heavy parts using an eyebolt."
  ];

  const std4Steps = [
    "Grease Nipple: Component that allows grease to be injected into a bearing or similar assembly.",
    "Note on 3D Modeling: Do not model the Grease nipple itself. Instead, create a tap hole where it will be mounted."
  ];

  const getStepClass = (stepId: string) => "instruction-step";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {subLessonId === "standard-1" && "KEMCO STANDARD (1)"}
          {subLessonId === "standard-2" && "KEMCO STANDARD (2)"}
          {subLessonId === "standard-3" && "KEMCO STANDARD (3)"}
          {subLessonId === "standard-4" && "KEMCO STANDARD (4)"}
          <ReadAloudButton 
            isSpeaking={isSpeaking} 
            onStart={() => {
              if (subLessonId === "standard-1") speak(std1Steps);
              else if (subLessonId === "standard-2") speak(std2Steps);
              else if (subLessonId === "standard-3") speak(std3Steps);
              else speak(std4Steps);
            }} 
            onStop={stop} 
          />
        </h3>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="tab-pane fade-in">
            {subLessonId === "standard-1" && (
              <>
                <div className={`${getStepClass("std1-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <h4 className="section-title">Oil Hole</h4>
                  </div>
                  <p className="p-flush">Oil holes are drilled holes for oil supply. These must be painted green on ICAD.</p>
                  <div className="image-wrapper-flush">
                    <img src={oilHole} alt="Oil Hole Example" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div className="section-divider" />

                <div className={`${getStepClass("std1-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <h4 className="section-title">Gas Discharge</h4>
                  </div>
                  <p className="p-flush">Deformation may happen due to the presence of heat and gas at time of welding. Holes added to square pipes for gas discharge help prevent this. One drill hole per pipe is enough.</p>
                  <div className="image-wrapper-flush">
                    <img src={gasDischarge} alt="Gas Discharge Layout" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </>
            )}

            {subLessonId === "standard-2" && (
              <>
                <div className={`${getStepClass("std2-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <h4 className="section-title">Oil Groove</h4>
                  </div>
                  <p className="p-flush">Groove in the surface of a machine part that distributes lubricating oil injected through an oil hole.</p>
                  <div className="image-wrapper-flush">
                    <img src={oilGroove} alt="Oil Groove Example" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div className="section-divider" />

                <div className={`${getStepClass("std2-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <h4 className="section-title">Oil Groove Design</h4>
                  </div>
                  <p className="p-flush">Groove width is usually 5mm and depth is 1.5mm. Standard R-angle is applied.</p>
                  <div className="image-wrapper-flush">
                    <img src={grooveDesign} alt="Oil Groove Design" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </>
            )}

            {subLessonId === "standard-3" && (
              <div className={`${getStepClass("std3-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4 className="section-title">Tap-Gage Hole</h4>
                </div>
                <p className="p-flush">Used as a standard measurement point and for moving heavy parts using an eyebolt.</p>
                <div className="image-wrapper-flush">
                  <img src={tapGageHole} alt="Tap-Gage Hole Reference" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            )}

            {subLessonId === "standard-4" && (
              <>
                <div className={`${getStepClass("std4-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <h4 className="section-title">Grease Nipple</h4>
                  </div>
                  <p className="p-flush">Component that allows grease to be injected into a bearing or similar assembly.</p>
                  <div className="image-wrapper-flush">
                    <img src={greaseNipple1} alt="Grease Nipple Application" className="software-screenshot screenshot-wide" />
                  </div>
                </div>

                <div className="section-divider" />

                <div className={`${getStepClass("std4-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <h4 className="section-title">3D Modeling of Grease Nipple</h4>
                  </div>
                  <p className="p-flush"><strong>Note:</strong> Grease nipples are not modeled. Instead, create the tap hole where it will be mounted.</p>
                  <div className="flex-row--top">
                    <div className="image-wrapper-flush">
                      <img src={greaseNipple2} alt="Grease Nipple Detail 1" className="software-screenshot screenshot-medium" />
                    </div>
                    <div className="image-wrapper-flush">
                      <img src={greaseNipple3} alt="Grease Nipple Detail 2" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>
              </>
            )}
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

export default StandardLesson;
