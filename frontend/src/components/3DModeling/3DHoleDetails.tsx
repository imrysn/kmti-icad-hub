/**
 * 3DHoleDetails.tsx  —  "Creating Hole Details on Parts" Lesson
 */
import React, { useState } from 'react';
import { MousePointer2, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import '../../styles/3DModeling/CourseLesson.css';
import '../../styles/3DModeling/3DHoleDetails.css';

// Asset Imports
import arrangeMachinePart from '../../assets/3D_Image_File/hole_details_arrange_machine_part.jpg';
import partsPlacement from '../../assets/3D_Image_File/hole_details_parts_placement.jpg';
import listTools from '../../assets/3D_Image_File/hole_details_list_tools.jpg';
import holeResult from '../../assets/3D_Image_File/hole_details_hole.jpg';
import tappedHoles from '../../assets/3D_Image_File/hole_details_tapped_holes.jpg';

interface HoleDetailsLessonProps {
  onNextLesson?: () => void;
}

const HoleDetailsLesson: React.FC<HoleDetailsLessonProps> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'holeDetails'>('holeDetails');

  const tabs = [
    { id: 'holeDetails', label: 'Hole Details' }
  ];

  return (
    <div className="lesson-container">
      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-content-scrollable">
        {activeTab === 'holeDetails' && (
          <div className="tab-content-area fade-in">
            <div className="instruction-header">
              <h3 className="section-title">CREATING HOLE DETAILS ON PARTS</h3>
              <p className="section-description">
                We have standard tools for creating holes such as drill holes, tapping holes and counterbores on solids.
              </p>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">Select <strong>Arrange Machine Part</strong> from the icon menu.</span>
              </div>
              <div className="step-content">
                <div className="image-wrapper-row" style={{ gap: '2rem' }}>
                  <div className="image-container-with-label">
                    <img src={arrangeMachinePart} alt="Arrange Machine Part" className="software-screenshot screenshot-small" />
                    <span className="image-sub-label">Icon Menu</span>
                  </div>
                  <div className="image-container-with-label">
                    <img src={partsPlacement} alt="Part Placement" className="software-screenshot screenshot-medium-small" />
                    <span className="image-sub-label">Application Tab</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-number">2</span>
                <span className="step-label">A window will appear showing the list of tools available.</span>
              </div>
              <div className="step-content">
                <div className="centered-image-wrapper">
                  <img src={listTools} alt="List of available tools" className="software-screenshot" style={{ maxWidth: '100%' }} />
                </div>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">After setting the specifications, click <strong>OK</strong>.</span>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-header">
                <span className="step-number">4</span>
                <span className="step-label">
                  Click the location of the hole on the solid entity <MousePointer2 size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> to create the cut.
                </span>
              </div>
              <div className="step-content">
                <div className="centered-image-wrapper">
                  <img src={holeResult} alt="Hole Creation Result" className="software-screenshot screenshot-large" />
                </div>

                <div className="info-box-premium" style={{ marginTop: '2rem' }}>
                  <div className="info-box-header">
                    <div className="shortcut-badge">無変換 + Q</div>
                    <span>Shortcut Key</span>
                  </div>
                  <p className="info-box-text">Use to match the direction of entity and a specified plane.</p>
                </div>
              </div>
            </div>

            <div className="special-note-container" style={{ marginTop: '3rem' }}>
              <div className="note-banner">
                <Info size={20} />
                <span>IMPORTANT NOTE</span>
              </div>
              <div className="note-content">
                <p><strong>Tapped holes</strong> must be painted <strong>green</strong> to indicate that those are threaded and to distinguish it from drill holes.</p>
                <div className="centered-image-wrapper" style={{ marginTop: '1.5rem' }}>
                  <img src={tappedHoles} alt="Tapped Holes Examples" className="software-screenshot" style={{ maxWidth: '100%' }} />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={onNextLesson}>Finish <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoleDetailsLesson;
