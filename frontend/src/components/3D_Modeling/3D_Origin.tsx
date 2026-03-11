/**
 * 3D_Origin.tsx  —  Origin lesson
 */
import React, { useState } from 'react';
import { MousePointer2, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_Origin.css';

// Asset Imports
import originOverview from '../../assets/3D_Image_File/origin.jpg';
import toolSelection from '../../assets/3D_Image_File/origin_change_3d_part_layout.jpg';
import interactionSteps from '../../assets/3D_Image_File/origin_change_3d_part_layout_2345.jpg';

const OriginLesson: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projections' | 'layout'>('projections');
  const tabs = [
    { id: 'projections', label: 'Standard Projections' },
    { id: 'layout', label: 'Change 3D Part Layout' }
  ];
  const handleNext = () => { if (activeTab === 'projections') setActiveTab('layout'); };
  const handlePrev = () => { if (activeTab === 'layout') setActiveTab('projections'); };

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><MousePointer2 size={28} className="lesson-intro-icon" /> ORIGIN</h3>
        <p>A point where the coordinates of the X, Y and Z-axis are (0,0,0). It also sets the layout/orientation of views of an object/entity. Origin location is on a case-by-case basis. It depends on the shape/structure of the part.</p>
        <div className="alert-box warning">
          <p>※ The origin must be in the same position in 3D and 2D.</p>
        </div>
      </section>

      <div className="lesson-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id as any)}>{tab.label}</button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        {activeTab === 'projections' && (
          <div className="lesson-card tab-content">
            <div className="card-header">
              <h4>STANDARD PROJECTIONS</h4>
            </div>
            <div className="image-wrapper flex-row-center image-wrapper--centered">
              <img src={originOverview} alt="Origin Overview and Views" className="software-screenshot screenshot-large" />
            </div>
            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
        {
          activeTab === 'layout' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <div className="flex-col-center--tight">
                  <h4>CHANGE 3D PART LAYOUT</h4>
                  <p className="icon-description">Use this tool to set the location of origin.</p>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-header"><span className="step-number">1</span><span className="step-label">Select Tool</span></div>
                <p>Select the Change 3D Part Layout from the icon menu.</p>
                <img src={toolSelection} alt="Tool Selection" className="software-screenshot screenshot-icon" />
              </div>
              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number step-number--pill">2-5</span>
                  <span className="step-label">Relocate Origin</span>
                </div>
                <p>Follow the interaction sequence to relocate the origin:</p>
                <ul className="interaction-list">
                  <li><strong>2.)</strong> Right-click to show the current location of the origin.</li>
                  <li><strong>3.)</strong> Left-click on the point of the desired new location of origin.</li>
                  <li><strong>4.)</strong> Left-click on a 2nd point to set the X-axis.</li>
                  <li><strong>5.)</strong> Left-click on a 3rd point to set the Y-axis.</li>
                </ul>
                <div className="alert-box alert-box--compact">
                  <p className="alert-text--sm"><Info size={16} className="icon-inline icon-mr-sm" />The XY-plane will be the front view.</p>
                </div>
                <div className="image-wrapper"><img src={interactionSteps} alt="Interaction Steps" className="software-screenshot" /></div>
              </div>
              <div className="lesson-navigation">
                <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" disabled>Finish <ChevronRight size={18} /></button>
              </div>
            </div>
          )
        }
      </div >
    </div >
  );
};

export default OriginLesson;
