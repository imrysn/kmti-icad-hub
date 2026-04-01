/** * 3D_2Dto3D.tsx — 2D > 3D lessons (1 through 3) */

import React, { useState, useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

import "../../styles/3D_Modeling/CourseLesson.css";

import "../../styles/3D_Modeling/CourseLesson.css";
/* ══════════════════════════════════════════════════════════════════════════ */
/* 2D > 3D (1) — WORK PLANE / COMMAND MENU / EXTRUDE */
/* ══════════════════════════════════════════════════════════════════════════ */

import workPlaneImg from "../../assets/3D_Image_File/2d_3d_work_plane.png";

import openWorkPlaneImg from "../../assets/3D_Image_File/2d_3d_open_work_plane1.png";

import openWorkPlaneImg2 from "../../assets/3D_Image_File/2d_3d_open_work_plane.png";

import extrudeIcon from "../../assets/3D_Image_File/2d_3d_(1)_extrude.png";

import pickCrossSection from "../../assets/3D_Image_File/2d_3d_(1)_pick_cross_section.png";

import commandMenu from "../../assets/3D_Image_File/2d_3d(1)_1.png";

import commandMenu2 from "../../assets/3D_Image_File/2d_3d_(1)_command_menu2.png";

import leftClick from "../../assets/3D_Image_File/left_click.png";

import extrudeDialog from "../../assets/3D_Image_File/2d_3d(2)_extrude1.png";

import extrudeResultFinal from "../../assets/3D_Image_File/2d_3d(2)_extrude2.png";

import revolveIcon from "../../assets/3D_Image_File/2d_3d_(2)_revolve.png";

import revolveSteps from "../../assets/3D_Image_File/2d_3d(2)spiral.png";

import spiralSketch from "../../assets/3D_Image_File/2d_3d_(2)_revolve_spiral_form_sketch.png";

import spiralIcon from "../../assets/3D_Image_File/2d_3d_(2)_spiral_form.png";

import spiralItemEntry from "../../assets/3D_Image_File/2d_3d_(2)_spiral_form_item_entry.png";

import spiralPitch from "../../assets/3D_Image_File/2d_3d_(2)_spiral_form_pitch.png";

import spiralRotation1 from "../../assets/3D_Image_File/2d_3d_(2)_spiral_form_axis_rotation1.png";

import spiralRotation from "../../assets/3D_Image_File/2d_3d_(2)_spiral_form_axis_rotation.png";

import spiralRotation2 from "../../assets/3D_Image_File/2d_3d_(2)_spiral_form_axis_rotation2.jpg"; /* ── 2D > 3D (1) ── */

const TwoDTo3D1: React.FC<{
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}> = ({ onNextLesson, onPrevLesson }) => {
  const [activeTab, setActiveTab] = useState<"workPlane">("workPlane");

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
      if (currentContainer)
        currentContainer.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);

      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);

      return next;
    });
  };

  const getStepClass = (stepId: string) =>
    `instruction-step interactive ${completedSteps.has(stepId) ? "completed" : ""}`;

  const tabs = [{ id: "workPlane", label: "Work Plane" }];

  const scrollToTop = () => {
    const viewer = document.querySelector(".main-content-viewer");

    if (viewer) viewer.scrollTo(0, 0);
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
        <h3 className="section-title">2D &gt; 3D (1)</h3>
      </section>
      <div className="lesson-tabs">
        {" "}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.id as any);
              scrollToTop();
            }}
          >
            {" "}
            {tab.label}{" "}
          </button>
        ))}
      </div>
      <div className="lesson-grid single-card">
        {" "}
        {activeTab === "workPlane" && (
          <div className="lesson-card tab-content">
            <div className="card-header">
              <h4>2D &gt; 3D</h4>
            </div>

            <p className="p-flush">
              3D modeling can be done by sketching on 2D sketch using a plane on
              the 3D Dimension.
            </p>

            <p className="text-caption">
              To create 2D plane on the 3D Dimension, use{" "}
              <strong className="text-highlight">Open Work Plane</strong> from
              the toolbar.
            </p>

            <div className="tool-block">
              <div className="image-wrapper-flush">
                <img
                  src={workPlaneImg}
                  alt="X-Y Plane"
                  className="software-screenshot screenshot-small"
                />
              </div>

              <div className="image-wrapper-flush">
                <img
                  src={openWorkPlaneImg}
                  alt="Open Work Plane toolbar"
                  className="software-screenshot screenshot-wide"
                />
              </div>

              <div
                className={getStepClass("2d1-2")}
                onClick={() =>
                  toggleStep("2d1-2")
                } /* sanitized: marginTop: '1.5rem' */
              >
                <div className="step-header">
                  {" "}
                  <span
                    className={`step-number ${completedSteps.has("2d1-2") ? "completed" : ""}`}
                  >
                    {" "}
                    {completedSteps.has("2d1-2") ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      "2"
                    )}{" "}
                  </span>{" "}
                  <span className="step-label">
                    Use to rotate the work plane to X-Y Plane, X-Y Plane or Y-Z
                    Plane.
                  </span>
                </div>

                <div
                  className="step-description" /* sanitized: paddingLeft: '2.5rem' */
                >
                  <div className="flex-row-center">
                    <div className="image-wrapper-flush">
                      <img
                        src={openWorkPlaneImg2}
                        alt="Open Work Plane"
                        className="software-screenshot screenshot-small"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              {" "}
              <button className="nav-button" onClick={onPrevLesson}>
                <ChevronLeft size={18} /> Previous
              </button>{" "}
              <button className="nav-button next" onClick={onNextLesson}>
                Next Lesson <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; /* ── 2D > 3D (2) ── */

const TwoDTo3D2: React.FC<{
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}> = ({ onNextLesson, onPrevLesson }) => {
  const [activeTab, setActiveTab] = useState<"commandMenu">("commandMenu");

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
      if (currentContainer)
        currentContainer.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab]);

  const tabs = [{ id: "commandMenu", label: "Command Menu" }];

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
        <h3>2D &gt; 3D (2)</h3>
      </section>
      <div className="lesson-tabs">
        {" "}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="lesson-grid single-card">
        {" "}
        {activeTab === "commandMenu" && (
          <div className="lesson-card tab-content">
            <div className="card-header">
              <h4>COMMAND MENU</h4>
            </div>

            <p>
              Most tools used for sketching on the work plane can be found on
              the command menu.
            </p>

            <div className="tool-block">
              <div className="image-wrapper-flush">
                These are the tools used for extruding 2D sketches to 3D solid
                Entities.
                <img
                  src={commandMenu}
                  alt="Command Menu"
                  className="software-screenshot screenshot-wide"
                />
              </div>
            </div>

            <div className="lesson-navigation">
              {" "}
              <button className="nav-button" onClick={onPrevLesson}>
                <ChevronLeft size={18} /> Previous
              </button>{" "}
              <button className="nav-button next" onClick={onNextLesson}>
                Next Lesson <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; /* ── 2D > 3D (3) ── */

const TwoDTo3D3: React.FC<{
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}> = ({ onNextLesson, onPrevLesson }) => {
  const [activeTab, setActiveTab] = useState<"extrude" | "revolve" | "spiral">(
    "extrude",
  );

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
      if (currentContainer)
        currentContainer.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);

      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);

      return next;
    });
  };

  const getStepClass = (stepId: string) =>
    `instruction-step interactive ${completedSteps.has(stepId) ? "completed" : ""}`;

  const tabs = [
    { id: "extrude", label: "Extrude" },

    { id: "revolve", label: "Revolve" },

    { id: "spiral", label: "Spiral" },
  ];

  const scrollToTop = () => {
    const viewer = document.querySelector(".main-content-viewer");

    if (viewer) viewer.scrollTo(0, 0);
  };

  const handleNext = () => {
    const i = tabs.findIndex((t) => t.id === activeTab);

    if (i < tabs.length - 1) {
      setActiveTab(tabs[i + 1].id as any);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    const i = tabs.findIndex((t) => t.id === activeTab);

    if (i > 0) {
      setActiveTab(tabs[i - 1].id as any);
      scrollToTop();
    } else if (onPrevLesson) onPrevLesson();
  };

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3>2D &gt; 3D (3)</h3>
      </section>

      <div className="lesson-tabs">
        {" "}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.id as any);
              scrollToTop();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        {" "}
        {activeTab === "extrude" && (
          <div className="lesson-card tab-content">
            <p className="p-flush">
              These are the tools used for extruding 2D sketches to 3D solid
              Entities.
            </p>

            <p className="p-flush">
              Most commonly used tools are the following:
            </p>

            <div className="tool-block">
              <div className="image-wrapper-flush">
                <img
                  src={commandMenu2}
                  alt="Extrude Tools"
                  className="software-screenshot screenshot-small"
                />
              </div>
            </div>

            <div className="card-header card-sub-header">
              <h4>EXTRUDE</h4>
            </div>

            <p className="p-flush-bottom">
              Creates a solid entity from a section form created on a work plane
              or 2D drawing, by performing vertical at projection.
            </p>

            <div
              className={getStepClass("2d3e-1")}
              onClick={() => toggleStep("2d3e-1")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3e-1") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3e-1") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "1"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Select <strong className="text-highlight">Extrude</strong>{" "}
                  from the icon menu.
                </span>
              </div>

              <div
                className="step-description" /* sanitized: paddingLeft: '2.5rem' */
              >
                <div className="image-wrapper-flush">
                  <img
                    src={extrudeIcon}
                    alt="Extrude Icon Menu"
                    className="software-screenshot screenshot-small"
                  />
                </div>
              </div>
            </div>

            <div
              className={getStepClass("2d3e-2")}
              onClick={() => toggleStep("2d3e-2")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3e-2") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3e-2") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "2"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Pick the cross-section to be extruded. A hatch will appear to
                  show that the sketch is an enclosed figure &gt;{" "}
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
                <div className="flex-row-center--wrap">
                  <div className="image-wrapper-flush">
                    <img
                      src={pickCrossSection}
                      alt="PICK EDGE"
                      className="software-screenshot screenshot-large"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={getStepClass("2d3e-3")}
              onClick={() => toggleStep("2d3e-3")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3e-3") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3e-3") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "3"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Specify the height of extrusion on the item entry &gt; Press{" "}
                  <strong className="text-highlight">Enter</strong> &gt;{" "}
                  <strong className="text-highlight">GO</strong>
                </span>
              </div>

              <div
                className="step-description" /* sanitized: paddingLeft: '2.5rem' */
              ></div>
            </div>

            <div className="instruction-box instruction-box--warning">
              <p className="p-flush">
                A dialog box will appear asking if after extrusion, the work
                plane will be deleted or not. Select{" "}
                <strong className="text-highlight">OK</strong> to delete the
                work plane.
              </p>

              <p className="p-flush">
                <strong className="text-highlight">
                  Note: Deleting the work plane will delete all the sketch made
                  on the plane. This process cannot be undone.
                </strong>
              </p>

              <p className="p-flush">
                Select Cancel to keep the work plane together with all the 2D
                sketches.
              </p>
            </div>

            <div className="flex-row-center--wrap">
              <div className="image-wrapper-flush">
                <img
                  src={extrudeDialog}
                  alt="Extrude Dialog"
                  className="software-screenshot screenshot-medium"
                />
              </div>{" "}
              <ArrowRight size={24} color="var(--primary-red)" />
              <div className="image-wrapper-flush">
                <img
                  src={extrudeResultFinal}
                  alt="Extrude Result"
                  className="software-screenshot screenshot-medium"
                />
              </div>
            </div>

            <div className="lesson-navigation">
              {" "}
              <button className="nav-button" onClick={handlePrev}>
                <ChevronLeft size={18} /> Previous
              </button>{" "}
              <button className="nav-button next" onClick={handleNext}>
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}{" "}
        {activeTab === "revolve" && (
          <div className="lesson-card tab-content">
            <div className="card-header card-sub-header">
              <h4>REVOLVE</h4>
            </div>

            <p className="p-flush-bottom">
              Creates a solid entity from a section from created on a work plane
              or 2D drawing, by performing rotation projection.
            </p>

            <div
              className={getStepClass("2d3r-1")}
              onClick={() => toggleStep("2d3r-1")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3r-1") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3r-1") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "1"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Select <strong className="text-highlight">Revolve</strong>{" "}
                  from the icon menu.
                </span>
              </div>

              <div
                className="step-description" /* sanitized: paddingLeft: '2.5rem' */
              >
                <div className="image-wrapper-flush">
                  <img
                    src={revolveIcon}
                    alt="Revolve Icon"
                    className="software-screenshot screenshot-small"
                  />
                </div>
              </div>
            </div>

            <div
              className={getStepClass("2d3r-2")}
              onClick={() => toggleStep("2d3r-2")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3r-2") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3r-2") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "2"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Pick the cross-section to be revolved. A hatch will appear to
                  show that the sketch is an enclosed figure &gt;{" "}
                  <strong className="text-highlight">GO</strong>
                  <img
                    src={leftClick}
                    alt="Left click"
                    className="screenshot-click--inline"
                  />
                </span>
              </div>

              <p className="p-flush-bottom">
                A hatch will appear to show that the sketch is an enclosed
                figure
              </p>

              <div
                className="step-description" /* sanitized: paddingLeft: '2.5rem' */
              ></div>
            </div>

            <div
              className={getStepClass("2d3r-3")}
              onClick={() => toggleStep("2d3r-3")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3r-3") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3r-3") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "3"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Select the axis of rotation &gt;{" "}
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
              ></div>
            </div>

            <div className="tool-block">
              <div className="image-wrapper-flush">
                <img
                  src={revolveSteps}
                  alt="Revolve Steps"
                  className="software-screenshot screenshot-wide"
                />
              </div>
            </div>

            <div className="lesson-navigation">
              {" "}
              <button className="nav-button" onClick={handlePrev}>
                <ChevronLeft size={18} /> Previous
              </button>{" "}
              <button className="nav-button next" onClick={handleNext}>
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}{" "}
        {activeTab === "spiral" && (
          <div className="lesson-card tab-content">
            <div className="card-header card-sub-header">
              <h4>SPIRAL FORM</h4>
            </div>

            <p className="p-flush-bottom">
              Creates a 3D spiral form from a section form created on a 2D
              sketch.
            </p>

            <div
              className={getStepClass("2d3s-1")}
              onClick={() => toggleStep("2d3s-1")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3s-1") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3s-1") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "1"
                  )}{" "}
                </span>{" "}
                <span className="step-label">First do the sketch.</span>
              </div>

              <div
                className="step-description" /* sanitized: paddingLeft: '2.5rem' */
              >
                <div className="image-wrapper-flush">
                  <img
                    src={spiralSketch}
                    alt="Spiral Sketch"
                    className="software-screenshot screenshot-wide"
                  />
                </div>
              </div>
            </div>

            <div
              className={getStepClass("2d3s-2")}
              onClick={() => toggleStep("2d3s-2")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3s-2") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3s-2") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "2"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Select <strong className="text-highlight">Spiral Form</strong>{" "}
                  from the icon menu
                </span>
              </div>

              <div
                className="step-description" /* sanitized: paddingLeft: '2.5rem' */
              >
                <div className="image-wrapper-flush">
                  <img
                    src={spiralIcon}
                    alt="Spiral Form Icon"
                    className="software-screenshot screenshot-small"
                  />
                </div>

                <p className="text-caption">
                  Pick the cross section to be revolved. Hatch will appear to
                  show that the sketch is an enclosed figure &gt; GO
                </p>
              </div>
            </div>

            <div
              className={getStepClass("2d3s-3")}
              onClick={() => toggleStep("2d3s-3")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3s-3") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3s-3") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "3"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Specify the pitch of the spiral on the item entry &gt; Press
                  &gt; <strong className="text-highlight">GO</strong>
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
                <p className="p-flush">
                  *Note: Pitch must be greater than Thickness
                </p>

                <div className="flex-row-center--wrap">
                  <div className="image-wrapper-flush">
                    <img
                      src={spiralItemEntry}
                      alt="Spiral Item Entry"
                      className="software-screenshot screenshot-large"
                    />
                  </div>

                  <div className="image-wrapper-flush">
                    <img
                      src={spiralPitch}
                      alt="Spiral Pitch Diagram"
                      className="software-screenshot screenshot-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={getStepClass("2d3s-4")}
              onClick={() => toggleStep("2d3s-4")}
            >
              <div className="step-header">
                {" "}
                <span
                  className={`step-number ${completedSteps.has("2d3s-4") ? "completed" : ""}`}
                >
                  {" "}
                  {completedSteps.has("2d3s-4") ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    "4"
                  )}{" "}
                </span>{" "}
                <span className="step-label">
                  Select the ends of the length of the spiral along the axis of
                  rotation. Then <strong className="text-highlight">GO</strong>
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
                <div className="image-wrapper-flush">
                  <img
                    src={spiralRotation1}
                    alt="Spiral Axis 1"
                    className="software-screenshot screenshot-medium"
                  />
                </div>
              </div>
            </div>

            <div className="section-divider"></div>

            <div className="tool-block">
              {" "}
              <h4 className="section-title">RESULT</h4>
              <div className="flex-row-center--wrap">
                {" "}
                <ArrowRight size={20} color="var(--primary-red)" />
                <div className="image-wrapper-flush">
                  <img
                    src={spiralRotation}
                    alt="Spiral Axis"
                    className="software-screenshot screenshot-medium"
                  />
                </div>{" "}
                <ArrowRight size={20} color="var(--primary-red)" />
                <div className="image-wrapper-flush">
                  <img
                    src={spiralRotation2}
                    alt="Spiral Result"
                    className="software-screenshot screenshot-medium"
                  />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              {" "}
              <button className="nav-button" onClick={handlePrev}>
                <ChevronLeft size={18} /> Previous
              </button>{" "}
              <button className="nav-button next" onClick={onNextLesson}>
                Next Lesson <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TwoDTo3DLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const TwoDTo3DLesson: React.FC<TwoDTo3DLessonProps> = ({
  subLessonId,
  onNextLesson,
  onPrevLesson,
}) => {
  switch (subLessonId) {
    case "2d-3d-1":
      return (
        <TwoDTo3D1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} />
      );
    case "2d-3d-2":
      return (
        <TwoDTo3D2 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} />
      );
    case "2d-3d-3":
      return (
        <TwoDTo3D3 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} />
      );
    default:
      return (
        <TwoDTo3D1 onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} />
      );
  }
};

export default TwoDTo3DLesson;
