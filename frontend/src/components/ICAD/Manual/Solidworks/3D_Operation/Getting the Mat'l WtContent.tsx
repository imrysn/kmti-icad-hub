import React from "react";
import rollbackBarImg from "../../../../../assets/Solidworks/3D_Operation/3D_Rollback_Bar.png";
import rebuildImg from "../../../../../assets/Solidworks/3D_Operation/3D_Rebuild.png";
import filePropertiesImg from "../../../../../assets/Solidworks/3D_Operation/3D_File_Properties.png";
import custom2Img from "../../../../../assets/Solidworks/3D_Operation/3D_Custom2.png";
import lastFeatureImg from "../../../../../assets/Solidworks/3D_Operation/3D_Last_Feature.png";

const GettingMaterialWeightContent: React.FC = () => (
    <>
                    {/* Step 1 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">Place the pointer on the <strong>rollback bar</strong> under the <strong>last feature</strong>.</span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Drag the <strong>rollback bar</strong> under the <strong>Boss-Extrude1</strong>.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={rollbackBarImg} alt="Rollback Bar under Boss-Extrude1" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">
                                Click <strong>Rebuild</strong>{' '}
                                <span className="image-wrapper-flush">
                                    <img src={rebuildImg} alt="Rebuild" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                                {' '}or press <strong>"Ctrl + b"</strong>
                            </span>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">4 </span>
                            <span className="step-label">
                                In <strong>Menu Bar</strong>, click <strong>File Properties</strong>{' '}
                                <span className="image-wrapper-flush">
                                    <img src={filePropertiesImg} alt="File Properties" style={{ height: '32px', verticalAlign: 'middle' }} />
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">5 </span>
                            <span className="step-label">Input the <strong>Wt/Pc Evaluated Value</strong> (with red underline) to <strong>Mat'l Wt Value</strong> (red arrow).</span>
                        </div>
                    </div>

                    {/* Step 6 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">6 </span>
                            <span className="step-label">Click <strong>OK</strong>.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={custom2Img} alt="Custom Properties Dialog" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>

                    {/* Step 7 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">7 </span>
                            <span className="step-label">Drag the <strong>rollback bar</strong> under the <strong>last feature</strong>.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={lastFeatureImg} alt="Last Feature Rollback" className="software-screenshot screenshot-wide" />
                            </div>

                            <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                                <p className="p-flush red-text">
                                    ※ If the part is not processed, just input the <strong>Wt/Pc Evaluated Value</strong> to <strong>Mat'l Wt Value</strong>.
                                </p>
                                <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                                    ※ For <strong>Bended Plate</strong>, just <strong>Suppress</strong> all the features for processing like <strong>Hole Wizard</strong>, <strong>Cut-Extrude</strong>, <strong>Chamfer</strong> etc. to get the <strong>Material weight</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
    </>
);

export default GettingMaterialWeightContent;
