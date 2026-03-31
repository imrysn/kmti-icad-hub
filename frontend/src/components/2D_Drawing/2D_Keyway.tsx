import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Keyway */

import keywayImg from "../../assets/2D_Image_File/2D_keyway.jpg";

interface KeywayLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const KeywayLesson: React.FC<KeywayLessonProps> = ({
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
          <ArrowLeft size={28} className="lesson-intro-icon" /> Keyway Standards
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Dimensions and tolerance specifications for parallel keyways on shafts
          and hubs.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            <div className="image-wrapper-flush">
              <img
                src={keywayImg}
                alt="Parallel Keyway Standards Table"
                className="software-screenshot screenshot-wide"
              />
            </div>
          </div>

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

export default KeywayLesson;
