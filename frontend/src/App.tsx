import { useState, useEffect } from 'react';
import { LoginView } from './views/LoginView';
import { LoadingScreen } from './components/LoadingScreen';
import MentorMode from './views/mentor/MentorMode';
import AssistantMode from './views/assistant/AssistantMode';
import { AdminMode } from './views/admin/AdminMode';
import { useAuth } from './hooks/useAuth';
import { AppMode } from './types';
import ErrorBoundary from './components/ErrorBoundary';
import { BroadcastBanner } from './components/BroadcastBanner';

import './styles/App.css';

function App() {
  const { user, isAuthenticated, isInitialLoading, logout } = useAuth();
  const [mode, setMode] = useState<AppMode>('mentor');

  // Automatically set mode based on user role
  useEffect(() => {
    if (user && user.role) {
      const role = user.role.toLowerCase().trim();

      if (role === 'admin') {
        setMode('admin');
      } else if (role === 'employee') {
        setMode('assistant');
      } else {
        setMode('mentor');
      }
    }
  }, [user]);

  // Show loading state while checking authentication
  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="app-container">
      <BroadcastBanner />
      {/* Header with User Info and Logout */}
      <div className="app-header">
        <div className="app-title">
          KMTI Training Hub
        </div>
        <div className="user-info">
          <div className="user-meta">
            <span className="user-name">{user?.full_name}</span>
            <span className="user-role">
              {user?.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mode Switcher - Only show for Admin or if we want to allow switching */}
      {user?.role === 'admin' && (
        <div className="mode-switcher">
          <button
            className={`mode-btn ${mode === 'mentor' ? 'active' : ''}`}
            onClick={() => setMode('mentor')}
          >
            <span>Mentor</span>
          </button>
          <button
            className={`mode-btn ${mode === 'assistant' ? 'active' : ''}`}
            onClick={() => setMode('assistant')}
          >
            <span>Assistant</span>
          </button>
          <button
            className={`mode-btn ${mode === 'admin' ? 'active' : ''}`}
            onClick={() => setMode('admin')}
          >
            <span>Admin</span>
          </button>
        </div>
      )}

      {/* Render Selected Mode */}
      <div className="app-content">
        <ErrorBoundary>
          {mode === 'mentor' && <MentorMode />}
          {mode === 'assistant' && <AssistantMode />}
          {mode === 'admin' && <AdminMode />}
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
