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
    { label: "View Item 1" },
    { label: "View Item 2", hasSubmenu: true }
];

export const INFO_MENU_ITEMS: MenuItem[] = [
    { label: "Info Item 1" },
    { label: "Info Item 2" }
];

export const SETTINGS_MENU_ITEMS: MenuItem[] = [
    { label: "Settings Item 1" },
    { label: "Settings Item 2" }
];

// Content provided from your Tools image:
export const TOOLS_MENU_ITEMS: MenuItem[] = [
    { label: "Automatic Group (A)..." },
    { label: "Grid (G)", hasSubmenu: true },
    { label: "Assembly Plane (P)", hasSubmenu: true },
    { label: "Input Coordinate System (N)", hasSubmenu: true },
    { label: "Measure (M)", hasSubmenu: true }
];

export const WINDOW_MENU_ITEMS: MenuItem[] = [
    { label: "Window Item 1" },
    { label: "Window Item 2" }
];

export const HELP_MENU_ITEMS: MenuItem[] = [
    { label: "Help Item 1" },
    { label: "Help Item 2" }
];

// Helper to convert old pixel values to percentages
const toPctX = (px: number) => (px / 1920) * 100;
const toPctY = (px: number) => ((px - 27 + 7 + 15) / 1042) * 100;

export const SPOTLIGHTS: SpotlightConfig[] = [
    {
        label: "File",
        menuItems: FILE_MENU_ITEMS,
        normalPos: { x: toPctX(0), y: toPctY(34), w: toPctX(70), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(0), y: toPctY(34), w: toPctX(70), h: toPctY(26 + 5) }
    },
    {
        label: "View",
        menuItems: VIEW_MENU_ITEMS,
        normalPos: { x: toPctX(64), y: toPctY(34), w: toPctX(60), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(64), y: toPctY(34), w: toPctX(60), h: toPctY(26 + 5) }
    },
    {
        label: "Information",
        menuItems: INFO_MENU_ITEMS,
        normalPos: { x: toPctX(120), y: toPctY(34), w: toPctX(81), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(120), y: toPctY(34), w: toPctX(81), h: toPctY(26 + 5) }
    },
    {
        label: "Settings",
        menuItems: SETTINGS_MENU_ITEMS,
        normalPos: { x: toPctX(197), y: toPctY(34), w: toPctX(57), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(197), y: toPctY(34), w: toPctX(57), h: toPctY(26 + 5) }
    },
    {
        label: "Tools",
        menuItems: TOOLS_MENU_ITEMS,
        normalPos: { x: toPctX(251), y: toPctY(34), w: toPctX(63), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(251), y: toPctY(34), w: toPctX(63), h: toPctY(26 + 5) }
    },
    {
        label: "Window",
        menuItems: WINDOW_MENU_ITEMS,
        normalPos: { x: toPctX(311), y: toPctY(34), w: toPctX(83), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(311), y: toPctY(34), w: toPctX(83), h: toPctY(26 + 5) }
    },
    {
        label: "Help",
        menuItems: HELP_MENU_ITEMS,
        normalPos: { x: toPctX(390), y: toPctY(34), w: toPctX(66), h: toPctY(26 + 5) },
        fullscreenPos: { x: toPctX(390), y: toPctY(34), w: toPctX(66), h: toPctY(26 + 5) }
    }
];
