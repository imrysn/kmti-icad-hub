import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Retaining Ring */

import retaining1Img from "../../assets/2D_Image_File/2D_retaining_ring_(1).jpg";

import retaining2Img from "../../assets/2D_Image_File/2D_retaining_ring_(2).jpg";

interface RetainingRingLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const RetainingRingLesson: React.FC<RetainingRingLessonProps> = ({
  subLessonId = "2d-retaining-ring-1",
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
          <ArrowLeft size={28} className="lesson-intro-icon" /> Retaining Ring{" "}
          {subLessonId === "2d-retaining-ring-1" ? "(1)" : "(2)"}
        </h3>

        <p className="lesson-subtitle">
          {" "}
          {subLessonId === "2d-retaining-ring-1"
            ? "Dimensional specifications and assembly standards for External C-Type Retaining Rings."
            : "Dimensional specifications and assembly standards for Internal C-Type Retaining Rings."}
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-retaining-ring-1" ? (
            <div className="flex-col">
              <div className="image-wrapper-flush">
                <img
                  src={retaining1Img}
                  alt="Retaining Rings-C Type-External Standards"
                  className="software-screenshot screenshot-wide"
                />
              </div>
            </div>
          ) : (
            <div className="flex-col">
              <div className="image-wrapper-flush">
                <img
                  src={retaining2Img}
                  alt="Retaining Rings-C Type-Internal Standards"
                  className="software-screenshot screenshot-wide"
                />
              </div>
            </div>
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

export default RetainingRingLesson;
