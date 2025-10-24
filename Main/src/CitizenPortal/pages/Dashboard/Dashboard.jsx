import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoiceDollar,
    faIdCard,
    faUsers,
    faClockRotateLeft,
    faCheckCircle,
    faClock,
    faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import './Dashboard.css';

const Dashboard = () => {
    // Mock data - replace with real data from your backend
    const quickStats = [
        {
            icon: faFileInvoiceDollar,
            label: "Tax Returns",
            value: "7",
            status: "All up to date",
            color: "success"
        },
        {
            icon: faIdCard,
            label: "Documents",
            value: "12",
            status: "2 pending verification",
            color: "warning"
        },
        {
            icon: faUsers,
            label: "Registered Relatives",
            value: "4",
            status: "All verified",
            color: "success"
        }
    ];

    const recentActivities = [
        {
            id: 1,
            type: "submission",
            title: "Tax Return Submitted",
            description: "2025 Annual Tax Return",
            status: "completed",
            date: "Today",
            time: "14:30"
        },
        {
            id: 2,
            type: "verification",
            title: "Document Verification",
            description: "Marriage Certificate",
            status: "pending",
            date: "Yesterday",
            time: "09:15"
        },
        {
            id: 3,
            type: "update",
            title: "Profile Update",
            description: "Contact Information Updated",
            status: "completed",
            date: "Oct 22",
            time: "11:45"
        },
        {
            id: 4,
            type: "warning",
            title: "Deadline Reminder",
            description: "Submit Q4 Tax Declaration",
            status: "urgent",
            date: "Oct 21",
            time: "16:20"
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FontAwesomeIcon icon={faCheckCircle} className="status-icon success" />;
            case 'pending':
                return <FontAwesomeIcon icon={faClock} className="status-icon warning" />;
            case 'urgent':
                return <FontAwesomeIcon icon={faTriangleExclamation} className="status-icon danger" />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome Back, John</h1>
                <p className="text-secondary">Here's an overview of your tax profile and recent activities</p>
            </div>

            <div className="dashboard-grid">
                <div className="profile-section">
                    <ProfileCard />
                </div>

                <div className="stats-section">
                    <h2 className="section-title">Quick Stats</h2>
                    <div className="stats-grid">
                        {quickStats.map((stat, index) => (
                            <div key={index} className="stat-card card slide-in-up" style={{ "--delay": `${index * 0.1}s` }}>
                                <FontAwesomeIcon icon={stat.icon} className={`stat-icon ${stat.color}`} />
                                <div className="stat-content">
                                    <div className="stat-header">
                                        <h3>{stat.label}</h3>
                                        <span className="stat-value">{stat.value}</span>
                                    </div>
                                    <p className={`stat-status ${stat.color}`}>{stat.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="activities-section">
                    <h2 className="section-title">Recent Activities</h2>
                    <div className="activities-list card">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="activity-item slide-in-left">
                                {getStatusIcon(activity.status)}
                                <div className="activity-content">
                                    <div className="activity-header">
                                        <h4>{activity.title}</h4>
                                        <span className="activity-time">{activity.time}</span>
                                    </div>
                                    <p className="activity-description">{activity.description}</p>
                                    <span className="activity-date">{activity.date}</span>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-secondary view-all-btn">
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            View All Activities
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;