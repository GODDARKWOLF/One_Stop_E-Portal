import React from 'react'
import './policeDashboard.css'
import sample from '../data/dummyData.json'

export default function Surveillance() {
  const feeds = sample.cameras.slice(0, 6)
  return (
    <div className="police-panel">
      <div className="gov-panel-header"><h2>Surveillance Feeds</h2></div>
      <div className="camera-grid">
        {feeds.map(f => (
          <div className="camera-card" key={f.id}>
            <div className="camera-thumb">CAM #{f.id}</div>
            <div className="camera-meta">{f.location}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
