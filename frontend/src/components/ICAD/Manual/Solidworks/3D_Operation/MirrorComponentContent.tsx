import React from "react";
import mirrorComponentImg from "../../../../../assets/Solidworks/3D_Operation/3D_Mirror_Component.png";
import mirrorPlaneImg from "../../../../../assets/Solidworks/3D_Operation/3D_Mirror_Plane.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import mirrorComponent1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Mirror_Component1.png";

const MirrorComponentContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">In <strong>Assembly</strong> tab, click the arrow under <strong>Linear Component</strong> then click <strong>Mirror Components</strong>.</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={mirrorComponentImg} alt="Mirror Components Menu" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">2</span>
                <span className="step-label">Select Mirror plane and components to mirror.</span>
            </div>
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1rem' }}>
                    <p className="p-flush red-text">
                        ※ Select <strong>Right Plane</strong> for Mirror plane.
                    </p>
                </div>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={mirrorPlaneImg} alt="Mirror Plane Selection" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">
                    Click{' '}
                    <span className="image-wrapper-flush">
                        <img src={checkImg} alt="Check" style={{ height: '30px', verticalAlign: 'middle' }} />
                    </span>
                </span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={mirrorComponent1Img} alt="Mirror Component Result" className="software-screenshot screenshot-wide" />
                </div>
                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text">
                        ※ Mirror can only be used in symmetric part.
                    </p>
                </div>
            </div>
        </div>
    </>
);

export default MirrorComponentContent;
