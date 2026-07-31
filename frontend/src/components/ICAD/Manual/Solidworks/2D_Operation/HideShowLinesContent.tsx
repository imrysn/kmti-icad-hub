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
                                <ol style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                    <div>Click a view.</div>
                                        <div>
                                    Right click on the view then point on Tangent Edge.
                                    Click Tangent Edges Removed.
                                    </div>
                                </ol>
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
                                <ol style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                    Click a line.
                                </ol>
                                <div className="image-wrapper" style={{ marginTop: '0.2rem', marginBottom: '1.5rem' }}>
                                    <img
                                        src={clickLineImg}
                                        alt="Click Line"
                                        className="software-screenshot"
                                    />
                                </div>
                                <ol start={2} style={{ paddingLeft: '1.25rem', margin: '1rem 0', color: 'var(--text-muted)', lineHeight: '2.2' }}>
                                    Click Hide/Show Edges. 
                                    <span className="image-wrapper-flush">
                                        <img src={clickHideImg} alt="A2 - JFE icon" style={{ height: '40px', verticalAlign: 'middle' }} />
                                    </span>
                                </ol>
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
