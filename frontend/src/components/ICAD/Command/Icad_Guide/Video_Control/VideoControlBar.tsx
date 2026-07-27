import React, { useState, useEffect, useRef } from "react";
import {
    Play,
    Pause,
    ChevronLeft,
    ChevronRight,
    Maximize,
    Minimize,
    GripVertical
} from "lucide-react";

interface VideoControlBarProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    containerRef?: React.RefObject<HTMLDivElement>;
    onPrevStep?: () => void;
    onNextStep?: () => void;
}



export const VideoControlBar: React.FC<VideoControlBarProps> = ({
    videoRef,
    containerRef,
    onPrevStep,
    onNextStep
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
    const [isCssFallback, setIsCssFallback] = useState(false);
    const isFullscreen = isNativeFullscreen || isCssFallback;


    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [navPos, setNavPos] = useState({ x: 0, y: 0 });

    const dragRef = useRef<{ startX: number; startY: number; startNavX: number; startNavY: number } | null>(null);

    const checkIsFullscreen = () => {
        const doc = document as any;
        const video = videoRef.current as any;
        return !!(
            doc.fullscreenElement ||
            doc.webkitFullscreenElement ||
            doc.webkitCurrentFullScreenElement ||
            doc.mozFullScreenElement ||
            doc.msFullscreenElement ||
            video?.webkitDisplayingFullscreen
        );
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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
            } catch (_) {}
            dragRef.current = null;
        }
    };

    // Video events & time syncing
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            if (video.duration) setDuration(video.duration);
        };
        const handleLoadedMetadata = () => {
            if (video.duration) setDuration(video.duration);
        };

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [videoRef]);



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

        const video = videoRef.current;
        if (video) {
            video.addEventListener("webkitbeginfullscreen", handleFullscreenChange);
            video.addEventListener("webkitendfullscreen", handleFullscreenChange);
        }

        return () => {
            events.forEach(evt => document.removeEventListener(evt, handleFullscreenChange));
            if (video) {
                video.removeEventListener("webkitbeginfullscreen", handleFullscreenChange);
                video.removeEventListener("webkitendfullscreen", handleFullscreenChange);
            }
        };
    }, [videoRef]);

    // Sync container class with isFullscreen state for full monitor screen expansion
    useEffect(() => {
        const container = containerRef?.current;
        if (!container) return;
        if (isFullscreen) {
            container.classList.add("is-expanded-fullscreen");
        } else {
            container.classList.remove("is-expanded-fullscreen");
        }
        return () => {
            container.classList.remove("is-expanded-fullscreen");
        };
    }, [isFullscreen, containerRef]);

    // Keyboard Shortcuts (Space: Play/Pause, Left/Right: Prev/Next, F: Fullscreen, M: Mute, Esc: Exit Fullscreen)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
            if (targetTag === 'input' || targetTag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
                return;
            }

            if (e.key === 'Escape' && isFullscreen) {
                e.preventDefault();
                toggleFullscreen();
            } else if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                togglePlay();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (onPrevStep) onPrevStep();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (onNextStep) onNextStep();
            } else if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                toggleFullscreen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onPrevStep, onNextStep, isFullscreen, isPlaying]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    };




    const toggleFullscreen = () => {
        const container = containerRef?.current as any;
        const video = videoRef.current as any;
        const target = container || video;

        if (isFullscreen) {
            // Exit Fullscreen
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
                            res.catch((e: any) => console.error("[VideoControlBar] Error exiting native fullscreen:", e));
                        }
                    } catch (e) {
                        console.error("[VideoControlBar] Error exiting native fullscreen:", e);
                    }
                } else if (video && video.webkitExitFullscreen) {
                    try {
                        video.webkitExitFullscreen();
                    } catch (e) {
                        console.error("[VideoControlBar] Error exiting video webkit fullscreen:", e);
                    }
                }
            }
            setIsCssFallback(false);
        } else {
            // Enter Fullscreen — Expands container to full monitor window size
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
                                console.warn("[VideoControlBar] Native requestFullscreen rejected (using viewport expansion fallback):", err);
                            });
                        }
                    } catch (err) {
                        console.warn("[VideoControlBar] Native requestFullscreen call threw (using viewport expansion fallback):", err);
                    }
                }
            }
        }
    };

    return (
        <>
            <style>{`
                .video-fullscreen-container.is-expanded-fullscreen,
                .video-fullscreen-container:fullscreen,
                .video-fullscreen-container:-webkit-full-screen,
                .video-fullscreen-container:-moz-full-screen,
                .video-fullscreen-container:-ms-fullscreen {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    max-width: 100vw !important;
                    max-height: 100vh !important;
                    aspect-ratio: auto !important;
                    border-radius: 0 !important;
                    background-color: #000000 !important;
                    overflow: visible !important;
                    z-index: 999999 !important;
                }
            `}</style>
            <div
                style={{
                    position: "absolute",
                    bottom: "18px",
                    right: "18px",
                    zIndex: 30,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "rgba(18, 18, 26, 0.92)",
                    backdropFilter: "blur(12px)",
                    padding: "5px 8px 5px 12px",
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
                    <GripVertical size={16} color="#ffffff" strokeWidth={2} />
                </div>

                {/* Live Time Display */}
                <div
                    style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "rgba(255, 255, 255, 0.9)",
                        padding: "0 4px",
                        fontFamily: "monospace",
                        letterSpacing: "0.5px"
                    }}
                    title="Current Video Time"
                >
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* Play/Pause Pill Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        backgroundColor: "rgba(255, 255, 255, 0.14)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "7px 16px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontFamily: "var(--font-main)"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.22)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.14)")}
                >
                    {isPlaying ? (
                        <>
                            <Pause size={15} color="#ffffff" fill="#ffffff" strokeWidth={2} />
                            <span>Pause</span>
                        </>
                    ) : (
                        <>
                            <Play size={15} color="#ffffff" fill="#ffffff" strokeWidth={2} />
                            <span>Play</span>
                        </>
                    )}
                </button>

                {/* Previous Step Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onPrevStep) onPrevStep();
                    }}
                    title="Previous Spotlight (Left Arrow)"
                    style={{
                        width: "36px",
                        height: "36px",
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
                    <ChevronLeft size={18} color="#ffffff" strokeWidth={2.2} />
                </button>

                {/* Next Step Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onNextStep) onNextStep();
                    }}
                    title="Next Spotlight (Right Arrow)"
                    style={{
                        width: "36px",
                        height: "36px",
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
        </>
    );
};
