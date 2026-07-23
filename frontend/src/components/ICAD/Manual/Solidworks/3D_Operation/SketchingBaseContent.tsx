import React from "react";
import cornerImg from "../../../../../assets/Solidworks/3D_Operation/3D_Corner.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";
import sketchImg from "../../../../../assets/Solidworks/3D_Operation/3D_Sketch.png";
import callImg from "../../../../../assets/Solidworks/3D_Operation/3D_Call.png";
import smartImg from "../../../../../assets/Solidworks/3D_Operation/3D_Smart.png";
import modifyImg from "../../../../../assets/Solidworks/3D_Operation/3D_Modify.png";
import underImg from "../../../../../assets/Solidworks/3D_Operation/3D_Under.png";
import fullyImg from "../../../../../assets/Solidworks/3D_Operation/3D_Fully.png";
import overImg from "../../../../../assets/Solidworks/3D_Operation/3D_Over.png";

const SketchingBaseContent: React.FC = () => (
    <>
        {/* Step 7 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">7 </span>
                <span className="step-label">Add sketch geometry.</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>Sketch</strong> tab, click <strong>Corner Rectangle</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={cornerImg} alt="Corner Rectangle" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                    {' '} &gt; Draw a sketch then check{' '}
                    <span className="image-wrapper-flush">
                        <img src={checkImg} alt="Check" style={{ height: '24px', verticalAlign: 'middle' }} />
                    </span>
                </p>
            </div>
        </div>

        {/* Step 8 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">8 </span>
                <span className="step-label">Add sketch relations (if necessary).</span>
            </div>
            <div className="step-description">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 500px' }}>
                        <div className="image-wrapper">
                            <img
                                src={sketchImg}
                                alt="Sketch display"
                                className="software-screenshot screenshot-wide"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>

                </div>

                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text">
                        ※ Suggested sketch relation will appear on FeatureManager Design Tree, once sketches and/or origins are both selected.
                    </p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>
                        ※ Sketch relation helps the sketch become fully defined by adding the correct sketch relation.
                    </p>
                </div>
            </div>
        </div>

        {/* Step 9 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">9 </span>
                <span className="step-label">Insert dimension/s.</span>
            </div>
            <div className="step-description">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <ol style={{ paddingLeft: '1.25rem', margin: '0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                            <li>
                                In <strong>Sketch</strong> tab, click <strong>Smart Dimension</strong>{' '}
                                <span className="image-wrapper-flush">
                                    <img src={smartImg} alt="Smart Dimension" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </li>
                            <li>Select line(s) to be dimensioned.</li>
                            <li>
                                This dialog box will appear after selecting line(s).<br />
                                Input the required dimension.
                            </li>
                            <li>
                                Click{' '}
                                <span className="image-wrapper-flush">
                                    <img src={checkImg} alt="Check" style={{ height: '24px', verticalAlign: 'middle' }} />
                                </span>
                            </li>
                        </ol>
                        
                        <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                            <p className="p-flush red-text">
                                ※ Make all the sketches fully defined.
                            </p>
                        </div>
                    </div>
                    
                    <div style={{ flex: '0 0 auto', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div className="image-wrapper">
                            <img
                                src={modifyImg}
                                alt="Modify dimension display"
                                className="software-screenshot"
                                style={{ maxHeight: '180px', width: 'auto' }}
                            />
                        </div>
                        <div className="image-wrapper">
                            <img
                                src={fullyImg}
                                alt="Fully dimensioned sketch"
                                className="software-screenshot"
                                style={{ maxHeight: '300px', width: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Sketch Statuses */}
        <div className="instruction-step" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Under Defined */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div className="image-wrapper" style={{ flexShrink: 0 }}>
                        <img src={underImg} alt="Under Defined Sketch" style={{ height: 'auto', maxWidth: '200px' }} className="software-screenshot" />
                    </div>
                    <div>
                        <p className="p-flush" style={{ color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Under Defined Sketch</p>
                        <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                            is due to lack of dimensions or relations and it has <strong>Blue Sketch</strong>.
                        </p>
                    </div>
                </div>

                {/* Fully Defined */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div className="image-wrapper" style={{ flexShrink: 0 }}>
                        <img src={fullyImg} alt="Fully Defined Sketch" style={{ height: 'auto', maxWidth: '200px' }} className="software-screenshot" />
                    </div>
                    <div>
                        <p className="p-flush" style={{ color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Fully Defined Sketch</p>
                        <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                            has complete dimensions and relations and it has <strong>Black Sketch</strong>.
                        </p>
                    </div>
                </div>

                {/* Over Defined */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div className="image-wrapper" style={{ flexShrink: 0 }}>
                        <img src={overImg} alt="Over Defined Sketch" style={{ height: 'auto', maxWidth: '200px' }} className="software-screenshot" />
                    </div>
                    <div>
                        <p className="p-flush" style={{ color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Over Defined Sketch</p>
                        <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                            is due to repeated or over dimensioning.<br />
                            It also happens on improper adding of relation on the sketch.<br />
                            Some of its dimensions, sketch or relation are <strong>Yellow or Red Sketch</strong>.
                        </p>
                        <div style={{ marginTop: '1rem' }}>
                            <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                                It will appear on <strong>over defined sketch</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default SketchingBaseContent;
