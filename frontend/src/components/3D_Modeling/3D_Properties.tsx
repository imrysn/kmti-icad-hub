/** * 3D_Properties.tsx  EProperties lessons */

import React, { useState, useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Sliders,
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
  const [activeTab, setActiveTab] = useState<"color" | "layer">("color");

  // Use core hook for scroll tracking and TTS
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex
  } = useLessonCore(`${subLessonId}-${activeTab}`);

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
            <div>
              <img src={propertiesColorImg} alt="Change Color Properties Dialog" className="software-screenshot screenshot-small" />
            </div>
          </div>
        )}
      </section>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {isProperties1 ? (
            <>
              {" "}
              {activeTab === "color" && (
                <div className="tab-pane fade-in">
                  <h3 className="section-title" style={{ marginRight: "725px" }}>Change color</h3>
                  <div className={`${getStepClass("color-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                    <div className="step-header">
                      {" "}
                      <span className="step-number"> 1 </span>{" "}
                      <span className="step-label">
                        Select{" "}
                        <strong className="text-highlight">Change Color</strong>{" "}
                        from the icon menu.
                      </span>
                    </div>

                    <div className="flex-row-center--wrap">
                      <img src={changeColorIcon} alt="Change Color Icon" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                    </div>
                  </div>

                  <div className={`${getStepClass("color-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                    <div className="step-header">
                      {" "}
                      <span className="step-number">

                        2
                      </span>{" "}
                      <span className="step-label">
                        Select either{" "}
                        <strong className="text-highlight">Entity</strong> or{" "}
                        <strong className="text-highlight">Face</strong>
                      </span>
                    </div>

                    <div className="tool-block">
                      <div className="flex-row-wrap">
                        <div className="flex-1">
                          {" "}
                          <h4 className="section-title" style={{ marginRight: "810px" }}>Entity</h4>
                          <div className="step-header">
                            {" "}
                            <span className="step-label">
                              Pick a color &gt; Select the solid entity
                            </span>
                          </div>
                          <div className="step-description">
                            <p className="p-flush">
                              The entire solid entity will change its color.
                            </p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <br />

                          <span style={{ fontSize: '1.5rem', marginLeft: "10rem" }}>CHANGE COLOR (ENTITY):</span>
                          <img src={changeColorEntity} alt="Change Color Entity" className="software-screenshot screenshot-medium" style={{ width: ' 600px', marginTop: '10px' }} />


                        </div>
                      </div>
                      <div className="flex-row-center--wrap" style={{ gap: '2rem', marginTop: '3rem' }}>
                        <div className="flex-1" style={{ minWidth: '300px' }}>
                          <h4 className="section-title" style={{ marginRight: "830px" }}>Face</h4>
                          <div className="step-header">
                            <span className="step-label">
                              Pick a color &gt; Select surface to be changed &gt; <strong className="text-highlight">GO</strong>
                              <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ height: '24px', verticalAlign: 'middle', margin: '0 4px' }} />
                            </span>
                          </div>
                          <div className="step-description">
                            <p className="p-flush">Only selected faces/surfaces will change its color.</p>
                          </div>
                        </div>
                        <div className="flex-1" style={{ minWidth: '300px' }}>
                          <p className="text-center" style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>CHANGE COLOR (FACE):</p>
                          <img src={changeColorFace} alt="Change Color Face" className="software-screenshot screenshot-medium" style={{ maxWidth: '600px', height: 'auto' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}{" "}
              {activeTab === "layer" && (
                <div className="tab-pane fade-in">
                  <h3 className="section-title" style={{ marginRight: "730px" }}>Change layer</h3>

                  <div className={`${getStepClass("layer-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                    <div className="step-header">
                      {" "}
                      <span className="step-number">

                        1
                      </span>{" "}
                      <span className="step-label">
                        Select{" "}
                        <strong className="text-highlight" >Change Layer</strong>{" "}
                        from the icon menu.
                      </span>
                    </div>

                    <div>
                      <img src={changeLayerIcon} alt="Change Layer Icon" className="software-screenshot screenshot-small" style={{ height: '200px' }} />
                    </div>
                  </div>

                  <div className={`${getStepClass("layer-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                    <div className="step-header">
                      {" "}
                      <span className="step-number">

                        2
                      </span>{" "}
                      <span className="step-label">
                        Specify the layer on the item entry.
                      </span>
                    </div>

                    <div className="flex-row-center--wrap">
                      <img src={itemEntryChangeLayer} alt="Change Layer Item Entry" className="software-screenshot screenshot-large" style={{ height: '50px', width: '800px' }} />
                    </div>
                  </div>

                  <div className={`${getStepClass("layer-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                    <div className="step-header">
                      {" "}
                      <span className="step-number">

                        3
                      </span>{" "}
                      <span className="step-label">
                        Click on the solid entity.
                      </span>
                    </div>
                  </div>

                  <div className="section-divider"></div>

                  <h3 className="section-title" style={{ marginRight: "34rem" }}>Layer designation of 3D parts</h3>

                  <div className="tool-block">
                    {" "}
                    <br />
                    <h4 className="section-title" style={{ marginRight: "800px" }}>Layer 1</h4>{" "}
                    <ul className="interaction-list--plain">
                      {" "}
                      <li>
                        All common parts need to be fabricated or machined
                      </li>{" "}
                      <li>
                        Parts that undergo Annealing, Shot blasting, Annealing
                        Shot blasting
                      </li>{" "}
                      <li>Covers for purchase parts (No mechanism)</li>{" "}
                      <li>All parts must be color white</li>{" "}
                    </ul>
                    <div>
                      <img src={layer1Img} alt="Layer 1 White Parts" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className="tool-block">
                    {" "}
                    <h4 className="section-title" style={{ marginRight: "790px" }}>Layer 2</h4>{" "}
                    <ul className="interaction-list--plain">
                      {" "}
                      <li>
                        Fabricated parts/Machined parts with color/paint
                      </li>{" "}
                      <li>Safety Cover - Yellow (No. 4)</li>{" "}
                    </ul>
                    <div>
                      <img src={layer2Img} alt="Layer 2 Yellow Parts" className="software-screenshot screenshot-wide" style={{ height: '290px' }} />
                    </div>
                    <br />
                    <p className="step-description text-center">
                      {" "}
                      Safety color applies to covers for machine guarding such
                      as chain, belt and gear drive power transmission system.
                    </p>
                  </div>

                  <div className="tool-block">
                    {" "}
                    <ul className="interaction-list--plain">
                      {" "}
                      <li>Parts that does not need to be painted</li>{" "}
                      <li>All Stainless Steel (SUS) - white (No.1)</li>{" "}
                      <li>Acrylic - white (No.1)</li>{" "}
                    </ul>
                    <div>
                      <img src={acrylicPointerImg} alt="Acrylic and Pointer" className="software-screenshot screenshot-wide" /> <br />
                      <span style={{ fontSize: '1.5rem', marginLeft: "2rem" }}>ACRYLIC</span>
                      <span style={{ fontSize: '1.5rem', marginLeft: "21rem" }}>POINTER</span>

                    </div>{" "}
                    <h4 className="text-error text-center" /* sanitized: marginTop: '1.5rem' */>
                      <br />
                      {" "}
                      Red paint only on the pointer{" "}
                    </h4>
                  </div>

                  <div className="tool-block">
                    <div className="flex-row-wrap">
                      <div className="flex-1">
                        <p className="font-semibold mb-2">
                          Materials with Color codes on the material list
                        </p>
                        <p>
                          <strong>Examples:</strong>
                        </p>{" "}
                        <ul className="interaction-list--plain">
                          {" "}
                          <li>MC Nylon - Blue (No.5)</li>{" "}
                          <li>Urethane - (No.18)</li>{" "}
                          <li>Rubber - Black (No.16)</li>{" "}
                          <li>New Light - White (No.1)</li>{" "}
                        </ul>
                      </div>

                      <div className="flex-1">
                        <div>
                          <img src={propertiesMaterialImg} alt="Properties Material" className="software-screenshot screenshot-large" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tool-block">
                    <div className="flex-row-wrap">
                      <div className="flex-1">
                        {" "}
                        <ul className="interaction-list--plain">
                          {" "}
                          <li>
                            Fabricated parts/Machined parts with{" "}
                            <strong className="text-error">
                              Heat Treatment
                            </strong>
                          </li>{" "}
                          <li>
                            Preheat/ heated surface coating part - white (No.1)
                          </li>{" "}
                          <li>Isonite, Ionite, Parsonite - Gray (No. 8)</li>{" "}
                          <li>
                            Parkerizing, Manganese Phosphate - Black (No. 16)
                          </li>{" "}
                        </ul>
                      </div>

                      <div className="flex-1">
                        <div>
                          <img src={isoniteManganeseImg} alt="Heat Treatment Parts" className="software-screenshot screenshot-large" />
                          <span style={{ fontSize: '1.8rem', marginLeft: "6rem" }}>ISONITE</span>
                          <span style={{ fontSize: '1.8rem', marginLeft: "15rem" }}>MANGANESE</span> <br />
                          <span style={{ fontSize: '1.8rem', marginLeft: "28rem" }}>PHOSPHATE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`tool-block ${currentIndex === 3 ? "reading-active" : ""}`}>
                    {" "}
                    <h4 className="section-title" style={{ marginRight: "780px" }}>Layer 3</h4>{" "}
                    <ul className="interaction-list--plain">
                      {" "}
                      <li>Purchase Parts (Include stud bolt)</li>{" "}
                      <li>Purchase Parts with Additional Process</li>{" "}
                      <li>Use manufacturer standard color</li>{" "}
                    </ul>
                    <div className="flex-row-center--wrap" style={{ gap: '2rem' }}>
                      <img src={layer3Img} alt="Layer 3 Purchase Parts" className="software-screenshot screenshot-wide" style={{ maxWidth: '850px', height: 'auto' }} />
                      <div className="flex-row-center--wrap" style={{ gap: '2rem', width: '100%' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>MOTOR</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>ENCODER</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>CHAIN & SPROCKET</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}{" "}
            </>
          ) : (
            <div className="fade-in">
              <h3 className="section-title" style={{ marginRight: "780px" }}>Information</h3>

              <div className="tool-block">
                <div className="flex-row-wrap">
                  <div className="flex-column">
                    {" "}
                    {/* Item 1 */}
                    <div className={`${getStepClass("info-1")} ${currentIndex === 0 ? "reading-active" : ""}`}>
                      <div className="step-header">
                        {" "}
                        <span className="step-number">

                          1
                        </span>
                        <div className="flex-row-center">
                          <img src={information1} alt="Coordinates" style={{ width: '35px', height: '35px' }} />{" "}
                          <span className="step-label">
                            Pick a point to display coordinates from the origin.
                          </span>
                        </div>
                      </div>

                      <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                        <p className="p-flush">
                          Displays coordinates of a point from the origin
                        </p>

                        <div>
                          <img src={infoPointImg} alt="Information Point Coordinates" className="software-screenshot screenshot-medium" style={{ height: '120px' }} />
                        </div>
                      </div>
                    </div>{" "}
                    {/* Item 2 */}
                    <div className={`${getStepClass("info-2")} ${currentIndex === 1 ? "reading-active" : ""}`}>
                      <div className="step-header">
                        {" "}
                        <span className="step-number">

                          2
                        </span>
                        <div className="flex-row-center">
                          <img src={information2} alt="Length" style={{ width: '35px', height: '35px' }} />{" "}
                          <span className="step-label">
                            Pick an edge &gt;{" "}
                            <strong className="text-highlight">GO</strong>
                            <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '30px', verticalAlign: 'middle', margin: '0 4px' }} />{" "}
                            to measure length.
                          </span>
                        </div>
                      </div>

                      <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                        <p className="p-flush">
                          Measures the length of an edge
                        </p>

                        <div>
                          <img src={infoEdgeImg} alt="Information Edge Length" className="software-screenshot screenshot-medium" style={{ height: '120px' }} />
                        </div>
                      </div>
                    </div>{" "}
                    {/* Item 3 */}
                    <div className={`${getStepClass("info-3")} ${currentIndex === 2 ? "reading-active" : ""}`}>
                      <div className="step-header">
                        {" "}
                        <span className="step-number">

                          3
                        </span>
                        <div className="flex-row-center">
                          <img src={information3} alt="Distance" style={{ width: '35px', height: '35px' }} />{" "}
                          <span className="step-label">
                            Pick first point/edge &gt; Pick second point/edge to
                            measure distance.
                          </span>
                        </div>
                      </div>

                      <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                        <p className="p-flush">
                          Measures the distance between two points or edges
                        </p>

                        <div>
                          <img src={infoPointEdgeImg} alt="Information Distance" className="software-screenshot screenshot-medium" style={{ height: '120px' }} />
                        </div>
                      </div>
                    </div>{" "}
                    {/* Item 4 */}
                    <div className={`${getStepClass("info-4")} ${currentIndex === 3 ? "reading-active" : ""}`}>
                      <div className="step-header">
                        {" "}
                        <span className="step-number">

                          4
                        </span>
                        <div className="flex-row-center">
                          <img src={information4} alt="Angle" style={{ width: '35px', height: '35px' }} />{" "}
                          <span className="step-label">
                            Pick 2 edges OR 3 points to measure angle.
                          </span>
                        </div>
                      </div>

                      <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                        <p className="p-flush">
                          Measures the angle between two edges or three points
                        </p>

                        <div>
                          <img src={infoAngleImg} alt="Information Angle" className="software-screenshot screenshot-medium" style={{ height: '120px' }} />
                        </div>
                      </div>
                    </div>{" "}
                    {/* Item 5 */}
                    <div className={`${getStepClass("info-5")} ${currentIndex === 4 ? "reading-active" : ""}`}>
                      <div className="step-header">
                        {" "}
                        <span className="step-number">

                          5
                        </span>
                        <div className="flex-row-center">
                          <img src={information5} alt="Entity Info" style={{ width: '35px', height: '35px' }} />{" "}
                          <span className="step-label">
                            Pick the solid entity &gt;{" "}
                            <strong className="text-highlight">GO</strong>
                            <img src={leftClick} alt="Left click" className="screenshot-click--inline" style={{ width: '30px', verticalAlign: 'middle', margin: '0 4px' }} />{" "}
                            to display information.
                          </span>
                        </div>
                      </div>

                      <div className="step-description" /* sanitized: paddingLeft: '2.5rem' */>
                        <p className="p-flush">
                          Displays the informations about the selected entity
                        </p>

                        <div>
                          <img src={infoEntityImg} alt="Information Entity" className="software-screenshot screenshot-medium" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div></div>
            </div>
          )}
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>{" "}
            <button className="nav-button next" onClick={handleNext}>
              {" "}
              {isProperties1 && activeTab === "color"
                ? "Next"
                : "Next Lesson"}{" "}
              <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesLesson;



