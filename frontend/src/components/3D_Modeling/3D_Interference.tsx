/** * 3D_Interference.tsx * Interference Check lesson */

import { ChevronLeft,ChevronRight } from 'lucide-react';
import React from "react";
import { useTranslation } from '../../context/LanguageContext';
import { useLessonCore } from "../../hooks/useLessonCore";
import './CourseLesson.css';

/* Assets */
import interfCheckIcon from "../../assets/3d-images/interf_check.png";
import interfCommandMenu from "../../assets/3d-images/interf_command_menu.png";
import interferenceResult from "../../assets/3d-images/interference.png";
import interferenceCheckImg from "../../assets/3d-images/interference_check.png";
import leftClick from "../../assets/3d-images/left_click.png";
import listInterfIcon from "../../assets/3d-images/list_all_detected_interf.png";
import listDisplayWindow from "../../assets/3d-images/list_display_window.png";

interface InterferenceLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const InterferenceLesson: React.FC<InterferenceLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();
  const {
    scrollProgress,
    containerRef,
    currentIndex
  } = useLessonCore('interference');


  const getStepClass = (_stepId: string) => "instruction-step";

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          {t('common.interference.check')}

        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
         {t('common.interference.desc1')}
        </p>
        <p className="lesson-subtitle mt-4" style={{marginTop: "-1rem"}}>{t('common.interference.desc2')}</p>
        <img src={interferenceResult} alt={t('common.interference_results')} className="software-screenshot screenshot-small mt-4" style={{ width: '14rem' }} />
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className={`card-header ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
            <h4>{t('common.interference.check')}</h4>
          </div>

          <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
            <div className="step-header">
              <span className="step-number">1 </span>
              <span className="step-label">{t('common.interference.step1')}</span>
            </div>
            <div className="step-description">
                    <img src={interfCommandMenu} alt={t('common.interference_command_menu')} className="software-screenshot mt-4" style={{ height: 'auto', width: '200px', marginBottom: "-1rem" }} />
            </div>
          </div>

          <div className={`${getStepClass("i2")} ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4">
            <div className="step-header">
              <span className="step-number">2 </span>
              <span className="step-label">{t('common.interference.step2')}</span>
            </div>
            <div className="step-description">
                    <img src={interfCheckIcon} alt={t('common.interference_check_icon')} className="software-screenshot mt-4" style={{ height: 'auto', width: '450px', marginBottom: "-1rem"  }} />
            </div>
          </div>

          <div className={`${getStepClass("i3")} ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom:"-2rem"}}>
            <div className="step-header">
              <span className="step-number">3 </span>
              <span className="step-label" style={{marginTop: "-1.5rem"}}>{t('common.interference.step3')}
                <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
              </span>
            </div>
            <div className="step-description">
              <p className="p-flush mb-4" style={{ marginTop: "-1rem" }}>{t('common.interference.step3_desc')}</p>
                    <img src={interferenceCheckImg} alt={t('common.interference_check_dialog')} className="software-screenshot mt-4" style={{width: "900px", marginTop: "1rem", marginBottom: "0rem"}} />
              <div>
              <span className="p-flush"><strong className="text-highlight">{t("common.interference.or")}</strong></span>
              </div>
              <span className="p-flush">{t('common.interference.step3_desc2')}</span>
            </div>
          </div>

          <div className={`${getStepClass("i4")} ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
            <div className="step-header">
              <span className="step-number">4 </span>
              <span className="step-label">{t('common.interference.step4')}</span>
            </div>
              <p className="p-flush mb-4" style={{ marginTop: "-1rem" }}>{t('common.interference.step4_desc')}</p>
          </div>

          <div className={`${getStepClass("li-intro")} ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7">

            <div className="step-description mt-4">
              <span className="p-flush mb-4" style={{ marginTop: "1rem", fontWeight: "700px",}}>{t('common.interference.list_desc')}</span>
                    <img src={listInterfIcon} alt={t('common.display_list_tool_icon')} className="software-screenshot mt-4" style={{ height: 'auto', width: '200px', marginBottom: "-1rem", marginTop: "1rem" }} />
            </div>
          </div>
          <div className={`step-header ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{marginTop: "2rem"}}>
              <span className="step-number">1 </span>
              <span className="step-label" style={{marginTop: "-1.5rem"}} >{t('common.interference.list_step1')} <strong className="text-highlight"></strong>
                <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 8px' }} />
              </span>
            </div>


          <div className={`${getStepClass("li2")} ${currentIndex === 9 ? "reading-active" : ""}`} data-reading-index="9">
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-label">{t('common.interference.list_step2')}</span>
            </div>
            <div className="step-description">
                    <img src={listDisplayWindow} alt={t('common.list_display_window')} className="software-screenshot mt-4" style={{ width: '900px' }} />
            </div>
          </div>

          <div className="lesson-navigation">

            {onPrevLesson && (
  <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
)}
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterferenceLesson;

