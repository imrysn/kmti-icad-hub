import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Users, BookOpen, Save, Trash2, Edit3, CheckCircle2, ChevronRight, UserPlus, Upload, GripVertical, Folder, UploadCloud, Download } from 'lucide-react';
import { assessmentService, AssessmentTask } from '../../../services/assessmentService';
import { authService, User } from '../../../services/authService';
import { useNotification } from '../../../context/NotificationContext';
import { Modal } from '../../../components/Modal';
import { FileManagerModal } from './FileManagerModal';
import '../../../styles/admin/PracticalManagement.css';

export const PracticalManagement: React.FC = () => {
    const { showNotification } = useNotification();
    const location = useLocation();
    const [activeSubTab, setActiveSubTab] = useState<'tasks' | 'assignments'>('tasks');
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subtab = params.get('subtab');
        if (subtab && (subtab === 'tasks' || subtab === 'assignments')) {
            setActiveSubTab(subtab as 'tasks' | 'assignments');
        }
    }, [location.search]);
    
    const [tasks, setTasks] = useState<AssessmentTask[]>([]);
    const [setFilter, setSetFilter] = useState<number | 'all'>('all');
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [mappings, setMappings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
    const [taskFile, setTaskFile] = useState<File | null>(null);
    const [bulkFiles, setBulkFiles] = useState<File[]>([]);
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State for New Task
    const [newTask, setNewTask] = useState({
        set_number: 1,
        task_code: '',
        title: '',
        description: '',
        master_file_path: ''
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

    // Modal state for form conversion
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

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
            setShowCreateModal(false);
            setNewTask({ set_number: 1, task_code: '', title: '', description: '', master_file_path: '' });
            setTaskFile(null);
            fetchData();
        } catch (err) {
            showNotification('Failed to create unit.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBulkUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (bulkFiles.length === 0) {
            showNotification('Please select at least one .dwg file.', 'warning');
            return;
        }

        setIsSubmitting(true);
        try {
            await assessmentService.bulkCreateTasks(newTask.set_number, bulkFiles);
            showNotification(`Successfully created ${bulkFiles.length} units.`, 'success');
            setShowCreateModal(false);
            setBulkFiles([]);
            fetchData();
        } catch (err) {
            showNotification('Bulk upload failed.', 'error');
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
            setShowAssignModal(false);
            fetchData();
        } catch (err) {
            showNotification('Assignment failed.', 'error');
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        if (!window.confirm('Are you sure you want to delete this assessment unit?')) return;
        try {
            await assessmentService.deleteTask(taskId);
            showNotification('Unit deleted successfully.', 'success');
            fetchData();
        } catch (err) {
            showNotification('Failed to delete unit.', 'error');
        }
    };

    const handleDeleteMapping = async (mappingId: number) => {
        if (!window.confirm('Are you sure you want to remove this trainer assignment?')) return;
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
        const setLocalTasks = tasks.filter(t => t.set_number === setNumber).sort((a, b) => a.order - b.order);
        
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
                return a.order - b.order;
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
    const filteredTasks = tasks.filter(task => setFilter === 'all' || task.set_number === setFilter);

    return (
        <div className="practical-management animate-fade-in">

            {activeSubTab === 'tasks' ? (
                <div className="tasks-management">
                    <div className="toolbar">
                        <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <label style={{ whiteSpace: 'nowrap' }}>Filter by Set:</label>
                            <select
                                value={setFilter}
                                onChange={(e) => setSetFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                                className="admin-input-styled"
                                style={{ padding: '0.25rem 0.5rem', borderRadius: '4px' }}
                            >
                                <option value="all">All Sets</option>
                                {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>Set {n}</option>)}
                            </select>
                        </div>
                        <button className="add-user-btn" style={{ marginLeft: 'auto' }} onClick={() => setShowCreateModal(true)}>
                            <Plus size={16} /> New Assessment Unit
                        </button>
                    </div>

                    <Modal
                        isOpen={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                        title={isBulkMode ? 'Bulk Upload Units' : 'Create New Unit'}
                        size="md"
                        tag="CREATE_UNIT"
                    >
                        <div className="form-header-toggle" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                className="btn-outline"
                                onClick={() => setIsBulkMode(!isBulkMode)}
                            >
                                {isBulkMode ? 'Switch to Single' : 'Switch to Bulk'}
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
                                            {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>Set {n}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Task Code</label>
                                        <input
                                            type="text"
                                            value={newTask.task_code}
                                            onChange={(e) => setNewTask({ ...newTask, task_code: e.target.value })}
                                            placeholder="e.g. A"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        placeholder="e.g. Foundation Plan"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={newTask.description}
                                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                        placeholder="Brief instructions..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Master Drafting File (.dwg)</label>
                                    <div className="file-upload-area">
                                        <input
                                            type="file"
                                            id="master-file"
                                            accept=".dwg"
                                            onChange={(e) => setTaskFile(e.target.files?.[0] || null)}
                                            required
                                        />
                                        <label htmlFor="master-file">
                                            <UploadCloud size={24} />
                                            <span>{taskFile ? taskFile.name : 'Choose File or Drag & Drop'}</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="global-modal-footer" style={{ marginTop: '2rem' }}>
                                    <button type="button" className="global-btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                                    <button type="submit" className="global-btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : <><Save size={16} /> Create Unit</>}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleBulkUpload}>
                                <div className="form-group">
                                    <label>Target Set</label>
                                    <select
                                        value={newTask.set_number}
                                        onChange={(e) => setNewTask({ ...newTask, set_number: parseInt(e.target.value) })}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>Set {n}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Select Multiple Files (.dwg, .zip)</label>
                                    <div className="file-upload-area bulk">
                                        <input
                                            type="file"
                                            id="bulk-files"
                                            accept=".dwg,.zip"
                                            multiple
                                            onChange={(e) => setBulkFiles(Array.from(e.target.files || []))}
                                            required
                                        />
                                        <label htmlFor="bulk-files">
                                            <Upload size={24} />
                                            <span>{bulkFiles.length > 0 ? `${bulkFiles.length} files selected` : 'Select Files to Bulk Create'}</span>
                                        </label>
                                    </div>
                                    <p className="dim-text small">Task codes (A, B, C...) and titles will be auto-generated from filenames.</p>
                                </div>
                                <div className="global-modal-footer" style={{ marginTop: '2rem' }}>
                                    <button type="button" className="global-btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                                    <button type="submit" className="global-btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Uploading...' : <><Upload size={18} /> Bulk Upload</>}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Modal>

                    <div className="management-grid">
                        <div className="task-inventory">
                            {filteredTasks.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '40px' }}></th>
                                            <th>Set</th>
                                            <th>Code</th>
                                            <th>Title</th>
                                            <th>File Path</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTasks.map(task => (
                                            <tr 
                                                key={task.id}
                                                draggable
                                                onDragStart={() => handleDragStart(task.id)}
                                                onDragOver={(e) => handleDragOver(e, task.id)}
                                                onDrop={(e) => handleDrop(e, task.id, task.set_number)}
                                                className={`
                                                    ${draggedTaskId === task.id ? 'opacity-50' : ''} 
                                                    ${dragOverTaskId === task.id ? 'bg-indigo-50 border-t-2 border-indigo-500' : ''}
                                                    cursor-move transition-all
                                                `}
                                            >
                                                <td className="text-gray-400 cursor-grab active:cursor-grabbing text-center">
                                                    <GripVertical size={16} />
                                                </td>
                                                <td><span className="set-pill-mini">{task.set_number}</span></td>
                                                <td><strong>{task.task_code}</strong></td>
                                                <td>{task.title}</td>
                                                <td className="dim-text">{task.master_file_path}</td>
                                                <td>
                                                    <div className="table-actions-horizontal">
                                                        <button
                                                            className="btn-ghost"
                                                            onClick={() => setFileManagerTask(task)}
                                                            title="Manage Files & Folders"
                                                        >
                                                            <Folder size={16} />
                                                        </button>
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
                    <div className="toolbar">
                        <button className="add-user-btn" style={{ marginLeft: 'auto' }} onClick={() => setShowAssignModal(true)}>
                            <Plus size={16} /> Assign Trainer
                        </button>
                    </div>

                    <Modal
                        isOpen={showAssignModal}
                        onClose={() => setShowAssignModal(false)}
                        title="Assign Trainer"
                        size="md"
                        tag="ASSIGN_TRAINER"
                    >
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
                            <div className="global-modal-footer" style={{ marginTop: '2rem' }}>
                                <button type="button" className="global-btn-secondary" onClick={() => setShowAssignModal(false)}>Cancel</button>
                                <button type="submit" className="global-btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Assigning...' : <><UserPlus size={16} /> Assign Trainer</>}
                                </button>
                            </div>
                        </form>
                    </Modal>

                    <div className="management-grid">
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
                <Modal 
                    isOpen={showEditModal} 
                    onClose={() => setShowEditModal(false)} 
                    title="Edit Assessment Unit" 
                    tag="UNIT_EDIT"
                    size="md"
                >
                    <div className="global-modal-body">
                        <form onSubmit={handleUpdateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Set Number</label>
                                    <select
                                        value={editingTask.set_number}
                                        onChange={(e) => setEditingTask({ ...editingTask, set_number: parseInt(e.target.value) })}
                                        className="admin-input-styled"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>Set {n}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Unit Code</label>
                                    <input
                                        type="text"
                                        value={editingTask.task_code}
                                        onChange={(e) => setEditingTask({ ...editingTask, task_code: e.target.value.toUpperCase() })}
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
                                        onChange={(e) => setEditFile(e.target.files ? e.target.files[0] : null)}
                                        className="hidden-file-input"
                                    />
                                    <label htmlFor="edit-file-upload" className="custom-file-upload">
                                        <Upload size={20} className="upload-icon" />
                                        <div className="upload-text">
                                            {editFile ? (
                                                <span className="file-name-highlight">{editFile.name}</span>
                                            ) : (
                                                <span>Click to replace master DWG</span>
                                            )}
                                        </div>
                                    </label>
                                </div>
                                {editingTask.master_file_path && !editFile && (
                                    <div className="current-file-badge">
                                        <small>Current: {editingTask.master_file_path.split(/[\\/]/).pop()}</small>
                                    </div>
                                )}
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
                            <div className="global-modal-footer">
                                <button type="button" className="global-btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="global-btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}

            {fileManagerTask && (
                <FileManagerModal 
                    task={fileManagerTask} 
                    onClose={() => setFileManagerTask(null)} 
                />
            )}
        </div>
    );
};
