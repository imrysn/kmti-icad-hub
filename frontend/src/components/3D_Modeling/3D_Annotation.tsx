import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
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
import textIcon from "../../assets/3D_Image_File/annotation1_text_entry.png";
import textWindow from "../../assets/3D_Image_File/text_entry_window.png";
import textResult from "../../assets/3D_Image_File/annotation1_text_entry1.png";
import editsIcon from "../../assets/3D_Image_File/annotation2_edits_drafting.png";
import editsWindow from "../../assets/3D_Image_File/edit_dimension_characters_window.png";
import attrIcon from "../../assets/3D_Image_File/annotation11.png";
import attrWindow from "../../assets/3D_Image_File/change_properties_window.png";
import positionIcon from "../../assets/3D_Image_File/changes_position_drafting_entities.png";
import annotationTop from "../../assets/3D_Image_File/annotation1_top.png";
import annotation1NoteStringEntry1 from "../../assets/3D_Image_File/annotation1_note_string_entry1.png";

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
    currentIndex,
    currentCharIndex
  } = useLessonCore(`annotation-${activeTab}`);

  const linearSteps = [
    "CREATE LINEAR DIMENSION",
    "Step 1: Select edges to be measured.",
    "Step 2: Left-click on the 3D Space to position the linear dimension."
  ];

  const diameterSteps = [
    "CREATE DIAMETER DIMENSION",
    "Step 1: Select the edge of the circle to be measured.",
    "Step 2: Left-click on the 3D Space to position the circular dimension."
  ];

  const angularSteps = [
    "CREATE ANGULAR DIMENSION",
    "Step 1: Select edges to be measured.",
    "Step 2: Left-click on the 3D Space to position the angular dimension."
  ];

  const notesSteps = [
    "CREATES NOTES WITH LEADER LINES",
    "Step 1: Pick any edge of the entity, then left-click.",
    "Step 2: Left-click to show the Note String Entry window.",
    "Step 3: Enter the note, then press OK.",
    "Step 4: Left-click on the 3D Space to place the note."
  ];

  const characterSteps = [
    "CREATE CHARACTER STRINGS",
    "Step 1: Left-click on the 3D Space to show the Text Entry window.",
    "Step 2: Enter the note, then press OK.",
    "Step 3: Left-click on the 3D Space to place the note."
  ];

  const editsSteps = [
    "EDITS DRAFTING ENTITY CHARACTERS",
    "Step 1: Select drafting entity, then click GO.",
    "Step 2: Edit Dimension Characters window will appear.",
    "Step 3: After editing the dimension characters, Press OK."
  ];

  const attributesSteps = [
    "CHANGES THE ATTRIBUTES OF A DRAFTING ENTITY",
    "Step 1: Select drafting entity, then click GO.",
    "Step 2: Change Properties window will appear.",
    "Step 3: After changing the properties, Press OK."
  ];

  const positionSteps = [
    "Changes the positions of drafting entities.",
  ];

  const handleTabChange = (tab: AnnotationTab) => {
    setActiveTab(tab);
  };

  const handleNext = () => {
    const tabs: AnnotationTab[] = ["linear", "diameter", "angular", "notes", "character", "edits", "attributes", "position"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      handleTabChange(tabs[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
      if (onNextLesson) onNextLesson();
    }
  };

  const handlePrev = () => {
    const tabs: AnnotationTab[] = ["linear", "diameter", "angular", "notes", "character", "edits", "attributes", "position"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      handleTabChange(tabs[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
      if (onPrevLesson) onPrevLesson();
    }
  };

  const introTitle = "ANNOTATION";
  const introSubtitle = "Tools use to create drafting entities such as dimension text and notes.";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            const steps = activeTab === 'linear' ? linearSteps :
                           activeTab === 'diameter' ? diameterSteps :
                           activeTab === 'angular' ? angularSteps :
                           activeTab === 'notes' ? notesSteps :
                           activeTab === 'character' ? characterSteps :
                           activeTab === 'edits' ? editsSteps :
                           activeTab === 'attributes' ? attributesSteps : positionSteps;
            speak([introTitle, introSubtitle, ...steps]);
          }} onStop={stop} />
        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <img src={annotationTop} alt="Annotation Top" className="software-screenshot mt-4" style={{ height: 'auto', width: '200px' }} />
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
        <div className="lesson-card tab-content fade-in">

          {activeTab === 'linear' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CREATE LINEAR DIMENSION"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">

                    <img src={linearIcon} alt="Linear Dimension Tool" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Select edges to be measured."
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Left-click on the 3D Space to position the linear dimension."
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={linearImage} alt="Linear Dimension Result" className="software-screenshot mt-4" style={{ height: '300px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diameter' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CREATE DIAMETER DIMENSION"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                    <img src={diameterIcon} alt="Diameter Dimension Tool" className="software-screenshot mt-4 mb-4"  style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Select the edge of the circle to be measured."
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Left-click on the 3D Space to position the circular dimension."
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={diameterImage} alt="Diameter Dimension Result" className="software-screenshot mt-4" style={{ height: '300px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'angular' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CREATE ANGULAR DIMENSION"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                    <img src={angularIcon} alt="Angular Dimension Tool" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Select edges to be measured."
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Left-click on the 3D Space to position the angular dimension."
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={angularImage} alt="Angular Dimension Result" className="software-screenshot mt-4" style={{ height: '200px' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CREATES NOTES WITH LEADER LINES"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                    <img src={noteIcon} alt="Notes Tool" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Pick any edge of the entity, then left-click."
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Left-click to show the Note String Entry window."
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                        <img src={noteWindow} alt="Note String Entry Window" className="software-screenshot mt-4 mb-4" style={{ width: '400px', marginBottom: "2rem"}} />
                      <div className={`step-header ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{marginBottom: "2rem"}}>
                        <span className="step-number">3 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Enter the note, then press OK."
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{marginBottom: "2rem"}}>
                        <span className="step-number">4 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Left-click on the 3D Space to place the note."
                          isActive={isSpeaking && currentIndex === 6}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={annotation1NoteStringEntry1} alt="Angular Dimension" className="software-screenshot mt-4" style={{ width: '450px', marginBottom: "2rem"}} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'character' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CREATE CHARACTER STRINGS"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                    <img src={textIcon} alt="Character Strings Tool" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }}  />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Left-click on the 3D Space to show the Text Entry window."
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                        <img src={textWindow} alt="Text Entry Window" className="software-screenshot mt-4 mb-4" style={{ width: '500px', marginBottom: "2rem"}} />
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Enter the note, then press OK."
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{marginBottom: "2rem"}}>
                        <span className="step-number">3 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Left-click on the 3D Space to place the note."
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={textResult} alt="Attributes Window" className="software-screenshot mt-4" style={{ width: '500px'}} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edits' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="EDITS DRAFTING ENTITY CHARACTERS"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                    <img src={editsIcon} alt="Edits Tool" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px",marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{ marginBottom: "2rem" }}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Select drafting entity, then click GO."
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                        <img src={editsWindow} alt="Edits Window" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: '500px', marginBottom: "2rem"  }} />
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Edit Dimension Characters window will appear."
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom: "2rem" }}>
                        <span className="step-number">3 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="After editing the dimension characters, Press OK."
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={editsWindow} alt="Edits Window" className="software-screenshot mt-4" style={{ width: '900px'}} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attributes' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CHANGES THE ATTRIBUTES OF A DRAFTING ENTITY"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                    <img src={attrIcon} alt="Attributes Tool" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px", marginBottom: "2rem" }} />
                  <div className="flex-row-wrap" style={{ gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className={`step-header ${currentIndex === 3 ? "reading-active" : ""}`} style={{marginBottom: "2rem"}}>
                        <span className="step-number">1 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Select drafting entity, then click GO."
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                        <img src={attrWindow} alt="Attributes Window" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: '500px', marginBottom: "2rem" }} />
                      <div className={`step-header ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{marginBottom: "2rem"}}>
                        <span className="step-number">2 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="Change Properties window will appear."
                          isActive={isSpeaking && currentIndex === 4}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                      <div className={`step-header ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{marginBottom: "2rem"}}>
                        <span className="step-number">3 </span>
                        <KaraokeLessonText
                          as="span"
                          className="step-label"
                          text="After changing the properties, Press OK."
                          isActive={isSpeaking && currentIndex === 5}
                          currentCharIndex={currentCharIndex}
                        />
                      </div>
                    </div>
                    <img src={attrWindow} alt="Attributes Window" className="software-screenshot mt-4" style={{ width: '500px'}} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'position' && (
            <div className="fade-in">
              <div className="card-header" style={{ marginBottom: "1rem" }}>
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CHANGES THE POSITION OF DRAFTING ENTITIES"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                <div className="step-description">
                    <img src={positionIcon} alt="Position Tool" className="software-screenshot mt-4 mb-4" style={{ height: 'auto', width: "200px",}} />
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

