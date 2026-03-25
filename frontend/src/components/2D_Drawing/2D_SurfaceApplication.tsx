import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Application of Surface (1)
import shotblast1Img from '../../assets/2D_Image_File/2D_application_surface((1)_application_surface_1.png';
import shotblast2Img from '../../assets/2D_Image_File/2D_application_surface((1)_application_surface_2.png';

// Importing assets for Application of Surface (2)
import machiningImg from '../../assets/2D_Image_File/2D_application_surface((2)_machining.png';
import machining2Img from '../../assets/2D_Image_File/2D_application_surface((2)_machining_2.png';

interface SurfaceApplicationLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const SurfaceApplicationLesson: React.FC<SurfaceApplicationLessonProps> = ({
  subLessonId = '2d-surface-app-1',
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro">
          <h3 className="section-title-main">
            <ArrowLeft size={28} className="lesson-intro-icon" />
            Application of Surface {subLessonId === '2d-surface-app-1' ? '(1)' : subLessonId === '2d-surface-app-2' ? '(2)' : ''}
          </h3>
          <p className="lesson-subtitle">
            {subLessonId === '2d-surface-app-1'
              ? 'Techniques and classifications for surface treatment and black skin removal using Shotblasting.'
              : 'Advanced surface machining and preparation processes.'}
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">
              {subLessonId === '2d-surface-app-1' ? (
                <div className="flex-col" style={{ gap: '2.5rem' }}>
                  {/* Introductory Info Box */}
                  <div className="info-box-white" style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '4px' }}>
                    <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.6', color: '#333' }}>
                      Before the Application of Surface Treatment/ Coating, the black skin of the material must be removed first to the part. There are two (2) processes that we can apply on the part to remove the black skin;<br />
                      <strong style={{ color: 'red' }}>(1) Shotblasting(Black skin Removal)</strong> and <strong style={{ color: 'red' }}>(2) Machining.</strong>
                    </p>
                  </div>

                  {/* 1. Shotblasting Section */}
                  <div>


                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      <strong style={{ color: 'red' }}>1. Shotblasting</strong> is an operation of forcibly propelling a stream of abrasive material against a surface under high pressure to <span style={{ color: 'red', fontStyle: 'italic', fontWeight: '600' }}>smooth a rough surface, roughen a smooth surface, shape a surface or remove surface contaminants.</span>
                    </p>

                    <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                      There are two(2) classification of Shotblasting base on the purpose of application, process needed to apply on the part and purpose of the part.
                    </p>

                    {/* a. Common Usage */}
                    <div style={{ marginBottom: '2.5rem' }}>
                      <h5 style={{ color: 'red', fontSize: '1.2rem', marginBottom: '1rem' }}>a. Shotblasting is commonly used for:</h5>
                      <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '1.5rem' }}>
                        <li style={{ listStyle: 'disc' }}>removal of stress after welding process</li>
                        <li style={{ listStyle: 'disc' }}>removal of stress or deformation after refine machining process</li>
                        <li style={{ listStyle: 'disc' }}>mechanical cleaning of raw materials</li>
                        <li style={{ listStyle: 'disc' }}>increase resistance to fatigue (Corrosion may occur after removal)</li>
                        <li style={{ listStyle: 'disc' }}>preparing surfaces for painting</li>
                      </ul>

                      <p style={{ color: 'red', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>Example:</p>
                      <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <img src={shotblast1Img} alt="Shotblasting Example 1 - Welding Stress" className="software-screenshot screenshot-wide" style={{ maxWidth: '900px' }} />
                      </div>
                      <p style={{ fontStyle: 'italic', color: '#555', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        For this part, <span style={{ color: 'red', fontWeight: 'bold' }}>shotblasting</span> is applied to remove the stress from the welding process and in preparation of painting.
                      </p>
                    </div>

                    <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                    {/* b. Black Skin Removal */}
                    <div style={{ marginBottom: '1rem' }}>
                      <h5 style={{ color: 'red', fontSize: '1.2rem', marginBottom: '1rem' }}>b. Shotblasting(Black skin Removal) is used for:</h5>
                      <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '1.5rem' }}>
                        <li style={{ listStyle: 'disc' }}>removal of black skin of part or material</li>
                        <li style={{ listStyle: 'disc' }}>increase resistance to fatigue (Corrosion may occur after removal)</li>
                        <li style={{ listStyle: 'disc' }}>preparing for application of Surface Coating/ Treatment. ex. Isonite, Ionite, Parsonite, etc.</li>
                      </ul>

                      <p style={{ color: 'red', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>Example:</p>
                      <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <img src={shotblast2Img} alt="Shotblasting Example 2 - Black Skin Removal" className="software-screenshot screenshot-wide" style={{ maxWidth: '900px' }} />
                      </div>
                      <p style={{ fontStyle: 'italic', color: '#555', lineHeight: '1.6' }}>
                        For the given example, <span style={{ color: 'red', fontWeight: 'bold' }}>shotblasting</span> is applied because the part is attached to an adjusting bracket which increases the possibility of corrosion due to friction and heat. Since shotblasting have a property where it increases the resistance to corrosion and fatigue of the material which is suitable to apply on the part.
                      </p>
                    </div>
                  </div>
                </div>
              ) : subLessonId === '2d-surface-app-2' ? (
                <div className="flex-col" style={{ gap: '2.5rem' }}>
                  {/* 2. Machining Section */}
                  <div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      <strong style={{ color: 'red' }}>2. Machining</strong> is any of vaiorius processes in which a piece of raw material is cut into a desired final shape and size by controlled material-removal process.
                    </p>

                    {/* Example 1 */}
                    <div style={{ marginBottom: '2.5rem' }}>
                      <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '1rem' }}>Example:</p>
                      <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <img src={machiningImg} alt="Machining Example 1 - Mounting Bracket" className="software-screenshot screenshot-wide" style={{ maxWidth: '900px' }} />
                      </div>
                      <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                        This part serves as a mounting bracket where a cam clutch is attached. Since the clutch rotates with the aid of a bearing installed with it, the part will not rotate and no corrosion will be applied on the part, which means <span style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}>application of shotblasting is not necessary</span>, instead machine all the sides in order to get rid the black skin of the material.
                      </p>
                    </div>

                    <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                    {/* Example 2 */}
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '1rem' }}>Example:</p>
                      <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <img src={machining2Img} alt="Machining Example 2 - Polished Material" className="software-screenshot screenshot-wide" style={{ maxWidth: '900px' }} />
                      </div>
                      <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                        This part uses a polished material where in from the raw material itself, black skin is not present which means <span style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}>application of Shotblasting(Black skin removal) and Machining the sides are not necessary</span>, aside from machining the part to desired shape.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="placeholder-text">Content for {subLessonId} is being prepared.</p>
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

export default SurfaceApplicationLesson;
