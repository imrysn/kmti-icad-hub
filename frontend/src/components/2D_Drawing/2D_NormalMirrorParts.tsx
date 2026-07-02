import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Import images */
import img2 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(1)_2.png";
import imgA1 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(2)_a_1.png";
import imgA2 from "../../assets/2D_Image_File/2D_normal_and_mirror_parts(2)_a_2.png";

interface NormalMirrorPartsLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const NormalMirrorPartsLesson: React.FC<NormalMirrorPartsLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: 'nomenclature', label: 'Normal / Mirror Parts' },
    { id: 'mirror-command', label: 'Mirror Command' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-normal-mirror-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-normal-mirror-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-normal-mirror-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-normal-mirror-nomenclature': {
      title: 'NORMAL AND MIRROR PARTS',
      subtitle: 'Designating normal and mirror parts with standardized numbering and symmetry rules.',
      steps: [
        "Normal: Example drawing number RTXXXXXN01. Mirror parts are parts that are symmetrically the same. Example drawing number RTXXXXXA01 & RTXXXXXB01.",
        "Rule on how to detail a mirror parts: 1. Detail the first drawing, for example RTXXXXXA01. 2. Proceed to checking and editing of check back until finalized the part. 3. Save as RTXXXXXA01 to RTXXXXXB01. Replace part if it already exists. 4. Properly mirror the part using mirror icon. Edit properties and part dimensions affected by the mirror process. 5. Proceed on editing 2D detailing. 6. View inside the box need to mirror, the reference is in origin same as what we do in 3D modeling. 7. Encircled view is right side view. Mirror it and change ownership to left side view. 8. Update isometric view, switch user view as needed. 9. Insert new title block to update the drawing number on template."
      ]
    },
    '2d-normal-mirror-mirror-command': {
      title: 'NORMAL AND MIRROR PARTS',
      subtitle: 'Using the Mirror command in 2D detailing to reflect components.',
      steps: [
        "Mirror Command: Use the mirror command to create symmetric reflections of 2D entities. Verify the mirrored dimensions and ownership parameters after completing the operation."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-normal-mirror-${activeTab}`] || LESSON_DATA['2d-normal-mirror-nomenclature'];

  const currentTabSteps = [
    currentLesson.title,
    currentLesson.subtitle,
    ...(currentLesson.steps || [])
  ].filter(Boolean);

  const tabsList = TABS.map(t => ({ id: t.id }));

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [activeTab, registerText]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    0
  );

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="flex-col tab-content fade-in">
              <div className="instruction-step" style={{ marginTop: "-2rem" }}>
                <div className="step-header">
                  <span className="step-number">22</span>
                  <span className="step-label">Normal and Mirror parts</span>
                </div>
              </div>

              {activeTab === 'nomenclature' && (
                <>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                    <div className="step-description">
                      <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                        <strong className="red-text">Normal</strong><br />
                        <span style={{ marginLeft: "6.1rem" }}>Example drawing number</span> <span style={{ color: "#fff" }}>RTXXXXXN01</span>
                      </p>
                      <p className="p-flush">
                        <strong className="red-text">Mirror parts</strong> are parts that are symmetrically the same.<br />
                        <span style={{ marginLeft: "6.1rem" }}>Example drawing number </span><span style={{ color: "#fff" }}>RTXXXXXA01 & RTXXXXXB01</span>
                      </p>
                      <img src={img2} alt="Normal and Mirror parts drawing sheet" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "2rem" }}>
                    <div className="step-header">
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Rules to detail mirror parts"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="instruction-box">
                        <p className="p-flush" style={{ marginBottom: "0.5rem" }}><strong className="red-text">※ Rule on how to detail a mirror parts:</strong></p>
                        <ol style={{ paddingLeft: "1.5rem", margin: 0, listStyleType: "decimal" }} className="space-y-1">
                          <li>Detail the first drawing, for example RTXXXXXA01.</li>
                          <li>Proceed to checking and editing of check back until finalized the part.</li>
                          <li>Save as RTXXXXXA01 to RTXXXXXB01. Replace part if it is already existed.</li>
                          <li>Properly mirror the part using mirror icon. Edit properties and part dimension affected by mirror process.</li>
                          <li>Proceed on editing 2D detailing.</li>
                          <li>View inside the box need to mirror, the reference is in origin same as what we do in 3D modeling.</li>
                          <li>Encircled view is right side view. Mirror it and change ownership to left side view.</li>
                          <li>Update isometric view, switch user view as needed.</li>
                          <li>Insert new title block to update the drawing number on template.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'mirror-command' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-3rem" }}>
                  <div className="step-header" style={{ marginLeft: "3rem" }}>
                    <span className="step-number">a</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Mirror Command on detailing"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">

                    <div className="flex-col gap-4">
                      <img src={imgA1} alt="Mirror Command Menu" className="software-screenshot screenshot-wide" />
                      <img src={imgA2} alt="Mirroring Operation" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalMirrorPartsLesson;
