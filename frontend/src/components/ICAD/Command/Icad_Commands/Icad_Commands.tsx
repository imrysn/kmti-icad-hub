import Command_Menu_Japanese_Tutorial from './Command_Menu/Command_Menu';

interface Icad_CommandsProps {
    onExit?: () => void;
}

function Icad_Commands({ onExit }: Icad_CommandsProps) {
    return (
        <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-dark)" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Command_Menu_Japanese_Tutorial onExit={onExit} />
            </div>
        </div>
    );
}

export default Icad_Commands;
