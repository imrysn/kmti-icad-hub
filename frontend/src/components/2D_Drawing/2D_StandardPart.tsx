import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Standard Part Detail (1) */

import pcdImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_pcd.png";

import taperedThreadImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_tapered_thread.png";

import standardPartDetailImg from "../../assets/2D_Image_File/2D_tandard_part_detail(1)_standard_parts.jpg";
/* Importing assets for Standard Part Detail (2) */

import oilGroove1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(2)_oil_groove_1.png";

import oilGroove2Img from "../../assets/2D_Image_File/2D_tandard_part_detail(2)_oil_groove_2.png";
/* Importing assets for Standard Part Detail (3) */

import shaftKeyPlate1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_1.png";

import shaftKeyPlate2Img from "../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_2.jpg";

import shaftKeyPlate3Img from "../../assets/2D_Image_File/2D_tandard_part_detail(3)_shaft_key_plate_3.png";
/* Importing assets for Standard Part Detail (4) */

import collarImg from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar.png";
/* Importing assets for Standard Part Detail (5) */

import collar1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar_1.png";

import collar2Img from "../../assets/2D_Image_File/2D_tandard_part_detail(4)_collar_2.png";
/* Importing assets for Standard Part Detail (6) */

import scaleImg from "../../assets/2D_Image_File/2D_standard_part_detail(6)_scale.jpg";

import reliefProcess1Img from "../../assets/2D_Image_File/2D_tandard_part_detail(6)_relief_process_1.png";

import reliefProcess2Img from "../../assets/2D_Image_File/2D_standard_part_detail(6)_relief_process_2.jpg";
/* Importing assets for Standard Part Detail (7) */

import reliefWorkflowImg from "../../assets/2D_Image_File/2D_tandard_part_detail(7)_relief_process_3.png";

import reliefDialogImg from "../../assets/2D_Image_File/2D_tandard_part_detail(7)_relief_process_4.jpg";

interface StandardPartLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const StandardPartLesson: React.FC<StandardPartLessonProps> = ({
  subLessonId,
  onNextLesson,
  onPrevLesson,
  nextLabel,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const standard1Steps = [
    "Pitch Center Diameter: PCD is no longer used in KEMCO drawings to prevent fabrication errors. Instead, provide individual coordinates or dimensions.",
    "Tapered Threads: For technical threads like Rc, ensure you apply the specific 2D detailing patterns shown in the template.",
    "Data Input: On standard part templates, only modify the boxed portions. All other template details should remain unchanged."
  ];

  const standard2Steps = [
    "Oil Grooves: These grooves distribute lubrication from oil holes. For flat surfaces, depth should be 1.5mm, and the groove must be wider than the accompanying drill hole. For circular portions, ensure a smooth finish designated by R to ensure proper oil flow."
  ];

  const standard3Steps = [
    "Shaft and Key Plates: Follow the dimension table for shaft and key plate thickness. Ensure all cut shapes are free from burrs and use specified flat bar materials with correct width tolerances."
  ];

  const standard4Steps = [
    "Collars: Collars are fitted on shafts to prevent sliding and serve as mechanical stoppers. Review the tolerance standards for correct fitment on your shaft designs."
  ];

  const standard5Steps = [
    "Advanced Collars: The OST-2 collar is used with urethane rubber stoppers. This design prevents over-tightening which could distort the urethane material. Follow the provided detailing reference for OST-2 parts."
  ];

  const standard6Steps = [
    "Scale: Adhere to JIS Z 8314 standard scales. While assembly drawings allow some flexibility, parts drawings must always use the standard KEMCO scale.",
    "Relief Process: Used at shaft shoulders to provide tool clearance and prevent damage. This is required for shafts with surface grinding and must be clearly shown in 2D detailing."
  ];

  const standard7Steps = [
    "Relief Workflow: To show specialized relief details, use the part library to load the Relief Process template. Place this detail within the global view of your drawing template."
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;

      const totalHeight = element.scrollHeight - element.clientHeight;

      if (totalHeight === 0) {
        setScrollProgress(100);
        return;
      }

      const progress = (element.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const currentContainer = containerRef.current;

    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => currentContainer?.removeEventListener("scroll", handleScroll);
  }, [subLessonId]);

  return (
    <div className="course-lesson-container" ref={containerRef}>
      {" "}
      {/* Sticky Progress Bar */}
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <section className="lesson-intro">
        <h3 className="section-title">
          {" "}
          Standard Part
          Detail{" "}
          {subLessonId === "2d-standard-part-1"
            ? "(1)"
            : subLessonId === "2d-standard-part-2"
              ? "(2)"
              : subLessonId === "2d-standard-part-3"
                ? "(3)"
                : subLessonId === "2d-standard-part-4"
                  ? "(4)"
                  : subLessonId === "2d-standard-part-5"
                    ? "(5)"
                    : subLessonId === "2d-standard-part-6"
                      ? "(6)"
                      : subLessonId === "2d-standard-part-7"
                        ? "(7)"
                        : ""}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
              if (subLessonId === "2d-standard-part-1") speak(standard1Steps);
              else if (subLessonId === "2d-standard-part-2") speak(standard2Steps);
              else if (subLessonId === "2d-standard-part-3") speak(standard3Steps);
              else if (subLessonId === "2d-standard-part-4") speak(standard4Steps);
              else if (subLessonId === "2d-standard-part-5") speak(standard5Steps);
              else if (subLessonId === "2d-standard-part-6") speak(standard6Steps);
              else if (subLessonId === "2d-standard-part-7") speak(standard7Steps);
            }}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          {subLessonId === "2d-standard-part-1"
            ? "Guidelines for PCD, Tapered Threads, and Standard Part Template requirements."
            : subLessonId === "2d-standard-part-2"
              ? "Standardized oil groove designs for flat surfaces and circular portions."
              : subLessonId === "2d-standard-part-3"
                ? "Dimensional standards and detailing practices for Shafts and Key Plates."
                : subLessonId === "2d-standard-part-4"
                  ? "Functional applications and tolerance standards for Collars."
                  : subLessonId === "2d-standard-part-5"
                    ? "Advanced collar applications (OST-2) for urethane materials and stoppers."
                    : subLessonId === "2d-standard-part-6"
                      ? "Standard scale applications (JIS Z 8314) and relief process specifications."
                      : subLessonId === "2d-standard-part-7"
                        ? "Workflow for implementing specialized Relief Process templates."
                        : "Operational standards for KEMCO part detailing."}
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-standard-part-1" ? (
            <div className="flex-col">
              {" "}
              {/* d. PCD Section */}
              <div className="sub-section-container">
                {" "}
                <h4>
                  {" "}
                  <strong>d. PCD</strong> (Pitch Center Diameter) is no longer
                  used for KEMCO drawing to avoid misreading of dimension during
                  fabrication.{" "}
                </h4>
                <div className="image-wrapper-flush">
                  <img src={pcdImg} alt="PCD Dimension Comparison" className="software-screenshot screenshot-wide" />
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* e. Tapered Thread (Rc) Section */}
              <div className="sub-section-container">
                {" "}
                <h4>e. Tapered Thread (Rc)</h4>
                <p className="p-flush">
                  Based on the drawing, we must apply it on 2D detailing
                </p>
                <div className="image-wrapper-flush">
                  <img src={taperedThreadImg} alt="Tapered Thread 2D Detailing" className="software-screenshot screenshot-wide" />
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* f. Standard Parts Section */}
              <div className="sub-section-container">
                {" "}
                <h4>f. Standard Parts</h4>
                <p className="p-flush">
                  Boxed portion of the template is the only data need to be
                  input, other than that no detail will be change.
                </p>
                <div className="image-wrapper-flush">
                  <img src={standardPartDetailImg} alt="Standard Parts Template details" className="software-screenshot screenshot-wide" />
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-standard-part-2" ? (
            <div className="flex-col">
              {" "}
              {/* a. Oil Groove Section */}
              <div>
                {" "}
                <h4>a. Oil Groove</h4>
                <p className="p-flush">
                  Is a groove in the surface of a machine part that distributes
                  lubricating oil injected through an oil hole
                </p>
                <div className="info-box">
                  <p>※ There are two (2) kinds of oil groove</p>
                </div>{" "}
                {/* 1. For Flat Surface */}
                <div className="sub-section-container">
                  {" "}
                  <h5>1. For Flat Surface</h5>
                  <div className="image-wrapper-flush">
                    <img src={oilGroove1Img} alt="Oil Groove - Flat Surface Detail and Example" className="software-screenshot screenshot-wide" />
                  </div>{" "}
                  <ul className="list-flush">
                    {" "}
                    <li>
                      {" "}
                      <span>✔</span> Follow the standard detail of KEMCO for
                      flat surface <span>(Figure 1)</span>.{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <span>✔</span> Depth of grease line should be 1.5mm{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <span>✔</span> In case of drill hole and tap hole, the
                      diameter of the hole must be smaller than width of
                      groove.{" "}
                    </li>{" "}
                  </ul>
                </div>
                <div className="section-divider"></div>{" "}
                {/* 2. For Circular Portion */}
                <div className="sub-section-container">
                  <div className="flex-row">
                    {" "}
                    <h5>2. For Circular Portion</h5>{" "}
                    <span>New Revised: 07/01/19</span>
                  </div>
                  <div className="image-wrapper-flush">
                    <img src={oilGroove2Img} alt="Oil Groove - Circular Portion Detail and Example" className="software-screenshot screenshot-wide" />
                  </div>{" "}
                  <ul className="list-flush">
                    {" "}
                    <li>
                      {" "}
                      <span>✔</span> Follow the standard detail of KEMCO for
                      circular portion <span>(Figure 2)</span>.{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <span>✔</span> Compared to grooving of flat surfaces,
                      radius 2 cannot achieve on actual.
                      <br />
                      But the surface should be smooth finish{" "}
                      <span>R (滑らかに仕上げ</span>.{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <span>✔</span> Depth of grease line should be 1.5mm{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <span>✔</span> In case of drill hole and tap hole, the
                      diameter of the hole must be smaller than width of
                      groove.{" "}
                    </li>{" "}
                  </ul>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-standard-part-3" ? (
            <div className="flex-col">
              {" "}
              {/* b. Shaft and Key Plate Section */}
              <div>
                {" "}
                <h4>b. Shaft and Key Plate</h4>
                <div className="sub-section-header">
                  {" "}
                  <h5>※ Dimension of Shaft and Key Plate</h5>
                </div>
                <div className="image-wrapper-flush">
                  <img src={shaftKeyPlate1Img} alt="Shaft and Key Plate Dimensions Table" className="software-screenshot screenshot-wide" />
                </div>
                <div className="info-box-note">
                  <p>Note:</p>{" "}
                  <ul className="list-flush">
                    {" "}
                    <li>
                      {" "}
                      <span>✔</span> The shape after cutting must be free from
                      burrs{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <span>✔</span> Use flat bar material{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <span>✔</span>{" "}
                      <span>The tolerance of the width groove must be</span>
                      <img src={shaftKeyPlate2Img} alt="Tolerance callout" />{" "}
                    </li>{" "}
                  </ul>
                </div>
                <div className="section-divider"></div>{" "}
                {/* Sample Drawing Section */}
                <div className="sub-section-header">
                  {" "}
                  <h5>※ Sample Drawing</h5>
                </div>
                <div className="image-wrapper-flush">
                  <img src={shaftKeyPlate3Img} alt="Sample Drawing and Isometric View" className="software-screenshot screenshot-wide" />
                </div>{" "}
                <ul className="list-flush">
                  {" "}
                  <li>
                    {" "}
                    <span>✔</span>
                    <div>
                      {" "}
                      As much as possible, follow the way of detailing in this
                      reference. <br /> Do not position the key groove below.
                    </div>{" "}
                  </li>{" "}
                </ul>
              </div>
            </div>
          ) : subLessonId === "2d-standard-part-4" ? (
            <div className="flex-col">
              {" "}
              {/* c. Collar Section */}
              <div className="sub-section-header">
                {" "}
                <h4>c. Collar</h4>
                <div>
                  {" "}
                  <span>New Revised:</span> <span>07/01/19</span>
                </div>
              </div>
              <div className="info-box">
                <p className="p-flush">
                  {" "}
                  Used in machine, fitted on a shaft to prevent sliding
                  movement.
                  <br /> Also serves as mechanical stopper and stroke limiters.
                </p>
              </div>
              <div className="sub-section-header">
                {" "}
                <h5>※ Tolerances for collar</h5>
              </div>
              <div className="image-wrapper-flush">
                <img src={collarImg} alt="Tolerances for Collar - Example 1 and 2" className="software-screenshot screenshot-wide" />
              </div>
            </div>
          ) : subLessonId === "2d-standard-part-5" ? (
            <div className="flex-col">
              {" "}
              {/* Example 3 Header */} <h4>Example 3.</h4>{" "}
              {/* Top Diagram: Sectional View of OST-2 */}
              <div className="image-wrapper-flush">
                <img src={collar1Img} alt="OST-2 Sectional View" className="software-screenshot" />
              </div>
              <div className="info-box">
                {" "}
                <ul className="list-flush">
                  {" "}
                  <li>
                    {" "}
                    <span>✔</span>{" "}
                    <span>
                      Can used to hold urethane rubber and serve as stopper.
                    </span>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <span>✔</span>{" "}
                    <span>
                      To avoid over press of the material during tightening that
                      causes the urethane to distort.
                    </span>{" "}
                  </li>{" "}
                </ul>
              </div>
              <div className="section-divider"></div>{" "}
              {/* ※ Sample Drawing Header */}
              <div className="sub-section-header">
                {" "}
                <h5>※ Sample Drawing</h5>
              </div>{" "}
              {/* Bottom Diagram: Technical drawing of OST-2 */}
              <div className="image-wrapper-flush">
                <img src={collar2Img} alt="OST-2 Sample Technical Drawing" />
              </div>{" "}
              <ul className="list-flush">
                {" "}
                <li>
                  {" "}
                  <span>✔</span>{" "}
                  <span>
                    As much as possible, follow the way of detailing in this
                    reference.
                  </span>{" "}
                </li>{" "}
              </ul>
            </div>
          ) : subLessonId === "2d-standard-part-6" ? (
            <div className="flex-col">
              {" "}
              {/* g. Scale Section */}
              <div>
                {" "}
                <h4>g. Scale</h4>
                <div className="image-wrapper-flush">
                  <img src={scaleImg} alt="Standard Scale Table JIS Z 8314" className="software-screenshot screenshot-large" />
                </div>{" "}
                <ul className="list-flush">
                  {" "}
                  <li>
                    {" "}
                    <span>✔</span>{" "}
                    <span>Follow the standard scale given by KEMCO.</span>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <span>✔</span>{" "}
                    <span>
                      On parts drawing, standard scale must be always used.
                    </span>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <span>✔</span>{" "}
                    <span>
                      On assembly drawing, standard scale should be used, but
                      non-standard scale can be used as a second option.
                    </span>{" "}
                  </li>{" "}
                </ul>
              </div>
              <div className="section-divider"></div>{" "}
              {/* h. Relief process Section */}
              <div>
                {" "}
                <h4>h. Relief process</h4>
                <div className="info-box">
                  <p className="p-flush">
                    {" "}
                    Often used at the end of the shoulder portion of a shaft to
                    provide clearance for the cutting tool and also to avoid
                    damaging it.
                  </p>
                </div>
                <p>In 2D</p>
                <div className="image-wrapper-flush">
                  <img src={reliefProcess1Img} alt="Relief Process Diagram in 2D" className="software-screenshot screenshot-large" />
                </div>{" "}
                <ul className="list-flush">
                  {" "}
                  <li>
                    {" "}
                    <span>✔</span>{" "}
                    <span>
                      Relief process detail should be{" "}
                      <strong>used on shaft parts</strong> with three (3)
                      triangle and surface grinding process.
                    </span>
                    <img src={reliefProcess2Img} alt="Relief Symbol" />{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <span>✔</span>{" "}
                    <span>
                      Relief process should be{" "}
                      <strong>shown on 2D detailing.</strong>
                    </span>{" "}
                  </li>{" "}
                </ul>
                <div className="info-box-note">
                  <p>Note:</p>{" "}
                  <ul className="list-flush">
                    {" "}
                    <li>
                      {" "}
                      <span>✔</span>{" "}
                      <span>
                        All corners of the shaft cannot be straight by using
                        grinding or any machining equipment.
                      </span>{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <span>✔</span>{" "}
                      <span>
                        Sliding portion needs to be supplied with oil.
                      </span>{" "}
                    </li>{" "}
                  </ul>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-standard-part-7" ? (
            <div className="flex-col">
              {" "}
              {/* Workflow Header */}
              <div className="sub-section-header">
                {" "}
                <h5>
                  ※ There are four (4) steps to show the detail on the template
                </h5>
              </div>{" "}
              {/* Workflow Image */}
              <div className="image-wrapper-flush">
                <img src={reliefWorkflowImg} alt="Relief process loading workflow" className="software-screenshot" />
              </div>{" "}
              {/* Template Selection Info */}
              <div className="info-box">
                <p className="p-flush">
                  {" "}
                  Choose required template (Relief process detail)
                </p>{" "}
                <ul className="list-flush">
                  {" "}
                  <li>
                    {" "}
                    <span>✔</span> <span>Click OK</span>{" "}
                  </li>{" "}
                </ul>
              </div>{" "}
              {/* Dialog Image */}
              <div className="image-wrapper-flush">
                <img src={reliefDialogImg} alt="Template selection dialogue" className="software-screenshot screenshot-large" />
              </div>{" "}
              {/* Footer Note */}
              <div className="sub-section-header">
                {" "}
                <h5>
                  {" "}
                  ※ Designated location of relief process detail is on the
                  global view of the drawing.{" "}
                </h5>
              </div>
            </div>
          ) : (
            <p className="placeholder-text">
              Content for
              {subLessonId} is being prepared.
            </p>
          )}
          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardPartLesson;

