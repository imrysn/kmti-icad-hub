import React, { useState } from "react";
import coordinate1 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate1.png";
import coordinate2 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate2.png";
import coordinate3 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate3.png";
import coordinate4 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate4.png";
import coordinate5 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate5.png";
import coordinate6 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate6.png";
import coordinate7 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate7.png";
import coordinate8 from "../../../../../assets/Solidworks/Introduction/Solidwork_Coordinate8.png";

const coordinateImages = [
    { src: coordinate1, alt: "Front view", label: "Front" },
    { src: coordinate2, alt: "Back view", label: "Back" },
    { src: coordinate3, alt: "Left view", label: "Left" },
    { src: coordinate4, alt: "Right view", label: "Right" },
    { src: coordinate5, alt: "Top view", label: "Top" },
    { src: coordinate6, alt: "Bottom view", label: "Bottom" },
    { src: coordinate7, alt: "Isometric view", label: "Isometric" },
    { src: coordinate8, alt: "Trimetric view", label: "Trimetric" },
];

const CoordinateSystemContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div style={{ padding: '1rem 0', color: 'var(--text-color)' }}>
            <div className="instruction-step">
                <p className="p-flush" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    It shows the position of the 3D model. It is located at the lower-left area of the Graphics Area.
                </p>
                
                {/* Tabs */}
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    gap: '0.5rem', 
                    marginBottom: '2rem' 
                }}>
                    {coordinateImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: activeTab === idx ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: activeTab === idx ? '#fff' : 'var(--text-muted)',
                                border: '1px solid',
                                borderColor: activeTab === idx ? 'var(--primary)' : 'var(--glass-border)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontSize: '0.9rem',
                                fontWeight: activeTab === idx ? 600 : 400,
                            }}
                        >
                            {img.label}
                        </button>
                    ))}
                </div>

                {/* Active Image Display */}
                <div style={{
                    width: '100%',
                    padding: '2rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '300px'
                }}>
                    <img
                        src={coordinateImages[activeTab].src}
                        alt={coordinateImages[activeTab].alt}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '320px',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CoordinateSystemContent;
