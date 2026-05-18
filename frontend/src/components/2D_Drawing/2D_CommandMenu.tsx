import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import { KaraokeLessonText } from "../KaraokeLessonText";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Command Menu */
import linePropsImg from "../../assets/2D_Image_File/2D_command_menu_(1)_selectable_and_unselectable_line.png";
import commandMenu1ImgA from "../../assets/2D_Image_File/2D_command_menu_(1)_command_menu.png";
import commandMenu1ImgB from "../../assets/2D_Image_File/2D_command_menu_(1)_command_menu_2.png";
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
  const TABS = [
    { id: 'line-properties', label: 'Selectable / Unselectable Line' },
    { id: 'command-menu', label: 'Command Menu' },
    { id: 'active-view', label: 'Active View' },
    { id: 'component', label: 'Highlighted / Unhighlighted ' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-command-menu-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-command-menu-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-command-menu-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = () => {
    const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentTabIndex < TABS.length - 1) {
      setActiveTab(TABS[currentTabIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
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
      title: 'Selectable and Unselectable Line Properties',
      steps: [

      ]
    },
    '2d-command-menu-command-menu': {
      title: 'COMMAND MENU',
      steps: [
        "During 2D detailing, command menu is more effective to use rather than icon menu."
      ]
    },
    '2d-command-menu-active-view': {
      title: 'ACTIVE VIEW',
      steps: [
        "Each viewing has its own local view.<br />Highlighted one is activated. It means, all changes performed in that activated view is valid.<br />Unactivated view cannot select any line, so that no command will be performed.",
      ]
    },
    '2d-command-menu-component': {
      title: 'Component highlighted / unhighlighted',
      steps: [
        "<strong class=\"red-text\">Note:</strong> The process of removing the chamfer is per orthographic view."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-command-menu-${activeTab}`] || { title: 'COMMAND MENU', steps: [] };

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
                <div className={`instruction-step ${currentIndex >= 1 && currentIndex <= 4 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}> 
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Selectable and Unselectable Line Properties"
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <img src={linePropsImg} alt="Line Properties" className="software-screenshot screenshot-wide mt-4" />
                    
                    <div className="instruction-box mt-4">
                      <p className="p-flush">All line type, line weight, and color are selectable when system is started.</p>
                      <p className="p-flush mt-2">Click on the entities to select and unselect line properties.</p>
                      <p className="p-flush mt-2">Entities highlighted in blue are selectable.</p>
                    </div>



                  </div>
              )}

              {activeTab === 'command-menu' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Command Menu"
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
                    <img src={commandMenu1ImgA} alt="Command Menu Details" className="software-screenshot screenshot-wide mt-4" />
                    <img src={commandMenu1ImgB} alt="Command Menu Specifics" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'active-view' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Active View"
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush font-bold"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />

                    
                    <img src={activeViewImg} alt="Active View Settings" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'component' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">4</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Component highlighted / unhighlighted"
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={componentHighlightedImg} alt="Component Highlighting" className="software-screenshot screenshot-wide mt-4" />
                    
                    <div className={`instruction-box ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{marginTop: "2rem"}}>
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

export default CommandMenuLesson;
