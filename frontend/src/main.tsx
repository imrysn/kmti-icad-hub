import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './i18n'; // Initialize i18next before any component renders
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext'; 
import { UIProvider } from './context/UIContext';
import { TTSProvider } from './context/TTSContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <NotificationProvider>
                <UIProvider>
                    <TTSProvider>
                        <HashRouter>
                            <App />
                        </HashRouter>
                    </TTSProvider>
                </UIProvider>
            </NotificationProvider>
        </AuthProvider>
    </React.StrictMode>,
)
