import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight, MoveDown } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Geometric Tolerance (1) */

import geoTolMainImg from "../../assets/2D_Image_File/2D_geometric_tolerance(1).png";

/* Importing assets for Geometric Tolerance (2) */

import geoTolStepDImg from "../../assets/2D_Image_File/2D_geometric_tolerance(2)_4.png";

import datumSelectionImg from "../../assets/2D_Image_File/D_geometric_tolerance(2)_datum_1.png";


interface GeometricToleranceLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const GeometricToleranceLesson: React.FC<GeometricToleranceLessonProps> = ({
  subLessonId = "2d-geometric-tol-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const geoTol1Steps = [
    "Geometric Tolerance: This system defines the degree of accuracy required for a part. Pick the line, complete the required details in the dialog box, and click OK. Finally, set the position by clicking P2 and click GO to end the command."
  ];

  const geoTol2Steps = [
    "Tolerance Application: Follow the same process to add specific tolerances like perpendicularity. Complete the dialog and place the control frame as needed.",
    "Datum: A datum is a fixed reference point. Select the datum command, click the reference line, and enter the datum character. Click P2 to position the indicator and GO to finish."
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

    return () => currentContainer?.removeEventListener("scroll", handleScroll);
  }, [subLessonId]);

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}
          Geometric Tolerance {subLessonId === "2d-geometric-tol-1" ? "(1)" : "(2)"}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (subLessonId === "2d-geometric-tol-1") speak(geoTol1Steps);
            else speak(geoTol2Steps);
          }}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Principles and procedures for defining allowable engineering
          tolerances to ensure part accuracy and precision.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-geometric-tol-1" ? (
            <div className="flex-col">
              {" "}
              {/* Title and Definition */}
              <div>
                {" "}
                <h4>9. Geometric Tolerance</h4>
                <p className="p-flush" style={{ marginBottom: "0rem" }}>
                  A system for defining allowable engineering tolerances. It
                  tells what degree of accuracy and precision that needs to be
                  applied on the part.
                </p>

              </div>
              {/* Top Images Row */}
              <div className="flex-row-center">
                <div>
                  <img src={geoTolMainImg} alt="Geometric Tolerance Sample Drawing and Menu Selection" className="software-screenshot" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-col">
              <div>
                <div>
                  <img src={geoTolStepDImg} alt="Adding geometric tolerance (P3)" className="software-screenshot screenshot-wide" />
                </div>
              </div>
              {/* Section 10: Datum */}
              <div>
                {" "}
                <h4 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                  {" "}
                  10. Datum{" "}
                </h4>
                <div>
                  <div>
                    <img src={datumSelectionImg} alt="Datum Selection Menu" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
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

export default GeometricToleranceLesson;



