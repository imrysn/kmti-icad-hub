/** * 3D_Interference.tsx * Interference Check lesson */

import React, { useState, useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";

import "../../styles/3D_Modeling/CourseLesson.css";
/* Assets */

import leftClick from "../../assets/3D_Image_File/left_click.png";

import interfCheckIcon from "../../assets/3D_Image_File/interf_check.png";

import interfCommandMenu from "../../assets/3D_Image_File/interf_command_menu.png";

import interferenceResult from "../../assets/3D_Image_File/interference.png";

import listInterfIcon from "../../assets/3D_Image_File/list_all_detected_interf.png";

import listDisplayWindow from "../../assets/3D_Image_File/list_display_window.png";

import interferenceCheckImg from "../../assets/3D_Image_File/interference_check.png";

interface InterferenceLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const InterferenceLesson: React.FC<InterferenceLessonProps> = ({
  onNextLesson,
  onPrevLesson,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);

      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);

      return next;
    });
  };

  const getStepClass = (stepId: string) => {
    return `instruction-step interactive ${completedSteps.has(stepId) ? "completed" : ""}`;
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}
          <AlertCircle size={28} className="lesson-intro-icon" /> INTERFERENCE
          CHECK
        </h3>

        <p className="p-flush">
          Interferences are overlapping areas of 3D entities. These are problems
          that must be fixed on the 3D Modeling.
        </p>

        <div className="instruction-box">
          <div className="image-wrapper-flush">
            <img
              src={interferenceResult}
              alt="Interference Results"
              className="software-screenshot screenshot-small"
            />
          </div>
        </div>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="card-header">
            <h4>Interference Check Tool</h4>
          </div>

          <div className={getStepClass("i1")} onClick={() => toggleStep("i1")}>
            <div className="step-header">
              {" "}
              <span
                className={`step-number ${completedSteps.has("i1") ? "completed" : ""}`}
              >
                {" "}
                {completedSteps.has("i1") ? (
                  <CheckCircle2 size={16} />
                ) : (
                  "1"
                )}{" "}
              </span>{" "}
              <span className="step-label">
                Select{" "}
                <strong className="text-highlight">Interference Check</strong>{" "}
                from the icon menu.
              </span>
            </div>

            <div
              className="step-description" /* sanitized: paddingLeft: '2.5rem' */
            >
              <div className="image-wrapper-flush">
                <img
                  src={interfCommandMenu}
                  alt="Interference Command Menu"
                  className="software-screenshot screenshot-medium"
                />
              </div>
            </div>
          </div>

          <div className={getStepClass("i2")} onClick={() => toggleStep("i2")}>
            <div className="step-header">
              {" "}
              <span
                className={`step-number ${completedSteps.has("i2") ? "completed" : ""}`}
              >
                {" "}
                {completedSteps.has("i2") ? (
                  <CheckCircle2 size={16} />
                ) : (
                  "2"
                )}{" "}
              </span>{" "}
              <span className="step-label">
                On the command menu, unselect{" "}
                <strong className="text-highlight">High-speed detection</strong>
                .
              </span>
            </div>

            <div
              className="step-description" /* sanitized: paddingLeft: '2.5rem' */
            >
              <div className="image-wrapper-flush">
                <img
                  src={interfCheckIcon}
                  alt="Interference Check Icon"
                  className="software-screenshot screenshot-wide"
                />
              </div>
            </div>
          </div>

          <div className={getStepClass("i3")} onClick={() => toggleStep("i3")}>
            <div className="step-header">
              {" "}
              <span
                className={`step-number ${completedSteps.has("i3") ? "completed" : ""}`}
              >
                {" "}
                {completedSteps.has("i3") ? (
                  <CheckCircle2 size={16} />
                ) : (
                  "3"
                )}{" "}
              </span>{" "}
              <span className="step-label">
                Select specific entities to check interferences &gt;{" "}
                <strong className="text-highlight">GO</strong>
                <img
                  src={leftClick}
                  alt="Left click"
                  className="screenshot-click--inline"
                />
              </span>
            </div>

            <div
              className="step-description" /* sanitized: paddingLeft: '2.5rem' */
            >
              <p className="p-flush">
                A dialog box will appear showing the number of detected
                interferences.
              </p>

              <div className="image-wrapper-flush">
                <img
                  src={interferenceCheckImg}
                  alt="Interference Check Dialog"
                  className="software-screenshot screenshot-wide"
                />
              </div>

              <div className="info-box">
                <div className="step-header">
                  {" "}
                  <span className="step-label">
                    <strong>OR</strong> Right-click on the 3D Space to check the
                    entire drawing for interferences.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={getStepClass("i4")} onClick={() => toggleStep("i4")}>
            <div className="step-header">
              {" "}
              <span
                className={`step-number ${completedSteps.has("i4") ? "completed" : ""}`}
              >
                {" "}
                {completedSteps.has("i4") ? (
                  <CheckCircle2 size={16} />
                ) : (
                  "4"
                )}{" "}
              </span>{" "}
              <span className="step-label">
                Analyze possible countermeasures to remove the interference on
                the parts. To remove the red CGS solid, use Undo or Ctrl+Z
              </span>
            </div>

            <div
              className="step-description" /* sanitized: paddingLeft: '2.5rem' */
            ></div>
          </div>

          <div className="section-divider"></div>

          <p className="p-flush">
            <strong>
              Tool use to display the list of all detected interferences.
            </strong>
          </p>

          <div className="image-wrapper-flush">
            <img
              src={listInterfIcon}
              alt="Display List Tool Icon"
              className="software-screenshot screenshot-small"
            />
          </div>

          <div
            className={getStepClass("li1")}
            onClick={() => toggleStep("li1")}
          >
            <div className="step-header">
              {" "}
              <span
                className={`step-number ${completedSteps.has("li1") ? "completed" : ""}`}
              >
                {" "}
                {completedSteps.has("li1") ? (
                  <CheckCircle2 size={16} />
                ) : (
                  "1"
                )}{" "}
              </span>{" "}
              <span className="step-label">
                Select the list tool on the icon menu &gt;{" "}
                <strong className="text-highlight">GO</strong>
                <img
                  src={leftClick}
                  alt="Left click"
                  className="screenshot-click--inline"
                />
              </span>
            </div>

            <div
              className="step-description" /* sanitized: paddingLeft: '2.5rem' */
            ></div>
          </div>

          <div
            className={getStepClass("li2")}
            onClick={() => toggleStep("li2")}
          >
            <div className="step-header">
              {" "}
              <span
                className={`step-number ${completedSteps.has("li2") ? "completed" : ""}`}
              >
                {" "}
                {completedSteps.has("li2") ? (
                  <CheckCircle2 size={16} />
                ) : (
                  "2"
                )}{" "}
              </span>{" "}
              <span className="step-label">
                The List Display window will appear showing all interfering
                parts.
              </span>
            </div>

            <div
              className="step-description" /* sanitized: paddingLeft: '2.5rem' */
            >
              <div className="image-wrapper-flush">
                <img
                  src={listDisplayWindow}
                  alt="List Display Window"
                  className="software-screenshot screenshot-wide"
                />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>{" "}
            <button className="nav-button next" onClick={onNextLesson}>
              Next Lesson <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterferenceLesson;
