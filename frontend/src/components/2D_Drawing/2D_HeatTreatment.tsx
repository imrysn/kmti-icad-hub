import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Heat Treatment
import heatTreatmentImg1 from '../../assets/2D_Image_File/2D_heat_treatment_(1).jpg';
import heatTreatmentImg2 from '../../assets/2D_Image_File/2D_heat_treatment_(2).jpg';
import heatTreatmentProcessImg2 from '../../assets/2D_Image_File/2D_heat_treatment_(2)_heat_treatment_process.jpg';
import heatTreatmentProcessImg3 from '../../assets/2D_Image_File/2D_heat_treatment_(3)_heat_treatment_process.jpg.png';
import heatTreatmentProcessImg4 from '../../assets/2D_Image_File/2D_heat_treatment_(4)_heat_treatment_process.jpg';

interface HeatTreatmentLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const HeatTreatmentLesson: React.FC<HeatTreatmentLessonProps> = ({
  subLessonId = '2d-heat-treatment-1',
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Heat Treatment ({subLessonId.split('-').pop()})
          </h3>
          <p className="lesson-subtitle" style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
            Technical specifications and reference data for engineering heat treatment processes including thermal refining, hardening, and nitriding.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              <div className="flex-col" style={{ gap: '3rem' }}>

                {subLessonId === '2d-heat-treatment-1' ? (
                  <div className="lesson-section">
                    <div className="image-wrapper-flush" style={{ background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                      <img
                        src={heatTreatmentImg1}
                        alt="Heat Treatment Material and Specification Table"
                        className="software-screenshot screenshot-wide"
                        style={{ width: '100%', mixBlendMode: 'multiply' }}
                      />
                    </div>
                  </div>
                ) : subLessonId === '2d-heat-treatment-2' ? (
                  <div className="flex-col" style={{ gap: '4rem' }}>
                    {/* Part 2 - Material Table Continuation */}
                    <div className="lesson-section">
                      <div className="image-wrapper-flush" style={{ background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <img
                          src={heatTreatmentImg2}
                          alt="Heat Treatment Material and Specification Table Continued"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%', mixBlendMode: 'multiply' }}
                        />
                      </div>
                    </div>

                    {/* Rev Notes Section */}
                    <div className="lesson-section" style={{ padding: '2rem' }}>
                      <div className="flex-col" style={{ gap: '1rem' }}>
                        {[
                          { rev: 'Rev2', text: 'Expression of hardness' },
                          { rev: 'Rev3', text: 'KEM Style is the same as usual. Follow JIS for English words' },
                          { rev: 'Rev6', text: "It's hard to make warp because parsonite hardening process treatment is done by 480°C. Ion nitriding treatment is done by 580°C. We set HV400 and HV300 to cut treatment time to avoid a warp." },
                          { rev: 'Rev9', text: 'Traditionally, the blade of SW is HS78±2, and results of checking hardness is 78 or 79. Also, there is no report about performance, so we keep this hardness standard.' },
                          { rev: 'Rev10', text: 'We have changed hardness standards of through hardening for S50C and S55C and induction hardening.' },
                          { rev: 'Rev11', text: 'Describe thermal refining hardness for each material. It follows the standard of JIS.' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--primary)', minWidth: '60px' }}>{item.rev}:</span>
                            <span style={{ color: '#444', lineHeight: '1.6' }}>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Heat Treatment Process Table */}
                    <div className="lesson-section">
                      <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem', marginTop: '1rem', paddingLeft: '1rem' }}>
                        Heat Treatment Process
                      </h4>
                      <div className="image-wrapper-flush" style={{ background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <img
                          src={heatTreatmentProcessImg2}
                          alt="Heat Treatment Process Table"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%', mixBlendMode: 'multiply' }}
                        />
                      </div>
                    </div>
                  </div>
                ) : subLessonId === '2d-heat-treatment-3' ? (
                  <div className="flex-col" style={{ gap: '4rem' }}>
                    <div className="lesson-section">
                      <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem', paddingLeft: '1rem' }}>
                        Heat Treatment Process (Continued)
                      </h4>
                      <div className="image-wrapper-flush" style={{ background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <img
                          src={heatTreatmentProcessImg3}
                          alt="Heat Treatment Process Table Continued"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%', mixBlendMode: 'multiply' }}
                        />
                      </div>
                    </div>
                  </div>
                ) : subLessonId === '2d-heat-treatment-4' ? (
                  <div className="flex-col" style={{ gap: '4rem' }}>
                    <div className="lesson-section">
                      <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem', paddingLeft: '1rem' }}>
                        Heat Treatment Process (Final)
                      </h4>
                      <div className="image-wrapper-flush" style={{ background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <img
                          src={heatTreatmentProcessImg4}
                          alt="Heat Treatment Process Table Final"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%', mixBlendMode: 'multiply' }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="content-2d-placeholder">
                    <h3>Content coming soon</h3>
                    <p>Sub-lesson {subLessonId} content is under implementation.</p>
                  </div>
                )}

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

export default HeatTreatmentLesson;
