import { useState, useRef } from 'react';
import menuBarVideo from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar.mp4';

interface SpotlightConfig {
    label: string;
    startTime: number;
    endTime: number;
    x: number;      // % left (relative to 1920)
    y: number;      // % top (relative to 1080)
    width: number;  // % width
    height: number; // % height
}

const SPOTLIGHTS: SpotlightConfig[] = [
    { label: "File", startTime: 3.0, endTime: 6.4, x: (528 / 1920) * 100, y: (10 / 1080) * 100, width: (710 / 1920) * 100, height: (600 / 1080) * 100 },
    { label: "View", startTime: 6.4, endTime: 8.4, x: (608 / 1920) * 100, y: (10 / 1080) * 100, width: (240 / 1920) * 100, height: (400 / 1080) * 100 },
    { label: "Information", startTime: 8.4, endTime: 10.0, x: (675 / 1920) * 100, y: (10 / 1080) * 100, width: (248 / 1920) * 100, height: (496 / 1080) * 100 },
    { label: "Settings", startTime: 10.0, endTime: 12.75, x: (756 / 1920) * 100, y: (8 / 1080) * 100, width: (307 / 1920) * 100, height: (699 / 1080) * 100 },
    { label: "Tools", startTime: 12.75, endTime: 14.85, x: (833 / 1920) * 100, y: (10 / 1080) * 100, width: (234 / 1920) * 100, height: (223 / 1080) * 100 },
    { label: "Window", startTime: 14.85, endTime: 16.85, x: (906 / 1920) * 100, y: (10 / 1080) * 100, width: (356 / 1920) * 100, height: (549 / 1080) * 100 },
    { label: "Help", startTime: 16.85, endTime: 20.43, x: (1001 / 1920) * 100, y: (10 / 1080) * 100, width: (242 / 1920) * 100, height: (240 / 1080) * 100 }
];

function Menu_Bar_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeSpotlight = !isEnded ? SPOTLIGHTS.find(
        (spot) => currentTime >= spot.startTime && currentTime <= spot.endTime
    ) : undefined;

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
                Menu Bar
            </div>

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
                                border: isActive ? "1px solid var(--color-primary)" : "1px solid var(--border-color)",
                                backgroundColor: isActive ? "var(--color-primary-glow)" : "var(--bg-surface)",
                                color: isActive ? "var(--color-primary)" : "var(--text-muted)",
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
                            src={menuBarVideo}
                            controls
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
                                outline: "none"
                            }}
                        >
                            Your browser does not support HTML5 video playback.
                        </video>

                        {/* Pink Label beside target coordinates (without box outline) */}
                        {activeSpotlight && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: `${activeSpotlight.x}%`,
                                    top: `${activeSpotlight.y}%`,
                                    width: `${activeSpotlight.width}%`,
                                    height: `${activeSpotlight.height}%`,
                                    pointerEvents: "none",
                                    transition: "all 0.2s ease-in-out",
                                    zIndex: 10
                                }}
                            >
                                {/* Label badge beside the box bounds */}
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

export default Menu_Bar_Japanese_Tutorial;