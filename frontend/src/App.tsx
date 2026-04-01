import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LoginView } from './views/LoginView';
import { LoadingScreen } from './components/LoadingScreen';
import MentorMode from './views/mentor/MentorMode';
import AssistantMode from './views/assistant/AssistantMode';
import { AdminMode } from './views/admin/AdminMode';
import { useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';
import { BroadcastBanner } from './components/BroadcastBanner';
import { NotificationSystem } from './components/NotificationSystem';

import './styles/App.css';

function App() {
  const { user, isAuthenticated, isInitialLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect based on user role if on root path
  useEffect(() => {
    if (isAuthenticated && user && location.pathname === '/') {
      const role = user.role.toLowerCase().trim();
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'employee') {
        navigate('/assistant');
      } else {
        navigate('/mentor');
      }
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  // Show loading state while checking authentication
  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      {/* Background Aurora Elements */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
      </div>

      <BroadcastBanner />
      <NotificationSystem />

      {/* Header with User Info and Logout */}
      <header className="app-header animate-fade-in">
        <div className="app-title">
          KMTI iCAD Hub
        </div>

        <div className="user-info">
          {/* Mode Switcher - Only show for Admin */}
          {user?.role === 'admin' && (
            <nav className="mode-switcher">
              <button
                className={`mode-btn ${location.pathname.startsWith('/mentor') ? 'active' : ''}`}
                onClick={() => navigate('/mentor')}
              >
                Mentor
              </button>
              <button
                className={`mode-btn ${location.pathname.startsWith('/assistant') ? 'active' : ''}`}
                onClick={() => navigate('/assistant')}
              >
                Assistant
              </button>
              <button
                className={`mode-btn ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                onClick={() => navigate('/admin')}
              >
                Admin
              </button>
            </nav>
          )}

          <div className="user-meta">
            <span className="user-name">{user?.full_name}</span>
            <span className="user-role">{user?.role}</span>
          </div>

          <button
            onClick={() => {
              if (window.electronAPI) {
                window.electronAPI.setWindowSize(440, 550, false);
              }
              logout();
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Render Selected Mode via Routes */}
      <main className="app-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/mentor" element={<MentorMode />} />
            <Route path="/assistant" element={<AssistantMode />} />
            <Route path="/admin/*" element={<AdminMode />} />
            <Route path="/" element={<Navigate to={user?.role === 'admin' ? "/admin" : (user?.role === 'employee' ? "/assistant" : "/mentor")} replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
