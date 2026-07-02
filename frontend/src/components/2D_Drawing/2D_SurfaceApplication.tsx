import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets */
import shotblast1Img from "../../assets/2D_Image_File/2D_application_surface((1)_application_surface_1.png";
import shotblast2Img from "../../assets/2D_Image_File/2D_application_surface((1)_application_surface_2.png";
import machiningImg from "../../assets/2D_Image_File/2D_application_surface((2)_machining.png";
import machining2Img from "../../assets/2D_Image_File/2D_application_surface((2)_machining_2.png";

interface SurfaceApplicationLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const SurfaceApplicationLesson: React.FC<SurfaceApplicationLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: 'shotblasting', label: 'Shotblasting' },
    { id: 'machining', label: 'Machining' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-surface-app-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, registerText } = useLessonCore(`2d-surface-app-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-surface-app-active-tab', activeTab);
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
    '2d-surface-app-shotblasting': {
      title: 'APPLICATION OF SURFACE',
      subtitle: 'Techniques for material black skin removal using Shotblasting.',
      steps: [
        "Before Surface Treatment, material black skin must be removed. Shotblasting is used for stress removal after welding, mechanical cleaning, and fatigue resistance.",
        "Shotblasting increases corrosion resistance for parts exposed to friction and heat. Ensure all contours are properly blasted before applying final coatings."
      ]
    },
    '2d-surface-app-machining': {
      title: 'APPLICATION OF SURFACE',
      subtitle: 'Surface preparation using controlled machining processes.',
      steps: [
        "If shotblasting is not necessary, machine all sides to remove black skin and achieve the final shape. For polished materials where black skin is not present, skin removal is not necessary."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-surface-app-${activeTab}`] || LESSON_DATA['2d-surface-app-shotblasting'];

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
    <div className={`course-lesson-container`} ref={containerRef}>
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
              {activeTab === 'shotblasting' && (
                <div className="text-[15px] leading-relaxed text-gray-800" style={{ padding: "1rem" }}>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                    <p className="mb-4" style={{ textIndent: "3rem" }}>
                      Before the Application of Surface Treatment/ Coating, the black skin of the material must be removed first to the part. There are two (2) processes that we can apply on the part to remove the black skin; <br />
                      <strong style={{ color: 'red', fontStyle: 'italic' }}>(1) Shotblasting(Black skin Removal)</strong> and <strong style={{ color: 'red', fontStyle: 'italic' }}>(2) Machining</strong> .
                    </p>

                    <p className="mb-4">
                      <strong style={{ color: 'red', marginLeft: "3rem" }}>1. Shotblasting</strong> is an operation of forcibly propelling a stream of abrasive material against a surface under high pressure to <span style={{ color: 'red' }}>smooth a rough surface, roughen a smooth surface, shape a surface or remove surface contaminants</span>.<br />
                      <span style={{ marginLeft: "3rem" }}> </span> There are two(2) classification of Shotblasting base on the purpose of application, process needed to apply on the part and purpose of the part.
                    </p>

                    <div className="mb-4 ml-8">
                      <strong style={{ color: 'red', marginLeft: "3rem" }}>a. Shotblasting is commonly used for:</strong>
                      <ul style={{ listStyleType: "none", paddingLeft: "6rem", margin: 0, marginTop: "0.25rem" }} className="space-y-1">
                        <li>- removal of stress after welding process</li>
                        <li>- removal of stress or deformation after refine machining process</li>
                        <li>- mechanical cleaning of raw materials</li>
                        <li>- increases resistance to fatigue (Corrosion may occur after removal)</li>
                        <li>- preparing surfaces for painting</li>
                      </ul>
                    </div>

                    <p style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }} className="mb-2">Example:</p>
                    <img src={shotblast1Img} alt="Shotblasting Application" className="software-screenshot screenshot-wide mb-2" />
                    <p className="mb-8" style={{ textIndent: "3rem" }}>
                      For this part , <strong style={{ color: 'red' }}>shotblasting</strong> is applied to remove the stress from the welding process and in preparation of painting.
                    </p>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "2rem" }}>
                    <div className="mb-4 ml-8">
                      <strong style={{ color: 'red', marginLeft: "3rem" }}>b. Shotblasting(Black skin Removal) is used for:</strong>
                      <ul style={{ listStyleType: "none", paddingLeft: 0, marginLeft: "5rem", marginTop: "0.25rem" }} className="space-y-1">
                        <li>- removal of black skin of part or material</li>
                        <li>- increases resistance to fatigue (Corrosion may occur after removal)</li>
                        <li>- preparing for application of Surface Coating/ Treatment. ex. Isonite, Ionite, Parkerizing,etc.</li>
                      </ul>
                    </div>

                    <p style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }} className="mb-2">Example:</p>
                    <img src={shotblast2Img} alt="Black Skin Removal" className="software-screenshot screenshot-wide mb-2" />
                    <p className="mb-4" style={{ textIndent: "3rem" }}>
                      For the given example, <strong style={{ color: 'red' }}>shotblasting</strong> is applied because the part is attached to an adjusting bracket which increases the possibility of corrosion due to friction and heat. Since shotblasting have a property where it increases the resistance to corrosion and fatigue of the material which is suitable to apply on the part.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'machining' && (
                <div className="text-[15px] leading-relaxed text-gray-800" style={{ padding: "1rem" }}>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                    <p className="mb-4">
                      <strong style={{ color: 'red', marginLeft: "3rem" }}>2. Machining</strong> is any of varoius processes in which a piece of raw material is cut into a desired final shape and size by controlled material-removal process.
                    </p>

                    <p style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }} className="mb-2 mt-4">Example:</p>
                    <img src={machiningImg} alt="Machining All Sides" className="software-screenshot screenshot-wide mb-2" />
                    <p className="mb-8" style={{ textIndent: "3rem" }}>
                      This part serves as a mounting bracket where a cam clutch is attached. Since the clutch rotates with the aid of a bearing installed with it, the part will not rotate and no corrosion will be applied on the part, which means <span style={{ color: 'red', fontStyle: 'italic' }}>application of shotblasting is not necessary</span>, instead machine all the sides in order to get rid the black skin of the material.
                    </p>

                    <p style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }} className="mb-2 mt-4">Example:</p>
                    <img src={machining2Img} alt="Polished Material Check" className="software-screenshot screenshot-wide mb-2" />
                    <p className="mb-4" style={{ textIndent: "3rem" }}>
                      This part uses a polished material where in from the raw material itself, black skin is not present which means <span style={{ color: 'red', fontStyle: 'italic' }}>application of Shotblasting(Black skin removal) and Machining the sides are not necessary</span>, aside from machining the part to desired shape.
                    </p>
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

export default SurfaceApplicationLesson;

