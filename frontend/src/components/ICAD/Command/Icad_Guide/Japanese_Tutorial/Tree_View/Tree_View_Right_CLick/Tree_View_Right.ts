export interface MenuItem {
    label: string;
    shortcut?: string;
    hasSubmenu?: boolean;
    isDivider?: boolean;
    children?: MenuItem[];
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
    contextMenuItems?: MenuItem[]; // Right-click menu
    menuItems?: MenuItem[];
}

// --------------------------------------------------------
// RIGHT-CLICK CONTEXT MENU CONTENT
// Fill these in with the actual right-click menu text from your
// screenshots. Any spotlight without a `contextMenuItems` array
// (or with an empty one) simply won't show a menu on right-click.
// --------------------------------------------------------

export const NEW_DRAWING_1_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Show All Parts (S)" },
    { label: "Hide All Parts (V)" },
];

export const LD11016U01_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Show All Parts (V)" },
    { label: "Hide All Parts (H)" },
    { label: " ", isDivider: true },
    { label: "Reset Blind Part Settings (B)" },
    { label: " ", isDivider: true },
    { label: "Create Child Parts (P)" },
    { label: "Input Settings (I)" },
    { label: " ", isDivider: true },
    { label: "Extended Properties (W)" },
    { label: "Properties (R)" },
];


export const LD11113N01_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Select (S)" },
    { label: "Confirm (U)" },
    { label: " ", isDivider: true },
    { label: "Show (V)" },
    { label: "Hide (H)" },
    { label: "Hide Unspecified (L)" },
    { label: " ", isDivider: true },
    { label: "Set Blind Part (E)" },
    { label: "Unset Blind Part (D)" },
    { label: "Set Unspecified Blind Part (C)" },
    { label: " ", isDivider: true },
    { label: "Create Child Part (P)" },
    { label: "Input Settings (I)" },
    { label: "Cutout (X)" },
    { label: "Cancel (K)" },
    { label: " ", isDivider: true },
    { label: "Extended Properties (W)" },
    { label: "Properties (R)" },
];

export const LD11114N01_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Select (S)" },
    { label: "Confirm (U)" },
    { label: " ", isDivider: true },
    { label: "Show (V)" },
    { label: "Hide (H)" },
    { label: "Hide Unspecified (L)" },
    { label: " ", isDivider: true },
    { label: "Set Blind Part (E)" },
    { label: "Unset Blind Part (D)" },
    { label: "Set Non-Specified Blind Part (C)" },
    { label: " ", isDivider: true },
    { label: "Create Child Part (P)" },
    { label: "Input Settings (I)" },
    { label: "Import (T)" },
    { label: "Acquire Access Rights (G)" },
    { label: "Open Drawing (Z)" },
    { label: "Reload (N)" },
    { label: " ", isDivider: true },
    { label: "Extended Properties (W)" },
    { label: "Properties (R)" },
];

export const LD11116N01_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Select (S)" },
    { label: "Confirm (U)" },
    { label: " ", isDivider: true },
    { label: "Show (V)" },
    { label: "Hide (H)" },
    { label: "Hide Unspecified (L)" },
    { label: " ", isDivider: true },
    { label: "Set Blind Parts (E)" },
    { label: "Clear Blind Parts (D)" },
    { label: "Set Unspecified Blind Parts (C)" },
    { label: " ", isDivider: true },
    { label: "Import (T)" },
    { label: "Acquire Access Rights (G)" },
    { label: "Reload (N)" },
];

export const Panel_16x192x720_ITEMS: MenuItem[] = [
    { label: "Select (S)" },
    { label: "Confirm (U)" },
    { label: " ", isDivider: true },
    { label: "Show (V)" },
    { label: "Hide (H)" },
    { label: "Hide Unspecified (L)" },
    { label: " ", isDivider: true },
    { label: "Set Blind Part (E)" },
    { label: "Unset Blind Part (D)" },
    { label: "Set Unspecified Blind Part (C)" },
    { label: " ", isDivider: true },
    { label: "Create Child Part (P)" },
    { label: "Input Settings (I)" },
    { label: "Cutout (X)" },
    { label: "Cancel (K)" },
    { label: " ", isDivider: true },
    { label: "Extended Properties (W)" },
    { label: "Properties (R)" },
];

export const Panel_19x350x720_ITEMS: MenuItem[] = [
    { label: "Select (S)" },
    { label: "Confirm (U)" },
    { label: " ", isDivider: true },
    { label: "Show (V)" },
    { label: "Hide (H)" },
    { label: "Hide Unspecified (L)" },
    { label: " ", isDivider: true },
    { label: "Set Blind Parts (E)" },
    { label: "Clear Blind Parts (D)" },
    { label: "Set Unspecified Blind Parts (C)" },
    { label: " ", isDivider: true },
    { label: "Cutout (X)" },
    { label: "Clear (K)" },
];

// --------------------------------------------------------
// Tree View panel — coordinates measured directly from the
// actual Tree_View.jpg screenshot, whose REAL size is 1919x1037
// (not 1920x1080 — that was a leftover assumption from the other
// tutorial data file and was throwing every row off).
//
// Panel content sits at x: 131–380px. The combo-box header
// ("LD11016U01_LMMU" dropdown) ends around y=158; the tree rows
// themselves run from y=160 (project folder row) down to y=465
// (bottom edge of the "グローバル" row), in consistent 16px-tall rows:
//
//   y=160  LD11016U01_LMMU        (project folder)
//   y=174  LD11016U01             (active part, blue — expands to CS!M20×60[4] ... SW!M6[16])
//   y=193  CS!M20×60[4]
//   y=209  CS!M6×12[28]
//   y=225  LD11113N01 (読取専用)
//   y=241  LD11114N01 (読取専用)
//   y=257  LD11115N01 (読取専用)
//   y=273  LD11116N01 (読取専用)[2]
//   y=289  LD11117N01 (読取専用)[2]
//   y=305  LD11118N01 (読取専用)
//   y=321  LD11119N01 (読取専用)
//   y=337  LD11123N01 (読取専用)
//   y=353  LD11124B01 (読取専用)
//   y=369  SW!M6[16]
//   y=385  平面図 (Plan View, highlighted in screenshot)
//   y=401  正面図 (Front View)
//   y=417  右側面図 (Right Side View)
//   y=433  左側面図 (Left Side View)
//   y=449  グローバル (Global)
//
// Because the image is stretched with objectFit:"fill" inside a
// locked 16:9 container in both normal and fullscreen modes,
// percentage coordinates land on the same relative spot either
// way — so fullscreenPos below intentionally mirrors normalPos.
// --------------------------------------------------------

// Helpers to convert pixel values (out of the real 1919x1037 image) to percentages
const toPctX = (px: number) => (px / 1919) * 100;
const toPctY = (px: number) => (px / 1037) * 100;

const TREE_X = 131;           // left edge of panel content
const TREE_RIGHT = 380;       // right edge of panel content
const ROW_TOP = 155;          // y of the first row (LD11016U01_LMMU)
const ROW_HEIGHT = 16;        // every row is a consistent 16px tall
const TREE_BOTTOM = 465;      // bottom edge of the last row (グローバル)

// row(index) returns the PositionConfig for the Nth row (0-indexed from ROW_TOP)
const row = (index: number, rows: number = 1): PositionConfig => ({
    x: toPctX(TREE_X),
    y: toPctY(ROW_TOP + index * ROW_HEIGHT),
    w: toPctX(TREE_RIGHT - TREE_X),
    h: toPctY(ROW_HEIGHT * rows)
});

export const SPOTLIGHTS: SpotlightConfig[] = [
    {
        label: "New Drawing 1",
        contextMenuItems: NEW_DRAWING_1_CONTEXT_ITEMS,
        normalPos: row(0.3),        // LD11016U01_LMMU — y=155
        fullscreenPos: row(0)
    },
    {
        label: "LD11016U01",
        contextMenuItems: LD11016U01_CONTEXT_ITEMS,
        normalPos: row(1),        // LD11016U01 (blue) — y=174
        fullscreenPos: row(1)
    },
    {
        label: "LD11113N01",
        contextMenuItems: LD11113N01_CONTEXT_ITEMS,
        normalPos: row(4.1),        // LD11113N01 — y=225
        fullscreenPos: row(4)
    },
    {
        label: "16x192x720",
        contextMenuItems: Panel_16x192x720_ITEMS,
        normalPos: row(4.7),
        fullscreenPos: row(4.6)
    },
    {
        label: "19x350x720",
        contextMenuItems: Panel_16x192x720_ITEMS,
        normalPos: row(5.7),
        fullscreenPos: row(5.6)
    },
    {
        label: "LD11114N01",
        contextMenuItems: LD11114N01_CONTEXT_ITEMS,
        normalPos: row(8.5),        // LD11114N01 — y=241
        fullscreenPos: row(8.4)
    },
    {
        label: "LD11116N01",
        contextMenuItems: LD11116N01_CONTEXT_ITEMS,
        normalPos: row(10.5),        // LD11116N01 — y=273
        fullscreenPos: row(10.4)
    },
];