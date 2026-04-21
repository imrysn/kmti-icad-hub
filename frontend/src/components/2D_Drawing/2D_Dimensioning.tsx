import React, { useState, useEffect, useRef } from "react";

import { ArrowRight, ArrowBigRight, ChevronLeft, ChevronRight, } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Dimensioning (1) */

import diimensioningImg from "../../assets/2D_Image_File/2D_dimensioning(1)_diimensioning.png";

import standardDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.1_standard_dimension.png";

import seriesDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.2_series_dimension.png";

/* Importing assets for Dimensioning (2) */

import editDimDrawingImg from "../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac.png";

import toleranceImg from "../../assets/2D_Image_File/2D_dimensioning_tolerance.png";

import chamferRadiusImg from "../../assets/2D_Image_File/2D_dimensioning_chamfer_radius.png";
/* Importing assets for Dimensioning (3) */

import polishedMaterialImg from "../../assets/2D_Image_File/2D_dimensioning_b.2_polished_material.png";

import partNoteMenuImg from "../../assets/2D_Image_File/2D_dimensioning(3)_part_note.png";

/* Importing assets for Dimensioning (4) */

import changePosition1Img from "../../assets/2D_Image_File/2D_dimensioning(4)_b.4_change_position_1 (1).png";

/* Importing assets for Dimensioning (5) */

import breakViewWorkflowImg from "../../assets/2D_Image_File/2D_dimensioning(5)_c_dimensions_for_breakviews_1.png";

interface DimensioningLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const DimensioningLesson: React.FC<DimensioningLessonProps> = ({
  subLessonId,
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking, currentIndex } = useTTS();

  const dim1Steps = [
    "Standard Dimension: This is the basic command for adding dimensions one by one. Select Line 1 and Line 2, then drag to the desired location.",
    "Series Dimension: Use this for continuous linear dimensions. Select multiple lines in sequence, then click GO to place the aligned chain."
  ];

  const dim2Steps = [
    "Edit Characters: To add symbols like the diameter mark, select the edit characters command, click the dimension, and choose the symbol from the Mark dropdown.",
    "Tolerance: If fitting tolerance is required, use the convert tool to display the appropriate JIC standard values.",
    "Chamfer and Radius: These marks are generated automatically if your 3D model features were created correctly, so manual input is usually unnecessary."
  ];

  const dim3Steps = [
    "Polished Material: Grinded materials like S45C-D and SS400-D have specific tolerance levels (like h9 or h7) and surface roughness requirements based on the grinding process.",
    "Part Note: Use this tool for automatic hole detailing and quantity callouts. Select the command and click the features to place the leader notes."
  ];

  const dim4Steps = [
    "Arrange Spacing: Ensure dimensions have enough space between them. Use the change position command, click the dimension, and pick its new location.",
    "Align Dimensions: For professional drawings, align dimensions across different views. Select multiple dimensions and move them parallelly to match a reference point."
  ];

  const dim5Steps = [
    "Break Views: For long parts like shafts, use break views to fit the drawing on the template while maintaining scale for details. Remember to underline fake length dimensions.",
    "Isometric Break: You can also apply break views to isometric representations. Use reference lines to maintain the correct cutting angle."
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



  const getStepClass = (stepId: string) => "instruction-step";
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
          Dimensioning (
          {subLessonId?.split("-").pop() || "1"})
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (subLessonId === "2d-dimensioning-1") speak(dim1Steps);
            else if (subLessonId === "2d-dimensioning-2") speak(dim2Steps);
            else if (subLessonId === "2d-dimensioning-3") speak(dim3Steps);
            else if (subLessonId === "2d-dimensioning-4") speak(dim4Steps);
            else if (subLessonId === "2d-dimensioning-5") speak(dim5Steps);
          }}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          Mastering precision annotation and automatic dimensioning tools.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card main-dimensioning-card">
          {" "}
          {subLessonId === "2d-dimensioning-1" ? (
            <>
              {" "}
              {/* 8. Dimensioning Overview */}
              <div className="flex-col">
                <div className="step-header">
                  <span className="step-number">8.</span>
                  <span className="step-label">Dimensioning</span>
                </div>

                <div>
                  <img src={diimensioningImg} alt="Dimensioning Comparison" className="software-screenshot screenshot-wide" />
                </div>

                <div className="info-box" style={{ marginBottom: "-2rem" }}>
                  <p className="p-flush">
                    Put all the dimensions, symbols, and notes required in the
                    drawing.
                  </p>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* Section a: Adding dimensions */}
              <div className="step-header">
                <span className="step-number">a.</span>
                <span className="step-label">Adding dimensions</span>
              </div>
              {/* a.1) Standard dimension */}
              <div className={`${getStepClass("dim1-a1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header" style={{ marginTop: "-3rem" }}>
                  {" "}
                  <span className="step-number" style={{ marginLeft: "3rem" }}>
                    a.1
                  </span>{" "}
                  <span className="step-label">Standard Dimension</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <div style={{ marginBottom: "-2rem" }}>
                      <img src={standardDimMenuImg} alt="Tolerance Settings" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${getStepClass("dim2-chamfer")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  {" "}
                  <span className="step-number">

                    a.2
                  </span>{" "}
                  <span className="step-label">Series Dimension</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <div>
                      <img src={seriesDimMenuImg} alt="Chamfer and Radius" className="software-screenshot screenshot-wide" />
                    </div>


                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-dimensioning-2" ? (
            <div className="flex-col">
              <div className="step-header">
                <span className="step-number">b.</span>
                <span className="step-label">Editing Dimension</span>
              </div>

              {/* b.1 Edit Dimension Characters */}
              <div className={currentIndex === 0 ? "reading-active-container" : ""}>
                <div className="step-header">
                  <span className="step-number" style={{ marginLeft: "3rem" }}>b.1</span>
                  <span className="step-label">Edit Dimension Characters</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <img src={editDimDrawingImg} alt="Edit Dimension Composite Guide" className="software-screenshot screenshot-wide" />

                    {currentIndex === 0 && (
                      <div className="instruction-step reading-active">
                        <p>
                          Select the command setup for changing character dimension then click the dimension you need to edit.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              {/* b.2 Tolerance */}
              <div className={currentIndex === 1 ? "reading-active-container" : ""}>
                <div className="step-header">
                  <span className="step-label">Tolerance</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <img src={toleranceImg} alt="Tolerance Composite Guide" className="software-screenshot screenshot-wide" />

                    {currentIndex === 1 && (
                      <div className="instruction-step reading-active">
                        <p>
                          If fitting tolerance is required, click "convert" to show the equivalent value of fitting tolerance.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              {/* b.3 Chamfer / Radius */}
              <div className={currentIndex === 2 ? "reading-active-container" : ""}>
                <div className="step-header">
                  <span className="step-label">Chamfer / Radius</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <img src={chamferRadiusImg} alt="Chamfer and Radius Marks" className="software-screenshot screenshot-wide" />

                    {currentIndex === 2 && (
                      <div className="instruction-step reading-active">
                        <p>
                          Chamfer and Radius marks do not need to be manually input. They will appear automatically if done correctly in the 3D model.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-dimensioning-3" ? (
            <>
              {" "}
              {/* b.2) Polished Material */}
              <div className="step-header">
                <span className="step-number">b.2</span>
                <span className="step-label">Polished Material</span>
              </div>
              <div className="step-description">
                <div className="flex-col">
                  <div className="flex-row--top">
                    <div>
                      <img src={polishedMaterialImg} alt="Polished Material Dialog" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>{" "}
                  {/* Tolerance Table */}
                  <div className="lesson-table-container">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Details</th>
                          <th>Tolerance Level JIC B 0401</th>
                          <th>Surface Roughness Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>S45C-D</td>
                          <td>
                            S45C materials which are grinded. These diameter
                            dimensions are assured by processing of drawing
                          </td>
                          <td>h9</td>
                          <td>over 3.2a / over 12.5S</td>
                        </tr>
                        <tr>
                          <td>S45C-CG</td>
                          <td>
                            S45C materials which are grinded. These diameter
                            dimensions are assured by processing of centerless
                            grinding machine
                          </td>
                          <td>h7</td>
                          <td>over 3.2a / over 12.5S</td>
                        </tr>
                        <tr>
                          <td>SS400-D</td>
                          <td>
                            SS400 materials which are grinded. These diameter
                            dimensions are assured by processing of drawing
                          </td>
                          <td>h9</td>
                          <td>over 3.2a / over 12.5S</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>
              {/* 11. Part note */}
              <div className="step-header">
                <span className="step-number">11.</span>
                <span className="step-label">Part note</span>
              </div>
              <div className={currentIndex === 1 ? "reading-active" : ""}>
                <div className="flex-col">
                  <div className="flex-row--top">
                    <div>
                      <img src={partNoteMenuImg} alt="Part Note Menu" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : subLessonId === "2d-dimensioning-4" ? (
            <>
              {" "}
              {/* b.4) Change Position Overview */}
              <div className="step-header">
                <span className="step-number">b.4</span>
                <span className="step-label">Change Position</span>
              </div>
              <div className="flex-row--top">
                <div className="image-overlay-container" style={{ position: "relative" }}>
                  <img src={changePosition1Img} alt="Change Position Overview" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              <div className="info-box" style={{
                position: "absolute",
                top: "76rem",
                right: "2rem",
                width: "340px",
                margin: "0",
                zIndex: "10",
                boxShadow: "var(--shadow-lg)"
              }}>
                <p className="p-flush red-text"><strong>NOTE:</strong></p>  <p>Either of these commands can be use to align
                  dimensions.</p>
              </div>


            </>
          ) : subLessonId === "2d-dimensioning-5" ? (
            <>
              {" "}
              {/* c.) Dimension for Breakviews */}
              <div className="step-header">
                <span className="step-number">c.</span>
                <span className="step-label">Dimension for Breakviews</span>
              </div>
              <div className="flex-row--top">
                <div style={{ marginTop: "-1rem" }}>
                  <p className="p-flush">
                    {" "}
                    There are parts that are too long for the template, which,
                    if scaled too high to fit, become too small for the details,
                    and when used with a larger template, seem unnecessary for
                    minimal details. This is applicable for shafts, covers and
                    other parts that are long.
                  </p>
                </div>
              </div>
              <div className={`flex-col ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div>
                  <img src={breakViewWorkflowImg} alt="Break View Workflow" className="software-screenshot screenshot-wide" />
                </div>
              </div>

            </>
          ) : (
            <p className="placeholder-text">
              Content for
              {subLessonId} is being prepared.
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

export default DimensioningLesson;



