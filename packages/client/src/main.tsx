import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Dashboard from './component/page/Dashboard'

createRoot(document.getElementById('root')!).render(
  <Dashboard/>
)
