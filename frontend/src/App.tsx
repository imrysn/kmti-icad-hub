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
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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
      } else if (prevAuthRef.current === false) {
        // Transitioning from login
        if (window.electronAPI) {
          window.electronAPI.setWindowSize(1280, 720, true);
        }
      }
      // Update ref for next state change
      prevAuthRef.current = isAuthenticated;
    }
  }, [isAuthenticated, isInitialLoading]);

  return (
    <div className="app-container frameless">
      {/* Background Aurora Elements */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
      </div>

      {isInitialLoading ? (
        <LoadingScreen />
      ) : !isAuthenticated ? (
        <main className="app-content app-content-login">
          <div className="login-theme-wrapper">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
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
              <div className="app-title">KMTI iCAD Hub</div>
              
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
              )}
            </div>

            {/* 3. USER & ACTIONS (Right) */}
            <div className="header-right">
              <div className="user-status-minimal">
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
