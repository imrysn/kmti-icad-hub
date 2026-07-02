import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";

import "../../styles/2D_Drawing/CourseLesson.css";

import balloonPartMenuImg from "../../assets/2D_Image_File/2D_balloon_part_drawing.png";
import balloonAssemblyMenuImg from "../../assets/2D_Image_File/2D_balloon_assembly_drawing_1.png";
import balloonAssemblyMenu2Img from "../../assets/2D_Image_File/2D_balloon_assembly_drawing_2.png";

interface BalloonLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BalloonLesson: React.FC<BalloonLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore('2d-balloon');
  const [activeTab] = useState<string>('1');
  const currentTabSteps = [
    "BALLOON",
    "Part drawing. A balloon will be placed where the part image is clearly shown.",
    "Balloons should not overlap with other lines or dimensions.",
    "If the details on the BOM are properly linked, part balloons are automatically displayed.",
    "If part balloon is not displayed, the drawing and the BOM properties is not linked. Do not manually input the letters/numbers in item entry box.",
    "Text should not change using edit characters.",
    "Assembly drawing",
    "Edit Balloon: The Add Balloon command is used to insert balloon into existing balloon to show that they are assembled together.",
    "Select the setup for Add Balloon. Click L1 of the part needed, then click P2 to place it beside the balloon where it will be attached."
  ];
  const tabsList = [{ id: '1' }];

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [registerText]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    if (onNextLesson) onNextLesson();
  };

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

  const TABS = [
    { id: '1', label: 'Balloon' }
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className="tab-button active"
            style={{ cursor: "default" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className="flex-col">
                  {/* Part Balloon Intro */}
                  <div className="instruction-step" data-reading-index="0">
                    <div className="step-header" style={{ marginTop: "-2rem" }}>
                      <span className="step-number">18</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Balloon"
                        isActive={isSpeaking && currentIndex === 0}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                  </div>

                  {/* Subsection a. Part drawing */}
                  <div className={`instruction-step ${currentIndex >= 1 && currentIndex <= 5 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-3rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">a</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Part drawing"
                        isActive={isSpeaking && currentIndex === 1}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={balloonPartMenuImg} alt="Part Balloon Selection and Display" className="software-screenshot screenshot-wide" />

                      <div className="instruction-box mt-4">
                        <KaraokeLessonText
                          className="p-flush"
                          style={{ marginBottom: "0.5rem" }}
                          text="A balloon will be placed where the part image is clearly shown."
                          isActive={isSpeaking && currentIndex === 1}
                          currentCharIndex={currentCharIndex}
                        />
                        <p className="p-flush" style={{ marginBottom: "0.25rem" }}><strong className="red-text">Notes:</strong></p>
                        <KaraokeLessonText
                          className="p-flush"
                          style={{ marginBottom: "0.25rem" }}
                          text="1. Balloons should not overlap with other lines or dimensions."
                          isActive={isSpeaking && currentIndex === 2}
                          currentCharIndex={currentCharIndex}
                        />
                        <KaraokeLessonText
                          className="p-flush"
                          style={{ marginBottom: "0.25rem" }}
                          text="2. If the details on the BOM are properly linked, part balloons are automatically displayed."
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                        <KaraokeLessonText
                          className="p-flush"
                          style={{ marginBottom: "0.25rem" }}
                          text="3. If part balloon is not displayed, the drawing and the BOM properties is not linked. Do not manually input the letters/numbers in item entry box."
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                        <KaraokeLessonText
                          className="p-flush"
                          text="4. Text should not change using edit characters."
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                  </div>


                  {/* Subsection b. Assembly drawing */}
                  <div className={`instruction-step ${currentIndex >= 6 ? "reading-active" : ""}`} data-reading-index="6">
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Assembly drawing"
                        isActive={isSpeaking && currentIndex === 6}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={balloonAssemblyMenuImg} alt="Assembly Add Balloon Settings" className="software-screenshot screenshot-wide" />
                      
                      <div className={`instruction-box mt-6 ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                        <KaraokeLessonText
                          className="p-flush"
                          text="Edit Balloon: The Add Balloon command is used to insert balloon into existing balloon to show that they are assembled together."
                          isActive={isSpeaking && currentIndex === 7}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>

                      <div className={`instruction-box mt-4 ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8">
                        <KaraokeLessonText
                          className="p-flush"
                          text="Select the setup for Add Balloon. Click L-1 of the part needed, then click P-2 to place it beside the balloon where it will be attached."
                          isActive={isSpeaking && currentIndex === 8}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>

                      <img src={balloonAssemblyMenu2Img} alt="Add Balloon Assembly Placement" className="software-screenshot screenshot-small mt-6" style={{ marginLeft: "26.5rem" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalloonLesson;
