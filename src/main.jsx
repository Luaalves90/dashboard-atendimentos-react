import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { TemaProvider } from './contexts/TemaContext'
import { Toaster } from 'react-hot-toast' // NOVO
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TemaProvider>
      <HashRouter>
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              padding: '16px',
              borderRadius: '8px',
            },
            success: {
              style: {
                background: '#10b981',
              },
              icon: '✅',
            },
            error: {
              style: {
                background: '#ef4444',
              },
              icon: '❌',
            },
            loading: {
              style: {
                background: '#3b82f6',
              },
              icon: '⏳',
            },
          }}
        />
      </HashRouter>
    </TemaProvider>
  </React.StrictMode>
)