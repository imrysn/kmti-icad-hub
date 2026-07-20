import React from "react";
import menubar1 from "../../../../../assets/Solidworks/Introduction/Solidwork_Menubar1.png";
import menubar2 from "../../../../../assets/Solidworks/Introduction/Solidwork_Menubar2.png";

const MenuBarContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step">
            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                Contains the commonly used tool buttons, the Application Menu, Pin Icon (used to show/hide the Application Menu), and Commonly Used Tools such as Undo/Redo, Selection Tool, Rebuild, File Properties, and SOLIDWORKS Options settings.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                    <img
                        src={menubar1}
                        alt="SolidWorks Menu Bar — Application Menu and Pin Icon"
                        className="software-screenshot screenshot-wide"
                    />
                </div>
                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                    <img
                        src={menubar2}
                        alt="SolidWorks Menu Bar — Commonly Used Tools"
                        className="software-screenshot screenshot-wide"
                    />
                </div>
            </div>
        </div>
    </div>
);

export default MenuBarContent;
