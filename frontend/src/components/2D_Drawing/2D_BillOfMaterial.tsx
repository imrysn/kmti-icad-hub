import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

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

import bomEditAttr2Img from "../../assets/2D_Image_File/2D_bill_of_material_(4)_edit_attribute_2.jpg";

import bomEditAttr3Img from "../../assets/2D_Image_File/2D_bill_of_material_(4)_edit_attribute_3.png";

interface BillOfMaterialLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BillOfMaterialLesson: React.FC<BillOfMaterialLessonProps> = ({
  subLessonId = "1",
  onNextLesson,
  onPrevLesson,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

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
        <div
          className="lesson-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <section className="lesson-intro">
        <h3>
          {" "}
          <ArrowLeft size={28} className="lesson-intro-icon" /> 16. Bill Of
          Material (BOM)
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
                  <div className="image-wrapper-flush">
                    <img
                      src={bomPartDrawingImg}
                      alt="BOM Part Drawing Entry with Technical Callouts"
                      className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                    />
                  </div>
                </div>
              </div>{" "}
              {/* Creation Workflow Section (unlabeled in manual as b, but follows a) */}
              <div className="lesson-section">
                <div className="flex-col">
                  <div className="image-wrapper-flush">
                    <img
                      src={bomPartDrawingBImg}
                      alt="BOM Template Selection and Command Procedure"
                      className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                    />
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>
              {/* c. Section */}
              <div className="lesson-section">
                <div className="flex-row">
                  <div> c</div>
                </div>

                <div className="flex-col">
                  <div className="image-wrapper-flush">
                    <img
                      src={bomPartDrawingCImg}
                      alt="Excel BOM Generation Procedure"
                      className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                    />
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
                <div className="flex-row">
                  <div> d</div>
                </div>

                <div className="flex-col">
                  <div className="image-wrapper-flush">
                    <img
                      src={bomPartDrawingDImg}
                      alt="Detailed Excel Operations for Parts and Single Part Configuration"
                      className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                    />
                  </div>

                  <div className="flex-row">
                    <div className="info-box">
                      <p>Note:</p>

                      <p>
                        {" "}
                        Material weight and finish weight must be in 2 decimal
                        places, but for some special cases, 3 decimal places is
                        acceptable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* b. Assembly drawing Section */}
              <div className="lesson-section">
                {" "}
                <h4> b. Assembly drawing </h4>
                <div className="info-box">
                  <p>
                    {" "}
                    BOM of assembly drawing divides into three groups.
                    <br /> 1. Fabricated and Machine Parts
                    <br /> 2. Mechanical / Purchase parts
                    <br /> 3. Hardwares
                  </p>
                </div>
                <div className="flex-row">
                  <div className="flex-col">
                    <img
                      src={bomAssemblyDrawingImg}
                      alt="Assembly BOM Excel with Grouping Callouts"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>

                  <div className="info-box">
                    <p>
                      {" "}
                      1. Excel will appear.
                      <br />
                      <br /> 2. Rearrange the excel data from;
                      <br /> &nbsp;&nbsp;&nbsp;a. Drawing number of parts
                      arranged successively
                      <br /> &nbsp;&nbsp;&nbsp;b. Purchased parts
                      <br /> &nbsp;&nbsp;&nbsp;c. Hardware (HS, BS, CS, SS, SP,
                      HN, FW, SW)
                      <br />
                      <br /> 3. Click 'delete abbreviation' button to delete
                      hardware codes.
                      <br />
                      <br /> 4. Click 'sum the parts' button to combine quantity
                      of same parts.
                      <br />
                      <br /> 5. Purchase parts must indicate the maker in
                      English.
                      <br />
                      <br /> 6. Hardwares arrange in decreasing order.
                      <br />
                      <br /> 7. In terms of assembly detail, use number for part
                      balloon. Also, there must be a gap of 20 numbers in
                      between the three groups.
                    </p>
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
                  <div className="image-wrapper-flush">
                    <img
                      src={bomAssemblyDrawing2Img}
                      alt="Standard Assembly BOM Grouping and Numbering Gaps"
                      className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                    />
                  </div>
                </div>
              </div>
              <div className="section-divider"></div>{" "}
              {/* 17. Additional Information */}
              <section className="lesson-section">
                <h3> 17. Additional Information</h3>

                <div className="flex-row">
                  <div className="flex-col">
                    <div className="image-wrapper-flush">
                      <img
                        src={bomAdditionalInfoImg}
                        alt="Additional Information Excel and Menu Configuration"
                        className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                      />
                    </div>

                    <div className="info-box">
                      <p> NOTE: Columns with green color can not be changed.</p>
                    </div>
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
                <h4> Bill of Material after inserting on ICAD data </h4>
                <div className="flex-row">
                  <div className="image-wrapper-flush">
                    <img
                      src={bomAfterInsertImg}
                      alt="BOM Entry with Text Overflow Case"
                      className="software-screenshot screenshot-wide" /* sanitized: width: '100%' */
                    />
                  </div>
                </div>
              </div>{" "}
              {/* Edit Attribute Section */}
              <div className="lesson-section">
                {" "}
                <h4> Edit Attribute </h4>
                <div className="flex-col">
                  <div className="image-wrapper-flush">
                    <img
                      src={bomEditAttrImg}
                      alt="Edit Attribute Command Selection"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>{" "}
                {/* Step-by-step editing process */}
                <div className="flex-row">
                  <div className="info-box">
                    <p>
                      {" "}
                      1. Apply selected command above.
                      <br /> 2. Click the text that need to edit (P1).
                    </p>
                  </div>

                  <div className="image-wrapper-flush">
                    <img
                      src={bomEditAttr2Img}
                      alt="Selecting Text Row to Edit (P1)"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>
                </div>
                <div className="flex-col">
                  <div className="image-wrapper-flush">
                    <img
                      src={bomEditAttr3Img}
                      alt="Change Attribute Dialog and Final Result"
                      className="software-screenshot screenshot-wide"
                    />
                  </div>

                  <div className="info-box">
                    <p>
                      {" "}
                      3. The Change Attribute dialog box will appear.
                      <br /> 4. Edit width and interval ratio.
                      <br /> 5. Click "OK".
                    </p>
                  </div>
                </div>
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
              Next Lesson <ChevronRight size={18} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillOfMaterialLesson;
