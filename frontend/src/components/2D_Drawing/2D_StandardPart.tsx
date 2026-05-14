import React, { useState, useEffect } from "react";
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
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const StandardPartLesson: React.FC<StandardPartLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const TABS = [
    { id: '1', label: 'PCD & Thread' },
    { id: '2', label: 'Oil Groove' },
    { id: '3', label: 'Shaft & Key' },
    { id: '4', label: 'Collar (1)' },
    { id: '5', label: 'Collar (2)' },
    { id: '6', label: 'Scale & Relief' },
    { id: '7', label: 'Relief Detail' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-standard-part-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-standard-part-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-standard-part-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = () => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-standard-part-1': {
      title: 'STANDARD PART DETAIL (1)',
      subtitle: 'Guidelines for PCD, Tapered Threads, and Standard Part Template requirements.',
      steps: [
        "PCD is no longer used in KEMCO drawings to prevent fabrication errors. Instead, provide individual coordinates or dimensions.",
        "For technical threads like Rc, ensure you apply the specific 2D detailing patterns shown in the template.",
        "On standard part templates, only modify the boxed portions. All other template details should remain unchanged."
      ]
    },
    '2d-standard-part-2': {
      title: 'STANDARD PART DETAIL (2)',
      subtitle: 'Standardized oil groove designs for flat surfaces and circular portions.',
      steps: [
        "Oil grooves distribute lubrication from oil holes. For flat surfaces, depth should be 1.5mm, and the groove must be wider than the accompanying drill hole. For circular portions, ensure a smooth finish designated by R to ensure proper oil flow."
      ]
    },
    '2d-standard-part-3': {
      title: 'STANDARD PART DETAIL (3)',
      subtitle: 'Dimensional standards and detailing practices for Shafts and Key Plates.',
      steps: [
        "Follow the dimension table for shaft and key plate thickness. Ensure all cut shapes are free from burrs and use specified flat bar materials with correct width tolerances."
      ]
    },
    '2d-standard-part-4': {
      title: 'STANDARD PART DETAIL (4)',
      subtitle: 'Functional applications and tolerance standards for Collars.',
      steps: [
        "Collars are fitted on shafts to prevent sliding and serve as mechanical stoppers. Review the tolerance standards for correct fitment on your shaft designs."
      ]
    },
    '2d-standard-part-5': {
      title: 'STANDARD PART DETAIL (5)',
      subtitle: 'Advanced collar applications (OST-2) for urethane materials and stoppers.',
      steps: [
        "The OST-2 collar is used with urethane rubber stoppers. This design prevents over-tightening which could distort the urethane material. Follow the provided detailing reference for OST-2 parts."
      ]
    },
    '2d-standard-part-6': {
      title: 'STANDARD PART DETAIL (6)',
      subtitle: 'Standard scale applications (JIS Z 8314) and relief process specifications.',
      steps: [
        "Adhere to JIS Z 8314 standard scales. While assembly drawings allow some flexibility, parts drawings must always use the standard KEMCO scale.",
        "Used at shaft shoulders to provide tool clearance and prevent damage. This is required for shafts with surface grinding and must be clearly shown in 2D detailing."
      ]
    },
    '2d-standard-part-7': {
      title: 'STANDARD PART DETAIL (7)',
      subtitle: 'Workflow for implementing specialized Relief Process templates.',
      steps: [
        "To show specialized relief details, use the part library to load the Relief Process template. Place this detail within the global view of your drawing template."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-standard-part-${activeTab}`] || LESSON_DATA['2d-standard-part-1'];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="card-header">
              <KaraokeLessonText
                as="h4"
                className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                data-reading-index="0"
                text={currentLesson.title}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              <ReadAloudButton 
                isSpeaking={isSpeaking} 
                onStart={() => speak([currentLesson.title, currentLesson.subtitle, ...currentLesson.steps])}
                onStop={stop}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <KaraokeLessonText
                className="p-flush"
                text={currentLesson.subtitle}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Pitch Center Diameter (PCD)"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="red-text mb-4">
                        <KaraokeLessonText
                          text={currentLesson.steps[0]}
                          isActive={isSpeaking && currentIndex === 2}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <img src={pcdImg} alt="PCD Elimination" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Tapered Threads"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={taperedThreadImg} alt="Tapered Threads" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                    <div className="step-header">
                      <span className="step-number">3</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Standard Part Templates"
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={standardPartDetailImg} alt="Standard Parts" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Oil Groove Design"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={oilGroove1Img} alt="Oil Groove Flat" className="software-screenshot screenshot-wide mb-4" />
                      <img src={oilGroove2Img} alt="Oil Groove Circular" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '3' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Shaft and Key Plates"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={shaftKeyPlate1Img} alt="Shaft Key Plates" className="software-screenshot screenshot-wide mb-4" />
                      <img src={shaftKeyPlate2Img} alt="Key Plate Table" className="software-screenshot screenshot-wide mb-4" />
                      <img src={shaftKeyPlate3Img} alt="Key Plate Tolerances" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '4' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Standard Collars"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={collarImg} alt="Collar Standard" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '5' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Collar OST-2"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={collar1Img} alt="OST-2 Overview" className="software-screenshot screenshot-wide mb-4" />
                      <img src={collar2Img} alt="OST-2 Details" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '6' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Standard Scales"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={scaleImg} alt="Standard Scales" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Relief Process"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={reliefProcess1Img} alt="Relief Process Purpose" className="software-screenshot screenshot-wide mb-4" />
                      <img src={reliefProcess2Img} alt="Relief Process Detailing" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '7' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Relief Workflow"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <KaraokeLessonText
                        className="p-flush mb-4"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                      <img src={reliefWorkflowImg} alt="Relief Workflow" className="software-screenshot screenshot-wide mb-4" />
                      <img src={reliefDialogImg} alt="Relief Placement" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
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

export default StandardPartLesson;
