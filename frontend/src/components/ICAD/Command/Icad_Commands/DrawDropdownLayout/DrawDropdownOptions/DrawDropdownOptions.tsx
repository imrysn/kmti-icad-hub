export interface DrawMenuItem {
    title: string;
    children?: DrawMenuItem[];
}
export const drawingMenu: DrawMenuItem[] = [
    {
        title: "Line",
        children: [
            {
                title: "2 Point"
            },
            {
                title: "Pass Point"
            },
            {
                title: "Horizontal"
            },
            {
                title: "Vertical"
            },
            {
                title: "Limited"
            },
            {
                title: "Unlimited"
            },
            {
                title: "From Center"
            },
            {
                title: "Round Coord"
            }
        ]
    },
    {
        title: "Horizontal",
        children: [
            {
                title: "Limited"
            },
            {
                title: "Unlimited"
            },
            {
                title: "From Center"
            },
        ]
    },
    {
        title: "Angled",
        children: [
            {
                title: "Absolute Ang"
            },
            {
                title: "Relative Ang"
            },
            {
                title: "Limited"
            },
            {
                title: "Unlimited"
            },
            {
                title: "From Center"
            }
        ]
    },
    {
        title: "Circle",
        children: [
            {
                title: "Create"
            },
            {
                title: "Change Dia"
            },
            {
                title: "Set Radius"
            },
            {
                title: "Set Diameter"
            }
        ]
    },
    {
        title: "Text",
        children: [
            {
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
                        title: "LowR"
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
                title: "On Point",
                children: [
                    {
                        title: "Position",
                        children: [
                            {
                                title: "Vert. Array"
                            },
                            {
                                title: "Hori. Array"
                            },
                            {
                                title: "Line Spacing"
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
                                title: "Distributed Horizontaly"
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
                                title: "Right"
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
            }
        ]
    },
    {
        title: "Trim/Join",
        children: [
            {
                title: "Trim"
            },
            {
                title: "Divide"
            },
            {
                title: "2 Point Trim"
            },
            {
                title: "Join"
            },
            {
                title: "Single Proc"
            },
            {
                title: "Batch Proc"
            },
            {
                title: "Set Entity Length"
            },
            {
                title: "Trim Consecutively"
            },

        ]
    },
    {
        title: "Fillet",
        children: [
            {
                title: "Between 2 Entities"
            },
            {
                title: "Between 3 Entities"
            },
            {
                title: "Trim All"
            },
            {
                title: "Trim Entity 1"
            },
            {
                title: "Trim Entity 2"
            },
            {
                title: "No Trim"
            },
            {
                title: "Leave FIne Lines"
            },
            {
                title: "Draftline"
            },
            {
                title: "No Draftline"
            }
        ]
    },
    {
        title: "Smart Trim",
        children: [
            {
                title: "Adjust Angles",
                children: [
                    {
                        title: "Draftline"
                    },
                    {
                        title: "No Draftline"
                    }
                ]
            },
            {
                title: "Rounding",
                children: [
                    {
                        title: "Trim All"
                    },
                    {
                        title: "Trim Entity 1"
                    },
                    {
                        title: "Trim Entity 2"
                    },
                    {
                        title: "No Trim"
                    },
                    {
                        title: "Leave Fine Lines"
                    },
                    {
                        title: "Draftline"
                    },
                    {
                        title: "No Draftline"
                    }
                ]
            },
            {
                title: "Chamfering",
                children: [
                    {
                        title: "Trim All"
                    },
                    {
                        title: "Trim Entity 1"
                    },
                    {
                        title: "Trim Entity 2"
                    },
                    {
                        title: "No Trim"
                    },
                    {
                        title: "Leave Fine Lines"
                    },
                    {
                        title: "Draftline"
                    },
                    {
                        title: "No Draftline"
                    }
                ]
            }
        ]
    },
    {
        title: "Smart Edit",
        children: [
            {
                title: "Partially Hide Lines",
                children: [
                    {
                        title: "One Side"
                    },
                    {
                        title: "All"
                    },
                    {
                        title: "Internal Trim"
                    },
                    {
                        title: "Hidden Lines"
                    },
                    {
                        title: "Delete"
                    }
                ]
            },
            {
                title: "Relief Form",
                children: [
                    {
                        title: "With Trimming"
                    },
                    {
                        title: "Without Trimming"
                    }
                ]
            },
            {
                title: "Disassemble Entities"
            },
            {
                title: "Fix Volume",
                children: [
                    {
                        title: "Select Enty"
                    },
                    {
                        title: "One Side"
                    },
                    {
                        title: "Both Side"
                    },
                    {
                        title: "Slave Entity"
                    },
                    {
                        title: "Off Set"
                    }
                ]
            },
            {
                title: "Delete Duplicates"
            },
            {
                title: "Extract From Inside Area"
            },
            {
                title: "One Sine"
            },
            {
                title: "All"
            },
            {
                title: "Internal Trim"
            },
            {
                title: "Hidden Lines"
            },
            {
                title: "Delete"
            }
        ]
    },
    {
        title: "Move",
        children: [
            {
                title: "Move In PArallel",
                children: [
                    {
                        title: "Arrange Consecutively"
                    }
                ]
            },
            {
                title: "Rotate And Move"
            },
            {
                title: "Mirror Movement"
            },
            {
                title: "Scaling",
                children: [
                    {
                        title: "MAintain Dimension Values"
                    },
                    {
                        title: "Keep Character Size"
                    }
                ]
            }
        ]
    },
    {
        title: "Properties",
        children: [
            {
                title: "Any Entity"
            },
            {
                title: "Drawing Enty"
            },
            {
                title: "Dimension"
            },
            {
                title: "Character"
            },
            {
                title: "Layer"
            },
            {
                title: "Do Not Set"
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
                title: "<<"
            },
            {
                title: ">>"
            },
            {
                title: "Refer To Attributes"
            },
        ]
    },
    {
        title: "Parallel",
        children: [
            {
                title: "Parallel"
            },
            {
                title: "Intersection"
            },
            {
                title: "Single Proc"
            },
            {
                title: "Repeat Proc"
            },
            {
                title: "Limited"
            },
            {
                title: "Unlimited"
            },
            {
                title: "From Center"
            },
            {
                title: "Round Coord"
            }
        ]
    },
    {
        title: "Vertical",
        children: [
            {
                title: "Limited"
            },
            {
                title: "Unlimited"
            },
            {
                title: "From Center"
            }
        ]
    },
    {
        title: "Spine",
        children: [
            {
                title: "Create",
                children: [
                    {
                        title: "Natural"
                    },
                    {
                        title: "Cycle"
                    },
                    {
                        title: "Fixed",
                        children: [
                            {
                                title: "Strat Angle"
                            },
                            {
                                title: "End Angle"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Edit",
                children: [
                    {
                        title: "Change Route"
                    },
                    {
                        title: "Change Status",
                        children: [
                            {
                                title: "Natural"
                            },
                            {
                                title: "Cycle"
                            },
                            {
                                title: "Fixed",
                                children: [
                                    {
                                        title: "Strat Angle"
                                    },
                                    {
                                        title: "End Angle"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: "Display Interpolation Pt"
                    }
                ]
            }
        ]
    },
    {
        title: "3 Point Circle",
        children: [
            {
                title: "Create"
            },
            {
                title: "Change Dia"
            },
            {
                title: "Set Radius"
            },
            {
                title: "Set Diameter"
            }
        ]
    },
    {
        title: "Smart Draw",
        children: [
            {
                title: "Poly Line",
                children: [
                    {
                        title: "Round Coord"
                    }
                ]
            },
            {
                title: "Rectangle",
                children: [
                    {
                        title: "End Point"
                    },
                    {
                        title: "Center"
                    },
                    {
                        title: "Set Length"
                    },
                    {
                        title: "Set 2 Points"
                    }
                ]
            },
            {
                title: "Spaced Line",
                children: [
                    {
                        title: "Keep Length"
                    },
                    {
                        title: "Unlimited"
                    }
                ]
            },
            {
                title: "Spaced Cir...",
                children: [
                    {
                        title: "Keep Angle"
                    },
                    {
                        title: "Make Circle"
                    }
                ]
            },
            {
                title: "Center Line",
                children: [
                    {
                        title: "With Offset"
                    },
                    {
                        title: "Without Offset"
                    },
                    {
                        title: "Length"
                    },
                    {
                        title: "Ratio"
                    }
                ]
            },
            {
                title: "Arc",
                children: [
                    {
                        title: "Create",
                        children: [
                            {
                                title: "Set Radius"
                            },
                            {
                                title: "Set Diameter"
                            },
                            {
                                title: "Set Center"
                            },
                            {
                                title: "Set Start"
                            }
                        ]
                    },
                    {
                        title: "Change Dia",
                        children: [
                            {
                                title: "Set Radius"
                            },
                            {
                                title: "Set Diameter"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Ellipse 1",
                children: [
                    {
                        title: "Set Radius"
                    },
                    {
                        title: "Set Diameter"
                    }
                ]
            },
            {
                title: "Ellipse 2"
            },
            {
                title: "Column Sect",
                children: [
                    {
                        title: "Real Section"
                    },
                    {
                        title: "Profile"
                    },
                    {
                        title: "Radius"
                    },
                    {
                        title: "Diameter"
                    }
                ]
            },
            {
                title: "Break Line 1",
                children: [
                    {
                        title: "Wave",
                        children: [
                            {
                                title: "User Set"
                            },
                            {
                                title: "Horizontal"
                            },
                            {
                                title: "Vertical",
                                children: [
                                    {
                                        title: "One Side"
                                    },
                                    {
                                        title: "Both Sides"
                                    },
                                    {
                                        title: "Divide"
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        title: "Zig-Zag"
                    },
                    {
                        title: "Break Mark",
                        children: [
                            {
                                title: "One Side"
                            },
                            {
                                title: "Both Sides"
                            },
                            {
                                title: "Divide"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Break Line 2",
                children: [
                    {
                        title: "Wave",
                        children: [
                            {
                                title: "User Set"
                            },
                            {
                                title: "Horizontal"
                            },
                            {
                                title: "Vertical",
                                children: [
                                    {
                                        title: "One Side"
                                    },
                                    {
                                        title: "Both Sides"
                                    },
                                    {
                                        title: "Divide"
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        title: "Zig-Zag"
                    },
                    {
                        title: "Break Mark",
                        children: [
                            {
                                title: "One Side"
                            },
                            {
                                title: "Both Sides"
                            },
                            {
                                title: "Divide"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: "Offset",
        children: [
            {
                title: "Batch",
                children: [
                    {
                        title: "One Side",
                        children: [
                            {
                                title: "Enter Absolute Width"
                            },
                            {
                                title: "Enter Relative Width"
                            },
                            {
                                title: "Delete Original Drawing"
                            },
                            {
                                title: "Keep Attribute"
                            },
                            {
                                title: "KEep Layer"
                            },
                        ]
                    },
                    {
                        title: "Both Sides",
                        children: [
                            {
                                title: "Offset Width"
                            },
                            {
                                title: "Sysmmetric Width"
                            },
                            {
                                title: "Enter Absolute Width"
                            },
                            {
                                title: "Enter Relative Width"
                            },
                            {
                                title: "Delete Original Drawing"
                            },
                            {
                                title: "Keep Attribute"
                            },
                            {
                                title: "Keep Layer"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Individual",
                children: [
                    {
                        title: "One Side",
                        children: [
                            {
                                title: "Enter Absolute Width"
                            },
                            {
                                title: "Enter Relative Width"
                            },
                            {
                                title: "Consecutive"
                            },
                            {
                                title: "Delete Original Drawing"
                            },
                            {
                                title: "Keep Attribute"
                            },
                            {
                                title: "KEep Layer"
                            },
                        ]
                    },
                    {
                        title: "Both Siides",
                        children: [
                            {
                                title: "Offset Width"
                            },
                            {
                                title: "Sysmmetric Width"
                            },
                            {
                                title: "Enter Absolute Width"
                            },
                            {
                                title: "Enter Relative Width"
                            },
                            {
                                title: "Consecutive"
                            },
                            {
                                title: "Delete Original Drawing"
                            },
                            {
                                title: "Keep Attribute"
                            },
                            {
                                title: "Keep Layer"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: "Chamfer",
        children: [
            {
                title: "Trim All"
            },
            {
                title: "Trim Entity 1"
            },
            {
                title: "Trim Entity 2"
            },
            {
                title: "No Trim"
            },
            {
                title: "Leave Fine Lines"
            },
            {
                title: "Draftline"
            },
            {
                title: "No Draftline"
            }
        ]
    },
    {
        title: "Stretch",
        children: [
            {
                title: "Set Direction"
            },
            {
                title: "Axisymme.."
            },
            {
                title: "Entity Length"
            }
        ]
    },
    {
        title: "Parametric",
        children: [
            {
                title: "Process Variables"
            },
            {
                title: "SEt Attributes"
            },
            {
                title: "Set Area"
            },
            {
                title: "Confirm Variable Entities"
            },
            {
                title: "Add"
            },
            {
                title: "Cancel"
            },
            {
                title: "Change"
            }
        ]
    },
    {
        title: "Copy",
        children: [
            {
                title: "Parallel Copy",
                children: [
                    {
                        title: "Arrange Consecutively"
                    },
                    {
                        title: "Delt Original"
                    },
                    {
                        title: "Keep Attribute"
                    },
                    {
                        title: "Keep Layer"
                    },
                    {
                        title: "Keep Groups"
                    }
                ]
            },
            {
                title: "Rotation Copy"
            },
            {
                title: "Mirror Copy",
                children: [
                    {
                        title: "Delt Original"
                    },
                    {
                        title: "Keep Attribute"
                    },
                    {
                        title: "Keep Layer"
                    },
                    {
                        title: "Keep Groups"
                    }
                ]
            },
            {
                title: "Copy Between Windows",
                children: [
                    {
                        title: "Delt Original"
                    },
                    {
                        title: "Keep Attribute"
                    },
                    {
                        title: "Keep Layer"
                    },
                    {
                        title: "Keep Groups"
                    },
                    {
                        title: "Keep SubDraw"
                    }
                ]
            },
            {
                title: "Copy View"
            },
            {
                title: "Scaling Copy",
                children: [
                    {
                        title: "Maintain Dimension Values"
                    },
                    {
                        title: "Keep Character Size"
                    },
                    {
                        title: "Delete Original Drawing"
                    },
                    {
                        title: "Keep Attribute"
                    },
                    {
                        title: "Keep Layer"
                    },
                    {
                        title: "Keep Groups"
                    }
                ]
            }
        ]
    },
    {
        title: "Delete",
        children: [
            {
                title: "User Set"
            },
            {
                title: "Type"
            }
        ]
    }
];