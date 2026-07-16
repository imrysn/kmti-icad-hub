import React from "react";
import save1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Save1.png";
import fileNameImg from "../../../../../assets/Solidworks/3D_Operation/3D_File_Name.png";
import extensionImg from "../../../../../assets/Solidworks/3D_Operation/3D_Extension.png";

const AssemblySavingContent: React.FC = () => (
    <>
                    {/* Step 1 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">
                                In <strong>Menu Bar</strong>, click <strong>Save</strong>{' '}
                                <span className="image-wrapper-flush">
                                    <img src={save1Img} alt="Save icon" style={{ height: '32px', verticalAlign: 'middle' }} />
                                </span>
                                {' '}or <strong>Ctrl + S</strong> to save file.
                            </span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">When this <strong>Dialog box</strong> appears, edit <strong>File Name</strong>. Then click <strong>Save</strong>.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={fileNameImg} alt="Save Dialog Box" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    {/* Step 3 (Additional Information) */}
                    <div className="instruction-step">
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1rem' }}>
                                Filename Extension: Assembly - <strong style={{ color: 'red' }}>.SLDASM</strong>
                            </p>
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={extensionImg} alt="Assembly Extension Result" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>
    </>
);

export default AssemblySavingContent;
