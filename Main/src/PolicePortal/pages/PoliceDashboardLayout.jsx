import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import './policeDashboard.css'

export default function PoliceDashboardLayout() {
  return (
    <div className="police-layout">
      <aside className="police-sidebar">
        <div className="police-brand">
          <h3>ZambiaPolice</h3>
        </div>
        <nav className="police-nav">
          <NavLink to="/police" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/police/officers" className={({ isActive }) => isActive ? 'active' : ''}>Officers</NavLink>
          <NavLink to="/police/reports" className={({ isActive }) => isActive ? 'active' : ''}>Reports</NavLink>
          <NavLink to="/police/cases" className={({ isActive }) => isActive ? 'active' : ''}>Cases</NavLink>
          <NavLink to="/police/surveillance" className={({ isActive }) => isActive ? 'active' : ''}>Surveillance</NavLink>
          <NavLink to="/police/alerts" className={({ isActive }) => isActive ? 'active' : ''}>Alerts</NavLink>
          <NavLink to="/police/settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink>
          <NavLink to="/police/logout" className={({ isActive }) => isActive ? 'active' : ''}>Logout</NavLink>
        </nav>
      </aside>
      <div className="police-main">
        <header className="police-topnav">
          <div className="police-top-left">
            <button className="police-collapse">☰</button>
            <h2>Police Dashboard</h2>
          </div>
          <div className="police-top-right">
            <div className="police-search"><input placeholder="Search incidents, officers..." /></div>
            <div className="police-profile">Commander</div>
          </div>
        </header>

        <main className="police-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
