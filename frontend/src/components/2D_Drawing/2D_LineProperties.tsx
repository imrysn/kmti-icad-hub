import React, { useState, useEffect, useRef } from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Layout,
  MousePointer2,
} from "lucide-react";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Line Properties (1) */

import linePropertiesImg from "../../assets/2D_Image_File/2D_line_properties_(1).png";
/* Section 5 UI/Notes */

import linePropertiesTableImg from "../../assets/2D_Image_File/2D_line_properties_(1)_1.png";
/* Section 5 Table */
/* Importing assets for Line Properties (2) */

import colorDialogImg from "../../assets/2D_Image_File/2D_line_properties_(2)_6_changing_line_color.jpg";
/* Section 6 - Dialog */

import colorComparisonImg from "../../assets/2D_Image_File/2D_line_properties_(2)_6_changing_line_color_1.png";
/* Section 6 - Comparison */

import splineMenuImg from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline.png";
/* Section 7 - Menu */

import splineControlImg from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline_wave_and_curve.png";
/* Section 7 - Control */

import splineResultImg from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline_spline.png";
/* Section 7 - Result */
/* Importing assets for Line Properties (3) */

import centerLineOffsetControlImg from "../../assets/2D_Image_File/2D_line_properties_(3)_b_center_line_2.jpg";

import centerLineL1L2Img from "../../assets/2D_Image_File/2D_line_properties_(3)_b_center_line_3.png";

import holeOffsetDialogImg from "../../assets/2D_Image_File/2D_line_properties_(3)_b_center_line_4.png";

import pipingDialogImg from "../../assets/2D_Image_File/2D_line_properties_(3)_c_piping_center_line_1.jpg";

import pipingComparisonImg from "../../assets/2D_Image_File/2D_line_properties_(3)_c_piping_center_line.png";
/* Importing assets for Line Properties (4) */

import hierarchicalPartsImg from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_1.png";

import hierarchicalDialogImg from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_2.jpg";

import hierarchicalResultsImg from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_3.png";

interface LinePropertiesLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const LinePropertiesLesson: React.FC<LinePropertiesLessonProps> = ({
  subLessonId = "2d-line-props-1",
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
  }, [subLessonId]);

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
    <div
      className="course-lesson-container line-properties-lesson"
      ref={containerRef}
    >
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
          <Layout
            size={28}
            strokeWidth={2.5}
            className="lesson-intro-icon"
          />{" "}
          {subLessonId === "2d-line-props-1"
            ? "LINE PROPERTIES (1)"
            : "LINE PROPERTIES"}
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
              <div
                className={getStepClass("lp1-5")}
                onClick={() => toggleStep("lp1-5")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("lp1-5") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("lp1-5") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "5"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">Line Properties</span>
                </div>

                <div className="step-description">
                  <div className="flex-row--top">
                    <div className="flex-1">
                      <div className="image-wrapper-flush">
                        <img
                          src={linePropertiesImg}
                          alt="Line Properties Interface and Notes"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="image-wrapper-flush">
                    <img
                      src={linePropertiesTableImg}
                      alt="Uniform Line Specifications"
                      className="software-screenshot"
                    />
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-line-props-2" ? (
            <>
              {" "}
              {/* Section 6: Changing line properties */}
              <div
                className={getStepClass("lp2-6")}
                onClick={() => toggleStep("lp2-6")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("lp2-6") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("lp2-6") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "6"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">Changing line properties</span>
                </div>

                <p className="p-flush">
                  <strong>* Changing Color</strong>
                </p>

                <div className="step-description">
                  <div className="flex-col">
                    <div className="flex-row--top">
                      <div>
                        <img
                          src={colorDialogImg}
                          alt="Color Dialog"
                          className="software-screenshot"
                        />
                      </div>

                      <div className="flex-col">
                        <div className="flex-row--top">
                          <div className="annotation-pointing-box">
                            <p className="p-flush">
                              Note: Hidden lines are color green.
                            </p>

                            <p className="p-flush">
                              <span>To change color:</span> Select the required
                              color, then pick the lines you need to change.
                            </p>
                          </div>

                          <div className="flex-col">
                            <div className="info-box">
                              <p className="p-flush">
                                * If hidden lines must be shown, it should be
                                checked on Projection Properties.
                              </p>
                            </div>

                            <div className="info-box">
                              <p className="p-flush">
                                NOTE: As possible, avoid deletion of any lines
                                on the drawing, because once the drawing is
                                updated, the deleted lines will appear.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="image-wrapper-flush">
                          <img
                            src={colorComparisonImg}
                            alt="Color Comparison"
                            className="software-screenshot screenshot-wide"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Section 7: Additional Lines */}
              <div
                className={getStepClass("lp2-7")}
                onClick={() => toggleStep("lp2-7")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("lp2-7") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("lp2-7") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "7"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">Additional Lines</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <p className="p-flush">
                      <strong>a. Spline</strong>
                    </p>

                    <div className="flex-row--top">
                      <div>
                        <img
                          src={splineMenuImg}
                          alt="Spline Menu Navigation"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="info-box">
                          <p className="p-flush">
                            Apply all the selected commands shown in the picture
                            to perform the spline
                          </p>
                        </div>

                        <div className="info-box">
                          <p className="p-flush">
                            Number of wave and curve distance displayed in item
                            entry box. It can change according to the desired
                            value.
                          </p>
                        </div>

                        <div className="image-wrapper-flush">
                          <img
                            src={splineControlImg}
                            alt="Spline Control"
                            className="software-screenshot screenshot-wide"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="info-box">
                      <p className="p-flush">
                        Spline is used to replace lines when partial section is
                        done on the drawing.
                      </p>

                      <div
                        className="image-wrapper-flush" /* sanitized: marginTop: '1.5rem' */
                      >
                        <img
                          src={splineResultImg}
                          alt="Spline Result"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-line-props-3" ? (
            <>
              {" "}
              {/* Section b: Center Line */}
              <div
                className={getStepClass("lp3-b")}
                onClick={() => toggleStep("lp3-b")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("lp3-b") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("lp3-b") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "b"
                    )}{" "}
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
                      <div>
                        <img
                          src={splineMenuImg}
                          alt="Center Line Menu"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>

                      <div className="flex-col">
                        <div className="info-box">
                          <p className="p-flush">
                            Apply all the selected command shown in the picture
                            to perform the center line.
                          </p>
                        </div>

                        <div className="flex-col">
                          <div className="info-box">
                            <p className="p-flush">
                              Offset line display in item entry box. It can
                              change according to the desired value.
                            </p>
                          </div>

                          <img
                            src={centerLineOffsetControlImg}
                            alt="Offset Control"
                            className="software-screenshot screenshot-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="info-box">
                      <p className="p-flush">
                        After selecting all the necessary commands and put
                        desired value in item entry box, click L1 and L2.
                      </p>
                    </div>

                    <div className="image-wrapper-flush">
                      <img
                        src={centerLineL1L2Img}
                        alt="L1 L2 Center Line Process"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>

                    <div className="flex-col">
                      <div className="flex-row--top">
                        <div className="info-box">
                          <p className="p-flush">
                            In case of the offset line for the holes from
                            machine tools, it can be set from the projection
                            properties.
                          </p>
                        </div>

                        <div className="info-box">
                          <p className="p-flush">
                            Note: Be careful when choosing which line will be
                            picked first because the center is always base on
                            L1.
                          </p>

                          <p className="p-flush">
                            The standard properties for centerline are already
                            applied if this command is used.
                          </p>
                        </div>
                      </div>

                      <div className="image-wrapper-flush">
                        <img
                          src={holeOffsetDialogImg}
                          alt="Hole Offset Dialog"
                          className="software-screenshot screenshot-large"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider-sm"></div>{" "}
              {/* Section c: Piping Center Line */}
              <div
                className={getStepClass("lp3-c")}
                onClick={() => toggleStep("lp3-c")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("lp3-c") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("lp3-c") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "c"
                    )}{" "}
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
                      <img
                        src={pipingDialogImg}
                        alt="Piping Center Line Dialog"
                        className="software-screenshot screenshot-small"
                      />

                      <div className="info-box">
                        <p className="p-flush">
                          Upon inserting the orthographic view, the piping
                          center line is already checked. It can be unchecked if
                          the center line is unnecessary.
                        </p>
                      </div>
                    </div>

                    <div className="image-wrapper-flush">
                      <img
                        src={pipingComparisonImg}
                        alt="Piping Center Line Comparison"
                        className="software-screenshot screenshot-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-line-props-4" ? (
            <>
              {" "}
              {/* Section d: Change the representation of parts hierarchically */}
              <div
                className={getStepClass("lp4-d")}
                onClick={() => toggleStep("lp4-d")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("lp4-d") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("lp4-d") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "d"
                    )}{" "}
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
                        <div className="image-wrapper-flush">
                          <img
                            src={hierarchicalPartsImg}
                            alt="Hierarchical Parts Selection"
                            className="software-screenshot screenshot-wide"
                          />
                        </div>
                      </div>

                      <div className="flex-col">
                        <div className="info-box">
                          <p className="p-flush">
                            1. Pick the icon. The list of parts will show.
                          </p>
                        </div>

                        <div className="info-box">
                          <p className="p-flush">
                            2. Select on the desired attributes for the parts
                            detail. Select which parts will change the
                            attributes.
                          </p>
                        </div>

                        <img
                          src={hierarchicalDialogImg}
                          alt="Hierarchical Parts Selection Detail"
                          className="software-screenshot screenshot-medium"
                        />
                      </div>
                    </div>

                    <div className="flex-col">
                      <div className="info-box">
                        <p className="p-flush">
                          Aside from using this icon, there are also separate
                          icon that can be use to do the same commands.
                        </p>
                      </div>

                      <div className="image-wrapper-flush">
                        <img
                          src={hierarchicalResultsImg}
                          alt="Hierarchical Results and Icons"
                          className="software-screenshot screenshot-wide"
                        />
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
              Next Lesson <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinePropertiesLesson;
