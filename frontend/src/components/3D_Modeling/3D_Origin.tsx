import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { useTranslation } from '../../context/LanguageContext';
import './CourseLesson.css';
import { KaraokeLessonText } from "../KaraokeLessonText";

// --- Assets ---
import originOverview from "../../assets/3d-images/origin.png";
import toolSelection from "../../assets/3d-images/origin_change_3d_part_layout.png";
import interactionSteps from "../../assets/3d-images/origin_change_3d_part_layout_2345.png";

interface OriginLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const OriginLesson: React.FC<OriginLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const [activeTab, setActiveTab] = useState<"projections" | "layout">(() => {
    return (localStorage.getItem('3d-origin-active-tab') as any) || "projections";
  });
  const { t } = useTranslation();

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore("3d-origin");

  useEffect(() => {
    localStorage.setItem('3d-origin-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const LESSON_DATA = React.useMemo(() => ({
    projections: {
      title: t('origin.title'),
      subtitle: t('origin.subtitle'),
      importantNotes: t('origin.importantNotes')
    },
    layout: {
      title: t('origin.layout.title'),
      subtitle: t('origin.layout.subtitle'),
      steps: [
        t('origin.layout.step1'),
        t('origin.layout.step2'),
        t('origin.layout.step3'),
        t('origin.layout.step4'),
        t('origin.layout.step5')
      ]
    }
  }), [t]);

  const currentLesson = activeTab === 'projections' ? LESSON_DATA.projections : LESSON_DATA.layout;

  const handleNext = () => {
    if (activeTab === "projections") {
      setActiveTab("layout");
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === "layout") {
      setActiveTab("projections");
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const projectionsSteps = [
    LESSON_DATA.projections.title,
    LESSON_DATA.projections.subtitle,
    LESSON_DATA.projections.importantNotes,
  ];

  const layoutSteps = [
    LESSON_DATA.layout.title,
    LESSON_DATA.layout.subtitle,
    ...LESSON_DATA.layout.steps,
  ];

  const currentTabSteps = activeTab === 'projections' ? projectionsSteps : layoutSteps;
  const tabsList = [{ id: 'projections' }, { id: 'layout' }];

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
        <button className={`tab-button ${activeTab === "projections" ? "active" : ""}`} onClick={() => setActiveTab("projections")}>
          {t('origin.title')}
        </button>
        <button className={`tab-button ${activeTab === "layout" ? "active" : ""}`} onClick={() => setActiveTab("layout")}>
          {t('origin.layout.title')}
        </button>
      </div>



      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          {activeTab === "projections" ? (
            <div className="fade-in">
              <div className="card-header">
                <KaraokeLessonText
                  as="h4"
                  className={`section-title ${currentIndex === 0 ? 'reading-active' : ''}`}
                  data-reading-index="0"
                  text={LESSON_DATA.projections.title}
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />

              </div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <KaraokeLessonText
                  className="p-flush"
                  text={currentLesson.subtitle}
                  isActive={isSpeaking && currentIndex === 1}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="red-text" style={{ marginBottom: "2rem", marginTop: "-1rem" }}>
                  <KaraokeLessonText
                    as="p"
                    text={LESSON_DATA.projections.importantNotes}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={originOverview} alt={t('common.origin_overview')} className="software-screenshot screenshot-wide mt-4" />
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="card-header">
                <KaraokeLessonText
                  as="h4"
                  className={`section-title ${currentIndex === 0 ? 'reading-active' : ''}`}
                  data-reading-index="0"
                  text={LESSON_DATA.layout.title}
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />

              </div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`} data-reading-index="1">
                <KaraokeLessonText
                  className="p-flush"
                  text={currentLesson.subtitle}
                  isActive={isSpeaking && currentIndex === 1}
                  currentCharIndex={currentCharIndex}
                />
              </div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={LESSON_DATA.layout.steps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={toolSelection} alt={t('common.tool_selection')} className="software-screenshot" style={{ height: 'auto', width: "400px" }} />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3">
                <div className="step-header" style={{ marginTop: "-1rem" }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={LESSON_DATA.layout.steps[1]}
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={LESSON_DATA.layout.steps[2]}
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={LESSON_DATA.layout.steps[3]}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>


              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text={LESSON_DATA.layout.steps[4]}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <KaraokeLessonText
                    className="p-flush"
                    style={{ marginBottom: "3rem" }}
                    text={t('origin.layout.step5_xy')}
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={interactionSteps} alt={t('common.interaction_steps')} className="software-screenshot screenshot-medium mt-4" />
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => handlePrev()} disabled={!onPrevLesson && activeTab === 'projections'}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={() => handleNext()}>
              {nextLabel || t('common.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginLesson;
