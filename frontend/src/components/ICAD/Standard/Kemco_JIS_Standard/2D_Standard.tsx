import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, X } from 'lucide-react';
import { useLessonCore } from "../../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../../KaraokeLessonText";
import "../../../../styles/2D_Drawing/CourseLesson.css";

/* Static Assets */
import icadInterfaceBg from "../../../../assets/3D_INTERACTIVE/icad_interface.jpg";
import mainViewsImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_main_views.png";
import dimensioningOrderImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_dimensioning_order.png";
import criticalDetailsImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_critical_details.png";

/* Gallery Assets */
import slotLongHolesImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_slot&long_holes.png";
import bendedPlateImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_bended_plate.png";
import computationBendedImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_computation_bended.png";
import keyPlateImg from "../../../../assets/Standard/Kemco_JIS_Standard/2d_standard_key_plate.png";
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
  { src: slotLongHolesImg, label: "Slot Holes / Long Holes", alt: "Slot Holes / Long Holes", number: 1 },
  { src: bendedPlateImg, label: "Bended Plate", alt: "Bended Plate", number: 2 },
  { src: computationBendedImg, label: "Computation of Bended", alt: "Computation of Bended", number: 3 },
  { src: keyPlateImg, label: "Key Plate", alt: "Key Plate", number: 4 },
  { 
    label: "Material Specification", 
    alt: "Material Specification", 
    number: 5,
    content: (
        <div className="lesson-table-container" style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}>
            <table className="lesson-table" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ background: 'rgba(221, 77, 250, 0.1)', color: '#F97316', borderBottom: '2px solid #DD4DFA', textAlign: "center", fontSize: "1.2rem" }}>SPCC</th>
                    </tr>
                    <tr>
                        <th style={{ background: 'rgba(221, 77, 250, 0.1)', color: '#DD4DFA', borderBottom: '2px solid #DD4DFA', textAlign: "center" }}>Thickness</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 2.3, 3, 3.2].map((val, idx) => (
                        <tr key={idx}>
                            <td style={{ textAlign: "center" }}>{val}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
  },
  { src: stkm16a13aImg, label: "STKM 16A & STKM13A", alt: "STKM 16A & STKM13A", number: 6 },
  { src: borekeyToleranceImg, label: "Bore Key Tolerance", alt: "Bore Key Tolerance", number: 7 },
  { src: grooveImg, label: "Groove", alt: "Groove", number: 8 },
  { src: instruction1Img, label: "Drawing Instruction 1", alt: "Drawing Instruction 1", number: 9 },
  { src: instruction2Img, label: "Drawing Instruction 2", alt: "Drawing Instruction 2", number: 10 },
  { src: instruction3Img, label: "Drawing Instruction 3", alt: "Drawing Instruction 3", number: 11 },
  { src: ss400dImg, label: "SS400-D Properties", alt: "SS400-D Properties", number: 12 },
  { src: indicationQuantityImg, label: <>Indication of Quantity for <span className="red-text">(Hole,Chamfer and Radius)</span></>, alt: "Indication of Quantity for (Hole,Chamfer and Radius)", number: 13 }
];

const reminderSteps = [
  "Use the main views. (Front View, Top View, Right Side View)",
  "Follow the standard dimensioning order: start with the top, left, and bottom views. However, if additional dimensions are needed and these views become crowded, place them on the right view, utilize other views, or create detailed/section views",
  "Ensure all dimensions and critical details are applied to the 2D detailing of parts and assemblies (example: chamfers, radius, machining symbols, welding symbols or notes, special notes, BOM and Isometric)"
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
  const [showMenu, setShowMenu] = useState(false);
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

          <div className="lesson-grid single-card">
            <div className="lesson-card tab-content fade-in">
              <div className="card-header">
                <h4 className="section-title">Reminder:</h4>
              </div>
              
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
                  <div style={{ flex: "4", minWidth: "200px" }}>
                    <div className="step-header" style={{ marginBottom: "3rem", alignItems: "flex-start" }}>
                      <span className="step-number">2 </span>
                      <KaraokeLessonText
                        as="span"
                        className="step-label"
                        text='Follow the standard dimensioning order: <span class="red-text">start with the top, left, and bottom views.</span> However, if additional dimensions are needed and these views become crowded, place them on the right <span style="display: inline-block;">view, utilize other views, or create <span class="red-text">detailed/section views</span></span>'
                        isActive={isSpeaking && currentIndex === 3}
                        currentCharIndex={currentCharIndex}
                      />
                    </div>
                  </div>
                  <div style={{ flex: "1", minWidth: "150px", display: "flex", justifyContent: "center" }}>
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
                        text='Ensure all <span class="red-text">dimensions</span> and <span class="red-text">critical details</span> are applied to the 2D detailing of parts and assemblies <span class="red-text">(example: chamfers, radius, machining symbols, welding symbols or notes, special notes, BOM and Isometric)</span>'
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
                      style={{ maxWidth: "105%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
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
        <div
          style={{
            background: "var(--bg-dark)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: "2rem 2rem 3rem",
            gap: "1.5rem",
          }}
        >
          {/* ── Top bar: card-header style, flex-start, Browse menu right ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <h4 style={{
              color: "var(--text-main)",
              margin: 0,
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              borderLeft: "4px solid #DD4DFA",
              paddingLeft: "0.75rem",
            }}>
              {galleryImages[galleryIndex].label}
            </h4>

            {/* Browse shortcut menu — right */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={() => setShowMenu((v) => !v)}
                style={{
                  background: showMenu ? "#DD4DFA" : "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "999px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  color: showMenu ? "#fff" : "var(--text-main)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  transition: "all 0.2s ease",
                  boxShadow: showMenu ? "0 0 18px rgba(221,77,250,0.5)" : "none",
                }}
                aria-label="Browse images"
              >
                {showMenu ? <X size={15} /> : <LayoutGrid size={15} />}
                {showMenu ? "Close" : "Browse"}
              </button>

              {showMenu && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  width: "280px",
                  background: "var(--bg-surface)",
                  border: "1px solid rgba(221,77,250,0.4)",
                  borderRadius: "14px",
                  boxShadow: "var(--shadow-card)",
                  zIndex: 1000,
                  maxHeight: "440px",
                  overflowY: "auto",
                  padding: "0.5rem 0",
                }}>
                  <div style={{
                    padding: "0.65rem 1rem",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#DD4DFA",
                    borderBottom: "1px solid var(--border-color)",
                    marginBottom: "0.25rem",
                  }}>
                    2D Standard Reference
                  </div>
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setGalleryIndex(idx); setShowMenu(false); }}
                      style={{
                        width: "100%",
                        background: idx === galleryIndex ? "rgba(221,77,250,0.18)" : "transparent",
                        border: "none",
                        borderLeft: idx === galleryIndex ? "3px solid #DD4DFA" : "3px solid transparent",
                        padding: "0.6rem 1rem",
                        textAlign: "left",
                        cursor: "pointer",
                        color: idx === galleryIndex ? "#DD4DFA" : "var(--text-muted)",
                        fontSize: "0.82rem",
                        fontWeight: idx === galleryIndex ? 700 : 400,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (idx !== galleryIndex) {
                          (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-hover)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-main)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (idx !== galleryIndex) {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                        }
                      }}
                    >
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
                        background: idx === galleryIndex ? "rgba(221,77,250,0.3)" : "var(--bg-hover)",
                        fontSize: "0.68rem", fontWeight: 800,
                        color: idx === galleryIndex ? "#DD4DFA" : "var(--text-dim)",
                      }}>
                        {img.number}
                      </span>
                      <span style={{ color: idx === galleryIndex ? "#DD4DFA" : "var(--text-main)", lineHeight: 1.4, flex: 1, fontSize: "0.82rem" }}>
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── ICAD Interface Frame ── */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "relative",
              width: "130%",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              border: "1px solid var(--border-color)",
              lineHeight: 0,
            }}
          >
            {/* ICAD screenshot — defines aspect ratio */}
            <img
              src={icadInterfaceBg}
              alt="ICAD iCAD SX Interface"
              style={{ width: "100%", height: "auto", display: "block" }}
              draggable={false}
            />

            {/* Gallery image overlaid on the pink canvas
                Pink canvas: left≈21.1%, top≈10.7%, width≈69.6%, height≈84% */}
            <div style={{
              position: "absolute",
              left: "21.1%",
              top: "10.7%",
              width: "69.6%",
              height: "84%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              padding: "1%",
            }}>
              {galleryImages[galleryIndex].content ? (
                galleryImages[galleryIndex].content
              ) : (
                <img
                  src={galleryImages[galleryIndex].src}
                  alt={galleryImages[galleryIndex].alt}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transition: "opacity 0.25s ease",
                  }}
                />
              )}
            </div>

            {/* Dark pill control bar — bottom-right of the frame (like the reference) */}
            <div style={{
              position: "absolute",
              bottom: "4%",
              right: "2%",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              background: "var(--bg-surface)",
              backdropFilter: "blur(16px)",
              borderRadius: "999px",
              padding: "0.4rem 0.75rem",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-card)",
            }}>
              <button
                onClick={handleGalleryPrev}
                style={{
                  background: "none", border: "none", cursor: "pointer", color: "var(--text-main)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0.2rem 0.35rem", borderRadius: "50%", transition: "background 0.15s",
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>

              <span style={{
                fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)",
                padding: "0 0.35rem", whiteSpace: "nowrap",
              }}>
                {galleryImages[galleryIndex].number} / {galleryImages.length}
              </span>

              <button
                onClick={handleGalleryNext}
                style={{
                  background: "none", border: "none", cursor: "pointer", color: "var(--text-main)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0.2rem 0.35rem", borderRadius: "50%", transition: "background 0.15s",
                }}
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* ── Bottom navigation: PREVIOUS | NEXT LESSON ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "860px",
            width: "100%",
            margin: "0 auto",
            paddingTop: "0.5rem",
          }}>
            <button
              onClick={handlePrev}
              disabled={!onPrevLesson}
              style={{
                background: "transparent",
                border: "1px solid var(--border-color)",
                borderRadius: "999px",
                padding: "0.75rem 1.75rem",
                color: "var(--text-main)",
                fontFamily: "var(--font-heading, 'Inter', sans-serif)",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: !onPrevLesson ? "not-allowed" : "pointer",
                opacity: !onPrevLesson ? 0.35 : 1,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <button
              onClick={handleNext}
              style={{
                background: "#DD4DFA",
                border: "none",
                borderRadius: "999px",
                padding: "0.75rem 1.75rem",
                color: "#fff",
                fontFamily: "var(--font-heading, 'Inter', sans-serif)",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 0 20px rgba(221,77,250,0.45)",
                transition: "all 0.2s ease",
              }}
            >
              {nextLabel || "Next Lesson"} <ChevronRight size={16} />
            </button>
          </div>
        </div>

      )}
    </div>
  );
};

export default TwoDStandardLesson;
