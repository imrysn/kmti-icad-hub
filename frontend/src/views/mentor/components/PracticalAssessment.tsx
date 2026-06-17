import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, Upload, Play, CheckCircle2, AlertCircle, Clock, Download, Lock, Zap, Trash2, FileSpreadsheet, ChevronRight, UploadCloud, HelpCircle, Folder, RotateCcw } from 'lucide-react';
import { AssessmentTask, AssessmentSubmission } from '../../../services/assessmentService';
import { usePracticalTasks } from '../../../hooks/usePracticalTasks';
import { useBulkDownload } from '../../../hooks/useBulkDownload';
import '../../../styles/mentor/PracticalAssessment.css';
import '../../../styles/3D_Modeling/CourseLesson.css';
import { Modal } from '../../../components/Modal';
import JSZip from 'jszip';

interface PracticalAssessmentProps {
    onBack: () => void;
    is3DCompleted?: boolean;
    assessmentType?: '3D' | '2D';
}

/** Ordinal label helper */
const getSetLabel = (n: number): string => {
    const ordinals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
    const suffix = n <= 3 ? 'Set Parts' : 'Set Parts and Assembly';
    return `${ordinals[n - 1]} ${suffix}`;
};

export const PracticalAssessment: React.FC<PracticalAssessmentProps> = ({ onBack, is3DCompleted = false, assessmentType = '3D' }) => {
    const location = useLocation();
    const [showInstructions, setShowInstructions] = useState<boolean>(() => {
        return localStorage.getItem('kmti_assessment_instructions_expanded') !== 'false';
    });

    const [dragActiveTaskId, setDragActiveTaskId] = useState<number | null>(null);

    // Folder Upload State
    const [uploadFolderModalOpen, setUploadFolderModalOpen] = useState(false);
    const [customFolderName, setCustomFolderName] = useState('Purchase Parts');
    const [folderFiles, setFolderFiles] = useState<File[]>([]);
    const [isZipping, setIsZipping] = useState(false);
    const [folderUploadTargetTask, setFolderUploadTargetTask] = useState<AssessmentTask | null>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);

    const toggleInstructions = () => {
        setShowInstructions(prev => {
            const next = !prev;
            localStorage.setItem('kmti_assessment_instructions_expanded', next.toString());
            return next;
        });
    };

    const {
        tasks,
        submissions,
        loading,
        activeSet,
        setActiveSet,
        isSubmitting,
        expandedFeedbackId,
        setExpandedFeedbackId,
        uploadingTaskId,
        handleOpenInIJCAD,
        handleDownloadTask,
        handleOpenFeedbackExcel,
        handleDownloadFeedback,
        handleFileUpload,
        uploadTaskFile,
        handleDeleteSubmission,
        handleReplyToFeedback,
        trashSubmissions,
        loadingTrash,
        fetchTrash,
        handleRestore,
        handlePermanentDelete,
        handleBulkDelete,
        handleEmptyTrash,
        mySetMappings
    } = usePracticalTasks(assessmentType);

    const { handleBulkDownload, isDownloading: isBulkDownloading } = useBulkDownload();

    const [trashModalOpen, setTrashModalOpen] = useState(false);

    // Get dynamic display name for a set from tasks, fallback to ordinal label
    const getSetDisplayName = useCallback((s: number): string => {
        const setTask = tasks.find(t => t.set_number === s && t.set_name);
        if (setTask && setTask.set_name) {
            return setTask.set_name;
        }
        const ordinals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
        const prefix = ordinals[s - 1] || `${s}th`;
        const suffix = s <= 3 ? 'Set Parts' : 'Set Parts and Assembly';
        return `${prefix} ${suffix}`;
    }, [tasks]);

    // Auto-select correct Set from URL parameter
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const targetSet = params.get('set');
        if (targetSet) {
            setActiveSet(Number(targetSet));
        }
    }, [location.search, setActiveSet]);

    // Auto-scroll to highlighted task row card
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const targetUnit = params.get('unit');
        if (targetUnit) {
            const timer = setTimeout(() => {
                const element = document.querySelector('.highlighted-task-row-card');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [location.search, tasks]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragOver = (e: React.DragEvent, taskId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActiveTaskId(taskId);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActiveTaskId(null);
    };

    const handleFolderFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFolderFiles(Array.from(e.target.files));
        }
    };

    const submitFolderUpload = async () => {
        if (!folderUploadTargetTask || folderFiles.length === 0 || !customFolderName.trim()) return;
        setIsZipping(true);
        try {
            const zip = new JSZip();
            // Add files directly to the root of the zip (the zip file itself acts as the folder)
            folderFiles.forEach(file => {
                const path = file.webkitRelativePath || file.name;
                const pathParts = path.split('/');
                if (pathParts.length > 1) {
                    // Remove the root folder name that the browser includes in webkitRelativePath
                    pathParts.shift();
                }
                const newPath = pathParts.join('/');
                zip.file(newPath, file);
            });

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const zipFile = new File([zipBlob], `${customFolderName.trim()}.zip`, { type: 'application/zip' });

            await uploadTaskFile(zipFile, folderUploadTargetTask, assessmentType);
            
            // Cleanup
            setUploadFolderModalOpen(false);
            setFolderFiles([]);
            setCustomFolderName('Purchase Parts');
        } catch (error) {
            console.error('Error zipping folder:', error);
        } finally {
            setIsZipping(false);
        }
    };

    const handleDrop = async (e: React.DragEvent, task: AssessmentTask) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActiveTaskId(null);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await uploadTaskFile(e.dataTransfer.files[0], task, assessmentType);
        }
    };

    const isSetLocked = useCallback((s: number) => {
        // If trainee has custom set mappings from the trainer
        if (mySetMappings && mySetMappings.length > 0) {
            // Find if this display set is mapped (comparing absolute value)
            const mapping = mySetMappings.find((m: any) => Math.abs(m.display_set_number) === s);
            if (!mapping) return true; // If not mapped, it's locked/hidden

            // If trainer explicitly unlocked this set (indicated by a negative display_set_number)
            if (mapping.display_set_number < 0) {
                return false;
            }

            // Find the minimum display set number in mappings (using absolute values)
            const displaySetNums = mySetMappings.map((m: any) => Math.abs(m.display_set_number)).sort((a, b) => a - b);
            const minDisplaySet = displaySetNums[0];

            if (s === minDisplaySet) {
                if (assessmentType === '3D') {
                    return !is3DCompleted;
                }
                return false; // For 2D, first set is unlocked
            }

            // Find the display set immediately preceding `s` in the mappings
            const prevDisplaySet = displaySetNums.filter(num => num < s).pop();
            if (!prevDisplaySet) return true;

            const prevSetTasks = tasks.filter(t => t.set_number === prevDisplaySet);
            const prevCompleted = prevSetTasks.length > 0 && prevSetTasks.every(t =>
                submissions.some(sub => sub.task_id === t.id && sub.status === 'approved' && (sub.assessment_type || '3D') === assessmentType)
            );
            
            if (assessmentType === '3D') {
                return !prevCompleted || !is3DCompleted;
            }
            return !prevCompleted;
        }

        // Default logic (no mappings)
        if (assessmentType === '3D') {
            if (s === 1) {
                return !is3DCompleted; // Ensure 3D is completed to unlock 1st set
            } else {
                const prevSetTasks = tasks.filter(t => t.set_number === s - 1);
                const prevCompleted = prevSetTasks.length > 0 && prevSetTasks.every(t =>
                    submissions.some(sub => sub.task_id === t.id && sub.status === 'approved' && (sub.assessment_type || '3D') === '3D')
                );
                return !prevCompleted || !is3DCompleted;
            }
        } else {
            if (s === 4) {
                return false; // 4th set is always unlocked if the 2D component itself is opened.
            } else {
                const prevSetTasks = tasks.filter(t => t.set_number === s - 1);
                const prevCompleted = prevSetTasks.length > 0 && prevSetTasks.every(t =>
                    submissions.some(sub => sub.task_id === t.id && sub.status === 'approved' && (sub.assessment_type || '3D') === '2D')
                );
                return !prevCompleted;
            }
        }
    }, [assessmentType, is3DCompleted, tasks, submissions, mySetMappings]);

    const isCurrentSetLocked = useMemo(() => {
        return isSetLocked(activeSet);
    }, [activeSet, isSetLocked]);

    const sets = useMemo(() => {
        const uniqueSets = Array.from(new Set(tasks.map(t => t.set_number))).sort((a, b) => a - b);
        
        if (uniqueSets.length === 0) {
            return assessmentType === '3D' ? Array.from({ length: 10 }, (_, i) => i + 1) : [4, 5, 6, 7];
        }

        if (assessmentType === '2D') {
            // Default 2D sets are Set 4, Set 5, Set 6, and Set 7.
            // We also include any other sets >= 4 that exist in tasks (e.g. Set 8, Set 9).
            const otherSets = uniqueSets.filter(s => s >= 4);
            return Array.from(new Set([4, 5, 6, 7, ...otherSets])).sort((a, b) => a - b);
        }

        return uniqueSets;
    }, [tasks, assessmentType]);
        
    useEffect(() => {
        if (sets.length > 0 && !sets.includes(activeSet)) {
            setActiveSet(sets[0]);
        }
    }, [sets, activeSet, setActiveSet]);

    const currentSetTasks = tasks.filter(t => t.set_number === activeSet);

    if (loading) {
        return (
            <div className="assessment-loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', width: '100%', gap: '1rem' }}>
                <div className="spinner"></div>
                <p style={{ margin: 0 }}>Preparing your assessment environment...</p>
            </div>
        );
    }

    return (
        <>
            {/* ── Sidebar: Set Pill Navigator ── */}
            <aside className="assessment-sidebar">
                <div className="sidebar-inner-container">
                    <div className="sidebar-course-header">
                        <div className="sidebar-course-meta">
                            <h2 className="sidebar-course-title">Assessment Sets</h2>
                        </div>
                        <span className="task-count">{sets.length} Sets</span>
                    </div>

                    <div className="sidebar-set-list">
                        {sets.map(s => {
                            const setTasks = tasks.filter(t => t.set_number === s);
                            const isCompleted = setTasks.length > 0 && setTasks.every(t =>
                                submissions.some(sub => sub.task_id === t.id && sub.status === 'approved' && (sub.assessment_type || '3D') === assessmentType)
                            );

                            const isLocked = isSetLocked(s);

                            return (
                                <button
                                    key={s}
                                    className={`sidebar-set-pill ${activeSet === s ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                                    onClick={() => {
                                        if (!isLocked) setActiveSet(s);
                                    }}
                                >
                                    <span className="sidebar-set-indicator">
                                        {isLocked ? <Lock size={14} /> : isCompleted ? <CheckCircle2 size={14} /> : <span className="set-number-badge">{s}</span>}
                                    </span>
                                    <span className="sidebar-set-label">{getSetDisplayName(s)}</span>
                                    <span className="sidebar-set-task-count">{setTasks.length} tasks</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="main-content-viewer">
                {/* Sticky Header */}
                <div className="sticky-lesson-controls" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                            {getSetDisplayName(activeSet)}
                        </h3>
                        <span className="task-count">{currentSetTasks.length} Tasks</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button 
                            className="task-action-btn"
                            style={{ 
                                padding: '0.4rem 1rem', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '4px',
                                color: '#fff',
                                fontSize: '0.85rem'
                            }}
                            onClick={() => {
                                fetchTrash();
                                setTrashModalOpen(true);
                            }}
                        >
                            <Trash2 size={16} /> Trash Bin
                        </button>
                        <button className="exit-course-btn" onClick={onBack}>
                            EXIT COURSE
                        </button>
                    </div>
                </div>

                {/* Task Row Cards */}
                <div className="lesson-split-layout">
                    <div className="lesson-scroll-area assessment-scroll-override">
                        <div className="lesson-content-body">
                            <style>{`
                                /* Dark Mode Styles (Default) */
                                .assessment-instructions-card {
                                    background: rgba(30, 41, 59, 0.45);
                                    backdrop-filter: blur(16px);
                                    -webkit-backdrop-filter: blur(16px);
                                    border: 1px solid rgba(255, 255, 255, 0.08);
                                    border-radius: 16px;
                                    padding: 1.5rem;
                                    margin-bottom: 2rem;
                                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                                    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
                                }
                                .assessment-instructions-card.collapsed {
                                    padding: 1rem 1.5rem;
                                    margin-bottom: 1.5rem;
                                }
                                .instructions-header {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    cursor: pointer;
                                    user-select: none;
                                }
                                .instructions-title {
                                    display: flex;
                                    align-items: center;
                                    gap: 0.75rem;
                                    font-weight: 600;
                                    color: #f8fafc;
                                    font-size: 1.05rem;
                                }
                                .instructions-icon-animated {
                                    color: #38bdf8;
                                    animation: pulseGlow 2s infinite alternate;
                                }
                                .instructions-toggle-btn {
                                    background: rgba(255, 255, 255, 0.05);
                                    border: 1px solid rgba(255, 255, 255, 0.1);
                                    color: #94a3b8;
                                    padding: 0.4rem 0.8rem;
                                    border-radius: 8px;
                                    font-size: 0.85rem;
                                    cursor: pointer;
                                    transition: all 0.2s;
                                    font-weight: 500;
                                }
                                .instructions-toggle-btn:hover {
                                    background: rgba(255, 255, 255, 0.1);
                                    color: #f8fafc;
                                    border-color: rgba(255, 255, 255, 0.2);
                                }
                                .instructions-content {
                                    margin-top: 1.5rem;
                                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                                    padding-top: 1.5rem;
                                }
                                .steps-container {
                                    display: grid;
                                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                                    gap: 1.25rem;
                                    margin-bottom: 1.5rem;
                                }
                                .step-card {
                                    background: rgba(15, 23, 42, 0.3);
                                    border: 1px solid rgba(255, 255, 255, 0.04);
                                    border-radius: 12px;
                                    padding: 1.25rem;
                                    transition: all 0.2s ease;
                                }
                                .step-card:hover {
                                    transform: translateY(-2px);
                                    border-color: rgba(56, 189, 248, 0.2);
                                    background: rgba(15, 23, 42, 0.4);
                                }
                                .step-badge {
                                    display: inline-block;
                                    background: rgba(56, 189, 248, 0.15);
                                    color: #38bdf8;
                                    padding: 0.2rem 0.5rem;
                                    border-radius: 6px;
                                    font-size: 0.75rem;
                                    font-weight: 600;
                                    margin-bottom: 0.75rem;
                                    text-transform: uppercase;
                                    letter-spacing: 0.05em;
                                }
                                .step-card h5 {
                                    margin: 0 0 0.5rem 0;
                                    font-size: 0.95rem;
                                    font-weight: 600;
                                    color: #f1f5f9;
                                }
                                .step-card p {
                                    margin: 0;
                                    font-size: 0.8rem;
                                    line-height: 1.5;
                                    color: #94a3b8;
                                }
                                .instructions-footer {
                                    display: flex;
                                    align-items: center;
                                    gap: 0.75rem;
                                    background: rgba(16, 185, 129, 0.08);
                                    border: 1px solid rgba(16, 185, 129, 0.15);
                                    padding: 0.85rem 1.25rem;
                                    border-radius: 10px;
                                    font-size: 0.85rem;
                                    color: #a7f3d0;
                                }

                                /* Light Mode Specific Overrides */
                                [data-theme='light'] .assessment-instructions-card {
                                    background: rgba(241, 245, 249, 0.75);
                                    border: 1px solid rgba(148, 163, 184, 0.2);
                                    box-shadow: 0 10px 25px -10px rgba(148, 163, 184, 0.2);
                                }
                                [data-theme='light'] .instructions-title {
                                    color: #0f172a;
                                }
                                [data-theme='light'] .instructions-icon-animated {
                                    color: #0284c7;
                                }
                                [data-theme='light'] .instructions-toggle-btn {
                                    background: rgba(0, 0, 0, 0.03);
                                    border: 1px solid rgba(0, 0, 0, 0.08);
                                    color: #475569;
                                }
                                [data-theme='light'] .instructions-toggle-btn:hover {
                                    background: rgba(0, 0, 0, 0.06);
                                    color: #0f172a;
                                    border-color: rgba(0, 0, 0, 0.15);
                                }
                                [data-theme='light'] .instructions-content {
                                    border-top: 1px solid rgba(0, 0, 0, 0.06);
                                }
                                [data-theme='light'] .step-card {
                                    background: rgba(255, 255, 255, 0.7);
                                    border: 1px solid rgba(148, 163, 184, 0.15);
                                }
                                [data-theme='light'] .step-card:hover {
                                    border-color: rgba(2, 132, 199, 0.3);
                                    background: rgba(255, 255, 255, 0.95);
                                    box-shadow: 0 4px 12px rgba(148, 163, 184, 0.08);
                                }
                                [data-theme='light'] .step-badge {
                                    background: rgba(2, 132, 199, 0.1);
                                    color: #0284c7;
                                }
                                [data-theme='light'] .step-card h5 {
                                    color: #1e293b;
                                }
                                [data-theme='light'] .step-card p {
                                    color: #475569;
                                }
                                [data-theme='light'] .instructions-footer {
                                    background: rgba(16, 185, 129, 0.06);
                                    border: 1px solid rgba(16, 185, 129, 0.12);
                                    color: #065f46;
                                }

                                /* Drag and Drop Styles */
                                .task-row-upload {
                                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                                }
                                .task-row-upload.drag-active {
                                    border: 2px dashed #38bdf8 !important;
                                    background: rgba(56, 189, 248, 0.08) !important;
                                }
                                [data-theme='light'] .task-row-upload.drag-active {
                                    border: 2px dashed #0284c7 !important;
                                    background: rgba(2, 132, 199, 0.05) !important;
                                }
                                .drag-drop-overlay {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    background: rgba(15, 23, 42, 0.85);
                                    backdrop-filter: blur(4px);
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 0.75rem;
                                    border-radius: 12px;
                                    color: #38bdf8;
                                    font-weight: 600;
                                    font-size: 0.95rem;
                                    z-index: 10;
                                    pointer-events: none;
                                    animation: dragFadeIn 0.25s ease-out;
                                }
                                [data-theme='light'] .drag-drop-overlay {
                                    background: rgba(255, 255, 255, 0.92);
                                    color: #0284c7;
                                }
                                .drag-drop-icon {
                                    animation: bounceDrop 0.8s infinite alternate ease-in-out;
                                }
                                @keyframes dragFadeIn {
                                    from { opacity: 0; transform: scale(0.98); }
                                    to { opacity: 1; transform: scale(1); }
                                }
                                @keyframes bounceDrop {
                                    0% { transform: translateY(0); }
                                    100% { transform: translateY(-8px); }
                                }

                                /* Locked Set Screen Styles */
                                .locked-set-overlay {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    padding: 4rem 2rem;
                                    background: rgba(15, 23, 42, 0.2);
                                    border-radius: 16px;
                                    border: 1px dashed rgba(255, 255, 255, 0.08);
                                    backdrop-filter: blur(8px);
                                    width: 100%;
                                    min-height: 380px;
                                }
                                [data-theme='light'] .locked-set-overlay {
                                    background: rgba(241, 245, 249, 0.4);
                                    border: 1px dashed rgba(0, 0, 0, 0.1);
                                }
                                .locked-set-card {
                                    max-width: 480px;
                                    text-align: center;
                                    background: rgba(15, 23, 42, 0.65);
                                    border: 1px solid rgba(255, 255, 255, 0.08);
                                    border-radius: 16px;
                                    padding: 3rem 2.5rem;
                                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    gap: 1.25rem;
                                }
                                [data-theme='light'] .locked-set-card {
                                    background: rgba(255, 255, 255, 0.95);
                                    border: 1px solid rgba(148, 163, 184, 0.25);
                                    box-shadow: 0 20px 40px rgba(148, 163, 184, 0.15);
                                }
                                .lock-icon-container {
                                    width: 72px;
                                    height: 72px;
                                    background: rgba(239, 68, 68, 0.15);
                                    border: 1px solid rgba(239, 68, 68, 0.3);
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: #ef4444;
                                    margin-bottom: 0.5rem;
                                }
                                .locked-set-card h3 {
                                    margin: 0;
                                    font-size: 1.4rem;
                                    font-weight: 700;
                                    color: #f1f5f9;
                                }
                                [data-theme='light'] .locked-set-card h3 {
                                    color: #0f172a;
                                }
                                .lock-explanation {
                                    margin: 0;
                                    font-size: 0.95rem;
                                    line-height: 1.6;
                                    color: #94a3b8;
                                }
                                [data-theme='light'] .lock-explanation {
                                    color: #475569;
                                }
                                .unlock-requirement-badge {
                                    display: flex;
                                    align-items: center;
                                    gap: 0.5rem;
                                    background: rgba(56, 189, 248, 0.12);
                                    border: 1px solid rgba(56, 189, 248, 0.25);
                                    color: #38bdf8;
                                    padding: 0.6rem 1.2rem;
                                    border-radius: 9999px;
                                    font-size: 0.85rem;
                                    font-weight: 600;
                                    margin-top: 0.5rem;
                                }
                                [data-theme='light'] .unlock-requirement-badge {
                                    background: rgba(2, 132, 199, 0.08);
                                    border: 1px solid rgba(2, 132, 199, 0.2);
                                    color: #0284c7;
                                }
                                @keyframes lockShake {
                                    0%, 100% { transform: rotate(0); }
                                    20%, 60% { transform: rotate(-8deg); }
                                    40%, 80% { transform: rotate(8deg); }
                                }
                                .lock-icon-animated {
                                    animation: lockShake 3s infinite ease-in-out;
                                }

                                @keyframes pulseGlow {
                                    0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.4)); }
                                    100% { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.8)); }
                                }
                                 /* Glowing Deep-Link Highlight */
                                 .highlighted-task-row-card {
                                     border: 2px solid #3b82f6 !important;
                                     box-shadow: 
                                         0 0 15px rgba(59, 130, 246, 0.6),
                                         0 5px 12px rgba(0, 0, 0, 0.3) !important;
                                     animation: highlightPulse 2s infinite ease-in-out;
                                 }

                                 @keyframes highlightPulse {
                                     0% {
                                         transform: scale(1);
                                         box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
                                         border-color: #3b82f6;
                                     }
                                     50% {
                                         transform: scale(1.015);
                                         box-shadow: 
                                             0 0 25px rgba(59, 130, 246, 0.95),
                                             0 0 40px rgba(59, 130, 246, 0.45);
                                         border-color: #60a5fa;
                                     }
                                     100% {
                                         transform: scale(1);
                                         box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
                                         border-color: #3b82f6;
                                     }
                                 }
                             `}</style>

                            {/* ── Glassmorphic Premium Instructions Panel ── */}
                            <div className={`assessment-instructions-card ${showInstructions ? 'expanded' : 'collapsed'}`}>
                                <div className="instructions-header" onClick={toggleInstructions}>
                                    <div className="instructions-title">
                                        <HelpCircle size={18} className="instructions-icon-animated" />
                                        <span>How to Complete Practical Assessments</span>
                                    </div>
                                    <button className="instructions-toggle-btn">
                                        {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
                                    </button>
                                </div>

                                {showInstructions && (
                                    <div className="instructions-content animate-fade-in">
                                        <div className="steps-container">
                                            <div className="step-card">
                                                <span className="step-badge">Step 1</span>
                                                <h5>Launch iJCAD</h5>
                                                <p>Click <strong>"Open in iJCAD"</strong> to instantly open the master template on your machine.</p>
                                            </div>
                                            <div className="step-card">
                                                <span className="step-badge">Step 2</span>
                                                <h5>Draft & Detail</h5>
                                                <p>Complete the drawing using correct layers, dimensions, and standard practices.</p>
                                            </div>
                                            <div className="step-card">
                                                <span className="step-badge">Step 3</span>
                                                <h5>Submit File</h5>
                                                <p>Click <strong>"Upload"</strong> to submit your saved <code>.dwg</code>, <code>.dxf</code>, or a <code>.zip</code> file (for purchased parts) to the trainer.</p>
                                            </div>
                                            <div className="step-card">
                                                <span className="step-badge">Step 4</span>
                                                <h5>Checkback Review</h5>
                                                <p>Open the trainer's Excel correction file with <strong>"Open in Excel"</strong> to review any revisions.</p>
                                            </div>
                                        </div>

                                        <div className="instructions-footer">
                                            <div className="status-dot success" />
                                            <span>Once all tasks in the current set are <strong>Approved</strong>, the next assessment set will unlock automatically!</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="assessment-task-grid">
                                {isCurrentSetLocked ? (
                                    <div className="locked-set-overlay animate-fade-in">
                                        <div className="locked-set-card">
                                            <div className="lock-icon-container">
                                                <Lock size={32} className="lock-icon-animated" />
                                            </div>
                                            <h3>{getSetDisplayName(activeSet)} Locked</h3>
                                            <p className="lock-explanation">
                                                {activeSet >= 4 && !is3DCompleted ? (
                                                    <>
                                                        This assembly set requires completing all prerequisite lessons.
                                                        Please finish the <strong>3D Modeling Course</strong> to unlock the <strong>4th Set Parts and Assembly</strong>.
                                                    </>
                                                ) : (
                                                    <>
                                                        To access this assessment set, you must first complete all drafting tasks in the previous set and have them approved or submitted for review.
                                                    </>
                                                )}
                                            </p>

                                            {activeSet >= 4 && !is3DCompleted && (
                                                <div className="unlock-requirement-badge">
                                                    <Zap size={14} />
                                                    <span>Prerequisite: Course 1 (3D Modeling) Completed</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : currentSetTasks.length > 0 ? (
                                    (() => {
                                        const unitsMap = new Map<string, AssessmentTask[]>();
                                        currentSetTasks.forEach(task => {
                                            const unitName = task.unit_name || 'Ungrouped Tasks';
                                            if (!unitsMap.has(unitName)) {
                                                unitsMap.set(unitName, []);
                                            }
                                            unitsMap.get(unitName)!.push(task);
                                        });

                                        return Array.from(unitsMap.entries()).map(([unitName, unitTasks]) => {
                                            const sortedUnitTasks = [...unitTasks].sort((a, b) => {
                                                const isPartA = !a.is_assembly;
                                                const isPartB = !b.is_assembly;
                                                if (isPartA !== isPartB) return isPartA ? -1 : 1;
                                                const codeA = a.task_code || '';
                                                const codeB = b.task_code || '';
                                                if (!codeA && codeB) return 1;
                                                if (codeA && !codeB) return -1;
                                                return codeA.localeCompare(codeB, undefined, { numeric: true });
                                            });

                                            return (
                                                <div key={unitName} className="assessment-unit-group" style={{ marginBottom: '2.5rem' }}>
                                                    <div className="unit-header-bar" style={{
                                                        background: 'rgba(15, 23, 42, 0.4)',
                                                        border: '1px solid rgba(255,255,255,0.08)',
                                                        borderRadius: '12px',
                                                        padding: '1rem 1.5rem',
                                                        marginBottom: '1rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                                    }}>
                                                        <Folder size={20} style={{ color: '#38bdf8' }} />
                                                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', fontWeight: 600 }}>{unitName}</h3>
                                                        <span className="task-count" style={{ marginLeft: 'auto', fontSize: '0.85rem' }}>{unitTasks.length} Files</span>
                                                        <button
                                                            className={`task-action-btn primary ${isBulkDownloading ? 'disabled' : ''}`}
                                                            onClick={() => handleBulkDownload(sortedUnitTasks)}
                                                            disabled={isBulkDownloading}
                                                            title="Download All Unit Files"
                                                            style={{ marginLeft: '0.5rem', padding: '0.4rem 0.8rem' }}
                                                        >
                                                            <UploadCloud size={16} style={{ transform: 'rotate(180deg)' }} /> Bulk Download
                                                        </button>
                                                        <button
                                                            className="task-action-btn danger"
                                                            onClick={() => handleBulkDelete(sortedUnitTasks.map(t => t.id))}
                                                            title="Delete All Uploaded Files"
                                                            style={{ 
                                                                marginLeft: '0.5rem', 
                                                                padding: '0.4rem 0.8rem', 
                                                                background: 'rgba(239, 68, 68, 0.1)', 
                                                                border: '1px solid rgba(239, 68, 68, 0.3)', 
                                                                color: '#fca5a5' 
                                                            }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="unit-tasks-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem' }}>
                                                        {(() => {
                                                            const augmentedUnitTasks = [...sortedUnitTasks];
                                                            if (sortedUnitTasks.length > 0) {
                                                                augmentedUnitTasks.push({
                                                                    ...sortedUnitTasks[0],
                                                                    id: `virtual_${sortedUnitTasks[0].id}`,
                                                                    real_id: sortedUnitTasks[0].id,
                                                                    task_code: 'EXTRA',
                                                                    title: 'Additional Folders & Purchase Parts',
                                                                    description: 'Upload your purchased parts and extra folders here.',
                                                                    is_virtual_extra: true
                                                                } as any);
                                                            }
                                                            return augmentedUnitTasks.map((task: any, index) => {
                                                                const actualTaskId = task.is_virtual_extra ? task.real_id : task.id;
                                                                let taskSubmissions = submissions.filter(s => {
                                                                    const subTaskId = s.task?.id || s.task_id;
                                                                    return Number(subTaskId) === Number(actualTaskId) && (s.assessment_type || '3D') === assessmentType;
                                                                }).sort((a, b) => {
                                                                    const dateA = new Date(a.submitted_at).getTime();
                                                                    const dateB = new Date(b.submitted_at).getTime();
                                                                    return dateB - dateA;
                                                                });

                                                                if (task.is_virtual_extra) {
                                                                    taskSubmissions = taskSubmissions.filter(s => s.submission_file_path?.match(/\.(zip|rar)$/i));
                                                                } else if (actualTaskId === sortedUnitTasks[0].id) {
                                                                    taskSubmissions = taskSubmissions.filter(s => !s.submission_file_path?.match(/\.(zip|rar)$/i));
                                                                }

                                                            const latestSubmission = taskSubmissions[0];
                                                            // Find the most recent submission that has feedback (for rejection comments)
                                                            const feedbackSubmission = taskSubmissions.find(s => s.feedback && s.feedback.length > 0) || latestSubmission;

                                                            const isUploading = uploadingTaskId === task.id && isSubmitting;
                                                            const params = new URLSearchParams(location.search);
                                                            const targetUnit = params.get('unit');
                                                            const isHighlighted = targetUnit === task.task_code;
                                                            const uploadId = `cad-upload-${task.id}`;

                                                            return (
                                                                <div key={task.id} className={`task-row-card ${isHighlighted ? 'highlighted-task-row-card' : ''}`}>
                                                                    {/* Row Header */}
                                                                    <div className="task-row-header">
                                                                        <div className="task-row-info">
                                                                            <div className="task-row-code" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', width: 'auto', borderRadius: '4px' }}>
                                                                                {task.task_code || (task.is_assembly ? 'ASM' : 'PRT')}
                                                                            </div>
                                                                            <div className="task-row-meta">
                                                                                <h4 className="task-row-title">{task.title}</h4>
                                                                                <p className="task-row-desc">
                                                                                    {task.description || "Follow the drafting standards specified in the master drawing."}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="task-row-actions">
                                                                            {!task.is_virtual_extra && (
                                                                                <>
                                                                                    <button className="task-action-btn primary" onClick={() => handleOpenInIJCAD(task)}>
                                                                                        <Play size={14} /> Open in iJCAD
                                                                                    </button>
                                                                                    <button className="task-action-btn secondary" onClick={() => handleDownloadTask(task)}>
                                                                                        <Download size={14} /> Download
                                                                                    </button>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {/* Row Body: Upload + Feedback side by side */}
                                                                    <div className="task-row-body">
                                                                        {/* Upload Section */}
                                                                        <div
                                                                            className={`task-row-upload ${dragActiveTaskId === task.id ? 'drag-active' : ''}`}
                                                                            onDragEnter={handleDrag}
                                                                            onDragOver={(e) => handleDragOver(e, task.id)}
                                                                            onDragLeave={handleDragLeave}
                                                                            onDrop={(e) => handleDrop(e, task)}
                                                                            style={{ position: 'relative' }}
                                                                        >
                                                                            {dragActiveTaskId === task.id && (
                                                                                <div className="drag-drop-overlay">
                                                                                    <UploadCloud size={36} className="drag-drop-icon" />
                                                                                    <span>Drop CAD file to upload</span>
                                                                                </div>
                                                                            )}
                                                                            <div className="upload-header-row">
                                                                                <span className="task-row-section-label">Your Submissions {taskSubmissions.length > 0 ? `(${taskSubmissions.length})` : ''}</span>
                                                                                {task.is_virtual_extra ? (
                                                                                    <button className={`resubmit-trigger-btn`} onClick={() => { setFolderUploadTargetTask(sortedUnitTasks[0]); setUploadFolderModalOpen(true); }}>
                                                                                        <Upload size={14} /> {taskSubmissions.length > 0 ? 'Add Another Folder' : 'Upload Folder'}
                                                                                    </button>
                                                                                ) : (
                                                                                    <label htmlFor={uploadId} className={`resubmit-trigger-btn ${isUploading ? 'disabled' : ''}`}>
                                                                                        <Upload size={14} /> {latestSubmission ? 'Resubmit' : 'Upload'}
                                                                                    </label>
                                                                                )}
                                                                            </div>

                                                                            <div className="submissions-history-list">
                                                                                {taskSubmissions.length > 0 ? (
                                                                                    taskSubmissions.map((sub, sIdx) => (
                                                                                        <div key={sub.id} className={`uploaded-file-card history-item ${sIdx === 0 ? 'latest' : ''}`}>
                                                                                            <div className="uploaded-file-info">
                                                                                                <FileText size={18} />
                                                                                                <div className="file-meta-stack">
                                                                                                    <span className="uploaded-file-name">
                                                                                                        {sub.submission_file_path?.split(/[\\/]/).pop()}
                                                                                                    </span>
                                                                                                    <div className="history-badges">
                                                                                                        {!task.is_virtual_extra && sIdx === 0 && <span className="history-badge latest">Latest</span>}
                                                                                                        {!task.is_virtual_extra && sIdx > 0 && <span className="history-badge resubmit">Attempt {taskSubmissions.length - sIdx}</span>}
                                                                                                        <div className={`assessment-status-badge ${sub.status}`}>
                                                                                                            {sub.status === 'approved' && <CheckCircle2 size={12} />}
                                                                                                            {sub.status === 'pending' && <Clock size={12} />}
                                                                                                            {sub.status === 'rejected' && <AlertCircle size={12} />}
                                                                                                            <span>{sub.status}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="table-actions-horizontal">
                                                                                                <button
                                                                                                    className="action-btn-styled delete"
                                                                                                    title="Delete submission"
                                                                                                    onClick={() => handleDeleteSubmission(sub.id)}
                                                                                                >
                                                                                                    <Trash2 size={14} />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    <div className="no-submissions-yet">
                                                                                        <div className="empty-upload-placeholder">
                                                                                            <UploadCloud size={24} />
                                                                                            <p>No files uploaded yet. Drag & drop CAD or .zip file here or click Upload</p>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            {!task.is_virtual_extra && (
                                                                                <input
                                                                                    type="file" id={uploadId}
                                                                                    accept=".dwg,.icd,.dxf,.step,.stp,.iges,.igs,.sat,.3dm"
                                                                                    onChange={(e) => handleFileUpload(e, task, assessmentType)}
                                                                                    disabled={isUploading}
                                                                                    style={{ display: 'none' }}
                                                                                />
                                                                            )}
                                                                        </div>

                                                                        {/* Trainer Feedback Section */}
                                                                        <div className="task-row-feedback">
                                                                            <span className="task-row-section-label">Trainer Feedback</span>
                                                                            {latestSubmission?.status === 'pending' ? (
                                                                                <>
                                                                                    {feedbackSubmission && feedbackSubmission.id !== latestSubmission.id ? (
                                                                                        <>
                                                                                            {expandedFeedbackId === feedbackSubmission.id ? (
                                                                                                <div className={`feedback-container pending animate-scale-in`}>
                                                                                                    <div className="feedback-header-row" onClick={() => setExpandedFeedbackId(null)}>
                                                                                                        <div className="feedback-status-info">
                                                                                                            <Clock size={16} />
                                                                                                            <span>Revision Resubmitted (Pending Review)</span>
                                                                                                        </div>
                                                                                                        <span className="close-feedback-btn">Close</span>
                                                                                                    </div>

                                                                                                    {feedbackSubmission.feedback && feedbackSubmission.feedback.length > 0 && (
                                                                                                        <div className="feedback-details">
                                                                                                            <div style={{ padding: '8px 12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#fdba74', marginBottom: '10px' }}>
                                                                                                                Your corrected work has been submitted and is currently pending trainer review. Below is the feedback from your previous attempt.
                                                                                                            </div>
                                                                                                            {feedbackSubmission.feedback[0].comments && (
                                                                                                                <div className="feedback-comment">
                                                                                                                    <p>{feedbackSubmission.feedback[0].comments}</p>
                                                                                                                </div>
                                                                                                            )}

                                                                                                            {/* Trainee Reply Display */}
                                                                                                            {feedbackSubmission.feedback[0].trainee_reply && (
                                                                                                                <div className="feedback-trainee-reply">
                                                                                                                    <div className="reply-header">
                                                                                                                        <span className="reply-badge">Your Reply</span>
                                                                                                                        {feedbackSubmission.feedback[0].replied_at && (
                                                                                                                            <small>{new Date(feedbackSubmission.feedback[0].replied_at).toLocaleDateString()}</small>
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                    <p>{feedbackSubmission.feedback[0].trainee_reply}</p>
                                                                                                                </div>
                                                                                                            )}

                                                                                                            {feedbackSubmission.feedback[0].checkback_file_path && (
                                                                                                                <div className="feedback-file-actions">
                                                                                                                    <button
                                                                                                                        className="checkback-open-btn"
                                                                                                                        onClick={() => handleOpenFeedbackExcel(feedbackSubmission)}
                                                                                                                    >
                                                                                                                        <FileSpreadsheet size={16} />
                                                                                                                        Open in Excel
                                                                                                                    </button>
                                                                                                                    <a
                                                                                                                        href="#"
                                                                                                                        className="checkback-download-icon-btn"
                                                                                                                        title="Download copy"
                                                                                                                        onClick={(e) => {
                                                                                                                            e.preventDefault();
                                                                                                                            e.stopPropagation();
                                                                                                                            handleDownloadFeedback(feedbackSubmission);
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <Download size={14} />
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>
                                                                                            ) : (
                                                                                                <div
                                                                                                    className={`feedback-message pending clickable animate-fade-in`}
                                                                                                    onClick={() => setExpandedFeedbackId(feedbackSubmission.id)}
                                                                                                >
                                                                                                    <Clock size={14} style={{ color: '#f59e0b' }} />
                                                                                                    <span className="feedback-preview-text" style={{ color: '#fdba74' }}>
                                                                                                        Pending Review (Corrected Work Submitted) - View previous feedback
                                                                                                    </span>
                                                                                                    <ChevronRight size={14} className="expand-icon" />
                                                                                                </div>
                                                                                            )}
                                                                                        </>
                                                                                    ) : (
                                                                                        <div className="feedback-message empty">
                                                                                            <Clock size={14} />
                                                                                            <span>Waiting for trainer review</span>
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            ) : feedbackSubmission?.status && feedbackSubmission.status !== 'pending' ? (
                                                                                <>
                                                                                    {expandedFeedbackId === feedbackSubmission.id ? (
                                                                                        <div className={`feedback-container ${feedbackSubmission.status} animate-scale-in`}>
                                                                                            <div className="feedback-header-row" onClick={() => setExpandedFeedbackId(null)}>
                                                                                                <div className="feedback-status-info">
                                                                                                    {feedbackSubmission.status === 'approved' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                                                                                    <span>{feedbackSubmission.status === 'approved' ? 'Submission Approved' : 'Revision Required'}</span>
                                                                                                </div>
                                                                                                <span className="close-feedback-btn">Close</span>
                                                                                            </div>

                                                                                            {feedbackSubmission.feedback && feedbackSubmission.feedback.length > 0 && (
                                                                                                <div className="feedback-details">
                                                                                                    {feedbackSubmission.feedback[0].comments && (
                                                                                                        <div className="feedback-comment">
                                                                                                            <p>{feedbackSubmission.feedback[0].comments}</p>
                                                                                                        </div>
                                                                                                    )}

                                                                                                    {/* Trainee Reply Display */}
                                                                                                    {feedbackSubmission.feedback[0].trainee_reply && (
                                                                                                        <div className="feedback-trainee-reply">
                                                                                                            <div className="reply-header">
                                                                                                                <span className="reply-badge">Your Reply</span>
                                                                                                                {feedbackSubmission.feedback[0].replied_at && (
                                                                                                                    <small>{new Date(feedbackSubmission.feedback[0].replied_at).toLocaleDateString()}</small>
                                                                                                                )}
                                                                                                            </div>
                                                                                                            <p>{feedbackSubmission.feedback[0].trainee_reply}</p>
                                                                                                        </div>
                                                                                                    )}

                                                                                                    {/* Reply Input (only if no reply yet) */}
                                                                                                    {!feedbackSubmission.feedback[0].trainee_reply && (
                                                                                                        <div className="feedback-reply-input-group">
                                                                                                            <textarea
                                                                                                                placeholder="Reply to trainer comment..."
                                                                                                                className="reply-textarea"
                                                                                                                id={`reply-to-${feedbackSubmission.feedback[0].id}`}
                                                                                                            />
                                                                                                            <button
                                                                                                                className="reply-submit-btn"
                                                                                                                onClick={async () => {
                                                                                                                    const feedbackItems = feedbackSubmission.feedback;
                                                                                                                    if (!feedbackItems || feedbackItems.length === 0) return;

                                                                                                                    const feedbackId = feedbackItems[0].id;
                                                                                                                    const textarea = document.getElementById(`reply-to-${feedbackId}`) as HTMLTextAreaElement;
                                                                                                                    const text = textarea?.value?.trim();
                                                                                                                    if (!text) return;

                                                                                                                    await handleReplyToFeedback(feedbackId, text);
                                                                                                                }}
                                                                                                            >
                                                                                                                Send Reply
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    )}

                                                                                                    {feedbackSubmission.feedback[0].checkback_file_path && (
                                                                                                        <div className="feedback-file-actions">
                                                                                                            <button
                                                                                                                className="checkback-open-btn"
                                                                                                                onClick={() => handleOpenFeedbackExcel(feedbackSubmission)}
                                                                                                            >
                                                                                                                <FileSpreadsheet size={16} />
                                                                                                                Open in Excel
                                                                                                            </button>
                                                                                                            <a
                                                                                                                href="#"
                                                                                                                className="checkback-download-icon-btn"
                                                                                                                title="Download copy"
                                                                                                                onClick={(e) => {
                                                                                                                    e.preventDefault();
                                                                                                                    e.stopPropagation();
                                                                                                                    handleDownloadFeedback(feedbackSubmission);
                                                                                                                }}
                                                                                                            >
                                                                                                                <Download size={14} />
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    )}
                                                                                                    {feedbackSubmission.status === 'rejected' && latestSubmission?.status === 'rejected' && (
                                                                                                        <div className="feedback-resubmit-action">
                                                                                                            <button
                                                                                                                className="btn-primary resubmit-work-btn"
                                                                                                                onClick={() => document.getElementById(uploadId)?.click()}
                                                                                                            >
                                                                                                                <Upload size={14} /> Resubmit Corrected Work
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div
                                                                                            className={`feedback-message ${feedbackSubmission.status} clickable animate-fade-in`}
                                                                                            onClick={() => setExpandedFeedbackId(feedbackSubmission.id)}
                                                                                        >
                                                                                            {feedbackSubmission.status === 'approved' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                                                                            <span className="feedback-preview-text">
                                                                                                {feedbackSubmission.feedback?.[0]?.comments || (feedbackSubmission.status === 'approved' ? 'Approved by trainer' : 'Revision required')}
                                                                                            </span>
                                                                                            <ChevronRight size={14} className="expand-icon" />
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <div className="feedback-message empty">
                                                                                    {latestSubmission?.status === 'pending' ? <Clock size={14} /> : <FileText size={14} />}
                                                                                    <span>{latestSubmission?.status === 'pending' ? 'Waiting for trainer review' : 'No feedback yet'}</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        });
                                                        })()}
                                                    </div>
                                                </div>
                                            );
                                        });
                                    })()
                                ) : (
                                    <div className="no-task-selected-portal animate-fade-in">
                                        <div className="portal-aura"></div>
                                        <div className="portal-content">
                                            <div className="portal-icon-wrapper">
                                                <Zap size={64} className="portal-icon" />
                                            </div>
                                            <h2>No Tasks Available</h2>
                                            <p>There are no tasks assigned for {getSetDisplayName(activeSet)} yet. Check back later or contact your trainer.</p>
                                            <div className="portal-hint">
                                                <div className="hint-item">
                                                    <div className="hint-dot"></div>
                                                    <span>10 Sequential Sets</span>
                                                </div>
                                                <div className="hint-item">
                                                    <div className="hint-dot"></div>
                                                    <span>Direct iJCAD Integration</span>
                                                </div>
                                                <div className="hint-item">
                                                    <div className="hint-dot"></div>
                                                    <span>Trainer Checkback System</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Folder Upload Modal */}
            <Modal
                isOpen={uploadFolderModalOpen}
                onClose={() => setUploadFolderModalOpen(false)}
                title="Upload Custom Folder"
                tag="FOLDER_UPLOAD"
                size="sm"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                        <label>Folder Name:</label>
                        <input 
                            type="text" 
                            className="modal-input" 
                            value={customFolderName} 
                            onChange={(e) => setCustomFolderName(e.target.value)} 
                            placeholder="e.g. Purchase Parts"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Select Folder:</label>
                        <div 
                            className="upload-dropzone" 
                            onClick={() => folderInputRef.current?.click()}
                            style={{ border: '2px dashed var(--border-color)', padding: '2rem', textAlign: 'center', cursor: 'pointer', borderRadius: '8px', marginTop: '0.5rem' }}
                        >
                            <UploadCloud size={32} style={{ color: 'var(--text-muted)', marginBottom: '10px' }} />
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Click to select a folder from your computer</p>
                            <input 
                                type="file" 
                                multiple 
                                // @ts-ignore
                                webkitdirectory="true" 
                                directory="true"
                                ref={folderInputRef} 
                                style={{ display: 'none' }} 
                                onChange={handleFolderFilesSelect} 
                            />
                        </div>
                    </div>
                    {folderFiles.length > 0 && (
                        <div className="selected-files-summary">
                            <p><strong>{folderFiles.length} files selected</strong></p>
                            <ul style={{ maxHeight: '100px', overflowY: 'auto', fontSize: '12px', paddingLeft: '1rem', marginTop: '0.5rem' }}>
                                {folderFiles.slice(0, 5).map((f, i) => (
                                    <li key={i}>{f.webkitRelativePath || f.name}</li>
                                ))}
                                {folderFiles.length > 5 && <li>...and {folderFiles.length - 5} more</li>}
                            </ul>
                        </div>
                    )}
                    <div className="global-modal-footer" style={{ marginTop: '1rem' }}>
                        <button className="global-btn-secondary" onClick={() => setUploadFolderModalOpen(false)}>Cancel</button>
                        <button className="global-btn-primary" onClick={submitFolderUpload} disabled={isZipping || folderFiles.length === 0 || !customFolderName.trim()}>
                            {isZipping ? 'Compressing & Uploading...' : 'Upload'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Trash Modal */}
            <Modal
                isOpen={trashModalOpen}
                onClose={() => setTrashModalOpen(false)}
                title="Trash Bin"
                tag="TRASH_BIN"
                size="lg"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Submissions deleted by trainee</p>
                        {trashSubmissions.length > 0 && (
                            <button 
                                onClick={handleEmptyTrash}
                                style={{ background: 'transparent', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                            >
                                Empty Trash
                            </button>
                        )}
                    </div>

                    <div className="global-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', padding: 0 }}>
                        {loadingTrash ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading trash...</div>
                        ) : trashSubmissions.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                                <Trash2 size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                <p>Trash is empty</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {trashSubmissions.map(sub => (
                                    <div key={sub.id} style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 200px', minWidth: 0 }}>
                                            <span style={{ fontWeight: 600, color: '#f8fafc', wordBreak: 'break-all' }}>
                                                {sub.submission_file_path?.split(/[\\/]/).pop()}
                                            </span>
                                            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                                                Deleted: {new Date(sub.updated_at || sub.submitted_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                            <button 
                                                style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.5rem 0.8rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', fontWeight: 500 }}
                                                onClick={() => handleRestore(sub.id)}
                                                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; }}
                                            >
                                                <RotateCcw size={16} /> Restore
                                            </button>
                                            <button 
                                                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.5rem 0.8rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', fontWeight: 500 }}
                                                onClick={() => handlePermanentDelete(sub.id)}
                                                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};
