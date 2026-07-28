import { useState } from "react";
import "./Menu_Setup_Theme/Menu_Setup_Theme.css";
import { menuData } from "./Menu_Data/menuData";

type Category = keyof typeof menuData;

export default function MenuSetup() {
    const [selected, setSelected] = useState<Category>("Function");

    const categories = Object.keys(menuData) as Category[];

    return (

        <div className="menu-setup-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h1>Menu Setup</h1>
            <p style={{ marginBottom: '2rem' }}>(Keywords)</p>


            <div className="menu-container">



                <div className="sidebar">

                    <h3>Categories</h3>

                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selected === category
                                    ? "category active"
                                    : "category"
                            }
                            onClick={() => setSelected(category)}
                        >
                            ▶ {category}
                        </button>
                    ))}

                </div>

                <div className="content">

                    <h2>{selected}</h2>

                    <table>

                        <thead>

                            <tr>
                                <th>Key</th>
                                <th>Command</th>
                            </tr>

                        </thead>

                        <tbody>
                            {menuData[selected].map((item) =>
                                item.shortcuts.map((shortcut, index) => (
                                    <tr key={`${item.key}-${index}`}>
                                        <td>{index === 0 ? item.key : ""}</td>
                                        <td>{shortcut.type}</td>
                                        <td>{shortcut.command}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>
            </div>
        </div >
    );
}