import { V } from "vitest/dist/chunks/evaluatedModules.d.BxJ5omdx";

export interface MenuItem {
    label: string;
    shortcut?: string;
    hasSubmenu?: boolean;
    isDivider?: boolean;
    children?: MenuItem[];
    disabled?: boolean;
}

export interface PositionConfig {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
    w: number; // percentage (0-100)
    h: number; // percentage (0-100)
}

export interface SpotlightConfig {
    label: string;
    normalPos: PositionConfig;
    fullscreenPos: PositionConfig; // Independent config for fullscreen
    menuItems?: MenuItem[];
    contextMenuItems?: MenuItem[];
}

// --------------------------------------------------------
// PLACEHOLDER MENU CONTENT
// Replace the labels below with the exact Japanese text from your images!
// --------------------------------------------------------

export const FILE_MENU_ITEMS: MenuItem[] = [
    { label: "New (N)", shortcut: "Ctrl+N" },
    { label: "Open (O)...", shortcut: "Ctrl+O" },
    { label: "Close (C)" },
    { label: "Close All (Z)" },
    { isDivider: true, label: "" },
    { label: "Save (S)", shortcut: "Ctrl+S" },
    { label: "Save As(A)....", shortcut: "Ctrl+Shift+S" },
    { isDivider: true, label: "" },
    { label: "Drawing Conversion Import(I)...", shortcut: "Ctrl+I" },
    { label: "Drawing Conversion Export(E)..." },
    { isDivider: true, label: "" },
    { label: "Saved Output(D)..." },
    { label: "Range Output / Print Area(H)... ", shortcut: "Ctrl+P" },
    { label: "Displayed Drawing Output(M)..." },
    {
        label: "Set Print Area(U)", hasSubmenu: true,
        children: [
            { label: "Custom Range (S)..." },
            { label: "A0 Horizontal (0)" },
            { label: "A1 Horizontal (1)" },
            { label: "A2 Horizontal (2)" },
            { label: "A3 Horizontal (3)" },
            { label: "A4 Horizontal (4)" },
            { label: "A0 Vertical (5)" },
            { label: "A1 Vertical (6)" },
            { label: "A2 Vertical (7)" },
            { label: "A3 Vertical (8)" },
            { label: "A4 Vertical (9)" },
        ]
    },
    {
        label: "Clear Print Area(Y)", hasSubmenu: true,
        children: [
            { label: "Specify Range (S)" },
            { label: "Range List (D)..." },
        ]
    },
    { isDivider: true, label: "" },
    { label: "1 Open [File Path...]", disabled: true },
    { label: "2 Open [File Path...]", disabled: true },
    { label: "3 Open [File Path...]", disabled: true },
    { label: "4 Open [File Path...]", disabled: true },
    { label: "5 Open [File Path...]", disabled: true },
    { isDivider: true, label: "" },
    { label: "Exit (X)" },
];

export const VIEW_MENU_ITEMS: MenuItem[] = [
    { label: "Layers (L)" },
    { label: "Layer Settings (E)..." },
    { isDivider: true, label: "" },
    { label: "Search Elements (D)" },
    { label: "Search 3D Elements (S)" },
    { label: "Search Line Types (K)" },
    { label: "Search Line Widths (W)" },
    { label: "Search Colors (C)" },
    { isDivider: true, label: "" },
    { label: "Tree View (V)" },
    { label: "View List (I)" },
    {
        label: "Toolbar (T)", hasSubmenu: true,
        children: [
            { label: "Input Control (R)" },
            { label: "File (1)" },
            { label: "2D View (2)" },
            { label: "View Toggle (3)" },
            { label: "Screen Operations (4)" },
            { label: "3D View (5)" },
            { label: "User View (6)" },
            { label: "UNDO (7)" },
            { label: "Shading (8)" },
            { label: "Cross-Section View (9)" },
            { label: "Screen Save (0)" },
            { label: "2D Standard Screen (1)" },
            { label: "System Information (S)" },
            { label: "Item Input (I)" },
            { label: "Key Input (K)" },
            { label: "Overall View (Z)" },
        ]
    },
    { isDivider: true, label: "" },
    { label: "Command Menu (M)" },
    { label: "Icon Menu (N)" }
];

export const INFO_MENU_ITEMS: MenuItem[] = [
    { label: "Length (L)" },
    { label: "Distance (D)", shortcut: "F3" },
    { label: "Angle (A)" },
    { isDivider: true, label: "" },
    { label: "Element (E)" },
    { label: "Coordinates (P)" },
    { label: "Layer Value (Y)" },
    { isDivider: true, label: "" },
    { label: "Machining Requirements (H)" },
    { isDivider: true, label: "" },
    {
        label: "Number of Elements (S)", hasSubmenu: true,
        children: [
            { label: "All Views (S)" },
            { label: "Active View (W)" },
            { label: "All Views by Layer (F)" },
            { label: "Active View by Layer (R)" },
        ]
    },
    {
        label: "Number of Parts (G)", hasSubmenu: true,
        children: [
            { label: "All Views (G)" },
            { label: "Active View (T)" },
        ]
    },
    {
        label: "Number of Balloons (B)", hasSubmenu: true,
        children: [
            { label: "All Views (B)" },
            { label: "Active View (H)" },
        ]
    },
    {
        label: "Group List (I)", hasSubmenu: true,
        children: [
            { label: "All Views (I)" },
            { label: "Active View (J)" },
        ]
    },
    { label: "Number of Sub-Drawings (C)" },
    { isDivider: true, label: "" },
    { label: "View Information (V)" },
    { isDivider: true, label: "" },
    { label: "3D Drawing List (Z)" },
    { label: "Window Information (W)" }
];

export const SETTINGS_MENU_ITEMS: MenuItem[] = [
    { label: "Drafting Attributes (A)..." },
    { label: "Attribute Settings (I)..." },
    { label: "Drawing Attributes (C)" },
    { label: "View Switching Panel (V)..." },
    { isDivider: true, label: "" },
    { label: "3D Dimension Lines (3)..." },
    {
        label: "3D Rotation Settings (X)", hasSubmenu: true,
        children: [
            { label: "Rotation Axis X (X)" },
            { label: "Rotation Axis Y (Y)" },
            { label: "Rotation Axis Z (Z)" },
            { label: "Rotation Axis (Any) (A)" },
            { isDivider: true, label: "" },
            { label: "Set Rotation Center (O)" },
            { label: "Clear Rotation Center (I)" },
            { isDivider: true, label: "" },
            { label: "Set View Lock (V)" },
            { label: "Clear View Lock (F)" },
        ]
    },
    {
        label: "3D Relative View (L)", hasSubmenu: true,
        children: [
            { label: "Relative Designation (S)" },
            { label: "Top (T)" },
            { label: "Bottom (B)" },
            { label: "Right Side (R)" },
            { label: "Left Side (L)" },
            { label: "Back (E)" },
        ]
    },
    { label: "3D Drafting Folder (S)..." },
    { isDivider: true, label: "" },
    {
        label: "Coordinate Axes (X)", hasSubmenu: true,
        children: [
            { label: "Show 3D axes (V)" },
            { label: "Show 3D origin (O)" },
            { label: "Hide 3D axes (C)" },
            { isDivider: true, label: " " },
            { label: "Show 2D axes (Q)" },
            { label: "Hide 2D axes (W)" },
        ]
    },
    {
        label: "Drafting (R)", hasSubmenu: true,
        children: [
            { label: "Shading (C)" },
            { label: "Line Art (W)" },
        ]
    },
    { isDivider: true, label: "" },
    { label: "Arc Display (Q)" },
    {
        label: "Simplified Display (B)", hasSubmenu: true,
        children: [
            { label: "General (C)" },
            { label: "Detailed (D)" },
            { isDivider: true, label: " " },
            { label: "General Element Specification (E)" },
            { label: "Detailed Element Specification (S)" },
        ]
    },
    {
        label: "Materail Display (Z)", hasSubmenu: true,
        children: [
            { label: "None (Z)" },
            { label: "Level 1 (I)" },
            { label: "Level 2 (N)" },
            { label: "Level 3 (S)" },
            { label: "Level 4 (Y)" },
            { label: "Level 5 (G)" },
        ]
    },
    {
        label: "Light Source Settings (H)", hasSubmenu: true,
        children: [
            { label: "ON (E)" },
            { label: "OFF (S)" },
        ]
    },
    {
        label: "Gradient (N)", hasSubmenu: true,
        children: [
            { label: "ON (E)" },
            { label: "OFF (S)" },
            { label: "Settings (A)..." },
        ]
    },
    { isDivider: true, label: "" },
    {
        label: "Linked Display (E)", hasSubmenu: true,
        children: [
            { label: "ON (E)" },
            { label: "OFF (S)" },
        ]
    },
    {
        label: "Work Screen Switch (W)", hasSubmenu: true,
        children: [
            { label: "Auto(W)" },
            { label: "Manual(M)" },
        ]
    },
    {
        label: "Change 3D View (O)", hasSubmenu: true,
        children: [
            { label: "Full Screen (A)" },
            { label: "Single Screen (O)" },
        ]
    },
    {
        label: "Screen Split (F)", hasSubmenu: true,
        children: [
            { label: "Three-view drawing (V)" },
            { label: "Relative view (R)" },
        ]
    },
    { isDivider: true, label: "" },
    { label: "Define Extended Part Attributes (D)..." },
    { isDivider: true, label: "" },
    { label: "Security Settings (T)..." },
    { isDivider: true, label: "" },
    {
        label: "Save Application Position (P)", hasSubmenu: true,
        children: [
            { label: "Save on Exit (S)" },
            { label: "Restore on Startup (L)" },
            { label: "Save Current State (A)" },
            { label: "Restore Saved Data (O)" },
            { label: "Restore Default Settings (D)" },
        ]
    }
];

// Content provided from your Tools image:
export const TOOLS_MENU_ITEMS: MenuItem[] = [
    { label: "Automatic Group (A)..." },
    { isDivider: true, label: "" },
    {
        label: "Grid (G)", hasSubmenu: true,
        children: [
            { label: "Pass Through Origin (O)" },
            { label: "Pass Through Hit Point (H)" },
            { label: "Cancel (C)" },
            { label: "Grid Attribute (I)..." },
        ]
    },
    { isDivider: true, label: "" },
    {
        label: "Assembly Plane (P)", hasSubmenu: true,
        children: [
            { label: "Plane Definition (A)" },
            { label: "Front View Definition (F)" },
            { label: "Right Side View Definition (R)" },
            { label: "Face Specification (S)" },
            { label: "3-Point Specification (P)" },
            { label: "Normal Specification (B)" },
            { label: "View Specification (V)" },
            { isDivider: true, label: "" },
            { label: "Offset (O)" },
            { label: "Move Origin (M)" },
            { label: "Rotate Around X-Axis (X)" },
            { label: "Rotate Around Y-Axis (Y)" },
            { label: "Rotate Around Normal Axis (Z)" },
            { label: "Lock Assembly Plane (L)" },
            { isDivider: true, label: "" },
            { label: "Hide Non-Active (T)" },
            { label: "Show All (W)" },
            { label: "Hide All (H)" },
            { isDivider: true, label: "" },
            { label: "Show Input Destination Name (N)" },
        ]
    },
    { isDivider: true, label: "" },
    {
        label: "Input Coordinate System (N)", hasSubmenu: true,
        children: [
            { label: "X and Y Axis Selection (H)" },
            { label: "Z Axis Selection (V)" },
            { label: "Part Selection (P)" },
            { isDivider: true, label: "" },
            { label: "Toggle (C)" },
            { isDivider: true, label: "" },
            { label: "Move to Origin (M)" },
            { label: "X-Axis Rotation (X)" },
            { label: "Y-Axis Rotation (Y)" },
            { label: "Z-Axis Rotation (Z)" },
            { isDivider: true, label: "" },
            { label: "Delete (D)" },
            { isDivider: true, label: "" },
            { label: "Properties (I)" },
        ]
    },
    { isDivider: true, label: "" },
    {
        label: "Measure (M)", hasSubmenu: true,
        children: [
            { label: "Arrange (S)" },
            { isDivider: true, label: "" },
            { label: "Delete All (D)" },
        ]
    }
];

export const WINDOW_MENU_ITEMS: MenuItem[] = [
    { label: "Open (O)" },
    { label: "Close All (X)" },
    { isDivider: true, label: "" },
    { label: "Split Vertically (U)" },
    { label: "Split Horizontally (R)" },
    { label: "Split into 4 Panes (4)" },
    { label: "Unsplit (O)" },
    { isDivider: true, label: "" },
    { label: "Display Side-by-Side Vertically (H)" },
    { label: "Display Side-by-Side Horizontally (T)" },
    { label: "Display Overlapping (C)" },
    { label: "Align Icons (A)" },
    { isDivider: true, label: "" },
    { label: "Synchronize Vertical Split (J)" },
    { label: "Synchronize Horizontal Split (L)" },
    { label: "Unlink (F)" },
    { isDivider: true, label: "" },
    { label: "Display Specified Drawings Side-by-Side Vertically (I)", hasSubmenu: true },
    { label: "Display Specified Drawings Side-by-Side Horizontally (U)", hasSubmenu: true },
    { label: "Bring Specified Drawings to the Foreground (B)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "1 LD1106U01_LMMU User View 1" }
];

export const HELP_MENU_ITEMS: MenuItem[] = [
    { label: "Help (H)" },
    { label: "Manual (M)" },
    { isDivider: true, label: "" },
    { label: "Tutorial (L)" },
    { isDivider: true, label: "" },
    { label: "Update Information (U)" },
    { label: "Product Information (P)" },
    { isDivider: true, label: "" },
    { label: "Version (V)" }
];

// Helper to convert old pixel values to percentages
const toPctX = (px: number) => (px / 1920) * 100;
const toPctY = (px: number) => ((px - 27 + 7 + 15) / 1042) * 100;

export const SPOTLIGHTS: SpotlightConfig[] = [
    {
        label: "File",
        menuItems: FILE_MENU_ITEMS,
        normalPos: { x: toPctX(18), y: toPctY(25), w: toPctX(70), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(20), y: toPctY(23), w: toPctX(70), h: toPctY(26 + 5) }
    },
    {
        label: "View",
        menuItems: VIEW_MENU_ITEMS,
        normalPos: { x: toPctX(80), y: toPctY(25), w: toPctX(60), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(85), y: toPctY(23), w: toPctX(60), h: toPctY(26 + 5) }
    },
    {
        label: "Information",
        menuItems: INFO_MENU_ITEMS,
        normalPos: { x: toPctX(140), y: toPctY(25), w: toPctX(81), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(140), y: toPctY(23), w: toPctX(81), h: toPctY(26 + 5) }
    },
    {
        label: "Settings",
        menuItems: SETTINGS_MENU_ITEMS,
        normalPos: { x: toPctX(212), y: toPctY(25), w: toPctX(57), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(218), y: toPctY(23), w: toPctX(57), h: toPctY(26 + 5) }
    },
    {
        label: "Tools",
        menuItems: TOOLS_MENU_ITEMS,
        normalPos: { x: toPctX(272), y: toPctY(25), w: toPctX(63), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(272), y: toPctY(23), w: toPctX(63), h: toPctY(26 + 5) }
    },
    {
        label: "Window",
        menuItems: WINDOW_MENU_ITEMS,
        normalPos: { x: toPctX(332), y: toPctY(25), w: toPctX(83), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(332), y: toPctY(23), w: toPctX(83), h: toPctY(26 + 5) }
    },
    {
        label: "Help",
        menuItems: HELP_MENU_ITEMS,
        normalPos: { x: toPctX(410), y: toPctY(25), w: toPctX(66), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(410), y: toPctY(23), w: toPctX(66), h: toPctY(26 + 5) }
    }
];
