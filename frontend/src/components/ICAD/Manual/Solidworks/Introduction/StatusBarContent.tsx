import React from "react";
import statusbar from "../../../../../assets/Solidworks/Introduction/Solidwork_Statusbar.png";

const StatusBarContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step">
            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                It shows information about the user's current performance and also displays the function of a tool or command when the mouse pointer hovers over it. It is located at the bottom of the SOLIDWORKS interface.
            </p>
            <img
                src={statusbar}
                alt="SolidWorks Status Bar — displays tool information and current performance"
                className="software-screenshot screenshot-wide"
                style={{ marginTop: '1rem' }}
            />
        </div>
    </div>
);

export default StatusBarContent;
