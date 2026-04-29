import React, { useState, useEffect } from 'react';
import { Target, Volume2, VolumeX } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';
import { KaraokeLessonText } from '../KaraokeLessonText';
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
  externalIndex?: number;
  externalCharIndex?: number;
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

const InteractiveImageMap: React.FC<InteractiveImageMapProps> = ({ 
    imageSrc, 
    nextLabel,
    externalIndex = -1,
    externalCharIndex = 0
}) => {
  const { speak, stop, isSpeaking: isInternalSpeaking, currentCharIndex: internalCharIndex } = useTTS();
  
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(() => {
    const saved = localStorage.getItem('interactive-map-selected');
    if (saved) {
      const id = parseInt(saved, 10);
      return HOTSPOTS.find(h => h.id === id) || null;
    }
    return null;
  });

  const isGlobalSpeaking = externalIndex >= 0;
  const isAnySpeaking = isInternalSpeaking || isGlobalSpeaking;
  const activeCharIndex = isInternalSpeaking ? internalCharIndex : externalCharIndex;

  // Auto-select based on external index (Global Narration)
  useEffect(() => {
    if (externalIndex >= 0 && externalIndex < HOTSPOTS.length) {
      setSelectedHotspot(HOTSPOTS[externalIndex]);
    }
  }, [externalIndex]);

  const [hoveredHotspotId, setHoveredHotspotId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedHotspot) {
      localStorage.setItem('interactive-map-selected', selectedHotspot.id.toString());
      /* Auto-speak only if NOT already being controlled by external index */
      if (!isGlobalSpeaking) {
        speak([`${selectedHotspot.label}: ${selectedHotspot.description}`]);
      }
    } else {
      localStorage.removeItem('interactive-map-selected');
      if (!isGlobalSpeaking) stop();
    }
  }, [selectedHotspot, speak, stop, isGlobalSpeaking]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (selectedHotspot?.id === hotspot.id) {
        setSelectedHotspot(null);
    } else {
        setSelectedHotspot(hotspot);
    }
  };

  const activeId = hoveredHotspotId || selectedHotspot?.id;

  return (
    <div className={`interactive-map-wrapper glass-panel ${isAnySpeaking ? 'is-speaking' : ''}`}>
      {/* Top Header/Description Area */}
      <div className="info-panel-top">
        {selectedHotspot ? (
          <div className="content-detail animate-in" key={selectedHotspot.id}>
            <div className="detail-header-row">
              <div className="item-badge">{selectedHotspot.id}</div>
              <h5>{selectedHotspot.label}</h5>
              <button 
                className={`tts-mini-toggle ${isAnySpeaking ? 'active' : ''}`}
                onClick={() => {
                    if (isInternalSpeaking) stop();
                    else speak([`${selectedHotspot.label}: ${selectedHotspot.description}`]);
                }}
              >
                {isAnySpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
            <KaraokeLessonText 
              text={selectedHotspot.description} 
              isActive={isAnySpeaking} 
              currentCharIndex={activeCharIndex - (selectedHotspot.label.length + 2)} 
              className="hotspot-description"
            />
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
          {HOTSPOTS.map((hotspot, index) => (
            <div 
              key={hotspot.id} 
              className={`hotspot-node ${activeId === hotspot.id ? "active" : ""} ${selectedHotspot?.id === hotspot.id ? "selected" : ""}`} 
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }} 
              onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
              onMouseLeave={() => setHoveredHotspotId(null)}
              onClick={() => handleHotspotClick(hotspot)}
              data-reading-index={index + 2}
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
