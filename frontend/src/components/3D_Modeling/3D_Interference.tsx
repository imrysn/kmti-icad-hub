/**
 * 3D_Interference.tsx
 * Interference Check lesson
 */
import React from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';

// Assets
import leftClick from '../../assets/3D_Image_File/left_click.jpg';
import interfCheckIcon from '../../assets/3D_Image_File/interf_check.jpg';
import interfCommandMenu from '../../assets/3D_Image_File/interf_command_menu.jpg';
import interferenceResult from '../../assets/3D_Image_File/interference.jpg';
import listInterfIcon from '../../assets/3D_Image_File/list_all_detected_interf.jpg';
import listDisplayWindow from '../../assets/3D_Image_File/list_display_window.jpg';
import interferenceCheckImg from '../../assets/3D_Image_File/interference_check.jpg';

interface InterferenceLessonProps {
  onNextLesson?: () => void;
}

const InterferenceLesson: React.FC<InterferenceLessonProps> = ({ onNextLesson }) => {
  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><AlertCircle size={28} className="lesson-intro-icon" /> INTERFERENCE CHECK</h3>
        <p>Interferences are overlapping areas of 3D entities. These are problems that must be fixed on the 3D Modeling. These following tools are used to detect interferences on the 3D Modeling.</p>
        <div className="instruction-box">
          <div className="image-wrapper">
            <img src={interferenceResult} alt="Interference Results" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select <strong className="text-highlight">Interference Check</strong> from the icon menu.</span>
            </div>
            <div className="flex-1">
              <img src={interfCommandMenu} alt="Interference Command Menu" className="software-screenshot screenshot-medium" />
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">On the command menu, unselect <strong>High-speed detection</strong>.</span>
            </div>
            <div className="flex-row" style={{ marginTop: '0.5rem' }}>
              <div className="image-wrapper-flush">
                <img src={interfCheckIcon} alt="Interference Check Icon" className="software-screenshot screenshot-large" />
              </div>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-label">Select specific entities to check if there are interferences &gt; GO </span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>
            <p className="p-flush" style={{ fontSize: '0.9rem', color: '#64748b' }}>A dialog box will appear showing the number of detected interferences.</p>
            <div className="image-wrapper-flush" style={{ marginTop: '1rem' }}>
              <img src={interferenceCheckImg} alt="Interference Check Dialog" className="software-screenshot screenshot-wide" />
            </div>
            <p className="p-flush" style={{ marginTop: '1rem', fontStyle: 'italic', fontWeight: 600 }}>OR Right-click on the 3D Space to check the entire drawing for interferences.</p>
          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">4</span>
              <span className="step-label">Analyze possible countermeasures to remove the interference on the parts.</span>
            </div>
            <p className="p-flush">To remove the red CGS solid, use <strong>Undo</strong> or <strong>Ctrl+Z</strong>.</p>
            <p className="p-flush">Tool use to display the list of all detected interferences.</p>
            <div className="image-wrapper-flush">
              <img src={listInterfIcon} alt="Display List Tool Icon" className="software-screenshot screenshot-small" />
            </div>
          </div>

          <div className="section-divider"></div>
          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-label">Select the tool on the icon menu &gt; GO </span>
              <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
            </div>

          </div>

          <div className="instruction-step">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">The List Display window will appear showing all the 3D part names that interfere with each other.</span>
            </div>
            <div className="flex-row" style={{ marginTop: '0.5rem' }}>
              <div className="flex-1">
                <img src={listDisplayWindow} alt="List Display Window" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              Finish <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterferenceLesson;
