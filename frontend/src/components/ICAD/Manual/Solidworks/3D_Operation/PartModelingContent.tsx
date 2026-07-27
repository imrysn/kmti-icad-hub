import React from "react";
import controlImg from "../../../../../assets/Solidworks/3D_Operation/3D_Control.png";
import partImg from "../../../../../assets/Solidworks/3D_Operation/3D_Part.png";
import techImg from "../../../../../assets/Solidworks/3D_Operation/3D_Tech.png";
import kmTechImg from "../../../../../assets/Solidworks/3D_Operation/3D_KMTech.png";
import xImg from "../../../../../assets/Solidworks/3D_Operation/3D_X.png";
import clickImg from "../../../../../assets/Solidworks/3D_Operation/3D_Click.png";
import originImg from "../../../../../assets/Solidworks/3D_Operation/3D_Origin.png";
import thenImg from "../../../../../assets/Solidworks/3D_Operation/3D_Then.png";
import appearImg from "../../../../../assets/Solidworks/3D_Operation/3D_Appear.png";
import f1Img from "../../../../../assets/Solidworks/3D_Operation/3D_F1.png";
import f2Img from "../../../../../assets/Solidworks/3D_Operation/3D_F2.png";
import sImg from "../../../../../assets/Solidworks/3D_Operation/3D_S.png";
import planeImg from "../../../../../assets/Solidworks/3D_Operation/3D_Plane.png";

const PartModelingContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">Open a SolidWorks window.</span>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">2</span>
                <span className="step-label">Create New File.</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In <strong>Menu Bar</strong>, click <strong>New</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={controlImg} alt="New icon" style={{ height: '30px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}or <strong>CTRL + N</strong> key.
                </p>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">Select New Part Document.</span>
            </div>
            <div className="step-description">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 350px', minWidth: '300px' }}>
                        <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                            The New SolidWorks Document Dialog box will appear:
                        </p>

                        <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                            <li>Click <strong>K M Tech.</strong> </li>
                            <li>
                                Select <strong>K&amp;M PART</strong>{' '}
                                <span className="image-wrapper-flush">
                                    <img src={partImg} alt="K&M PART icon" style={{ height: '35px', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                                </span>
                            </li>
                            <li style={{ marginTop: '0.5rem' }}>Click <strong>OK</strong> or Double click <strong>K&amp;M PART</strong>.</li>
                        </ol>

                        <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                            <p className="p-flush red-text" style={{ lineHeight: '1.8' }}>
                                ※ This{' '}
                                <span className="image-wrapper-flush" style={{ background: 'white', padding: '2px', border: '1px solid #ddd', borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle', margin: '0 4px' }}>
                                    <img src={kmTechImg} alt="K M Tech" style={{ height: '27px', display: 'block' }} />
                                </span>
                                {' '}is where all the KMTI Standard Templates were saved.
                            </p>
                        </div>
                    </div>

                    <div style={{ flex: '1 1 400px', minWidth: '350px' }}>
                        <div className="image-wrapper">
                            <img
                                src={techImg}
                                alt="K M Tech tab in New SolidWorks Document dialog"
                                className="software-screenshot"
                                style={{ maxWidth: '100%', height: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">4</span>
                <span className="step-label">Set the Material.</span>
            </div>
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <p className="p-flush red-text">
                        ※ <strong>SS400</strong> is the <strong>default</strong> Material.
                    </p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                        ※ Edit the Material if the required Material is not SS400.
                    </p>
                </div>

                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                    <li>Right click on the <strong>SS400</strong>, then click <strong>Edit Material</strong>.</li>
                    <li>Select the required Material, then click <strong>Apply</strong>.</li>
                    <li>
                        Click{' '}
                        <span className="image-wrapper-flush">
                            <img src={xImg} alt="Close button" style={{ height: '22px', verticalAlign: 'middle' }} />
                        </span>
                        {' '}after.
                    </li>
                </ol>

                <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                    <img
                        src={clickImg}
                        alt="Edit Material context menu and Material dialog"
                        className="software-screenshot screenshot-wide"
                    />
                </div>
            </div>
        </div>

        {/* Step 5 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">5</span>
                <span className="step-label">Show the Origin.</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In <strong>View</strong> tab, select{' '}
                    <span className="image-wrapper-flush">
                        <img src={originImg} alt="Origins" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}or in <strong>Heads-up View</strong>, click <strong>Hide/Show Items</strong>{' '}
                    <span className="image-wrapper-flush" style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={thenImg} alt="Hide/Show Items and Origin" style={{ height: '24px', verticalAlign: 'middle' }} />
                        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.9em', pointerEvents: 'none' }}>then</span>
                    </span>
                </p>

                <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                    <img
                        src={appearImg}
                        alt="Origin will appear in the graphics area"
                        className="software-screenshot screenshot-wide"
                    />
                </div>
            </div>
        </div>

        {/* Step 6 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">6</span>
                <span className="step-label">Select plane to be used.</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In <strong>FeatureManager Design tree</strong>, click <strong>Front Plane</strong> then this will appear{' '}
                    <span className="image-wrapper-flush">
                        <img src={f1Img} alt="FeatureManager Front Plane" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                    , click{' '}
                    <span className="image-wrapper-flush">
                        <img src={f2Img} alt="Click" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                </p>

                <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    or in <strong>Sketch tab</strong>, click{' '}
                    <span className="image-wrapper-flush">
                        <img src={sImg} alt="Sketch tab click" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}&gt; Select plane
                </p>

                <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <img src={planeImg} alt="Select Plane" style={{ height: 'auto', maxWidth: '100%', borderRadius: '8px' }} />
                </div>

                <div className="instruction-box" style={{ marginTop: '1rem' }}>
                    <p className="p-flush red-text">
                        ※ The display changes so the Front Plane faces the user.
                    </p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                        ※ Consider the orientation / position of the part on how it will be assembled.<br />
                        &emsp;&emsp;(Refer to assy drawing)
                    </p>
                </div>
            </div>
        </div>
    </>
);

export default PartModelingContent;
