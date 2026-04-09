import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Weight Computation */

import gravityTableImg from "../../assets/2D_Image_File/2D_material_weight_computation.jpg";

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
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const weightSteps = [
    "Material Weight Computation: Calculating part mass is critical for shipping and logistics. Use the specific gravity table as your primary reference for material densities.",
    "Plate Computation: For plates, multiply Length by Width, Height, and Specific Gravity. Always convert millimeter dimensions to meters before your final calculation.",
    "Cylinder Computation: Use the sectional area formula with pi. Remember to convert the radius or diameter into meters and use the standard density in kilograms per cubic meter.",
    "Sectional Steel: For C-channels and angles, refer to the Japan Industrial Standard for cross-sectional areas. A quick tip for converting square centimeters to square meters is to move the decimal four places to the left.",
    "Piping: For square and rectangular pipes, the same cross-sectional area principle applies. Follow the standard KEMCO formulas to ensure accurate weight estimation."
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
          15. Material
          Weight Computation
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(weightSteps)}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Technical formulas and examples for calculating the mass of various
          engineering components based on material density and geometry.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="flex-col">
            {" "}
            {/* Specific Gravity Table */}
            <div className="lesson-section">
              <div className="image-wrapper-flush">
                <img src={gravityTableImg} alt="Material Specific Gravity Reference Table" className="software-screenshot screenshot-wide" />
              </div>
            </div>{" "}
            {/* a. Plate Section */}
            <div className="lesson-section">
              {" "}
              <h4> a. Plate (L ÁEW ÁEH ÁESG) </h4>
              <div className="flex-row">
                <div className="flex-col">
                  <p>example:</p>

                  <img src={plateExImg} alt="Plate Weight Computation Example" />
                </div>

                <div className="info-box">
                  <p>Note:</p>

                  <p>
                    {" "}
                    Dimension is always in millimeter.
                    <br /> Convert to meter upon computation.
                    <br /> Use specific gravity with unit kg/m³ and follow the
                    given formula.
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* b. Cylinder Section */}
            <div className="lesson-section">
              {" "}
              <h4>
                {" "}
                b. Cylinder ( π ÁEr² ÁEL ÁESG) or [ ( π ÁEd² ÁEL ÁESG) / 4
                ]{" "}
              </h4>
              <div className="flex-row">
                <div className="flex-col">
                  <p>example:</p>

                  <img src={cylinderExImg} alt="Cylinder Weight Computation Example" />
                </div>

                <div className="info-box">
                  <p>Note:</p>

                  <p>
                    {" "}
                    Dimension is always in millimeter.
                    <br /> Radius or Diameter needs to convert in meter upon
                    computation.
                    <br /> Use specific gravity with unit kg/m³ and follow the
                    given formula.
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* c. Shape Steel Section */}
            <div className="lesson-section">
              {" "}
              <h4> c. Shape Steel ( Cross Sectional Area ÁEL ÁESG ) </h4>
              <div className="flex-row">
                <div className="flex-col">
                  <div className="flex-col">
                    <p>example:</p>

                    <img src={shapeSteelEx1Img} alt="Shape Steel C-Channel Example" />
                  </div>

                  <div className="flex-col">
                    <p>example:</p>

                    <img src={shapeSteelEx2Img} alt="Shape Steel Angle Bar Example" />
                  </div>
                </div>

                <div className="info-box">
                  <p>Notes:</p>

                  <p>
                    {" "}
                    1. Cross sectional area refers from{" "}
                    <span>Japan Industrial Standard (JIS)</span>.<br />
                    <br /> 2. Cross sectional area needs to convert in m² first.
                    <br />
                    <br /> 3. To skip computation of cross sectional area from
                    cm² to m², just move 4 decimal places to the left.
                    <br />
                    <br /> 4. Use specific gravity with unit kg/m³ and follow
                    the given formula.
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* d. Square / Rectangular Pipe Section */}
            <div className="lesson-section">
              {" "}
              <h4>
                {" "}
                d. Square / Rectangular Pipe ( Cross Sectional Area ÁEL ÁESG
                ){" "}
              </h4>
              <div className="flex-row">
                <div className="flex-col">
                  <p>example:</p>

                  <img src={pipeExImg} alt="Rectangular Pipe Example" />
                </div>

                <div className="info-box">
                  {" "}
                  {/* Placeholder to maintain alignment */}
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
    </div>
  );
};

export default WeightComputationLesson;



