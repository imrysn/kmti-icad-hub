import { V } from "vitest/dist/chunks/evaluatedModules.d.BxJ5omdx";

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
    menuItems: MenuItem[];
    contextMenuItems?: MenuItem[]; // Right-click menu — separate from the left-click dropdown above
}

// --------------------------------------------------------
// PLACEHOLDER MENU CONTENT
// Replace the labels below with the exact Japanese text from your images!
// --------------------------------------------------------

export const NEW_DRAWING_1_ITEMS: MenuItem[] = [];

export const LD11016U01_ITEMS: MenuItem[] = [];
export const CS_M20x60_Items: MenuItem[] = [
    { label: "CS!M20×60" },
    { label: "CS!M20×60" },
    { label: "CS!M20×60" },
    { label: "CS!M20×60" },
];
export const CS_M6x12_Items: MenuItem[] = [
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
    { label: "CS!M6×12" },
];
export const LD11113N01_Items: MenuItem[] = [
    { label: "16x192x720" },
    {
        label: "19x350x720[2]", hasSubmenu: true,
        children: [
            { label: "19x350x720" },
            { label: "19x350x720" },
        ]
    },
    { label: "30x340x350" },
    { label: "35x300x340" },
];
export const LD11114N01_Items: MenuItem[] = [
    { label: "2.3x290x490" }
];
export const LD11115N01_Items: MenuItem[] = [
    { label: "2.3x290x340" }
];
export const LD11116N01_Items: MenuItem[] = [
    { label: "LD11116N01 (Read-Only)" },
    { label: "LD11116N01 (Read-Only)" }
];
export const LD11117N01_Items: MenuItem[] = [
    { label: "LD11117N01 (Read-Only)" },
    { label: "LD11117N01 (Read-Only)" }
];
export const LD11118N01_Items: MenuItem[] = [
    { label: "10x16x190" }
];
export const LD11119N01_Items: MenuItem[] = [
    { label: "10x16x130" }
];
export const LD11123N01_Items: MenuItem[] = [
    { label: "2.3x190x240" }
];
export const LD11124B01_Items: MenuItem[] = [
    { label: "100×75×7-150[4]" },
    { label: "12×496×576[2]" },
    { label: "12×496×800[2]" },
    { label: "12×75×236" },
    { label: "12×75×280[2]" },
    { label: "12×75×576[2]" },
    { label: "19×100×400[2]" },
    { label: "19×100×800[2]" },
    { label: "19×90×140[4]" },
    { label: "30×300×340" },
    { label: "45×600×800" },
    { label: "6×75×100[8]" },
];
export const SW_M6_Items: MenuItem[] = [
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
    { label: "SW!M6" },
];

export const Plan_View_Items: MenuItem[] = [
    { label: "10×16×130" },
    { label: "10×16×150" },
    { label: "10×16×190" },
    { label: "12×20×170" },
    { label: "12×496×576" },
    { label: "12×496×800" },
    { label: "12×75×236" },
    { label: "12×75×280" },
    { label: "12×75×576" },
    { label: "16×192×720" },
    { label: "19×350×720" },
    { label: "19×90×140" },
    { label: "2.3×290×340" },
    { label: "2.3×290×490" },
    { label: "30×300×340" },
    { label: "30×340×350" },
    { label: "35×300×340" },
    { label: "45×600×800" },
    { label: "45 cut" },
    { label: "7 cut" },
    { label: "CS!M6×12" },
    { label: "M10 depth 20" },
    { label: "M12 depth 24" },
    { label: "M16 through" },
    { label: "M20 through" },
    { label: "M24 through" },
    { label: "M6 through" },
    { label: "SW!M6" },
];

export const Front_View_Items: MenuItem[] = [
    { label: "10×16×190" },
    { label: "12×20×170" },
    { label: "12×496×576" },
    { label: "12×496×800" },
    { label: "12×75×280" },
    { label: "12×75×576" },
    { label: "16×192×720" },
    { label: "19×100×400" },
    { label: "19×100×800" },
    { label: "19×350×720" },
    { label: "19×90×140" },
    { label: "2.3×190×240" },
    { label: "2.3×290×490" },
    { label: "22 cut, 32 notches, deep 1" },
    { label: "30×300×340" },
    { label: "30×340×350" },
    { label: "30 cut" },
    { label: "35×300×340" },
    { label: "45×600×800" },
    { label: "45 cut" },
    { label: "6.6 cut, 11 notches, depth 7" },
    { label: "6×75×100" },
    { label: "7 cut" },
    { label: "CS! M20×60" },
    { label: "CS! M6×12" },
    { label: "L-100×75×7-150" },
    { label: "M10 Depth 20" },
    { label: "M16 Through" },
    { label: "M20, depth 30" },
    { label: "M20, depth 6" },
    { label: "M6, depth 12" },
    { label: "M6, through" },
    { label: "SW!M6" },
];

export const Right_Side_View_Items: MenuItem[] = [
    { label: "12×496×576" },
    { label: "12×496×800" },
    { label: "12×75×236" },
    { label: "12×75×280" },
    { label: "12×75×576" },
    { label: "19×100×800" },
    { label: "19×350×720" },
    { label: "19×90×140" },
    { label: "2.3×290×490" },
    { label: "30×300×340" },
    { label: "30×340×350" },
    { label: "30 cut" },
    { label: "45×600×800" },
    { label: "45 (cut-to-size)" },
    { label: "6×75×100" },
    { label: "CS!M6×12" },
    { label: "L-100×75×7-150" },
    { label: "M16 through-hole" },
    { label: "SW!M6" },
];

export const Left_Side_View_Items: MenuItem[] = [
    { label: "10×16×150" },
    { label: "12×20×170" },
    { label: "12×496×576" },
    { label: "12×496×800" },
    { label: "16×192×720" },
    { label: "19×100×800" },
    { label: "19×350×720" },
    { label: "19×90×140" },
    { label: "2.3×290×340" },
    { label: "30×340×350" },
    { label: "30 cut" },
    { label: "35×300×340" },
    { label: "45×600×800" },
    { label: "45 (cut-to-size)" },
    { label: "6×75×100" },
    { label: "CS!M20×60" },
    { label: "CS!M6×12" },
    { label: "L-100×75×7-150" },
    { label: "M16 through-hole" },
    { label: "M6 Deep 12" },
    { label: "M6 Through" },
    { label: "M8 Through" },
    { label: "SW!M6" },
];

export const Global_Items: MenuItem[] = [
    { label: "Sys_FrameTitleData" },
    { label: "Sys_PartsList_Line" },
];

// --------------------------------------------------------
// RIGHT-CLICK CONTEXT MENU CONTENT (placeholder)
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

export const CS_M20x60_CONTEXT_ITEMS: MenuItem[] = [
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

export const CS_M6x12_CONTEXT_ITEMS: MenuItem[] = [
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

export const LD11115N01_CONTEXT_ITEMS: MenuItem[] = [
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

export const LD11117N01_CONTEXT_ITEMS: MenuItem[] = [
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

export const LD11118N01_CONTEXT_ITEMS: MenuItem[] = [
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

export const LD11119N01_CONTEXT_ITEMS: MenuItem[] = [
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

export const LD11123N01_CONTEXT_ITEMS: MenuItem[] = [
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

export const LD11124B01_CONTEXT_ITEMS: MenuItem[] = [
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

export const SW_M6_CONTEXT_ITEMS: MenuItem[] = [
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

export const Plan_View_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Convert to Activity (A)" },
    { label: " ", isDivider: true },
    { label: "Show All Parts (S)" },
    { label: "Hide All Parts (V)" },
    { label: " ", isDivider: true },
    { label: "Properties (P)" },
];

export const Front_View_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Convert to Activity (A)" },
    { label: " ", isDivider: true },
    { label: "Show All Parts (S)" },
    { label: "Hide All Parts (V)" },
    { label: " ", isDivider: true },
    { label: "Properties (P)" },
];

export const Right_Side_View_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Convert to Activity (A)" },
    { label: " ", isDivider: true },
    { label: "Show All Parts (S)" },
    { label: "Hide All Parts (V)" },
    { label: " ", isDivider: true },
    { label: "Properties (P)" },
];

export const Left_Side_View_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Convert to Activity (A)" },
    { label: " ", isDivider: true },
    { label: "Show All Parts (S)" },
    { label: "Hide All Parts (V)" },
    { label: " ", isDivider: true },
    { label: "Properties (P)" },
];

export const Global_CONTEXT_ITEMS: MenuItem[] = [
    { label: "Convert to Activity (A)" },
    { label: " ", isDivider: true },
    { label: "Show All Parts (S)" },
    { label: "Hide All Parts (V)" },
    { label: " ", isDivider: true },
    { label: "Properties (P)" },
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
const ROW_TOP = 160;          // y of the first row (LD11016U01_LMMU)
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
        menuItems: NEW_DRAWING_1_ITEMS,
        contextMenuItems: NEW_DRAWING_1_CONTEXT_ITEMS,
        normalPos: row(0),        // LD11016U01_LMMU — y=160
        fullscreenPos: row(0)
    },
    {
        label: "LD11016U01",
        menuItems: LD11016U01_ITEMS,
        contextMenuItems: LD11016U01_CONTEXT_ITEMS,
        normalPos: row(1),        // LD11016U01 (blue) — y=174
        fullscreenPos: row(1)
    },
    {
        label: "CS!M20x60",
        menuItems: CS_M20x60_Items,
        contextMenuItems: CS_M20x60_CONTEXT_ITEMS,
        normalPos: row(2),        // CS!M20x60 — y=193
        fullscreenPos: row(2)
    },
    {
        label: "CS!M6x12",
        menuItems: CS_M6x12_Items,
        contextMenuItems: CS_M6x12_CONTEXT_ITEMS,
        normalPos: row(3),        // CS!M6x12 — y=209
        fullscreenPos: row(3)
    },
    {
        label: "LD11113N01",
        menuItems: LD11113N01_Items,
        contextMenuItems: LD11113N01_CONTEXT_ITEMS,
        normalPos: row(4),        // LD11113N01 — y=225
        fullscreenPos: row(4)
    },
    {
        label: "LD11114N01",
        menuItems: LD11114N01_Items,
        contextMenuItems: LD11114N01_CONTEXT_ITEMS,
        normalPos: row(5),        // LD11114N01 — y=241
        fullscreenPos: row(5)
    },
    {
        label: "LD11115N01",
        menuItems: LD11115N01_Items,
        contextMenuItems: LD11115N01_CONTEXT_ITEMS,
        normalPos: row(6),        // LD11115N01 — y=257
        fullscreenPos: row(6)
    },
    {
        label: "LD11116N01",
        menuItems: LD11116N01_Items,
        contextMenuItems: LD11116N01_CONTEXT_ITEMS,
        normalPos: row(7),        // LD11116N01 — y=273
        fullscreenPos: row(7)
    },
    {
        label: "LD11117N01",
        menuItems: LD11117N01_Items,
        contextMenuItems: LD11117N01_CONTEXT_ITEMS,
        normalPos: row(8),        // LD11117N01 — y=289
        fullscreenPos: row(8)
    },
    {
        label: "LD11118N01",
        menuItems: LD11118N01_Items,
        contextMenuItems: LD11118N01_CONTEXT_ITEMS,
        normalPos: row(9),        // LD11118N01 — y=305
        fullscreenPos: row(9)
    },
    {
        label: "LD11119N01",
        menuItems: LD11119N01_Items,
        contextMenuItems: LD11119N01_CONTEXT_ITEMS,
        normalPos: row(10),       // LD11119N01 — y=321
        fullscreenPos: row(10)
    },
    {
        label: "LD11123N01",
        menuItems: LD11123N01_Items,
        contextMenuItems: LD11123N01_CONTEXT_ITEMS,
        normalPos: row(11),       // LD11123N01 — y=337
        fullscreenPos: row(11)
    },
    {
        label: "LD11124B01",
        menuItems: LD11124B01_Items,
        contextMenuItems: LD11124B01_CONTEXT_ITEMS,
        normalPos: row(12),       // LD11124B01 — y=353
        fullscreenPos: row(12)
    },
    {
        label: "SW!M6",
        menuItems: SW_M6_Items,
        contextMenuItems: SW_M6_CONTEXT_ITEMS,
        normalPos: row(13),       // SW!M6 — y=369
        fullscreenPos: row(13)
    },
    {
        label: "Plan View",
        menuItems: Plan_View_Items,
        contextMenuItems: Plan_View_CONTEXT_ITEMS,
        normalPos: row(14),       // 平面図 — y=385
        fullscreenPos: row(14)
    },
    {
        label: "Front View",
        menuItems: Front_View_Items,
        contextMenuItems: Front_View_CONTEXT_ITEMS,
        normalPos: row(15),       // 正面図 — y=401
        fullscreenPos: row(15)
    },
    {
        label: "Right Side View",
        menuItems: Right_Side_View_Items,
        contextMenuItems: Right_Side_View_CONTEXT_ITEMS,
        normalPos: row(16),       // 右側面図 — y=417
        fullscreenPos: row(16)
    },
    {
        label: "Left Side View",
        menuItems: Left_Side_View_Items,
        contextMenuItems: Left_Side_View_CONTEXT_ITEMS,
        normalPos: row(17),       // 左側面図 — y=433
        fullscreenPos: row(17)
    },
    {
        label: "Global",
        menuItems: Global_Items,
        contextMenuItems: Global_CONTEXT_ITEMS,
        normalPos: row(18),       // グローバル — y=449
        fullscreenPos: row(18)
    },
];