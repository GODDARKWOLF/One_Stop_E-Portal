import React from 'react'
import '../../components/govDashboard.css'

const sample = [
  { id: 1, title: 'Annual Tax Report 2025', date: '2025-10-01', type: 'PDF' },
  { id: 2, title: 'Quarterly Compliance Report Q3', date: '2025-09-30', type: 'CSV' },
  { id: 3, title: 'Fraud Risk Summary', date: '2025-10-10', type: 'PDF' }
]

export default function GovReports() {
  const download = (r, fmt) => {
    const blob = new Blob([`Sample report: ${r.title}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${r.title}.${fmt === 'PDF' ? 'pdf' : 'csv'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="gov-dashboard-content">
      <div className="gov-panel">
        <div className="gov-panel-header">
          <h2>Reports & Summaries</h2>
          <div className="gov-panel-controls">
            <input type="date" />
            <input type="date" />
            <button className="gov-export-btn">Export All</button>
          </div>
        </div>

        <div className="gov-reports-grid">
          {sample.map((r) => (
            <div
              key={r.id}
              className="gov-report-card slideUp"
              style={{ cursor: 'pointer' }}
            >
              <div className="gov-report-content">
                <h3>{r.title}</h3>
                <div className="gov-report-meta">
                  <span className="gov-report-date">{r.date}</span>
                  <span className="gov-report-status">{r.type}</span>
                </div>
              </div>
              <div className="gov-report-actions">
                <button
                  onClick={() => download(r, r.type)}
                  className="gov-action-btn"
                >
                  Download
                </button>
                <button className="gov-action-btn">Preview</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
