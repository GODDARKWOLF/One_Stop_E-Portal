import React from 'react'

const GovReportsPanel = () => {
    const reports = [
        {
            id: 1,
            title: 'Monthly Revenue Summary',
            date: '2025-10-01',
            type: 'Revenue',
            status: 'Generated'
        },
        {
            id: 2,
            title: 'Tax Compliance Analysis',
            date: '2025-10-05',
            type: 'Compliance',
            status: 'Pending'
        },
        {
            id: 3,
            title: 'Fraud Detection Report',
            date: '2025-10-10',
            type: 'Security',
            status: 'Review'
        },
        {
            id: 4,
            title: 'Registration Statistics',
            date: '2025-10-15',
            type: 'Citizens',
            status: 'Generated'
        }
    ]

    const getReportIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'revenue': return 'fa-solid fa-chart-line'
            case 'compliance': return 'fa-solid fa-check-circle'
            case 'security': return 'fa-solid fa-shield'
            case 'citizens': return 'fa-solid fa-users'
            default: return 'fa-solid fa-file'
        }
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'generated': return 'success'
            case 'pending': return 'warning'
            case 'review': return 'danger'
            default: return ''
        }
    }

    return (
        <div className="gov-panel">
            <div className="gov-panel-header">
                <h2>Reports & Analysis</h2>
                <div className="gov-panel-controls">
                    <select className="gov-type-select">
                        <option value="all">All Types</option>
                        <option value="revenue">Revenue</option>
                        <option value="compliance">Compliance</option>
                        <option value="security">Security</option>
                        <option value="citizens">Citizens</option>
                    </select>
                    <button className="gov-generate-btn">
                        <i className="fa-solid fa-plus"></i>
                        Generate New
                    </button>
                </div>
            </div>

            <div className="gov-reports-grid">
                {reports.map(report => (
                    <div key={report.id} className="gov-report-card">
                        <div className="gov-report-icon">
                            <i className={getReportIcon(report.type)}></i>
                        </div>
                        <div className="gov-report-content">
                            <h3>{report.title}</h3>
                            <div className="gov-report-meta">
                                <span className="gov-report-date">
                                    <i className="fa-regular fa-calendar"></i>
                                    {report.date}
                                </span>
                                <span className={`gov-report-status ${getStatusColor(report.status)}`}>
                                    {report.status}
                                </span>
                            </div>
                        </div>
                        <div className="gov-report-actions">
                            <button className="gov-action-btn" title="Download">
                                <i className="fa-solid fa-download"></i>
                            </button>
                            <button className="gov-action-btn" title="Share">
                                <i className="fa-solid fa-share"></i>
                            </button>
                            <button className="gov-action-btn" title="More">
                                <i className="fa-solid fa-ellipsis-v"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="gov-panel-footer">
                <button className="gov-view-all-btn">
                    View All Reports
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
                <div className="gov-quick-filters">
                    <button className="gov-filter-btn active">Recent</button>
                    <button className="gov-filter-btn">Downloaded</button>
                    <button className="gov-filter-btn">Shared</button>
                </div>
            </div>
        </div>
    )
}

export default GovReportsPanel