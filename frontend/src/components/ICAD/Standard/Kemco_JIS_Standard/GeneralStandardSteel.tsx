import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets — Images 1, 2, 3 */
import steelTable1Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table1.png";
import steelTable2Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table2.png";
import steelTable3Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table3.png";

/* Gallery Assets — Image 4 (Flat Bar) */
import steelTable4Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table4.png";
import flatBar1Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar1.png";
import flatBar2Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar2.png";
import flatBar3Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar3.png";
import flatBar4Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar4.png";

/* Gallery Assets — Image 5 (Round Bar) */
import steelTable5Img from "../../../../assets/Standard/Kemco_JIS_Standard/steel_material_table5.png";
import roundBar1Img from "../../../../assets/Standard/Kemco_JIS_Standard/Round_Bar1.png";
import roundBar2Img from "../../../../assets/Standard/Kemco_JIS_Standard/Round_Bar2.png";
import roundBar3Img from "../../../../assets/Standard/Kemco_JIS_Standard/Round_Bar3.png";

interface GeneralStandardSteelLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  subLessonId?: string;
}

const reminderSteps = [
  "General Standard Steel Material Table",
  "REMINDER:",
  "Please review the General Standard Steel Material Table.",
  "Ensure standard steel materials are selected according to this table.",
];

const GeneralStandardSteelLesson: React.FC<GeneralStandardSteelLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
  subLessonId = 'general-standard-steel-main'
}) => {
  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText,
  } = useLessonCore("kemco-general-standard-steel");

  useEffect(() => {
    registerText(reminderSteps, 0);
  }, [registerText]);

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reset gallery index when subLessonId changes
  useEffect(() => {
    setGalleryIndex(0);
  }, [subLessonId]);

  let currentGalleryImages: { src: string; label: string; number: number; }[] = [];
  if (!subLessonId || subLessonId === 'general-standard-steel-main' || subLessonId === 'general-standard-steel') {
    currentGalleryImages = [
      { src: steelTable1Img, label: "Steel Material Table 1", number: 1 },
      { src: steelTable2Img, label: "Steel Material Table 2", number: 2 },
      { src: steelTable3Img, label: "Steel Material Table 3", number: 3 },
    ];
  } else if (subLessonId === 'general-standard-steel-flat') {
    currentGalleryImages = [
      { src: flatBar1Img, label: "Flat Bar Reference Table 1", number: 1 },
      { src: flatBar2Img, label: "Flat Bar Reference Table 2", number: 2 },
      { src: flatBar3Img, label: "Flat Bar Reference Table 3", number: 3 },
      { src: flatBar4Img, label: "Flat Bar Reference Table 4", number: 4 },
    ];
  } else if (subLessonId === 'general-standard-steel-round') {
    currentGalleryImages = [
      { src: roundBar1Img, label: "Round Bar Reference Table 1", number: 1 },
      { src: roundBar2Img, label: "Round Bar Reference Table 2", number: 2 },
      { src: roundBar3Img, label: "Round Bar Reference Table 3", number: 3 },
    ];
  }

  const safeGalleryIndex = galleryIndex >= currentGalleryImages.length ? 0 : galleryIndex;

  const handleGalleryNext = () => {
    setGalleryIndex((prev) => (prev + 1) % currentGalleryImages.length);
  };

  const handleGalleryPrev = () => {
    setGalleryIndex((prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length);
  };

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

  const tabsList = [{ id: "kemco-general-standard-steel" }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "kemco-general-standard-steel",
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

  return (
    <div className="course-lesson-container" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="lesson-intro">
        <KaraokeLessonText
          as="h3"
          className={`section-title ${currentIndex === 0 ? "reading-active" : ""}`}
          data-reading-index="0"
          text={
            subLessonId === 'general-standard-steel-flat' ? "Flat Bar Reference Table" :
            subLessonId === 'general-standard-steel-round' ? "Round Bar" :
            "General Standard Steel Material Table"
          }
          isActive={isSpeaking && currentIndex === 0}
          currentCharIndex={currentCharIndex}
        />
        {(!subLessonId || subLessonId === 'general-standard-steel-main' || subLessonId === 'general-standard-steel') && (
          <KaraokeLessonText
            className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
            data-reading-index="1"
            text="REMINDER:"
            isActive={isSpeaking && currentIndex === 1}
            currentCharIndex={currentCharIndex}
            style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
          />
        )}
      </section>

      <div className="lesson-grid single-card" style={{ marginTop: "0.5rem" }}>
        <div className="lesson-card tab-content fade-in" style={{ paddingTop: "1.5rem", gap: "0.5rem" }}>

          {(!subLessonId || subLessonId === 'general-standard-steel-main' || subLessonId === 'general-standard-steel') && (
            <>
              {/* Step 1 */}
              <div
                className={`instruction-step ${currentIndex === 2 ? "reading-active" : ""}`}
                data-reading-index="2"
                style={{ marginTop: "0.5rem" }}
              >
                <div className="step-header">
                  <span className="step-number">1 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Please review the General Standard Steel Material Table."
                    isActive={isSpeaking && currentIndex === 2}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`instruction-step ${currentIndex === 3 ? "reading-active" : ""}`}
                data-reading-index="3"
                style={{ marginTop: "0.5rem" }}
              >
                <div className="step-header">
                  <span className="step-number">2 </span>
                  <KaraokeLessonText
                    as="span"
                    className="step-label"
                    text="Ensure standard steel materials are selected according to this table."
                    isActive={isSpeaking && currentIndex === 3}
                    currentCharIndex={currentCharIndex}
                  />
                </div>
              </div>

              {/* ── Image Gallery ── */}
              <div
                className="gallery-container mt-2"
                style={{
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
                    height: "450px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={currentGalleryImages[safeGalleryIndex].src}
                    alt={currentGalleryImages[safeGalleryIndex].label}
                    loading="lazy"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>

                {/* Slider Controls & Indicators */}
                {currentGalleryImages.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "1rem"
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
                        {currentGalleryImages[safeGalleryIndex].label}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Image {currentGalleryImages[safeGalleryIndex].number} of {currentGalleryImages.length}
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
                )}
              </div>
            </>
          )}

          {subLessonId === 'general-standard-steel-flat' && (
            <div className="gallery-section mt-2" style={{ width: "100%" }}>
              {/* ── Image Gallery ── */}
              <div
                className="gallery-container"
                style={{
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
                    width: "200%",
                    height: "1100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={currentGalleryImages[safeGalleryIndex].src}
                    alt={currentGalleryImages[safeGalleryIndex].label}
                    loading="lazy"
                    style={{
                      maxWidth: "200%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>

                {/* Slider Controls & Indicators */}
                {currentGalleryImages.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "1rem"
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
                        {currentGalleryImages[safeGalleryIndex].label}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Image {currentGalleryImages[safeGalleryIndex].number} of {currentGalleryImages.length}
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
                )}
              </div>
            </div>
          )}

          {subLessonId === 'general-standard-steel-round' && (
            <div className="gallery-section mt-2" style={{ width: "100%" }}>
              {/* ── Image Gallery ── */}
              <div
                className="gallery-container"
                style={{
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
                    height: "850px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={currentGalleryImages[safeGalleryIndex].src}
                    alt={currentGalleryImages[safeGalleryIndex].label}
                    loading="lazy"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>

                {/* Slider Controls & Indicators */}
                {currentGalleryImages.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "1rem"
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
                        {currentGalleryImages[safeGalleryIndex].label}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Image {currentGalleryImages[safeGalleryIndex].number} of {currentGalleryImages.length}
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
                )}
              </div>
            </div>
          )}

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

    </div>
  );
};

export default GeneralStandardSteelLesson;
