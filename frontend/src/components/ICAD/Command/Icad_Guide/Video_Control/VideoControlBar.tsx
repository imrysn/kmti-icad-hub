import React, { useState, useEffect, useRef } from "react";
import {
    Play,
    Pause,
    ChevronLeft,
    ChevronRight,
    Maximize,
    Minimize,
    GripVertical,
    Volume2,
    VolumeX
} from "lucide-react";

interface VideoControlBarProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    containerRef?: React.RefObject<HTMLDivElement>;
    isFullscreen?: boolean;
    onToggleFullscreen?: () => void;
    onPrevStep?: () => void;
    onNextStep?: () => void;
}

const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

export const VideoControlBar: React.FC<VideoControlBarProps> = ({
    videoRef,
    containerRef,
    isFullscreen: isExternalFullscreen,
    onToggleFullscreen,
    onPrevStep,
    onNextStep
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
    const [isCssFallback, setIsCssFallback] = useState(false);
    
    // Effective fullscreen state: explicit prop takes precedence, else fallback
    const isFullscreen = isExternalFullscreen !== undefined ? isExternalFullscreen : (isNativeFullscreen || isCssFallback);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [navPos, setNavPos] = useState({ x: 0, y: 0 });
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);

    // Use a ref for seeking so it doesn't trigger effect re-registration
    const isSeekingRef = useRef(false);
    const dragRef = useRef<{ startX: number; startY: number; startNavX: number; startNavY: number } | null>(null);
    const volumeRef = useRef<HTMLDivElement>(null);
    const speedRef = useRef<HTMLDivElement>(null);

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
            if (!isSeekingRef.current) setCurrentTime(video.currentTime);
            if (video.duration) setDuration(video.duration);
        };
        const handleLoadedMetadata = () => {
            if (video.duration) setDuration(video.duration);
        };
        const syncVolumeState = () => {
            setIsMuted(video.muted);
            setVolume(video.volume);
        };

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("volumechange", syncVolumeState);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("volumechange", syncVolumeState);
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

    // Close popups on outside click
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
                setShowVolumeSlider(false);
            }
            if (speedRef.current && !speedRef.current.contains(e.target as Node)) {
                setShowSpeedMenu(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Keyboard Shortcuts (Space: Play/Pause, Left/Right: Prev/Next, F: Fullscreen, M: Mute, Esc: Exit Fullscreen)
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
                togglePlay();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (onPrevStep) onPrevStep();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                if (onNextStep) onNextStep();
            } else if (e.key === "f" || e.key === "F") {
                e.preventDefault();
                toggleFullscreen();
            } else if (e.key === "m" || e.key === "M") {
                e.preventDefault();
                toggleMute();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onPrevStep, onNextStep, isFullscreen, isPlaying]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!videoRef.current) return;
        videoRef.current.volume = val;
        videoRef.current.muted = val === 0;
        setVolume(val);
        setIsMuted(val === 0);
    };

    const handleSeekMouseDown = () => {
        isSeekingRef.current = true;
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setCurrentTime(val);
    };

    const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        const val = parseFloat((e.target as HTMLInputElement).value);
        if (videoRef.current) {
            videoRef.current.currentTime = val;
        }
        isSeekingRef.current = false;
    };

    const handleSeekTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
        const val = parseFloat((e.currentTarget as HTMLInputElement).value);
        if (videoRef.current) {
            videoRef.current.currentTime = val;
        }
        isSeekingRef.current = false;
    };

    const handleSpeedChange = (rate: number) => {
        if (!videoRef.current) return;
        videoRef.current.playbackRate = rate;
        setPlaybackRate(rate);
        setShowSpeedMenu(false);
    };

    const toggleFullscreen = () => {
        if (onToggleFullscreen) {
            onToggleFullscreen();
            return;
        }

        const container = containerRef?.current as any;
        const video = videoRef.current as any;
        const target = container || video;

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

    const seekPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <>
            <style>{`
                .vcb-vol-bar {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 4px;
                    height: 72px;
                    border-radius: 4px;
                    outline: none;
                    cursor: pointer;
                    background: rgba(255,255,255,0.25);
                    writing-mode: vertical-lr;
                    direction: rtl;
                    border: none;
                    accent-color: #ffffff;
                }
                .vcb-vol-bar::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #ffffff;
                    cursor: pointer;
                    box-shadow: 0 0 4px rgba(0,0,0,0.4);
                }
                .vcb-vol-bar::-moz-range-thumb {
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #ffffff;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 0 4px rgba(0,0,0,0.4);
                }
            `}</style>



            {/* Control Pill */}
            <div
                style={{
                    position: "absolute",
                    bottom: "18px",
                    right: "18px",
                    zIndex: 1000,
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

                {/* Mute / Volume Button + Slider */}
                <div ref={volumeRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowVolumeSlider(v => !v);
                            setShowSpeedMenu(false);
                        }}
                        title={isMuted ? "Unmute (M)" : "Mute (M)"}
                        onContextMenu={(e) => { e.preventDefault(); toggleMute(); }}
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
                        {isMuted || volume === 0
                            ? <VolumeX size={16} color="#ffffff" strokeWidth={2.2} />
                            : <Volume2 size={16} color="#ffffff" strokeWidth={2.2} />
                        }
                    </button>
                    {showVolumeSlider && (
                        <div style={{
                            position: "absolute",
                            bottom: "calc(100% + 10px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "rgba(18, 18, 26, 0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "10px",
                            padding: "10px 14px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
                            zIndex: 1001
                        }}>
                            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>
                                {Math.round((isMuted ? 0 : volume) * 100)}%
                            </span>
                            <input
                                type="range"
                                className="vcb-vol-bar"
                                min={0}
                                max={1}
                                step={0.01}
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    )}
                </div>

                {/* Playback Speed */}
                <div ref={speedRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowSpeedMenu(v => !v);
                            setShowVolumeSlider(false);
                        }}
                        title="Playback Speed"
                        style={{
                            height: "36px",
                            borderRadius: "18px",
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                            color: "#ffffff",
                            border: "none",
                            padding: "0 10px",
                            fontSize: "12px",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontFamily: "monospace",
                            whiteSpace: "nowrap"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.22)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)")}
                    >
                        {playbackRate}x
                    </button>
                    {showSpeedMenu && (
                        <div style={{
                            position: "absolute",
                            bottom: "calc(100% + 10px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "rgba(18, 18, 26, 0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "10px",
                            padding: "6px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
                            zIndex: 1001,
                            minWidth: "64px"
                        }}>
                            {SPEED_OPTIONS.map(rate => (
                                <button
                                    key={rate}
                                    onClick={() => handleSpeedChange(rate)}
                                    style={{
                                        background: rate === playbackRate ? "rgba(255,255,255,0.18)" : "transparent",
                                        color: rate === playbackRate ? "#ffffff" : "rgba(255,255,255,0.7)",
                                        border: "none",
                                        borderRadius: "6px",
                                        padding: "5px 10px",
                                        fontSize: "12px",
                                        fontWeight: rate === playbackRate ? 700 : 500,
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontFamily: "monospace",
                                        transition: "all 0.15s ease"
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = rate === playbackRate ? "rgba(255,255,255,0.18)" : "transparent")}
                                >
                                    {rate}x
                                </button>
                            ))}
                        </div>
                    )}
                </div>

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
