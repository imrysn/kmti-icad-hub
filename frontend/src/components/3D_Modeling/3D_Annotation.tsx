/** * 3D_Annotation.tsx — Annotation lessons */

import React, { useState, useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Box,
  CheckCircle2,
  Zap,
} from "lucide-react";

import "../../styles/3D_Modeling/CourseLesson.css";

import "../../styles/3D_Modeling/CourseLesson.css";
/* Annotation (1) Assets */

import annotationImg from "../../assets/3D_Image_File/annotation.png";

import linearDimensionImg from "../../assets/3D_Image_File/linear_dimension.png";

import diameterDimensionImg from "../../assets/3D_Image_File/diameter_dimension.png";

import angularDimensionImg from "../../assets/3D_Image_File/angular_dimension.png";

import notesLeaderLinesImg from "../../assets/3D_Image_File/notes_leader_lines.png";

import characterStringsImg from "../../assets/3D_Image_File/character_strings.png";

import leftClick from "../../assets/3D_Image_File/left_click.png";
/* Note Entry Images */

import noteStringEntryImg from "../../assets/3D_Image_File/note_string_entry_window.png";

import textEntryImg from "../../assets/3D_Image_File/text_entry_window.png";
/* Annotation (2) Assets */

import editDimensionImg from "../../assets/3D_Image_File/edit_dimension_characters_window.png";

import changePropertiesWindowImg from "../../assets/3D_Image_File/change_properties_window.png";

import changesDraftingEntityImg from "../../assets/3D_Image_File/annotation(2)_edits_drafting.png";

import changesPositionDraftingEntitiesImg from "../../assets/3D_Image_File/changes_position_drafting_entities.png";

import collectiveDimensionImg from "../../assets/3D_Image_File/annotation(2)_dimension.png";

import annotation2Img from "../../assets/3D_Image_File/angular_dimension1.png";

import changesDraftingEntity2Img from "../../assets/3D_Image_File/annotation11.png";

interface AnnotationLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const AnnotationLesson: React.FC<AnnotationLessonProps> = ({
  subLessonId = "annotation-1",
  onNextLesson,
  onPrevLesson,
}) => {
  const isAnnotation1 = subLessonId === "annotation-1";

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

  const handleNext = () => {
    if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (onPrevLesson) onPrevLesson();
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
          <Box size={28} className="lesson-intro-icon" /> ANNOTATION
        </h3>
        <p>
          Tools use to create drafting entities such as dimension text and
          notes.
        </p>{" "}
        {isAnnotation1 && (
          <div className="instruction-box">
            <div className="image-wrapper-flush">
              <img
                src={isAnnotation1 ? annotationImg : annotation2Img}
                alt={
                  isAnnotation1
                    ? "Annotation Tool Menu"
                    : "Annotation Dimension Result"
                }
                className={
                  isAnnotation1
                    ? "software-screenshot screenshot-small"
                    : "software-screenshot screenshot-medium"
                }
              />
            </div>
          </div>
        )}
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {isAnnotation1 ? (
            <div className="fade-in">
              <div className="flex-row-wrap">
                {" "}
                {/* Left Column */}
                <div className="flex-1">
                  {" "}
                  {/* Item 1 */}
                  <div
                    className={getStepClass("anno1-1")}
                    onClick={() => toggleStep("anno1-1")}
                  >
                    <p className="p-flush">
                      <strong>Creates linear dimension</strong>
                    </p>

                    <div className="image-wrapper-flush">
                      <img
                        src={linearDimensionImg}
                        alt="Linear Dimension"
                        className="software-screenshot screenshot-small"
                      />
                    </div>
                  </div>{" "}
                  {/* Item 2 */}
                  <div
                    className={getStepClass("anno1-2")}
                    onClick={() => toggleStep("anno1-2")}
                  >
                    <div className="step-header">
                      {" "}
                      <span
                        className={`step-number ${completedSteps.has("anno1-2") ? "completed" : ""}`}
                      >
                        {" "}
                        {completedSteps.has("anno1-2") ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          "2"
                        )}{" "}
                      </span>{" "}
                      <span className="step-label">
                        Select the edge of the circle up to be measured.
                      </span>
                    </div>

                    <div
                      className="step-description" /* sanitized: paddingLeft: '2.5rem' */
                    >
                      <div className="image-wrapper-flush">
                        <img
                          src={diameterDimensionImg}
                          alt="Diameter Dimension"
                          className="software-screenshot screenshot-small"
                        />
                      </div>
                    </div>

                    <div className="step-header">
                      {" "}
                      <span
                        className="step-label" /* sanitized: paddingLeft: '2.5rem' */
                      >
                        Left-click on the 3D Space to position the circular
                        dimension.
                      </span>
                    </div>
                  </div>{" "}
                  {/* Item 3 */}
                  <div
                    className={getStepClass("anno1-3")}
                    onClick={() => toggleStep("anno1-3")}
                  >
                    <div className="step-header">
                      {" "}
                      <span
                        className={`step-number ${completedSteps.has("anno1-3") ? "completed" : ""}`}
                      >
                        {" "}
                        {completedSteps.has("anno1-3") ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          "3"
                        )}{" "}
                      </span>{" "}
                      <span className="step-label">
                        Select edges of the angle to be measured.
                      </span>
                    </div>

                    <div
                      className="step-description" /* sanitized: paddingLeft: '2.5rem' */
                    >
                      <div className="image-wrapper-flush">
                        <img
                          src={angularDimensionImg}
                          alt="Angular Dimension"
                          className="software-screenshot screenshot-small"
                        />
                      </div>
                    </div>

                    <div className="step-header">
                      {" "}
                      <span
                        className="step-label" /* sanitized: paddingLeft: '2.5rem' */
                      >
                        Left-click on the 3D Space to position the angular
                        dimension.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* Bottom Row spanning full width */}
              <div>
                {" "}
                {/* Item 4 */}
                <div
                  className={getStepClass("anno1-4")}
                  onClick={() => toggleStep("anno1-4")}
                >
                  <div className="step-header">
                    {" "}
                    <span
                      className={`step-number ${completedSteps.has("anno1-4") ? "completed" : ""}`}
                    >
                      {" "}
                      {completedSteps.has("anno1-4") ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        "4"
                      )}{" "}
                    </span>{" "}
                    <span className="step-label">
                      Pick any edge of the entity &gt;{" "}
                      <strong className="text-highlight">GO</strong>
                      <img
                        src={leftClick}
                        alt="Left Click"
                        className="screenshot-click--inline"
                      />
                    </span>
                  </div>

                  <div
                    className="step-description" /* sanitized: paddingLeft: '2.5rem' */
                  >
                    <div className="image-wrapper-flush">
                      <img
                        src={notesLeaderLinesImg}
                        alt="Notes with Leader Lines"
                        className="software-screenshot"
                      />
                    </div>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span
                      className="step-label" /* sanitized: paddingLeft: '2.5rem' */
                    >
                      Left-click to show the{" "}
                      <strong className="text-highlight">
                        Note String Entry window
                      </strong>
                      .
                    </span>
                  </div>

                  <div
                    className="step-description" /* sanitized: paddingLeft: '2.5rem' */
                  >
                    <div className="image-wrapper-flush">
                      <img
                        src={noteStringEntryImg}
                        alt="Note String Entry Window"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span
                      className="step-label" /* sanitized: paddingLeft: '2.5rem' */
                    >
                      Enter the note &gt; Press OK
                    </span>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span
                      className="step-label" /* sanitized: paddingLeft: '2.5rem' */
                    >
                      Left-click on the 3D Space to place the note.
                    </span>
                  </div>
                </div>{" "}
                {/* Item 5 */}
                <div
                  className={getStepClass("anno1-5")}
                  onClick={() => toggleStep("anno1-5")}
                >
                  <div className="step-header">
                    {" "}
                    <span
                      className={`step-number ${completedSteps.has("anno1-5") ? "completed" : ""}`}
                    >
                      {" "}
                      {completedSteps.has("anno1-5") ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        "5"
                      )}{" "}
                    </span>{" "}
                    <span className="step-label">
                      Left-click on the 3D Space show the{" "}
                      <strong className="text-highlight">
                        Text Entry window
                      </strong>
                      .
                    </span>
                  </div>

                  <div
                    className="step-description" /* sanitized: paddingLeft: '2.5rem' */
                  >
                    <div className="image-wrapper-flush">
                      <img
                        src={characterStringsImg}
                        alt="Character Strings"
                        className="software-screenshot"
                      />
                    </div>

                    <div className="image-wrapper-flush">
                      <img
                        src={textEntryImg}
                        alt="Text Entry Window"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span
                      className="step-label" /* sanitized: paddingLeft: '2.5rem' */
                    >
                      Enter the note &gt; Press OK
                    </span>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span
                      className="step-label" /* sanitized: paddingLeft: '2.5rem' */
                    >
                      Left-click on the 3D Space to place the note.
                    </span>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="tool-block">
                {" "}
                {/* Item 1 */}
                <p className="p-flush">
                  <strong>
                    Creates dimensions for 3D entities collectively
                  </strong>
                </p>
                <div className="image-wrapper-flush">
                  <img
                    src={annotation2Img}
                    alt="Collective Dimension Result"
                    className="software-screenshot screenshot-medium"
                  />
                </div>
                <div
                  className={getStepClass("anno2-1")}
                  onClick={() => toggleStep("anno2-1")}
                >
                  <div className="flex-row-wrap">
                    <div className="flex-1">
                      <div className="step-header">
                        {" "}
                        <span
                          className={`step-number ${completedSteps.has("anno2-1") ? "completed" : ""}`}
                        >
                          {" "}
                          {completedSteps.has("anno2-1") ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            "1"
                          )}{" "}
                        </span>{" "}
                        <span className="step-label">
                          Select entity &gt;{" "}
                          <strong className="text-highlight">GO</strong>
                          <img
                            src={leftClick}
                            alt="Left Click"
                            className="screenshot-click--inline"
                          />
                        </span>
                      </div>

                      <div
                        className="step-description" /* sanitized: paddingLeft: '2.5rem' */
                      >
                        <p className="p-flush">
                          {" "}
                          *Dimensions will generate automatically (length,
                          width, height, hole details, hole pitches).
                        </p>
                      </div>
                    </div>

                    <div className="image-wrapper-flush">
                      <img
                        src={collectiveDimensionImg}
                        alt="Collectively Creates Dimension"
                        className="software-screenshot screenshot-medium"
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* Item 2 */}
                <p className="p-flush">
                  <strong>Edits drafting entity characters</strong>
                </p>
                <div className="image-wrapper-flush">
                  <img
                    src={changesDraftingEntityImg}
                    alt="Edits Drafting Entity Characters"
                    className="software-screenshot screenshot-small"
                  />
                </div>
                <div
                  className={getStepClass("anno2-1")}
                  onClick={() => toggleStep("anno2-1")}
                >
                  <div className="flex-row-wrap">
                    <div className="flex-1">
                      <div className="step-header">
                        {" "}
                        <span
                          className={`step-number ${completedSteps.has("anno2-1") ? "completed" : ""}`}
                        >
                          {" "}
                          {completedSteps.has("anno2-1") ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            "1"
                          )}{" "}
                        </span>{" "}
                        <span className="step-label">
                          Select drafting entity &gt;{" "}
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
                        <div className="step-header">
                          {" "}
                          <span className="step-label">
                            <strong className="text-highlight">
                              Edit Dimension Characters window
                            </strong>{" "}
                            will appear.
                          </span>
                        </div>

                        <div className="step-header">
                          {" "}
                          <span className="step-label">
                            After editing the dimension characters, Press OK.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="image-wrapper-flush">
                      <img
                        src={editDimensionImg}
                        alt="Edit Dimension Characters Window"
                        className="software-screenshot screenshot-large"
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* Item 3 */}
                <p className="p-flush">
                  <strong>Changes the attributes of a drafting entity</strong>
                </p>
                <div className="image-wrapper-flush">
                  <img
                    src={changesDraftingEntity2Img}
                    alt="Changes Draft Entity Attribute"
                    className="software-screenshot screenshot-small"
                  />
                </div>
                <div
                  className={getStepClass("anno2-1")}
                  onClick={() => toggleStep("anno2-1")}
                >
                  <div className="flex-row-wrap">
                    <div className="flex-1">
                      <div className="step-header">
                        {" "}
                        <span
                          className={`step-number ${completedSteps.has("anno2-1") ? "completed" : ""}`}
                        >
                          {" "}
                          {completedSteps.has("anno2-1") ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            "1"
                          )}{" "}
                        </span>{" "}
                        <span className="step-label">
                          Select drafting entity &gt;{" "}
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
                        <div className="step-header">
                          {" "}
                          <span className="step-label">
                            <strong className="text-highlight">
                              Change Properties window
                            </strong>{" "}
                            will appear.
                          </span>
                        </div>

                        <div className="step-header">
                          {" "}
                          <span className="step-label">
                            After changing the properties, Press OK
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="image-wrapper-flush">
                      <img
                        src={changePropertiesWindowImg}
                        alt="Change Properties Window"
                        className="software-screenshot screenshot-large"
                      />
                    </div>
                  </div>
                </div>{" "}
                {/* Item 4 */}{" "}
                <span className="step-label">
                  Changes the positions of drafting entities
                </span>
              </div>

              <div className="step-description">
                <div className="image-wrapper-flush">
                  <img
                    src={changesPositionDraftingEntitiesImg}
                    alt="Changes Position Tool"
                    className="software-screenshot screenshot-small"
                  />
                </div>
              </div>

              <div></div>
            </div>
          )}
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>{" "}
            <button className="nav-button next" onClick={handleNext}>
              {" "}
              {isAnnotation1 ? "Next" : "Next Lesson"}{" "}
              <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotationLesson;
