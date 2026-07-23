import React from "react";
import linearComponentImg from "../../../../../assets/Solidworks/3D_Operation/3D_Linear_Component.png";
import linearPatternImg from "../../../../../assets/Solidworks/3D_Operation/3D_Linear_Pattern.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import localPatternImg from "../../../../../assets/Solidworks/3D_Operation/3D_Local_Pattern.png";

const LinearPatternContent: React.FC = () => (
    <>
                    {/* Step 1 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">1 </span>
                            <span className="step-label">
                                In <strong>Assembly</strong> tab, click <strong>Linear Component</strong>{' '}
                                <span className="image-wrapper-flush">
                                    <img src={linearComponentImg} alt="Linear Component" style={{ height: '32px', verticalAlign: 'middle' }} />
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">2 </span>
                            <span className="step-label">Input the distance, quantity and parts needed to pattern.</span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={linearPatternImg} alt="Linear Pattern PropertyManager" className="software-screenshot screenshot-wide" />
                            </div>
                            <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                                <p className="p-flush red-text">
                                    ※ For <strong>Pattern Direction</strong>, select an edge of a part, the arrow will determine where the new part will be patterned.
                                </p>
                                <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                                    ※ Always include the original part when inputting the <strong>Number of Instances</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="instruction-step">
                        <div className="step-header">
                            <span className="step-number">3 </span>
                            <span className="step-label">
                                Click{' '}
                                <span className="image-wrapper-flush">
                                    <img src={checkImg} alt="Check" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </span>
                        </div>
                        <div className="step-description">
                            <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <img src={localPatternImg} alt="Local Pattern Result" className="software-screenshot screenshot-wide" />
                            </div>
                        </div>
                    </div>
    </>
);

export default LinearPatternContent;
