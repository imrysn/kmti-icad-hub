import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Command Menu */
import commandMenu1ImgA from "../../assets/2D_Image_File/2D_command_menu_(1)_command_menu.png";
import commandMenu1ImgB from "../../assets/2D_Image_File/2D_command_menu_(1)_command_menu_2.png";
import linePropsImg from "../../assets/2D_Image_File/2D_command_menu_(1)_selectable_and_unselectable_line.png";
import activeViewImg from "../../assets/2D_Image_File/2D_command_menu_(2)_active_view.png";
import componentHighlightedImg from "../../assets/2D_Image_File/2D_command_menu_(3)_component_highlighled_1.png";

interface CommandMenuLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const CommandMenuLesson: React.FC<CommandMenuLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { t, language, translateContent } = useTranslation();
  const TABS = [
    { id: 'line-properties', label: t('2d.selectable_unselectable_line') },
    { id: 'command-menu', label: t('2d.command_menu') },
    { id: 'active-view', label: t('2d.active_view') },
    { id: 'component', label: t('2d.highlighted_unhighlighted') }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-command-menu-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-command-menu-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-command-menu-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentTabIndex < TABS.length - 1) {
      setActiveTab(TABS[currentTabIndex + 1].id);
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

    const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentTabIndex > 0) {
      setActiveTab(TABS[currentTabIndex - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LESSON_DATA: Record<string, { title: string; steps: string[] }> = {
    '2d-command-menu-line-properties': {
      title: t('2d.selectable_and_unselectable_line_propert'),
      steps: [
        t('2d.all_line_type_line_weight_and_color_are_'),
        t('2d.click_on_the_entities_to_select_and_unse')
      ]
    },
    '2d-command-menu-command-menu': {
      title: t('2d.command_menu_1'),
      steps: [
        t('2d.during_2d_detailing_command_menu_is_more')
      ]
    },
    '2d-command-menu-active-view': {
      title: t('2d.active_view_1'),
      steps: [
        t('2d.each_viewing_has_its_own_local_view_high'),
      ]
    },
    '2d-command-menu-component': {
      title: t('2d.component_highlighted_unhighlighted'),
      steps: [
        t('2d.the_process_of_removing_the_chamfer_is_p')
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-command-menu-${activeTab}`] || { title: 'COMMAND MENU', steps: [] };

  const currentTabSteps = [
    currentLesson.title,
    ...(currentLesson.steps || [])
  ].filter(Boolean);

  const tabsList = TABS.map(t => ({ id: t.id }));

  useEffect(() => {
    registerText(currentTabSteps);
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
              {activeTab === 'line-properties' && (
                <div className={`instruction-step ${currentIndex >= 0 && currentIndex <= 2 ? "reading-active" : ""}`} data-reading-index="0" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 0}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <img src={linePropsImg} alt="Line Properties" className="software-screenshot screenshot-wide mt-4" />

                  <div className="instruction-box mt-4">
                    <div className={`instruction-step-inline ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 1}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className={`instruction-step-inline ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "0.5rem" }}>
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[1]}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'command-menu' && (
                <div className={`instruction-step ${currentIndex >= 0 && currentIndex <= 1 ? "reading-active" : ""}`} data-reading-index="0" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 0}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <div className={`instruction-step-inline ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                      <KaraokeLessonText
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 1}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <img src={commandMenu1ImgA} alt="Command Menu Details" className="software-screenshot screenshot-wide mt-4" />
                    <img src={commandMenu1ImgB} alt="Command Menu Specifics" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'active-view' && (
                <div className={`instruction-step ${currentIndex >= 0 && currentIndex <= 1 ? "reading-active" : ""}`} data-reading-index="0" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 0}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <div className={`instruction-step-inline ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                      <KaraokeLessonText
                        className="p-flush font-bold"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 1}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>

                    <img src={activeViewImg} alt="Active View Settings" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'component' && (
                <div className={`instruction-step ${currentIndex >= 0 && currentIndex <= 1 ? "reading-active" : ""}`} data-reading-index="0" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">4</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 0}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={componentHighlightedImg} alt="Component Highlighting" className="software-screenshot screenshot-wide mt-4" />

                    <div className={`instruction-box ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "2rem" }}>
                      <KaraokeLessonText
                        as="div"
                        className="p-flush"
                        text={currentLesson.steps[0]}
                        isActive={isSpeaking && currentIndex === 1}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
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

export default CommandMenuLesson;
