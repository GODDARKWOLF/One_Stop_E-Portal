import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import GovSidebarNav from './GovSidebarNav'
import GovTopNavBar from './GovTopNavBar'
import './govDashboard.css'

const GovDashboardLayout = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <div className="gov-dashboard-layout">
            <aside className={`gov-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <GovSidebarNav collapsed={sidebarCollapsed} />
            </aside>
            <main className="gov-main">
                <GovTopNavBar onMenuClick={toggleSidebar} />
                <Outlet />
            </main>
        </div>
    )
}

export default GovDashboardLayout