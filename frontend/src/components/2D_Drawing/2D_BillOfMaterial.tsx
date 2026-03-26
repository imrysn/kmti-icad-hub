import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/2D_Drawing/CourseLesson.css';

// Importing assets for Bill of Material
import bomPartDrawingImg from '../../assets/2D_Image_File/2D_bill_of_material_part_drawing.png';
import bomPartDrawingBImg from '../../assets/2D_Image_File/2D_bill_of_material_part_drawing_b.png';
import bomPartDrawingCImg from '../../assets/2D_Image_File/2D_bill_of_material_part_drawing_c.png';
import bomPartDrawingDImg from '../../assets/2D_Image_File/2D_bill_of_material_part_drawing_d.png';
import bomAssemblyDrawingImg from '../../assets/2D_Image_File/2D_bill_of_material_assembly_drawing.jpg';
import bomAssemblyDrawing2Img from '../../assets/2D_Image_File/2D_bill_of_material_assembly_drawing_2.png';
import bomAdditionalInfoImg from '../../assets/2D_Image_File/2D_bill_of_material_additional_information.png';
import bomAfterInsertImg from '../../assets/2D_Image_File/2D_bill_of_material_(4)_after_inserting_on_icad.png';
import bomEditAttrImg from '../../assets/2D_Image_File/2D_bill_of_material_(4)_edit_attribute.png';
import bomEditAttr2Img from '../../assets/2D_Image_File/2D_bill_of_material_(4)_edit_attribute_2.jpg';
import bomEditAttr3Img from '../../assets/2D_Image_File/2D_bill_of_material_(4)_edit_attribute_3.png';

interface BillOfMaterialLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BillOfMaterialLesson: React.FC<BillOfMaterialLessonProps> = ({
  subLessonId = '1',
  onNextLesson,
  onPrevLesson
}) => {
  return (
    <div className="course-lesson-container">
      <div className="lesson-scroll-container">
        <section className="lesson-intro" style={{ marginBottom: '3rem' }}>
          <h3 className="section-title-main" style={{ color: '#dc2626' }}>
            <ArrowLeft size={28} className="lesson-intro-icon" />
            16. Bill Of Material (BOM)
          </h3>
          <p className="lesson-subtitle" style={{ fontSize: '1.2rem', color: '#333', marginTop: '0.8rem', fontWeight: '500', maxWidth: '900px', lineHeight: '1.5' }}>
            Displays part informations particularly material, part specifications and weights.<br />
            Located at upper right portion of the template.
          </p>
        </section>

        <div className="lesson-content">
          <div className="lesson-grid single-card">
            <div className="lesson-card">

              {subLessonId === '1' && (
                <div className="flex-col" style={{ gap: '5rem' }}>

                  {/* a. Part drawing Section */}
                  <div className="lesson-section">
                    <h4 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '2.5rem' }}>
                      a. Part drawing
                    </h4>
                    <div className="flex-col" style={{ alignItems: 'center' }}>
                      <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1000px' }}>
                        <img
                          src={bomPartDrawingImg}
                          alt="BOM Part Drawing Entry with Technical Callouts"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Creation Workflow Section (unlabeled in manual as b, but follows a) */}
                  <div className="lesson-section">
                    <div className="flex-col" style={{ alignItems: 'center' }}>
                      <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1000px' }}>
                        <img
                          src={bomPartDrawingBImg}
                          alt="BOM Template Selection and Command Procedure"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="section-divider" style={{ borderTop: '2px solid #eee', margin: '1rem 0' }}></div>

                  {/* c. Section */}
                  <div className="lesson-section">
                    <div className="flex-row" style={{ gap: '1rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
                      <div style={{ backgroundColor: '#dc2626', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        c
                      </div>
                    </div>
                    <div className="flex-col" style={{ alignItems: 'center' }}>
                      <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1000px' }}>
                        <img
                          src={bomPartDrawingCImg}
                          alt="Excel BOM Generation Procedure"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {subLessonId === '2' && (
                <div className="flex-col" style={{ gap: '5rem' }}>

                  {/* d. Excel operations for parts */}
                  <div className="lesson-section">
                    <div className="flex-row" style={{ gap: '1rem', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                      <div style={{ border: '2px solid #dc2626', color: '#dc2626', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        d
                      </div>
                    </div>

                    <div className="flex-col" style={{ alignItems: 'center', gap: '4rem' }}>
                      <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1100px' }}>
                        <img
                          src={bomPartDrawingDImg}
                          alt="Detailed Excel Operations for Parts and Single Part Configuration"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div className="flex-row" style={{ gap: '3rem', width: '50%', marginLeft: 'auto' }}>

                        <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white', flex: 1, height: 'fit-content' }}>
                          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'black', marginBottom: '0.8rem' }}>Note:</p>
                          <p style={{ margin: 0, fontSize: '1.05rem', color: 'black', lineHeight: '1.6' }}>
                            Material weight and finish weight must be in 2 decimal places, but for some special cases, 3 decimal places is acceptable.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section-divider" style={{ borderTop: '2px solid #eee', margin: '1rem 0' }}></div>

                  {/* b. Assembly drawing Section */}
                  <div className="lesson-section">
                    <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '2rem' }}>
                      b. Assembly drawing
                    </h4>

                    <div className="info-box" style={{ border: '2px solid #333', borderRadius: '8px', padding: '1.5rem', background: '#f9f9f9', marginBottom: '3rem', maxWidth: '600px' }}>
                      <p style={{ margin: 0, fontSize: '1.1rem', color: 'black', lineHeight: '1.8' }}>
                        BOM of assembly drawing divides into three groups.<br />
                        1. Fabricated and Machine Parts<br />
                        2. Mechanical / Purchase parts<br />
                        3. Hardwares
                      </p>
                    </div>

                    <div className="flex-row" style={{ gap: '3rem', alignItems: 'flex-start' }}>
                      <div className="flex-col" style={{ flex: 2, gap: '1rem' }}>
                        <img
                          src={bomAssemblyDrawingImg}
                          alt="Assembly BOM Excel with Grouping Callouts"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                      <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.75rem', background: 'white', flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '1rem', color: 'black', lineHeight: '1.7' }}>
                          1. Excel will appear.<br /><br />
                          2. Rearrange the excel data from;<br />
                          &nbsp;&nbsp;&nbsp;a. Drawing number of parts arranged successively<br />
                          &nbsp;&nbsp;&nbsp;b. Purchased parts<br />
                          &nbsp;&nbsp;&nbsp;c. Hardware (HS, BS, CS, SS, SP, HN, FW, SW)<br /><br />
                          3. Click 'delete abbreviation' button to delete hardware codes.<br /><br />
                          4. Click 'sum the parts' button to combine quantity of same parts.<br /><br />
                          5. Purchase parts must indicate the maker in English.<br /><br />
                          6. Hardwares arrange in decreasing order.<br /><br />
                          7. In terms of assembly detail, use number for part balloon. Also, there must be a gap of 20 numbers in between the three groups.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {subLessonId === '3' && (
                <div className="flex-col" style={{ gap: '5rem' }}>

                  {/* Assembly Extended Section */}
                  <div className="lesson-section">
                    <div className="flex-col" style={{ alignItems: 'center' }}>
                      <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1000px' }}>
                        <img
                          src={bomAssemblyDrawing2Img}
                          alt="Standard Assembly BOM Grouping and Numbering Gaps"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="section-divider" style={{ borderTop: '2px solid #eee', margin: '2rem 0' }}></div>

                  {/* 17. Additional Information */}
                  <section className="lesson-section">
                    <h3 className="section-title-main" style={{ color: '#dc2626', marginBottom: '3rem' }}>
                      17. Additional Information
                    </h3>

                    <div className="flex-row" style={{ gap: '4rem', alignItems: 'flex-start' }}>
                      <div className="flex-col" style={{ flex: 1, gap: '3rem' }}>
                        <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '600px' }}>
                          <img
                            src={bomAdditionalInfoImg}
                            alt="Additional Information Excel and Menu Configuration"
                            className="software-screenshot screenshot-wide"
                            style={{ width: '100%' }}
                          />
                        </div>

                        <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white', marginTop: '2rem' }}>
                          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'red', fontStyle: 'italic' }}>
                            NOTE: Columns with green color can not be changed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {subLessonId === '4' && (
                <div className="flex-col" style={{ gap: '5rem' }}>

                  {/* Bill of Material after inserting Section */}
                  <div className="lesson-section">
                    <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '3rem' }}>
                      Bill of Material after inserting on ICAD data
                    </h4>

                    <div className="flex-row" style={{ gap: '4rem', alignItems: 'flex-start' }}>

                      <div className="image-wrapper-flush" style={{ flex: 2 }}>
                        <img
                          src={bomAfterInsertImg}
                          alt="BOM Entry with Text Overflow Case"
                          className="software-screenshot screenshot-wide"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>


                  {/* Edit Attribute Section */}
                  <div className="lesson-section">
                    <h4 style={{ color: 'black', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '3rem', marginTop: '3rem' }}>
                      Edit Attribute
                    </h4>

                    <div className="flex-col" style={{ alignItems: 'center', marginBottom: '5rem' }}>
                      <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '900px' }}>
                        <img
                          src={bomEditAttrImg}
                          alt="Edit Attribute Command Selection"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>

                    {/* Step-by-step editing process */}
                    <div className="flex-row" style={{ gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
                      <div className="info-box" style={{ border: '2px solid red', borderRadius: '12px', padding: '1.5rem', background: 'white', flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '1.1rem', color: 'black', lineHeight: '1.8' }}>
                          1. Apply selected command above.<br />
                          2. Click the text that need to edit (P1).
                        </p>
                      </div>
                      <div className="image-wrapper-flush" style={{ flex: 2 }}>
                        <img
                          src={bomEditAttr2Img}
                          alt="Selecting Text Row to Edit (P1)"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                    </div>

                    <div className="flex-col" style={{ alignItems: 'center', position: 'relative' }}>
                      <div className="image-wrapper-flush" style={{ width: '100%', maxWidth: '1000px' }}>
                        <img
                          src={bomEditAttr3Img}
                          alt="Change Attribute Dialog and Final Result"
                          className="software-screenshot screenshot-wide"
                        />
                      </div>
                      <div className="info-box" style={{
                        position: 'absolute',
                        right: '10%',
                        top: '5%',
                        border: '2px solid red',
                        borderRadius: '12px',
                        padding: '1rem',
                        background: 'white',
                        maxWidth: '330px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        zIndex: 10
                      }}>
                        <p style={{ margin: 0, fontSize: '1.05rem', color: 'black', lineHeight: '1.8' }}>
                          3. The Change Attribute dialog box will appear.<br />
                          4. Edit width and interval ratio.<br />
                          5. Click "OK".
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Placeholder for future sub-lessons */}
              {subLessonId !== '1' && subLessonId !== '2' && subLessonId !== '3' && subLessonId !== '4' && (
                <div className="flex-col" style={{ alignItems: 'center', padding: '4rem' }}>
                  <p style={{ fontSize: '1.2rem', color: '#666' }}>Content for Bill of Material ({subLessonId}) is currently being implemented.</p>
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

export default BillOfMaterialLesson;
