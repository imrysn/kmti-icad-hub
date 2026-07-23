import { useState, useRef } from 'react';
import Tree_ViewVideo from '../../../../../../assets/Commands/Japanese_Tutorial/Tree_View.mp4';

interface SpotlightConfig {
    label: string;
    startTime: number;
    endTime: number;
    x: number;      // % left
    y: number;      // % top
    width: number;  // % width
    height: number; // % height
}

const SPOTLIGHTS: SpotlightConfig[] = [
    {
        label: "Tree View",
        startTime: 0.0,
        endTime: 60.0,
        x: (690 / 1920) * 100, // ~35.94%
        y: (108 / 1080) * 100, // 10%
        width: (310 / 1920) * 100, // ~16.15%
        height: (918 / 1080) * 100 // 85%
    }
];


function Tree_View_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeSpotlight = !isEnded ? SPOTLIGHTS.find(
        (spot) => currentTime >= spot.startTime && currentTime <= spot.endTime
    ) : undefined;

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--font-main)" }}>
            <div style={{ padding: "10px 0", fontSize: "28px", fontWeight: "bold", color: "var(--text-white)", fontFamily: "var(--font-heading)" }}>
                Tree View
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
                            File: Tree_View.mp4
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
                            src={Tree_ViewVideo}
                            controls
                            preload="auto"
                            onPlay={() => setIsEnded(false)}
                            onEnded={() => setIsEnded(true)}
                            onTimeUpdate={(e) => {
                                setCurrentTime(e.currentTarget.currentTime);
                                if (isEnded) setIsEnded(false);
                            }}
                            onError={(e) => {
                                console.error("Video error in Tree_View:", e.currentTarget.error);
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

                        {/* Spotlight Mask with Pink Border & Dimmed Background Outside */}
                        {activeSpotlight && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: `${activeSpotlight.x}%`,
                                    top: `${activeSpotlight.y}%`,
                                    width: `${activeSpotlight.width}%`,
                                    height: `${activeSpotlight.height}%`,
                                    border: "2.5px solid var(--color-primary)",
                                    borderRadius: "6px",
                                    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.60), 0 0 12px var(--color-primary-glow)",
                                    pointerEvents: "none",
                                    transition: "all 0.2s ease-in-out",
                                    zIndex: 10
                                }}
                            >
                                {/* Pink Label badge beside the box */}
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

export default Tree_View_Japanese_Tutorial;