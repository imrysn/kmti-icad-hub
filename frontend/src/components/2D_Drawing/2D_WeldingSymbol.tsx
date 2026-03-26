import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, MoveDown } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Welding Symbol and Notes
import weldingSymbolMainImg from '../../assets/2D_Image_File/2D_welding_symbol.png';
import weldingSymbolNotesImg from '../../assets/2D_Image_File/2D_welding_symbol_notes.jpg';
import standardNotesImg from '../../assets/2D_Image_File/2D_welding_symbol_standard_notes.jpg';

interface WeldingSymbolLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const WeldingSymbolLesson: React.FC<WeldingSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Welding Symbol / Notes
          </h3>
          <p className="lesson-subtitle" style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
            Procedures for applying welding symbols, hatches, and standard notes to ensure fabrication accuracy and technical compliance.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              <div className="flex-col" style={{ gap: '4rem' }}>

                {/* 13. Welding Symbol Section */}
                <div id="welding-symbol-section">
                  <h4 style={{ color: 'red', fontWeight: 'bold', fontSize: '1.6rem', marginBottom: '2.5rem' }}>
                    13. Welding Symbol
                  </h4>

                  <div className="flex-col" style={{ alignItems: 'center', marginBottom: '3rem' }}>
                    <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '900px' }}>
                      <img
                        src={weldingSymbolMainImg}
                        alt="Welding Symbol Menu Selection"
                        className="software-screenshot screenshot-wide"
                      />
                    </div>
                  </div>


                  <div className="flex-row" style={{ gap: '3rem', alignItems: 'flex-start' }}>
                    <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.75rem', background: 'white', flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '1.05rem', color: '#333', lineHeight: '1.8' }}>
                        ※ Before indicating the welding symbol on the drawing, welding hatches shall be put up first as representation of welding on actual fabrication.<br /><br />
                        ※ Select and put all the required details for welding on the dialog box, then click OK. Place it together with welding hatch.
                      </p>
                      <div style={{ marginTop: '2rem' }}>
                        <p style={{ margin: 0, color: 'red', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.05rem', lineHeight: '1.8' }}>
                          Notes:<br />
                          1. Arrow line acts as a welding torch on the actual job.<br />
                          2. The leg length of the welding is 60% of plate thickness (thinner side) unless specified.<br />
                          3. Welding hatches is not necessarily applicable in all parts; there are some instances that the detail is too small, so it is no need to put hatches anymore.<br />
                          4. Welding hatch in hidden area is not necessary.
                        </p>
                      </div>
                    </div>
                    <div className="image-wrapper-flush" style={{ flex: 1.2 }}>
                      <img
                        src={weldingSymbolNotesImg}
                        alt="Welding Hatches and Symbol Sample Drawing"
                        className="software-screenshot screenshot-wide"
                        style={{ border: '2px solid #eee', borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="section-divider" style={{ borderTop: '2px solid #eee', margin: '2rem 0' }}></div>

                {/* 14. Notes Section */}
                <div id="notes-section">
                  <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '2rem' }}>
                    14. Notes <span style={{ fontWeight: 'normal', color: '#666' }}>—— Notes are always located in the upper left corner of the template.</span>
                  </h4>

                  <div className="lesson-section">
                    <h5 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'red', marginBottom: '1.5rem', textDecoration: 'underline' }}>a. Standard Notes</h5>
                    <div className="flex-row" style={{ gap: '3rem', alignItems: 'flex-start' }}>
                      <div className="image-wrapper-flush" style={{ flex: 1.2 }}>
                        <img
                          src={standardNotesImg}
                          alt="Standard Notes location in Title Block"
                          className="software-screenshot screenshot-wide"
                          style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                      <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.75rem', background: 'white', flex: 1 }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#333', lineHeight: '1.6' }}>Standard notes:</p>
                          <p style={{ margin: 0, fontSize: '1.1rem', color: '#333', lineHeight: '1.6' }}>
                            1. Tap, drill hole shall be chamfered finish.<br />
                            2. Corner without any instruction shall be slightly chamfer.<br />
                            3. When completed, burrs and dust must not exist.
                          </p>
                        </div>
                        <div>
                          <p style={{ margin: 0, color: 'red', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1.6' }}>Notes:</p>
                          <p style={{ margin: 0, color: 'red', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            1. These three standard notes automatically appear from the beginning while selecting the template.<br />
                            2. First line can be eliminated if tapping hole and drill hole are not present on the drawing.<br />
                            3. Text properties are not allowed to change.<br />
                            4. It is place under the special notes.
                          </p>
                        </div>
                      </div>
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

export default WeldingSymbolLesson;
