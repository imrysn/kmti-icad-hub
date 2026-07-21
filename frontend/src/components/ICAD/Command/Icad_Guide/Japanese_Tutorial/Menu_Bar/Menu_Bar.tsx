import { useState } from 'react';
import menuBarVideo from '../../../../../../assets/Commands/Japanese_Tutorial/Menu_Bar.mp4';

function Menu_Bar_Japanese_Tutorial() {
    const [videoError, setVideoError] = useState(false);
    return (
        <div style={{ height: "100%" }}>
            <div style={{ height: "20%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "30px", fontWeight: "bold" }}>
                Menu Bar
            </div>

            <div style={{ width: "100%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>

                {videoError ? (
                    <div style={{
                        width: "80%",
                        maxWidth: "1000px",
                        aspectRatio: "16 / 9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#1a1a2e",
                        color: "#ef4444"
                    }}>
                        <p style={{ margin: 0, fontWeight: 600 }}>Unable to load video stream</p>
                        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "#a0a0b8" }}>
                            File: Menu_Bar.mp4
                        </p>
                    </div>
                ) : (
                    <video
                        controls
                        preload="auto"
                        onError={(e) => {
                            console.error("Video error in Menu_Bar:", e.currentTarget.error);
                            if (e.currentTarget.error && e.currentTarget.error.code === 4) {
                                setVideoError(true);
                            }
                        }}
                        style={{
                            width: "80%",
                            maxWidth: "1000px",
                            maxHeight: "80vh",
                            objectFit: "contain",
                            outline: "none",
                            backgroundColor: "#0d0d1a",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
                        }}
                    >
                        <source src={menuBarVideo} type="video/mp4" />
                        Your browser does not support HTML5 video playback.
                    </video>
                )}
            </div>
        </div>
    );
}

export default Menu_Bar_Japanese_Tutorial;