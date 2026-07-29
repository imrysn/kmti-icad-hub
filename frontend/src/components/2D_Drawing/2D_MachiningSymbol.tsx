import React,{ useEffect } from "react";

import { ChevronLeft,ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Machining Symbol */

import machiningSymbolMainImg from "../../assets/2D_Image_File/2D_machining_symbol.png";


interface MachiningSymbolLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const MachiningSymbolLesson: React.FC<MachiningSymbolLessonProps> = ({
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const { t, language } = useTranslation();
  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore('2d-machining-symbol');

  const machiningSteps = [
    ""
  ];

  const currentTitle = "MACHINING SYMBOL";
  const currentSubtitle = "Understanding machining symbols and surface condition requirements to ensure precision parts and required surface finishes.";
  const currentTabSteps = [
    currentTitle,
    currentSubtitle,
    "Machining Symbol. Note: Machining symbol with open & close parenthesis indicates that the part must be machined before welding. Machining after welding will be impossible.",
    "Machining Surface Condition."
  ];
  const tabsList = [{ id: 'default' }];
  const activeTab = 'default';
  const surfaceConditionRows = language === 'ja'
    ? [
      ['▽', '100S〜50S', '粗加工面', '他の面と関連しない面', '軸端面／カバー外面'],
      ['▽▽', '25S〜12.5S', '機械加工面', '他部品と関連する面（中級精度）', 'キー溝底面／カバー内面／オイルシール取付面'],
      ['▽▽▽', '6.3S〜1.6S', '仕上げ面', '滑らかな面（高精度）', '軸表面'],
      ['(▽)', '100S〜50S', '粗加工面（溶接前）', '溶接組立後に加工が必要な面', '両溶接部の面／スプロケット付き溶接部'],
      ['(▽▽)', '25S〜12.5S', '機械加工面（溶接前）', '他部品と関連する面（中級精度）', 'ピローブロック取付面／シリンダー取付面'],
      ['G\n▽▽▽', '6.3S〜1.6S', '研削仕上げ面', 'より細かな仕上げ面が必要（化粧仕上げ）', 'スライドガイド／レールガイド／ガイドプレート'],
      ['G\n▽▽▽▽', '1.6S〜', '鏡面仕上げ面', 'さらに細かな仕上げ面が必要（高級化粧仕上げ）', '軸表面／ローラー']
    ]
    : [
      ['▽', '100S~50S', 'Rough surface', 'Surface is not related to another area.', 'Shaft edge / external surface of cover'],
      ['▽▽', '25S~12.5S', 'Machined surface', 'Related to other parts (middle accuracy)', 'Key-slot bottom / internal cover surface / oil-seal surface'],
      ['▽▽▽', '6.3S~1.6S', 'Fine surface', 'Smooth surface (high accuracy)', 'Shaft surface'],
      ['(▽)', '100S~50S', 'Rough machined surface (before welding)', 'Requires machining after welding assembly', 'Both welding-part surfaces / welded parts with sprocket'],
      ['(▽▽)', '25S~12.5S', 'Machined surface (before welding)', 'Related to other parts (middle accuracy)', 'Pillow-block installation surface / cylinder installation surface'],
      ['G\n▽▽▽', '6.3S~1.6S', 'Surface grinding', 'Fine surface finish required (cosmetic finish)', 'Slide guide / rail guide / guide plate'],
      ['G\n▽▽▽▽', '1.6S~', 'Mirror-finish surface', 'Finer surface finish required (fine cosmetic finish)', 'Shaft surface / roller']
    ];

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [registerText]);

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }

    if (onNextLesson) onNextLesson();
  };

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

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">1</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Machining Symbol"
                  isActive={isSpeaking && currentIndex === 2}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div className="red-text mb-4">
                  <KaraokeLessonText
                    text={machiningSteps[0]}
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <img src={machiningSymbolMainImg} alt="Machining Symbol Selection" className="software-screenshot screenshot-wide" />
                <div className="instruction-box mt-6">
                  <p className="p-flush">
                    {t('2d.machining.before_welding_note')}
                  </p>
                </div>
              </div>
            </div>


            <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
              <div className="step-header" style={{ marginLeft:"3rem"}}>
                <span className="step-number">a</span>
                <KaraokeLessonText
                  as="span"
                  className="step-label"
                  text="Machining Surface Condition"
                  isActive={isSpeaking && currentIndex === 3}
                  currentCharIndex={currentCharIndex}
                />
              </div>
              <div className="step-description">
                <div style={{ overflowX: 'auto', border: '1px solid #4d6d91', borderRadius: '8px', background: '#111827' }}>
                  <table style={{ width: '100%', minWidth: '760px', borderCollapse: 'collapse', color: '#e5e7eb', fontSize: '0.9rem', background: '#111827' }}>
                    <thead>
                      <tr style={{ background: '#294b70' }}>
                        {(language === 'ja' ? ['記号', '表面粗さ', '呼び方', '意味', '適用例'] : ['Symbol', 'Description', 'Symbol to be called', 'Meaning', 'Application example']).map((header) => (
                          <th key={header} style={{ padding: '0.7rem', borderBottom: '2px solid #4da3ff', borderRight: '1px solid rgba(255,255,255,0.28)', textAlign: 'center', fontWeight: 700, color: '#4da3ff' }}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {surfaceConditionRows.map((row, index) => (
                        <tr key={`${row[0]}-${index}`}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} style={{ padding: '0.55rem 0.7rem', background: '#111827', borderBottom: '1px solid rgba(148,163,184,0.42)', borderRight: '1px solid rgba(148,163,184,0.42)', textAlign: cellIndex === 0 || cellIndex === 1 ? 'center' : 'left', whiteSpace: 'pre-line', verticalAlign: 'middle', lineHeight: 1.35 }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachiningSymbolLesson;



