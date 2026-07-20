import { useState } from "react";
import { menuBarOptions, MenuBarOption } from "./Menu_Bar_Options/Menu_Bar_Options";
import { ChevronRight } from "lucide-react";

function Menu_Bar() {
    const [selectedPath, setSelectedPath] = useState<number[]>([]);

    const columns: MenuBarOption[][] = [menuBarOptions];
    let currentItems = menuBarOptions;
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
                flexDirection: "column",
                gap: "10px",
                alignItems: "flex-start",
                background: "#dbdbdbf5",
                border: "1px solid #c8cbd1c7",
                padding: "6px",
                color: "#333333",
                fontFamily: "inherit",
                width: "100%",
                boxSizing: "border-box",
                position: "relative",
                zIndex: 1000,
            }}
        >
            {columns.map((colItems, level) => (
                <div
                    key={level}
                    style={{
                        minWidth: "160px",
                        display: "flex",
                        flexDirection: level === 0 ? "row" : "column",
                        gap: "3px",
                        flexWrap: "nowrap",
                        ...(level > 0 && {
                            position: "absolute",
                            top: "100%",
                            left: `${(level - 1) * 160 + 6}px`,
                            background: "#ffffff",
                            border: "1px solid #c8cbd1c7",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                            zIndex: 1000 + level,
                        }),
                    }}
                >
                    {colItems.map((item, index) => {
                        const isSelected = selectedPath[level] === index;
                        const hasChildren =
                            item.children && item.children.length > 0;

                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    const newPath = selectedPath.slice(0, level);

                                    if (!isSelected) {
                                        newPath.push(index);
                                    }

                                    setSelectedPath(newPath);
                                }}
                                style={{
                                    padding: "6px 12px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    background: isSelected
                                        ? "#0078d7"
                                        : "transparent",
                                    color: isSelected ? "#ffffff" : "#222",
                                    whiteSpace: "nowrap",
                                    userSelect: "none",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.background =
                                            "#e5e5ea";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.background =
                                            "transparent";
                                    }
                                }}
                            >
                                <span>{item.title}</span>
                                {hasChildren && <ChevronRight size={12} />}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Menu_Bar;