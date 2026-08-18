import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import '../../../../styles/3D_Modeling/CourseLesson.css';
import { KaraokeLessonText } from "../../../KaraokeLessonText";

// --- Assets ---
import createPartIcon from '../../../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import modalInfo1 from '../../../../assets/3D_Image_File/3d_part1_creating_3d_part_3.png';
import treeViewInfo1 from '../../../../assets/3D_Image_File/3d_part1_creating_3d_part_4.png';
import partMenu2 from '../../../../assets/3D_Image_File/3d_part2_change_3d_part_name.png';
import changePartIcon from '../../../../assets/3D_Image_File/3d_part2_change_3d_part_name_1.png';
import modalInfo2 from '../../../../assets/3D_Image_File/3d_part2_change_3d_part_name_3.png';
import treeViewInfo2 from '../../../../assets/3D_Image_File/3d_part2_change_3d_part_name_4.png';
import leftClick from '../../../../assets/3D_Image_File/left_click.png';

interface PartLessonProps {
  nextLabel?: string; subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void;
}

const PartLesson: React.FC<PartLessonProps> = ({
  subLessonId = '3d-part-1',
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const [activeTab, setActiveTab] = useState<"create" | "change">(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'create';
  });

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [subLessonId, activeTab]);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore(subLessonId);

  const createSteps = [
    "CREATE 3D PART",
    "Tool use to name 3D parts and provide information. 3D part name must always be set since it is a vital part for the 2D Detailing.",
    "Step 1: Select Create 3D Part from the icon menu.",
    "Step 2: Select a single entity then Right Click",
    "Step 3: A window will appear showing the informations to fill-up.",
    "Step 4: All created 3D Part will appear on the tree view.",
    "Refer to the material description for notation and plate thickness standards."
  ];

  const changeSteps = [
    "CHANGE 3D PART NAME",
    "Tool use to change 3D part names, drawing names of external 3D parts, and comments.",
    "Step 1: Select Change 3D Part Name from the icon menu.",
    "Step 2: Select an entity or right-click on the 3D space.",
    "Step 3: A window will appear showing the informations to fill-up.",
    "Step 4: A dialog box will appear asking whether to change the 2D Part Name together with the 3D Part Name then Select Yes",
    "Note: All 3D Part Names and 2D part names must always match each other. Differences on the 3D and 2D part name will cut the link"
  ];
  const tabs = [
    { id: "create", label: "Create 3D Part" },
    { id: "change", label: "Change 3D Part Name" },
  ];

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "create") setActiveTab("change");
    else if (onNextLesson) onNextLesson();
    setTimeout(() => document.querySelector('.lesson-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "change") setActiveTab("create");
    else if (onPrevLesson) onPrevLesson();
    setTimeout(() => document.querySelector('.lesson-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  const introTitle = activeTab === 'create' ? 'Creating 3D Part' : 'Changing 3D Part Name';
  const introSubtitle = activeTab === 'create' ? "Tool use to name 3D parts and provide information." : "Tool use to Changes 3D part names, drawing names, and comments.";

  const commonIntroSteps = [
    introTitle,
    introSubtitle
  ];

  const createStepsTTS = [...commonIntroSteps, ...createSteps];
  const changeStepsTTS = [...commonIntroSteps, ...changeSteps];


  useEffect(() => {
    const steps = activeTab === 'create' ? createStepsTTS : changeStepsTTS;
    const startIdx = activeTab === 'create' ? 0 : 2;
    registerText(steps, startIdx);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'create' ? createStepsTTS : changeStepsTTS;
  const tabsList = [{ id: 'create' }, { id: 'change' }];
  const startIdx2 = activeTab === 'create' ? 0 : 2;

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
    currentTabSteps.length,
    tabsList,
    handleNext,
    speak,
    currentTabSteps,
    startIdx2
  );

  return (
    <div className={`course-lesson-container`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          <KaraokeLessonText
            as="span"
            text={introTitle}
            isActive={isSpeaking && currentIndex === 0}
            currentCharIndex={currentCharIndex}
          />

        </h3>
        <KaraokeLessonText
          className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
          data-reading-index="1"
          text={introSubtitle}
          isActive={isSpeaking && currentIndex === 1}
          currentCharIndex={currentCharIndex}
        />
        <div>
          <img
            src={activeTab === 'create' ? partMenu2 : partMenu2}
            alt={activeTab === 'create' ? "3D Part Menu" : "Change 3D Part Menu"}
            className="software-screenshot"
            style={{ height: 'auto', width: "200px" }}
          />
        </div>
      </section>

      <div className="lesson-grid single-card">
        <div className="fade-in">
          {activeTab === 'create' && (
            <div className="lesson-card tab-content">
              <div className="card-header">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CREATE 3D PART"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text="Tool use to name 3D parts and provide information. 3D part name must always be set since it is a vital part for the 2D Detailing."
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select Create 3D Part from the icon menu"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={createPartIcon} alt="Create 3D Part Icon" className="software-screenshot mt-4" style={{ height: 'auto', width: "200px" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select a single entity then Right Click"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                  <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', marginTop: '-2rem' }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="A window will appear showing the informations to fill-up"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={modalInfo1} alt="Create 3D Part Window" className="software-screenshot mt-4" style={{ marginBottom: '-2rem' }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="All created 3D Part will appear on the tree view"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={treeViewInfo1} alt="Tree View Status" className="software-screenshot mt-4" style={{ height: '300px' }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8">
                <div className="step-header">
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Refer to the material description for notation and plate thickness standards."
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description mt-4" style={{
                  padding: '1.5rem',
                  width: '900px',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  <h4 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem', textAlign: 'left' }}>Material Description</h4>
                  <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '1.5rem', color: '#d32f2f', textAlign: 'left' }}>
                    <li>*Use BATSU = &times;</li>
                    <li>*In cases of round-shaped materials, use FAI &phi;</li>
                  </ul>

                  <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold' }}>a.</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 150px', gap: '4px', marginLeft: '1.5rem' }}>
                      <div>S45C</div>
                      <div>&phi;40&times;150</div>
                      <div>SS400</div>
                      <div>19&times;100&times;380</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '3rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>b. JIS Shaped Material</div>
                      <table style={{ marginLeft: '1.5rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <tbody>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>C - Channel</td><td style={{ padding: '2px 12px 2px 0' }}>溝形鋼</td><td style={{ padding: '2px 0' }}>100&times;50&times;5-1000</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>H - Beam</td><td style={{ padding: '2px 12px 2px 0' }}>H形鋼</td><td style={{ padding: '2px 0' }}>100&times;100&times;5-1000</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>I - Beam</td><td style={{ padding: '2px 12px 2px 0' }}>I形鋼</td><td style={{ padding: '2px 0' }}>150&times;100&times;8-1000</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>Angle Bar</td><td style={{ padding: '2px 12px 2px 0' }}>山形鋼</td><td style={{ padding: '2px 0' }}>50&times;50&times;6-1000</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>Round Pipe</td><td style={{ padding: '2px 12px 2px 0' }}></td><td style={{ padding: '2px 0' }}>&phi;34&times;3.2-1000</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>Square Pipe</td><td style={{ padding: '2px 12px 2px 0' }}></td><td style={{ padding: '2px 0' }}>40&times;40&times;2.3-1000</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>Rectangular Pipe</td><td style={{ padding: '2px 12px 2px 0' }}></td><td style={{ padding: '2px 0' }}>75&times;45&times;3.2-1000</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>Square Bar</td><td style={{ padding: '2px 12px 2px 0' }}></td><td style={{ padding: '2px 0' }}>&#9633;25&times;500</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>Round Bar</td><td style={{ padding: '2px 12px 2px 0' }}></td><td style={{ padding: '2px 0' }}>&phi;30&times;500</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>Flat Bar</td><td style={{ padding: '2px 12px 2px 0' }}></td><td style={{ padding: '2px 0' }}>6&times;50&times;100</td></tr>
                          <tr><td style={{ padding: '2px 12px 2px 0' }}>Plate</td><td style={{ padding: '2px 12px 2px 0' }}></td><td style={{ padding: '2px 0' }}>9&times;55&times;320</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div style={{ alignSelf: 'flex-start', marginTop: '1.5rem' }}>
                      <table style={{ borderCollapse: 'collapse', textAlign: 'center', width: '300px', border: '2px solid currentColor' }}>
                        <thead>
                          <tr>
                            <th colSpan={4} style={{ borderBottom: '2px solid currentColor', padding: '8px', backgroundColor: 'rgba(128, 128, 128, 0.1)', fontWeight: 'bold' }}>
                              AVAILABLE PLATE THICKNESS<br />(JIS)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>2.3mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>12mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>28mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>45mm</td>
                          </tr>
                          <tr>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>3.2mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>16mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>32mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>50mm</td>
                          </tr>
                          <tr>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>4.5mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>19mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>36mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>63mm</td>
                          </tr>
                          <tr>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>6mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>22mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>38mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}></td>
                          </tr>
                          <tr>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>9mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>25mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}>40mm</td>
                            <td style={{ border: '1px solid currentColor', padding: '4px' }}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>c. Rubber</div>
                    <div style={{ marginLeft: '1.5rem', fontFamily: 'monospace', whiteSpace: 'pre', lineHeight: '1.2', fontSize: '0.9rem' }}>
                      <span>2 &times; &phi;17  ( Thickness &times; Size )</span><br />
                      <span style={{ color: '#d32f2f' }}>&#9474;   &#9492;&#9472;&#9472;&#9472; Size</span><br />
                      <span style={{ color: '#d32f2f' }}>&#9492;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472; Thickness</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={() => handleNext()}>Next <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {activeTab === 'change' && (
            <div className="lesson-card tab-content">
              <div className="card-header mt-8">
                <h4 className={`${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2">
                  <KaraokeLessonText
                    as="span"
                    text="CHANGE 3D PART NAME"
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </h4>
              </div>
              <KaraokeLessonText
                as="p"
                className={`p-flush ${currentIndex === 3 ? 'reading-active' : ''}`}
                style={{ marginTop: "-2rem" }}
                data-reading-index="3"
                text="Tool use to change 3D part names, drawing names of external 3D parts, and comments."
                isActive={isSpeaking && currentIndex === 3}
                currentCharIndex={currentCharIndex}
              />

              <div className={`instruction-step ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4">
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select Change 3D Part Name from the icon menu"
                    isActive={isSpeaking && currentIndex === 4}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={changePartIcon} alt="Change 3D Part Name Icon" className="software-screenshot mt-4" style={{ height: 'auto', width: "200px" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5">
                <div className="step-header" style={{ marginBottom: '-2rem' }}>
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Select an entity or right-click on the 3D space"
                    isActive={isSpeaking && currentIndex === 5}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6">
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="A window will appear showing the informations to fill-up"
                    isActive={isSpeaking && currentIndex === 6}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={modalInfo2} alt="Change Name Window" className="software-screenshot mt-4" style={{ width: '900px', marginBottom: "-2rem" }} />
                </div>
              </div>

              <div className={`instruction-step ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7">
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    style={{ marginTop: "2rem" }}
                    text="A dialog box will appear asking whether to change the 2D Part Name together with the 3D Part Name then Select Yes"
                    isActive={isSpeaking && currentIndex === 7}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
                <div className="step-description">
                  <img src={treeViewInfo2} alt="Dialog and Tree View Update" className="software-screenshot screenshot-wide mt-4" />
                </div>

                <div className={`instruction-box ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{ marginTop: "2rem" }}>
                  <KaraokeLessonText
                    as="p"
                    className="p-flush red-text"
                    text="Note: All 3D Part Names and 2D part names must always match each other. Differences on the 3D and 2D part name will cut the link"
                    isActive={isSpeaking && currentIndex === 8}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              <div className="lesson-navigation">
                <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> Previous</button>
                <button className="nav-button next" onClick={() => handleNext()}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartLesson;

