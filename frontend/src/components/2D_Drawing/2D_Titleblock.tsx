import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowBigDown } from 'lucide-react';
import titleBlock1Img from '../../assets/2D_Image_File/2D_title_block_1.png';
import titleBlock2Img from '../../assets/2D_Image_File/2D_title_block_2.png';
import titleBlock3Img from '../../assets/2D_Image_File/2D_title_block_3.png';

interface TitleBlockLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const TitleBlockLesson: React.FC<TitleBlockLessonProps> = ({
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro" style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column' }}>
          <h3 className="section-title-main" style={{ color: 'red' }}>
            <ArrowLeft size={28} className="lesson-intro-icon" />
            19. Title Block
          </h3>
          <p className="lesson-subtitle" style={{ fontSize: '1.2rem', color: 'black', marginTop: '0.8rem', fontWeight: '500', maxWidth: '900px', lineHeight: '1.5', margin: '0 auto' }}>
            Displays part informations, such as Job Order, Drawing Number, Part & Machine Name, Drawn & Designer Name, Cross Reference and Previous Drawing Number and...
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">

              <div className="flex-col" style={{ gap: '2rem', alignItems: 'center' }}>

                {/* Section 1: Main Fields and Procedure */}
                <div className="lesson-section">
                  <div className="flex-col" style={{ alignItems: 'center' }}>
                    <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1100px' }}>
                      <img
                        src={titleBlock1Img}
                        alt="Title Block Field Definitions and Creation Procedure"
                        className="software-screenshot screenshot-wide"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-row" style={{ justifyContent: 'center', width: '100%', margin: '2rem 0' }}>
                  <ArrowBigDown size={85} fill="red" color="red" />
                </div>

                {/* Section 2: Data Reflection and Notes */}
                <div className="lesson-section" style={{ width: '100%' }}>
                  <div className="flex-col" style={{ alignItems: 'center' }}>
                    <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1100px' }}>
                      <img
                        src={titleBlock2Img}
                        alt="Title Block Data Reflection and Technical Notes"
                        className="software-screenshot screenshot-wide"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-row" style={{ justifyContent: 'center', width: '100%', margin: '2rem 0' }}>
                  <ArrowBigDown size={85} fill="red" color="red" />
                </div>

                {/* Section 3: Placement Landmarks */}
                <div className="lesson-section">
                  <div className="flex-col" style={{ alignItems: 'center' }}>
                    <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1100px' }}>
                      <img
                        src={titleBlock3Img}
                        alt="Title Block Placement Landmarks (P1, P2)"
                        className="software-screenshot screenshot-wide"
                        style={{ width: '100%' }}
                      />
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

export default TitleBlockLesson;
