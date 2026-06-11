import React, { useState, useEffect } from 'react';
import { Settings, Save, Plus, Trash2, AlertCircle, FileText } from 'lucide-react';
import { assessmentService, AssessmentTask } from '../../../services/assessmentService';
import { useNotification } from '../../../context/NotificationContext';

export const TraineeSetConfiguration: React.FC = () => {
    const { showNotification } = useNotification();
    const [trainees, setTrainees] = useState<any[]>([]);
    const [tasks, setTasks] = useState<AssessmentTask[]>([]);
    const [availableSets, setAvailableSets] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    
    // state: traineeId -> array of { display_set_number, actual_set_number }
    const [mappings, setMappings] = useState<Record<number, { display_set_number: number, actual_set_number: number }[]>>({});
    const [isSaving, setIsSaving] = useState<Record<number, boolean>>({});

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
        <div className="set-configuration-wrapper" style={{ padding: '20px' }}>
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

            <div className="progress-tracker-container" style={{ padding: 0 }}>
                {trainees.length === 0 ? (
                    <div className="no-submissions" style={{ gridColumn: '1 / -1' }}>
                        <Settings size={48} />
                        <h3>No trainees assigned</h3>
                        <p>Assign trainees before configuring their sets.</p>
                    </div>
                ) : (
                trainees.map(trainee => (
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
                            {(mappings[trainee.id] || []).length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {(mappings[trainee.id] || []).map((mapping, index) => (
                                        <React.Fragment key={index}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '10px 15px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Trainee sees:</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    Set
                                                    <input 
                                                        type="number" 
                                                        value={mapping.display_set_number}
                                                        onChange={(e) => handleUpdateMapping(trainee.id, index, 'display_set_number', parseInt(e.target.value) || 1)}
                                                        style={{ width: '60px', padding: '4px 8px', borderRadius: '4px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)' }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <span style={{ color: 'var(--text-dim)' }}>&rarr;</span>
                                            
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Actual contents:</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    Set
                                                    <select 
                                                        value={mapping.actual_set_number}
                                                        onChange={(e) => handleUpdateMapping(trainee.id, index, 'actual_set_number', parseInt(e.target.value) || 1)}
                                                        style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-light)' }}
                                                    >
                                                        {availableSets.map(s => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={() => handleRemoveMapping(trainee.id, index)}
                                                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: '5px' }}
                                                title="Remove Mapping"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div style={{ padding: '10px 15px 10px 40px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <FileText size={14} style={{ color: 'var(--text-muted)' }} />
                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Files/Tasks inside Set {mapping.actual_set_number}:</span>
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {tasks.filter(t => t.set_number === mapping.actual_set_number).length > 0 ? (
                                                    tasks.filter(t => t.set_number === mapping.actual_set_number).map(t => (
                                                        <div key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                                            <span style={{ fontWeight: 600, color: 'var(--accent-blue)', whiteSpace: 'nowrap' }}>Unit {t.task_code}</span>
                                                            <span style={{ color: 'var(--border-color)' }}>|</span>
                                                            <span style={{ wordBreak: 'break-word', lineHeight: '1.4' }}>{t.title}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>No files found in this set.</span>
                                                )}
                                            </div>
                                        </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 15px 0' }}>
                                    No custom mappings defined. Trainee will see all sets normally.
                                </p>
                            )}

                            <button 
                                onClick={() => handleAddMapping(trainee.id)}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--border-color)', color: 'var(--text-light)', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', marginTop: '15px', fontSize: '0.9rem' }}
                            >
                                <Plus size={16} /> Add Set Mapping
                            </button>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
    );
};
