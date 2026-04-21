import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight, MoveDown } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Welding Symbol and Notes */

import weldingSymbolMainImg from "../../assets/2D_Image_File/2D_welding_symbol.png";

import weldingSymbolNotesImg from "../../assets/2D_Image_File/2D_welding_symbol_notes.jpg";

import standardNotesImg from "../../assets/2D_Image_File/2D_welding_symbol_standard_notes.jpg";

interface WeldingSymbolLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const WeldingSymbolLesson: React.FC<WeldingSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const weldingSteps = [
    "Welding Symbols: Before adding a symbol, apply welding hatches as a visual representation. The arrow line acts as your welding torch. Keep leg lengths at sixty percent of the thinner plate thickness unless the design specifies otherwise.",
    "Standard Notes: These are located in the upper left corner. They cover mandatory requirements like chamfering holes, deburring corners, and ensuring parts are free from dust. While the tapping note can be removed if not needed, text properties must never be altered."
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
          Welding Symbol /
          Notes
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(weldingSteps)}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Procedures for applying welding symbols, hatches, and standard notes
          to ensure fabrication accuracy and technical compliance.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {" "}
            {/* 13. Welding Symbol Section */}
            <div id="welding-symbol-section">
              <div className="step-header" style={{ marginBottom: "2rem" }}>
                <span className="step-number">13.</span>
                <span className="step-label">Welding Symbol</span>
              </div>
              <div className="flex-col">
                <div>
                  <img src={weldingSymbolMainImg} alt="Welding Symbol Menu Selection" className="software-screenshot screenshot-wide" />
                </div>
              </div>


              <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <img src={weldingSymbolNotesImg} alt="Welding Hatches and Symbol Sample Drawing" className="software-screenshot screenshot-wide" />
              </div>
              <div>
                <div className="info-box">
                  <span style={{ marginTop: "0rem", marginBottom: "0rem" }}>
                    {" "}
                    ※ Before indicating the welding symbol on the drawing,
                    welding hatches shall be put up first as representation of
                    welding on actual fabrication.
                    <br /> ※ Select and put all the required details for welding
                    on the dialog box, then click OK. Place it together with
                    welding hatch.
                  </span>

                  <div>
                    <p style={{ marginTop: "1rem" }}>
                      <strong className="red-text" > Notes:</strong>
                      <br /> 1. Arrow line acts as a welding torch on the actual
                      job.
                      <br /> 2. The leg length of the welding is 60% of plate
                      thickness (thinner side) unless specified.
                      <br /> 3. Welding hatches is not necessarily applicable in
                      all parts; there are some instances that the detail is too
                      small, so it is no need to put hatches anymore.
                      <br /> 4. Welding hatch in hidden area is not necessary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-divider"></div>
            {/* 14. Notes Section */}
            <div id="notes-section">
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">14.</span>
                <span className="step-label">Notes</span>
              </div>
              <p className="p-flush" style={{ marginBottom: "1rem" }}>
                Notes are always located in the upper left corner of the
                template.
              </p>

              <div className="lesson-section">
                <div className="step-header" style={{ marginBottom: "2rem", marginLeft: "3rem" }}>
                  <span className="step-number">a.</span>
                  <span className="step-label">Standard Notes</span>
                </div>
                <div className="flex-row">
                  <div>
                    <img src={standardNotesImg} alt="Standard Notes location in Title Block" className="software-screenshot screenshot-wide" />
                  </div>

                  <div className="info-box">
                    <div>
                      <p className="red-text" style={{ marginTop: "1rem", marginBottom: "0.5rem" }}><strong>Standard notes:</strong></p>
                      <p>
                        1. Tap, drill hole shall be chamfered finish.
                        <br /> 2. Corner without any instruction shall be
                        slightly chamfer.
                        <br /> 3. When completed, burrs and dust must not exist.
                      </p>
                    </div>

                    <div>
                      <p className="red-text" style={{ marginTop: "1rem", marginBottom: "0.5rem" }}><strong>Notes:</strong></p>

                      <p style={{ fontStyle: "italic" }}>
                        1. These three standard notes automatically appear from
                        the beginning while selecting the template.
                        <br /> 2. First line can be eliminated if tapping hole
                        and drill hole are not present on the drawing.
                        <br /> 3. Text properties are not allowed to change.
                        <br /> 4. It is place under the special notes.
                      </p>
                    </div>
                  </div>
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
    </div >
  );
};

export default WeldingSymbolLesson;



