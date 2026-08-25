import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import './CourseLesson.css';

/* Importing assets for Retaining Ring */
import retaining1Img from "../../assets/2d-images/2D_retaining_ring_(1).jpg";
import retaining2Img from "../../assets/2d-images/2D_retaining_ring_(2).jpg";

interface RetainingRingLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const RetainingRingLesson: React.FC<RetainingRingLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { t } = useTranslation();
  const TABS = [
    { id: 'external', label: t('2d.ring.external_tab') },
    { id: 'internal', label: t('2d.ring.internal_tab') }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-retaining-ring-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-retaining-ring-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-retaining-ring-active-tab', activeTab);
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

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-retaining-ring-external': {
      title: t('2d.ring.title'),
      subtitle: t('2d.ring.external_subtitle'),
      steps: [

      ]
    },
    '2d-retaining-ring-internal': {
      title: t('2d.ring.title'),
      subtitle: t('2d.ring.internal_subtitle'),
      steps: [

      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-retaining-ring-${activeTab}`] || LESSON_DATA['2d-retaining-ring-external'];

  const currentTabSteps = [
    currentLesson.title,
    currentLesson.subtitle,
    ...(currentLesson.steps || [])
  ].filter(Boolean);

  const tabsList = TABS.map(t => ({ id: t.id }));

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [activeTab, registerText]);

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
              {activeTab === 'external' && (
                <>
                  <div className="step-header" style={{ marginTop: "-1rem" }}>
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('2d.ring.external_heading')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text={currentLesson.steps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                  <img
                    src={retaining1Img}
                    alt="External Retaining Ring Standards"
                    className="software-screenshot screenshot-wide"
                  />
                </>
              )}

              {activeTab === 'internal' && (
                <>
                  <div className="step-header" style={{ marginTop: "-1rem" }}>
                    <span className="step-number">2</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('2d.ring.internal_heading')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <KaraokeLessonText
                    className="p-flush mb-4"
                    text={currentLesson.steps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                  <img
                    src={retaining2Img}
                    alt="Internal Retaining Ring Standards"
                    className="software-screenshot screenshot-wide"
                  />
                </>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => handlePrev()}>
              <ChevronLeft size={18} /> {t('2d.previous')}
            </button>
            <button className="nav-button next" onClick={() => handleNext()}>
              {nextLabel || t('2d.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetainingRingLesson;
