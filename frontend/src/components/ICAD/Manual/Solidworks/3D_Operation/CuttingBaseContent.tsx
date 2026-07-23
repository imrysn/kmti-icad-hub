import React from "react";
import sImg from "../../../../../assets/Solidworks/3D_Operation/3D_S.png";
import frontFaceImg from "../../../../../assets/Solidworks/3D_Operation/3D_Front_Face.png";
import skImg from "../../../../../assets/Solidworks/3D_Operation/3D_SK.png";
import cutImg from "../../../../../assets/Solidworks/3D_Operation/3D_Cut.png";
import exCutImg from "../../../../../assets/Solidworks/3D_Operation/3D_Ex_Cut.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";

const CuttingBaseContent: React.FC = () => (
    <>
        <div className="instruction-step">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ flex: '1 1 400px' }}>
                    <ol style={{ paddingLeft: '1.25rem', margin: '0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                        <li>
                            Click <strong>Spacebar</strong> then select <strong>Front</strong>.
                        </li>
                        <li>
                            In <strong>Sketch</strong> tab, select <strong>Sketch</strong>{' '}
                            <span className="image-wrapper-flush">
                                <img src={sImg} alt="Sketch Tab" style={{ height: '24px', verticalAlign: 'middle' }} />
                            </span>
                        </li>
                        <li>
                            Click the <strong>front face</strong>.
                        </li>
                        <li>
                            Draw the sketch to be cut. <span style={{ fontWeight: 'normal' }}>(Please see Page 4 No. 9 for adding sketch relation and dimension.)</span>
                        </li>
                    </ol>

                    <div className="instruction-box" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                        <p className="p-flush red-text" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Important Note:</p>
                        <p className="p-flush red-text">※ Enclose the sketch first, ensure that the lines intersect / coincide with each other.</p>
                    </div>
                </div>

                <div style={{ flex: '0 0 auto', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="image-wrapper">
                        <img src={frontFaceImg} alt="Front Face" className="software-screenshot" style={{ maxHeight: '350px', width: 'auto' }} />
                    </div>
                </div>
            </div>
        </div>

        <div className="instruction-step">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ flex: '1 1 400px' }}>
                    <ol start={5} style={{ paddingLeft: '1.25rem', margin: '0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                        <li>
                            In <strong>Features</strong> tab, click <strong>Extruded Cut</strong>{' '}
                            <span className="image-wrapper-flush">
                                <img src={cutImg} alt="Extruded Cut" style={{ height: '24px', verticalAlign: 'middle' }} />
                            </span>
                        </li>
                        <li>
                            <strong>Cut-Extrude</strong> property manager will come up. In <strong>End Condition</strong>, select <strong>Through All</strong>.
                        </li>
                        <li>
                            Click{' '}
                            <span className="image-wrapper-flush">
                                <img src={checkImg} alt="Check button" style={{ height: '24px', verticalAlign: 'middle' }} />
                            </span>
                        </li>
                    </ol>
                </div>

                <div style={{ flex: '0 0 auto', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="image-wrapper">
                        <img src={exCutImg} alt="Cut-Extrude PropertyManager" className="software-screenshot" style={{ maxHeight: '400px', width: 'auto' }} />
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default CuttingBaseContent;
