import { useState, useRef } from 'react';
import Command_MenuVideo from '../../../../../../assets/Commands/Japanese_Tutorial/Command_Menu.mp4';
import { VideoControlBar } from '../../Video_Control/VideoControlBar';

interface SpotlightConfig {
    label: string;
    startTime: number;
    endTime: number;
    pxX: number;
    pxY: number;
    pxW: number;
    pxH: number;
    isTransitioning?: boolean;
}

const CHIPS_NAV = [
    { label: "Draw", startTime: 3.6 },
    { label: "Drafting", startTime: 5.1 },
    { label: "File", startTime: 6.3 },
    { label: "Subdrawings / Parts / Symbols", startTime: 7.5 },
    { label: "Tools", startTime: 8.7 },
    { label: "Top-down", startTime: 10.2 },
    { label: "Modeling", startTime: 11.4 },
    { label: "3D Tools", startTime: 12.6 },
    { label: "3D Verification", startTime: 14.4 },
    { label: "Manufacturing Information", startTime: 15.6 },
    { label: "Action Design", startTime: 16.5 },
    { label: "Raster", startTime: 18.3 },
    { label: "Drafting (Cutback)", startTime: 21.6 },
    { label: "Sub-Buttons", startTime: 22.0 }
];

// Grid bounds definitions (1920x1080 frame)
// Col 1: x=4 (w=40), Col 2: x=44 (w=40), Col 3: x=84 (w=40)
// Row 1: y=306 (h=36), Row 2: y=342 (h=38), Row 3: y=380 (h=40), Row 4: y=420 (h=40)
function getActiveSpotlight(currentTime: number, isEnded: boolean): SpotlightConfig | undefined {
    if (isEnded || currentTime < 2.0) return undefined;

    // 3.6s – 5.1s — Draw — R1C1 (4,306)
    if (currentTime >= 2.0 && currentTime < 3.0) {
        return { label: "Draw", startTime: 3.6, endTime: 5.1, pxX: 4, pxY: 306, pxW: 40, pxH: 36 };
    }
    // 5.1s – 6.3s — Drafting — R1C2 (44,306)
    if (currentTime >= 3.0 && currentTime < 4.0) {
        return { label: "Drafting", startTime: 5.1, endTime: 6.3, pxX: 44, pxY: 306, pxW: 40, pxH: 36 };
    }
    // 6.3s – 7.5s — File — R1C3 (84,306)
    if (currentTime >= 4.0 && currentTime < 5.0) {
        return { label: "File", startTime: 6.3, endTime: 7.5, pxX: 84, pxY: 306, pxW: 40, pxH: 36 };
    }
    // 7.5s – 8.7s — Subdrawings / Parts / Symbols — R2C1 (4,342)
    if (currentTime >= 6.0 && currentTime < 7.0) {
        return { label: "Subdrawings / Parts / Symbols", startTime: 7.5, endTime: 8.7, pxX: 4, pxY: 342, pxW: 40, pxH: 38 };
    }
    // 8.7s – 10.2s — Tools — R2C2 (44,342)
    if (currentTime >= 7.0 && currentTime < 8.0) {
        return { label: "Tools", startTime: 8.7, endTime: 10.2, pxX: 44, pxY: 342, pxW: 40, pxH: 38 };
    }
    // 10.2s – 11.4s — Top-down — R2C3 (84,342)
    if (currentTime >= 8.0 && currentTime < 9.0) {
        return { label: "Top-down", startTime: 10.2, endTime: 11.4, pxX: 84, pxY: 342, pxW: 40, pxH: 38 };
    }
    // 11.4s – 12.6s — Modeling — R3C1 (4,380)
    if (currentTime >= 9.0 && currentTime < 10.0) {
        return { label: "Modeling", startTime: 11.4, endTime: 12.6, pxX: 4, pxY: 380, pxW: 40, pxH: 40 };
    }
    // 12.6s – 14.4s — 3D Tools — R3C2 (44,380)
    if (currentTime >= 10.0 && currentTime < 11.0) {
        return { label: "3D Tools", startTime: 12.6, endTime: 14.4, pxX: 44, pxY: 380, pxW: 40, pxH: 40 };
    }
    // 14.4s – 15.6s — 3D Verification — R3C3 (84,380)
    if (currentTime >= 11.0 && currentTime < 12.0) {
        return { label: "3D Verification", startTime: 14.4, endTime: 15.6, pxX: 84, pxY: 380, pxW: 40, pxH: 40 };
    }
    // 15.6s – 16.5s — Manufacturing Information — R4C1 (4,420)
    if (currentTime >= 12.0 && currentTime < 13.0) {
        return { label: "Manufacturing Information", startTime: 15.6, endTime: 16.5, pxX: 4, pxY: 420, pxW: 40, pxH: 40 };
    }
    // 16.5s – 18.3s — Action Design — R4C2 (44,420)
    if (currentTime >= 13.0 && currentTime < 14.0) {
        return { label: "Action Design", startTime: 16.5, endTime: 18.3, pxX: 44, pxY: 420, pxW: 40, pxH: 40 };
    }
    // 18.3s – 21.6s — Raster — R4C3 (84,420)
    if (currentTime >= 14.0 && currentTime < 15.0) {
        return { label: "Raster", startTime: 18.3, endTime: 21.6, pxX: 84, pxY: 420, pxW: 40, pxH: 40 };
    }
    // 21.6s – 22.0s — Cut back to Drafting — R1C2 (44,306)
    if (currentTime >= 15.0 && currentTime < 16.0) {
        return { label: "Drafting", startTime: 21.6, endTime: 22.0, pxX: 44, pxY: 306, pxW: 40, pxH: 36 };
    }
    // 22.0s – 23.0s — Smooth expansion starting at bottom edge of grid (y=460, x=4, w=120) down to y=1080
    if (currentTime >= 16.0 && currentTime < 17.0) {
        const progress = Math.min(1, Math.max(0, (currentTime - 16.0) / 1.0));
        const maxH = 1080 - 460; // 620px
        const currentH = Math.max(1, progress * maxH);
        return {
            label: "Sub-Buttons",
            startTime: 16.0,
            endTime: 17.0,
            pxX: 4,
            pxY: 460,
            pxW: 120,
            pxH: currentH,
            isTransitioning: true
        };
    }
    // 23.0s – end — Holds fully expanded at y=460 down to y=1080 (x=4, w=120)
    if (currentTime >= 17.0) {
        return {
            label: "Sub-Buttons",
            startTime: 17.0,
            endTime: 100.0,
            pxX: 4,
            pxY: 460,
            pxW: 120,
            pxH: 1080 - 460,
            isTransitioning: true
        };
    }

    return undefined;
}

function Command_Menu_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeSpotlight = getActiveSpotlight(currentTime, isEnded);

    const jumpToTime = (time: number) => {
        if (videoRef.current) {
            setIsEnded(false);
            videoRef.current.currentTime = time;
            videoRef.current.play().catch(() => { });
        }
    };

    const handlePrevStep = () => {
        const currentIdx = CHIPS_NAV.findIndex(chip => Math.abs(chip.startTime - currentTime) < 1.5 || currentTime >= chip.startTime);
        if (currentIdx > 0) {
            jumpToTime(CHIPS_NAV[currentIdx - 1].startTime);
        } else {
            jumpToTime(CHIPS_NAV[0].startTime);
        }
    };

    const handleNextStep = () => {
        const currentIdx = CHIPS_NAV.findIndex(chip => currentTime < chip.startTime);
        if (currentIdx !== -1) {
            jumpToTime(CHIPS_NAV[currentIdx].startTime);
        } else {
            jumpToTime(CHIPS_NAV[0].startTime);
        }
    };

    // Calculate percent position for overlay relative to 1920x1080 video frame
    const spotX = activeSpotlight ? (activeSpotlight.pxX / 1920) * 100 : 0;
    const spotY = activeSpotlight ? (activeSpotlight.pxY / 1080) * 100 : 0;
    const spotW = activeSpotlight ? (activeSpotlight.pxW / 1920) * 100 : 0;
    const spotH = activeSpotlight ? (activeSpotlight.pxH / 1080) * 100 : 0;

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--font-main)" }}>
            {/* Quick jump navigation chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", marginBottom: "16px", maxWidth: "1100px" }}>
                {CHIPS_NAV.map((chip) => {
                    const isActive = activeSpotlight?.label === chip.label || (chip.label.startsWith("Drafting") && activeSpotlight?.label === "Drafting");
                    return (
                        <button
                            key={chip.label + chip.startTime}
                            onClick={() => jumpToTime(chip.startTime)}
                            style={{
                                padding: "4px 10px",
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
                            {chip.label} ({chip.startTime}s)
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
                            File: Command_Menu.mp4
                        </p>
                    </div>
                ) : (
                    <div
                        ref={containerRef}
                        className="video-fullscreen-container"
                        style={{
                            position: "relative",
                            width: "80%",
                            maxWidth: "1000px",
                            aspectRatio: "16 / 9",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            borderRadius: "8px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            backgroundColor: "var(--bg-dark)"
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={Command_MenuVideo}
                            preload="auto"
                            onPlay={() => setIsEnded(false)}
                            onEnded={() => setIsEnded(true)}
                            onTimeUpdate={(e) => {
                                setCurrentTime(e.currentTarget.currentTime);
                                if (isEnded) setIsEnded(false);
                            }}
                            onError={(e) => {
                                console.error("Video error in Command_Menu:", e.currentTarget.error);
                                if (e.currentTarget.error && e.currentTarget.error.code === 4) {
                                    setVideoError(true);
                                }
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                outline: "none"
                            }}
                        >
                            Your browser does not support HTML5 video playback.
                        </video>

                        {/* Custom Floating Pill Video Controls Bar */}
                        <VideoControlBar
                            videoRef={videoRef}
                            containerRef={containerRef}
                            onPrevStep={handlePrevStep}
                            onNextStep={handleNextStep}
                        />

                        {/* Spotlight Dimming Overlay with Cutout Mask */}
                        {activeSpotlight && (
                            <>
                                {/* Dimmed backdrop with cutout for active highlight area */}
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
                                        zIndex: 8
                                    }}
                                />

                                {/* Highlight Box with Deep Pink Border and Soft Outer Glow */}
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
                                        transition: activeSpotlight.isTransitioning ? "height 0.05s linear" : "none"
                                    }}
                                >
                                    {/* Category Label Badge */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "calc(100% + 8px)",
                                            top: 0,
                                            backgroundColor: "rgba(20, 20, 30, 0.9)",
                                            color: "#ff1493",
                                            border: "1.5px solid #ff1493",
                                            padding: "4px 10px",
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default Command_Menu_Japanese_Tutorial;
