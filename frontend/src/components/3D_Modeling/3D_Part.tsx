import React from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { useLessonCore } from "../../hooks/useLessonCore";
import '../../styles/3D_Modeling/CourseLesson.css';

// --- Assets ---
import partMenu1 from '../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import createPartIcon from '../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import modalInfo1 from '../../assets/3D_Image_File/3d_part1_creating_3d_part_3.png';
import treeViewInfo1 from '../../assets/3D_Image_File/3d_part1_creating_3d_part_4.png';
import materialDescriptionImg from '../../assets/3D_Image_File/3d_part1_material_description.png';
import partMenu2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name.png';
import changePartIcon from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_1.png';
import modalInfo2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_3.png';
import treeViewInfo2 from '../../assets/3D_Image_File/3d_part2_change_3d_part_name_4.png';
import leftClick from '../../assets/3D_Image_File/left_click.png';

interface PartLessonProps {
  nextLabel?: string; subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void;
}

/**
 * PartLesson component for 3D Part management.
 * Refactored to use useLessonCore hook and data-driven mapping.
 */
const PartLesson: React.FC<PartLessonProps> = ({
  subLessonId = '3d-part-1',
  onNextLesson,
  onPrevLesson
  , nextLabel }) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(subLessonId);

  // --- Content Mapping ---
  const LESSON_DATA: Record<string, { title: string; steps: string[]; description: string }> = {
    '3d-part-1': {
      title: 'Creating 3d part',
      description: 'Tool use to name 3D parts and provide information. 3D part name must always be set since it is a vital part for the 2D Detailing.',
      steps: [
        "Step 1: Select Create 3D Part from the icon menu.",
        "Step 2: Select a single entity and click GO.",
        "Step 3: A window will appear. Fill up the required part information.",
        "Step 4: Once created, the 3D Part will appear in the tree view.",
        "Step 5: Refer to the material description for notation and plate thickness standards."
      ]
    },
    '3d-part-2': {
      title: 'Change 3d part name',
      description: 'Allows editing 3D names, drawing names (for external parts), and comments.',
      steps: [
        "Step 1: Select Change 3D Part Name from the icon menu.",
        "Step 2: Select an entity or right-click on the 3D space.",
        "Step 3: Edit the information in the window that appears.",
        "Step 4: When asked to change the 2D Part Name together with the 3D name, select Yes."
      ]
    }
  };

  const currentLesson = LESSON_DATA[subLessonId] || { title: '3D PART', steps: [], description: '' };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className="section-title">
          {currentLesson.title}
          <ReadAloudButton
            isSpeaking={isSpeaking}
            onStart={() => speak(currentLesson.steps)}
            onStop={stop}
          />
        </h3>
        <p className="p-flush">{currentLesson.description}</p>
        <div className="instruction-box">
          <div className="screenshot-wrapper mt-4">
            <img src={subLessonId === '3d-part-1' ? partMenu1 : partMenu2} alt="3D Part Menu" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
          </div>
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content">
          {subLessonId === '3d-part-1' ? (
            <div className="fade-in">
              <div className="card-header">
                <h4>STEP-BY-STEP PROCEDURE</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="text-highlight">Create 3D Part</strong> from the icon menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={createPartIcon} alt="Create 3D Part Icon" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">
                    Select a single entity &gt; <strong className="text-highlight">GO</strong>
                    <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 4px' }} />
                  </span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">Fill up the required information in the window.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={modalInfo1} alt="Create 3D Part Window" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">The created 3D Part will appear in the tree view.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={treeViewInfo1} alt="Tree View Status" className="software-screenshot screenshot-large" style={{ height: '300px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number"><Info size={16} /> </span>
                  <span className="step-label">MATERIAL DESCRIPTION REFERENCE</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={materialDescriptionImg} alt="Material Description" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <div className="card-header">
                <h4>STEP-BY-STEP PROCEDURE</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(currentLesson.steps)} onStop={stop} />
              </div>

              <div className={`instruction-step ${currentIndex === 0 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Select <strong className="text-highlight">Change 3D Part Name</strong> from the menu.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={changePartIcon} alt="Change 3D Part Name Icon" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 1 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Select an entity or <strong className="text-highlight">Right-click</strong> on the 3D space.</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 2 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">Edit the information in the dialog box.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={modalInfo2} alt="Change Name Window" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`instruction-step ${currentIndex === 3 ? 'reading-active' : ''}`}>
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">Update both 3D and 2D names by selecting <strong className="text-highlight">Yes</strong>.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={treeViewInfo2} alt="Dialog and Tree View Update" className="software-screenshot screenshot-wide" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={onNextLesson}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartLesson;
