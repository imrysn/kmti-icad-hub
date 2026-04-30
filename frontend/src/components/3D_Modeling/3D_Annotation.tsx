import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Assets */
import linearIcon from "../../assets/3D_Image_File/annotation1_linear.png";
import linearImage from "../../assets/3D_Image_File/annotation1_linear1.png";
import diameterIcon from "../../assets/3D_Image_File/annotation1_circular.png";
import diameterImage from "../../assets/3D_Image_File/dimaeter_dimension.jpg";
import angularIcon from "../../assets/3D_Image_File/annotation1_angular.png";
import angularImage from "../../assets/3D_Image_File/annotation1_angular1.png";
import noteIcon from "../../assets/3D_Image_File/annotation1_note_string_entry.png";
import noteWindow from "../../assets/3D_Image_File/note_string_entry_window.png";
import noteResult from "../../assets/3D_Image_File/annotation1_place_note1.png";
import textIcon from "../../assets/3D_Image_File/annotation1_text_entry.png";
import textWindow from "../../assets/3D_Image_File/text_entry_window.png";
import textResult from "../../assets/3D_Image_File/annotation1_text_entry1.png";
import editsIcon from "../../assets/3D_Image_File/annotation2_edits_drafting.png";
import editsWindow from "../../assets/3D_Image_File/edit_dimension_characters_window.png";
import attrIcon from "../../assets/3D_Image_File/annotation2_drafting_entities.png";
import attrWindow from "../../assets/3D_Image_File/change_properties_window.png";
import positionIcon from "../../assets/3D_Image_File/changes_position_drafting_entities.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";
import annotationTop from "../../assets/3D_Image_File/annotation1_top.png";

type AnnotationTab = "linear" | "diameter" | "angular" | "notes" | "character" | "edits" | "attributes" | "position";

interface AnnotationLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const AnnotationLesson: React.FC<AnnotationLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<AnnotationTab>(() => {
    return (localStorage.getItem('annotationActiveTab') as AnnotationTab) || "linear";
  });

  useEffect(() => {
    localStorage.setItem('annotationActiveTab', activeTab);
  }, [activeTab]);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`annotation-${activeTab}`);

  const linearSteps = [
    "Step 1: Select edges to be measured.",
    "Step 2: Left-click on the 3D Space to position the linear dimension."
  ];

  const diameterSteps = [
    "Step 1: Select the edge of the circle to be measured.",
    "Step 2: Left-click on the 3D Space to position the circular dimension."
  ];

  const angularSteps = [
    "Step 1: Select edges to be measured.",
    "Step 2: Left-click on the 3D Space to position the angular dimension."
  ];

  const notesSteps = [
    "Step 1: Pick any edge of the entity, then left-click.",
    "Step 2: Left-click to show the Note String Entry window.",
    "Step 3: Enter the note, then press OK.",
    "Step 4: Left-click on the 3D Space to place the note."
  ];

  const characterSteps = [
    "Step 1: Left-click on the 3D Space to show the Text Entry window.",
    "Step 2: Enter the note, then press OK.",
    "Step 3: Left-click on the 3D Space to place the note."
  ];

  const editsSteps = [
    "Step 1: Select drafting entity, then click GO.",
    "Step 2: Edit Dimension Characters window will appear.",
    "Step 3: After editing the dimension characters, Press OK."
  ];

  const attributesSteps = [
    "Step 1: Select drafting entity, then click GO.",
    "Step 2: Change Properties window will appear.",
    "Step 3: After changing the properties, Press OK."
  ];

  const positionSteps = [
    "Changes the positions of drafting entities."
  ];

  const handleTabChange = (tab: AnnotationTab) => {
    setActiveTab(tab);
  };

  const handleNext = () => {
    const tabs: AnnotationTab[] = ["linear", "diameter", "angular", "notes", "character", "edits", "attributes", "position"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      handleTabChange(tabs[currentIndex + 1]);
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onNextLesson) onNextLesson();
    }
  };

  const handlePrev = () => {
    const tabs: AnnotationTab[] = ["linear", "diameter", "angular", "notes", "character", "edits", "attributes", "position"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      handleTabChange(tabs[currentIndex - 1]);
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onPrevLesson) onPrevLesson();
    }
  };

  return (
    <div className={`course-lesson-container ${isSpeaking ? 'is-reading' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className={`lesson-intro ${isSpeaking && currentIndex === -1 ? 'reading-active' : ''}`}>
        <h3 className="section-title">
          ANNOTATION
        </h3>
        <p className="p-flush">
          Tools use to create drafting entities such as dimension text and notes.
        </p>
        <div className="screenshot-wrapper mt-4">
          <img src={annotationTop} alt="Annotation Top" className="software-screenshot" style={{ height: 'auto', width: '200px' }} />
        </div>
      </section>

      <div className="lesson-tabs mt-8">
        <button className={`tab-button ${activeTab === 'linear' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('linear')}>linear</button>
        <button className={`tab-button ${activeTab === 'diameter' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('diameter')}>Diameter</button>
        <button className={`tab-button ${activeTab === 'angular' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('angular')}>Angular</button>
        <button className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('notes')}>Notes</button>
        <button className={`tab-button ${activeTab === 'character' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('character')}>Character</button>
        <button className={`tab-button ${activeTab === 'edits' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('edits')}>Edits</button>
        <button className={`tab-button ${activeTab === 'attributes' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('attributes')}>Attributes</button>
        <button className={`tab-button ${activeTab === 'position' ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => handleTabChange('position')}>Position</button>
      </div>

      <div className="lesson-grid single-card">
        <div className={`lesson-card tab-content fade-in ${isSpeaking ? 'reading-active' : ''}`}>

          {activeTab === 'linear' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4>CREATE LINEAR DIMENSION</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(linearSteps)} onStop={stop} />
              </div>
              <div className="instruction-step">
                <div className="step-description">

                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={linearIcon} alt="Linear Dimension Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "2rem" }} />
                  </div>
                  <div className="flex-row-wrap">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <span className="step-label">Select edges to be measured.</span>
                      </div>
                      <div className="step-header"style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <span className="step-label">Left-click on the 3D Space to position the linear dimension.</span>
                      </div>
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={linearImage} alt="Linear Dimension Result" className="software-screenshot" style={{ height: '300px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diameter' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4>CREATES DIAMETER DIMENSION</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(diameterSteps)} onStop={stop} />
              </div>
              <div className="instruction-step">
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={diameterIcon} alt="Diameter Dimension Tool" className="software-screenshot"  style={{ height: '100px', marginBottom: "2rem" }} />
                  </div>
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <span className="step-label">Select the edge of the circle to be measured.</span>
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <span className="step-label">Left-click on the 3D Space to position the circular dimension.</span>
                      </div>
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={diameterImage} alt="Diameter Dimension Result" className="software-screenshot" style={{ height: '300px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'angular' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4>CREATES ANGULAR DIMENSION</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(angularSteps)} onStop={stop} />
              </div>
              <div className="instruction-step">
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={angularIcon} alt="Angular Dimension Tool" className="software-screenshot"  style={{ height: '100px', marginBottom: "2rem" }} />
                  </div>
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <span className="step-label">Select edges to be measured.</span>
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <span className="step-label">Left-click on the 3D Space to position the angular dimension.</span>
                      </div>
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={angularImage} alt="Angular Dimension Result" className="software-screenshot" style={{ height: '200px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4>CREATES NOTES WITH LEADER LINES</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(notesSteps)} onStop={stop} />
              </div>
              <div className="instruction-step">
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={noteIcon} alt="Notes Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "2rem" }} />
                  </div>
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <span className="step-label">Pick any edge of the entity &gt; GO </span>
                         <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px'}} />
                      </div>
                      <div className="step-header">
                        <span className="step-number">2 </span>
                        <span className="step-label">Left-click to show the <strong className="red-text">Note String Entry window</strong></span>
                      </div>
                      <div className="screenshot-wrapper mt-2 mb-2" style={{ marginLeft: "3rem" }}>
                        <img src={noteWindow} alt="Note String Entry Window" className="software-screenshot" style={{ width: '400px', marginBottom: "2rem"}} />
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">3 </span>
                        <span className="step-label">Enter the note &gt; Press OK</span>
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">4 </span>
                        <span className="step-label">Left-click on the 3D Space to place the note.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'character' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4>CREATES CHARACTER STRINGS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(characterSteps)} onStop={stop} />
              </div>
              <div className="instruction-step">
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={textIcon} alt="Character Strings Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "2rem" }}  />
                  </div>
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="step-header">
                        <span className="step-number">1 </span>
                        <span className="step-label">Left-click on the 3D Space show the <strong className="red-text">Text Entry window</strong>.</span>
                      </div>
                      <div className="screenshot-wrapper mt-2 mb-2" style={{ marginLeft: "3rem" }}>
                        <img src={textWindow} alt="Text Entry Window" className="software-screenshot" style={{ width: '500px', marginBottom: "2rem"}} />
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <span className="step-label">Enter the note &gt; Press OK</span>
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">3 </span>
                        <span className="step-label">Left-click on the 3D Space to place the note.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edits' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4>EDITS DRAFTING ENTITY CHARACTERS</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(editsSteps)} onStop={stop} />
              </div>
              <div className="instruction-step">
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={editsIcon} alt="Edits Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "2rem" }} />
                  </div>
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <span className="step-label">Select drafting entity &gt; GO </span>
                       <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px'}} />
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <span className="step-label">Edit Dimension Characters window will appear.</span>
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">3 </span>
                        <span className="step-label">After editing the dimension characters, Press OK</span>
                      </div>
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={editsWindow} alt="Edits Window" className="software-screenshot" style={{ width: '900px'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attributes' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4>CHANGES THE ATTRIBUTES OF A DRAFTING ENTITY</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(attributesSteps)} onStop={stop} />
              </div>
              <div className="instruction-step">
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={attrIcon} alt="Attributes Tool" className="software-screenshot" style={{ height: '100px', marginBottom: "2rem" }} />
                  </div>
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <span className="step-label">Select drafting entity &gt; GO </span>
                        <img src={leftClick} alt="Left Click" style={{ height: '30px', marginLeft: '0.5rem' }} />
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <span className="step-label">Change Properties window will appear.</span>
                      </div>
                      <div className="step-header" style={{marginBottom: "2rem"}}>
                        <span className="step-number">3 </span>
                        <span className="step-label">After changing the properties, Press OK</span>
                      </div>
                    </div>
                    <div className="screenshot-wrapper">
                      <img src={attrWindow} alt="Attributes Window" className="software-screenshot" style={{ width: '500px'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'position' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4>CHANGES THE POSITIONS OF DRAFTING ENTITIES</h4>
                <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(positionSteps)} onStop={stop} />
              </div>
              <div className="instruction-step">
                <div className="step-description">
                  <div className="screenshot-wrapper mt-4 mb-4">
                    <img src={positionIcon} alt="Position Tool" className="software-screenshot" style={{ height: '100px'}} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
            <button className="nav-button next" onClick={handleNext}>{activeTab === 'position' ? nextLabel || 'Next Lesson' : 'Next'} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotationLesson;
