import React, { useState } from "react";
import { draftingMenu, DraftingMenuItem } from "./DropdownOptions/DraftingDropdown";
import { ChevronDown, ChevronRight } from "lucide-react";

function DraftingDropdownLayout() {
  const [selectedPath, setSelectedPath] = useState<number[]>([]);

  const columns: DraftingMenuItem[][] = [draftingMenu];
  let currentItems = draftingMenu;
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
        color: "#333333",
        fontFamily: "inherit",
        width: "fit-content",
        boxSizing: "border-box",
      }}
    >
      {columns.map((colItems, level) => (
        <div key={level} style={{
          background: "#ffffff",
          border: "1px solid #d1d1d6",
          borderRadius: "4px",
          padding: "4px",
          minWidth: "160px",
          display: level === 0 ? "grid" : "flex",
          gridTemplateColumns: level === 0 ? "repeat(2, 1fr)" : "none",
          flexDirection: level === 0 ? "row" : "column",
          gap: "3px",
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

export default DraftingDropdownLayout;