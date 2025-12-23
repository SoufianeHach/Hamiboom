import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './HamiboomApp' // Falls deine Datei anders heißt, z.B. App.tsx, ändere das hier zu './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
