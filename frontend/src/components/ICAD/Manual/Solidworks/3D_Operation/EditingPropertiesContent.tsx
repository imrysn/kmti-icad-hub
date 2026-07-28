import React from "react";
import fileImg from "../../../../../assets/Solidworks/3D_Operation/3D_File.png";
import okImg from "../../../../../assets/Solidworks/3D_Operation/3D_O.png";
import custom1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Custom1.png";

const EditingPropertiesContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label"> In <strong>Menu Bar </strong>, Click File Properties{' '}

                    <span className="image-wrapper-flush">
                        <img src={fileImg} alt="File Properties" style={{ height: '38px', verticalAlign: 'middle' }} />
                    </span>
                </span>

            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">2</span>
                <span className="step-label">The Dialog box will appear. Edit File / Part Properties (It is linked to 2D Balloon & BOM).</span>
            </div>
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <p className="p-flush red-text">※ Link the dimension to the properties, so it will update whenever the 3D part is modified.</p>
                </div>

                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                    <li>While the Summary Information is open, double click the part then the dimensions will appear.</li>
                    <li>Click on the red line area, type PL4.5, type "x", click 32, type "x", click 75.</li>
                    <li>On the Mat'l Wt Value, Type 0.08.</li>
                </ol>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">Click <strong>OK</strong>.</span>
            </div>
            <div className="step-description">
                <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={custom1Img} alt="Dialog box ok" className="software-screenshot screenshot-wide" />
                </div>

                <div className="instruction-box" style={{ marginTop: '1.5rem', padding: '1rem' }}>
                    <p className="p-flush" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'red' }}>MAT'L</strong> - Type of material used on part.
                    </p>
                    <p className="p-flush" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'red' }}>Wt/Pc</strong> - Finished weight of part (automatically updates)
                    </p>
                    <p className="p-flush" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'red' }}>Description</strong> - Part name or Material Specification (encoded / linked)
                    </p>
                    <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'red' }}>Mat'l Wt</strong> - Material weight (manually encoded)
                    </p>
                </div>
            </div>
        </div>
    </>
);

export default EditingPropertiesContent;
