import React, { useState, useEffect, useRef } from "react";

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'; import { ReadAloudButton } from "../ReadAloudButton";
import { useTTS } from "../../hooks/useTTS";

import "../../styles/2D_Drawing/CourseLesson.css";
/* Importing assets for Application of Surface (1) */

import shotblast1Img from "../../assets/2D_Image_File/2D_application_surface((1)_application_surface_1.png";

import shotblast2Img from "../../assets/2D_Image_File/2D_application_surface((1)_application_surface_2.png";
/* Importing assets for Application of Surface (2) */

import machiningImg from "../../assets/2D_Image_File/2D_application_surface((2)_machining.png";

import machining2Img from "../../assets/2D_Image_File/2D_application_surface((2)_machining_2.png";

interface SurfaceApplicationLessonProps {
  nextLabel?: string;
  subLessonId?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const SurfaceApplicationLesson: React.FC<SurfaceApplicationLessonProps> = ({
  subLessonId = "2d-surface-app-1",
  onNextLesson,
  onPrevLesson, nextLabel }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const surface1Steps = [
    "Surface Preparation: Before coating, the material's black skin must be removed. Shotblasting is a primary method used to smooth or roughen surfaces and remove contaminants.",
    "Shotblasting Classifications: It's commonly used for stress relief after welding and to increase fatigue resistance. For parts prone to corrosion from friction, shotblasting provides a critical protective surface."
  ];

  const surface2Steps = [
    "Machining for Finish: When shotblasting isn't required, machining all sides removes the black skin to achieve desired dimensions. For polished materials where black skin isn't present, these removal processes can some times be skipped entirely."
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
          Application of
          Surface{" "}
          {subLessonId === "2d-surface-app-1"
            ? "(1)"
            : subLessonId === "2d-surface-app-2"
              ? "(2)"
              : ""}
          <ReadAloudButton isSpeaking={isSpeaking} onStart={() => {
              if (subLessonId === "2d-surface-app-1") speak(surface1Steps);
              else speak(surface2Steps);
            }}
            onStop={stop}
          />
        </h3>

        <p className="lesson-subtitle">
          {" "}
          {subLessonId === "2d-surface-app-1"
            ? "Techniques and classifications for surface treatment and black skin removal using Shotblasting."
            : "Advanced surface machining and preparation processes."}
        </p>
      </section>
      <div className="lesson-grid single-card">
        <div className="lesson-card">
          {" "}
          {subLessonId === "2d-surface-app-1" ? (
            <div className="flex-col">
              {" "}
              {/* Introductory Info Box */}
              <div className="info-box-white">
                <p>
                  {" "}
                  Before the Application of Surface Treatment/ Coating, the
                  black skin of the material must be removed first to the part.
                  There are two (2) processes that we can apply on the part to
                  remove the black skin;
                  <br /> <strong>
                    (1) Shotblasting(Black skin Removal)
                  </strong>{" "}
                  and <strong>(2) Machining.</strong>
                </p>
              </div>{" "}
              {/* 1. Shotblasting Section */}
              <div>
                <p>
                  {" "}
                  <strong>1. Shotblasting</strong> is an operation of forcibly
                  propelling a stream of abrasive material against a surface
                  under high pressure to{" "}
                  <span>
                    smooth a rough surface, roughen a smooth surface, shape a
                    surface or remove surface contaminants.
                  </span>
                </p>
                <p>
                  {" "}
                  There are two(2) classification of Shotblasting base on the
                  purpose of application, process needed to apply on the part
                  and purpose of the part.
                </p>{" "}
                {/* a. Common Usage */}
                <div>
                  {" "}
                  <h5>a. Shotblasting is commonly used for:</h5>{" "}
                  <ul className="list-flush">
                    {" "}
                    <li>removal of stress after welding process</li>{" "}
                    <li>
                      removal of stress or deformation after refine machining
                      process
                    </li>{" "}
                    <li>mechanical cleaning of raw materials</li>{" "}
                    <li>
                      increase resistance to fatigue (Corrosion may occur after
                      removal)
                    </li>{" "}
                    <li>preparing surfaces for painting</li>{" "}
                  </ul>
                  <p>Example:</p>
                  <div className="image-wrapper-flush">
                    <img src={shotblast1Img} alt="Shotblasting Example 1 - Welding Stress" className="software-screenshot screenshot-wide" />
                  </div>
                  <p>
                    {" "}
                    For this part, <span>shotblasting</span> is applied to
                    remove the stress from the welding process and in
                    preparation of painting.
                  </p>
                </div>
                <div className="section-divider"></div>{" "}
                {/* b. Black Skin Removal */}
                <div>
                  {" "}
                  <h5>b. Shotblasting(Black skin Removal) is used for:</h5>{" "}
                  <ul className="list-flush">
                    {" "}
                    <li>removal of black skin of part or material</li>{" "}
                    <li>
                      increase resistance to fatigue (Corrosion may occur after
                      removal)
                    </li>{" "}
                    <li>
                      preparing for application of Surface Coating/ Treatment.
                      ex. Isonite, Ionite, Parsonite, etc.
                    </li>{" "}
                  </ul>
                  <p>Example:</p>
                  <div className="image-wrapper-flush">
                    <img src={shotblast2Img} alt="Shotblasting Example 2 - Black Skin Removal" className="software-screenshot screenshot-wide" />
                  </div>
                  <p>
                    {" "}
                    For the given example, <span>shotblasting</span> is applied
                    because the part is attached to an adjusting bracket which
                    increases the possibility of corrosion due to friction and
                    heat. Since shotblasting have a property where it increases
                    the resistance to corrosion and fatigue of the material
                    which is suitable to apply on the part.
                  </p>
                </div>
              </div>
            </div>
          ) : subLessonId === "2d-surface-app-2" ? (
            <div className="flex-col">
              {" "}
              {/* 2. Machining Section */}
              <div>
                <p>
                  {" "}
                  <strong>2. Machining</strong> is any of vaiorius processes in
                  which a piece of raw material is cut into a desired final
                  shape and size by controlled material-removal process.
                </p>{" "}
                {/* Example 1 */}
                <div>
                  <p>Example:</p>

                  <div className="image-wrapper-flush">
                    <img src={machiningImg} alt="Machining Example 1 - Mounting Bracket" className="software-screenshot screenshot-wide" />
                  </div>

                  <p>
                    {" "}
                    This part serves as a mounting bracket where a cam clutch is
                    attached. Since the clutch rotates with the aid of a bearing
                    installed with it, the part will not rotate and no corrosion
                    will be applied on the part, which means{" "}
                    <span>application of shotblasting is not necessary</span>,
                    instead machine all the sides in order to get rid the black
                    skin of the material.
                  </p>
                </div>
                <div className="section-divider"></div>
                {/* Example 2 */}
                <div>
                  <p>Example:</p>

                  <div className="image-wrapper-flush">
                    <img src={machining2Img} alt="Machining Example 2 - Polished Material" className="software-screenshot screenshot-wide" />
                  </div>

                  <p>
                    {" "}
                    This part uses a polished material where in from the raw
                    material itself, black skin is not present which means{" "}
                    <span>
                      application of Shotblasting(Black skin removal) and
                      Machining the sides are not necessary
                    </span>
                    , aside from machining the part to desired shape.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="placeholder-text">
              Content for
              {subLessonId} is being prepared.
            </p>
          )}
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
    </div>
  );
};

export default SurfaceApplicationLesson;



