/** * 3D_Annotation.tsx  EAnnotation lessons */

import React, { useState, useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Box,
  Zap
} from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
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

import changesDraftingEntityImg from "../../assets/3D_Image_File/annotation2_edits_drafting.png";

import changesPositionDraftingEntitiesImg from "../../assets/3D_Image_File/changes_position_drafting_entities.png";

import collectiveDimensionImg from "../../assets/3D_Image_File/annotation2_dimension.png";

import annotation2Img from "../../assets/3D_Image_File/angular_dimension1.png";

import changesDraftingEntity2Img from "../../assets/3D_Image_File/annotation11.png";

interface AnnotationLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const AnnotationLesson: React.FC<AnnotationLessonProps> = ({
  subLessonId = "annotation-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const isAnnotation1 = subLessonId === "annotation-1";

  // Use core hook for scroll tracking and TTS
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  const annotation1Steps = [
    "Step 1: Creates linear dimension between two points.",
    "Step 2: Measures circular diameters. Select the edge of the circle then left-click to position.",
    "Step 3: Measures angles. Select two edges then left-click to position the angular dimension.",
    "Step 4: Adding notes with leader lines. Pick an edge, click GO, then enter text in the window.",
    "Step 5: Adding free character strings. Left-click anywhere in 3D space then enter your text."
  ];

  const annotation2Steps = [
    "Step 1: Collectively creates dimensions for an entire entity automatically.",
    "Step 2: Edits existing drafting characters. Select the entity, click GO, then edit in the window.",
    "Step 3: Changes common attributes like color or layer for drafting entities.",
    "Step 4: Moves the position of existing dimensions or notes."
  ];



  const getStepClass = (stepId: string) => "instruction-step";
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
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          Annotation
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(isAnnotation1 ? annotation1Steps : annotation2Steps)}
            onStop={stop}
          />
        </h3>
        <p>
          Tools use to create drafting entities such as dimension text and
          notes.
        </p>{" "}
        {isAnnotation1 && (
          <div className="instruction-box">
            <div>
              <img src={isAnnotation1 ? annotationImg : annotation2Img} alt={isAnnotation1 ? "Annotation Tool Menu" : "Annotation Dimension Result"} className={isAnnotation1 ? "software-screenshot screenshot-small" : "software-screenshot screenshot-medium"} style={{ width: '260px' }} />
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
                  <div className={`${getStepClass("anno1-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                    <p className="p-flush">
                      <strong>Creates linear dimension</strong>
                    </p>

                    <div>
                      <img src={linearDimensionImg} alt="Linear Dimension" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                    </div>
                  </div>{" "}
                  {/* Item 2 */}
                  <div className={`${getStepClass("anno1-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                    <div className="step-header">
                      {" "}
                      <span className="step-number">

                        2
                      </span>{" "}
                      <span className="step-label">
                        Select the edge of the circle up to be measured.
                      </span>
                    </div>

                    <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                      <div>
                        <img src={diameterDimensionImg} alt="Diameter Dimension" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                      </div>
                    </div>

                    <div className="step-header">
                      {" "}
                      <span className="step-label" /* sanitized: paddingLeft: '2.5rem' */>
                        Left-click on the 3D Space to position the circular
                        dimension.
                      </span>
                    </div>
                  </div>{" "}
                  {/* Item 3 */}
                  <div className={`${getStepClass("anno1-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                    <div className="step-header">
                      {" "}
                      <span className="step-number">

                        3
                      </span>{" "}
                      <span className="step-label">
                        Select edges of the angle to be measured.
                      </span>
                    </div>

                    <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                      <div>
                        <img src={angularDimensionImg} alt="Angular Dimension" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                      </div>
                    </div>

                    <div className="step-header">
                      {" "}
                      <span className="step-label" /* sanitized: paddingLeft: '2.5rem' */>
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
                <div className={`${getStepClass("anno1-4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    {" "}
                    <span className="step-number">

                      4
                    </span>{" "}
                    <span className="step-label">
                      Pick any edge of the entity &gt;{" "}
                      <strong className="text-highlight">GO</strong>
                      <img src={leftClick} alt="Left Click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                    </span>
                  </div>

                  <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                    <div>
                      <img src={notesLeaderLinesImg} alt="Notes with Leader Lines" className="software-screenshot" style={{ height: '140px' }} />
                    </div>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span className="step-label" /* sanitized: paddingLeft: '2.5rem' */>
                      Left-click to show the{" "}
                      <strong className="text-highlight">
                        Note String Entry window
                      </strong>
                      .
                    </span>
                  </div>

                  <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                    <div>
                      <img src={noteStringEntryImg} alt="Note String Entry Window" className="software-screenshot screenshot-wide" style={{ height: '210px' }} />
                    </div>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span className="step-label" /* sanitized: paddingLeft: '2.5rem' */>
                      Enter the note &gt; Press OK
                    </span>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span className="step-label" /* sanitized: paddingLeft: '2.5rem' */>
                      Left-click on the 3D Space to place the note.
                    </span>
                  </div>
                </div>{" "}
                {/* Item 5 */}
                <div className={`${getStepClass("anno1-5")} ${currentIndex === 4 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    {" "}
                    <span className="step-number">

                      5
                    </span>{" "}
                    <span className="step-label">
                      Left-click on the 3D Space show the{" "}
                      <strong className="text-highlight">
                        Text Entry window
                      </strong>
                      .
                    </span>
                  </div>

                  <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                    <div>
                      <img src={characterStringsImg} alt="Character Strings" className="software-screenshot" style={{ height: '140px' }} />
                    </div>
                    <br />
                    <br />
                    <div>
                      <img src={textEntryImg} alt="Text Entry Window" className="software-screenshot screenshot-wide" style={{ height: '210px' }} />
                    </div>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span className="step-label" /* sanitized: paddingLeft: '2.5rem' */>
                      Enter the note &gt; Press OK
                    </span>
                  </div>

                  <div className="step-header">
                    {" "}
                    <span className="step-label" /* sanitized: paddingLeft: '2.5rem' */>
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
                {/* Item 1 */}
                <p className="p-flush">
                  <strong>
                    Creates dimensions for 3D entities collectively
                  </strong>
                </p>
                <div>
                  <img src={annotation2Img} alt="Collective Dimension Result" className="software-screenshot screenshot-medium" style={{ height: '95px' }} />
                </div>
                <div className={`${getStepClass("anno2-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="flex-row-wrap">
                    <div className="flex-1">
                      <div className="step-header">
                        {" "}
                        <span className="step-number">

                          1
                        </span>{" "}
                        <span className="step-label">
                          Select entity &gt;{" "}
                          <strong className="text-highlight">GO</strong>
                          <img src={leftClick} alt="Left Click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                        </span>
                      </div>

                      <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                        <p className="p-flush">
                          {" "}
                          *Dimensions will generate automatically (length,
                          width, height, hole details, hole pitches).
                        </p>
                      </div>
                    </div>

                    <div>
                      <img src={collectiveDimensionImg} alt="Collectively Creates Dimension" className="software-screenshot screenshot-medium" />
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <p className="p-flush">
                  <strong>Edits drafting entity characters</strong>
                </p>
                <div>
                  <img src={changesDraftingEntityImg} alt="Edits Drafting Entity Characters" className="software-screenshot screenshot-small" style={{ height: '95px' }} />
                </div>
                <div className={`${getStepClass("anno2-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="flex-row-wrap">
                    <div className="flex-1">
                      <div className="step-header">
                        {" "}
                        <span className="step-number">

                          1
                        </span>{" "}
                        <span className="step-label">
                          Select drafting entity &gt;{" "}
                          <strong className="text-highlight">GO</strong>
                          <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                        </span>
                      </div>

                      <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
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

                    <div >
                      <img src={editDimensionImg} alt="Edit Dimension Characters Window" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <p className="p-flush">
                  <strong>Changes the attributes of a drafting entity</strong>
                </p>
                <div>
                  <img src={changesDraftingEntity2Img} alt="Changes Draft Entity Attribute" className="software-screenshot screenshot-small" style={{ height: '95px' }} />
                </div>
                <div className={`${getStepClass("anno2-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                  <div className="flex-row-wrap">
                    <div className="flex-1">
                      <div className="step-header">
                        {" "}
                        <span className="step-number">

                          1
                        </span>{" "}
                        <span className="step-label">
                          Select drafting entity &gt;{" "}
                          <strong className="text-highlight">GO</strong>
                          <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', verticalAlign: 'middle', margin: '0 4px' }} />
                        </span>
                      </div>

                      <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
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

                    <div>
                      <img src={changePropertiesWindowImg} alt="Change Properties Window" className="software-screenshot screenshot-large" />
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <p className="p-flush">
                  <strong>Changes the positions of drafting entities</strong>
                </p>
                <div className={`${getStepClass("anno2-4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
                  <div className="step-description">
                    <div>
                      <img src={changesPositionDraftingEntitiesImg} alt="Changes Position Tool" className="software-screenshot screenshot-small" style={{ height: '95px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>{" "}
            <button className="nav-button next" onClick={handleNext}>
              {" "}
              {nextLabel || (isAnnotation1 ? "Next" : "Next Lesson")}{" "}
              <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotationLesson;



