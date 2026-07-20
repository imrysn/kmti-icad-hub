import React from "react";
import mainInterface from "../../../../../assets/Solidworks/Introduction/SW_UI_Main.png";

const SolidworksInterfaceContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step" style={{ marginTop: "1rem" }}>
            <img
                src={mainInterface}
                alt="SolidWorks Interface"
                className="software-screenshot screenshot-wide"
                style={{ marginBottom: "1.5rem" }}
            />
        </div>
    </div>
);

export default SolidworksInterfaceContent;
