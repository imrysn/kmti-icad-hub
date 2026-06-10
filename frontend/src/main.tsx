import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
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
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </TTSProvider>
                </UIProvider>
            </NotificationProvider>
        </AuthProvider>
    </React.StrictMode>,
)
