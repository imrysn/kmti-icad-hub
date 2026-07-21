import { treeViewOptions, TreeViewOption } from "./Tree_View_Options/Tree_View_Options";
import { useState } from "react";
import { ChevronRight } from "lucide-react";


function Tree_View() {
    const [selectedPath, setSelectedPath] = useState<number[]>([]);
    const columns: TreeViewOption[][] = [treeViewOptions];
    let currentItems = treeViewOptions;
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
                width: "fit-content",
                boxSizing: "border-box",
            }}
        >
            {columns.map((colItems, level) => (
                <div key={level} style={{
                    minWidth: "160px",
                    display: "flex",
                    flexDirection: level === 0 ? "row" : "column",
                    gap: "3px",
                    flexWrap: "nowrap",
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

export default Tree_View;