import React, { useState } from "react";
import { Volume2, SlidersHorizontal } from "lucide-react";
import Menu_Bar_Japanese_Tutorial from "./Menu_Bar/Menu_Bar";
import Command_Menu_Japanese_Tutorial from "./Command_Menu/Command_Menu";
import Tree_View_Japanese_Tutorial from "./Tree_View/Tree_View";
import { ReadAloudButton } from "../../../../ReadAloudButton";
import { useTTSContext } from "../../../../../context/TTSContext";

function Interface_Lesson() {
    const [activeTab, setActiveTab] = useState("MENU BAR");
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const { rate, voices, selectedVoiceURI } = useTTSContext();
    const tabs = ["MENU BAR", "COMMAND MENU", "TREE VIEW"];
    const activeIndex = tabs.indexOf(activeTab);

    const titleForTab = (tab: string) =>
        tab === "MENU BAR" ? "Menu Bar" : tab === "COMMAND MENU" ? "Command Menu" : "Tree View";

    const handleStartReading = () => {
        const utterance = new SpeechSynthesisUtterance(titleForTab(activeTab));
        utterance.rate = rate;
        const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
        if (voice) utterance.voice = voice;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const handleStopReading = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--bg-dark)", fontFamily: "var(--font-main)" }}>

            {/* Header */}
            <div style={{ position: "relative", width: "94.15%", padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>

                {/* Eyebrow */}
                <div style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    color: "#ff32dd",
                    textTransform: "uppercase",
                    marginTop: "6px",
                    marginBottom: "1px"
                }}>
                    Lesson {activeIndex + 1} of {tabs.length}
                </div>

                {/* Title */}
                <div style={{
                    fontSize: "40px",
                    margin: "0px 0px 16px",
                    fontWeight: 800,
                    color: "#E6EDF3",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.5px"
                }}>
                    {titleForTab(activeTab)}
                </div>

                {/* Top-right controls */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    right: "24px",
                    transform: "translateY(-50%)"
                }}>
                    <ReadAloudButton
                        isSpeaking={isSpeaking}
                        onStart={handleStartReading}
                        onStop={handleStopReading}
                    />
                </div>

                {/* Divider */}
                <div style={{ width: "calc(100% - 40px)", maxWidth: "1200px", height: "1px", backgroundColor: "var(--border-color)", marginTop: "52px" }} />
            </div>

            {/* Tab Pill Switcher */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#21262D",
                padding: "9.6px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                margin: '20px 339.109px 80px',
                gap: "8px"
            }}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    const isHovered = hoveredTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "10px 24px",
                                border: !isActive && isHovered ? "1px solid #ff32dd" : "1px solid transparent",
                                borderRadius: "8px",
                                backgroundColor: isActive ? "#ff32dd" : "transparent",
                                color: isActive ? "#ffffff" : isHovered ? "#fdfdfdff" : "var(--text-muted)",
                                fontWeight: "bold",
                                fontSize: "13px",
                                letterSpacing: "0.3px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontFamily: "var(--font-main)",
                                boxShadow: isActive ? "0 0 16px rgba(255, 50, 221, 0.5)" : "none",
                            }}
                            onMouseEnter={() => setHoveredTab(tab)}
                            onMouseLeave={() => setHoveredTab(null)}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div style={{ width: "93.41%", flex: 1, minHeight: 0, height: "100%", padding: "0px 32px 64px" }}>
                {activeTab === "MENU BAR" ? (
                    <Menu_Bar_Japanese_Tutorial />
                ) : activeTab === "COMMAND MENU" ? (
                    <Command_Menu_Japanese_Tutorial />
                ) : activeTab === "TREE VIEW" ? (
                    <Tree_View_Japanese_Tutorial />
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "var(--text-main)" }}>
                        <h2>{activeTab} Content</h2>
                    </div>
                )}
            </div>

        </div >
    );
}

export default Interface_Lesson;