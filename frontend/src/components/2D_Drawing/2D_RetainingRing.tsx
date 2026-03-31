import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Retaining Ring
import retaining1Img from '../../assets/2D_Image_File/2D_retaining_ring_(1).jpg';
import retaining2Img from '../../assets/2D_Image_File/2D_retaining_ring_(2).jpg';

interface RetainingRingLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const RetainingRingLesson: React.FC<RetainingRingLessonProps> = ({
  subLessonId = '2d-retaining-ring-1',
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Retaining Ring {subLessonId === '2d-retaining-ring-1' ? '(1)' : '(2)'}
          </h3>
          <p className="lesson-subtitle">
            {subLessonId === '2d-retaining-ring-1'
              ? 'Dimensional specifications and assembly standards for External C-Type Retaining Rings.'
              : 'Dimensional specifications and assembly standards for Internal C-Type Retaining Rings.'}
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              {subLessonId === '2d-retaining-ring-1' ? (
                <div className="flex-col" style={{ gap: '2rem' }}>

                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={retaining1Img}
                      alt="Retaining Rings-C Type-External Standards"
                      className="software-screenshot screenshot-wide"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        border: '1px solid #eee',
                        borderRadius: '4px'
                      }}
                    />
                  </div>


                </div>
              ) : (
                <div className="flex-col" style={{ gap: '2rem' }}>

                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={retaining2Img}
                      alt="Retaining Rings-C Type-Internal Standards"
                      className="software-screenshot screenshot-wide"
                      style={{ maxWidth: '100%' }}
                    />
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

export default RetainingRingLesson;
