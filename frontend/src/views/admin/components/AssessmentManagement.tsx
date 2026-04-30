import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronRight, ChevronLeft, Save, X, CheckCircle2, AlertCircle, List, FileText } from 'lucide-react';
import { adminService, Quiz, Question } from '../../../services/adminService';
import { useUI } from '../../../context/UIContext';
import { useNotification } from '../../../context/NotificationContext';
import { useLessons } from '../../../hooks/useLessons';
import '../../../styles/AssessmentManagement.css';

export const AssessmentManagement: React.FC = () => {
    const { requestConfirmation } = useUI();
    const { showNotification } = useNotification();

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [hasRestored, setHasRestored] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [assessmentTab, setAssessmentTab] = useState<'2D_Drawing' | '3D_Modeling'>(
        (localStorage.getItem('kmti_adminAssessmentTab') as '2D_Drawing' | '3D_Modeling') || '3D_Modeling'
    );
    
    // Persist tab and selection
    useEffect(() => {
        localStorage.setItem('kmti_adminAssessmentTab', assessmentTab);
    }, [assessmentTab]);

    // Restore selected quiz on mount (Directly, without waiting for full list)
    useEffect(() => {
        const savedQuizId = localStorage.getItem('kmti_adminSelectedQuizId');
        if (savedQuizId && !hasRestored) {
            setLoading(true);
            adminService.getQuizDetail(parseInt(savedQuizId))
                .then(detail => {
                    setSelectedQuiz(detail);
                    setHasRestored(true);
                })
                .catch(() => {
                    localStorage.removeItem('kmti_adminSelectedQuizId');
                    setHasRestored(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setHasRestored(true);
        }
    }, []); // Run only once on mount

    // Save selection and handle scroll
    useEffect(() => {
        if (selectedQuiz) {
            localStorage.setItem('kmti_adminSelectedQuizId', selectedQuiz.id.toString());
            
            // Robust scroll to top after render
            setTimeout(() => {
                const content = document.querySelector('.page-content');
                if (content) content.scrollTo({ top: 0, behavior: 'instant' });
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 50);
        } else {
            localStorage.removeItem('kmti_adminSelectedQuizId');
        }
    }, [selectedQuiz]);
    
    // Fetch lessons for ordering
    const { lessons: currentLessons } = useLessons(assessmentTab === '3D_Modeling' ? 1 : 2);
    
    const [isEditingQuiz, setIsEditingQuiz] = useState(false);
    const [isEditingQuestion, setIsEditingQuestion] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState<Partial<Quiz>>({});
    const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({});
    const [options, setOptions] = useState<string[]>([]);

    const fetchQuizzes = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminService.getQuizzes();
            setQuizzes(data);
        } catch (err) {
            showNotification('Failed to load assessments.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showNotification]);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    const handleSelectQuiz = async (quiz: Quiz) => {
        setLoading(true);
        try {
            const detail = await adminService.getQuizDetail(quiz.id);
            setSelectedQuiz(detail);
            
            // Scroll to top immediately and with a slight delay to be sure
            const content = document.querySelector('.page-content');
            if (content) content.scrollTo({ top: 0, behavior: 'instant' });
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            setTimeout(() => {
                if (content) content.scrollTo({ top: 0, behavior: 'instant' });
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 100);
        } catch (err) {
            showNotification('Failed to load quiz details.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveQuiz = async () => {
        try {
            if (currentQuiz.id) {
                await adminService.updateQuiz(currentQuiz.id, currentQuiz);
                showNotification('Assessment updated successfully.', 'success');
            } else {
                await adminService.createQuiz(currentQuiz);
                showNotification('Assessment created successfully.', 'success');
            }
            setIsEditingQuiz(false);
            fetchQuizzes();
        } catch (err) {
            showNotification('Failed to save assessment.', 'error');
        }
    };

    const handleDeleteQuiz = async (id: number) => {
        const confirmed = await requestConfirmation({
            title: 'Delete Assessment',
            message: 'Are you sure you want to delete this assessment and all its questions?',
            confirmText: 'Delete',
            type: 'danger'
        });
        if (!confirmed) return;
        try {
            await adminService.deleteQuiz(id);
            showNotification('Assessment deleted.', 'success');
            if (selectedQuiz?.id === id) setSelectedQuiz(null);
            fetchQuizzes();
        } catch (err) {
            showNotification('Failed to delete assessment.', 'error');
        }
    };

    const handleEditQuestion = (question?: Question) => {
        if (question) {
            setCurrentQuestion(question);
            setOptions(JSON.parse(question.options_json));
        } else {
            setCurrentQuestion({ quiz_id: selectedQuiz!.id, order: selectedQuiz!.questions?.length || 0 });
            setOptions(['', '', '', '']);
        }
        setIsEditingQuestion(true);
    };

    const handleSaveQuestion = async () => {
        if (!currentQuestion.text?.trim()) {
            showNotification('Question text is required.', 'warning');
            return;
        }

        if (options.length < 2) {
            showNotification('At least two options are required.', 'warning');
            return;
        }

        if (options.some(opt => !opt.trim())) {
            showNotification('All options must have text.', 'warning');
            return;
        }

        if (currentQuestion.correct_answer === undefined || currentQuestion.correct_answer === null) {
            showNotification('Please select the correct answer.', 'warning');
            return;
        }

        try {
            const questionData = {
                ...currentQuestion,
                options_json: JSON.stringify(options)
            };

            if (currentQuestion.id) {
                await adminService.updateQuestion(currentQuestion.id, questionData);
                showNotification('Question updated.', 'success');
            } else {
                await adminService.createQuestion(selectedQuiz!.id, questionData);
                showNotification('Question added.', 'success');
            }
            setIsEditingQuestion(false);
            handleSelectQuiz(selectedQuiz!); // Refresh
        } catch (err) {
            showNotification('Failed to save question.', 'error');
        }
    };

    const handleDeleteQuestion = async (id: number) => {
        const confirmed = await requestConfirmation({
            title: 'Delete Question',
            message: 'Remove this question?',
            confirmText: 'Delete',
            type: 'danger'
        });
        if (!confirmed) return;
        try {
            await adminService.deleteQuestion(id);
            showNotification('Question removed.', 'success');
            handleSelectQuiz(selectedQuiz!); // Refresh
        } catch (err) {
            showNotification('Failed to remove question.', 'error');
        }
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index: number) => {
        if (options.length <= 1) {
            showNotification('At least one option is required.', 'warning');
            return;
        }

        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);

        // Update correct answer if necessary
        if (currentQuestion.correct_answer === index) {
            setCurrentQuestion({ ...currentQuestion, correct_answer: undefined });
        } else if (currentQuestion.correct_answer !== undefined && currentQuestion.correct_answer > index) {
            setCurrentQuestion({ ...currentQuestion, correct_answer: currentQuestion.correct_answer - 1 });
        }
    };

    // Define the canonical orders based on DB lessons
    const globalOrder = useMemo(() => {
        const ids: string[] = [];
        const traverse = (list: any[]) => {
            list.forEach(l => {
                ids.push(l.id);
                if (l.children) traverse(l.children);
            });
        };
        traverse(currentLessons);
        return ids;
    }, [currentLessons]);

    const filteredQuizzes = quizzes
        .filter(q => {
            const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 q.slug.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTab = q.course_type === assessmentTab;
            return matchesSearch && matchesTab;
        })
        .sort((a, b) => {
            const indexA = globalOrder.indexOf(a.slug);
            const indexB = globalOrder.indexOf(b.slug);
            
            // If both found in globalOrder, sort by index
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.title.localeCompare(b.title);
        });

    const getOrderDisplay = (quiz: Quiz) => {
        const index = globalOrder.indexOf(quiz.slug);
        return index !== -1 ? `#${index + 1}` : null;
    };

    // Show specialized loader during initial restoration to prevent "page jump"
    if (loading && !hasRestored) {
        return (
            <div className="assessment-restoring-screen" style={{ 
                height: '400px', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#94a3b8' 
            }}>
                <div className="spinner"></div>
                <p>Restoring Assessment Session...</p>
            </div>
        );
    }

    if (selectedQuiz && !isEditingQuiz) {
        return (
            <div className="assessment-detail">
                <div className="detail-header">
                    <button className="back-btn" onClick={() => {
                        localStorage.removeItem('kmti_adminSelectedQuizId');
                        setSelectedQuiz(null);
                    }}>
                        <ChevronLeft size={16} /> Back to List
                    </button>
                    <div className="header-info">
                        <h2>{selectedQuiz.title}</h2>
                        <span className="badge">{selectedQuiz.course_type}</span>
                    </div>
                    <div className="header-actions">
                        <button className="edit-quiz-btn" onClick={() => { setCurrentQuiz(selectedQuiz); setIsEditingQuiz(true); }}>
                            <Edit2 size={14} /> Edit Assessment
                        </button>
                        <button className="add-question-btn" onClick={() => handleEditQuestion()}>
                            <Plus size={14} /> Add Question
                        </button>
                    </div>
                </div>

                <div className="questions-grid">
                    {selectedQuiz.questions?.map((q, idx) => (
                        <div key={q.id} className="question-card">
                            <div className="q-card-header">
                                <span className="q-num">Question {idx + 1}</span>
                                <div className="q-actions">
                                    <button onClick={() => handleEditQuestion(q)}><Edit2 size={14} /></button>
                                    <button onClick={() => handleDeleteQuestion(q.id)}><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <p className="q-text">{q.text}</p>
                            <div className="q-options">
                                {JSON.parse(q.options_json).map((opt: string, i: number) => (
                                    <div key={i} className={`q-opt ${i === q.correct_answer ? 'correct' : ''}`}>
                                        <span className="opt-idx">{String.fromCharCode(65 + i)}</span>
                                        <span className="opt-text">{opt}</span>
                                        {i === q.correct_answer && <CheckCircle2 size={12} className="correct-icon" />}
                                    </div>
                                ))}
                            </div>
                            {q.explanation && (
                                <div className="q-explanation">
                                    <strong>Explanation:</strong> {q.explanation}
                                </div>
                            )}
                        </div>
                    ))}
                    {(!selectedQuiz.questions || selectedQuiz.questions.length === 0) && (
                        <div className="empty-questions">
                            <AlertCircle size={48} />
                            <p>No questions added yet.</p>
                            <button onClick={() => handleEditQuestion()}>Add Your First Question</button>
                        </div>
                    )}
                </div>

                {isEditingQuestion && (
                    <div className="modal-overlay">
                        <div className="modal-content question-modal">
                            <div className="modal-header">
                                <h3>{currentQuestion.id ? 'Edit Question' : 'Add Question'}</h3>
                                <button onClick={() => setIsEditingQuestion(false)}><X size={20} /></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Question Text</label>
                                    <textarea 
                                        value={currentQuestion.text || ''} 
                                        onChange={e => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                                        placeholder="Enter the question..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Options</label>
                                    <div className="options-editor">
                                        {options.map((opt, i) => (
                                            <div key={i} className="opt-row">
                                                <input 
                                                    type="radio" 
                                                    name="correct" 
                                                    checked={currentQuestion.correct_answer === i}
                                                    onChange={() => setCurrentQuestion({...currentQuestion, correct_answer: i})}
                                                />
                                                <input 
                                                    type="text" 
                                                    value={opt} 
                                                    onChange={e => {
                                                        const newOpts = [...options];
                                                        newOpts[i] = e.target.value;
                                                        setOptions(newOpts);
                                                    }}
                                                    placeholder={`Option ${i + 1}`}
                                                />
                                                <button 
                                                    type="button"
                                                    className="remove-opt-btn" 
                                                    onClick={() => handleRemoveOption(i)}
                                                    title="Remove Option"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" className="add-opt-btn" onClick={handleAddOption}>
                                            <Plus size={14} /> Add Option
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Explanation (Optional)</label>
                                    <textarea 
                                        value={currentQuestion.explanation || ''} 
                                        onChange={e => setCurrentQuestion({...currentQuestion, explanation: e.target.value})}
                                        placeholder="Explain why this is the correct answer..."
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="cancel-btn" onClick={() => setIsEditingQuestion(false)}>Cancel</button>
                                <button className="save-btn" onClick={handleSaveQuestion}>
                                    <Save size={16} /> Save Question
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <section className="assessment-management">
            <div className="management-header">
                <div className="tab-navigation">
                    <button className={`tab-btn ${assessmentTab === '3D_Modeling' ? 'active' : ''}`} onClick={() => setAssessmentTab('3D_Modeling')}>
                        3D Modeling
                    </button>
                    <button className={`tab-btn ${assessmentTab === '2D_Drawing' ? 'active' : ''}`} onClick={() => setAssessmentTab('2D_Drawing')}>
                        2D Drawing
                    </button>
                </div>
                <div className="toolbar">
                    <div className="search-box">
                        <Search size={16} color="#94a3b8" />
                        <input type="text" placeholder="Search assessments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <button className="add-quiz-btn" onClick={() => { setCurrentQuiz({ course_type: '2D_Drawing' }); setIsEditingQuiz(true); }}>
                        <Plus size={16} /> New Assessment
                    </button>
                </div>
            </div>

            <div className="quiz-list">
                {filteredQuizzes.map(q => (
                    <div key={q.id} className="quiz-card" onClick={() => handleSelectQuiz(q)}>
                        <div className="quiz-card-icon">
                            <FileText size={24} />
                        </div>
                        <div className="quiz-card-content">
                            <div className="title-row">
                                <h3>{q.title}</h3>
                                {getOrderDisplay(q) && (
                                    <span className={`order-badge ${q.course_type}`}>{getOrderDisplay(q)}</span>
                                )}
                            </div>
                            <p>{q.description || 'No description available.'}</p>
                            <div className="card-meta">
                                <span className={`type-tag ${q.course_type}`}>{q.course_type.replace('_', ' ')}</span>
                                <span className="slug-tag">{q.slug}</span>
                            </div>
                        </div>
                        <div className="quiz-card-actions">
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteQuiz(q.id); }} className="delete-btn">
                                <Trash2 size={16} />
                            </button>
                            <ChevronRight size={20} className="chevron" />
                        </div>
                    </div>
                ))}
            </div>

            {isEditingQuiz && (
                <div className="modal-overlay">
                    <div className="modal-content quiz-modal">
                        <div className="modal-header">
                            <h3>{currentQuiz.id ? 'Edit Assessment' : 'New Assessment'}</h3>
                            <button onClick={() => setIsEditingQuiz(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" value={currentQuiz.title || ''} onChange={e => setCurrentQuiz({...currentQuiz, title: e.target.value})} placeholder="e.g. iCAD Interface Mastery" />
                            </div>
                            <div className="form-group">
                                <label>Slug (Lesson ID)</label>
                                <input type="text" value={currentQuiz.slug || ''} onChange={e => setCurrentQuiz({...currentQuiz, slug: e.target.value})} placeholder="e.g. interface" />
                            </div>
                            <div className="form-group">
                                <label>Course Type</label>
                                <select value={currentQuiz.course_type || ''} onChange={e => setCurrentQuiz({...currentQuiz, course_type: e.target.value})}>
                                    <option value="2D_Drawing">2D Drawing</option>
                                    <option value="3D_Modeling">3D Modeling</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={currentQuiz.description || ''} onChange={e => setCurrentQuiz({...currentQuiz, description: e.target.value})} placeholder="Briefly describe what this quiz assesses..." />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setIsEditingQuiz(false)}>Cancel</button>
                            <button className="save-btn" onClick={handleSaveQuiz}>
                                <Save size={16} /> Save Assessment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
        </section>
    );
};
