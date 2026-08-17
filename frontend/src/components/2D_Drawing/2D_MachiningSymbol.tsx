import React, { useEffect } from "react";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Machining Symbol */

import machiningSymbolMainImg from "../../assets/2D_Image_File/2D_machining_symbol.png";


interface MachiningSymbolLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MachiningSymbolLesson: React.FC<MachiningSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore('2d-machining-symbol');

  const machiningSteps = [
    ""
  ];

  const currentTitle = "MACHINING SYMBOL";
  const currentSubtitle = "Understanding machining symbols and surface condition requirements to ensure precision parts and required surface finishes.";
  const currentTabSteps = [
    currentTitle,
    currentSubtitle,
    "Machining Symbol. Note: Machining symbol with open & close parenthesis indicates that the part must be machined before welding. Machining after welding will be impossible.",
    "Machining Surface Condition."
  ];
  const tabsList = [{ id: 'default' }];
  const activeTab = 'default';

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

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">1</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Machining Symbol"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text={machiningSteps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={machiningSymbolMainImg} alt="Machining Symbol Selection" className="software-screenshot screenshot-wide" />
                <div className="instruction-box mt-6">
                  <p className="p-flush">
                    Note: Machining symbol with open &amp; close parenthesis indicates that the part must be machined before welding. Machining after welding will be impossible.
                  </p>
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header" style={{ marginLeft: "3rem" }}>
                <span className="step-number">a</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Machining Surface Condition"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="lesson-table-container mt-4 mb-4">
                  <table className="lesson-table">
                    <thead>
                      <tr>
                        <th className="text-center">Symbol</th>
                        <th>Description</th>
                        <th>Symbol to be called</th>
                        <th>Meaning</th>
                        <th>Application example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>▽</td>
                        <td>100S~50S</td>
                        <td>Rough surface</td>
                        <td>Surface is noting related to other area.</td>
                        <td className="text-left" style={{ textAlign: 'left' }}>Shaft edge<br />external surface of cover</td>
                      </tr>
                      <tr>
                        <td className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>▽▽</td>
                        <td>25S~12.5S</td>
                        <td>Machine Surface</td>
                        <td>Relate to other parts<br />(Middle class accuracy)</td>
                        <td className="text-left" style={{ textAlign: 'left' }}>Depth surface of key slot<br />Internal surface of cover</td>
                      </tr>
                      <tr>
                        <td className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>▽▽▽</td>
                        <td>6.3S~1.6S</td>
                        <td>Fine Surface</td>
                        <td>Surface must be smooth<br />(High Class Accuracy)</td>
                        <td className="text-left" style={{ textAlign: 'left' }}>Surface attached with oil seal<br />shaft surface</td>
                      </tr>
                      <tr>
                        <td className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>(▽)</td>
                        <td>100S~50S</td>
                        <td>Rough Machine<br />(Before welding)</td>
                        <td>Need machine surface after welding<br />assembly</td>
                        <td className="text-left" style={{ textAlign: 'left' }}>surface of both welding parts<br />weld parts with sprocket</td>
                      </tr>
                      <tr>
                        <td className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>(▽▽)</td>
                        <td>25S~12.5S</td>
                        <td>Machine Surface<br />(Before welding)</td>
                        <td>Relate to other parts<br />(Middle class accuracy)</td>
                        <td className="text-left" style={{ textAlign: 'left' }}>Pillow block installation surface<br />cylinder installation surface</td>
                      </tr>
                      <tr>
                        <td className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.1' }}>
                            <span style={{ fontSize: '0.9rem' }}>G</span>
                            <span>▽▽</span>
                          </div>
                        </td>
                        <td>6.3S~1.6S</td>
                        <td>Surface Grinding</td>
                        <td>Need fine surface finish<br />(Cosmetic finish)</td>
                        <td className="text-left" style={{ textAlign: 'left' }}>Slide guide / Rail Guide<br />Guide plate</td>
                      </tr>
                      <tr>
                        <td className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.1' }}>
                            <span style={{ fontSize: '0.9rem' }}>G</span>
                            <span>▽▽▽</span>
                          </div>
                        </td>
                        <td>1.6S~</td>
                        <td>Mirror finish<br />surface</td>
                        <td>Need more fine surface finish<br />(Fine Cosmetic finish)</td>
                        <td className="text-left" style={{ textAlign: 'left' }}>Surface of Shaft<br />Roller</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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

export default MachiningSymbolLesson;



