import React, { useState } from 'react'

const GovRegisteredCitizens = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('date')
    const [currentPage, setCurrentPage] = useState(1)

    const mockCitizens = [
        { id: 1, name: 'John Mulenga', nrc: '123456/78/1', status: 'Active', date: '2025-10-15', compliance: '98%' },
        { id: 2, name: 'Sarah Banda', nrc: '123457/78/1', status: 'Pending', date: '2025-10-14', compliance: '75%' },
        { id: 3, name: 'Michael Phiri', nrc: '123458/78/1', status: 'Active', date: '2025-10-13', compliance: '100%' },
        { id: 4, name: 'Grace Tembo', nrc: '123459/78/1', status: 'Review', date: '2025-10-12', compliance: '85%' },
        { id: 5, name: 'David Zulu', nrc: '123460/78/1', status: 'Active', date: '2025-10-11', compliance: '92%' }
    ]

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'success'
            case 'pending': return 'warning'
            case 'review': return 'danger'
            default: return ''
        }
    }

    return (
        <div className="gov-panel">
            <div className="gov-panel-header">
                <h2>Registered Citizens</h2>
                <div className="gov-panel-controls">
                    <div className="gov-search-box">
                        <i className="fa-solid fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search by name or NRC..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="gov-sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="date">Latest First</option>
                        <option value="name">Name A-Z</option>
                        <option value="compliance">Compliance</option>
                    </select>
                    <button className="gov-add-btn">
                        <i className="fa-solid fa-plus"></i>
                        Add New
                    </button>
                </div>
            </div>

            <div className="gov-table-container">
                <table className="gov-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>NRC</th>
                            <th>Status</th>
                            <th>Registration Date</th>
                            <th>Compliance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockCitizens.map(citizen => (
                            <tr key={citizen.id}>
                                <td>{citizen.name}</td>
                                <td>{citizen.nrc}</td>
                                <td>
                                    <span className={`gov-status-badge ${getStatusColor(citizen.status)}`}>
                                        {citizen.status}
                                    </span>
                                </td>
                                <td>{citizen.date}</td>
                                <td>
                                    <div className="gov-compliance-bar">
                                        <div
                                            className="gov-compliance-fill"
                                            style={{ width: citizen.compliance }}
                                        ></div>
                                        <span>{citizen.compliance}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="gov-actions">
                                        <button className="gov-action-btn" title="View Details">
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                        <button className="gov-action-btn" title="Edit">
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button className="gov-action-btn danger" title="Flag">
                                            <i className="fa-solid fa-flag"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="gov-table-footer">
                <div className="gov-table-info">
                    Showing 1-5 of 1,245,600 citizens
                </div>
                <div className="gov-pagination">
                    <button
                        className="gov-page-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <span className="gov-page-number">Page {currentPage}</span>
                    <button
                        className="gov-page-btn"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GovRegisteredCitizens