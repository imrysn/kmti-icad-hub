import React from "react";
import lImg from "../../../../../assets/Solidworks/3D_Operation/3D_L.png";
import l1Img from "../../../../../assets/Solidworks/3D_Operation/3D_L1.png";
import l2Img from "../../../../../assets/Solidworks/3D_Operation/3D_L2.png";
import tabImg from "../../../../../assets/Solidworks/3D_Operation/3D_Tab.png";
import flangeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Flange.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import oImg from "../../../../../assets/Solidworks/3D_Operation/3D_O.png";
import summaryImg from "../../../../../assets/Solidworks/3D_Operation/3D_Summary.png";
import folderImg from "../../../../../assets/Solidworks/3D_Operation/3D_Folder.png";

const SheetMetalContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">3D Part Modeling.</span>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">2</span>
                <span className="step-label">
                    In <strong>Sketch</strong> tab, click <strong>Line (L)</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={lImg} alt="Line icon" style={{ height: '28px', verticalAlign: 'middle' }} />
                    </span>
                </span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={l1Img} alt="Line sketch" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">Add sketch relation & dimensions.</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={l2Img} alt="Sketch relation and dimension" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">4</span>
                <span className="step-label">
                    In <strong>Sheet Metal</strong> tab, click <strong>Base Flange / Tab</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={tabImg} alt="Base Flange Tab" style={{ height: '38px', verticalAlign: 'middle' }} />
                    </span>
                </span>
            </div>
        </div>

        {/* Step 5 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">5</span>
                <span className="step-label">Base Flange property manager and preview of sheet metal part will appear. Edit the properties.</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={flangeImg} alt="Base Flange Properties" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 6 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">6</span>
                <span className="step-label">
                    Click{' '}
                    <span className="image-wrapper-flush">
                        <img src={checkImg} alt="Check icon" style={{ height: '28px', verticalAlign: 'middle' }} />
                    </span>
                </span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={oImg} alt="Completed sheet metal part" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 7 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">7</span>
                <span className="step-label">Edit Properties (See page 8)</span>
            </div>
            <div className="step-description">
                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                    <li>While the Summary Information is open, double click the part then the dimensions will appear.</li>
                    <li>
                        Click on the red line area, Type PL2.3, type "x", click 45, type "x342".
                        <br />
                        342 (Total Length of plate). Bended plates total length cannot be linked.
                        <br />
                        (See page 11 to know how to get the Total Length of Bended plate.)
                    </li>
                    <li>
                        Input Wt/Pc Evaluated Value to Mat'l Wt Value.
                        <br />
                        (See page 17 to know how to get the Material weight value.)
                    </li>
                    <li>Click OK.</li>
                </ol>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={summaryImg} alt="Summary Properties" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 8 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">8</span>
                <span className="step-label">Save part (See page 8)</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={folderImg} alt="Save part" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>
    </>
);

export default SheetMetalContent;
