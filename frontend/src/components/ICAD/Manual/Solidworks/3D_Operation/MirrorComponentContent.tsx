import React from "react";
import mirrorComponentImg from "../../../../../assets/Solidworks/3D_Operation/3D_Mirror_Component.png";
import mirrorPlaneImg from "../../../../../assets/Solidworks/3D_Operation/3D_Mirror_Plane.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import mirrorComponent1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Mirror_Component1.png";

const MirrorComponentContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">1</span>
                <span className="step-label">Select Mirror Components Command</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>Assembly</strong> tab, click the arrow under <strong>Linear Component Pattern</strong>, then click <strong>Mirror Components</strong>.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={mirrorComponentImg} alt="Mirror Components Menu" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">2</span>
                <span className="step-label">Define Plane and Components</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Select the mirror plane and the components you want to mirror.
                </p>
                <div className="instruction-box" style={{ marginTop: '1rem' }}>
                    <p className="p-flush red-text">
                        ※ Select <strong>Right Plane</strong> for the Mirror plane.
                    </p>
                </div>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={mirrorPlaneImg} alt="Mirror Plane Selection" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">3</span>
                <span className="step-label">Confirm Mirror Action</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Click{' '}
                    <span className="image-wrapper-flush">
                        <img src={checkImg} alt="Check" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}to confirm and generate the mirrored components.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={mirrorComponent1Img} alt="Mirror Component Result" className="software-screenshot screenshot-wide" />
                </div>
                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text">
                        ※ Note: Mirroring can only be successfully performed on symmetric parts or assemblies.
                    </p>
                </div>
            </div>
        </div>
    </>
);

export default MirrorComponentContent;
