/**
 * 3D_Properties.tsx — Properties lessons
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sliders, CheckCircle2, Zap } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Properties (1) Assets
import changeColorIcon from '../../assets/3D_Image_File/change_color.jpg';
import changePropertiesWindow from '../../assets/3D_Image_File/change_properties_window.jpg';
import changeColorEntity from '../../assets/3D_Image_File/change_color_entity.jpg';
import changeColorFace from '../../assets/3D_Image_File/change_color_face.jpg';

import changeLayerIcon from '../../assets/3D_Image_File/change_layer.jpg';
import itemEntryChangeLayer from '../../assets/3D_Image_File/item_entry_changelayer.jpg';
import propertiesColorImg from '../../assets/3D_Image_File/properties_color.jpg';

import layer1Img from '../../assets/3D_Image_File/layer1.jpg';
import layer2Img from '../../assets/3D_Image_File/layer2.jpg';
import layer3Img from '../../assets/3D_Image_File/layer3.jpg';
import acrylicPointerImg from '../../assets/3D_Image_File/acrylic_pointer.jpg';
import propertiesMaterialImg from '../../assets/3D_Image_File/properties_material.jpg';
import isoniteManganeseImg from '../../assets/3D_Image_File/isonite_manganese.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

// Properties (2) Assets
import information1 from '../../assets/3D_Image_File/information1.jpg';
import information2 from '../../assets/3D_Image_File/information2.jpg';
import information3 from '../../assets/3D_Image_File/information3.jpg';
import information4 from '../../assets/3D_Image_File/information4.jpg';
import information5 from '../../assets/3D_Image_File/information5.jpg';
import infoPointImg from '../../assets/3D_Image_File/properties(2)_information_point.jpg';
import infoEdgeImg from '../../assets/3D_Image_File/properties(2)_information_edge.jpg';
import infoPointEdgeImg from '../../assets/3D_Image_File/properties(2)_information_point_edge.jpg';
import infoAngleImg from '../../assets/3D_Image_File/properties(2)_information_angle.jpg';
import infoEntityImg from '../../assets/3D_Image_File/properties(2)_information_entity.jpg';

interface PropertiesLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PropertiesLesson: React.FC<PropertiesLessonProps> = ({ subLessonId = 'properties-1', onNextLesson, onPrevLesson }) => {
  const isProperties1 = subLessonId === 'properties-1';
  const [activeTab, setActiveTab] = useState<'color' | 'layer'>('color');
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
  }, [activeTab, subLessonId]);

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
    if (isProperties1) {
      if (activeTab === 'color') setActiveTab('layer');
      else if (onNextLesson) onNextLesson();
    } else {
      if (onNextLesson) onNextLesson();
    }
  };

  const handlePrev = () => {
    if (isProperties1) {
      if (activeTab === 'layer') setActiveTab('color');
      else if (onPrevLesson) onPrevLesson();
    } else {
      if (onPrevLesson) onPrevLesson();
    }
  };

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
        <h3 className="section-title"><Sliders size={28} className="lesson-intro-icon" /> PROPERTIES</h3>
        {!isProperties1 && (
          <p className="p-flush">
            Displays the information about the clicked entities (coordinates, length, distance, angle, and entity information)
          </p>
        )}
        {isProperties1 && activeTab === 'color' && (
          <div className="instruction-box" style={{ marginTop: '1.5rem', border: 'none', background: 'transparent' }}>
            <div className="image-wrapper-flush" style={{ margin: '0 auto' }}>
              <img src={propertiesColorImg} alt="Change Color Properties Dialog" className="software-screenshot screenshot-small" />
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="lesson-content fade-in">
            {isProperties1 ? (
              <>
                <div className="lesson-tabs">
                  <button
                    className={`tab-button ${activeTab === 'color' ? 'active' : ''}`}
                    onClick={() => setActiveTab('color')}
                  >
                    Change Color
                  </button>
                  <button
                    className={`tab-button ${activeTab === 'layer' ? 'active' : ''}`}
                    onClick={() => setActiveTab('layer')}
                  >
                    Change Layer
                  </button>
                </div>

                {activeTab === 'color' && (
                  <div className="tab-pane fade-in">
                    <h3 className="section-title">CHANGE COLOR</h3>

                    <div className={getStepClass('color-1')} onClick={() => toggleStep('color-1')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('color-1') ? 'completed' : ''}`}>
                          {completedSteps.has('color-1') ? <CheckCircle2 size={16} /> : '1'}
                        </span>
                        <span className="step-label">Select <strong className="text-highlight">Change Color</strong> from the icon menu.</span>
                      </div>
                      <div className="image-wrapper-flush" style={{ paddingLeft: '2.5rem', marginTop: '0.8rem' }}>
                        <img src={changeColorIcon} alt="Change Color Icon" className="software-screenshot screenshot-small" />
                      </div>
                    </div>

                    <div className={getStepClass('color-2')} onClick={() => toggleStep('color-2')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('color-2') ? 'completed' : ''}`}>
                          {completedSteps.has('color-2') ? <CheckCircle2 size={16} /> : '2'}
                        </span>
                        <span className="step-label">Select either <strong className="text-highlight">Entity</strong> or <strong className="text-highlight">Face</strong></span>
                      </div>

                      <div className="tool-block" style={{ marginTop: '1.5rem', marginLeft: '2.5rem' }}>
                        <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                          <div className="flex-1">
                            <h4 className="section-title">Entity</h4>
                            <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                              <span className="step-label">Pick a color &gt; Select the solid entity</span>
                            </div>
                            <div className="step-description">
                              <p className="p-flush" style={{ color: 'var(--text-muted)' }}>The entire solid entity will change its color.</p>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="image-wrapper-flush">
                              <img src={changeColorEntity} alt="Change Color Entity" className="software-screenshot screenshot-medium" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-row-wrap" style={{ marginTop: '2.5rem', gap: '2rem' }}>
                          <div className="flex-1">
                            <h4 className="section-title">Face</h4>
                            <div className="step-header" style={{ border: 'none', background: 'transparent', padding: 0, marginBottom: '0.5rem' }}>
                              <span className="step-label">Pick a color &gt; Select surface to be changed &gt; GO</span>
                            </div>
                            <div className="step-description">
                              <p className="p-flush" style={{ color: 'var(--text-muted)' }}>Only selected faces/surfaces will change its color.</p>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="image-wrapper-flush">
                              <img src={changeColorFace} alt="Change Color Face" className="software-screenshot screenshot-medium" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {activeTab === 'layer' && (
                  <div className="tab-pane fade-in">
                    <h3 className="section-title">CHANGE LAYER</h3>

                    <div className={getStepClass('layer-1')} onClick={() => toggleStep('layer-1')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('layer-1') ? 'completed' : ''}`}>
                          {completedSteps.has('layer-1') ? <CheckCircle2 size={16} /> : '1'}
                        </span>
                        <span className="step-label">Select <strong className="text-highlight">Change Layer</strong> from the icon menu.</span>
                      </div>
                      <div className="image-wrapper-flush" style={{ paddingLeft: '2.5rem', marginTop: '0.8rem' }}>
                        <img src={changeLayerIcon} alt="Change Layer Icon" className="software-screenshot screenshot-small" />
                      </div>
                    </div>

                    <div className={getStepClass('layer-2')} onClick={() => toggleStep('layer-2')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('layer-2') ? 'completed' : ''}`}>
                          {completedSteps.has('layer-2') ? <CheckCircle2 size={16} /> : '2'}
                        </span>
                        <span className="step-label">Specify the layer on the item entry.</span>
                      </div>
                      <div className="image-wrapper-flush" style={{ paddingLeft: '2.5rem', marginTop: '0.8rem' }}>
                        <img src={itemEntryChangeLayer} alt="Change Layer Item Entry" className="software-screenshot screenshot-large" />
                      </div>
                    </div>

                    <div className={getStepClass('layer-3')} onClick={() => toggleStep('layer-3')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('layer-3') ? 'completed' : ''}`}>
                          {completedSteps.has('layer-3') ? <CheckCircle2 size={16} /> : '3'}
                        </span>
                        <span className="step-label">Click on the solid entity.</span>
                      </div>
                    </div>

                    <div className="section-divider"></div>
                    <h3 className="section-title">LAYER DESIGNATION OF 3D PARTS</h3>

                    <div className="tool-block">
                      <h4 className="section-title">Layer 1</h4>
                      <ul className="interaction-list--plain">
                        <li>All common parts need to be fabricated or machined</li>
                        <li>Parts that undergo Annealing, Shot blasting, Annealing Shot blasting</li>
                        <li>Covers for purchase parts (No mechanism)</li>
                        <li>All parts must be color white</li>
                      </ul>
                      <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                        <img src={layer1Img} alt="Layer 1 White Parts" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>

                    <div className="tool-block">
                      <h4 className="section-title">Layer 2</h4>
                      <ul className="interaction-list--plain">
                        <li>Fabricated parts/Machined parts with color/paint</li>
                        <li>Safety Cover - Yellow (No. 4)</li>
                      </ul>
                      <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                        <img src={layer2Img} alt="Layer 2 Yellow Parts" className="software-screenshot screenshot-wide" />
                      </div>
                      <p className="step-description text-center" style={{ marginTop: '0.5rem' }}>
                        Safety color applies to covers for machine guarding such as chain, belt and gear drive power transmission system.
                      </p>
                    </div>

                    <div className="tool-block">
                      <ul className="interaction-list--plain">
                        <li>Parts that does not need to be painted</li>
                        <li>All Stainless Steel (SUS) - white (No.1)</li>
                        <li>Acrylic - white (No.1)</li>
                      </ul>
                      <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                        <img src={acrylicPointerImg} alt="Acrylic and Pointer" className="software-screenshot screenshot-wide" />
                      </div>
                      <h4 className="text-error text-center" style={{ marginTop: '1.5rem' }}>
                        Red paint only on the pointer
                      </h4>
                    </div>

                    <div className="tool-block">
                      <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                        <div className="flex-1">
                          <p className="font-semibold mb-2">Materials with Color codes on the material list</p>
                          <p><strong>Examples:</strong></p>
                          <ul className="interaction-list--plain">
                            <li>MC Nylon - Blue (No.5)</li>
                            <li>Urethane - (No.18)</li>
                            <li>Rubber - Black (No.16)</li>
                            <li>New Light - White (No.1)</li>
                          </ul>
                        </div>
                        <div className="flex-1">
                          <div className="image-wrapper-flush">
                            <img src={propertiesMaterialImg} alt="Properties Material" className="software-screenshot screenshot-large" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tool-block">
                      <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                        <div className="flex-1">
                          <ul className="interaction-list--plain">
                            <li>Fabricated parts/Machined parts with <strong className="text-error">Heat Treatment</strong></li>
                            <li>Preheat/ heated surface coating part - white (No.1)</li>
                            <li>Isonite, Ionite, Parsonite - Gray (No. 8)</li>
                            <li>Parkerizing, Manganese Phosphate - Black (No. 16)</li>
                          </ul>
                        </div>
                        <div className="flex-1">
                          <div className="image-wrapper-flush">
                            <img src={isoniteManganeseImg} alt="Heat Treatment Parts" className="software-screenshot screenshot-large" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tool-block">
                      <h4 className="section-title">Layer 3</h4>
                      <ul className="interaction-list--plain">
                        <li>Purchase Parts (Include stud bolt)</li>
                        <li>Purchase Parts with Additional Process</li>
                        <li>Use manufacturer standard color</li>
                      </ul>
                      <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                        <img src={layer3Img} alt="Layer 3 Purchase Parts" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="fade-in">
                <h3 className="section-title">INFORMATION</h3>

                <div className="tool-block" style={{ padding: '0', background: 'transparent' }}>
                  <div className="flex-row-wrap" style={{ gap: '2rem' }}>

                  <div className="flex-column" style={{ gap: '1.5rem' }}>

                    {/* Item 1 */}
                    <div className={getStepClass('info-1')} onClick={() => toggleStep('info-1')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('info-1') ? 'completed' : ''}`}>
                          {completedSteps.has('info-1') ? <CheckCircle2 size={16} /> : '1'}
                        </span>
                        <div className="flex-row-center" style={{ gap: '0.8rem' }}>
                          <img src={information1} alt="Coordinates" style={{ width: '24px', height: '24px' }} />
                          <span className="step-label">Pick a point to display coordinates from the origin.</span>
                        </div>
                      </div>
                      <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                        <p className="p-flush">Displays coordinates of a point from the origin</p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.75rem' }}>
                          <img src={infoPointImg} alt="Information Point Coordinates" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className={getStepClass('info-2')} onClick={() => toggleStep('info-2')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('info-2') ? 'completed' : ''}`}>
                          {completedSteps.has('info-2') ? <CheckCircle2 size={16} /> : '2'}
                        </span>
                        <div className="flex-row-center" style={{ gap: '0.8rem' }}>
                          <img src={information2} alt="Length" style={{ width: '24px', height: '24px' }} />
                          <span className="step-label">Pick an edge &gt; <strong className="text-highlight">GO</strong> to measure length.</span>
                        </div>
                      </div>
                      <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                        <p className="p-flush">Measures the length of an edge</p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.75rem' }}>
                          <img src={infoEdgeImg} alt="Information Edge Length" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className={getStepClass('info-3')} onClick={() => toggleStep('info-3')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('info-3') ? 'completed' : ''}`}>
                          {completedSteps.has('info-3') ? <CheckCircle2 size={16} /> : '3'}
                        </span>
                        <div className="flex-row-center" style={{ gap: '0.8rem' }}>
                          <img src={information3} alt="Distance" style={{ width: '24px', height: '24px' }} />
                          <span className="step-label">Pick first point/edge &gt; Pick second point/edge to measure distance.</span>
                        </div>
                      </div>
                      <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                        <p className="p-flush">Measures the distance between two points or edges</p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.75rem' }}>
                          <img src={infoPointEdgeImg} alt="Information Distance" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className={getStepClass('info-4')} onClick={() => toggleStep('info-4')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('info-4') ? 'completed' : ''}`}>
                          {completedSteps.has('info-4') ? <CheckCircle2 size={16} /> : '4'}
                        </span>
                        <div className="flex-row-center" style={{ gap: '0.8rem' }}>
                          <img src={information4} alt="Angle" style={{ width: '24px', height: '24px' }} />
                          <span className="step-label">Pick 2 edges OR 3 points to measure angle.</span>
                        </div>
                      </div>
                      <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                        <p className="p-flush">Measures the angle between two edges or three points</p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.75rem' }}>
                          <img src={infoAngleImg} alt="Information Angle" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                    </div>

                    {/* Item 5 */}
                    <div className={getStepClass('info-5')} onClick={() => toggleStep('info-5')}>
                      <div className="step-header">
                        <span className={`step-number ${completedSteps.has('info-5') ? 'completed' : ''}`}>
                          {completedSteps.has('info-5') ? <CheckCircle2 size={16} /> : '5'}
                        </span>
                        <div className="flex-row-center" style={{ gap: '0.8rem' }}>
                          <img src={information5} alt="Entity Info" style={{ width: '24px', height: '24px' }} />
                          <span className="step-label">Pick the solid entity &gt; <strong className="text-highlight">GO</strong> to display information.</span>
                        </div>
                      </div>
                      <div className="step-description" style={{ paddingLeft: '2.5rem' }}>
                        <p className="p-flush">Displays the informations about the selected entity</p>
                        <div className="image-wrapper-flush" style={{ marginTop: '0.75rem' }}>
                          <img src={infoEntityImg} alt="Information Entity" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
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
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>
              {isProperties1 && activeTab === 'color' ? 'Next' : 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesLesson;
