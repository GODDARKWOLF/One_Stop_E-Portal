import React, { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import MapView from '../components/MapView'
import './policeDashboard.css'
import data from '../data/dummyData.json'

export default function Dashboard() {
  const [alerts, setAlerts] = useState(data.alerts.slice(0, 3))
  useEffect(() => {
    // simulate real-time alerts arriving
    const timer = setInterval(() => {
      const next = data.alerts[Math.floor(Math.random() * data.alerts.length)]
      setAlerts(prev => [next, ...prev].slice(0, 5))
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="police-dashboard-grid">
      <div className="police-top-cards">
        <StatCard label="Active Cases" value="128" />
        <StatCard label="Arrests Today" value="12" />
        <StatCard label="Alerts (24h)" value="34" />
        <StatCard label="Officers On Duty" value="56" />
      </div>

      <div className="police-main-panels">
        <section className="police-panel map-panel">
          <h3>Real-time Crime Map</h3>
          <MapView markers={data.incidents} />
        </section>

        <section className="police-panel feed-panel">
          <h3>Recent Reports</h3>
          <ul className="police-feed">
            {alerts.map((a, i) => (
              <li key={i} className="police-feed-item">
                <div className="police-feed-title">{a.title}</div>
                <div className="police-feed-meta">{a.time} • {a.severity}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
