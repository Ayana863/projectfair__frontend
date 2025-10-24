import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContexApi from './Context/ContexApi.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>

<ContexApi>
    <BrowserRouter>
      <App />
    </BrowserRouter>
</ContexApi>

  </StrictMode>,
)
