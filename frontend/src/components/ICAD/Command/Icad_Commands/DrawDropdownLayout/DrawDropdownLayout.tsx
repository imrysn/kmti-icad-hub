import React, { useState } from "react";
import { drawingMenu } from "./DrawDropdownOptions/DrawDropdownOptions";
import { ChevronDown, ChevronRight } from "lucide-react";

function DrawDropdownLayout() {
    const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
    const [selectedSub, setSelectedSub] = useState<number | null>(null);

    return (
        <div style={{
            background: 'var(--bg-surface, #1a1a2e)',
            borderRadius: '12px',
            padding: '1.5rem',
            color: 'var(--text-primary, #e0e0e0)',
            fontFamily: 'inherit',
        }}>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary, #fff)' }}>
                iCAD Drafting Commands
            </h2>

            {/* Drafting menu top-level button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {drawingMenu.map((item, index) => (
                    <div key={index} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border, rgba(255,255,255,0.1))' }}>

                        {/* Parent item */}
                        <button
                            onClick={() => {
                                setSelectedMenu(selectedMenu === index ? null : index);
                                setSelectedSub(null);
                            }}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '0.75rem 1rem',
                                background: selectedMenu === index ? 'var(--primary, #6366f1)' : 'var(--bg-elevated, #252540)',
                                color: selectedMenu === index ? '#fff' : 'var(--text-primary, #e0e0e0)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                transition: 'background 0.2s',
                            }}
                        >
                            {item.title}
                            {selectedMenu === index
                                ? <ChevronDown size={16} />
                                : <ChevronRight size={16} />}
                        </button>

                        {/* Sub-items */}
                        {selectedMenu === index && item.children?.map((sub, subIndex) => (
                            <div key={subIndex}>
                                <button
                                    onClick={() => setSelectedSub(selectedSub === subIndex ? null : subIndex)}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '0.6rem 1.5rem',
                                        background: selectedSub === subIndex ? 'rgba(99,102,241,0.2)' : 'var(--bg-surface, #1a1a2e)',
                                        color: selectedSub === subIndex ? 'var(--primary, #6366f1)' : 'var(--text-secondary, #aaa)',
                                        border: 'none',
                                        borderTop: '1px solid var(--border, rgba(255,255,255,0.06))',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        fontSize: '0.875rem',
                                        transition: 'background 0.2s',
                                    }}
                                >
                                    {sub.title}
                                    {sub.children && sub.children.length > 0 && (
                                        selectedSub === subIndex
                                            ? <ChevronDown size={14} />
                                            : <ChevronRight size={14} />
                                    )}
                                </button>

                                {/* Child items */}
                                {selectedSub === subIndex && sub.children?.map((child, childIndex) => (
                                    <button
                                        key={childIndex}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '0.5rem 2.5rem',
                                            background: 'var(--bg-deep, #111128)',
                                            color: 'var(--text-muted, #888)',
                                            border: 'none',
                                            borderTop: '1px solid var(--border, rgba(255,255,255,0.04))',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            transition: 'color 0.15s',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary, #fff)')}
                                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted, #888)')}
                                    >
                                        {child.title}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DrawDropdownLayout;