import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Surface Coating */



import specialNotesImg from "../../assets/2D_Image_File/2D_surface_coating_special_notes.png";

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
              <div className="lesson-table-container">
                <table className="lesson-table">
                  <thead>
                    <tr>
                      <th>Kind of Process</th>
                      <th>Indication of Drawing</th>
                      <th>Applicable Material</th>
                      <th>Purpose</th>
                      <th>Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Hard Chromate */}
                    <tr>
                      <td rowSpan={2}>Hard Chromate</td>
                      <td>硬質クロームメッキ施工</td>
                      <td rowSpan={2}>S45C, STKM16A, SNCM447, etc.</td>
                      <td rowSpan={2}>Roller Shaft, Shaft, Shoe, etc.</td>
                      <td rowSpan={2}>
                        <strong>ADVANTAGE:</strong><br/>
                        • Good for Anti-corrosion.<br/>
                        • Good for Anti-Friction.<br/>
                        • Good for Decoration.<br/>
                        • Less friction coefficient.<br/>
                        • Hard chromate can coat specific area.<br/><br/>
                        <strong>RECOMMEND:</strong><br/>
                        • After hard chromate, thermal refining, polishing and buffing must done. (Give specific dimension before and after the process.
                      </td>
                    </tr>
                    <tr>
                      <td>plating thickness (one side over 0.03mm.)</td>
                    </tr>

                    {/* Chrome Plating */}
                    <tr>
                      <td>Chrome Plating</td>
                      <td>クロームメッキ施工</td>
                      <td>All material, Brass material, etc.</td>
                      <td>Handle, Any tools, etc.</td>
                      <td>
                        <strong>ADVANTAGE:</strong><br/>
                        • Good for Anti-corrosion.<br/>
                        • Good for decoration.
                      </td>
                    </tr>

                    {/* Nickel Plating */}
                    <tr>
                      <td>Nickel Plating</td>
                      <td>ニッケルメッキ施工</td>
                      <td>All material, Brass material, etc.</td>
                      <td>Lever, Bearing cover, Name plate, Reader ring, etc.</td>
                      <td>
                        <strong>ADVANTAGE:</strong><br/>
                        • Good for Anti-corrosion.<br/>
                        • Good for decoration.<br/>
                        • Low-cost process<br/><br/>
                        <strong>RECOMMEND:</strong><br/>
                        • Apply before chromate process.<br/>
                        • After the Nickel chromate process no ned to check its thickness.<br/>
                        • Fitting gap for reade ring must be 0.1~0.2mm.
                      </td>
                    </tr>

                    {/* Colored Plating */}
                    <tr>
                      <td>Colored Plating (Dipping)</td>
                      <td>有色クロメイト施工</td>
                      <td>All material, Brass matrial, etc.</td>
                      <td>Electrical Bracket, Any tools, etc.</td>
                      <td>
                        <strong>ADVANTAGE:</strong><br/>
                        • Good for Anti-corrosion.<br/>
                        • Low-cost process.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="section-divider"></div>{" "}
            {/* b. Special Notes Section */}
            <div className="lesson-section">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">b.</span>
                <span className="step-label">Special Notes</span>
              </div>
              <div>
                <div>
                  <img src={specialNotesImg} alt="Special Notes location in Drawing Template" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>{" "}
            {/* c. Copy / Move Section */}
            <div className="lesson-section">
              <div className="step-header" style={{ marginBottom: "2rem" }}>
                <span className="step-number">c.</span>
                <span className="step-label">Copy / Move</span>
              </div>
              <div>
                <div style={{ marginBottom: "2rem" }}>
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



