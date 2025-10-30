import React from 'react'
import './policeDashboard.css'
import data from '../data/dummyData.json'

export default function Reports() {
  return (
    <div className="police-panel">
      <div className="gov-panel-header">
        <h2>Incident Reports</h2>
      </div>
      <div className="report-list">
        {data.reports.map(r => (
          <div className="report-card" key={r.id}>
            <div className="report-title">{r.title}</div>
            <div className="report-meta">{r.location} • {r.time} • {r.severity}</div>
            <div className="report-actions"><button className="gov-action-btn">View</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
