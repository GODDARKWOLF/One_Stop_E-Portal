import React, { useState } from 'react'
import './policeDashboard.css'
import data from '../data/dummyData.json'

export default function Alerts() {
  const [list, setList] = useState(data.alerts)
  const dismiss = (i) => setList(prev => prev.filter((_, idx) => idx !== i))
  return (
    <div className="police-panel">
      <div className="gov-panel-header"><h2>Alerts</h2></div>
      <div className="alerts-list">
        {list.map((a, idx) => (
          <div className="alert-card" key={idx}>
            <div>
              <strong>{a.title}</strong>
              <div className="small muted">{a.time} • {a.severity}</div>
            </div>
            <div><button className="gov-action-btn" onClick={() => dismiss(idx)}>Resolve</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
