/**
 * 3D_Properties.tsx — Properties lessons
 */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_Properties.css';

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
}

const PropertiesLesson: React.FC<PropertiesLessonProps> = ({ subLessonId = 'properties-1', onNextLesson }) => {
  const isProperties1 = subLessonId === 'properties-1';
  const [activeTab, setActiveTab] = useState<'color' | 'layer'>('color');

  const handleNext = () => {
    if (isProperties1) {
      if (activeTab === 'color') setActiveTab('layer');
      else if (onNextLesson) onNextLesson();
    } else {
      if (onNextLesson) onNextLesson();
    }
  };

  const handlePrev = () => {
    if (isProperties1 && activeTab === 'layer') {
      setActiveTab('color');
    }
  };

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><Sliders size={28} className="lesson-intro-icon" /> PROPERTIES</h3>
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

                    <div className="flex-row-wrap" style={{ alignItems: 'flex-start' }}>
                      <div className="flex-1">
                        <div className="instruction-step">
                          <div className="step-header">
                            <span className="step-number">1</span>
                            <span className="step-label">Select <strong className="text-highlight">Change Color</strong> from the icon menu.</span>
                          </div>
                          <div className="image-wrapper-flush">
                            <img src={changeColorIcon} alt="Change Color Icon" className="software-screenshot screenshot-small" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-col-center" style={{ marginLeft: '8rem', flex: '1.2' }}>
                        <div className="image-wrapper-flush" style={{ marginTop: '0' }}>
                          <img src={propertiesColorImg} alt="Change Color Properties Dialog" className="software-screenshot screenshot-small" />
                        </div>
                      </div>
                    </div>

                    <div className="instruction-step" style={{ marginTop: '1rem' }}>
                      <div className="step-header">
                        <span className="step-number">2</span>
                        <span className="step-label">Select either <strong className="text-highlight">Entity</strong> or <strong className="text-highlight">Face</strong></span>
                      </div>

                      <div style={{ marginTop: '1.5rem', marginLeft: '2.5rem' }}>
                        <div className="flex-row-wrap" style={{ alignItems: 'flex-start' }}>
                          <div className="flex-1">
                            <p className="font-bold text-lg mb-0" style={{ marginLeft: '-2rem' }}>&gt; Entity</p>
                            <p className="step-description mt-1 mb-0" style={{ paddingLeft: '0' }}>
                              The entire solid entity will change its color.
                              <br />Pick a color &gt; Select the solid entity
                            </p>
                          </div>
                          <div className="flex-col-center" style={{ marginLeft: '1rem', flex: '1' }}>
                            <div className="image-wrapper-flush" style={{ marginBottom: '-3rem' }}>
                              <img src={changeColorEntity} alt="Change Color Entity" className="software-screenshot screenshot-medium" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-row-wrap mt-0" style={{ alignItems: 'flex-start', marginTop: '0rem' }}>
                          <div className="flex-1" style={{ marginTop: '5.5rem' }}>
                            <p className="font-bold text-lg mb-0" style={{ marginLeft: '-2rem' }}>&gt; Face</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="step-description mb-0" style={{ paddingLeft: '0' }}>
                                Only selected faces/surfaces will change its color.
                                <br />Pick a color &gt; Select surface to be changed &gt; GO
                              </p>
                            </div>
                          </div>
                          <div className="flex-col-center" style={{ marginLeft: '1rem', flex: '1' }}>
                            <div className="image-wrapper-flush" style={{ marginTop: '5rem' }}>
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

                    <div className="instruction-step">
                      <div className="step-header">
                        <span className="step-number">1</span>
                        <span className="step-label">Select <strong className="text-highlight">Change Layer</strong> from the icon menu.</span>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={changeLayerIcon} alt="Change Layer Icon" className="software-screenshot screenshot-small" />
                      </div>
                    </div>

                    <div className="instruction-step" style={{ marginTop: '1rem' }}>
                      <div className="step-header">
                        <span className="step-number">2</span>
                        <span className="step-label">Specify the layer on the item entry.</span>
                      </div>
                      <div className="image-wrapper-flush">
                        <img src={itemEntryChangeLayer} alt="Change Layer Item Entry" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>

                    <div className="instruction-step" style={{ marginTop: '1rem' }}>
                      <div className="step-header">
                        <span className="step-number">3</span>
                        <span className="step-label">Click on the solid entity.</span>
                      </div>
                    </div>

                    <div className="section-divider"></div>
                    <h3 className="section-title mt-6">LAYER DESIGNATION OF 3D PARTS</h3>

                    <div className="mt-6 mb-8">
                      <h4 className="font-bold text-lg mb-2">Layer 1</h4>
                      <ul className="interaction-list" style={{ paddingLeft: '1rem', marginTop: '0' }}>
                        <li>All common parts need to be fabricated or machined</li>
                        <li>Parts that undergo Annealing, Shot blasting, Annealing Shot blasting</li>
                        <li>Covers for purchase parts (No mechanism)</li>
                        <li>All parts must be color white</li>
                      </ul>
                      <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                        <img src={layer1Img} alt="Layer 1 White Parts" className="software-screenshot screenshot-wide" />
                      </div>
                    </div>

                    <div className="mt-8">
                      <h4 className="font-bold text-lg mb-2">Layer 2</h4>
                      <ul className="interaction-list" style={{ paddingLeft: '1rem', marginTop: '0' }}>
                        <li>Fabricated parts/Machined parts with color/paint</li>
                        <li>Safety Cover - Yellow (No. 4)</li>
                      </ul>
                      <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                        <img src={layer2Img} alt="Layer 2 Yellow Parts" className="software-screenshot screenshot-wide" />
                      </div>
                      <p className="note-text mt-4 text-center">
                        Safety color applies to covers for machine guarding such as chain, belt and gear drive power transmission system.
                      </p>

                      <div className="mt-8">
                        <ul className="interaction-list" style={{ paddingLeft: '1rem', marginTop: '0' }}>
                          <li>Parts that does not need to be painted</li>
                          <ul style={{ paddingLeft: '1.5rem', listStyleType: 'circle', marginTop: '0.25rem' }}>
                            <li>All Stainless Steel (SUS) - white (No.1)</li>
                            <li>Acrylic - white (No.1)</li>
                          </ul>
                        </ul>
                        <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
                          <img src={acrylicPointerImg} alt="Acrylic and Pointer" className="software-screenshot screenshot-wide" />
                        </div>
                      </div>

                      <div className="flex-row-wrap mt-8" style={{ alignItems: 'flex-start', marginTop: '1.8rem' }}>
                        <div className="flex-1">
                          <p className="font-semibold mb-2">Materials with Color codes on the material list</p>
                          <p className="mb-1">Examples:</p>
                          <ul style={{ paddingLeft: '1.5rem', listStyleType: 'circle', marginBottom: '1rem' }}>
                            <li>MC Nylon - Blue (No.5)</li>
                            <li>Urethane - (No.18)</li>
                            <li>Rubber - Black (No.16)</li>
                            <li>New Light - White (No.1)</li>
                          </ul>
                        </div>
                        <div className="flex-col-center" style={{ marginLeft: '1rem', flex: '1' }}>
                          <div className="image-wrapper-flush" style={{ marginTop: '0' }}>
                            <img src={propertiesMaterialImg} alt="Properties Material" className="software-screenshot screenshot-medium" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-row-wrap mt-8" style={{ alignItems: 'flex-start' }}>
                        <div className="flex-1">
                          <p className="font-semibold mb-2">
                            Fabricated parts/Machined parts with <strong style={{ color: 'red' }}>Heat Treatment</strong>
                          </p>
                          <ul style={{ paddingLeft: '1.5rem', listStyleType: 'circle', marginBottom: '1rem' }}>
                            <li>Preheat/ heated surface coating part - white (No.1)</li>
                            <li>Isonite, Ionite, Parsonite - Gray (No. 8)</li>
                            <li>Parkerizing, Manganese Phosphate - Black (No. 16)</li>
                          </ul>
                        </div>
                        <div className="flex-col-center" style={{ marginLeft: '1rem', flex: '1' }}>
                          <div className="image-wrapper-flush">
                            <img src={isoniteManganeseImg} alt="Heat Treatment Parts" className="software-screenshot screenshot-medium" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                      <h4 className="font-bold text-lg mb-2">Layer 3</h4>
                      <ul className="interaction-list" style={{ paddingLeft: '1rem', marginTop: '0' }}>
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
                <h3 className="section-title" style={{ borderBottom: '2px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem' }}>INFORMATION</h3>
                <p className="mb-6">
                  Displays the information about the clicked entities (coordinates, length, distance, angle, and entity information)
                </p>

                <div className="flex-row-wrap" style={{ alignItems: 'flex-start', gap: '2rem' }}>
                  {/* Left Column */}
                  <div className="flex-1" style={{ minWidth: '300px' }}>

                    {/* Item 1 */}
                    <div className="flex-row-wrap mb-6" style={{ alignItems: 'flex-start', gap: '1rem' }}>
                      <img src={information1} alt="Coordinates" className="software-screenshot" style={{ width: '40px', padding: '0.2rem' }} />
                      <div className="flex-1">
                        <p className="mb-0">Displays coordinates of a point from the origin</p>
                        <p className="step-description mt-1 mb-0" style={{ paddingLeft: '0' }}>&gt; Pick a point</p>
                        <img src={infoPointImg} alt="Information Point Coordinates" className="software-screenshot screenshot-wide mt-2" />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex-row-wrap mb-6" style={{ alignItems: 'flex-start', gap: '1rem' }}>
                      <img src={information2} alt="Length" className="software-screenshot" style={{ width: '40px', padding: '0.2rem' }} />
                      <div className="flex-1">
                        <p className="mb-0">Measures the length of an edge</p>
                        <p className="step-description mt-1 mb-0 flex items-center gap-2" style={{ paddingLeft: '0' }}>
                          &gt; Pick an edge &gt; GO
                          <img src={leftClick} alt="Left Click" style={{ height: '24px' }} />
                        </p>
                        <img src={infoEdgeImg} alt="Information Edge Length" className="software-screenshot screenshot-wide mt-2" />
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex-row-wrap mb-6" style={{ alignItems: 'flex-start', gap: '1rem' }}>
                      <img src={information3} alt="Distance" className="software-screenshot" style={{ width: '40px', padding: '0.2rem' }} />
                      <div className="flex-1">
                        <p className="mb-0">Measures the distance between two points or edges</p>
                        <p className="step-description mt-1 mb-0" style={{ paddingLeft: '0' }}>&gt; Pick first point/edge &gt; Pick second point/edge</p>
                        <img src={infoPointEdgeImg} alt="Information Distance" className="software-screenshot screenshot-wide mt-2" />
                      </div>
                    </div>

                  </div>

                  {/* Right Column */}
                  <div className="flex-1" style={{ minWidth: '300px' }}>

                    {/* Item 4 */}
                    <div className="flex-row-wrap mb-6" style={{ alignItems: 'flex-start', gap: '1rem' }}>
                      <img src={information4} alt="Angle" className="software-screenshot" style={{ width: '40px', padding: '0.2rem' }} />
                      <div className="flex-1">
                        <p className="mb-0">Measures the angle between two edges or three points</p>
                        <div className="step-description mt-1 mb-0" style={{ paddingLeft: '0' }}>
                          <p className="mb-0">&gt; Pick 2 edges</p>
                          <p className="mb-0">&gt; Pick 3 points</p>
                        </div>
                        <img src={infoAngleImg} alt="Information Angle" className="software-screenshot screenshot-wide mt-2" />
                      </div>
                    </div>

                    {/* Item 5 */}
                    <div className="flex-row-wrap mb-6" style={{ alignItems: 'flex-start', gap: '1rem' }}>
                      <img src={information5} alt="Entity Info" className="software-screenshot" style={{ width: '40px', padding: '0.2rem' }} />
                      <div className="flex-1">
                        <p className="mb-0">Displays the informations about the selected entity</p>
                        <p className="step-description mt-1 mb-0 flex items-center gap-2" style={{ paddingLeft: '0' }}>
                          &gt; Pick the solid entity &gt; GO
                          <img src={leftClick} alt="Left Click" style={{ height: '24px' }} />
                        </p>
                        <img src={infoEntityImg} alt="Information Entity" className="software-screenshot screenshot-wide mt-2" />
                      </div>
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
              disabled={isProperties1 && activeTab === 'color'}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {isProperties1 && activeTab === 'color' ? 'Change Layer' : (isProperties1 ? 'Next Lesson' : 'Finish')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesLesson;
