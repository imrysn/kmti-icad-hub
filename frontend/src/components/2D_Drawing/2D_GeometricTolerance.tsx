import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight, MoveDown } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Geometric Tolerance (1) */

import geoTolMainImg from "../../assets/2D_Image_File/2D_geometric_tolerance(1).png";

import geoTolStepAImg from "../../assets/2D_Image_File/2D_geometric_tolerance(1)_1.png";

import geoTolStepBImg from "../../assets/2D_Image_File/2D_geometric_tolerance(1)_2.png";

import geoTolStepCImg from "../../assets/2D_Image_File/2D_geometric_tolerance(1)_3.png";
/* Importing assets for Geometric Tolerance (2) */

import geoTolStepDImg from "../../assets/2D_Image_File/2D_geometric_tolerance(2)_4.png";

import geoTolStepEImg from "../../assets/2D_Image_File/2D_geometric_tolerance(2)_5.png";

import geoTolStepFImg from "../../assets/2D_Image_File/2D_geometric_tolerance(2)_6.png";

import datumSelectionImg from "../../assets/2D_Image_File/D_geometric_tolerance(2)_datum_1.png";

import datumOperationImg from "../../assets/2D_Image_File/2D_geometric_tolerance(2)_datum_2.png";

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
          Geometric
          Tolerance
          {subLessonId === "2d-geometric-tol-1" ? "(1)" : "(2)"}
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
                <h4>
                  {" "}
                  9. Geometric Tolerance{" "}
                  <span>
                    - a system for defining allowable enoineerino tolerances. It
                    tells what deoree of accuracv and precision that needs to be
                    applied on the part.
                  </span>{" "}
                </h4>
              </div>{" "}
              {/* Top Images Row */}
              <div className="flex-row-center">
                <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                  <img src={geoTolMainImg} alt="Geometric Tolerance Sample Drawing and Menu Selection" className="software-screenshot" />
                </div>

                <div className="image-wrapper-flush">
                  <img src={geoTolStepAImg} alt="Picking line for Geometric Tolerance (P1)" className="software-screenshot screenshot-wide" />
                </div>
              </div>{" "}
              {/* Step B Section */}
              <div className="flex-row">
                <div className="info-box">
                  <p>
                    {" "}
                    <strong>
                      b. "Geometric Tolerance" dialog box appear. Complete the
                      required details then click "OK".
                    </strong>
                  </p>
                </div>

                <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                  <img src={geoTolStepBImg} alt="Geometric Tolerance Dialog Box Configuration" className="software-screenshot screenshot-wide" />
                </div>
              </div>{" "}
              {/* Step C Section */}
              <div className="flex-row">
                <div className="info-box">
                  <p>
                    {" "}
                    <strong>
                      c. Click P2 to set the position of geometric tolerance
                      then "GO" to end the command.
                    </strong>
                  </p>
                </div>

                <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                  <img src={geoTolStepCImg} alt="Setting Geometric Tolerance Position (P2)" className="software-screenshot" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-col">
              {" "}
              {/* Step D */}
              <div className="flex-row">
                <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                  <img src={geoTolStepDImg} alt="Adding geometric tolerance (P3)" className="software-screenshot screenshot-wide" />
                </div>
              </div>{" "}
              {/* Step E */}
              <div className="flex-row">
                <div className="info-box">
                  <p>
                    {" "}
                    <strong>
                      e. "Geometric Tolerance" dialog box appear. Complete the
                      required details, then click "OK".
                    </strong>
                  </p>
                </div>

                <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                  <img src={geoTolStepEImg} alt="Geometric Tolerance Dialog - Perpendicular" className="software-screenshot" />
                </div>
              </div>{" "}
              {/* Step F */}
              <div className="flex-row">
                <div className="info-box">
                  <p>
                    {" "}
                    <strong>
                      f. Required geometric tolerance based on the sample
                      drawing.
                    </strong>
                  </p>
                </div>

                <div className="image-wrapper-flush">
                  <img src={geoTolStepFImg} alt="Resulting Control Frame" className="software-screenshot" />
                </div>
              </div>
              <div className="section-divider"></div>
              {/* Section 10: Datum */}
              <div>
                {" "}
                <h4>
                  {" "}
                  10. Datum{" "}
                  <span>
                    - Datum is a fixed reference point by which other machining
                    operations can be carried out.
                  </span>{" "}
                </h4>
                <div className="flex-row">
                  <div className="image-wrapper-flush">
                    <img src={datumSelectionImg} alt="Datum Selection Menu" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="info-box">
                    <p>
                      {" "}
                      1. Apply the selected commands shown above.
                      <br /> 2. Click L1, then enter datum character in item
                      entry box.
                      <br /> 3. Click P2 to position the datum, then "GO" to end
                      the command.
                    </p>
                  </div>

                  <div className="image-wrapper-flush" /* sanitized: flex: 1 */>
                    <img src={datumOperationImg} alt="Datum Placement Procedure" className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */ />
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



