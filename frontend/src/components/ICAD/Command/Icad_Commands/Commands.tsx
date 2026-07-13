import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Layers, 
  Settings, 
  Layout, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  MousePointerClick, 
  RotateCcw, 
  Compass, 
  Maximize, 
  Type, 
  FileText, 
  HelpCircle, 
  Activity, 
  Move, 
  Copy, 
  Trash2, 
  Edit3, 
  Sliders, 
  CircleDot, 
  Scissors, 
  Scale, 
  RefreshCw, 
  Info,
  Maximize2,
  Minimize2,
  Check,
  Play
} from 'lucide-react';
import './Commands.css';

// ==========================================
// DATASET DEFINITIONS
// ==========================================

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  options?: string[];
  defaultValue?: any;
}

export interface WorkflowStep {
  id: string;
  title: string;
  fields: Field[];
}

export interface Command {
  name: string;
  steps: WorkflowStep[];
}

export interface Category {
  name: string;
  commands: Command[];
}

const CATEGORIES_DATA: Category[] = [
  {
    name: 'Linear',
    commands: [
      {
        name: 'Progressive',
        steps: [
          {
            id: 'progressive-settings',
            title: 'Progressive Settings',
            fields: [
              { name: 'pitch', label: 'Pitch / Offset Spacing (mm)', type: 'number', defaultValue: 10 },
              { name: 'direction', label: 'Direction', type: 'select', options: ['Horizontal Right', 'Horizontal Left', 'Vertical Up', 'Vertical Down'], defaultValue: 'Horizontal Right' },
              { name: 'basePoint', label: 'Base Reference Point', type: 'select', options: ['Origin (0,0,0)', 'Selected Endpoint', 'Midpoint', 'Centroid'], defaultValue: 'Origin (0,0,0)' }
            ]
          },
          {
            id: 'user-set-location',
            title: 'User Set Location',
            fields: [
              { name: 'xOffset', label: 'X Axis Offset', type: 'number', defaultValue: 0 },
              { name: 'yOffset', label: 'Y Axis Offset', type: 'number', defaultValue: 50 },
              { name: 'coordSystem', label: 'Coordinate System', type: 'radio', options: ['Absolute', 'Relative'], defaultValue: 'Absolute' }
            ]
          },
          {
            id: 'entity-direction',
            title: 'Entity Direction',
            fields: [
              { name: 'angle', label: 'Projection Angle (°)', type: 'number', defaultValue: 0 },
              { name: 'snapToEdge', label: 'Snap to Nearest Edge', type: 'checkbox', defaultValue: true },
              { name: 'refLine', label: 'Reference Line Alignment', type: 'select', options: ['X-Axis Parallel', 'Y-Axis Parallel', 'Perpendicular', 'Free Angled'], defaultValue: 'X-Axis Parallel' }
            ]
          },
          {
            id: 'create',
            title: 'Create & Preview',
            fields: [
              { name: 'previewColor', label: 'Dimension Preview Line Color', type: 'select', options: ['Blue', 'Red', 'Green', 'Magenta'], defaultValue: 'Blue' },
              { name: 'drawExtensionLines', label: 'Draw Extension Lines', type: 'checkbox', defaultValue: true },
              { name: 'precision', label: 'Decimal Precision', type: 'select', options: ['0', '0.0', '0.00', '0.000'], defaultValue: '0.00' }
            ]
          },
          {
            id: 'correct',
            title: 'Correction Controls',
            fields: [
              { name: 'tolerance', label: 'Tolerance Zone (mm)', type: 'number', defaultValue: 0.05 },
              { name: 'suffixText', label: 'Suffix Text (e.g. REF, MIN)', type: 'text', defaultValue: '' },
              { name: 'overrideScale', label: 'Override Dimension Scale', type: 'checkbox', defaultValue: false }
            ]
          }
        ]
      },
      {
        name: 'Horizontal',
        steps: [
          {
            id: 'start-point',
            title: 'First Reference Point',
            fields: [
              { name: 'snapType', label: 'Snap Intersection Mode', type: 'select', options: ['Endpoint', 'Midpoint', 'Center', 'Intersection'], defaultValue: 'Endpoint' },
              { name: 'pointX', label: 'X Coordinate (mm)', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'end-point',
            title: 'Second Reference Point',
            fields: [
              { name: 'pointEndX', label: 'X End Coordinate (mm)', type: 'number', defaultValue: 100 },
              { name: 'orthogonalLock', label: 'Lock Orthogonal Axis (Ortho)', type: 'checkbox', defaultValue: true }
            ]
          },
          {
            id: 'dim-location',
            title: 'Dimension Placement',
            fields: [
              { name: 'offsetDistance', label: 'Offset Distance from Axis', type: 'number', defaultValue: 30 },
              { name: 'textPosition', label: 'Text Position Alignment', type: 'select', options: ['Centered Above', 'Centered Inside', 'Underneath'], defaultValue: 'Centered Above' }
            ]
          }
        ]
      },
      {
        name: 'Vertical',
        steps: [
          {
            id: 'v-start-point',
            title: 'Start Reference Endpoint',
            fields: [
              { name: 'pointY1', label: 'Y Start Coordinate (mm)', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'v-end-point',
            title: 'End Reference Endpoint',
            fields: [
              { name: 'pointY2', label: 'Y End Coordinate (mm)', type: 'number', defaultValue: 80 }
            ]
          },
          {
            id: 'v-dim-location',
            title: 'Dimension Offset',
            fields: [
              { name: 'offsetDistanceY', label: 'Offset Distance', type: 'number', defaultValue: 40 }
            ]
          }
        ]
      },
      {
        name: 'Aligned',
        steps: [
          {
            id: 'select-entity',
            title: 'Select Target Entity',
            fields: [
              { name: 'entityType', label: 'Select Entity Type', type: 'select', options: ['Linear Edge', 'Arc Chord', 'Spline Segment'], defaultValue: 'Linear Edge' }
            ]
          },
          {
            id: 'aligned-offset',
            title: 'Parallel Offset Alignment',
            fields: [
              { name: 'offsetDistanceAligned', label: 'Offset Clearance (mm)', type: 'number', defaultValue: 25 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Angular',
    commands: [
      {
        name: '2 Point',
        steps: [
          {
            id: 'vertex-select',
            title: 'Vertex Corner Reference',
            fields: [
              { name: 'snapToVertex', label: 'Snap Vertex to Corner', type: 'checkbox', defaultValue: true }
            ]
          },
          {
            id: 'ray1-define',
            title: 'Define Base Axis Ray',
            fields: [
              { name: 'ray1Angle', label: 'Ray 1 Reference Angle (°)', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'ray2-define',
            title: 'Define Angular Deviation Ray',
            fields: [
              { name: 'ray2Angle', label: 'Ray 2 Angle Value (°)', type: 'number', defaultValue: 45 }
            ]
          },
          {
            id: 'arc-position',
            title: 'Arc Dimension Position',
            fields: [
              { name: 'arcRadius', label: 'Dimension Arc Placement Radius', type: 'number', defaultValue: 50 }
            ]
          }
        ]
      },
      {
        name: '3 Point',
        steps: [
          {
            id: 'point-vertex',
            title: 'Select Corner Vertex Point',
            fields: [
              { name: 'ptX', label: 'Vertex X', type: 'number', defaultValue: 0 },
              { name: 'ptY', label: 'Vertex Y', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'point-start',
            title: 'First Outer Direction Point',
            fields: [
              { name: 'startX', label: 'Ray 1 Target X', type: 'number', defaultValue: 50 },
              { name: 'startY', label: 'Ray 1 Target Y', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'point-end',
            title: 'Second Outer Direction Point',
            fields: [
              { name: 'endX', label: 'Ray 2 Target X', type: 'number', defaultValue: 30 },
              { name: 'endY', label: 'Ray 2 Target Y', type: 'number', defaultValue: 40 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Circular',
    commands: [
      {
        name: 'Radius',
        steps: [
          {
            id: 'select-circle',
            title: 'Select Circle or Arc Boundary',
            fields: [
              { name: 'entitySelection', label: 'Select Entity', type: 'select', options: ['Inner Circle', 'Outer Fillet', 'Cylindrical Hole'], defaultValue: 'Inner Circle' }
            ]
          },
          {
            id: 'set-leader-style',
            title: 'Leader Line Style',
            fields: [
              { name: 'leaderStyle', label: 'Leader Connection', type: 'select', options: ['Radial Arrow', 'External Extension', 'Dim Line Only'], defaultValue: 'Radial Arrow' },
              { name: 'prefixText', label: 'Prefix Notation (e.g. R)', type: 'text', defaultValue: 'R' }
            ]
          },
          {
            id: 'radius-placement',
            title: 'Offset & Placement Angle',
            fields: [
              { name: 'placementAngle', label: 'Radial Exit Angle (°)', type: 'number', defaultValue: 45 }
            ]
          }
        ]
      },
      {
        name: 'Diameter',
        steps: [
          {
            id: 'select-dia-entity',
            title: 'Select Circular Entity',
            fields: [
              { name: 'diaSelection', label: 'Target Boundary', type: 'select', options: ['Hole Edge', 'Shaft Profile', 'Bored Diameter'], defaultValue: 'Hole Edge' }
            ]
          },
          {
            id: 'dia-leader-style',
            title: 'Diameter Symbol Configurations',
            fields: [
              { name: 'diaSymbol', label: 'Diameter Symbol Prefix', type: 'select', options: ['Ø Symbol', 'D Label', 'None'], defaultValue: 'Ø Symbol' },
              { name: 'textInside', label: 'Force Text Inside Circle', type: 'checkbox', defaultValue: false }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Dimensions',
    commands: [
      {
        name: 'Baseline',
        steps: [
          {
            id: 'select-base-dim',
            title: 'Select Base Reference Dimension',
            fields: [
              { name: 'baseDimId', label: 'Base Dimension Entity ID', type: 'text', defaultValue: 'DIM_001' }
            ]
          },
          {
            id: 'baseline-spacing',
            title: 'Baseline Offset Spacing',
            fields: [
              { name: 'spacing', label: 'Spacing Clearance between Lines (mm)', type: 'number', defaultValue: 8 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Chamfer',
    commands: [
      {
        name: 'Distance-Distance',
        steps: [
          {
            id: 'chamfer-dist1',
            title: 'Set First Leg Chamfer Distance',
            fields: [
              { name: 'dist1', label: 'Distance 1 (mm)', type: 'number', defaultValue: 5 }
            ]
          },
          {
            id: 'chamfer-dist2',
            title: 'Set Second Leg Chamfer Distance',
            fields: [
              { name: 'dist2', label: 'Distance 2 (mm)', type: 'number', defaultValue: 5 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Edit',
    commands: [
      {
        name: 'Fillet',
        steps: [
          {
            id: 'fillet-radius',
            title: 'Set Fillet Corner Radius',
            fields: [
              { name: 'radius', label: 'Fillet Radius (mm)', type: 'number', defaultValue: 10 }
            ]
          },
          {
            id: 'fillet-trim-mode',
            title: 'Corner Trim Mode',
            fields: [
              { name: 'trimMode', label: 'Auto Trim Corner Extensions', type: 'checkbox', defaultValue: true }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Align',
    commands: [
      {
        name: 'Points Match',
        steps: [
          {
            id: 'align-src1',
            title: 'Select First Source Reference Point',
            fields: [
              { name: 'srcX1', label: 'Source X1', type: 'number', defaultValue: 0 },
              { name: 'srcY1', label: 'Source Y1', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'align-dest1',
            title: 'Select First Target Destination Point',
            fields: [
              { name: 'destX1', label: 'Destination X1', type: 'number', defaultValue: 100 },
              { name: 'destY1', label: 'Destination Y1', type: 'number', defaultValue: 100 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Text',
    commands: [
      {
        name: 'Single Line',
        steps: [
          {
            id: 'text-location',
            title: 'Set Text Placement Anchor',
            fields: [
              { name: 'textX', label: 'Placement X (mm)', type: 'number', defaultValue: 0 },
              { name: 'textY', label: 'Placement Y (mm)', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'text-properties',
            title: 'Text Dimensions & Rotation',
            fields: [
              { name: 'textHeight', label: 'Character Text Height (mm)', type: 'number', defaultValue: 3.5 },
              { name: 'textAngle', label: 'Text Rotation Angle (°)', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'text-value',
            title: 'Enter Text Content',
            fields: [
              { name: 'textContent', label: 'Text String', type: 'text', placeholder: 'Enter single-line text label...' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Note',
    commands: [
      {
        name: 'Leader Note',
        steps: [
          {
            id: 'note-anchor',
            title: 'Attach Leader Point',
            fields: [
              { name: 'noteAnchorX', label: 'Attach X', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'note-content',
            title: 'Enter Custom Text Annotation',
            fields: [
              { name: 'noteText', label: 'Note Content', type: 'text', placeholder: 'Enter annotation description...' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Balloon',
    commands: [
      {
        name: 'Standard Balloon',
        steps: [
          {
            id: 'balloon-item',
            title: 'Select Component Reference',
            fields: [
              { name: 'itemNum', label: 'Item BOM Number', type: 'number', defaultValue: 1 },
              { name: 'itemQty', label: 'Item Quantity', type: 'number', defaultValue: 1 }
            ]
          },
          {
            id: 'balloon-style',
            title: 'Balloon Enclosure Options',
            fields: [
              { name: 'balloonShape', label: 'Balloon Shape Enclosure', type: 'select', options: ['Circle', 'Hexagon', 'Square', 'Divided Circle'], defaultValue: 'Circle' },
              { name: 'balloonDiameter', label: 'Balloon Frame Size (mm)', type: 'number', defaultValue: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Weld',
    commands: [
      {
        name: 'Fillet Weld',
        steps: [
          {
            id: 'weld-dimension',
            title: 'Fillet Weld Dimension Specs',
            fields: [
              { name: 'weldSize', label: 'Weld Leg Length "a" (mm)', type: 'number', defaultValue: 6 },
              { name: 'weldLength', label: 'Length of Intermittent Weld (mm)', type: 'number', defaultValue: 50 }
            ]
          },
          {
            id: 'weld-symbols',
            title: 'Weld Symbol Layout',
            fields: [
              { name: 'contour', label: 'Weld Contour Type', type: 'select', options: ['Flat (Flush)', 'Convex', 'Concave'], defaultValue: 'Flat (Flush)' },
              { name: 'peripheral', label: 'All-Around Weld Path', type: 'checkbox', defaultValue: false }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Tolerance',
    commands: [
      {
        name: 'Geometric Tolerance',
        steps: [
          {
            id: 'g-tol-symbol',
            title: 'Select GD&T Feature Symbol',
            fields: [
              { name: 'gSymbol', label: 'GD&T Characteristic Symbol', type: 'select', options: ['Flatness (▱)', 'Straightness (⎯)', 'Cylindricity (⌰)', 'Position (target)', 'Concentricity (◎)'], defaultValue: 'Flatness (▱)' }
            ]
          },
          {
            id: 'g-tol-value',
            title: 'Tolerance Zone & Boundary Conditions',
            fields: [
              { name: 'tolValue', label: 'Tolerance Zone Value (mm)', type: 'number', defaultValue: 0.02 },
              { name: 'mCondition', label: 'Material Condition State Modifier', type: 'select', options: ['MMC (Ⓜ)', 'LMC (Ⓛ)', 'RFS (None)'], defaultValue: 'RFS (None)' }
            ]
          },
          {
            id: 'g-tol-datums',
            title: 'Datum Feature References',
            fields: [
              { name: 'datumA', label: 'Primary Datum (A)', type: 'text', defaultValue: 'A' },
              { name: 'datumB', label: 'Secondary Datum (B)', type: 'text', defaultValue: '' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Texture',
    commands: [
      {
        name: 'Surface Texture',
        steps: [
          {
            id: 'texture-roughness',
            title: 'Roughness Height Specification',
            fields: [
              { name: 'raMax', label: 'Max Roughness Value Ra (µm)', type: 'number', defaultValue: 3.2 },
              { name: 'raMin', label: 'Min Roughness Value Ra (µm)', type: 'number', defaultValue: 0.8 }
            ]
          },
          {
            id: 'texture-direction',
            title: 'Surface Lay Pattern Direction',
            fields: [
              { name: 'layDir', label: 'Lay Direction Symbol Pattern', type: 'select', options: ['Parallel (🟰)', 'Perpendicular (⟂)', 'Crossed (✖)', 'Multidirectional (M)'], defaultValue: 'Parallel (🟰)' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Symbols',
    commands: [
      {
        name: 'Datum Feature',
        steps: [
          {
            id: 'datum-id',
            title: 'Datum Reference Designation',
            fields: [
              { name: 'datumLabel', label: 'Datum Feature Label (Letter)', type: 'text', defaultValue: 'A' }
            ]
          },
          {
            id: 'datum-style',
            title: 'Datum Base Triangle Attachment',
            fields: [
              { name: 'triangleFilled', label: 'Filled Anchor Triangle', type: 'checkbox', defaultValue: true }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Hatch',
    commands: [
      {
        name: 'Boundary Hatch',
        steps: [
          {
            id: 'hatch-pattern',
            title: 'Select Infill Pattern Layout',
            fields: [
              { name: 'patternName', label: 'Pattern Name', type: 'select', options: ['ANSI31 (Cast Iron)', 'ANSI32 (Steel)', 'SOLID Infill', 'GRATE pattern'], defaultValue: 'ANSI31 (Cast Iron)' }
            ]
          },
          {
            id: 'hatch-scale',
            title: 'Hatch Angle & Scale Density',
            fields: [
              { name: 'hatchScale', label: 'Density Infill Scale Ratio', type: 'number', defaultValue: 1.0 },
              { name: 'hatchAngle', label: 'Infill Pattern Angle (°)', type: 'number', defaultValue: 45 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Correct',
    commands: [
      {
        name: 'Modify Text',
        steps: [
          {
            id: 'correct-select',
            title: 'Select Existing Dimension Text',
            fields: [
              { name: 'entityId', label: 'Entity Key ID', type: 'text', defaultValue: 'DIM_001' }
            ]
          },
          {
            id: 'correct-value',
            title: 'Dimension Text Override',
            fields: [
              { name: 'overrideText', label: 'Custom Value Override Text', type: 'text', placeholder: 'Enter override text (e.g. 50.0)' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Auto Balloon',
    commands: [
      {
        name: 'Generate BOM Balloons',
        steps: [
          {
            id: 'ab-bom-ref',
            title: 'Select Target BOM Table',
            fields: [
              { name: 'bomId', label: 'BOM Key Reference ID', type: 'text', defaultValue: 'BOM_TABLE_01' }
            ]
          },
          {
            id: 'ab-alignment',
            title: 'Auto Alignment Orientation',
            fields: [
              { name: 'alignmentType', label: 'Alignment Guideline Shape', type: 'select', options: ['Horizontal Row', 'Vertical Column', 'Circular Outline'], defaultValue: 'Horizontal Row' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Move',
    commands: [
      {
        name: 'Translate',
        steps: [
          {
            id: 'move-base',
            title: 'Select Shift Reference Base Point',
            fields: [
              { name: 'basePtX', label: 'Base Reference X', type: 'number', defaultValue: 0 },
              { name: 'basePtY', label: 'Base Reference Y', type: 'number', defaultValue: 0 }
            ]
          },
          {
            id: 'move-offset',
            title: 'Define Translation Offset Vectors',
            fields: [
              { name: 'dx', label: 'Delta Distance X (mm)', type: 'number', defaultValue: 50 },
              { name: 'dy', label: 'Delta Distance Y (mm)', type: 'number', defaultValue: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Copy',
    commands: [
      {
        name: 'Linear Pattern',
        steps: [
          {
            id: 'pattern-counts',
            title: 'Pattern Count Specifications',
            fields: [
              { name: 'rowCount', label: 'Number of Rows', type: 'number', defaultValue: 1 },
              { name: 'colCount', label: 'Number of Columns', type: 'number', defaultValue: 5 }
            ]
          },
          {
            id: 'pattern-gaps',
            title: 'Clearance Offset Spacing',
            fields: [
              { name: 'rowSpacing', label: 'Row Clearance Gap (mm)', type: 'number', defaultValue: 20 },
              { name: 'colSpacing', label: 'Column Clearance Gap (mm)', type: 'number', defaultValue: 20 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Properties',
    commands: [
      {
        name: 'Match Properties',
        steps: [
          {
            id: 'match-src',
            title: 'Select Attributes Origin Entity',
            fields: [
              { name: 'srcEntityId', label: 'Source Entity ID', type: 'text', defaultValue: 'ENTITY_01' }
            ]
          },
          {
            id: 'match-filters',
            title: 'Properties Match Filter Flags',
            fields: [
              { name: 'matchColor', label: 'Color Matches', type: 'checkbox', defaultValue: true },
              { name: 'matchLayer', label: 'Layer Assignment Matches', type: 'checkbox', defaultValue: true },
              { name: 'matchLineType', label: 'Line Type Matches', type: 'checkbox', defaultValue: true }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Delete',
    commands: [
      {
        name: 'Erase Entity',
        steps: [
          {
            id: 'delete-selection',
            title: 'Select Viewport Elements to Erase',
            fields: [
              { name: 'selectionMethod', label: 'Entity Selection Mode', type: 'select', options: ['Pick Individual', 'Crossing Window', 'Fence Selector'], defaultValue: 'Crossing Window' }
            ]
          },
          {
            id: 'delete-confirm',
            title: 'Erase Confirmation Warning',
            fields: [
              { name: 'confirmErase', label: 'Confirm Permanent Erase Action', type: 'checkbox', defaultValue: false }
            ]
          }
        ]
      }
    ]
  }
];

// ==========================================
// SUB-COMPONENTS
// ==========================================

// 1. Toolbar component (3x3 grid)
interface ToolbarProps {
  activeTool: number;
  setActiveTool: (id: number) => void;
}

const TOOLBAR_ITEMS = [
  { id: 1, label: 'Select', icon: MousePointerClick },
  { id: 2, label: 'Snap', icon: Compass },
  { id: 3, label: 'Extend', icon: Maximize2 },
  { id: 4, label: 'Properties', icon: Sliders },
  { id: 5, label: 'Layers', icon: Layers },
  { id: 6, label: 'Measure', icon: Scale },
  { id: 7, label: 'Undo', icon: RotateCcw },
  { id: 8, label: 'Clean', icon: RefreshCw },
  { id: 9, label: 'Help', icon: HelpCircle },
];

export const Toolbar: React.FC<ToolbarProps> = ({ activeTool, setActiveTool }) => {
  return (
    <div className="cad-toolbar-grid">
      {TOOLBAR_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`cad-tool-btn ${activeTool === item.id ? 'active' : ''}`}
            onClick={() => setActiveTool(item.id)}
            title={item.label}
          >
            <Icon size={18} className="cad-tool-icon" />
            <span className="cad-tool-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// 2. CategoryMenu component
interface CategoryMenuProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (name: string) => void;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="cad-category-list">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className={`cad-category-item ${activeCategory === cat.name ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat.name)}
        >
          <span>{cat.name}</span>
          <ChevronRight size={14} style={{ opacity: activeCategory === cat.name ? 1 : 0.4 }} />
        </div>
      ))}
    </div>
  );
};

// 3. CommandDropdown component (Custom drop down)
interface CommandDropdownProps {
  commands: Command[];
  selectedCommand: Command | null;
  onSelectCommand: (cmd: Command) => void;
}

export const CommandDropdown: React.FC<CommandDropdownProps> = ({
  commands,
  selectedCommand,
  onSelectCommand,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [commands]);

  return (
    <div className="cad-dropdown-container">
      <button 
        className="cad-dropdown-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedCommand ? selectedCommand.name : 'Select Command'}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="cad-dropdown-menu" role="listbox">
          {commands.map((cmd) => (
            <div
              key={cmd.name}
              role="option"
              aria-selected={selectedCommand?.name === cmd.name}
              className={`cad-dropdown-option ${selectedCommand?.name === cmd.name ? 'selected' : ''}`}
              onClick={() => {
                onSelectCommand(cmd);
                setIsOpen(false);
              }}
            >
              {cmd.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. PropertyPanel component
interface PropertyPanelProps {
  step: WorkflowStep;
  stepIndex: number;
  totalSteps: number;
  formValues: Record<string, any>;
  updateFormValue: (field: string, val: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  step,
  stepIndex,
  totalSteps,
  formValues,
  updateFormValue,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  return (
    <div className="cad-property-panel">
      <div className="cad-panel-header">
        <span>{step.title}</span>
        <span className="cad-panel-step">Step {stepIndex + 1} of {totalSteps}</span>
      </div>
      <div className="cad-panel-body">
        {step.fields.map((field) => (
          <div className="cad-panel-row" key={field.name}>
            <label className="cad-label" htmlFor={field.name}>{field.label}</label>
            
            {field.type === 'number' && (
              <input
                id={field.name}
                type="number"
                className="cad-input"
                value={formValues[field.name] !== undefined ? formValues[field.name] : field.defaultValue}
                onChange={(e) => updateFormValue(field.name, parseFloat(e.target.value))}
              />
            )}

            {field.type === 'text' && (
              <input
                id={field.name}
                type="text"
                className="cad-input"
                placeholder={field.placeholder || ''}
                value={formValues[field.name] !== undefined ? formValues[field.name] : (field.defaultValue || '')}
                onChange={(e) => updateFormValue(field.name, e.target.value)}
              />
            )}

            {field.type === 'select' && (
              <select
                id={field.name}
                className="cad-select"
                value={formValues[field.name] !== undefined ? formValues[field.name] : field.defaultValue}
                onChange={(e) => updateFormValue(field.name, e.target.value)}
              >
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === 'checkbox' && (
              <div className="cad-checkbox-group">
                <input
                  id={field.name}
                  type="checkbox"
                  className="cad-checkbox"
                  checked={formValues[field.name] !== undefined ? !!formValues[field.name] : !!field.defaultValue}
                  onChange={(e) => updateFormValue(field.name, e.target.checked)}
                />
              </div>
            )}

            {field.type === 'radio' && (
              <div className="cad-radio-group">
                {field.options?.map((opt) => (
                  <label key={opt} className="cad-radio-label">
                    <input
                      type="radio"
                      name={field.name}
                      value={opt}
                      checked={(formValues[field.name] !== undefined ? formValues[field.name] : field.defaultValue) === opt}
                      onChange={(e) => updateFormValue(field.name, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="cad-panel-actions">
          {!isFirst && (
            <button className="cad-btn cad-btn-secondary" onClick={onPrev}>
              Back
            </button>
          )}
          <button className="cad-btn cad-btn-primary" onClick={onNext}>
            {isLast ? 'Finish' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. WorkflowCanvas component
interface WorkflowCanvasProps {
  command: Command;
  formValues: Record<string, any>;
  updateFormValue: (field: string, val: any) => void;
  currentStepIndex: number;
  setCurrentStepIndex: (idx: number) => void;
  isFinished: boolean;
  setIsFinished: (val: boolean) => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  command,
  formValues,
  updateFormValue,
  currentStepIndex,
  setCurrentStepIndex,
  isFinished,
  setIsFinished,
}) => {
  const steps = command.steps;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  if (isFinished) {
    return (
      <div className="cad-workflow-canvas">
        <div className="cad-finish-panel animate-fade-in">
          <CheckCircle2 size={48} className="cad-finish-icon" />
          <h3 className="cad-finish-title">Command Execution Successful</h3>
          <p className="cad-finish-text">
            The command <strong>{command.name}</strong> was created successfully in the viewport with the specified configurations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="cad-btn cad-btn-primary" onClick={() => setIsFinished(false)}>
              Adjust Settings
            </button>
            <button 
              className="cad-btn cad-btn-secondary" 
              onClick={() => {
                setIsFinished(false);
                setCurrentStepIndex(0);
              }}
            >
              Restart Workflow
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cad-workflow-canvas">
      {/* Map through all completed/active steps to represent standard CAD progressive workflow */}
      {steps.slice(0, currentStepIndex + 1).map((step, idx) => {
        const isCurrent = idx === currentStepIndex;
        return (
          <React.Fragment key={step.id}>
            <PropertyPanel
              step={step}
              stepIndex={idx}
              totalSteps={steps.length}
              formValues={formValues}
              updateFormValue={updateFormValue}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={idx === 0}
              isLast={idx === steps.length - 1}
            />
            {/* Draw connecting arrows between panels */}
            {idx < currentStepIndex && (
              <div className="cad-workflow-arrow">
                <ChevronDown size={20} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ==========================================
// MAIN WORKSPACE SUITE
// ==========================================

function Commands() {
  const [activeTool, setActiveTool] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>('Linear');
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  
  // Workflow Step Management
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  // Reset and load command whenever activeCategory changes
  const activeCategoryData = CATEGORIES_DATA.find((c) => c.name === activeCategory);
  
  useEffect(() => {
    if (activeCategoryData && activeCategoryData.commands.length > 0) {
      const initialCmd = activeCategoryData.commands[0];
      setSelectedCommand(initialCmd);
      setCurrentStepIndex(0);
      setIsFinished(false);
      
      // Seed default field values
      const defaults: Record<string, any> = {};
      initialCmd.steps.forEach((step) => {
        step.fields.forEach((field) => {
          defaults[field.name] = field.defaultValue;
        });
      });
      setFormValues(defaults);
    } else {
      setSelectedCommand(null);
    }
  }, [activeCategory]);

  // Update default form values on command select change
  const handleSelectCommand = (cmd: Command) => {
    setSelectedCommand(cmd);
    setCurrentStepIndex(0);
    setIsFinished(false);
    
    const defaults: Record<string, any> = {};
    cmd.steps.forEach((step) => {
      step.fields.forEach((field) => {
        defaults[field.name] = field.defaultValue;
      });
    });
    setFormValues(defaults);
  };

  const handleUpdateFormValue = (name: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="cad-container">
      {/* 1. LEFT PANEL: Drafting Toolbar & Categories list */}
      <div className="cad-left-panel">
        <div className="cad-header-title">
          <Settings size={16} />
          DRAFTING
        </div>
        <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
        <CategoryMenu
          categories={CATEGORIES_DATA}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* 2. CENTER PANEL: Selected Command & progressive property panels */}
      <div className="cad-center-workspace">
        <div className="cad-workspace-header">
          <h2 className="cad-category-title">{activeCategory} commands</h2>
          
          {activeCategoryData && activeCategoryData.commands.length > 0 && (
            <CommandDropdown
              commands={activeCategoryData.commands}
              selectedCommand={selectedCommand}
              onSelectCommand={handleSelectCommand}
            />
          )}
        </div>

        {selectedCommand ? (
          <WorkflowCanvas
            command={selectedCommand}
            formValues={formValues}
            updateFormValue={handleUpdateFormValue}
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
            isFinished={isFinished}
            setIsFinished={setIsFinished}
          />
        ) : (
          <div className="cad-empty-workspace">
            <Info size={40} className="cad-empty-icon" />
            <h3 className="cad-empty-title">Select a Category</h3>
            <p className="cad-empty-desc">
              Choose an option from the drafting menu on the left side to load standard engineering layouts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Commands;
