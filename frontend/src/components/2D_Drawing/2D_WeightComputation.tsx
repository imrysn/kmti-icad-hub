import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Weight Computation */
import plateExImg from "../../assets/2D_Image_File/2D_material_weight_computation_plate.jpg";
import cylinderExImg from "../../assets/2D_Image_File/2D_material_weight_computation_cylinder.jpg";
import shapeSteelEx1Img from "../../assets/2D_Image_File/2D_material_weight_computation_shape_steel.jpg";
import shapeSteelEx2Img from "../../assets/2D_Image_File/2D_material_weight_computation_shape_steel_ex2.jpg";
import pipeExImg from "../../assets/2D_Image_File/2D_material_weight_computation_square_rectangular_pipe.jpg";

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
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore('2d-weight-computation');

  const weightSteps = [
    "Calculating part mass is critical for shipping and logistics. Use the specific gravity table as your primary reference for material densities.",
    "For plates, multiply Length by Width, Height, and Specific Gravity. Always convert millimeter dimensions to meters before your final calculation.",
    "Use the sectional area formula with pi. Remember to convert the radius or diameter into meters and use the standard density in kilograms per cubic meter.",
    "For C-channels and angles, refer to the Japan Industrial Standard for cross-sectional areas. A quick tip for converting square centimeters to square meters is to move the decimal four places to the left.",
    "For square and rectangular pipes, the same cross-sectional area principle applies. Follow the standard KEMCO formulas to ensure accurate weight estimation."
  ];

  const currentTitle = "MATERIAL WEIGHT COMPUTATION";
  const currentSubtitle = "Technical formulas and examples for calculating the mass of engineering components.";

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="card-header">
              <KaraokeLessonText
                as="h4"
                className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                data-reading-index="0"
                text={currentTitle}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              <ReadAloudButton 
                isSpeaking={isSpeaking} 
                onStart={() => speak([currentTitle, currentSubtitle, ...weightSteps])}
                onStop={stop}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <KaraokeLessonText
                className="p-flush"
                text={currentSubtitle}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
            </div>


            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
              <div className="step-header">
                <span className="step-number">1</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Specific Gravity Standards"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="lesson-table-container">
                  <table className="lesson-table">
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
                      <tr><td>URATHANE</td><td>1.20</td><td>1200</td></tr>
                      <tr><td>NEW LIGHT</td><td>0.92</td><td>920</td></tr>
                      <tr><td>MC NYLON</td><td>1.15</td><td>1150</td></tr>
                      <tr><td>ACRYLIC</td><td>1.20</td><td>1200</td></tr>
                      <tr><td>STKR400</td><td>7.85</td><td>7850</td></tr>
                      <tr><td>SHAPE STEEL</td><td>7.85</td><td>7850</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header">
                <span className="step-number">2</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Plate (L × W × H × SG)"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={weightSteps[1]}
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
                <img src={plateExImg} alt="Plate Computation" className="software-screenshot screenshot-wide mb-4" />
                <div className="red-text">
                  <p><strong>Note:</strong> Dimensions are in mm; convert to meters for computation. Use kg/m³ for specific gravity.</p>
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
              <div className="step-header">
                <span className="step-number">3</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Cylinder (π × r² × L × SG)"
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={weightSteps[2]}
                  isActive={isSpeaking && currentIndex === 4}
                  currentCharIndex={currentCharIndex}
                />
                <img src={cylinderExImg} alt="Cylinder Computation" className="software-screenshot screenshot-wide" />
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5">
              <div className="step-header">
                <span className="step-number">4</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Sectional Shape Steel"
                  isActive={isSpeaking && currentIndex === 5}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text={weightSteps[3]}
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="flex-col gap-4">
                  <img src={shapeSteelEx1Img} alt="C-Channel Example" className="software-screenshot screenshot-wide" />
                  <img src={shapeSteelEx2Img} alt="Angle Steel Example" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
              <div className="step-header">
                <span className="step-number">5</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Square / Rectangular Piping"
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <KaraokeLessonText
                  className="p-flush mb-4"
                  text={weightSteps[4]}
                  isActive={isSpeaking && currentIndex === 6}
                  currentCharIndex={currentCharIndex}
                />
                <img src={pipeExImg} alt="Pipe Computation" className="software-screenshot screenshot-wide" />
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

export default WeightComputationLesson;
