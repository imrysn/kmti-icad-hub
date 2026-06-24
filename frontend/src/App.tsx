import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Settings, User as UserIcon, RefreshCw, Database, WifiOff, Lock, Brain, GraduationCap, ClipboardList, Briefcase, Bell } from 'lucide-react';

import { LoginView } from './views/LoginView';
import { LoadingScreen } from './components/LoadingScreen';
import MentorMode from './views/mentor/MentorMode';
import AssistantMode from './views/assistant/AssistantMode';
import { AdminMode } from './views/admin/AdminMode';
import { useAuth } from './hooks/useAuth';
import { useNotification } from './context/NotificationContext';
import { WebSocketProvider, useWebSocket } from './context/WebSocketContext';
import ErrorBoundary from './components/ErrorBoundary';
import { BroadcastBanner } from './components/BroadcastBanner';
import { NotificationSystem } from './components/NotificationSystem';
import { NotificationsModal } from './components/NotificationsModal';
import WindowControls from './components/WindowControls';
import ThemeToggle from './components/ThemeToggle';
import { getSystemStatus, api } from './services/api';
import { authService } from './services/authService';
import { TraineeTelemetrySidebar } from './views/mentor/components/TraineeTelemetrySidebar';
import { useUI } from './context/UIContext';
import { assessmentService } from './services/assessmentService';

import kmtiLogo from './assets/kmti-training-hub.png';
import './styles/App.css';

function AppContent() {
  const { user, isAuthenticated, isInitialLoading, logout } = useAuth();
  const { showNotification } = useNotification();
  const { isTelemetryOpen, toggleTelemetry } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  // Derived state for current tab
  const params = new URLSearchParams(location.search);
  const currentTab = params.get('tab') || localStorage.getItem('assistant-active-tab') || 'training';

  const handleTabChange = (tab: string) => {
    navigate(`/assistant?tab=${tab}`);
  };

  // Centralized WebSocket notification receiver — now via WebSocketContext
  const { subscribe } = useWebSocket();
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasTrainees, setHasTrainees] = useState<boolean | null>(null); // null = not yet checked
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const fetchUnreadCount = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get('/api/v1/notifications');
      const data = response.data;
      setUnreadCount(data.filter((n: any) => !n.is_read).length);
    } catch (err) {
      console.error('Failed to load notifications count:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadCount();
      // Check if employee has any assigned trainees
      const role = user?.role?.toLowerCase()?.trim();
      if (role === 'employee') {
        assessmentService.getTrainerTraineesProgress()
          .then((trainees: any[]) => setHasTrainees(trainees.length > 0))
          .catch(() => setHasTrainees(false));
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    window.addEventListener('kmti-refresh-unread-count', fetchUnreadCount);
    return () => window.removeEventListener('kmti-refresh-unread-count', fetchUnreadCount);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsub = subscribe('*', (data) => {
      const role = user?.role?.toLowerCase()?.trim();
      let notificationTriggered = false;

      if (data.event === "NEW_SUBMISSION" && (role === 'employee' || role === 'admin')) {
        showNotification(data.message || `${data.trainee_name} submitted Set ${data.set_number} Unit ${data.task_code} for review.`, 'info', 0, '/assistant?tab=assessment&subtab=assessments');
        window.dispatchEvent(new CustomEvent('kmti-refresh-submissions'));
        notificationTriggered = true;
      } else if (data.event === "NEW_REPLY" && (role === 'employee' || role === 'admin')) {
        showNotification(data.message || `${data.trainee_name} replied to your feedback.`, 'info', 0, '/assistant?tab=assessment&subtab=assessments');
        window.dispatchEvent(new CustomEvent('kmti-refresh-submissions'));
        notificationTriggered = true;
      } else if (data.event === "TRAINEE_PROGRESS" && (role === 'employee' || role === 'admin')) {
        showNotification(data.message || `Trainee ${data.trainee_name} passed ${data.lesson_title} with ${data.score}%!`, 'success', 0, '/assistant?tab=assessment&subtab=progress');
        window.dispatchEvent(new CustomEvent('kmti-refresh-trainee-progress'));
        notificationTriggered = true;
      } else if (data.event === "TRAINEE_COURSE_COMPLETED" && (role === 'employee' || role === 'admin')) {
        showNotification(data.message || `Trainee ${data.trainee_name} completed the ENTIRE ${data.course_name} Course!`, 'success', 0, '/assistant?tab=assessment&subtab=progress');
        window.dispatchEvent(new CustomEvent('kmti-refresh-trainee-progress'));
        notificationTriggered = true;
      } else if (data.event === "ASSESSMENT_REVIEWED" && role === 'trainee') {
        if (data.status === 'approved') {
          showNotification(data.message, 'success', 0, '/mentor?mode=assessment');
        } else {
          showNotification(data.message, 'error', 0, '/mentor?mode=assessment');
        }
        window.dispatchEvent(new CustomEvent('kmti-refresh-my-submissions'));
        notificationTriggered = true;
      } else if (data.event === "ASSESSMENT_UNLOCKED" && role === 'trainee') {
        showNotification(data.message || `A new assessment set has been unlocked by your trainer.`, 'info', 0, '/mentor?mode=assessment');
        window.dispatchEvent(new CustomEvent('kmti-refresh-my-submissions'));
        notificationTriggered = true;
      } else if (data.event === "GLOBAL_REFRESH") {
        window.dispatchEvent(new CustomEvent('kmti-global-refresh'));
      }
      if (notificationTriggered) {
        fetchUnreadCount();
        if (window.electronAPI && typeof window.electronAPI.flashWindow === 'function') {
          window.electronAPI.flashWindow();
        }
      }
    });

    return unsub;
  }, [isAuthenticated, user?.role, subscribe]);

  // System Status
  const [dbStatus, setDbStatus] = useState({ db_mode: 'mysql', nas_reachable: true });

  const fetchStatus = async () => {
    const status = await getSystemStatus();
    setDbStatus(status);
  };

  useEffect(() => {
    fetchStatus();
    // Check status every 2 minutes
    const interval = setInterval(fetchStatus, 120000);
    return () => clearInterval(interval);
  }, []);

  // Theme Management
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Force dark mode on login page, otherwise use saved theme
    const activeTheme = location.pathname === '/login' ? 'dark' : theme;
    document.documentElement.setAttribute('data-theme', activeTheme);

    if (location.pathname !== '/login') {
      localStorage.setItem('theme', theme);
    }
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Redirect based on user role if on root path
  useEffect(() => {
    if (isAuthenticated && user && location.pathname === '/') {
      const role = user.role.toLowerCase().trim();
      const savedCourseId = localStorage.getItem('kmti_selectedCourseId');

      // If we have a saved course, don't auto-redirect to the root of the role
      if (savedCourseId && location.pathname === '/') {
        navigate('/mentor');
        return;
      }
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'employee') {
        navigate('/assistant');
      } else {
        navigate('/mentor');
      }
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  // Centralized Window Size Management
  const prevAuthRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!isInitialLoading) {
      if (!isAuthenticated) {
        // App is definitely in logged-out state -> Switch to compact login size
        if (window.electronAPI) {
          window.electronAPI.setWindowSize(440, 550, false);
        }
      } else {
        // App is authenticated (either on startup or after login) -> Set to maximized/full screen
        if (window.electronAPI) {
          window.electronAPI.setWindowSize(1280, 720, true);
          window.electronAPI.maximize();
        }
      }
      // Update ref for next state change
      prevAuthRef.current = isAuthenticated;
    }
  }, [isAuthenticated, isInitialLoading]);

  return (
    <div className="app-container frameless">
      {/* Background Aurora Elements - Restored per user request */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
      </div>

      {isInitialLoading ? (
        <LoadingScreen />
      ) : !isAuthenticated ? (
        <main className="app-content app-content-login">

          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      ) : (
        <>
          <BroadcastBanner />
          <NotificationSystem />
          <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />

          {/* Header with Categorized Zones */}
          <header className="app-header animate-fade-in">
            {/* 1. BRANDING (Left) */}
            <div className="header-left">
              <div className="app-title">
                <img
                  src={kmtiLogo}
                  alt="KMTI Logo"
                  draggable={false}
                  style={{
                    width: '30px',
                    height: '30px',
                    objectFit: 'contain',
                    userSelect: 'none'
                  }}
                />
                <span>KMTI Training Hub</span>
              </div>

              {!dbStatus.nas_reachable && (
                <div className="status-badge local-mode" title="NAS Connection Lost - Progress stored on Server PC">
                  <WifiOff size={14} />
                  <span>Local Mode</span>
                </div>
              )}
            </div>

            {/* 2. NAVIGATION (Center) */}
            <div className="header-center">
              {user?.role === 'admin' && (
                <nav className="assistant-tabs" style={{ marginBottom: 0, padding: 0, borderBottom: 'none', ...(location.pathname.startsWith('/assistant') ? { marginRight: '1.5rem' } : {}) }}>
                  <button className={`assistant-tab-btn ${location.pathname.startsWith('/mentor') ? 'active' : ''}`} onClick={() => navigate('/mentor')}>
                    <GraduationCap size={18} />
                    <span>iCAD Manuals and Standard</span>
                  </button>
                  <button className={`assistant-tab-btn ${location.pathname.startsWith('/admin') ? 'active' : ''}`} onClick={() => navigate('/admin')}>
                    <Settings size={18} />
                    <span>Admin</span>
                  </button>
                </nav>
              )}
              {location.pathname.startsWith('/assistant') && user?.role !== 'admin' && hasTrainees && (
                <nav className="assistant-tabs" style={{ marginBottom: 0, padding: 0, borderBottom: 'none' }}>
                  <button className={`assistant-tab-btn ${currentTab === 'training' ? 'active' : ''}`} onClick={() => handleTabChange('training')} title="iCAD Manuals and Standard">
                    <GraduationCap size={18} />
                    <span>iCAD Manuals and Standard</span>
                  </button>
                  <button className={`assistant-tab-btn ${currentTab === 'assessment' ? 'active' : ''}`} onClick={() => handleTabChange('assessment')} title="Trainee Overview">
                    <ClipboardList size={18} />
                    <span>Trainee Overview</span>
                  </button>
                </nav>
              )}
            </div>

            {/* 3. USER & ACTIONS (Right) */}
            <div className="header-right">
              <div className="user-status-minimal">
                <span className="user-name-minimal">{user?.username}</span>
                <span className="user-separator">|</span>
                <span className="user-role-minimal">{user?.role}</span>
              </div>

              <div className="header-actions">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(true);
                  }}
                  className="theme-toggle-btn"
                  title="Notifications"
                  style={{ position: 'relative' }}
                >
                  <Bell size={20} className="theme-toggle-icon" />
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: 'var(--accent-red, #ef4444)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      border: '2px solid var(--bg-surface)'
                    }}>
                      {unreadCount}
                    </span>
                  )}
                </button>

                {(user?.role === 'admin' || user?.role === 'employee') && (
                  <button
                    onClick={toggleTelemetry}
                    className={`theme-toggle-btn ${isTelemetryOpen ? 'active' : ''}`}
                    title="Toggle Trainee Presence"
                    style={{ background: isTelemetryOpen ? 'var(--accent-blue-transparent, rgba(59, 130, 246, 0.15))' : undefined }}
                  >
                    <UserIcon size={20} className="theme-toggle-icon" style={{ color: isTelemetryOpen ? 'var(--accent-blue, #3b82f6)' : undefined }} />
                  </button>
                )}

                <ThemeToggle theme={theme} onToggle={toggleTheme} />

                <button
                  onClick={() => {
                    if (window.electronAPI) window.electronAPI.setWindowSize(440, 550, false);
                    logout();
                  }}
                  className="theme-toggle-btn logout-btn-icon"
                  title="Logout"
                >
                  <LogOut size={20} className="theme-toggle-icon" />
                </button>

                <div className="header-divider" />

                <WindowControls buttonsOnly={true} />
              </div>
            </div>
          </header>

          {/* Render Selected Mode via Routes */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <main className="app-content" style={{ flex: 1 }}>
              <ErrorBoundary>
                <Routes>
                  <Route path="/mentor" element={<MentorMode isEmployeeSide={user?.role?.toLowerCase() !== 'trainee'} />} />
                  <Route path="/assistant" element={<AssistantMode />} />
                  <Route path="/admin/*" element={<AdminMode />} />
                  <Route path="/" element={<Navigate to={user?.role === 'admin' ? "/admin" : (user?.role === 'employee' ? "/assistant" : "/mentor")} replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </main>
            {(user?.role === 'admin' || user?.role === 'employee') && <TraineeTelemetrySidebar />}
          </div>
        </>
      )}
    </div>
  );
}

/** Root App wraps AppContent with the centralized WebSocketProvider. */
function App() {
  const { isAuthenticated } = useAuth();
  // Reactively read token so WebSocketProvider reconnects on login/logout
  const token = isAuthenticated ? authService.getToken() : null;
  return (
    <WebSocketProvider token={token}>
      <AppContent />
    </WebSocketProvider>
  );
}

export default App;
