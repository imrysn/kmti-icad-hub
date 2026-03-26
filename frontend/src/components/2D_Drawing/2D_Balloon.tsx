import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import balloonPartMenuImg from '../../assets/2D_Image_File/2D_balloon_part_drawing.png';
import balloonPartDiagramImg from '../../assets/2D_Image_File/2D_balloon_part_drawing_2.jpg';
import balloonPartInputImg from '../../assets/2D_Image_File/2D_balloon_part_drawing_3.png';
import balloonAssemblyMenuImg from '../../assets/2D_Image_File/2D_balloon_assembly_drawing_1.png';

interface BalloonLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BalloonLesson: React.FC<BalloonLessonProps> = ({
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro" style={{ marginBottom: '3rem' }}>
          <h3 className="section-title-main" style={{ color: '#dc2626' }}>
            <ArrowLeft size={28} className="lesson-intro-icon" />
            18. Balloon
          </h3>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">

              {/* a. Part drawing Section */}
              <div className="lesson-section">
                <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '3rem' }}>
                  a. Part drawing
                </h4>

                <div className="flex-col" style={{ alignItems: 'center', marginBottom: '5rem' }}>
                  <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '900px' }}>
                    <img
                      src={balloonPartMenuImg}
                      alt="Part Balloon Menu Selection"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>

                <div className="flex-row" style={{ gap: '4rem', alignItems: 'flex-start', marginBottom: '4rem' }}>
                  <div className="flex-col" style={{ flex: 1.5, gap: '3rem' }}>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white' }}>
                      <p style={{ margin: 0, fontSize: '1.1rem', color: 'black', lineHeight: '1.7' }}>
                        Select the command for part balloon. Click <strong>L1</strong> of the part that needs balloon, then <strong>P1</strong> to locate it properly.
                      </p>
                    </div>
                    <div className="image-wrapper-flush" style={{ position: 'relative' }}>
                      <img
                        src={balloonPartDiagramImg}
                        alt="Part Balloon Landmark Diagram (P1, L1)"
                        className="software-screenshot screenshot-wide"
                      />
                      {/* Part Balloon Input Box Overlay */}
                      <div style={{ position: 'absolute', bottom: '-25%', left: '1%', zIndex: 10, overflow: 'hidden' }}>
                        <img
                          src={balloonPartInputImg}
                          alt="Part Balloon Input Box"
                          style={{ height: '45px', display: 'block' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.75rem', background: 'white', flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '1.1rem', color: 'black', lineHeight: '1.7' }}>
                      A balloon will be placed where the part image is clearly shown.<br /><br />
                      <strong>Notes:</strong><br />
                      1. Balloons should not overlap with other lines or dimensions.<br /><br />
                      2. If the details on the BOM are properly linked, part balloons are automatically displayed.<br /><br />
                      3. If part balloon is not displayed, the drawing and the BOM properties is not linked. Do not manually input the letters / numbers in item entry box.<br /><br />
                      4. Text should not change using edit characters.
                    </p>
                  </div>
                </div>
              </div>


              {/* b. Assembly drawing Section */}
              <div className="lesson-section">
                <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '3rem' }}>
                  b. Assembly drawing
                </h4>

                <div className="flex-col" style={{ alignItems: 'center', marginBottom: '5rem' }}>
                  <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '900px' }}>
                    <img
                      src={balloonAssemblyMenuImg}
                      alt="Add Balloon Menu Selection"
                      className="software-screenshot screenshot-wide"
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

export default BalloonLesson;
