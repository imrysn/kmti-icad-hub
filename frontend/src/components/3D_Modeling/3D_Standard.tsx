/** * 3D_Standard.tsx — KEMCO Standard lessons (1-8) */

import React,
 {

useState,

useEffect, useRef } from 'react';

import
 { ChevronLeft, ChevronRight, Info, Play, Pipette, CheckCircle2, Zap } from 'lucide-react';

import '../../styles/3D_Modeling/CourseLesson.css';
 /* Standard (1) Assets */

import pointerColor from '../../assets/3D_Image_File/standard(1)pointer_color.png';

import pointerColorVGroove from '../../assets/3D_Image_File/standard(1)_pointer_color_vgroove.png';

import scale2D from '../../assets/3D_Image_File/standard(1)_scale_2d.png';

import scale3D from '../../assets/3D_Image_File/standard(1)_scale_3d.png';

import scalePointer from '../../assets/3D_Image_File/standard(1)_scale_pointer.png';

import scalePointerVGroove from '../../assets/3D_Image_File/standard(1)_scale_pointer_vgroove.png';
 /* Standard (2) Assets */

import gasDischarge from '../../assets/3D_Image_File/standard(2)_gas_discharge.png';

import oilGroove from '../../assets/3D_Image_File/standard(2)_oil_groove.png';

import sprocketNote from '../../assets/3D_Image_File/standard(2)_sprocket.png';
 /* Standard (3) Assets */

import sprocketColoring from '../../assets/3D_Image_File/standard(3)_sprocket_3d.png';

import sprocketKeywayLoc from '../../assets/3D_Image_File/standard(3)_location_of_sprocket_keyway.png';
 /* Standard (4) Assets */

import screwStandard1 from '../../assets/3D_Image_File/standard(4)_screw_1.png';

import screwStandard2 from '../../assets/3D_Image_File/standard(4)_screw_2.png';
 /* Standard (5) Assets */

import hardwareSymbolStandard from '../../assets/3D_Image_File/standard(5)_screw_1.png';

import boltHoleStandard from '../../assets/3D_Image_File/standard(5)_screw_2.png';
 /* Standard (6) Assets */

import boltLengthCalc from '../../assets/3D_Image_File/standard(6)_bolt_length.png';

import pillowBlock1 from '../../assets/3D_Image_File/standard(6)_pillow_block_1.png';

import pillowBlock2 from '../../assets/3D_Image_File/standard(6)_pillow_block_2.png';

import pillowBlock3 from '../../assets/3D_Image_File/standard(6)_pillow_block_3.png';
 /* Standard (7) Assets */

import slottedThreaded from '../../assets/3D_Image_File/standard(7)_case1.png';

import slottedDrill from '../../assets/3D_Image_File/standard(7)_case2.png';

import connectionCChannel from '../../assets/3D_Image_File/standard(7)_connections_case1.png';

import connectionBothDrill from '../../assets/3D_Image_File/standard(7)_connections_case2.png';
 /* Standard (8) Assets */

import sgpPipesRed from '../../assets/3D_Image_File/standard(8)_SGP_pipes_red.png';

import sgpPipesYellow from '../../assets/3D_Image_File/standard(8)_SGP_pipes_red.png';
 /* Helper component for Pro-Tips */

interface StandardLessonProps
 { subLessonId?: string; onNextLesson?: () => void; onPrevLesson?: () => void; }

const StandardLesson: React.FC<StandardLessonProps> = ({ subLessonId = 'standard-1', onNextLesson, onPrevLesson 
}) =>
 {

const [scrollProgress, setScrollProgress] =

useState(0);

const [completedSteps, setCompletedSteps] =

useState<Set<string>>(new Set());

const containerRef = useRef<HTMLDivElement>(null);

const isStandard1 = subLessonId === 'standard-1';

const isStandard2 = subLessonId === 'standard-2';

const isStandard3 = subLessonId === 'standard-3';

const isStandard4 = subLessonId === 'standard-4';

const isStandard5 = subLessonId === 'standard-5';

const isStandard6 = subLessonId === 'standard-6';

const isStandard7 = subLessonId === 'standard-7';

const isStandard8 = subLessonId === 'standard-8';
 /* Handle scroll for progress bar */

useEffect(() =>
 {

const handleScroll = () =>
 {

if (!containerRef.current) return;

const element = containerRef.current;

const totalHeight = element.scrollHeight - element.clientHeight;

const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  /* Calculate based on the specific lesson container if it's scrollable, or the window if the container isn't restricted height. */

if (totalHeight <= 0)
 {

const winHeight = document.documentElement.scrollHeight - window.innerHeight;

const progress = (windowScrollTop / winHeight) * 100; setScrollProgress(Math.min(100, Math.max(0, progress))); } else
 {

const progress = (element.scrollTop / totalHeight) * 100; setScrollProgress(progress); } 
}; window.addEventListener('scroll', handleScroll, true);

return () => window.removeEventListener('scroll', handleScroll, true); }, [subLessonId]);

const toggleStep = (stepId: string) =>
 { setCompletedSteps(prev =>
 {

const next = new Set(prev);

if (next.has(stepId)) next.delete(stepId); else next.add(stepId);

return next; 
}); 
};

const getStepClass = (stepId: string) =>
 {

return `instruction-step interactive ${completedSteps.has(stepId) ? 'completed' : ''}`; 
};

return (

<div

className="course-lesson-container"

ref={containerRef}>
 {/* Dynamic Progress Bar */}

<div

className="lesson-progress-container">

<div

className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />

</div>

<section

className="lesson-intro">

<h3

className="section-title"> <Info size={28}

className="lesson-intro-icon" />
 {isStandard1 ? 'Scale Pointer' : isStandard2 ? 'GAS DISCHARGE, OIL GROOVE & SPROCKET' : isStandard3 ? 'SPROCKET COLORING & KEYWAY' : isStandard4 ? 'KUSAKABE STANDARD CODE FOR SCREW' : isStandard5 ? 'HARDWARE SYMBOLS & BOLT HOLES' : isStandard6 ? 'BOLT LENGTH & BOLTING SETUP' : isStandard7 ? 'SLOTTED HOLE' : isStandard8 ? 'SGP PIPES' : `STANDARD (${subLessonId.split('-')[1]
})`}

</h3>

<p

className="p-flush">
 {isStandard1 ? '' : isStandard2 ? '' : isStandard3 ? '' : isStandard4 ? '' : isStandard5 ? '' : isStandard6 ? '' : isStandard7 ? '' : isStandard8 ? '' : 'Other KEMCO standard components and design conventions.'}

</p>

</section>

<div

className="lesson-grid single-card">

<div

className="lesson-card">
 {isStandard1 ? (

<div

className="tab-pane">
 {/* SCALE POINTER */}

<div

className={getStepClass('s1-1')}

onClick={() => toggleStep('s1-1')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s1-1') ? 'completed' : ''}`}>
 {completedSteps.has('s1-1') ? <CheckCircle2 size={16} /> : '1'} </span> <h4

className="section-title" >Scale Pointer</h4>

</div>

<p

className="p"> Based on the image. We must apply it on <strong

className="text-highlight">3D Modeling</strong> and <strong

className="text-highlight">2D Detailing</strong>.

</p>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={scalePointer} alt="Scale Pointer Detail"

className="software-screenshot screenshot-large" />

</div>

</div>

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={pointerColor} alt="Pointer Color 3D"

className="software-screenshot screenshot-medium" />

</div>

</div>``

</div>

</div>

<div

className="section-divider" >
</div>
 {/* V-GROOVE POINTER */}

<div

className={getStepClass('s1-2')}

onClick={() => toggleStep('s1-2')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s1-2') ? 'completed' : ''}`}>
 {completedSteps.has('s1-2') ? <CheckCircle2 size={16} /> : '2'} </span>

<p

className="p-flush" > Another type of <strong

className="text-highlight">Scale Pointer</strong> is by putting <strong

className="text-highlight">V-groove</strong>. We must also apply this on 3D and 2D.

</p>

</div>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1.5 */>

<div

className="image-wrapper-flush">

<img src={scalePointerVGroove} alt="V-groove Pointer Detail"

className="software-screenshot screenshot-wide" />

</div>

</div>

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={pointerColorVGroove} alt="V-groove Color 3D"

className="software-screenshot screenshot-medium" />

</div>

</div>

</div>

</div>

<div

className="section-divider" >
</div>
 {/* SCALE SPECS */}

<div

className={getStepClass('s1-3')}

onClick={() => toggleStep('s1-3')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s1-3') ? 'completed' : ''}`}>
 {completedSteps.has('s1-3') ? <CheckCircle2 size={16} /> : '3'} </span>

<p

className="p-flush" > Scale

</p>

</div>

<div

className="step-description">

<div

className="info-box" > <ul

className="interaction-list--plain"> <li >On <strong

className="text-highlight">3D</strong>, Text and linear graduations of scale are <strong >black</strong>.</li> <li>On <strong

className="text-highlight">2D</strong>, Text must be <strong>yellow #4</strong> and linear graduations of scale must be <strong>skin color #15</strong>.</li> </ul>

</div>

<div

className="flex-col" >

<div>

<div

className="image-wrapper-flush">

<img src={scale2D} alt="Scale in 2D"

className="software-screenshot screenshot-wide" />

</div>

</div>

<div>

<div

className="image-wrapper-flush">

<img src={scale3D} alt="Scale in 3D"

className="software-screenshot screenshot-wide" />

</div>

</div>

</div>

</div>

</div>

</div>
 ) : isStandard2 ? (

<div

className="tab-pane">
 {/* GAS DISCHARGE */}

<div

className={getStepClass('s2-1')}

onClick={() => toggleStep('s2-1')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s2-1') ? 'completed' : ''}`}>
 {completedSteps.has('s2-1') ? <CheckCircle2 size={16} /> : '1'} </span> <h4

className="section-title" >Gas Discharge</h4>

</div>

<p

className="p"> Deformation may happen due to the presence of heat and gas at time of welding.

</p>

<p

className="p"> Holes added to square pipes for gas discharge. One <strong

className="text-highlight">φ4 Drill hole</strong> per square pipe is enough.

</p>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={gasDischarge} alt="Gas Discharge Layout"

className="software-screenshot screenshot-wide" />

</div>

</div>

</div>

</div>

<div

className="section-divider" >
</div>
 {/* OIL GROOVE */}

<div

className={getStepClass('s2-2')}

onClick={() => toggleStep('s2-2')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s2-2') ? 'completed' : ''}`}>
 {completedSteps.has('s2-2') ? <CheckCircle2 size={16} /> : '2'} </span> <h4

className="section-title" >Oil Groove</h4>

</div>

<p

className="p">is a groove in the surface of a machine part that distributes lubricating oil injected through an oil hole.
</p>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */> <ul

className="interaction-list--plain" > <li >Follow oil way standard of KEM.</li> <li >Depth of manufacturing should be <strong>1.5mm</strong>.</li> <li>In case drill hole and tap hole reach to ditch, the diameter of hole should be <strong>smaller than width of groove</strong>.</li> </ul>

</div>

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={oilGroove} alt="Oil Groove Detail"

className="software-screenshot screenshot-large" />

</div>

</div>

</div>

</div>

<div

className="section-divider" >
</div>
 {/* SPROCKET */}

<div

className={getStepClass('s2-3')}

onClick={() => toggleStep('s2-3')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s2-3') ? 'completed' : ''}`}>
 {completedSteps.has('s2-3') ? <CheckCircle2 size={16} /> : '3'} </span> <h4

className="section-title" >Sprocket</h4>

</div>

<p

className="p" >In 2D detail of sprocket, there is a <strong >safety color note</strong>.
</p>

<div

className="image-wrapper-flush" >

<img src={sprocketNote} alt="Sprocket Safety Color Note"

className="software-screenshot screenshot-wide" />

</div>

</div>

</div>
 ) : isStandard3 ? (

<div

className="tab-pane">
 {/* SPROCKET COLORING */}

<div

className={getStepClass('s3-1')}

onClick={() => toggleStep('s3-1')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s3-1') ? 'completed' : ''}`}>
 {completedSteps.has('s3-1') ? <CheckCircle2 size={16} /> : '1'} </span> <h4

className="section-title" >This is what we should di in 3D model. Because, as we know in actual, the teeth don't have paint.</h4>

</div>

<div

className="image-wrapper-flush" >

<img src={sprocketColoring} alt="Sprocket Coloring NG vs GOOD"

className="software-screenshot screenshot-wide" />

</div>

</div>

<div

className="section-divider" >
</div>
 {/* KEYWAY LOCATION */}

<div

className={getStepClass('s3-2')}

onClick={() => toggleStep('s3-2')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s3-2') ? 'completed' : ''}`}>
 {completedSteps.has('s3-2') ? <CheckCircle2 size={16} /> : '2'} </span> <h4

className="section-title" >Location of Sprocket Keyway</h4>

</div>

<div

className="image-wrapper-flush" >

<img src={sprocketKeywayLoc} alt="Keyway Location Standards"

className="software-screenshot screenshot-wide" />

</div>

<div

className="info-box" >

<p

className="p-flush"><strong>Note</strong>: 1. Location of keyway always indicated on special notes.
</p>

<p

className="p-flush" >キー溝は歯山部中心に合わせ加工すること
</p>

<p

className="p-flush" >(Key groove should be machined at the center of the tooth)
</p>

<p

className="p-flush" >2. 本図は市販品の追加加工図である
</p>

<p

className="p-flush" >(Purchase part with additional process)
</p>

</div>

</div>

</div>
 ) : isStandard4 ? (

<div

className="tab-pane">

<div

className={getStepClass('s4-1')}

onClick={() => toggleStep('s4-1')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s4-1') ? 'completed' : ''}`}>
 {completedSteps.has('s4-1') ? <CheckCircle2 size={16} /> : '1'} </span> <h4

className="section-title" >Kusakabe Standard Code for Screw, etc.</h4>

</div>

<div

className="flex-col" >

<div

className="image-wrapper-flush">

<img src={screwStandard1} alt="Kusakabe Screw Codes 1"

className="software-screenshot screenshot-wide" />

</div>

<div

className="image-wrapper-flush">

<img src={screwStandard2} alt="Kusakabe Screw Codes 2 (Stainless)"

className="software-screenshot screenshot-wide" />

</div>

</div>

</div>

</div>
 ) : isStandard5 ? (

<div

className="tab-pane">

<div

className={getStepClass('s5-1')}

onClick={() => toggleStep('s5-1')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s5-1') ? 'completed' : ''}`}>
 {completedSteps.has('s5-1') ? <CheckCircle2 size={16} /> : '1'} </span> <h4

className="section-title" >STANDARD OF SYMBOL OF HARDWARE</h4>

</div>

<div

className="image-wrapper-flush" >

<img src={hardwareSymbolStandard} alt="Hardware Symbol Standards"

className="software-screenshot screenshot-wide" />

</div>

</div>

<div

className="section-divider" >
</div>

<div

className="image-wrapper-flush" >

<img src={boltHoleStandard} alt="Bolt Hole Diameter Standard Table"

className="software-screenshot screenshot-wide" />

</div>

</div>
 ) : isStandard6 ? (

<div

className="tab-pane">
 {/* BOLT LENGTH */}

<div

className={getStepClass('s6-1')}

onClick={() => toggleStep('s6-1')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s6-1') ? 'completed' : ''}`}>
 {completedSteps.has('s6-1') ? <CheckCircle2 size={16} /> : '1'} </span> <h4

className="section-title" >BOLT LENGTH</h4>

</div>

<div

className="info-box" >

</div>

<div

className="flex-row--top" >

<div >

<p

className="p-flush"><strong>Example:</strong>
</p> <ul

className="interaction-list--plain" > <li>Bolt size: M8</li> <li>Washer thickness: 2mm</li> <li>Material thickness: 9mm</li> </ul>

<p

className="p-flush" > Bolt Length = (Bolt size × 1.5) + (∑ of thickness)

</p>

<p

className="p-flush" > Bolt Length = (8 × 1.5) + (2+9) = 23mm

</p>

<p

className="p-flush" > Bolt Length = 12 + 11

</p>

<p

className="p-flush" > <strong>Bolt Length = 23mm ≈ 25mm</strong>

</p>

</div>

</div>

<div

className="info-box" >

<p

className="p-flush"><strong>Note:</strong>
</p>

<p

className="p-flush"> 1. To avoid easily loosen of the bolt, bolt size is need to multiply by 1.5～2 to get the length of bolt fasten on thread part.
</p>

<p

className="p-flush">2. In case the reult is not standard, it will round up to nearest standard bolt length.
</p>

</div>

<div

className="image-wrapper-flush" >

<img src={boltLengthCalc} alt="Bolt Length Visualization"

className="software-screenshot screenshot-wide" />

</div>

</div>

<div

className="section-divider" >
</div>
 {/* BOLTING SETUP */}

<div

className={getStepClass('s6-2')}

onClick={() => toggleStep('s6-2')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s6-2') ? 'completed' : ''}`}>
 {completedSteps.has('s6-2') ? <CheckCircle2 size={16} /> : '2'} </span> <h4

className="section-title" >BOLTING SETUP</h4>

</div>

<p

className="p-flush" >Bolting setup will depend on a case-by-case basis. These examples are the commonly used setup.
</p>

<div

className="info-box" >

<p

className="p-flush"><strong>Note</strong>: Hexagonal Bolt (HB) can be changed to Capscrew (CS)

if there are installation problems like tight spaces for tools or hard to reach areas.
</p>

</div>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */> <h5 >Pillow Block</h5>

<p

className="p-flush"><strong>Bolting for Pillow Block</strong>:

</p> <ul

className="interaction-list--plain" > <li>Hexagonal Bolt (HB)</li> <li>Spring Washer (SW)</li> <li>Flat Washer (Hardening) - <strong >SLOTTED</strong></li> </ul>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={pillowBlock1} alt="Pillow Block Setup"

className="software-screenshot screenshot-medium" />

</div>

</div>

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={pillowBlock2} alt="Flange Pillow Block 1"

className="software-screenshot screenshot-medium" />

</div>

</div>

</div>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */> <h5 >For Flange-type Pillow Block</h5> <ul

className="interaction-list--plain" > <li>Hexagonal Bolt (HB)</li> <li>Spring Washer (SW)</li> </ul>

</div>

</div>

<div

className="image-wrapper-flush" >

<img src={pillowBlock3} alt="Flange Pillow Block 2"

className="software-screenshot screenshot-medium" />

</div>

</div>

</div>

</div>

</div>
 ) : isStandard7 ? (

<div

className="tab-pane">
 {/* SLOTTED HOLE */}

<div

className={getStepClass('s7-1')}

onClick={() => toggleStep('s7-1')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s7-1') ? 'completed' : ''}`}>
 {completedSteps.has('s7-1') ? <CheckCircle2 size={16} /> : '1'} </span> <h4

className="section-title" >SLOTTED HOLE</h4>

</div>

<p

className="p-flush" /* sanitized: paddingLeft: '2.5rem' */>For Parts that need adjustments
</p>

<div

className="info-box" >

<p

className="p-flush"><strong>Note</strong>: Slotted holes need <strong

className="text-highlight">Flat washer (FW)</strong>. For normal bolting, Spring Washer (SW) is enough.
</p>

</div>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */> <h5 >CASE 1: Slotted + Threaded Hole</h5> <ul

className="interaction-list--plain" > <li>Hexagonal Bolt (HB)</li> <li>Spring Washer (SW)</li> <li>Flat Washer (Hardening)</li> </ul>

<div

className="image-wrapper-flush" >

<img src={slottedThreaded} alt="Slotted + Threaded Case"

className="software-screenshot screenshot-large" />

</div>

</div>

<div /* sanitized: flex: 1 */> <h5 >CASE 2: Slotted + Drill hole</h5> <ul

className="interaction-list--plain" > <li>Hexagonal Bolt (HB)</li> <li>Flat washer (FWH)</li> <li>Spring Washer (SW)</li> <li>Hex Nut (HN1)</li> </ul>

<div

className="image-wrapper-flush" >

<img src={slottedDrill} alt="Slotted + Drill Case"

className="software-screenshot screenshot-large" />

</div>

</div>

</div>

</div>

<div

className="section-divider" >
</div>
 {/* CONNECTIONS */}

<div

className={getStepClass('s7-2')}

onClick={() => toggleStep('s7-2')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s7-2') ? 'completed' : ''}`}>
 {completedSteps.has('s7-2') ? <CheckCircle2 size={16} /> : '2'} </span> <h4

className="section-title" >CONNECTIONS</h4>

</div>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */> <h5 >CASE 1: On C-Channel</h5> <ul

className="interaction-list--plain" > <li>Hexagonal Bolt (HB)</li> <li>Taper washer (AW5)</li> <li>Flat washer (FWH) - <strong >IF SLOTTED</strong></li> <li>Spring Washer (SW)</li> <li>Hex Nut (HN1)</li> </ul>

<div

className="image-wrapper-flush" >

<img src={connectionCChannel} alt="C-Channel Connection"

className="software-screenshot screenshot-large" />

</div>

</div>

<div /* sanitized: flex: 1 */> <h5 >CASE 2: Both Drill hole</h5> <ul

className="interaction-list--plain" > <li>Hex Sockethead Cap Screw (CS)</li> <li>Spring Washer (SW)</li> <li>Hex Nut (HN1)</li> </ul>

<div

className="image-wrapper-flush" /* sanitized: marginTop: '4rem' */>

<img src={connectionBothDrill} alt="Both Drill Connection"

className="software-screenshot screenshot-large" />

</div>

</div>

</div>

</div>

</div>
 ) : isStandard8 ? (

<div

className="tab-pane">

<div

className={getStepClass('s8-1')}

onClick={() => toggleStep('s8-1')}>

<div

className="step-header"> <span

className={`step-number ${completedSteps.has('s8-1') ? 'completed' : ''}`}>
 {completedSteps.has('s8-1') ? <CheckCircle2 size={16} /> : '1'} </span> <h4

className="section-title" >SGP PIPES</h4>

</div>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */>

<div

className="info-box" > <h5 >a. SGP (White)</h5>

<p

className="p-flush">Apply for fluid (Oil, Air and Coolant).
</p>

<div

className="info-box" > <h5 >b. SGP (Black)</h5>

<p

className="p-flush">Apply for Structural Parts/Fabricated Parts.
</p>

<div

className="info-box" >

<p

className="p-flush">This two types of SGP Pipes will be added on Icad Material List and must be strictly applied on all the drawings to avoid mistakes on purchasing of pipes. This means, we need to identify the 2 types of pipes separately. We will apply it on 3D modeling and 2D detailing of parts.
</p>

</div>

<div

className="info-box" >

<p

className="p-flush">Inspite of having distinction of White and Black, it does not mean that we also apply it on the 3D Modeling. The color that we will apply on SGP Pipes will based on its usage and application. We must not be confused about the color of SGP Pipes
</p>

</div>

</div>

</div>

<div

className="flex-row--top" >

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={sgpPipesRed} alt="SGP White (Red) Pipes"

className="software-screenshot screenshot-large" />

<p

className="p-flush" ><strong>Red Colored Pipes are SGP (White) Pipes</strong>
</p>

<p

className="p-flush" > ex. Pipes for Outfitting
</p>

</div>

</div>

<div /* sanitized: flex: 1 */>

<div

className="image-wrapper-flush">

<img src={sgpPipesYellow} alt="SGP Black (Yellow) Pipes"

className="software-screenshot screenshot-medium" />

<p

className="p-flush" ><strong>Yellow Colored Pipes are SGP (Black) Pipes.</strong>
</p>

<p

className="p-flush" >ex. Hand Rails
</p>

</div>

</div>

</div>

</div>

</div>

</div>

</div>
 ) : (

<div

className="tab-pane">

<div

className="content-placeholder"> <Play size={48}

className="content-placeholder__icon" />

<p>Content for <strong>{subLessonId}</strong> will be provided soon.
</p>

</div>

</div>
 )}

<div

className="lesson-navigation" > <button

className="nav-button"

onClick={onPrevLesson}> <ChevronLeft size={18} /> Previous </button> <button

className="nav-button next"

onClick={onNextLesson}> Next Lesson <ChevronRight size={18} /> </button>

</div>

</div>

</div>

</div >
 ); 
};

export default StandardLesson; 