import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Create from './components/Create.jsx'
import Gallery from './components/Gallery.jsx'
import Character from './components/Character.jsx'
import Edit from './components/Edit.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='/character/create' element={<Create />} />
          <Route path='/character/gallery' element={<Gallery />} />
          <Route path='/character/:id' element={<Character />} />
          <Route path='/character/:id/edit' element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
