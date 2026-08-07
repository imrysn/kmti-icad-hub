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
}

// --------------------------------------------------------
// PLACEHOLDER MENU CONTENT
// Replace the labels below with the exact Japanese text from your images!
// --------------------------------------------------------

export const NEW_DRAWING_1_ITEMS: MenuItem[] = [
    {
        label: "New Drawing 1", hasSubmenu: true,
        children: [
            { label: "CS!M20×60[4]" },
            { label: "CS!M6×12[28]" },
            { label: "LD11113N01 (Read-Only)" },
            { label: "LD11114N01 (Read-Only)" },
            { label: "LD11115N01 (Read-Only)" },
            { label: "LD11116N01 (Read-Only) [2]" },
            { label: "LD11117N01 (Read-Only)[2]" },
            { label: "LD11118N01 (Read-Only)" },
            { label: "LD11119N01 (Read-Only)" },
            {
                label: "LD11124B01 (Read-Only)", hasSubmenu: true,
                children: [
                    { label: "LD11123N01 (Read-Only)" },
                ]
            },
            { label: "SW!M6[16]" }
        ]
    },
    { label: "Front View", hasSubmenu: true },
    { label: "Global", hasSubmenu: true },
    { label: "Close All (Z)" },

];

// --------------------------------------------------------
// Tree View panel — coordinates measured directly from the
// actual commmandmenu.jpg screenshot, which is 1920x1080 (NOT
// 1920x1042 like the other tutorial data files assume, so no
// -18 y-offset is needed here — these are plain, accurate px).
//
// Panel content (title bar "新規図面1" + the tree rows) sits at
// roughly x: 135–368px, y: 130–232px in the full 1920x1080 image.
// The title bar itself runs from y ≈ 130 to y ≈ 158; the spotlight
// below starts at y = 158 so it begins right under the title bar
// and only covers the actual tree rows (新規図面1 / 正面図 / グローバル).
// --------------------------------------------------------

// Helpers to convert pixel values (out of the real 1920x1080 image) to percentages
const toPctX = (px: number) => (px / 1920) * 100;
const toPctY = (px: number) => (px / 1080) * 100;

const TREE_X = 135;       // left edge of panel content
const TREE_RIGHT = 368;   // right edge of panel content
const TITLE_BAR_BOTTOM = 158; // y where the "新規図面1" title bar ends and rows begin
const TREE_BOTTOM = 232;  // bottom of the last visible row (グローバル)

export const SPOTLIGHTS: SpotlightConfig[] = [
    {
        label: "Tree View",
        menuItems: [],
        normalPos: {
            x: toPctX(TREE_X),
            y: toPctY(TITLE_BAR_BOTTOM),
            w: toPctX(TREE_RIGHT - TREE_X),
            h: toPctY(TREE_BOTTOM - TITLE_BAR_BOTTOM)
        },
        fullscreenPos: {
            x: toPctX(TREE_X),
            y: toPctY(TITLE_BAR_BOTTOM),
            w: toPctX(TREE_RIGHT - TREE_X),
            h: toPctY(TREE_BOTTOM - TITLE_BAR_BOTTOM)
        }
    },
    {
        label: "New Drawing 1",
        menuItems: NEW_DRAWING_1_ITEMS,
        normalPos: { x: toPctX(TREE_X), y: toPctY(TITLE_BAR_BOTTOM), w: toPctX(TREE_RIGHT - TREE_X), h: toPctY(20) },
        fullscreenPos: { x: toPctX(TREE_X), y: toPctY(TITLE_BAR_BOTTOM), w: toPctX(TREE_RIGHT - TREE_X), h: toPctY(20) }
    },
];