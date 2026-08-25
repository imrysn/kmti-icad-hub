import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import './CourseLesson.css';

/* Importing assets for Welding Symbol and Notes */
import weldingSymbolMainImg from "../../assets/2d-images/2D_welding_symbol.png";
import weldingSymbolNotesImg from "../../assets/2d-images/2D_welding_symbol_notes.jpg";
import standardNotesImg from "../../assets/2d-images/2D_welding_symbol_standard_notes.jpg";

interface WeldingSymbolLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const WeldingSymbolLesson: React.FC<WeldingSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { t } = useTranslation();
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore('2d-welding-symbol');

  const currentTitle = t('2d.weld.title');
  const currentSubtitle = t('2d.weld.subtitle');

  const currentTabSteps = [
    currentTitle,
    currentSubtitle,
    t('2d.weld.symbol_intro'), t('2d.weld.notes_intro')
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
                <span className="step-number">13</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text={t('2d.weld.symbol')}
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="flex-col gap-4">
                  <img src={weldingSymbolMainImg} alt="Welding Symbol Menu" className="software-screenshot screenshot-wide" />
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px', border: '1px solid red', padding: '1rem', backgroundColor: 'var(--bg-card, #fff)', color: 'var(--text-primary, #333)', fontSize: '0.95rem', borderRadius: '4px' }}>
                      <p style={{ marginBottom: '1rem' }}>{t('2d.weld.instruction_1')}</p>
                      <p style={{ marginBottom: '1rem' }}>{t('2d.weld.instruction_2')}</p>
                      <div style={{ color: 'red', fontStyle: 'italic' }}>
                        <p style={{ fontWeight: 'bold', fontStyle: 'normal', marginBottom: '0.25rem' }}>{t('2d.notes')}</p>
                        <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <li>{t('2d.weld.note_1')}</li><li>{t('2d.weld.note_2')}</li>
                          <li>{t('2d.weld.note_3')}</li><li>{t('2d.weld.note_4')}</li>
                        </ol>
                      </div>
                    </div>
                    <img src={weldingSymbolNotesImg} alt="Welding Hatches Detail" className="software-screenshot screenshot-medium" style={{ flex: 1, minWidth: '300px' }} />
                  </div>
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">

              <div className="step-description">
                <div className="flex-col gap-4">
                  <div className="step-header">
                    <span className="step-number">14</span>
                    <span className="step-label">{t('2d.notes')}</span>
                  </div>
                  <p className="p-flush">{t('2d.weld.note_location')}</p>
                  <div className="step-header" style={{ marginLeft: "3rem" }}>
                    <span className="step-number">a</span>
                    <span className="step-label">{t('2d.weld.standard_notes')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <img src={standardNotesImg} alt="Standard Notes Placement" className="software-screenshot screenshot-medium" style={{ flex: 1, minWidth: '300px' }} />
                    <div style={{ flex: 1, minWidth: '300px', border: '1px solid red', padding: '1rem', backgroundColor: 'var(--bg-card, #fff)', color: 'var(--text-primary, #333)', fontSize: '0.95rem', borderRadius: '8px' }}>
                      <div style={{ color: 'red' }}>
                        <p style={{ marginBottom: '0.5rem' }}>{t('2d.weld.standard_notes')}:</p>
                        <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'var(--text-primary, #fff' }}>
                          <li>{t('2d.weld.standard_1')}</li><li>{t('2d.weld.standard_2')}</li><li>{t('2d.weld.standard_3')}</li>
                        </ol>

                        <p style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>{t('2d.notes')}</p>
                        <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontStyle: 'italic' }}>
                          <li>{t('2d.weld.standard_note_1')}</li><li>{t('2d.weld.standard_note_2')}</li>
                          <li>{t('2d.weld.standard_note_3')}</li><li>{t('2d.weld.standard_note_4')}</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default WeldingSymbolLesson;
