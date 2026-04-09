import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, Users, Zap, Clock, TrendingUp, Search, Trash2, RefreshCw, ChevronLeft, ChevronRight, Brain, FileText, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Database, X, FileUp, AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { adminService, KBFile } from '../../../services/adminService'; import { useUI } from '../../../context/UIContext';
import { useNotification } from '../../../context/NotificationContext';
import '../../../styles/IntelligenceHub.css';

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */

interface ChatLogEntry {
    id: number;
    username: string;
    message: string;
    answer: string;
    sources_used: string | null;
    source_count: number;
    tokens_estimated: number;
    response_time_ms: number;
    had_media: boolean;
    created_at: string;
}

interface Stats {
    total_queries: number;
    total_tokens_estimated: number;
    avg_response_ms: number;
    top_users: { username: string; count: number }[];
    queries_per_day: { day: string; count: number }[];
    top_sources: { source: string; count: number }[];
}

interface FeedbackStats {
    total_up: number;
    total_down: number;
    satisfaction_rate: number | null;
    worst_rated: { log_id: number; message: string; down_count: number }[];
}

interface CacheStats {
    total_entries: number;
    active_entries: number;
    total_hits_saved: number;
    top_cached_queries: { query: string; hits: number; expires_at: string }[];
}

const PAGE_SIZE = 20;

/* ─────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────── */

const MiniBar: React.FC<{ value: number; max: number; color?: string }> = ({ value, max, color = 'var(--color-accent,#6366f1)' }) => (
    <div className="ih-mini-bar-track">
        <div className="ih-mini-bar-fill" style={{ width: `${max > 0 ? (value / max) * 100 : 0}%`, background: color }} />
    </div>
);

const LogRow: React.FC<{ log: ChatLogEntry; onDelete: (id: number) => void }> = ({ log, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const time = new Date(log.created_at).toLocaleString();
    const sources = log.sources_used ? log.sources_used.split(',').filter(Boolean) : [];

    return (
        <>
            <tr className={`ih-log-row ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(e => !e)}>
                <td className="ih-log-time">{time}</td>
                <td><span className="ih-username">{log.username}</span></td>
                <td className="ih-log-message">{log.message}</td>
                <td className="ih-center">{log.source_count}</td>
                <td className="ih-center">{log.tokens_estimated}</td>
                <td className="ih-center">{log.response_time_ms}ms</td>
                <td className="ih-center">
                    {log.had_media ? <span className="ih-badge ih-badge-media">media</span> : <span className="ih-badge ih-badge-text">text</span>}
                </td>
                <td className="ih-center">
                    <div className="ih-row-actions">
                        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        <button className="ih-icon-btn ih-delete-btn" onClick={e => { e.stopPropagation(); onDelete(log.id); }} title="Delete">
                            <Trash2 size={12} />
                        </button>
                    </div>
                </td>
            </tr>
            {expanded && (
                <tr className="ih-log-detail-row">
                    <td colSpan={8}>
                        <div className="ih-log-detail">
                            <div className="ih-detail-col">
                                <p className="ih-detail-label"><MessageSquare size={11} /> Question</p>
                                <p className="ih-detail-text">{log.message}</p>
                            </div>
                            <div className="ih-detail-col">
                                <p className="ih-detail-label"><Brain size={11} /> AI Answer</p>
                                <p className="ih-detail-text">{log.answer}</p>
                            </div>
                            {sources.length > 0 && (
                                <div className="ih-detail-col ih-detail-col-full">
                                    <p className="ih-detail-label"><FileText size={11} /> Sources</p>
                                    <div className="ih-source-chips">
                                        {sources.map((s, i) => <span key={i} className="ih-source-chip">{s}</span>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export const KnowledgeManagement: React.FC = () => {
    const { requestConfirmation } = useUI();
    const { showNotification } = useNotification();
    
    // ── Analytics state ──
    const [stats, setStats] = useState<Stats | null>(null);
    const [feedbackStats, setFeedbackStats] = useState<FeedbackStats | null>(null);
    const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
    const [logs, setLogs] = useState<ChatLogEntry[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0); 
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState(''); 
    const [statsLoading, setStatsLoading] = useState(true);
    const [logsLoading, setLogsLoading] = useState(true); 
    const [clearingCache, setClearingCache] = useState(false);

    // ── KB state ──
    const [files, setFiles] = useState<KBFile[]>([]); 
    const [kbLoading, setKbLoading] = useState(true);
    const [uploading, setUploading] = useState(false); 
    const [dragActive, setDragActive] = useState(false);
    const [kbExpanded, setKbExpanded] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    /* ── Fetchers ── */
    const fetchStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const [s, fb, cache] = await Promise.all([
                adminService.getChatLogStats(),
                adminService.getFeedbackStats(),
                adminService.getCacheStats(),
            ]);
            setStats(s);
            setFeedbackStats(fb);
            setCacheStats(cache);
        } catch { /* silent */ }
        finally { setStatsLoading(false); }
    }, []);

    const fetchLogs = useCallback(async () => {
        setLogsLoading(true);
        try {
            const data = await adminService.getChatLogs({ limit: PAGE_SIZE, offset: page * PAGE_SIZE, username: search || undefined });
            setLogs(data.logs);
            setTotal(data.total);
        } catch { /* silent */ }
        finally { setLogsLoading(false); }
    }, [page, search]);

    const fetchFiles = useCallback(async () => {
        setKbLoading(true);
        try { setFiles(await adminService.getKBFiles()); }
        catch { showNotification('Failed to load knowledge base files.', 'error'); }
        finally { setKbLoading(false); }
    }, [showNotification]);

    useEffect(() => { fetchStats(); }, [fetchStats]);
    useEffect(() => { fetchLogs(); }, [fetchLogs]);
    useEffect(() => { fetchFiles(); }, [fetchFiles]);

    /* ── KB handlers ── */
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) await handleUpload(Array.from(e.dataTransfer.files));
    };

    const handleUpload = async (filesToUpload: File[]) => {
        const valid = filesToUpload.filter(f => f.name.endsWith('.xlsx') || f.name.endsWith('.csv') || f.name.endsWith('.py'));
        if (!valid.length) { showNotification('Only .xlsx, .csv, and .py files are supported.', 'warning'); return; }
        setUploading(true);
        try {
            await adminService.uploadKBFiles(valid);
            showNotification(`Uploaded ${valid.length} file(s) successfully`, 'success');
            fetchFiles();
        } catch { showNotification('Upload failed. Please try again.', 'error'); }
        finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
    };

    const handleDelete = async (filename: string) => {
        const confirmed = await requestConfirmation({ title: 'Delete File', message: `Delete ${filename}?`, confirmText: 'Delete', type: 'danger' });
        if (!confirmed) return;
        try {
            await adminService.deleteKBFile(filename);
            setFiles(prev => prev.filter(f => f.name !== filename));
            showNotification(`Deleted ${filename} successfully`, 'success');
        } catch { showNotification(`Failed to delete ${filename}`, 'error'); }
    };

    const handleReindex = async () => {
        const confirmed = await requestConfirmation({ title: 'Re-index Intelligence', message: 'Trigger full re-indexing? This may take a moment.', confirmText: 'Re-index', type: 'confirm' });
        if (!confirmed) return;
        setKbLoading(true);
        try { 
            await adminService.triggerReindex(); 
            showNotification('Re-indexing complete!', 'success'); 
        }
        catch { showNotification('Re-indexing failed.', 'error'); }
        finally { setKbLoading(false); }
    };

    const handleDeleteLog = async (id: number) => {
        await adminService.deleteChatLog(id);
        fetchLogs(); fetchStats();
    };

    const handleClearCache = async () => {
        setClearingCache(true);
        try { await adminService.clearCache(); await fetchStats(); }
        finally { setClearingCache(false); }
    };

    const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setSearch(searchInput); setPage(0); };

    /* ── Derived ── */
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const maxDay = stats ? Math.max(...stats.queries_per_day.map(d => d.count), 1) : 1;
    const maxUser = stats ? Math.max(...stats.top_users.map(u => u.count), 1) : 1;
    const maxSrc = stats ? Math.max(...stats.top_sources.map(s => s.count), 1) : 1;

    const statCards = [
        { icon: <MessageSquare size={15} />, label: 'Total Queries', value: statsLoading ? '—' : (stats?.total_queries ?? 0).toLocaleString(), accent: '#6366f1' },
        { icon: <Zap size={15} />, label: 'Est. Tokens', value: statsLoading ? '—' : (stats?.total_tokens_estimated ?? 0).toLocaleString(), accent: '#f59e0b' },
        { icon: <Clock size={15} />, value: statsLoading ? '—' : `${stats?.avg_response_ms ?? 0}ms`, label: 'Avg Latency', accent: '#10b981' },
        { icon: <Users size={15} />, label: 'Unique Users', value: statsLoading ? '—' : (stats?.top_users.length ?? 0).toString(), accent: '#3b82f6' },
        {
            icon: <ThumbsUp size={15} />,
            label: 'Satisfaction',
            value: statsLoading ? '—' : feedbackStats?.satisfaction_rate !== null && feedbackStats?.satisfaction_rate !== undefined ? `${feedbackStats.satisfaction_rate}%` : 'N/A',
            accent: '#16a34a'
        },
        { icon: <Database size={15} />, label: 'Cache Hits Saved', value: statsLoading ? '—' : (cacheStats?.total_hits_saved ?? 0).toString(), accent: '#8b5cf6' },
    ];

    return (
        <div className="ih-page">

            {/* ── Hero stat strip ── */}
            <div className="ih-stat-strip">
                {statCards.map((c, i) => (
                    <div key={i} className="ih-stat-pill" style={{ '--ih-accent': c.accent } as any}>
                        <div className="ih-stat-icon">{c.icon}</div>
                        <div>
                            <div className="ih-stat-val">{c.value}</div>
                            <div className="ih-stat-lbl">{c.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main charts grid ── */}
            <div className="ih-charts-grid">

                {/* Activity — spans 2 cols */}
                <div className="ih-card ih-card-wide">
                    <div className="ih-card-header">
                        <TrendingUp size={13} />
                        <span>Query Activity — Last 14 Days</span>
                    </div>
                    {statsLoading ? (
                        <div className="ih-bar-skeleton">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <div key={i} className="ih-skel-bar" style={{ height: `${25 + Math.random() * 60}%` }} />
                            ))}
                        </div>
                    ) : stats?.queries_per_day.length ? (
                        <div className="ih-bar-chart">
                            {stats.queries_per_day.map((d, i) => (
                                <div key={i} className="ih-bar-col" title={`${d.day}: ${d.count}`}>
                                    <span className="ih-bar-tooltip">{d.count}</span>
                                    <div className="ih-bar" style={{ height: `${(d.count / maxDay) * 100}%` }} />
                                    <span className="ih-bar-lbl">
                                        {new Date(d.day).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="ih-empty-chart">No activity yet</div>
                    )}
                </div>

                {/* Top Users */}
                <div className="ih-card">
                    <div className="ih-card-header"><Users size={13} /><span>Most Active Users</span></div>
                    <div className="ih-rank-list">
                        {statsLoading
                            ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="ih-skel-row" />)
                            : !stats?.top_users.length
                                ? <p className="ih-empty">No data yet</p>
                                : stats.top_users.map((u, i) => (
                                    <div key={i} className="ih-rank-row">
                                        <span className="ih-rank-num">{i + 1}</span>
                                        <span className="ih-rank-name">{u.username}</span>
                                        <MiniBar value={u.count} max={maxUser} />
                                        <span className="ih-rank-count">{u.count}</span>
                                    </div>
                                ))}
                    </div>
                </div>

                {/* Top Sources */}
                <div className="ih-card">
                    <div className="ih-card-header"><FileText size={13} /><span>Most Referenced Sources</span></div>
                    <div className="ih-rank-list">
                        {statsLoading
                            ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="ih-skel-row" />)
                            : !stats?.top_sources.length
                                ? <p className="ih-empty">No data yet</p>
                                : stats.top_sources.map((s, i) => (
                                    <div key={i} className="ih-rank-row">
                                        <span className="ih-rank-num">{i + 1}</span>
                                        <span className="ih-rank-name ih-rank-name-sm">{s.source}</span>
                                        <MiniBar value={s.count} max={maxSrc} color="#10b981" />
                                        <span className="ih-rank-count">{s.count}</span>
                                    </div>
                                ))}
                    </div>
                </div>

                {/* Feedback */}
                <div className="ih-card">
                    <div className="ih-card-header"><ThumbsUp size={13} /><span>User Feedback</span></div>
                    {statsLoading ? <div className="ih-skel-row" style={{ height: 60 }} /> : feedbackStats ? (
                        <>
                            <div className="ih-feedback-row">
                                <div className="ih-fb-stat ih-fb-up"><ThumbsUp size={14} /><strong>{feedbackStats.total_up}</strong><span>Helpful</span></div>
                                <div className="ih-fb-divider" />
                                <div className="ih-fb-stat ih-fb-down"><ThumbsDown size={14} /><strong>{feedbackStats.total_down}</strong><span>Not helpful</span></div>
                                {feedbackStats.satisfaction_rate !== null && (
                                    <div className="ih-fb-rate">
                                        <strong>{feedbackStats.satisfaction_rate}%</strong>
                                        <span>Satisfaction</span>
                                    </div>
                                )}
                            </div>
                            {feedbackStats.worst_rated.length > 0 && (
                                <div className="ih-worst">
                                    <p className="ih-worst-label"><ThumbsDown size={10} /> Needs improvement</p>
                                    {feedbackStats.worst_rated.slice(0, 3).map((w, i) => (
                                        <div key={i} className="ih-worst-row">
                                            <span className="ih-worst-msg">{w.message.slice(0, 55)}{w.message.length > 55 ? '…' : ''}</span>
                                            <span className="ih-worst-count">{w.down_count}↓</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : <p className="ih-empty">No feedback yet</p>}
                </div>

                {/* Cache — spans 2 cols */}
                <div className="ih-card ih-card-wide">
                    <div className="ih-card-header" style={{ justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Database size={13} /><span>Query Cache</span>
                        </div>
                        <button className="ih-clear-btn" onClick={handleClearCache} disabled={clearingCache}>
                            {clearingCache ? <RefreshCw size={11} className="spinning" /> : <X size={11} />}
                            Clear all
                        </button>
                    </div>
                    {statsLoading ? <div className="ih-skel-row" style={{ height: 50 }} /> : cacheStats ? (
                        <div className="ih-cache-layout">
                            <div className="ih-cache-nums">
                                <div className="ih-cache-num">
                                    <strong>{cacheStats.active_entries}</strong>
                                    <span>Active</span>
                                </div>
                                <div className="ih-cache-num">
                                    <strong>{cacheStats.total_hits_saved}</strong>
                                    <span>Gemini calls saved</span>
                                </div>
                                <div className="ih-cache-num">
                                    <strong>{cacheStats.total_entries}</strong>
                                    <span>Total entries</span>
                                </div>
                            </div>
                            {cacheStats.top_cached_queries.length > 0 && (
                                <div className="ih-rank-list ih-cache-list">
                                    {cacheStats.top_cached_queries.slice(0, 5).map((q, i) => (
                                        <div key={i} className="ih-rank-row">
                                            <span className="ih-rank-num">{i + 1}</span>
                                            <span className="ih-rank-name" style={{ width: 'auto', flex: 1 }}>{q.query.slice(0, 65)}{q.query.length > 65 ? '…' : ''}</span>
                                            <span className="ih-rank-count">{q.hits} hits</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : <p className="ih-empty">No cache entries</p>}
                </div>
            </div>

            {/* ── Conversation Logs ── */}
            <div className="ih-logs-section">
                <div className="ih-logs-header">
                    <div className="ih-logs-title">
                        <MessageSquare size={14} />
                        <span>Conversation Logs</span>
                        <span className="ih-badge-count">{total.toLocaleString()}</span>
                    </div>
                    <div className="ih-logs-controls">
                        <form className="ih-search" onSubmit={handleSearch}>
                            <Search size={12} />
                            <input type="text" placeholder="Filter by username..." value={searchInput} onChange={e => setSearchInput(e.target.value)}
                                className="ih-search-input"
                            />
                        </form>
                        <button className="ih-refresh-btn" onClick={() => { fetchLogs(); fetchStats(); }}>
                            <RefreshCw size={13} className={logsLoading ? 'spinning' : ''} />
                        </button>
                    </div>
                </div>

                <div className="ih-table-wrap">
                    <table className="ih-table">
                        <thead>
                            <tr>
                                <th>Time</th><th>User</th><th>Question</th>
                                <th className="ih-center">Sources</th>
                                <th className="ih-center">Tokens</th>
                                <th className="ih-center">Latency</th>
                                <th className="ih-center">Type</th>
                                <th className="ih-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {logsLoading
                                ? Array.from({ length: 6 }).map((_, i) => (
                                    <tr key={i}>{Array.from({ length: 8 }).map((_, j) => (
                                        <td key={j}><div className="ih-skel-cell" /></td>
                                    ))}</tr>
                                ))
                                : logs.length === 0
                                    ? <tr><td colSpan={8} className="ih-empty-table">{search ? `No logs matching "${search}"` : 'No conversations logged yet.'}</td></tr>
                                    : logs.map(log => <LogRow key={log.id} log={log} onDelete={handleDeleteLog} />)
                            }
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="ih-pagination">
                        <button className="ih-page-btn" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}><ChevronLeft size={13} /></button>
                        <span className="ih-page-info">Page {page + 1} of {totalPages}</span>
                        <button className="ih-page-btn" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}><ChevronRight size={13} /></button>
                    </div>
                )}
            </div>

            {/* ── Knowledge Base (collapsible) ── */}
            <div className="ih-kb-section">
                <div className="ih-kb-toggle">
                    <button className="ih-kb-toggle-btn" onClick={() => setKbExpanded(e => !e)}>
                        <div className="ih-kb-toggle-left">
                            <Database size={14} />
                            <span>Knowledge Base</span>
                            <span className="ih-badge-count">{files.length} files</span>
                        </div>
                        <div className="ih-kb-toggle-chevron">
                            {kbExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                    </button>
                    <button className="ih-reindex-btn" onClick={handleReindex} disabled={kbLoading}>
                        <RefreshCw size={12} className={kbLoading ? 'spinning' : ''} />
                        Re-index
                    </button>
                </div>

                {kbExpanded && (
                    <div className="ih-kb-body">
                        {/* Upload zone */}
                        <div className={`ih-upload-zone ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
                        >
                            <input ref={fileInputRef} type="file" multiple accept=".xlsx,.csv,.py" className="ih-hidden-input" onChange={e => e.target.files && handleUpload(Array.from(e.target.files))} />
                            {uploading ? (
                                <><RefreshCw size={16} className="spinning" /><span>Uploading...</span></>
                            ) : (
                                <><Upload size={16} /><span>Drop files here or click to browse</span><small>.xlsx · .csv · .py</small></>
                            )}
                        </div>

                        {/* File list */}
                        {files.length > 0 && (
                            <div className="ih-file-list">
                                {files.map(file => (
                                    <div key={file.name} className="ih-file-row">
                                        <FileText size={13} className="ih-file-icon" />
                                        <span className="ih-file-name">{file.name}</span>
                                        <button className="ih-icon-btn ih-delete-btn" onClick={() => handleDelete(file.name)} title="Delete">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {files.length === 0 && !kbLoading && (
                            <p className="ih-empty" style={{ padding: '1rem 0' }}>No files indexed yet.</p>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};
