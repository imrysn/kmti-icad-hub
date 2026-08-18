import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLessonCore } from "../../../../../hooks/useLessonCore";
import "../../../../../styles/3D_Modeling/CourseLesson.css";

// --- Assets ---
import svLogoImg from "../../../../../assets/Solidworks/2D_Operation/2D_SV_Logo.png";
import verticalImg from "../../../../../assets/Solidworks/2D_Operation/2D_Vertical.png";
import checkImg from "../../../../../assets/Solidworks/2D_Operation/2D_Check.png";
import hiddenVisibleImg from "../../../../../assets/Solidworks/2D_Operation/2D_HIdden_Visible.png";
import vertical2Img from "../../../../../assets/Solidworks/2D_Operation/2D_Vertical2.png";
import sectionView1Img from "../../../../../assets/Solidworks/2D_Operation/2D_Section_View1.png";
import sectionView2Img from "../../../../../assets/Solidworks/2D_Operation/2D_Section_View2.png";
import areaHatchImg from "../../../../../assets/Solidworks/2D_Operation/2D_Area_Hatch.png";

interface AddOtherViewsAsNeededProps {
    onNextLesson?: () => void;
    onPrevLesson?: () => void;
    nextLabel?: string;
}

const AddOtherViewsAsNeeded: React.FC<AddOtherViewsAsNeededProps> = ({
    onNextLesson,
    onPrevLesson,
    nextLabel,
}) => {
    const { scrollProgress, containerRef } = useLessonCore("sw-2d-add-other-views");
    const [activeTab, setActiveTab] = useState<'sectionView' | 'removeHatch'>('sectionView');

    return (
        <div className="course-lesson-container" ref={containerRef}>
            <div className="lesson-progress-container">
                <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="lesson-tabs">
                <button
                    className={`tab-button ${activeTab === 'sectionView' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('sectionView'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    Section View
                </button>
                <button
                    className={`tab-button ${activeTab === 'removeHatch' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('removeHatch'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    Remove Hatch
                </button>
            </div>

            <div className="lesson-grid single-card">
                <div className="lesson-card fade-in">
                    
                    {activeTab === 'sectionView' && (
                        <>
                            {/* Header */}
                            <div className="card-header" style={{ marginTop: '2rem' }}>
                                <h4 className="section-title">Section View</h4>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                                {/* Left side: Steps 1 to 6 */}
                                <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                        <div className="step-header" style={{ alignItems: 'center', padding:'8px 0px' }}>
                                            <span className="step-number">1 </span>
                                            <span className="step-label" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                In View Layout, click Section View.
                                                <span className="image-wrapper-flush" style={{ marginLeft: '1rem', display: 'flex' }}>
                                                    <img src={svLogoImg} alt="Section View Logo" style={{ height: '60px', width: "60px" }} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                        <div className="step-header"  style={{padding:'8px 0px'}}>
                                            <span className="step-number">2</span>
                                            <span className="step-label">Select a cutting line to use. (Select Vertical)</span>
                                        </div>
                                    </div>
                                    
                                    <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                        <div className="step-header"  style={{padding:'8px 0px'}}>
                                            <span className="step-number">3 </span>
                                            <span className="step-label">Position the cutting line then click <img src={checkImg} alt="Check" style={{ height: '25px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} />.</span>
                                        </div>
                                    </div>

                                    <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                        <div className="step-header"  style={{padding:'8px 0px'}}>
                                            <span className="step-number">4</span>
                                            <span className="step-label">Check Flip Direction if needed.</span>
                                        </div>
                                    </div>

                                    <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                        <div className="step-header" style={{ alignItems: 'flex-start', padding:'8px 0px' }}>
                                            <span className="step-number">5 </span>
                                            <span className="step-label">Position the section view. (Edit Property Manager if needed)</span>
                                        </div>
                                        <div className="step-description">
                                            <ol style={{ paddingLeft: '1.25rem', margin: '0.5rem 0 0 0', color: 'var(--text-muted)', lineHeight: '2' }}>
                                              <div> On Display Style, Click the Hidden Lines Visible <img src={hiddenVisibleImg} alt="Hidden Lines Visible" style={{ height: '50px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /> </div>
                                               <div> Click Use Custom Scale then set the scale to 1:2.</div>
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="instruction-step" style={{ padding: '0.5rem 0' }}>
                                        <div className="step-header" style={{padding:'8px 0px'}}>
                                            <span className="step-number">6</span>
                                            <span className="step-label">Drop the view.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side: Vertical Image */}
                                <div style={{ flex: '1 1 40%', minWidth: '250px' }}>
                                    <div className="image-wrapper" style={{ margin: 0 }}>
                                        <img src={verticalImg} alt="Vertical Option" className="software-screenshot" style={{ maxWidth: '100%' }} />
                                    </div>
                                </div>
                            </div>

                            <div className="instruction-step">
                                <div className="step-description">
                                    <div className="image-wrapper" style={{ marginTop: '1rem' }}>
                                        <img src={vertical2Img} alt="Drop the view" className="software-screenshot screenshot-wide" style={{ maxWidth: '1000px', width: '100%' }} />
                                    </div>

                                    <p className="p-flush" style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>
                                        In the Property Manager, Section name, Section Depth, Scale can be edited and set.
                                    </p>

                                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: '0 0 auto' }}>
                                            <img src={sectionView1Img} alt="Property Manager Section 1" className="software-screenshot" style={{ width: '350px' }} />
                                        </div>
                                        <div style={{ flex: '1 1 auto', minWidth: '400px' }}>
                                            <img src={sectionView2Img} alt="Property Manager Section 2" className="software-screenshot screenshot-wide" style={{ width: '100%', height:'573px' }} />
                                             </div>
                                            <div className="instruction-box" style={{ marginTop: '2rem', padding: 20 }}>
                                                <div>
                                                <p className="p-flush red-text">
                                                    <span style={{marginRight:''}}>※ Section View sets a limitation of scope of the Section View.</span>
                                                </p>
                                                </div>
                                            </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'removeHatch' && (
                        <>
                            {/* Section: Remove Hatch */}
                            <div className="card-header" style={{ marginTop: '3rem' }}>
                                <h4 className="section-title">Remove Hatch</h4>
                            </div>

                            <div className="instruction-step">
                                <div className="step-description">
                                    <p className="p-flush" style={{ color: 'var(--text-normal)' }}>
                                        In some Japanese drawings, hatch has different meaning.
                                    </p>
                                    <p className="p-flush" style={{ color: 'var(--text-normal)', marginTop: '0.25rem' }}>
                                        To avoid misunderstanding, hatch is being removed.
                                    </p>
                                </div>
                            </div>

                            <div className="instruction-step" style={{ paddingBottom: '0', marginBottom: '0.5rem' }}>
                                <div className="step-header" style={{padding:'8px 0px'}}>
                                    <span className="step-number">1</span>
                                    <span className="step-label">Click on the hatch area.</span>
                                </div>
                            </div>

                            <div className="instruction-step" style={{ paddingBottom: '0', paddingTop: '0', marginBottom: '0.5rem' }}>
                                <div className="step-header" style={{padding:'8px 0px'}}>
                                    <span className="step-number">2</span>
                                    <span className="step-label">Uncheck Material crosshatch.</span>
                                </div>
                            </div>

                            <div className="instruction-step" style={{ paddingBottom: '0', paddingTop: '0', marginBottom: '0.5rem' }}>
                                <div className="step-header" style={{padding:'8px 0px'}}>
                                    <span className="step-number">3</span>
                                    <span className="step-label">Click None.</span>
                                </div>
                            </div>

                            <div className="instruction-step" style={{ paddingTop: '0' }}>
                                <div className="step-header" style={{padding:'8px 0px'}}>
                                    <span className="step-number">4 </span>
                                    <span className="step-label">Click <img src={checkImg} alt="Check" style={{ height: '25px', verticalAlign: 'middle', display: 'inline-block', marginLeft: '4px' }} /></span>
                                </div>
                                <div className="step-description">
                                    <div className="image-wrapper" style={{ marginTop: '0.2rem' }}>
                                        <img src={areaHatchImg} alt="Area Hatch" className="software-screenshot screenshot-wide" style={{ maxWidth: '900px', width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Lesson Navigation */}
                    <div className="lesson-navigation" style={{ marginTop: "3rem" }}>
                        <button
                            className="nav-button"
                            onClick={() => {
                                if (activeTab === 'removeHatch') {
                                    setActiveTab('sectionView');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else {
                                    if (onPrevLesson) onPrevLesson();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                        >
                            <ChevronLeft size={18} /> Previous
                        </button>
                        <button
                            className="nav-button next"
                            onClick={() => {
                                if (activeTab === 'sectionView') {
                                    setActiveTab('removeHatch');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else {
                                    if (onNextLesson) onNextLesson();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                        >
                            {activeTab === 'sectionView' ? 'Next' : (nextLabel || 'Next')} <ChevronRight size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddOtherViewsAsNeeded;
