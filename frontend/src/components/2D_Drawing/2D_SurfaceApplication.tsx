import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { useTranslation } from "../../context/LanguageContext";

import './CourseLesson.css';

/* Importing assets */
import shotblast1Img from "../../assets/2d-images/2D_application_surface((1)_application_surface_1.png";
import shotblast2Img from "../../assets/2d-images/2D_application_surface((1)_application_surface_2.png";
import machiningImg from "../../assets/2d-images/2D_application_surface((2)_machining.png";
import machining2Img from "../../assets/2d-images/2D_application_surface((2)_machining_2.png";

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
  const { t } = useTranslation();
  const TABS = [
    { id: 'shotblasting', label: t('2d.surface.shotblasting') },
    { id: 'machining', label: t('2d.surface.machining') }
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
      title: t('2d.application_of_surface'),
      subtitle: t('2d.techniques_for_material_black_skin_remov'),
      steps: [
        t('2d.before_surface_treatment_material_black_'), t('2d.shotblasting_increases_corrosion_resista')
      ]
    },
    '2d-surface-app-machining': {
      title: t('2d.application_of_surface'),
      subtitle: t('2d.surface_preparation_using_controlled_mac'),
      steps: [
        t('2d.if_shotblasting_is_not_necessary_machine')
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
                      {t('2d.surface.intro')} 
                    </p>

                    <p className="mb-4">
                      <strong style={{ color: 'red', marginLeft: "3rem" }}>{t('2d.surface.shotblasting_1')}</strong>{t('2d.surface.shotblasting_description')}
                    </p>

                    <div className="mb-4 ml-8">
                      <strong style={{ color: 'red', marginLeft: "3rem" }}>{t('2d.surface.shotblasting_uses')}</strong>
                      <ul style={{ listStyleType: "none", paddingLeft: "6rem", margin: 0, marginTop: "0.25rem" }} className="space-y-1">
                        <li>{t('2d.surface.use_1')}</li><li>{t('2d.surface.use_2')}</li><li>{t('2d.surface.use_3')}</li><li>{t('2d.surface.use_4')}</li><li>{t('2d.surface.use_5')}</li>
                      </ul>
                    </div>

                    <p style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }} className="mb-2">{t('2d.example')}</p>
                    <img src={shotblast1Img} alt="Shotblasting Application" className="software-screenshot screenshot-wide mb-2" />
                    <p className="mb-8" style={{ textIndent: "3rem" }}>
                      {t('2d.surface.example_1')}
                    </p>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ marginTop: "2rem" }}>
                    <div className="mb-4 ml-8">
                      <strong style={{ color: 'red', marginLeft: "3rem" }}>{t('2d.surface.black_skin_uses')}</strong>
                      <ul style={{ listStyleType: "none", paddingLeft: 0, marginLeft: "5rem", marginTop: "0.25rem" }} className="space-y-1">
                        <li>{t('2d.surface.black_use_1')}</li><li>{t('2d.surface.use_4')}</li><li>{t('2d.surface.black_use_3')}</li>
                      </ul>
                    </div>

                    <p style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }} className="mb-2">{t('2d.example')}</p>
                    <img src={shotblast2Img} alt="Black Skin Removal" className="software-screenshot screenshot-wide mb-2" />
                    <p className="mb-4" style={{ textIndent: "3rem" }}>
                      {t('2d.surface.example_2')}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'machining' && (
                <div className="text-[15px] leading-relaxed text-gray-800" style={{ padding: "1rem" }}>
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                    <p className="mb-4">
                      <strong style={{ color: 'red', marginLeft: "3rem" }}>{t('2d.surface.machining_2')}</strong>{t('2d.surface.machining_description')}
                    </p>

                    <p style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }} className="mb-2 mt-4">{t('2d.example')}</p>
                    <img src={machiningImg} alt="Machining All Sides" className="software-screenshot screenshot-wide mb-2" />
                    <p className="mb-8" style={{ textIndent: "3rem" }}>
                      {t('2d.surface.machining_example_1')}
                    </p>

                    <p style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }} className="mb-2 mt-4">{t('2d.example')}</p>
                    <img src={machining2Img} alt="Polished Material Check" className="software-screenshot screenshot-wide mb-2" />
                    <p className="mb-4" style={{ textIndent: "3rem" }}>
                      {t('2d.surface.machining_example_2')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={() => handlePrev()}>
              <ChevronLeft size={18} /> {t('2d.previous')}
            </button>
            <button className="nav-button next" onClick={() => handleNext()}>
              {nextLabel || t('2d.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurfaceApplicationLesson;

