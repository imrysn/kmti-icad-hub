import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Heat Treatment */



interface HeatTreatmentLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const HeatTreatmentLesson: React.FC<HeatTreatmentLessonProps> = ({
  subLessonId = "2d-heat-treatment-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

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
  }, [subLessonId]);

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
          Heat Treatment (
          {subLessonId.split("-").pop()})
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (subLessonId === "2d-heat-treatment-1") speak(heat1Steps);
            else if (subLessonId === "2d-heat-treatment-2") speak(heat2Steps);
            else if (subLessonId === "2d-heat-treatment-3") speak(heat3Steps);
            else if (subLessonId === "2d-heat-treatment-4") speak(heat4Steps);
          }}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Technical specifications and reference data for engineering heat
          treatment processes including thermal refining, hardening, and
          nitriding.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {" "}
            {subLessonId === "2d-heat-treatment-1" ? (
              <div className="lesson-section">
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
                      {/* S35C, S45C */}
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

                      {/* SCM435 */}
                      <tr>
                        <td rowSpan={5}>SCM435</td>
                        <td>Thermal refining to 42~48 HS</td>
                        <td>素材調質施工 硬度HS42〜48</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>After rough machining thermal refining to 42~48 HS</td>
                        <td>荒削後調質施工 硬度HS42〜48</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>Salt-bath nitrocarburizing to HV600 UP (Tufttride®, isonite)</td>
                        <td>イソナイト施工 硬度HV600 UP</td>
                        <td className="text-center">Rev9</td>
                      </tr>
                      <tr>
                        <td>Parsonite construction to HV500 UP</td>
                        <td>パルソナイト施工 硬度HV500 UP</td>
                        <td className="text-center">Rev9</td>
                      </tr>
                      <tr>
                        <td>Ion nitriding to HV700 UP</td>
                        <td>イオンナイト施工 硬度HV700 UP</td>
                        <td></td>
                      </tr>

                      {/* SCM440 */}
                      <tr>
                        <td rowSpan={5}>SCM440</td>
                        <td>Thermal refining to 42~48 HS</td>
                        <td>素材調質施工 硬度HS42〜48</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>After rough machining thermal refining to 42~48 HS</td>
                        <td>荒削後調質施工 硬度HS42〜48</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>Salt-bath nitrocarburizing to HV600 UP (Tufttride®, isonite)</td>
                        <td>高周波焼入れ施工 硬度HS70~75</td>
                        <td className="text-center">Rev9</td>
                      </tr>
                      <tr>
                        <td>Parsonite construction to HV500 UP</td>
                        <td>イソナイト施工 硬度HV600 UP</td>
                        <td className="text-center">Rev9</td>
                      </tr>
                      <tr>
                        <td>Ion nitriding to HV700 UP</td>
                        <td>イオンナイト施工 硬度HV700 UP</td>
                        <td></td>
                      </tr>

                      {/* SKD11 */}
                      <tr>
                        <td rowSpan={3}>SKD11</td>
                        <td>Through hardening to 80~83 HS (Thru)</td>
                        <td>ズブ焼入れ施工 硬度HS80~83 (無心焼入れ、心部焼入れ)</td>
                        <td className="text-center">Rev2</td>
                      </tr>
                      <tr>
                        <td>Vacuum hardening to 80~83 HS</td>
                        <td>真空焼入れ施工 硬度HS80~83</td>
                        <td className="text-center">Rev2</td>
                      </tr>
                      <tr>
                        <td>Vacuum hardening to 78±2 HS (for SW BLADE)</td>
                        <td>真空焼入れ施工 硬度HS78±2 (対象SW 刃物)</td>
                        <td className="text-center">Rev9</td>
                      </tr>

                      {/* SKH51 */}
                      <tr>
                        <td>SKH51</td>
                        <td>Through hardening to 80~83 HS</td>
                        <td>ズブ焼入れ施工 硬度HS80~83</td>
                        <td></td>
                      </tr>

                      {/* SNC631 */}
                      <tr>
                        <td rowSpan={4}>SNC631</td>
                        <td>Thermal refining to 38~44 HS</td>
                        <td>素材調質施工 硬度HS38〜44</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>After rough machining thermal refining to 38~44 HS</td>
                        <td>荒削後調質施工 硬度HS38〜44</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>Induction hardening to 68~75 HS</td>
                        <td>高周波焼入れ施工 硬度HS68〜75</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Salt-bath nitrocarburizing to HV600 UP (Tufttride®, isonite)</td>
                        <td>イソナイト施工 硬度HV600 UP</td>
                        <td></td>
                      </tr>

                      {/* SNC631 repeated or another same entry in image */}
                      <tr>
                        <td rowSpan={3}>SNC631</td>
                        <td>Thermal refining to 44~50 HS</td>
                        <td>素材調質施工 硬度HS44〜50</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>After rough machining thermal refining to 35~40 HS</td>
                        <td>荒削後調質施工 硬度HS44〜50</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>Salt-bath nitrocarburizing to HV600 UP (Tufttride®, isonite)</td>
                        <td>イソナイト施工 硬度HV600 UP</td>
                        <td></td>
                      </tr>

                      {/* SNCM447 */}
                      <tr>
                        <td rowSpan={4}>SNCM447</td>
                        <td>Thermal refining to 44~50 HS</td>
                        <td>素材調質施工 硬度HS44〜50</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>After rough machining thermal refining to 35~40 HS</td>
                        <td>荒削後調質施工 硬度HS44〜50</td>
                        <td className="text-center">Rev11</td>
                      </tr>
                      <tr>
                        <td>Salt-bath nitrocarburizing to HV600 UP (Tufttride®, isonite)</td>
                        <td>イソナイト施工 硬度HV600 UP</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Induction hardening to 70~85 HS</td>
                        <td>高周波焼入れ施工 硬度HS70〜85</td>
                        <td></td>
                      </tr>

                      {/* FCD500 */}
                      <tr>
                        <td>FCD500</td>
                        <td>Salt-bath nitrocarburizing to HV500 UP (Tufttride®, isonite)</td>
                        <td>イソナイト施工 硬度HV500 UP</td>
                        <td></td>
                      </tr>

                      {/* SS400 */}
                      <tr>
                        <td rowSpan={3}>SS400</td>
                        <td>Salt-bath nitrocarburizing to HV400 UP (Tufttride®, isonite)</td>
                        <td>イソナイト施工 硬度HV400 UP</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Ion nitriding to HV400 UP</td>
                        <td>イオンナイト施工 硬度HV400 UP</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Parsonite construction to HV300 UP</td>
                        <td>パルソナイト施工 硬度HV300 UP</td>
                        <td className="text-center">Rev6</td>
                      </tr>

                      {/* STKM13A */}
                      <tr>
                        <td rowSpan={3}>STKM13A</td>
                        <td>Thermal refining to 35~40 HS</td>
                        <td>素材調質施工 硬度HS35〜40</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Induction hardening to 60~65 HS</td>
                        <td>高周波焼入れ施工 硬度HS60〜65</td>
                        <td></td>
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
                {" "}
                {/* Part 2 - Material Table Continuation */}
                <div className="lesson-section" style={{ marginBottom: "1rem" }}>
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
                        {/* SUJ2 */}
                        <tr>
                          <td rowSpan={3}>SUJ2</td>
                          <td>Thermal refining to 35~45 HS</td>
                          <td>素材調質施工 硬度HS35〜45</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Through hardening to 75~80 HS (Thru)</td>
                          <td>ズブ焼入れ施工 硬度HS75〜80 (無心焼入れ、心部焼入れ)</td>
                          <td className="text-center">Rev9</td>
                        </tr>
                        <tr>
                          <td>Induction hardening to 75~80 HS</td>
                          <td>高周波焼入れ施工 硬度HS75〜80</td>
                          <td className="text-center">Rev2,4</td>
                        </tr>

                        {/* SUS304 */}
                        <tr>
                          <td>SUS304</td>
                          <td>Ion nitriding to HV1000 UP</td>
                          <td>イオンナイト施工 硬度HV1000 UP</td>
                          <td className="text-center">Rev6</td>
                        </tr>

                        {/* Material for Gear Cutting */}
                        <tr>
                          <td rowSpan={2}>Material for Gear Cutting</td>
                          <td>Thermal refining to 35~38 HS</td>
                          <td>素材調質施工 硬度HS35〜38</td>
                          <td className="text-center">Rev11</td>
                        </tr>
                        <tr>
                          <td>After rough machining thermal refining to 35~38 HS</td>
                          <td>荒削後調質施工 硬度HS35〜38</td>
                          <td></td>
                        </tr>

                        {/* Heat treatment without specific material */}
                        <tr>
                          <td rowSpan={6}>Heat treatment without specific material</td>
                          <td>Annealing</td>
                          <td>焼鈍施工</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>After rough machining Annealing</td>
                          <td>荒削後焼鈍施工</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Annealing and shot blasting</td>
                          <td>焼鈍ショットブラスト施工</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Sulphonitriding to HV500 UP</td>
                          <td>浸硫窒化 硬度HV500 UP</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Manganese phosphate film processing construction</td>
                          <td>リン酸マンガン被膜処理</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Normalizing</td>
                          <td>焼戻し温度 600℃以上のこと</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Rev Notes Section */}
                <div className="lesson-section">
                  <div className="flex-col" style={{ gap: "0.8rem" }}>
                    {" "}
                    {[
                      { rev: "Rev2", text: "Expression of hardness" },

                      {
                        rev: "Rev3",
                        text: "KEM Style is the same as usual. Follow JIS for English words",
                      },

                      {
                        rev: "Rev6",
                        text: "It's hard to make warp because parsonite hardening process treatment is done by 480°C. Ion nitriding treatment is done by 580°C. We set HV400 and HV300 to cut treatment time to avoid a warp.",
                      },

                      {
                        rev: "Rev9",
                        text: "Traditionally, the blade of SW is HS78±2, and results of checking hardness is 78 or 79. Also, there is no report about performance, so we keep this hardness standard.",
                      },

                      {
                        rev: "Rev10",
                        text: "We have changed hardness standards of through hardening for S50C and S55C and induction hardening.",
                      },

                      {
                        rev: "Rev11",
                        text: "Describe thermal refining hardness for each material. It follows the standard of JIS.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex-row" style={{ gridTemplateColumns: "80px 1fr", gap: "1rem" }}>
                        {" "}
                        <span>{item.rev}:</span> <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>{" "}
                {/* Heat Treatment Process Table */}
                <div className="lesson-section">
                  {" "}
                  <h4 style={{ marginTop: "2rem", marginBottom: "1rem" }}> Heat Treatment Process </h4>
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
                        {/* Through Hardening */}
                        <tr>
                          <td rowSpan={4}>Through Hardening</td>
                          <td rowSpan={4}>ズブ焼入れ施工 硬度HS-</td>
                          <td>S45C</td>
                          <td>HS55〜60</td>
                          <td rowSpan={4}>Cutting Tools, Roller, Spacer, etc.</td>
                          <td rowSpan={4}>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • Cost is Cheaper, because its process is simple.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • To achieve more accuracy it will be needed additional process such as polishing, buffing, grinding or etc.
                          </td>
                        </tr>
                        <tr>
                          <td>SKD11</td>
                          <td>HS80〜83</td>
                        </tr>
                        <tr>
                          <td>SKH51</td>
                          <td>HS80〜83</td>
                        </tr>
                        <tr>
                          <td>etc.</td>
                          <td></td>
                        </tr>

                        {/* Vacuum Hardening */}
                        <tr>
                          <td>Vacuum Hardening</td>
                          <td>真空焼入れ施工 硬度HS-</td>
                          <td>SKD11</td>
                          <td>HS80〜83</td>
                          <td>Roller, Plug Head (DF Machine)</td>
                          <td>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • After hardening, less deformation will produce.<br/><br/>
                            • No oxidation left after hardening, additional process will not be needed.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : subLessonId === "2d-heat-treatment-3" ? (
              <div className="flex-col">
                <div className="lesson-section">
                  {" "}
                  <h4 style={{ marginBottom: "1rem" }}> Heat Treatment Process (Continued) </h4>
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
                        {/* Thermal Refining */}
                        <tr>
                          <td rowSpan={5}>Thermal Refining</td>
                          <td rowSpan={5}>
                            素材調質施工 程度HS-<br/><br/>
                            素材調質施工 程度HS-
                          </td>
                          <td>S45C</td>
                          <td rowSpan={5}>
                            All material - HS35〜40<br/>
                            (Except for Roller shaft it is need to increase the temperature up to HS44〜50)
                          </td>
                          <td rowSpan={5}>Shaft, Roller, Gear, Collar, etc.</td>
                          <td rowSpan={5}>
                            <strong>ADVANTAGE:</strong><br/>
                            • It stabilize the composition of material.<br/>
                            • It reduces the deformation after hardening.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Thermal refining is applicable to other heat treatment, except those two-Through Hardening and Vacuum Hardening.
                          </td>
                        </tr>
                        <tr><td>STKM16A</td></tr>
                        <tr><td>SNC631</td></tr>
                        <tr><td>SNCM447</td></tr>
                        <tr><td>SUJ2, etc.</td></tr>

                        {/* Annealing */}
                        <tr>
                          <td rowSpan={2}>Annealing</td>
                          <td>焼鈍施工</td>
                          <td rowSpan={2}>SS400, SC420, etc.</td>
                          <td rowSpan={2}></td>
                          <td rowSpan={2}>Welded Structure, Forge Material, etc.</td>
                          <td rowSpan={2}>
                            <strong>ADVANTAGE (Annealing):</strong><br/>
                            • Good to remove the material stress.<br/><br/>
                            <strong>ADVANTAGE (Annealing shotblast):</strong><br/>
                            • Good to remove slugs. (Good for painting parts)<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Generally, shotblast will be done except for small and urgent parts.
                          </td>
                        </tr>
                        <tr>
                          <td>焼鈍ショットブラス 施工</td>
                        </tr>

                        {/* Induction Hardening */}
                        <tr>
                          <td rowSpan={5}>Induction Hardening</td>
                          <td rowSpan={5}>
                            高周波焼入れ施工 程度HS-<br/><br/>
                            (Without any notes before polishing or grinding, hardening depths must be 1mm.)
                          </td>
                          <td>S45C</td>
                          <td>HS60〜65</td>
                          <td rowSpan={5}>Roller Shaft, Roller, Gear, Shaft, Collar, Pin, Slide Shoe, etc.</td>
                          <td rowSpan={5}>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • It is possible to harden specific area.<br/>
                            • Can achieve more require hardened than others.<br/>
                            • Process can be done by short period of time.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Before induction hardening, thermal refining must be done first.<br/>
                            • To achieve more accuracy it will be needing additional process such as polishing, grinding or etc.<br/>
                            • Hardened area must be clarified.
                          </td>
                        </tr>
                        <tr><td>STKM16A</td><td>HS60〜65</td></tr>
                        <tr><td>SNC631</td><td>HS68〜75</td></tr>
                        <tr><td>SNCM447</td><td>HS70〜85</td></tr>
                        <tr><td>SUJ2, etc.</td><td>HS75〜80</td></tr>

                        {/* QPQ */}
                        <tr>
                          <td>QPQ (Quench Polish Quench)</td>
                          <td>QPQ施工</td>
                          <td>SS400, S45C, etc.</td>
                          <td></td>
                          <td>Shaft, Head cover for cylinder, etc.</td>
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
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : subLessonId === "2d-heat-treatment-4" ? (
              <div className="flex-col">
                <div className="lesson-section">
                  {" "}
                  <h4 style={{ marginBottom: "1rem" }}> Heat Treatment Process (Final) </h4>
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
                        {/* Isonite */}
                        <tr>
                          <td rowSpan={8}>Isonite</td>
                          <td rowSpan={8}>
                            イソナイト施工 硬度HV-<br/><br/>
                            (Hardening depth - the thickness of chemical compound must be over 10μ.)
                          </td>
                          <td>SS400</td>
                          <td>HV400UP</td>
                          <td rowSpan={8}>Roller Shaft, Roller, Gear, Shaft, Collar, Pin, Slide Shoe, etc.</td>
                          <td rowSpan={8}>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • Good for anti-Fitting.<br/>
                            • Good for Anti-Heat.<br/>
                            • Good for Anti-Corrosion (equivalent as martensite SUS).<br/>
                            • Less friction coefficient.<br/>
                            • Less deformation, because its processing temperature lessens 570°.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Before Isonite, thermal refining 650° must be done first.
                          </td>
                        </tr>
                        <tr><td>SC410</td><td>HV450UP</td></tr>
                        <tr><td>S45C</td><td>HV500UP</td></tr>
                        <tr><td>STKM16A</td><td>HS500UP</td></tr>
                        <tr><td>SNC631</td><td>HV600UP</td></tr>
                        <tr><td>SNCM447</td><td>HV600UP</td></tr>
                        <tr><td>SCM430</td><td>HV600UP</td></tr>
                        <tr><td>SACM645, etc.</td><td>HV900UP</td></tr>

                        {/* Ionite */}
                        <tr>
                          <td rowSpan={4}>Ionite (Ion Nitriding)</td>
                          <td rowSpan={4}>
                            イソナイト施工 硬度HV-<br/><br/>
                            (Hardening depth - the thickness of chemical compound must be over 10μ.)
                          </td>
                          <td>S45C</td>
                          <td>HV400UP</td>
                          <td rowSpan={4}>Roller, Shaft, Locator, Cam, Bearing sleeve, etc.</td>
                          <td rowSpan={4}>
                            <strong>ADVANTAGE:</strong><br/>
                            • Good for Anti-Friction.<br/>
                            • Good for Anti-Fatigue.<br/>
                            • Good for anti-Fitting.<br/>
                            • Good for Anti-Heat.<br/>
                            • Good for Anti-Corrosion (equivalent as martensite SUS).<br/>
                            • Less friction coefficient.<br/><br/>
                            • If there would be no dimensional change, polish can be processed before Ionite, but after Ionite no need to polish.<br/><br/>
                            <strong>RECOMMEND:</strong><br/>
                            • Before Ionite, thermal refining 650° must be done first.
                          </td>
                        </tr>
                        <tr><td>SCM440</td><td>HV700UP</td></tr>
                        <tr><td>SACM645</td><td>HV1000UP</td></tr>
                        <tr><td>SUS304, etc.</td><td>HV1000UP</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-2d-placeholder">
                <h3>Content coming soon</h3>

                <p>
                  Sub-lesson
                  {subLessonId} content is under implementation.
                </p>
              </div>
            )}
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

export default HeatTreatmentLesson;



