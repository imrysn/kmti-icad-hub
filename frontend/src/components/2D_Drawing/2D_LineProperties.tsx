import React, { useState, useEffect, useRef } from "react";

import { ArrowRight, ChevronLeft, ChevronRight, Layout, MousePointer2, } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

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
                      <div className="image-wrapper-flush">
                        <img src={linePropertiesImg} alt="Line Properties Interface and Notes" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>
                  </div>

                  <div className="image-wrapper-flush">
                    <img src={linePropertiesTableImg} alt="Uniform Line Specifications" className="software-screenshot" />
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
                      <div>
                        <img src={colorDialogImg} alt="Color Dialog" className="software-screenshot" />
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
                          <img src={colorComparisonImg} alt="Color Comparison" className="software-screenshot screenshot-wide" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
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
                      <div>
                        <img src={splineMenuImg} alt="Spline Menu Navigation" className="software-screenshot screenshot-wide" />
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
                          <img src={splineControlImg} alt="Spline Control" className="software-screenshot screenshot-wide" />
                        </div>
                      </div>
                    </div>

                    <div className="info-box">
                      <p className="p-flush">
                        Spline is used to replace lines when partial section is
                        done on the drawing.
                      </p>

                      <div className="image-wrapper-flush" /* sanitized: marginTop: '1.5rem' */>
                        <img src={splineResultImg} alt="Spline Result" className="software-screenshot screenshot-wide" />
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
                      <div>
                        <img src={splineMenuImg} alt="Center Line Menu" className="software-screenshot screenshot-wide" />
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

                          <img src={centerLineOffsetControlImg} alt="Offset Control" className="software-screenshot screenshot-medium" />
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
                      <img src={centerLineL1L2Img} alt="L1 L2 Center Line Process" className="software-screenshot screenshot-wide" />
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
                        <img src={holeOffsetDialogImg} alt="Hole Offset Dialog" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider-sm"></div>{" "}
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
                      <img src={pipingDialogImg} alt="Piping Center Line Dialog" className="software-screenshot screenshot-small" />

                      <div className="info-box">
                        <p className="p-flush">
                          Upon inserting the orthographic view, the piping
                          center line is already checked. It can be unchecked if
                          the center line is unnecessary.
                        </p>
                      </div>
                    </div>

                    <div className="image-wrapper-flush">
                      <img src={pipingComparisonImg} alt="Piping Center Line Comparison" className="software-screenshot screenshot-medium" />
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
                        <div className="image-wrapper-flush">
                          <img src={hierarchicalPartsImg} alt="Hierarchical Parts Selection" className="software-screenshot screenshot-wide" />
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

                        <img src={hierarchicalDialogImg} alt="Hierarchical Parts Selection Detail" className="software-screenshot screenshot-medium" />
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
                        <img src={hierarchicalResultsImg} alt="Hierarchical Results and Icons" className="software-screenshot screenshot-wide" />
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

export default LinePropertiesLesson;



