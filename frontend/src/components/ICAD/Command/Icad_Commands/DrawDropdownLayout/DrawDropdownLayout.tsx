import React, { useState } from "react";
import { drawingMenu, DrawMenuItem } from "./DrawDropdownOptions/DrawDropdownOptions";
import { ChevronDown, ChevronRight } from "lucide-react";

function DrawDropdownLayout() {
    const [selectedPath, setSelectedPath] = useState<number[]>([]);

    const columns: DrawMenuItem[][] = [drawingMenu];
    let currentItems = drawingMenu;
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
            }}
        >

            {columns.map((colItems, level) => (
                <div
                    key={level}
                    style={{
                        minWidth: "160px",
                        display: level === 0 ? "grid" : "flex",
                        gridTemplateColumns: level === 0 ? "repeat(2, 1fr)" : undefined,
                        flexDirection: level === 0 ? undefined : "column",
                        gap: "3px",
                    }}
                >
                    {colItems.map((item, index) => {
                        const isSelected = selectedPath[level] === index;
                        const hasChildren = item.children && item.children.length > 0;

                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {/* Label */}
                                {item.label && (
                                    <span
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "bold",
                                            color: "#666",
                                            margin: "6px 0 2px 8px",
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                )}

                                {/* Button */}
                                <button
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
                                        borderRadius: "14px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        fontSize: "0.75rem",
                                        fontWeight: 500,
                                        transition: "background 0.15s, color 0.15s",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected)
                                            e.currentTarget.style.background = "#e5e5ea";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected)
                                            e.currentTarget.style.background = "#ffffff";
                                    }}
                                >
                                    <span>{item.title}</span>
                                    {hasChildren && <ChevronRight size={12} />}
                                </button>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default DrawDropdownLayout;