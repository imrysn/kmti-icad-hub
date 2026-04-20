import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Bill of Material */

import bomPartDrawingImg from "../../assets/2D_Image_File/2D_bill_of_material_part_drawing.png";

import bomPartDrawingBImg from "../../assets/2D_Image_File/2D_bill_of_material_part_drawing_b.png";

import bomPartDrawingCImg from "../../assets/2D_Image_File/2D_bill_of_material_part_drawing_c.png";

import bomPartDrawingDImg from "../../assets/2D_Image_File/2D_bill_of_material_part_drawing_d.png";

import bomAssemblyDrawingImg from "../../assets/2D_Image_File/2D_bill_of_material_assembly_drawing.jpg";

import bomAssemblyDrawing2Img from "../../assets/2D_Image_File/2D_bill_of_material_assembly_drawing_2.png";

import bomAdditionalInfoImg from "../../assets/2D_Image_File/2D_bill_of_material_additional_information.png";

import bomAfterInsertImg from "../../assets/2D_Image_File/2D_bill_of_material_(4)_after_inserting_on_icad.png";

import bomEditAttrImg from "../../assets/2D_Image_File/2D_bill_of_material_(4)_edit_attribute.png";


interface BillOfMaterialLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BillOfMaterialLesson: React.FC<BillOfMaterialLessonProps> = ({
  subLessonId = "1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const bom1Steps = [
    "Part Drawing BOM: Displays material, specifications, and weights at the upper right of the template. Follow the template selection workflow and generate the BOM via the Excel interface as shown."
  ];

  const bom2Steps = [
    "Excel Operations: Ensure material and finish weights use 2 decimal places. For Assembly BOMs, group items into Fabricated parts, Purchase parts, and Hardware. Use the delete abbreviation and sum parts buttons for cleanup.",
    "BOM Grouping: Arrange parts by drawing number, followed by purchase parts with English maker names, and finally hardware in decreasing size order."
  ];

  const bom3Steps = [
    "Standard Grouping: Maintain a clear gap of 20 numbers between the three BOM groups for assembly detail. Refer to the table for standard numbering conventions.",
    "Additional Information: Use the green columns in Excel for data that cannot be changed, ensuring consistency with KEMCO standards."
  ];

  const bom4Steps = [
    "Post-Insertion: Review the BOM after it's placed in iCAD. If text overflows, use the Edit Attribute command, select the affected row, and adjust the width and interval ratio in the dialog box."
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
          16. Bill Of
          Material (BOM)
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
            if (subLessonId === "1") speak(bom1Steps);
            else if (subLessonId === "2") speak(bom2Steps);
            else if (subLessonId === "3") speak(bom3Steps);
            else if (subLessonId === "4") speak(bom4Steps);
          }}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          Displays part informations particularly material, part specifications
          and weights.
          <br /> Located at upper right portion of the template.
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "1" && (
            <div className="flex-col">
              {" "}
              {/* a. Part drawing Section */}
              <div className="lesson-section">
                {" "}
                <h4> a. Part drawing </h4>
                <div className="flex-col">
                  <div>
                    <img src={bomPartDrawingImg} alt="BOM Part Drawing Entry with Technical Callouts" className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */ />
                  </div>
                </div>
              </div>{" "}
              {/* Creation Workflow Section (unlabeled in manual as b, but follows a) */}
              <div className="lesson-section">
                <div className="flex-col">
                  <div>
                    <img src={bomPartDrawingBImg} alt="BOM Template Selection and Command Procedure" className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */ />
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>
              {/* c. Section */}
              <div className="lesson-section">
                <div className="flex-col">
                  <h4 style={{ marginBottom: "1rem" }}> c </h4>
                </div>

                <div className="flex-col">
                  <div>
                    <img src={bomPartDrawingCImg} alt="Excel BOM Generation Procedure" className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */ />
                  </div>
                  <div className="info-box">
                    <div style={{ padding: "1rem" }}>
                      <div style={{ marginBottom: "0.8rem" }}>1. Excel will appear.</div>
                      <div style={{ marginBottom: "0.8rem" }}>2. Rearrange the sequence of part specification in decreasing order. Make sure the entire row (including the data on column A).</div>
                      <div style={{ marginBottom: "0.8rem" }}>3. For parts detail, use letters for part balloon.</div>
                      <div style={{ marginBottom: "0.8rem" }}>4. Compute the material weight of each part specification.</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}{" "}
          {subLessonId === "2" && (
            <div className="flex-col">
              {" "}
              {/* d. Excel operations for parts */}
              <div className="lesson-section">
                <div className="flex-col">
                  <h4 style={{ marginBottom: "1rem" }}> d </h4>
                </div>

                <div className="flex-col">
                  <div className="image-overlay-container" style={{ position: "relative" }}>
                    <img src={bomPartDrawingDImg} alt="Detailed Excel Operations for Parts and Single Part Configuration" className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */ />
                  </div>

                  <div className="info-box" style={{
                    position: "absolute",
                    top: "27rem",
                    right: "3.5rem",
                    width: "495px",
                    height: "9rem",
                    margin: 0,
                    zIndex: 10,
                    boxShadow: "var(--shadoe-lg"
                  }}>
                    <p className="red-text"> <strong>Note:</strong> <br />  Material weight and finish weight must be in 2 decimal
                      places, but for some special cases, 3 decimal places is
                      acceptable. </p>
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* b. Assembly drawing Section */}
              <div className="lesson-section">
                {" "}
                <h4 style={{ marginBottom: "1rem" }}> b. Assembly drawing </h4>
                <div className="step-description">
                  <div>
                    <div className="p-flush" style={{ marginBottom: "1rem" }}>
                      <div style={{ marginBottom: "0.5rem" }}>BOM of assembly drawing divides into three groups.</div>
                      <div style={{ marginBottom: "0.4rem" }}>1. Fabricated and Machine Parts</div>
                      <div style={{ marginBottom: "0.4rem" }}>2. Mechanical / Purchase parts</div>
                      <div style={{ marginBottom: "0.4rem" }}>3. Hardwares</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src={bomAssemblyDrawingImg} alt="Assembly BOM Excel with Grouping Callouts" className="software-screenshot screenshot-medium" />
                  </div>
                  <div className="info-box" style={{ marginTop: "2em" }}>
                    <div style={{ padding: "1rem" }}>
                      <div style={{ marginBottom: "0.8rem" }}>1. Excel will appear </div>
                      <div style={{ marginBottom: "0.5rem" }}>2. Rearrange the excel data from;</div>
                      <div style={{ marginLeft: "1.5em", marginBottom: "0.3rem" }}>a. Drawing number of parts arranged successively</div>
                      <div style={{ marginLeft: "1.5em", marginBottom: "0.3rem" }}>b. Purchased parts</div>
                      <div style={{ marginLeft: "1.5em", marginBottom: "0.8rem" }}>c. Hardware (HS, BS, CS, SS, SP, HN, FW, SW)</div>
                      <div style={{ marginBottom: "0.8rem" }}>3. Click "delete abbreviation" button to delete hardware codes.</div>
                      <div style={{ marginBottom: "0.8rem" }}>4. Click "sum the parts" button to combine quantity of same parts.</div>
                      <div style={{ marginBottom: "0.8rem" }}>5. Purchase parts must indicate the maker in English.</div>
                      <div style={{ marginBottom: "0.8rem" }}>6. Hardwares arrange in decreasing order.</div>
                      <div style={{ marginBottom: "0.8rem" }}>7. In terms of assembly detail, use number for parts balloon. Also, there must be a gap of 20 numbers in between the groups.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
          {subLessonId === "3" && (
            <div className="flex-col">
              {" "}
              {/* Assembly Extended Section */}
              <div className="lesson-section">
                <div className="flex-col">
                  <div>
                    <img src={bomAssemblyDrawing2Img} alt="Standard Assembly BOM Grouping and Numbering Gaps" className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */ />
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* 17. Additional Information */}
              <section className="lesson-section">
                <h4 style={{ marginBottom: "1rem" }}> 17. Additional Information</h4>

                <div className="flex-col">
                  <div>
                    <img src={bomAdditionalInfoImg} alt="Additional Information Excel and Menu Configuration" className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */ />
                  </div>

                  <div className="info-box">
                    <p className="red-text"> <strong>Note:</strong> </p>
                    <p> Columns with green color can not be changed.</p>
                  </div>
                </div>
              </section>
            </div>
          )}{" "}
          {subLessonId === "4" && (
            <div className="flex-col">
              {" "}
              {/* Bill of Material after inserting Section */}
              <div className="lesson-section">
                {" "}
                <h4 style={{ marginBottom: "2rem" }}> Bill of Material after inserting on ICAD data </h4>
                <div>
                  <img src={bomAfterInsertImg} alt="BOM Entry with Text Overflow Case" className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */ />
                </div>
              </div>{" "}
              {/* Edit Attribute Section */}
              <div className="lesson-section">
                {" "}
                <h4 style={{ marginBottom: "2rem" }}> Edit Attribute </h4>
                <div className="flex-col">
                  <div>
                    <img src={bomEditAttrImg} alt="Edit Attribute Command Selection" className="software-screenshot screenshot-wide" />
                  </div>
                </div>{" "}
                {/* Step-by-step editing process */}
              </div>
            </div>
          )}{" "}
          {/* Placeholder for future sub-lessons */}{" "}
          {subLessonId !== "1" &&
            subLessonId !== "2" &&
            subLessonId !== "3" &&
            subLessonId !== "4" && (
              <div className="flex-col">
                <p>
                  Content for Bill of Material ({subLessonId}) is currently
                  being implemented.
                </p>
              </div>
            )}{" "}
          {/* Navigation */}
          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={onPrevLesson}>
              {" "}
              <ChevronLeft size={18} /> Previous{" "}
            </button>{" "}
            <button className="nav-button next" onClick={onNextLesson}>
              {" "}
              {nextLabel || 'Next Lesson'} <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default BillOfMaterialLesson;



