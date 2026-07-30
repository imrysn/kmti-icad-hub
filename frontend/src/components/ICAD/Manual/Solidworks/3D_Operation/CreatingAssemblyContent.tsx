import React from "react";
import kmImg from "../../../../../assets/Solidworks/3D_Operation/3D_KM.png";
import kmAssemblyImg from "../../../../../assets/Solidworks/3D_Operation/3D_KM_Assembly.png";
import beginAssemblyImg from "../../../../../assets/Solidworks/3D_Operation/3D_Begin_Assembly.png";
import partOriginImg from "../../../../../assets/Solidworks/3D_Operation/3D_Part_Origin.png";
import assem1Img from "../../../../../assets/Solidworks/3D_Operation/3D_Assem1.png";
import insertImg from "../../../../../assets/Solidworks/3D_Operation/3D_Insert.png";
import insertComponentImg from "../../../../../assets/Solidworks/3D_Operation/3D_Insert_Component.png";
import openImg from "../../../../../assets/Solidworks/3D_Operation/3D_Open.png";
import assem2Img from "../../../../../assets/Solidworks/3D_Operation/3D_Assem2.png";
import mateImg from "../../../../../assets/Solidworks/3D_Operation/3D_Mate.png";
import coincidentImg from "../../../../../assets/Solidworks/3D_Operation/3D_Coincident.png";
import coincident3Img from "../../../../../assets/Solidworks/3D_Operation/3D_Coincident3.png";
import checkImg from "../../../../../assets/Solidworks/3D_Operation/3D_Check.png";

const CreatingAssemblyContent: React.FC = () => (
    <>
        {/* Step 1 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">1</span>
                <span className="step-label">Follow the procedure.</span>
            </div>
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1rem' }}>
                    <p className="p-flush red-text" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Important Note:</p>
                    <p className="p-flush red-text">
                        ※ For <strong>No. 3</strong>, instead of <strong>K&M PART</strong>, click <strong>K&M ASSEMBLY</strong>{' '}
                        <span className="image-wrapper-flush">
                            <img src={kmImg} alt="K&M Assembly Icon" style={{ height: '50px', verticalAlign: 'middle' }} />
                        </span>
                    </p>
                </div>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={kmAssemblyImg} alt="K&M Assembly Menu" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 2 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">2</span>
                <span className="step-label">Insert Component</span>
            </div>
            <div className="step-description">
                <div className="instruction-box" style={{ marginTop: '1rem' }}>
                    <p className="p-flush red-text">※ Browse the file.</p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>※ Click <strong>Part3</strong> then Click <strong>Open</strong>.</p>
                </div>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={beginAssemblyImg} alt="Begin Assembly Dialog" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">3</span>
                <span className="step-label">
                    To fix the <strong>part origin</strong>, point the cursor on the <strong>assembly origin</strong> and click.
                </span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={partOriginImg} alt="Part Origin Alignment" className="software-screenshot screenshot-wide" />
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginTop: '2rem' }}>
                    <div style={{ flex: '0 0 auto', maxWidth: '800px' }}>
                        <img src={assem1Img} alt="Assembly Feature Tree" className="software-screenshot" style={{ width: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="instruction-box" style={{ flex: '1 1 300px', margin: 0 }}>
                        <p className="p-flush red-text">※ Inserted part/s will be added to FeatureManager Design Tree.</p>
                        <p className="p-flush red-text" style={{ marginTop: '1rem' }}>※ Fixed part will be indicated as <strong>(f)</strong>.</p>
                        <p className="p-flush red-text" style={{ marginTop: '1rem' }}>※ First part to be inserted will be automatically fixed <strong>(f)</strong>.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">4</span>
                <span className="step-label">Insert another part.</span>
            </div>
            <div className="step-description">
                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0'    , lineHeight: '2.2' }}>
                    
                        In <strong>Assembly</strong> tab, click <strong>Insert Component</strong>{' '}
                        <span className="image-wrapper-flush">
                            <img src={insertImg} alt="Insert Component Icon" style={{ height: '43px', verticalAlign: 'middle' }} />
                        </span>
                        <br />
                        <div className="image-wrapper" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                            <img src={insertComponentImg} alt="Insert Component Menu" className="software-screenshot screenshot-wide" />
                        </div>
                    <div></div>
                    
                        <strong>Browse</strong> the part to be inserted, click <strong>Open</strong>.
                        <br />
                        <div className="image-wrapper" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                            <img src={openImg} alt="Open Dialog" className="software-screenshot screenshot-wide" />
                        </div>
                    
                </ol>
            </div>
        </div>

        {/* Step 5 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">5</span>
                <span className="step-label">Drag the part and click beside the first part.</span>
            </div>
            <div className="step-description">
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={assem2Img} alt="Second part inserted" className="software-screenshot screenshot-wide" />
                </div>
                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text">※ Part is under defined because it doesn't have mating relation yet.</p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>※ It has letter (-) on its side.</p>
                </div>
            </div>
        </div>

        {/* Step 6 */}
        <div className="instruction-step">
            <div className="step-header">
                <span className="step-number">6</span>
                <span className="step-label">Mate the parts.</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In <strong>Assembly</strong> tab, click <strong>Mate</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={mateImg} alt="Mate" style={{ height: '45px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}Mating Property Manager will appear.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 500px' }}>
                        <div className="image-wrapper">
                            <img src={coincidentImg} alt="Coincident Mate 1" className="software-screenshot screenshot-wide" style={{ width: '100%', height: 'auto' }} />
                        </div>
                    </div>
                    <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="image-wrapper">
                            <img src={coincident3Img} alt="Coincident Mate 2" className="software-screenshot" style={{ maxHeight: '500px', width: 'auto' }} />
                        </div>
                        <span style={{ color: 'var(--text-muted)' }}>
                            Then click{' '}
                            <span className="image-wrapper-flush">
                                <img src={checkImg} alt="Check" style={{ height: '30px', verticalAlign: 'middle' }} />
                            </span>
                        </span>
                    </div>
                </div>

                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text">
                        ※ Always click{' '}
                        <span className="image-wrapper-flush">
                            <img src={checkImg} alt="Check" style={{ height: '30px', verticalAlign: 'middle' }} />
                        </span>
                        {' '}every after mating.
                    </p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>※ Repeat <strong>Step 4, 5 and 6</strong> until the sub-assy is complete.</p>
                </div>
            </div>
        </div>
    </>
);

export default CreatingAssemblyContent;
