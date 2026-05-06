import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Properties (1) Assets */
import changeColorIcon from "../../assets/3D_Image_File/change_color.png";
import changeColorEntity from "../../assets/3D_Image_File/change_color_entity.png";
import changeColorFace from "../../assets/3D_Image_File/change_color_face.png";
import changeLayerIcon from "../../assets/3D_Image_File/change_layer.png";
import itemEntryChangeLayer from "../../assets/3D_Image_File/item_entry_changelayer.png";
import propertiesColorImg from "../../assets/3D_Image_File/properties_color.png";
import layer1Img from "../../assets/3D_Image_File/layer1.png";
import layer2Img from "../../assets/3D_Image_File/layer2.png";
import layer3Img from "../../assets/3D_Image_File/layer3.png";
import acrylicPointerImg from "../../assets/3D_Image_File/acrylic_pointer.png";
import propertiesMaterialImg from "../../assets/3D_Image_File/properties_material.png";
import isoniteManganeseImg from "../../assets/3D_Image_File/isonite_manganese.png";
import leftClick from "../../assets/3D_Image_File/left_click.png";

/* Properties (2) Assets */
import information1 from "../../assets/3D_Image_File/information1.png";
import information2 from "../../assets/3D_Image_File/information2.png";
import information3 from "../../assets/3D_Image_File/information3.png";
import information4 from "../../assets/3D_Image_File/information4.png";
import information5 from "../../assets/3D_Image_File/information5.png";
import infoPointImg from "../../assets/3D_Image_File/properties2_information_point.png";
import infoEdgeImg from "../../assets/3D_Image_File/properties2_information_point_edge.png";
import infoPointEdgeImg from "../../assets/3D_Image_File/properties2_information_point_edgeq.jpg";
import infoAngleImg from "../../assets/3D_Image_File/properties2_information_angle.png";
import infoEntityImg from "../../assets/3D_Image_File/properties2_information_entity.png";
import layerImg from "../../assets/3D_Image_File/layer.jpg";

interface PropertiesLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PropertiesLesson: React.FC<PropertiesLessonProps> = ({ subLessonId = "properties-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const [activeTab, setActiveTab] = useState<"color" | "layer" | "info">(() => {
    return (localStorage.getItem('properties-tab') as any) || "color";
  });

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('properties-tab', activeTab);
  }, [activeTab]);

  const colorSteps = [
    "CHANGE COLOR",
    "Step 1: Select Change Color from the icon menu",
    "Step 2: Choose either Entity or Face",
    "Entity. The entire solid entity will change its color.",
    "Pick a color then select the solid entity",
    "Face. Only selected faces or surfaces will change its color",
    "Pick a color then select surface to be changed then GO"
  ];

  const layerSteps = [
    "CHANGE LAYER",
    "Step 1: Select Change Layer from the icon menu.",
    "Step 2: Specify the layer on the item entry.",
    "Step 3: Click on the solid entity.",
    "Layer Designations: Layer 1 is for All common parts need to be fabricated or machined. Parts that undergo Annealing, Shot blasting, or Annealing Shot blasting.Covers for purchase parts (No mechanism). All parts must be color White (No. 1). Layer 2 is for Fabricated/Machined parts with specific color/paint. Safety Covers - Yellow (No. 4). Layer 3 is for Purchase Parts (including stud bolts). Purchase Parts with Additional Process Use manufacturer standard colors.."
  ];

  const infoSteps = [
    "INFORMATION",
    "Displays technical data about clicked entities (coordinates, length, distance, angle, and entity information).",
    "Displays coordinates of a point from the origin then Pick a point",
    "Measures the length of an edge then Pick an edge then GO",
    "Measures the distance between two points or edges then Pick first point/edge then Pick second point/edge",
    "Measures the angle between two edges or three points then Pick 2 edges then Pick 3 Points",
    "Displays the informations about the selected entity then Pick the solid entity then GO"
  ];

  const handleNext = () => {
    if (activeTab === "color") setActiveTab("layer");
    else if (activeTab === "layer") setActiveTab("info");
    else if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (activeTab === "info") setActiveTab("layer");
    else if (activeTab === "layer") setActiveTab("color");
    else if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepClass = (stepId: string) => "instruction-step";

  const tabs = [
    { id: "color", label: "Change Color" },
    { id: "layer", label: "Change Layer" },
    { id: "info", label: "Information" },
  ];



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
            onClick={() => setActiveTab(tab.id as any)} 
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
                  text="CHANGE COLOR"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(colorSteps)} onStop={stop} />
            </div>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className={`${getStepClass("color-1")} ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">1 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Select Change Color from the icon menu"
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={changeColorIcon} alt="Change Color Icon" className="software-screenshot" height="150" width="150" />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass("color-2")} ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <div className="step-header" style={{ marginBottom: "2rem", alignItems: 'flex-start' }}>
                    <span className="step-number">2 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Choose either Entity or Face"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>

                  <div className="tool-block mt-8">
                    <div className={`card-header ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                      <h4>
                        <KaraokeLessonText
                          as="span"
                          text="> Entity"
                          isActive={isSpeaking && currentIndex === 3}
                          currentCharIndex={currentCharIndex}
                        />
                      </h4>
                    </div>
                    <div className={`step-description ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ marginTop: "1rem" }}>
                      <KaraokeLessonText
                        as="p"
                        className="p-flush"
                        text="The entire solid entity will change its color."
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className={`step-description ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ marginBottom: "2rem" }}>
                      <KaraokeLessonText
                        as="p"
                        className="p-flush"
                        text="Pick a color > Select the solid entity"
                        isActive={isSpeaking && currentIndex === 5}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="card-header" style={{ marginLeft: "6rem", marginBottom: "1rem" }}><h4>CHANGE COLOR (ENTITY)</h4></div>
                    <div className="screenshot-wrapper mt-4">
                      <img src={changeColorEntity} alt="Change Color Entity" className="software-screenshot" style={{ height: 'auto', width: '500px' }} />
                    </div>
                  </div>

                  <div className="tool-block mt-8">
                    <div className={`card-header ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6">
                      <h4>
                        <KaraokeLessonText
                          as="span"
                          text="> Face"
                          isActive={isSpeaking && currentIndex === 6}
                          currentCharIndex={currentCharIndex}
                        />
                      </h4>
                    </div>
                    <div className={`step-description ${currentIndex === 7 ? "reading-active" : ""}`} data-reading-index="7" style={{ marginTop: "1rem" }}>
                      <KaraokeLessonText
                        as="p"
                        className="p-flush"
                        text="Only selected faces/surfaces will change its color"
                        isActive={isSpeaking && currentIndex === 7}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className={`step-description ${currentIndex === 8 ? "reading-active" : ""}`} data-reading-index="8" style={{ marginBottom: "2rem" }}>
                      <p className="p-flush">
                        <KaraokeLessonText
                          as="span"
                          text="Pick a color > Select surface to be changed > GO"
                          isActive={isSpeaking && currentIndex === 8}
                          currentCharIndex={currentCharIndex}
                        />
                        <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 20px' }} />
                      </p>
                    </div>
                    <div className="card-header" style={{ marginLeft: "6rem", marginBottom: "1rem" }}><h4>CHANGE COLOR (FACE)</h4></div>
                    <div className="screenshot-wrapper mt-4">
                      <img src={changeColorFace} alt="Change Color Face" className="software-screenshot" style={{ height: 'auto', width: '500px' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="screenshot-wrapper" style={{ flex: '0 0 auto', position: 'sticky', top: '5rem', marginTop: '2rem', padding: '15px', borderRadius: '12px' }}>
                <img src={propertiesColorImg} alt="Change Color Properties Dialog" className="software-screenshot" style={{ height: "400px", width: "auto" }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "layer" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4 className={`${currentIndex === 0 ? 'reading-active' : ''}`} data-reading-index="0">
                <KaraokeLessonText
                  as="span"
                  text="CHANGE LAYER"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(layerSteps)} onStop={stop} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className={`${getStepClass("layer-1")} ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1" style={{ marginBottom: "1rem" }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">1 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Select Change Layer from the icon menu."
                      isActive={isSpeaking && currentIndex === 1}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={changeLayerIcon} alt="Change Layer Icon" className="software-screenshot" style={{ height: '180px', width: '180px' }} />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass("layer-2")} ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2">
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">2 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Specify the layer on the item entry."
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={itemEntryChangeLayer} alt="Change Layer Item Entry" className="software-screenshot" style={{ width: '400px', height: 'auto' }} />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass("layer-3")} ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">3 </span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Click on the solid entity."
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                </div>
              </div>

              <div className="screenshot-wrapper" style={{ flex: '0 0 auto',top: '5rem', marginTop: '1rem', padding: '0px' }}>
                <img src={layerImg} alt="Change Layer Properties Dialog" className="software-screenshot" style={{ height: "250px", width: "auto", marginTop: "3rem" }} />
              </div>
            </div>
              <div className="card-header" style={{marginTop: "1rem"}}><h4>LAYER DESIGNATION OF 3D PARTS</h4></div>
              <div className="card-header"><h4>LAYER 1</h4></div>
              <div className="step-description" style={{marginTop: "-2.5rem"}}>
                <ul className="list-flush">
                  <li>All common parts need to be fabricated or machined.</li>
                  <li>Parts that undergo <strong className="text-highlight">Annealing</strong>, <strong className="text-highlight">Shot blasting</strong>, or <strong className="text-highlight">Annealing Shot blasting</strong>.</li>
                  <li>Covers for purchase parts (No mechanism).</li>
                  <li>All parts must be color <strong className="text-highlight">White (No. 1)</strong>.</li>
                </ul>
                <div className="screenshot-wrapper mt-4">
                  <img src={layer1Img} alt="Layer 1 White Parts" className="software-screenshot" style={{ width: '900px' }} />
                </div>
              </div>

            <div className="tool-block mt-8">
              <div className="card-header"><h4>LAYER 2</h4></div>
              <div className="step-description">
                <ul className="list-flush">
                  <li>Fabricated/Machined parts with specific color/paint.</li>
                  <li>Safety Covers - <strong className="text-highlight">Yellow (No. 4)</strong>.</li>
                </ul>
                <div className="screenshot-wrapper mt-4">
                  <img src={layer2Img} alt="Layer 2 Yellow Parts" className="software-screenshot" style={{ width: '900px', marginBottom: "1rem" }} />
                </div>
                <p className="p-flush">
                  Safety color applies to covers for machine guarding such as chain, belt and gear drive power transmission systems.
                </p>

                <ul className="list-flush" style={{ marginTop: "4rem" }}>
                  <li>Parts that do not need to be painted.</li>
                  <li>All Stainless Steel (SUS) - <strong className="text-highlight">White (No. 1)</strong>.</li>
                  <li>Acrylic - <strong className="text-highlight">White (No. 1)</strong>.</li>
                </ul>
                <div className="screenshot-wrapper mt-4" style={{ position: 'relative' }}>
                  <img src={acrylicPointerImg} alt="Acrylic and Pointer" className="software-screenshot" style={{ maxWidth: '600px', height: 'auto', marginBottom: "4rem" }} />
                  <p className="red-text" style={{
                    position: 'absolute',
                    bottom: '3rem',
                    right: '-2rem',
                    fontWeight: 700,
                    margin: 0
                  }}>*Red paint only on the pointer</p>
                </div>

                  

                <div className="section-divider"></div>

                <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', marginTop: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <p className="p-flush">Materials with color codes on the material list:</p>
                    <p className="p-flush" style={{ fontWeight: '700' }}>Examples:</p>
                    <ul className="list-flush">
                      <li>MC Nylon - <strong className="text-highlight">Blue (No. 5)</strong></li>
                      <li>Urethane - <strong className="text-highlight">(No. 18)</strong></li>
                      <li>Rubber - <strong className="text-highlight">Black (No. 16)</strong></li>
                      <li>New Light - <strong className="text-highlight">White (No. 1)</strong></li>
                    </ul>
                  </div>
                  <div className="screenshot-wrapper" style={{ flex: '0 0 auto', margin: 0 }}>
                    <img src={propertiesMaterialImg} alt="Material List Color Codes" className="software-screenshot" style={{ height: "auto", width: "480px" }} />
                  </div>
                </div>

                <div className="section-divider" style={{ marginTop: '4rem' }}></div>

                <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', marginTop: '2rem' }}>
                  <div style={{ flex: 1 }}>
                    <ul className="list-flush" style={{ margin: 0 }}>
                      <li>Fabricated/Machined parts with <strong className="text-highlight" style={{ color: "var(--accent-red)" }}>Heat Treatment</strong>.</li>
                      <li>Preheat/heated surface coating parts - <strong className="text-highlight">White (No. 1)</strong>.</li>
                      <li>Isonite, Ionite, Parsonite - <strong className="text-highlight">Gray (No. 8)</strong>.</li>
                      <li>Parkerizing, Manganese Phosphate - <strong className="text-highlight">Black (No. 16)</strong>.</li>
                    </ul>
                  </div>
                  <div className="screenshot-wrapper" style={{ flex: '0 0 auto', margin: 0 }}>
                    <img src={isoniteManganeseImg} alt="Heat Treated Parts" className="software-screenshot" style={{ height: 'auto', width: '310px' }} />
                  </div>
                </div>
               
              </div>
            </div>

            <div className="tool-block mt-8">
              <div className="card-header"><h4>LAYER 3</h4></div>
              <div className="step-description">
                <ul className="list-flush">
                  <li>Purchase Parts (including stud bolts).</li>
                  <li>Purchase Parts with Additional Process</li>
                  <li>Use manufacturer standard colors.</li>
                </ul>
                <div className="screenshot-wrapper mt-4">
                  <img src={layer3Img} alt="Layer 3 Purchase Parts" className="software-screenshot screenshot-wide" />
                </div>
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
                  text="INFORMATION"
                  isActive={isSpeaking && currentIndex === 0}
                  currentCharIndex={currentCharIndex}
                />
              </h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(infoSteps)} onStop={stop} />
            </div>
            <KaraokeLessonText
              as="p"
              className={`p-flush ${currentIndex === 1 ? 'reading-active' : ''}`}
              style={{ marginTop: "-2rem" }}
              data-reading-index="1"
              text="Displays technical data about clicked entities (coordinates, length, distance, angle, and entity information)."
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Coordinates */}
                <div className={`${getStepClass("info-1")} ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information1} alt="Coord icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text="Displays coordinates of a point from the origin > Pick a point"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoPointImg} alt="Coordinates" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Length */}
                <div className={`${getStepClass("info-2")} ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information2} alt="Length icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text="Measures the length of an edge > Pick an edge > GO"
                      isActive={isSpeaking && currentIndex === 3}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoEdgeImg} alt="Length" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Distance */}
                <div className={`${getStepClass("info-3")} ${currentIndex === 4 ? "reading-active" : ""}`} data-reading-index="4" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information3} alt="Distance icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text="Measures the distance between two points or edges > Pick first point/edge > Pick second point/edge"
                      isActive={isSpeaking && currentIndex === 4}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoPointEdgeImg} alt="Distance" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Angle */}
                <div className={`${getStepClass("info-4")} ${currentIndex === 5 ? "reading-active" : ""}`} data-reading-index="5" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information4} alt="Angle icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text="Measures the angle between two edges or three points > Pick 2 edges > Pick 3 Points "
                      isActive={isSpeaking && currentIndex === 5}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoAngleImg} alt="Angle" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Entity Info */}
                <div className={`${getStepClass("info-5")} ${currentIndex === 6 ? "reading-active" : ""}`} data-reading-index="6" style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information5} alt="Entity icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <KaraokeLessonText
                      as="div"
                      className="step-label"
                      style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}
                      text="Displays the informations about the selected entity > Pick the solid entity > GO"
                      isActive={isSpeaking && currentIndex === 6}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoEntityImg} alt="Entity Info" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="lesson-navigation">
          <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
          <button className="nav-button next" onClick={handleNext}>
            {activeTab === "info" ? (nextLabel || 'Next Lesson') : 'Next'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesLesson;

