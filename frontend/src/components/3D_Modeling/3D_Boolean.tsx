/**
 * 3D_Boolean.tsx  —  Boolean operations lessons (1 and 2)
 */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MousePointer2, ArrowRight, Box as BoxIcon } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_Boolean.css';

// Boolean (1) Assets
import booleanOpMenu from '../../assets/3D_Image_File/boolean(1)_boolean_operation.jpg';
import unionIcon from '../../assets/3D_Image_File/boolean(1)_union.jpg';
import select3D from '../../assets/3D_Image_File/boolean(1)_select3d.jpg';
import subtractIcon from '../../assets/3D_Image_File/boolean(1)_subtract.jpg';
import subtractEntity from '../../assets/3D_Image_File/boolean(1)_subtract_entity.jpg';
import subtractAfter from '../../assets/3D_Image_File/boolean(1)_subtract_after_subtraction.jpg';
import subtractRetain from '../../assets/3D_Image_File/boolean(1)_subtract_retain_entities.jpg';
import booleanSubtract from '../../assets/3D_Image_File/boolean(1)_boolean_subtract.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

// Boolean (2) Assets
import intersectIcon from '../../assets/3D_Image_File/boolean(2)_intersect.jpg';
import intersectingEntities from '../../assets/3D_Image_File/boolean(2)_intersecting_entities.jpg';
import selectEntity from '../../assets/3D_Image_File/boolean(2)_select_entity.jpg';
import selectOk from '../../assets/3D_Image_File/boolean(2)_select_ok.jpg';
import componentIcon from '../../assets/3D_Image_File/boolean(2)_component.jpg';
import componentSeparate from '../../assets/3D_Image_File/boolean(2)_component_separate_all_components.jpg';
import componentOk from '../../assets/3D_Image_File/boolean(2)_component_select_ok.jpg';
import componentSeparated from '../../assets/3D_Image_File/boolean(2)_component_separated.jpg';

interface BooleanLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
}

const Boolean1: React.FC<{ onNextLesson?: () => void }> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'union' | 'subtract'>('union');

  const handleNext = () => {
    if (activeTab === 'union') {
      setActiveTab('subtract');
    } else if (onNextLesson) {
      onNextLesson();
    }
  };

  const handlePrev = () => {
    if (activeTab === 'subtract') {
      setActiveTab('union');
    }
  };

  return (
    <div className="tab-content-area fade-in">
      <div className="lesson-tabs">
        <button
          className={`tab-button ${activeTab === 'union' ? 'active' : ''}`}
          onClick={() => setActiveTab('union')}
        >
          Union
        </button>
        <button
          className={`tab-button ${activeTab === 'subtract' ? 'active' : ''}`}
          onClick={() => setActiveTab('subtract')}
        >
          Subtract
        </button>
      </div>

      {activeTab === 'union' ? (
        <div className="tab-pane fade-in">
          {/* UNION SECTION */}
          <h3 className="section-title">UNION</h3>
          <p className="p-flush-bottom">Tool for joining 3D entities into a single entity.</p>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Union from the icon menu.</span>
            </div>
            <div className="image-wrapper-flush">
              <img src={unionIcon} alt="Union Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">Select all 3D entities for joining &gt; GO</span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <div className="image-wrapper-flush">
              <img src={select3D} alt="Select 3D entities" className="software-screenshot screenshot-large" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="tab-pane fade-in">
          {/* SUBTRACT SECTION */}
          <h3 className="section-title">SUBTRACT</h3>
          <p className="p-flush-bottom">Tool for creating cutout on 3D entities.</p>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Subtract from the icon menu.</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginBottom: '1.5rem' }}>
              <img src={subtractIcon} alt="Subtract Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">First, select the Target entity.</span>
            </div>
            <div className="flex-row">
              <div className="flex-1">
                <div className="mb-4">
                  <p className="p-flush-bottom text-highlight">Target Entity</p>
                  <p className="p-flush">Main part</p>
                </div>
                <div>
                  <p className="p-flush-bottom text-highlight">Tool entity</p>
                  <p className="p-flush">Entities to be subtracted on the target entity</p>
                </div>
              </div>
              <div className="flex-no-shrink">
                <img src={subtractEntity} alt="Target and Tool Entity" className="software-screenshot screenshot-medium" />
              </div>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-label">Select the tool entities &gt; GO</span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <p className="p-flush">Tool entities will disappear and become components after subtraction.</p>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <img src={subtractAfter} alt="Subtraction Result" className="software-screenshot screenshot-large" />
            </div>
          </div>

          <div className="section-divider-sm">
            <p className="p-flush-bottom">This subtract tool will retain the tool entities after subtraction.</p>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <div className="flex-row items-end">

                <img src={subtractRetain} alt="Subtract and retain entities" className="software-screenshot screenshot-small" />
                <img src={booleanSubtract} alt="Boolean Subtract Icon" className="software-screenshot screenshot-large" />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Finish <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Boolean2: React.FC<{ onNextLesson?: () => void }> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'intersect' | 'separate'>('intersect');

  const handleNext = () => {
    if (activeTab === 'intersect') {
      setActiveTab('separate');
    } else if (onNextLesson) {
      onNextLesson();
    }
  };

  const handlePrev = () => {
    if (activeTab === 'separate') {
      setActiveTab('intersect');
    }
  };

  return (
    <div className="tab-content-area fade-in">
      <div className="lesson-tabs">
        <button
          className={`tab-button ${activeTab === 'intersect' ? 'active' : ''}`}
          onClick={() => setActiveTab('intersect')}
        >
          Intersect
        </button>
        <button
          className={`tab-button ${activeTab === 'separate' ? 'active' : ''}`}
          onClick={() => setActiveTab('separate')}
        >
          Separate Entity
        </button>
      </div>

      {activeTab === 'intersect' ? (
        <div className="tab-pane fade-in">
          <h3 className="section-title">INTERSECT</h3>
          <p className="p-flush-bottom">Tool that creates entity of the product of two intersecting entities.</p>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Intersect from the icon menu.</span>
            </div>
            <div className="image-wrapper-flush">
              <img src={intersectIcon} alt="Intersect Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">Select the intersecting entities &gt; GO</span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <p className="p-flush">Intersecting entities will not disappear after the process!</p>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <img src={intersectingEntities} alt="Intersecting Entities" className="software-screenshot screenshot-large" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="tab-pane fade-in">
          <h3 className="section-title">SEPARATE ENTITY</h3>
          <p className="p-flush-bottom">Tool use to reverse the boolean operations by creating CSG solid.</p>

          <div style={{ margin: '1.5rem 0', paddingLeft: '2.5rem' }}>
            <p className="text-highlight" style={{ margin: 0, fontSize: '1.1rem' }}>Component</p>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>By-product of boolean operations (entities joined by union, cutout, holes)</p>
          </div>

          <div className="instruction-step">
            <div className="image-wrapper-flush">
              <img src={componentIcon} alt="Component Icon" className="software-screenshot screenshot-small" />
            </div>
            <p className="p-flush" style={{ marginTop: '1rem' }}>This tool is use to separate specified entities from the solid entity.</p>

            <div className="step-header" style={{ marginTop: '1.5rem' }}>
              <span className="step-number">1</span>
              <span className="step-label">Select the desired components to be separate from the solid entity &gt; GO</span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>

            <div className="step-header" style={{ marginTop: '1.5rem' }}>
              <span className="step-number">2</span>
              <span className="step-label">Separated components will be displayed in a form of CSG solid. Select OK.</span>
            </div>

            <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
              <div className="flex-row">
                <div className="flex-1">
                  <img src={componentOk} alt="Confirm Dialog" className="software-screenshot" style={{ maxWidth: '300px' }} />
                </div>
                <div className="flex-1">
                  <img src={componentSeparated} alt="Separated Result" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider" style={{ margin: '3rem 0' }}></div>

          <div className="instruction-step" style={{ marginTop: '2rem' }}>
            <div className="image-wrapper-flush">
              <img src={componentSeparate} alt="Separate All Components Icon" className="software-screenshot screenshot-small" />
            </div>
            <p className="p-flush" style={{ marginTop: '1rem' }}>This tool is use to separate all components from the solid entity.</p>

            <div className="step-header" style={{ marginTop: '1.5rem' }}>
              <span className="step-number">1</span>
              <span className="step-label">Select the solid entity &gt; GO</span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>

            <div className="step-header" style={{ marginTop: '1.5rem' }}>
              <span className="step-number">2</span>
              <span className="step-label">Separated components will be displayed in a form of CSG solid. Select OK.</span>
            </div>

            <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
              <div className="flex-row">
                <div className="flex-1">
                  <img src={selectOk} alt="Confirm Dialog" className="software-screenshot" style={{ maxWidth: '300px' }} />
                </div>
                <div className="flex-1">
                  <img src={selectEntity} alt="All Separated Result" className="software-screenshot screenshot-medium" />
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Finish <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BooleanLesson: React.FC<BooleanLessonProps> = ({ subLessonId, onNextLesson }) => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><BoxIcon size={28} className="lesson-intro-icon" /> BOOLEAN OPERATIONS</h3>
        <div className="instruction-box">
          <div className="image-wrapper">
            <img src={booleanOpMenu} alt="Boolean Operation Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          {subLessonId === 'boolean-1' ? (
            <Boolean1 onNextLesson={onNextLesson} />
          ) : (
            <Boolean2 onNextLesson={onNextLesson} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BooleanLesson;
