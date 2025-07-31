import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app-container'>
      <div className='sidebar'>
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/character/create"><h3>Create a character</h3></Link>
        <Link to="/character/gallery"><h3>Character Gallery</h3></Link>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}

export default App
