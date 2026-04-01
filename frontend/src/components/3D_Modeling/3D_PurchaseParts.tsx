/** * 3D_PurchaseParts.tsx — 3D Purchase Parts lessons */

import React, { useState, useEffect, useRef } from "react";

import { ChevronLeft, ChevronRight, Package, Info } from "lucide-react";

import "../../styles/3D_Modeling/CourseLesson.css";
/* Assets */

import purchasePartsFlowchart from "../../assets/3D_Image_File/3d_purchase_parts.png";

import uploadingFlowchart from "../../assets/3D_Image_File/3d_purchase.png";

interface PurchasePartsLessonProps {
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const PurchasePartsLesson: React.FC<PurchasePartsLessonProps> = ({
  subLessonId = "purchase-parts-1",
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

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [subLessonId]);

  const isPart1 = subLessonId === "purchase-parts-1";

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
        <h3 className="section-title">
          {" "}
          <Package size={28} className="lesson-intro-icon" />{" "}
          {isPart1
            ? "PURCHASE PART 3D MODELING"
            : "SAMPLE FLOW CHART FOR UPLOADING PURCHASE PARTS ON THE SERVER"}
        </h3>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="tab-pane">
            <div
              className="image-wrapper-flush" /* sanitized: marginTop: '1.5rem' */
            >
              <img
                src={isPart1 ? purchasePartsFlowchart : uploadingFlowchart}
                alt={
                  isPart1
                    ? "Purchase Part 3D Modeling Flowchart"
                    : "Sample Flow Chart for Uploading Purchase Parts on the Server"
                }
                className="software-screenshot screenshot-wide"
              />
            </div>

            <div></div>
          </div>

          <div className="lesson-navigation">
            {" "}
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>{" "}
            <button className="nav-button next" onClick={onNextLesson}>
              Next Lesson <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePartsLesson;
