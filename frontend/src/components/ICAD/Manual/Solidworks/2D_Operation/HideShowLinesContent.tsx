import React from "react";
import tangentEdgesRemovedImg from "../../../../../assets/Solidworks/2D_Operation/2D_Tandgent_Edges_Removed.png";
import clickLineImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Line.png";
import clickHideImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Hide.png";
import clickShowImg from "../../../../../assets/Solidworks/2D_Operation/2D_Click_Show.png";

const HideShowLinesContent: React.FC = () => {
    return (
        <div className="instruction-step" style={{ padding: '0', marginTop: '0.5rem', marginBottom: '2rem' }}>
            <div className="step-description">
                <p className="p-flush" style={{ color: 'var(--text-normal)', marginBottom: '1.5rem' }}>
                    There are 2 ways to hide/show lines in SolidWorks 2D Drawings:
                </p>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Column 1: Tangent Edge */}
                    <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                        <div className="instruction-step" style={{ padding: '0' }}>
                            <div className="step-header" style={{ padding: '8px 0px' }}>
                                <span className="step-number">1</span>
                                <span className="step-label">Tangent Edge Removal</span>
                            </div>
                            <div className="step-description">
                                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2' }}>
                                    <li style={{ marginBottom: '0.5rem' }}>Click on the drawing view.</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Right-click on the view, then point to <strong>Tangent Edge</strong>.</li>
                                    <li style={{ marginBottom: '0.5rem' }}>Click <strong>Tangent Edges Removed</strong>.</li>
                                </ol>
                                <div className="image-wrapper" style={{ marginTop: '1.25rem' }}>
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
                            <div className="step-header" style={{ padding: '8px 0px' }}>
                                <span className="step-number">2</span>
                                <span className="step-label">Hide/Show Edges</span>
                            </div>
                            <div className="step-description">
                                <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', color: 'var(--text-muted)', lineHeight: '2' }}>
                                    <li style={{ marginBottom: '1.5rem' }}>
                                        Click on the line you wish to hide.
                                        <div className="image-wrapper" style={{ marginTop: '0.75rem' }}>
                                            <img
                                                src={clickLineImg}
                                                alt="Click Line"
                                                className="software-screenshot"
                                            />
                                        </div>
                                    </li>
                                    <li style={{ marginBottom: '1.5rem' }}>
                                        Click <strong>Hide/Show Edges</strong>{' '}
                                        <span className="image-wrapper-flush">
                                            <img src={clickHideImg} alt="Hide/Show Edges icon" style={{ height: '30px', verticalAlign: 'middle' }} />
                                        </span>.
                                        <div className="image-wrapper" style={{ marginTop: '0.75rem' }}>
                                            <img
                                                src={clickShowImg}
                                                alt="Click Show"
                                                className="software-screenshot"
                                            />
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        
                        <div className="instruction-box" style={{ marginTop: '1.5rem' }}>
                            <p className="p-flush red-text">
                                ※ Hold <strong>Ctrl</strong> while picking lines to select and hide multiple lines simultaneously.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HideShowLinesContent;
