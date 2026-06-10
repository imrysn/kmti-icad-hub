import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

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
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-welding-symbol');

  const weldingSteps = [

  ];

  const currentTitle = "WELDING SYMBOL / NOTES";
  const currentSubtitle = "Procedures for applying welding symbols, hatches, and standard notes.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">13</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Welding Symbol"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="flex-col gap-4">
                  <img src={weldingSymbolMainImg} alt="Welding Symbol Menu" className="software-screenshot screenshot-wide" />
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px', border: '1px solid red', padding: '1rem', backgroundColor: 'var(--bg-card, #fff)', color: 'var(--text-primary, #333)', fontSize: '0.95rem', borderRadius: '4px' }}>
                      <p style={{ marginBottom: '1rem' }}>※ Before indicating the welding symbol on the drawing, welding hatches shall be put up first as representation of welding on actual fabrication.</p>
                      <p style={{ marginBottom: '1rem' }}>※ Select and put all the required details for welding on the dialog box, then click OK. Place it together with welding hatch.</p>
                      <div style={{ color: 'red', fontStyle: 'italic' }}>
                        <p style={{ fontWeight: 'bold', fontStyle: 'normal', marginBottom: '0.25rem' }}>Notes:</p>
                        <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <li>Arrow line acts as a welding torch on the actual job.</li>
                          <li>The leg length of the welding is 60% of plate thickness (thinner side) unless specified.</li>
                          <li>Welding hatches is not necessarily applicable in all parts; there are some instances that the detail is too small, so it is no need to put hatches anymore.</li>
                          <li>Welding hatch in hidden area is not necessary.</li>
                        </ol>
                      </div>
                    </div>
                    <img src={weldingSymbolNotesImg} alt="Welding Hatches Detail" className="software-screenshot screenshot-medium" style={{ flex: 1, minWidth: '300px' }} />
                  </div>
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">

              <div className="step-description">
                <div className="flex-col gap-4">
                  <div className="step-header">
                    <span className="step-number">14</span>
                    <span className="step-label">Notes</span>
                  </div>
                  <p className="p-flush">Notes are always located in the upper left corner of the template.</p>
                  <div className="step-header" style={{ marginLeft: "3rem" }}>
                    <span className="step-number">a</span>
                    <span className="step-label">Standard Notes</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <img src={standardNotesImg} alt="Standard Notes Placement" className="software-screenshot screenshot-medium" style={{ flex: 1, minWidth: '300px' }} />
                    <div style={{ flex: 1, minWidth: '300px', border: '1px solid red', padding: '1rem', backgroundColor: 'var(--bg-card, #fff)', color: 'var(--text-primary, #333)', fontSize: '0.95rem', borderRadius: '8px' }}>
                      <div style={{ color: 'red' }}>
                        <p style={{ marginBottom: '0.5rem' }}>Standard notes:</p>
                        <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'var(--text-primary, #fff' }}>
                          <li>Tap, drill hole shall be chamfered finish.</li>
                          <li>Corner without any instruction shall be slightly chamfer.</li>
                          <li>When completed, burrs and dust must not exist.</li>
                        </ol>

                        <p style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>Notes:</p>
                        <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontStyle: 'italic' }}>
                          <li>These three standard notes automatically appear from the beginning while selecting the template.</li>
                          <li>First line can be eliminated if tapping hole and drill hole are not present on the drawing.</li>
                          <li>Text properties are not allowed to change.</li>
                          <li>It is place under the special notes.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeldingSymbolLesson;
