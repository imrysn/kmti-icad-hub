/**
 * 3D_Component.tsx  —  Component operations lessons (1 and 2)
 */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MousePointer2, Box as BoxIcon } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_Component.css';

// Component (1) Assets
import componentMenu from '../../assets/3D_Image_File/component(1)_move_copy_delete.jpg';
import moveIcon from '../../assets/3D_Image_File/component(1)_move.jpg';
import moveResult from '../../assets/3D_Image_File/component(1)_move_2.jpg';
import moveEntry from '../../assets/3D_Image_File/component(1)_move_entry.jpg';
import copyIcon from '../../assets/3D_Image_File/component(1)_copy.jpg';
import copyDistance from '../../assets/3D_Image_File/component(1)_copy_2.jpg';
import copyFinal from '../../assets/3D_Image_File/component(1)_copy_3.jpg';
import mirrorIcon from '../../assets/3D_Image_File/component(1)_mirror.jpg';
import mirrorResult from '../../assets/3D_Image_File/component(1)_mirror_3.jpg';
import rotateIcon from '../../assets/3D_Image_File/component(1)_rotate.jpg';
import rotateResult from '../../assets/3D_Image_File/component(1)_rotate_3.jpg';
import rotateEntry from '../../assets/3D_Image_File/component(1)_rotate_4.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

interface ComponentLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
}

const Component1: React.FC<{ onNextLesson?: () => void }> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate'>('move');

  const handleNext = () => {
    if (activeTab === 'move') setActiveTab('copy');
    else if (activeTab === 'copy') setActiveTab('mirror');
    else if (activeTab === 'mirror') setActiveTab('rotate');
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (activeTab === 'copy') setActiveTab('move');
    else if (activeTab === 'mirror') setActiveTab('copy');
    else if (activeTab === 'rotate') setActiveTab('mirror');
  };

  return (
    <div className="tab-content-area fade-in">
      <div className="lesson-tabs">
        <button
          className={`tab-button ${activeTab === 'move' ? 'active' : ''}`}
          onClick={() => setActiveTab('move')}
        >
          Move
        </button>
        <button
          className={`tab-button ${activeTab === 'copy' ? 'active' : ''}`}
          onClick={() => setActiveTab('copy')}
        >
          Copy
        </button>
        <button
          className={`tab-button ${activeTab === 'mirror' ? 'active' : ''}`}
          onClick={() => setActiveTab('mirror')}
        >
          Mirror
        </button>
        <button
          className={`tab-button ${activeTab === 'rotate' ? 'active' : ''}`}
          onClick={() => setActiveTab('rotate')}
        >
          Rotate
        </button>
      </div>

      {activeTab === 'move' && (
        <div className="tab-pane fade-in">
          <h3 className="section-title">MOVE COMPONENT</h3>
          <div className="instruction-step" style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Move Component from the icon menu.</span>
            </div>
            <div className="image-wrapper-flush">
              <img src={moveIcon} alt="Move Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header" style={{ marginBottom: '1.5rem' }}>
              <span className="step-number">2</span>
              <span className="step-label">Select the component to be move &gt; GO </span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>

            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-label">Specify the movement distance on the X, Y and Z-axis on the item entry &gt; Press Enter</span>
            </div>

            <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
              <div className="flex-row">
                <div className="flex-1">
                  <img src={moveEntry} alt="Move Item Entry" className="software-screenshot screenshot-large" />
                </div>
                <div className="flex-1">
                  <img src={moveResult} alt="Move Result" className="software-screenshot screenshot-large" />
                </div>
              </div>
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
      )}

      {activeTab === 'copy' && (
        <div className="tab-pane fade-in">
          <h3 className="section-title">COPY COMPONENT</h3>
          <div className="instruction-step" style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Copy Component from the icon menu.</span>
            </div>
            <div className="image-wrapper-flush">
              <img src={copyIcon} alt="Copy Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header" style={{ marginBottom: '1rem' }}>
              <span className="step-number">2</span>
              <span className="step-label">Select the component to be copy &gt; GO</span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-label">Specify the distance on the X, Y and Z-axis and the number of copies needed &gt; Press Enter</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
              <div className="flex-row">
                <div className="flex-1">
                  <img src={copyFinal} alt="Copy Result" className="software-screenshot screenshot-large screenshot-plain" />
                </div>
                <img src={copyDistance} alt="Copy Distance/Number" className="software-screenshot screenshot-medium screenshot-plain" />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'mirror' && (
        <div className="tab-pane fade-in">
          <h3 className="section-title">MIRROR COMPONENT</h3>
          <p className="p-flush-bottom">Use to move/relocate a component by mirror movement.</p>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Mirror Component from the icon menu.</span>
            </div>
            <div className="image-wrapper-flush">
              <img src={mirrorIcon} alt="Mirror Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header" style={{ marginBottom: '1rem' }}>
              <span className="step-number">2</span>
              <span className="step-label">Select the components to be mirror &gt; GO</span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-label">Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
              <img src={mirrorResult} alt="Mirror Points and Result" className="software-screenshot screenshot-large" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'rotate' && (
        <div className="tab-pane fade-in">
          <h3 className="section-title">ROTATE COMPONENT</h3>
          <p className="p-flush-bottom">Use to move/relocate a component by rotating on an axis.</p>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Rotate Component from the icon menu.</span>
            </div>
            <div className="image-wrapper-flush">
              <img src={rotateIcon} alt="Rotate Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header" style={{ marginBottom: '1rem' }}>
              <span className="step-number">2</span>
              <span className="step-label">Select the component to be rotate &gt; GO</span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-label">Select 2-points to set the axis of rotation.</span>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">4</span>
              <span className="step-label">Specify the desired angle of rotation on the item entry. Press Enter</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
              <div className="flex-row">
                <div className="flex-1">
                  <img src={rotateEntry} alt="Rotate Angle Entry" className="software-screenshot screenshot-large" />
                </div>
                <div className="flex-1">
                  <img src={rotateResult} alt="Rotate Result" className="software-screenshot screenshot-large" />
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Component (2) Assets
import repeatCopyIcon from '../../assets/3D_Image_File/component(2)_repeat_copy.jpg';
import repeatCopyResult from '../../assets/3D_Image_File/component(2)_repeat_copy2.jpg';
import rotateCopyIcon from '../../assets/3D_Image_File/component(2)_rotate_copy.jpg';
import rotateCopyPoints from '../../assets/3D_Image_File/component(2)_rotate_copy_3.jpg';
import rotateCopyEntry from '../../assets/3D_Image_File/component(2)_rotate_copy_4.jpg';
import mirrorCopyIcon from '../../assets/3D_Image_File/component(2)_mirror_copy.jpg';
import mirrorCopyResult from '../../assets/3D_Image_File/component(2)_mirror_copy_2.jpg';
import deleteIcon from '../../assets/3D_Image_File/component(2)_delete.jpg';

const Component2: React.FC<{ onNextLesson?: () => void }> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'repeat' | 'rotateCopy' | 'mirrorCopy' | 'delete'>('repeat');

  const handleNext = () => {
    if (activeTab === 'repeat') setActiveTab('rotateCopy');
    else if (activeTab === 'rotateCopy') setActiveTab('mirrorCopy');
    else if (activeTab === 'mirrorCopy') setActiveTab('delete');
    else if (onNextLesson) onNextLesson();
  };

  const handlePrev = () => {
    if (activeTab === 'rotateCopy') setActiveTab('repeat');
    else if (activeTab === 'mirrorCopy') setActiveTab('rotateCopy');
    else if (activeTab === 'delete') setActiveTab('mirrorCopy');
  };

  return (
    <div className="tab-content-area fade-in">
      <div className="lesson-tabs">
        <button
          className={`tab-button ${activeTab === 'repeat' ? 'active' : ''}`}
          onClick={() => setActiveTab('repeat')}
        >
          Repeat Copy
        </button>
        <button
          className={`tab-button ${activeTab === 'rotateCopy' ? 'active' : ''}`}
          onClick={() => setActiveTab('rotateCopy')}
        >
          Rotate Copy
        </button>
        <button
          className={`tab-button ${activeTab === 'mirrorCopy' ? 'active' : ''}`}
          onClick={() => setActiveTab('mirrorCopy')}
        >
          Mirror Copy
        </button>
        <button
          className={`tab-button ${activeTab === 'delete' ? 'active' : ''}`}
          onClick={() => setActiveTab('delete')}
        >
          Delete
        </button>
      </div>

      {activeTab === 'repeat' && (
        <div className="tab-pane fade-in">
          <h3 className="section-title">REPEAT COPY COMPONENT</h3>
          <p className="p-flush-bottom">Use for continuous duplication of component.</p>

          <div className="instruction-step">
            <div className="image-wrapper-flush">
              <img src={repeatCopyIcon} alt="Repeat Copy Icon" className="software-screenshot screenshot-small" />
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
              <img src={repeatCopyResult} alt="Repeat Copy Result" className="software-screenshot screenshot-large" />
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
      )}

      {activeTab === 'rotateCopy' && (
        <div className="tab-pane fade-in">
          <h3 className="section-title">ROTATE COPY COMPONENT</h3>
          <p className="p-flush-bottom">Use to create a duplicate of a component by rotating on an axis.</p>
          <div className="image-wrapper-flush">
            <img src={rotateCopyIcon} alt="Rotate Copy Icon" className="software-screenshot screenshot-small" />
          </div>

          <div className="instruction-step" style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Rotate Component from the icon menu.</span>
            </div>

          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">Select the component/s to be rotated &gt; </span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-label">Select 2 points to set the axis of rotation.</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <img src={rotateCopyPoints} alt="Rotate Copy Points" className="software-screenshot screenshot-large" />
            </div>
          </div>

          <div className="instruction-step" style={{ marginTop: '1rem' }}>
            <div className="step-header">
              <span className="step-number">4</span>
              <span className="step-label">Specify the desired angle of rotation on the item entry. Press Enter.</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <img src={rotateCopyEntry} alt="Rotate Copy Entry" className="software-screenshot screenshot-wide" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'mirrorCopy' && (
        <div className="tab-pane fade-in">
          <h3 className="section-title">MIRROR COPY COMPONENT</h3>
          <p className="p-flush-bottom">Use to create a duplicate of a component by mirror movement.</p>
          <div className="image-wrapper-flush">
            <img src={mirrorCopyIcon} alt="Mirror Copy Icon" className="software-screenshot screenshot-small" />
          </div>
          <p className="p-flush" style={{ marginTop: '1rem' }}>Same procedure with Mirror Component.</p>

          <div className="instruction-step">
            <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
              <img src={mirrorCopyResult} alt="Mirror Copy Result" className="software-screenshot screenshot-large" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'delete' && (
        <div className="tab-pane fade-in">
          <h3 className="section-title">DELETE COMPONENT</h3>
          <div className="instruction-step" style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select Delete Component from the icon menu.</span>
            </div>
            <div className="image-wrapper-flush">
              <img src={deleteIcon} alt="Delete Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label" style={{ marginTop: '1rem' }}>Select components to be deleted.</span>
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

const ComponentLesson: React.FC<ComponentLessonProps> = ({ subLessonId, onNextLesson }) => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><BoxIcon size={28} className="lesson-intro-icon" /> MOVE/COPY/DELETE COMPONENT</h3>
        <p>These tools are use to change the position, duplicate or delete components such as drill holes, cutouts, components of merged entities.</p>
        <div className="instruction-box">
          <div className="image-wrapper">
            <img src={componentMenu} alt="Component Operation Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          {subLessonId === 'component-1' ? (
            <Component1 onNextLesson={onNextLesson} />
          ) : (
            <Component2 onNextLesson={onNextLesson} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentLesson;
