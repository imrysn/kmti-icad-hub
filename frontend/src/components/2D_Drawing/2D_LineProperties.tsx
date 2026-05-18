import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReadAloudButton } from "../ReadAloudButton";
import { KaraokeLessonText } from "../KaraokeLessonText";
import { useLessonCore } from "../../hooks/useLessonCore";

import "../../styles/2D_Drawing/CourseLesson.css";

/* Importing assets for Line Properties (1) */
import lineProp1Img from "../../assets/2D_Image_File/2D_line_properties_(1).png";

/* Importing assets for Line Properties (2) */
import lineProp2Img from "../../assets/2D_Image_File/2D_line_properties_(2)_6_changing_line_color.png";

/* Importing assets for Line Properties (3) */
import lineProp3ImgA from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline1.png";
import lineProp3ImgB from "../../assets/2D_Image_File/2D_line_properties_(2)_additional_lines_a_spline_spline.png";

/* Importing assets for Line Properties (4) */
import lineProp4Img from "../../assets/2D_Image_File/2D_line_properties_(3)_additional_lines_a_spline.png.png";
import lineProp5Img from "../../assets/2D_Image_File/2D_line_properties_(3)_c_piping_center_line_1.png";
import lineProp6Img from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_1.png";
import lineProp7Img from "../../assets/2D_Image_File/2D_line_properties_(4)_d_change_representation_parts_3.png";

interface LinePropertiesLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const LinePropertiesLesson: React.FC<LinePropertiesLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel
}) => {
  const TABS = [
    { id: '1', label: 'Line Properties' },
    { id: '2', label: 'Changing Color' },
    { id: '3', label: 'Additional Lines' }
  ];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('2d-line-props-active-tab') || TABS[0].id;
  });

  const { scrollProgress, containerRef, speak, stop, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(`2d-line-props-${activeTab}`);

  useEffect(() => {
    localStorage.setItem('2d-line-props-active-tab', activeTab);
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
    '2d-line-props-1': {
      title: 'LINE PROPERTIES',
      subtitle: '',
      steps: []
    },
    '2d-line-props-2': {
      title: 'CHANGING LINE PROPERTIES',
      subtitle: '',
      steps: [
        ""
      ]
    },
    '2d-line-props-3': {
      title: 'ADDITIONAL LINES',
      subtitle: '',
      steps: [
        "",
        "Spline is used to replace lines when a partial section is done on the drawing. These lines will be replaced by a spline.",
        "Automatically shown for the holes from machine tools. Aside from that, if additional center lines is necessary, It can be put manually."
      ]
    }
  };

  const currentLesson = LESSON_DATA[`2d-line-props-${activeTab}`] || LESSON_DATA['2d-line-props-1'];

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



            

            <div className="flex-col tab-content fade-in">
              {activeTab === '1' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">5</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Line Properties"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  
                      <img src={lineProp1Img} alt="Line Properties Overview" className="software-screenshot screenshot-wide" />
                    
                    <div className="lesson-table-container mt-6">
                      <table className="lesson-table">
                        <thead>
                          <tr>
                            <th>Application</th>
                            <th>LineType</th>
                            <th>Line Weight</th>
                            <th>Thickness</th>
                            <th>Color</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>Actual line</td><td>Continuous line</td><td>Thick</td><td>0.4mm</td><td>White (1)</td></tr>
                          <tr><td>Hidden Line</td><td>Broken Line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Center Line</td><td>Single Dot Line</td><td>Thin</td><td>0.1mm</td><td>Cyan (7)</td></tr>
                          <tr><td>Phantom Line</td><td>Double Dot Line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Arrow / Machine Flow</td><td>Continuous line</td><td>Thick</td><td>0.4mm</td><td>White (1)</td></tr>
                          <tr><td>Welding Hatch</td><td>Continuous line</td><td>Middle</td><td>0.2mm</td><td>Pink (6)</td></tr>
                          <tr><td>Scribe Line</td><td>Continuous line</td><td className="highlight-cell-yellow">Thick</td><td className="highlight-cell-yellow">0.4mm</td><td className="highlight-cell-yellow">White (1)</td></tr>
                          <tr><td>Floor Level</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Spline / Cutting Line</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Additional Information / Table</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Detail View Indicator</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Text / Letter</td><td>-</td><td>Thin</td><td>0.15mm</td><td>Yellow (4)</td></tr>
                          <tr><td>Machining Symbol</td><td>-</td><td>Thin</td><td>0.1mm</td><td>Red (2)</td></tr>
                          <tr><td>Revised Old Data / Dimension</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Red (2)</td></tr>
                          <tr><td>Cutted part (Hatch)</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Red (2)</td></tr>
                          <tr><td>Revision Cloud</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Red (2)</td></tr>
                          <tr><td>Pipe Reference Drawing</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Pipe End Reference Line</td><td>Continuous line</td><td>Thin</td><td>0.1mm</td><td>Green (3)</td></tr>
                          <tr><td>Scale Line</td><td>Continuous line</td><td>Middle</td><td>0.2mm</td><td>SkinColor (15)</td></tr>
                          <tr><td>Surface Treatment / Condition</td><td>Single Dot Line</td><td>Middle</td><td>0.2mm</td><td>SkinColor (15)</td></tr>
                          <tr><td>Surface Without Welding Appearance</td><td>Single Dot Line</td><td>Middle</td><td>0.2mm</td><td>SkinColor (15)</td></tr>
                          <tr><td>Same Level</td><td>Single Dot Line</td><td>Thin</td><td>0.1mm</td><td>Cyan (7)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}

              {activeTab === '2' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">6</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Changing line properties (Changing Color)"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush mb-4"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp2Img} alt="External and Hidden Lines" className="software-screenshot screenshot-wide"  style={{ marginTop: "-3rem" }} />
                  </div>
                </div>
              )}

              {activeTab === '3' && (
                <div className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`} data-reading-index="2" style={{ marginTop: "-2rem" }}>
                  <div className="step-header">
                    <span className="step-number">7</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Additional Lines"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-header" style={{ marginTop: '0.5rem', marginLeft: "3rem"}}>
                    <span className="step-number">a</span>
                    <KaraokeLessonText
                      as="span"
                      className="step-label"
                      text="Spline"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                  <div className="step-description">
                    <KaraokeLessonText
                      className="p-flush mb-4"
                      text={currentLesson.steps[0]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp3ImgA} alt="Additional Lines - Spline Settings" className="software-screenshot screenshot-wide mb-6" />
                    
                    <KaraokeLessonText
                      className="p-flush mb-4"
                      text={currentLesson.steps[1]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp3ImgB} alt="Additional Lines - Spline Application" className="software-screenshot screenshot-wide" />
                    
                    <div className="step-header" style={{ marginTop: '2rem', marginLeft: "3rem" }}>
                      <span className="step-number">b</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Center Line"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    
                    <KaraokeLessonText
                      className="p-flush mb-4 mt-4"
                      text={currentLesson.steps[2]}
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp4Img} alt="Line Property Verification" className="software-screenshot screenshot-wide" style={{ marginBottom: "-5rem"}}/>
                    
                    <div className="instruction-box mt-4">
                      <p style={{ margin: 0, lineHeight: 1.5 }}>
                        <strong>NOTE:</strong> Be careful when which line will be picked first because the center line is always base on L1. The standard properties for centerline are already applied if this command is used.
                      </p>
                    </div>

                    <div className="step-header" style={{ marginTop: '2rem', marginLeft: "3rem" }}>
                      <span className="step-number">c</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Piping Center Line"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    <img src={lineProp5Img} alt="Piping Center Line" className="software-screenshot screenshot-wide mt-4" />

                    <div className="step-header" style={{ marginTop: '2rem', marginLeft: "3rem" }}>
                      <span className="step-number">d</span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text="Change the representation of parts hierarchically"
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                    
                    <KaraokeLessonText
                      className="p-flush mb-4 mt-4"
                      text="This is use to change the Line properties of certain parts depends on the detail. This is very useful during detailing of assembly but can also use in parts detail"
                      isActive={isSpeaking && currentIndex === 2}
                      currentCharIndex={currentCharIndex}
                    />
                    <img src={lineProp6Img} alt="Change representation of parts hierarchically" className="software-screenshot screenshot-wide" />
                    <img src={lineProp7Img} alt="Change representation of parts hierarchically - continued" className="software-screenshot screenshot-wide mt-4" />
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

export default LinePropertiesLesson;
