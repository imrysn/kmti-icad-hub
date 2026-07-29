import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import "../../styles/2D_Drawing/CourseLesson.css";

import balloonAssemblyMenuImg from "../../assets/2D_Image_File/2D_balloon_assembly_drawing_1.png";
import balloonAssemblyMenu2Img from "../../assets/2D_Image_File/2D_balloon_assembly_drawing_2.png";
import balloonPartMenuImg from "../../assets/2D_Image_File/2D_balloon_part_drawing.png";

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
  const { t } = useTranslation();
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore('2d-balloon');
  const [activeTab] = useState<string>('1');
  const currentTabSteps = [
    t('2d.balloon.title'), t('2d.balloon.part_intro'), t('2d.balloon.note_1'),
    t('2d.balloon.note_2'), t('2d.balloon.note_3'), t('2d.balloon.note_4'),
    t('2d.balloon.assembly'), t('2d.balloon.edit'), t('2d.balloon.placement')
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
    { id: '1', label: t('2d.balloon.title') }
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
                        text={t('2d.balloon.title')}
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
                        text={t('2d.bom.part_drawing')}
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
                          text={t('2d.balloon.part_intro')}
                          isActive={isSpeaking && currentIndex === 1}
                          currentCharIndex={currentCharIndex}
                        />
                        <p className="p-flush" style={{ marginBottom: "0.25rem" }}><strong className="red-text">{t('2d.notes')}</strong></p>
                        <KaraokeLessonText
                          className="p-flush"
                          style={{ marginBottom: "0.25rem" }}
                          text={t('2d.balloon.note_1')}
                          isActive={isSpeaking && currentIndex === 2}
                          currentCharIndex={currentCharIndex}
                        />
                        <KaraokeLessonText
                          className="p-flush"
                          style={{ marginBottom: "0.25rem" }}
                          text={t('2d.balloon.note_2')}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                        <KaraokeLessonText
                          className="p-flush"
                          style={{ marginBottom: "0.25rem" }}
                          text={t('2d.balloon.note_3')}
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                        <KaraokeLessonText
                          className="p-flush"
                          text={t('2d.balloon.note_4')}
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
                        text={t('2d.balloon.assembly')}
                        isActive={isSpeaking && currentIndex === 6}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={balloonAssemblyMenuImg} alt="Assembly Add Balloon Settings" className="software-screenshot screenshot-wide" />

                      <div className={`instruction-box mt-6 ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">
                        <KaraokeLessonText
                          className="p-flush"
                          text={t('2d.balloon.edit')}
                          isActive={isSpeaking && currentIndex === 7}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>

                      <div className={`instruction-box mt-4 ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8">
                        <KaraokeLessonText
                          className="p-flush"
                          text={t('2d.balloon.placement')}
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
              <ChevronLeft size={18} /> {t('2d.previous')}
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || t('2d.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalloonLesson;
