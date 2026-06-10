import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Settings, User as UserIcon, RefreshCw, Database, WifiOff } from 'lucide-react';

import { LoginView } from './views/LoginView';
import { LoadingScreen } from './components/LoadingScreen';
import MentorMode from './views/mentor/MentorMode';
import AssistantMode from './views/assistant/AssistantMode';
import { AdminMode } from './views/admin/AdminMode';
import { useAuth } from './hooks/useAuth';
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
  const navigate = useNavigate();
  const location = useLocation();

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
              {user?.role === 'admin' ? (
                <nav className="mode-switcher">
                  <button className={`mode-btn ${location.pathname.startsWith('/mentor') ? 'active' : ''}`} onClick={() => navigate('/mentor')}>
                    Mentor
                  </button>
                  <button className={`mode-btn ${location.pathname.startsWith('/assistant') ? 'active' : ''}`} onClick={() => navigate('/assistant')}>
                    Assistant
                  </button>
                  <button className={`mode-btn ${location.pathname.startsWith('/admin') ? 'active' : ''}`} onClick={() => navigate('/admin')}>
                    Admin
                  </button>
                </nav>
              ) : location.pathname.startsWith('/mentor') && (
                <nav className="mode-switcher">
                  <button className={`mode-btn ${new URLSearchParams(location.search).get('mode') !== 'assessment' ? 'active' : ''}`} onClick={() => navigate('/mentor?mode=manual')}>
                    Manual
                  </button>
                  <button className={`mode-btn ${new URLSearchParams(location.search).get('mode') === 'assessment' ? 'active' : ''}`} onClick={() => navigate('/mentor?mode=assessment')}>
                    Practical Assessment
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
                
                <button
                  onClick={() => {
                    // Force a hard reload to bust any JS/CSS caching
                    window.location.reload();
                  }}
                  className="theme-toggle-btn"
                  title="Refresh Page Content"
                >
                  <RefreshCw size={18} className="theme-toggle-icon" />
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
