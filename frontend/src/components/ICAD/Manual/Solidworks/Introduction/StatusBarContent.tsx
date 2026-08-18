import React from "react";
import statusbar from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Statusbar.png";

interface StatusBarContentProps {
    hideText?: boolean;
}

const StatusBarContent: React.FC<StatusBarContentProps> = ({ hideText }) => (
    <div style={{ padding: hideText ? '0' : '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step" style={{ padding: hideText ? 0 : undefined }}>
            {!hideText && (
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    It shows information about the user's current performance and also displays the function of a tool or command when the mouse pointer hovers over it. It is located at the bottom of the SOLIDWORKS interface.
                </p>
            )}
            <img
                src={statusbar}
                alt="SolidWorks Status Bar — displays tool information and current performance"
                className="software-screenshot screenshot-wide"
                style={{ marginTop: hideText ? '0' : '1rem', maxWidth: '100%', maxHeight: hideText ? '150px' : '400px', objectFit: 'contain' }}
            />
        </div>
    </div>
);

export default StatusBarContent;
