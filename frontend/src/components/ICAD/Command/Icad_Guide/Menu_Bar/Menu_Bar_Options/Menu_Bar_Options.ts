export interface MenuBarOption {
    title: string;
    children?: MenuBarOption[];
    dividerAfter?: boolean;
}

export const menuBarOptions: MenuBarOption[] = [
    {
        title: "File",
        children: [
            { title: "New" },
            { title: "Open" },
            { title: "Close" },
            { title: "Close All", dividerAfter: true },
            { title: "Save" },
            { title: "Save As", dividerAfter: true },
            { title: "Import..." },
            { title: "Export...", dividerAfter: true },
            { title: "Print Saved Drawing..." },
            { title: "Print Framed Area..." },
            { title: "Print Active Drawing..." },
            { title: "Print Arae" },
            { title: "Release Print Areas", dividerAfter: true },
            { title: "Exit" }
        ],
    },
    {
        title: "View",
        children: [
            { title: "Layer" },
            { title: "Set Layer...", dividerAfter: true },
            { title: "Selectable Entities" },
            { title: "Selectable Solid Entities" },
            { title: "Selectable Line Types" },
            { title: "Selectable Line Widths" },
            { title: "Selectable Colors", dividerAfter: true },
            { title: "Tree View" },
            { title: "View List" },
            { title: "Tool Bar", dividerAfter: true },
            { title: "Command Menu" },

        ],
    },
    {
        title: "Information",
        children: [
            { title: "Length" },
            { title: "Distance" },
            { title: "Angle", dividerAfter: true },
            { title: "Entity" },
            { title: "Coordinates" },
            { title: "Layer Value", dividerAfter: true },
            { title: "Machining Information", dividerAfter: true },
            { title: "Number of Entitties" },
            { title: "Number of Parts" },
            { title: "Number of Ballons" },
            { title: "List of Groups" },
            { title: "Number of Arranged Sub Drawings", dividerAfter: true },
            { title: "View Information", dividerAfter: true },
            { title: "3D Drawing List" },
            { title: "Window Information" },
        ],
    },
    {
        title: "Set",
        children: [
            { title: "Drafting Properties..." },
            { title: "Properties..." },
            { title: "Drawing Properties" },
            { title: "View Switch Frame...", dividerAfter: true },
            { title: "3D Dimension Lines..." },
            { title: "3D Rotation" },
            { title: "3D Relative View" },
            { title: "3D Search Folder", dividerAfter: true },
            { title: "Coordinate Axis" },
            { title: "Display During Action", dividerAfter: true },
            { title: "Arc Display" },
            { title: "Simplify Display" },
            { title: "Material-based Display" },
            { title: "Set Light Source..." },
            { title: "Gradation", dividerAfter: true },
            { title: "Coordinate Display" },
            { title: "Switch Active Window" },
            { title: "Change 3D Views" },
            { title: "Screen Break", dividerAfter: true },
            { title: "Set Security", dividerAfter: true },
            { title: "Save The Position of the Application" },
        ]
    },
    {
        title: "Tools",
        children: [
            { title: "Auto-Group", dividerAfter: true },
            { title: "Grid", dividerAfter: true },
            { title: "Work Plane", dividerAfter: true },
            { title: "Enter Coordinates", dividerAfter: true },
            { title: "Measurer" },
        ]
    },
    {
        title: "Window",
        children: [
            { title: "Open" },
            { title: "Close All", dividerAfter: true },
            { title: "Split Display Vertically" },
            { title: "Split Display Horizontally" },
            { title: "Split into 4" },
            { title: "Revert to Original", dividerAfter: true },
            { title: "Tile Vertically" },
            { title: "Tile Horizontally" },
            { title: "Cascade" },
            { title: "Arrange Icons", dividerAfter: true },
            { title: "Vertical Coordination" },
            { title: "Horizontal Coordination" },
            { title: "Release Coordination", dividerAfter: true },
            { title: "" },
            { title: "" },
            { title: "", dividerAfter: true },
            { title: "1 NewDraw_1 User View 1" },
        ]
    },
    {
        title: "Help",
        children: [
            { title: "Content" },
            { title: "Tutorials" },
            { title: "Manuals", dividerAfter: true },
            { title: "Product information", dividerAfter: true },
            { title: "Version" },
        ]
    }
];