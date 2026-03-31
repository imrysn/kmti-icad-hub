 /* cspell:disable-file */

import React,
 {

useState,

useEffect, useRef } from 'react';

import
 { Info, Target } from 'lucide-react';

interface Hotspot {
  id: number;
  label: string;
  description: string;
  x: number; /* percentage */
  y: number; /* percentage */
}

interface InteractiveImageMapProps
 { imageSrc: string; }

const HOTSPOTS: Hotspot[] = [
 { id: 1, label: 'Title bar', description: 'Displays the name of the program and typically the name of the currently active document.', x: 10.6, y: 12.5 },
 { id: 2, label: 'Menu bar', description: 'Contains drop down menus such as File, View, Information, Set, Tool, Window and Help.', x: 6.4, y: 15.8 },
 { id: 3, label: 'Command Menu', description: 'Contains sets of available commands associated with different functions. Preferably use on 2D.', x: 6.6, y: 49.5 },
 { id: 4, label: 'Tree view', description: 'Displays the 3D parts and groups for the drawing currently being worked on.', x: 12.4, y: 67.3 },
 { id: 5, label: 'Workspace', description: 'Area where 3D Modeling and Assembly operations are done.', x: 59.2, y: 75 },
 { id: 6, label: 'Icon Menu', description: 'Contains commands to perform operations on 3D Modeling. Other options can be found on the command menu.', x: 91.9, y: 51.7 },
 { id: 7, label: 'Item Entry', description: 'Used for entering the values and characters necessary for command execution.', x: 25.6, y: 85.3 },
 { id: 8, label: 'Key Entry', description: 'Coordinates and other values can be entered from the Key Entry Area.', x: 69.7, y: 85.4 },
 { id: 9, label: 'Tool Bar', description: 'Contains set of tool bars that can be display or hide. These tool bars are the following.', x: 49.2, y: 12.9 },
 { id: 10, label: 'Message Pane', description: 'Displays messages related to operations. Messages displayed in red are error messages.', x: 41.5, y: 86.6 }, ];

const InteractiveImageMap: React.FC<InteractiveImageMapProps> = ({ imageSrc 
}) =>
 {

const [scrollProgress, setScrollProgress] =

useState(0);

const containerRef = useRef<HTMLDivElement>(null);

useEffect(() =>
 {

const handleScroll = () =>
 {

if (!containerRef.current) return;

const element = containerRef.current;

const totalHeight = element.scrollHeight - element.clientHeight;

if (totalHeight === 0)
 { setScrollProgress(100); return; }

const progress = (element.scrollTop / totalHeight) * 100; setScrollProgress(progress); 
};

const currentContainer = containerRef.current;

if (currentContainer)
 { currentContainer.addEventListener('scroll', handleScroll); handleScroll(); }

return () => currentContainer?.removeEventListener('scroll', handleScroll); }, []);

const [selectedHotspot, setSelectedHotspot] =

useState<Hotspot | null>(null);

const [hoveredHotspotId, setHoveredHotspotId] =

useState<number | null>(null);

const activeId = hoveredHotspotId || selectedHotspot?.id;

return (

<div

className="interactive-map-wrapper">

<div

className="interactive-map-main">
 {/* Image Section */}

<div

className="image-stage">

<div

className="info-panel-content image-caption-top">
 {selectedHotspot ? (

<div

className="content-detail animate-in"> <h1>{selectedHotspot.label}</h1>

<p>{selectedHotspot.description}
</p>

<div

className="detail-meta"> <Info size={14} /> <span>Interactive Point #{selectedHotspot.id}</span>

</div>

</div>
 ) : (

<div

className="content-empty"> <Target

className="empty-icon" size={40} />

<p>Select a <strong>pulsing hotspot</strong> on the image to view detailed information about that section.
</p>

</div>
 )}

</div>

<div

className="image-container-inner">

<img src={imageSrc} alt="iCAD Window Structure"

className="base-image" />
 {HOTSPOTS.map((hotspot) => (

<div key={hotspot.id}

className={`hotspot-node ${activeId === hotspot.id ? 'active' : ''} ${selectedHotspot?.id === hotspot.id ? 'selected' : ''}`} style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }} onMouseEnter={() => setHoveredHotspotId(hotspot.id)} onMouseLeave={() => setHoveredHotspotId(null)}

onClick={() => setSelectedHotspot(hotspot)} >

<div

className="pulse-ring">
</div>

<div

className="hotspot-trigger">
</div>

<div

className="glass-tooltip"> <span

className="tooltip-id">{hotspot.id}</span> <span

className="tooltip-text">{hotspot.label}</span>

</div>

</div>
 ))}

</div>

</div>

</div>

</div>
 ); 
};

export default InteractiveImageMap; 