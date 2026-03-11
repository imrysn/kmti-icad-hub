/**
 * 3D_Annotation.tsx — Annotation lessons
 */
import React from 'react';
import { ChevronLeft, ChevronRight, Edit3, Box } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Using the same classes as Properties to maintain the layout style
import '../../styles/3D_Modeling/3D_Properties.css';

// Annotation (1) Assets
import annotationImg from '../../assets/3D_Image_File/annotation.jpg';
import linearDimensionImg from '../../assets/3D_Image_File/linear_dimension.jpg';
import diameterDimensionImg from '../../assets/3D_Image_File/diameter_dimension.jpg';
import angularDimensionImg from '../../assets/3D_Image_File/angular_dimension.jpg';
import notesLeaderLinesImg from '../../assets/3D_Image_File/notes_leader_lines.jpg';
import characterStringsImg from '../../assets/3D_Image_File/character_strings.jpg';

import leftClick from '../../assets/3D_Image_File/left_click.jpg';

// Note Entry Images
import noteStringEntryImg from '../../assets/3D_Image_File/note_string_entry_window.jpg';
import textEntryImg from '../../assets/3D_Image_File/text_entry_window.jpg';

// Annotation (2) Assets
import editDimensionImg from '../../assets/3D_Image_File/edit_dimension_characters_window.jpg';
import changePropertiesWindowImg from '../../assets/3D_Image_File/change_properties_window.jpg';
import changesDraftingEntityImg from '../../assets/3D_Image_File/changes_drafting_entity.jpg';
import changesPositionDraftingEntitiesImg from '../../assets/3D_Image_File/changes_position_drafting_entities.jpg';
import collectiveDimensionImg from '../../assets/3D_Image_File/annotation.jpg';
import collectiveResultImg from '../../assets/3D_Image_File/sample_3d_modeling_parts.jpg';

interface AnnotationLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const AnnotationLesson: React.FC<AnnotationLessonProps> = ({ subLessonId = 'annotation-1', onNextLesson }) => {
  const isAnnotation1 = subLessonId === 'annotation-1';

  const handleNext = () => {
    if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    // Navigation inside annotation if needed
  };

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><Box size={28} className="lesson-intro-icon" /> ANNOTATION</h3>
        <p>Tools use to create drafting entities such as dimension text and notes.</p>

        {isAnnotation1 && (
          <div className="instruction-box">
            <div className="image-wrapper-flush">
              <img src={annotationImg} alt="Annotation Tool Menu" className="software-screenshot screenshot-small" />
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content fade-in">
            {isAnnotation1 ? (
              <div className="fade-in">

                <div className="flex-row-wrap" style={{ alignItems: 'flex-start', gap: '2rem' }}>
                  {/* Left Column */}
                  <div className="flex-1" style={{ minWidth: '300px' }}>

                    {/* Item 1 */}
                    <div className="mb-10">
                      <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Creates linear dimension</h4>
                      <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                        <img src={linearDimensionImg} alt="Linear Dimension" className="software-screenshot" style={{ width: '100px', padding: '0.2rem' }} />
                      </div>
                      <div className="pl-2">
                        <p className="step-description mb-1 flex items-center gap-2" style={{ paddingLeft: '0', color: '#475569' }}>
                          1.) Select edges to be measured.
                        </p>
                        <p className="step-description mb-0" style={{ paddingLeft: '0', color: '#475569' }}>
                          2.) Left-click on the 3D Space to position the linear dimension.
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="mb-10">
                      <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Creates diameter dimension</h4>
                      <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                        <img src={diameterDimensionImg} alt="Diameter Dimension" className="software-screenshot" style={{ width: '100px', padding: '0.2rem' }} />
                      </div>
                      <div className="pl-2">
                        <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#475569' }}>
                          1.) Select the edge of the circle to be measured.
                        </p>
                        <p className="step-description mb-0" style={{ paddingLeft: '0', color: '#475569' }}>
                          2.) Left-click on the 3D Space to position the circular dimension.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="mb-10">
                      <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Creates angular dimension</h4>
                      <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                        <img src={angularDimensionImg} alt="Angular Dimension" className="software-screenshot" style={{ width: '100px', padding: '0.2rem' }} />
                      </div>
                      <div className="pl-2">
                        <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#475569' }}>
                          1.) Select edges to be measured.
                        </p>
                        <p className="step-description mb-0" style={{ paddingLeft: '0', color: '#475569' }}>
                          2.) Left-click on the 3D Space to position the angular dimension.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Right column removed as image was moved to instruction box */}
                </div>

                {/* Bottom Row spanning full width */}
                <div style={{ marginTop: '0' }}>
                  {/* Item 4 */}
                  <div className="mb-10">
                    <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Creates notes with leader lines.</h4>
                    <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                      <img src={notesLeaderLinesImg} alt="Notes with Leader Lines" className="software-screenshot" style={{ width: '100px', padding: '0.2rem' }} />
                    </div>
                    <div className="pl-2">
                      <p className="step-description mb-1 flex items-center gap-2" style={{ paddingLeft: '0', color: '#475569' }}>
                        1.) Pick any edge of the entity &gt;
                        <img src={leftClick} alt="Left Click" style={{ height: '24px' }} />
                      </p>
                      <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#475569' }}>
                        2.) Left-click to show the <strong className="text-highlight" style={{ color: '#dc2626' }}>Note String Entry window</strong>.
                      </p>
                      <div className="image-wrapper-flush" style={{ marginTop: '0.5rem', marginBottom: '0.5rem', maxWidth: '300px' }}>
                        <img src={noteStringEntryImg} alt="Note String Entry Window" className="software-screenshot screenshot-wide" />
                      </div>
                      <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#475569' }}>
                        3.) Enter the note &gt; Press OK
                      </p>
                      <p className="step-description mb-0" style={{ paddingLeft: '0', color: '#475569' }}>
                        4.) Left-click on the 3D Space to place the note.
                      </p>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="mb-10">
                    <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Creates character strings.</h4>
                    <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                      <img src={characterStringsImg} alt="Character Strings" className="software-screenshot" style={{ width: '100px', padding: '0.2rem' }} />
                    </div>
                    <div className="pl-2">
                      <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#475569' }}>
                        1.) Left-click on the 3D Space show the <strong className="text-highlight" style={{ color: '#dc2626' }}>Text Entry window</strong>.
                      </p>
                      <div className="image-wrapper-flush" style={{ marginTop: '0.5rem', marginBottom: '0.5rem', maxWidth: '300px' }}>
                        <img src={textEntryImg} alt="Text Entry Window" className="software-screenshot screenshot-wide" />
                      </div>
                      <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#475569' }}>
                        2.) Enter the note &gt; Press OK
                      </p>
                      <p className="step-description mb-0" style={{ paddingLeft: '0', color: '#475569' }}>
                        3.) Left-click on the 3D Space to place the note.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="fade-in">

                <div className="flex-row-wrap" style={{ alignItems: 'flex-start', gap: '2rem' }}>
                  {/* Left Column */}
                  <div className="flex-1" style={{ minWidth: '300px' }}>

                    {/* Item 1 */}
                    <div className="mb-10">
                      <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Creates dimensions for 3D entities collectively.</h4>
                      <div className="flex-row-wrap" style={{ alignItems: 'flex-start', gap: '1.5rem' }}>
                        <div>
                          <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                            <img src={collectiveDimensionImg} alt="Collectively Creates Dimension" className="software-screenshot" style={{ width: '120px', padding: '0.2rem' }} />
                          </div>
                          <div className="pl-2">
                            <p className="step-description mb-1 flex items-center gap-2" style={{ paddingLeft: '0', color: '#475569' }}>
                              1.) Select entity &gt;
                              <img src={leftClick} alt="Left Click" style={{ height: '24px' }} />
                            </p>
                            <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#dc2626', fontWeight: 'bold' }}>
                              *Dimensions will generate automatically.
                            </p>
                            <p className="step-description mb-0" style={{ paddingLeft: '0', color: '#475569' }}>
                              Such as length, width, height, hole details, hole pitches
                            </p>
                          </div>
                        </div>

                        <div className="image-wrapper-flush" style={{ margin: 0, maxWidth: '280px' }}>
                          <img src={collectiveResultImg} alt="Collective Dimension Result" className="software-screenshot" />
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="mb-10">
                      <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Edits drafting entity characters</h4>
                      <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                        <img src={changesDraftingEntityImg} alt="Edits Drafting Entity Characters" className="software-screenshot" style={{ width: '120px', padding: '0.2rem' }} />
                      </div>
                      <div className="pl-2">
                        <p className="step-description mb-1 flex items-center gap-2" style={{ paddingLeft: '0', color: '#475569' }}>
                          1.) Select drafting entity &gt;
                          <img src={leftClick} alt="Left Click" style={{ height: '24px' }} />
                        </p>
                        <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#475569' }}>
                          2.) <span className="text-highlight" style={{ color: '#dc2626', fontWeight: 'bold' }}>Edit Dimension Characters window</span> will appear.
                        </p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.5rem', marginBottom: '0.5rem', maxWidth: '350px' }}>
                          <img src={editDimensionImg} alt="Edit Dimension Characters Window" className="software-screenshot screenshot-wide" />
                        </div>
                        <p className="step-description mb-0" style={{ paddingLeft: '0', color: '#475569' }}>
                          3.) After editing the dimension characters, Press OK.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="mb-10">
                      <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Changes the attributes of a drafting entity</h4>
                      <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                        <img src={changesDraftingEntityImg} alt="Changes Draft Entity Attribute" className="software-screenshot" style={{ width: '120px', padding: '0.2rem' }} />
                      </div>
                      <div className="pl-2">
                        <p className="step-description mb-1 flex items-center gap-2" style={{ paddingLeft: '0', color: '#475569' }}>
                          1.) Select drafting entity &gt;
                          <img src={leftClick} alt="Left Click" style={{ height: '24px' }} />
                        </p>
                        <p className="step-description mb-1" style={{ paddingLeft: '0', color: '#475569' }}>
                          2.) <span className="text-highlight" style={{ color: '#dc2626', fontWeight: 'bold' }}>Change Properties window</span> will appear.
                        </p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.5rem', marginBottom: '0.5rem', maxWidth: '350px' }}>
                          <img src={changePropertiesWindowImg} alt="Change Properties Window" className="software-screenshot screenshot-wide" />
                        </div>
                        <p className="step-description mb-0" style={{ paddingLeft: '0', color: '#475569' }}>
                          3.) After changing the properties, Press OK
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row spanning full width */}
                <div style={{ marginTop: '0' }}>
                  {/* Item 4 */}
                  <div className="mb-10">
                    <h4 className="section-title text-base sm:text-lg mb-4" style={{ borderBottom: 'none', paddingBottom: 0, marginTop: 0 }}>Changes the positions of drafting entities</h4>
                    <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '0.5rem', display: 'inline-block' }}>
                      <img src={changesPositionDraftingEntitiesImg} alt="Changes Position Tool" className="software-screenshot" style={{ width: '120px', padding: '0.2rem' }} />
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button
              className="nav-button"
              onClick={handlePrev}
              disabled={isAnnotation1}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {isAnnotation1 ? 'Annotation (2)' : 'Finish'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotationLesson;
