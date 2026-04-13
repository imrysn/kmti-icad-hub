import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import './Overlays.css';

/* ─────────────────────────────────────────────────────────────────
   IMAGE LIGHTBOX
   Usage:
     <ImageLightbox images={[{url, caption, source}]} initialIndex={0} onClose={() => {}} />
───────────────────────────────────────────────────────────────── */

export interface LightboxImage {
    url: string;
    caption?: string;
    source?: string;
}

interface LightboxProps {
    images: LightboxImage[];
    initialIndex?: number;
    onClose: () => void;
}

export const ImageLightbox: React.FC<LightboxProps> = ({ images, initialIndex = 0, onClose }) => {
    const [idx, setIdx] = useState(initialIndex); const [scale, setScale] = useState(1);
    const current = images[idx];

    const prev = useCallback(() => { setIdx(i => (i - 1 + images.length) % images.length); setScale(1); }, [images.length]);
    const next = useCallback(() => { setIdx(i => (i + 1) % images.length); setScale(1); }, [images.length]);

    // Keyboard nav
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose, prev, next]);

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = current.url;
        a.download = current.caption || 'image';
        a.target = '_blank';
        a.click();
    };

    return (
        <div className="overlay-backdrop" onClick={onClose}>
            <div className="lightbox" onClick={e => e.stopPropagation()}>
                {/* Toolbar */}
                <div className="lightbox-toolbar">
                    <span className="lightbox-title">
                        {current.caption || 'Image'}
                        {current.source && <span className="lightbox-source">{current.source}</span>}
                    </span>
                    <div className="lightbox-actions">
                        <button onClick={() => setScale(s => Math.min(s + 0.25, 3))} title="Zoom in"><ZoomIn size={16} /></button>
                        <button onClick={() => setScale(s => Math.max(s - 0.25, 0.5))} title="Zoom out"><ZoomOut size={16} /></button>
                        <button onClick={() => setScale(1)} title="Reset zoom"><RotateCcw size={16} /></button>
                        <button onClick={handleDownload} title="Download"><Download size={16} /></button>
                        <button onClick={onClose} title="Close" className="lightbox-close"><X size={16} /></button>
                    </div>
                </div>

                {/* Image */}
                <div className="lightbox-stage">
                    {images.length > 1 && (
                        <button className="lightbox-nav prev" onClick={prev}><ChevronLeft size={22} /></button>
                    )}
                    <div className="lightbox-img-wrapper">
                        <img src={current.url} alt={current.caption || 'image'} style={{ transform: `scale(${scale})` }} className="lightbox-img" draggable={false} />
                    </div>
                    {images.length > 1 && (
                        <button className="lightbox-nav next" onClick={next}><ChevronRight size={22} /></button>
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="lightbox-thumbs">
                        {images.map((img, i) => (
                            <img key={i} src={img.url} alt={img.caption || ''} className={`lightbox-thumb ${i === idx ? 'active' : ''}`} onClick={() => { setIdx(i); setScale(1); }}
                            />
                        ))}
                    </div>
                )}

                {/* Counter */}
                {images.length > 1 && (
                    <div className="lightbox-counter">{idx + 1} / {images.length}</div>
                )}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────────
   FILE PREVIEW MODAL
   Usage:
     <FilePreviewModal filename="file.xlsx" onClose={() => {}} />
───────────────────────────────────────────────────────────────── */

interface FilePreviewProps {
    filename: string;
    onClose: () => void;
    onDownload: (filename: string) => void;
    onPreview: (filename: string) => Promise<any>;
}

export const FilePreviewModal: React.FC<FilePreviewProps> = ({ filename, onClose, onDownload, onPreview }) => {
    const [data, setData] = useState<any>(null); const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); const [activeSheet, setActiveSheet] = useState<string>(''); const [search, setSearch] = useState('');

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        onPreview(filename)
            .then(d => {
                setData(d);
                if (d.type === 'xlsx' && d.sheets) {
                    setActiveSheet(Object.keys(d.sheets)[0] || '');
                }
            })
            .catch((err) => setError(err.response?.data?.detail || 'Failed to load file preview.'))
            .finally(() => setLoading(false));
    }, [filename]);

    const getSheetData = () => {
        if (!data) return { headers: [], rows: [] };
        if (data.type === 'csv') return { headers: data.headers, rows: data.rows };
        if (data.type === 'xlsx' && activeSheet) return data.sheets[activeSheet] || { headers: [], rows: [] };
        return { headers: [], rows: [] };
    };

    const { headers, rows } = getSheetData();

    const filteredRows = search.trim()
        ? rows.filter((row: any) =>
            Object.values(row).some((v: any) =>
                String(v).toLowerCase().includes(search.toLowerCase())
            )
        )
        : rows;

    const ext = filename.split('.').pop()?.toLowerCase();
    const isPreviewable = ext === 'csv' || ext === 'xlsx';

    return (
        <div className="overlay-backdrop" onClick={onClose}>
            <div className="file-preview-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="fpm-header">
                    <div className="fpm-title">
                        <span className="fpm-ext-badge">{ext?.toUpperCase()}</span>
                        <span className="fpm-filename">{filename}</span>
                    </div>
                    <div className="fpm-actions">
                        <button className="fpm-btn" onClick={() => onDownload(filename)}>
                            <Download size={14} />
                        </button>
                        <button className="fpm-btn fpm-btn-close" onClick={onClose}>
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Sheet tabs for XLSX */}
                {data?.type === 'xlsx' && data.sheets && (
                    <div className="fpm-tabs">
                        {Object.keys(data.sheets).map(sheet => (
                            <button key={sheet} className={`fpm-tab ${activeSheet === sheet ? 'active' : ''}`} onClick={() => setActiveSheet(sheet)}
                            >
                                {sheet}
                            </button>
                        ))}
                    </div>
                )}

                {/* Search */}
                {isPreviewable && !loading && !error && rows.length > 0 && (
                    <div className="fpm-search-bar">
                        <input type="text" placeholder="Search in file..." value={search} onChange={e => setSearch(e.target.value)}
                            className="fpm-search"
                            autoFocus
                        />
                        <span className="fpm-row-count">
                            {filteredRows.length} / {rows.length} rows
                            {rows.length >= 500 && ' (preview capped at 500)'}
                        </span>
                    </div>
                )}

                {/* Content */}
                <div className="fpm-body">
                    {loading && (
                        <div className="fpm-state">
                            <div className="fpm-spinner" />
                            <span>Loading preview...</span>
                        </div>
                    )}
                    {error && (
                        <div className="fpm-state">
                            <div className="fpm-error">{error}</div>
                        </div>
                    )}
                    {!loading && !error && !isPreviewable && (
                        <div className="fpm-state">
                            <span>.{ext} files cannot be previewed in browser.</span>
                            <button className="fpm-btn" onClick={() => onDownload(filename)}>
                                <Download size={14} /> Download to view
                            </button>
                        </div>
                    )}
                    {!loading && !error && isPreviewable && filteredRows.length === 0 && (
                        <div className="fpm-state">No rows found{search ? ` matching "${search}"` : ''}.</div>
                    )}
                    {!loading && !error && isPreviewable && filteredRows.length > 0 && (
                        <div className="fpm-table-wrapper">
                            <table className="fpm-table">
                                <thead>
                                    <tr>
                                        <th className="fpm-row-num">#</th>
                                        {headers.map((h: string, i: number) => (
                                            <th key={i}>{h || <span className="fpm-empty-header">Col {i + 1}</span>}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRows.map((row: any, rIdx: number) => (
                                        <tr key={rIdx}>
                                            <td className="fpm-row-num">{rIdx + 1}</td>
                                            {headers.map((h: string, cIdx: number) => (
                                                <td key={cIdx} title={String(row[h] ?? '')}>
                                                    {String(row[h] ?? '')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
