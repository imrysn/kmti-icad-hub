export interface MenuItem {
    label: string;
    shortcut?: string;
    hasSubmenu?: boolean;
    isDivider?: boolean;
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
    menuItems: MenuItem[];
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
    { label: "Save As(A)....", shortcut: "Ctrl+Shift+A" },
    { isDivider: true, label: "" },
    { label: "Drawing Conversion Import(I)..." },
    { label: "Drawing Conversion Export(E)..." },
    { isDivider: true, label: "" },
    { label: "Saved Output(D)..." },
    { label: "Range Output / Print Area(H)...", shortcut: "Ctrl+P" },
    { label: "Displayed Drawing Output(M)..." },
    { label: "Set Print Area(U)", hasSubmenu: true },
    { label: "Clear Print Area(Y)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "1 Open [File Path...]" },
    { label: "2 Open [File Path...]" },
    { label: "3 Open [File Path...]" },
    { label: "4 Open [File Path...]" },
    { label: "5 Open [File Path...]" },
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
    { label: "Toolbar (T)", hasSubmenu: true },
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
    { label: "Number of Elements (S)", hasSubmenu: true },
    { label: "Number of Parts (G)", hasSubmenu: true },
    { label: "Number of Balloons (B)", hasSubmenu: true },
    { label: "Group List (I)", hasSubmenu: true },
    { label: "Number of Sub-Drawings (C)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "View Information (V)" },
    { isDivider: true, label: "" },
    { label: "3D Drawing List (Z)" },
    { label: "Window Information (W)" }
];

export const SETTINGS_MENU_ITEMS: MenuItem[] = [
    { label: "Drafting Attributes (A)" },
    { label: "Attribute Settings (I)..." },
    { label: "Drawing Attributes (C)" },
    { label: "View Switching Panel (V)..." },
    { isDivider: true, label: "" },
    { label: "3D Dimension Lines (3)..." },
    { label: "3D Rotation Settings (X)", hasSubmenu: true },
    { label: "3D Relative View (L)", hasSubmenu: true },
    { label: "3D Drafting Folder (S)..." },
    { isDivider: true, label: "" },
    { label: "Coordinate Axes (X)", hasSubmenu: true },
    { label: "Drafting (R)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "Arc Display (Q)" },
    { label: "Simplified Display (B)", hasSubmenu: true },
    { label: "Materail Display (Z)", hasSubmenu: true },
    { label: "Light Source Settings (H)", hasSubmenu: true },
    { label: "Gradient (N)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "Linked Display (E)", hasSubmenu: true },
    { label: "Work Screen Switch (W)", hasSubmenu: true },
    { label: "Change 3D View (O)", hasSubmenu: true },
    { label: "Screen Split (F)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "Define Extended Part Attributes (D)..." },
    { isDivider: true, label: "" },
    { label: "Security Settings (T)" },
    { isDivider: true, label: "" },
    { label: "Save Application Position (P)", hasSubmenu: true }
];

// Content provided from your Tools image:
export const TOOLS_MENU_ITEMS: MenuItem[] = [
    { label: "Automatic Group (A)..." },
    { isDivider: true, label: "" },
    { label: "Grid (G)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "Assembly Plane (P)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "Input Coordinate System (N)", hasSubmenu: true },
    { isDivider: true, label: "" },
    { label: "Measure (M)", hasSubmenu: true }
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
        normalPos: { x: toPctX(0), y: toPctY(25), w: toPctX(70), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(0), y: toPctY(25), w: toPctX(70), h: toPctY(26 + 5) }
    },
    {
        label: "View",
        menuItems: VIEW_MENU_ITEMS,
        normalPos: { x: toPctX(64), y: toPctY(25), w: toPctX(60), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(64), y: toPctY(25), w: toPctX(60), h: toPctY(26 + 5) }
    },
    {
        label: "Information",
        menuItems: INFO_MENU_ITEMS,
        normalPos: { x: toPctX(120), y: toPctY(25), w: toPctX(81), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(120), y: toPctY(25), w: toPctX(81), h: toPctY(26 + 5) }
    },
    {
        label: "Settings",
        menuItems: SETTINGS_MENU_ITEMS,
        normalPos: { x: toPctX(192), y: toPctY(25), w: toPctX(57), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(192), y: toPctY(25), w: toPctX(57), h: toPctY(26 + 5) }
    },
    {
        label: "Tools",
        menuItems: TOOLS_MENU_ITEMS,
        normalPos: { x: toPctX(251), y: toPctY(25), w: toPctX(63), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(251), y: toPctY(25), w: toPctX(63), h: toPctY(26 + 5) }
    },
    {
        label: "Window",
        menuItems: WINDOW_MENU_ITEMS,
        normalPos: { x: toPctX(311), y: toPctY(25), w: toPctX(83), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(311), y: toPctY(25), w: toPctX(83), h: toPctY(26 + 5) }
    },
    {
        label: "Help",
        menuItems: HELP_MENU_ITEMS,
        normalPos: { x: toPctX(390), y: toPctY(25), w: toPctX(66), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(390), y: toPctY(25), w: toPctX(66), h: toPctY(26 + 5) }
    }
];
