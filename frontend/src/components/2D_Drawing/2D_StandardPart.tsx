import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';
import '../../styles/2D_Drawing/2D_StandardPart.css';

// Importing assets for Standard Part Detail (1)
import pcdImg from '../../assets/2D_Image_File/2D_tandard_part_detail(1)_pcd.png';
import taperedThreadImg from '../../assets/2D_Image_File/2D_tandard_part_detail(1)_tapered_thread.png';
import standardPartDetailImg from '../../assets/2D_Image_File/2D_tandard_part_detail(1)_standard_parts.jpg';

// Importing assets for Standard Part Detail (2)
import oilGroove1Img from '../../assets/2D_Image_File/2D_tandard_part_detail(2)_oil_groove_1.png';
import oilGroove2Img from '../../assets/2D_Image_File/2D_tandard_part_detail(2)_oil_groove_2.png';

// Importing assets for Standard Part Detail (3)
import shaftKeyPlate1Img from '../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_1.png';
import shaftKeyPlate2Img from '../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_2.jpg';
import shaftKeyPlate3Img from '../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_3.png';

// Importing assets for Standard Part Detail (4)
import collarImg from '../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar.png';

// Importing assets for Standard Part Detail (5)
import collar1Img from '../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar_1.png';
import collar2Img from '../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar_2.png';

// Importing assets for Standard Part Detail (6)
import scaleImg from '../../assets/2D_Image_File/2D_standard_part_detail(6)_scale.jpg';
import reliefProcess1Img from '../../assets/2D_Image_File/2D_tandard_part_detail(6)_relief_process_1.png';
import reliefProcess2Img from '../../assets/2D_Image_File/2D_standard_part_detail(6)_relief_process_2.jpg';

// Importing assets for Standard Part Detail (7)
import reliefWorkflowImg from '../../assets/2D_Image_File/2D_tandard_part_detail(7)_relief_process_3.png';
import reliefDialogImg from '../../assets/2D_Image_File/2D_tandard_part_detail(7)_relief_process_4.jpg';

interface StandardPartLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const StandardPartLesson: React.FC<StandardPartLessonProps> = ({
  subLessonId,
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3 className="section-title-main">
          <ArrowLeft size={28} className="lesson-intro-icon" />
          Standard Part Detail {subLessonId === '2d-standard-part-1' ? '(1)' : subLessonId === '2d-standard-part-2' ? '(2)' : subLessonId === '2d-standard-part-3' ? '(3)' : subLessonId === '2d-standard-part-4' ? '(4)' : subLessonId === '2d-standard-part-5' ? '(5)' : subLessonId === '2d-standard-part-6' ? '(6)' : subLessonId === '2d-standard-part-7' ? '(7)' : ''}
        </h3>
        <p className="lesson-subtitle">
          {subLessonId === '2d-standard-part-1'
            ? 'Guidelines for PCD, Tapered Threads, and Standard Part Template requirements.'
            : subLessonId === '2d-standard-part-2'
              ? 'Standardized oil groove designs for flat surfaces and circular portions.'
              : subLessonId === '2d-standard-part-3'
                ? 'Dimensional standards and detailing practices for Shafts and Key Plates.'
                : subLessonId === '2d-standard-part-4'
                  ? 'Functional applications and tolerance standards for Collars.'
                  : subLessonId === '2d-standard-part-5'
                    ? 'Advanced collar applications (OST-2) for urethane materials and stoppers.'
                    : subLessonId === '2d-standard-part-6'
                      ? 'Standard scale applications (JIS Z 8314) and relief process specifications.'
                      : subLessonId === '2d-standard-part-7'
                        ? 'Workflow for implementing specialized Relief Process templates.'
                        : 'Operational standards for KEMCO part detailing.'}
        </p>
      </section>

      <div className="lesson-content">
        <div className="lesson-grid single-card">
          <div className="lesson-card">
            {subLessonId === '2d-standard-part-1' ? (
              <div className="flex-col" style={{ gap: '3.5rem' }}>
                {/* d. PCD Section */}
                <div className="sub-section-container">
                  <h4 style={{ color: '#333', fontSize: '1.25rem', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>
                    <strong style={{ color: 'red' }}>d. PCD</strong> (Pitch Center Diameter) is no longer used for KEMCO drawing to avoid misreading of dimension during fabrication.
                  </h4>
                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={pcdImg} alt="PCD Dimension Comparison" className="software-screenshot screenshot-wide" style={{ maxWidth: '850px' }} />
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                {/* e. Tapered Thread (Rc) Section */}
                <div className="sub-section-container">
                  <h4 style={{ color: 'red', fontSize: '1.3rem', margin: '0 0 0.2rem 0' }}>e. Tapered Thread (Rc)</h4>
                  <p className="p-flush" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#555' }}>Based on the drawing, we must apply it on 2D detailing</p>
                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={taperedThreadImg} alt="Tapered Thread 2D Detailing" className="software-screenshot screenshot-wide" style={{ maxWidth: '850px' }} />
                  </div>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                {/* f. Standard Parts Section */}
                <div className="sub-section-container">
                  <h4 style={{ color: 'red', fontSize: '1.3rem', margin: '0 0 0.2rem 0' }}>f. Standard Parts</h4>
                  <p className="p-flush" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#555' }}>Boxed portion of the template is the only data need to be input, other than that no detail will be change.</p>
                  <div className="image-wrapper-flush">
                    <img src={standardPartDetailImg} alt="Standard Parts Template details" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            ) : subLessonId === '2d-standard-part-2' ? (
              <div className="flex-col" style={{ gap: '3.5rem' }}>
                {/* a. Oil Groove Section */}
                <div>
                  <h4 style={{ color: 'red', fontSize: '1.3rem', margin: '0 0 0.2rem 0' }}>a. Oil Groove</h4>
                  <p className="p-flush" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#555' }}>Is a groove in the surface of a machine part that distributes lubricating oil injected through an oil hole</p>

                  <div className="info-box" style={{ border: 'none', background: 'transparent', padding: '0.5rem 0' }}>
                    <p style={{ fontWeight: 'bold', color: '#d32f2f', margin: '0 0 1.5rem 0' }}>※ There are two (2) kinds of oil groove</p>
                  </div>

                  {/* 1. For Flat Surface */}
                  <div className="sub-section-container" style={{ marginLeft: '1rem' }}>
                    <h5 style={{ color: 'red', fontSize: '1.15rem', margin: '0 0 1rem 0' }}>1. For Flat Surface</h5>
                    <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                      <img src={oilGroove1Img} alt="Oil Groove - Flat Surface Detail and Example" className="software-screenshot screenshot-wide" />
                    </div>
                    <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span> Follow the standard detail of KEMCO for flat surface <span style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>(Figure 1)</span>.
                      </li>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span> Depth of grease line should be 1.5mm
                      </li>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span> In case of drill hole and tap hole, the diameter of the hole must be smaller than width of groove.
                      </li>
                    </ul>
                  </div>

                  <div className="section-divider" style={{ margin: '3rem 0' }}></div>

                  {/* 2. For Circular Portion */}
                  <div className="sub-section-container" style={{ marginLeft: '1rem' }}>
                    <div className="flex-row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h5 style={{ color: 'red', fontSize: '1.15rem', margin: 0 }}>2. For Circular Portion</h5>
                      <span style={{ border: '2px solid black', padding: '2px 8px', fontWeight: 'bold', fontSize: '0.9rem' }}>New Revised: 07/01/19</span>
                    </div>

                    <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                      <img src={oilGroove2Img} alt="Oil Groove - Circular Portion Detail and Example" className="software-screenshot screenshot-wide" />
                    </div>

                    <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span> Follow the standard detail of KEMCO for circular portion <span style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>(Figure 2)</span>.
                      </li>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span> Compared to grooving of flat surfaces, radius 2 cannot achieve on actual.<br />But the surface should be smooth finish <span style={{ color: 'red' }}>R (滑らかに仕上)</span>.
                      </li>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span> Depth of grease line should be 1.5mm
                      </li>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span> In case of drill hole and tap hole, the diameter of the hole must be smaller than width of groove.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : subLessonId === '2d-standard-part-3' ? (
              <div className="flex-col" style={{ gap: '3.5rem' }}>
                {/* b. Shaft and Key Plate Section */}
                <div>
                  <h4 style={{ color: '#333', fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1.5rem 0' }}>b. Shaft and Key Plate</h4>

                  <div className="sub-section-header" style={{ marginBottom: '1.5rem' }}>
                    <h5 style={{ color: 'red', fontSize: '1.25rem', margin: 0 }}>※ Dimension of Shaft and Key Plate</h5>
                  </div>

                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
                    <img src={shaftKeyPlate1Img} alt="Shaft and Key Plate Dimensions Table" className="software-screenshot screenshot-wide" style={{ maxWidth: '950px' }} />
                  </div>

                  <div className="info-box-note" style={{ marginBottom: '3rem' }}>
                    <p style={{ color: 'red', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>Note:</p>
                    <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <span style={{ color: 'black' }}>●</span> The shape after cutting must be free from burrs
                      </li>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <span style={{ color: 'black' }}>●</span> Use flat bar material
                      </li>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <span style={{ color: 'black' }}>●</span>
                        <span>The tolerance of the width groove must be</span>
                        <img src={shaftKeyPlate2Img} alt="Tolerance callout" style={{ height: '50px', marginLeft: '0.5rem', mixBlendMode: 'multiply' }} />
                      </li>
                    </ul>
                  </div>

                  <div className="section-divider" style={{ margin: '2rem 0' }}></div>

                  {/* Sample Drawing Section */}
                  <div className="sub-section-header" style={{ marginBottom: '-5rem' }}>
                    <h5 style={{ color: 'red', fontSize: '1.25rem', margin: 0 }}>※ Sample Drawing</h5>
                  </div>

                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
                    <img src={shaftKeyPlate3Img} alt="Sample Drawing and Isometric View" className="software-screenshot screenshot-wide" style={{ maxWidth: '950px' }} />
                  </div>

                  <ul className="list-flush" style={{ marginTop: '2rem' }}>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', lineHeight: '1.5' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <div>
                        As much as possible, follow the way of detailing in this reference. <br />
                        Do not position the key groove below.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : subLessonId === '2d-standard-part-4' ? (
              <div className="flex-col" style={{ gap: '2.5rem' }}>
                {/* c. Collar Section */}
                <div className="sub-section-header" style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ color: '#333', fontSize: '1.5rem', fontWeight: 'bold', margin: '0' }}>c. Collar</h4>
                  <div style={{ border: '2.5px solid black', padding: '0.4rem 1rem', display: 'flex', gap: '0.6rem', fontSize: '1rem', fontWeight: '800', background: 'white' }}>
                    <span style={{ color: 'black' }}>New Revised:</span>
                    <span style={{ color: 'red' }}>07/01/19</span>
                  </div>
                </div>

                <div className="info-box" style={{ border: 'none', background: 'transparent', padding: '0', marginBottom: '1rem' }}>
                  <p className="p-flush" style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333' }}>
                    Used in machine, fitted on a shaft to prevent sliding movement.<br />
                    Also serves as mechanical stopper and stroke limiters.
                  </p>
                </div>

                <div className="sub-section-header" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>
                  <h5 style={{ color: 'black', fontSize: '1.25rem', margin: 0 }}>※ Tolerances for collar</h5>
                </div>

                <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', margin: '0 -4rem', marginLeft: '-2rem' }}>
                  <img src={collarImg} alt="Tolerances for Collar - Example 1 and 2" className="software-screenshot screenshot-wide" style={{ maxWidth: '980px' }} />
                </div>
              </div>
            ) : subLessonId === '2d-standard-part-5' ? (
              <div className="flex-col" style={{ gap: '2rem' }}>
                {/* Example 3 Header */}
                <h4 style={{ color: 'red', fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 'bold', margin: '0' }}>Example 3.</h4>

                {/* Top Diagram: Sectional View of OST-2 */}
                <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', margin: '0 -2rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                  <img src={collar1Img} alt="OST-2 Sectional View" className="software-screenshot" style={{ maxWidth: '600px' }} />
                </div>

                <div className="info-box" style={{ border: 'none', background: 'transparent', padding: '0', marginBottom: '1.5rem' }}>
                  <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', lineHeight: '1.5' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <span>Can used to hold urethane rubber and serve as stopper.</span>
                    </li>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', lineHeight: '1.5' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <span>To avoid over press of the material during tightening that causes the urethane to distort.</span>
                    </li>
                  </ul>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                {/* ※ Sample Drawing Header */}
                <div className="sub-section-header" style={{ marginBottom: '1.5rem' }}>
                  <h5 style={{ color: 'red', fontSize: '1.25rem', margin: 0 }}>※ Sample Drawing</h5>
                </div>

                {/* Bottom Diagram: Technical drawing of OST-2 */}
                <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', height: '650px', margin: '0 -2rem' }}>
                  <img src={collar2Img} alt="OST-2 Sample Technical Drawing" style={{
                    width: '90%',
                    maxWidth: '980px',
                    marginTop: '-440px',
                    objectFit: 'contain'
                  }} />
                </div>

                <ul className="list-flush" style={{ marginTop: '-5rem' }}>
                  <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', lineHeight: '1.5' }}>
                    <span style={{ color: 'black' }}>●</span>
                    <span>As much as possible, follow the way of detailing in this reference.</span>
                  </li>
                </ul>
              </div>
            ) : subLessonId === '2d-standard-part-6' ? (
              <div className="flex-col" style={{ gap: '3rem' }}>
                {/* g. Scale Section */}
                <div>
                  <h4 style={{ color: '#333', fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1.5rem 0' }}>g. Scale</h4>

                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <img src={scaleImg} alt="Standard Scale Table JIS Z 8314" className="software-screenshot screenshot-large" style={{ maxWidth: '800px' }} />
                  </div>

                  <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '3rem' }}>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <span>Follow the standard scale given by KEMCO.</span>
                    </li>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <span>On parts drawing, standard scale must be always used.</span>
                    </li>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <span>On assembly drawing, standard scale should be used, but non-standard scale can be used as a second option.</span>
                    </li>
                  </ul>
                </div>

                <div className="section-divider" style={{ margin: '1rem 0' }}></div>

                {/* h. Relief process Section */}
                <div>
                  <h4 style={{ color: '#333', fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>h. Relief process</h4>
                  <div className="info-box" style={{ border: 'none', background: 'transparent', padding: '0', marginBottom: '1.5rem' }}>
                    <p className="p-flush" style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                      Often used at the end of the shoulder portion of a shaft to provide clearance for the cutting tool and also to avoid damaging it.
                    </p>
                  </div>

                  <p style={{ color: 'red', fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 1rem 0' }}>In 2D</p>

                  <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', margin: '0 -2rem', marginBottom: '2.5rem' }}>
                    <img src={reliefProcess1Img} alt="Relief Process Diagram in 2D" className="software-screenshot screenshot-large" style={{ maxWidth: '950px' }} />
                  </div>

                  <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <span>Relief process detail should be <strong style={{ color: 'red' }}>used on shaft parts</strong> with three (3) triangle and surface grinding process.</span>
                      <img src={reliefProcess2Img} alt="Relief Symbol" style={{ height: '45px', marginLeft: '1rem', mixBlendMode: 'multiply' }} />
                    </li>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <span>Relief process should be <strong style={{ color: 'red' }}>shown on 2D detailing.</strong></span>
                    </li>
                  </ul>

                  <div className="info-box-note" style={{ marginTop: '2.5rem', padding: '1.25rem', background: '#fff', borderLeft: '4px solid #333' }}>
                    <p style={{ color: 'red', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>Note:</p>
                    <ul className="list-flush" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span>
                        <span>All corners of the shaft cannot be straight by using grinding or any machining equipment.</span>
                      </li>
                      <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem' }}>
                        <span style={{ color: 'black' }}>●</span>
                        <span>Sliding portion needs to be supplied with oil.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : subLessonId === '2d-standard-part-7' ? (
              <div className="flex-col" style={{ gap: '2rem' }}>
                {/* Workflow Header */}
                <div className="sub-section-header" style={{ marginBottom: '1rem' }}>
                  <h5 style={{ color: 'black', fontSize: '1.2rem', margin: 0 }}>※ There are four (4) steps to show the detail on the template</h5>
                </div>

                {/* Workflow Image */}
                <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
                  <img src={reliefWorkflowImg} alt="Relief process loading workflow" className="software-screenshot" style={{ maxWidth: '450px' }} />
                </div>

                {/* Template Selection Info */}
                <div className="info-box" style={{ border: 'none', background: 'transparent', padding: '0', marginBottom: '1.5rem' }}>
                  <p className="p-flush" style={{ fontSize: '1.1rem', color: '#333', fontWeight: 'bold' }}>
                    Choose required template (Relief process detail)
                  </p>
                  <ul className="list-flush" style={{ marginTop: '0.8rem' }}>
                    <li style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <span style={{ color: 'black' }}>●</span>
                      <span>Click OK</span>
                    </li>
                  </ul>
                </div>

                {/* Dialog Image */}
                <div className="image-wrapper-flush" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
                  <img src={reliefDialogImg} alt="Template selection dialogue" className="software-screenshot screenshot-large" style={{ maxWidth: '900px' }} />
                </div>

                {/* Footer Note */}
                <div className="sub-section-header" style={{ marginTop: '1rem' }}>
                  <h5 style={{ color: 'red', fontSize: '1.15rem', fontStyle: 'italic', margin: 0 }}>
                    ※ Designated location of relief process detail is on the global view of the drawing.
                  </h5>
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
  );
};

export default StandardPartLesson;
