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
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">1</span>
                <span className="step-label">Start Part Modeling</span>
            </div>
            <div className="step-description">
                <p className="p-flush text-red-500" style={{ color: 'var(--color-primary-light, #ff4d4d)', fontSize: '0.95rem' }}>
                    (See Lesson "3D Part Modeling" - Follow Step 2 to 6)
                </p>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">2</span>
                <span className="step-label">Draw Sketch Line</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>Sketch</strong> tab, click <strong>Line (L)</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={lImg} alt="Line icon" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}and draw the sketch.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={l1Img} alt="Line sketch" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">3</span>
                <span className="step-label">Add Dimensions & Sketch Relations</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Add sketch relations and dimensions to fully define the sketch.
                </p>
                <p className="p-flush" style={{ color: 'var(--color-primary-light, #ff4d4d)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                    (See Lesson "Sketching the Base" for more details)
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={l2Img} alt="Sketch relation and dimension" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">4</span>
                <span className="step-label">Select Base Flange / Tab</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>Sheet Metal</strong> tab, click <strong>Base Flange / Tab</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={tabImg} alt="Base Flange Tab" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}to define thickness.
                </p>
            </div>
        </div>

        {/* Step 5 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">5</span>
                <span className="step-label">Edit Sheet Metal Properties</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    The Base Flange property manager and a preview of the sheet metal part will appear. Edit the thickness and properties as required.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={flangeImg} alt="Base Flange Properties" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 6 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">6</span>
                <span className="step-label">Confirm Properties</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Click{' '}
                    <span className="image-wrapper-flush">
                        <img src={checkImg} alt="Check icon" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}to apply the properties and generate the base flange.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={oImg} alt="Completed sheet metal part" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 7 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">7</span>
                <span className="step-label">Edit Part Summary Info</span>
            </div>
            <div className="step-description">
                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2' }}>
                    <li style={{ marginBottom: '0.75rem' }}>
                        While the Summary Information is open, double-click the part to display its dimensions.
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                        Click on the red line area, type <strong>PL2.3</strong>, then type <strong>x</strong>, click <strong>45</strong>, and type <strong>x342</strong> (where 342 is the Total Length of the plate).
                        <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            Note: Bended plate total length cannot be linked automatically.
                        </div>
                        <div style={{ color: 'var(--color-primary-light, #ff4d4d)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            (See Lesson "Getting the Total Length of Bended Plate" to know how to get this value)
                        </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                        Input the <strong>Wt/Pc Evaluated Value</strong> into the <strong>Mat'l Wt</strong> (Material weight) property field.
                        <div style={{ color: 'var(--color-primary-light, #ff4d4d)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            (See Lesson "Getting the Mat'l Wt (Material weight) of a part" to know how to get the Material weight value)
                        </div>
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                        Click <strong>OK</strong>.
                    </li>
                </ol>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={summaryImg} alt="Summary Properties" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 8 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">8</span>
                <span className="step-label">Save Part File</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Save your completed sheet metal part in the dedicated parts folder.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={folderImg} alt="Save part" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>
    </>
);

export default SheetMetalContent;
