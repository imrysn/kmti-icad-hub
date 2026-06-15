import React, { useState, useEffect } from 'react';
import { Folder, File as FileIcon, Upload, FolderPlus, Trash2 } from 'lucide-react';
import { assessmentService, AssessmentTask } from '../../../services/assessmentService';
import { useNotification } from '../../../context/NotificationContext';
import { Modal } from '../../../components/Modal';

interface FileManagerModalProps {
    task: AssessmentTask;
    onClose: () => void;
}

export const FileManagerModal: React.FC<FileManagerModalProps> = ({ task, onClose }) => {
    const { showNotification } = useNotification();
    const [tree, setTree] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState<string>(''); // empty means root
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadTree();
    }, [task.id]);

    const loadTree = async () => {
        setLoading(true);
        try {
            const data = await assessmentService.getTaskFileTree(task.id);
            setTree(data.tree || []);
        } catch (err) {
            showNotification('Failed to load file tree', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFolder = async () => {
        const folderName = prompt('Enter folder name:');
        if (!folderName) return;
        
        const path = currentPath ? `${currentPath}/${folderName}` : folderName;
        try {
            await assessmentService.createTaskSubfolder(task.id, path);
            showNotification('Folder created', 'success');
            loadTree();
        } catch (err) {
            showNotification('Failed to create folder', 'error');
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        
        setUploading(true);
        try {
            await assessmentService.uploadTaskFile(task.id, currentPath, file);
            showNotification('File uploaded', 'success');
            loadTree();
        } catch (err) {
            showNotification('Failed to upload file', 'error');
        } finally {
            setUploading(false);
            e.target.value = ''; // reset input
        }
    };

    const handleDelete = async (path: string) => {
        if (!window.confirm(`Are you sure you want to delete ${path}?`)) return;
        
        try {
            await assessmentService.deleteTaskFile(task.id, path);
            showNotification('Deleted successfully', 'success');
            loadTree();
        } catch (err) {
            showNotification('Failed to delete', 'error');
        }
    };

    // Helper to find current directory nodes
    const getCurrentNodes = () => {
        if (!currentPath) return tree;
        
        const parts = currentPath.split('/');
        let currentLevel = tree;
        
        for (const part of parts) {
            const node = currentLevel.find(n => n.name === part && n.is_dir);
            if (node) {
                currentLevel = node.children || [];
            } else {
                return [];
            }
        }
        return currentLevel;
    };

    const nodes = getCurrentNodes();

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title={`Manage Files: ${task.title} (Set ${task.set_number} - ${task.task_code})`}
            tag="FILE_MANAGER"
            size="lg"
        >
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
                        <button 
                            className="btn-ghost" 
                            style={{ padding: '0.2rem 0.5rem' }}
                            onClick={() => setCurrentPath('')}
                        >
                            Root
                        </button>
                        {currentPath && currentPath.split('/').map((part, idx, arr) => (
                            <React.Fragment key={idx}>
                                <span>/</span>
                                <button 
                                    className="btn-ghost" 
                                    style={{ padding: '0.2rem 0.5rem' }}
                                    onClick={() => setCurrentPath(arr.slice(0, idx + 1).join('/'))}
                                >
                                    {part}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-ghost" onClick={handleCreateFolder} title="New Folder">
                            <FolderPlus size={18} />
                        </button>
                        <label className="btn-primary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem' }}>
                            <Upload size={18} />
                            <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                            <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} disabled={uploading} />
                        </label>
                    </div>
                </div>

                <div style={{ background: '#1a1d24', border: '1px solid #2d323e', borderRadius: '8px', minHeight: '300px' }}>
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading...</div>
                    ) : nodes.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>This folder is empty.</div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {nodes.map((node, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #2d323e' }}>
                                        <td style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {node.is_dir ? (
                                                <Folder size={18} color="#60a5fa" />
                                            ) : (
                                                <FileIcon size={18} color="#9ca3af" />
                                            )}
                                            {node.is_dir ? (
                                                <a 
                                                    href="#" 
                                                    onClick={(e) => { e.preventDefault(); setCurrentPath(node.path); }}
                                                    style={{ color: '#e5e7eb', textDecoration: 'none', fontWeight: 500 }}
                                                >
                                                    {node.name}
                                                </a>
                                            ) : (
                                                <span style={{ color: '#d1d5db' }}>{node.name}</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                                            <button 
                                                className="btn-ghost" 
                                                style={{ color: '#ef4444', padding: '0.25rem' }}
                                                onClick={() => handleDelete(node.path)}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Modal>
    );
};
