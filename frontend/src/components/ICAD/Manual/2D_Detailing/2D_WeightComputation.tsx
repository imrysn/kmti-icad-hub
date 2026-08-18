import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect } from "react";
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";

import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Weight Computation */
// import cylinderExImg from "../../../../assets/2D_Image_File/2D_material_weight_computation_cylinder.jpg";
// import plateExImg from "../../../../assets/2D_Image_File/2D_material_weight_computation_plate.jpg";
// import shapeSteelEx1Img from "../../../../assets/2D_Image_File/2D_material_weight_computation_shape_steel.jpg";
// import shapeSteelEx2Img from "../../../../assets/2D_Image_File/2D_material_weight_computation_shape_steel_ex2.jpg";
// import pipeExImg from "../../../../assets/2D_Image_File/2D_material_weight_computation_square_rectangular_pipe.jpg";
interface WeightComputationLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const WeightComputationLesson: React.FC<WeightComputationLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore('2d-weight-computation');

  const currentTabSteps = [
    "Material Weight Computation",
    "Review the specific gravity table for material types like SS400, S45C, STKM, SPCC, SCM440, Rubber, MC Nylon, Shape Steel, etc.",
    "Plate computation: length by width by height by specific gravity. Note: dimension is always in millimeters, convert to meters upon computation.",
    "Cylinder computation: pi times radius squared times length times specific gravity. Note: dimension is always in millimeters, radius or diameter needs to convert to meters.",
    "Shape steel: cross-sectional area times length times specific gravity. Cross-sectional area refers to JIS and needs to be converted.",
    "Square or rectangular pipe: cross-sectional area times length times specific gravity."
  ];
  const tabsList = [{ id: 'default' }];
  const activeTab = 'default';

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [registerText]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    if (onNextLesson) onNextLesson();
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

              {/* === Section Header === */}
              <div className={`step-header ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0" style={{ marginTop: "-1rem", marginBottom: " -1rem" }}>
                <span className="step-number">15</span>
                <KaraokeLessonText as="span" className="step-label" text="Material Weight Computation" isActive={isSpeaking && currentIndex === 0} currentCharIndex={currentCharIndex} />
              </div>

              {/* === Specific Gravity Table === */}
              <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                <div className="lesson-table-container">
                  <table className="lesson-table">
                    <colgroup>
                      <col style={{ width: "50%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th rowSpan={2}>MATERIAL</th>
                        <th colSpan={2}>SPECIFIC GRAVITY</th>
                      </tr>
                      <tr>
                        <th>g/cm³</th>
                        <th>kg/m³</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>SS400</td><td>7.85</td><td>7850</td></tr>
                      <tr><td>S45C</td><td>7.84</td><td>7840</td></tr>
                      <tr><td>STKM</td><td>7.85</td><td>7850</td></tr>
                      <tr><td>SPCC</td><td>7.85</td><td>7850</td></tr>
                      <tr><td>SCM440</td><td>7.84</td><td>7840</td></tr>
                      <tr><td>RUBBER</td><td>7.00</td><td>7000</td></tr>
                      <tr><td>URATHANE RUBBER</td><td>1.20</td><td>1200</td></tr>
                      <tr><td>NEW LIGHT</td><td>0.92</td><td>950</td></tr>
                      <tr><td>MC NYLON</td><td>1.15</td><td>1150</td></tr>
                      <tr><td>ACRYLIC</td><td>1.20</td><td>1200</td></tr>
                      <tr><td>STKR400</td><td>7.85</td><td>7850</td></tr>
                      <tr><td>SHAPE STEEL</td><td>7.85</td><td>7850</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* === a. Plate === */}
              <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                <div className="step-header">
                  <span className="step-number">a</span>
                  <KaraokeLessonText as="span" className="step-label" text="Plate ( L × W × H × SG )" isActive={isSpeaking && currentIndex === 2} currentCharIndex={currentCharIndex} />
                </div>
                <div className="step-description">
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm shadow-sm w-fit mb-4 text-black">
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Dimension</span><span>: 16 × 90 × 120</span></div>
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Material</span><span>: SS400</span></div>
                    <div className="my-2"></div>
                    <div><span style={{ fontWeight: 'bold' }}>MW</span> = 0.016m × 0.09m × 0.12m × 7850kg/m³</div>
                    <div className="text-lg mt-1" style={{ fontWeight: 'bold' }}>MW = 1.36 kg</div>
                  </div>
                  <div className="instruction-box mt-6">
                    <p className="p-flush"><strong className="red-text">Note:</strong></p>
                    <p className="p-flush">Dimension is always in millimeter.</p>
                    <p className="p-flush">Convert to meter upon computation.</p>
                    <p className="p-flush">Use specific gravity with unit kg/m³ and follow the given formula.</p>
                  </div>
                </div>
              </div>

              {/* === b. Cylinder === */}
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-header">
                  <span className="step-number">b</span>
                  <KaraokeLessonText as="span" className="step-label" text="Cylinder ( pi × r² × L × SG ) or [ ( pi × d² × L × SG ) / 4 ]" isActive={isSpeaking && currentIndex === 3} currentCharIndex={currentCharIndex} />
                </div>
                <div className="step-description">
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm shadow-sm w-fit mb-4 text-black">
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Dimension</span><span>: φ60 × 115</span></div>
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Material</span><span>: S45C</span></div>
                    <div className="my-2"></div>
                    <div><span style={{ fontWeight: 'bold' }}>MW</span> = 3.1416 × (0.03m)² × 0.115m × 7840kg/m³</div>
                    <div className="text-lg mt-1" style={{ fontWeight: 'bold' }}>MW = 2.55 kg</div>
                  </div>
                  <div className="instruction-box mt-6">
                    <p className="p-flush"><strong className="red-text">Note:</strong></p>
                    <p className="p-flush">Dimension is always in millimeter.</p>
                    <p className="p-flush">Radius or Diameter needs to convert in meter upon computation.</p>
                    <p className="p-flush">Use specific gravity with unit kg/m³ and follow the given formula.</p>
                  </div>
                </div>
              </div>

              {/* === c. Shape Steel === */}
              <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">c</span>
                  <KaraokeLessonText as="span" className="step-label" text="Shape Steel ( Cross Sectional Area × L × SG )" isActive={isSpeaking && currentIndex === 4} currentCharIndex={currentCharIndex} />
                </div>
                <div className="step-description">
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm shadow-sm w-fit mb-4 text-black">
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Dimension</span><span>: 150 × 75 × 9 - 530</span></div>
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>C.S Area</span><span>: 30.59 cm²</span></div>
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Material</span><span>: C Channel</span></div>
                    <div className="my-2"></div>
                    <div><span style={{ fontWeight: 'bold' }}>C.S A</span> = 30.59cm × 1cm</div>
                    <div><span style={{ fontWeight: 'bold' }}>C.S A</span> = 0.3059m × 0.01m</div>
                    <div><span style={{ fontWeight: 'bold' }}>C.S A</span> = 0.003059 m²</div>
                    <div className="my-2"></div>
                    <div><span style={{ fontWeight: 'bold' }}>MW</span> = 0.003059m² × 0.53m × 7850kg/m³</div>
                    <div className="text-lg mt-1" style={{ fontWeight: 'bold' }}>MW = 12.73 kg</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm shadow-sm w-fit mb-4 mt-4 text-black">
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Dimension</span><span>: 125 × 90 × 10 - 725</span></div>
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>C.S Area</span><span>: 20.50 cm²</span></div>
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Material</span><span>: Unequal Side Angle Bar</span></div>
                    <div className="my-2"></div>
                    <div><span style={{ fontWeight: 'bold' }}>MW</span> = 0.00205m² × 0.725m × 7850kg/m³</div>
                    <div className="text-lg mt-1" style={{ fontWeight: 'bold' }}>MW = 11.67 kg</div>
                  </div>
                  <div className="instruction-box mt-6">
                    <p className="p-flush"><strong>Notes:</strong></p>
                    <p className="p-flush">1. Cross sectional area refers from <strong>Japan Industrial Standard (JIS).</strong></p>
                    <p className="p-flush">2. Cross sectional area needs to convert in mm² first.</p>
                    <p className="p-flush">3. To skip computation of cross sectional area from cm² to mm², just move 4 decimal places to the left.</p>
                    <p className="p-flush">4. Use specific gravity with unit kg/m³ and follow the given formula.</p>
                  </div>
                </div>
              </div>

              {/* === d. Square / Rectangular Pipe === */}
              <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
                <div className="step-header">
                  <span className="step-number">d</span>
                  <KaraokeLessonText as="span" className="step-label" text="Square / Rectangular Pipe ( Cross Sectional Area × L × SG )" isActive={isSpeaking && currentIndex === 5} currentCharIndex={currentCharIndex} />
                </div>
                <div className="step-description">
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm shadow-sm w-fit mb-4 text-black">
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Dimension</span><span>: 90 × 45 × 3.2 - 480</span></div>
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>C.S Area</span><span>: 7.967 cm²</span></div>
                    <div className="flex gap-4"><span className="w-24 text-gray-500" style={{ fontWeight: 'bold' }}>Material</span><span>: STKR400 (rectangular pipe)</span></div>
                    <div className="my-2"></div>
                    <div><span style={{ fontWeight: 'bold' }}>MW</span> = 0.000796m² × 0.48m × 7850kg/m³</div>
                    <div className="text-lg mt-1" style={{ fontWeight: 'bold' }}>MW = 3.00 kg</div>
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
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightComputationLesson;
