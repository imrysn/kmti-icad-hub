import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, MoveDown } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Geometric Tolerance (1)
import geoTolMainImg from '../../assets/2D_Image_File/2D_geometric_tolerance(1).png';
import geoTolStepAImg from '../../assets/2D_Image_File/2D_geometric_tolerance(1)_1.png';
import geoTolStepBImg from '../../assets/2D_Image_File/2D_geometric_tolerance(1)_2.png';
import geoTolStepCImg from '../../assets/2D_Image_File/2D_geometric_tolerance(1)_3.jpg';

// Importing assets for Geometric Tolerance (2)
import geoTolStepDImg from '../../assets/2D_Image_File/2D_geometric_tolerance(2)_4.png';
import geoTolStepEImg from '../../assets/2D_Image_File/2D_geometric_tolerance(2)_5.jpg';
import geoTolStepFImg from '../../assets/2D_Image_File/2D_geometric_tolerance(2)_6.jpg';
import datumSelectionImg from '../../assets/2D_Image_File/D_geometric_tolerance(2)_datum_1.png';
import datumOperationImg from '../../assets/2D_Image_File/2D_geometric_tolerance(2)_datum_2.png';

interface GeometricToleranceLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const GeometricToleranceLesson: React.FC<GeometricToleranceLessonProps> = ({
  subLessonId = '2d-geometric-tol-1',
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Geometric Tolerance {subLessonId === '2d-geometric-tol-1' ? '(1)' : '(2)'}
          </h3>
          <p className="lesson-subtitle">
            Principles and procedures for defining allowable engineering tolerances to ensure part accuracy and precision.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              {subLessonId === '2d-geometric-tol-1' ? (
                <div className="flex-col" style={{ gap: '3rem' }}>
                  {/* Title and Definition */}
                  <div>
                    <h4 style={{ color: 'red', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>
                      9. Geometric Tolerance <span style={{ color: '#333', fontWeight: 'normal' }}>- a system for defining allowable enoineerino tolerances. It tells what deoree of accuracv and precision that needs to be applied on the part.</span>
                    </h4>
                  </div>

                  {/* Top Images Row */}
                  <div className="flex-row-center" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div className="image-wrapper-flush" style={{ flex: 1 }}>
                      <img src={geoTolMainImg} alt="Geometric Tolerance Sample Drawing and Menu Selection" className="software-screenshot" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <div className="image-wrapper-flush" style={{ flex: 0.8 }}>
                      <img src={geoTolStepAImg} alt="Picking line for Geometric Tolerance (P1)" className="software-screenshot screenshot-wide" style={{ width: '100%', height: 'auto' }} />
                    </div>
                  </div>



                  {/* Step B Section */}
                  <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '4px', padding: '1.5rem', flex: '0 0 230px', marginTop: '1rem' }}>
                      <p style={{ margin: 0, fontSize: '1rem', color: '#333' }}>
                        <strong>b. "Geometric Tolerance" dialog box appear. Complete the required details then click "OK".</strong>
                      </p>
                    </div>
                    <div className="image-wrapper-flush" style={{ flex: 1 }}>
                      <img src={geoTolStepBImg} alt="Geometric Tolerance Dialog Box Configuration" className="software-screenshot screenshot-wide" style={{ width: '100%', height: 'auto', marginBottom: '4rem' }} />
                    </div>
                  </div>

                  {/* Step C Section */}
                  <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '4px', padding: '1.5rem', flex: '0 0 310px', marginTop: '0.7rem' }}>
                      <p style={{ margin: 0, fontSize: '1rem', color: '#333' }}>
                        <strong>c. Click P2 to set the position of geometric tolerance then "GO" to end the command.</strong>
                      </p>
                    </div>
                    <div className="image-wrapper-flush" style={{ flex: 1 }}>
                      <img src={geoTolStepCImg} alt="Setting Geometric Tolerance Position (P2)" className="software-screenshot" style={{ width: '100%', height: 'auto', border: '1px solid #ddd' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-col" style={{ gap: '2.5rem' }}>
                  {/* Step D */}
                  <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>

                    <div className="image-wrapper-flush" style={{ flex: 1 }}>
                      <img src={geoTolStepDImg} alt="Adding geometric tolerance (P3)" className="software-screenshot screenshot-wide" style={{ width: '100%', height: 'auto', marginBottom: '3rem' }} />
                    </div>
                  </div>

                  {/* Step E */}
                  <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '4px', padding: '1rem', flex: '0 0 250px', marginTop: '0.5rem' }}>
                      <p style={{ margin: 0, fontSize: '0.92rem' }}>
                        <strong>e. "Geometric Tolerance" dialog box appear. Complete the required details, then click "OK".</strong>
                      </p>
                    </div>
                    <div className="image-wrapper-flush" style={{ flex: 1 }}>
                      <img src={geoTolStepEImg} alt="Geometric Tolerance Dialog - Perpendicular" className="software-screenshot" style={{ width: '100%', height: 'auto' }} />
                    </div>
                  </div>

                  {/* Step F */}
                  <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '4px', padding: '1rem', flex: '0 0 250px', marginTop: '3rem' }}>
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>
                        <strong>f. Required geometric tolerance based on the sample drawing.</strong>
                      </p>
                    </div>
                    <div className="image-wrapper-flush" style={{ flex: 0.6 }}>
                      <img src={geoTolStepFImg} alt="Resulting Control Frame" className="software-screenshot" style={{ width: '100%', height: 'auto', marginTop: '2.5rem' }} />
                    </div>
                  </div>

                  <div className="section-divider" style={{ margin: '2rem 0' }}></div>

                  {/* Section 10: Datum */}
                  <div>
                    <h4 style={{ color: 'red', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                      10. Datum <span style={{ color: '#333', fontWeight: 'normal', display: 'block', marginTop: '0.5rem' }}>- Datum is a fixed reference point by which other machining operations can be carried out.</span>
                    </h4>

                    <div className="flex-row" style={{ gap: '3rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 0.7 }}>
                        <img src={datumSelectionImg} alt="Datum Selection Menu" className="software-screenshot screenshot-wide" style={{ width: '100%', marginBottom: '2rem' }} />
                      </div>
                    </div>
                    <div className="flex-row" style={{ flex: 2, gap: '2rem', alignItems: 'flex-start' }}>
                      <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white', flex: '0 0 230px', marginTop: '1rem' }}>
                        <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.8' }}>
                          1. Apply the selected commands shown above.<br />
                          2. Click L1, then enter datum character in item entry box.<br />
                          3. Click P2 to position the datum, then "GO" to end the command.
                        </p>
                      </div>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img src={datumOperationImg} alt="Datum Placement Procedure" className="software-screenshot screenshot-wide" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="lesson-navigation" style={{ marginTop: '4rem' }}>
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

export default GeometricToleranceLesson;
