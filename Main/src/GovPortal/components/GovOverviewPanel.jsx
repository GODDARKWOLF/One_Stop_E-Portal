import React from 'react'

const GovOverviewPanel = () => {
    const metrics = [
        { label: 'Active Tax Accounts', value: '892,450', change: '+5.2%' },
        { label: 'Monthly Collections', value: 'K 45.8M', change: '+12.3%' },
        { label: 'Compliance Rate', value: '78.4%', change: '+2.1%' },
        { label: 'New Registrations', value: '1,245', change: '+8.7%' }
    ]

    return (
        <div className="gov-panel">
            <div className="gov-panel-header">
                <h2>Overview</h2>
                <select className="gov-period-select">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Last Year</option>
                </select>
            </div>

            <div className="gov-metrics-grid">
                {metrics.map((metric, index) => (
                    <div key={index} className="gov-metric-card">
                        <div className="gov-metric-label">{metric.label}</div>
                        <div className="gov-metric-value">{metric.value}</div>
                        <div className={`gov-metric-change ${metric.change.startsWith('+') ? 'positive' : 'negative'
                            }`}>
                            {metric.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="gov-quick-actions">
                <h3>Quick Actions</h3>
                <div className="gov-actions-grid">
                    <button className="gov-action-btn">
                        <i className="fa-solid fa-download"></i>
                        Export Report
                    </button>
                    <button className="gov-action-btn">
                        <i className="fa-solid fa-user-plus"></i>
                        Add Citizen
                    </button>
                    <button className="gov-action-btn">
                        <i className="fa-solid fa-chart-bar"></i>
                        Analytics
                    </button>
                    <button className="gov-action-btn">
                        <i className="fa-solid fa-envelope"></i>
                        Send Notice
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GovOverviewPanel