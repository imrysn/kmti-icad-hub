import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Trash2, RefreshCw, AlertCircle, CheckCircle2, FileUp, Search, MessageSquare, Brain } from 'lucide-react';
import { adminService, KBFile } from '../../../services/adminService';
import { searchService, SearchResult } from '../../../services/searchService';
import { useUI } from '../../../context/UIContext';
import '../../../styles/KnowledgeManagement.css';

export const KnowledgeManagement: React.FC = () => {
    const [files, setFiles] = useState<KBFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    
    // Testing RAG State
    const [testQuery, setTestQuery] = useState('');
    const [testResults, setTestResults] = useState<SearchResult[]>([]);
    const [isTesting, setIsTesting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { requestConfirmation } = useUI();

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const data = await adminService.getKBFiles();
            setFiles(data);
        } catch (err: any) {
            setError('Failed to load knowledge base files.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await handleUpload(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await handleUpload(Array.from(e.target.files));
        }
    };

    const handleUpload = async (filesToUpload: File[]) => {
        const validFiles = filesToUpload.filter(f => 
            f.name.endsWith('.xlsx') || f.name.endsWith('.csv') || f.name.endsWith('.py')
        );

        if (validFiles.length === 0) {
            setError('Only .xlsx, .csv, and .py files are supported.');
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(null);
        try {
            await adminService.uploadKBFiles(validFiles);
            setSuccess(`Successfully uploaded ${validFiles.length} file(s)`);
            fetchFiles();
        } catch (err: any) {
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (filename: string) => {
        const confirmed = await requestConfirmation({
            title: 'Delete File',
            message: `Are you sure you want to delete ${filename}?`,
            confirmText: 'Delete',
            type: 'danger'
        });
        if (!confirmed) return;
        try {
            await adminService.deleteKBFile(filename);
            setFiles(prev => prev.filter(f => f.name !== filename));
            setSuccess(`Deleted ${filename}`);
        } catch (err: any) {
            setError(`Failed to delete ${filename}`);
        }
    };

    const handleReindex = async () => {
        const confirmed = await requestConfirmation({
            title: 'Re-index Intelligence',
            message: 'Trigger full knowledge base re-indexing? This may take a moment.',
            confirmText: 'Re-index',
            type: 'confirm'
        });
        if (!confirmed) return;
        setLoading(true);
        try {
            await adminService.triggerReindex();
            setSuccess('Knowledge base re-indexing complete.');
        } catch (err: any) {
            setError('Re-indexing failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleTestSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!testQuery.trim()) return;

        setIsTesting(true);
        try {
            const response = await searchService.query(testQuery);
            setTestResults(response.results);
        } catch (err) {
            setError('Intelligence search failed.');
        } finally {
            setIsTesting(false);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="kb-management">
            <div className="kb-header-actions">
                <button className="primary-btn" onClick={handleReindex} disabled={loading}>
                    <RefreshCw size={18} className={loading ? 'spinning' : ''} />
                    Re-index Intelligence Node
                </button>
            </div>

            <div className="upload-container">
                <div 
                    className={`upload-zone ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple 
                        accept=".xlsx,.csv,.py"
                        className="hidden-input"
                    />
                    <div className="upload-content">
                        {uploading ? (
                            <div className="upload-progress">
                                <div className="spinner"></div>
                                <p>Uploading files...</p>
                            </div>
                        ) : (
                            <>
                                <FileUp size={48} className="upload-icon" />
                                <h3>Drag & Drop Files Here</h3>
                                <p>or click to browse from your computer</p>
                                <span className="supported-formats">Supported: .xlsx, .csv, .py</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {(error || success) && (
                <div className={`status-banner ${error ? 'error' : 'success'}`}>
                    {error ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                    <span>{error || success}</span>
                    <button className="close-btn" onClick={() => { setError(null); setSuccess(null); }}>×</button>
                </div>
            )}

            <div className="files-list-container">
                <div className="section-header">
                    <h2>Knowledge Base Files</h2>
                    <span className="file-count">{files.length} files total</span>
                </div>

                <div className="files-table-wrapper">
                    <table className="files-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Modified</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="empty-state">No files in knowledge base</td>
                                </tr>
                            ) : (
                                files.map((file) => (
                                    <tr key={file.name}>
                                        <td className="file-name">
                                            <FileText size={18} />
                                            <span>{file.name}</span>
                                        </td>
                                        <td>{formatSize(file.size)}</td>
                                        <td>{new Date(file.modified).toLocaleString()}</td>
                                        <td className="actions">
                                            <button 
                                                className="icon-btn delete" 
                                                onClick={(e) => { e.stopPropagation(); handleDelete(file.name); }}
                                                title="Delete file"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Test Intelligence Section */}
            <div className="test-intelligence-section">
                <div className="test-header">
                    <Brain size={20} />
                    <h2>Test Intelligence Node</h2>
                </div>
                <form className="search-test-box" onSubmit={handleTestSearch}>
                    <input 
                        type="text" 
                        placeholder="Search for technical concepts..." 
                        className="search-test-input"
                        value={testQuery}
                        onChange={(e) => setTestQuery(e.target.value)}
                    />
                    <button className="primary-btn" type="submit" disabled={isTesting}>
                        {isTesting ? <RefreshCw size={18} className="spinning" /> : <Search size={18} />}
                        Query Node
                    </button>
                </form>

                <div className="results-display">
                    {testResults.length === 0 && !isTesting && testQuery && (
                        <p className="empty-state">No matching intelligence found.</p>
                    )}
                    {testResults.map((result, idx) => (
                        <div className="result-card" key={idx}>
                            <div className="result-meta">
                                <span className="result-source">{result.source}</span>
                                <span className="result-score">MATCH_SCORE: {(result.score! * 100).toFixed(1)}%</span>
                            </div>
                            <div className="result-content">{result.content}</div>
                            
                            {/* Multimedia Preview */}
                            {result.media && result.media.length > 0 && (
                                <div className="result-media-section">
                                    {result.media.map((item, mIdx) => (
                                        <div key={mIdx} className="media-item-wrapper">
                                            {item.media_type === 'image' && (
                                                <div className="media-preview-container">
                                                    <img 
                                                        src={`http://localhost:8000/src/${item.media_url}`} 
                                                        alt={item.description || 'Reference image'} 
                                                        className="media-preview-img"
                                                        loading="lazy"
                                                    />
                                                    {item.description && <p className="media-caption">{item.description}</p>}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

