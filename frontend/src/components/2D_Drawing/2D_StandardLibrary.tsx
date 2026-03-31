import React, { useState, useEffect, useRef } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Import images */

import imgToolbar from "../../assets/2D_Image_File/2D_standard_part_library.png";

import imgSafetyColor from "../../assets/2D_Image_File/2D_standard_part_library_safety_color.png";

import imgRevHistory1 from "../../assets/2D_Image_File/2D_standard_part_library_revision_history_1.jpg";

import imgRevHistory2 from "../../assets/2D_Image_File/2D_standard_part_library_revision_history_2.png";

interface StandardLibraryLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const StandardLibraryLesson: React.FC<StandardLibraryLessonProps> = ({
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
        <h3 className="section-title">24. Standard Part Library</h3>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {/* Header section with Toolbar */}
          <div>
            <div className="image-wrapper-flush">
              <img
                src={imgToolbar}
                alt="Toolbar Menu"
                className="software-screenshot"
              />
            </div>{" "}
            {/* customizable position via top/left/right/bottom values */}
            <div>
              {" "}
              <h4>a. Safety Color</h4>
              <div className="red-box">
                <p>
                  To easily recognize that the area in which this part is
                  located has a rotating or moving object, hence, it is an
                  accident-prone area.
                </p>{" "}
                <br />
                <p>
                  Chain cover, gear cover, motor cover, universal joint cover
                  and rotated parts need to be painted by yellow color (#4).
                </p>
              </div>
            </div>
          </div>{" "}
          {/* Safety Color Procedure */}
          <div className="flex-row">
            <div className="red-box">
              <p>1. Global view must be activated.</p>

              <p>2. Click "part library" command</p>

              <p>3. Choose required template (safetycolor note).</p>

              <p>4. Click OK</p>

              <p>
                5. Designated position is on the lower right portion of the
                drawing template.
              </p>
            </div>

            <div className="image-wrapper-flush">
              <img
                src={imgSafetyColor}
                alt="Safety color selection"
                className="software-screenshot"
              />
            </div>
          </div>{" "}
          {/* Note for Safety Color */}
          <div>
            {" "}
            <span className="red-text">Note: </span>{" "}
            <span>
              {" "}
              <span>
                1. Solenoid cover, junction box cover and other cover that is
                not stated above
              </span>{" "}
              <span>
                {" "}
                and not rotated parts should be painted by machine color.
              </span>{" "}
              <span>2. No need to indicate notes for machine color.</span>{" "}
            </span>
          </div>{" "}
          {/* Revision History Section */} <h4>b. Revision History</h4>
          <div className="flex-row">
            <div className="red-box">
              <p>1. Global view must be activated.</p>

              <p>2. Click "part library" command</p>

              <p>3. Choose required template (revision history).</p>

              <p>4. Click OK.</p>

              <p>5. Place on its designated location.</p>

              <p>
                6. Edit the details on it based on the reference and
                instruction. Use edit
              </p>
            </div>

            <div className="image-wrapper-flush">
              <img
                src={imgRevHistory1}
                alt="Revision history selection"
                className="software-screenshot"
              />
            </div>
          </div>
          <div className="flex-row">
            <div className="image-wrapper-flush">
              <img
                src={imgRevHistory2}
                alt="Revision history template"
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

export default StandardLibraryLesson;
