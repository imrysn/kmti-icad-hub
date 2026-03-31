import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_OperalView.css';

// Importing assets for Operate View (1)
import operateView1ImgA from '../../assets/2D_Image_File/2D_operate_view(1)_a.jpg';
import operateView1ImgA1 from '../../assets/2D_Image_File/2D_operate_view(1)_a1.jpg';
import operateView1ImgB2 from '../../assets/2D_Image_File/2D_operate_view(1)_b2.jpg';
import operateView1ImgB2_2 from '../../assets/2D_Image_File/2D_operate_view(1)_b2_2.png';

interface OperalViewLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OperalViewLesson: React.FC<OperalViewLessonProps> = ({
  subLessonId = '2d-operate-view-1',
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            21. Operate View
          </h3>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              {subLessonId === '2d-operate-view-1' ? (
                <div className="flex-col" style={{ gap: '4rem' }}>

                  {/* a. Move view */}
                  <div id="move-view">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                      a. Move view
                    </h4>

                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img
                          src={operateView1ImgA}
                          alt="Move View"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                  {/* a.1) Isometric view */}
                  <div id="isometric-view-move">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                      a.1) Isometric view
                    </h4>

                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img
                          src={operateView1ImgA1}
                          alt="Isometric View Move"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                  {/* b.2) Orthographic view */}
                  <div id="orthographic-view-move">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                      b.2) Orthographic view
                    </h4>

                    <div className="flex-col" style={{ gap: '2rem' }}>
                      <div className="image-wrapper-flush">
                        <img
                          src={operateView1ImgB2}
                          alt="Orthographic View Move"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                      <div className="image-wrapper-flush">
                        <img
                          src={operateView1ImgB2_2}
                          alt="Orthographic View Align"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="content-placeholder">
                  <p>Lesson content for {subLessonId} will be provided soon.</p>
                </div>
              )}

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

export default OperalViewLesson;

