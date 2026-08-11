import React from "react";
import tangentEdgesRemovedImg from "../../../../../assets/Solidworks/2D_Operation/2D_Tandgent_Edges_Removed.png";
import clickLineImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Line.png";
import clickHideImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Hide.png";
import clickShowImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Show.png";

const HideShowLinesContent: React.FC = () => {
    return (
        <div className="instruction-step" style={{ padding: '0', marginTop: '0.5rem', marginBottom: '2rem' }}>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-normal)' }}>
                    There are 2 ways to hide/show lines.
                </p>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {/* Column 1: Tangent Edge */}
                    <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                        <div className="instruction-step" style={{ padding: '0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">1</span>
                                <span className="step-label">Tangent Edge</span>
                            </div>
                            <div className="step-description">
                                <div className="step-header" style={{ padding: '8px 0px' }}>
                                    <span className="step-number" style={{marginLeft:'30px'}}>1.1</span>
                                    <span className="step-label">Click a view.</span>
                                </div>
                                <div className="step-header" style={{ padding: '8px 0px' }}>
                                    <span className="step-number" style={{marginLeft:'30px'}}>1.2</span>
                                    <span className="step-label">Right click on the view then point on Tangent Edge.</span>
                                </div>
                                <div className="step-header" style={{ padding: '8px 0px' }}>
                                    <span className="step-number" style={{marginLeft:'30px'}}>1.3</span>
                                    <span className="step-label">Click Tangent Edges Removed.</span>
                                </div>
                                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                    <img
                                        src={tangentEdgesRemovedImg}
                                        alt="Tangent Edges Removed"
                                        className="software-screenshot"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Hide/Show Edges */}
                    <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                        <div className="instruction-step" style={{ padding: '0' }}>
                            <div className="step-header" style={{padding:'8px 0px'}}>
                                <span className="step-number">2</span>
                                <span className="step-label">Hide/Show Edges</span>
                            </div>
                            <div className="step-description">
                                <div className="step-header" style={{ padding: '8px 0px' }}>
                                    <span className="step-number" style={{marginLeft:'30px'}}>2.1</span>
                                    <span className="step-label">Click a line.</span>
                                </div>
                                <div className="image-wrapper" style={{ marginTop: '0.2rem', marginBottom: '1.5rem' }}>
                                    <img
                                        src={clickLineImg}
                                        alt="Click Line"
                                        className="software-screenshot"
                                    />
                                </div>
                                <div className="step-header" style={{ padding: '8px 0px' }}>
                                    <span className="step-number" style={{marginLeft:'30px'}}>2.2</span>
                                    <span className="step-label">
                                        Click Hide/Show Edges.{' '}
                                        <span className="image-wrapper-flush">
                                            <img src={clickHideImg} alt="Hide/Show Edges icon" style={{ height: '40px', verticalAlign: 'middle' }} />
                                        </span>
                                    </span>
                                </div>
                                <div className="image-wrapper" style={{ marginTop: '0.2rem', marginBottom: '1.5rem' }}>
                                    
                                </div>
                                <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                    <img
                                        src={clickShowImg}
                                        alt="Click Show"
                                        className="software-screenshot"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="instruction-box" style={{ marginTop: '2rem' }}>
                            <p className="p-flush red-text">
                                ※ Press CTRL then pick line will able the user to select another line then hide lines simultaneously.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HideShowLinesContent;
