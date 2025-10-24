import React, { useState } from 'react'
import '../../components/govDashboard.css'

const initial = [
  { id: 1, title: 'Fraud case #128', time: '2025-10-22 09:05', type: 'Critical' },
  { id: 2, title: 'Late tax filing — Region 3', time: '2025-10-21 14:20', type: 'Warning' },
  { id: 3, title: 'System audit completed', time: '2025-10-20 10:40', type: 'Info' }
]

export default function GovAlerts() {
  const [alerts, setAlerts] = useState(initial)
  const [filter, setFilter] = useState('all')

  const filtered = alerts.filter(a =>
    filter === 'all' ? true : a.type.toLowerCase() === filter
  )

  const dismiss = (id) => setAlerts(prev => prev.filter(a => a.id !== id))

  return (
    <div className="gov-dashboard-content">
      <div className="gov-panel">
        <div className="gov-panel-header">
          <h2>System Alerts</h2>
          <div className="gov-panel-controls">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
            <button onClick={() => setAlerts([])} className="gov-action-btn">
              Clear All
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(a => (
            <div
              key={a.id}
              className="card slideUp"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong>{a.title}</strong>
                <div className="small muted">{a.time}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center'
                }}
              >
                <span
                  className={`pill ${a.type === 'Critical'
                      ? 'danger'
                      : a.type === 'Warning'
                        ? 'warning'
                        : ''
                    }`}
                >
                  {a.type}
                </span>
                <button
                  className="gov-action-btn"
                  onClick={() => dismiss(a.id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="small muted">No alerts</div>}
        </div>
      </div>
    </div>
  )
}
