/**
 * 3D_Annotation.tsx — Annotation lessons
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Edit3, Box, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

import '../../styles/3D_Modeling/CourseLesson.css';

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
import changesDraftingEntityImg from '../../assets/3D_Image_File/annotation(2)_edits_drafting.jpg';
import changesPositionDraftingEntitiesImg from '../../assets/3D_Image_File/changes_position_drafting_entities.jpg';
import collectiveDimensionImg from '../../assets/3D_Image_File/annotation(2)_dimension.jpg';
import annotation2Img from '../../assets/3D_Image_File/angular_dimension1.jpg';

interface AnnotationLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
}

const AnnotationLesson: React.FC<AnnotationLessonProps> = ({ subLessonId = 'annotation-1', onNextLesson }) => {
  const isAnnotation1 = subLessonId === 'annotation-1';
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [subLessonId]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const getStepClass = (stepId: string) => {
    return `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`;
  };

  const handleNext = () => {
    if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    // Navigation inside annotation if needed
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div 
          className="lesson-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>      <section className="lesson-intro">
        <h3><Box size={28} className="lesson-intro-icon" /> ANNOTATION</h3>
        <p>Tools use to create drafting entities such as dimension text and notes.</p>

        {isAnnotation1 && (
          <div className="instruction-box">
            <div className="image-wrapper-flush">
              <img
                src={isAnnotation1 ? annotationImg : annotation2Img}
                alt={isAnnotation1 ? "Annotation Tool Menu" : "Annotation Dimension Result"}
                className={isAnnotation1 ? "software-screenshot screenshot-small" : "software-screenshot screenshot-medium"}
              />
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content fade-in">
            {isAnnotation1 ? (
              <div className="fade-in">

                <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                  {/* Left Column */}
                  <div className="flex-1" style={{ minWidth: '300px' }}>

                    {/* Item 1 */}
                    <div className={getStepClass('anno1-1')} onClick={() => toggleStep('anno1-1')} style={{ marginBottom: '2.5rem' }}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('anno1-1') ? 'completed' : ''}`}>
                          {completedSteps.has('anno1-1') ? <CheckCircle2 size={16} /> : '1'}
                        </span>
                        <span className="step-label">Creates linear dimension</span>
                      </div>
                      <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                        <div className="image-wrapper-flush" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                          <img src={linearDimensionImg} alt="Linear Dimension" className="software-screenshot screenshot-small" />
                        </div>
                        <p className="p-flush">1.) Select edges to be measured.</p>
                        <p className="p-flush">2.) Left-click on the 3D Space to position the linear dimension.</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className={getStepClass('anno1-2')} onClick={() => toggleStep('anno1-2')} style={{ marginBottom: '2.5rem' }}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('anno1-2') ? 'completed' : ''}`}>
                          {completedSteps.has('anno1-2') ? <CheckCircle2 size={16} /> : '2'}
                        </span>
                        <span className="step-label">Creates diameter dimension</span>
                      </div>
                      <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                        <div className="image-wrapper-flush" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                          <img src={diameterDimensionImg} alt="Diameter Dimension" className="software-screenshot screenshot-small" />
                        </div>
                        <p className="p-flush">1.) Select the edge of the circle to be measured.</p>
                        <p className="p-flush">2.) Left-click on the 3D Space to position the circular dimension.</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className={getStepClass('anno1-3')} onClick={() => toggleStep('anno1-3')} style={{ marginBottom: '2.5rem' }}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('anno1-3') ? 'completed' : ''}`}>
                          {completedSteps.has('anno1-3') ? <CheckCircle2 size={16} /> : '3'}
                        </span>
                        <span className="step-label">Creates angular dimension</span>
                      </div>
                      <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                        <div className="image-wrapper-flush" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                          <img src={angularDimensionImg} alt="Angular Dimension" className="software-screenshot screenshot-small" />
                        </div>
                        <p className="p-flush">1.) Select edges to be measured.</p>
                        <p className="p-flush">2.) Left-click on the 3D Space to position the angular dimension.</p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Bottom Row spanning full width */}
                <div style={{ marginTop: '0' }}>
                  {/* Item 4 */}
                  <div className={getStepClass('anno1-4')} onClick={() => toggleStep('anno1-4')} style={{ marginBottom: '2.5rem' }}>
                    <div className="step-header">
                      <span className={`step-number ${completedSteps.has('anno1-4') ? 'completed' : ''}`}>
                        {completedSteps.has('anno1-4') ? <CheckCircle2 size={16} /> : '4'}
                      </span>
                      <span className="step-label">Creates notes with leader lines.</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '1rem', display: 'inline-block' }}>
                        <img src={notesLeaderLinesImg} alt="Notes with Leader Lines" className="software-screenshot" style={{ width: '100px', padding: '0.2rem' }} />
                      </div>
                      <div className="pl-2">
                        <p className="p-flush mb-1 flex items-center gap-2">
                          1.) Pick any edge of the entity &gt;
                          <img src={leftClick} alt="Left Click" style={{ height: '24px' }} />
                        </p>
                        <p className="p-flush mb-1">
                          2.) Left-click to show the <strong className="text-highlight" style={{ color: 'var(--primary-red)' }}>Note String Entry window</strong>.
                        </p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.5rem', marginBottom: '0.5rem', maxWidth: '300px' }}>
                          <img src={noteStringEntryImg} alt="Note String Entry Window" className="software-screenshot screenshot-wide" />
                        </div>
                        <p className="p-flush mb-1">
                          3.) Enter the note &gt; Press OK
                        </p>
                        <p className="p-flush mb-0">
                          4.) Left-click on the 3D Space to place the note.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className={getStepClass('anno1-5')} onClick={() => toggleStep('anno1-5')} style={{ marginBottom: '2.5rem' }}>
                    <div className="step-header">
                      <span className={`step-number ${completedSteps.has('anno1-5') ? 'completed' : ''}`}>
                        {completedSteps.has('anno1-5') ? <CheckCircle2 size={16} /> : '5'}
                      </span>
                      <span className="step-label">Creates character strings.</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <div className="image-wrapper-flush" style={{ margin: 0, marginBottom: '1rem', display: 'inline-block' }}>
                        <img src={characterStringsImg} alt="Character Strings" className="software-screenshot" style={{ width: '100px', padding: '0.2rem' }} />
                      </div>
                      <div className="pl-2">
                        <p className="p-flush mb-1">
                          1.) Left-click on the 3D Space show the <strong className="text-highlight" style={{ color: 'var(--primary-red)' }}>Text Entry window</strong>.
                        </p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.5rem', marginBottom: '0.5rem', maxWidth: '300px' }}>
                          <img src={textEntryImg} alt="Text Entry Window" className="software-screenshot screenshot-wide" />
                        </div>
                        <p className="p-flush mb-1">
                          2.) Enter the note &gt; Press OK
                        </p>
                        <p className="p-flush mb-0">
                          3.) Left-click on the 3D Space to place the note.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>

</div>
              </div>            ) : (
              <div className="fade-in">

                <div className="tool-block" style={{ gap: '2rem', padding: '0', background: 'transparent' }}>
                  {/* Item 1 */}
                  <div className={getStepClass('anno2-1')} onClick={() => toggleStep('anno2-1')} style={{ marginBottom: '2.5rem' }}>
                    <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                      <div className="flex-1">
                        <div className="step-header" style={{ marginBottom: '1rem' }}>
                          <span className={`step-number ${completedSteps.has('anno2-1') ? 'completed' : ''}`}>
                            {completedSteps.has('anno2-1') ? <CheckCircle2 size={16} /> : '1'}
                          </span>
                          <span className="step-label">Creates dimensions for 3D entities collectively.</span>
                        </div>
                        <div className="image-wrapper-flush" style={{ marginBottom: '1rem', marginLeft: '2.5rem' }}>
                          <img src={annotation2Img} alt="Collective Dimension Result" className="software-screenshot screenshot-medium" />
                        </div>
                        <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                          <p className="p-flush flex items-center gap-2">
                            1.) Select entity &gt; GO
                            <img src={leftClick} alt="Left Click" className="software-screenshot screenshot-click" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                          </p>
                          <p className="p-flush" style={{ fontWeight: 'bold', marginTop: '1rem' }}>
                            *Dimensions will generate automatically.
                          </p>
                          <p className="p-flush">
                            Such as length, width, height, hole details, hole pitches
                          </p>
                        </div>
                      </div>
                      <div className="image-wrapper-flush" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={collectiveDimensionImg} alt="Collectively Creates Dimension" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className={getStepClass('anno2-2')} onClick={() => toggleStep('anno2-2')} style={{ marginBottom: '2.5rem' }}>
                    <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                      <div className="flex-1">
                        <div className="step-header" style={{ marginBottom: '1rem' }}>
                          <span className={`step-number ${completedSteps.has('anno2-2') ? 'completed' : ''}`}>
                            {completedSteps.has('anno2-2') ? <CheckCircle2 size={16} /> : '2'}
                          </span>
                          <span className="step-label">Edits drafting entity characters</span>
                        </div>
                        <div className="image-wrapper-flush" style={{ marginBottom: '0.5rem', display: 'inline-block', marginLeft: '2.5rem' }}>
                          <img src={changesDraftingEntityImg} alt="Edits Drafting Entity Characters" className="software-screenshot screenshot-small" />
                        </div>
                        <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                          <p className="p-flush flex items-center gap-2">
                            1.) Select drafting entity &gt; GO
                            <img src={leftClick} alt="Left Click" className="software-screenshot screenshot-click" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                          </p>
                          <p className="p-flush mt-2">
                            2.) <strong className="text-highlight" style={{ color: 'var(--primary-red)' }}>Edit Dimension Characters window</strong> will appear.
                          </p>
                          <p className="p-flush mt-2">
                            3.) After editing the dimension characters, Press OK.
                          </p>
                        </div>
                      </div>
                      <div className="image-wrapper-flush" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={editDimensionImg} alt="Edit Dimension Characters Window" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className={getStepClass('anno2-3')} onClick={() => toggleStep('anno2-3')} style={{ marginBottom: '2.5rem' }}>
                    <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                      <div className="flex-1">
                        <div className="step-header" style={{ marginBottom: '1rem' }}>
                          <span className={`step-number ${completedSteps.has('anno2-3') ? 'completed' : ''}`}>
                            {completedSteps.has('anno2-3') ? <CheckCircle2 size={16} /> : '3'}
                          </span>
                          <span className="step-label">Changes the attributes of a drafting entity</span>
                        </div>
                        <div className="image-wrapper-flush" style={{ marginBottom: '0.5rem', display: 'inline-block', marginLeft: '2.5rem' }}>
                          <img src={changesDraftingEntityImg} alt="Changes Draft Entity Attribute" className="software-screenshot screenshot-small" />
                        </div>
                        <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                          <p className="p-flush flex items-center gap-2">
                            1.) Select drafting entity &gt; GO
                            <img src={leftClick} alt="Left Click" className="software-screenshot screenshot-click" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                          </p>
                          <p className="p-flush mt-2">
                            2.) <strong className="text-highlight" style={{ color: 'var(--primary-red)' }}>Change Properties window</strong> will appear.
                          </p>
                          <p className="p-flush mt-2">
                            3.) After changing the properties, Press OK
                          </p>
                        </div>
                      </div>
                      <div className="image-wrapper-flush" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={changePropertiesWindowImg} alt="Change Properties Window" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className={getStepClass('anno2-4')} onClick={() => toggleStep('anno2-4')}>
                    <div className="step-header" style={{ marginBottom: '1rem' }}>
                      <span className={`step-number ${completedSteps.has('anno2-4') ? 'completed' : ''}`}>
                        {completedSteps.has('anno2-4') ? <CheckCircle2 size={16} /> : '4'}
                      </span>
                      <span className="step-label">Changes the positions of drafting entities</span>
                    </div>
                    <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                      <div className="image-wrapper-flush" style={{ display: 'inline-block' }}>
                        <img src={changesPositionDraftingEntitiesImg} alt="Changes Position Tool" className="software-screenshot screenshot-small" />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>

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
