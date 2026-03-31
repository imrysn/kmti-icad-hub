import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_NormalMirrorParts.css';

// Import images
import img1 from '../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_1.jpg';
import img2 from '../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_2.jpg';
import img3 from '../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_3.jpg';
import img4 from '../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_4.jpg';
import img5 from '../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_5.jpg';

interface NormalMirrorPartsLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const NormalMirrorPartsLesson: React.FC<NormalMirrorPartsLessonProps> = ({
  subLessonId = '2d-normal-mirror-1',
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">

        {/* Intro Banner */}
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            22. Normal and Mirror parts
          </h3>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">

              {subLessonId === '2d-normal-mirror-1' ? (
                <div className="normal-mirror-wrapper">

                  {/* Definitions */}
                  <div className="def-container">
                    <div className="def-row">
                      <div className="def-label">
                        <span className="red-bold">Normal</span>
                      </div>
                      <div className="def-value">
                        <span>Example drawing number RTXXXXXX<span className="red-bold">N</span>01</span>
                      </div>
                    </div>

                    <div className="def-row" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                      <div className="def-label">
                        <span className="red-bold">Mirror parts</span>
                      </div>
                      <div className="def-value">
                        <span>are parts that are symmetrically the same.</span><br />
                        <span>Example drawing number RTXXXXXX<span className="red-bold">A</span>01 &amp; RTXXXXXX<span className="red-bold">B</span>01</span>
                      </div>
                    </div>

                    <div className="rule-title">
                      <span className="red-bold">※ Rule on how to detail a mirror parts</span>
                    </div>
                  </div>

                  {/* Main Grid Content */}
                  <div className="mirror-grid-layout">

                    {/* Upper Left & Upper Right Row */}
                    <div className="mirror-row flex-top">
                      <div className="mirror-col left-col">
                        <div className="image-wrapper-flush">
                          <img src={img4} alt="Detailing 1" className="software-screenshot screenshot-wide" />
                        </div>
                        <div className="red-box">
                          <p>1. Detail the first drawing, for example RTXXXXXXA01.</p>
                          <p>2. Proceed to checking and editing of check back until finalized the part.</p>
                        </div>
                      </div>
                      <div className="mirror-col right-col">
                        <div className="image-wrapper-bordered">
                          <img src={img1} alt="Isometric 1" className="software-screenshot screenshot-wide" />
                        </div>

                      </div>
                    </div>

                    {/* Middle Row */}
                    <div className="mirror-row flex-center" style={{ marginTop: '-1rem' }}>
                      <div className="mirror-col left-col">
                        <div className="red-box">
                          <p>3. Save as RTXXXXXXA01 to RTXXXXXXB01.<br />Replace part if it is already existed.</p>
                          <p>4. Properly mirror the part using mirror icon.<br />Edit properties and part dimension affected by mirror process. <span className="red-text small-text">※※※ procedures on 3D modeling</span></p>
                          <p>5. Proceed on editing 2D detailing.</p>
                        </div>
                      </div>
                      <div className="mirror-col right-col flex-end">
                        <div className="image-wrapper-bordered">
                          <img src={img3} alt="Isometric 2" className="software-screenshot" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="mirror-row flex-top">
                      <div className="mirror-col left-col flex-row">
                        <div className="image-wrapper-flush toolbar-img-wrapper">
                          <img src={img2} alt="Toolbar" className="software-screenshot toolbar" />
                        </div>
                        <div className="red-box flex-1">
                          <p>6. View inside the box need to mirror, the reference is in origin same as what we do in 3D modeling. <span className="red-text small-text">※※※ page 40</span></p>
                          <p>7. Encircled view is right side view. Mirror it and change ownership to left side view. <span className="red-text small-text">※※※ page 40</span></p>
                          <p>8. Update isometric view, switch user view as needed. <span className="red-text small-text">※※※ page 34</span></p>
                          <p>9. Insert new title block to update the drawing number on template. <span className="red-text small-text">※※※ page 33</span></p>
                        </div>
                      </div>
                      <div className="mirror-col right-col">
                        <div className="image-wrapper-flush">
                          <img src={img5} alt="Detailing 2" className="software-screenshot screenshot-wide" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : subLessonId === '2d-normal-mirror-2' ? (
                <div className="content-placeholder">
                  <p>Placeholder for Normal and Mirror Parts content. Sub-lessons: (2)</p>
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

export default NormalMirrorPartsLesson;

