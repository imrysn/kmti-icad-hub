import React from "react";
import mainInterface from "../../../../../assets/Solidworks/3D_Fv/SW_UI_Main.png";

const SolidworksInterfaceContent: React.FC = () => (
    <div style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <img
            src={mainInterface}
            alt="SolidWorks Interface"
            style={{
                display: 'block',
                width: '100%',
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 200px)',
                aspectRatio: '16 / 9',
                objectFit: 'contain'
            }}
        />
    </div>
);

export default SolidworksInterfaceContent;
