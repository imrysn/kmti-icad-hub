/** * 3D_Properties.tsx  EProperties lessons */

import React, { useState, useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Sliders,
  Space,
  Zap
} from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";
import { ReadAloudButton } from "../ReadAloudButton";
import "../../styles/3D_Modeling/CourseLesson.css";

/* Properties (1) Assets */
import changeColorIcon from "../../assets/3D_Image_File/change_color.png";
import changePropertiesWindow from "../../assets/3D_Image_File/change_properties_window.png";
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

/* Properties (2) Additional Assets */
import infoPointImg from "../../assets/3D_Image_File/properties2_information_point.png";
import infoEdgeImg from "../../assets/3D_Image_File/properties2_information_point_edge.png";
import infoPointEdgeImg from "../../assets/3D_Image_File/properties2_information_point_edge.png";
import infoAngleImg from "../../assets/3D_Image_File/properties2_information_angle.png";
import infoEntityImg from "../../assets/3D_Image_File/properties2_information_entity.png";
import propertiesLayerImg from "../../assets/3D_Image_File/changelayer.jpg";

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

  // Use core hook for scroll tracking and TTS
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('properties-tab', activeTab);
  }, [activeTab]);

  const colorSteps = ["Step 1: Select Change Color from the icon menu.", "Step 2: Choose either Entity or Face. For Entity, pick a color and select the solid to change everything. For Face, pick a color and select specific surfaces, then click GO."];
  const layerSteps = ["Step 1: Select Change Layer from the icon menu.", "Step 2: Specify the target layer number on the item entry.", "Step 3: Click on the solid entity to move it to that layer.", "Layer Designations: Layer 1 is for common white parts. Layer 2 is for painted or safety-yellow parts. Layer 3 is for purchase parts like bolts."];
  const infoSteps = ["Step 1: Coordinates. Pick a point to display its position from the origin.", "Step 2: Length. Pick an edge and click GO to measure it.", "Step 3: Distance. Pick two points or edges to measure the gap between them.", "Step 4: Angle. Pick two edges or three points to calculate the angle.", "Step 5: Entity Info. Pick a solid and click GO to see all technical information."];

  const getStepClass = (stepId: string) => "instruction-step"; 

  const handleNext = () => { 
    if (activeTab === "color") setActiveTab("layer"); 
    else if (activeTab === "layer") setActiveTab("info");
    else if (onNextLesson) onNextLesson(); 
  }; 

  const handlePrev = () => { 
    if (activeTab === "info") setActiveTab("layer");
    else if (activeTab === "layer") setActiveTab("color"); 
    else if (onPrevLesson) onPrevLesson(); 
  }; 

  const tabs = [
    { id: "color", label: "Change Color" },
    { id: "layer", label: "Change Layer" },
    { id: "info", label: "Information" },
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {/* Sticky Progress Bar */}
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
              <h4>CHANGE COLOR</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(colorSteps)} onStop={stop} />
            </div>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className={`${getStepClass("color-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number">1 </span>
                    <span className="step-label">Select <strong className="red-text">Change Color</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={changeColorIcon} alt="Change Color Icon" className="software-screenshot" height="150" width="150" />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass("color-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header" style={{ marginBottom: "2rem", alignItems: 'flex-start' }}>
                    <span className="step-number">2 </span>
                    <span className="step-label">Select either <strong className="red-text">Entity</strong> or <strong className="red-text">Face</strong></span>
                  </div>

                  <div className="tool-block mt-8">
                    <div className="card-header"><h4>&gt; Entity </h4></div>
                    <div className="step-description" style={{ marginTop: "1rem" }}>
                      <span className="p-flush">The entire solid entity will change its color.</span>
                    </div>
                    <div className="step-description" style={{ marginBottom: "2rem" }}>
                      <span className="p-flush">Pick a color &gt; Select the solid entity</span>
                    </div>
                    <div className="card-header" style={{ marginLeft: "6rem", marginBottom: "1rem" }}><h4>CHANGE COLOR (ENTITY)</h4></div>
                    <div className="screenshot-wrapper mt-4">
                      <img src={changeColorEntity} alt="Change Color Entity" className="software-screenshot" style={{ height: 'auto', width: '500px' }} />
                    </div>
                  </div>

                  <div className="tool-block mt-8">
                    <div className="card-header"><h4>&gt; Face </h4></div>
                    <div className="step-description" style={{ marginTop: "1rem" }}>
                      <span className="p-flush">Only <strong className="text-highlight">selected faces/surfaces</strong> will change its color</span>
                    </div>
                    <div className="step-description" style={{ marginBottom: "2rem" }}>
                      <span className="p-flush">Pick a color &gt; Select surface to be changed &gt; GO
                        <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '40px', margin: '0 20px' }} />
                      </span>
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

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === "layer" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>CHANGE LAYER</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(layerSteps)} onStop={stop} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className={`${getStepClass("layer-1")} ${currentIndex === 0 ? "reading-active" : ""}`} style={{ marginBottom: "1rem" }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number" style={{ marginTop: '0.25rem' }}>1 </span>
                    <span className="step-label" style={{ marginTop: "0.5rem" }}>Select <strong className="red-text">Change Layer</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={changeLayerIcon} alt="Change Layer Icon" className="software-screenshot" style={{ height: '180px', width: '180px' }} />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass("layer-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number" style={{ marginTop: '0.25rem' }}>2 </span>
                    <span className="step-label" style={{ marginTop: "0.5rem" }}>Specify the layer on the item entry.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={itemEntryChangeLayer} alt="Change Layer Item Entry" className="software-screenshot" style={{ width: '400px', height: 'auto' }} />
                    </div>
                  </div>
                </div>

                <div className={`${getStepClass("layer-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <span className="step-number" style={{ marginTop: '0.25rem' }}>3 </span>
                    <span className="step-label" style={{ marginTop: "0.5rem" }}>Click on the solid entity</span>
                  </div>
                </div>
              </div>

              <div className="screenshot-wrapper" style={{ flex: '0 0 auto', position: 'sticky', top: '5rem', marginTop: '2rem', padding: '15px', borderRadius: '12px' }}>
                <img src={propertiesLayerImg} alt="Change Layer Properties Dialog" className="software-screenshot" style={{ height: "290px", width: "auto", marginTop: "1rem" }} />
              </div>
            </div>

            <div className="section-divider"></div>

            <div className="tool-block">
              <div className="card-header" style={{ marginBottom: "2rem" }}><h4>LAYER DESIGNATION OF 3D PARTS</h4></div>
              <div className="card-header"><h4>LAYER 1</h4></div>
              <div className="step-description">
                <ul className="list-flush">
                  <li>All common parts need to be fabricated or machined.</li>
                  <li>Parts that undergo <strong className="text-highlight">Annealing</strong>, <strong className="text-highlight">Shot blasting</strong>, <strong className="text-highlight">Annealing Shot blasting</strong></li>
                  <li>Covers for purchase parts (No mechanism)</li>
                  <li>All parts must be color white</li>
                </ul>
                <div className="screenshot-wrapper mt-4">
                  <img src={layer1Img} alt="Layer 1 White Parts" className="software-screenshot" style={{ width: '900px' }} />
                </div>
              </div>
            </div>

            <div className="tool-block mt-8">
              <div className="card-header"><h4>LAYER 2</h4></div>
              <div className="step-description">
                <ul className="list-flush">
                  <li>Fabricated parts/Machined parts with color/paint</li>
                  <li>Safety Cover - <strong className="text-highlight">Yellow (No. 4)</strong></li>
                </ul>
                <div className="screenshot-wrapper mt-4">
                  <img src={layer2Img} alt="Layer 2 Yellow Parts" className="software-screenshot" style={{ width: '900px', marginBottom: "1rem" }} />
                </div>
                <span className="p-flush">
                  Safety color applies to covers for machine guarding such as chain, belt and gear drive power transmission system.
                </span>

                <ul className="list-flush" style={{ marginTop: "4rem" }}>
                  <li>Parts that does not need to be painted</li>
                  <li>All Stainless Steel (SUS) - <strong className="text-highlight">White (No. 1)</strong></li>
                  <li>Acrylic - white (No.1)</li>
                </ul>
                <div className="screenshot-wrapper mt-4" >
                  <img src={acrylicPointerImg} alt="Acrylic and Pointer" className="software-screenshot" style={{ maxWidth: '600px', height: 'auto', marginBottom: "1rem" }} />
                  <p className="red-text" style={{
                    position: 'absolute',
                    top: '115rem',
                    left: '42rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    margin: 0
                  }}>*Red paint only on the pointer</p>
                </div>

                <div className="card-header" style={{ marginLeft: "2.5rem", marginBottom: "5rem" }}><h4>ACRYLIC</h4> <h4 style={{ marginLeft: "14rem" }}>POINTER</h4></div>

                <div className="section-divider"></div>

                <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', marginTop: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <span className="p-flush"> Materials with Color codes on the material list</span>
                    <div><span className="p-flush" style={{ fontWeight: '700' }}>Examples:</span></div>

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
                      <li>Fabricated parts/Machined parts with <strong className="text-highlight" style={{ color: "red" }}>Heat Treatment</strong></li>
                      <li>Preheat/ heated surface coating part - <strong className="text-highlight">white (No. 1)</strong></li>
                      <li>Isonite, Ionite, Parsonite - <strong className="text-highlight">Gray (No. 8)</strong></li>
                      <li>Parkerizing, Manganese Phosphate - <strong className="text-highlight">Black (No. 16)</strong></li>
                    </ul>
                  </div>

                  <div className="screenshot-wrapper" style={{ flex: '0 0 auto', margin: 0 }}>
                    <img src={isoniteManganeseImg} alt="Heat Treated Parts" className="software-screenshot" style={{ height: 'auto', width: '400px' }} />
                  </div>
                </div>

                <div className="card-header"><span style={{ marginLeft: "36rem", fontWeight: '700' }}>ISONITE</span> <span style={{ marginLeft: "8.5rem", fontWeight: '700', marginTop: "1rem" }}>MANGANESE PHOSPHATE</span></div>
              </div>
            </div>

            <div className="tool-block mt-8">
              <div className="card-header"><h4>LAYER 3</h4></div>
              <div className="step-description">
                <ul className="list-flush">
                  <li>Purchase Parts (Include stud bolt)</li>
                  <li>Purchase Parts with Additional Process</li>
                  <li>Use manufacturer standard color</li>
                </ul>
                <div className="screenshot-wrapper mt-4">
                  <img src={layer3Img} alt="Layer 3 Purchase Parts" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>INFORMATION TOOLS</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(infoSteps)} onStop={stop} />
            </div>
            <p className='p-flush' style={{ marginTop: "-2rem" }}>Displays information about the clicked entities (coordinates, length, distance, angle, and entity information)</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '1rem' }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Coordinates */}
                <div className={`${getStepClass("info-1")} ${currentIndex === 0 ? "reading-active" : ""}`} style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information1} alt="Coord icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <div className="step-label" style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}>
                      Displays coordinates of a point from the origin <br />
                      <span className="text-highlight">&gt; Pick a point</span>
                    </div>
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoPointImg} alt="Coordinates" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Length */}
                <div className={`${getStepClass("info-2")} ${currentIndex === 1 ? "reading-active" : ""}`} style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information2} alt="Length icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <div className="step-label" style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}>
                      Measures the length of an edge <br />
                      <span className="text-highlight">&gt; Pick an edge &gt; GO</span> <img src={leftClick} alt="click" style={{ width: '28px', verticalAlign: 'middle', marginLeft: '4px' }} />
                    </div>
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoEdgeImg} alt="Length" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Distance */}
                <div className={`${getStepClass("info-3")} ${currentIndex === 2 ? "reading-active" : ""}`} style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information3} alt="Distance icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <div className="step-label" style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}>
                      Measures the distance between two points or edges <br />
                      <span className="text-highlight">&gt; Pick first point/edge &gt; Pick second point/edge</span>
                    </div>
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoPointEdgeImg} alt="Distance" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Angle */}
                <div className={`${getStepClass("info-4")} ${currentIndex === 3 ? "reading-active" : ""}`} style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information4} alt="Angle icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <div className="step-label" style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}>
                      Measures the angle between two edges or three points <br />
                      <span className="text-highlight">&gt; Pick 2 edges</span> <br />
                      <span className="text-highlight">&gt; Pick 3 points</span>
                    </div>
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoAngleImg} alt="Angle" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Entity Info */}
                <div className={`${getStepClass("info-5")} ${currentIndex === 4 ? "reading-active" : ""}`} style={{ padding: 0 }}>
                  <div className="step-header" style={{ alignItems: 'flex-start' }}>
                    <img src={information5} alt="Entity icon" style={{ width: '42px', marginTop: '0.25rem' }} />
                    <div className="step-label" style={{ fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' }}>
                      Displays the informations about the selected entity <br />
                      <span className="text-highlight">&gt; Pick the solid entity &gt; GO</span> <img src={leftClick} alt="click" style={{ width: '28px', verticalAlign: 'middle', marginLeft: '4px' }} />
                    </div>
                  </div>
                  <div className="screenshot-wrapper" style={{ marginTop: '1.5rem', background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <img src={infoEntityImg} alt="Entity Info" className="software-screenshot" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="lesson-navigation">
              <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
              <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesLesson;
