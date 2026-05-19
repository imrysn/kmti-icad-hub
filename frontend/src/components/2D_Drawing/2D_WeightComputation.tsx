import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const { scrollProgress, containerRef } = useLessonCore('2d-weight-computation');

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
              <div className="step-header" style={{ marginTop: "-1rem", marginBottom:" -1rem" }}>
                <span className="step-number">15</span>
                <span className="step-label">Material Weight Computation</span>
              </div>

              {/* === Specific Gravity Table === */}
              <div className="instruction-step">
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
              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">a</span>
                  <span className="step-label">Plate ( L × W × H × SG )</span>
                </div>
                <div className="step-description">
                  <img src={plateExImg} alt="Plate Computation Example" className="software-screenshot screenshot-wide" />
                  <div className="instruction-box mt-6">
                    <p className="p-flush"><strong className="red-text">Note:</strong></p>
                    <p className="p-flush">Dimension is always in millimeter.</p>
                    <p className="p-flush">Convert to meter upon computation.</p>
                    <p className="p-flush">Use specific gravity with unit kg/m³ and follow the given formula.</p>
                  </div>
                </div>
              </div>

              {/* === b. Cylinder === */}
              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">b</span>
                  <span className="step-label">Cylinder ( π × r² × L × SG )  or  [ ( π × d² × L × SG ) / 4 ]</span>
                </div>
                <div className="step-description">
                  <img src={cylinderExImg} alt="Cylinder Computation Example" className="software-screenshot screenshot-wide" />
                  <div className="instruction-box mt-6">
                    <p className="p-flush"><strong className="red-text">Note:</strong></p>
                    <p className="p-flush">Dimension is always in millimeter.</p>
                    <p className="p-flush">Radius or Diameter needs to convert in meter upon computation.</p>
                    <p className="p-flush">Use specific gravity with unit kg/m³ and follow the given formula.</p>
                  </div>
                </div>
              </div>

              {/* === c. Shape Steel === */}
              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">c</span>
                  <span className="step-label">Shape Steel ( Cross Sectional Area × L × SG )</span>
                </div>
                <div className="step-description">
                  <img src={shapeSteelEx1Img} alt="Shape Steel Example 1" className="software-screenshot screenshot-wide" />
                  <img src={shapeSteelEx2Img} alt="Shape Steel Example 2" className="software-screenshot screenshot-wide mt-4" />
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
              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">d</span>
                  <span className="step-label">Square / Rectangular Pipe ( Cross Sectional Area × L × SG )</span>
                </div>
                <div className="step-description">
                  <img src={pipeExImg} alt="Square Rectangular Pipe Computation Example" className="software-screenshot screenshot-wide" />
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

export default WeightComputationLesson;
