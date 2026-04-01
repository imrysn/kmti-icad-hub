import React, { useState, useEffect, useRef } from "react";

import {
  ArrowRight,
  ArrowBigRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Dimensioning (1) */

import diimensioningImg from "../../assets/2D_Image_File/2D_dimensioning(1)_diimensioning.png";

import standardDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.1_standard_dimension.png";

import standardDimProcessImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.1_standard_dimension_1.jpg";

import seriesDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.2_series_dimension.png";

import seriesDimProcessImg from "../../assets/2D_Image_File/2D_dimensioning(1)_a.2_series_dimension_1.png";
/* Importing assets for Dimensioning (2) */

import editDimDrawingImg from "../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac.jpg";

import editDimMenuImg from "../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac_1.png";

import editDimDialogImg from "../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac_2.png";

import toleranceImg from "../../assets/2D_Image_File/2D_dimensioning_tolerance.png";

import chamferRadiusImg from "../../assets/2D_Image_File/2D_dimensioning_chamfer_radius.png";
/* Importing assets for Dimensioning (3) */

import polishedMaterialImg from "../../assets/2D_Image_File/2D_dimensioning_b.2_polished_material.png";

import partNoteMenuImg from "../../assets/2D_Image_File/2D_dimensioning(3)_part_note.png";

import partNoteP1P2P3Img from "../../assets/2D_Image_File/2D_dimensioning(3)_part_note_p1_p2_p3.png";

import partNoteHoleDetailImg from "../../assets/2D_Image_File/2D_dimensioning(3)_part_note_hole_detail.png";

import partNoteHoleQuantityImg from "../../assets/2D_Image_File/2D_dimensioning(3)_part_note_hole_detail_and_quantity.png";
/* Importing assets for Dimensioning (4) */

import changePosition1Img from "../../assets/2D_Image_File/2D_dimensioning(4)_b.4_change_position_1.png";

import changePosition2Img from "../../assets/2D_Image_File/2D_dimensioning(4)_b.4_change_position_2.png";

import changePosition3Img from "../../assets/2D_Image_File/2D_dimensioning(4)_b.4_change_position_3.jpg";

import changePosition4Img from "../../assets/2D_Image_File/2D_dimensioning(4)_b.4_change_position_4.jpg";

import changePosition4altImg from "../../assets/2D_Image_File/2D_dimensioning(4)_b.4_change_position_4.png";
/* Importing assets for Dimensioning (5) */

import breakViewWorkflowImg from "../../assets/2D_Image_File/2D_dimensioning(5)_c_dimensions_for_breakviews_1.png";

import breakViewDialogImg from "../../assets/2D_Image_File/2D_dimensioning(5)_c_dimensions_for_breakviews_2.jpg";

import breakViewIsoImg from "../../assets/2D_Image_File/2D_dimensioning(5)_c_dimensions_for_breakviews_3.png";

interface DimensioningLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const DimensioningLesson: React.FC<DimensioningLessonProps> = ({
  subLessonId,
  onNextLesson,
  onPrevLesson,
}) => {
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

    return () => currentContainer?.removeEventListener("scroll", handleScroll);
  }, [subLessonId]);

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const [activeStep, setActiveStep] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setActiveStep(activeStep === stepId ? null : stepId);
    setCompletedSteps((prev) => {
      const next = new Set(prev);

      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);

      return next;
    });
  };

  const getStepClass = (stepId: string) =>
    `step-card interactive ${activeStep === stepId ? "active" : ""} ${completedSteps.has(stepId) ? "completed" : ""}`;

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
          <ArrowRight size={28} className="lesson-intro-icon" /> Dimensioning (
          {subLessonId?.split("-").pop() || "1"})
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
                <div className="flex-row--top">
                  {" "}
                  <h4>8. Dimensioning</h4>
                </div>

                <div className="image-wrapper-flush">
                  <img
                    src={diimensioningImg}
                    alt="Dimensioning Comparison"
                    className="software-screenshot screenshot-wide"
                  />
                </div>

                <div className="info-box">
                  <p className="p-flush">
                    Put all the dimensions, symbols, and notes required in the
                    drawing.
                  </p>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* Section a: Adding dimensions */}
              <div className="sub-section-header">
                {" "}
                <h4>a. Adding dimensions</h4>
              </div>{" "}
              {/* a.1) Standard dimension */}
              <div
                className={getStepClass("dim1-a1")}
                onClick={() => toggleStep("dim1-a1")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("dim1-a1") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("dim1-a1") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "a.1"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">Standard dimension</span>
                </div>

                <div className="step-description">
                  <div className="flex-row--top">
                    <div className="flex-col">
                      <img
                        src={standardDimMenuImg}
                        alt="Standard Dimension Menu"
                        className="software-screenshot screenshot-wide"
                      />

                      <div>
                        {" "}
                        <ArrowBigRight
                          size={100}
                          color="red"
                          fill="red"
                          className="process-flow-arrow"
                        />
                      </div>
                    </div>

                    <div className="flex-col">
                      <div className="info-box">
                        <p className="p-flush">
                          Standard dimension is the basic command inputting
                          dimension one by one.
                        </p>
                      </div>

                      <div className="flex-col">
                        <div className="image-wrapper-flush">
                          <img
                            src={standardDimProcessImg}
                            alt="Standard Dimension Process"
                            className="software-screenshot screenshot-wide"
                          />
                        </div>

                        <div className="info-box">
                          <p className="p-flush">
                            Pick Line1 and Line2. Place it to desire location to
                            display actual dimension.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider-sm"></div>{" "}
              {/* a.2) Series dimension */}
              <div
                className={getStepClass("dim1-a2")}
                onClick={() => toggleStep("dim1-a2")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("dim1-a2") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("dim1-a2") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "a.2"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">Series dimension</span>
                </div>

                <div className="step-description">
                  <div className="flex-row--top">
                    <div className="flex-col">
                      <img
                        src={seriesDimMenuImg}
                        alt="Series Dimension Menu"
                        className="software-screenshot screenshot-wide"
                      />

                      <div>
                        {" "}
                        <ArrowBigRight
                          size={100}
                          color="red"
                          fill="red"
                          className="process-flow-arrow"
                        />
                      </div>
                    </div>

                    <div className="flex-col">
                      <div className="info-box">
                        <p className="p-flush">
                          Series dimension displays continuous linear
                          dimensions.
                        </p>
                      </div>

                      <div className="flex-row--top">
                        <div className="info-box">
                          <p className="p-flush">
                            Pick L1, L2, L3 and L4 then 'GO'. Place it to desire
                            location to display continuous linear dimension.
                          </p>
                        </div>

                        <div
                          className="image-wrapper-flush" /* sanitized: flex: 1 */
                        >
                          <img
                            src={seriesDimProcessImg}
                            alt="Series Dimension Process"
                            className="software-screenshot screenshot-wide"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-dimensioning-2" ? (
            <>
              {" "}
              {/* Section b: Editing Dimension */}
              <div className="sub-section-header">
                {" "}
                <h4>b. Editing Dimension</h4>
              </div>{" "}
              {/* b.1) Edit Dimension Characters */}
              <div
                className={getStepClass("dim2-b1")}
                onClick={() => toggleStep("dim2-b1")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("dim2-b1") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("dim2-b1") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "b.1"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">Edit Dimension Characters</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <div className="flex-row--top">
                      <div
                        className="image-wrapper-flush" /* sanitized: flex: 1 */
                      >
                        <img
                          src={editDimDrawingImg}
                          alt="Circular Dimension Required"
                          className="software-screenshot screenshot-large"
                        />
                      </div>

                      <div className="flex-col">
                        <img
                          src={editDimMenuImg}
                          alt="Edit Characters Menu"
                          className="software-screenshot"
                        />

                        <div>
                          {" "}
                          <ArrowBigRight size={60} color="red" fill="red" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-row--top">
                      <div className="info-box">
                        {" "}
                        <ul>
                          {" "}
                          <li>
                            Select the command set up for changing character
                            dimension then click the dimension you need to edit.
                          </li>{" "}
                          <li>
                            Edit dimension characters dialog box display. Under
                            "Mark" drop down option, select "φ" then click OK.
                          </li>{" "}
                        </ul>
                      </div>

                      <div className="image-wrapper-flush">
                        <img
                          src={editDimDialogImg}
                          alt="Edit Dimension Characters Dialog"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>
              {/* Tolerance Section */}
              <div className="sub-section-header">
                {" "}
                <h4>Tolerance</h4>
              </div>
              <div
                className={getStepClass("dim2-tolerance")}
                onClick={() => toggleStep("dim2-tolerance")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("dim2-tolerance") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("dim2-tolerance") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "2"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">Tolerance Fitting</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <div className="image-wrapper-flush">
                      <img
                        src={toleranceImg}
                        alt="Tolerance Settings"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>

                    <div className="info-box">
                      <p className="p-flush">
                        If fitting tolerance is required, click "convert" to
                        show the equivalent value
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* Chamfer / Radius Section */}
              <div className="sub-section-header">
                {" "}
                <h4>Chamfer / Radius</h4>
              </div>
              <div
                className={getStepClass("dim2-chamfer")}
                onClick={() => toggleStep("dim2-chamfer")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("dim2-chamfer") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("dim2-chamfer") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "3"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">Chamfer and Radius Marks</span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <div className="image-wrapper-flush">
                      <img
                        src={chamferRadiusImg}
                        alt="Chamfer and Radius"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>

                    <div className="info-box">
                      <p className="p-flush">
                        Chamfer and Radius marks are no need to manually input.
                        It will appear automatically if done right.
                      </p>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-dimensioning-3" ? (
            <>
              {" "}
              {/* b.2) Polished Material */}
              <div className="sub-section-header">
                {" "}
                <h4>b.2) Polished Material</h4>
              </div>
              <div
                className={getStepClass("dim3-b2")}
                onClick={() => toggleStep("dim3-b2")}
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("dim3-b2") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("dim3-b2") ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : (
                      "b.2"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">
                    Polished Material Fitting Tolerance
                  </span>
                </div>

                <div className="step-description">
                  <div className="flex-col">
                    <div className="flex-row--top">
                      <div
                        className="image-wrapper-flush" /* sanitized: flex: 1.5 */
                      >
                        <img
                          src={polishedMaterialImg}
                          alt="Polished Material Dialog"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>{" "}
                    {/* Tolerance Table */}
                    <div className="table-responsive">
                      {" "}
                      <table>
                        {" "}
                        <thead>
                          {" "}
                          <tr>
                            {" "}
                            <th>Code</th> <th>Details</th>{" "}
                            <th>Tolerance Level JIC B 0401</th>{" "}
                            <th>Surface Roughness Range</th>{" "}
                          </tr>{" "}
                        </thead>{" "}
                        <tbody>
                          {" "}
                          <tr>
                            {" "}
                            <td>S45C-D</td>{" "}
                            <td>
                              S45C materials which are grinded. These diameter
                              dimensions are assured by processing of drawing
                            </td>{" "}
                            <td>h9</td> <td>over 3.2a / over 12.5S</td>{" "}
                          </tr>{" "}
                          <tr>
                            {" "}
                            <td>S45C-CG</td>{" "}
                            <td>
                              S45C materials which are grinded. These diameter
                              dimensions are assured by processing of centerless
                              grinding machine
                            </td>{" "}
                            <td>h7</td> <td>over 3.2a / over 12.5S</td>{" "}
                          </tr>{" "}
                          <tr>
                            {" "}
                            <td>SS400-D</td>{" "}
                            <td>
                              SS400 materials which are grinded. These diameter
                              dimensions are assured by processing of drawing
                            </td>{" "}
                            <td>h9</td> <td>over 3.2a / over 12.5S</td>{" "}
                          </tr>{" "}
                        </tbody>{" "}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>
              {/* 11. Part note */}
              <div className="sub-section-header">
                {" "}
                <h4>11. Part note</h4>
              </div>
              <div>
                <div className="flex-col">
                  <div className="flex-row--top">
                    <div className="image-wrapper-flush">
                      <img
                        src={partNoteMenuImg}
                        alt="Part Note Menu"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>

                    <div className="image-wrapper-flush">
                      <img
                        src={partNoteP1P2P3Img}
                        alt="Part Note Process"
                        className="software-screenshot screenshot-large"
                      />
                    </div>
                  </div>

                  <div className="flex-row--top">
                    <div className="flex-col">
                      <div className="image-wrapper-flush">
                        <img
                          src={partNoteHoleDetailImg}
                          alt="Hole Detail Result"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>

                    <div className="flex-col">
                      <div className="image-wrapper-flush">
                        <img
                          src={partNoteHoleQuantityImg}
                          alt="Hole Quantity Result"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-dimensioning-4" ? (
            <>
              {" "}
              {/* b.4) Change Position Overview */}
              <div className="sub-section-header">
                {" "}
                <h4>b.4) Change Position</h4>
              </div>
              <div className="flex-row--top">
                <div className="image-wrapper-flush" /* sanitized: flex: 1.5 */>
                  <img
                    src={changePosition1Img}
                    alt="Change Position Overview"
                    className="software-screenshot screenshot-wide"
                  />
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* a. Arrange dimensions with enough spaces in between. */}{" "}
              <h4>a. Arrange dimensions with enough spaces in between.</h4>
              <div className="flex-col">
                <div className="flex-row--top">
                  <div className="flex-col">
                    <div className="image-wrapper-flush">
                      <img
                        src={changePosition2Img}
                        alt="Change Position Toolbar"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>

                    <div className="info-box">
                      <p>a. Arrange dimensions with enough spaces in between</p>
                    </div>

                    <div className="info-box">
                      {" "}
                      <ol>
                        {" "}
                        <li>
                          Select the command set up for changing position.
                        </li>{" "}
                        <li>Click the dimension on P1.</li>{" "}
                        <li>Click P2 to relocate the dimension.</li>{" "}
                        <li>
                          Repeat this process until all dimensions have enough
                          spaces in between.
                        </li>{" "}
                      </ol>
                    </div>
                  </div>

                  <div className="image-wrapper-flush">
                    <img
                      src={changePosition3Img}
                      alt="Arranging Dimensions Process"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>
                <div className="section-divider"></div>{" "}
                {/* b. Align dimensions */} <h4>b. Align dimensions</h4>
                <div className="flex-col">
                  <div className="flex-row--top">
                    <div
                      className="image-wrapper-flush" /* sanitized: flex: 1.5 */
                    >
                      <img
                        src={changePosition4Img}
                        alt="Align Dimensions Drawing"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-col">
                  <div className="flex-row--top">
                    <div className="image-wrapper-flush">
                      <img
                        src={changePosition4altImg}
                        alt="Alignment Commands"
                        className="software-screenshot screenshot-wide"
                      />{" "}
                      {/* Absolutely Positioned Overlay Box */}
                      <div className="info-box">
                        {" "}
                        <ol>
                          {" "}
                          <li>
                            Select the command set up for changing position.
                          </li>{" "}
                          <li>
                            Click the dimension P1 or select the dimensions
                            needed to be aligned.
                          </li>{" "}
                          <li>
                            If all desired dimension is selected, then GO.
                          </li>{" "}
                          <li>
                            Selected dimensions move together parallelly. Place
                            it aligned to other dimensions from other view P2.
                          </li>{" "}
                          <li>
                            Repeat this process until dimensions are aligned.
                          </li>{" "}
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="p-flush">
                      NOTE: Either of these commands can be use to align
                      dimensions.
                    </p>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : subLessonId === "2d-dimensioning-5" ? (
            <>
              {" "}
              {/* c.) Dimension for Breakviews */}
              <div className="sub-section-header">
                {" "}
                <h4>c.) Dimension for Breakviews</h4>
                <div className="info-box">
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
              <div className="flex-col">
                <div className="image-wrapper-flush">
                  <img
                    src={breakViewWorkflowImg}
                    alt="Break View Workflow"
                    className="software-screenshot screenshot-wide"
                  />
                </div>
                <div className="flex-row">
                  <div className="info-box">
                    {" "}
                    <ol>
                      {" "}
                      <li>
                        Change the color on the toolbar. Green is used as the
                        standard color for the cutting line. <br />
                        <span>Refer to page 8</span>
                      </li>{" "}
                      <li>Change to the desired scale.</li>{" "}
                      <li>Pick the Break view command.</li>{" "}
                      <li>
                        Pick P1 where desired to start the break line up to P2,
                        then pick P3 where desired length to break and drag P3
                        back to P1 location. There is automatic space between
                        the cutting lines which can be changed.
                      </li>{" "}
                      <li>Add necessary dimensions to the part detail.</li>{" "}
                    </ol>
                  </div>
                </div>
                <div className="section-divider"></div>
                <div className="flex-row--top">
                  <div
                    className="image-wrapper-flush" /* sanitized: flex: 1.5 */
                  >
                    <img
                      src={breakViewDialogImg}
                      alt="Break View Dimension Settings"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>

                  <div className="flex-col">
                    <div className="info-box">
                      <p className="p-flush">
                        Since the part detail was breaked, the dimension for
                        length becomes fake. Apply underline for the fake
                        dimensions.
                      </p>

                      <p className="p-flush">
                        Note: Fake dimensions is only applicable for break view
                        details.
                      </p>
                    </div>{" "}
                    <h4>Break view can also apply to Isometric views.</h4>
                  </div>
                </div>
                <div className="section-divider"></div>{" "}
                {/* Isometric View Sub-section */}
                <div>
                  <div className="flex-row--top">
                    <div className="flex-col">
                      <div className="info-box">
                        {" "}
                        <ol start={5}>
                          {" "}
                          <li>
                            Create line as reference for cutting line because it
                            will be hard to keep the angle for the isometric
                            view.
                          </li>{" "}
                          <li>
                            Follow the same process to the isometric view.
                            Delete the reference lines after.
                          </li>{" "}
                        </ol>
                      </div>
                    </div>

                    <div className="image-wrapper-flush">
                      <img
                        src={breakViewIsoImg}
                        alt="Isometric Break View"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
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
              Next Lesson <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimensioningLesson;
