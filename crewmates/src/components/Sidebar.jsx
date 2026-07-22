import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Create a Crewmate!
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Crewmate Gallery
        </NavLink>
      </nav>
      <div className="sidebar-graphic" aria-hidden="true">
        <div className="mini-crewmate">
          <div className="mini-crewmate-visor" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
