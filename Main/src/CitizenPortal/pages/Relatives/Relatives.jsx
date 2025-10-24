import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faUserCheck,
    faSpinner,
    faTriangleExclamation,
    faPencil,
    faTrash,
    faPhone,
    faEnvelope,
    faIdCard
} from '@fortawesome/free-solid-svg-icons';
import './Relatives.css';

const Relatives = () => {
    // Mock data - replace with real data from backend
    const relatives = [
        {
            id: 1,
            name: "Sarah Mbewe",
            relationship: "Spouse",
            nrc: "999999/99/1",
            phone: "+260 97X XXX XXX",
            email: "sarah.mbewe@example.com",
            status: "verified",
            dateAdded: "2025-06-20",
            avatar: null
        },
        {
            id: 2,
            name: "John Mbewe Sr.",
            relationship: "Parent",
            nrc: "999999/99/2",
            phone: "+260 96X XXX XXX",
            email: "john.sr@example.com",
            status: "verified",
            dateAdded: "2025-05-15",
            avatar: null
        },
        {
            id: 3,
            name: "Mary Mbewe",
            relationship: "Child",
            nrc: "999999/99/3",
            phone: "+260 95X XXX XXX",
            email: "mary.mbewe@example.com",
            status: "pending",
            dateAdded: "2025-10-01",
            avatar: null
        },
        {
            id: 4,
            name: "James Mbewe",
            relationship: "Sibling",
            nrc: "999999/99/4",
            phone: "+260 94X XXX XXX",
            email: "james.mbewe@example.com",
            status: "rejected",
            dateAdded: "2025-09-15",
            avatar: null
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified':
                return <FontAwesomeIcon icon={faUserCheck} className="status-icon success" />;
            case 'pending':
                return <FontAwesomeIcon icon={faSpinner} className="status-icon warning spin" />;
            case 'rejected':
                return <FontAwesomeIcon icon={faTriangleExclamation} className="status-icon danger" />;
            default:
                return null;
        }
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="relatives-container">
            <div className="relatives-header">
                <div>
                    <h1>Family & Relatives</h1>
                    <p className="text-secondary">Manage your registered family members and dependents</p>
                </div>
                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faUserPlus} />
                    Add Relative
                </button>
            </div>

            <div className="relatives-stats card">
                <div className="stat-item">
                    <h3>Total Relatives</h3>
                    <span className="stat-value">4</span>
                </div>
                <div className="stat-item">
                    <h3>Verified</h3>
                    <span className="stat-value success">2</span>
                </div>
                <div className="stat-item">
                    <h3>Pending</h3>
                    <span className="stat-value warning">1</span>
                </div>
                <div className="stat-item">
                    <h3>Rejected</h3>
                    <span className="stat-value danger">1</span>
                </div>
            </div>

            <div className="relatives-grid">
                {relatives.map((relative, index) => (
                    <div
                        key={relative.id}
                        className={`relative-card card slide-in-up ${relative.status}`}
                        style={{ "--delay": `${index * 0.1}s` }}
                    >
                        <div className="relative-header">
                            <div className="relative-avatar">
                                {relative.avatar ? (
                                    <img src={relative.avatar} alt={relative.name} />
                                ) : (
                                    <div className="avatar-fallback">
                                        {getInitials(relative.name)}
                                    </div>
                                )}
                                {getStatusIcon(relative.status)}
                            </div>
                            <div className="relative-actions">
                                <button className="btn btn-icon" title="Edit">
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                                <button className="btn btn-icon" title="Remove">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>

                        <div className="relative-info">
                            <h3>{relative.name}</h3>
                            <span className="relationship-tag">{relative.relationship}</span>
                        </div>

                        <div className="relative-details">
                            <div className="detail-item">
                                <FontAwesomeIcon icon={faIdCard} className="detail-icon" />
                                <div className="detail-content">
                                    <label>NRC Number</label>
                                    <span>{relative.nrc}</span>
                                </div>
                            </div>

                            <div className="detail-item">
                                <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                                <div className="detail-content">
                                    <label>Phone</label>
                                    <span>{relative.phone}</span>
                                </div>
                            </div>

                            <div className="detail-item">
                                <FontAwesomeIcon icon={faEnvelope} className="detail-icon" />
                                <div className="detail-content">
                                    <label>Email</label>
                                    <span>{relative.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative-footer">
                            <span className="date-added">Added: {relative.dateAdded}</span>
                            <span className={`status-badge ${relative.status}`}>
                                {relative.status.charAt(0).toUpperCase() + relative.status.slice(1)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Relatives;