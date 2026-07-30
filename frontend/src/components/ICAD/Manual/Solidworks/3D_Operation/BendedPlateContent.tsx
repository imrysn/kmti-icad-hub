import React from "react";
import fvImg from "../../../../../assets/Solidworks/3D_Operation/3D_Fv.png";
import flatImg from "../../../../../assets/Solidworks/3D_Operation/3D_Flat.png";
import upImg from "../../../../../assets/Solidworks/3D_Operation/3D_Up.png";
import p1Img from "../../../../../assets/Solidworks/3D_Operation/3D_P1.png";
import m1Img from "../../../../../assets/Solidworks/3D_Operation/3D_M1.png";
import measureImg from "../../../../../assets/Solidworks/3D_Operation/3D_Measure.png";
import downImg from "../../../../../assets/Solidworks/3D_Operation/3D_Down.png";
import boxImg from "../../../../../assets/Solidworks/3D_Operation/3D_Box.png";
import p2Img from "../../../../../assets/Solidworks/3D_Operation/3D_P2.png";

const BendedPlateContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">Click <strong>Spacebar</strong>, then select <strong>Front View</strong>.</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={fvImg} alt="Front View" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">2</span>
                <span className="step-label">
                    In the <strong>FeatureManager Design Tree</strong>, click{' '}
                    <span className="image-wrapper-flush">
                        <img src={flatImg} alt="Flat-Pattern" style={{ height: '45px', verticalAlign: 'middle' }} />
                    </span>
                </span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                    Then right-click on <strong>Flat-Pattern1</strong>.
                </p>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">
                    Click <strong>Unsuppress</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={upImg} alt="Unsuppress" style={{ height: '50px', verticalAlign: 'middle' }} />
                    </span>
                </span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={p1Img} alt="Unsuppressed result" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">4</span>
                <span className="step-label">
                    In <strong>Evaluate</strong> Tab, click <strong>Measure</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={m1Img} alt="Measure" style={{ height: '45px', verticalAlign: 'middle' }} />
                    </span>
                    , or type <strong>"M"</strong>.
                </span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={measureImg} alt="Measure result" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Important Note */}
        <div className="instruction-step">
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <p className="p-flush red-text" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', margin: 0 }}>
                        <span>※ To bring the part back to its bended form, right-click <strong>Flat-Pattern1</strong>, click <strong>Suppress</strong></span>
                        <span className="image-wrapper-flush" style={{ margin: 0 }}>
                            <img src={downImg} alt="Suppress" style={{ height: '40px', display: 'block' }} />
                        </span>
                        <span>or just click</span>
                        <span className="image-wrapper-flush" style={{ margin: 0 }}>
                            <img src={boxImg} alt="Flat-Pattern box" style={{ height: '40px', display: 'block' }} />
                        </span>
                    </p>
                </div>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={p2Img} alt="Bended form result" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>
    </>
);

export default BendedPlateContent;
