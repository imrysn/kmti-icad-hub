import React, { useState } from 'react';
import { ArrowRight, ArrowBigRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Dimensioning (1)
import diimensioningImg from '../../assets/2D_Image_File/2D_dimensioning(1)_diimensioning.png';
import standardDimMenuImg from '../../assets/2D_Image_File/2D_dimensioning(1)_a.1_standard_dimension.png';
import standardDimProcessImg from '../../assets/2D_Image_File/2D_dimensioning(1)_a.1_standard_dimension_1.jpg';
import seriesDimMenuImg from '../../assets/2D_Image_File/2D_dimensioning(1)_a.2_series_dimension.png';
import seriesDimProcessImg from '../../assets/2D_Image_File/2D_dimensioning(1)_a.2_series_dimension_1.png';

// Importing assets for Dimensioning (2)
import editDimDrawingImg from '../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac.jpg';
import editDimMenuImg from '../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac_1.png';
import editDimDialogImg from '../../assets/2D_Image_File/2D_dimensioning_b.1_edit_dimension_charac_2.png';
import toleranceImg from '../../assets/2D_Image_File/2D_dimensioning_tolerance.png';
import chamferRadiusImg from '../../assets/2D_Image_File/2D_dimensioning_chamfer_radius.png';

interface DimensioningLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const DimensioningLesson: React.FC<DimensioningLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setActiveStep(activeStep === stepId ? null : stepId);
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const getStepClass = (stepId: string) => `step-card interactive ${activeStep === stepId ? 'active' : ''} ${completedSteps.has(stepId) ? 'completed' : ''}`;

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3 className="section-title-main">
          <ArrowRight size={28} className="lesson-intro-icon" />
          Dimensioning ({subLessonId?.split('-').pop() || '1'})
        </h3>
        <p className="lesson-subtitle">Mastering precision annotation and automatic dimensioning tools.</p>
      </section>

      <div className="lesson-content">
        <div className="lesson-grid single-card">
          <div className="lesson-card main-dimensioning-card">
            {subLessonId === '2d-dimensioning-1' ? (
              <>
                {/* 8. Dimensioning Overview */}
                <div className="flex-col" style={{ gap: '2rem' }}>
                  <div className="flex-row--top" style={{ gap: '2rem', alignItems: 'center' }}>
                    <h4 style={{ color: 'red', margin: 0, fontSize: '1.4rem' }}>8. Dimensioning</h4>
                  </div>

                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={diimensioningImg} alt="Dimensioning Comparison" className="software-screenshot screenshot-wide" style={{ maxWidth: '90%' }} />
                  </div>
                  <div className="info-box" style={{ border: '1.5px solid red', borderRadius: '15px', padding: '1rem', background: 'white', flex: 1, marginTop: '2rem' }}>
                    <p className="p-flush">Put all the dimensions, symbols, and notes required in the drawing.</p>
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                {/* Section a: Adding dimensions */}
                <div className="sub-section-header">
                  <h4 style={{ color: 'red', fontSize: '1.25rem' }}>a. Adding dimensions</h4>
                </div>

                {/* a.1) Standard dimension */}
                <div className={getStepClass('dim1-a1')} onClick={() => toggleStep('dim1-a1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('dim1-a1') ? 'completed' : ''}`}>
                      {completedSteps.has('dim1-a1') ? <CheckCircle2 size={16} strokeWidth={3} /> : 'a.1'}
                    </span>
                    <span className="step-label" style={{ color: 'red' }}>Standard dimension</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row--top" style={{ gap: '3rem', marginTop: '1.5rem' }}>
                      <div className="flex-col" style={{ minWidth: '310px' }}>
                        <img src={standardDimMenuImg} alt="Standard Dimension Menu" className="software-screenshot screenshot-wide" />
                        <div style={{ marginTop: '-6rem', marginLeft: '20rem', marginRight: 'auto' }}>
                          <ArrowBigRight size={100} color="red" fill="red" className="process-flow-arrow" />
                        </div>
                      </div>
                      <div className="flex-col" style={{ gap: '2rem', flex: 1 }}>
                        <div className="info-box" style={{ border: '1.5px solid red', borderRadius: '15px', padding: '1.25rem', background: 'white', marginTop: '3.8rem', marginLeft: '-3.3rem' }}>
                          <p className="p-flush">Standard dimension is the basic command inputting dimension one by one.</p>
                        </div>

                        <div className="flex-col" style={{ gap: '1rem' }}>
                          <div className="image-wrapper-flush" style={{ marginTop: '15rem' }}>
                            <img src={standardDimProcessImg} alt="Standard Dimension Process" className="software-screenshot screenshot-wide" />
                          </div>
                          <div className="info-box" style={{ border: '1px solid #ff0000', borderRadius: '15px', padding: '1rem', background: 'white', width: 'fit-content', marginTop: '0.5rem' }}>
                            <p className="p-flush" style={{ fontSize: '0.95rem' }}>Pick Line1 and Line2. Place it to desire location to display actual dimension.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider-sm" style={{ margin: '1rem 0' }}></div>

                {/* a.2) Series dimension */}
                <div className={getStepClass('dim1-a2')} onClick={() => toggleStep('dim1-a2')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('dim1-a2') ? 'completed' : ''}`}>
                      {completedSteps.has('dim1-a2') ? <CheckCircle2 size={16} strokeWidth={3} /> : 'a.2'}
                    </span>
                    <span className="step-label" style={{ color: 'red' }}>Series dimension</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-row--top" style={{ gap: '3rem', marginTop: '1.5rem' }}>
                      <div className="flex-col" style={{ minWidth: '310px' }}>
                        <img src={seriesDimMenuImg} alt="Series Dimension Menu" className="software-screenshot screenshot-wide" />
                        <div style={{ marginTop: '-6rem', marginLeft: '20rem', marginRight: 'auto' }}>
                          <ArrowBigRight size={100} color="red" fill="red" className="process-flow-arrow" />
                        </div>
                      </div>
                      <div className="flex-col" style={{ gap: '2rem', flex: 1 }}>
                        <div className="info-box" style={{ border: '1.5px solid red', borderRadius: '15px', padding: '1.25rem', background: 'white', marginTop: '3.2rem', marginLeft: '-3rem' }}>
                          <p className="p-flush">Series dimension displays continuous linear dimensions.</p>
                        </div>

                        <div className="flex-row--top" style={{ gap: '2rem', marginTop: '15rem', alignItems: 'center' }}>
                          <div className="info-box" style={{ border: '1px solid #ff0000', borderRadius: '15px', padding: '1.25rem', background: 'white', flex: '0 0 280px', marginLeft: '-22rem', }}>
                            <p className="p-flush" style={{ fontSize: '0.95rem' }}>Pick L1, L2, L3 and L4 then 'GO'. Place it to desire location to display continuous linear dimension.</p>
                          </div>
                          <div className="image-wrapper-flush" style={{ flex: 1 }}>
                            <img src={seriesDimProcessImg} alt="Series Dimension Process" className="software-screenshot screenshot-wide" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : subLessonId === '2d-dimensioning-2' ? (
              <>
                {/* Section b: Editing Dimension */}
                <div className="sub-section-header">
                  <h4 style={{ color: 'red', fontSize: '1.25rem' }}>b. Editing Dimension</h4>
                </div>

                {/* b.1) Edit Dimension Characters */}
                <div className={getStepClass('dim2-b1')} onClick={() => toggleStep('dim2-b1')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('dim2-b1') ? 'completed' : ''}`}>
                      {completedSteps.has('dim2-b1') ? <CheckCircle2 size={16} strokeWidth={3} /> : 'b.1'}
                    </span>
                    <span className="step-label" style={{ color: 'red' }}>Edit Dimension Characters</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-col" style={{ gap: '2rem', marginTop: '1.5rem' }}>
                      <div className="flex-row--top" style={{ gap: '2rem' }}>
                        <div className="image-wrapper-flush" style={{ flex: 1 }}>
                          <img src={editDimDrawingImg} alt="Circular Dimension Required" className="software-screenshot screenshot-large" />
                        </div>
                        <div className="flex-col" style={{ flex: '0 0 250px', alignItems: 'center' }}>
                          <img src={editDimMenuImg} alt="Edit Characters Menu" className="software-screenshot" />
                          <div style={{ marginTop: '1rem' }}>
                            <ArrowBigRight size={60} color="red" fill="red" style={{ transform: 'rotate(90deg)' }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex-row--top" style={{ gap: '2rem', alignItems: 'center' }}>
                        <div className="info-box" style={{ border: '1.5px solid red', borderRadius: '15px', padding: '1.25rem', background: 'white', flex: 1 }}>
                          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#333' }}>
                            <li>Select the command set up for changing character dimension then click the dimension you need to edit.</li>
                            <li style={{ marginTop: '0.8rem' }}>Edit dimension characters dialog box display. Under "Mark" drop down option, select "φ" then click OK.</li>
                          </ul>
                        </div>
                        <div className="image-wrapper-flush" style={{ flex: 2.5 }}>
                          <img src={editDimDialogImg} alt="Edit Dimension Characters Dialog" className="software-screenshot screenshot-wide" style={{ maxWidth: '100%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                {/* Tolerance Section */}
                <div className="sub-section-header">
                  <h4 style={{ color: 'red', fontSize: '1.25rem' }}>Tolerance</h4>
                </div>

                <div className={getStepClass('dim2-tolerance')} onClick={() => toggleStep('dim2-tolerance')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('dim2-tolerance') ? 'completed' : ''}`}>
                      {completedSteps.has('dim2-tolerance') ? <CheckCircle2 size={16} strokeWidth={3} /> : '2'}
                    </span>
                    <span className="step-label" style={{ color: 'red' }}>Tolerance Fitting</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-col" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={toleranceImg} alt="Tolerance Settings" className="software-screenshot screenshot-wide" />
                      </div>
                      <div className="info-box" style={{ border: '1.5px solid red', borderRadius: '15px', padding: '1rem', background: 'white' }}>
                        <p className="p-flush">If fitting tolerance is required, click "convert" to show the equivalent value</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '2rem 0' }}></div>

                {/* Chamfer / Radius Section */}
                <div className="sub-section-header">
                  <h4 style={{ color: 'red', fontSize: '1.25rem' }}>Chamfer / Radius</h4>
                </div>

                <div className={getStepClass('dim2-chamfer')} onClick={() => toggleStep('dim2-chamfer')}>
                  <div className="step-header">
                    <span className={`step-number ${completedSteps.has('dim2-chamfer') ? 'completed' : ''}`}>
                      {completedSteps.has('dim2-chamfer') ? <CheckCircle2 size={16} strokeWidth={3} /> : '3'}
                    </span>
                    <span className="step-label" style={{ color: 'red' }}>Chamfer and Radius Marks</span>
                  </div>
                  <div className="step-description">
                    <div className="flex-col" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
                      <div className="image-wrapper-flush">
                        <img src={chamferRadiusImg} alt="Chamfer and Radius" className="software-screenshot screenshot-wide" />
                      </div>
                      <div className="info-box" style={{ border: '1.5px solid red', borderRadius: '15px', padding: '1rem', background: 'white' }}>
                        <p className="p-flush">Chamfer and Radius marks are no need to manually input. It will appear automatically if done right.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="placeholder-text">Content for {subLessonId} is being prepared.</p>
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
  );
};

export default DimensioningLesson;
