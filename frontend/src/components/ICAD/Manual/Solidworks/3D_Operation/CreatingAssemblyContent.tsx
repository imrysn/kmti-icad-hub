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
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">1</span>
                <span className="step-label">Select K&M Assembly Template</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Follow the procedure on **Page 3 (except Step 4)**.
                </p>
                <div className="instruction-box" style={{ marginTop: '1rem' }}>
                    <p className="p-flush red-text" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Important Note:</p>
                    <p className="p-flush red-text" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                        <span>※ For **Step 3**, instead of **K&M PART**, click **K&M ASSEMBLY**</span>
                        <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                            <img src={kmImg} alt="K&M Assembly Icon" style={{ height: '32px', display: 'block' }} />
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
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">2</span>
                <span className="step-label">Insert Base Component</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Insert the first part of your assembly.
                </p>
                <div className="instruction-box" style={{ marginTop: '1rem' }}>
                    <p className="p-flush red-text">※ Click **Browse** to find the file.</p>
                    <p className="p-flush red-text" style={{ marginTop: '0.5rem' }}>※ Select **Part3**, then click **Open**.</p>
                </div>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={beginAssemblyImg} alt="Begin Assembly Dialog" className="software-screenshot screenshot-wide" />
                </div>
            </div>
        </div>

        {/* Step 3 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">3</span>
                <span className="step-label">Align Origin</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    To align the part origin with the assembly origin, point your cursor at the **assembly origin** and click.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={partOriginImg} alt="Part Origin Alignment" className="software-screenshot screenshot-wide" />
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginTop: '2rem' }}>
                    <div style={{ flex: '0 0 auto', maxWidth: '800px' }}>
                        <img src={assem1Img} alt="Assembly Feature Tree" className="software-screenshot" style={{ width: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="instruction-box" style={{ flex: '1 1 300px', margin: 0 }}>
                        <p className="p-flush red-text">※ Inserted parts will be added to the FeatureManager Design Tree.</p>
                        <p className="p-flush red-text" style={{ marginTop: '1rem' }}>※ Fixed parts are indicated with a prefix **(f)**.</p>
                        <p className="p-flush red-text" style={{ marginTop: '1rem' }}>※ The first part inserted into the assembly is automatically fixed **(f)**.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Step 4 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">4</span>
                <span className="step-label">Insert Additional Components</span>
            </div>
            <div className="step-description">
                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2' }}>
                    <li style={{ marginBottom: '1.5rem' }}>
                        In the <strong>Assembly</strong> tab, click <strong>Insert Components</strong>{' '}
                        <span className="image-wrapper-flush">
                            <img src={insertImg} alt="Insert Component Icon" style={{ height: '32px', verticalAlign: 'middle' }} />
                        </span>
                        <div className="image-wrapper" style={{ marginTop: '0.75rem' }}>
                            <img src={insertComponentImg} alt="Insert Component Menu" className="software-screenshot screenshot-wide" />
                        </div>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        Click <strong>Browse</strong>, select the part you want to insert, then click <strong>Open</strong>.
                        <div className="image-wrapper" style={{ marginTop: '0.75rem' }}>
                            <img src={openImg} alt="Open Dialog" className="software-screenshot screenshot-wide" />
                        </div>
                    </li>
                </ol>
            </div>
        </div>

        {/* Step 5 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">5</span>
                <span className="step-label">Position Components</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    Drag the newly inserted part next to the fixed base component.
                </p>
                <div className="image-wrapper" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <img src={assem2Img} alt="Second part inserted" className="software-screenshot screenshot-wide" />
                </div>
                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text">※ Under-defined parts are indicated by a minus symbol **(-)** in the tree view.</p>
                </div>
            </div>
        </div>

        {/* Step 6 */}
        <div className="instruction-step">
            <div className="step-header" style={{ padding: '8px 0px' }}>
                <span className="step-number">6</span>
                <span className="step-label">Mate Components</span>
            </div>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-muted)' }}>
                    In the <strong>Assembly</strong> tab, click <strong>Mate</strong>{' '}
                    <span className="image-wrapper-flush">
                        <img src={mateImg} alt="Mate" style={{ height: '32px', verticalAlign: 'middle' }} />
                    </span>
                    {' '}to open the Mate PropertyManager.
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
                        <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span>Then click</span>
                            <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                                <img src={checkImg} alt="Check" style={{ height: '24px', display: 'block' }} />
                            </span>
                        </span>
                    </div>
                </div>

                <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                    <p className="p-flush red-text" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
                        <span>※ Always click</span>
                        <span className="image-wrapper-flush" style={{ flex: '0 0 auto' }}>
                            <img src={checkImg} alt="Check" style={{ height: '24px', display: 'block' }} />
                        </span>
                        <span>to apply changes after creating each mate.</span>
                    </p>
                    <p className="p-flush red-text">※ Repeat <strong>Steps 4, 5, and 6</strong> until the sub-assembly is complete.</p>
                </div>
            </div>
        </div>
    </>
);

export default CreatingAssemblyContent;
