import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight, MoveDown } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Machining Symbol */

import machiningSymbolMainImg from "../../assets/2D_Image_File/2D_machining_symbol.png";

import machiningSymbolNoteImg from "../../assets/2D_Image_File/2D_machining_symbol_note.jpg";

import machiningSurfaceCondImg from "../../assets/2D_Image_File/2D_machining_symbol_machining_surface_condiiton.jpg";

interface MachiningSymbolLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MachiningSymbolLesson: React.FC<MachiningSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const machiningSteps = [
    "Machining Symbols: Select the required machining symbol from the menu. Note that symbols in parentheses indicate the part must be machined before welding, as post-weld machining would be impossible.",
    "Surface Condition: Refer to the Machining Surface Condition table for specific roughness values and finish requirements standard for KEMCO parts."
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
          Machining Symbol
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(machiningSteps)}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Understanding machining symbols and surface condition requirements to
          ensure precision parts and required surface finishes.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {" "}
            {/* 12. Machining Symbols - Title Header */}
            <div>
              {" "}
              <h4> 12. Machining Symbols </h4>
              <div className="flex-row">
                <div className="image-wrapper-flush">
                  <img src={machiningSymbolMainImg} alt="Machining Symbol Selection" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>{" "}
            {/* Section Arrow and Sample Drawing */}
            <div className="flex-col">
              <div>
                {" "}
                <MoveDown size={40} color="red" strokeWidth={3} />
              </div>

              <div className="image-wrapper-flush">
                <img src={machiningSymbolNoteImg} alt="Machining Symbol Implementation Sample" className="software-screenshot screenshot-wide" />
              </div>

              <div>
                <p>
                  {" "}
                  Note: Machining symbol with open & close parenthesis indicates
                  that the part must be machined before welding. Machining after
                  welding will be impossible.
                </p>
              </div>
            </div>
            <div className="section-divider"></div>{" "}
            {/* a. Machining Surface Condition */}
            <div className="lesson-section">
              {" "}
              <h4> a. Machining Surface Condition </h4>
              <div className="image-wrapper-flush">
                <img src={machiningSurfaceCondImg} alt="Machining Surface Condition Reference Table" className="software-screenshot screenshot-wide" />
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

export default MachiningSymbolLesson;



