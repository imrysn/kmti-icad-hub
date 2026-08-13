import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, X, GripHorizontal, Maximize, Minimize } from 'lucide-react';
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
              <th style={{ background: 'rgba(221, 77, 250, 0.1)', color: '#DD4DFA', borderBottom: '2px solid #DD4DFA', textAlign: "center", fontSize: "1.2rem" }}>SPCC</th>
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
  const [navPos, setNavPos] = useState({ x: 0, y: 0 });
  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startNavX: number; startNavY: number } | null>(null);

  // Fullscreen pill drag position
  const [fsPillPos, setFsPillPos] = useState({ x: 0, y: 0 });
  const fsPillDragRef = useRef<{ startX: number; startY: number; startPX: number; startPY: number } | null>(null);

  // Zoom & Pan state for fullscreen
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const lastPinchDistRef = useRef<number | null>(null);
  const fsContainerRef = useRef<HTMLDivElement>(null);
  // Refs for browse dropdowns — wheel events inside these should scroll the list, not zoom the image
  const fsBrowseDropdownRef = useRef<HTMLDivElement>(null);
  const normalBrowseDropdownRef = useRef<HTMLDivElement>(null);

  const resetZoomPan = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Reset zoom/pan when image changes or fullscreen exits
  useEffect(() => {
    resetZoomPan();
  }, [galleryIndex, isGalleryFullscreen, resetZoomPan]);

  // ESC key exits fullscreen
  useEffect(() => {
    if (!isGalleryFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsGalleryFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isGalleryFullscreen]);

  // Mouse wheel zoom in fullscreen
  // NOTE: We use a native non-passive listener (via useEffect below) so that
  // e.preventDefault() actually stops the page from scrolling. React's synthetic
  // onWheel handler is passive by default and cannot call preventDefault().
  const handleFsWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setZoom(prev => Math.min(8, Math.max(0.5, prev - e.deltaY * 0.001)));
  }, []);

  // Attach a non-passive native wheel listener to the fullscreen container
  // so preventDefault() is honored and the page does not scroll while zooming.
  useEffect(() => {
    const el = fsContainerRef.current;
    if (!el || !isGalleryFullscreen) return;
    el.addEventListener('wheel', handleFsWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleFsWheel);
  }, [isGalleryFullscreen, handleFsWheel]);

  // Attach non-passive wheel listeners to the browse dropdowns so their scroll
  // events are stopped before reaching the fullscreen zoom handler.
  useEffect(() => {
    const stopProp = (e: WheelEvent) => e.stopPropagation();
    const fsEl = fsBrowseDropdownRef.current;
    const normEl = normalBrowseDropdownRef.current;
    if (fsEl) fsEl.addEventListener('wheel', stopProp, { passive: false });
    if (normEl) normEl.addEventListener('wheel', stopProp, { passive: false });
    return () => {
      if (fsEl) fsEl.removeEventListener('wheel', stopProp);
      if (normEl) normEl.removeEventListener('wheel', stopProp);
    };
  }, [showMenu, isGalleryFullscreen]);

  // Mouse drag pan in fullscreen
  const handleFsMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isPanningRef.current = true;
    panStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    e.preventDefault();
  }, [pan]);

  const handleFsMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanningRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setPan({ x: panStartRef.current.panX + dx, y: panStartRef.current.panY + dy });
  }, []);

  const handleFsMouseUp = useCallback(() => {
    isPanningRef.current = false;
  }, []);

  // Touch pinch-zoom + drag in fullscreen
  const handleFsTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDistRef.current = Math.sqrt(dx * dx + dy * dy);
    } else if (e.touches.length === 1) {
      isPanningRef.current = true;
      panStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: pan.x, panY: pan.y };
    }
  }, [pan]);

  const handleFsTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (lastPinchDistRef.current !== null) {
        const delta = dist - lastPinchDistRef.current;
        setZoom(prev => Math.min(8, Math.max(0.5, prev + delta * 0.01)));
      }
      lastPinchDistRef.current = dist;
    } else if (e.touches.length === 1 && isPanningRef.current) {
      const ddx = e.touches[0].clientX - panStartRef.current.x;
      const ddy = e.touches[0].clientY - panStartRef.current.y;
      setPan({ x: panStartRef.current.panX + ddx, y: panStartRef.current.panY + ddy });
    }
  }, []);

  const handleFsTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) lastPinchDistRef.current = null;
    if (e.touches.length === 0) isPanningRef.current = false;
  }, []);

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

  // Control bar drag handlers (Solidworks-style draggable pill)
  const handlePillPointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startNavX: navPos.x,
      startNavY: navPos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePillPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setNavPos({
      x: dragRef.current.startNavX + dx,
      y: dragRef.current.startNavY + dy,
    });
  };

  const handlePillPointerUp = (e: React.PointerEvent) => {
    if (dragRef.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      dragRef.current = null;
    }
  };

  // Fullscreen pill drag handlers
  const handleFsPillPointerDown = (e: React.PointerEvent) => {
    fsPillDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPX: fsPillPos.x,
      startPY: fsPillPos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleFsPillPointerMove = (e: React.PointerEvent) => {
    if (!fsPillDragRef.current) return;
    e.stopPropagation();
    const dx = e.clientX - fsPillDragRef.current.startX;
    const dy = e.clientY - fsPillDragRef.current.startY;
    // Round to whole pixels to prevent sub-pixel blurriness on the composited pill layer
    setFsPillPos({
      x: Math.round(fsPillDragRef.current.startPX + dx),
      y: Math.round(fsPillDragRef.current.startPY + dy),
    });
  };

  const handleFsPillPointerUp = (e: React.PointerEvent) => {
    if (fsPillDragRef.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      fsPillDragRef.current = null;
    }
    e.stopPropagation();
  };

  const toggleGalleryFullscreen = () => {
    setIsGalleryFullscreen((v) => !v);
    setNavPos({ x: 0, y: 0 });
    setFsPillPos({ x: 0, y: 0 });
    resetZoomPan();
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
        <div className="gallery-section-wrapper">
          {/* ── Title header: lesson count + image title (no card-header) ── */}
          <div style={{ textAlign: "center", paddingBottom: "0.25rem" }}>
            <span style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#DD4DFA",
              marginBottom: "0.4rem",
            }}>
              {galleryImages[galleryIndex].number} of {galleryImages.length}
            </span>
            <h2
              className="gallery-image-title"
              style={{
                margin: 0,
                fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              {galleryImages[galleryIndex].label}
            </h2>
          </div>

          {/* ── Pink.png background frame with gallery image ── */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              margin: "0 auto",
              aspectRatio: "16 / 9",
            }}
          >
            {/* Gallery image centered */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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

            {/* ── Solidworks-style draggable dark pill control bar ── */}
            <div
              style={{
                position: "absolute",
                bottom: "4%",
                right: "2%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(20, 20, 25, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "40px",
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                color: "#fff",
                zIndex: 30,
                transform: `translate(${navPos.x}px, ${navPos.y}px)`,
                animation: "slideUpFade 0.5s ease-out",
              }}
            >
              {/* Drag handle */}
              <div
                onPointerDown={handlePillPointerDown}
                onPointerMove={handlePillPointerMove}
                onPointerUp={handlePillPointerUp}
                onPointerCancel={handlePillPointerUp}
                title="Drag to move panel"
                style={{ cursor: "grab", padding: "8px", marginRight: "4px", borderRadius: "4px", display: "flex" }}
              >
                <GripHorizontal size={20} color="#888" />
              </div>

              {/* Browse button (replaces Play) */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowMenu((v) => !v)}
                  title="Browse images"
                  style={{
                    background: showMenu ? "#DD4DFA" : "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 500,
                    boxShadow: showMenu ? "0 0 18px rgba(221,77,250,0.5)" : "none",
                  }}
                  aria-label="Browse images"
                >
                  {showMenu ? <X size={15} /> : <LayoutGrid size={15} />}
                  {showMenu ? "Close" : "Browse"}
                </button>

                {showMenu && (
                  <div ref={normalBrowseDropdownRef} style={{
                    position: "absolute",
                    bottom: "calc(100% + 10px)",
                    right: 0,
                    width: "280px",
                    background: "var(--bg-surface, #0a0a12)",
                    border: "1px solid rgba(221,77,250,0.4)",
                    borderRadius: "14px",
                    boxShadow: "var(--shadow-card, 0 24px 60px rgba(0,0,0,0.9), 0 0 24px rgba(221,77,250,0.2))",
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
                      borderBottom: "1px solid var(--border-color, rgba(255,255,255,0.07))",
                      marginBottom: "0.25rem",
                    }}>
                      {typeof galleryImages[galleryIndex].label === "string" ? galleryImages[galleryIndex].label : "2D Standard Reference"}
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
                          color: idx === galleryIndex ? "#DD4DFA" : "var(--text-muted, rgba(255,255,255,0.75))",
                          fontSize: "0.82rem",
                          fontWeight: idx === galleryIndex ? 700 : 400,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (idx !== galleryIndex) {
                            (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-hover, rgba(255,255,255,0.04))";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-main, #fff)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (idx !== galleryIndex) {
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted, rgba(255,255,255,0.75))";
                          }
                        }}
                      >
                        <span style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
                          background: idx === galleryIndex ? "rgba(221,77,250,0.3)" : "var(--bg-hover, rgba(255,255,255,0.07))",
                          fontSize: "0.68rem", fontWeight: 800,
                          color: idx === galleryIndex ? "#DD4DFA" : "var(--text-dim, rgba(255,255,255,0.4))",
                        }}>
                          {img.number}
                        </span>
                        <span style={{ color: idx === galleryIndex ? "#DD4DFA" : "var(--text-main, rgba(255,255,255,0.85))", lineHeight: 1.4, flex: 1, fontSize: "0.82rem" }}>
                          {img.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Previous */}
              <button
                onClick={handleGalleryPrev}
                style={{
                  background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                  padding: "6px 10px", borderRadius: "20px", fontSize: "0.8rem",
                  cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center",
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Next */}
              <button
                onClick={handleGalleryNext}
                style={{
                  background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                  padding: "6px 10px", borderRadius: "20px", fontSize: "0.8rem",
                  cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center",
                }}
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>

              {/* Fullscreen toggle */}
              <button
                onClick={toggleGalleryFullscreen}
                title={isGalleryFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                style={{
                  background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                  padding: "6px 10px", borderRadius: "20px", fontSize: "0.8rem",
                  cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center",
                }}
              >
                {isGalleryFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>
          </div>

          {/* ── Bottom navigation: PREVIOUS | NEXT LESSON ── */}
          <div className="lesson-navigation" style={{ maxWidth: "1000px", width: "100%", margin: "0 auto", borderTop: "none", paddingTop: "1.5rem", marginTop: 0 }}>
            <button
              className="nav-button"
              onClick={handlePrev}
              disabled={!onPrevLesson}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <button
              className="nav-button next"
              onClick={handleNext}
            >
              {nextLabel || "Next Lesson"} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── FULLSCREEN OVERLAY ── */}
      {isGalleryFullscreen && subLessonId === '2d-gallery' && (
        <div
          ref={fsContainerRef}
          className="gallery-fullscreen-overlay"
          /* wheel handled by native non-passive listener in useEffect */
          onMouseDown={handleFsMouseDown}
          onMouseMove={handleFsMouseMove}
          onMouseUp={handleFsMouseUp}
          onMouseLeave={handleFsMouseUp}
          onTouchStart={handleFsTouchStart}
          onTouchMove={handleFsTouchMove}
          onTouchEnd={handleFsTouchEnd}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backdropFilter: "blur(18px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            cursor: isPanningRef.current ? "grabbing" : "grab",
            userSelect: "none",
          }}
        >
          {/* Fullscreen image / content */}
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isPanningRef.current ? "none" : "transform 0.05s ease-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "98vw",
              maxHeight: "80vh",
            }}
          >
            {galleryImages[galleryIndex].content ? (
              galleryImages[galleryIndex].content
            ) : (
              <img
                src={galleryImages[galleryIndex].src}
                alt={galleryImages[galleryIndex].alt}
                draggable={false}
                style={{
                  maxWidth: "98vw",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  pointerEvents: "none",
                  borderRadius: "4px",
                }}
              />
            )}
          </div>

          {/* Title overlay (top-center) */}
          <div 
            className="gallery-fullscreen-title-container"
            style={{
            position: "absolute",
            top: "1.2rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10001,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{
              display: "block",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#DD4DFA",
              marginBottom: "0.2rem",
            }}>
              {galleryImages[galleryIndex].number} of {galleryImages.length}
            </span>
            <span 
              className="gallery-fullscreen-title"
              style={{
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}>
              {galleryImages[galleryIndex].label}
            </span>
          </div>

          {/* Zoom indicator (bottom-left) */}
          <div className="fs-zoom-badge" style={{
            position: "absolute",
            bottom: "5rem",
            left: "1.5rem",
            backdropFilter: "blur(8px)",
            borderRadius: "20px",
            padding: "5px 14px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            pointerEvents: "none",
            zIndex: 10001,
          }}>
            {Math.round(zoom * 100)}%
          </div>

          {/* Reset zoom button */}
          {zoom !== 1 && (
            <button
              className="fs-reset-btn"
              onClick={(e) => { e.stopPropagation(); resetZoomPan(); }}
              style={{
                position: "absolute",
                bottom: "5rem",
                left: "5.5rem",
                backdropFilter: "blur(8px)",
                borderRadius: "20px",
                padding: "5px 14px",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                zIndex: 10001,
                transition: "all 0.2s",
              }}
            >
              Reset
            </button>
          )}

          {/* Fullscreen control pill */}
          <div
            className="fs-control-pill"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerMove={handleFsPillPointerMove}
            onPointerUp={handleFsPillPointerUp}
            onPointerCancel={handleFsPillPointerUp}
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: `translate(calc(-50% + ${fsPillPos.x}px), ${fsPillPos.y}px)`,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(20, 20, 25, 0.95)",
              borderRadius: "40px",
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              color: "#fff",
              zIndex: 10001,
            }}
          >
            {/* Drag handle */}
            <div
              onPointerDown={handleFsPillPointerDown}
              title="Drag to move panel"
              style={{ cursor: "grab", padding: "4px 6px", display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <GripHorizontal size={18} color="#666" />
            </div>
            {/* Browse */}
            <div style={{ position: "relative" }}>
              <button
                className={`fs-browse-btn${showMenu ? " fs-browse-btn--active" : ""}`}
                onClick={(e) => { e.stopPropagation(); setShowMenu((v) => !v); }}
                title="Browse images"
                style={{
                  background: showMenu ? "#DD4DFA" : "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px", borderRadius: "20px", fontSize: "0.8rem",
                  cursor: "pointer", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: "6px",
                  fontWeight: 500,
                  boxShadow: showMenu ? "0 0 18px rgba(221,77,250,0.5)" : "none",
                }}
                aria-label="Browse images"
              >
                {showMenu ? <X size={15} /> : <LayoutGrid size={15} />}
                {showMenu ? "Close" : "Browse"}
              </button>
              {showMenu && (
                <div
                  ref={fsBrowseDropdownRef}
                  className="fs-browse-dropdown"
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 10px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "280px",
                    background: "var(--bg-surface, #0a0a12)",
                    border: "1px solid rgba(221,77,250,0.4)",
                    borderRadius: "14px",
                    boxShadow: "var(--shadow-card, 0 24px 60px rgba(0,0,0,0.9), 0 0 24px rgba(221,77,250,0.2))",
                    zIndex: 10002,
                    maxHeight: "50vh",
                    overflowY: "auto",
                    padding: "0.5rem 0",
                  }}>
                  <div style={{
                    padding: "0.65rem 1rem", fontSize: "0.65rem", fontWeight: 800,
                    letterSpacing: "0.12em", textTransform: "uppercase", color: "#DD4DFA",
                    borderBottom: "1px solid var(--border-color, rgba(255,255,255,0.07))", marginBottom: "0.25rem",
                  }}>
                    {typeof galleryImages[galleryIndex].label === "string" ? galleryImages[galleryIndex].label : "2D Standard Reference"}
                  </div>
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      className={`fs-browse-item${idx === galleryIndex ? " fs-browse-item--active" : ""}`}
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex(idx); setShowMenu(false); }}
                      style={{
                        width: "100%",
                        background: idx === galleryIndex ? "rgba(221,77,250,0.18)" : "transparent",
                        border: "none",
                        borderLeft: idx === galleryIndex ? "3px solid #DD4DFA" : "3px solid transparent",
                        padding: "0.6rem 1rem", textAlign: "left", cursor: "pointer",
                        color: idx === galleryIndex ? "#DD4DFA" : "var(--text-muted, rgba(255,255,255,0.75))",
                        fontSize: "0.82rem", fontWeight: idx === galleryIndex ? 700 : 400,
                        display: "flex", alignItems: "center", gap: "0.65rem",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (idx !== galleryIndex) {
                          (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-hover, rgba(255,255,255,0.04))";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-main, #fff)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (idx !== galleryIndex) {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted, rgba(255,255,255,0.75))";
                        }
                      }}
                    >
                      <span
                        className="fs-browse-num"
                        style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
                          background: idx === galleryIndex ? "rgba(221,77,250,0.3)" : "var(--bg-hover, rgba(255,255,255,0.07))",
                          fontSize: "0.68rem", fontWeight: 800,
                          color: idx === galleryIndex ? "#DD4DFA" : "var(--text-dim, rgba(255,255,255,0.4))",
                        }}>
                        {img.number}
                      </span>
                      <span className="fs-browse-item-label" style={{ color: idx === galleryIndex ? "#DD4DFA" : "var(--text-main, rgba(255,255,255,0.85))", lineHeight: 1.4, flex: 1, fontSize: "0.82rem" }}>
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Zoom out */}
            <button
              className="fs-pill-btn"
              onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(0.5, +(prev - 0.25).toFixed(2))); }}
              title="Zoom out"
              style={{
                background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                padding: "6px 10px", borderRadius: "20px", fontSize: "0.9rem",
                cursor: "pointer", transition: "all 0.2s", fontWeight: 700,
                display: "flex", alignItems: "center",
              }}
              aria-label="Zoom out"
            >
              −
            </button>

            {/* Zoom in */}
            <button
              className="fs-pill-btn"
              onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(8, +(prev + 0.25).toFixed(2))); }}
              title="Zoom in"
              style={{
                background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                padding: "6px 10px", borderRadius: "20px", fontSize: "0.9rem",
                cursor: "pointer", transition: "all 0.2s", fontWeight: 700,
                display: "flex", alignItems: "center",
              }}
              aria-label="Zoom in"
            >
              +
            </button>

            {/* Previous */}
            <button
              className="fs-pill-btn"
              onClick={(e) => { e.stopPropagation(); handleGalleryPrev(); }}
              style={{
                background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                padding: "6px 10px", borderRadius: "20px", fontSize: "0.8rem",
                cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center",
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next */}
            <button
              className="fs-pill-btn"
              onClick={(e) => { e.stopPropagation(); handleGalleryNext(); }}
              style={{
                background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                padding: "6px 10px", borderRadius: "20px", fontSize: "0.8rem",
                cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center",
              }}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Exit fullscreen */}
            <button
              className="fs-exit-btn"
              onClick={(e) => { e.stopPropagation(); toggleGalleryFullscreen(); }}
              title="Exit Fullscreen"
              style={{
                background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                padding: "6px 10px", borderRadius: "20px", fontSize: "0.8rem",
                cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center",
              }}
            >
              <Minimize size={18} />
            </button>
          </div>

          {/* Hint text — intentionally outside the overlay stacking context */}
        </div>
      )}

      {/* Hint text rendered as a fixed sibling above the overlay (z-index > 9999) */}
      {isGalleryFullscreen && subLessonId === '2d-gallery' && (
        <div
          className="gallery-fullscreen-hint"
          style={{
          position: "fixed",
          top: "5.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.65rem",
          pointerEvents: "none",
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
          zIndex: 10010,
        }}>
          Scroll to zoom · Drag to pan · ESC to exit
        </div>
      )}
    </div>
  );
};

export default TwoDStandardLesson;
