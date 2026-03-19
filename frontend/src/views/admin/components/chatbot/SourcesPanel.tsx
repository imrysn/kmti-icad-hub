import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, FileSpreadsheet, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { ChatSource, MediaAsset } from '../../../../services/searchService';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Single image card — clicking opens the lightbox
export const MediaCard: React.FC<{
    asset: MediaAsset;
    source: string;
    onOpen: (url: string, caption: string, source: string) => void;
}> = React.memo(({ asset, source, onOpen }) => {
    const url = `${API_BASE}/src/${asset.media_url}`;
    return (
        <div className="bubble-media-card" onClick={() => onOpen(url, asset.description || '', source)}>
            <img
                src={url}
                alt={asset.description || 'Reference image'}
                className="bubble-media-img"
                loading="lazy"
                title="Click to open"
            />
            {asset.description && (
                <p className="bubble-media-caption">{asset.description}</p>
            )}
            <span className="bubble-media-source">{source}</span>
        </div>
    );
});

MediaCard.displayName = 'MediaCard';

interface SourcesPanelProps {
    sources: ChatSource[];
    onOpenImage: (url: string, caption: string, source: string) => void;
    onOpenFile: (filename: string) => void;
}

export const SourcesPanel: React.FC<SourcesPanelProps> = ({ sources, onOpenImage, onOpenFile }) => {
    const [open, setOpen] = useState(false);
    if (sources.length === 0) return null;

    // Unique filenames across all sources
    const uniqueFiles = [...new Set(sources.map(s => s.source).filter(s =>
        s.toLowerCase().endsWith('.csv') || s.toLowerCase().endsWith('.xlsx')
    ))];

    return (
        <div className="chat-sources">
            <div className="sources-header-row">
                <button className="sources-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Toggle sources visibility">
                    <Search size={12} />
                    <span>Sources ({sources.length})</span>
                    {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                {uniqueFiles.length > 0 && (
                    <div className="sources-file-btns">
                        {uniqueFiles.map(f => (
                            <button key={f} className="source-file-btn" onClick={() => onOpenFile(f)} title={`Open ${f}`} aria-label={`Open file ${f}`}>
                                <FileSpreadsheet size={12} />
                                <span>{f}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {open && (
                <div className="sources-expanded">
                    {sources.map((src, idx) => {
                        const score = src.score !== null ? Math.max(0, src.score) : null;
                        const images = src.media?.filter(m => m.media_type === 'image') ?? [];
                        const videos = src.media?.filter(m => m.media_type === 'video') ?? [];

                        return (
                            <div key={idx} className="source-row">
                                <div className="source-row-header">
                                    <span className="source-name">
                                        {src.source.toLowerCase().endsWith('.xlsx') || src.source.toLowerCase().endsWith('.csv')
                                            ? <FileSpreadsheet size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                            : <FileText size={13} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                        }
                                        {src.source}
                                    </span>
                                    {score !== null && (
                                        <span className="source-score">{(score * 100).toFixed(0)}% Match</span>
                                    )}
                                </div>
                                <p className="source-content-preview">{src.content.slice(0, 200)}{src.content.length > 200 ? '…' : ''}</p>

                                {(images.length > 0 || videos.length > 0) && (
                                    <div className="source-media-badges">
                                        {images.length > 0 && (
                                            <span className="media-badge image">
                                                <ImageIcon size={10} /> {images.length} Image{images.length > 1 ? 's' : ''}
                                            </span>
                                        )}
                                        {videos.length > 0 && (
                                            <span className="media-badge video">
                                                <Video size={10} /> {videos.length} Video{videos.length > 1 ? 's' : ''}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {images.length > 0 && (
                                    <div className="source-images">
                                        {images.map((img, iIdx) => (
                                            <MediaCard key={iIdx} asset={img} source={src.source} onOpen={onOpenImage} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
