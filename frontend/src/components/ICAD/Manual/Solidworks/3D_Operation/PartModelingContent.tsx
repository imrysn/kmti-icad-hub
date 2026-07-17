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
                            <span className="step-number">1 </span>
                            <span className="step-label">Open a SolidWorks window.</span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Create New File.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                In Menu Bar, click New{' '}
                                <span className="image-wrapper-flush">
                                    <img src={controlImg} alt="New icon" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                                {' '}or CTRL + N key.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Select New Part Document.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                The New SolidWorks Document Dialog box will appear:
                            </p>

                            <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                <li>Click K M Tech.</li>
                                <li>
                                    Select K&amp;M PART{'                '}
                                    <span className="image-wrapper-flush">
                                        <img src={partImg} alt="K&M PART icon" style={{ height: '40px', verticalAlign: 'middle' }} />
                                    </span>
                                </li>
                                <li>Click OK or Double click K&amp;M PART.</li>
                            </ol>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
                                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                                    <div className="image-wrapper">
                                        <img
                                            src={techImg}
                                            alt="K M Tech tab in New SolidWorks Document dialog"
                                            className="software-screenshot"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                                    <div className="image-wrapper">
                                        <img
                                            src={kmTechImg}
                                            alt="K&M PART template selection"
                                            className="software-screenshot"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                                <p className="p-flush red-text">
                                    ※ This is where all the KMTI
                                    <br />
                                    Standard Templates were saved.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">4 </span>
                            <span className="step-label">Set the Material.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush red-text">
                                ※ SS400 is the default Material.
                            </p>
                            <p className="p-flush red-text" style={{ marginTop: '0.25rem' }}>
                                ※ Edit the Material if the required Material is not SS400.
                            </p>

                            <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                <li>Right click on the SS400, then click Edit Material.</li>
                                <li>Select the required Material, then click Apply.</li>
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
                            <span className="step-number">5 </span>
                            <span className="step-label">Show the Origin.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                In View tab, select{' '}
                                <span className="image-wrapper-flush">
                                    <img src={originImg} alt="Origins" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </p>
                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                or
                            </p>
                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                in Heads-up View, click Hide/Show Items{' '}
                                <span className="image-wrapper-flush">
                                    <img src={thenImg} alt="Hide/Show Items then Origin" style={{ height: '24px', verticalAlign: 'middle' }} />
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
                            <span className="step-number">6 </span>
                            <span className="step-label">Select plane to be used.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                In <strong>FeatureManager Design Tree</strong>, click <strong>Front Plane</strong> then this will appear
                            </p>

                            <div className="image-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                <img src={f1Img} alt="FeatureManager Front Plane" style={{ height: 'auto', maxWidth: '100%' }} className="software-screenshot" />
                            </div>

                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                click{' '}
                                <span className="image-wrapper-flush">
                                    <img src={f2Img} alt="Click" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </p>

                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                or in <strong>Sketch</strong> tab, click{' '}
                                <span className="image-wrapper-flush">
                                    <img src={sImg} alt="Sketch tab click" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </p>

                            <blockquote style={{ borderLeft: '4px solid var(--border-color)', paddingLeft: '1rem', margin: '1rem 0', color: 'var(--text-muted)' }}>
                                Select plane
                            </blockquote>

                            <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <img src={planeImg} alt="Select Plane" style={{ height: 'auto', maxWidth: '100%', borderRadius: '8px' }} />
                            </div>

                            <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                                ※ The display changes so the Front Plane faces the user.
                            </p>
                            <p className="p-flush red-text" style={{ marginTop: '0.25rem' }}>
                                ※ Consider the orientation / position of the part on how it will be assembled.<br />
                                &emsp;&emsp;(Refer to assy drawing)
                            </p>
                        </div>
                    </div>
    </>
);

export default PartModelingContent;
