import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Surface Coating
import surfaceCoatingTableImg from '../../assets/2D_Image_File/2D_surface_coating.jpg';
import specialNotesImg from '../../assets/2D_Image_File/2D_surface_coating_special_notes.jpg';
import copyMoveImg from '../../assets/2D_Image_File/2D_surface_coating_copy_move.png';

interface SurfaceCoatingLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const SurfaceCoatingLesson: React.FC<SurfaceCoatingLessonProps> = ({
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro" style={{ marginBottom: '3rem' }}>
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Surface Coating
          </h3>
          <p className="lesson-subtitle" style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
            Technical specifications for surface finishing processes and procedures for managing special notes and entity duplication on drawings.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              <div className="flex-col" style={{ gap: '4rem' }}>

                {/* Surface Coating Table Section */}
                <div className="lesson-section">
                  <div className="image-wrapper-flush" style={{ background: 'white', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <img
                      src={surfaceCoatingTableImg}
                      alt="Surface Coating Specification Table"
                      className="software-screenshot screenshot-wide"
                      style={{ width: '100%', mixBlendMode: 'multiply' }}
                    />
                  </div>
                </div>

                <div className="section-divider" style={{ borderTop: '2px solid #eee', margin: '1rem 0' }}></div>

                {/* b. Special Notes Section */}
                <div className="lesson-section">
                  <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '2rem' }}>
                    b. Special Notes
                  </h4>
                  <div className="flex-row" style={{ gap: '3rem', alignItems: 'flex-start' }}>
                    <div className="image-wrapper-flush" style={{ flex: 1.2 }}>
                      <img
                        src={specialNotesImg}
                        alt="Special Notes location in Drawing Template"
                        className="software-screenshot screenshot-wide"
                        style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.75rem', background: 'white', flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'red', marginBottom: '1rem' }}>
                        Special notes
                      </p>
                      <p style={{ margin: 0, fontSize: '1.05rem', color: '#333', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        It can be the following:<br />
                        1. Heat & surface treatment (if part requires hardness).<br />
                        2. Welding notes (if part is too big and details are too crowded).<br />
                        3. Notes pertaining to specific portion of the part.<br />
                        4. Machine before welding.<br />
                        5. Additional process notes for purchase parts.
                      </p>
                      <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'red', marginBottom: '0.5rem' }}>
                        Notes:
                      </p>
                      <p style={{ margin: 0, fontSize: '1.05rem', color: 'red', lineHeight: '1.6' }}>
                        1. If two or more special notes needed for the drawing, it will arrange on what process will be done first.<br />
                        2. Text properties need to be match with standard notes.
                      </p>
                    </div>
                  </div>
                </div>



                {/* c. Copy / Move Section */}
                <div className="lesson-section">
                  <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '2rem', marginTop: '3rem' }}>
                    c. Copy / Move
                  </h4>
                  <div className="flex-row" style={{ gap: '3rem', alignItems: 'center' }}>
                    <div className="image-wrapper-flush" style={{ flex: 1.8 }}>
                      <img
                        src={copyMoveImg}
                        alt="Copy and Move Command Configuration"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.75rem', background: 'white', flex: 0.8 }}>
                      <p style={{ margin: 0, fontSize: '1.05rem', color: 'black', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                        Copy and move has the same procedure. The only difference it that copy will multiply its quantity while move will only change location.
                      </p>
                      <p style={{ margin: 0, fontSize: '1.05rem', color: 'black', lineHeight: '1.8' }}>
                        1. Click copy command. Click P1 then 'GO'.<br />
                        2. Click P2 for reference.<br />
                        3. Click P3 for the new location of entity.
                      </p>
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

export default SurfaceCoatingLesson;
