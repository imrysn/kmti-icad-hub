import React, { useState, useEffect, useRef } from "react";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowBigDown,
} from "lucide-react";

import titleBlock1Img from "../../assets/2D_Image_File/2D_title_block_1.png";

import titleBlock2Img from "../../assets/2D_Image_File/2D_title_block_2.png";

import titleBlock3Img from "../../assets/2D_Image_File/2D_title_block_3.png";

interface TitleBlockLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const TitleBlockLesson: React.FC<TitleBlockLessonProps> = ({
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
          <ArrowLeft size={28} className="lesson-intro-icon" /> 19. Title Block
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Displays part informations, such as Job Order, Drawing Number, Part &
          Machine Name, Drawn & Designer Name, Cross Reference and Previous
          Drawing Number and...
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {" "}
            {/* Section 1: Main Fields and Procedure */}
            <div className="lesson-section">
              <div className="flex-col">
                <div className="image-wrapper-flush">
                  <img
                    src={titleBlock1Img}
                    alt="Title Block Field Definitions and Creation Procedure"
                    className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                  />
                </div>
              </div>
            </div>
            <div className="flex-row">
              {" "}
              <ArrowBigDown size={85} fill="red" color="red" />
            </div>{" "}
            {/* Section 2: Data Reflection and Notes */}
            <div className="lesson-section" /* sanitized: width: '100%' */>
              <div className="flex-col">
                <div className="image-wrapper-flush">
                  <img
                    src={titleBlock2Img}
                    alt="Title Block Data Reflection and Technical Notes"
                    className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                  />
                </div>
              </div>
            </div>
            <div className="flex-row">
              {" "}
              <ArrowBigDown size={85} fill="red" color="red" />
            </div>{" "}
            {/* Section 3: Placement Landmarks */}
            <div className="lesson-section">
              <div className="flex-col">
                <div className="image-wrapper-flush">
                  <img
                    src={titleBlock3Img}
                    alt="Title Block Placement Landmarks (P1, P2)"
                    className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                  />
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
              Next Lesson <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBlockLesson;
