import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faFileInvoiceDollar,
    faChartLine,
    faCalendarAlt,
    faFilter,
    faArrowUp,
    faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './TaxRecords.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TaxRecords = () => {
    // Mock data - replace with real data from backend
    const taxRecords = [
        {
            id: 1,
            year: "2025",
            quarter: "Q3",
            type: "Income Tax",
            amount: 12500.00,
            status: "Paid",
            dueDate: "2025-09-30",
            paidDate: "2025-09-25"
        },
        {
            id: 2,
            year: "2025",
            quarter: "Q2",
            type: "Value Added Tax",
            amount: 8750.00,
            status: "Paid",
            dueDate: "2025-06-30",
            paidDate: "2025-06-28"
        },
        {
            id: 3,
            year: "2025",
            quarter: "Q1",
            type: "Income Tax",
            amount: 11200.00,
            status: "Paid",
            dueDate: "2025-03-31",
            paidDate: "2025-03-30"
        },
        {
            id: 4,
            year: "2024",
            quarter: "Q4",
            type: "Property Tax",
            amount: 5000.00,
            status: "Paid",
            dueDate: "2024-12-31",
            paidDate: "2024-12-28"
        }
    ];

    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Tax Payments',
                data: [4200, 5100, 5900, 4800, 6500, 7200, 6800, 7500, 8900, 8200, 9100, 9800],
                borderColor: 'rgb(0, 43, 255)',
                backgroundColor: 'rgba(0, 43, 255, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const taxTypeData = {
        labels: ['Income Tax', 'Value Added Tax', 'Property Tax', 'Capital Gains', 'Other'],
        datasets: [
            {
                label: 'Distribution by Tax Type',
                data: [45, 25, 15, 10, 5],
                backgroundColor: [
                    'rgba(0, 43, 255, 0.8)',
                    'rgba(0, 83, 255, 0.8)',
                    'rgba(51, 83, 255, 0.8)',
                    'rgba(102, 123, 255, 0.8)',
                    'rgba(153, 163, 255, 0.8)'
                ]
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="tax-records-container">
            <div className="tax-records-header">
                <div>
                    <h1>Tax Records</h1>
                    <p className="text-secondary">View and manage your tax history and payments</p>
                </div>
                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faDownload} />
                    Export Records
                </button>
            </div>

            <div className="tax-overview-grid">
                <div className="tax-chart-card card">
                    <div className="card-header">
                        <h3>
                            <FontAwesomeIcon icon={faChartLine} />
                            Payment Trends
                        </h3>
                        <select className="year-select">
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                    <div className="chart-container">
                        <Line data={monthlyData} options={chartOptions} />
                    </div>
                </div>

                <div className="tax-distribution-card card">
                    <div className="card-header">
                        <h3>
                            <FontAwesomeIcon icon={faFileInvoiceDollar} />
                            Tax Distribution
                        </h3>
                    </div>
                    <div className="chart-container">
                        <Bar data={taxTypeData} options={chartOptions} />
                    </div>
                </div>
            </div>

            <div className="tax-records-content card">
                <div className="table-header">
                    <div className="table-title">
                        <h3>Payment History</h3>
                    </div>
                    <div className="table-actions">
                        <div className="date-filter">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <select>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                            </select>
                        </div>
                        <div className="type-filter">
                            <FontAwesomeIcon icon={faFilter} />
                            <select>
                                <option value="all">All Types</option>
                                <option value="income">Income Tax</option>
                                <option value="vat">Value Added Tax</option>
                                <option value="property">Property Tax</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="table-container">
                    <table className="tax-records-table">
                        <thead>
                            <tr>
                                <th>Year/Quarter</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Paid Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxRecords.map(record => (
                                <tr key={record.id} className="slide-in-up">
                                    <td>
                                        {record.year} {record.quarter}
                                    </td>
                                    <td>{record.type}</td>
                                    <td className="amount">
                                        K {record.amount.toLocaleString()}
                                        {record.amount > 10000 ? (
                                            <FontAwesomeIcon icon={faArrowUp} className="trend-icon up" />
                                        ) : (
                                            <FontAwesomeIcon icon={faArrowDown} className="trend-icon down" />
                                        )}
                                    </td>
                                    <td>{record.dueDate}</td>
                                    <td>{record.paidDate}</td>
                                    <td>
                                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-icon" title="Download Receipt">
                                            <FontAwesomeIcon icon={faDownload} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaxRecords;