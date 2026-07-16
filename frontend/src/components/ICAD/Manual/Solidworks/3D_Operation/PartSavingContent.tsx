import React from "react";
import csImg from "../../../../../assets/Solidworks/3D_Operation/3D_CS.png";
import saveImg from "../../../../../assets/Solidworks/3D_Operation/3D_Save.png";

const PartSavingContent: React.FC = () => (
    <>
                    {/* Step 1 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">
                                In <strong>Menu Bar</strong>, click <strong>Save</strong>{' '}
                                <span className="image-wrapper-flush">
                                    <img src={csImg} alt="Save icon" style={{ height: '32px', verticalAlign: 'middle' }} />
                                </span>
                                {' '}or <strong>Ctrl + S</strong> to save file.
                            </span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">When this <strong>Dialog box</strong> appears, edit <strong>File Name</strong>. Click <strong>Save</strong>.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={saveImg} alt="Save Dialog Box" className="software-screenshot screenshot-wide" />
                            </div>

                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1rem' }}>
                                Filename Extension: Part - <strong style={{ color: 'red' }}>.SLDPRT</strong>
                            </p>

                            <div className="instruction-box" style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                                <p className="p-flush red-text">※ Make a new folder for the parts.</p>
                            </div>
                        </div>
                    </div>
    </>
);

export default PartSavingContent;
