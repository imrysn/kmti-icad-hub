import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Import images */

import imgToolbar from "../../assets/2D_Image_File/2D_standard_part_library.png";

import imgSafetyColor from "../../assets/2D_Image_File/2D_standard_part_library_safety_color.png";

import imgRevHistory1 from "../../assets/2D_Image_File/2D_standard_part_library_revision_history_1.jpg";

import imgRevHistory2 from "../../assets/2D_Image_File/2D_standard_part_library_revision_history_2.png";

interface StandardLibraryLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const StandardLibraryLesson: React.FC<StandardLibraryLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const librarySteps = [
    "Safety Color: Use the part library to insert safety color notes for rotating or moving parts. Activate the global view, choose the safety color template, and place it on the lower right of your drawing. Note that standard machine colors don't require specific notes.",
    "Revision History: To track changes, select the revision history template from the part library while in global view. Place it in its designated location and edit the details based on the reference instructions."
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
          24. Standard Part Library
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(librarySteps)}
            onStop={stop}
          />
        </h3>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {/* Header section with Toolbar */}
          <div style={{ position: 'relative', marginBottom: '3rem' }}>
            <div style={{ width: '100%' }}>
              <img src={imgToolbar} alt="Toolbar Menu" className="software-screenshot screenshot-medium" />
            </div>

            {/* Floating Info Box - Position customizable via top/bottom/left/right */}
            <div className="info-box" style={{
              position: 'absolute',
              top: '55%',
              right: '15%',
              maxWidth: '500px',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 10
            }}>
              <h4>a. Safety Color</h4>
              <p>
                To easily recognize that the area in which this part is
                located has a rotating or moving object, hence, it is an
                accident-prone area.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Chain cover, gear cover, motor cover, universal joint cover
                and rotated parts need to be painted by yellow color (#4).
              </p>
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

            <div>
              <img src={imgSafetyColor} alt="Safety color selection" className="software-screenshot" />
            </div>
          </div>{" "}
          {/* Note for Safety Color */}
          <div className="info-box" style={{ marginTop: '2rem' }}>
            <span className="red-bold">Note: </span>
            <p style={{ marginTop: '0.5rem' }}>
              1. Solenoid cover, junction box cover and other covers that are
              not stated above and not rotated parts should be painted by machine color.
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              2. No need to indicate notes for machine color.
            </p>
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
              <img src={imgRevHistory1} alt="Revision history selection" className="software-screenshot" />
            </div>
          </div>
          <div style={{ width: '100%', marginTop: '2rem' }}>
            <img src={imgRevHistory2} alt="Revision history template" className="software-screenshot screenshot-wide" />
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
          {nextLabel || 'Next Lesson'} <ChevronRight size={18} />{" "}
        </button>
      </div>
    </div >
  );
};

export default StandardLibraryLesson;


