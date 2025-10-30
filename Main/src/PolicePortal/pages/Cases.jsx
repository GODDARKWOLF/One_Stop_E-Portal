import React from 'react'
import './policeDashboard.css'
import data from '../data/dummyData.json'

export default function Cases() {
  return (
    <div className="police-panel">
      <div className="gov-panel-header">
        <h2>Cases</h2>
      </div>
      <div className="case-list">
        {data.cases.map(c => (
          <div className="case-card" key={c.id}>
            <div className="case-title">{c.title}</div>
            <div className="case-meta">{c.status} • {c.officers.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
