import React, { useState, useEffect } from 'react';
import { Plus, Users, BookOpen, Save, Trash2, Edit3, CheckCircle2, ChevronRight, UserPlus, Upload } from 'lucide-react';
import { assessmentService, AssessmentTask } from '../../../services/assessmentService';
import { authService, User } from '../../../services/authService';
import { useNotification } from '../../../context/NotificationContext';
import '../../../styles/admin/PracticalManagement.css';

export const PracticalManagement: React.FC = () => {
    const { showNotification } = useNotification();
    const [activeSubTab, setActiveSubTab] = useState<'tasks' | 'assignments'>('tasks');
    const [tasks, setTasks] = useState<AssessmentTask[]>([]);
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
    const [editFile, setEditFile] = useState<File | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const trainers = allUsers.filter(u => u.role === 'employee' || u.role === 'admin');
    const trainees = allUsers.filter(u => u.role === 'trainee');

    return (
        <div className="practical-management animate-fade-in">
            <div className="admin-sub-tabs">
                <button 
                    className={`sub-tab-btn ${activeSubTab === 'tasks' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('tasks')}
                >
                    <BookOpen size={18} /> Units & Tasks
                </button>
                <button 
                    className={`sub-tab-btn ${activeSubTab === 'assignments' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('assignments')}
                >
                    <Users size={18} /> Trainer Assignments
                </button>
            </div>

            {activeSubTab === 'tasks' ? (
                <div className="tasks-management">
                    <div className="management-header">
                        <h3>Assessment Unit Library</h3>
                        <p>Configure the 7-set practical units and their master drafting files</p>
                    </div>

                    <div className="management-grid">
                        <div className="creation-form-card">
                            <div className="form-header-toggle">
                                <h4>{isBulkMode ? 'Bulk Upload Units' : 'Create New Unit'}</h4>
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
                                                onChange={(e) => setNewTask({...newTask, set_number: parseInt(e.target.value)})}
                                            >
                                                {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>Set {n}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Unit Code</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. A" 
                                                value={newTask.task_code}
                                                onChange={(e) => setNewTask({...newTask, task_code: e.target.value.toUpperCase()})}
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
                                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Master .dwg File</label>
                                        <div className="file-upload-area">
                                            <input 
                                                type="file" 
                                                id="task-file" 
                                                accept=".dwg"
                                                onChange={(e) => setTaskFile(e.target.files?.[0] || null)}
                                                required
                                            />
                                            <label htmlFor="task-file">
                                                <Upload size={18} />
                                                <span>{taskFile ? taskFile.name : 'Choose Master DWG'}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Instructions (Optional)</label>
                                        <textarea 
                                            placeholder="Provide unit instructions..."
                                            value={newTask.description}
                                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : <><Plus size={18} /> Create Unit</>}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleBulkUpload}>
                                    <div className="form-group">
                                        <label>Target Set</label>
                                        <select 
                                            value={newTask.set_number} 
                                            onChange={(e) => setNewTask({...newTask, set_number: parseInt(e.target.value)})}
                                        >
                                            {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>Set {n}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Select Multiple .dwg Files</label>
                                        <div className="file-upload-area bulk">
                                            <input 
                                                type="file" 
                                                id="bulk-files" 
                                                accept=".dwg"
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
                                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Uploading...' : <><Upload size={18} /> Bulk Upload Units</>}
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="task-inventory">
                            {tasks.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Set</th>
                                            <th>Code</th>
                                            <th>Title</th>
                                            <th>File Path</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map(task => (
                                            <tr key={task.id}>
                                                <td><span className="set-pill-mini">{task.set_number}</span></td>
                                                <td><strong>{task.task_code}</strong></td>
                                                <td>{task.title}</td>
                                                <td className="dim-text">{task.master_file_path}</td>
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
                    <div className="management-header">
                        <h3>Trainer Assignments</h3>
                        <p>Map trainees to specific employees for assessment review and oversight</p>
                    </div>

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
                                        onChange={(e) => setEditingTask({...editingTask, set_number: parseInt(e.target.value)})}
                                        className="admin-input-styled"
                                    >
                                        {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>Set {n}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Unit Code</label>
                                    <input 
                                        type="text" 
                                        value={editingTask.task_code}
                                        onChange={(e) => setEditingTask({...editingTask, task_code: e.target.value.toUpperCase()})}
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
                                    onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                                    required
                                    className="admin-input-styled"
                                />
                            </div>
                            <div className="form-group">
                                <label>Master .dwg File (Optional)</label>
                                <div className="file-input-wrapper-styled">
                                    <input 
                                        type="file" 
                                        accept=".dwg" 
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
                                    onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                                    rows={4}
                                    placeholder="Provide unit instructions..."
                                    className="admin-input-styled"
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
