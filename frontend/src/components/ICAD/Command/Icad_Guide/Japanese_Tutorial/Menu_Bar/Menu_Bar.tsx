import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import menuBarVideo from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar.mp4';
import { VideoControlBar } from '../../Video_Control/VideoControlBar';

interface SpotlightConfig {
    label: string;
    startTime: number;
    endTime: number;
    pxX: number;
    pxY: number;
    pxW: number;
    pxH: number;
}

const SPOTLIGHTS: SpotlightConfig[] = [
    { label: "File", startTime: 3.6, endTime: 4.8, pxX: 0, pxY: 34, pxW: 710, pxH: 570 },
    { label: "View", startTime: 4.8, endTime: 6.3, pxX: 64, pxY: 34, pxW: 240, pxH: 380 },
    { label: "Info", startTime: 6.3, endTime: 7.8, pxX: 120, pxY: 34, pxW: 248, pxH: 470 },
    { label: "Settings", startTime: 7.8, endTime: 9.3, pxX: 197, pxY: 34, pxW: 307, pxH: 660 },
    { label: "Tools", startTime: 9.3, endTime: 11.1, pxX: 251, pxY: 34, pxW: 234, pxH: 220 },
    { label: "Window", startTime: 11.1, endTime: 12.9, pxX: 311, pxY: 34, pxW: 356, pxH: 520 },
    { label: "Help", startTime: 12.9, endTime: 15.7, pxX: 390, pxY: 34, pxW: 242, pxH: 230 }
];

function Menu_Bar_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeSpotlightIndex = SPOTLIGHTS.findIndex(
        (spot) => currentTime >= spot.startTime && currentTime <= spot.endTime
    );
    const activeSpotlight = !isEnded && activeSpotlightIndex !== -1 ? SPOTLIGHTS[activeSpotlightIndex] : undefined;

    const jumpToTime = (time: number) => {
        if (videoRef.current) {
            setIsEnded(false);
            videoRef.current.currentTime = time;
            videoRef.current.play().catch(() => { });
        }
    };

    const handlePrevStep = () => {
        if (activeSpotlightIndex > 0) {
            jumpToTime(SPOTLIGHTS[activeSpotlightIndex - 1].startTime);
        } else {
            jumpToTime(SPOTLIGHTS[0].startTime);
        }
    };

    const handleNextStep = () => {
        if (activeSpotlightIndex !== -1 && activeSpotlightIndex < SPOTLIGHTS.length - 1) {
            jumpToTime(SPOTLIGHTS[activeSpotlightIndex + 1].startTime);
        } else {
            jumpToTime(SPOTLIGHTS[0].startTime);
        }
    };

    const spotX = activeSpotlight ? (activeSpotlight.pxX / 1920) * 100 : 0;
    const spotY = activeSpotlight ? (activeSpotlight.pxY / 1080) * 100 : 0;
    const spotW = activeSpotlight ? (activeSpotlight.pxW / 1920) * 100 : 0;
    const spotH = activeSpotlight ? (activeSpotlight.pxH / 1080) * 100 : 0;

    const videoContainerMarkup = (
        <div
            ref={containerRef}
            className={`video-fullscreen-container ${isFullscreen ? 'is-expanded-fullscreen' : ''}`}
            style={isFullscreen ? {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000000",
                zIndex: 999999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
            } : {
                position: "relative",
                width: "80%",
                maxWidth: "1000px",
                aspectRatio: "16 / 9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                backgroundColor: "var(--bg-dark)"
            }}
        >
            {/* 16:9 Video Frame Container — maintains 100% precise spotlight positioning in fullscreen */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    maxWidth: isFullscreen ? "calc(100vh * 16 / 9)" : "100%",
                    maxHeight: isFullscreen ? "calc(100vw * 9 / 16)" : "100%",
                    aspectRatio: "16 / 9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <video
                    ref={videoRef}
                    src={menuBarVideo}
                    preload="auto"
                    onPlay={() => setIsEnded(false)}
                    onEnded={() => setIsEnded(true)}
                    onTimeUpdate={(e) => {
                        setCurrentTime(e.currentTarget.currentTime);
                        if (isEnded) setIsEnded(false);
                    }}
                    onError={(e) => {
                        console.error("Video error in Menu_Bar:", e.currentTarget.error);
                        if (e.currentTarget.error && e.currentTarget.error.code === 4) {
                            setVideoError(true);
                        }
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        outline: "none",
                        filter: "brightness(1.0)"
                    }}
                >
                    Your browser does not support HTML5 video playback.
                </video>

                {/* Spotlight Dimming Overlay with Cutout Mask */}
                {activeSpotlight && (
                    <>
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                pointerEvents: "none",
                                backgroundColor: "rgba(0, 0, 0, 0.65)",
                                backdropFilter: "brightness(0.4) saturate(0.3)",
                                clipPath: `polygon(
                                    0% 0%,
                                    100% 0%,
                                    100% 100%,
                                    0% 100%,
                                    0% 0%,
                                    ${spotX}% ${spotY}%,
                                    ${spotX}% ${spotY + spotH}%,
                                    ${spotX + spotW}% ${spotY + spotH}%,
                                    ${spotX + spotW}% ${spotY}%,
                                    ${spotX}% ${spotY}%
                                )`,
                                transition: "clip-path 0.25s ease-out",
                                zIndex: 8
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                left: `${spotX}%`,
                                top: `${spotY}%`,
                                width: `${spotW}%`,
                                height: `${spotH}%`,
                                pointerEvents: "none",
                                backdropFilter: "brightness(3.0) saturate(1.4)",
                                transition: "all 0.25s ease-out",
                                zIndex: 9
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                left: `${spotX}%`,
                                top: `${spotY}%`,
                                width: `${spotW}%`,
                                height: `${spotH}%`,
                                pointerEvents: "none",
                                boxSizing: "border-box",
                                border: "2.5px solid #ff1493",
                                boxShadow: "0 0 10px #ff1493, 0 0 4px #ff1493",
                                borderRadius: "2px",
                                zIndex: 10,
                                transition: "all 0.25s ease-out"
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: "calc(100% + 6px)",
                                    backgroundColor: "rgba(20, 20, 30, 0.9)",
                                    color: "#ff1493",
                                    border: "1.5px solid #ff1493",
                                    padding: "3px 10px",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.7), 0 0 8px rgba(255, 20, 147, 0.4)",
                                    backdropFilter: "blur(4px)"
                                }}
                            >
                                {activeSpotlight.label}
                            </div>
                        </div>
                    </>
                )}

                {/* Custom Floating Pill Video Controls Bar */}
                <VideoControlBar
                    videoRef={videoRef}
                    containerRef={containerRef}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={() => setIsFullscreen(prev => !prev)}
                    onPrevStep={handlePrevStep}
                    onNextStep={handleNextStep}
                />
            </div>
        </div>
    );

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--font-main)" }}>
            {/* Quick jump navigation chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
                {SPOTLIGHTS.map((spot) => {
                    const isActive = activeSpotlight?.label === spot.label;
                    return (
                        <button
                            key={spot.label}
                            onClick={() => jumpToTime(spot.startTime)}
                            style={{
                                padding: "4px 12px",
                                fontSize: "12px",
                                fontWeight: "600",
                                borderRadius: "16px",
                                border: isActive ? "1px solid #ff1493" : "1px solid var(--border-color)",
                                backgroundColor: isActive ? "rgba(255, 20, 147, 0.2)" : "var(--bg-surface)",
                                color: isActive ? "#ff1493" : "var(--text-muted)",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                            }}
                        >
                            {spot.label} ({spot.startTime}s)
                        </button>
                    );
                })}
            </div>

            <div style={{ width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {videoError ? (
                    <div style={{
                        width: "80%",
                        maxWidth: "1000px",
                        aspectRatio: "16 / 9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "var(--bg-surface)",
                        color: "var(--color-error)"
                    }}>
                        <p style={{ margin: 0, fontWeight: 600, color: "var(--color-error)" }}>Unable to load video stream</p>
                        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                            File: Menu_Bar.mp4
                        </p>
                    </div>
                ) : (
                    isFullscreen ? createPortal(videoContainerMarkup, document.body) : videoContainerMarkup
                )}
            </div>
        </div>
    );
}

export default Menu_Bar_Japanese_Tutorial;