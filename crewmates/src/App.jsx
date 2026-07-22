import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import CreateCrewmate from './pages/CreateCrewmate'
import CrewmateDetail from './pages/CrewmateDetail'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import UpdateCrewmate from './pages/UpdateCrewmate'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetail />} />
            <Route path="/edit/:id" element={<UpdateCrewmate />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
