import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faSpinner,
    faTriangleExclamation,
    faFileUpload,
    faIdCard,
    faUserEdit,
    faFileInvoiceDollar,
    faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import './Activities.css';

const Activities = () => {
    // Mock data - replace with real data from backend
    const activities = [
        {
            id: 1,
            type: "document",
            title: "Marriage Certificate Upload",
            description: "Uploaded marriage certificate for verification",
            status: "pending",
            date: "2025-10-24",
            time: "14:30",
            icon: faFileUpload,
            category: "Documents"
        },
        {
            id: 2,
            type: "verification",
            title: "Identity Verification",
            description: "National ID card verification completed",
            status: "completed",
            date: "2025-10-23",
            time: "11:45",
            icon: faIdCard,
            category: "Identity"
        },
        {
            id: 3,
            type: "profile",
            title: "Profile Update",
            description: "Updated contact information and address",
            status: "completed",
            date: "2025-10-22",
            time: "09:15",
            icon: faUserEdit,
            category: "Profile"
        },
        {
            id: 4,
            type: "tax",
            title: "Tax Return Submission",
            description: "Submitted Q3 2025 tax return",
            status: "error",
            date: "2025-10-21",
            time: "16:20",
            icon: faFileInvoiceDollar,
            category: "Tax"
        },
        {
            id: 5,
            type: "appointment",
            title: "ZRA Office Appointment",
            description: "Scheduled appointment for tax consultation",
            status: "completed",
            date: "2025-10-20",
            time: "10:00",
            icon: faCalendarCheck,
            category: "Appointments"
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FontAwesomeIcon icon={faCircleCheck} className="status-icon success" />;
            case 'pending':
                return <FontAwesomeIcon icon={faSpinner} className="status-icon warning spin" />;
            case 'error':
                return <FontAwesomeIcon icon={faTriangleExclamation} className="status-icon danger" />;
            default:
                return null;
        }
    };

    return (
        <div className="activities-container">
            <div className="activities-header">
                <h1>Activity Timeline</h1>
                <p className="text-secondary">Track your recent interactions and updates</p>
            </div>

            <div className="activities-content">
                <div className="timeline-filters card">
                    <h3>Filter Activities</h3>
                    <div className="filter-options">
                        <label className="filter-group">
                            <input type="checkbox" defaultChecked />
                            <span>Documents</span>
                        </label>
                        <label className="filter-group">
                            <input type="checkbox" defaultChecked />
                            <span>Identity</span>
                        </label>
                        <label className="filter-group">
                            <input type="checkbox" defaultChecked />
                            <span>Profile</span>
                        </label>
                        <label className="filter-group">
                            <input type="checkbox" defaultChecked />
                            <span>Tax</span>
                        </label>
                        <label className="filter-group">
                            <input type="checkbox" defaultChecked />
                            <span>Appointments</span>
                        </label>
                    </div>
                </div>

                <div className="timeline-wrapper card">
                    <div className="timeline">
                        {activities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className={`timeline-item ${activity.status}`}
                                style={{ "--delay": `${index * 0.1}s` }}
                            >
                                <div className="timeline-icon">
                                    <FontAwesomeIcon icon={activity.icon} />
                                </div>

                                <div className="timeline-content slide-in-left">
                                    <div className="timeline-header">
                                        <h3>{activity.title}</h3>
                                        {getStatusIcon(activity.status)}
                                    </div>

                                    <p className="timeline-description">
                                        {activity.description}
                                    </p>

                                    <div className="timeline-meta">
                                        <span className="timeline-category">
                                            {activity.category}
                                        </span>
                                        <span className="timeline-date">
                                            {activity.date} at {activity.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activities;