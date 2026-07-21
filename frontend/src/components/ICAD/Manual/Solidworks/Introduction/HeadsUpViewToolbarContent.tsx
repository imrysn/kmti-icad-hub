import React from "react";
import toolbar from "../../../../../assets/Solidworks/Introduction/Solidwork_Toolbar.png";

const HeadsUpViewToolbarContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step">
            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                It contains quick-access view manipulation commands such as Section View, View Orientation, Display Style, Hide/Show Items, Edit Appearance, and others.
            </p>
            <img
                src={toolbar}
                alt="Heads-up View Toolbar — Section View, View Orientation, Display Style, Hide/Show Items, Edit Appearance"
                className="software-screenshot screenshot-wide"
                style={{ marginTop: '1rem' }}
            />
        </div>
    </div>
);

export default HeadsUpViewToolbarContent;
