/**
 * 3D_HoleDetails.tsx  —  "Creating Hole Details on Parts" Lesson
 */
import React, { useState } from 'react';
import { MousePointer2, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_HoleDetails.css';

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
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><MousePointer2 size={28} className="lesson-intro-icon" /> CREATING HOLE DETAILS ON PARTS</h3>
        <p>We have standard tools for creating holes such as drill holes, tapping holes and counterbores on the parts.</p>
        <div className="instruction-box">
          <div className="image-wrapper">
            <img src={partsPlacement} alt="Part Placement" className="software-screenshot screenshot-large" />
          </div>
        </div>
      </section>

      <div className="lesson-tabs">
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

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          {activeTab === 'holeDetails' && (
            <div className="tab-content-area fade-in">


              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <span className="step-label">Select Arrange Machine Part from the icon menu.</span>
                </div>
                <div className="image-wrapper-flush" style={{ marginBottom: '1.5rem' }}>
                  <div className="flex-row items-end gap-8">
                    <img src={arrangeMachinePart} alt="Arrange Machine Part" className="software-screenshot screenshot-small" />
                  </div>
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">2</span>
                  <span className="step-label">A window will appear showing the list of tools available.</span>
                </div>
                <div className="image-wrapper-flush" style={{ marginBottom: '1.5rem' }}>
                  <img src={listTools} alt="List of available tools" className="software-screenshot screenshot-wide" />
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">3</span>
                  <span className="step-label">After setting the specifications, click OK.</span>
                </div>
              </div>

              <div className="instruction-step">
                <div className="step-header">
                  <span className="step-number">4</span>
                  <span className="step-label">
                    Click the location of the hole on the solid entity to create the cut.
                  </span>
                </div>
                <div className="image-wrapper-flush" style={{ marginBottom: '1.5rem' }}>
                  <img src={holeResult} alt="Hole Creation Result" className="software-screenshot screenshot-wide" />
                </div>

              </div>

              <div className="warning-box">
                <div className="flex items-center gap-2 mb-2">
                </div>
                <p className="text-highlight"> Note: Tapped holes must be painted green to indicate that those are threaded and to distinguish it from drill holes.</p>
                <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                  <img src={tappedHoles} alt="Tapped Holes Examples" className="software-screenshot" />
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>Finish <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoleDetailsLesson;
