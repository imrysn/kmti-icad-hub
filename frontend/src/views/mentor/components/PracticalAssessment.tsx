import JSZip from 'jszip';
import { AlertCircle,CheckCircle2,ChevronRight,Clock,Download,ExternalLink,FileSpreadsheet,FileText,Folder,HelpCircle,Lock,Play,RotateCcw,Trash2,Upload,UploadCloud,Zap } from 'lucide-react';
import React,{ useCallback,useEffect,useMemo,useRef,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../../components/Modal';
import { useUI } from '../../../context/UIContext';
import { useNotification } from '../../../context/NotificationContext';
import { useBulkDownload } from '../../../hooks/useBulkDownload';
import { usePracticalTasks } from '../../../hooks/usePracticalTasks';
import { assessmentService,AssessmentTask } from '../../../services/assessmentService';
import { authService } from '../../../services/authService';
import { invalidateCache } from '../../../services/api';
import '../../../styles/3D_Modeling/CourseLesson.css';
import '../../../styles/mentor/PracticalAssessment.css';
import { getUnitCodeBadgeClass } from '../../../utils/unitCodeUtils';
import { TaskStopwatch,TaskStopwatchHandle } from './TaskStopwatch';
import { TimeRecordModal } from './TimeRecordModal';

interface PracticalAssessmentProps {
    onBack: () => void;
    is3DCompleted?: boolean;
    assessmentType?: '3D' | '2D';
}


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

    // Fix #7: Inject the app's styled ConfirmationModal into the hook
    const { requestConfirmation } = useUI();
    const { showNotification } = useNotification();
    const [quotationUploadingSet, setQuotationUploadingSet] = useState<number | null>(null);

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
    } = usePracticalTasks(assessmentType, requestConfirmation);

    const { handleBulkDownload, isDownloading: isBulkDownloading } = useBulkDownload();

    const handleQuotationUpload = async (file: File, setNumber: number) => {
        if (!file.name.toLowerCase().endsWith('.xlsx')) {
            showNotification('Please select an Excel quotation file (.xlsx).', 'error');
            return;
        }
        const confirmed = await requestConfirmation({
            title: 'Submit Quotation',
            message: `Submit ${file.name} to your trainer for review?`,
            confirmText: 'Submit',
            type: 'confirm'
        });
        if (!confirmed) return;

        setQuotationUploadingSet(setNumber);
        try {
            await assessmentService.submitQuotation(file, setNumber, assessmentType);
            invalidateCache('/assessments/my-submissions');
            window.dispatchEvent(new CustomEvent('kmti-refresh-my-submissions'));
            showNotification('Quotation submitted successfully! Awaiting trainer review.', 'success');
        } catch (error: any) {
            showNotification(error?.response?.data?.detail || 'Failed to submit quotation.', 'error');
        } finally {
            setQuotationUploadingSet(null);
        }
    };

    const handleOpenInCAD = async (submissionId: number) => {
        try {
            await assessmentService.openSubmissionInCAD(submissionId);
            showNotification('File sent to CAD software', 'success');
        } catch (error: any) {
            showNotification(error?.response?.data?.detail || 'Failed to open file in CAD.', 'error');
        }
    };

    const [trashModalOpen, setTrashModalOpen] = useState(false);
    const [timeRecordModalOpen, setTimeRecordModalOpen] = useState(false);

    const currentUser = authService.getStoredUser();
    const userId = currentUser ? currentUser.id : 0;
    const stopwatchRefs = useRef<{ [key: number]: TaskStopwatchHandle | null }>({});

    const getSetDisplayNumber = useCallback((s: number): number => {
        if (mySetMappings && mySetMappings.length > 0) {
            const mapping = mySetMappings.find((m: any) => Number(m.actual_set_number) === s && (m.assessment_type || '3D') === assessmentType);
            if (mapping) {
                return Math.abs(mapping.display_set_number);
            }
        }
        return s;
    }, [mySetMappings, assessmentType]);

    // Get dynamic display name for a set from tasks, fallback to ordinal label
    const getSetDisplayName = useCallback((s: number): string => {
        const displayNum = getSetDisplayNumber(s);
        const ordinals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
        const prefix = ordinals[displayNum - 1] || `${displayNum}th`;

        const setTask = tasks.find(t => t.set_number === s && t.set_name);
        if (setTask && setTask.set_name) {
            // Replace standard set ordinal prefixes with the mapped display prefix (e.g. "9th Set" -> "8th Set")
            if (/^\d+(?:st|nd|rd|th)\s+Set/i.test(setTask.set_name)) {
                return setTask.set_name.replace(/^\d+(?:st|nd|rd|th)\s+Set/i, `${prefix} Set`);
            }
            return setTask.set_name;
        }
        const suffix = displayNum <= 3 ? 'Set Parts' : 'Set Parts and Assembly';
        return `${prefix} ${suffix}`;
    }, [tasks, getSetDisplayNumber]);

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

        const confirmed = await requestConfirmation({
            title: "Confirm Upload",
            message: "Are you sure you want to compress and upload this folder?",
            confirmText: "Upload",
            type: "confirm"
        });
        if (!confirmed) return;

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

            await uploadTaskFile(zipFile, folderUploadTargetTask, assessmentType, true);

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

    const handleDrop = async (e: React.DragEvent, task: AssessmentTask, actualTaskId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActiveTaskId(null);

        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        const file = files[0];
        const elapsed = stopwatchRefs.current[actualTaskId]?.getElapsedSeconds() || 0;
        stopwatchRefs.current[actualTaskId]?.stopTimer();
        await uploadTaskFile(file, task, assessmentType, false, elapsed);
    };

    const isSetLocked = useCallback((s: number) => {
        // If trainee has custom set mappings from the trainer
        if (mySetMappings && mySetMappings.length > 0) {
            const activeCourseMappings = mySetMappings.filter((m: any) => (m.assessment_type || '3D') === assessmentType);
            const mapping = activeCourseMappings.find((m: any) => Number(m.actual_set_number) === s);
            if (!mapping) return true; // If not mapped, it's locked/hidden

            // If trainer explicitly unlocked this set (indicated by a negative display_set_number)
            if (mapping.display_set_number < 0) {
                return false;
            }

            // Find the minimum display set number in mappings (using absolute values)
            const displaySetNums = activeCourseMappings.map((m: any) => Math.abs(m.display_set_number)).sort((a, b) => a - b);
            const minDisplaySet = displaySetNums[0];

            if (Math.abs(mapping.display_set_number) === minDisplaySet) {
                if (assessmentType === '3D') {
                    return !is3DCompleted;
                }
                return false; // For 2D, first set is unlocked
            }

            // Find the display set immediately preceding `s` in the mappings sequence
            const prevDisplaySet = displaySetNums.filter(num => num < Math.abs(mapping.display_set_number)).pop();
            if (!prevDisplaySet) return true;

            const prevMapping = activeCourseMappings.find((m: any) => Math.abs(m.display_set_number) === prevDisplaySet);
            if (!prevMapping) return true;

            const prevActualSet = Number(prevMapping.actual_set_number);
            const prevSetTasks = tasks.filter(t => t.set_number === prevActualSet);
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
            // Fix #3: Derive the minimum 2D set dynamically  Eremoves the hardcoded s===4 assumption
            const all2DSets = tasks
                .filter(t => (t.assessment_type || '3D') === '2D')
                .map(t => t.set_number);
            const minSet2D = all2DSets.length > 0 ? Math.min(...all2DSets) : s;

            if (s === minSet2D) {
                return false; // First 2D set is always unlocked when 2D assessment is accessible
            } else {
                const prevSetTasks = tasks.filter(t => t.set_number === s - 1);
                const prevCompleted = prevSetTasks.length > 0 && prevSetTasks.every(t =>
                    // Fix #16: fallback must be '2D' when comparing against '2D', not '3D'
                    submissions.some(sub => sub.task_id === t.id && sub.status === 'approved' && (sub.assessment_type || '2D') === '2D')
                );
                return !prevCompleted;
            }
        }
    }, [assessmentType, is3DCompleted, tasks, submissions, mySetMappings]);

    const isCurrentSetLocked = useMemo(() => {
        return isSetLocked(activeSet);
    }, [activeSet, isSetLocked]);

    const sets = useMemo(() => {
        if (mySetMappings && mySetMappings.length > 0) {
            const activeCourseMappings = mySetMappings.filter((m: any) => (m.assessment_type || '3D') === assessmentType);
            if (activeCourseMappings.length > 0) {
                const mappedSetNums = activeCourseMappings
                    .map((m: any) => Number(m.actual_set_number))
                    .sort((a: number, b: number) => {
                        const mapA = activeCourseMappings.find((m: any) => Number(m.actual_set_number) === a);
                        const mapB = activeCourseMappings.find((m: any) => Number(m.actual_set_number) === b);
                        const valA = mapA?.display_set_number ? Math.abs(mapA.display_set_number) : 0;
                        const valB = mapB?.display_set_number ? Math.abs(mapB.display_set_number) : 0;
                        return valA - valB;
                    });
                return Array.from(new Set(mappedSetNums));
            }
        }

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
    }, [tasks, assessmentType, mySetMappings]);

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
                                        {isLocked ? <Lock size={14} /> : isCompleted ? <CheckCircle2 size={14} /> : <span className="set-number-badge">{getSetDisplayNumber(s)}</span>}
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
                            className="trash-bin-header-btn"
                            style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                            onClick={() => setTimeRecordModalOpen(true)}
                        >
                            <Clock size={16} /> Time Records
                        </button>
                        <button
                            className="trash-bin-header-btn"
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

                                        return Array.from(unitsMap.entries()).map(([unitName, unitTasks], unitIndex, unitEntries) => {
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
                                                        background: 'var(--bg-card, rgba(15, 23, 42, 0.45))',
                                                        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
                                                        borderRadius: '12px',
                                                        padding: '1rem 1.5rem',
                                                        marginBottom: '1rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        boxShadow: 'var(--shadow-card, 0 4px 6px -1px rgba(0, 0, 0, 0.1))'
                                                    }}>
                                                        <Folder size={20} style={{ color: 'var(--primary, #38bdf8)' }} />
                                                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main, #f8fafc)', fontWeight: 600 }}>{unitName}</h3>
                                                        <span className="task-count" style={{ marginLeft: 'auto', fontSize: '0.85rem', background: 'transparent', border: 'none', padding: 0, color: 'var(--text-muted, #94a3b8)' }}>{unitTasks.length} Files</span>
                                                        <button
                                                            type="button"
                                                            className={`task-action-btn primary ${isBulkDownloading ? 'disabled' : ''}`}
                                                            onClick={async (e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                const confirmed = await requestConfirmation({
                                                                    title: "Confirm Bulk Download",
                                                                    message: "Are you sure you want to download all task files for this unit?",
                                                                    confirmText: "Download All",
                                                                    type: "confirm"
                                                                });
                                                                if (confirmed) {
                                                                    handleBulkDownload(sortedUnitTasks);
                                                                }
                                                            }}
                                                            disabled={isBulkDownloading}
                                                            title="Download All Reference Drawing"
                                                            style={{ marginLeft: '0.5rem', padding: '0.4rem 0.8rem' }}
                                                        >
                                                            <UploadCloud size={16} style={{ transform: 'rotate(180deg)' }} /> Bulk Download
                                                        </button>
                                                        <button
                                                            className="task-action-btn danger"
                                                            onClick={() => handleBulkDelete(sortedUnitTasks.map(t => t.id))}
                                                            title="Delete All Submitted Files"
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
                                                                if (unitIndex === unitEntries.length - 1) {
                                                                    const sourceSetNumber = sortedUnitTasks[0].source_set_number ?? sortedUnitTasks[0].set_number;
                                                                    const quotationSubmission = submissions.find(submission =>
                                                                        submission.submission_kind === 'quotation'
                                                                        && Number(submission.task?.set_number) === Number(sourceSetNumber)
                                                                        && (submission.assessment_type || '3D') === assessmentType
                                                                    );
                                                                    augmentedUnitTasks.push({
                                                                        ...sortedUnitTasks[0],
                                                                        id: `quotation_${sourceSetNumber}_${assessmentType}`,
                                                                        real_id: quotationSubmission?.task?.id || quotationSubmission?.task_id,
                                                                        source_set_number: sourceSetNumber,
                                                                        task_code: 'QUOT',
                                                                        title: 'Quotation',
                                                                        description: 'Upload an Excel quotation or submit it automatically from Print Preview.',
                                                                        is_virtual_quotation: true
                                                                    } as any);
                                                                }
                                                            }
                                                            return augmentedUnitTasks.map((task: any) => {
                                                                const actualTaskId = (task.is_virtual_extra || task.is_virtual_quotation) ? task.real_id : task.id;
                                                                let taskSubmissions = submissions.filter(s => {
                                                                    if (task.is_virtual_quotation) {
                                                                        return s.submission_kind === 'quotation'
                                                                            && Number(s.task?.set_number) === Number(task.source_set_number)
                                                                            && (s.assessment_type || '3D') === assessmentType;
                                                                    }
                                                                    const subTaskId = s.task?.id || s.task_id;
                                                                    return Number(subTaskId) === Number(actualTaskId) && (s.assessment_type || '3D') === assessmentType;
                                                                }).sort((a, b) => {
                                                                    const dateA = new Date(a.submitted_at).getTime();
                                                                    const dateB = new Date(b.submitted_at).getTime();
                                                                    return dateB - dateA;
                                                                });

                                                                if (task.is_virtual_extra) {
                                                                    taskSubmissions = taskSubmissions.filter(s => s.submission_file_path?.match(/\.(zip|rar)$/i));
                                                                } else if (!task.is_virtual_quotation) {
                                                                    taskSubmissions = taskSubmissions.filter(s => s.submission_kind !== 'quotation');
                                                                    if (actualTaskId === sortedUnitTasks[0].id) {
                                                                        taskSubmissions = taskSubmissions.filter(s => !s.submission_file_path?.match(/\.(zip|rar)$/i));
                                                                    }
                                                                }

                                                                const latestSubmission = taskSubmissions[0];
                                                                // Find the most recent submission that has feedback (for rejection comments)
                                                                const feedbackSubmission = taskSubmissions.find(s => s.feedback && s.feedback.length > 0) || latestSubmission;

                                                                const isUploading = uploadingTaskId === task.id && isSubmitting;
                                                                const params = new URLSearchParams(location.search);
                                                                const targetUnit = params.get('unit');
                                                                const isHighlighted = targetUnit === task.task_code;
                                                                const uploadId = `cad-upload-${task.id}`;
                                                                const quotationUploadId = `quotation-upload-${task.source_set_number}-${assessmentType}`;
                                                                const isQuotationUploading = task.is_virtual_quotation
                                                                    && quotationUploadingSet === Number(task.source_set_number);

                                                                return (
                                                                    <div key={task.id} className={`task-row-card ${isHighlighted ? 'highlighted-task-row-card' : ''}`}>
                                                                        {/* Row Header */}
                                                                        <div className="task-row-header">
                                                                            <div className="task-row-info">
                                                                                <div className={`task-row-code code-${getUnitCodeBadgeClass(task.task_code).replace('badge-', '')}`} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', width: 'auto', borderRadius: '4px' }}>
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
                                                                                {!task.is_virtual_extra && !task.is_virtual_quotation && (
                                                                                    <TaskStopwatch
                                                                                        ref={(el) => stopwatchRefs.current[actualTaskId] = el}
                                                                                        userId={userId}
                                                                                        taskId={actualTaskId}
                                                                                        initialBaseTime={latestSubmission?.time_spent_seconds || 0}
                                                                                    />
                                                                                )}
                                                                                {!task.is_virtual_extra && !task.is_virtual_quotation && (
                                                                                    <>
                                                                                        <button type="button" className="task-action-btn primary" title="Open the reference drawing" onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            e.stopPropagation();
                                                                                            stopwatchRefs.current[actualTaskId]?.startTimer();
                                                                                            handleOpenInIJCAD(task);
                                                                                        }}>
                                                                                            <Play size={14} /> Open in iJCAD
                                                                                        </button>
                                                                                        <button type="button" className="task-action-btn secondary" title="Download the reference drawing" onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            e.stopPropagation();
                                                                                            stopwatchRefs.current[actualTaskId]?.startTimer();
                                                                                            handleDownloadTask(task);
                                                                                        }}>
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
                                                                                onDrop={task.is_virtual_quotation
                                                                                    ? (event) => {
                                                                                        event.preventDefault();
                                                                                        event.stopPropagation();
                                                                                        setDragActiveTaskId(null);
                                                                                        const file = event.dataTransfer.files?.[0];
                                                                                        if (file) handleQuotationUpload(file, Number(task.source_set_number));
                                                                                    }
                                                                                    : (e) => handleDrop(e, task, actualTaskId)}
                                                                                style={{ position: 'relative' }}
                                                                            >
                                                                                {dragActiveTaskId === task.id && (
                                                                                    <div className="drag-drop-overlay">
                                                                                        <UploadCloud size={36} className="drag-drop-icon" />
                                                                                        <span>{task.is_virtual_quotation ? 'Drop Excel quotation to upload' : 'Drop CAD file to upload'}</span>
                                                                                    </div>
                                                                                )}
                                                                                <div className="upload-header-row">
                                                                                    <span className="task-row-section-label">Your Submissions {taskSubmissions.length > 0 ? `(${taskSubmissions.length})` : ''}</span>
                                                                                    {task.is_virtual_quotation ? (
                                                                                        <label htmlFor={quotationUploadId} className={`resubmit-trigger-btn ${isQuotationUploading ? 'disabled' : ''}`}>
                                                                                            <Upload size={14} /> {isQuotationUploading ? 'Uploading...' : (latestSubmission ? 'Resubmit Excel' : 'Upload Excel')}
                                                                                        </label>
                                                                                    ) : task.is_virtual_extra ? (
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
                                                                                                    {task.is_virtual_quotation
                                                                                                        ? <FileSpreadsheet size={18} />
                                                                                                        : <FileText size={18} />}
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
                                                                                                <div className="table-actions-horizontal" style={{ gap: '4px' }}>
                                                                                                    <button
                                                                                                        className="action-btn-styled outline"
                                                                                                        title={
                                                                                                            task.is_virtual_quotation ? "Open in Excel" :
                                                                                                            task.is_virtual_extra ? "Open File" :
                                                                                                            "Open in CAD"
                                                                                                        }
                                                                                                        onClick={() => handleOpenInCAD(sub.id)}
                                                                                                    >
                                                                                                        <ExternalLink size={14} />
                                                                                                    </button>
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
                                                                                                <p>{task.is_virtual_quotation
                                                                                                    ? 'No quotation submitted yet. Drag and drop an .xlsx file or click Upload Excel.'
                                                                                                    : 'No files uploaded yet. Drag & drop CAD or .zip file here or click Upload'}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                {task.is_virtual_quotation ? (
                                                                                    <input
                                                                                        type="file"
                                                                                        id={quotationUploadId}
                                                                                        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                                                        onChange={(event) => {
                                                                                            const file = event.target.files?.[0];
                                                                                            if (file) handleQuotationUpload(file, Number(task.source_set_number));
                                                                                            event.target.value = '';
                                                                                        }}
                                                                                        disabled={isQuotationUploading}
                                                                                        style={{ display: 'none' }}
                                                                                    />
                                                                                ) : !task.is_virtual_extra && (
                                                                                    <input
                                                                                        type="file" id={uploadId}
                                                                                        accept=".dwg,.icd,.dxf,.step,.stp,.iges,.igs,.sat,.3dm"
                                                                                        onChange={(e) => {
                                                                                            const elapsed = stopwatchRefs.current[actualTaskId]?.getElapsedSeconds() || 0;
                                                                                            stopwatchRefs.current[actualTaskId]?.stopTimer();
                                                                                            handleFileUpload(e, task, assessmentType, elapsed);
                                                                                        }}
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
                                                                                                    <div className="feedback-details" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                                                                                                        {feedbackSubmission.feedback.map((fb, fIdx) => (
                                                                                                            <div key={fb.id} className="chat-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                                                                                                                {/* Trainer Comment Bubble */}
                                                                                                                {fb.comments && (
                                                                                                                    <div className="feedback-comment chat-bubble trainer-chat" style={{ background: 'linear-gradient(145deg, rgba(221, 77, 250, 0.1), rgba(221, 77, 250, 0.02))', border: '1px solid rgba(221, 77, 250, 0.2)', padding: '1rem', borderRadius: '12px 12px 12px 0', width: 'fit-content', maxWidth: '90%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderLeft: 'none' }}>
                                                                                                                        <span className="chat-author" style={{ fontSize: '0.75rem', color: '#e879f9', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '6px', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e879f9' }} /> Trainer</span>
                                                                                                                        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-light)' }}>{fb.comments}</p>

                                                                                                                        {fb.checkback_file_path && (
                                                                                                                            <div className="feedback-file-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', alignItems: 'center' }}>
                                                                                                                                <button
                                                                                                                                    className="checkback-open-btn"
                                                                                                                                    onClick={() => handleOpenFeedbackExcel(feedbackSubmission, fb)}
                                                                                                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#e879f9', padding: '6px 10px', background: 'rgba(221, 77, 250, 0.1)', border: 'none', borderRadius: '6px', transition: 'all 0.2s', fontWeight: 600, cursor: 'pointer' }}
                                                                                                                                >
                                                                                                                                    <FileSpreadsheet size={14} /> Open in Excel
                                                                                                                                </button>
                                                                                                                                <a
                                                                                                                                    href="#"
                                                                                                                                    className="checkback-download-icon-btn"
                                                                                                                                    title="Download copy"
                                                                                                                                    onClick={(e) => {
                                                                                                                                        e.preventDefault();
                                                                                                                                        e.stopPropagation();
                                                                                                                                        handleDownloadFeedback(feedbackSubmission, fb);
                                                                                                                                    }}
                                                                                                                                    style={{ padding: '6px', background: 'rgba(221, 77, 250, 0.1)', borderRadius: '6px', color: '#e879f9', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s' }}
                                                                                                                                >
                                                                                                                                    <Download size={14} />
                                                                                                                                </a>
                                                                                                                            </div>
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                )}

                                                                                                                {/* Trainee Reply Display */}
                                                                                                                {fb.trainee_reply && (
                                                                                                                    <div className="feedback-trainee-reply chat-bubble trainee-chat" style={{ background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '12px 12px 0 12px', width: 'fit-content', maxWidth: '90%', alignSelf: 'flex-end', marginLeft: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                                                                                                        <div className="reply-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginBottom: '0.5rem' }}>
                                                                                                                            <span className="reply-badge chat-author" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Reply</span>
                                                                                                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                                                                                                                        </div>
                                                                                                                        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-main)' }}>{fb.trainee_reply}</p>
                                                                                                                        {fb.replied_at && (
                                                                                                                            <small className="chat-time" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginTop: '0.5rem', textAlign: 'right' }}>{new Date(fb.replied_at).toLocaleDateString()}</small>
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                )}

                                                                                                                {/* Reply Input Box (rendered for the last feedback item if it doesn't have a trainee reply yet) */}
                                                                                                                {fIdx === (feedbackSubmission.feedback?.length ?? 0) - 1 && !fb.trainee_reply && (
                                                                                                                    <div className="feedback-reply-input-group" style={{ width: '100%', marginTop: '0.5rem' }}>
                                                                                                                        <textarea
                                                                                                                            placeholder="Reply to trainer comment..."
                                                                                                                            className="reply-textarea"
                                                                                                                            id={`reply-to-${fb.id}`}
                                                                                                                        />
                                                                                                                        <button
                                                                                                                            className="reply-submit-btn"
                                                                                                                            onClick={async () => {
                                                                                                                                const textarea = document.getElementById(`reply-to-${fb.id}`) as HTMLTextAreaElement;
                                                                                                                                const text = textarea?.value?.trim();
                                                                                                                                if (!text) return;
                                                                                                                                await handleReplyToFeedback(fb.id, text);
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            Send Reply
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                )}
                                                                                                            </div>
                                                                                                        ))}
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
                                                                                        {latestSubmission ? <Clock size={14} /> : <FileText size={14} />}
                                                                                        <span>{latestSubmission ? 'Waiting for trainer review' : 'No feedback yet'}</span>
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
                                        background: 'var(--bg-card-hover, rgba(0,0,0,0.02))',
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
                                            <span style={{ fontWeight: 600, color: 'var(--text-main, #0f172a)', wordBreak: 'break-all' }}>
                                                {sub.submission_file_path?.split(/[\\/]/).pop()}
                                            </span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted, #64748b)' }}>
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

            <TimeRecordModal
                isOpen={timeRecordModalOpen}
                onClose={() => setTimeRecordModalOpen(false)}
                tasks={tasks}
                submissions={submissions}
                userId={userId}
                getSetDisplayNumber={getSetDisplayNumber}
            />
        </>
    );
};
