import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useTranslation } from "../../context/LanguageContext";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Line Properties (1) */
import lineProp1Img from "../../assets/2D_Image_File/2D_line_properties_(1).png";

/* Importing assets for Line Properties (2) */
import lineProp2Img from "../../assets/2D_Image_File/2D_line_properties_(2)_6_changing_line_color.png";

/* Importing assets for Line Properties (3) */
import lineProp3ImgA from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline1.png";
import lineProp3ImgB from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline_spline.png";

/* Importing assets for Line Properties (4) */
import lineProp4Img from "../../assets/2D_Image_File/2D_line_properties_(3)_additional_lines_a_spline.png.png";
import lineProp5Img from "../../assets/2D_Image_File/2D_line_properties_(3)_c_piping_center_line_1.png";
import lineProp6Img from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_1.png";
import lineProp7Img from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_3.png";

interface LinePropertiesLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const LinePropertiesLesson: React.FC<LinePropertiesLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { t, language, translateContent } = useTranslation();
  const TABS = [
    { id: '1', label: t('2d.line_properties') },
    { id: '2', label: t('2d.line.changing_color') },
    { id: '3', label: t('2d.line.additional_lines') }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-line-props-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex, registerText } = useLessonCore(`2d-line-props-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-line-props-active-tab', activeTab);
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
    '2d-line-props-1': {
      title: t('2d.line_properties'),
      subtitle: '',
      steps: []
    },
    '2d-line-props-2': {
      title: t('2d.line.changing_properties'),
      subtitle: '',
      steps: [
        ""
      ]
    },
    '2d-line-props-3': {
      title: t('2d.line.additional_lines'),
      subtitle: '',
      steps: [
        "",
        t('2d.line.spline.description'),
        t('2d.line.center_line.description')
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-line-props-${activeTab}`] || LESSON_DATA['2d-line-props-1'];
  const linePropertyHeaders = language === 'ja'
    ? ['用途', '線種', '線の太さ', '太さ', '色']
    : ['Application', 'Line Type', 'Line Weight', 'Thickness', 'Color'];
  const linePropertyRows = language === 'ja'
    ? [
        ['実線', '連続線', '太線', '0.4mm', '白（1）'],
        ['隠線', '破線', '細線', '0.1mm', '緑（3）'],
        ['中心線', '一点鎖線', '細線', '0.1mm', 'シアン（7）'],
        ['想像線', '二点鎖線', '細線', '0.1mm', '緑（3）'],
        ['矢印／機械の流れ', '連続線', '太線', '0.4mm', '白（1）'],
        ['溶接ハッチング', '連続線', '中線', '0.2mm', 'ピンク（6）'],
        ['けがき線', '連続線', '太線', '0.4mm', '白（1）'],
        ['床レベル', '連続線', '細線', '0.1mm', '緑（3）'],
        ['スプライン／切断線', '連続線', '細線', '0.1mm', '緑（3）'],
        ['追加情報／表', '連続線', '細線', '0.1mm', '緑（3）'],
        ['詳細ビュー表示', '連続線', '細線', '0.1mm', '緑（3）'],
        ['文字', '-', '細線', '0.15mm', '黄（4）'],
        ['加工記号', '-', '細線', '0.1mm', '赤（2）'],
        ['改訂前データ／寸法', '連続線', '細線', '0.1mm', '赤（2）'],
        ['切断部（ハッチング）', '連続線', '細線', '0.1mm', '赤（2）'],
        ['改訂雲', '連続線', '細線', '0.1mm', '赤（2）'],
        ['配管参照図', '連続線', '細線', '0.1mm', '緑（3）'],
        ['配管端部参照線', '連続線', '細線', '0.1mm', '緑（3）'],
        ['尺度線', '連続線', '中線', '0.2mm', '肌色（15）'],
        ['表面処理／条件', '一点鎖線', '中線', '0.2mm', '肌色（15）'],
        ['溶接外観なしの表面', '一点鎖線', '中線', '0.2mm', '肌色（15）'],
        ['同一レベル', '一点鎖線', '細線', '0.1mm', 'シアン（7）']
      ]
    : [
        ['Actual line', 'Continuous line', 'Thick', '0.4mm', 'White (1)'],
        ['Hidden Line', 'Broken Line', 'Thin', '0.1mm', 'Green (3)'],
        ['Center Line', 'Single Dot Line', 'Thin', '0.1mm', 'Cyan (7)'],
        ['Phantom Line', 'Double Dot Line', 'Thin', '0.1mm', 'Green (3)'],
        ['Arrow / Machine Flow', 'Continuous line', 'Thick', '0.4mm', 'White (1)'],
        ['Welding Hatch', 'Continuous line', 'Middle', '0.2mm', 'Pink (6)'],
        ['Scribe Line', 'Continuous line', 'Thick', '0.4mm', 'White (1)'],
        ['Floor Level', 'Continuous line', 'Thin', '0.1mm', 'Green (3)'],
        ['Spline / Cutting Line', 'Continuous line', 'Thin', '0.1mm', 'Green (3)'],
        ['Additional Information / Table', 'Continuous line', 'Thin', '0.1mm', 'Green (3)'],
        ['Detail View Indicator', 'Continuous line', 'Thin', '0.1mm', 'Green (3)'],
        ['Text / Letter', '-', 'Thin', '0.15mm', 'Yellow (4)'],
        ['Machining Symbol', '-', 'Thin', '0.1mm', 'Red (2)'],
        ['Revised Old Data / Dimension', 'Continuous line', 'Thin', '0.1mm', 'Red (2)'],
        ['Cutted part (Hatch)', 'Continuous line', 'Thin', '0.1mm', 'Red (2)'],
        ['Revision Cloud', 'Continuous line', 'Thin', '0.1mm', 'Red (2)'],
        ['Pipe Reference Drawing', 'Continuous line', 'Thin', '0.1mm', 'Green (3)'],
        ['Pipe End Reference Line', 'Continuous line', 'Thin', '0.1mm', 'Green (3)'],
        ['Scale Line', 'Continuous line', 'Middle', '0.2mm', 'SkinColor (15)'],
        ['Surface Treatment / Condition', 'Single Dot Line', 'Middle', '0.2mm', 'SkinColor (15)'],
        ['Surface Without Welding Appearance', 'Single Dot Line', 'Middle', '0.2mm', 'SkinColor (15)'],
        ['Same Level', 'Single Dot Line', 'Thin', '0.1mm', 'Cyan (7)']
      ];

  const currentTabSteps = [
    currentLesson.title,
    currentLesson.subtitle,
    ...(currentLesson.steps || [])
  ].filter(Boolean);

  const tabsList = TABS.map(t => ({ id: t.id }));

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [activeTab, language, registerText]);

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
              {activeTab === '1' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">5</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>

                  <img src={lineProp1Img} alt="Line Properties Overview" className="software-screenshot screenshot-wide" />

                  <div className="lesson-table-container mt-6">
                    <table className="lesson-table">
                      <thead>
                        <tr>
                          {linePropertyHeaders.map(header => <th key={header}>{header}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {linePropertyRows.map((row, rowIndex) => (
                          <tr key={row[0]}>
                            {row.map((cell, cellIndex) => (
                              <td key={`${row[0]}-${cellIndex}`} className={rowIndex === 6 && cellIndex >= 2 ? 'highlight-cell-yellow' : undefined}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">6</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('2d.line.changing_properties_color')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush mb-4"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp2Img} alt="External and Hidden Lines" className="software-screenshot screenshot-wide" style={{ marginTop: "-3rem" }} />
                  </div>
                </div>
              )}

              {activeTab === '3' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">7</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={currentLesson.title}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-header" style={{ marginTop: '0.5rem', marginLeft: "3rem" }}>
                    <span className="step-number">a</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('2d.line.spline')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush mb-4"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp3ImgA} alt="Additional Lines - Spline Settings" className="software-screenshot screenshot-wide mb-6" />

                    <KaraokeLessonText
                      className="p-flush mb-4"
                      text={currentLesson.steps[1]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp3ImgB} alt="Additional Lines - Spline Application" className="software-screenshot screenshot-wide" />

                    <div className="step-header" style={{ marginTop: '2rem', marginLeft: "3rem" }}>
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.line.center_line')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>

                    <KaraokeLessonText
                      className="p-flush mb-4 mt-4"
                      text={currentLesson.steps[2]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp4Img} alt="Line Property Verification" className="software-screenshot screenshot-wide" style={{ marginBottom: "-5rem" }} />

                    <div className="instruction-box mt-4">
                      <KaraokeLessonText
                        as="p"
                        text={t('2d.line.center_line.note')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                        style={{ margin: 0, lineHeight: 1.5 }}
                      />
                    </div>

                    <div className="step-header" style={{ marginTop: '2rem', marginLeft: "3rem" }}>
                      <span className="step-number">c</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.line.piping_center_line')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <img src={lineProp5Img} alt="Piping Center Line" className="software-screenshot screenshot-wide mt-4" />

                    <div className="step-header" style={{ marginTop: '2rem', marginLeft: "3rem" }}>
                      <span className="step-number">d</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text={t('2d.line.change_representation')}
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>

                    <KaraokeLessonText
                      className="p-flush mb-4 mt-4"
                      text={t('2d.line.change_representation.description')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp6Img} alt="Change representation of parts hierarchically" className="software-screenshot screenshot-wide" />
                    <img src={lineProp7Img} alt="Change representation of parts hierarchically - continued" className="software-screenshot screenshot-wide mt-4" />
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
              {nextLabel ? translateContent(nextLabel) : t('2d.next')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinePropertiesLesson;
