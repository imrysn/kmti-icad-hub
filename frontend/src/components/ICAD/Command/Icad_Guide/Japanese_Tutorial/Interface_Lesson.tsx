import React, { useState } from "react";
import Menu_Bar_Japanese_Tutorial from "./Menu_Bar/Menu_Bar";
import Command_Menu_Japanese_Tutorial from "./Command_Menu/Command_Menu";
import Tree_View_Japanese_Tutorial from "./Tree_View/Tree_View";

function Interface_Lesson() {
    const [activeTab, setActiveTab] = useState("MENU BAR");
    const tabs = ["MENU BAR", "COMMAND MENU", "TREE VIEW"];

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--bg-dark)", fontFamily: "var(--font-main)" }}>

            {/* Page Name / Title */}
            <div style={{
                paddingTop: "20px",
                paddingBottom: "8px",
                fontSize: "28px",
                fontWeight: "bold",
                color: "var(--text-white)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.5px"
            }}>
                {activeTab === "MENU BAR" ? "Menu Bar" : activeTab === "COMMAND MENU" ? "Command Menu" : "Tree View"}
            </div>

            {/* Tab Menu */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "var(--glass-bg)",
                padding: "6px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                marginTop: "8px",
                marginBottom: "20px",
                gap: "8px"
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: "8px 24px",
                            border: "none",
                            borderRadius: "6px",
                            backgroundColor: activeTab === tab ? "var(--color-primary)" : "transparent",
                            color: activeTab === tab ? "#ffffff" : "var(--text-muted)",
                            fontWeight: "bold",
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontFamily: "var(--font-main)"
                        }}
                        onMouseEnter={(e) => {
                            if (activeTab !== tab) e.currentTarget.style.color = "var(--text-main)";
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== tab) e.currentTarget.style.color = "var(--text-muted)";
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ width: "100%", flex: 1, minHeight: 0, height: "100%" }}>
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

        </div>
    );
}

export default Interface_Lesson;