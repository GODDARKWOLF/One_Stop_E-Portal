import React from 'react'
import { useNavigate } from 'react-router-dom'
import GovDashboardLayout from '../../components/GovDashboardLayout'
import '../../components/govDashboard.css'

export default function Logout() {
  const nav = useNavigate()
  return (
    <GovDashboardLayout>
      <div className="gov-panel" style={{ maxWidth: 560 }}>
        <h2>Log out</h2>
        <p>Are you sure you want to log out?</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="gov-action-btn" onClick={() => nav(-1)}>Cancel</button>
          <button className="gov-action-btn" onClick={() => nav('/')}>Log Out</button>
        </div>
      </div>
    </GovDashboardLayout>
  )
}
