import React, { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import coordinate1 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate1.png";
import coordinate2 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate2.png";
import coordinate3 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate3.png";
import coordinate4 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate4.png";
import coordinate5 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate5.png";
import coordinate6 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate6.png";
import coordinate7 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate7.png";
import coordinate8 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate8.png";

/* ------------------------------------------------------------------ */
/*  Inline Image Carousel Component                                    */
/* ------------------------------------------------------------------ */
interface ImageCarouselProps {
    images: { src: string; alt: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);
    const isDragging = useRef(false);

    const goTo = useCallback((index: number) => {
        const clamped = Math.max(0, Math.min(index, images.length - 1));
        setCurrentSlide(clamped);
    }, [images.length]);

    const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);
    const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    }, [prev, next]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        touchStartX.current = e.clientX;
        touchDeltaX.current = 0;
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        touchDeltaX.current = e.clientX - touchStartX.current;
    }, []);

    const onPointerUp = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const threshold = 50;
        if (touchDeltaX.current > threshold) prev();
        else if (touchDeltaX.current < -threshold) next();
    }, [prev, next]);

    const shouldLoad = (index: number) => Math.abs(index - currentSlide) <= 1;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(255,255,255,0.03)',
            }}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="region"
            aria-roledescription="carousel"
            aria-label="Coordinate System images"
        >
            <div
                ref={trackRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                style={{
                    display: 'flex',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: `translateX(-${currentSlide * 100}%)`,
                    touchAction: 'pan-y',
                    cursor: 'grab',
                }}
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${i + 1} of ${images.length}`}
                        style={{
                            flex: '0 0 100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            boxSizing: 'border-box',
                        }}
                    >
                        {shouldLoad(i) ? (
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '320px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '200px' }} />
                        )}
                    </div>
                ))}
            </div>

            {currentSlide > 0 && (
                <button
                    onClick={prev}
                    aria-label="Previous slide"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '0.5rem',
                        transform: 'translateY(-50%)',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-white)',
                        transition: 'all 0.2s ease',
                        zIndex: 2,
                    }}
                >
                    <ChevronLeft size={18} />
                </button>
            )}

            {currentSlide < images.length - 1 && (
                <button
                    onClick={next}
                    aria-label="Next slide"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '0.5rem',
                        transform: 'translateY(-50%)',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-white)',
                        transition: 'all 0.2s ease',
                        zIndex: 2,
                    }}
                >
                    <ChevronRight size={18} />
                </button>
            )}

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.75rem 0',
            }}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        style={{
                            width: currentSlide === i ? '20px' : '8px',
                            height: '8px',
                            borderRadius: '100px',
                            border: 'none',
                            background: currentSlide === i ? 'var(--primary)' : 'rgba(255,255,255,0.25)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Coordinate System Content                                          */
/* ------------------------------------------------------------------ */

const coordinateImages = [
    { src: coordinate1, alt: "Front view", label: "Front" },
    { src: coordinate2, alt: "Back view", label: "Back" },
    { src: coordinate3, alt: "Left view", label: "Left" },
    { src: coordinate4, alt: "Right view", label: "Right" },
    { src: coordinate5, alt: "Top view", label: "Top" },
    { src: coordinate6, alt: "Bottom view", label: "Bottom" },
    { src: coordinate7, alt: "Isometric view", label: "Isometric" },
    { src: coordinate8, alt: "Trimetric view", label: "Trimetric" },
];

const CoordinateSystemContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step">
            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                It shows the position of the 3D model. It is located at the lower-left area of the Graphics Area.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
                {coordinateImages.map((img, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <img
                            src={img.src}
                            alt={img.alt}
                            style={{ height: '60px', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{img.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Image Carousel for larger previews */}
        <div style={{ marginTop: '2rem' }}>
            <ImageCarousel images={coordinateImages} />
        </div>
    </div>
);

export default CoordinateSystemContent;
