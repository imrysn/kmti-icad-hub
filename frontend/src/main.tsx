import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { TTSProvider } from './context/TTSContext'
import { UIProvider } from './context/UIContext'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <NotificationProvider>
                <UIProvider>
                    <LanguageProvider>
                        <TTSProvider>
                            <HashRouter>
                                <App />
                            </HashRouter>
                        </TTSProvider>
                    </LanguageProvider>
                </UIProvider>
            </NotificationProvider>
        </AuthProvider>
    </React.StrictMode>,
)
