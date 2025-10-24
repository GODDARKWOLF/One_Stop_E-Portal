import React, { useEffect, useRef } from 'react'
import '../../components/govDashboard.css'

export default function GovRevenue() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const DPR = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * DPR
    canvas.height = h * DPR
    ctx.scale(DPR, DPR)

    const data = [320, 400, 360, 420, 480, 520, 610, 580, 640, 700, 760, 820]
    const padding = 30
    const max = Math.max(...data) * 1.1

    ctx.clearRect(0, 0, w, h)
    ctx.beginPath()
    data.forEach((v, i) => {
      const x = padding + (i / (data.length - 1)) * (w - padding * 2)
      const y = h - padding - (v / max) * (h - padding * 2)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = '#1E2A5E'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [])

  return (
    <div className="gov-dashboard-content">
      <div className="gov-stats-grid">
        <div className="gov-stat-card">
          <div className="gov-stat-value">K623.0M</div>
          <div className="gov-stat-label">Total Revenue</div>
        </div>
        <div className="gov-stat-card">
          <div className="gov-stat-value">K51.9M</div>
          <div className="gov-stat-label">This Month's Revenue</div>
        </div>
        <div className="gov-stat-card">
          <div className="gov-stat-value">1,245</div>
          <div className="gov-stat-label">Tax Returns Processed</div>
        </div>
        <div className="gov-stat-card">
          <div className="gov-stat-value">K12.4M</div>
          <div className="gov-stat-label">Outstanding Payments</div>
        </div>
      </div>

      <div className="gov-panel" style={{ marginTop: 20 }}>
        <div className="gov-panel-header">
          <h2>Monthly Revenue Trend</h2>
          <div className="gov-panel-controls">
            <select className="gov-period-select">
              <option>Last 12 months</option>
              <option>Last 24 months</option>
            </select>
          </div>
        </div>
        <div style={{ padding: 12 }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: 260 }} />
        </div>
      </div>
    </div>
  )
}
