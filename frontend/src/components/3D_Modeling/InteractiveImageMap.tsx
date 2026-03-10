/**
 * InteractiveImageMap.tsx  —  Reusable hotspot image component
 *
 * Renders a base image with interactive clickable hotspot regions.
 * Clicking a hotspot reveals an info panel with a title and description.
 *
 * Props:
 *   imageSrc  — the base image to display (import from assets)
 *
 * Hotspot data is defined statically inside this file as HOTSPOTS[].
 * To add a new hotspot: append an entry to HOTSPOTS with id, title,
 * description, and position (top/left as % of image dimensions).
 *
 * Used by: 3DiCadInterface.tsx
 */
/* cspell:disable-file */
import React, { useState } from 'react';
import { Info, Target, ChevronRight, Layout, List } from 'lucide-react';
import '../../styles/3D_Modeling/InteractiveImageMap.css';

interface Hotspot {
  id: number;
  label: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

interface InteractiveImageMapProps {
  imageSrc: string;
}

const HOTSPOTS: Hotspot[] = [
  { id: 1, label: 'Title bar', description: 'Displays the name of the program and typically the name of the currently active document.', x: 13.1, y: 13.8 },
  { id: 2, label: 'Menu bar', description: 'Contains drop down menus such as File, View, Information, Set, Tool, Window and Help.', x: 9.4, y: 16.9 },
  { id: 3, label: 'Command Menu', description: 'Contains sets of available commands associated with different functions. Preferably use on 2D.', x: 9.6, y: 48.9 },
  { id: 4, label: 'Tree view', description: 'Displays the 3D parts and groups for the drawing currently being worked on.', x: 15.0, y: 66.1 },
  { id: 5, label: 'Workspace', description: 'Area where 3D Modeling and Assembly operations are done.', x: 58.9, y: 73.5 },
  { id: 6, label: 'Icon Menu', description: 'Contains commands to perform operations on 3D Modeling. Other options can be found on the command menu.', x: 89.5, y: 51.3 },
  { id: 7, label: 'Item Entry', description: 'Used for entering the values and characters necessary for command execution.', x: 27.4, y: 83.3 },
  { id: 8, label: 'Key Entry', description: 'Coordinates and other values can be entered from the Key Entry Area.', x: 58.9, y: 73.6 },
  { id: 9, label: 'Tool Bar', description: 'Contains set of tool bars that can be display or hide. These tool bars are the following.', x: 49.7, y: 13.8 },
  { id: 10, label: 'Message Pane', description: 'Displays messages related to operations. Messages displayed in red are error messages.', x: 42.4, y: 84.6 },
];

const InteractiveImageMap: React.FC<InteractiveImageMapProps> = ({ imageSrc }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<number | null>(null);

  const activeId = hoveredHotspotId || selectedHotspot?.id;

  return (
    <div className="interactive-map-wrapper">
      <div className="interactive-map-main">
        {/* Info Panel Section */}
        <div className="info-panel">
          <div className="info-panel-header">
            <div className="header-icon">
              <Layout size={20} />
            </div>
            <div className="header-text">
              <h4>Interface Explorer</h4>
              <p>Explore the iCAD Window Layout</p>
            </div>
          </div>



          <div className="info-list-container">
            <div className="list-label">
              <List size={14} />
              <span>Full Component List</span>
            </div>
            <div className="info-list-scroll">
              {HOTSPOTS.map((h) => (
                <div
                  key={h.id}
                  className={`info-list-item ${activeId === h.id ? 'active' : ''} ${selectedHotspot?.id === h.id ? 'selected' : ''}`}
                  onMouseEnter={() => setHoveredHotspotId(h.id)}
                  onMouseLeave={() => setHoveredHotspotId(null)}
                  onClick={() => setSelectedHotspot(h)}
                >
                  <span className="item-badge">{h.id}</span>
                  <div className="item-info">
                    <span className="item-title">{h.label}</span>
                  </div>
                  <ChevronRight className="item-arrow" size={14} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="image-stage">
          <div className="info-panel-content image-caption-top">
            {selectedHotspot ? (
              <div className="content-detail animate-in">
                <h1>{selectedHotspot.label}</h1>
                <p>{selectedHotspot.description}</p>
                <div className="detail-meta">
                  <Info size={14} />
                  <span>Interactive Point #{selectedHotspot.id}</span>
                </div>
              </div>
            ) : (
              <div className="content-empty">
                <Target className="empty-icon" size={40} />
                <p>Select a <strong>pulsing hotspot</strong> on the image to view detailed information about that section.</p>
              </div>
            )}
          </div>

          <div className="image-container-inner">
            <img src={imageSrc} alt="iCAD Window Structure" className="base-image" />

            {HOTSPOTS.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`hotspot-node ${activeId === hotspot.id ? 'active' : ''} ${selectedHotspot?.id === hotspot.id ? 'selected' : ''}`}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
                onMouseLeave={() => setHoveredHotspotId(null)}
                onClick={() => setSelectedHotspot(hotspot)}
              >
                <div className="pulse-ring"></div>
                <div className="hotspot-trigger"></div>

                <div className="glass-tooltip">
                  <span className="tooltip-id">{hotspot.id}</span>
                  <span className="tooltip-text">{hotspot.label}</span>
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
