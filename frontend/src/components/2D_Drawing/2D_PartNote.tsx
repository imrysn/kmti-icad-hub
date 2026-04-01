import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets */

import partNoteImg1 from "../../assets/2D_Image_File/2D_part_note_1.png";

import partNoteImg2 from "../../assets/2D_Image_File/2D_part_note_2.png";

import textNoteImg from "../../assets/2D_Image_File/2D_part_note_text.png";

interface PartNoteLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PartNoteLesson: React.FC<PartNoteLessonProps> = ({
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
  }, []);

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
          <ArrowLeft size={28} className="lesson-intro-icon" /> Part Note / Text
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Using Part Notes and Text commands to provide additional technical
          instructions, process details, and references in 2D drawings.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {" "}
            {/* 1. Part Note - Process Section */}
            <div>
              <div className="info-box">
                <p>
                  {" "}
                  Notes are also used to indicate additional instructions on the
                  process to be applied on the part.
                </p>
              </div>

              <div className="lesson-section">
                <div className="flex-row">
                  <div className="image-wrapper-flush">
                    <img
                      src={partNoteImg1}
                      alt="Part Note Process Drawing"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="section-divider"></div>{" "}
            {/* 2. Part Note - Assemblies Section */}
            <div className="lesson-section">
              <div className="flex-col">
                <div
                  className="image-wrapper-flush" /* sanitized: width: '100%' */
                >
                  <img
                    src={partNoteImg2}
                    alt="Part Note Assembly Reference"
                    className="software-screenshot screenshot-wide"
                  />
                </div>

                <div>
                  <p>
                    {" "}
                    Note:
                    <br /> &nbsp;&nbsp;&nbsp;&nbsp;Aside from the given samples,
                    note command
                    <br /> &nbsp;&nbsp;&nbsp;&nbsp;can be applied depends on the
                    purpose and on <br /> &nbsp;&nbsp;&nbsp;&nbsp;the required
                    process to be applied.
                  </p>
                </div>
              </div>
            </div>
            <div className="section-divider"></div>
            {/* 11. Text Section */}
            <div>
              {" "}
              <h4> 11. Text </h4>
              <div className="image-wrapper-flush">
                <img
                  src={textNoteImg}
                  alt="Text Command and Configuration"
                  className="software-screenshot screenshot-wide"
                />
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
              Next Lesson <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartNoteLesson;
