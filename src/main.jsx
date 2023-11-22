import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextRole from './ContextShare/ContextRole.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ContextRole>
      <BrowserRouter><App /></BrowserRouter>
  
</ContextRole>  </React.StrictMode>,
)
