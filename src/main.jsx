import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css';  
import './logins.css';
import './Letter.css'
import './RomanticBook.css'
import ARoutes from './ARoutes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ARoutes />
  </StrictMode>,
)
