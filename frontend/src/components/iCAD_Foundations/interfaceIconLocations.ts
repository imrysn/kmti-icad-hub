import type { CSSProperties } from 'react';

type Region = readonly [x: number, y: number, width: number, height: number];

// Measured against the supplied 1920 × 1080 icadinterface.jpg.
const screenRegions: readonly Region[] = [
  [0, 0, 1920, 24], // Title Bar
  [0, 24, 460, 18], // Menu Bar
  [0, 422, 132, 438], // Command Menu
  [135, 134, 240, 890], // Tree View
  [383, 164, 1358, 855], // Workspace
  [1748, 135, 171, 889], // Icon Menu
  [135, 1026, 1608, 31], // Item Entry (empty until a command is active)
  [1751, 1029, 163, 25], // Key Entry
  [136, 41, 1197, 90], // Toolbar
  [137, 1061, 984, 18], // Message Pane
];

const toolbarRegions: readonly Region[] = [
  [229, 42, 111, 30], // File
  [136, 42, 92, 30], // 2D View
  [342, 42, 56, 30], // Switch Display
  [647, 42, 160, 30], // Screen Operations
  [814, 42, 199, 30], // 3D View
  [542, 42, 99, 30], // User View
  [476, 42, 60, 30], // Edit (Undo, Redo)
  [1021, 42, 132, 30], // Shading
  [404, 42, 64, 30], // Section Display
  [136, 73, 91, 29], // 2D Standard Screen
  [136, 105, 748, 23], // System Information (line type, color, layer… bar)
  [1159, 42, 172, 30], // Screen Memory
  [233, 73, 485, 29], // Entry Control
];

// Land on the visible controls at the top of panels, rather than their empty space.
const screenIconLandings: Partial<Record<number, Region>> = {
  0: [0, 0, 430, 24],
  2: [3, 423, 125, 216],
  3: [138, 136, 235, 94],
  5: [1750, 136, 167, 493],
  6: [135, 1026, 310, 31],
  9: [137, 1061, 330, 18],
};

export function interfaceIconRegion(index: number, toolbar: boolean) {
  const bounds = (toolbar ? toolbarRegions : screenRegions)[index];
  return { bounds, landing: toolbar ? bounds : screenIconLandings[index] ?? bounds };
}

export function regionStyle([x, y, width, height]: Region): CSSProperties {
  return { left: `${x / 1920 * 100}%`, top: `${y / 1080 * 100}%`, width: `${width / 1920 * 100}%`, height: `${height / 1080 * 100}%` };
}
