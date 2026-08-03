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
import flatBar1Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar1.png";
import flatBar2Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar2.png";
import flatBar3Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar3.png";
import flatBar4Img from "../../../../assets/Standard/Kemco_JIS_Standard/Flat_Bar4.png";

/* Gallery Assets — Image 5 (Round Bar) */
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
      { src: steelTable1Img, label: "Flat Bar (Polished) SS400-D", number: 1 },
      { src: steelTable2Img, label: "Flat Bar (Polished) S45C-D", number: 2 },
      { src: steelTable3Img, label: "Square Steel (Black-SS400, S50C) & Round Bar (Black Coated) S25C, S45C, SCM440", number: 3 },
    ];
  } else if (subLessonId === 'general-standard-steel-flat') {
    currentGalleryImages = [
      { src: flatBar1Img, label: "Flat Bar", number: 1 },
      { src: flatBar2Img, label: "Flat Bar", number: 2 },
      { src: flatBar3Img, label: "Flat Bar", number: 3 },
      { src: flatBar4Img, label: "Flat Bar", number: 4 },
    ];
  } else if (subLessonId === 'general-standard-steel-round') {
    currentGalleryImages = [
      { src: roundBar1Img, label: "Round Bar Size Chart (Polished)", number: 1 },
      { src: roundBar2Img, label: "Round Bar Size Chart (Polished)", number: 2 },
      { src: roundBar3Img, label: "Square/Hexagonal (Polished)", number: 3 },
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

      <div className="lesson-grid single-card" style={{ marginTop: "0.5rem" }}>
        <div className="lesson-card tab-content fade-in" style={{ paddingTop: "1.5rem", gap: "0rem" }}>

          {(!subLessonId || subLessonId === 'general-standard-steel-main' || subLessonId === 'general-standard-steel') && (
            <>

              {/* ── Image Gallery ── */}
              <div className="card-header">
                <h4 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "2rem" }}>{currentGalleryImages[safeGalleryIndex].label}</h4>
              </div>
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
                    height: "700px",
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
                      justifyContent: "center",
                      gap: "1rem",
                      width: "100%",
                      marginTop: "1rem"
                    }}
                  >
                    <button
                      onClick={handleGalleryPrev}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--accent)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
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
                      onClick={handleGalleryNext}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--accent)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {subLessonId === 'general-standard-steel-flat' && (
            <div className="gallery-section mt-2" style={{ width: "100%" }}>
              {/* ── Image Gallery ── */}
              <div className="card-header">
                <h4 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "2rem" }}>{currentGalleryImages[safeGalleryIndex].label}</h4>
              </div>
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
                    height: "1500px",
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
                      justifyContent: "center",
                      gap: "1rem",
                      width: "100%",
                      marginTop: "1rem"
                    }}
                  >
                    <button
                      onClick={handleGalleryPrev}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--accent)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
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
                      onClick={handleGalleryNext}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--accent)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {subLessonId === 'general-standard-steel-round' && (
            <div className="gallery-section mt-2" style={{ width: "100%" }}>
              {/* ── Image Gallery ── */}
              <div className="card-header">
                <h4 className="section-title" style={{ marginTop: "0.5rem", marginBottom: "2rem" }}>{currentGalleryImages[safeGalleryIndex].label}</h4>
              </div>
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
                    height: "1000px",
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
                      justifyContent: "center",
                      gap: "1rem",
                      width: "100%",
                      marginTop: "1rem"
                    }}
                  >
                    <button
                      onClick={handleGalleryPrev}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--accent)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={22} />
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
                      onClick={handleGalleryNext}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--accent)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight size={22} />
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
