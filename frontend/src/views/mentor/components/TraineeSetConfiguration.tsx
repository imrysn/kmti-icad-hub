import React, { useState, useEffect } from 'react';
import { Settings, Save, Plus, Trash2, AlertCircle, FileText } from 'lucide-react';
import { assessmentService, AssessmentTask } from '../../../services/assessmentService';
import { useNotification } from '../../../context/NotificationContext';

interface TraineeSetConfigurationProps {
    searchTerm?: string;
}

export const TraineeSetConfiguration: React.FC<TraineeSetConfigurationProps> = ({ searchTerm = '' }) => {
    const { showNotification } = useNotification();
    const [trainees, setTrainees] = useState<any[]>([]);
    const [tasks, setTasks] = useState<AssessmentTask[]>([]);
    const [availableSets, setAvailableSets] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    // state: traineeId -> array of { display_set_number, actual_set_number }
    const [mappings, setMappings] = useState<Record<number, { display_set_number: number, actual_set_number: number }[]>>({});
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

            const sets = Array.from(new Set(tasksData.map(t => t.set_number))).sort((a, b) => a - b);
            setAvailableSets(sets);

            // Fetch mappings for all trainees
            const mappingsObj: Record<number, any[]> = {};
            for (const trainee of traineesData) {
                try {
                    const traineeMappings = await assessmentService.getTraineeSetMappings(trainee.id);
                    mappingsObj[trainee.id] = traineeMappings.map((m: any) => ({
                        display_set_number: m.display_set_number,
                        actual_set_number: m.actual_set_number
                    }));
                } catch (e) {
                    mappingsObj[trainee.id] = [];
                }
            }
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
            // default to mapping Display 1 -> Actual 1, or next available
            const nextDisplay = current.length > 0 ? Math.max(...current.map(m => m.display_set_number)) + 1 : 1;
            const nextActual = availableSets.length > 0 ? availableSets[0] : 1;
            return {
                ...prev,
                [traineeId]: [...current, { display_set_number: nextDisplay, actual_set_number: nextActual }]
            };
        });
    };

    const handleRemoveMapping = (traineeId: number, index: number) => {
        setMappings(prev => {
            const current = [...(prev[traineeId] || [])];
            current.splice(index, 1);
            return {
                ...prev,
                [traineeId]: current
            };
        });
    };

    const isStandardLimit = (traineeId: number) => {
        const trMappings = mappings[traineeId];
        if (!trMappings || trMappings.length === 0) return false;
        return trMappings.every((m, i) => m.display_set_number === i + 1 && m.actual_set_number === (availableSets[i] || i + 1));
    };

    const handleUpdateMapping = (traineeId: number, index: number, field: 'display_set_number' | 'actual_set_number', value: number) => {
        setMappings(prev => {
            const current = [...(prev[traineeId] || [])];
            current[index] = { ...current[index], [field]: value };
            return {
                ...prev,
                [traineeId]: current
            };
        });
    };

    const handleModeChange = (traineeId: number, newMode: 'none' | 'standard' | 'custom') => {
        if (newMode === 'none') {
            setMappings(prev => ({ ...prev, [traineeId]: [] }));
        } else if (newMode === 'standard') {
            const defaultLimit = 4;
            const newMappings = Array.from({ length: defaultLimit }, (_, i) => ({
                display_set_number: i + 1,
                actual_set_number: availableSets[i] || (i + 1)
            }));
            setMappings(prev => ({ ...prev, [traineeId]: newMappings }));
            setForceCustom(prev => prev.filter(id => id !== traineeId));
        } else if (newMode === 'custom') {
            setForceCustom(prev => [...prev, traineeId]);
            if ((mappings[traineeId] || []).length === 0) {
                setMappings(prev => ({ ...prev, [traineeId]: [] }));
            }
        }
    };

    const handleToggleSet = (traineeId: number, setNum: number) => {
        setMappings(prev => {
            const current = prev[traineeId] || [];
            const exists = current.some(m => m.actual_set_number === setNum);
            if (exists) {
                return {
                    ...prev,
                    [traineeId]: current.filter(m => m.actual_set_number !== setNum)
                };
            } else {
                const usedDisplays = current.map(m => m.display_set_number);
                const nextDisplay = usedDisplays.includes(setNum) 
                    ? (usedDisplays.length > 0 ? Math.max(...usedDisplays) + 1 : 1) 
                    : setNum;
                return {
                    ...prev,
                    [traineeId]: [...current, { display_set_number: nextDisplay, actual_set_number: setNum }]
                };
            }
        });
    };

    const handleSaveMappings = async (traineeId: number) => {
        setIsSaving(prev => ({ ...prev, [traineeId]: true }));
        try {
            await assessmentService.updateTraineeSetMapping(traineeId, mappings[traineeId] || []);
            showNotification(`Mappings updated successfully!`, 'success');
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
                    <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--text-main)', fontSize: '1.1rem' }}>Available Sets Overview</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                        {availableSets.map(setNum => {
                            const setDocs = tasks.filter(t => t.set_number === setNum);
                            return (
                                <div key={`ref-${setNum}`} style={{ background: 'var(--bg-dark)', padding: '15px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: 'var(--accent-blue)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Set {setNum}</h4>
                                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                                        {setDocs.length > 0 ? setDocs.map(t => (
                                            <li key={t.id} style={{ marginBottom: '5px', wordBreak: 'normal' }}><strong>Unit {t.task_code}:</strong> {t.title}</li>
                                        )) : (
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
                    filteredTrainees.map(trainee => (
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
                                                const trMappings = mappings[trainee.id] || [];
                                                if (trMappings.length === 0) return 'none';
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
                                            const trMappings = mappings[trainee.id] || [];
                                            if (trMappings.length === 0) return 'none';
                                            if (isStandardLimit(trainee.id) && !forceCustom.includes(trainee.id)) return 'standard';
                                            return 'custom';
                                        })();

                                        if (mode === 'standard') {
                                            return (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Set Limit:</span>
                                                    <select
                                                        value={(mappings[trainee.id] || []).length}
                                                        onChange={(e) => {
                                                            const limit = parseInt(e.target.value);
                                                            if (limit === 0) {
                                                                setMappings(prev => ({ ...prev, [trainee.id]: [] }));
                                                            } else {
                                                                const newMappings = Array.from({ length: limit }, (_, i) => ({
                                                                    display_set_number: i + 1,
                                                                    actual_set_number: availableSets[i] || (i + 1)
                                                                }));
                                                                setMappings(prev => ({ ...prev, [trainee.id]: newMappings }));
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
                                        const trMappings = mappings[trainee.id] || [];
                                        if (trMappings.length === 0) return 'none';
                                        if (isStandardLimit(trainee.id) && !forceCustom.includes(trainee.id)) return 'standard';
                                        return 'custom';
                                    })();

                                    if (mode === 'none') {
                                        return (
                                            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                                                    No limit set. Trainee will see all sets normally.
                                                </p>
                                            </div>
                                        );
                                    }

                                    if (mode === 'standard') {
                                        return (
                                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
                                                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', margin: '0 0 10px 0' }}>
                                                    Trainee is currently <strong>limited to the first {(mappings[trainee.id] || []).length} sets</strong>.
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
                                    const trMappings = mappings[trainee.id] || [];
                                    return (
                                        <div>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                                                Toggle sets to make them visible to the trainee. Customize their Display numbers and contents below.
                                            </p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {availableSets.map((setNum) => {
                                                    const mappedIndices = trMappings
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
                                                                    Set {setNum}
                                                                </label>

                                                                {isChecked ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', marginLeft: '10px' }}>
                                                                        {mappedIndices.map((mappingIndex) => {
                                                                            const mapping = trMappings[mappingIndex];
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
                                                                                            <option key={s} value={s}>Set {s}</option>
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
                                                                                    const nextDisplay = current.length > 0 ? Math.max(...current.map(m => m.display_set_number)) + 1 : 1;
                                                                                    return {
                                                                                        ...prev,
                                                                                        [trainee.id]: [...current, { display_set_number: nextDisplay, actual_set_number: setNum }]
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

                                                            {/* Set Contents Reference (collapsed by default) */}
                                                            {isChecked && (
                                                                <div style={{ marginTop: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
                                                                    {(() => {
                                                                        const setDocs = tasks.filter(t => t.set_number === setNum);
                                                                        const isExpanded = expandedMappingTasks[`${trainee.id}-${setNum}`];
                                                                        const visibleDocs = isExpanded ? setDocs : setDocs.slice(0, 4);

                                                                        return (
                                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                                                {setDocs.length > 0 ? (
                                                                                    <>
                                                                                        {visibleDocs.map(t => (
                                                                                            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.15)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                                                                                <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>Unit {t.task_code}</span>
                                                                                                <span style={{ opacity: 0.3 }}>|</span>
                                                                                                <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</span>
                                                                                            </div>
                                                                                        ))}
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
                    ))
                )}
            </div>
        </div>
    );
};
