import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  X,
  GripHorizontal,
} from "lucide-react";

export interface GalleryImage {
  src?: string;
  label: ReactNode;
  alt?: string;
  number: number;
  content?: ReactNode;
}

export interface ImageGalleryViewerProps {
  images: GalleryImage[];
  showCounter?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  prevDisabled?: boolean;
}

const ImageGalleryViewer: React.FC<ImageGalleryViewerProps> = ({
  images,
  showCounter = true,
  onPrev,
  onNext,
  nextLabel,
  prevDisabled,
}) => {
  const isMulti = images.length > 1;

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [centerImageVertically, setCenterImageVertically] = useState(false);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const lastPinchDistRef = useRef<number | null>(null);
  const [navPos, setNavPos] = useState({ x: 0, y: 0 });
  const pillDragRef = useRef<{ startX: number; startY: number; startNavX: number; startNavY: number; } | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const browseDropdownRef = useRef<HTMLDivElement>(null);

  const resetZoomPan = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoomPan();
    setCenterImageVertically(false);
  }, [galleryIndex, resetZoomPan]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.min(8, Math.max(0.5, prev - e.deltaY * 0.001)));
  }, []);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    const stop = (e: WheelEvent) => e.stopPropagation();
    const el = browseDropdownRef.current;
    if (el) el.addEventListener("wheel", stop, { passive: false });
    return () => { if (el) el.removeEventListener("wheel", stop); };
  }, [showMenu]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isPanningRef.current = true;
    panStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    e.preventDefault();
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanningRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setPan({ x: panStartRef.current.panX + dx, y: panStartRef.current.panY + dy });
  }, []);

  const handleMouseUp = useCallback(() => { isPanningRef.current = false; }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDistRef.current = Math.sqrt(dx * dx + dy * dy);
    } else if (e.touches.length === 1) {
      isPanningRef.current = true;
      panStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: pan.x, panY: pan.y };
    }
  }, [pan]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (lastPinchDistRef.current !== null) {
        const delta = dist - lastPinchDistRef.current;
        setZoom((prev) => Math.min(8, Math.max(0.5, prev + delta * 0.01)));
      }
      lastPinchDistRef.current = dist;
    } else if (e.touches.length === 1 && isPanningRef.current) {
      const ddx = e.touches[0].clientX - panStartRef.current.x;
      const ddy = e.touches[0].clientY - panStartRef.current.y;
      setPan({ x: panStartRef.current.panX + ddx, y: panStartRef.current.panY + ddy });
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) lastPinchDistRef.current = null;
    if (e.touches.length === 0) isPanningRef.current = false;
  }, []);

  const galleryNext = () => setGalleryIndex((p) => (p + 1) % images.length);
  const galleryPrev = () => setGalleryIndex((p) => (p - 1 + images.length) % images.length);

  const handlePillPointerDown = (e: React.PointerEvent) => {
    pillDragRef.current = { startX: e.clientX, startY: e.clientY, startNavX: navPos.x, startNavY: navPos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePillPointerMove = (e: React.PointerEvent) => {
    if (!pillDragRef.current) return;
    const dx = e.clientX - pillDragRef.current.startX;
    const dy = e.clientY - pillDragRef.current.startY;
    setNavPos({ x: pillDragRef.current.startNavX + dx, y: pillDragRef.current.startNavY + dy });
  };

  const handlePillPointerUp = (e: React.PointerEvent) => {
    if (pillDragRef.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      pillDragRef.current = null;
    }
  };

  const currentImage = images[galleryIndex];

  const pillBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
  };

  return (
    <div className="gallery-section-wrapper" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {showCounter && (
        <div style={{ textAlign: "center", paddingBottom: "0.25rem", flexShrink: 0 }}>
          <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#DD4DFA", marginBottom: "0.4rem" }}>
            {currentImage.number} of {images.length}
          </span>
          <h3 className="section-title gallery-image-title">
            {currentImage.label}
          </h3>
        </div>
      )}

      <div
        ref={viewerRef}
        className="gallery-viewer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ position: "relative", width: "min(100%, 1000px)", aspectRatio: "1000 / 640", margin: "0 auto", minHeight: "320px", maxHeight: "640px", flexShrink: 0, cursor: isPanningRef.current ? "grabbing" : "grab", userSelect: "none" }}
      >
        {/* Inner clipping container */}
        <div style={{ position: "absolute", inset: 0, background: "transparent", border: "1px solid var(--glass-border, rgba(148, 163, 184, 0.28))", boxSizing: "border-box", borderRadius: "8px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: "4%", left: "50%", transform: "translateX(-50%)", fontSize: "0.7rem", color: "#ffffff", background: "rgba(10,10,15,0.85)", border: "1px solid rgba(255,255,255,0.15)", padding: "5px 14px", borderRadius: "20px", pointerEvents: "none", letterSpacing: "0.06em", zIndex: 10, whiteSpace: "nowrap", fontWeight: 500 }}>
            Scroll to zoom · Drag to pan
          </div>
          <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: centerImageVertically ? "center center" : "center top", transition: isPanningRef.current ? "none" : "transform 0.05s ease-out", display: "flex", alignItems: centerImageVertically ? "center" : "flex-start", justifyContent: "center", width: "100%", height: "100%" }}>
            {currentImage.content ? (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {currentImage.content}
              </div>
            ) : (
              <img
                src={currentImage.src}
                alt={currentImage.alt ?? String(currentImage.label)}
                draggable={false}
                loading="lazy"
                onLoad={(event) => {
                  const image = event.currentTarget;
                  setCenterImageVertically((image.naturalWidth / image.naturalHeight) >= (1000 / 640));
                }}
                style={{
                  display: "block",
                  width: centerImageVertically ? "auto" : "100%",
                  height: centerImageVertically ? "100%" : "auto",
                  maxWidth: "none",
                  maxHeight: "none",
                  flexShrink: 0,
                  pointerEvents: "none",
                  transition: "opacity 0.25s ease",
                }}
              />
            )}
          </div>
        </div>

        {/* Zoom badge */}
        <div className="fs-zoom-badge" style={{ position: "absolute", bottom: "4%", left: "2%", backdropFilter: "blur(10px)", background: "rgba(20,20,25,0.6)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "20px", padding: "5px 14px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em", pointerEvents: "none", zIndex: 30 }}>
          {Math.round(zoom * 100)}%
        </div>

        {/* Reset zoom */}
        {zoom !== 1 && (
          <button className="fs-reset-btn" onClick={(e) => { e.stopPropagation(); resetZoomPan(); }} style={{ position: "absolute", bottom: "4%", left: "6rem", backdropFilter: "blur(10px)", background: "rgba(20,20,25,0.6)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "20px", padding: "5px 14px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", zIndex: 30, transition: "all 0.2s" }}>
            Reset
          </button>
        )}

        {/* Floating pill */}
        <div
          className={`gallery-control-pill${showMenu ? ' is-browsing' : ''}`}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerMove={handlePillPointerMove}
          onPointerUp={handlePillPointerUp}
          onPointerCancel={handlePillPointerUp}
          style={{ position: "absolute", bottom: "4%", right: "2%", display: "flex", alignItems: "center", gap: "10px", background: "rgba(20,20,25,0.95)", backdropFilter: "blur(10px)", borderRadius: "40px", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", color: "#fff", zIndex: 30, transform: `translate(${navPos.x}px, ${navPos.y}px)`, animation: "slideUpFade 0.5s ease-out" }}
        >
          <div className="gallery-control-drag" onPointerDown={handlePillPointerDown} title="Drag to move panel" style={{ cursor: "grab", padding: "8px", marginRight: "4px", borderRadius: "4px", display: "flex", alignItems: "center" }}>
            <GripHorizontal size={20} color="#888" />
          </div>

          {isMulti && (
            <div className="gallery-browse-anchor" style={{ position: "relative" }}>
              <button
                className={`gallery-browse-button${showMenu ? ' is-open' : ''}`}
                onClick={(e) => { e.stopPropagation(); setShowMenu((v) => !v); }}
                title="Browse images"
                style={{ background: showMenu ? "#DD4DFA" : "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "6px 12px", borderRadius: "20px", fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500, boxShadow: showMenu ? "0 0 18px rgba(221,77,250,0.5)" : "none" }}
                aria-label="Browse images"
              >
                {showMenu ? <X size={15} /> : <LayoutGrid size={15} />}
                {showMenu ? "Close" : "Browse"}
              </button>
              {showMenu && (
                <div ref={browseDropdownRef} className="gallery-browse-dropdown" style={{ position: "absolute", bottom: "calc(100% + 10px)", right: 0, width: "max-content", minWidth: "280px", maxWidth: "90vw", background: "var(--bg-surface, #0a0a12)", border: "1px solid rgba(221,77,250,0.4)", borderRadius: "14px", boxShadow: "var(--shadow-card, 0 24px 60px rgba(0,0,0,0.9))", zIndex: 1000, maxHeight: "440px", overflowY: "auto", padding: "0.5rem 0" }}>
                  <div className="gallery-browse-header" style={{ padding: "0.65rem 1rem", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#DD4DFA", borderBottom: "1px solid var(--border-color, rgba(255,255,255,0.07))", marginBottom: "0.25rem" }}>
                    <span className="gallery-browse-title">{typeof images[galleryIndex].label === "string" ? images[galleryIndex].label as string : "Gallery"}</span>
                    <button className="gallery-browse-close" onClick={(event) => { event.stopPropagation(); setShowMenu(false); }} aria-label="Close image list" title="Close image list">
                      <X size={16} />
                    </button>
                  </div>
                  {images.map((img, idx) => (
                    <button
                      className={`gallery-browse-item${idx === galleryIndex ? ' is-active' : ''}`}
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex(idx); setShowMenu(false); }}
                      style={{ width: "100%", background: idx === galleryIndex ? "rgba(221,77,250,0.18)" : "transparent", border: "none", borderLeft: idx === galleryIndex ? "3px solid #DD4DFA" : "3px solid transparent", padding: "0.6rem 1rem", textAlign: "left", cursor: "pointer", color: idx === galleryIndex ? "#DD4DFA" : "var(--text-muted, rgba(255,255,255,0.75))", fontSize: "0.82rem", fontWeight: idx === galleryIndex ? 700 : 400, display: "flex", alignItems: "center", gap: "0.65rem", transition: "all 0.15s ease" }}
                      onMouseEnter={(e) => { if (idx !== galleryIndex) { (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-hover, rgba(255,255,255,0.04))"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-main, #fff)"; } }}
                      onMouseLeave={(e) => { if (idx !== galleryIndex) { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted, rgba(255,255,255,0.75))"; } }}
                    >
                      <span className="gallery-browse-number" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0, background: idx === galleryIndex ? "rgba(221,77,250,0.3)" : "var(--bg-hover, rgba(255,255,255,0.07))", fontSize: "0.68rem", fontWeight: 800, color: idx === galleryIndex ? "#DD4DFA" : "var(--text-dim, rgba(255,255,255,0.4))" }}>
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
          )}

          <button onClick={(e) => { e.stopPropagation(); setZoom((prev) => Math.max(0.5, +(prev - 0.25).toFixed(2))); }} title="Zoom out" style={pillBtnStyle} aria-label="Zoom out">−</button>
          <button onClick={(e) => { e.stopPropagation(); setZoom((prev) => Math.min(8, +(prev + 0.25).toFixed(2))); }} title="Zoom in" style={pillBtnStyle} aria-label="Zoom in">+</button>

          {isMulti && (
            <button onClick={(e) => { e.stopPropagation(); galleryPrev(); }} style={{ ...pillBtnStyle, fontSize: "0.8rem" }} aria-label="Previous image"><ChevronLeft size={18} /></button>
          )}
          {isMulti && (
            <button onClick={(e) => { e.stopPropagation(); galleryNext(); }} style={{ ...pillBtnStyle, fontSize: "0.8rem" }} aria-label="Next image"><ChevronRight size={18} /></button>
          )}
        </div>
      </div>

      {/* Lesson navigation */}
      <div className="lesson-navigation">
        <button className="nav-button" onClick={onPrev} disabled={prevDisabled ?? !onPrev}>
          <ChevronLeft size={18} /> Previous
        </button>
        <button className="nav-button next" onClick={onNext}>
          {nextLabel ?? "Next Lesson"} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ImageGalleryViewer;
