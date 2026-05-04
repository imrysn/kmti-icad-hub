import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

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
  subLessonId = "2d-dimensioning-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(subLessonId);

  const dim1Steps = [
    "Dimensioning Overview: Put all the dimensions, symbols, and notes required in the drawing.",
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

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text="DIMENSIONING"
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "DIMENSIONING";
            const introSubtitle = "Applying technical dimensions and tolerances to 2D drawings using standard commands.";
            const currentSteps = subLessonId === "2d-dimensioning-1" ? dim1Steps :
                                subLessonId === "2d-dimensioning-2" ? dim2Steps :
                                subLessonId === "2d-dimensioning-3" ? dim3Steps :
                                subLessonId === "2d-dimensioning-4" ? dim4Steps : dim5Steps;
            speak([introTitle, introSubtitle, ...currentSteps]);
          }}
            onStop={stop}
          />
        </h3>

        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="Applying technical dimensions and tolerances to 2D drawings using standard commands."
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card main-dimensioning-card">
          {subLessonId === "2d-dimensioning-1" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">8.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Dimensioning"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div>
                  <img src={diimensioningImg} alt="Dimensioning Comparison" className="software-screenshot screenshot-wide" />
                </div>
                <div className="info-box">
                  <KaraokeLessonText
                    className="p-flush"
                    text="Put all the dimensions, symbols, and notes required in the drawing."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">a.1</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Standard Dimension"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div>
                  <img src={standardDimMenuImg} alt="Standard Dimension Menu" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">a.2</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Series Dimension"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div>
                  <img src={seriesDimMenuImg} alt="Series Dimension Menu" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-dimensioning-2" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">b.1</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Edit Dimension Characters"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="flex-col">
                  <img src={editDimDrawingImg} alt="Edit Dimension Guide" className="software-screenshot screenshot-wide" />
                  <div className="info-box" style={{ marginTop: "1rem" }}>
                    <KaraokeLessonText
                      className="p-flush"
                      text="Select the command setup for changing character dimension then click the dimension you need to edit."
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Tolerance"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="flex-col">
                  <img src={toleranceImg} alt="Tolerance Guide" className="software-screenshot screenshot-wide" />
                  <div className="info-box" style={{ marginTop: "1rem" }}>
                    <KaraokeLessonText
                      className="p-flush"
                      text='If fitting tolerance is required, click "convert" to show the equivalent value of fitting tolerance.'
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Chamfer / Radius"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="flex-col">
                  <img src={chamferRadiusImg} alt="Chamfer and Radius Marks" className="software-screenshot screenshot-wide" />
                  <div className="info-box" style={{ marginTop: "1rem" }}>
                    <KaraokeLessonText
                      className="p-flush"
                      text="Chamfer and Radius marks do not need to be manually input. They will appear automatically if done correctly in the 3D model."
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-dimensioning-3" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">b.2</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Polished Material"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="flex-col">
                  <img src={polishedMaterialImg} alt="Polished Material Dialog" className="software-screenshot screenshot-wide" />
                  <div className="lesson-table-container" style={{ marginTop: "1rem" }}>
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
                          <td>S45C materials which are grinded. These diameter dimensions are assured by processing of drawing</td>
                          <td>h9</td>
                          <td>over 3.2a / over 12.5S</td>
                        </tr>
                        <tr>
                          <td>S45C-CG</td>
                          <td>S45C materials which are grinded. These diameter dimensions are assured by processing of centerless grinding machine</td>
                          <td>h7</td>
                          <td>over 3.2a / over 12.5S</td>
                        </tr>
                        <tr>
                          <td>SS400-D</td>
                          <td>SS400 materials which are grinded. These diameter dimensions are assured by processing of drawing</td>
                          <td>h9</td>
                          <td>over 3.2a / over 12.5S</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">11.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Part note"
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div>
                  <img src={partNoteMenuImg} alt="Part Note Menu" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-dimensioning-4" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">b.4</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Change Position"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={changePosition1Img} alt="Change Position Overview" className="software-screenshot screenshot-wide" />
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="info-box">
                  <p className="p-flush red-text"><strong>NOTE:</strong></p>
                  <p>Either of these commands can be used to align dimensions across different views for professional results.</p>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-dimensioning-5" ? (
            <div className="flex-col">
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">c.</span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Dimension for Breakviews"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <KaraokeLessonText
                  className="p-flush"
                  style={{ marginBottom: "1rem" }}
                  text="For long parts that are too long for the template, use break views to maintaining scale for details while fitting on the template."
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
                <img src={breakViewWorkflowImg} alt="Break View Workflow" className="software-screenshot screenshot-wide" />
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="info-box">
                  <KaraokeLessonText
                    className="p-flush"
                    text="You can also apply break views to isometric representations. Use reference lines to maintain the correct cutting angle."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="content-placeholder">
              <p>Lesson content for {subLessonId} is being prepared.</p>
            </div>
          )}

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

export default DimensioningLesson;
