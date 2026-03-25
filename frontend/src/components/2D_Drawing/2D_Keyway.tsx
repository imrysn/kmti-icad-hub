import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Keyway
import keywayImg from '../../assets/2D_Image_File/2D_keyway.jpg';

interface KeywayLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const KeywayLesson: React.FC<KeywayLessonProps> = ({
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Keyway Standards
          </h3>
          <p className="lesson-subtitle">
            Dimensions and tolerance specifications for parallel keyways on shafts and hubs.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              <div className="flex-col" style={{ gap: '2rem' }}>


                <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={keywayImg}
                    alt="Parallel Keyway Standards Table"
                    className="software-screenshot screenshot-wide"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>


              </div>

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

export default KeywayLesson;
