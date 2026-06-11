import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Users, BookOpen, Save, Trash2, Edit3, CheckCircle2, ChevronRight, UserPlus, Upload, GripVertical, Folder, UploadCloud } from 'lucide-react';
import { assessmentService, AssessmentTask } from '../../../services/assessmentService';
import { authService, User } from '../../../services/authService';
import { useNotification } from '../../../context/NotificationContext';
import { useUI } from '../../../context/UIContext';
import { FileManagerModal } from './FileManagerModal';
import { useBulkDownload } from '../../../hooks/useBulkDownload';
import '../../../styles/admin/PracticalManagement.css';

export const PracticalManagement: React.FC = () => {
    const { showNotification } = useNotification();
    const { requestConfirmation } = useUI();
    const [activeSubTab, setActiveSubTab] = useState<'tasks' | 'assignments'>('tasks');
    const [tasks, setTasks] = useState<AssessmentTask[]>([]);
    const [setFilter, setSetFilter] = useState<number | 'all'>(1);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [mappings, setMappings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
    const [taskFile, setTaskFile] = useState<File | null>(null);
    const [bulkFiles, setBulkFiles] = useState<File[]>([]);
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleBulkDownload, isDownloading: isBulkDownloading } = useBulkDownload();

    const [newTask, setNewTask] = useState({
        set_number: 1,
        task_code: '',
        title: '',
        description: '',
        master_file_path: '',
        is_assembly: false
    });

    // Form State for Assignment
    const [selectedTrainer, setSelectedTrainer] = useState<number>(0);
    const [selectedTrainee, setSelectedTrainee] = useState<number>(0);
    const [editingTask, setEditingTask] = useState<AssessmentTask | null>(null);
    const [fileManagerTask, setFileManagerTask] = useState<AssessmentTask | null>(null);
    const [editFile, setEditFile] = useState<File | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Drag and Drop State
    const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
    const [dragOverTaskId, setDragOverTaskId] = useState<number | null>(null);

    useEffect(() => {
        fetchData();
    }, [activeSubTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeSubTab === 'tasks') {
                const data = await assessmentService.getTasks();
                setTasks(data);
            } else {
                const [u, m] = await Promise.all([
                    authService.getUsers(),
                    assessmentService.getTrainerMappings()
                ]);
                setAllUsers(u);
                setMappings(m);
            }
        } catch (err) {
            showNotification('Failed to load data.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskFile) {
            showNotification('Please select a master .dwg file.', 'warning');
            return;
        }

        setIsSubmitting(true);
        try {
            await assessmentService.createTask(newTask, taskFile);
            showNotification('Unit created successfully.', 'success');
            setNewTask({ set_number: 1, task_code: '', title: '', description: '', master_file_path: '', is_assembly: false });
            setTaskFile(null);
            fetchData();
        } catch (err) {
            showNotification('Failed to create unit.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSyncTasks = async () => {
        setIsSubmitting(true);
        try {
            await assessmentService.syncTasks();
            showNotification('Successfully synced tasks from the server folder.', 'success');
            fetchData();
        } catch (err) {
            showNotification('Sync failed.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAssignTrainer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTrainer || !selectedTrainee) return;
        try {
            await assessmentService.assignTrainer({ trainer_id: selectedTrainer, trainee_id: selectedTrainee });
            showNotification('Trainer assigned successfully.', 'success');
            fetchData();
        } catch (err) {
            showNotification('Assignment failed.', 'error');
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        const confirmed = await requestConfirmation({
            title: 'Delete Unit',
            message: 'Are you sure you want to delete this assessment unit?',
            confirmText: 'Delete',
            type: 'danger'
        });
        if (!confirmed) return;
        try {
            await assessmentService.deleteTask(taskId);
            showNotification('Unit deleted successfully.', 'success');
            fetchData();
        } catch (err) {
            showNotification('Failed to delete unit.', 'error');
        }
    };

    const handleDeleteMapping = async (mappingId: number) => {
        const confirmed = await requestConfirmation({
            title: 'Remove Assignment',
            message: 'Are you sure you want to remove this trainer assignment?',
            confirmText: 'Remove',
            type: 'danger'
        });
        if (!confirmed) return;
        try {
            await assessmentService.deleteMapping(mappingId);
            showNotification('Mapping removed successfully.', 'success');
            fetchData();
        } catch (err) {
            showNotification('Failed to remove mapping.', 'error');
        }
    };

    const handleEditTask = (task: AssessmentTask) => {
        setEditingTask(task);
        setShowEditModal(true);
    };

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask) return;
        setIsSubmitting(true);
        try {
            await assessmentService.updateTask(editingTask.id, editingTask, editFile || undefined);
            showNotification('Unit updated successfully.', 'success');
            setShowEditModal(false);
            setEditFile(null);
            fetchData();
        } catch (err) {
            showNotification('Failed to update unit.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDragStart = (taskId: number) => {
        setDraggedTaskId(taskId);
    };

    const handleDragOver = (e: React.DragEvent, taskId: number) => {
        e.preventDefault();
        setDragOverTaskId(taskId);
    };

    const handleDrop = async (e: React.DragEvent, targetTaskId: number, setNumber: number) => {
        e.preventDefault();
        if (draggedTaskId === null || draggedTaskId === targetTaskId) {
            setDraggedTaskId(null);
            setDragOverTaskId(null);
            return;
        }

        // Only allow reordering within the same set
        // Important: Extract ONLY the tasks from the specific set being interacted with,
        // otherwise if 'All Sets' is selected, task codes will bleed continuously (e.g. A, B... Z) across sets.
        const setLocalTasks = tasks.filter(t => t.set_number === setNumber).sort((a, b) => (a.task_code || '').localeCompare(b.task_code || ''));

        const draggedIndex = setLocalTasks.findIndex(t => t.id === draggedTaskId);
        const targetIndex = setLocalTasks.findIndex(t => t.id === targetTaskId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const newTasks = [...setLocalTasks];
        const [draggedItem] = newTasks.splice(draggedIndex, 1);
        newTasks.splice(targetIndex, 0, draggedItem);

        // Update task codes based on new order
        const reorderedTasks = newTasks.map((task, index) => ({
            ...task,
            task_code: String.fromCharCode(65 + index),
            order: index + 1
        }));

        // Optimistically update UI
        setTasks(prev => {
            // First update all tasks with their new properties
            const updated = prev.map(t => {
                const reordered = reorderedTasks.find(rt => rt.id === t.id);
                return reordered ? reordered : t;
            });
            // Then sort them so the UI reflects the new correct order immediately
            return updated.sort((a, b) => {
                if (a.set_number !== b.set_number) return a.set_number - b.set_number;
                return (a.task_code || '').localeCompare(b.task_code || '');
            });
        });

        setDraggedTaskId(null);
        setDragOverTaskId(null);

        try {
            // Call API
            await assessmentService.reorderTasks(
                reorderedTasks.map(t => ({
                    id: t.id,
                    set_number: t.set_number,
                    order: t.order,
                    task_code: t.task_code
                }))
            );
            showNotification('Task order updated.', 'success');
        } catch (err) {
            showNotification('Failed to reorder tasks.', 'error');
            fetchData(); // Revert on failure
        }
    };

    const trainers = allUsers.filter(u => u.role === 'employee' || u.role === 'admin');
    const trainees = allUsers.filter(u => u.role === 'trainee');
    const filteredTasks = useMemo(() => {
        const filtered = tasks.filter(task => setFilter === 'all' || task.set_number === setFilter);

        // Group by set_number to arrange each set individually
        const sets: Record<number, AssessmentTask[]> = {};
        filtered.forEach(t => {
            if (!sets[t.set_number]) sets[t.set_number] = [];
            sets[t.set_number].push(t);
        });

        const arrangedTasks: AssessmentTask[] = [];

        Object.keys(sets).sort((a, b) => parseInt(a) - parseInt(b)).forEach(setStr => {
            const setNum = parseInt(setStr);
            const setTasks = sets[setNum];

            const arranged = [...setTasks].sort((a, b) => {
                const isPartA = !a.is_assembly;
                const isPartB = !b.is_assembly;
                if (isPartA !== isPartB) return isPartA ? -1 : 1; // Parts first

                const codeA = a.task_code || '';
                const codeB = b.task_code || '';
                // Sort missing codes to the bottom
                if (!codeA && codeB) return 1;
                if (codeA && !codeB) return -1;
                return codeA.localeCompare(codeB, undefined, { numeric: true });
            });

            arrangedTasks.push(...arranged);
        });

        return arrangedTasks;
    }, [tasks, setFilter]);

    return (
        <section className="practical-management animate-fade-in">
            <div className="management-header" style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                <div className="tab-navigation" style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                    <button
                        className={`tab-btn ${activeSubTab === 'tasks' ? 'active' : ''}`}
                        onClick={() => setActiveSubTab('tasks')}
                    >
                        Units & Tasks
                    </button>
                    <button
                        className={`tab-btn ${activeSubTab === 'assignments' ? 'active' : ''}`}
                        onClick={() => setActiveSubTab('assignments')}
                    >
                        Trainer Assignments
                    </button>
                </div>
            </div>

            {activeSubTab === 'tasks' ? (
                <div className="tasks-management">

                    <div className="management-grid">
                        <div className="creation-form-card">
                            <div className="form-header-toggle">
                                <h4>{isBulkMode ? 'Sync Units' : 'Create New Unit'}</h4>
                                <button
                                    className="btn-outline"
                                    onClick={() => setIsBulkMode(!isBulkMode)}
                                >
                                    {isBulkMode ? 'Switch to Single' : 'Switch to Sync'}
                                </button>
                            </div>

                            {!isBulkMode ? (
                                <form onSubmit={handleCreateTask}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Set Number</label>
                                            <select
                                                value={newTask.set_number}
                                                onChange={(e) => setNewTask({ ...newTask, set_number: parseInt(e.target.value) })}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>Set {n}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Type</label>
                                            <select
                                                value={newTask.is_assembly ? 'assembly' : 'part'}
                                                onChange={(e) => {
                                                    const isAssembly = e.target.value === 'assembly';
                                                    setNewTask({ ...newTask, is_assembly: isAssembly, task_code: '' });
                                                }}
                                            >
                                                <option value="part">Part</option>
                                                <option value="assembly">Assembly</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Unit Code</label>
                                            <input
                                                type="text"
                                                placeholder={newTask.is_assembly ? "e.g. A1" : "e.g. P1"}
                                                value={newTask.task_code}
                                                onChange={(e) => {
                                                    const val = e.target.value.toUpperCase();
                                                    if (newTask.is_assembly) {
                                                        if (/^A\d*$/.test(val) || val === '') setNewTask({ ...newTask, task_code: val });
                                                    } else {
                                                        if (/^P\d*$/.test(val) || val === '') setNewTask({ ...newTask, task_code: val });
                                                    }
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Unit Title</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Flange Assembly Drafting"
                                            value={newTask.title}
                                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Master File (.dwg, .zip)</label>
                                        <div className="file-input-wrapper-styled">
                                            <input
                                                type="file"
                                                id="task-file"
                                                accept=".dwg,.zip"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    setTaskFile(file);
                                                    if (file) {
                                                        const titleWithoutExt = file.name.replace(/\.[^/.]+$/, "");
                                                        setNewTask({ ...newTask, title: titleWithoutExt });
                                                    }
                                                }}
                                                className="hidden-file-input"
                                                required
                                            />
                                            <label htmlFor="task-file" className="custom-file-upload">
                                                <Upload size={20} className="upload-icon" />
                                                <div className="upload-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                                    {taskFile ? (
                                                        <span className="file-name-highlight">{taskFile.name}</span>
                                                    ) : (
                                                        <span>CHOOSE MASTER FILE</span>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Instructions (Optional)</label>
                                        <textarea
                                            placeholder="Provide unit instructions..."
                                            value={newTask.description}
                                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : <><Plus size={18} /> Create Unit</>}
                                    </button>
                                </form>
                            ) : (
                                <div className="sync-tasks-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                    <Folder size={48} style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }} />
                                    <h3 style={{ marginBottom: '0.5rem' }}>Sync Units from Server</h3>
                                    <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
                                        Automatically scan the <code>uploads/Unts & Tasks</code> folder and build the assessment hierarchy for all Sets (1-10).
                                    </p>
                                    <button
                                        className="btn-primary"
                                        onClick={handleSyncTasks}
                                        disabled={isSubmitting}
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        {isSubmitting ? 'Syncing...' : <><Upload size={18} /> Sync Tasks</>}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="task-inventory">
                            <div className="inventory-header" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <label style={{ whiteSpace: 'nowrap' }}>Filter by Set:</label>
                                    <select
                                        value={setFilter}
                                        onChange={(e) => setSetFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                                        className="admin-input-styled"
                                        style={{ padding: '0.25rem 0.5rem', borderRadius: '4px' }}
                                    >
                                        <option value="all">All Sets</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>Set {n}</option>)}
                                    </select>
                                    <button
                                        className={`btn-primary ${isBulkDownloading ? 'disabled' : ''}`}
                                        onClick={() => handleBulkDownload(filteredTasks)}
                                        disabled={isBulkDownloading || filteredTasks.length === 0}
                                        title="Download All Filtered Tasks"
                                        style={{ padding: '0.4rem 0.8rem', marginLeft: '0.5rem' }}
                                    >
                                        <UploadCloud size={16} style={{ transform: 'rotate(180deg)' }} /> Download Filtered
                                    </button>
                                </div>
                            </div>
                            {filteredTasks.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Set</th>
                                            <th>Unit</th>
                                            <th>Title</th>
                                            <th>File Name</th>
                                            <th>Type</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTasks.map(task => (
                                            <tr key={task.id}>
                                                <td><span className="set-pill-mini">S{task.set_number}</span></td>
                                                <td><strong>{task.task_code || '-'}</strong></td>
                                                <td>{task.title}</td>
                                                <td className="dim-text">{task.file_name}</td>
                                                <td>
                                                    {task.is_assembly ? (
                                                        <span className="role-tag admin" style={{ fontSize: '0.7rem' }}>Assembly</span>
                                                    ) : (
                                                        <span className="role-tag trainee" style={{ fontSize: '0.7rem' }}>Part</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="table-actions-horizontal">
                                                        <button
                                                            className="btn-ghost"
                                                            onClick={() => handleEditTask(task)}
                                                            title="Edit Unit"
                                                        >
                                                            <Edit3 size={16} />
                                                        </button>
                                                        <button
                                                            className="btn-ghost"
                                                            onClick={() => handleDeleteTask(task.id)}
                                                            title="Delete Unit"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="empty-inventory">
                                    <BookOpen size={48} />
                                    <p>No units found. Create your first assessment unit above.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="assignments-management">
                    <div className="management-grid">
                        <div className="creation-form-card">
                            <h4>Assign Trainer</h4>
                            <form onSubmit={handleAssignTrainer}>
                                <div className="form-group">
                                    <label>Trainee</label>
                                    <select
                                        value={selectedTrainee}
                                        onChange={(e) => setSelectedTrainee(parseInt(e.target.value))}
                                        required
                                    >
                                        <option value={0}>Select Trainee...</option>
                                        {trainees.map(t => <option key={t.id} value={t.id}>{t.full_name} (@{t.username})</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Trainer (Employee/Admin)</label>
                                    <select
                                        value={selectedTrainer}
                                        onChange={(e) => setSelectedTrainer(parseInt(e.target.value))}
                                        required
                                    >
                                        <option value={0}>Select Trainer...</option>
                                        {trainers.map(t => <option key={t.id} value={t.id}>{t.full_name} (@{t.username})</option>)}
                                    </select>
                                </div>
                                <button className="btn-primary" onClick={handleAssignTrainer} disabled={isSubmitting}>
                                    <UserPlus size={18} />
                                    {isSubmitting ? 'Assigning...' : 'Assign Trainer'}
                                </button>
                            </form>
                        </div>

                        <div className="mapping-list">
                            {mappings.length > 0 ? (
                                <div className="mapping-grid">
                                    {mappings.map(m => {
                                        const trainee = allUsers.find(u => u.id === m.trainee_id);
                                        const trainer = allUsers.find(u => u.id === m.trainer_id);
                                        return (
                                            <div key={m.id} className="mapping-card">
                                                <div className="mapping-flow">
                                                    <div className="mapping-user">
                                                        <span className="role-tag trainee">Trainee</span>
                                                        <strong>{trainee?.full_name}</strong>
                                                    </div>
                                                    <ChevronRight size={18} className="flow-arrow" />
                                                    <div className="mapping-user">
                                                        <span className="role-tag trainer">Trainer</span>
                                                        <strong>{trainer?.full_name}</strong>
                                                    </div>
                                                </div>
                                                <button className="btn-ghost" onClick={() => handleDeleteMapping(m.id)}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="empty-inventory">
                                    <Users size={48} />
                                    <p>No active assignments. Map a trainee to a trainer to begin.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editingTask && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-card animate-slide-up">
                        <div className="modal-header">
                            <h3>Edit Assessment Unit</h3>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleUpdateTask} className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Set Number</label>
                                    <select
                                        value={editingTask.set_number}
                                        onChange={(e) => setEditingTask({ ...editingTask, set_number: parseInt(e.target.value) })}
                                        className="admin-input-styled"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>Set {n}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select
                                        value={editingTask.is_assembly ? 'assembly' : 'part'}
                                        onChange={(e) => {
                                            const isAssembly = e.target.value === 'assembly';
                                            setEditingTask({ ...editingTask, is_assembly: isAssembly, task_code: '' });
                                        }}
                                        className="admin-input-styled"
                                    >
                                        <option value="part">Part</option>
                                        <option value="assembly">Assembly</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Unit Code</label>
                                    <input
                                        type="text"
                                        placeholder={editingTask.is_assembly ? "e.g. A1" : "e.g. P1"}
                                        value={editingTask.task_code || ''}
                                        onChange={(e) => {
                                            const val = e.target.value.toUpperCase();
                                            if (editingTask.is_assembly) {
                                                if (/^A\d*$/.test(val) || val === '') setEditingTask({ ...editingTask, task_code: val });
                                            } else {
                                                if (/^P\d*$/.test(val) || val === '') setEditingTask({ ...editingTask, task_code: val });
                                            }
                                        }}
                                        required
                                        className="admin-input-styled"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Unit Title</label>
                                <input
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                    required
                                    className="admin-input-styled"
                                />
                            </div>
                            <div className="form-group">
                                <label>Master File (Optional) (.dwg, .zip)</label>
                                <div className="file-input-wrapper-styled">
                                    <input
                                        type="file"
                                        accept=".dwg,.zip"
                                        id="edit-file-upload"
                                        onChange={(e) => {
                                            const file = e.target.files ? e.target.files[0] : null;
                                            setEditFile(file);
                                            if (file) {
                                                const titleWithoutExt = file.name.replace(/\.[^/.]+$/, "");
                                                setEditingTask({ ...editingTask, title: titleWithoutExt });
                                            }
                                        }}
                                        className="hidden-file-input"
                                    />
                                    <label htmlFor="edit-file-upload" className="custom-file-upload">
                                        <Upload size={20} className="upload-icon" />
                                        <div className="upload-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            {editFile ? (
                                                <span className="file-name-highlight">{editFile.name}</span>
                                            ) : (
                                                <>
                                                    <span>Click to replace master DWG</span>
                                                    {editingTask.master_file_path && (
                                                        <div className="current-file-badge" style={{ marginTop: '0' }}>
                                                            <small>Current: {editingTask.master_file_path.split(/[\\/]/).pop()}</small>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Instructions</label>
                                <textarea
                                    value={editingTask.description}
                                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    rows={4}
                                    placeholder="Provide unit instructions..."
                                    className="admin-input-styled"
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button type="button" className="btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {fileManagerTask && (
                <FileManagerModal
                    task={fileManagerTask}
                    onClose={() => setFileManagerTask(null)}
                />
            )}
        </section>
    );
};
