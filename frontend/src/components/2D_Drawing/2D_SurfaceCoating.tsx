import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

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
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-surface-coating');

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <style>{`
        .lesson-table {
          table-layout: fixed !important;
          width: 100% !important;
        }
        .lesson-table th, .lesson-table td {
          white-space: normal !important;
          word-break: break-word !important;
        }
      `}</style>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="flex-col tab-content fade-in">

              {/* === Table: Surface Coating Processes === */}
              <div className="instruction-step">
                <div className="lesson-table-container">
                  <table className="lesson-table">
                    <colgroup>
                      <col style={{ width: "14%" }} />
                      <col style={{ width: "23%" }} />
                      <col style={{ width: "16%" }} />
                      <col style={{ width: "16%" }} />
                      <col style={{ width: "32%" }} />
                    </colgroup>
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
                        <td>
                          • S45C<br/>
                          • STKM16A<br/>
                          • SNCM447<br/>
                        </td>
                        <td>
                          • Roller Shaft<br/>
                          • Roller<br/>
                          • Shoe<br/>
                          • etc.
                        </td>
                        <td rowSpan={2}>
                          <strong>ADVANTAGE:</strong><br/>
                          • Good for Anti-corrosion.<br/>
                          • Good for Anti-Friction.<br/>
                          • Good for Decoration.<br/>
                          • Less friction coefficient.<br/>
                          • Hard chromate can coat specific area.<br/><br/>
                          <strong>RECOMMEND:</strong><br/>
                          • After hard chromate, thermal refining, polishing and buffing must done. (Give specific dimension before and after the process.)
                        </td>
                      </tr>
                      <tr>
                        <td>plating thickness (one side over 0.03mm.)</td>
                        <td></td>
                        <td></td>
                      </tr>

                      {/* Chrome Plating */}
                      <tr>
                        <td>Chrome Plating</td>
                        <td>クロームメッキ施工</td>
                        <td>
                          • All material<br/>
                          • Brass material
                        </td>
                        <td>
                          • Handle<br/>
                          • Any tools<br/>
                          • etc.
                        </td>
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
                        <td>
                          • All material<br/>
                          • Brass material
                        </td>
                        <td>
                          • Lever<br/>
                          • Bearing cover<br/>
                          • Name plate<br/>
                          • Reader ring<br/>
                          • etc.
                        </td>
                        <td>
                          <strong>ADVANTAGE:</strong><br/>
                          • Good for Anti-corrosion.<br/>
                          • Good for Decoration.<br/>
                          • Low-cost process<br/><br/>
                          <strong>RECOMMEND:</strong><br/>
                          • Apply before chromate process.<br/>
                          • After the Nickel chromate process no need to check its thickness.<br/><br/>
                          Fitting gap for reader ring must be 0.1~0.2mm.
                        </td>
                      </tr>

                      {/* Colored Plating (Dipping) */}
                      <tr>
                        <td>Colored Plating (Dipping)</td>
                        <td>有色クロメイト施工</td>
                        <td>
                          • All material<br/>
                          • Brass material
                        </td>
                        <td>
                          • Electrical Bracket<br/>
                          • Any tools<br/>
                          • etc.
                        </td>
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

              {/* === b. Special Notes === */}
              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">b</span>
                  <span className="step-label">Special Notes</span>
                </div>
                <div className="step-description">
                  <img src={specialNotesImg} alt="Special Notes Interface" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              {/* === c. Copy / Move === */}
              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">c</span>
                  <span className="step-label">Copy / Move</span>
                </div>
                <div className="step-description">
                  <img src={copyMoveImg} alt="Copy Move Commands" className="software-screenshot screenshot-wide" />
                  <div className="instruction-box mt-6">
                    <p className="p-flush" style={{ marginBottom: "0.75rem" }}>
                      Copy and move has the same procedure. The only difference is that copy will multiply its quantity while move will only change location.
                    </p>
                    <p className="p-flush">1. Click copy command. Click P1 then "GO".</p>
                    <p className="p-flush">2. Click P2 for reference.</p>
                    <p className="p-flush">3. Click P3 for the new location of entity.</p>
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

export default SurfaceCoatingLesson;
