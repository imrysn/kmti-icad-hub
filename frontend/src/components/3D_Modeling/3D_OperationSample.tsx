import { useTranslation } from '../../context/LanguageContext';
/** * 3D_OperationSample.tsx  EOperation Sample lessons */

import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from 'react';
import { useLessonCore } from '../../hooks/useLessonCore';
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import '../../styles/3D_Modeling/CourseLesson.css';

/* Shared Assets */
import leftClick from '../../assets/3D_Image_File/left_click.png';
// press_q.png removed  Easset deleted in current HEAD
import booleanSubtractIcon from '../../assets/3D_Image_File/boolean1_subtract.png';
import centerTool from '../../assets/3D_Image_File/center_tool.png';

/* Operation Sample (1) Assets */
import createPartTool from '../../assets/3D_Image_File/3d_part1_create_3d_part.png';
import propertiesWindow from '../../assets/3D_Image_File/3d_properties.png';
import arrangeBoxTool from '../../assets/3D_Image_File/arrange_box_operation_sample1.png';
import chamferTool from '../../assets/3D_Image_File/chamfer_edge.png';
import chamferResult from '../../assets/3D_Image_File/chamfered.png';
import copyTool from '../../assets/3D_Image_File/component1_copy.png';
import moveTool from '../../assets/3D_Image_File/component1_move.png';
import copyResult from '../../assets/3D_Image_File/copy_component.png';
import enterPartName from '../../assets/3D_Image_File/enter_3d_part_name.png';
import filletTool from '../../assets/3D_Image_File/fillet_edge.png';
import filletResult from '../../assets/3D_Image_File/filleted.png';
import layerInfo from '../../assets/3D_Image_File/materials_layer.png';
import opSample1 from '../../assets/3D_Image_File/operation_sample1.png';
import opSample1Move from '../../assets/3D_Image_File/operation_sample11.png';
import mainDrawing from '../../assets/3D_Image_File/sample_3d_modeling_parts.png';
import machinePartTool from '../../assets/3D_Image_File/select_and_arrange_machine_part.png';
import subtractResult from '../../assets/3D_Image_File/subtract_operation_sample2.png';

/* Operation Sample (2-5) Assets */
// operation_sample_2.jpg removed  Easset deleted in current HEAD
import mainDrawing3 from '../../assets/3D_Image_File/operation_sample3.png';
import segmentOverview from '../../assets/3D_Image_File/operation_sample3_segment.png';
import segmentAResult from '../../assets/3D_Image_File/operation_sample3_segment_a.png';
import segmentBResult from '../../assets/3D_Image_File/operation_sample3_segment_b.png';
import keyGrooveBox from '../../assets/3D_Image_File/operation_sample4_4.png';
import revolveImg from '../../assets/3D_Image_File/operation_sample4_revolve.png';
import workPlaneImg from '../../assets/3D_Image_File/operation_sample4_work_plane.png';
import keyGrooveSubtractResult from '../../assets/3D_Image_File/operation_sample5_4_subtract_tool.png';
import finalPartFairing from '../../assets/3D_Image_File/operation_sample5_6.png';
import keyGrooveFilletResult from '../../assets/3D_Image_File/operation_sample_2.jpg';

interface OperationSampleLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const OperationSampleLesson: React.FC<OperationSampleLessonProps> = ({ subLessonId = 'op-sample-1', onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'sample1' | 'sample2'>(() => {
    return (localStorage.getItem(`${subLessonId}-tab`) as any) || 'sample1';
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    isSpeaking,
    currentIndex,
    registerText
  } = useLessonCore(subLessonId);

  useEffect(() => {
    localStorage.setItem(`${subLessonId}-tab`, activeTab);
  }, [activeTab, subLessonId]);

  const opSample1Steps = [
    t('operationsample.opSample2Steps.step0'),
    t('operationsample.opSample2Steps.step1'),
    t('operationsample.opSample1Steps.step2'),
    t('operationsample.opSample1Steps.step3'),
    t('operationsample.opSample1Steps.step4'),
    t('operationsample.opSample1Steps.step5'),
    t('operationsample.opSample1Steps.step6'),
    t('operationsample.opSample1Steps.step7'),
    t('operationsample.opSample1Steps.step8'),
    t('operationsample.opSample1Steps.step9'),
    t('operationsample.opSample1Steps.step10'),
    t('operationsample.opSample1Steps.step11'),
    t('operationsample.opSample1Steps.step12'),
    t('operationsample.opSample1Steps.step13')
  ];

  const opSample2Steps = [
    t('operationsample.opSample2Steps.step0'),
    t('operationsample.opSample2Steps.step1'),
    t('operationsample.opSample2Steps.step2'),
    t('operationsample.opSample2Steps.step3'),
    t('operationsample.opSample2Steps.step4'),
    t('operationsample.opSample2Steps.step5'),
    t('operationsample.opSample2Steps.step6'),
    t('operationsample.opSample2Steps.step7'),
    t('operationsample.opSample2Steps.step8'),
    t('operationsample.opSample2Steps.step9'),
    t('operationsample.opSample2Steps.step10')
  ];

  const handleNext = () => {
    if (activeTab === 'sample1') setActiveTab('sample2');
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === 'sample2') setActiveTab('sample1');
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepClass = (_stepId: string) => "instruction-step";


  useEffect(() => {
    const steps = activeTab === 'sample1' ? opSample1Steps : opSample2Steps;
    registerText(steps, 0);
  }, [activeTab, registerText]);

  const currentTabSteps = activeTab === 'sample1' ? opSample1Steps : opSample2Steps;
  const tabsList = [{ id: 'sample1' }, { id: 'sample2' }];

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
        <button className={`tab-button ${activeTab === 'sample1' ? 'active' : ''}`} onClick={() => setActiveTab('sample1')}>{t("operationsample.tab.sample1")}</button>
        <button className={`tab-button ${activeTab === 'sample2' ? 'active' : ''}`} onClick={() => setActiveTab('sample2')}>{t("operationsample.tab.sample2")}</button>
      </div>

      <section className="lesson-intro">
        <h3 className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`} data-reading-index="0">
          {activeTab === 'sample1' ? t('common.opsample.title1') :
           t('common.opsample.title2')}

        </h3>
        <p className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
          {t('common.opsample.subtitle')}
        </p>
        {activeTab === 'sample1' && (
            <img src={mainDrawing} alt={t('common.bracket_technical_drawing')} className="software-screenshot mt-4" style={{ width: "900px", height: "auto" }} />
        )}
        {activeTab === 'sample2' && (
            <img src={keyGrooveFilletResult} alt={t('common.shaft_technical_drawing')} className="software-screenshot mt-4" style={{ width: "900px", height: "auto" }} />
        )}
      </section>

      <div className="lesson-grid single-card">
        {activeTab === 'sample1' && (
          <div className="lesson-card tab-content fade-in">
            <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{ marginBottom: "2rem" }}>
              <h4>{t('common.opsample.procedure')}</h4>
            </div>

            {/* Step 1 */}
            <div className={`${getStepClass('s1-1')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">{t('common.opsample.step1_1')}</span>
              </div>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_2')}</p>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_3')}</p>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_4')}</p>
              <p className="p-flush red-text" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_5')}</p>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_6')}</p>
            </div>

            {/* Step 2 */}
            <div className={`${getStepClass('s1-2')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{marginTop: "-3rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">2 </span>
                <span className="step-label">{t('common.opsample.step2_1')}</span>
              </div>
              <div className="flex-row-wrap" style={{ gap: '2rem' }}>
                <div>
                  <img src={arrangeBoxTool} alt={t('common.arrange_box_tool')} className="software-screenshot mt-4 mb-4" style={{ height: '300px' }} />
                  <div style={{ marginTop: "-7rem"}}>
                  <p className="p-flush">{t('common.opsample.step2_2')}</p>
                  <p className="p-flush" style={{ paddingLeft: '3.7rem' }}>{t('common.opsample.step2_3')}</p>
                  <p className="p-flush" style={{ paddingLeft: '3.7rem' }}>{t('common.opsample.step2_4')}</p>
                  <p className="p-flush" style={{ paddingLeft: '3.7rem' }}>{t('common.opsample.step2_5')}</p>
                </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`${getStepClass('s1-3')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{marginTop: "-2rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">3</span>
                <span className="step-label">{t('common.opsample.step3_1')}</span>
              </div>
              <div>
                  <img src={machinePartTool} alt={t('common.machine_part_tool')} className="software-screenshot mt-4 mb-4" style={{ width: '900px' }} />
              </div>
            </div>

            {/* Step 4 */}
            <div className={`${getStepClass('s1-4')} ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{marginTop: "-2rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">4</span>
                <span className="step-label">{t('common.opsample.step4_1')}</span>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <p className="p-flush">{t("common.opsample.step4_2")} <strong className="text-highlight">無変換 + Q</strong> {t("common.opsample.step4_3")}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <p className="p-flush">{t('common.opsample.step4_4')} </p>
                  <img src={centerTool} alt={t('common.center_tool')} style={{ height: '20px', margin: '0 0.5rem' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <p className="p-flush">{t('common.opsample.step4_5')} </p>
                  <img src={leftClick} alt={t('common.left_click_1')} style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                  <img src={opSample1} alt={t('common.placed_hole')} className="software-screenshot mt-4" style={{ height: '300px' }} />
              </div>
            </div>

            {/* Step 5 */}
            <div className={`${getStepClass('s1-5')} ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7" style={{marginTop: "-2rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">5</span>
                <span className="step-label">{t('common.opsample.step5_1')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                <div>
                  <img src={moveTool} alt={t('common.move_tool')} className="software-screenshot mt-4 mb-4" style={{ height: '120px' }} />
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <p className="p-flush">{t('common.opsample.step5_2')} </p>
                    <img src={leftClick} alt={t('common.left_click_1')} style={{ height: '30px', margin: '0 0.5rem' }} />
                  </div>
                  <p className="p-flush">{t('common.opsample.step5_3')}</p>
                  <p className="p-flush" style={{ paddingLeft: '4rem' }}>{t('common.opsample.step5_4')}</p>
                  <p className="p-flush" style={{ paddingLeft: '4rem' }}>{t('common.opsample.step5_5')}</p>
                </div>
                <img src={opSample1Move} alt={t('common.move_hole')} className="software-screenshot mt-8" style={{ width: '120px', height: 'auto' }} />
              </div>
            </div>

            {/* Step 6 */}
            <div className={`${getStepClass('s1-6')} ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">6</span>
                <span className="step-label">{t('common.opsample.step6_1')}</span>
              </div>
              <div>
                <p className="p-flush">{t('common.opsample.step2_1')}</p>
                <p className="p-flush">{t('common.opsample.step2_2')}</p>
                <p className="p-flush" style={{ paddingLeft: '3.9rem' }}>{t('common.opsample.step6_2')}</p>
                <p className="p-flush" style={{ paddingLeft: '3.9rem' }}>{t('common.opsample.step6_3')}</p>
                <p className="p-flush mt-4">{t('common.opsample.step6_4')}</p>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '-1rem' }}>
                    <p className="p-flush">{t('common.opsample.step6_5')} </p>
                      <img src={booleanSubtractIcon} alt={t('common.subtract_tool')} className="software-screenshot mt-4" style={{ height: '80px', padding: '0.2rem', marginTop: "4rem" }} />
                  </div>
                <img src={subtractResult} alt={t('common.subtract_result')} className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            {/* Step 7 */}
            <div className={`${getStepClass('s1-7')} ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">7</span>
                <span className="step-label">{t('common.opsample.step7_1')}</span>
              </div>
              <div>
                  <img src={filletTool} alt={t('common.fillet_tool')} className="software-screenshot mt-4 mb-4" style={{ height: '150px', marginBottom: "1rem" }} />
                <p className="p-flush">{t('common.opsample.step7_2')}</p>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <p className="p-flush">{t('common.opsample.step7_3')} </p>
                  <img src={leftClick} alt={t('common.left_click_1')} style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                <img src={filletResult} alt={t('common.fillet_result')} className="software-screenshot mt-4" style={{ width: '900px', marginTop: "1rem" }} />
              </div>
            </div>

            {/* Step 8 */}
            <div className={`${getStepClass('s1-8')} ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">8</span>
                <span className="step-label">{t('common.opsample.step8_1')}</span>
              </div>
              <div>
                  <img src={copyTool} alt={t('common.copy_tool')} className="software-screenshot mt-4 mb-4" style={{ height: '100px', marginBottom: "1rem" }} />
                  <img src={copyResult} alt={t('common.copy_result')} className="software-screenshot mt-4 mb-4" style={{ width: '900px'}} />
              </div>
            </div>

            {/* Step 9 */}
            <div className={`${getStepClass('s1-9')} ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">9</span>
                <span className="step-label">{t('common.opsample.step9_1')}</span>
              </div>
              <div>
                  <img src={chamferTool} alt={t('common.chamfer_tool')} className="software-screenshot mt-4 mb-4" style={{ height: '100px', marginBottom: "1rem" }} />
                <p className="p-flush">{t('common.opsample.step9_2')}</p>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <p className="p-flush">{t('common.opsample.step9_3')} </p>
                  <img src={leftClick} alt={t('common.left_click_1')} style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                <img src={chamferResult} alt={t('common.chamfer_result')} className="software-screenshot mt-4" style={{ height: '300px', marginTop: "1rem" }} />
              </div>
            </div>

            {/* Step 10 */}
            <div className={`${getStepClass('s1-10')} ${currentIndex === 12 ? 'reading-active' : ''}`} data-reading-index="12" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">10</span>
                <span className="step-label">{t('common.opsample.step10_1')}</span>
              </div>
              <div>
                  <img src={createPartTool} alt={t('common.create_part_tool')} className="software-screenshot mt-4 mb-4" style={{ height: '100px', marginBottom: "1rem" }} />
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <p className="p-flush">{t('common.opsample.step10_2')} </p>
                  <img src={leftClick} alt={t('common.left_click_1')} style={{ height: '30px', margin: '0 0.5rem' }} />
                </div>
                <p className="p-flush">{t('common.opsample.step10_3')}</p>
                <img src={enterPartName} alt={t('common.enter_part_name')} className="software-screenshot mt-4" style={{ width: '300px', marginTop: "1rem"   }} />
              </div>
            </div>

            {/* Step 11 */}
            <div className={`${getStepClass('s1-11')} ${currentIndex === 13 ? 'reading-active' : ''}`} data-reading-index="13" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">11</span>
                <span className="step-label">{t('common.opsample.step11_1')}</span>
              </div>
              <div>
                  <img src={propertiesWindow} alt={t('common.properties_window')} className="software-screenshot mt-4" style={{ width: '900px' }} />
              </div>
            </div>

            {/* Step 12 */}
            <div className={`${getStepClass('s1-12')} ${currentIndex === 14 ? 'reading-active' : ''}`} data-reading-index="14" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">12</span>
                <span className="step-label">{t('common.opsample.step12_1')}</span>
              </div>
              <div>
                    <img src={layerInfo} alt={t('common.layer_information')} className="software-screenshot mt-4" style={{ width: "900px" }} />
              </div>
            </div>

            {/* Step 13 */}
            <div className={`${getStepClass('s1-13')} ${currentIndex === 15 ? 'reading-active' : ''}`} data-reading-index="15"  style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">13</span>
                <span className="step-label">{t('common.opsample.step13_1')}</span>
              </div>
              <div>
                <p className="p-flush">{t('common.opsample.step13_2')}</p>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'sample2' && (
          <div className="lesson-card tab-content fade-in">
            <div className={`card-header ${currentIndex === 2 ? 'reading-active' : ''}`} data-reading-index="2" style={{ marginBottom: "2rem" }}>
              <h4>{t('common.opsample.procedure')}</h4>
            </div>

            {/* Step 1 */}
            <div className={`${getStepClass('s2-1')} ${currentIndex === 3 ? 'reading-active' : ''}`} data-reading-index="3" style={{marginBottom: "-3rem", marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">{t('common.opsample.step1_1')}</span>
              </div>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_2')}</p>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_3')}</p>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_4b')}</p>
              <p className="p-flush red-text" style={{ marginTop: "-1rem" }}>{t('common.opsample.step1_5b')}</p>
            </div>

            {/* Step 2 */}
            <div className={`${getStepClass('s2-2')} ${currentIndex === 4 ? 'reading-active' : ''}`} data-reading-index="4" style={{marginTop: "-3rem"}}>
              <div className="step-header" style={{ marginBottom: "1rem" }}>
                <span className="step-number">2</span>
                <span className="step-label" style={{marginTop: "2rem"}}>{t('common.opsample.t2_1')}</span>
              </div>
              <img src={segmentOverview} alt={t('common.segment_overview')} className="software-screenshot mt-4" style={{ width: "900px", height: "auto" }} />

              {/* Segments A and B */}
              <div className="flex-row-wrap mt-8" style={{ gap: '2rem', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ flex: "1", marginBottom: "3rem"}}>
                  <p className="p-flush" style={{ marginBottom: "1rem" }}><u>{t('common.opsample.t2_sega')}</u></p>
                  <p className="p-flush red-text" style={{ marginTop: "1rem" }}>{t('common.opsample.t2_use_cyl')}</p>
                  <p className="p-flush" style={{ marginTop: "0rem" }}>{t('common.opsample.t2_cyl_union')}</p>
                  <p className="p-flush" style={{ marginTop: "0rem" }}>Cylinder 1: Diameter = 20mm    Height= 3.65mm    {t('common.opsample.step2_5')}</p>
                  <p className="p-flush" style={{ marginTop: "0rem" }}>{t('common.opsample.t2_cyl2')}</p>
                  <p className="p-flush" style={{ marginTop: "0rem" }}>{t('common.opsample.t2_cyl3')}</p>
                  <img src={segmentAResult} alt={t('common.segment_a')} className="software-screenshot mt-4" style={{ width: "900px", height: "auto", marginTop: "1rem"}} />
                </div>
                <div style={{ flex: 1 }}>
                  <p className="p-flush" style={{ marginBottom: "1rem" }}><u>{t('common.opsample.t2_segb')}</u></p>
                  <p className="p-flush red-text" style={{ marginTop: "-1rem" }}>{t('common.opsample.t2_use_cyl')}</p>
                  <p className="p-flush">{t('common.opsample.t2_b_d')}</p>
                  <p className="p-flush">{t('common.opsample.t2_b_h')}</p>
                  <p className="p-flush">{t('common.opsample.t2_b_center')}</p>
                  <img src={segmentBResult} alt={t('common.segment_b')} className="software-screenshot mt-4" style={{ width: "500px", height: "auto", marginTop: "1rem", marginBottom: "2rem"}} />
                </div>
              </div>

              {/* Segment C */}
              <div className="mt-8">
                <p className="p-flush" style={{ marginBottom: "1rem" }}><u>{t('common.opsample.t2_segc')}</u></p>
                <p className="p-flush">{t('common.opsample.t2_c_desc')}</p>
                <img src={mainDrawing3} alt={t('common.segment_c_technical_drawing')} className="software-screenshot mt-4" style={{ width: "900px", height: "400px", marginTop: "1rem", marginBottom: "2rem" }}  />

                <img src={workPlaneImg} alt={t('common.work_plane')} className="software-screenshot mt-4" style={{ width: "900px", marginBottom: "2rem" }} />

                  <img src={revolveImg} alt={t('common.revolve_result')} className="software-screenshot mt-4" style={{ width: "900px", marginTop: "2rem" }} />

              </div>
            </div>

            {/* Step 3 */}
            <div className={`${getStepClass('s2-3')} ${currentIndex === 5 ? 'reading-active' : ''}`} data-reading-index="5" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">{t("common.opsample.t2_join")} <span className="red-text">{t("common.opsample.t2_union")}</span></span>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`${getStepClass('s2-4')} ${currentIndex === 6 ? 'reading-active' : ''}`} data-reading-index="6" style={{ marginTop: "-2rem" }}>
              <div className="step-header">
                <span className="step-number">4</span>
                <span className="step-label">{t('common.opsample.t2_key_groove')}</span>
              </div>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.t2_tool_entity')}</p>
                <img src={keyGrooveBox} alt={t('common.key_groove_box')} className="software-screenshot mt-4" style={{ width: "900px" }} />
            </div>

            {/* Step 5 */}
            <div className={`${getStepClass('s2-5')} ${currentIndex === 7 ? 'reading-active' : ''}`} data-reading-index="7"  style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">5</span>
                <span className="step-label">{t('common.opsample.t2_subtract')}</span>
              </div>
              <div className="flex-row-wrap mt-4" style={{ gap: '2rem', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ flex: 1 }}>
                    <img src={keyGrooveSubtractResult} alt={t('common.key_groove_subtract')} className="software-screenshot mt-4" style={{ width: "900px" }} />
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className={`${getStepClass('s2-6')} ${currentIndex === 8 ? 'reading-active' : ''}`} data-reading-index="8" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">6</span>
                <span className="step-label">{t('common.opsample.t2_fairing')}</span>
              </div>
                <img src={finalPartFairing} alt={t('common.final_part')} className="software-screenshot mt-4" style={{ width: "900px" }} />
            </div>

            {/* Step 7 */}
            <div className={`${getStepClass('s2-7')} ${currentIndex === 9 ? 'reading-active' : ''}`} data-reading-index="9" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">7</span>
                <span className="step-label">{t('common.opsample.step10_1')}</span>
              </div>
            </div>

            {/* Step 8 */}
            <div className={`${getStepClass('s2-8')} ${currentIndex === 10 ? 'reading-active' : ''}`} data-reading-index="10" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">8</span>
                <span className="step-label">{t('common.opsample.step11_1')}</span>
              </div>
            </div>

            {/* Step 9 */}
            <div className={`${getStepClass('s2-9')} ${currentIndex === 11 ? 'reading-active' : ''}`} data-reading-index="11" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">9</span>
                <span className="step-label">{t('common.opsample.step12_1')}</span>
              </div>
            </div>

            {/* Step 10 */}
            <div className={`${getStepClass('s2-10')} ${currentIndex === 12 ? 'reading-active' : ''}`} data-reading-index="12" style={{marginTop: "-2rem"}}>
              <div className="step-header">
                <span className="step-number">10</span>
                <span className="step-label">{t('common.opsample.step13_1')}</span>
              </div>
              <p className="p-flush" style={{ marginTop: "-1rem" }}>{t('common.opsample.step13_2')}</p>
            </div>
          </div>
        )}

        <div className="lesson-navigation">
          <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> {t('common.previous')}</button>
          <button className="nav-button next" onClick={handleNext}>
            {activeTab === 'sample2' ? (nextLabel || t('common.next')) : t('common.next')} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationSampleLesson;

