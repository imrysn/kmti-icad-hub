import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Additional View (1)
import additionalView1Img1 from '../../assets/2D_Image_File/2D_additional_view(1)_a.png';
import additionalView1Img2 from '../../assets/2D_Image_File/2D_additional_view(1)_a2.png';

// Importing assets for Additional View (2)
import additionalView2ImgB from '../../assets/2D_Image_File/2D_additional_view(2)_b.png';
import additionalView2ImgC from '../../assets/2D_Image_File/2D_additional_view(2)_c.png';

// Importing assets for Additional View (3)
import additionalView3ImgD from '../../assets/2D_Image_File/2D_additional_view(3)_d.png';
import additionalView3ImgE from '../../assets/2D_Image_File/2D_additional_view(3)_e.png';

// Importing assets for Additional View (4)
import additionalView4ImgF from '../../assets/2D_Image_File/2D_additional_view(4)_f.png';

interface AdditionalViewLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const AdditionalViewLesson: React.FC<AdditionalViewLessonProps> = ({
  subLessonId = '2d-additional-view-1',
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            20. ADDITIONAL VIEW
          </h3>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              {subLessonId === '2d-additional-view-1' ? (
                <div className="flex-col" style={{ gap: '3rem' }}>
                  {/* a. Cross Section View Section */}
                  <div id="cross-section-view">
                    <h4 style={{ color: 'red', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '2rem' }}>
                      a. Cross Section View
                    </h4>

                    {/* Steps 1-4 */}
                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start', marginBottom: '3rem' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img
                          src={additionalView1Img1}
                          alt="Cross Section View Steps 1-4"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>

                    {/* Step 6 and Dialog Box Content */}
                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1.2 }}>
                        <img
                          src={additionalView1Img2}
                          alt="Cross Section View Dialog and Steps 5-6"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Note */}
                  <div style={{ marginTop: '2rem' }}>
                    <p style={{ color: 'red', fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Note: The text height of the section name should be the same with dimension text height.
                    </p>
                  </div>
                </div>
              ) : subLessonId === '2d-additional-view-2' ? (
                <div className="flex-col" style={{ gap: '4rem' }}>

                  {/* b. Partial Section Section */}
                  <div id="partial-section">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                      b. Partial Section <span style={{ fontWeight: 'normal', color: '#666' }}>- use to make a cross-section of a part partially</span>
                    </h4>

                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start', marginBottom: '3rem' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img
                          src={additionalView2ImgB}
                          alt="Partial Section Operations"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                  {/* c. Detail Drawing Section */}
                  <div id="detail-drawing">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                      c. Detail drawing <span style={{ fontWeight: 'normal', color: '#666' }}>- use to detail a view on a bigger scale from a different view.</span>
                    </h4>

                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img
                          src={additionalView2ImgC}
                          alt="Detail Drawing Procedure"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ) : subLessonId === '2d-additional-view-3' ? (
                <div className="flex-col" style={{ gap: '4rem' }}>

                  {/* d. Isometric View Section */}
                  <div id="isometric-view">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                      d. Isometric View
                    </h4>



                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start', marginBottom: '3rem' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img
                          src={additionalView3ImgD}
                          alt="Isometric View Steps"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                  {/* e. Cross-sectional depth Section */}
                  <div id="cross-sectional-depth">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                      e. Cross-sectional depth
                    </h4>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      There are some instances that the cross-sectional view have parts which is not related to the desired view to be seen, we can set the cross-sectional depth to eliminate the unnecessary parts.
                    </p>

                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img
                          src={additionalView3ImgE}
                          alt="Cross-sectional depth Steps"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ) : subLessonId === '2d-additional-view-4' ? (
                <div className="flex-col" style={{ gap: '4rem' }}>

                  {/* f. Trim Section */}
                  <div id="trim-view">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                      f. Trim <span style={{ fontWeight: 'normal', color: '#666' }}>- another way to eliminate parts that are not needed on a certain view. This can not be applied on Detail Drawing.</span>
                    </h4>

                    <div className="flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1 }}>
                        <img
                          src={additionalView4ImgF}
                          alt="Trim View Steps"
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

export default AdditionalViewLesson;
