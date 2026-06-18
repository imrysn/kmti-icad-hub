import React, { useState, useEffect } from 'react';
import { Settings, Save, Plus, Trash2, AlertCircle, FileText } from 'lucide-react';
import { assessmentService, AssessmentTask } from '../../../services/assessmentService';
import { useNotification } from '../../../context/NotificationContext';
import { getUnitCodeBadgeClass, getUnitCodeInlineStyle } from '../../../utils/unitCodeUtils';

interface TraineeSetConfigurationProps {
    searchTerm?: string;
}

export const TraineeSetConfiguration: React.FC<TraineeSetConfigurationProps> = ({ searchTerm = '' }) => {
    const { showNotification } = useNotification();
    const [trainees, setTrainees] = useState<any[]>([]);
    const [tasks, setTasks] = useState<AssessmentTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeType, setActiveType] = useState<'3D' | '2D'>('3D');

    // state: traineeId -> array of { display_set_number, actual_set_number, assessment_type }
    const [mappings, setMappings] = useState<Record<number, { display_set_number: number, actual_set_number: number, assessment_type?: string }[]>>({});
    const [isSaving, setIsSaving] = useState<Record<number, boolean>>({});
    const [showReference, setShowReference] = useState(false);
    const [forceCustom, setForceCustom] = useState<number[]>([]);
    const [expandedMappingTasks, setExpandedMappingTasks] = useState<Record<string, boolean>>({});

    const filteredTrainees = trainees.filter(trainee => {
        if (!searchTerm) return true;
        return (
            trainee.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trainee.username?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Derive active type sets and tasks dynamically
    const activeTasks = activeType === '3D'
        ? tasks.filter(t => (t.assessment_type || '3D') === '3D' || (t.assessment_type === '2D' && t.set_number >= 4 && t.set_number <= 7))
        : tasks.filter(t => t.assessment_type === '2D' || t.set_number >= 100).map(t => t.set_number >= 100 ? { ...t, set_number: t.set_number - 100 } : t);
    const dbSets = activeTasks.map(t => t.set_number);
    const defaultSets = activeType === '2D' ? [4, 5, 6, 7] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const availableSets = Array.from(new Set([...defaultSets, ...dbSets])).sort((a, b) => a - b);

    const getSetDisplayName = (setNum: number) => {
        const targetType = (activeType === '3D' && setNum >= 4 && setNum <= 7) ? '2D' : activeType;
        const setTask = tasks.find(t => t.set_number === setNum && (t.assessment_type || '3D') === targetType && t.set_name);
        if (setTask?.set_name) return setTask.set_name;
        const ordinals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
        const prefix = ordinals[setNum - 1] || `${setNum}th`;
        const suffix = setNum <= 3 ? 'Set Parts' : 'Set Parts and Assembly';
        return `${prefix} ${suffix}`;
    };

    // Helpers to partition mappings by type
    const getTraineeMappingsForActiveType = (traineeId: number) => {
        const trMappings = mappings[traineeId] || [];
        return trMappings.filter(m => (m.assessment_type || '3D') === activeType);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [traineesData, tasksData] = await Promise.all([
                assessmentService.getTrainerTraineesProgress(),
                assessmentService.getTasks()
            ]);
            setTrainees(traineesData);
            setTasks(tasksData);

            // Fetch mappings for all trainees in parallel to prevent N+1 query blocking lag
            const mappingsObj: Record<number, any[]> = {};
            await Promise.all(
                traineesData.map(async (trainee) => {
                    try {
                        const traineeMappings = await assessmentService.getTraineeSetMappings(trainee.id);
                        mappingsObj[trainee.id] = traineeMappings.map((m: any) => ({
                            display_set_number: m.display_set_number,
                            actual_set_number: m.actual_set_number,
                            assessment_type: m.assessment_type || '3D'
                        }));
                    } catch (e) {
                        mappingsObj[trainee.id] = [];
                    }
                })
            );
            setMappings(mappingsObj);
        } catch (err) {
            showNotification('Failed to load configuration data.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleAddMapping = (traineeId: number) => {
        setMappings(prev => {
            const current = prev[traineeId] || [];
            const activeMappings = current.filter(m => (m.assessment_type || '3D') === activeType);
            const nextDisplay = activeMappings.length > 0 ? Math.max(...activeMappings.map(m => m.display_set_number)) + 1 : (activeType === '2D' ? 4 : 1);
            const nextActual = availableSets.length > 0 ? availableSets[0] : (activeType === '2D' ? 4 : 1);
            return {
                ...prev,
                [traineeId]: [...current, { display_set_number: nextDisplay, actual_set_number: nextActual, assessment_type: activeType }]
            };
        });
    };

    const handleRemoveMapping = (traineeId: number, indexInActiveList: number) => {
        setMappings(prev => {
            const allMappings = prev[traineeId] || [];
            const activeMappings = allMappings.filter(m => (m.assessment_type || '3D') === activeType);
            const targetToRemove = activeMappings[indexInActiveList];
            
            const originalIndex = allMappings.findIndex(m => m === targetToRemove);
            if (originalIndex === -1) return prev;
            
            const updated = [...allMappings];
            updated.splice(originalIndex, 1);
            return {
                ...prev,
                [traineeId]: updated
            };
        });
    };

    const isStandardLimit = (traineeId: number) => {
        const trMappings = getTraineeMappingsForActiveType(traineeId);
        if (trMappings.length === 0) return false;
        return trMappings.every((m, i) => m.display_set_number === i + (activeType === '2D' ? 4 : 1) && m.actual_set_number === (availableSets[i] || i + (activeType === '2D' ? 4 : 1)));
    };

    const handleUpdateMapping = (traineeId: number, indexInActiveList: number, field: 'display_set_number' | 'actual_set_number', value: number) => {
        setMappings(prev => {
            const allMappings = prev[traineeId] || [];
            const activeMappings = allMappings.filter(m => (m.assessment_type || '3D') === activeType);
            const targetToUpdate = activeMappings[indexInActiveList];
            
            const originalIndex = allMappings.findIndex(m => m === targetToUpdate);
            if (originalIndex === -1) return prev;
            
            const updated = [...allMappings];
            updated[originalIndex] = { ...updated[originalIndex], [field]: value };
            return {
                ...prev,
                [traineeId]: updated
            };
        });
    };

    const handleModeChange = (traineeId: number, newMode: 'none' | 'standard' | 'custom') => {
        const allMappings = mappings[traineeId] || [];
        const otherTypeMappings = allMappings.filter(m => (m.assessment_type || '3D') !== activeType);
        
        if (newMode === 'none') {
            setMappings(prev => ({ ...prev, [traineeId]: otherTypeMappings }));
        } else if (newMode === 'standard') {
            const defaultLimit = 4;
            const newMappings = Array.from({ length: defaultLimit }, (_, i) => ({
                display_set_number: i + (activeType === '2D' ? 4 : 1),
                actual_set_number: availableSets[i] || (i + (activeType === '2D' ? 4 : 1)),
                assessment_type: activeType
            }));
            setMappings(prev => ({ ...prev, [traineeId]: [...otherTypeMappings, ...newMappings] }));
            setForceCustom(prev => prev.filter(id => id !== traineeId));
        } else if (newMode === 'custom') {
            setForceCustom(prev => [...prev, traineeId]);
        }
    };

    const handleToggleSet = (traineeId: number, setNum: number) => {
        setMappings(prev => {
            const allMappings = prev[traineeId] || [];
            const exists = allMappings.some(m => m.actual_set_number === setNum && (m.assessment_type || '3D') === activeType);
            if (exists) {
                return {
                    ...prev,
                    [traineeId]: allMappings.filter(m => !(m.actual_set_number === setNum && (m.assessment_type || '3D') === activeType))
                };
            } else {
                const activeMappings = allMappings.filter(m => (m.assessment_type || '3D') === activeType);
                const usedDisplays = activeMappings.map(m => m.display_set_number);
                const nextDisplay = usedDisplays.includes(setNum) 
                    ? (usedDisplays.length > 0 ? Math.max(...usedDisplays) + 1 : setNum) 
                    : setNum;
                return {
                    ...prev,
                    [traineeId]: [...allMappings, { display_set_number: nextDisplay, actual_set_number: setNum, assessment_type: activeType }]
                };
            }
        });
    };

    const handleSaveMappings = async (traineeId: number) => {
        setIsSaving(prev => ({ ...prev, [traineeId]: true }));
        try {
            const activeMappings = getTraineeMappingsForActiveType(traineeId);
            await assessmentService.updateTraineeSetMapping(traineeId, activeMappings, activeType);
            showNotification(`${activeType} Mappings updated successfully!`, 'success');
        } catch (err) {
            showNotification('Failed to save mappings.', 'error');
        } finally {
            setIsSaving(prev => ({ ...prev, [traineeId]: false }));
        }
    };

    if (loading) {
        return (
            <div className="skeleton-cards" style={{ padding: '20px' }}>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
            </div>
        );
    }

    return (
        <div className="set-configuration-wrapper" style={{ flex: 1, overflowY: 'auto', padding: '20px', minHeight: 0 }}>
            {/* 2D / 3D Selection Tabs */}
            <div className="tab-navigation" style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <button
                    onClick={() => { setActiveType('3D'); setShowReference(false); }}
                    style={{
                        padding: '10px 20px',
                        background: activeType === '3D' ? 'var(--accent-blue)' : 'var(--bg-card)',
                        color: activeType === '3D' ? '#fff' : 'var(--text-main)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                    }}
                >
                    3D Modeling Sets
                </button>
                <button
                    onClick={() => { setActiveType('2D'); setShowReference(false); }}
                    style={{
                        padding: '10px 20px',
                        background: activeType === '2D' ? 'var(--accent-blue)' : 'var(--bg-card)',
                        color: activeType === '2D' ? '#fff' : 'var(--text-main)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                    }}
                >
                    2D Drawing Sets
                </button>
            </div>

            <div style={{ marginBottom: '20px', background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <AlertCircle size={20} style={{ color: 'var(--accent-blue)', marginTop: '2px' }} />
                <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--accent-blue)' }}>How Set Configuration Works</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        If a trainee has <b>NO mappings</b> defined below, they will see all assessment sets normally.
                        Once you add mappings for a trainee, they will <b>ONLY see the sets you have explicitly mapped</b>.
                        The "Display Set" is what the trainee sees (e.g. Set 1), and the "Actual Set" is the content they will work on.
                    </p>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setShowReference(!showReference)}
                    style={{ padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                    <FileText size={16} />
                    {showReference ? 'Hide Set Contents Reference' : 'View Set Contents Reference'}
                </button>
            </div>

            {showReference && (
                <div style={{ marginBottom: '20px', background: 'var(--bg-surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--text-main)', fontSize: '1.1rem' }}>Available {activeType} Sets Overview</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                        {availableSets.map(setNum => {
                            const setDocs = activeTasks.filter(t => t.set_number === setNum);
                            return (
                                <div key={`ref-${setNum}`} style={{ background: 'var(--bg-dark)', padding: '15px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: 'var(--accent-blue)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>{getSetDisplayName(setNum)}</h4>
                                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                                        {setDocs.length > 0 ? setDocs.map(t => {
                                            const codeStyle = getUnitCodeInlineStyle(t.task_code);
                                            return (
                                                <li key={t.id} style={{ marginBottom: '5px', wordBreak: 'normal', display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', marginLeft: '-20px' }}>
                                                    <span style={{ ...codeStyle, fontWeight: 700, padding: '1px 6px', borderRadius: '3px', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>{t.task_code}</span>
                                                    <span style={{ color: 'var(--text-light)' }}>{t.title}</span>
                                                </li>
                                            );
                                        }) : (
                                            <li style={{ color: 'var(--text-dim)', fontStyle: 'italic', listStyle: 'none', marginLeft: '-20px' }}>No items</li>
                                        )}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="progress-tracker-container" style={{ padding: 0 }}>
                {trainees.length === 0 ? (
                    <div className="no-submissions" style={{ gridColumn: '1 / -1' }}>
                        <Settings size={48} />
                        <h3>No trainees assigned</h3>
                        <p>Assign trainees before configuring their sets.</p>
                    </div>
                ) : filteredTrainees.length === 0 ? (
                    <div className="no-submissions" style={{ gridColumn: '1 / -1' }}>
                        <Settings size={48} />
                        <h3>No matching trainees found</h3>
                        <p>Try adjusting your search query.</p>
                    </div>
                ) : (
                    filteredTrainees.map(trainee => {
                        const activeMappings = getTraineeMappingsForActiveType(trainee.id);
                        return (
                            <div key={trainee.id} className="trainee-group-card" style={{ marginBottom: '20px', background: 'var(--card-bg)' }}>
                                <div className="trainee-group-header" style={{ cursor: 'default' }}>
                                    <div className="trainee-info">
                                        <div className="avatar-circle">
                                            {trainee.full_name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <h4>{trainee.full_name}</h4>
                                            <span>@{trainee.username}</span>
                                        </div>
                                    </div>
                                    <div className="trainee-header-right">
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleSaveMappings(trainee.id)}
                                            disabled={isSaving[trainee.id]}
                                            style={{ padding: '6px 12px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
                                        >
                                            <Save size={14} style={{ marginRight: '5px', flexShrink: 0 }} />
                                            {isSaving[trainee.id] ? 'Saving...' : 'Save Configuration'}
                                        </button>
                                    </div>
                                </div>

                                <div className="trainee-group-body" style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Configuration Mode:</span>
                                            <select
                                                value={(() => {
                                                    if (activeMappings.length === 0) return 'none';
                                                    if (isStandardLimit(trainee.id) && !forceCustom.includes(trainee.id)) return 'standard';
                                                    return 'custom';
                                                })()}
                                                onChange={(e) => handleModeChange(trainee.id, e.target.value as any)}
                                                style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)', fontWeight: 500 }}
                                            >
                                                <option value="none">Show All Sets (No Limit)</option>
                                                <option value="standard">Standard Limit (First N Sets)</option>
                                                <option value="custom">Custom Configuration (Select/Map Sets)</option>
                                            </select>
                                        </div>

                                        {(() => {
                                            const mode = (() => {
                                                if (activeMappings.length === 0) return 'none';
                                                if (isStandardLimit(trainee.id) && !forceCustom.includes(trainee.id)) return 'standard';
                                                return 'custom';
                                            })();

                                            if (mode === 'standard') {
                                                return (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Set Limit:</span>
                                                        <select
                                                            value={activeMappings.length}
                                                            onChange={(e) => {
                                                                const limit = parseInt(e.target.value);
                                                                const allMappings = mappings[trainee.id] || [];
                                                                const otherTypeMappings = allMappings.filter(m => (m.assessment_type || '3D') !== activeType);
                                                                if (limit === 0) {
                                                                    setMappings(prev => ({ ...prev, [trainee.id]: otherTypeMappings }));
                                                                } else {
                                                                    const newMappings = Array.from({ length: limit }, (_, i) => ({
                                                                        display_set_number: i + (activeType === '2D' ? 4 : 1),
                                                                        actual_set_number: availableSets[i] || (i + (activeType === '2D' ? 4 : 1)),
                                                                        assessment_type: activeType
                                                                    }));
                                                                    setMappings(prev => ({ ...prev, [trainee.id]: [...otherTypeMappings, ...newMappings] }));
                                                                }
                                                            }}
                                                            style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)' }}
                                                        >
                                                            {availableSets.map((s, index) => (
                                                                <option key={`limit-${s}`} value={index + 1}>Limit to {index + 1} Sets</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>

                                    {(() => {
                                        const mode = (() => {
                                            if (activeMappings.length === 0) return 'none';
                                            if (isStandardLimit(trainee.id) && !forceCustom.includes(trainee.id)) return 'standard';
                                            return 'custom';
                                        })();

                                        if (mode === 'none') {
                                            return (
                                                <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
                                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                                                        No limit set. Trainee will see all {activeType} sets normally.
                                                    </p>
                                                </div>
                                            );
                                        }

                                        if (mode === 'standard') {
                                            return (
                                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
                                                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', margin: '0 0 10px 0' }}>
                                                        Trainee is currently <strong>limited to the first {activeMappings.length} sets</strong>.
                                                    </p>
                                                    <button
                                                        onClick={() => setForceCustom(prev => [...prev, trainee.id])}
                                                        style={{ background: 'none', border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer' }}
                                                    >
                                                        Customize Individual Sets
                                                    </button>
                                                </div>
                                            );
                                        }

                                        // Mode is Custom
                                        return (
                                            <div>
                                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                                                    Toggle sets to make them visible to the trainee. Customize their Display numbers and contents below.
                                                </p>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    {availableSets.map((setNum) => {
                                                        const mappedIndices = activeMappings
                                                            .map((m, idx) => m.actual_set_number === setNum ? idx : -1)
                                                            .filter(idx => idx !== -1);
                                                        
                                                        const isChecked = mappedIndices.length > 0;

                                                        return (
                                                            <div key={setNum} style={{ background: isChecked ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255,255,255,0.01)', border: isChecked ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid var(--border-color)', borderRadius: '8px', padding: '12px 16px', transition: 'all 0.2s' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`check-${trainee.id}-${setNum}`}
                                                                        checked={isChecked}
                                                                        onChange={() => handleToggleSet(trainee.id, setNum)}
                                                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                                                    />
                                                                    <label htmlFor={`check-${trainee.id}-${setNum}`} style={{ fontSize: '0.95rem', fontWeight: 600, color: isChecked ? 'var(--text-light)' : 'var(--text-muted)', cursor: 'pointer', minWidth: '80px' }}>
                                                                        {getSetDisplayName(setNum)}
                                                                    </label>

                                                                    {isChecked ? (
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', marginLeft: '10px' }}>
                                                                            {mappedIndices.map((mappingIndex) => {
                                                                                const mapping = activeMappings[mappingIndex];
                                                                                return (
                                                                                    <div key={mappingIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-dark)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                                                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Trainee sees:</span>
                                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                                            Set
                                                                                            <input
                                                                                                type="number"
                                                                                                value={Math.abs(mapping.display_set_number)}
                                                                                                onChange={(e) => handleUpdateMapping(trainee.id, mappingIndex, 'display_set_number', parseInt(e.target.value) || 1)}
                                                                                                style={{ width: '50px', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-light)', fontSize: '0.85rem' }}
                                                                                            />
                                                                                        </div>

                                                                                        <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>&rarr;</span>

                                                                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Actual:</span>
                                                                                        <select
                                                                                            value={mapping.actual_set_number}
                                                                                            onChange={(e) => handleUpdateMapping(trainee.id, mappingIndex, 'actual_set_number', parseInt(e.target.value) || 1)}
                                                                                            style={{ padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-light)', fontSize: '0.85rem' }}
                                                                                        >
                                                                                            {availableSets.map(s => (
                                                                                                <option key={s} value={s}>{getSetDisplayName(s)}</option>
                                                                                            ))}
                                                                                        </select>

                                                                                        {mappedIndices.length > 1 && (
                                                                                            <button
                                                                                                onClick={() => handleRemoveMapping(trainee.id, mappingIndex)}
                                                                                                style={{ background: 'none', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: '2px' }}
                                                                                                title="Remove duplicate mapping row"
                                                                                            >
                                                                                                <Trash2 size={14} />
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            })}

                                                                            <button
                                                                                onClick={() => {
                                                                                    setMappings(prev => {
                                                                                        const current = prev[trainee.id] || [];
                                                                                        const activeMaps = current.filter(m => (m.assessment_type || '3D') === activeType);
                                                                                        const nextDisplay = activeMaps.length > 0 ? Math.max(...activeMaps.map(m => m.display_set_number)) + 1 : 1;
                                                                                        return {
                                                                                            ...prev,
                                                                                            [trainee.id]: [...current, { display_set_number: nextDisplay, actual_set_number: setNum, assessment_type: activeType }]
                                                                                        };
                                                                                    });
                                                                                }}
                                                                                style={{ background: 'none', border: '1px dashed var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
                                                                            >
                                                                                + Duplicate Mapping
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontStyle: 'italic', marginLeft: '10px' }}>
                                                                            Hidden from trainee
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {/* Set Contents Reference */}
                                                                {isChecked && (
                                                                    <div style={{ marginTop: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
                                                                        {(() => {
                                                                            const setDocs = activeTasks.filter(t => t.set_number === setNum);
                                                                            const isExpanded = expandedMappingTasks[`${trainee.id}-${setNum}`];
                                                                            const visibleDocs = isExpanded ? setDocs : setDocs.slice(0, 4);

                                                                            return (
                                                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                                                    {setDocs.length > 0 ? (
                                                                                        <>
                                                                                                {visibleDocs.map(t => {
                                                                                                    const codeStyle = getUnitCodeInlineStyle(t.task_code);
                                                                                                    return (
                                                                                                        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', ...codeStyle, padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                                                                                            <span style={{ fontWeight: 700, color: codeStyle.color as string, fontFamily: "'JetBrains Mono', monospace" }}>{t.task_code}</span>
                                                                                                            <span style={{ opacity: 0.3 }}>|</span>
                                                                                                            <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</span>
                                                                                                        </div>
                                                                                                    );
                                                                                                })}
                                                                                            {setDocs.length > 4 && (
                                                                                                <button
                                                                                                    onClick={() => setExpandedMappingTasks(prev => ({ ...prev, [`${trainee.id}-${setNum}`]: !isExpanded }))}
                                                                                                    style={{ background: 'none', border: '1px dashed rgba(59, 130, 246, 0.4)', color: 'var(--accent-blue)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}
                                                                                                >
                                                                                                    {isExpanded ? 'Less' : `+ ${setDocs.length - 4} More`}
                                                                                                </button>
                                                                                            )}
                                                                                        </>
                                                                                    ) : (
                                                                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>No files found in this set.</span>
                                                                                    )}
                                                                                </div>
                                                                            );
                                                                        })()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <button
                                                    onClick={() => handleAddMapping(trainee.id)}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border-color)', color: 'var(--text-light)', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', marginTop: '15px', fontSize: '0.9rem' }}
                                                >
                                                    <Plus size={16} /> Add Custom Set Mapping Row
                                                </button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
