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

interface PropertiesLessonProps {
  nextLabel?: string; subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void;
} const PropertiesLesson: React.FC<PropertiesLessonProps> = ({ subLessonId = "properties-1", onNextLesson, onPrevLesson, nextLabel }) => {
  const isProperties1 = subLessonId === "properties-1";
  const [activeTab, setActiveTab] = useState<"color" | "layer">(() => {
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

  const getStepClass = (stepId: string) => "instruction-step"; const handleNext = () => { if (isProperties1) { if (activeTab === "color") setActiveTab("layer"); else if (onNextLesson) onNextLesson(); } else { if (onNextLesson) onNextLesson(); } }; const handlePrev = () => { if (isProperties1) { if (activeTab === "layer") setActiveTab("color"); else if (onPrevLesson) onPrevLesson(); } else { if (onPrevLesson) onPrevLesson(); } }; return (
    <div className="course-lesson-container" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {isProperties1 && (
        <div className="lesson-tabs">
          {" "}
          <button className={`tab-button ${activeTab === "color" ? "active" : ""}`} onClick={() => setActiveTab("color")} >
            {" "}
            Change Color{" "}
          </button>{" "}
          <button className={`tab-button ${activeTab === "layer" ? "active" : ""}`} onClick={() => setActiveTab("layer")} >
            {" "}
            Change Layer{" "}
          </button>
        </div>
      )}

      <section className="lesson-intro">
        <h3 className="section-title">
          Properties
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (!isProperties1) speak(infoSteps);
            else if (activeTab === "color") speak(colorSteps);
            else speak(layerSteps);
          }} onStop={stop} />
        </h3>{" "}
        {!isProperties1 && (
          <p className="p-flush">
            {" "}
            Displays the information about the clicked entities (coordinates, length, distance, angle, and entity information)
          </p>
        )}{" "}
        {isProperties1 && activeTab === "color" && (
          <div className="instruction-box">
            <div className="screenshot-wrapper mt-4">
              <img src={propertiesColorImg} alt="Change Color Properties Dialog" className="software-screenshot screenshot-small" />
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        {isProperties1 ? (
          <>
            {activeTab === "color" && (
              <div className="lesson-card tab-content fade-in">
                <div className="card-header">
                  <h4>CHANGE COLOR</h4>
                  <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(colorSteps)} onStop={stop} />
                </div>

                <div className={`${getStepClass("color-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1 </span>
                    <span className="step-label">Select <strong className="text-highlight">Change Color</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={changeColorIcon} alt="Change Color Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={`${getStepClass("color-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2 </span>
                    <span className="step-label">Select either <strong className="text-highlight">Entity</strong> or <strong className="text-highlight">Face</strong>.</span>
                  </div>

                  <div className="tool-block mt-8">
                    <div className="card-header"><h4>COLOR BY ENTITY</h4></div>
                    <div className="step-description">
                      <p className="p-flush">Pick a color &gt; Select the solid entity. The <strong className="text-highlight">entire solid</strong> will change color.</p>
                      <div className="screenshot-wrapper mt-4">
                        <img src={changeColorEntity} alt="Change Color Entity" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
                  </div>

                  <div className="tool-block mt-8">
                    <div className="card-header"><h4>COLOR BY FACE</h4></div>
                    <div className="step-description">
                      <p className="p-flush">Pick a color &gt; Select specific surfaces &gt; <strong className="text-highlight">GO</strong>
                        <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '32px', margin: '0 4px' }} />
                      </p>
                      <div className="screenshot-wrapper mt-4">
                        <img src={changeColorFace} alt="Change Color Face" className="software-screenshot screenshot-medium" />
                      </div>
                    </div>
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

                <div className={`${getStepClass("layer-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">1 </span>
                    <span className="step-label">Select <strong className="text-highlight">Change Layer</strong> from the icon menu.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={changeLayerIcon} alt="Change Layer Icon" className="software-screenshot screenshot-small" />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className={`${getStepClass("layer-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                  <div className="step-header">
                    <span className="step-number">2 </span>
                    <span className="step-label">Specify the <strong className="text-highlight">target layer</strong> on the item entry.</span>
                  </div>
                  <div className="step-description">
                    <div className="screenshot-wrapper">
                      <img src={itemEntryChangeLayer} alt="Change Layer Item Entry" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                <div className="tool-block">
                  <div className="card-header"><h4>LAYER 1: COMMON PARTS</h4></div>
                  <div className="step-description">
                    <ul className="list-flush">
                      <li>Fabricated/Machined parts and Annealed parts.</li>
                      <li>Standard machine color is <strong className="text-highlight">WHITE</strong>.</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={layer1Img} alt="Layer 1 White Parts" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>

                <div className="tool-block mt-8">
                  <div className="card-header"><h4>LAYER 2: PAINTED PARTS</h4></div>
                  <div className="step-description">
                    <ul className="list-flush">
                      <li>Safety covers and guards (Safety Yellow - No. 4).</li>
                      <li>Materials with specific color codes (MC Nylon, Urethane, etc.).</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={layer2Img} alt="Layer 2 Yellow Parts" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>

                <div className="tool-block mt-8">
                  <div className="card-header"><h4>LAYER 3: PURCHASE PARTS</h4></div>
                  <div className="step-description">
                    <ul className="list-flush">
                      <li>Motors, Encoders, Chain & Sprockets, Bolts.</li>
                      <li>Use manufacturer standard colors.</li>
                    </ul>
                    <div className="screenshot-wrapper mt-4">
                      <img src={layer3Img} alt="Layer 3 Purchase Parts" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>

                <div className="lesson-navigation">
                  <button className="nav-button" onClick={handlePrev}><ChevronLeft size={18} /> Previous</button>
                  <button className="nav-button next" onClick={handleNext}>{nextLabel || 'Next Lesson'} <ChevronRight size={18} /></button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="lesson-card tab-content fade-in">
            <div className="card-header">
              <h4>INFORMATION TOOLS</h4>
              <ReadAloudButton isSpeaking={isSpeaking} onStart={() => speak(infoSteps)} onStop={stop} />
            </div>

            <div className="tool-block">
              <div className={`${getStepClass("info-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <span className="step-label">Coordinates: Pick a point to see position from origin.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={infoPointImg} alt="Information Point Coordinates" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("info-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <span className="step-label">Length: Pick an edge &gt; <strong className="text-highlight">GO</strong> to measure.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={infoEdgeImg} alt="Information Edge Length" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("info-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">3 </span>
                  <span className="step-label">Distance: Pick two entities to measure the gap.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={infoPointEdgeImg} alt="Information Distance" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("info-4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">4 </span>
                  <span className="step-label">Angle: Pick 2 edges or 3 points to calculate angle.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={infoAngleImg} alt="Information Angle" className="software-screenshot screenshot-medium" />
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className={`${getStepClass("info-5")} ${currentIndex === 4 ? "reading-active" : ""}`}>
                <div className="step-header">
                  <span className="step-number">5 </span>
                  <span className="step-label">Entity Info: Pick a solid &gt; <strong className="text-highlight">GO</strong> for full details.</span>
                </div>
                <div className="step-description">
                  <div className="screenshot-wrapper">
                    <img src={infoEntityImg} alt="Information Entity" className="software-screenshot screenshot-medium" />
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



