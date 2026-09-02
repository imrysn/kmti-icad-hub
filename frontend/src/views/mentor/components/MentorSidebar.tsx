import { BookOpen,Bug,CheckCircle2,ChevronDown,ChevronRight,CreditCard,FileText,HelpCircle,Lock,LogOut,Moon,PanelLeftClose,PanelLeftOpen,Search,Settings,Sparkles,Sun,User as UserIcon,X } from 'lucide-react';
import React,{ useEffect,useMemo,useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kmtiTrainingHubLogo from '../../../assets/logo/kmti-training-hub.png';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from '../../../context/LanguageContext';
import { useUI } from '../../../context/UIContext';
import { API_BASE_URL } from '../../../config/apiConfig';
import { Course } from '../../../types';
import { Lesson } from '../mentorConstants';

const ProgressCircle: React.FC<{ percentage: number; size?: number; strokeWidth?: number; className?: string }> = ({
    percentage,
    size = 24,
    strokeWidth = 2,
    className = ""
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const safePercentage = isNaN(percentage) ? 0 : Math.max(0, Math.min(100, percentage));
    const offset = circumference - (safePercentage / 100) * circumference;

    return (
        <div className={`progress-circle-container ${className}`} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="progress-circle">
                <circle
                    className="progress-circle-bg"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="progress-circle-fill"
                    stroke="var(--primary)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
        </div>
    );
};

const formatSidebarLessonTitle = (title: string) =>
    title.replace(/^(?:module|lesson)\s+\d+(?:\.\d+)*\s*(?:[-–—:]\s*)?/i, '').trim();

interface MentorSidebarProps {
    selectedCourse: Course;
    is2DDrawingCourse: boolean;
    sidebarOpen: boolean;
    onToggleSidebar: () => void;
    activeLessonId: string;
    setActiveLessonId: (id: string) => void;
    expandedIds: Set<string>;
    toggleExpand: (id: string) => void;
    setSelectedCourse: (course: Course | null) => void;
    completedLessons: string[];
    isEmployeeSide?: boolean;
    lessons: Lesson[];
}

export const MentorSidebar: React.FC<MentorSidebarProps> = ({
    selectedCourse,
    sidebarOpen,
    onToggleSidebar,
    activeLessonId,
    setActiveLessonId,
    expandedIds,
    toggleExpand,
    setSelectedCourse,
    completedLessons,
    isEmployeeSide = false,
    lessons
}) => {
    // Search State
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { requestConfirmation } = useUI();
    const [isSearchOpen, setIsSearchOpen] = useState(false); const [searchTerm, setSearchTerm] = useState('');
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState<'light'|'dark'>(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const avatarUrl = user?.avatar_url ? `${API_BASE_URL.replace(/\/api\/v1\/?$/, '')}${user.avatar_url}` : null;

    const handleExitCourse = async () => {
        const confirmed = await requestConfirmation({
            title: t('lesson.suspend_title'),
            message: t('lesson.suspend_message'),
            confirmText: t('lesson.suspend_confirm'),
            type: 'danger'
        });
        if (confirmed) setSelectedCourse(null);
    };

    const handleLogout = async () => {
        const confirmed = await requestConfirmation({
            title: 'Log out?',
            message: 'You will need to sign in again to continue your training.',
            confirmText: 'Log out',
            type: 'danger'
        });
        if (confirmed) logout();
    };

    // Lessons list based on course type
    // Lessons are now passed as props

    // Recursive Deep Filtering Logic with Multi-word support & Inheritance
    const searchTerms = useMemo(() =>
        searchTerm.toLowerCase().split(/\s+/).filter(t => t),
    [searchTerm]);

    const filteredLessons = useMemo(() => {
        if (searchTerms.length === 0) return lessons;

        const deepFilter = (list: Lesson[], inheritedMatch: boolean = false): Lesson[] => {
            return list
                .map(lesson => {
                    const lessonMatch = searchTerms.every(t =>
                        lesson.title.toLowerCase().includes(t) ||
                        lesson.content?.some(c => c.toLowerCase().includes(t)) ||
                        lesson.quiz?.title.toLowerCase().includes(t) ||
                        lesson.quiz?.description.toLowerCase().includes(t) ||
                        lesson.quiz?.questions.some(q =>
                            q.text.toLowerCase().includes(t) ||
                            q.explanation.toLowerCase().includes(t) ||
                            q.options.some(o => o.toLowerCase().includes(t))
                        )
                    );

                    const filteredChildren = lesson.children
                        ? deepFilter(lesson.children, inheritedMatch || lessonMatch)
                        : undefined;

                    const hasMatchingChildren = filteredChildren && filteredChildren.length > 0;

                    // Node is included if it matches OR has matching children OR parent matched
                    if (lessonMatch || hasMatchingChildren || inheritedMatch) {
                        return {
                            ...lesson,
                            children: filteredChildren
                        } as Lesson;
                    }
                    return null;
                })
                .filter((l): l is Lesson => l !== null);
        };

        return deepFilter(lessons);
    }, [lessons, searchTerms]);

    // Auto-focus search input
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Auto-expand parents if they contain children after filtering
    useEffect(() => {
        if (searchTerms.length > 0) {
            filteredLessons.forEach(l => {
                if (l.children && l.children.length > 0 && !expandedIds.has(l.id)) {
                    toggleExpand(l.id);
                }
            });
        }
    }, [filteredLessons, searchTerms, toggleExpand, expandedIds]);

    return (
        <aside
            className={`course-sidebar ${sidebarOpen ? 'open' : ''}`}
        >
            <div className="learner-sidebar-brand">
                {!isSearchOpen && <img src={kmtiTrainingHubLogo} alt="KMTI Training Hub" draggable={false} />}
                {!isSearchOpen && <h2 className="sidebar-course-title">{selectedCourse.title}</h2>}
                <div className="learner-sidebar-brand-actions">
                    <div className={`sidebar-search-wrapper ${isSearchOpen ? 'expanded' : ''} ${sidebarOpen ? 'visible' : 'hidden'}`}>
                        {isSearchOpen && (
                            <input ref={searchInputRef} type="text" className="sidebar-search-input" placeholder="Search lessons..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') setIsSearchOpen(false);
                                }}
                            />
                        )}
                        <button type="button" className="sidebar-search-btn-top" onClick={() => setIsSearchOpen(!isSearchOpen)} title={isSearchOpen ? 'Close Search' : 'Search Lessons'} aria-label={isSearchOpen ? 'Close lesson search' : 'Search lessons'}>
                            {isSearchOpen ? <X size={18} /> : <Search size={18} />}
                        </button>
                    </div>
                    {!isSearchOpen && (
                        <button
                            type="button"
                            className="close-sidebar-btn"
                            onClick={onToggleSidebar}
                            title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                            aria-label={sidebarOpen ? 'Close lesson sidebar' : 'Open lesson sidebar'}
                        >
                            {!sidebarOpen && <img className="collapsed-sidebar-logo" src={kmtiTrainingHubLogo} alt="" aria-hidden="true" />}
                            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                        </button>
                    )}
                </div>
            </div>
            <div className="sidebar-inner-container">
                <div className="lesson-list">
                    {filteredLessons.length > 0 ? (
                        filteredLessons.map((lesson: Lesson) => {
                            // Unified Gating Logic
                            const getLessonGateStatus = (l: Lesson) => {
                                if (isEmployeeSide) {
                                    return { isLocked: false, isStrictlyLocked: false, isSelfCompleted: true };
                                }

                                const lessonIndex = lessons.findIndex(it => it.id === l.id);

                                // CUMULATIVE LOCKED logic: if ANY previous module HAS a quiz and that quiz is NOT in completedLessons
                                const isLocked = lessons.slice(0, lessonIndex).some(prev =>
                                    !!prev.quiz && !completedLessons.includes(prev.id)
                                );

                                // UNLOCKED if not strictly locked OR if the current module itself is already completed
                                const isSelfCompleted = completedLessons.includes(l.id);

                                return { isLocked: isLocked && !isSelfCompleted, isStrictlyLocked: isLocked, isSelfCompleted };
                            };

                            const moduleStatus = getLessonGateStatus(lesson);
                            const isActive = activeLessonId === lesson.id || (lesson.children?.some(c => c.id === activeLessonId));

                            // PROGRESS INHERITANCE: If the parent module is completed, children are visually completed
                            const isParentCompleted = moduleStatus.isSelfCompleted;

                            // Calculate progress percentage for children
                             const subLessonProgress = (lesson.children && lesson.children.length > 0)
                               ? (isParentCompleted ? 100 : (lesson.children.filter(c => completedLessons.includes(c.id)).length / lesson.children.length) * 100)
                               : (moduleStatus.isSelfCompleted ? 100 : 0);

                            return (
                                <div key={lesson.id} className="lesson-item-wrapper">
                                    <div className={`lesson-item ${isActive ? 'active' : ''}
                                     ${isParentCompleted ? 'completed' : ''}
                                     ${moduleStatus.isLocked ? 'locked' : ''}
                                `}
                                        onClick={() => {
                                            if (lesson.children && lesson.children.length > 1) {
                                                toggleExpand(lesson.id);
                                            } else {
                                                if (!moduleStatus.isLocked) {
                                                    const targetId = (lesson.children && lesson.children.length === 1)
                                                        ? lesson.children[0].id
                                                        : lesson.id;
                                                    setActiveLessonId(targetId);
                                                }
                                            }
                                        }}
                                        aria-label={!sidebarOpen ? (t('lesson.title.' + lesson.id) === 'lesson.title.' + lesson.id ? lesson.title : t('lesson.title.' + lesson.id)) : undefined}
                                    >
                                        <div className="lesson-item-title">
                                            <div className="lesson-icon-wrapper">
                                                <ProgressCircle
                                                    percentage={subLessonProgress}
                                                    size={sidebarOpen ? 28 : 36}
                                                    strokeWidth={sidebarOpen ? 2.5 : 3}
                                                    className="lesson-progress-static"
                                                />
                                                <div className="lesson-icon-inner">
                                                    {lesson.children && lesson.children.length > 1 ? (
                                                        expandedIds.has(lesson.id) ? <ChevronDown size={sidebarOpen ? 14 : 18} /> : <ChevronRight size={sidebarOpen ? 14 : 18} />
                                                    ) : (
                                                        moduleStatus.isSelfCompleted ? (
                                                            <CheckCircle2 size={sidebarOpen ? 14 : 18} className="lesson-icon--completed" />
                                                        ) : (
                                                            <BookOpen size={sidebarOpen ? 14 : 18} className={`lesson-icon--dim ${moduleStatus.isLocked ? 'locked-icon' : ''}`} />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="lesson-title-text-group">
                                                <span>{formatSidebarLessonTitle(t('lesson.title.' + lesson.id) === 'lesson.title.' + lesson.id ? lesson.title : t('lesson.title.' + lesson.id))}</span>
                                                {searchTerms.length > 0 &&
                                                 !searchTerms.every(t => lesson.title.toLowerCase().includes(t)) &&
                                                 searchTerms.some(t => lesson.content?.some(c => c.toLowerCase().includes(t)) || lesson.quiz?.title.toLowerCase().includes(t) || lesson.quiz?.description.toLowerCase().includes(t) || lesson.quiz?.questions.some(q => q.text.toLowerCase().includes(t) || q.explanation.toLowerCase().includes(t) || q.options.some(o => o.toLowerCase().includes(t)))) && (
                                                    <span className="search-match-badge">Found in Content</span>
                                                )}
                                            </div>
                                        </div>
                                        {moduleStatus.isLocked && (
                                            <Lock size={14} className="lesson-lock-icon" />
                                        )}
                                    </div>

                                    {lesson.children && lesson.children.length > 1 && expandedIds.has(lesson.id) && (
                                        <div className={`sub-lesson-list ${!sidebarOpen ? 'collapsed-dots' : ''}`}>
                                            {lesson.children.map((child: Lesson, index: number) => (
                                                <div
                                                    key={child.id}
                                                    className={`sub-lesson-item
                                                        ${activeLessonId === child.id ? 'active' : ''}
                                                        ${completedLessons.includes(child.id) ? 'completed' : ''}
                                                        ${moduleStatus.isLocked ? 'locked' : ''}
                                                        ${index === 0 ? 'is-first' : ''}
                                                        ${index === lesson.children!.length - 1 ? 'is-last' : ''}
                                                    `}
                                                    onClick={() => {
                                                       if (!moduleStatus.isLocked) {
                                                           setActiveLessonId(child.id);
                                                       }
                                                    }}
                                                    aria-label={!sidebarOpen ? child.title : undefined}
                                                >
                                                    <div className="sub-lesson-connector" />
                                                    {!sidebarOpen ? (
                                                        <div className="sub-lesson-dot-indicator" />
                                                    ) : (
                                                        <div className="sub-lesson-title-group">
                                                            {completedLessons.includes(child.id) ? (
                                                                <CheckCircle2 size={14} className="sub-lesson-icon--completed" />
                                                            ) : (
                                                                <BookOpen size={14} className={`sub-lesson-icon ${moduleStatus.isLocked ? 'locked-icon' : ''}`} />
                                                            )}
                                                            <div className="lesson-title-text-group">
                                                                <span>{formatSidebarLessonTitle(t('lesson.title.' + child.id) === 'lesson.title.' + child.id ? child.title : t('lesson.title.' + child.id))}</span>
                                                                {searchTerms.length > 0 &&
                                                                 !searchTerms.every(t => child.title.toLowerCase().includes(t)) &&
                                                                 searchTerms.some(t => child.content?.some(c => c.toLowerCase().includes(t)) || child.quiz?.title.toLowerCase().includes(t) || child.quiz?.description.toLowerCase().includes(t) || child.quiz?.questions.some(q => q.text.toLowerCase().includes(t) || q.explanation.toLowerCase().includes(t) || q.options.some(o => o.toLowerCase().includes(t)))) && (
                                                                    <span className="search-match-badge sub">Found in Content</span>
                                                                 )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {sidebarOpen && moduleStatus.isLocked && (
                                                        <Lock size={12} className="sub-lesson-lock" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="sidebar-search-empty">
                            <p>No lessons found match "{searchTerm}"</p>
                            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="sidebar-course-footer">
                {isEmployeeSide && <button
                    className="exit-course-btn sidebar-exit-course-btn"
                    onClick={handleExitCourse}
                    title={t('lesson.exit_course')}
                >
                    <LogOut size={16} aria-hidden="true" />
                    <span>{t('lesson.exit_course')}</span>
                </button>}
                {sidebarOpen && isAccountMenuOpen && (
                    <div className="learner-account-menu">
                        <div className="learner-account-menu-summary">
                            <span className={`learner-account-avatar avatar-${user?.avatar_code || 'blue'}`}>{avatarUrl ? <img src={avatarUrl} alt="" /> : (user?.full_name || user?.username || 'U').trim().charAt(0).toUpperCase()}</span>
                            <div><strong>{user?.full_name || user?.username}</strong></div>
                        </div>

                        <div className="learner-account-menu-divider" />

                        <button type="button" className="learner-account-menu-item plan-item" onClick={() => navigate('/plans')}>
                            <Sparkles size={17} />
                            <span><strong>Upgrade Plan</strong></span>
                        </button>
                        <button type="button" className="learner-account-menu-item" onClick={() => { setIsAccountMenuOpen(false); window.dispatchEvent(new CustomEvent('kmti-open-profile-settings')); }}>
                            <UserIcon size={17} /><span><strong>Profile</strong></span>
                        </button>
                        <button type="button" className="learner-account-menu-item" onClick={() => { setIsSettingsOpen(open => !open); setIsHelpOpen(false); }}>
                            <Settings size={17} /><span><strong>Settings</strong></span><ChevronRight size={15} className={isSettingsOpen ? 'rotated' : ''} />
                        </button>

                        {isSettingsOpen && <div className="learner-account-settings">
                            <div className="learner-settings-label">Appearance</div>
                            <div className="learner-theme-options">
                                <button type="button" className={activeTheme==='light'?'active':''} aria-pressed={activeTheme==='light'} onClick={() => {setActiveTheme('light');window.dispatchEvent(new CustomEvent('kmti-set-theme', { detail: 'light' }));}}><Sun size={15} /> Light</button>
                                <button type="button" className={activeTheme==='dark'?'active':''} aria-pressed={activeTheme==='dark'} onClick={() => {setActiveTheme('dark');window.dispatchEvent(new CustomEvent('kmti-set-theme', { detail: 'dark' }));}}><Moon size={15} /> Dark</button>
                            </div>
                            <button type="button" className="learner-billing-summary" onClick={() => navigate('/billing')}><CreditCard size={15} /><span><strong>Billing</strong></span><ChevronRight size={14}/></button>
                        </div>}

                        <div className="learner-account-menu-divider" />

                        <button type="button" className="learner-account-menu-item" onClick={() => { setIsHelpOpen(open => !open); setIsSettingsOpen(false); }}>
                            <HelpCircle size={17} /><span><strong>Help</strong></span><ChevronRight size={15} className={isHelpOpen ? 'rotated' : ''} />
                        </button>
                        {isHelpOpen && <div className="learner-help-flyout">
                            <button type="button" onClick={() => navigate('/help')}><HelpCircle size={17} /><span>Help center</span></button>
                            <div className="learner-account-menu-divider" />
                            <button type="button" onClick={() => navigate('/terms')}><FileText size={17} /><span>Terms of Service</span></button>
                            <button type="button" onClick={() => navigate('/privacy')}><FileText size={17} /><span>Privacy Policy</span></button>
                            <button type="button" className="report-bug" onClick={() => window.dispatchEvent(new CustomEvent('kmti-open-bug-report'))}><Bug size={17} /><span>Report a bug</span></button>
                        </div>}
                        <button type="button" className="learner-account-menu-item learner-logout-menu-item" onClick={handleLogout}>
                            <LogOut size={17} /><span><strong>Log out</strong></span>
                        </button>
                    </div>
                )}

                <button
                    className="learner-sidebar-account"
                    type="button"
                    onClick={() => {
                        if (!sidebarOpen) onToggleSidebar();
                        setIsAccountMenuOpen(open => !open);
                    }}
                    title="Account menu"
                >
                    <span className={`learner-account-avatar avatar-${user?.avatar_code || 'blue'}`}>
                        {avatarUrl ? <img src={avatarUrl} alt="" /> : (user?.full_name || user?.username || 'U').trim().charAt(0).toUpperCase()}
                    </span>
                    <span className="learner-account-copy">
                        <strong>{user?.full_name || user?.username}</strong>
                        <small>{user?.role}</small>
                    </span>
                </button>
            </div>
        </aside>
    );
};
