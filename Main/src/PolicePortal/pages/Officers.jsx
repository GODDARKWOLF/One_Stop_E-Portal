import React, { useState } from 'react'
import './policeDashboard.css'
import data from '../data/dummyData.json'

export default function Officers() {
  const [list, setList] = useState(data.officers)
  const [query, setQuery] = useState('')

  const filtered = list.filter(o => (o.name + o.rank + o.status).toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="police-panel">
      <div className="gov-panel-header">
        <h2>Officers</h2>
        <div className="gov-panel-controls">
          <input placeholder="Search officers..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="officer-grid">
        {filtered.map(o => (
          <div className="officer-card" key={o.id}>
            <div className="officer-name">{o.name}</div>
            <div className="officer-rank">{o.rank}</div>
            <div className={`officer-status ${o.status === 'On Duty' ? 'on' : 'off'}`}>{o.status}</div>
            <div className="officer-meta">{o.station}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
