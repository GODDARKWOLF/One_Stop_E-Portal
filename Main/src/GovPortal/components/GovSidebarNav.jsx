import React from 'react'
import { NavLink } from 'react-router-dom'

const GovSidebarNav = ({ collapsed }) => {
    const navLinks = [
        { path: '/gov', icon: 'fa-solid fa-chart-line', label: 'Dashboard' },
        { path: '/gov/citizens', icon: 'fa-solid fa-users', label: 'Citizens' },
        { path: '/gov/tax-records', icon: 'fa-solid fa-coins', label: 'Revenue' },
        { path: '/gov/reports', icon: 'fa-solid fa-file-alt', label: 'Reports' },
        { path: '/gov/alerts', icon: 'fa-solid fa-bell', label: 'Alerts' },
        { path: '/gov/settings', icon: 'fa-solid fa-gear', label: 'Settings' },
        { path: '/gov/blockchain', icon: 'fa-solid fa-link', label: 'Blockchain' }

    ]

    return (
        <div>
            <div className="gov-logo">
                <div className="logo">Z</div>
                {!collapsed && (
                    <div>
                        <h1>ZRA Admin</h1>
                        <p>Central Portal</p>
                    </div>
                )}
            </div>

            <nav className="gov-nav">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `gov-nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className={link.icon}></i>
                        {!collapsed && <span>{link.label}</span>}
                    </NavLink>
                ))}

                <NavLink
                    to="/logout"
                    className="gov-nav-item"
                    style={{ marginTop: 'auto' }}
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    {!collapsed && <span>Logout</span>}
                </NavLink>
            </nav>
        </div>
    )
}

export default GovSidebarNav