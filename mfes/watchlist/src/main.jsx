import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WatchList from './WatchList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WatchList />
  </StrictMode>,
)
