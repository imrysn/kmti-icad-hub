import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

interface HeatTreatmentLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const HeatTreatmentLesson: React.FC<HeatTreatmentLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: '1', label: 'Materials' },
    { id: '2', label: 'Standards' },
    { id: '3', label: 'Refining' },
    { id: '4', label: 'Final Processes' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-heat-treatment-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-heat-treatment-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-heat-treatment-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = () => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-heat-treatment-1': {
      title: 'HEAT TREATMENT',
      subtitle: 'Technical specifications for thermal refining and hardening processes used in precision parts.',
      steps: [
        "Heat Treatment Specifications: Review the material and specification table to understand the required thermal processes for each part."
      ]
    },
    '2d-heat-treatment-2': {
      title: 'HEAT TREATMENT',
      subtitle: 'Technical specifications for thermal refining and hardening processes used in precision parts.',
      steps: [
        "Revision Standards: Hardness expressions follow JIS standards. For nitriding, we use specific temps like 480 and 580 degrees to prevent warping.",
        "Process Table: The Heat Treatment Process table details the sequence of operations required for hardening and refining."
      ]
    },
    '2d-heat-treatment-3': {
      title: 'HEAT TREATMENT',
      subtitle: 'Technical specifications for thermal refining and hardening processes used in precision parts.',
      steps: [
        "Process Continuation: Follow the technical data in the process table to ensure correct tempering and quenching parameters."
      ]
    },
    '2d-heat-treatment-4': {
      title: 'HEAT TREATMENT',
      subtitle: 'Technical specifications for thermal refining and hardening processes used in precision parts.',
      steps: [
        "Final Process: Verify the final hardness standards for materials like S50C and S55C, including induction hardening specifications."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-heat-treatment-${activeTab}`] || LESSON_DATA['2d-heat-treatment-1'];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="card-header">
              <KaraokeLessonText
                as="h4"
                className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                data-reading-index="0"
                text={currentLesson.title}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              <ReadAloudButton 
                isSpeaking={isSpeaking} 
                onStart={() => speak([currentLesson.title, currentLesson.subtitle, ...currentLesson.steps])}
                onStop={stop}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <KaraokeLessonText
                className="p-flush"
                text={currentLesson.subtitle}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Material & Specification Standards"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
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
                            <td>Salt-bath nitrocarburizing to HV500 UP</td>
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
                            <td>Laser Hardening HRC50up (S45C-D)</td>
                            <td>部(上下両面) レーザー焼入れ施工 硬度HRC50up</td>
                            <td></td>
                          </tr>
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
                            <td>Salt-bath nitrocarburizing to HV500 UP</td>
                            <td>イソナイト施工 硬度HV500 UP</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Technical Revision Standards"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="flex-col gap-4 mt-4">
                        {[
                          { rev: "Rev2", text: "Expression of hardness" },
                          { rev: "Rev3", text: "KEM Style is the same as usual. Follow JIS for English words" },
                          { rev: "Rev6", text: "Parsonite hardening process treatment is done by 480°C. Ion nitriding treatment is done by 580°C." },
                          { rev: "Rev9", text: "Traditionally, the blade of SW is HS78±2." },
                          { rev: "Rev10", text: "Changed hardness standards of through hardening for S50C and S55C." },
                          { rev: "Rev11", text: "Describe thermal refining hardness for each material. Follows the standard of JIS." }
                        ].map((item, idx) => (
                          <div key={idx} className="flex-row items-baseline gap-4">
                            <span className="red-text font-bold" style={{ minWidth: "60px" }}>{item.rev}:</span> 
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Heat Treatment Process Table"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="lesson-table-container">
                        <table className="lesson-table">
                          <thead>
                            <tr>
                              <th>Kind of Process</th>
                              <th>Indication of Drawing</th>
                              <th>Material</th>
                              <th>Hardness</th>
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
                              <td rowSpan={2}><strong>ADVANTAGE:</strong> Good for Anti-Friction and Anti-Fatigue.</td>
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
                </div>
              )}

              {activeTab === '3' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Process Continuation"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <div className="lesson-table-container">
                      <table className="lesson-table">
                        <thead>
                          <tr>
                            <th>Kind of Process</th>
                            <th>Indication of Drawing</th>
                            <th>Material</th>
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
                </div>
              )}

              {activeTab === '4' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Final Refining Processes"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <div className="lesson-table-container">
                      <table className="lesson-table">
                        <thead>
                          <tr>
                            <th>Kind of Process</th>
                            <th>Indication of Drawing</th>
                            <th>Material</th>
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
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatTreatmentLesson;
