import "./Icad_Guide_Theme/icadGuide.css";
import TitleBar from "./Title_Bar/TitleBar";
import Menu_Bar from "./Menu_Bar/Menu_Bar";
import ToolBar from "./Toolbar/Toolbar";
import CommandMenu from "./Command_Menu/commandMenu";
import Workspace from "./Workspace/Workspace";
import RightToolBar from "./Right_ToolBar/RightToolBar";
import CommandLine from "./Command_Line/commandLine";
import StatusBar from "./Status_Bar/StatusBar";
import Tree_View from "./Tree_View/Tree_View";

function Icad_Guide() {
    return (
        <div className="app">

            <TitleBar />

            <Menu_Bar />

            <ToolBar />

            <div className="center">

                <CommandMenu />

                <Tree_View />

                <Workspace />

                <RightToolBar />

            </div>

            <CommandLine />

            <StatusBar />

        </div>
    );
}

export default Icad_Guide;
