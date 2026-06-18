import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Users, BookOpen, Save, Trash2, Edit2, Edit3, Check, ChevronDown, CheckCircle2, ChevronRight, UserPlus, Upload, GripVertical, Folder, UploadCloud, Download, RefreshCw } from 'lucide-react';
import { assessmentService, AssessmentTask } from '../../../services/assessmentService';
import { authService, User } from '../../../services/authService';
import { useNotification } from '../../../context/NotificationContext';
import { Modal } from '../../../components/Modal';
import { FileManagerModal } from './FileManagerModal';
import '../../../styles/admin/PracticalManagement.css';
import { getUnitCodeBadgeClass } from '../../../utils/unitCodeUtils';

export const PracticalManagement: React.FC = () => {
    const { showNotification } = useNotification();
    const location = useLocation();
    const [activeSubTab, setActiveSubTab] = useState<'tasks_3d' | 'tasks_2d' | 'assignments'>('tasks_3d');
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subtab = params.get('subtab');
        if (subtab && (subtab === 'tasks_3d' || subtab === 'tasks_2d' || subtab === 'assignments')) {
            setActiveSubTab(subtab as 'tasks_3d' | 'tasks_2d' | 'assignments');
        } else if (subtab === 'tasks') {
            setActiveSubTab('tasks_3d');
        }
    }, [location.search]);

    useEffect(() => {
        setSetFilter('all');
    }, [activeSubTab]);
    
    const [tasks, setTasks] = useState<AssessmentTask[]>([]);
    const [setFilter, setSetFilter] = useState<number | 'all'>('all');
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [mappings, setMappings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [availableSets, setAvailableSets] = useState<number[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        isDanger?: boolean;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        message: '',
        isDanger: false,
        onConfirm: () => {}
    });
    const [customSetNames, setCustomSetNames] = useState<Record<'3D' | '2D', Record<number, string>>>(() => {
        try {
            const saved = localStorage.getItem('custom_set_names_v2');
            return saved ? JSON.parse(saved) : { '3D': {}, '2D': {} };
        } catch {
            return { '3D': {}, '2D': {} };
        }
    });
    
    useEffect(() => {
        const typeKey = activeSubTab === 'tasks_2d' ? '2D' : '3D';
        const activeTasks = tasks.filter(t => 
            activeSubTab === 'tasks_2d'
                ? t.assessment_type === '2D'
                : ((t.assessment_type || '3D') === '3D' || (t.assessment_type === '2D' && t.set_number >= 4 && t.set_number <= 7))
        );
        const dbSets = activeTasks.map(t => t.set_number);
        const customSets = Object.keys(customSetNames[typeKey] || {}).map(Number);
        
        if (activeSubTab === 'tasks_2d') {
            const defaultSets = [4, 5, 6, 7];
            const filteredCustomSets = customSets.filter(s => s >= 4);
            const allSets = Array.from(new Set([...defaultSets, ...dbSets, ...filteredCustomSets])).sort((a, b) => a - b);
            setAvailableSets(allSets);
        } else {
            const defaultSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const allSets = Array.from(new Set([...defaultSets, ...dbSets, ...customSets])).sort((a, b) => a - b);
            setAvailableSets(allSets);
        }
    }, [tasks, customSetNames, activeSubTab]);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.filter-group')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            const namesFromTasks: Record<'3D' | '2D', Record<number, string>> = { '3D': {}, '2D': {} };
            tasks.forEach(t => {
                if (t.set_number && t.set_name) {
                    const type = (t.assessment_type === '2D' ? '2D' : '3D') as '3D' | '2D';
                    namesFromTasks[type][t.set_number] = t.set_name;
                }
            });
            setCustomSetNames(prev => {
                const updated = {
                    '3D': { ...prev['3D'], ...namesFromTasks['3D'] },
                    '2D': { ...prev['2D'], ...namesFromTasks['2D'] }
                };
                localStorage.setItem('custom_set_names_v2', JSON.stringify(updated));
                return updated;
            });
        }
    }, [tasks]);

    const getSetDisplayName = (setNum: number) => {
        const typeKey = activeSubTab === 'tasks_2d' ? '2D' : '3D';
        if (customSetNames[typeKey]?.[setNum]) {
            return customSetNames[typeKey][setNum];
        }
        const setTask = tasks.find(t => t.set_number === setNum && (t.assessment_type || '3D') === typeKey && t.set_name);
        if (setTask?.set_name) return setTask.set_name;
        if (setNum >= 100) {
            return `Set ${setNum - 100}`;
        }
        const ordinals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
        const prefix = ordinals[setNum - 1] || `${setNum}th`;
        const suffix = setNum <= 3 ? 'Set Parts' : 'Set Parts and Assembly';
        return `${prefix} ${suffix}`;
    };

    const [showRenameModal, setShowRenameModal] = useState(false);
    const [renameSetNum, setRenameSetNum] = useState<number | null>(null);
    const [renameSetNameValue, setRenameSetNameValue] = useState('');

    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [deleteSetNum, setDeleteSetNum] = useState<number | null>(null);

    const handleRenameSetPrompt = (setNum: number, currentName: string) => {
        setRenameSetNum(setNum);
        setRenameSetNameValue(currentName);
        setShowRenameModal(true);
        setDropdownOpen(false);
    };

    const submitRenameSet = async (e: React.FormEvent) => {
        e.preventDefault();
        if (renameSetNum === null) return;
        const trimmedName = renameSetNameValue.trim();
        if (!trimmedName) return;

        // Optimistically update local state & localStorage immediately
        const typeKey = activeSubTab === 'tasks_2d' ? '2D' : '3D';
        const updatedNames = {
            ...customSetNames,
            [typeKey]: { ...customSetNames[typeKey], [renameSetNum]: trimmedName }
        };
        setCustomSetNames(updatedNames);
        localStorage.setItem('custom_set_names_v2', JSON.stringify(updatedNames));

        try {
            await assessmentService.renameSet(renameSetNum, trimmedName, typeKey);
            showNotification(`Set ${renameSetNum} renamed to "${trimmedName}".`, 'success');
            fetchData();
        } catch (err) {
            showNotification('Failed to rename set on server, but local name updated.', 'warning');
        } finally {
            setShowRenameModal(false);
            setRenameSetNum(null);
            setRenameSetNameValue('');
        }
    };

    const handleDeleteSetBtn = (setNum: number) => {
        setDeleteSetNum(setNum);
        setShowDeleteConfirmModal(true);
        setDropdownOpen(false);
    };

    const submitDeleteSet = async () => {
        if (deleteSetNum === null) return;

        try {
            const typeKey = activeSubTab === 'tasks_2d' ? '2D' : '3D';
            await assessmentService.deleteSet(deleteSetNum, typeKey);
            // Also remove from local state
            const updatedNames = {
                ...customSetNames,
                [typeKey]: { ...customSetNames[typeKey] }
            };
            delete updatedNames[typeKey][deleteSetNum];
            setCustomSetNames(updatedNames);
            localStorage.setItem('custom_set_names_v2', JSON.stringify(updatedNames));

            showNotification(`Set ${deleteSetNum} deleted successfully.`, 'success');
            if (setFilter === deleteSetNum) {
                setSetFilter('all');
            }
            fetchData();
        } catch (err) {
            showNotification('Failed to delete set.', 'error');
        } finally {
            setShowDeleteConfirmModal(false);
            setDeleteSetNum(null);
        }
    };

    const [isSyncing, setIsSyncing] = useState(false);

    const handleSyncTasks = async () => {
        setIsSyncing(true);
        try {
            await assessmentService.syncTasks();
            showNotification('Successfully synced tasks from the server folder.', 'success');
            fetchData();
        } catch (err) {
            showNotification('Failed to sync tasks.', 'error');
        } finally {
            setIsSyncing(false);
        }
    };

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

    // Modal state for form conversion
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, [activeSubTab]);

    useEffect(() => {
        if (showCreateModal && typeof setFilter === 'number') {
            setNewTask(prev => ({ ...prev, set_number: setFilter }));
        } else if (showCreateModal) {
            setNewTask(prev => ({ ...prev, set_number: activeSubTab === 'tasks_2d' ? 4 : 1 }));
        }
    }, [showCreateModal, setFilter, activeSubTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeSubTab === 'tasks_3d' || activeSubTab === 'tasks_2d') {
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

        const taskCode = newTask.task_code.trim();
        const isAssembly = newTask.is_assembly;
        if (isAssembly && !taskCode.toUpperCase().startsWith('A')) {
            showNotification("Task code must start with 'A' for Assembly units (e.g. A6).", 'warning');
            return;
        }
        if (!isAssembly && !taskCode.toUpperCase().startsWith('P')) {
            showNotification("Task code must start with 'P' for Part units (e.g. P6).", 'warning');
            return;
        }

        setIsSubmitting(true);
        try {
            const type = activeSubTab === 'tasks_2d' ? '2D' : '3D';
            const taskWithSetName = {
                ...newTask,
                set_name: customSetNames[type][newTask.set_number] || '',
                assessment_type: type
            };
            await assessmentService.createTask(taskWithSetName, taskFile);
            showNotification('Unit created successfully.', 'success');
            setShowCreateModal(false);
            setNewTask({ set_number: newTask.set_number, task_code: '', title: '', description: '', master_file_path: '', is_assembly: false });
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
            const type = activeSubTab === 'tasks_2d' ? '2D' : '3D';
            const setName = customSetNames[type][newTask.set_number] || '';
            await assessmentService.bulkCreateTasks(newTask.set_number, bulkFiles, setName, newTask.is_assembly, type);
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

    const handleDeleteTask = (taskId: number) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Assessment Unit',
            message: 'Are you sure you want to delete this assessment unit? This action cannot be undone.',
            isDanger: true,
            onConfirm: async () => {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
                try {
                    await assessmentService.deleteTask(taskId);
                    showNotification('Unit deleted successfully.', 'success');
                    fetchData();
                } catch (err) {
                    showNotification('Failed to delete unit.', 'error');
                }
            }
        });
    };

    const handleDeleteAllInSet = () => {
        if (setFilter === 'all') return;
        setConfirmModal({
            isOpen: true,
            title: `Delete All in Set ${setFilter}`,
            message: `Are you absolutely sure you want to delete ALL ${filteredTasks.length} units in Set ${setFilter}? This action cannot be undone.`,
            isDanger: true,
            onConfirm: async () => {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
                setLoading(true);
                try {
                    const taskIds = filteredTasks.map(t => t.id);
                    await assessmentService.bulkDeleteTasks(taskIds);
                    showNotification(`All units in Set ${setFilter} deleted successfully.`, 'success');
                    fetchData();
                } catch (err) {
                    showNotification('Failed to delete units.', 'error');
                    fetchData();
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleDeleteAllTasks = () => {
        const tabTasks = tasks.filter(task => {
            const is2d = task.assessment_type === '2D';
            return activeSubTab === 'tasks_2d' ? is2d : !is2d;
        });
        const typeName = activeSubTab === 'tasks_2d' ? '2D' : '3D';
        setConfirmModal({
            isOpen: true,
            title: `Delete All ${typeName} Tasks`,
            message: `WARNING: Are you absolutely sure you want to delete ALL ${tabTasks.length} ${typeName} units across ALL sets? This will wipe the entire ${typeName} training set repository! This action cannot be undone.`,
            isDanger: true,
            onConfirm: async () => {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
                setLoading(true);
                try {
                    const taskIds = tabTasks.map(t => t.id);
                    await assessmentService.bulkDeleteTasks(taskIds);
                    showNotification(`All ${typeName} tasks deleted successfully.`, 'success');
                    fetchData();
                } catch (err) {
                    showNotification('Failed to delete tasks.', 'error');
                    fetchData();
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleDeleteMapping = (mappingId: number) => {
        setConfirmModal({
            isOpen: true,
            title: 'Remove Trainer Assignment',
            message: 'Are you sure you want to remove this trainer assignment?',
            isDanger: true,
            onConfirm: async () => {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
                try {
                    await assessmentService.deleteMapping(mappingId);
                    showNotification('Mapping removed successfully.', 'success');
                    fetchData();
                } catch (err) {
                    showNotification('Failed to remove mapping.', 'error');
                }
            }
        });
    };

    const handleEditTask = (task: AssessmentTask) => {
        setEditingTask(task);
        setShowEditModal(true);
    };

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask) return;
        const taskCode = (editingTask.task_code || '').trim();
        const isAssembly = editingTask.is_assembly;
        if (isAssembly && !taskCode.toUpperCase().startsWith('A')) {
            showNotification("Task code must start with 'A' for Assembly units (e.g. A6).", 'warning');
            return;
        }
        if (!isAssembly && !taskCode.toUpperCase().startsWith('P')) {
            showNotification("Task code must start with 'P' for Part units (e.g. P6).", 'warning');
            return;
        }

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
        let assemblyCount = 0;
        let partCount = 0;
        const reorderedTasks = newTasks.map((task, index) => {
            let task_code = task.task_code;
            if (task.is_assembly) {
                assemblyCount++;
                task_code = `A${assemblyCount}`;
            } else {
                partCount++;
                task_code = `P${partCount}`;
            }
            return {
                ...task,
                task_code,
                order: index + 1
            };
        });

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
    const filteredTasks = tasks
        .filter(task => {
            const is2d = task.assessment_type === '2D';
            if (activeSubTab === 'tasks_2d') {
                if (!is2d) return false;
            } else {
                const isShared2DSet = is2d && task.set_number >= 4 && task.set_number <= 7;
                if (is2d && !isShared2DSet) return false;
            }
            return setFilter === 'all' || task.set_number === setFilter;
        })
        .sort((a, b) => {
            if (a.set_number !== b.set_number) {
                return a.set_number - b.set_number;
            }
            const codeA = a.task_code || '';
            const codeB = b.task_code || '';
            return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
        });

    return (
        <div className="practical-management animate-fade-in">

            {activeSubTab === 'tasks_3d' || activeSubTab === 'tasks_2d' ? (
                <div className="tasks-management">
                    <div className="toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                            <label style={{ whiteSpace: 'nowrap' }}>Filter by Set:</label>
                            
                            <div style={{ position: 'relative' }}>
                                <button
                                    type="button"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="admin-input-styled"
                                    style={{
                                        padding: '0.35rem 1rem',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '1.5rem',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-main)',
                                        cursor: 'pointer',
                                        minWidth: '160px',
                                        height: '38px',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span>
                                        {setFilter === 'all' ? 'All Sets' : getSetDisplayName(setFilter)}
                                    </span>
                                    <ChevronDown size={16} style={{ color: 'var(--text-dim)' }} />
                                </button>
                                
                                {dropdownOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        marginTop: '0.25rem',
                                        background: '#1a1d24',
                                        border: '1px solid #2d323e',
                                        borderRadius: '8px',
                                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                                        zIndex: 1000,
                                        minWidth: '240px',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div
                                            onClick={() => {
                                                setSetFilter('all');
                                                setDropdownOpen(false);
                                            }}
                                            style={{
                                                padding: '0.6rem 1rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                background: setFilter === 'all' ? 'rgba(255,255,255,0.05)' : 'transparent',
                                                borderBottom: '1px solid #2d323e'
                                            }}
                                            className="set-option-item"
                                        >
                                            <span style={{ fontWeight: setFilter === 'all' ? 700 : 500, color: 'var(--text-main)' }}>All Sets</span>
                                            {setFilter === 'all' && <Check size={14} color="#DD4DFA" />}
                                        </div>
                                        
                                        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                            {availableSets.map(n => {
                                                const displayName = getSetDisplayName(n);
                                                const isSelected = setFilter === n;
                                                return (
                                                    <div
                                                        key={n}
                                                        style={{
                                                            padding: '0.6rem 1rem',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            background: isSelected ? 'rgba(255,255,255,0.05)' : 'transparent',
                                                            gap: '0.5rem'
                                                        }}
                                                        className="set-option-item"
                                                        onClick={() => {
                                                            setSetFilter(n);
                                                            setDropdownOpen(false);
                                                        }}
                                                    >
                                                        <span style={{
                                                            fontWeight: isSelected ? 700 : 500,
                                                            color: 'var(--text-main)',
                                                            flex: 1,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            {displayName}
                                                        </span>
                                                        <div 
                                                            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} 
                                                            onClick={e => e.stopPropagation()}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRenameSetPrompt(n, displayName);
                                                                }}
                                                                title="Rename Set"
                                                                style={{
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    color: 'var(--text-dim)',
                                                                    cursor: 'pointer',
                                                                    padding: '6px',
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Edit2 size={12} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteSetBtn(n);
                                                                }}
                                                                title="Delete Set"
                                                                style={{
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    color: '#f87171',
                                                                    cursor: 'pointer',
                                                                    padding: '6px',
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const nextSet = availableSets.length > 0 ? availableSets[availableSets.length - 1] + 1 : (activeSubTab === 'tasks_2d' ? 4 : 1);
                                                const typeKey = activeSubTab === 'tasks_2d' ? '2D' : '3D';
                                                
                                                // Register immediately in customSetNames to prevent dynamic useEffect pruning
                                                const updatedNames = {
                                                    ...customSetNames,
                                                    [typeKey]: { ...customSetNames[typeKey], [nextSet]: `Set ${nextSet}` }
                                                };
                                                setCustomSetNames(updatedNames);
                                                localStorage.setItem('custom_set_names_v2', JSON.stringify(updatedNames));
 
                                                setAvailableSets([...availableSets, nextSet]);
                                                setSetFilter(nextSet);
                                                showNotification(`Set ${nextSet} added.`, 'success');
                                            }}
                                            style={{
                                                padding: '0.6rem 1rem',
                                                background: 'transparent',
                                                border: 'none',
                                                borderTop: '1px solid #2d323e',
                                                color: '#DD4DFA',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.25rem',
                                                fontWeight: 600,
                                                fontSize: '0.8rem',
                                                width: '100%',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Plus size={14} /> Add Set
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <button 
                                className="add-user-btn" 
                                onClick={handleSyncTasks} 
                                disabled={isSyncing}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--primary)',
                                    color: 'var(--primary)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: isSyncing ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                                {isSyncing ? 'Syncing...' : 'Sync Tasks'}
                            </button>
                            <button className="add-user-btn" onClick={() => setShowCreateModal(true)}>
                                <Plus size={16} /> New Assessment Unit
                            </button>
                            {setFilter !== 'all' && filteredTasks.length > 0 && (
                                <button
                                    onClick={handleDeleteAllInSet}
                                    className="global-btn-danger"
                                    style={{
                                        padding: '0 1rem',
                                        height: '38px',
                                        fontSize: '0.875rem',
                                        borderRadius: '8px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontWeight: 600
                                    }}
                                >
                                    <Trash2 size={16} />
                                    Delete All in Set {setFilter}
                                </button>
                            )}
                            {setFilter === 'all' && tasks.filter(task => activeSubTab === 'tasks_2d' ? task.assessment_type === '2D' : (task.assessment_type || '3D') === '3D').length > 0 && (
                                <button
                                    onClick={handleDeleteAllTasks}
                                    className="global-btn-danger"
                                    style={{
                                        padding: '0 1rem',
                                        height: '38px',
                                        fontSize: '0.875rem',
                                        borderRadius: '8px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontWeight: 600
                                    }}
                                >
                                    <Trash2 size={16} />
                                    Delete All Tasks
                                </button>
                            )}
                        </div>
                    </div>

                    <Modal
                        isOpen={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                        title={isBulkMode ? 'Bulk Upload Units' : 'Create New Unit'}
                        size="md"
                        tag="CREATE_UNIT"
                    >
                        {!isBulkMode ? (
                            <form onSubmit={handleCreateTask}>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '1.25rem' }}>
                                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                        <label>Set Number</label>
                                        <select
                                            value={newTask.set_number}
                                            onChange={(e) => setNewTask({ ...newTask, set_number: parseInt(e.target.value) })}
                                        >
                                            {availableSets.map(n => <option key={n} value={n}>{getSetDisplayName(n)}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                        <label>Task Code</label>
                                        <input
                                            type="text"
                                            value={newTask.task_code}
                                            onChange={(e) => setNewTask({ ...newTask, task_code: e.target.value })}
                                            placeholder="e.g. A"
                                            required
                                        />
                                    </div>
                                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                        <label>Unit Type</label>
                                        <select
                                            value={newTask.is_assembly ? 'assembly' : 'part'}
                                            onChange={(e) => setNewTask({ ...newTask, is_assembly: e.target.value === 'assembly' })}
                                        >
                                            <option value="part">Part</option>
                                            <option value="assembly">Assembly</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn-outline"
                                            onClick={() => setIsBulkMode(true)}
                                            style={{ height: '42px', whiteSpace: 'nowrap' }}
                                        >
                                            Switch to Bulk
                                        </button>
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
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '1.25rem' }}>
                                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                        <label>Target Set</label>
                                        <select
                                            value={newTask.set_number}
                                            onChange={(e) => setNewTask({ ...newTask, set_number: parseInt(e.target.value) })}
                                        >
                                            {availableSets.map(n => <option key={n} value={n}>{getSetDisplayName(n)}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                        <label>Unit Type</label>
                                        <select
                                            value={newTask.is_assembly ? 'assembly' : 'part'}
                                            onChange={(e) => setNewTask({ ...newTask, is_assembly: e.target.value === 'assembly' })}
                                        >
                                            <option value="part">Part</option>
                                            <option value="assembly">Assembly</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn-outline"
                                            onClick={() => setIsBulkMode(false)}
                                            style={{ height: '42px', whiteSpace: 'nowrap' }}
                                        >
                                            Switch to Single
                                        </button>
                                    </div>
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
                                                <td><span className="set-pill-mini">{getSetDisplayName(task.set_number)}</span></td>
                                                <td><span className={`task-code-badge ${getUnitCodeBadgeClass(task.task_code)}`}>{task.task_code}</span></td>
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
                    <form onSubmit={handleUpdateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Set Number</label>
                                <select
                                    value={editingTask.set_number}
                                    onChange={(e) => setEditingTask({ ...editingTask, set_number: parseInt(e.target.value) })}
                                    className="admin-input-styled"
                                >
                                    {availableSets.map(n => <option key={n} value={n}>{getSetDisplayName(n)}</option>)}
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
                            <div className="form-group">
                                <label>Unit Type</label>
                                <select
                                    value={editingTask.is_assembly ? 'assembly' : 'part'}
                                    onChange={(e) => setEditingTask({ ...editingTask, is_assembly: e.target.value === 'assembly' })}
                                    className="admin-input-styled"
                                >
                                    <option value="part">Part</option>
                                    <option value="assembly">Assembly</option>
                                </select>
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
                </Modal>
            )}

            {fileManagerTask && (
                <FileManagerModal 
                    task={fileManagerTask} 
                    onClose={() => setFileManagerTask(null)} 
                />
            )}

            {showRenameModal && renameSetNum !== null && (
                <Modal
                    isOpen={showRenameModal}
                    onClose={() => {
                        setShowRenameModal(false);
                        setRenameSetNum(null);
                    }}
                    title={`Rename Set ${renameSetNum}`}
                    tag="RENAME_SET"
                    size="sm"
                >
                    <form onSubmit={submitRenameSet} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="form-group">
                            <label>Set Name</label>
                            <input
                                type="text"
                                value={renameSetNameValue}
                                onChange={(e) => setRenameSetNameValue(e.target.value)}
                                required
                                className="admin-input-styled"
                                placeholder={`e.g. Set ${renameSetNum}`}
                                autoFocus
                            />
                        </div>
                        <div className="global-modal-footer">
                            <button 
                                type="button" 
                                className="global-btn-secondary" 
                                onClick={() => {
                                    setShowRenameModal(false);
                                    setRenameSetNum(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="global-btn-primary">
                                Rename Set
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {showDeleteConfirmModal && deleteSetNum !== null && (
                <Modal
                    isOpen={showDeleteConfirmModal}
                    onClose={() => {
                        setShowDeleteConfirmModal(false);
                        setDeleteSetNum(null);
                    }}
                    title={`Delete Set ${deleteSetNum}`}
                    tag="DELETE_SET_CONFIRM"
                    size="sm"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            Are you absolutely sure you want to delete ALL units/tasks in <strong>{getSetDisplayName(deleteSetNum)}</strong>?
                        </p>
                        <p style={{ color: '#f87171', fontSize: '0.85rem', fontWeight: 600 }}>
                            ⚠️ This will delete the entire set from the database and cannot be undone!
                        </p>
                        <div className="global-modal-footer">
                            <button 
                                type="button" 
                                className="global-btn-secondary" 
                                onClick={() => {
                                    setShowDeleteConfirmModal(false);
                                    setDeleteSetNum(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="global-btn-danger" 
                                onClick={submitDeleteSet}
                            >
                                Yes, Delete Set
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {confirmModal.isOpen && (
                <Modal
                    isOpen={confirmModal.isOpen}
                    onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                    title={confirmModal.title}
                    tag="CONFIRM_MODAL"
                    size="sm"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                            {confirmModal.message}
                        </p>
                        <div className="global-modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                            <button 
                                type="button" 
                                className="global-btn-secondary" 
                                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className={confirmModal.isDanger ? "global-btn-danger" : "global-btn-primary"} 
                                onClick={confirmModal.onConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};
