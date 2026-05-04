import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Standard Part Detail (1) */
import pcdImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_pcd.png";
import taperedThreadImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_tapered_thread.png";
import standardPartDetailImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_standard_parts.jpg";

/* Importing assets for Standard Part Detail (2) */
import oilGroove1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(2)_oil_groove_1.png";
import oilGroove2Img from "../../assets/2D_Image_File/2D_tandard_part_detail(2)_oil_groove_2.png";

/* Importing assets for Standard Part Detail (3) */
import shaftKeyPlate1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_1.png";
import shaftKeyPlate2Img from "../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_2.jpg";
import shaftKeyPlate3Img from "../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_3.png";

/* Importing assets for Standard Part Detail (4) */
import collarImg from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar.png";

/* Importing assets for Standard Part Detail (5) */
import collar1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar_1.png";
import collar2Img from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar_2.png";

/* Importing assets for Standard Part Detail (6) */
import scaleImg from "../../assets/2D_Image_File/2D_standard_part_detail(6)_scale.jpg";
import reliefProcess1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(6)_relief_process_1.png";
import reliefProcess2Img from "../../assets/2D_Image_File/2D_standard_part_detail(6)_relief_process_2.jpg";

/* Importing assets for Standard Part Detail (7) */
import reliefWorkflowImg from "../../assets/2D_Image_File/2D_tandard_part_detail(7)_relief_process_3.png";
import reliefDialogImg from "../../assets/2D_Image_File/2D_tandard_part_detail(7)_relief_process_4.jpg";

interface StandardPartLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const StandardPartLesson: React.FC<StandardPartLessonProps> = ({
  subLessonId = "2d-standard-part-1",
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(subLessonId);

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-standard-part-1': {
      title: 'Standard Part Detail (1)',
      subtitle: 'Guidelines for PCD, Tapered Threads, and Standard Part Template requirements.',
      steps: [
        "Pitch Center Diameter: PCD is no longer used in KEMCO drawings to prevent fabrication errors. Instead, provide individual coordinates or dimensions.",
        "Tapered Threads: For technical threads like Rc, ensure you apply the specific 2D detailing patterns shown in the template.",
        "Data Input: On standard part templates, only modify the boxed portions. All other template details should remain unchanged."
      ]
    },
    '2d-standard-part-2': {
      title: 'Standard Part Detail (2)',
      subtitle: 'Standardized oil groove designs for flat surfaces and circular portions.',
      steps: [
        "Oil Grooves: These grooves distribute lubrication from oil holes. For flat surfaces, depth should be 1.5mm, and the groove must be wider than the accompanying drill hole. For circular portions, ensure a smooth finish designated by R to ensure proper oil flow."
      ]
    },
    '2d-standard-part-3': {
      title: 'Standard Part Detail (3)',
      subtitle: 'Dimensional standards and detailing practices for Shafts and Key Plates.',
      steps: [
        "Shaft and Key Plates: Follow the dimension table for shaft and key plate thickness. Ensure all cut shapes are free from burrs and use specified flat bar materials with correct width tolerances."
      ]
    },
    '2d-standard-part-4': {
      title: 'Standard Part Detail (4)',
      subtitle: 'Functional applications and tolerance standards for Collars.',
      steps: [
        "Collars: Collars are fitted on shafts to prevent sliding and serve as mechanical stoppers. Review the tolerance standards for correct fitment on your shaft designs."
      ]
    },
    '2d-standard-part-5': {
      title: 'Standard Part Detail (5)',
      subtitle: 'Advanced collar applications (OST-2) for urethane materials and stoppers.',
      steps: [
        "Advanced Collars: The OST-2 collar is used with urethane rubber stoppers. This design prevents over-tightening which could distort the urethane material. Follow the provided detailing reference for OST-2 parts."
      ]
    },
    '2d-standard-part-6': {
      title: 'Standard Part Detail (6)',
      subtitle: 'Standard scale applications (JIS Z 8314) and relief process specifications.',
      steps: [
        "Scale: Adhere to JIS Z 8314 standard scales. While assembly drawings allow some flexibility, parts drawings must always use the standard KEMCO scale.",
        "Relief Process: Used at shaft shoulders to provide tool clearance and prevent damage. This is required for shafts with surface grinding and must be clearly shown in 2D detailing."
      ]
    },
    '2d-standard-part-7': {
      title: 'Standard Part Detail (7)',
      subtitle: 'Workflow for implementing specialized Relief Process templates.',
      steps: [
        "Relief Workflow: To show specialized relief details, use the part library to load the Relief Process template. Place this detail within the global view of your drawing template."
      ]
    }
  };

  const currentLesson = LESSON_DATA[subLessonId] || { title: 'Standard Part Detail', subtitle: '', steps: [] };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={currentLesson.title.toUpperCase()}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak([currentLesson.title, currentLesson.subtitle, ...currentLesson.steps])}
            onStop={stop}
          />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={currentLesson.subtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {subLessonId === "2d-standard-part-1" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">a.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Pitch Center Diameter(PCD)"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={pcdImg} alt="PCD Elimination" className="software-screenshot screenshot-wide" />
                <div className="info-box" style={{ marginTop: "1rem" }}>
                  <p>We don't use PCD anymore to avoid fabrication errors. Instead, provide coordinates or individual dimensions.</p>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">b.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Tapered Threads"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={taperedThreadImg} alt="Tapered Threads" className="software-screenshot screenshot-wide" />
                <div className="info-box" style={{ marginTop: "1rem" }}>
                  <p>Rc Threads are technically tapered. Follow the standard 2D detailing pattern.</p>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">c.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Standard Parts"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={standardPartDetailImg} alt="Standard Parts" className="software-screenshot screenshot-wide" />
                <div className="info-box" style={{ marginTop: "1rem" }}>
                  <p>On standard part templates, only change the boxed portions. Do not modify other template areas.</p>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-standard-part-2" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">d.</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Oil Groove"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <p className="p-flush">Oil grooves distribute lubrication from the oil hole. For flat portions, depth should be 1.5mm.</p>
              <img src={oilGroove1Img} alt="Oil Groove Flat" className="software-screenshot screenshot-wide" style={{ margin: "1rem 0" }} />
              <p className="p-flush">For circular portions, ensure a smooth finish (R).</p>
              <img src={oilGroove2Img} alt="Oil Groove Circular" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem" }} />
            </div>
          ) : subLessonId === "2d-standard-part-3" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">e.</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Shaft and Key Plates"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <img src={shaftKeyPlate1Img} alt="Shaft Key Plates" className="software-screenshot screenshot-wide" />
              <img src={shaftKeyPlate2Img} alt="Key Plate Table" className="software-screenshot screenshot-wide" style={{ margin: "1rem 0" }} />
              <img src={shaftKeyPlate3Img} alt="Key Plate Tolerances" className="software-screenshot screenshot-wide" />
            </div>
          ) : subLessonId === "2d-standard-part-4" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">f.</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Collar"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <p className="p-flush">Collars serve as mechanical stoppers or prevent parts from sliding off shafts.</p>
              <img src={collarImg} alt="Collar Standard" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem" }} />
            </div>
          ) : subLessonId === "2d-standard-part-5" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">g.</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Collar OST-2"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <p className="p-flush">OST-2 Collar is used with urethane rubber stoppers to prevent over-tightening.</p>
              <img src={collar1Img} alt="OST-2 Overview" className="software-screenshot screenshot-wide" style={{ margin: "1rem 0" }} />
              <img src={collar2Img} alt="OST-2 Details" className="software-screenshot screenshot-wide" />
            </div>
          ) : subLessonId === "2d-standard-part-6" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">h.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Scale"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={scaleImg} alt="Standard Scales" className="software-screenshot screenshot-wide" />
              </div>
              <div className="section-divider"></div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">i.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Relief Process"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={reliefProcess1Img} alt="Relief Process Purpose" className="software-screenshot screenshot-wide" style={{ margin: "1rem 0" }} />
                <img src={reliefProcess2Img} alt="Relief Process Detailing" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          ) : subLessonId === "2d-standard-part-7" ? (
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">j.</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Relief Workflow"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <img src={reliefWorkflowImg} alt="Relief Workflow" className="software-screenshot screenshot-wide" style={{ margin: "1rem 0" }} />
              <img src={reliefDialogImg} alt="Relief Placement" className="software-screenshot screenshot-wide" />
            </div>
          ) : null}

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

export default StandardPartLesson;
