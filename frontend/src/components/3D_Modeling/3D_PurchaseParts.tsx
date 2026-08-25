import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import './CourseLesson.css';

/* Assets */
import uploadingFlowchart from "../../assets/3d-images/3d_purchase.png";
import purchasePartsFlowchart from "../../assets/3d-images/3d_purchase_parts.png";

interface PurchasePartsLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PurchasePartsLesson: React.FC<PurchasePartsLessonProps> = ({ subLessonId = "purchase-parts-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'part1' | 'part2'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'part1';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    registerText
  } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [activeTab, subLessonId]);

  const handleNext = () => {
    stop();
    if (activeTab === 'part1') {
      setActiveTab('part2');
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    stop();
    if (activeTab === 'part2') {
      setActiveTab('part1');
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const part1Steps = [
    t('purchaseparts.part1Steps.step0'),
    t('purchaseparts.part1Steps.step1'),
    t('purchaseparts.part1Steps.step2'),
    t('purchaseparts.part1Steps.step3'),
    t('purchaseparts.part1Steps.step4')
  ];

  const part2Steps = [
    t('purchaseparts.part2Steps.step0'),
    t('purchaseparts.part2Steps.step1'),
    t('purchaseparts.part2Steps.step2'),
    t('purchaseparts.part2Steps.step3'),
    t('purchaseparts.part2Steps.step4')
  ];

  useEffect(() => {
    const steps = activeTab === 'part1' ? part1Steps : part2Steps;
    registerText(steps, 0);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'part1' ? part1Steps : part2Steps;
  const tabsList = [{ id: 'part1' }, { id: 'part2' }];

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
        <button className={`tab-button ${activeTab === 'part1' ? 'active' : ''}`} onClick={() => setActiveTab('part1')}>{t("purchaseparts.tab.part1")}</button>
        <button className={`tab-button ${activeTab === 'part2' ? 'active' : ''}`} onClick={() => setActiveTab('part2')}>{t("purchaseparts.tab.part2")}</button>
      </div>






      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="fade-in">
            <div className="card-header">
              <h4>{activeTab === 'part1' ? t('common.purchase.title1') : t('common.purchase.title2')}</h4>
            </div>

            <img
                src={activeTab === 'part1' ? purchasePartsFlowchart : uploadingFlowchart}
                alt={activeTab === 'part1' ? "Purchase Part 3D Modeling Flowchart" : "Sample Flow Chart for Uploading Purchase Parts on the Server"}
                className={`software-screenshot screenshot-wide mt-12 ${currentIndex === 2 ? "reading-active" : ""}`}
                data-reading-index="2"
            />
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
            <button className="nav-button next" onClick={handleNext}>{activeTab === 'part1' ? t('common.next') : (nextLabel || t('common.next'))} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePartsLesson;

