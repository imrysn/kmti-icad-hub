import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

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
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BillOfMaterialLesson: React.FC<BillOfMaterialLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: '1', label: 'Part Drawing' },
    { id: '2', label: 'Assembly Drawing' },
    { id: '3', label: 'Numbering & Data' },
    { id: '4', label: 'Refining' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-bom-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-bom-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-bom-active-tab', activeTab);
    stop();
  }, [activeTab, stop]);

  const handleNext = () => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    } else if (onNextLesson) {
      onNextLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    } else if (onPrevLesson) {
      onPrevLesson();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const LESSON_DATA: Record<string, { title: string; subtitle: string; steps: string[] }> = {
    '2d-bom-1': {
      title: 'BILL OF MATERIAL (BOM)',
      subtitle: 'Displays part information particularly material, part specifications and weights. Located at upper right portion of the template.',
      steps: [
        "Part Drawing BOM: Displays material, specifications, and weights at the upper right of the template. Follow the template selection workflow and generate the BOM via the Excel interface as shown."
      ]
    },
    '2d-bom-2': {
      title: 'BILL OF MATERIAL (BOM)',
      subtitle: 'Displays part information particularly material, part specifications and weights. Located at upper right portion of the template.',
      steps: [
        "Excel Operations: Ensure material and finish weights use 2 decimal places. For Assembly BOMs, group items into Fabricated parts, Purchase parts, and Hardware. Use the delete abbreviation and sum parts buttons for cleanup.",
        "BOM Grouping: Arrange parts by drawing number, followed by purchase parts with English maker names, and finally hardware in decreasing size order."
      ]
    },
    '2d-bom-3': {
      title: 'BILL OF MATERIAL (BOM)',
      subtitle: 'Displays part information particularly material, part specifications and weights. Located at upper right portion of the template.',
      steps: [
        "Standard Grouping: Maintain a clear gap of 20 numbers between the three BOM groups for assembly detail. Refer to the table for standard numbering conventions.",
        "Additional Information: Use the green columns in Excel for data that cannot be changed, ensuring consistency with KEMCO standards."
      ]
    },
    '2d-bom-4': {
      title: 'BILL OF MATERIAL (BOM)',
      subtitle: 'Displays part information particularly material, part specifications and weights. Located at upper right portion of the template.',
      steps: [
        "Post-Insertion: Review the BOM after it's placed in iCAD. If text overflows, use the Edit Attribute command, select the affected row, and adjust the width and interval ratio in the dialog box."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-bom-${activeTab}`] || LESSON_DATA['2d-bom-1'];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="card-header">
              <KaraokeLessonText
                as="h4"
                className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
                data-reading-index="0"
                text={currentLesson.title}
                isActive={isSpeaking && currentIndex === 0}
                currentCharIndex={currentCharIndex}
              />
              <ReadAloudButton 
                isSpeaking={isSpeaking} 
                onStart={() => speak([currentLesson.title, currentLesson.subtitle, ...currentLesson.steps])}
                onStop={stop}
              />
            </div>

            <div className={`instruction-step ${currentIndex === 1 ? "reading-active" : ""}`} data-reading-index="1">
              <KaraokeLessonText
                className="p-flush"
                text={currentLesson.subtitle}
                isActive={isSpeaking && currentIndex === 1}
                currentCharIndex={currentCharIndex}
              />
            </div>

            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Part Drawing"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={bomPartDrawingImg} alt="BOM Part Drawing Entry" className="software-screenshot screenshot-wide" />
                      <img src={bomPartDrawingBImg} alt="BOM Template Selection" className="software-screenshot screenshot-wide mt-4" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Excel BOM Generation"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={bomPartDrawingCImg} alt="Excel BOM Generation" className="software-screenshot screenshot-wide" />
                      <div className="mt-4" style={{ paddingLeft: "1rem", borderLeft: "2px solid var(--primary-alpha)" }}>
                        <p style={{ marginBottom: "0.5rem" }}>1. Excel will appear.</p>
                        <p style={{ marginBottom: "0.5rem" }}>2. Rearrange the sequence of part specification in decreasing order. Make sure the entire row (including the data on column A).</p>
                        <p style={{ marginBottom: "0.5rem" }}>3. For parts detail, use letters for part balloon.</p>
                        <p>4. Compute the material weight of each part specification.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '2' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Weight Configuration"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={bomPartDrawingDImg} alt="Excel Operations" className="software-screenshot screenshot-wide" />
                      <div className="red-text mt-4">
                        <strong>Note:</strong> Material weight and finish weight must be in 2 decimal places, but for some special cases, 3 decimal places is acceptable.
                      </div>
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Assembly Drawing BOM"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <div className="p-flush mb-4">
                        BOM of assembly drawing divides into three groups:
                        <div className="ml-4 mt-2">
                          • Fabricated and Machine Parts<br />
                          • Mechanical / Purchase parts<br />
                          • Hardwares
                        </div>
                      </div>
                      <img src={bomAssemblyDrawingImg} alt="Assembly BOM Excel" className="software-screenshot screenshot-medium" />
                      <div className="mt-4" style={{ paddingLeft: "1rem", borderLeft: "2px solid var(--primary-alpha)" }}>
                        <p style={{ marginBottom: "0.5rem" }}>1. Excel will appear.</p>
                        <p style={{ marginBottom: "0.5rem" }}>2. Rearrange the excel data from Drawing number, Purchased parts, then Hardware.</p>
                        <p style={{ marginBottom: "0.5rem" }}>3. Click "delete abbreviation" button to delete hardware codes.</p>
                        <p style={{ marginBottom: "0.5rem" }}>4. Click "sum the parts" button to combine quantity of same parts.</p>
                        <p style={{ marginBottom: "0.5rem" }}>5. Purchase parts must indicate the maker in English.</p>
                        <p style={{ marginBottom: "0.5rem" }}>6. Hardwares arrange in decreasing order.</p>
                        <p>7. In terms of assembly detail, use number for parts balloon with a gap of 20 numbers between groups.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '3' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Standard Numbering"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={bomAssemblyDrawing2Img} alt="Standard Assembly BOM Grouping" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Additional Information"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={bomAdditionalInfoImg} alt="Additional Information Excel" className="software-screenshot screenshot-wide" />
                      <div className="red-text mt-4">
                        <strong>Note:</strong> Columns with green color can not be changed.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '4' && (
                <div className="flex-col">
                  <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                    <div className="step-header">
                      <span className="step-number">1</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Post-Insertion Review"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={bomAfterInsertImg} alt="BOM Entry Review" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>

                  <div className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`} data-reading-index="3">
                    <div className="step-header">
                      <span className="step-number">2</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Edit Attribute"
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <div className="step-description">
                      <img src={bomEditAttrImg} alt="Edit Attribute Selection" className="software-screenshot screenshot-wide" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillOfMaterialLesson;



