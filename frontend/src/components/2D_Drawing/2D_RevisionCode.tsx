import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Import images */

import img1 from "../../assets/2D_Image_File/2D_revision_code.png";

import imgA1 from "../../assets/2D_Image_File/2D_revision_code_a1.png";

import imgA2 from "../../assets/2D_Image_File/2D_revision_code_a2.png";

import imgA3 from "../../assets/2D_Image_File/2D_revision_code_a3.png";

import imgB from "../../assets/2D_Image_File/2D_revision_code_b.png";

interface RevisionCodeLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const RevisionCodeLesson: React.FC<RevisionCodeLessonProps> = ({
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
      </div>{" "}
      {/* Scrollable Content Container */}
      <section className="lesson-intro">
        <h3 className="section-title">23. Revision Code and History</h3>

        <p className="lesson-description">
          {" "}
          <span className="red-text">Revision </span> will occur if the finished
          drawing is already approved yet discrepancy notice during fabrication.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {/* Main Top Image */}
          <div className="flex-row">
            <img
              src={img1}
              alt="Revision Code and History"
              className="software-screenshot"
            />
          </div>{" "}
          {/* Sub-section A */} <h4>a. Revised detail</h4>
          <div className="flex-row">
            <div className="image-wrapper-flush">
              <img
                src={imgA1}
                alt="Revised Detail Menu"
                className="software-screenshot"
              />
            </div>

            <div className="flex-col">
              <img
                src={imgA2}
                alt="Delta input"
                className="software-screenshot"
              />
            </div>
          </div>{" "}
          {/* Sub-section A - Bottom Row */}
          <div className="flex-row">
            <div className="red-box">
              <p>1. Set up "create delta" command.</p>

              <p>2. Enter delta character.</p>

              <p>3. Place it on proper location.</p>

              <p>
                {" "}
                <span className="red-text">Note: </span> Local view where it
                will belong must be activated.{" "}
                <span className="red-text small-text">※※※ page 4</span>
              </p>
            </div>

            <div className="image-wrapper-flush">
              <img
                src={imgA3}
                alt="Delta symbol placement"
                className="software-screenshot"
              />
            </div>
          </div>{" "}
          {/* Sub-section B */} <h4>b. Revision Code</h4>
          <div className="flex-row">
            <div className="image-wrapper-flush">
              <img
                src={imgB}
                alt="Revision Code Bottom"
                className="software-screenshot"
              />
            </div>
          </div>
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
  );
};

export default RevisionCodeLesson;
