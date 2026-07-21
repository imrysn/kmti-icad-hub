import React, { useState } from "react";
import Menu_Bar_Japanese_Tutorial from "./Menu_Bar/Menu_Bar";
import Command_Menu_Japanese_Tutorial from "./Command_Menu/Command_Menu";
import Tree_View_Japanese_Tutorial from "./Tree_View/Tree_View";

function Interface_Lesson() {
    const [activeTab, setActiveTab] = useState("MENU BAR");
    const tabs = ["MENU BAR", "COMMAND MENU", "TREE VIEW"];

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Tab Menu */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                padding: "6px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                marginTop: "20px",
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
                            backgroundColor: activeTab === tab ? "#d946ef" : "transparent",
                            color: activeTab === tab ? "#ffffff" : "#8b92a5",
                            fontWeight: "bold",
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontFamily: "inherit"
                        }}
                        onMouseEnter={(e) => {
                            if (activeTab !== tab) e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== tab) e.currentTarget.style.color = "#8b92a5";
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
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "white" }}>
                        <h2>{activeTab} Content</h2>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Interface_Lesson;