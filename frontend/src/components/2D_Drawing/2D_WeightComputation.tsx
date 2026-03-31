import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Weight Computation
import gravityTableImg from '../../assets/2D_Image_File/2D_material_weight_computation.jpg';
import plateExImg from '../../assets/2D_Image_File/2D_material_weight_computation_plate.jpg';
import cylinderExImg from '../../assets/2D_Image_File/2D_material_weight_computation_cylinder.jpg';
import shapeSteelEx1Img from '../../assets/2D_Image_File/2D_material_weight_computation_shape_steel.jpg';
import shapeSteelEx2Img from '../../assets/2D_Image_File/2D_material_weight_computation_shape_steel_ex2.jpg';
import pipeExImg from '../../assets/2D_Image_File/2D_material_weight_computation_square_rectangular_pipe.jpg';

interface WeightComputationLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const WeightComputationLesson: React.FC<WeightComputationLessonProps> = ({
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro" style={{ marginBottom: '3rem' }}>
          <h3 className="section-title-main" style={{ color: '#dc2626' }}>
            <ArrowLeft size={28} className="lesson-intro-icon" />
            15. Material Weight Computation
          </h3>
          <p className="lesson-subtitle" style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
            Technical formulas and examples for calculating the mass of various engineering components based on material density and geometry.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              <div className="flex-col" style={{ gap: '4rem' }}>

                {/* Specific Gravity Table */}
                <div className="lesson-section" style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="image-wrapper-flush" style={{ maxWidth: '650px', width: '100%', background: 'white', padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <img
                      src={gravityTableImg}
                      alt="Material Specific Gravity Reference Table"
                      className="software-screenshot screenshot-wide"
                      style={{ width: '100%', mixBlendMode: 'multiply' }}
                    />
                  </div>
                </div>

                {/* a. Plate Section */}
                <div className="lesson-section">
                  <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '2rem', marginTop: '3rem' }}>
                    a. Plate (L × W × H × SG)
                  </h4>
                  <div className="flex-row" style={{ gap: '3rem', alignItems: 'center' }}>
                    <div className="flex-col" style={{ flex: 1.5, gap: '1rem' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>example:</p>
                      <img src={plateExImg} alt="Plate Weight Computation Example" style={{ width: '100%', maxWidth: '450px' }} />
                    </div>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white', flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'red', marginBottom: '0.8rem' }}>Note:</p>
                      <p style={{ margin: 0, fontSize: '1rem', color: 'black', lineHeight: '1.6' }}>
                        Dimension is always in millimeter.<br />
                        Convert to meter upon computation.<br />
                        Use specific gravity with unit kg/m³ and follow the given formula.
                      </p>
                    </div>
                  </div>
                </div>

                {/* b. Cylinder Section */}
                <div className="lesson-section">
                  <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '2rem', marginTop: '3rem' }}>
                    b. Cylinder ( π × r² × L × SG) or [ ( π × d² × L × SG) / 4 ]
                  </h4>
                  <div className="flex-row" style={{ gap: '3rem', alignItems: 'center' }}>
                    <div className="flex-col" style={{ flex: 1.5, gap: '1rem' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>example:</p>
                      <img src={cylinderExImg} alt="Cylinder Weight Computation Example" style={{ width: '100%', maxWidth: '450px' }} />
                    </div>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white', flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'red', marginBottom: '0.8rem' }}>Note:</p>
                      <p style={{ margin: 0, fontSize: '1rem', color: 'black', lineHeight: '1.6' }}>
                        Dimension is always in millimeter.<br />
                        Radius or Diameter needs to convert in meter upon computation.<br />
                        Use specific gravity with unit kg/m³ and follow the given formula.
                      </p>
                    </div>
                  </div>
                </div>

                {/* c. Shape Steel Section */}
                <div className="lesson-section">
                  <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '2rem', marginTop: '3rem' }}>
                    c. Shape Steel ( Cross Sectional Area × L × SG )
                  </h4>
                  <div className="flex-row" style={{ gap: '3rem', alignItems: 'center' }}>
                    <div className="flex-col" style={{ flex: 1.5, gap: '2.5rem' }}>
                      <div className="flex-col" style={{ gap: '0.5rem' }}>
                        <p style={{ fontWeight: 'bold', color: '#555' }}>example:</p>
                        <img src={shapeSteelEx1Img} alt="Shape Steel C-Channel Example" style={{ width: '100%', maxWidth: '450px' }} />
                      </div>
                      <div className="flex-col" style={{ gap: '0.5rem' }}>
                        <p style={{ fontWeight: 'bold', color: '#555' }}>example:</p>
                        <img src={shapeSteelEx2Img} alt="Shape Steel Angle Bar Example" style={{ width: '100%', maxWidth: '450px' }} />
                      </div>
                    </div>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white', flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'red', marginBottom: '0.8rem' }}>Notes:</p>
                      <p style={{ margin: 0, fontSize: '1rem', color: 'black', lineHeight: '1.6' }}>
                        1. Cross sectional area refers from <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Japan Industrial Standard (JIS)</span>.<br /><br />
                        2. Cross sectional area needs to convert in m² first.<br /><br />
                        3. To skip computation of cross sectional area from cm² to m², just move 4 decimal places to the left.<br /><br />
                        4. Use specific gravity with unit kg/m³ and follow the given formula.
                      </p>
                    </div>
                  </div>
                </div>

                {/* d. Square / Rectangular Pipe Section */}
                <div className="lesson-section">
                  <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '2rem', marginTop: '3rem' }}>
                    d. Square / Rectangular Pipe ( Cross Sectional Area × L × SG )
                  </h4>
                  <div className="flex-row" style={{ gap: '3rem', alignItems: 'center' }}>
                    <div className="flex-col" style={{ flex: 1.5, gap: '1rem' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#555' }}>example:</p>
                      <img src={pipeExImg} alt="Rectangular Pipe Example" style={{ width: '100%', maxWidth: '450px' }} />
                    </div>
                    <div className="info-box" style={{ flex: 1, opacity: 0, pointerEvents: 'none' }}>
                      {/* Placeholder to maintain alignment */}
                    </div>
                  </div>
                </div>

              </div>

              {/* Navigation */}
              <div className="lesson-navigation" style={{ marginTop: '5rem', borderTop: '1px solid #eee', paddingTop: '2.5rem' }}>
                <button className="nav-button" onClick={onPrevLesson}>
                  <ChevronLeft size={18} /> Previous
                </button>
                <button className="nav-button next" onClick={onNextLesson}>
                  Next Lesson <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightComputationLesson;
