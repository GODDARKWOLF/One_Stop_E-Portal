import React, { useState, useEffect } from 'react'
import GovDashboardLayout from '../../components/GovDashboardLayout'
import GovOverviewPanel from '../../components/GovOverviewPanel'
import GovRevenueStats from '../../components/GovRevenueStats'
import GovRegisteredCitizens from '../../components/GovRegisteredCitizens'
import GovReportsPanel from '../../components/GovReportsPanel'
import '../../components/govDashboard.css'

const GovDashboardPage = () => {
    const [stats, setStats] = useState({
        citizens: 0,
        revenue: 0,
        applications: 0,
        alerts: 0,
    })

    useEffect(() => {
        const targetStats = {
            citizens: 1245600,
            revenue: 456732540,
            applications: 820,
            alerts: 34,
        }

        const duration = 2000
        const steps = 60
        const interval = duration / steps
        let currentStep = 0

        const timer = setInterval(() => {
            if (currentStep >= steps) {
                clearInterval(timer)
                setStats(targetStats)
                return
            }

            currentStep++
            const progress = currentStep / steps

            setStats({
                citizens: Math.round(targetStats.citizens * progress),
                revenue: Math.round(targetStats.revenue * progress),
                applications: Math.round(targetStats.applications * progress),
                alerts: Math.round(targetStats.alerts * progress),
            })
        }, interval)

        return () => clearInterval(timer)
    }, [])

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toLocaleString()
    }

    const formatCurrency = (num) => 'K' + formatNumber(num)

    return (
        <div className="gov-dashboard">
            {/* Stats Grid */}
            <div className="gov-stats-grid">
                <div className="gov-stat-card">
                    <div className="gov-stat-value success animate-count">
                        {formatNumber(stats.citizens)}
                    </div>
                    <div className="gov-stat-label">Total Registered Citizens</div>
                </div>

                <div className="gov-stat-card">
                    <div className="gov-stat-value animate-count">
                        {formatCurrency(stats.revenue)}
                    </div>
                    <div className="gov-stat-label">Revenue Collected</div>
                </div>

                <div className="gov-stat-card">
                    <div className="gov-stat-value warning animate-count">
                        {stats.applications}
                    </div>
                    <div className="gov-stat-label">Pending Applications</div>
                </div>

                <div className="gov-stat-card">
                    <div className="gov-stat-value danger animate-count">
                        {stats.alerts}
                    </div>
                    <div className="gov-stat-label">Fraud Alerts</div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="gov-content-grid">
                <GovOverviewPanel />
                <GovRevenueStats />
                <GovRegisteredCitizens />
                <GovReportsPanel />
            </div>
        </div>
    )
}

export default GovDashboardPage
