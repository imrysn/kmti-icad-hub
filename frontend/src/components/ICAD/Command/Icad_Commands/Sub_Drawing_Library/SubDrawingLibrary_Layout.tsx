import React, { useState } from "react";
import { subDrawingLibraryOptions, SubDrawingLibrary } from "./Sub_Drawing_Library_Options/SubDrawingLibrary=Options";
import { ChevronDown, ChevronRight } from "lucide-react";

function SubDrawingLibraryLayout() {
    const [selectedPath, setSelectedPath] = useState<number[]>([]);

    const columns: SubDrawingLibrary[][] = [subDrawingLibraryOptions];
    let currentItems = subDrawingLibraryOptions;
    for (let i = 0; i < selectedPath.length; i++) {
        const selectedItem = currentItems[selectedPath[i]];
        if (selectedItem && selectedItem.children && selectedItem.children.length > 0) {
            columns.push(selectedItem.children);
            currentItems = selectedItem.children;
        } else {
            break;
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "flex-start",
                background: "#f0f0f3",
                borderRadius: "4px",
                padding: "6px",
                color: "#333333",
                fontFamily: "inherit",
                width: "fit-content",
                boxSizing: "border-box",
                position: "relative",
                zIndex: 1000,
            }}
        >
            {columns.map((colItems, level) => (
                <div key={level} style={{
                    minWidth: "160px",
                    display: level === 0 ? "grid" : "flex",
                    gridTemplateColumns: level === 0 ? "repeat(2, 1fr)" : "none",
                    flexDirection: level === 0 ? "row" : "column",
                    gap: "3px",
                    ...(level > 0 && {
                        position: "absolute",
                        top: "0",
                        left: `calc(100% + ${(level - 1) * 165}px)`,
                        background: "#f0f0f3",
                        padding: "6px",
                        borderRadius: "4px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        zIndex: 1000 + level,
                    }),
                }}>
                    {colItems.map((item, index) => {
                        const isSelected = selectedPath[level] === index;
                        const hasChildren = item.children && item.children.length > 0;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    const newPath = selectedPath.slice(0, level);
                                    if (!isSelected) {
                                        newPath.push(index);
                                    }
                                    setSelectedPath(newPath);
                                }}
                                style={{
                                    textAlign: "left",
                                    padding: "6px 10px",
                                    background: isSelected ? "#007aff" : "#ffffff",
                                    color: isSelected ? "#ffffff" : "#333333",
                                    border: "none",
                                    borderRadius: "14px", // oval shape
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    transition: "background 0.15s, color 0.15s",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) e.currentTarget.style.background = "#e5e5ea";
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) e.currentTarget.style.background = "#ffffff";
                                }}
                            >
                                <span>{item.title}</span>
                                {hasChildren && <ChevronRight size={12} />}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default SubDrawingLibraryLayout;