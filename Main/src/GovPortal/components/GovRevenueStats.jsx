import React, { useEffect, useRef } from 'react'

const GovRevenueStats = () => {
    const chartRef = useRef(null)

    const mockData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [32.5, 38.2, 44.1, 42.8, 48.5, 50.2, 55.8, 54.2, 58.9, 62.4, 65.1, 70.3]
    }

    useEffect(() => {
        const canvas = chartRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const { width, height } = canvas.getBoundingClientRect()

        // Set canvas size with proper scaling
        canvas.width = width * window.devicePixelRatio
        canvas.height = height * window.devicePixelRatio
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

        // Chart dimensions
        const padding = 40
        const chartWidth = width - (padding * 2)
        const chartHeight = height - (padding * 2)

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Calculate scales
        const maxValue = Math.max(...mockData.values)
        const yScale = chartHeight / maxValue

        // Draw axes
        ctx.beginPath()
        ctx.strokeStyle = '#ddd'
        ctx.moveTo(padding, padding)
        ctx.lineTo(padding, height - padding)
        ctx.lineTo(width - padding, height - padding)
        ctx.stroke()

        // Draw grid lines
        ctx.strokeStyle = '#f0f0f0'
        ctx.setLineDash([2, 2])
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight * i / 5)
            ctx.beginPath()
            ctx.moveTo(padding, y)
            ctx.lineTo(width - padding, y)
            ctx.stroke()
        }
        ctx.setLineDash([])

        // Plot data points
        ctx.beginPath()
        ctx.strokeStyle = '#1E2A5E'
        ctx.lineWidth = 2
        mockData.values.forEach((value, index) => {
            const x = padding + (chartWidth * index / (mockData.values.length - 1))
            const y = height - padding - (value * yScale)

            if (index === 0) {
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }
        })
        ctx.stroke()

        // Add gradient fill
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
        gradient.addColorStop(0, 'rgba(30, 42, 94, 0.1)')
        gradient.addColorStop(1, 'rgba(30, 42, 94, 0)')

        ctx.fillStyle = gradient
        ctx.lineTo(width - padding, height - padding)
        ctx.lineTo(padding, height - padding)
        ctx.closePath()
        ctx.fill()

        // Add data points
        ctx.fillStyle = '#1E2A5E'
        mockData.values.forEach((value, index) => {
            const x = padding + (chartWidth * index / (mockData.values.length - 1))
            const y = height - padding - (value * yScale)

            ctx.beginPath()
            ctx.arc(x, y, 4, 0, Math.PI * 2)
            ctx.fill()
        })

        // Add labels
        ctx.fillStyle = '#666'
        ctx.font = '12px Inter'
        ctx.textAlign = 'center'
        mockData.labels.forEach((label, index) => {
            const x = padding + (chartWidth * index / (mockData.labels.length - 1))
            ctx.fillText(label, x, height - padding + 20)
        })

        // Add value labels
        ctx.textAlign = 'right'
        for (let i = 0; i <= 5; i++) {
            const value = Math.round(maxValue * i / 5)
            const y = height - padding - (chartHeight * i / 5)
            ctx.fillText(`K${value}M`, padding - 10, y + 4)
        }
    }, [])

    return (
        <div className="gov-panel">
            <div className="gov-panel-header">
                <h2>Revenue Statistics</h2>
                <div className="gov-panel-controls">
                    <select className="gov-period-select">
                        <option>This Year</option>
                        <option>Last Year</option>
                        <option>Last 2 Years</option>
                    </select>
                    <button className="gov-export-btn">
                        <i className="fa-solid fa-download"></i>
                        Export
                    </button>
                </div>
            </div>

            <div className="gov-chart-container">
                <canvas
                    ref={chartRef}
                    style={{ width: '100%', height: '300px' }}
                ></canvas>
            </div>

            <div className="gov-chart-summary">
                <div className="gov-summary-item">
                    <span className="label">Total Revenue</span>
                    <span className="value">K623.0M</span>
                    <span className="change positive">+15.2% YoY</span>
                </div>
                <div className="gov-summary-item">
                    <span className="label">Monthly Average</span>
                    <span className="value">K51.9M</span>
                    <span className="change positive">+8.7%</span>
                </div>
            </div>
        </div>
    )
}

export default GovRevenueStats