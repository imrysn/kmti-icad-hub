import React from "react";
import keyboardCommon from "../../../../../assets/Solidworks/3D_Fv/SolidworkKeyboard1.png";
import keyboardSolidworks from "../../../../../assets/Solidworks/3D_Fv/Solidwork_Keyboard2.png";

// Suppress unused variable warnings — images reserved for future use or reference
void keyboardCommon;
void keyboardSolidworks;

const KeyboardShortcutsContent: React.FC = () => (
    <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
        <div className="instruction-step" style={{ paddingLeft: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', marginTop: "1rem", flexWrap: 'wrap' }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                    <div className="lesson-table-container" style={{ width: '350px' }}>
                        <table className="lesson-table">
                            <thead>
                                <tr>
                                    <th>Shortcut</th>
                                    <th>Command</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Ctrl + N</td><td>New</td></tr>
                                <tr><td>Ctrl + O</td><td>Open</td></tr>
                                <tr><td>Ctrl + S</td><td>Save</td></tr>
                                <tr><td>Ctrl + C</td><td>Copy</td></tr>
                                <tr><td>Ctrl + V</td><td>Paste</td></tr>
                                <tr><td>Ctrl + Z</td><td>Undo</td></tr>
                                <tr><td>Ctrl + Y</td><td>Redo</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ maxWidth: '350px' }}>
                        <p className="p-flush red-text">※ These are the commonly used keyboard shortcuts, it can be used not only in Solidworks but to other softwares as well.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                    <div className="lesson-table-container" style={{ width: '350px' }}>
                        <table className="lesson-table">
                            <thead>
                                <tr>
                                    <th>Shortcut</th>
                                    <th>Command</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Spacebar</td><td>View Orientation</td></tr>
                                <tr><td>Ctrl + b</td><td>Rebuild</td></tr>
                                <tr><td>f</td><td>Fit to view</td></tr>
                                <tr><td>g</td><td>Magnify</td></tr>
                                <tr><td>l</td><td>Line</td></tr>
                                <tr><td>m</td><td>Measure</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ maxWidth: '350px' }}>
                        <p className="p-flush red-text">※ It is the commonly used shortcuts in SolidWorks.</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

export default KeyboardShortcutsContent;
