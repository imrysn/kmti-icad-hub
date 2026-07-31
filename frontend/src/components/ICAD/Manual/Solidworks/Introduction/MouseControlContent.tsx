import React from "react";
import mouseLeft from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Left.png";
import mouseRight from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Right.png";
import mouseScroll from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Scroll.png";

const MouseControlContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step" style={{ paddingLeft: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: "1rem" }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <img src={mouseLeft} alt="Left Mouse Button" style={{ width: '40px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '1rem', color: 'var(--text-primary)' }}><strong>Left</strong> - use to Select object.</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <img src={mouseRight} alt="Right Mouse Button" style={{ width: '40px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '1rem', color: 'var(--text-primary)' }}><strong>Right</strong> - contains Shortcut Menu. It differs depending on the active cursor of mouse.</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <img src={mouseScroll} alt="Scroll Wheel" style={{ width: '40px', objectFit: 'contain' }} />
                    <div style={{ display: 'flex', gap: '4rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span><strong>Scroll Up</strong> - Zoom Out</span>
                            <span><strong>Scroll Down</strong> - Zoom In</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span><strong>Click Scroll</strong> - Rotate model</span>
                            <span><strong>Ctrl + Scroll</strong> - Pan</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

export default MouseControlContent;
