/**
 * 3D_Fairing.tsx  —  Fairing operations lessons (Chamfer, Fillet, Shell)
 */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Box as BoxIcon } from 'lucide-react';
import '../../styles/3D_Modeling/CourseLesson.css';
import '../../styles/3D_Modeling/3D_Fairing.css';

// Fairing Assets
import fairingMenu from '../../assets/3D_Image_File/basic_operation(1)_move_rotate_copy_mirror_delete.jpg'; // This is the general menu, I'll check if there's a specific one or use a general one.
import chamferIcon from '../../assets/3D_Image_File/fairing_chamfer.jpg';
import chamferEntry from '../../assets/3D_Image_File/fairing_chamfer_1.jpg';
import chamferResult from '../../assets/3D_Image_File/fairing_chamfer_2.jpg';
import filletIcon from '../../assets/3D_Image_File/fairing_fillet_1.jpg';
import filletEntry from '../../assets/3D_Image_File/fairing_fillet_2.jpg';
import filletResult from '../../assets/3D_Image_File/fairing_fillet_3.jpg';
import shellIcon from '../../assets/3D_Image_File/fairing_shell_1.jpg';
import shellFaces from '../../assets/3D_Image_File/fairing_shell_2.jpg';
import shellEntry from '../../assets/3D_Image_File/fairing_shell_3.jpg';
import shellResult from '../../assets/3D_Image_File/fairing_shell_3.1.jpg';
import leftClick from '../../assets/3D_Image_File/left_click.jpg';

interface FairingLessonProps {
  onNextLesson?: () => void;
}

const FairingLesson: React.FC<FairingLessonProps> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'chamfer' | 'fillet' | 'shell'>('chamfer');

  return (
    <div className="course-lesson-container">
      <section className="lesson-intro">
        <h3><BoxIcon size={28} className="lesson-intro-icon" /> FAIRING</h3>
        <p>Fairing tools are used to refine the edges and surfaces of 3D entities, such as creating chamfers, fillets, or hollowing out solids.</p>
        <div className="instruction-box">
          <div className="image-wrapper">
            <img src={fairingMenu} alt="Fairing Menu" className="software-screenshot screenshot-small" />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          <div className="lesson-tabs">
            <button
              className={`tab-button ${activeTab === 'chamfer' ? 'active' : ''}`}
              onClick={() => setActiveTab('chamfer')}
            >
              Chamfer
            </button>
            <button
              className={`tab-button ${activeTab === 'fillet' ? 'active' : ''}`}
              onClick={() => setActiveTab('fillet')}
            >
              Fillet
            </button>
            <button
              className={`tab-button ${activeTab === 'shell' ? 'active' : ''}`}
              onClick={() => setActiveTab('shell')}
            >
              Shell
            </button>
          </div>

          <div className="tab-content-area fade-in">
            {activeTab === 'chamfer' && (
              <div className="tab-pane fade-in">
                <h3 className="section-title">CHAMFER</h3>
                <p className="p-flush-bottom">Use for creating chamfer dimensions.</p>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select Chamfer edge from the icon menu.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={chamferIcon} alt="Chamfer Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Specify chamfer length on the item entry.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={chamferEntry} alt="Chamfer Item Entry" className="software-screenshot screenshot-large" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header" style={{ marginBottom: '1.5rem' }}>
                    <span className="step-number">3</span>
                    <span className="step-label">Select the edge of the entity to be chamfered &gt; </span>
                    <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                  </div>
                  <p className="note-text"><strong className="text-red-600">Note:</strong> Several edges can be chamfered all at once.</p>
                  <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                    <img src={chamferResult} alt="Chamfer Result" className="software-screenshot screenshot-large" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fillet' && (
              <div className="tab-pane fade-in">
                <h3 className="section-title">FILLET</h3>
                <p className="p-flush-bottom">Use for rounding specified corners.</p>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select Fillet edge from the icon menu.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={filletIcon} alt="Fillet Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <span className="step-label">Specify fillet radius on the item entry.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={filletEntry} alt="Fillet Item Entry" className="software-screenshot screenshot-large" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header" style={{ marginBottom: '1.5rem' }}>
                    <span className="step-number">3</span>
                    <span className="step-label">Select the edge of the entity to be chamfered &gt; </span>
                    <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                  </div>
                  <p className="note-text"><strong className="text-red-600">Note:</strong> Several edges can be fillet all at once.</p>
                  <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                    <img src={filletResult} alt="Fillet Result" className="software-screenshot screenshot-large" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shell' && (
              <div className="tab-pane fade-in">
                <h3 className="section-title">SHELL</h3>
                <p className="p-flush-bottom">Use for hollowing solid entities using the specified wall thickness.</p>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">1</span>
                    <span className="step-label">Select Shell from the icon menu.</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={shellIcon} alt="Shell Icon" className="software-screenshot screenshot-small" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header" style={{ marginBottom: '1.5rem' }}>
                    <span className="step-number">2</span>
                    <span className="step-label">Select the two endfaces of the solid entity &gt; </span>
                    <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={shellFaces} alt="Select Endfaces" className="software-screenshot screenshot-large" />
                  </div>
                </div>

                <div className="instruction-step">
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <span className="step-label">Specify the desired thickness of the solid entity after shell on the item entry &gt; </span>
                    <img src={leftClick} alt="Left click" className="software-screenshot screenshot-click" />
                    <span> double GO</span>
                  </div>
                  <div className="image-wrapper-flush" style={{ marginTop: '1.5rem' }}>
                    <div className="flex-row">
                      <div className="flex-1">
                        <img src={shellEntry} alt="Shell Thickness Entry" className="software-screenshot screenshot-large" />
                      </div>
                      <div className="flex-1">
                        <img src={shellResult} alt="Shell Result" className="software-screenshot screenshot-large" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>Finish <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairingLesson;
