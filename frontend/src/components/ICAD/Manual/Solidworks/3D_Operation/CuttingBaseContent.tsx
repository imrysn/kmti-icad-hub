import React from "react";
import sImg from "../../../../../assets/Solidworks/3D_Operation/3D_S.png";
import frontFaceImg from "../../../../../assets/Solidworks/3D_Operation/3D_Front_Face.png";
import skImg from "../../../../../assets/Solidworks/3D_Operation/3D_SK.png";
import cutImg from "../../../../../assets/Solidworks/3D_Operation/3D_Cut.png";
import exCutImg from "../../../../../assets/Solidworks/3D_Operation/3D_Ex_Cut.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";

const CuttingBaseContent: React.FC = () => (
    <>
                    {/* Step 1 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">Click <strong>Spacebar</strong> then select <strong>Front</strong>.</span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">In <strong>Sketch</strong> tab, select <strong>Sketch</strong>.</span>
                        </div>
                        <div className="step-description">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
                                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                                    <div className="image-wrapper">
                                        <img src={sImg} alt="Sketch Tab" className="software-screenshot" style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                </div>
                                <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
                                    <div className="image-wrapper">
                                        <img src={frontFaceImg} alt="Front Face" className="software-screenshot" style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">Click the <strong>Front Face</strong>.</span>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">4 </span>
                            <span className="step-label">Draw the sketch to be cut.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                (Please see Page 4 No. 9 for adding sketch relation and dimension.)
                            </p>

                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img src={skImg} alt="Sketch" className="software-screenshot screenshot-wide" />
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1rem 0' }}>
                                <p className="p-flush red-text" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Important Note:</p>
                                <p className="p-flush red-text">※ Enclose the sketch first, ensuring that the sketch is completely closed.</p>
                                <p className="p-flush red-text" style={{ marginTop: '0.25rem' }}>※ Make sure all sketch lines intersect or have Coincident relations with each other.</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">5 </span>
                            <span className="step-label">In the <strong>Features</strong> tab, click <strong>Extruded Cut</strong>.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img src={cutImg} alt="Extruded Cut" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    {/* Step 6 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">6 </span>
                            <span className="step-label">The <strong>Cut-Extrude PropertyManager</strong> will appear.</span>
                        </div>
                        <div className="step-description">
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                In <strong>End Condition</strong>, select <strong>Through All</strong>.
                            </p>
                            <div className="image-wrapper" style={{ marginTop: '1.5rem' }}>
                                <img src={exCutImg} alt="Cut-Extrude PropertyManager" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    {/* Step 7 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">7 </span>
                            <span className="step-label">Click the <strong>Check</strong> button.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={checkImg} alt="Check button" className="software-screenshot" style={{ height: 'auto', maxWidth: '100%' }} />
                            </div>
                        </div>
                    </div>
    </>
);

export default CuttingBaseContent;
