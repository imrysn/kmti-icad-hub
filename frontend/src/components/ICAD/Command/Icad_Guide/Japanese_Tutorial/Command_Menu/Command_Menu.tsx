import { useState, useRef } from 'react';
import Command_MenuVideo from '../../../../../../assets/Commands/Japanese_Tutorial/Command_Menu.mp4';

interface SpotlightConfig {
    label: string;
    startTime: number;
    endTime: number;
    x: number;      // % left
    y: number;      // % top
    width: number;  // % width
    height: number; // % height
}

const CHIPS_NAV = [
    { label: "Draw", startTime: 3.0 },
    { label: "Drafting", startTime: 4.0 },
    { label: "File", startTime: 5.0 },
    { label: "Subdrawings / Parts / Symbols", startTime: 6.8 },
    { label: "Tools", startTime: 8.6 },
    { label: "Top-down", startTime: 10.1 },
    { label: "Modeling", startTime: 11.6 },
    { label: "3D Tools", startTime: 13.1 },
    { label: "3D Verification", startTime: 14.6 },
    { label: "Manufacturing Info", startTime: 16.7 },
    { label: "Action Design", startTime: 18.2 },
    { label: "Raster", startTime: 20.0 },
    { label: "Drafting (Again)", startTime: 21.9 },
    { label: "Sub-Buttons", startTime: 22.0 }
];

function getActiveSpotlight(currentTime: number, isEnded: boolean): SpotlightConfig | undefined {
    if (isEnded) return undefined;

    if (currentTime >= 3.0 && currentTime < 4.0) {
        return { label: "Draw", startTime: 3.0, endTime: 4.0, x: (541 / 1920) * 100, y: (276 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 4.0 && currentTime < 5.0) {
        return { label: "Drafting", startTime: 4.0, endTime: 5.0, x: (589 / 1920) * 100, y: (276 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 5.0 && currentTime < 6.8) {
        return { label: "File", startTime: 5.0, endTime: 6.8, x: (638 / 1920) * 100, y: (276 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 6.8 && currentTime < 8.6) {
        return { label: "Subdrawings / Parts / Symbols", startTime: 6.8, endTime: 8.6, x: (541 / 1920) * 100, y: (323 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 8.6 && currentTime < 10.1) {
        return { label: "Tools", startTime: 8.6, endTime: 10.1, x: (589 / 1920) * 100, y: (323 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 10.1 && currentTime < 11.6) {
        return { label: "Top-down", startTime: 10.1, endTime: 11.6, x: (638 / 1920) * 100, y: (323 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 11.6 && currentTime < 13.1) {
        return { label: "Modeling", startTime: 11.6, endTime: 13.1, x: (541 / 1920) * 100, y: (370 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 13.1 && currentTime < 14.6) {
        return { label: "3D Tools", startTime: 13.1, endTime: 14.6, x: (589 / 1920) * 100, y: (370 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 14.6 && currentTime < 16.7) {
        return { label: "3D Verification", startTime: 14.6, endTime: 16.7, x: (638 / 1920) * 100, y: (370 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 16.7 && currentTime < 18.2) {
        return { label: "Manufacturing Information", startTime: 16.7, endTime: 18.2, x: (541 / 1920) * 100, y: (417 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 18.2 && currentTime < 20.0) {
        return { label: "Action Design", startTime: 18.2, endTime: 20.0, x: (589 / 1920) * 100, y: (417 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 20.0 && currentTime < 21.9) {
        return { label: "Raster", startTime: 20.0, endTime: 21.9, x: (638 / 1920) * 100, y: (417 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 21.9 && currentTime < 22.0) {
        return { label: "Drafting", startTime: 21.9, endTime: 22.0, x: (589 / 1920) * 100, y: (276 / 1080) * 100, width: (48 / 1920) * 100, height: (48 / 1080) * 100 };
    }
    if (currentTime >= 22.0 && currentTime < 23.0) {
        const progress = Math.min(1, Math.max(0, (currentTime - 22.0) / 1.0));
        const currentH = 48 + progress * (616 - 48);
        return {
            label: "Sub-Buttons",
            startTime: 22.0,
            endTime: 23.0,
            x: (541 / 1920) * 100,
            y: (464 / 1080) * 100,
            width: (145 / 1920) * 100,
            height: (currentH / 1080) * 100
        };
    }
    if (currentTime >= 23.0) {
        return {
            label: "Sub-Buttons",
            startTime: 23.0,
            endTime: 60.0,
            x: (541 / 1920) * 100,
            y: (464 / 1080) * 100,
            width: (145 / 1920) * 100,
            height: (616 / 1080) * 100
        };
    }

    return undefined;
}

function Command_Menu_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeSpotlight = getActiveSpotlight(currentTime, isEnded);

    const jumpToTime = (time: number) => {
        if (videoRef.current) {
            setIsEnded(false);
            videoRef.current.currentTime = time;
            videoRef.current.play().catch(() => {});
        }
    };

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--font-main)" }}>
            <div style={{ padding: "10px 0", fontSize: "28px", fontWeight: "bold", color: "var(--text-white)", fontFamily: "var(--font-heading)" }}>
                Command Menu
            </div>

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
                                border: isActive ? "1px solid var(--color-primary)" : "1px solid var(--border-color)",
                                backgroundColor: isActive ? "var(--color-primary-glow)" : "var(--bg-surface)",
                                color: isActive ? "var(--color-primary)" : "var(--text-muted)",
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
                    <div style={{
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
                    }}>
                        <video
                            ref={videoRef}
                            src={Command_MenuVideo}
                            controls
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

                        {/* Pink Label beside target coordinates */}
                        {activeSpotlight && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: `${activeSpotlight.x}%`,
                                    top: `${activeSpotlight.y}%`,
                                    width: `${activeSpotlight.width}%`,
                                    height: `${activeSpotlight.height}%`,
                                    pointerEvents: "none",
                                    transition: "all 0.1s linear",
                                    zIndex: 10
                                }}
                            >
                                {/* Pink Label badge beside the box bounds */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "calc(100% + 8px)",
                                        top: 0,
                                        backgroundColor: "var(--bg-surface)",
                                        color: "var(--color-primary)",
                                        border: "1.5px solid var(--color-primary)",
                                        padding: "4px 12px",
                                        borderRadius: "6px",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.5), 0 0 10px rgba(217, 70, 239, 0.3)",
                                        backdropFilter: "blur(4px)"
                                    }}
                                >
                                    {activeSpotlight.label}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Command_Menu_Japanese_Tutorial;