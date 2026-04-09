import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Surface Coating */

import surfaceCoatingTableImg from "../../assets/2D_Image_File/2D_surface_coating.jpg";

import specialNotesImg from "../../assets/2D_Image_File/2D_surface_coating_special_notes.jpg";

import copyMoveImg from "../../assets/2D_Image_File/2D_surface_coating_copy_move.png";

interface SurfaceCoatingLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const SurfaceCoatingLesson: React.FC<SurfaceCoatingLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const coatingSteps = [
    "Coating Specifications: Review the technical table for surface finishing processes. Ensure the chosen coating matches the material requirements for durability and corrosion resistance.",
    "Special Notes: Use special notes for heat treatments, welding instructions, or specific part requirements. If multiple notes are needed, arrange them chronologically by the manufacturing sequence, ensuring text properties match standard drafting notes.",
    "Copy and Move: These commands help organize your drawing. Copy multiplies entities, while move simply changes their location. Use reference points P1 and P2 to precisely reposition your technical details."
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
  }, []);

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
          Surface Coating
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(coatingSteps)}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Technical specifications for surface finishing processes and
          procedures for managing special notes and entity duplication on
          drawings.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {" "}
            {/* Surface Coating Table Section */}
            <div className="lesson-section">
              <div className="image-wrapper-flush">
                <img src={surfaceCoatingTableImg} alt="Surface Coating Specification Table" className="software-screenshot screenshot-wide" />
              </div>
            </div>
            <div className="section-divider"></div>{" "}
            {/* b. Special Notes Section */}
            <div className="lesson-section">
              {" "}
              <h4> b. Special Notes </h4>
              <div className="flex-row">
                <div className="image-wrapper-flush">
                  <img src={specialNotesImg} alt="Special Notes location in Drawing Template" className="software-screenshot screenshot-wide" />
                </div>

                <div className="info-box">
                  <p> Special notes</p>

                  <p>
                    {" "}
                    It can be the following:
                    <br /> 1. Heat & surface treatment ( if part requires
                    hardness).
                    <br /> 2. Welding notes ( if part is too big and details are
                    too crowded).
                    <br /> 3. Notes pertaining to specific portion of the part.
                    <br /> 4. Machine before welding.
                    <br /> 5. Additional process notes for purchase parts.
                  </p>

                  <p> Notes:</p>

                  <p>
                    {" "}
                    1. If two or more special notes needed for the drawing, it
                    will arrange on what process will be done first.
                    <br /> 2. Text properties need to be match with standard
                    notes.
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* c. Copy / Move Section */}
            <div className="lesson-section">
              {" "}
              <h4> c. Copy / Move </h4>
              <div className="flex-row">
                <div className="image-wrapper-flush">
                  <img src={copyMoveImg} alt="Copy and Move Command Configuration" className="software-screenshot screenshot-wide" />
                </div>

                <div className="info-box">
                  <p>
                    {" "}
                    Copy and move has the same procedure. The only difference it
                    that copy will multiply its quantity while move will only
                    change location.
                  </p>

                  <p>
                    {" "}
                    1. Click copy command. Click P1 then 'GO'.
                    <br /> 2. Click P2 for reference.
                    <br /> 3. Click P3 for the new location of entity.
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Navigation */}
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

export default SurfaceCoatingLesson;



