import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets
import partNoteImg1 from '../../assets/2D_Image_File/2D_part_note_1.png';
import partNoteImg2 from '../../assets/2D_Image_File/2D_part_note_2.png';
import textNoteImg from '../../assets/2D_Image_File/2D_part_note_text.png';

interface PartNoteLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PartNoteLesson: React.FC<PartNoteLessonProps> = ({
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Part Note / Text
          </h3>
          <p className="lesson-subtitle" style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
            Using Part Notes and Text commands to provide additional technical instructions, process details, and references in 2D drawings.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              <div className="flex-col" style={{ gap: '4rem' }}>

                {/* 1. Part Note - Process Section */}
                <div style={{ position: 'relative', flex: 1 }}>
                  <div className="info-box" style={{
                    border: '2px solid red',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    position: 'absolute',
                    top: '2rem',
                    right: '0rem',
                    zIndex: 10,
                    maxWidth: '433px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <p style={{ margin: 0, fontSize: '1.1rem', color: '#333', lineHeight: '1.6' }}>
                      Notes are also used to indicate additional instructions on the process to be applied on the part.
                    </p>
                  </div>
                  <div className="lesson-section">
                    <div className="flex-row" style={{ gap: '3rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 4.5 }}>
                        <img
                          src={partNoteImg1}
                          alt="Part Note Process Drawing"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider" style={{ borderTop: '1px solid #eee', margin: '2rem 0' }}></div>

                {/* 2. Part Note - Assemblies Section */}
                <div className="lesson-section">
                  <div className="flex-col" style={{ gap: '2rem' }}>
                    <div className="image-wrapper-flush" style={{ width: '100%' }}>
                      <img
                        src={partNoteImg2}
                        alt="Part Note Assembly Reference"
                        className="software-screenshot screenshot-wide"
                        style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
                      />
                    </div>

                    <div style={{ paddingLeft: '35rem', marginTop: '-8rem', borderTop: '1px dashed #eee', paddingTop: '1.5rem' }}>
                      <p style={{ margin: 0, color: 'red', fontWeight: 'bold', fontSize: '0.85rem', lineHeight: '1.8' }}>
                        Note:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;Aside from the given samples, note command<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;can be applied depends on the purpose and on <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;the required process to be applied.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '3rem 0' }}></div>

                {/* 11. Text Section */}
                <div>
                  <h4 style={{ color: 'black', fontWeight: 'black', fontSize: '1.75rem', marginBottom: '2.5rem' }}>
                    11. Text
                  </h4>
                  <div className="image-wrapper-flush">
                    <img
                      src={textNoteImg}
                      alt="Text Command and Configuration"
                      className="software-screenshot screenshot-wide"
                      style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', display: 'block', mixBlendMode: 'multiply' }}
                    />
                  </div>
                </div>

              </div>

              {/* Navigation */}
              <div className="lesson-navigation" style={{ marginTop: '5rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
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

export default PartNoteLesson;
