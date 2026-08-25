import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import './CourseLesson.css';

/* Importing assets for Orthographic View */
import drawingTemplateImg from "../../assets/2d-images/2D_create_orthographic_view_(1)_1.png";
import createViewImg from "../../assets/2d-images/2D_create_orthographic_view_(1)_a.png";
import scalingImg from "../../assets/2d-images/2D_create_orthographic_view_(1)_b.png";
import hiddenLineDialogImg from "../../assets/2d-images/2D_create_orthographic_view_(2)_c.2.png";
import tangentLineDialogImg from "../../assets/2d-images/2D_create_orthographic_view_(2)_d.2.png";
import highPrecisionDialogImg from "../../assets/2d-images/2D_create_orthographic_view_(3)_e1.png";

interface OrthographicViewLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OrthographicViewLesson: React.FC<OrthographicViewLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { t, language, translateContent } = useTranslation();
  const TABS = [
    { id: 'template', label: t('2d.drawing_template') },
    { id: 'views', label: t('2d.orthograohic_view_delete') },
    { id: 'scale', label: t('2d.orthographic.scale') },
    { id: 'hidden', label: t('2d.hidden_line') },
    { id: 'tangent', label: t('2d.tangent_line') },
    { id: 'precision', label: t('2d.high_precision') }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-orthographic-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-orthographic-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-orthographic-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LESSON_DATA: Record<string, { title: string; steps: string[] }> = {
    '2d-orthographic-template': {
      title: t('2d.inserting_drawing_template'),
      steps: [""]
    },
    '2d-orthographic-views': {
      title: t('2d.creating_orthographic_view_delete_views'),
      steps: [""]
    },
    '2d-orthographic-scale': {
      title: t('2d.orthographic.scale'),
      steps: [
        t('2d.orthographic.scale.description'),
        t('2d.orthographic.scale.toolbar_note'),
        t('2d.orthographic.scale.standard_note')
      ]
    },
    '2d-orthographic-hidden': {
      title: t('2d.hidden_line_1'),
      steps: [
        t('2d.orthographic.hidden.description')
      ]
    },
    '2d-orthographic-tangent': {
      title: t('2d.tangent_line_1'),
      steps: [
        t('2d.orthographic.tangent.description')
      ]
    },
    '2d-orthographic-precision': {
      title: t('2d.high_precision_1'),
      steps: [
        t('2d.orthographic.precision.description')
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-orthographic-${activeTab}`] || { title: 'ORTHOGRAPHIC VIEW', steps: [] };

  const currentTabSteps = [
    currentLesson.title,
    ...(currentLesson.steps || [])
  ].filter(Boolean);

  const tabsList = TABS.map(t => ({ id: t.id }));

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [activeTab, language, registerText]);

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

            <div className="flex-col tab-content fade-in">
              {activeTab === 'template' && (
                <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 0}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={drawingTemplateImg} alt="Inserting Drawing Template" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'views' && (
                <div className={`instruction-step ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">a</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 0}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={createViewImg} alt="Creating Orthographic Views" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'scale' && (
                <div className={`instruction-step ${currentIndex >= 1 && currentIndex <= 3 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">b</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                    <div className={`instruction-box ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "1rem" }}>
                      <p className="p-flush"><strong className="red-text">{t('2d.note')}</strong></p>
                      <KaraokeLessonText
                        as="div"
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <img src={scalingImg} alt="Scaling and Projection Properties" className="software-screenshot screenshot-wide mt-4" />
                    <div className={`instruction-box ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "2rem" }}>
                      <p className="p-flush"><strong className="red-text">{t('2d.note')}</strong></p>
                      <KaraokeLessonText
                        as="div"
                        className="p-flush"
                        text={currentLesson.steps[2]}
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hidden' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">c</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={hiddenLineDialogImg} alt="Hidden Line Dialog" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'tangent' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">d</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={tangentLineDialogImg} alt="Tangent Line Dialog" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'precision' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">e</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={highPrecisionDialogImg} alt="High Precision Dialog" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => handlePrev()}>
              <ChevronLeft size={18} /> {t('2d.previous')}
            </button>
            <button className="nav-button next" onClick={() => handleNext()}>
              {nextLabel ? translateContent(nextLabel) : t('2d.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrthographicViewLesson;

