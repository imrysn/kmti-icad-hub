export interface DraftingMenuItem {
    title: string;
    label?: string;
    children?: DraftingMenuItem[];
    image?: string; // Path or imported asset for the image
}

export const draftingMenu: DraftingMenuItem[] = [
    {
        title: "Linear",
        children: [
            {
                label: "Linear Dimensions",
                title: "Standard",
                children: [
                    {
                        title: "User Set Location",
                    },
                    {
                        title: "Position",
                    },
                    {
                        title: "Set Interval",
                    }
                ],
            },
            {
                title: "Series",
                children: [
                    {
                        title: "Create",
                    },
                    {
                        title: "Auto-Correct",
                    },
                    {
                        title: "Add",
                    },
                    {
                        title: "Join",
                    },
                    {
                        title: "USer Set Location",
                    },
                    {
                        title: "Position",
                    },
                    {
                        title: "Set Interval",
                    },
                    {
                        title: "Entity Direction",
                    },
                    {
                        title: "Horizontal",
                    },
                    {
                        title: "Vertical",
                    },
                    {
                        title: "None",
                    },
                    {
                        title: "O",
                    },
                    {
                        title: "phi",
                    },
                    {
                        title: "T",
                    },
                    {
                        title: "R",
                    },
                    {
                        title: "M",
                    },
                    {
                        title: "User Set Mark",
                    },
                    {
                        title: "1 Tier",
                    },
                    {
                        title: "2 Tier",
                    },
                    {
                        title: "Automatically Correct",
                    }
                ],
            },
            {
                title: "Progressive",
                children: [
                    {
                        title: "Create",
                        children: [
                            {
                                title: "User Set Location",
                            },
                            {
                                title: "Position",
                            },
                            {
                                title: "Set Interval",
                            },
                            {
                                title: "Vert. Note",
                            },
                            {
                                title: "Hori. Note",
                            },
                            {
                                title: "None",
                            },
                            {
                                title: "O",
                            },
                            {
                                title: "phi",
                            },
                            {
                                title: "T",
                            },
                            {
                                title: "R",
                            },
                            {
                                title: "M",
                            },
                            {
                                title: "User Set Mark",
                            },
                            {
                                title: "O Display",
                            },
                            {
                                title: "Hide",
                            },
                            {
                                title: "Auto-correct Arrangement",
                            }
                        ]
                    },
                    {
                        title: "Add",
                    },
                    {
                        title: "Additn Line",
                        children: [
                            {
                                title: "Add Bend",
                            },
                            {
                                title: "Change Bend",
                            },
                            {
                                title: "Delete Bend",
                            }
                        ]
                    },
                    {
                        title: "Correct Position",
                        children: [
                            {
                                title: "Correct",
                            },
                            {
                                title: "Release",
                            }
                        ]
                    },
                    {
                        title: "Delete",
                        children: [
                            {
                                title: "Partial",
                            },
                            {
                                title: "Batch",
                            }
                        ]
                    },
                ],
            },
            {
                title: "Die",
                children: [
                    {
                        title: "User Set Location",
                    },
                    {
                        title: "Position",
                    },
                    {
                        title: "Set Interval",
                    },
                    {
                        title: "None",
                    },
                    {
                        title: "O",
                    },
                    {
                        title: "phi",
                    },
                    {
                        title: "T",
                    },
                    {
                        title: "R",
                    },
                    {
                        title: "M",
                    },
                    {
                        title: "User Set Mark",
                    },
                    {
                        title: "O Display",
                    },
                    {
                        title: "Hide",
                    },
                    {
                        title: "Auto-correct Arrangement",
                    }
                ]
            },
            {
                title: "Center Line",
                children: [
                    {
                        title: "User Set Location",
                    },
                    {
                        title: "Position",
                    },
                    {
                        title: "Set Interval",
                    },
                    {
                        title: "None",
                    },
                    {
                        title: "O",
                    },
                    {
                        title: "phi",
                    },
                    {
                        title: "T",
                    },
                    {
                        title: "R",
                    },
                    {
                        title: "M",
                    },
                    {
                        title: "User Set Mark",
                    },
                    {
                        title: "User Set Char Position",
                    },
                    {
                        title: "Maintain Terminal Marks",
                    },
                ]
            },
            {
                title: "Parallel",
                children: [
                    {
                        title: "User Set Location",
                    },
                    {
                        title: "Position",
                    },
                    {
                        title: "Set Interval",
                    },
                    {
                        title: "Entity Direction",
                    },
                    {
                        title: "Horizontal",
                    },
                    {
                        title: "Vertical",
                    },
                    {
                        title: "None",
                    },
                    {
                        title: "O",
                    },
                    {
                        title: "phi",
                    },
                    {
                        title: "T",
                    },
                    {
                        title: "R",
                    },
                    {
                        title: "M",
                    },
                    {
                        title: "User Set Mark",
                    }
                ],
            },
            {
                title: "Basic",
                children: [
                    {
                        title: "User Set Location",
                    },
                    {
                        title: "Position",
                    },
                    {
                        title: "Set Interval",
                    },
                    {
                        title: "None",
                    },
                    {
                        title: "O",
                    },
                    {
                        title: "phi",
                    },
                    {
                        title: "T",
                    },
                    {
                        title: "R",
                    },
                    {
                        title: "M",
                    },
                    {
                        title: "User Set Mark",
                    }
                ]
            }
        ],
    },
    {
        title: "Circular",
        children: [
            {
                label: "Circular Dimensions",
                title: "Diameter",
                children: [
                    {
                        title: "Both Sides",
                        children: [
                            {
                                title: "phi"
                            },
                            {
                                title: "Old S phi"
                            },
                            {
                                title: "S phi"
                            },
                            {
                                title: "None"
                            },
                            {
                                title: "M"
                            },
                            {
                                title: "User Set"
                            },
                            {
                                title: "User Set Char Postion"
                            },
                            {
                                title: "Set Angle"
                            },
                            {
                                title: "Maintain Terminal Marks"
                            }
                        ]
                    },
                    {
                        title: "Leader",
                        children: [
                            {
                                title: "phi"
                            },
                            {
                                title: "Old S phi"
                            },
                            {
                                title: "S phi"
                            },
                            {
                                title: "None"
                            },
                            {
                                title: "M"
                            },
                            {
                                title: "User Set"
                            },
                            {
                                title: "Set Angle"
                            }
                        ]
                    },
                    {
                        title: "2 Point",
                        children: [
                            {
                                title: "User Set Location"
                            },
                            {
                                title: "Position"
                            },
                            {
                                title: "Set Interval"
                            },
                            {
                                title: "Entity Direction"
                            },
                            {
                                title: "Horizontal"
                            },
                            {
                                title: "Vertical"
                            },
                            {
                                title: "phi"
                            },
                            {
                                title: "Old S phi"
                            },
                            {
                                title: "S phi"
                            },
                            {
                                title: "None"
                            },
                            {
                                title: "M"
                            },
                            {
                                title: "User Set"
                            },
                            {
                                title: "User Set Char Position"
                            },
                            {
                                title: "Maintain Terminal Marks"
                            }
                        ]
                    },
                    {
                        title: "One Side",
                        children: [
                            {
                                title: "phi"
                            },
                            {
                                title: "Old S phi"
                            },
                            {
                                title: "S phi"
                            },
                            {
                                title: "None"
                            },
                            {
                                title: "M"
                            },
                            {
                                title: "User Set"
                            },
                            {
                                title: "User Set Char Position"
                            },
                            {
                                title: "Set Angle"
                            }
                        ]
                    },
                    {
                        title: "No Dim Line",
                        children: [
                            {
                                title: "phi"
                            },
                            {
                                title: "Old S phi"
                            },
                            {
                                title: "S phi"
                            },
                            {
                                title: "None"
                            },
                            {
                                title: "M"
                            },
                            {
                                title: "User SEt"
                            }
                        ]
                    },
                    {
                        title: "Center Line",
                        children: [
                            {
                                title: "User Set Location"
                            },
                            {
                                title: "Position"
                            },
                            {
                                title: "Set Interval"
                            },
                            {
                                title: "phi"
                            },
                            {
                                title: "Old S phi"
                            },
                            {
                                title: "S phi"
                            },
                            {
                                title: "None"
                            },
                            {
                                title: "M"
                            },
                            {
                                title: "User Set"
                            },
                            {
                                title: "User Set Char Position"
                            },
                            {
                                title: "Maintain Terminal Marks"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Radius"
            }
        ]
    },
    {
        title: "Angular",
        children: [
            {
                label: "Angular Dimensions",
                title: "Standard",
            },
            {
                title: "Horizontal",
            },
            {
                title: "Vertical",
            },
            {
                title: "Center Line",
            },
            {
                title: "User Ste Location",
            },
            {
                title: "Position",
            },
            {
                title: "Set Interval",
            },
            {
                title: "Normal",
            },
            {
                title: "Acute Angle",
            },
            {
                title: "Obtuse Angle",
            }
        ],
    },
    {
        title: "Chamfer",
        children: [
            {
                label: "Chamfer Dimensions",
                title: "Display Dimension Value"
            },
            {
                title: "Hide Dimension Values"
            },
            {
                title: "User Set Char Position"
            }
        ]
    },
    {
        title: "Dimention",
        children: [
            {
                label: "Other Dimensions",
                title: "OneSide",
                children: [
                    {
                        title: "User Set Location"
                    },
                    {
                        title: "Position"
                    },
                    {
                        title: "Set Interval"
                    },
                    {
                        title: "None"
                    },
                    {
                        title: "O"
                    },
                    {
                        title: "phi"
                    },
                    {
                        title: "T"
                    },
                    {
                        title: "R"
                    },
                    {
                        title: "M"
                    },
                    {
                        title: "User Set Mark"
                    },
                ]
            },
            {
                title: "Hole Angles",
            },
            {
                title: "Arc Length 1",
                children: [
                    {
                        title: "Entire Arc"
                    },
                    {
                        title: "Arc Section"
                    },
                    {
                        title: "User Set Location"
                    },
                    {
                        title: "Position"
                    },
                    {
                        title: "Set Interval"
                    },
                    {
                        title: "Display Arc Marks"
                    },
                    {
                        title: "Hide Arc Marks"
                    },
                ]
            },
            {
                title: "Coord",
                children: [
                    {
                        title: "Set Position"
                    },
                    {
                        title: "Set Angle"
                    }
                ]
            },
            {
                title: "Square",
                children: [
                    {
                        title: "Set Position"
                    },
                    {
                        title: "Set Angle"
                    }
                ]
            },
            {
                title: "Ovaloid",
                children: [
                    {
                        title: "Set Position"
                    },
                    {
                        title: "Set Angle"
                    }
                ]
            },
            {
                title: "Arc Length 2",
            }
        ]
    },
    {
        title: "Not Scale",
        children: [
            {
                label: "Not Scale",
                title: "Display Error"
            },
            {
                title: "Clear"
            },
            {
                title: "Extract"
            }
        ]
    },
    {
        title: "Edit",
        children: [
            {
                label: "Edit Drafting Entities",
                title: "Change Position",
                children: [
                    {
                        title: "Change Positioning"
                    },
                    {
                        title: "Vert. Invert"
                    },
                    {
                        title: "Char Angle"
                    },
                    {
                        title: "Hori. Invert"
                    },
                    {
                        title: "Auto-Position"
                    },
                ]
            },
            {
                title: "Change Attribute"
            },
            {
                title: "Term Mark",
                children: [
                    {
                        title: "Invert"
                    },
                    {
                        title: "Form"
                    }
                ]
            },
            {
                title: "Edit Chars",
                children: [
                    {
                        title: "Change Chars"
                    },
                    {
                        title: "Add Chars",
                        children: [
                            {
                                title: "Marks",
                                children: [
                                    {
                                        title: "phi"
                                    },
                                    {
                                        title: "S"
                                    },
                                    {
                                        title: "R"
                                    },
                                    {
                                        title: "Old S"
                                    },
                                    {
                                        title: "0"
                                    },
                                    {
                                        title: "*"
                                    },
                                    {
                                        title: "T"
                                    },
                                    {
                                        title: "M"
                                    },
                                    {
                                        title: "User Set Mark"
                                    }
                                ]
                            },
                            {
                                title: "Reference",
                                children: [
                                    {
                                        title: "Dimn Value"
                                    },
                                    {
                                        title: "Toler Value"
                                    }
                                ]
                            },
                            {
                                title: "Fit",
                                children: [
                                    {
                                        title: "Enter Tolerance Values"
                                    },
                                    {
                                        title: "Convert Tolerance Values"
                                    },
                                    {
                                        title: "Add Tolerance Values"
                                    },
                                    {
                                        title: "Add Brackets"
                                    },

                                ]
                            },
                            {
                                title: "Characters",
                                children: [
                                    {
                                        title: "Keep Characters"
                                    }
                                ]
                            },
                            {
                                title: "Char Motifs",
                                children: [
                                    {
                                        title: "Frame"
                                    },
                                    {
                                        title: "Under"
                                    },
                                    {
                                        title: "Amend"
                                    },
                                ]
                            },
                            {
                                title: "Toler Value",
                                children: [
                                    {
                                        title: "Add Brakets"
                                    }
                                ]
                            },
                            {
                                title: "Number"
                            },
                            {
                                title: "Inch Notation",
                                children: [
                                    {
                                        title: "Feet"
                                    },
                                    {
                                        title: "Inches"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: "Notation",
                        children: [
                            {
                                title: "Real Dimn"
                            },
                            {
                                title: "Deg Min Sec"
                            },
                            {
                                title: "Rounding"
                            },
                            {
                                title: "Display"
                            },
                            {
                                title: "Inch Notation"
                            },
                            {
                                title: "Scale"
                            },
                            {
                                title: "Change Decimal Point"
                            }
                        ]
                    },
                    {
                        title: "Delete Char",
                        children: [
                            {
                                title: "Marks"
                            },
                            {
                                title: "Reference",
                                children: [
                                    {
                                        title: "Dimn Values"
                                    },
                                    {
                                        title: "Toler Value"
                                    }
                                ]
                            },
                            {
                                title: "Fit"
                            },
                            {
                                title: "Characters"
                            },
                            {
                                title: "Char Motifs",
                                children: [
                                    {
                                        title: "Delete All"
                                    },
                                    {
                                        title: "Frame"
                                    },
                                    {
                                        title: "Under"
                                    },
                                    {
                                        title: "Amend"
                                    }
                                ]
                            },
                            {
                                title: "Toler Value"
                            },
                            {
                                title: "Number"
                            },
                            {
                                title: "Delete All"
                            },
                        ]
                    },
                ]
            },
            {
                title: "Leader Line",
                children: [
                    {
                        title: "Add"
                    },
                    {
                        title: "Delete"
                    },
                    {
                        title: "<"
                    },
                    {
                        title: "O"
                    },
                    {
                        title: "/"
                    },
                    {
                        title: "None"
                    },
                    {
                        title: "Set Form"
                    },
                    {
                        title: "Datum"
                    },
                ]
            },
            {
                title: "Additional Line",
                children: [
                    {
                        title: "Tilt"
                    },
                    {
                        title: "Display"
                    },
                    {
                        title: "Internal Trim"
                    },
                    {
                        title: "Delt Overlap"
                    },
                    {
                        title: "Trim"
                    },
                    {
                        title: "Join"
                    }
                ]
            },
        ]
    },
    {
        title: "Align",
        children: [
            {
                label: "Align Dimensions Entities",
                title: "Position",
                children: [
                    {
                        title: "Vert. Array"
                    },
                    {
                        title: "Hpri. Array"
                    }
                ]
            },
            {
                title: "Set Interval"
            },
            {
                title: "Actual Scale"
            },
            {
                title: "Actual Attribute",
                children: [
                    {
                        title: "Dimn Char"
                    },
                    {
                        title: "Character 1"
                    },
                    {
                        title: "Character 2"
                    },
                    {
                        title: "Character 3"
                    }
                ]
            }
        ]
    },
    {
        title: "Text",
        children: [
            {
                label: "Text",
                title: "Inside Frame",
                children: [
                    {
                        title: "Horizontal"
                    },
                    {
                        title: "Vertical"
                    },
                    {
                        title: "Distributed Horizontally"
                    },
                    {
                        title: "Left"
                    },
                    {
                        title: "Center"
                    },
                    {
                        title: "Right"
                    },
                    {
                        title: "Distributed Vertically"
                    },
                    {
                        title: "Top"
                    },
                    {
                        title: "Center"
                    },
                    {
                        title: "Bottom"
                    },
                    {
                        title: "Dimn Char"
                    },
                    {
                        title: "Character 1"
                    },
                    {
                        title: "Character 2"
                    },
                    {
                        title: "Character 3"
                    }
                ]
            },
            {
                title: "Edit Text",
                children: [
                    {
                        title: "Position",
                        children: [
                            {
                                title: "Vert. Array"
                            },
                            {
                                title: "Line Spacing"
                            },
                            {
                                title: "Hori. Array"
                            },
                            {
                                title: "String"
                            },
                            {
                                title: "Character"
                            }
                        ]
                    },
                    {
                        title: "Chg Frame",
                        children: [
                            {
                                title: "Distributed Horizontally"
                            },
                            {
                                title: "Left"
                            },
                            {
                                title: "Center"
                            },
                            {
                                title: "Right"
                            },
                            {
                                title: "Distributed Vertically"
                            },
                            {
                                title: "Top"
                            },
                            {
                                title: "Center"
                            },
                            {
                                title: "Bottom"
                            }
                        ]
                    },
                    {
                        title: "Change Size",
                        children: [
                            {
                                title: "Dimn Char"
                            },
                            {
                                title: "Character 1"
                            },
                            {
                                title: "Character 2"
                            },
                            {
                                title: "Character 3"
                            },
                            {
                                title: "User Set"
                            },
                            {
                                title: "Keep Character Size"
                            }
                        ]
                    },
                    {
                        title: "Chg String"
                    },
                    {
                        title: "Insert"
                    },
                    {
                        title: "New Spacing"
                    }
                ]
            },
            {
                title: "On Point",
                children: [
                    {
                        title: "Horizontal"
                    },
                    {
                        title: "Vertical"
                    },
                    {
                        title: "Up L"
                    },
                    {
                        title: "*"
                    },
                    {
                        title: "Up R"
                    },
                    {
                        title: "*"
                    },
                    {
                        title: "Center"
                    },
                    {
                        title: "*"
                    },
                    {
                        title: "Low L"
                    },
                    {
                        title: "*"
                    },
                    {
                        title: "Low R"
                    },
                    {
                        title: "Dimn Char"
                    },
                    {
                        title: "Character 1"
                    },
                    {
                        title: "Character 2"
                    },
                    {
                        title: "Character 3"
                    }
                ]
            }
        ]
    },
    {
        title: "Note",
        children: [
            {
                label: "Note",
                title: "Create",
                children: [
                    {
                        title: "Set Postion"
                    },
                    {
                        title: "Set Angle"
                    },
                    {
                        title: "Dimn Char"
                    },
                    {
                        title: "Character 1"
                    },
                    {
                        title: "Character 2"
                    },
                    {
                        title: "Character 3"
                    },
                    {
                        title: "<"
                    },
                    {
                        title: "O"
                    },
                    {
                        title: "/"
                    },
                    {
                        title: "None"
                    },
                    {
                        title: "Part Note"
                    }
                ]
            },
            {
                title: "Edit Notes",
                children: [
                    {
                        title: "Position"
                    },
                    {
                        title: "Change Position"
                    },
                    {
                        title: "Change Tlt"
                    },
                    {
                        title: "Chg String"
                    },
                    {
                        title: "Change Size"
                    },
                    {
                        title: "Term Mark"
                    },
                    {
                        title: "Vert. Array"
                    },
                    {
                        title: "Hori. Array"
                    }
                ]
            },
            {
                title: "Leader Line",
                children: [
                    {
                        title: "Add"
                    },
                    {
                        title: "Delete"
                    },
                    {
                        title: "Chg Arrow"
                    },
                    {
                        title: "Change Bend"
                    },
                    {
                        title: "<"
                    },
                    {
                        title: "O"
                    },
                    {
                        title: "/"
                    },
                    {
                        title: "None"
                    }
                ]
            }
        ]
    },
    {
        title: "Balloon",
        children: [
            {
                label: "Balloon",
                title: "Create",
                children: [
                    {
                        title: "Set Position"
                    },
                    {
                        title: "Set Angle"
                    },
                    {
                        title: "<"
                    },
                    {
                        title: "O"
                    },
                    {
                        title: "/"
                    },
                    {
                        title: "None"
                    },
                    {
                        title: "Part Balloon"
                    }
                ]
            },
            {
                title: "Edit Balloon",
                children: [
                    {
                        title: "Position",
                        children: [
                            {
                                title: "Vert. Array"
                            },
                            {
                                title: "Hori. Array"
                            }
                        ]
                    },
                    {
                        title: "Change Position",
                        children: [
                            {
                                title: "User Set Direction"
                            },
                            {
                                title: "Vertical"
                            },
                            {
                                title: "Horizontal"
                            },
                            {
                                title: "Hori. Invert"
                            },
                            {
                                title: "Vert. Invert"
                            }
                        ]
                    },
                    {
                        title: "Chg String"
                    },
                    {
                        title: "Add",
                        children: [
                            {
                                title: "PArt Balloon"
                            }
                        ]
                    },
                    {
                        title: "Delete"
                    },
                    {
                        title: "Change Diam"
                    },
                    {
                        title: "Term Mark",
                        children: [
                            {
                                title: "<"
                            },
                            {
                                title: "O"
                            },
                            {
                                title: "/"
                            },
                            {
                                title: "None"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Num Of Used",
                children: [
                    {
                        title: "Add"
                    },
                    {
                        title: "Delete"
                    }
                ]
            },
            {
                title: "Leader Line",
                children: [
                    {
                        title: "Add"
                    },
                    {
                        title: "Delete"
                    },
                    {
                        title: "Chg Arrow"
                    },
                    {
                        title: "Change Bend"
                    },
                    {
                        title: "<"
                    },
                    {
                        title: "O"
                    },
                    {
                        title: "/"
                    },
                    {
                        title: "None"
                    }
                ]
            }
        ]
    },
    {
        title: "Weld",
        children: [
            {
                label: "Weld Symbol",
                title: "Give Details"
            },
            {
                title: "Edit Weld",
                children: [
                    {
                        title: "Change Position",
                        children: [
                            {
                                title: "User Set"
                            },
                            {
                                title: "Hori. Invert"
                            },
                        ]
                    },
                    {
                        title: "Change Size",
                        children: [
                            {
                                title: "Give Details"
                            },
                            {
                                title: "No Details"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Weld Points"
            },
            {
                title: "Weld Note"
            },
            {
                title: "Route Intrvl"
            },
            {
                title: "Surf Prof"
            },
            {
                title: "Edit Appli"
            },
            {
                title: "No Details"
            },
            {
                title: "Perim Mark"
            },
            {
                title: "Groove Dep"
            },
            {
                title: "Len/Width"
            },
            {
                title: "Groove Angle"
            },
            {
                title: "Finishing"
            },
            {
                title: "Leader Line"
            }
        ]
    },
    {
        title: "Tolerance",
        children: [
            {
                label: "Geometric Tolerance"
                , title: "Tolerance",
                children: [
                    {
                        title: "Standard"
                    },
                    {
                        title: "Set Dimn"
                    },
                    {
                        title: "Direct"
                    },
                    {
                        title: "Perf Circle"
                    },
                    {
                        title: "Profile"
                    },
                    {
                        title: "Parallel"
                    },
                    {
                        title: "Tilt"
                    },
                    {
                        title: "Coaxial"
                    },
                    {
                        title: "Rad Run Out"
                    },
                    {
                        title: "Plane"
                    },
                    {
                        title: "Cylinder"
                    },
                    {
                        title: "Face Profile"
                    },
                    {
                        title: "Right Angle"
                    },
                    {
                        title: "Position"
                    },
                    {
                        title: "Symmetric"
                    },
                    {
                        title: "Total Run Out"
                    },
                    {
                        title: "None"
                    },
                    {
                        title: "phi"
                    },
                    {
                        title: "S phi"
                    },
                    {
                        title: "Sphere phi"
                    },
                    {
                        title: "0"
                    }
                ]
            },
            {
                title: "Datum"
            },
            {
                title: "Edit Toler"
            },
            {
                title: "Toler Note"
            },
            {
                title: "Set Form"
            },
            {
                title: "Appli Toler"
            },
            {
                title: "Leader Line"
            },
            {
                title: "Marks"
            }
        ]
    },
    {
        title: "Texture"
    },
    {
        title: "Symbols",
        children: [
            {
                label: "Other Symbol",
                title: "Arrow View"
            },
            {
                title: "Symbol",
                children: [
                    {
                        title: "Create"
                    }
                ]
            },
            {
                title: "Finish Marks",
                children: [
                    {
                        title: "3 Triangles"
                    }
                ]
            },
            {
                title: "Cutting Line",
                children: [
                    {
                        title: "Create"
                    },
                    {
                        title: "Edit Name"
                    },
                    {
                        title: "Cut Mark"
                    },
                    {
                        title: "With Arrow"
                    },
                    {
                        title: "No Arrow"
                    },
                    {
                        title: "Cross Section Line"
                    }
                ]
            },
            {
                title: "Arrow",
                children: [
                    {
                        title: "Create"
                    },
                    {
                        title: "Change Position"
                    }
                ]
            },
            {
                title: "Delta"
            },
            {
                title: "Create"
            },
            {
                title: "Name"
            },
            {
                title: "1 Triangle"
            },
            {
                title: "2 Triangles"
            },
            {
                title: "3 Triangles"
            },
            {
                title: "4 Triangles"
            },
            {
                title: "Wave"
            }
        ]
    },
    {
        title: "Hatch",
        children: [
            {
                label: "Hatch",
                title: "Create",
                children: [
                    {
                        title: "Set Area"
                    },
                    {
                        title: "Add Shadow"
                    },
                    {
                        title: "Set Entity"
                    },
                    {
                        title: ""
                    },
                    {
                        title: ""
                    },
                    {
                        title: ""
                    },
                    {
                        title: ""
                    },
                    {
                        title: ""
                    },
                    {
                        title: ""
                    },
                    {
                        title: ""
                    },
                    {
                        title: ""
                    },
                    {
                        title: "Add Patterns"
                    },
                    {
                        title: "Reflect Scale"
                    }
                ]
            },
            {
                title: "Open Hole"
            },
            {
                title: "Hatch To Ln"
            },
            {
                title: "Attributes"
            },
            {
                title: "Trim Chars"
            },
            {
                title: "Change Attribute"
            },
            {
                title: "New Pattern"
            }
        ]
    },
    {
        title: "Correct"
    },
    {
        title: "Auto Balloon",
        children: [
            {
                label: "Auto Create Balloon",
                title: "Auto-arrange Balloons"
            },
            {
                title: "Create"
            },
            {
                title: "Total Number Used"
            },
            {
                title: "Auto-change Arrows"
            },
            {
                title: "Spacing"
            },
            {
                title: "Same Angle"
            },
            {
                title: "Set Angle"
            }
        ]
    },
    {
        title: "Move"
    },
    {
        title: "Copy"
    },
    {
        title: "Properties"
    },
    {
        title: "Delete"
    }

];