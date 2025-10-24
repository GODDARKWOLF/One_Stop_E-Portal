import React from 'react'
import SidebarNav from './SidebarNav'
import TopNavBar from './TopNavBar'
import './dashboard.css'

const DashboardLayout = ({children}) => {
	return (
		<div className="dashboard-layout">
			<aside className="sidebar">
				<SidebarNav />
			</aside>
			<main className="main">
				<TopNavBar />
				{children}
			</main>
		</div>
	)
}

export default DashboardLayout
