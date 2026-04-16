import React, { useState, useEffect, useRef } from "react";

import { ArrowRight, ChevronLeft, ChevronRight, Layout, MousePointer2, } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Line Properties (1) */

import linePropertiesImg from "../../assets/2D_Image_File/2D_line_properties_(1).png";
/* Section 5 UI/Notes */

/* Section 5 Table */
/* Importing assets for Line Properties (2) */

import colorDialogImg from "../../assets/2D_Image_File/2D_line_properties_(2)_6_changing_line_color.png";
/* Section 6 - Dialog */

import splineMenuImg from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline1.png";
/* Section 7 - Menu */

import splineMenuImg1 from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline.png";
/* Section 7 - Menu */


import splineResultImg from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline_spline.png";
/* Section 7 - Result */
/* Importing assets for Line Properties (3) */


import pipingDialogImg from "../../assets/2D_Image_File/2D_line_properties_(3)_c_piping_center_line_1.png";


/* Importing assets for Line Properties (4) */

import hierarchicalPartsImg from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_1.png";

import hierarchicalResultsImg from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_3.png";

interface LinePropertiesLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const LinePropertiesLesson: React.FC<LinePropertiesLessonProps> = ({
  subLessonId = "2d-line-props-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {


  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking, currentIndex } = useTTS();

  const lineProp1Steps = [
    "Line Specifications: KEMCO uses uniform specifications for line types and weights. Review the properties table to ensure your drafting meets these standard requirements."
  ];

  const lineProp2Steps = [
    "Changing Colors: Select the required color from the dialog, then pick the lines you wish to change. Remember that green is the standard for hidden lines, and avoiding deletions prevents unexpected reappearances on drawing updates.",
    "Splines: Use the spline command for complex curves, often replacing lines in partial sections. Adjust the number of waves and curve distance in the item entry box as needed."
  ];

  const lineProp3Steps = [
    "Center Lines: While often automatic for machine holes, you can manually add center lines. Set the offset value, then click Line 1 and Line 2; the center is always calculated from Line 1.",
    "Piping Center Lines: For piping assembly drawings, ensure the center line option is checked in the orthographic view insertion properties."
  ];

  const lineProp4Steps = [
    "Hierarchical Representation: Change the line properties of specific parts within an assembly context. Select the parts from the list and apply the desired hierarchical attributes."
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
    <div className="course-lesson-container line-properties-lesson" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}

          {subLessonId === "2d-line-props-1"
            ? "LINE PROPERTIES (1)"
            : "LINE PROPERTIES"}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (subLessonId === "2d-line-props-1") speak(lineProp1Steps);
            else if (subLessonId === "2d-line-props-2") speak(lineProp2Steps);
            else if (subLessonId === "2d-line-props-3") speak(lineProp3Steps);
            else if (subLessonId === "2d-line-props-4") speak(lineProp4Steps);
          }}
            onStop={stop}
          />
        </h3>

        <p className="p-flush">
          Learn how to manage line colors, weights, and types standard for 2D
          drafting.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-line-props-1" ? (
            <>
              {" "}
              {/* Section 5: Line Properties */}
              <div className={`${getStepClass("lp1-5")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">

                    5
                  </span>{" "}
                  <span className="step-label">Line Properties</span>
                </div>

                <div className="step-description">
                  <div className="flex-row--top">
                    <div className="flex-1">
                      <div style={{ marginTop: "1rem" }}>
                        <img src={linePropertiesImg} alt="Line Properties Interface and Notes" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>
                  </div>

                  <div className="lesson-table-container">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          <th>Application</th>
                          <th>Line Type</th>
                          <th>Line Weight</th>
                          <th>Thickness</th>
                          <th>Color</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Actual Line</td>
                          <td>Continuous Line</td>
                          <td>Thick</td>
                          <td>0.4mm</td>
                          <td>White (1)</td>
                        </tr>
                        <tr>
                          <td>Hidden Line</td>
                          <td>Broken Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Green (3)</td>
                        </tr>
                        <tr>
                          <td>Center Line</td>
                          <td>Single Dot</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Cyan (7)</td>
                        </tr>
                        <tr>
                          <td>Phantom Line</td>
                          <td>Double Dot Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Green (3)</td>
                        </tr>
                        <tr>
                          <td>Arrow / Machine Flow</td>
                          <td>Continuous Line</td>
                          <td>Thick</td>
                          <td>0.4mm</td>
                          <td>White (1)</td>
                        </tr>
                        <tr>
                          <td>Welding Hatch</td>
                          <td>Continuous Line</td>
                          <td>Middle</td>
                          <td>0.2mm</td>
                          <td>Pink (6)</td>
                        </tr>
                        <tr>
                          <td>Scribe Line</td>
                          <td>Continuous Line</td>
                          <td>Thick</td>
                          <td>0.4mm</td>
                          <td>White (1)</td>
                        </tr>
                        <tr>
                          <td>Floor Level</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Green (3)</td>
                        </tr>
                        <tr>
                          <td>Spline / Cutting Line</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Green (3)</td>
                        </tr>
                        <tr>
                          <td>Additional Information / Table</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Green (3)</td>
                        </tr>
                        <tr>
                          <td>Detail View Indicator</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Green (3)</td>
                        </tr>
                        <tr>
                          <td>Text / Letter</td>
                          <td>=</td>
                          <td>Thin</td>
                          <td>0.15mm</td>
                          <td>Yellow (4)</td>
                        </tr>
                        <tr>
                          <td>Machining Symbol</td>
                          <td>=</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Red (2)</td>
                        </tr>
                        <tr>
                          <td>Revised Old Data / Dimension</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Red (2)</td>
                        </tr>
                        <tr>
                          <td>Cutted part (Hatch)</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Red (2)</td>
                        </tr>
                        <tr>
                          <td>Revision Cloud</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Red (2)</td>
                        </tr>
                        <tr>
                          <td>Pipe Reference Drawing</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Green (3)</td>
                        </tr>
                        <tr>
                          <td>Pipe End Reference Line</td>
                          <td>Continuous Line</td>
                          <td>Thin</td>
                          <td>0.2mm</td>
                          <td>Green (3)</td>
                        </tr>
                        <tr>
                          <td>Scale Line</td>
                          <td>Continuous Line</td>
                          <td>Middle</td>
                          <td>0.1mm</td>
                          <td>SkinColor (15)</td>
                        </tr>
                        <tr>
                          <td>Surface Treatment / Condition</td>
                          <td>Single Dot Line</td>
                          <td>Middle</td>
                          <td>0.2mm</td>
                          <td>SkinColor (15)</td>
                        </tr>
                        <tr>
                          <td>Surface Without Welding Appearance</td>
                          <td>Single Dot Line</td>
                          <td>Middle</td>
                          <td>0.2mm</td>
                          <td>SkinColor (15)</td>
                        </tr>
                        <tr>
                          <td>Same Level</td>
                          <td>Single Dot Line</td>
                          <td>Thin</td>
                          <td>0.1mm</td>
                          <td>Cyan (7)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-line-props-2" ? (
            <>
              {" "}
              {/* Section 6: Changing line properties */}
              <div className={`${getStepClass("lp2-6")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">

                    6
                  </span>{" "}
                  <span className="step-label">Changing line properties</span>
                </div>

                <p className="p-flush">
                  <strong>* Changing Color</strong>
                </p>

                <div className="step-description">
                  <div className="flex-col">
                    <div className="flex-row--top">
                      <div style={{ marginBottom: "-2rem" }}>
                        <img src={colorDialogImg} alt="Color Dialog" className="software-screenshot" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/* Section 7: Additional Lines */}
              <div className={`${getStepClass("lp2-7")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">

                    7
                  </span>{" "}
                  <span className="step-label">Additional Lines</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <p className="p-flush">
                      <strong>a. Spline</strong>
                    </p>

                    <div className="flex-row--top">
                      <div style={{ marginBottom: "2rem" }}>
                        <img src={splineMenuImg} alt="Spline Menu Navigation" className="software-screenshot screenshot-wide" />
                      </div>

                      <div className="flex-1">

                      </div>
                    </div>

                    <div>
                      <p>
                        Spline is used to replace lines when partial section is
                        done on the drawing.
                      </p>
                    </div>
                    <div>
                      <img src={splineResultImg} alt="Spline Result" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-line-props-3" ? (
            <>
              {" "}
              {/* Section b: Center Line */}
              <div className={`${getStepClass("lp3-b")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">

                    b
                  </span>{" "}
                  <span className="step-label">Center Line</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <p className="p-flush">
                      Automatically shown for the holes from machine tools.
                      Aside from that, if additional center lines is necessary,
                      it can be put manually.
                    </p>

                    <div className="flex-row--top">
                      <div className="image-overlay-container" style={{ position: "relative" }}>
                        <img src={splineMenuImg1} alt="Center Line Menu" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>

                    <div className="info-box" style={{
                      position: "absolute",
                      top: "53.5rem",
                      right: "45px",
                      width: "430px",
                      height: "170px",
                      zIndex: 1,
                      boxShadow: "var(--shadow-lg)"
                    }}>
                      <p className="p-flush red-text">
                        <strong>Note:</strong> Be careful when choosing which line will be picked first because the center line is always base on L1. <br />
                        The standard properties for centerline are already applied of this command is used.
                      </p>
                    </div>
                  </div>
                </div>
              </div>



              {/* Section c: Piping Center Line */}
              <div className={`${getStepClass("lp3-c")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">

                    c
                  </span>{" "}
                  <span className="step-label">Piping Center Line</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <p className="p-flush">
                      {" "}
                      sets center line for piping drawings. This is applicable
                      mostly for OF Piping Assembly.
                    </p>

                    <div className="flex-row--top">
                      <img src={pipingDialogImg} alt="Piping Center Line Dialog" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-line-props-4" ? (
            <>
              {" "}
              {/* Section d: Change the representation of parts hierarchically */}
              <div className={`${getStepClass("lp4-d")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">

                    d
                  </span>{" "}
                  <span className="step-label">
                    Change the representation of parts hierarchically
                  </span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <p className="p-flush">
                      This is use to change the Line properties of certain parts
                      depends on the detail. This is very useful during
                      detailing of assembly but can also use in parts detail.
                    </p>

                    <div className="flex-row--top">
                      <div className="flex-1">
                        <div style={{ marginBottom: "2rem" }}>
                          <img src={hierarchicalPartsImg} alt="Hierarchical Parts Selection" className="software-screenshot screenshot-wide" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <img src={hierarchicalResultsImg} alt="Hierarchical Results and Icons" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>


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
    </div >
  );
};

export default LinePropertiesLesson;



