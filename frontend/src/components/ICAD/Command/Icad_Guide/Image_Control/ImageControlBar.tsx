import React, { useRef, useState, useEffect } from "react";
import {
    Play,
    Pause,
    Square,
    ChevronLeft,
    ChevronRight,
    Maximize,
    Minimize,
    GripHorizontal
} from "lucide-react";

interface ImageControlBarProps {
    containerRef?: React.RefObject<HTMLDivElement>;
    isFullscreen?: boolean;
    onToggleFullscreen?: () => void;
    onPrevStep?: () => void;
    onNextStep?: () => void;
    canGoPrev?: boolean;
    canGoNext?: boolean;
    isPlaying: boolean;
    onTogglePlay: () => void;
    onStop: () => void;
}

export const ImageControlBar: React.FC<ImageControlBarProps> = ({
    containerRef,
    isFullscreen: isExternalFullscreen,
    onToggleFullscreen,
    onPrevStep,
    onNextStep,
    canGoPrev = true,
    canGoNext = true,
    isPlaying,
    onTogglePlay,
    onStop
}) => {
    const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
    const [isCssFallback, setIsCssFallback] = useState(false);
    const [navPos, setNavPos] = useState({ x: 0, y: 0 });

    const dragRef = useRef<{ startX: number; startY: number; startNavX: number; startNavY: number } | null>(null);

    const isFullscreen = isExternalFullscreen !== undefined ? isExternalFullscreen : (isNativeFullscreen || isCssFallback);

    const checkIsFullscreen = () => {
        const doc = document as any;
        return !!(
            doc.fullscreenElement ||
            doc.webkitFullscreenElement ||
            doc.webkitCurrentFullScreenElement ||
            doc.mozFullScreenElement ||
            doc.msFullscreenElement
        );
    };

    // Pointer Dragging for control pill
    const handlePointerDown = (e: React.PointerEvent) => {
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startNavX: navPos.x,
            startNavY: navPos.y
        };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setNavPos({
            x: dragRef.current.startNavX + dx,
            y: dragRef.current.startNavY + dy
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (dragRef.current) {
            try {
                (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
            } catch (_) { }
            dragRef.current = null;
        }
    };

    // Native Fullscreen change listeners
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isNative = checkIsFullscreen();
            setIsNativeFullscreen(isNative);
            if (isNative) {
                setIsCssFallback(false);
            }
        };

        const events = [
            "fullscreenchange",
            "webkitfullscreenchange",
            "mozfullscreenchange",
            "MSFullscreenChange"
        ];

        events.forEach(evt => document.addEventListener(evt, handleFullscreenChange));

        return () => {
            events.forEach(evt => document.removeEventListener(evt, handleFullscreenChange));
        };
    }, []);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
            if (targetTag === "input" || targetTag === "textarea" || (e.target as HTMLElement)?.isContentEditable) {
                return;
            }

            if (e.key === "Escape" && isFullscreen) {
                e.preventDefault();
                toggleFullscreen();
            } else if (e.key === " " || e.code === "Space") {
                e.preventDefault();
                onTogglePlay();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (onPrevStep && canGoPrev) onPrevStep();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                if (onNextStep && canGoNext) onNextStep();
            } else if (e.key === "f" || e.key === "F") {
                e.preventDefault();
                toggleFullscreen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onPrevStep, onNextStep, isFullscreen, isPlaying, canGoPrev, canGoNext, onTogglePlay]);

    const toggleFullscreen = () => {
        if (onToggleFullscreen) {
            onToggleFullscreen();
            return;
        }

        const target = containerRef?.current as any;

        if (isFullscreen) {
            if (isNativeFullscreen) {
                const doc = document as any;
                const exitFS =
                    doc.exitFullscreen ||
                    doc.webkitExitFullscreen ||
                    doc.mozCancelFullScreen ||
                    doc.msExitFullscreen;

                if (exitFS) {
                    try {
                        const res = exitFS.call(doc);
                        if (res && typeof res.then === "function") {
                            res.catch((e: any) => console.error("[ImageControlBar] Error exiting native fullscreen:", e));
                        }
                    } catch (e) {
                        console.error("[ImageControlBar] Error exiting native fullscreen:", e);
                    }
                }
            }
            setIsCssFallback(false);
        } else {
            setIsCssFallback(true);
            if (target) {
                const requestFS =
                    target.requestFullscreen ||
                    target.webkitRequestFullscreen ||
                    target.mozRequestFullScreen ||
                    target.msRequestFullscreen ||
                    target.webkitEnterFullscreen;

                if (requestFS) {
                    try {
                        const res = requestFS.call(target);
                        if (res && typeof res.then === "function") {
                            res.catch((err: any) => {
                                console.warn("[ImageControlBar] Native requestFullscreen rejected (using viewport expansion fallback):", err);
                            });
                        }
                    } catch (err) {
                        console.warn("[ImageControlBar] Native requestFullscreen call threw:", err);
                    }
                }
            }
        }
    };

    return (
        <div
            className="icb-pill"
            style={{
                position: "absolute",
                bottom: "18px",
                right: "18px",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#141419F2",
                backdropFilter: "blur(12px)",
                padding: "8px 16px",
                borderRadius: "32px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                userSelect: "none",
                transition: dragRef.current ? "none" : "all 0.2s ease",
                transform: `translate(${navPos.x}px, ${navPos.y}px)`
            }}
        >
            {/* Grip Handle - Draggable */}
            <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                title="Drag control bar"
                style={{
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(255, 255, 255, 0.6)",
                    paddingRight: "2px",
                    cursor: "grab",
                    touchAction: "none"
                }}
            >
                <GripHorizontal size={11} color="#636262cb" strokeWidth={2} />
            </div>

            {/* Play/Pause Pill Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onTogglePlay();
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    backgroundColor: "rgba(255, 255, 255, 0.16)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    fontSize: "12.8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.26)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.16)")}
            >
                {isPlaying ? (
                    <>
                        <Pause size={15} color="#ffffff" strokeWidth={2.2} />
                        <span>Pause</span>
                    </>
                ) : (
                    <>
                        <Play size={15} color="#ffffff" strokeWidth={2.2} />
                        <span>Play</span>
                    </>
                )}
            </button>

            {/* Stop Button */}
            {isPlaying && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onStop();
                    }}
                    title="Stop"
                    style={{
                        width: "36px",
                        height: "36px",
                        padding: "6px 12px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        color: "#ffffff",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.22)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)")}
                >
                    <Square size={14} color="#ffffff" strokeWidth={2.2} />
                </button>
            )}

            {/* Previous Step Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (canGoPrev && onPrevStep) onPrevStep();
                }}
                disabled={!canGoPrev}
                title={canGoPrev ? "Previous Step (Left Arrow)" : "Already at the first step"}
                style={{
                    width: "36px",
                    height: "36px",
                    padding: "6px 12px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: canGoPrev ? "pointer" : "not-allowed",
                    opacity: canGoPrev ? 1 : 0.35,
                    transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                    if (canGoPrev) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.22)";
                }}
                onMouseLeave={(e) => {
                    if (canGoPrev) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                }}
            >
                <ChevronLeft size={18} color="#ffffff" strokeWidth={2.2} />
            </button>

            {/* Next Step Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (canGoNext && onNextStep) onNextStep();
                }}
                disabled={!canGoNext}
                title={canGoNext ? "Next Step (Right Arrow)" : "Already at the last step"}
                style={{
                    width: "36px",
                    height: "36px",
                    padding: "6px 12px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: canGoNext ? "pointer" : "not-allowed",
                    opacity: canGoNext ? 1 : 0.35,
                    transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                    if (canGoNext) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.22)";
                }}
                onMouseLeave={(e) => {
                    if (canGoNext) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                }}
            >
                <ChevronRight size={18} color="#ffffff" strokeWidth={2.2} />
            </button>

            {/* Fullscreen Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                }}
                title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                style={{
                    width: "36px",
                    height: "36px",
                    padding: "0px 20px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)")}
            >
                {isFullscreen ? (
                    <Minimize size={17} color="#ffffff" strokeWidth={2.2} />
                ) : (
                    <Maximize size={17} color="#ffffff" strokeWidth={2.2} />
                )}
            </button>
        </div>
    );
};
