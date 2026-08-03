import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import steelPipe1Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe1.png";
import steelPipe2Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe2.png";
import steelPipe3Img from "../../../../assets/Standard/Kemco_JIS_Standard/structural_steel_pipe3.png";

interface SteelPipesLessonProps {
  nextLabel?: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

const reminderSteps = [
  "S45C Structural Carbon Steel Pipe - Inner Diameter Specified",
  "(Akashi-Approve) (STKM16A)",
];

const SteelPipesLesson: React.FC<SteelPipesLessonProps> = ({
  onNextLesson,
  onPrevLesson,
  nextLabel,
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
  } = useLessonCore("steel-pipes");

  useEffect(() => {
    registerText(reminderSteps, 0);
  }, [registerText]);

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const galleryImages = [
    { src: steelPipe1Img, label: "Structural Steel Pipe 1", number: 1 },
    { src: steelPipe2Img, label: "Structural Steel Pipe 2", number: 2 },
    { src: steelPipe3Img, label: "Structural Steel Pipe 3", number: 3 },
  ];

  const handleGalleryNext = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleGalleryPrev = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
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

  const tabsList = [{ id: "steel-pipes" }];

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "steel-pipes",
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

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className="lesson-intro" style={{ border: "none", background: "none", boxShadow: "none", backdropFilter: "none", marginBottom: "0.5rem", padding: "1rem 0" }}>
            <div className="card-header">
              <h4 className="section-title"> S45C Structural Carbon Steel Pipe - Inner Diameter Specified </h4>
            </div>
            <KaraokeLessonText
              className={`lesson-subtitle ${currentIndex === 1 ? "reading-active" : ""}`}
              data-reading-index="1"
              text="(Akashi-Approve) (STKM16A)"
              isActive={isSpeaking && currentIndex === 1}
              currentCharIndex={currentCharIndex}
            />
          </div>

      {/* Step 1 */}

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
                height: "1500px",
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
            {galleryImages.length > 1 && (
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
                    {galleryImages[galleryIndex].label}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Image {galleryImages[galleryIndex].number} of {galleryImages.length}
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

export default SteelPipesLesson;
