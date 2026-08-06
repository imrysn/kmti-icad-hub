import React from 'react';
import ExitCourseButton from '../Exit_Course_Button/ExitCourseButton';
import Command_Menu_Japanese_Tutorial from './Command_Menu/Command_Menu';

function Icad_Commands() {

    return (
        <>
            <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <ExitCourseButton onExit={() => {
                }} />
                <div className="header" style={{
                    display: "flex", justifyContent: "center", alignItems: "center", padding: "9.6px", borderRadius: "10px", gap: "8px", fontFamily: "Outfit, sans-serif", fontSize: '40px', fontWeight: 'bold'
                }}>
                    Command Menu
                </div>

                <div style={{ width: "calc(100% - 40px)", maxWidth: "1200px", height: "1px", backgroundColor: "var(--border-color)", marginTop: "60px", margin: "0 auto", justifyContent: "center" }} />

                <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: "60px" }}>
                    <Command_Menu_Japanese_Tutorial />
                </div>
            </div>
        </>
    );
}

export default Icad_Commands;