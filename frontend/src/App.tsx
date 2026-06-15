import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Settings, User as UserIcon, RefreshCw, Database, WifiOff, Lock, Brain, GraduationCap, ClipboardList } from 'lucide-react';

import { LoginView } from './views/LoginView';
import { LoadingScreen } from './components/LoadingScreen';
import MentorMode from './views/mentor/MentorMode';
import AssistantMode from './views/assistant/AssistantMode';
import { AdminMode } from './views/admin/AdminMode';
import { useAuth } from './hooks/useAuth';
import { useNotification } from './context/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import { BroadcastBanner } from './components/BroadcastBanner';
import { NotificationSystem } from './components/NotificationSystem';
import WindowControls from './components/WindowControls';
import ThemeToggle from './components/ThemeToggle';
import { getSystemStatus } from './services/api';

import kmtiLogo from './assets/kmti_logo.png';
import './styles/App.css';

function App() {
  const { user, isAuthenticated, isInitialLoading, logout } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  // Derived state for current tab
  const params = new URLSearchParams(location.search);
  const currentTab = params.get('tab') || localStorage.getItem('assistant-active-tab') || 'assistant';

  const handleTabChange = (tab: string) => {
    navigate(`/assistant?tab=${tab}`);
  };

  // Centralized WebSocket notification receiver
  useEffect(() => {
    if (!isAuthenticated) return;
    const token = sessionStorage.getItem('access_token') || localStorage.getItem('kmti_jwt_token') || sessionStorage.getItem('kmti_jwt_token');
    if (!token) return;

    // Use location host to build connection URL
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.hostname}:8000/notifications/ws?token=${token}`;

    let ws: WebSocket;
    let reconnectTimeout: any;

    const connect = () => {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("Connected to Real-Time Notification Server");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
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
          }

          if (notificationTriggered && window.electronAPI && typeof window.electronAPI.flashWindow === 'function') {
            window.electronAPI.flashWindow();
          }
        } catch (err) {
          console.error("Failed to parse websocket message", err);
        }
      };

      ws.onclose = () => {
        console.log("Disconnected from Real-Time Notification Server. Attempting reconnect...");
        reconnectTimeout = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [isAuthenticated, user?.role]);

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
                    width: '18px',
                    height: '18px',
                    objectFit: 'contain',
                    userSelect: 'none'
                  }}
                />
                <span>KMTI iCAD Hub</span>
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
                  <button className={`assistant-tab-btn ${location.pathname.startsWith('/assistant') ? 'active' : ''}`} onClick={() => navigate('/assistant')}>
                    <Brain size={18} />
                    <span>Intelligence Assistant</span>
                  </button>
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
              {location.pathname.startsWith('/assistant') && user?.role !== 'admin' && (
                <nav className="assistant-tabs" style={{ marginBottom: 0, padding: 0, borderBottom: 'none' }}>
                  <button className={`assistant-tab-btn ${currentTab === 'assistant' ? 'active' : ''}`} onClick={() => handleTabChange('assistant')} title="Intelligence Assistant">
                      <Brain size={18} />
                      <span>Intelligence Assistant</span>
                  </button>
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
          <main className="app-content">
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
        </>
      )}
    </div>
  );
}

export default App;
