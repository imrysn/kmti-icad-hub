import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";

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
    { id: '1', label: 'Material' },
    { id: '2', label: 'Heat Treatment Process' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-heat-treatment-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-heat-treatment-${activeTab}`);

  const LESSON_DATA = {
    '1': {
      title: 'HEAT TREATMENT MATERIAL STANDARDS',
      subtitle: 'JIS and KEMCO standard styles for material thermal refining and hardening.',
      steps: [
        "Review the S35C, S45C, S50C, S55C, SCM435, and SCM440 standards in the table for hardness and revisions."
      ]
    },
    '2': {
      title: 'HEAT TREATMENT PROCESS STANDARDS',
      subtitle: 'Review kind of process, indication of drawing, applicable material and hardness, purpose, and characteristics.',
      steps: [
        "Review Through Hardening, Vacuum Hardening, Thermal Refining, Annealing, Induction Hardening, QPQ, and other processes."
      ]
    }
  };

  const currentLesson = LESSON_DATA[activeTab as '1' | '2'];

  const currentTabSteps = [
    currentLesson.title,
    currentLesson.subtitle,
    ...currentLesson.steps
  ];

  const tabsList = TABS.map(t => ({ id: t.id }));

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [activeTab, registerText]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const idx = TABS.findIndex(tab => tab.id === activeTab);
    if (idx < TABS.length - 1) {
      setActiveTab(TABS[idx + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const idx = TABS.findIndex(tab => tab.id === activeTab);
    if (idx > 0) {
      setActiveTab(TABS[idx - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    0
  );

  useEffect(() => {
    localStorage.setItem('2d-heat-treatment-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

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
            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className="instruction-step">
                  <div className={`lesson-table-container ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                    <table className="lesson-table">
                      <colgroup>
                        <col style={{ width: "18%" }} />
                        <col style={{ width: "36%" }} />
                        <col style={{ width: "36%" }} />
                        <col style={{ width: "10%" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Material</th>
                          <th>English (JIS)</th>
                          <th>Japanese (KEM. Style)</th>
                          <th>Rev</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* S35C, S45C */}
                        <tr>
                          <td rowSpan={8}>S35C, S45C</td>
                          <td>Thermal refining to 35~40 HS</td>
                          <td>素材調質施工 硬度HS35〜40</td>
                          <td>Rev11</td>
                        </tr>
                        <tr><td>After rough machining thermal refining to 35~40 HS</td><td>荒削後調質施工 硬度HS35〜40</td><td>Rev11</td></tr>
                        <tr><td>Through hardening to 55~60 HS (Thru)</td><td>ズブ焼入レ施工 硬度HS55〜60 (無心焼入れ、心部焼入れ)</td><td>Rev1,2</td></tr>
                        <tr><td>Induction hardening to 60~65 HS</td><td>高周波焼入レ施工 硬度HS60〜65</td><td>Rev3</td></tr>
                        <tr><td>Salt-bath nitrocarburizing to HV500 UP (Tufftride®, isonite)</td><td>イソナイト施工 硬度HV500 UP</td><td></td></tr>
                        <tr><td>Ion nitriding to HV400 UP</td><td>イオンナイト施工 硬度HV400 UP</td><td></td></tr>
                        <tr><td>Parsonite construction to HV400 UP</td><td>パルソナイト施工 硬度HV400 UP</td><td>Rev6</td></tr>
                        <tr><td>part(Upper and lower) Laser Hardening Hardness HRC50up (S45C-D)</td><td>歯(上下両面)レーザー焼入レ施工 硬度HRC50up</td><td></td></tr>
                        
                        {/* S50C, S55C */}
                        <tr>
                          <td rowSpan={5}>S50C, S55C</td>
                          <td>Thermal refining to 35~40 HS</td>
                          <td>素材調質施工 硬度HS35〜40</td>
                          <td>Rev11</td>
                        </tr>
                        <tr><td>After rough machining thermal refining to 35~40 HS</td><td>荒削後調質施工 硬度HS35〜40</td><td>Rev11</td></tr>
                        <tr><td>Through hardening to 60~70 HS (Thru)</td><td>ズブ焼入レ施工 硬度HS60〜70 (無心焼入れ、心部焼入れ)</td><td>Rev10</td></tr>
                        <tr><td>Induction hardening to 70~75HS</td><td>高周波焼入レ施工 硬度HS70〜75</td><td>Rev10</td></tr>
                        <tr><td>Salt-bath nitrocarburizing to HV500 UP (Tufftride®, isonite)</td><td>イソナイト施工 硬度HV500 UP</td><td></td></tr>

                        {/* SCM435 */}
                        <tr>
                          <td rowSpan={5}>SCM435</td>
                          <td>Thermal refining to 42~48 HS</td>
                          <td>素材調質施工 硬度HS42〜48</td>
                          <td>Rev11</td>
                        </tr>
                        <tr><td>After rough machining thermal refining to 42~48 HS</td><td>荒削後調質施工 硬度HS42〜48</td><td>Rev11</td></tr>
                        <tr><td>Salt-bath nitrocarburizing to HV800 UP (Tufftride®, isonite)</td><td>イソナイト施工 硬度HV800 UP</td><td>Rev9</td></tr>
                        <tr><td>Parsonite construction to HV500 UP</td><td>パルソナイト施工 硬度HV500 UP</td><td>Rev9</td></tr>
                        <tr><td>Ion nitriding to HV700 UP</td><td>イオンナイト施工 硬度HV700 UP</td><td></td></tr>

                        {/* SCM440 */}
                        <tr>
                          <td rowSpan={8}>SCM440</td>
                          <td>Thermal refining to 42~48 HS</td>
                          <td>素材調質施工 硬度HS42〜48</td>
                          <td>Rev11</td>
                        </tr>
                        <tr><td>After rough machining thermal refining to 42~48 HS</td><td>荒削後調質施工 硬度HS42〜48</td><td>Rev11</td></tr>
                        <tr><td>Induction hardening to 70~75 HS</td><td>高周波焼入レ施工 硬度HS70〜75</td><td>Rev9</td></tr>
                        <tr><td>Salt-bath nitrocarburizing to HV600 UP (Tufftride®, isonite)</td><td>イソナイト施工 硬度HV600 UP</td><td>Rev9</td></tr>
                        <tr><td>Ion nitriding to HV700 UP</td><td>イオンナイト施工 硬度HV700 UP</td><td></td></tr>
                        <tr><td>(Treatment for gear instead of induction hardening)</td><td>(高周波焼入れに代わるギヤ用処理)</td><td>Rev8</td></tr>
                        <tr><td>Ion nitriding to HV 550 to 650 Processing time 40 h Nitrided layer depth 0.5 mm or more</td><td>イオンナイト施工 硬度HV550〜650 処理時間 40h 窒化層深さ 0.5mm以上</td><td></td></tr>
                        <tr><td>Parsonite construction to HV500 UP</td><td>パルソナイト施工 硬度HV500 UP</td><td>Rev9</td></tr>

                        {/* SKD11 */}
                        <tr>
                          <td rowSpan={3}>SKD11</td>
                          <td>Through hardening to 80~83 HS (Thru)</td>
                          <td>ズブ焼入レ施工 硬度HS80〜83 (無心焼入れ、心部焼入れ)</td>
                          <td>Rev2</td>
                        </tr>
                        <tr><td>Vacuum hardening to 80~83 HS</td><td>真空焼入レ施工 硬度HS80〜83</td><td>Rev2</td></tr>
                        <tr><td>Vacuum hardening to 78±2 HS (for SW BLADE)</td><td>真空焼入レ施工 硬度HS78±2 (対象SW刃物)</td><td>Rev9</td></tr>

                        {/* SKH51 */}
                        <tr>
                          <td>SKH51</td>
                          <td>Through hardening to 80~83 HS</td>
                          <td>ズブ焼入レ施工 硬度HS80〜83</td>
                          <td></td>
                        </tr>

                        {/* SNC631 */}
                        <tr>
                          <td rowSpan={4}>SNC631</td>
                          <td>Thermal refining to 38~44 HS</td>
                          <td>素材調質施工 硬度HS38〜44</td>
                          <td>Rev11</td>
                        </tr>
                        <tr><td>After rough machining thermal refining to 38~44 HS</td><td>荒削後調質施工 硬度HS38〜44</td><td>Rev11</td></tr>
                        <tr><td>Induction hardening to 68~75 HS</td><td>高周波焼入レ施工 硬度HS68〜75</td><td></td></tr>
                        <tr><td>Salt-bath nitrocarburizing to HV600 UP (Tufftride®, isonite)</td><td>イソナイト施工 硬度HV600 UP</td><td></td></tr>

                        {/* SNCM439 */}
                        <tr>
                          <td rowSpan={3}>SNCM439</td>
                          <td>Thermal refining to 44~50 HS</td>
                          <td>素材調質施工 硬度HS44〜50</td>
                          <td>Rev11</td>
                        </tr>
                        <tr><td>After rough machining thermal refining to 44~50 HS</td><td>荒削後調質施工 硬度HS44〜50</td><td>Rev11</td></tr>
                        <tr><td>Salt-bath nitrocarburizing to HV600 UP (Tufftride®, isonite)</td><td>イソナイト施工 硬度HV600 UP</td><td></td></tr>

                        {/* SNCM447 */}
                        <tr>
                          <td rowSpan={4}>SNCM447</td>
                          <td>Thermal refining to 44~50 HS</td>
                          <td>素材調質施工 硬度HS44〜50</td>
                          <td>Rev11</td>
                        </tr>
                        <tr><td>After rough machining thermal refining to 44~50 HS</td><td>荒削後調質施工 硬度HS44〜50</td><td>Rev11</td></tr>
                        <tr><td>Salt-bath nitrocarburizing to HV700 UP (Tufftride®, isonite)</td><td>イソナイト施工 硬度HV700 UP</td><td></td></tr>
                        <tr><td>Induction hardening to 70~85HS</td><td>高周波焼入レ施工 硬度HS70〜85</td><td></td></tr>

                        {/* FCD500 */}
                        <tr>
                          <td>FCD500</td>
                          <td>Salt-bath nitrocarburizing to HV600 UP (Tufftride®, isonite)</td>
                          <td>イソナイト施工 硬度HV600 UP</td>
                          <td></td>
                        </tr>

                        {/* SS400 */}
                        <tr>
                          <td rowSpan={2}>SS400</td>
                          <td>Salt-bath nitrocarburizing to HV400 UP (Tufftride®, isonite)</td>
                          <td>イソナイト施工 硬度HV400 UP</td>
                          <td></td>
                        </tr>
                        <tr><td>Parsonite construction to HV300 UP</td><td>パルソナイト施工 硬度HV300 UP</td><td>Rev6</td></tr>

                        {/* STKM16A */}
                        <tr>
                          <td rowSpan={3}>STKM16A</td>
                          <td>Thermal refining to 35~40 HS</td>
                          <td>素材調質施工 硬度HS35〜40</td>
                          <td></td>
                        </tr>
                        <tr><td>Induction hardening to 60~65 HS</td><td>高周波焼入レ施工 硬度HS60〜65</td><td></td></tr>
                        <tr><td>Salt-bath nitrocarburizing to HV500 UP (Tufftride®, isonite)</td><td>イソナイト施工 硬度HV500 UP</td><td></td></tr>

                        {/* SUJ2 */}
                        <tr>
                          <td rowSpan={3}>SUJ2</td>
                          <td>Thermal refining to 35~45 HS</td>
                          <td>素材調質施工 硬度HS35〜45</td>
                          <td></td>
                        </tr>
                        <tr><td>Through hardening to 75~80 HS (Thru)</td><td>ズブ焼入レ施工 硬度HS75〜80 (無心焼入れ、心部焼入れ)</td><td>Rev9</td></tr>
                        <tr><td>Induction hardening to 75~80 HS</td><td>高周波焼入レ施工 硬度HS75〜80</td><td>Rev2,4</td></tr>

                        {/* SUS304 */}
                        <tr>
                          <td>SUS304</td>
                          <td>Ion nitriding to HV1000 UP</td>
                          <td>イオンナイト施工 硬度HV1000 UP</td><td>Rev6</td>
                        </tr>

                        {/* Gear Cutting */}
                        <tr>
                          <td rowSpan={2}>Material for Gear Cutting</td>
                          <td>Thermal refining to 35~38 HS</td>
                          <td>素材調質施工 硬度HS35〜38</td><td></td>
                        </tr>
                        <tr><td>After rough machining thermal refining to 35~38 HS</td><td>荒削後調質施工 硬度HS35〜38</td><td>Rev11</td></tr>

                        {/* Without Specific Material */}
                        <tr>
                          <td rowSpan={6}>Heat treatment without specific material</td>
                          <td>Annealing</td>
                          <td>焼鈍施工</td><td></td>
                        </tr>
                        <tr><td>After rough machining Annealing</td><td>荒削後焼鈍施工</td><td></td></tr>
                        <tr><td>Annealing and shot blasting</td><td>焼鈍ショットブラスト施工</td><td></td></tr>
                        <tr><td>Sulphonitridrig to HV500 UP</td><td>浸硫窒化 施工 硬度HV500 UP</td><td></td></tr>
                        <tr><td>Manganese phosphate film processing construction</td><td>リン酸マンガン液膜処理</td><td></td></tr>
                        <tr><td>Normalizing</td><td>焼戻し温度 600℃以上のこと</td><td></td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8">
                    {[
                      { rev: "Rev2", text: "Expression of hardness" },
                      { rev: "Rev3", text: "KEM Style is the same as usual. Follow JIS for English words" },
                      { rev: "Rev6", text: "It's hard to make warp because parsonite hardening process treatment is done by 480°C. Ion nitriding treatment is done by 580°C. We set HV400 and HV300 to cut treatment time to avoid a warp." },
                      { rev: "Rev9", text: "Traditionally, the blade of SW is HS78±2, and results of checking hardness is 78 or 79. Also, there is no report about performance, so we keep this hardness standard." },
                      { rev: "Rev10", text: "We have changed hardness standards of through hardening for S50C and S55C and induction hardening." },
                      { rev: "Rev11", text: "Describe thermal refining hardness for each material. It follows the standard of JIS." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex-row" style={{ marginBottom: "0.25rem", alignItems: "flex-start" }}>
                        <span className="red-text font-bold">{item.rev}:</span> 
                        <span style={{ lineHeight: "1.5" }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className="flex-col">
                  <div className={`lesson-table-container ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                    <table className="lesson-table">
                      <colgroup>
                        <col style={{ width: "14%" }} />
                        <col style={{ width: "18%" }} />
                        <col style={{ width: "14%" }} />
                        <col style={{ width: "14%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "25%" }} />
                      </colgroup>
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
                        {/* Through Hardening */}
                        <tr>
                          <td rowSpan={4}>Through Hardening</td>
                          <td rowSpan={4}>ズブ焼入レ施工 硬度HS-</td>
                          <td>• S45C</td>
                          <td>• HS55〜60</td>
                          <td rowSpan={4}>• Cutting Tools<br/>• Roller<br/>• Spacer<br/>• etc.</td>
                          <td rowSpan={4}>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • Cost is Cheaper, because it's process is simple.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • To achieve more accuracy it will be needed additional process such as polishing, buffing, grinding or etc.
                          </td>
                        </tr>
                        <tr><td>• SKD11</td><td>• HS80〜83</td></tr>
                        <tr><td>• SKH51</td><td>• HS80〜83</td></tr>
                        <tr><td>• etc.</td><td></td></tr>

                        {/* Vacuum Hardening */}
                        <tr>
                          <td>Vacuum Hardening</td>
                          <td>真空焼入レ施工 硬度HS-</td>
                          <td>• SKD11</td>
                          <td>• HS80〜83</td>
                          <td>• Roller<br/>• Plug Head (DF Machine)</td>
                          <td>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • After hardening, less deformation will produce.<br/>
                            • No oxidation left after hardening, additional process will not be needed.
                          </td>
                        </tr>

                        {/* Thermal Refining */}
                        <tr>
                          <td rowSpan={7}>Thermal Refining</td>
                          <td>素材調質施工 硬度HS-</td>
                          <td>• S45C</td>
                          <td rowSpan={7}>
                            • All material - HS35〜40<br/>
                            (Expect for Roller shaft it is need to increase the temperature up to HS44〜50°)
                          </td>
                          <td rowSpan={7}>• Shaft<br/>• Roller<br/>• Gear<br/>• Collar<br/>• etc.</td>
                          <td rowSpan={7}>
                            <strong>ADVANTAGE:</strong><br/>
                            • It stabilize the composition of material.<br/>
                            • It reduces the deformation after hardening.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Thermal refining is applicable to other heat treatment, except those two-Through Hardening and Vacuum Hardening.
                          </td>
                        </tr>
                        <tr><td>荒削後調質施工 硬度HS-</td><td>• STKM16A</td></tr>
                        <tr><td></td><td>• SNC631</td></tr>
                        <tr><td></td><td>• SNCM447</td></tr>
                        <tr><td></td><td>• SUJ2</td></tr>
                        <tr><td></td><td>• etc.</td></tr>
                        <tr><td></td><td></td></tr>

                        {/* Annealing */}
                        <tr>
                          <td rowSpan={3}>Annealing</td>
                          <td>焼鈍施工</td>
                          <td>• SS400</td>
                          <td></td>
                          <td rowSpan={3}>• Welded Structure<br/>• Forge Material<br/>• etc.</td>
                          <td rowSpan={3}>
                            <strong>ADVANTAGE:</strong><br/>
                            <strong>Annealing</strong><br/>
                            • Good to remove the material stress.<br/>
                            <strong>Annealing shotblast</strong><br/>
                            • Good to remove slugs. (Good for painting parts)<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Generally, shotblast will be done except for small and urgent parts.
                          </td>
                        </tr>
                        <tr><td>焼鈍ショットブラスト施工</td><td>• SC420</td><td></td></tr>
                        <tr><td></td><td>• etc.</td><td></td></tr>

                        {/* Induction Hardening */}
                        <tr>
                          <td rowSpan={7}>Induction Hardening</td>
                          <td rowSpan={6}>高周波焼入レ施工 硬度HS-</td>
                          <td>• S45C</td>
                          <td>• HS60〜65</td>
                          <td rowSpan={7}>• Roller Shaft<br/>• Roller<br/>• Gear<br/>• Shaft<br/>• Collar<br/>• Pin<br/>• Slide Shoe<br/>• etc.</td>
                          <td rowSpan={7}>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • It is possible to harden specific area.<br/>
                            • Can achieve more require hardened than others.<br/>
                            • Process can be done by short period of time.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Before induction hardening, thermal refining must be done first.<br/><br/>
                            • To achieve more accuracy it will be needing additional process such as polishing, grinding or etc.<br/><br/>
                            • Hardened area must be clarified.
                          </td>
                        </tr>
                        <tr><td>• STKM16A</td><td>• HS60〜65</td></tr>
                        <tr><td>• SNC631</td><td>• HS68〜75</td></tr>
                        <tr><td>• SNCM447</td><td>• HS70〜85</td></tr>
                        <tr><td>• SUJ2</td><td>• HS75〜80</td></tr>
                        <tr>
                          <td>• etc.</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>(Without any notes before polishing or grinding, hardening depths must be 1mm.)</td>
                          <td></td>
                          <td></td>
                        </tr>

                        {/* QPQ */}
                        <tr>
                          <td>QPQ (Quench Polish Quench)</td>
                          <td>QPQ施工</td>
                          <td>• SS400<br/>• S45C<br/>• etc.</td>
                          <td></td>
                          <td>• Shaft<br/>• Head cover for cylinder<br/>• etc.</td>
                          <td>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Corrosion.<br/>
                            • Good for Decoration.
                          </td>
                        </tr>

                        {/* PLU-1A */}
                        <tr>
                          <td>PLU-1A</td>
                          <td>PLU-1A施工</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <strong>RECOMMEND:</strong><br/>
                            • However, it is not applicable to use with Isonite.
                          </td>
                        </tr>

                        {/* Isonite */}
                        <tr>
                          <td rowSpan={10}>Isonite</td>
                          <td rowSpan={9}>イソナイト施工 硬度HV-</td>
                          <td>• SS400</td>
                          <td>• HV400UP</td>
                          <td rowSpan={10}>• Roller Shaft<br/>• Roller<br/>• Gear<br/>• Shaft<br/>• Collar<br/>• Pin<br/>• Slide Shoe<br/>• etc.</td>
                          <td rowSpan={10}>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • Good for Anti-Fitting.<br/>
                            • Good for Anti-Heat.<br/>
                            • Good for Anti-Corrosion. (equivalent as martensite SUS)<br/>
                            • Less friction coefficient.<br/><br/>
                            • Less deformation, because its processing temperature lessens 570°.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Before Isonite, thermal refining 650° must be done first.
                          </td>
                        </tr>
                        <tr><td>• SC410</td><td>• HV450UP</td></tr>
                        <tr><td>• S45C</td><td>• HV500UP</td></tr>
                        <tr><td>• STKM16A</td><td>• HV500UP</td></tr>
                        <tr><td>• SNC631</td><td>• HV600UP</td></tr>
                        <tr><td>• SNCM447</td><td>• HV600UP</td></tr>
                        <tr><td>• SCM430</td><td>• HV600UP</td></tr>
                        <tr><td>• SACM645</td><td>• HV900UP</td></tr>
                        <tr><td>• etc.</td><td></td></tr>
                        <tr>
                          <td>(Hardening depth- the thickness of chemical compound must be over 10μ.)</td>
                          <td></td>
                          <td>
                            HV400〜HS55<br/>
                            HV450〜HS61<br/>
                            HV500〜HS66<br/>
                            HV600〜HS74<br/>
                            HV900〜HS95
                          </td>
                        </tr>

                        {/* Ionite */}
                        <tr>
                          <td rowSpan={6}>Ionite</td>
                          <td rowSpan={5}>イオンナイト施工 硬度HV-</td>
                          <td>• S45C</td>
                          <td>• HV400UP</td>
                          <td rowSpan={6}>• Roller<br/>• Shaft<br/>• Locator<br/>• cam<br/>• Bearing sleeve<br/>• etc.</td>
                          <td rowSpan={6}>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • Good for Anti-Fitting.<br/>
                            • Good for Anti-Heat.<br/>
                            • Good for Anti-Corrosion. (equivalent as martensite SUS)<br/>
                            • Less friction coefficient.<br/><br/>
                            • If there would be no dimensional change, polish can be processed before Ionite, but after Ionite no need to polish.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Before Ionite, thermal refining 650° must be done first.
                          </td>
                        </tr>
                        <tr><td>• SCM440</td><td>• HV700UP</td></tr>
                        <tr><td>• SACM645</td><td>• HV1000UP</td></tr>
                        <tr><td>• SUS304</td><td>• HV1000UP</td></tr>
                        <tr><td>• etc.</td><td></td></tr>
                        <tr>
                          <td>(Hardening depth- the thickness of chemical compound must be over 10μ.)</td>
                          <td></td>
                          <td>
                            HV600〜HS74<br/>
                            HV700〜HS80<br/>
                            HV1000〜HS100
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
