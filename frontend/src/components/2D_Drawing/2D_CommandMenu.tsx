import React, { useState, useEffect, useRef } from "react";

import { ArrowRight, ChevronLeft, ChevronRight, Layout, MousePointer2, List, } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Command Menu (1) */

import selectableLineImg from "../../assets/2D_Image_File/2D_command_menu_(1)_selectable_and_unselectable_line.png";
/* Section 2 */

import commandMenu1Img from "../../assets/2D_Image_File/2D_command_menu_(1)_command_menu.png";
/* Section 3 - Part 1 */

import commandMenu2Img from "../../assets/2D_Image_File/2D_command_menu_(1)_command_menu_2.png";
/* Section 3 - Part 2 */
/* Importing assets for Command Menu (2) */

import activeViewImg from "../../assets/2D_Image_File/2D_command_menu_(2)_active_view.png";
/* Section 3 */

import componentHighlighted1Img from "../../assets/2D_Image_File/2D_command_menu_(2)_component_highlighled_1.png";
/* Section 4 - Part 1 */

import componentHighlighted2Img from "../../assets/2D_Image_File/2D_command_menu_(2)_component_highlighled_2.png";
/* Section 4 - Part 2 */

interface CommandMenuLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const CommandMenuLesson: React.FC<CommandMenuLessonProps> = ({
  subLessonId = "2d-command-menu-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  

  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking, currentIndex } = useTTS();

  const commandMenu1Steps = [
    "Line Properties: All line type, weight, and color are selectable at startup. Click entities to select or unselect properties; selectable entities are highlighted in blue.",
    "Essential Tools: Familiarize yourself with the Trim command for cutting overlapping lines and the Offset command for creating precise parallel geometry.",
    "Efficiency: During 2D detailing, the command menu is significantly more effective than the icon menu for rapid tool access."
  ];

  const commandMenu2Steps = [
    "Active View: Each view is local. The highlighted view is activated, meaning changes only apply to that specific view. Unactivated views cannot be edited.",
    "Chamfer Removal: Chamfer lines appearing too close to object lines can cause dimensioning errors and printing issues. Remove these per orthographic view using the properties menu."
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;

      const totalHeight = element.scrollHeight - element.clientHeight;

      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }

      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;

    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [subLessonId]);

  

  const getStepClass = (stepId: string) => "instruction-step";
  return (
    <div className="course-lesson-container command-menu-lesson" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}
          
          {subLessonId === "2d-command-menu-1"
            ? "COMMAND MENU (1)"
            : "COMMAND MENU (2)"}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
              if (subLessonId === "2d-command-menu-1") speak(commandMenu1Steps);
              else speak(commandMenu2Steps);
            }}
            onStop={stop}
          />
        </h3>

        <p className="p-flush">
          Learn about line properties and the efficiency of using the command
          menu in 2D detailing.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-command-menu-1" ? (
            <>
              {" "}
              {/* Section 2: Selectable and Unselectable Line Properties */}
              <div className={`${getStepClass("cm1-2")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">
                    
                    2
                  </span>{" "}
                  <span className="step-label">
                    Selectable and Unselectable Line Properties
                  </span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <div className="image-wrapper-flush">
                      <img src={selectableLineImg} alt="Selectable Line Properties" className="software-screenshot screenshot-wide" />
                    </div>

                    <div className="info-box">
                      <p className="p-flush">
                        All line type, line weight, and color are selectable
                        when system is started.
                      </p>

                      <p className="p-flush">
                        Click on the entities to select and unselect line
                        properties.
                      </p>

                      <div className="flex-row-center">
                        <div> Entities highlighted in blue are selectables</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider-sm"></div>{" "}
              {/* Section 2b: Essential Tools */}
              <div className={`${getStepClass("cm1-2b")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">
                    
                    b
                  </span>{" "}
                  <span className="step-label">ESSENTIAL TOOLS (TRIM & OFFSET)</span>
                </div>
                <div className="step-description">
                  <div className="info-box">
                    <p className="p-flush">
                      The 2D Command Menu provides rapid access to critical editing tools:
                    </p>
                    <ul>
                      <li><strong>Trim:</strong> Used to cut or delete overlapping segments of lines at their intersections.</li>
                      <li><strong>Offset:</strong> Creates a parallel copy of a line, arc, or circle at a specified distance.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* Section 3: Command Menu */}
              <div className={`${getStepClass("cm1-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">
                    
                    3
                  </span>{" "}
                  <span className="step-label">
                    {" "}
                    <strong>Command Menu</strong> ↁEDuring 2D detailing, command
                    menu is more effective to use rather than icon menu.{" "}
                  </span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <div className="image-wrapper-flush">
                      <img src={commandMenu1Img} alt="Command Menu - Basic Tools" className="software-screenshot screenshot-wide" />
                    </div>

                    <div className="image-wrapper-flush">
                      <img src={commandMenu2Img} alt="Command Menu - Advanced Tools" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-command-menu-2" ? (
            <>
              {" "}
              {/* Section 3: Active View */}
              <div className={`${getStepClass("cm2-3")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">
                    
                    3
                  </span>{" "}
                  <span className="step-label">Active View</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <p className="p-flush">
                      Each viewing has its own local view. <br /> Highlighted
                      one is activated. It means, all changes performed in that
                      activated view is valid. <br />
                      Unactivated view cannot select any line, so that no
                      command will be performed.
                    </p>

                    <div className="image-wrapper-flush">
                      <img src={activeViewImg} alt="Active View and Local View" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Section 4: Component highlighted / unhighlighted */}
              <div className={`${getStepClass("cm2-4")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">
                    
                    4
                  </span>{" "}
                  <span className="step-label">
                    Component highlighted / unhighlighted
                  </span>
                </div>

                <div className="step-description">
                  <div className="flex-row--top">
                    <div className="flex-1">
                      <div className="image-wrapper-flush">
                        <img src={componentHighlighted1Img} alt="Chamfer line appearing too close" className="software-screenshot screenshot-large" />
                      </div>

                      <div className="info-box">
                        <p className="p-flush">
                          <i>
                            NOTE: The process of removing the chamfer is per
                            orthographic view.
                          </i>
                        </p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="info-box">
                        <p className="p-flush">
                          As shown, chamfer line appear in the drawing. It shows
                          that it is too close to the object line.
                        </p>

                        <p className="p-flush">
                          It may cause offsetting of line selection upon
                          dimensioning, and during printing, these lines may
                          appear much thicker than the others.
                        </p>

                        <p className="p-flush">
                          This chamfer line can be removed.
                        </p>
                      </div>

                      <div className="image-wrapper-flush">
                        <img src={componentHighlighted2Img} alt="Properties for removing chamfer" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : (
            <p>
              Content for
              {subLessonId} is still being prepared.
            </p>
          )}
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={onPrevLesson}>
              {" "}
              <ChevronLeft size={18} /> Previous{" "}
            </button>{" "}
            <button className="nav-button next" onClick={onNextLesson}>
              {" "}
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandMenuLesson;



