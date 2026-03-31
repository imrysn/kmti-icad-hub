import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, MoveDown } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Machining Symbol
import machiningSymbolMainImg from '../../assets/2D_Image_File/2D_machining_symbol.png';
import machiningSymbolNoteImg from '../../assets/2D_Image_File/2D_machining_symbol_note.jpg';
import machiningSurfaceCondImg from '../../assets/2D_Image_File/2D_machining_symbol_machining_surface_condiiton.jpg';

interface MachiningSymbolLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MachiningSymbolLesson: React.FC<MachiningSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Machining Symbol
          </h3>
          <p className="lesson-subtitle" style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
            Understanding machining symbols and surface condition requirements to ensure precision parts and required surface finishes.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              <div className="flex-col" style={{ gap: '3.5rem' }}>

                {/* 12. Machining Symbols - Title Header */}
                <div>
                  <h4 style={{ color: 'red', fontWeight: 'bold', fontSize: '1.6rem', marginBottom: '2.5rem' }}>
                    12. Machining Symbols
                  </h4>

                  <div className="flex-row">
                    <div className="image-wrapper-flush" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={machiningSymbolMainImg}
                        alt="Machining Symbol Selection"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Arrow and Sample Drawing */}
                <div className="flex-col" style={{ gap: '2rem', alignItems: 'center', marginTop: '1rem' }}>
                  <div style={{ background: '#f8f9fa', padding: '0.5rem 2rem', borderRadius: '50px', marginLeft: '35rem', marginTop: '-12rem', zIndex: 10 }}>
                    <MoveDown size={40} color="red" strokeWidth={3} />
                  </div>

                  <div className="image-wrapper-flush" style={{ maxWidth: '508px', width: '100%', marginLeft: '23.2rem', marginTop: '0.5rem' }}>
                    <img
                      src={machiningSymbolNoteImg}
                      alt="Machining Symbol Implementation Sample"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>

                  <div style={{ maxWidth: '420px', width: '100%', padding: '1rem', marginTop: '-8rem' }}>
                    <p style={{ margin: 0, color: 'red', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1rem', lineHeight: '1.6' }}>
                      Note: Machining symbol with open & close parenthesis indicates that the part must be machined before welding. Machining after welding will be impossible.
                    </p>
                  </div>
                </div>

                <div className="section-divider" style={{ borderTop: '2px solid #eee', margin: '2rem 0' }}></div>

                {/* a. Machining Surface Condition */}
                <div className="lesson-section">
                  <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '2rem' }}>
                    a. Machining Surface Condition
                  </h4>
                  <div className="image-wrapper-flush" style={{ background: 'white', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <img
                      src={machiningSurfaceCondImg}
                      alt="Machining Surface Condition Reference Table"
                      className="software-screenshot screenshot-wide"
                      style={{ width: '100%', mixBlendMode: 'multiply' }}
                    />
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

export default MachiningSymbolLesson;
