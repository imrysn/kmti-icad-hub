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
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">1</span>
                <span className="step-label">Select Front View</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Press the <strong>Spacebar</strong>, then select <strong>Front View</strong>.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={fvImg} alt="Front View" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">2</span>
                <span className="step-label">Locate Flat Pattern</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>FeatureManager Design Tree</strong>, click{' '}
                    <span className="image-wrapper-flush">
                        <img src={flatImg} alt="Flat-Pattern" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}and right-click on <strong>Flat-Pattern1</strong>.
                </p>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">3</span>
                <span className="step-label">Unsuppress Pattern</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Click <strong>Unsuppress</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={upImg} alt="Unsuppress" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}to flatten the part.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={p1Img} alt="Unsuppressed result" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">4</span>
                <span className="step-label">Measure Flat Edge</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>Evaluate</strong> tab, click <strong>Measure</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={m1Img} alt="Measure" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}(or press <strong>M</strong> on your keyboard), then select the edge of the part to view its total length.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={measureImg} alt="Measure result" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Important Note */}
        <div className="instruction-step">
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                    <p className="p-flush red-text" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                        <span>※ To restore the part back to its bended form, right-click <strong>Flat-Pattern1</strong> and click <strong>Suppress</strong></span>
                        <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                            <img src={downImg} alt="Suppress" style={{ height: '28px', display: 'block' }} />
                        </span>
                        <span>or simply click the flat pattern feature icon:</span>
                        <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                            <img src={boxImg} alt="Flat-Pattern box" style={{ height: '28px', display: 'block' }} />
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
