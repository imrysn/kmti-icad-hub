import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import mainViewsImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_main_views.png";
import dimensioningOrderImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_dimensioning_order.png";
import criticalDetailsImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_critical_details.png";

/* Gallery Assets */
import slotLongHolesImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_slot&long_holes.png";
import bendedPlateImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_bended_plate.png";
import computationBendedImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_computation_bended.png";
import keyPlateImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_key_plate.png";
import materialImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_material.png";
import stkm16a13aImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_stkm_16a&13a.png";
import borekeyToleranceImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_borekey_tolerance.png";
import grooveImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_groove.png";
import instruction1Img from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_instruction1.png";
import instruction2Img from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_instruction2.png";
import instruction3Img from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_instruction3.png";
import ss400dImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_ss400-d.png";
import indicationQuantityImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_indication_quantity.png";

interface TwoDStandardLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  subLessonId?: string;
}

const galleryImages = [
  { src: slotLongHolesImg, label: "Slot Holes / Long Holes", number: 1 },
  { src: bendedPlateImg, label: "Bended Plate", number: 2 },
  { src: computationBendedImg, label: "Computation of Bended", number: 3 },
  { src: keyPlateImg, label: "Key Plate", number: 4 },
  { src: materialImg, label: "Material Specification", number: 5 },
  { src: stkm16a13aImg, label: "STKM 16A & 13A", number: 6 },
  { src: borekeyToleranceImg, label: "Bore Key Tolerance", number: 7 },
  { src: grooveImg, label: "Groove Specification", number: 8 },
  { src: instruction1Img, label: "Drawing Instruction 1", number: 9 },
  { src: instruction2Img, label: "Drawing Instruction 2", number: 10 },
  { src: instruction3Img, label: "Drawing Instruction 3", number: 11 },
  { src: ss400dImg, label: "SS400-D Properties", number: 12 },
  { src: indicationQuantityImg, label: "Indication of Quantity", number: 13 }
];

const reminderSteps = [
  "2D STANDARD",
  "REMINDER:",
  "Use the main views. (Front View, Top View, Right Side View)",
  "Follow the standard dimensioning order: start with the top, left, and bottom views. However, if additional dimensions are needed and these views become crowded, place them on the right view, utilize other views, or create detailed/section views.",
  "Ensure all dimensions and critical details are applied to the 2D detailing of parts and assemblies (example: chamfers, radius, machining symbols, welding symbols or notes, special notes, BOM and Isometric)."
];

const TwoDStandardLesson: React.FC<TwoDStandardLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
  subLessonId = '2d-main'
}) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore("kemco-2d-standard");

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    registerText(reminderSteps, 0);
  }, [registerText]);

  const tabsList = [{ id: "kemco-2d-standard" }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "kemco-2d-standard",
    reminderSteps.length,
    tabsList,
    () => { if (onNextLesson) onNextLesson(); },
    speak,
    reminderSteps,
    0
  );

  const handleNext = () => {
    stop();
    if (onNextLesson) onNextLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    stop();
    if (onPrevLesson) onPrevLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Gallery Navigation
  const handleGalleryNext = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleGalleryPrev = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Touch Swipe Gesture Handlers
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleGalleryNext();
    } else if (isRightSwipe) {
      handleGalleryPrev();
    }
  };

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {(!subLessonId || subLessonId === '2d-main' || subLessonId === '2d') && (
        <>
          <section className="lesson-intro">
            <KaraokeLessonText
              as="h3"
              className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
              data-reading-index="0"
              text="2D STANDARD"
              isActive={isSpeaking && currentIndex === 0}
              currentCharIndex={currentCharIndex}
            />
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text="REMINDER:"
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
          </section>

          <div className="lesson-grid single-card">
            <div className="lesson-card tab-content fade-in">
              {/* Item 1 */}
              <div
                className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}
                data-reading-index="2"
              >
                <div className="flex-row-wrap" style={{ gap: "2.5rem", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ flex: "1.2", minWidth: "280px" }}>
                    <div className="step-header" style={{ marginBottom: "1.5rem" }}>
                      <span className="step-number">1 </span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text='Use the main views. <span class="red-text">(Front View, Top View, Right Side View)</span>'
                        isActive={isSpeaking && currentIndex === 2}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                  </div>
                  <div style={{ flex: "1", minWidth: "280px", display: "flex", justifyContent: "center" }}>
                    <img
                      src={mainViewsImg}
                      alt="Main Views"
                      className="software-screenshot"
                      style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div
                className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}
                data-reading-index="3"
              >
                <div className="flex-row-wrap" style={{ gap: "2.5rem", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ flex: "1.2", minWidth: "280px" }}>
                    <div className="step-header" style={{ marginBottom: "1.5rem", alignItems: "flex-start" }}>
                      <span className="step-number">2 </span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text='Follow the standard dimensioning order: <span class="red-text">start with the top, left, and bottom views</span>. However, if additional dimensions are needed and these views become crowded, place them on the right view, utilize other views, or create <span class="red-text">detailed/section views</span>.'
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                  </div>
                  <div style={{ flex: "1", minWidth: "280px", display: "flex", justifyContent: "center" }}>
                    <img
                      src={dimensioningOrderImg}
                      alt="Dimensioning Order"
                      className="software-screenshot"
                      style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div
                className={`instruction-step ${currentIndex === 4 ? "reading-active" : ""}`}
                data-reading-index="4"
              >
                <div className="flex-row-wrap" style={{ gap: "2.5rem", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ flex: "1.2", minWidth: "280px" }}>
                    <div className="step-header" style={{ marginBottom: "1.5rem", alignItems: "flex-start" }}>
                      <span className="step-number">3 </span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text='Ensure all <span class="red-text">dimensions</span> and <span class="red-text">critical details</span> are applied to the 2D detailing of parts and assemblies <span class="red-text">(example: chamfers, radius, machining symbols, welding symbols or notes, special notes, BOM and Isometric)</span>.'
                        isActive={isSpeaking && currentIndex === 4}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                  </div>
                  <div style={{ flex: "1", minWidth: "280px", display: "flex", justifyContent: "center" }}>
                    <img
                      src={criticalDetailsImg}
                      alt="Critical Details"
                      className="software-screenshot"
                      style={{ maxWidth: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Page Navigation */}
              <div className="lesson-navigation mt-12">
                <button
                  className="nav-button"
                  onClick={handlePrev}
                  disabled={!onPrevLesson}
                >
                  <ChevronLeft size={18} /> Previous
                </button>
                <button className="nav-button next" onClick={handleNext}>
                  {nextLabel || "Next Lesson"} <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {subLessonId === '2d-gallery' && (
        <>
          <section className="lesson-intro">
            <h3 className="section-title">Reference Standard Gallery</h3>
          </section>

          <div className="lesson-grid single-card">
            <div className="lesson-card tab-content fade-in">
              <div
                className="gallery-container"
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  width: "100%",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Image Frame */}
                <div
                  style={{
                    width: "100%",
                    height: "650px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={galleryImages[galleryIndex].src}
                    alt={galleryImages[galleryIndex].label}
                    loading="lazy"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>

                {/* Slider Controls & Indicators */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "1.5rem"
                  }}
                >
                  <button
                    className="nav-button"
                    onClick={handleGalleryPrev}
                    style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                  >
                    <ChevronLeft size={16} /> Previous Image
                  </button>

                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-main)", display: "block" }}>
                      {galleryImages[galleryIndex].label}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      Image {galleryImages[galleryIndex].number} of 13
                    </span>
                  </div>

                  <button
                    className="nav-button"
                    onClick={handleGalleryNext}
                    style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                  >
                    Next Image <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Page Navigation */}
              <div className="lesson-navigation mt-12">
                <button
                  className="nav-button"
                  onClick={handlePrev}
                  disabled={!onPrevLesson}
                >
                  <ChevronLeft size={18} /> Previous
                </button>
                <button className="nav-button next" onClick={handleNext}>
                  {nextLabel || "Next Lesson"} <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TwoDStandardLesson;
