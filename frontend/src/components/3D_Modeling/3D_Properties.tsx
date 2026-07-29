import { useTranslation } from '../../context/LanguageContext';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React,{ useEffect,useState } from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../hooks/useTTSAutoplay";
import "../../styles/3D_Modeling/CourseLesson.css";
import { KaraokeLessonText } from "../KaraokeLessonText";

/* Properties (1) Assets */
import acrylicPointerImg from "../../assets/3D_Image_File/acrylic_pointer.png";
import changeColorIcon from "../../assets/3D_Image_File/change_color.png";
import changeColorEntity from "../../assets/3D_Image_File/change_color_entity.png";
import changeColorFace from "../../assets/3D_Image_File/change_color_face.png";
import changeLayerIcon from "../../assets/3D_Image_File/change_layer.png";
import isoniteManganeseImg from "../../assets/3D_Image_File/isonite_manganese.png";
import itemEntryChangeLayer from "../../assets/3D_Image_File/item_entry_changelayer.png";
import layer1Img from "../../assets/3D_Image_File/layer1.png";
import layer2Img from "../../assets/3D_Image_File/layer2.png";
import layer3Img from "../../assets/3D_Image_File/layer3.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";
import propertiesColorImg from "../../assets/3D_Image_File/properties_color.png";
import propertiesMaterialImg from "../../assets/3D_Image_File/properties_material.png";

/* Properties (2) Assets */
import information1 from "../../assets/3D_Image_File/information1.png";
import information2 from "../../assets/3D_Image_File/information2.png";
import information3 from "../../assets/3D_Image_File/information3.png";
import information4 from "../../assets/3D_Image_File/information4.png";
import information5 from "../../assets/3D_Image_File/information5.png";
import layerImg from "../../assets/3D_Image_File/layer.jpg";
import infoAngleImg from "../../assets/3D_Image_File/properties2_information_angle.png";
import infoEntityImg from "../../assets/3D_Image_File/properties2_information_entity.png";
import infoPointImg from "../../assets/3D_Image_File/properties2_information_point.png";
import infoEdgeImg from "../../assets/3D_Image_File/properties2_information_point_edge.png";
import infoPointEdgeImg from "../../assets/3D_Image_File/properties2_information_point_edgeq.jpg";

interface PropertiesLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PropertiesLesson: React.FC<PropertiesLessonProps> = ({ subLessonId = "properties-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"color" | "layer" | "info">(() => {
    return (localStorage.getItem('properties-tab') as any) || "color";
  });

  useEffect(() => {
    localStorage.setItem('properties-tab', activeTab);
  }, [activeTab]);

  const colorSteps = [
    t('properties.colorSteps.step0'),
    t('properties.colorSteps.step1'),
    t('properties.colorSteps.step2'),
    t('properties.colorSteps.step3'),
    t('properties.colorSteps.step4'),
    t('properties.colorSteps.step5'),
    t('properties.colorSteps.step6')
  ];

  const layerSteps = [
    t('properties.layerSteps.step0'),
    t('properties.layerSteps.step1'),
    t('properties.layerSteps.step2'),
    t('properties.layerSteps.step3'),
    t('properties.layerSteps.step4')
  ];

  const infoSteps = [
    t('properties.infoSteps.step0'),
    t('properties.infoSteps.step1'),
    t('properties.infoSteps.step2'),
    t('properties.infoSteps.step3'),
    t('properties.infoSteps.step4'),
    t('properties.infoSteps.step5'),
    t('properties.infoSteps.step6')
  ];

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

  const handleNext = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "color") setActiveTab("layer");
    else if (activeTab === "layer") setActiveTab("info");
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (isAuto = false) => {
    stop();
    if (!isAuto) {
      sessionStorage.setItem('tts-autoplay-active', 'false');
    }
    if (activeTab === "info") setActiveTab("layer");
    else if (activeTab === "layer") setActiveTab("color");
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepClass = (_stepId: string) => "instruction-step";

  const tabs = [
    { id: "color", label: t("properties.colorSteps.step0") },
    { id: "layer", label: t("properties.layerSteps.step0") },
    { id: "info", label: t("properties.infoSteps.step0") },
  ];

  const currentTabSteps = activeTab === "color" ? colorSteps :
                          activeTab === "layer" ? layerSteps : infoSteps;

  useEffect(() => {
    registerText(currentTabSteps, 0);
  }, [activeTab, registerText]);

  const tabsList = [{ id: 'color' }, { id: 'layer' }, { id: 'info' }];

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
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => { stop(); sessionStorage.setItem('tts-autoplay-active', 'false'); setActiveTab(tab.id as any); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        {activeTab === "color" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text={t('properties.colorSteps.step0')}
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className={`${getStepClass("color-1")} ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">1 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('properties.colorSteps.step1')}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={changeColorIcon} alt={t('common.change_color_icon')} className="software-screenshot mt-4" height="150" width="150" />
                  </div>
                </div>

                <div className={`${getStepClass("color-2")} ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <div className="step-header" style={{ marginBottom: "2rem", alignItems: 'flex-start' }}>
                    <span className="step-number">2 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('properties.colorSteps.step2')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>

                  <div className="tool-block mt-8">
                    <div className={`card-header ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                      <h4>
                        <KaraokeLessonText
                          as="span"
                          text={t('properties.colorSteps.step2')}
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </h4>
                    </div>
                    <div className={`step-description ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginTop: "1rem" }}>
                      <KaraokeLessonText
                        as="p"
                        className="p-flush"
                        text={t('properties.colorSteps.step3')}
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className={`step-description ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom: "2rem" }}>
                      <KaraokeLessonText
                        as="p"
                        className="p-flush"
                        text={t('properties.colorSteps.step4')}
                        isActive={isSpeaking && currentIndex === 5}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="card-header" style={{ marginBottom: "1rem" }}><h4>{t('common.properties.color_entity')}</h4></div>
                    <img src={changeColorEntity} alt={t('common.change_color_entity')} className="software-screenshot mt-4" style={{ height: 'auto', width: '500px' }} />
                  </div>

                  <div className="tool-block mt-8">
                    <div className={`card-header ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                      <h4>
                        <KaraokeLessonText
                          as="span"
                          text={t('common.face')}
                          isActive={isSpeaking && currentIndex === 6}
                          currentCharIndex={currentCharIndex}
                        />
                      </h4>
                    </div>
                    <div className={`step-description ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: "1rem" }}>
                      <KaraokeLessonText
                        as="p"
                        className="p-flush"
                        text={t('properties.colorSteps.step5')}
                        isActive={isSpeaking && currentIndex === 7}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className={`step-description ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{ marginBottom: "2rem" }}>
                      <p className="p-flush">
                        <KaraokeLessonText
                          as="span"
                          text={t('properties.colorSteps.step6')}
                          isActive={isSpeaking && currentIndex === 8}
                          currentCharIndex={currentCharIndex}
                        />
                        <img src={leftClick} alt={t('common.left_click')} className="screenshot-click--inline" style={{ width: '40px', margin: '0 20px' }} />
                      </p>
                    </div>
                    <div className="card-header" style={{ marginBottom: "1rem" }}><h4>{t('common.properties.color_face')}</h4></div>
                    <img src={changeColorFace} alt={t('common.change_color_face')} className="software-screenshot mt-4" style={{ height: 'auto', width: '500px' }} />
                  </div>
                </div>
              </div>

              <img src={propertiesColorImg} alt={t('common.change_color_properties_dialog')} className="software-screenshot mt-8" style={{ height: "400px", width: "auto" }} />
            </div>
          </div>
        )}

        {activeTab === "layer" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text={t('properties.layerSteps.step0')}
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className={`${getStepClass("layer-1")} ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginBottom: "1rem" }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">1 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('properties.layerSteps.step1')}
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={changeLayerIcon} alt={t('common.change_layer_icon')} className="software-screenshot mt-4" style={{ height: '180px', width: '180px' }} />
                  </div>
                </div>

                <div className={`${getStepClass("layer-2")} ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">2 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('properties.layerSteps.step2')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <img src={itemEntryChangeLayer} alt={t('common.change_layer_item_entry')} className="software-screenshot mt-4" style={{ width: '400px', height: 'auto' }} />
                  </div>
                </div>

                <div className={`${getStepClass("layer-3")} ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">3 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text={t('properties.layerSteps.step3')}
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                </div>
              </div>

              <img src={layerImg} alt={t('common.change_layer_properties_dialog')} className="software-screenshot mt-4" style={{ height: "250px", width: "auto", marginTop: "3rem" }} />
            </div>
            <div className="card-header" style={{ marginTop: "1rem" }}><h4>{t('common.properties.layer_designation')}</h4></div>
            <div className="card-header"><h4>{t('common.properties.layer1')}</h4></div>
            <div className="step-description" style={{ marginTop: "-2.5rem" }}>
              <ul className="list-flush">
                <li>{t('properties.layer1.desc1')}</li>
                <li>{t("properties.layer1.desc2")} <strong className="text-highlight">{t("properties.layer1.desc2_1")}</strong>, <strong className="text-highlight">{t("properties.layer1.desc2_2")}</strong>, {t("properties.layer1.desc2_3")} <strong className="text-highlight">{t("properties.layer1.desc2_4")}</strong>.</li>
                <li>{t('properties.layer1.desc3')}</li>
                <li>{t("properties.layer1.desc4")} <strong className="text-highlight">{t("properties.color.white1")}</strong>.</li>
              </ul>
              <img src={layer1Img} alt={t('common.layer_1_white_parts')} className="software-screenshot mt-4" style={{ width: '900px' }} />
            </div>

            <div className="tool-block mt-8">
              <div className="card-header"><h4>{t('common.properties.layer2')}</h4></div>
              <div className="step-description">
                <ul className="list-flush">
                  <li>{t('properties.layer2.desc1')}</li>
                  <li>{t("properties.layer2.desc2")} <strong className="text-highlight">{t("properties.color.yellow4")}</strong>.</li>
                </ul>
                <img src={layer2Img} alt={t('common.layer_2_yellow_parts')} className="software-screenshot mt-4" style={{ width: '900px', marginBottom: "1rem" }} />
                <p className="p-flush">
                  {t("properties.layer2.desc3")}
                </p>

                <ul className="list-flush" style={{ marginTop: "4rem" }}>
                  <li>{t('properties.layer2.desc4')}</li>
                  <li>{t("properties.layer2.desc5")} <strong className="text-highlight">{t("properties.color.white1")}</strong>.</li>
                  <li>{t("properties.layer2.desc6")} <strong className="text-highlight">{t("properties.color.white1")}</strong>.</li>
                </ul>
                <img src={acrylicPointerImg} alt={t('common.acrylic_and_pointer')} className="software-screenshot mt-4" style={{ maxWidth: '600px', height: 'auto', marginBottom: "4rem" }} />
                <p className="red-text" style={{
                  position: 'absolute',
                  bottom: '90rem',
                  right: '4rem',
                  fontWeight: 700,
                  margin: 0
                }}>{t("properties.layer2.desc7")}</p>




                <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', marginTop: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <p className="p-flush">{t("properties.layer2.desc8")}</p>
                    <p className="p-flush" style={{ fontWeight: '700' }}>{t("properties.layer2.desc9")}</p>
                    <ul className="list-flush">
                      <li>{t("properties.layer2.desc10")} <strong className="text-highlight">{t("properties.color.blue5")}</strong></li>
                      <li>{t("properties.layer2.desc11")} <strong className="text-highlight">{t("properties.color.no18")}</strong></li>
                      <li>{t("properties.layer2.desc12")} <strong className="text-highlight">{t("properties.color.black16")}</strong></li>
                      <li>{t("properties.layer2.desc13")} <strong className="text-highlight">{t("properties.color.white1")}</strong></li>
                    </ul>
                  </div>
                  <img src={propertiesMaterialImg} alt={t('common.material_list_color_codes')} className="software-screenshot mt-4" style={{ height: "auto", width: "480px" }} />
                </div>


                <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', marginTop: '2rem' }}>
                  <div style={{ flex: 1 }}>
                    <ul className="list-flush" style={{ margin: 0 }}>
                      <li>{t("properties.layer2.desc14")} <strong className="text-highlight" style={{ color: "var(--accent-red)" }}>{t("properties.layer2.desc15")}</strong>.</li>
                      <li>{t("properties.layer2.desc16")} <strong className="text-highlight">{t("properties.color.white1")}</strong>.</li>
                      <li>{t("properties.layer2.desc17")} <strong className="text-highlight">{t("properties.color.gray8")}</strong>.</li>
                      <li>{t("properties.layer2.desc18")} <strong className="text-highlight">{t("properties.color.black16")}</strong>.</li>
                    </ul>
                  </div>
                  <img src={isoniteManganeseImg} alt={t('common.heat_treated_parts')} className="software-screenshot mt-4" style={{ height: 'auto', width: '310px' }} />
                </div>

              </div>
            </div>

            <div className="tool-block mt-8">
              <div className="card-header"><h4>{t('common.properties.layer3')}</h4></div>
              <div className="step-description">
                <ul className="list-flush">
                  <li>{t("properties.layer3.desc1")}</li>
                  <li>{t("properties.layer3.desc2")}</li>
                  <li>{t("properties.layer3.desc3")}</li>
                </ul>
                <img src={layer3Img} alt={t('common.layer_3_purchase_parts')} className="software-screenshot mt-4 screenshot-wide" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text={t('properties.infoSteps.step0')}
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 1 ? 'reading-active' : ''}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="1"
              text={t('properties.infoSteps.step1')}
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Coordinates */}
                <div className={`${getStepClass("info-1")} ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information1} alt={t('common.coord_icon')} style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text={t('properties.infoSteps.step2')}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <img src={infoPointImg} alt={t('common.coordinates')} className="software-screenshot mt-4" style={{ width: '100%', background: 'white', padding: '10px', borderRadius: '8px' }} />
                </div>

                {/* Length */}
                <div className={`${getStepClass("info-2")} ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information2} alt={t('common.length_icon')} style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text={t('properties.infoSteps.step3')}
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <img src={infoEdgeImg} alt={t('common.length')} className="software-screenshot mt-4" style={{ width: '100%', background: 'white', padding: '10px', borderRadius: '8px' }} />
                </div>

                {/* Distance */}
                <div className={`${getStepClass("info-3")} ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information3} alt={t('common.distance_icon')} style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text={t('properties.infoSteps.step4')}
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <img src={infoPointEdgeImg} alt={t('common.distance')} className="software-screenshot mt-4" style={{ width: '100%', background: 'white', padding: '10px', borderRadius: '8px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Angle */}
                <div className={`${getStepClass("info-4")} ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information4} alt={t('common.angle_icon')} style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text={t('properties.infoSteps.step5')}
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <img src={infoAngleImg} alt={t('common.angle')} className="software-screenshot mt-4" style={{ width: '100%', background: 'white', padding: '10px', borderRadius: '8px' }} />
                </div>

                {/* Entity Info */}
                <div className={`${getStepClass("info-5")} ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information5} alt={t('common.entity_icon')} style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text={t('properties.infoSteps.step6')}
                      isActive={isSpeaking && currentIndex === 6}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <img src={infoEntityImg} alt={t('common.entity_info')} className="software-screenshot mt-4" style={{ width: '100%', background: 'white', padding: '10px', borderRadius: '8px' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="lesson-navigation">
          <button className="nav-button" onClick={() => handlePrev()}><ChevronLeft size={18} /> {t('common.previous')}</button>
          <button className="nav-button next" onClick={() => handleNext()}>
            {activeTab === "info" ? (nextLabel || t('common.next')) : t('common.next')} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesLesson;

