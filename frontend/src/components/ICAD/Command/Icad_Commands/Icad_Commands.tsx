import React, { useState } from "react";
import DrawDropdownLayout from "./DrawDropdownLayout/DrawDropdownLayout";
import DraftingDropdownLayout from "./DraftingDropdown/DraftingDropdownLayout";
import SubDrawingLibraryLayout from "./Sub_Drawing_Library/SubDrawingLibrary_Layout";


import DrawImg from "../../../../assets/Commands/Drawing.png";
import DraftingImg from "../../../../assets/Commands/Drafting.png";
import FolderImg from "../../../../assets/Commands/Folders.png";
import BoltImg from "../../../../assets/Commands/Bolt.png";
import WrenchHammerImg from "../../../../assets/Commands/Wrench_Hammer.png";
import TreeDiagramImg from "../../../../assets/Commands/Tree_diagram.png";
import CubeImg from "../../../../assets/Commands/Cube.png";
import WrenchHammerCubeImg from "../../../../assets/Commands/Wrench_Hammer_Cube.png";
import DNAChartImg from "../../../../assets/Commands/DNA_chart.png";
import CubeDocumentImg from "../../../../assets/Commands/Cube_Document.png";
import CubeBlockImg from "../../../../assets/Commands/Cube_block.png";
import PipeImg from "../../../../assets/Commands/Pipe.png";

const iconMap: Record<string, string> = {
    "Drawing.png": DrawImg,
    "Drafting.png": DraftingImg,
    "Folder.png": FolderImg,
    "Bolt.png": BoltImg,
    "Wrench_Hammer.png": WrenchHammerImg,
    "Tree_diagram.png": TreeDiagramImg,
    "Cube.png": CubeImg,
    "Wrench_Hammer_Cube.png": WrenchHammerCubeImg,
    "DNA_chart.png": DNAChartImg,
    "Cube_Document.png": CubeDocumentImg,
    "Cube_block.png": CubeBlockImg,
    "Pipe.png": PipeImg,
};

const getIconSrc = (fileName: string) => iconMap[fileName] ?? "";
const commands: string[] = ["Move", "Copy", "Properties", "Delete"];


export default function Icad_Commands() {
    const [activePanel, setActivePanel] = useState<'default' | 'draw' | 'drafting' | 'subDrawing'>('draw');
    const [selectedBtn, setSelectedBtn] = useState<string>("Drawing.png");

    const handleBtnClick = (btnName: string, panel: 'default' | 'draw' | 'drafting' | 'subDrawing') => {
        if (selectedBtn === btnName) {
            setSelectedBtn("");
            setActivePanel("default");
        } else {
            setSelectedBtn(btnName);
            setActivePanel(panel);
        }
    };

    return (
        <div className="draw-container" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            background: "#dbdbdbf5",
            border: "1px solid #c8cbd1c7",
            padding: "4px",
            width: "fit-content",
            fontFamily: "Tahoma, Verdana, sans-serif",
            boxSizing: "border-box",
        }}>

            <style>{`
                .icad-header {
                    width: 100%;
                    background: linear-gradient(to right, #000000ff, #000000ff);
                    color: #ffffff;
                    font-size: 11px;
                    font-weight: bold;
                    text-align: center;
                    padding: 4px 0;
                }
                .icon-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(4, auto);
                    width: fit-content;
                    padding: 8px;
                }
                .icon-btn {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background: #f4f4f4;
                    border: 1px solid #b8b8b8;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .icon-btn img {
                    width: 22px;
                    height: 22px;
                    object-fit: contain;
                }
                .icad-btn.active {
                    background: linear-gradient(to bottom, #4a90e2, #2a70c2);
                    color: #ffffff;
                    border-color: #003399;
                }
                .icad-btn:hover {
                    background: linear-gradient(to bottom, #e0e0e0, #c0c0c0);
                }
                .icad-content-panel {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    background: #ffffff;
                    border: 1px solid #d1d1d6;
                    border-radius: 4px;
                    padding: 8px;
                    min-width: 180px;
                    position: relative;
                }
                .icad-header {
                    font-weight: 600;
                    font-size: 0.85rem;
                    border-bottom: 1px solid #e5e5ea;
                    padding-bottom: 4px;
                    color: #1c1c1e;
                }
                .icad-cmd-list {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .icad-cmd-btn {
                    width: 100%;
                    text-align: left;
                    padding: 5px 8px;
                    background: #ffffff;
                    border: 1px solid #e5e5ea;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 0.75rem;
                    color: #333;
                    transition: background 0.15s;
                }
                .icad-cmd-btn:hover {
                     background: #f2f2f7;
                 }

                /* Container for image button grid and dropdown */
                .image-dropdown-container {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .dropdown-below {}
                .icad-sidebar-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 4px;
                }
                .icad-btn {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    background: #e0e0e0;
                    border: 1px solid #999;
                    border-radius: 3px;
                }
                .icad-btn.active {
                    background: #b0c4de;
                    border-color: #4a90e2;
                }
                .draw-header {
                    font-size: 16px;
                    color: #131313ff;
                }
            `}</style>

            <div className="draw-panel">

                <div className="icon-grid">

                    <button className="icon-btn" onClick={() => setActivePanel('draw')}>
                        <img src={getIconSrc("Drawing.png")} alt="Draw" width={22} height={22} />
                    </button>

                    <button className="icon-btn" onClick={() => setActivePanel('drafting')}>
                        <img src={getIconSrc("Drafting.png")} alt="Drafting" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("Folder.png")} alt="Folder" width={22} height={22} />
                    </button>

                    <button className="icon-btn" onClick={() => setActivePanel('subDrawing')}>
                        <img src={getIconSrc("Bolt.png")} alt="Bolt" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("Wrench_Hammer.png")} alt="Wrench_Hammer" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("Tree_diagram.png")} alt="Tree_diagram" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("Cube.png")} alt="Cube" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("Wrench_Hammer_Cube.png")} alt="Wrench_Hammer_Cube" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("DNA_chart.png")} alt="DNA_chart" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("Cube_Document.png")} alt="Cube_Document" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("Cube_block.png")} alt="Cube_block" width={22} height={22} />
                    </button>

                    <button className="icon-btn">
                        <img src={getIconSrc("Pipe.png")} alt="Pipe" width={22} height={22} />
                    </button>

                </div>

                <div className="draw-header">
                    {activePanel === "draw"
                        ? "Draw"
                        : activePanel === "drafting"
                            ? "Drafting"
                            : activePanel === "subDrawing"
                                ? "Sub Drawing /Library"
                                : "DRAW"}
                </div>

                <div className="command-grid">
                    {activePanel === "draw" ? (
                        <DrawDropdownLayout />
                    ) : activePanel === "drafting" ? (
                        <DraftingDropdownLayout />
                    ) : activePanel === "subDrawing" ? (
                        <SubDrawingLibraryLayout />
                    ) : activePanel === "default" ? (
                        commands.map((command) => (
                            <button
                                key={command}
                                className={`command-btn ${["Move", "Copy", "Properties", "Delete"].includes(command)
                                    ? "link"
                                    : ""
                                    }`}
                            >
                                {command}
                            </button>
                        ))
                    ) : null}
                </div>

            </div>

        </div>
    );


}
