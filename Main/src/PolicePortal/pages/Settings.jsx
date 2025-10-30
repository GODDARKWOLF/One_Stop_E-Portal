import React, { useState } from 'react'
import './policeDashboard.css'

export default function Settings() {
  const [notify, setNotify] = useState(true)
  return (
    <div className="police-panel">
      <div className="gov-panel-header"><h2>Police Settings</h2></div>
      <div style={{display:'grid', gap:12}}>
        <label><input type="checkbox" checked={notify} onChange={e=>setNotify(e.target.checked)} /> Enable real-time alerts</label>
        <label>Department name: <input defaultValue="Central Police Station" /></label>
      </div>
    </div>
  )
}
