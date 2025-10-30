import React, { useState } from 'react'
import '../../components/govDashboard.css'

export default function GovSettings() {
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState(true)
  const [name, setName] = useState('Admin')
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="gov-dashboard-content">
      <div className="gov-panel">
        <div className="gov-panel-header">
          <h2>Settings</h2>
        </div>

        <div style={{ display: 'grid', gap: 12, maxWidth: 700 }}>
          <div>
            <label className="small muted">Profile Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="small muted">Theme</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className={`gov-action-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
              <button
                className={`gov-action-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                Dark
              </button>
            </div>
          </div>

          <div>
            <label className="small muted">Notifications</label>
            <div>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={e => setNotifications(e.target.checked)}
                />
                Enable notifications
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="gov-action-btn" onClick={save}>
              Save
            </button>
            <button
              className="gov-action-btn"
              onClick={() => {
                setName('Admin')
                setTheme('dark')
                setNotifications(true)
              }}
            >
              Cancel
            </button>
            {saved && (
              <div
                className="small"
                style={{ color: 'green', marginLeft: 8 }}
              >
                Settings saved
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
