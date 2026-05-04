import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Line Properties (1) */
import lineProp1Img from "../../assets/2D_Image_File/2D_line_properties_(1).png";

/* Importing assets for Line Properties (2) */
import lineProp2Img from "../../assets/2D_Image_File/2D_line_properties_(2)_6_changing_line_color.png";

/* Importing assets for Line Properties (3) */
import lineProp3Img from "../../assets/2D_Image_File/2D_line_properties_(3)_b_center_line_3.png";

/* Importing assets for Line Properties (4) */
import lineProp4Img from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_1.png";

interface LinePropertiesLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const LinePropertiesLesson: React.FC<LinePropertiesLessonProps> = ({
  subLessonId = "2d-line-props-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex } = useLessonCore(subLessonId);

  const lineProp1Steps = [
    "Line Standards: Review the technical table for line color and thickness. Each color corresponds to a specific line weight used in the standard KEMCO template."
  ];

  const lineProp2Steps = [
    "External and Hidden Lines: Visible edges use thick lines (White), while hidden features use dashed thin lines (Yellow). Ensure your drawing clearly distinguishes these for fabrication."
  ];

  const lineProp3Steps = [
    "Center Lines and Dimensions: Center lines use long-short dash patterns (Red). Dimensions and technical notes are typically assigned to specific layers with uniform thickness."
  ];

  const lineProp4Steps = [
    "Verification: Use the line properties command to audit your entities. All lines must match the established standards before the drawing is submitted for approval."
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          LINE PROPERTIES
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "LINE PROPERTIES";
            const introSubtitle = "Technical standards for line colors, types, and thicknesses in 2D drafting.";
            const currentSteps = subLessonId === "2d-line-props-1" ? lineProp1Steps :
                                subLessonId === "2d-line-props-2" ? lineProp2Steps :
                                subLessonId === "2d-line-props-3" ? lineProp3Steps : lineProp4Steps;
            speak([introTitle, introSubtitle, ...currentSteps]);
          }}
            onStop={stop}
          />
        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
          Technical standards for line colors, types, and thicknesses in 2D drafting.
        </p>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {subLessonId === "2d-line-props-1" ? (
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="lesson-table-container">
                  <table className="lesson-table">
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>Thickness</th>
                        <th>Type</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>White</td><td>0.35mm</td><td>Solid</td><td>External lines, visible edges</td></tr>
                      <tr><td>Yellow</td><td>0.18mm</td><td>Dashed</td><td>Hidden lines</td></tr>
                      <tr><td>Red</td><td>0.18mm</td><td>Dash-Dot</td><td>Center lines, symmetry</td></tr>
                    </tbody>
                  </table>
                </div>
                <img src={lineProp1Img} alt="Line Properties Overview" className="software-screenshot screenshot-wide" style={{ marginTop: "1rem" }} />
              </div>
            ) : subLessonId === "2d-line-props-2" ? (
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <img src={lineProp2Img} alt="External and Hidden Lines" className="software-screenshot screenshot-wide" />
              </div>
            ) : subLessonId === "2d-line-props-3" ? (
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <img src={lineProp3Img} alt="Center Lines and Dimensions" className="software-screenshot screenshot-wide" />
              </div>
            ) : subLessonId === "2d-line-props-4" ? (
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <img src={lineProp4Img} alt="Line Property Verification" className="software-screenshot screenshot-wide" />
              </div>
            ) : null}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinePropertiesLesson;
