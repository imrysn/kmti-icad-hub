import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

import balloonPartMenuImg from "../../assets/2D_Image_File/2D_balloon_part_drawing.png";
import balloonAssemblyMenuImg from "../../assets/2D_Image_File/2D_balloon_assembly_drawing_1.png";
import balloonAssemblyMenu2Img from "../../assets/2D_Image_File/2D_balloon_assembly_drawing_2.png";

interface BalloonLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const BalloonLesson: React.FC<BalloonLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const { scrollProgress, containerRef } = useLessonCore('2d-balloon');
  const [activeTab] = useState<string>('1');

  const TABS = [
    { id: '1', label: 'Balloon' }
  ];

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className="tab-button active"
            style={{ cursor: "default" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card">
          <div className="fade-in">
            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className="flex-col">
                  {/* Part Balloon Intro */}
                  <div className="instruction-step">
                    <div className="step-header" style={{ marginTop: "-2rem" }}>
                      <span className="step-number">18</span>
                      <span className="step-label">Balloon</span>
                    </div>
                  </div>

                  {/* Subsection a. Part drawing */}
                  <div className="instruction-step" style={{ marginTop: "-3rem" }}>
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">a</span>
                      <span className="step-label">Part drawing</span>
                    </div>
                    <div className="step-description">
                      <img src={balloonPartMenuImg} alt="Part Balloon Selection and Display" className="software-screenshot screenshot-wide" />

                      <div className="instruction-box mt-4">
                        <p className="p-flush" style={{ marginBottom: "0.5rem" }}>
                          A balloon will be placed where the part image is clearly shown.
                        </p>
                        <p className="p-flush" style={{ marginBottom: "0.25rem" }}><strong className="red-text">Notes:</strong></p>
                        <p className="p-flush" style={{ marginBottom: "0.25rem" }}>1. Balloons should not overlap with other lines or dimensions.</p>
                        <p className="p-flush" style={{ marginBottom: "0.25rem" }}>2. If the details on the BOM are properly linked, part balloons are automatically displayed.</p>
                        <p className="p-flush" style={{ marginBottom: "0.25rem" }}>3. If part balloon is not displayed, the drawing and the BOM properties is not linked. Do not manually input the letters/numbers in item entry box.</p>
                        <p className="p-flush">4. Text should not change using edit characters.</p>
                      </div>
                    </div>
                  </div>


                  {/* Subsection b. Assembly drawing */}
                  <div className="instruction-step">
                    <div className="step-header" style={{ marginLeft: "3rem" }}>
                      <span className="step-number">b</span>
                      <span className="step-label">Assembly drawing</span>
                    </div>
                    <div className="step-description">
                      <img src={balloonAssemblyMenuImg} alt="Assembly Add Balloon Settings" className="software-screenshot screenshot-wide" />
                      <img src={balloonAssemblyMenu2Img} alt="Add Balloon Assembly Placement" className="software-screenshot screenshot-small" style={{ marginLeft: "26.5rem" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="lesson-navigation">
            <button className="nav-button" onClick={onPrevLesson}>
              <ChevronLeft size={18} /> Previous
            </button>
            <button className="nav-button next" onClick={onNextLesson}>
              {nextLabel || 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalloonLesson;
