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
    { id: 'line-properties', label: 'Line Properties' },
    { id: 'command-menu', label: 'Command Menu' },
    { id: 'active-view', label: 'Active View' },
    { id: 'component', label: 'Component' }
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
      title: 'Line Properties',
      steps: [
        "Display line properties by selecting it in icon.",
        "As well as in 3D modeling, Line color can change whenever it is required using this color selection.",
        "But unlike in 3D, Line color can only change if entity option is activated.",
        "If ever face option is activated, operator will notice that no lines are possible to select during changing color."
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
        "Each viewing has its own local view.",
        "Highlighted one is activated. It means, all changes performed in that activated view is valid. ",
        "Unactivated view cannot select any line, so that no command will be performed.",

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
                onStart={() => speak([currentLesson.title, ...currentLesson.steps])}
                onStop={stop}
              />
            </div>

            <div className="flex-col tab-content fade-in">
              {activeTab === 'line-properties' && (
                <div className={`instruction-step ${currentIndex >= 1 && currentIndex <= 4 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}> 
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
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
                    <KaraokeLessonText
                      className="p-flush mt-4"
                      text={currentLesson.steps[1]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <KaraokeLessonText
                      className="p-flush mt-2"
                      text={currentLesson.steps[2]}
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />
                    <KaraokeLessonText
                      className="p-flush mt-2"
                      text={currentLesson.steps[3]}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />

                    <img src={linePropsImg} alt="Line Properties" className="software-screenshot screenshot-wide mt-4" />

                    <div className="lesson-table-container mt-6">
                      <table className="lesson-table">
                        <thead>
                          <tr>
                            <th>Application</th>
                            <th>LineType</th>
                            <th>Line Weight</th>
                            <th>Thickness</th>
                            <th>Color</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>Actual line</td><td>Continuous line</td><td>Thick</td><td>0.4mm</td><td>White (1)</td></tr>
                          <tr><td>Hidden Line</td><td>Broken Line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Center Line</td><td>Single DotLine</td><td>Thin</td><td>0.1mm</td><td>Cyan (7)</td></tr>
                          <tr><td>Phantom Line</td><td>Double DotLine</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Arrow / Machine Flow</td><td>Continuous line</td><td>Thick</td><td>0.4mm</td><td>White (1)</td></tr>
                          <tr><td>Welding Hatch</td><td>Continuous line</td><td>Middle</td><td>0.2mm</td><td>Pink (6)</td></tr>
                          <tr style={{ backgroundColor: '#facc15', color: '#000' }}><td>Scribe Line</td><td>Continuous line</td><td>Thick</td><td>0.4mm</td><td>White (1)</td></tr>
                          <tr><td>Floor Level</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Spline / Cutting Line</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Additional Information / Table</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Detail View Indicator</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Text / Letter</td><td>-</td><td>Thin</td><td>0.15mm</td><td>Yellow (4)</td></tr>
                          <tr><td>Machining Symbol</td><td>-</td><td>Thin</td><td>0.1mm</td><td>Red (2)</td></tr>
                          <tr><td>Revised Old Data / Dimension</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Red (2)</td></tr>
                          <tr><td>Cutted part (Hatch)</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Red (2)</td></tr>
                          <tr><td>Revision Cloud</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Red (2)</td></tr>
                          <tr><td>Pipe Reference Drawing</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Pipe End Reference Line</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Scale Line</td><td>Continuous line</td><td>Middle</td><td>0.2mm</td><td>SkinColor (15)</td></tr>
                          <tr><td>Surface Treatment/Condition Surface Without Welding Appearance</td><td>Single DotLine</td><td>Middle</td><td>0.2mm</td><td>SkinColor (15)</td></tr>
                          <tr><td>Same Level</td><td>Single DotLine</td><td>Thin</td><td>0.1mm</td><td>Cyan (7)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'command-menu' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
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
                <div className={`instruction-step ${currentIndex >= 1 && currentIndex <= 3 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
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
                    <KaraokeLessonText
                      className="p-flush mt-4"
                      text={currentLesson.steps[1]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <KaraokeLessonText
                      className="p-flush mt-2"
                      text={currentLesson.steps[2]}
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />

                    
                    <img src={activeViewImg} alt="Active View Settings" className="software-screenshot screenshot-wide mt-4" />
                  </div>
                </div>
              )}

              {activeTab === 'component' && (
                <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text=""
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
