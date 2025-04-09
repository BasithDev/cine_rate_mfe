import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Search_result from './Search_result.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Search_result />
  </StrictMode>,
)
