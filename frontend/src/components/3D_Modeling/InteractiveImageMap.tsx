import React, { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import "../../styles/3D_Modeling/InteractiveImageMap.css";

interface Hotspot {
  id: number;
  label: string;
  description: string;
  x: number; /* percentage */
  y: number; /* percentage */
}

interface InteractiveImageMapProps {
  nextLabel?: string;
  imageSrc: string;
}

const HOTSPOTS: Hotspot[] = [
  { id: 1, label: 'Title bar', description: 'Displays the name of the program and typically the name of the currently active document.', x: 12.9, y: 3.8},
  { id: 2, label: 'Menu bar', description: 'Contains drop down menus such as File, View, Information, Set, Tool, Window and Help.', x: 2.5, y: 19.2 },
  { id: 3, label: 'Command Menu', description: 'Contains sets of available commands associated with different functions. Preferably use on 2D.', x: 2.55, y: 38.1 },
  { id: 4, label: 'Tree view', description: 'Displays the 3D parts and groups for the drawing currently being worked on.', x: 2.5, y: 71.7 },
  { id: 5, label: 'Workspace', description: 'Area where 3D Modeling and Assembly operations are done.', x: 55.10, y: 96 },
  { id: 6, label: 'Icon Menu', description: 'Contains commands to perform operations on 3D Modeling. Other options can be found on the command menu.', x: 97.45, y: 38.1 },
  { id: 7, label: 'Item Entry', description: 'Used for entering the values and characters necessary for command execution.', x: 22.4, y: 95.9 },
  { id: 8, label: 'Key Entry', description: 'Coordinates and other values can be entered from the Key Entry Area.', x: 67.9, y: 95.9 },
  { id: 9, label: 'Tool Bar', description: 'Contains set of tool bars that can be display or hide. These tool bars are the following.', x: 47.63, y: 3.8 },
  { id: 10, label: 'Message Pane', description: 'Displays messages related to operations. Messages displayed in red are error messages.', x: 41.55, y: 95.9 },
];

const InteractiveImageMap: React.FC<InteractiveImageMapProps> = ({ imageSrc, nextLabel }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(() => {
    const saved = localStorage.getItem('interactive-map-selected');
    if (saved) {
      const id = parseInt(saved, 10);
      return HOTSPOTS.find(h => h.id === id) || null;
    }
    return null;
  });
  const [hoveredHotspotId, setHoveredHotspotId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedHotspot) {
      localStorage.setItem('interactive-map-selected', selectedHotspot.id.toString());
    } else {
      localStorage.removeItem('interactive-map-selected');
    }
  }, [selectedHotspot]);

  const activeId = hoveredHotspotId || selectedHotspot?.id;

  return (
    <div className="interactive-map-wrapper glass-panel">
      {/* Top Header/Description Area */}
      <div className="info-panel-top">
        {selectedHotspot ? (
          <div className="content-detail animate-in" key={selectedHotspot.id}>
            <div className="detail-header-row">
              <div className="item-badge">{selectedHotspot.id}</div>
              <h5>{selectedHotspot.label}</h5>
            </div>
            <p>{selectedHotspot.description}</p>
          </div>
        ) : (
          <div className="content-empty animate-fade-in">
            <Target className="pulse-icon" size={32} />
            <p>Select an <strong>interface element</strong> from the diagram or grid below.</p>
          </div>
        )}
      </div>

      {/* Center Image Area */}
      <div className="image-stage">
        <div className="image-container-inner">
          <img src={imageSrc} alt="iCAD Window Structure" className="base-image" />
          {HOTSPOTS.map((hotspot) => (
            <div 
              key={hotspot.id} 
              className={`hotspot-node ${activeId === hotspot.id ? "active" : ""} ${selectedHotspot?.id === hotspot.id ? "selected" : ""}`} 
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }} 
              onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
              onMouseLeave={() => setHoveredHotspotId(null)}
              onClick={() => setSelectedHotspot(hotspot)}
            >
              <div className="pulse-ring"></div>
              <div className="hotspot-trigger"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveImageMap;
