/**
 * 3D_Component.tsx  —  Component operations lessons (1 and 2)
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MousePointer2, Box as BoxIcon, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/CourseLesson.css';

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

const ProTip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="pro-tip-card">
    <div className="pro-tip-icon-wrapper">
      <Zap size={20} fill="currentColor" />
    </div>
    <div className="pro-tip-content">
      <h5>{title}</h5>
      <p>{children}</p>
    </div>
  </div>
);

const Component1: React.FC<{ onNextLesson?: () => void }> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'move' | 'copy' | 'mirror' | 'rotate'>('move');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

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

  const tabs = [
    { id: 'move', label: 'Move' },
    { id: 'copy', label: 'Copy' },
    { id: 'mirror', label: 'Mirror' },
    { id: 'rotate', label: 'Rotate' }
  ];

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
    <div className="tab-content-area">
      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}
      </div>

      {activeTab === 'move' && (
        <div className="tab-pane fade-in">
          <div className="card-header"><h4>MOVE COMPONENT</h4></div>
          
          <div className={getStepClass('move-1')} onClick={() => toggleStep('move-1')}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('move-1') ? 'completed' : ''}`}>
                {completedSteps.has('move-1') ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="step-label">Select Move Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select <strong className="text-highlight">Move Component</strong> from the icon menu.</p>
            </div>
            <div className="image-wrapper-flush">
              <img src={moveIcon} alt="Move Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className={getStepClass('move-2')} onClick={() => toggleStep('move-2')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('move-2') ? 'completed' : ''}`}>
                {completedSteps.has('move-2') ? <CheckCircle2 size={16} /> : '2'}
              </span>
              <span className="step-label">Select Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select the component to be move &gt; <strong className="text-highlight">GO</strong></p>
            </div>
            <div className="image-wrapper-flush">
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className={getStepClass('move-3')} onClick={() => toggleStep('move-3')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('move-3') ? 'completed' : ''}`}>
                {completedSteps.has('move-3') ? <CheckCircle2 size={16} /> : '3'}
              </span>
              <span className="step-label">Specify Movement</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Specify the movement distance on the X, Y and Z-axis on the item entry &gt; Press <strong className="text-highlight">Enter</strong></p>
            </div>
            <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
              <div className="image-wrapper-flush">
                <img src={moveEntry} alt="Move Item Entry" className="software-screenshot screenshot-medium" />
              </div>
              <div className="image-wrapper-flush">
                <img src={moveResult} alt="Move Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <ProTip title="Pro Tip: Precision Movement">
              You don't always need exact numbers! Often it is faster to enter one value, press enter, and then adjust the model visually if you're not working with perfectly strict tolerances.
            </ProTip>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
          </div>
        </div>
      )}

      {activeTab === 'copy' && (
        <div className="tab-pane fade-in">
          <div className="card-header"><h4>COPY COMPONENT</h4></div>
          
          <div className={getStepClass('copy-1')} onClick={() => toggleStep('copy-1')}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('copy-1') ? 'completed' : ''}`}>
                {completedSteps.has('copy-1') ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="step-label">Select Copy Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select <strong className="text-highlight">Copy Component</strong> from the icon menu.</p>
            </div>
            <div className="image-wrapper-flush">
              <img src={copyIcon} alt="Copy Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className={getStepClass('copy-2')} onClick={() => toggleStep('copy-2')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('copy-2') ? 'completed' : ''}`}>
                {completedSteps.has('copy-2') ? <CheckCircle2 size={16} /> : '2'}
              </span>
              <span className="step-label">Select Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select the component to be copy &gt; <strong className="text-highlight">GO</strong></p>
            </div>
            <div className="image-wrapper-flush">
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className={getStepClass('copy-3')} onClick={() => toggleStep('copy-3')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('copy-3') ? 'completed' : ''}`}>
                {completedSteps.has('copy-3') ? <CheckCircle2 size={16} /> : '3'}
              </span>
              <span className="step-label">Set Distance & Number</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Specify the distance on the X, Y and Z-axis and the number of copies needed &gt; Press <strong className="text-highlight">Enter</strong></p>
            </div>
            <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
              <div className="image-wrapper-flush">
                <img src={copyDistance} alt="Copy Distance/Number" className="software-screenshot screenshot-medium" />
              </div>
              <div className="image-wrapper-flush">
                <img src={copyFinal} alt="Copy Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
          </div>
        </div>
      )}

      {activeTab === 'mirror' && (
        <div className="tab-pane fade-in">
          <div className="card-header"><h4>MIRROR COMPONENT</h4></div>
          <div className="instruction-box">
            <p className="p-flush">Use to move/relocate a component by mirror movement.</p>
          </div>

          <div className={getStepClass('mirror-1')} onClick={() => toggleStep('mirror-1')}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('mirror-1') ? 'completed' : ''}`}>
                {completedSteps.has('mirror-1') ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="step-label">Select Mirror Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select <strong className="text-highlight">Mirror Component</strong> from the icon menu.</p>
            </div>
            <div className="image-wrapper-flush">
              <img src={mirrorIcon} alt="Mirror Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className={getStepClass('mirror-2')} onClick={() => toggleStep('mirror-2')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('mirror-2') ? 'completed' : ''}`}>
                {completedSteps.has('mirror-2') ? <CheckCircle2 size={16} /> : '2'}
              </span>
              <span className="step-label">Select Components</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select the components to be mirror &gt; <strong className="text-highlight">GO</strong></p>
            </div>
            <div className="image-wrapper-flush">
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className={getStepClass('mirror-3')} onClick={() => toggleStep('mirror-3')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('mirror-3') ? 'completed' : ''}`}>
                {completedSteps.has('mirror-3') ? <CheckCircle2 size={16} /> : '3'}
              </span>
              <span className="step-label">Set Plane</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored.</p>
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <img src={mirrorResult} alt="Mirror Points and Result" className="software-screenshot screenshot-wide" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
          </div>
        </div>
      )}

      {activeTab === 'rotate' && (
        <div className="tab-pane fade-in">
          <div className="card-header"><h4>ROTATE COMPONENT</h4></div>
          <div className="instruction-box">
            <p className="p-flush">Use to move/relocate a component by rotating on an axis.</p>
          </div>

          <div className={getStepClass('rotate-1')} onClick={() => toggleStep('rotate-1')}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('rotate-1') ? 'completed' : ''}`}>
                {completedSteps.has('rotate-1') ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="step-label">Select Rotate Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select <strong className="text-highlight">Rotate Component</strong> from the icon menu.</p>
            </div>
            <div className="image-wrapper-flush">
              <img src={rotateIcon} alt="Rotate Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className={getStepClass('rotate-2')} onClick={() => toggleStep('rotate-2')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('rotate-2') ? 'completed' : ''}`}>
                {completedSteps.has('rotate-2') ? <CheckCircle2 size={16} /> : '2'}
              </span>
              <span className="step-label">Select Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select the component to be rotate &gt; <strong className="text-highlight">GO</strong></p>
            </div>
            <div className="image-wrapper-flush">
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className={getStepClass('rotate-3')} onClick={() => toggleStep('rotate-3')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('rotate-3') ? 'completed' : ''}`}>
                {completedSteps.has('rotate-3') ? <CheckCircle2 size={16} /> : '3'}
              </span>
              <span className="step-label">Set Axis</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select 2-points to set the axis of rotation.</p>
            </div>
          </div>

          <div className={getStepClass('rotate-4')} onClick={() => toggleStep('rotate-4')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('rotate-4') ? 'completed' : ''}`}>
                {completedSteps.has('rotate-4') ? <CheckCircle2 size={16} /> : '4'}
              </span>
              <span className="step-label">Specify Angle</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Specify the desired angle of rotation on the item entry &gt; Press <strong className="text-highlight">Enter</strong></p>
            </div>
            <div className="flex-row-center--wrap" style={{ marginTop: '1rem', gap: '1.5rem' }}>
              <div className="image-wrapper-flush">
                <img src={rotateEntry} alt="Rotate Angle Entry" className="software-screenshot screenshot-medium" />
              </div>
              <div className="image-wrapper-flush">
                <img src={rotateResult} alt="Rotate Result" className="software-screenshot screenshot-medium" />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <ProTip title="Pro Tip: Axis Verification">
              When selecting an axis for rotation, picking the exact center points of cylindrical parts usually gives the most predictable outcome!
            </ProTip>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
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
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

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

  const tabs = [
    { id: 'repeat', label: 'Repeat Copy' },
    { id: 'rotateCopy', label: 'Rotate Copy' },
    { id: 'mirrorCopy', label: 'Mirror Copy' },
    { id: 'delete', label: 'Delete' }
  ];

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
    <div className="tab-content-area">
      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}
      </div>

      {activeTab === 'repeat' && (
        <div className="tab-pane fade-in">
          <div className="card-header"><h4>REPEAT COPY COMPONENT</h4></div>
          <div className="instruction-box">
            <p className="p-flush">Use for continuous duplication of component.</p>
          </div>

          <div className={getStepClass('repeat-1')} onClick={() => toggleStep('repeat-1')}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('repeat-1') ? 'completed' : ''}`}>
                {completedSteps.has('repeat-1') ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="step-label">Select Repeat Copy Tool</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginLeft: '2.5rem' }}>
              <img src={repeatCopyIcon} alt="Repeat Copy Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className={getStepClass('repeat-2')} onClick={() => toggleStep('repeat-2')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('repeat-2') ? 'completed' : ''}`}>
                {completedSteps.has('repeat-2') ? <CheckCircle2 size={16} /> : '2'}
              </span>
              <span className="step-label">Perform Repeat Copying</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select the base point and repeatedly click to place copies.</p>
            </div>
            <div className="image-wrapper-flush" style={{ marginLeft: '2.5rem' }}>
              <img src={repeatCopyResult} alt="Repeat Copy Result" className="software-screenshot screenshot-wide" />
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <ProTip title="Pro Tip: Patterning Options">
              Repeat copy is great for an irregular scattering of parts. But if you need components evenly spaced in a row or grid, consider the standard <strong className="text-highlight">Copy Component</strong> with a set distance/quantity instead!
            </ProTip>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
          </div>
        </div>
      )}

      {activeTab === 'rotateCopy' && (
        <div className="tab-pane fade-in">
          <div className="card-header"><h4>ROTATE COPY COMPONENT</h4></div>
          <div className="instruction-box">
            <p className="p-flush">Use to create a duplicate of a component by rotating on an axis.</p>
          </div>

          <div className={getStepClass('rotateCopy-1')} onClick={() => toggleStep('rotateCopy-1')}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('rotateCopy-1') ? 'completed' : ''}`}>
                {completedSteps.has('rotateCopy-1') ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="step-label">Select Rotate Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select <strong className="text-highlight">Rotate Component</strong> from the icon menu.</p>
            </div>
            <div className="image-wrapper-flush">
              <img src={rotateCopyIcon} alt="Rotate Copy Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className={getStepClass('rotateCopy-2')} onClick={() => toggleStep('rotateCopy-2')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('rotateCopy-2') ? 'completed' : ''}`}>
                {completedSteps.has('rotateCopy-2') ? <CheckCircle2 size={16} /> : '2'}
              </span>
              <span className="step-label">Select Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select the component/s to be rotated &gt; <strong className="text-highlight">GO</strong></p>
            </div>
            <div className="image-wrapper-flush">
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
          </div>

          <div className={getStepClass('rotateCopy-3')} onClick={() => toggleStep('rotateCopy-3')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('rotateCopy-3') ? 'completed' : ''}`}>
                {completedSteps.has('rotateCopy-3') ? <CheckCircle2 size={16} /> : '3'}
              </span>
              <span className="step-label">Set Axis</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select 2 points to set the axis of rotation.</p>
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <img src={rotateCopyPoints} alt="Rotate Copy Points" className="software-screenshot screenshot-wide" />
            </div>
          </div>

          <div className={getStepClass('rotateCopy-4')} onClick={() => toggleStep('rotateCopy-4')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('rotateCopy-4') ? 'completed' : ''}`}>
                {completedSteps.has('rotateCopy-4') ? <CheckCircle2 size={16} /> : '4'}
              </span>
              <span className="step-label">Specify Angle</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Specify the desired angle of rotation on the item entry &gt; Press <strong className="text-highlight">Enter</strong></p>
            </div>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <img src={rotateCopyEntry} alt="Rotate Copy Entry" className="software-screenshot screenshot-wide" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
          </div>
        </div>
      )}

      {activeTab === 'mirrorCopy' && (
        <div className="tab-pane fade-in">
          <div className="card-header"><h4>MIRROR COPY COMPONENT</h4></div>
          <div className="instruction-box">
            <p className="p-flush">Use to create a duplicate of a component by mirror movement.</p>
            <p className="p-flush" style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Same procedure with Mirror Component.</p>
          </div>

          <div className={getStepClass('mirrorCopy-1')} onClick={() => toggleStep('mirrorCopy-1')}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('mirrorCopy-1') ? 'completed' : ''}`}>
                {completedSteps.has('mirrorCopy-1') ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="step-label">Select Mirror Copy Tool</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginLeft: '2.5rem' }}>
              <img src={mirrorCopyIcon} alt="Mirror Copy Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className={getStepClass('mirrorCopy-2')} onClick={() => toggleStep('mirrorCopy-2')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('mirrorCopy-2') ? 'completed' : ''}`}>
                {completedSteps.has('mirrorCopy-2') ? <CheckCircle2 size={16} /> : '2'}
              </span>
              <span className="step-label">Select Plane and Points</span>
            </div>
            <div className="image-wrapper-flush" style={{ marginLeft: '2.5rem' }}>
              <img src={mirrorCopyResult} alt="Mirror Copy Result" className="software-screenshot screenshot-wide" />
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
          </div>
        </div>
      )}

      {activeTab === 'delete' && (
        <div className="tab-pane fade-in">
          <div className="card-header"><h4>DELETE COMPONENT</h4></div>
          
          <div className={getStepClass('delete-1')} onClick={() => toggleStep('delete-1')}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('delete-1') ? 'completed' : ''}`}>
                {completedSteps.has('delete-1') ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="step-label">Select Delete Component</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select <strong className="text-highlight">Delete Component</strong> from the icon menu.</p>
            </div>
            <div className="image-wrapper-flush">
              <img src={deleteIcon} alt="Delete Component Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className={getStepClass('delete-2')} onClick={() => toggleStep('delete-2')} style={{ marginTop: '1.5rem' }}>
            <div className="step-header">
              <span className={`step-number ${completedSteps.has('delete-2') ? 'completed' : ''}`}>
                {completedSteps.has('delete-2') ? <CheckCircle2 size={16} /> : '2'}
              </span>
              <span className="step-label">Select Components</span>
            </div>
            <div className="step-description">
              <p className="p-flush">Select components to be deleted &gt; <strong className="text-highlight">GO</strong></p>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <ProTip title="Pro Tip: Don't Panic!">
              If you delete a component by accident, you can often undo the action (Ctrl+Z or the undo button) to get it right back without having to recreate or reload it!
            </ProTip>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>Finish <ChevronRight size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

const ComponentLesson: React.FC<ComponentLessonProps> = ({ subLessonId, onNextLesson }) => {
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
      // Run once to initialize
      handleScroll();
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [subLessonId]);

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div 
          className="lesson-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section className="lesson-intro">
        <h3>MOVE/COPY/DELETE COMPONENT</h3>
        <p className="p-flush">These tools are used to change the position, duplicate or delete components such as drill holes, cutouts, components of merged entities.</p>
        <div className="instruction-box">
          <div className="image-wrapper-flush">
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
