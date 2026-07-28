import React from "react";
import extrudeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Extrude.png";
import bossImg from "../../../../../assets/Solidworks/3D_Operation/3D_Boss.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import baseImg from "../../../../../assets/Solidworks/3D_Operation/3D_Base.png";

const ExtrudingBaseContent: React.FC = () => (
    <>
        {/* Step 10 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">10</span>
                <span className="step-label">Extrude the sketch into a solid.</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                    <img
                        src={extrudeImg}
                        alt="Extrude display"
                        className="software-screenshot screenshot-wide"
                    />
                </div>

                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                    <li>
                        In <strong>Features</strong> tab, click <strong>Extruded Boss/Base</strong>.{' '}
                        <span className="image-wrapper-flush">
                            <img src={bossImg} alt="Extruded Boss/Base" style={{ height: '38px', verticalAlign: 'middle' }} />
                        </span>
                        <br />
                        (<strong>Boss-Extrude</strong> Property Manager will appear)
                    </li>
                    <li>In end condition, select <strong>Blind</strong>.</li>
                    <li>Change the Depth to <strong>4.5mm</strong>.</li>
                    <li>
                        Click{' '}
                        <span className="image-wrapper-flush">
                            <img src={checkImg} alt="Check" style={{ height: '28px', verticalAlign: 'middle' }} />
                        </span>
                    </li>
                </ol>

                <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                    <img
                        src={baseImg}
                        alt="Base extruded"
                        className="software-screenshot screenshot-wide"
                    />
                </div>
            </div>
        </div>
    </>
);

export default ExtrudingBaseContent;
