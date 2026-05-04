import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

interface HeatTreatmentLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const HeatTreatmentLesson: React.FC<HeatTreatmentLessonProps> = ({
  subLessonId = "2d-heat-treatment-1",
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(subLessonId);

  const heat1Steps = [
    "Heat Treatment Specifications: Review the material and specification table to understand the required thermal processes for each part."
  ];

  const heat2Steps = [
    "Revision Standards: Hardness expressions follow JIS standards. For nitriding, we use specific temps like 480 and 580 degrees to prevent warping.",
    "Process Table: The Heat Treatment Process table details the sequence of operations required for hardening and refining."
  ];

  const heat3Steps = [
    "Process Continuation: Follow the technical data in the process table to ensure correct tempering and quenching parameters."
  ];

  const heat4Steps = [
    "Final Process: Verify the final hardness standards for materials like S50C and S55C, including induction hardening specifications."
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text="HEAT TREATMENT"
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const introTitle = "HEAT TREATMENT";
            const introSubtitle = "Technical specifications for thermal refining and hardening processes used in precision parts.";
            const currentSteps = subLessonId === "2d-heat-treatment-1" ? heat1Steps :
                                subLessonId === "2d-heat-treatment-2" ? heat2Steps :
                                subLessonId === "2d-heat-treatment-3" ? heat3Steps : heat4Steps;
            speak([introTitle, introSubtitle, ...currentSteps]);
          }}
            onStop={stop}
          />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text="Technical specifications for thermal refining and hardening processes used in precision parts."
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {subLessonId === "2d-heat-treatment-1" ? (
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="lesson-table-container">
                  <table className="lesson-table">
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>English (JIS)</th>
                        <th>Japanese (KEM, Style)</th>
                        <th>Rev</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowSpan={8}>S35C, S45C</td>
                        <td>Thermal refining to 35~40 HS</td>
                        <td>素材調質施工 硬度HS35〜40</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>After rough machining thermal refining to 35~40 HS</td>
                        <td>荒削後調質施工 硬度HS35〜40</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>Through hardening to 55~60 HS (Thru)</td>
                        <td>ズブ焼入れ施工 硬度HS55〜60 (無心焼入れ、心部焼入れ)</td>
                        <td className="text-center">Rev1,2</td>
                      </tr>
                      <tr>
                        <td>Induction hardening to 60~65 HS</td>
                        <td>高周波焼入れ施工 硬度HS60〜65</td>
                        <td className="text-center">Rev3</td>
                      </tr>
                      <tr>
                        <td>Salt-bath nitrocarburizing to HV500 UP (Tufttride®, isonite)</td>
                        <td>イソナイト施工 硬度HV500 UP</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Ion nitriding to HV400 UP</td>
                        <td>イオンナイト施工 硬度HV400 UP</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Parsonite construction to HV400 UP</td>
                        <td>パルソナイト施工 硬度HV400 UP</td>
                        <td className="text-center">Rev6</td>
                      </tr>
                      <tr>
                        <td>part(Upper and lower) Laser Hardening Hardness HRC50up (S45C-D)</td>
                        <td>部(上下両面) レーザー焼入れ施工 硬度HRC50up</td>
                        <td></td>
                      </tr>
                      {/* S50C, S55C */}
                      <tr>
                        <td rowSpan={5}>S50C, S55C</td>
                        <td>Thermal refining to 35~40 HS</td>
                        <td>素材調質施工 硬度HS35〜40</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>After rough machining thermal refining to 35~40 HS</td>
                        <td>荒削後調質施工 硬度HS35〜40</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>Through hardening to 60~70 HS (Thru)</td>
                        <td>ズブ焼入れ施工 硬度HS60~70 (無心焼入れ、心部焼入れ)</td>
                        <td className="text-center">Rev10</td>
                      </tr>
                      <tr>
                        <td>Induction hardening to 70~75 HS</td>
                        <td>高周波焼入れ施工 硬度HS70〜75</td>
                        <td className="text-center">Rev10</td>
                      </tr>
                      <tr>
                        <td>Salt-bath nitrocarburizing to HV500 UP (Tufttride®, isonite)</td>
                        <td>イソナイト施工 硬度HV500 UP</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : subLessonId === "2d-heat-treatment-2" ? (
              <div className="flex-col">
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <div className="flex-col" style={{ gap: "0.8rem", marginBottom: "2rem" }}>
                    {[
                      { rev: "Rev2", text: "Expression of hardness" },
                      { rev: "Rev3", text: "KEM Style is the same as usual. Follow JIS for English words" },
                      { rev: "Rev6", text: "It's hard to make warp because parsonite hardening process treatment is done by 480°C. Ion nitriding treatment is done by 580°C." },
                      { rev: "Rev9", text: "Traditionally, the blade of SW is HS78±2." },
                      { rev: "Rev10", text: "We have changed hardness standards of through hardening for S50C and S55C." },
                      { rev: "Rev11", text: "Describe thermal refining hardness for each material. It follows the standard of JIS." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex-row" style={{ gridTemplateColumns: "80px 1fr", gap: "1rem" }}>
                        <span>{item.rev}:</span> <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                  <h4 style={{ marginBottom: "1rem" }}> Heat Treatment Process </h4>
                  <div className="lesson-table-container">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          <th>Kind of Process</th>
                          <th>Indication of Drawing</th>
                          <th>Applicable Material</th>
                          <th>Applicable Hardness</th>
                          <th>Purpose</th>
                          <th>Characteristics</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowSpan={2}>Through Hardening</td>
                          <td rowSpan={2}>ズブ焼入れ施工 硬度HS-</td>
                          <td>S45C</td>
                          <td>HS55〜60</td>
                          <td rowSpan={2}>Cutting Tools, Roller, Spacer, etc.</td>
                          <td rowSpan={2}>
                            <strong>ADVANTAGE:</strong> Good for Anti-Friction and Anti-Fatigue.
                          </td>
                        </tr>
                        <tr>
                          <td>SKD11</td>
                          <td>HS80〜83</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : subLessonId === "2d-heat-treatment-3" ? (
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <h4 style={{ marginBottom: "1rem" }}> Heat Treatment Process (Continued) </h4>
                <div className="lesson-table-container">
                  <table className="lesson-table">
                    <thead>
                      <tr>
                        <th>Kind of Process</th>
                        <th>Indication of Drawing</th>
                        <th>Applicable Material</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Thermal Refining</td>
                        <td>素材調質施工 程度HS-</td>
                        <td>S45C, STKM16A, SNC631</td>
                        <td>Shaft, Roller, Gear, Collar, etc.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : subLessonId === "2d-heat-treatment-4" ? (
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <h4 style={{ marginBottom: "1rem" }}> Heat Treatment Process (Final) </h4>
                <div className="lesson-table-container">
                  <table className="lesson-table">
                    <thead>
                      <tr>
                        <th>Kind of Process</th>
                        <th>Indication of Drawing</th>
                        <th>Applicable Material</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Isonite</td>
                        <td>イソナイト施工 硬度HV-</td>
                        <td>SS400, S45C, SNC631</td>
                        <td>Roller Shaft, Roller, Gear, etc.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatTreatmentLesson;
