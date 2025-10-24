import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGraduationCap,
    faRing,
    faBriefcase,
    faHome,
    faPassport,
    faPlus,
    faPencil,
    faTrash,
    faCheckCircle,
    faSpinner,
    faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import './LifeEvents.css';

const LifeEvents = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Mock data - replace with real data from backend
    const lifeEvents = [
        {
            id: 1,
            type: "education",
            title: "University Graduation",
            description: "Graduated with Bachelor's in Computer Science",
            date: "2024-12-15",
            status: "verified",
            documents: ["Degree Certificate", "Academic Transcript"],
            icon: faGraduationCap
        },
        {
            id: 2,
            type: "marriage",
            title: "Marriage Registration",
            description: "Civil marriage ceremony registration",
            date: "2025-06-20",
            status: "pending",
            documents: ["Marriage Certificate"],
            icon: faRing
        },
        {
            id: 3,
            type: "employment",
            title: "New Employment",
            description: "Started position at Tech Solutions Ltd",
            date: "2025-01-10",
            status: "verified",
            documents: ["Employment Contract", "Tax Registration"],
            icon: faBriefcase
        },
        {
            id: 4,
            type: "property",
            title: "Property Purchase",
            description: "Purchased residential property in Lusaka",
            date: "2025-03-15",
            status: "pending",
            documents: ["Title Deed", "Property Tax Assessment"],
            icon: faHome
        },
        {
            id: 5,
            type: "travel",
            title: "Passport Renewal",
            description: "10-year passport renewal",
            date: "2025-08-01",
            status: "rejected",
            documents: ["Application Form", "Old Passport"],
            icon: faPassport
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified':
                return <FontAwesomeIcon icon={faCheckCircle} className="status-icon success" />;
            case 'pending':
                return <FontAwesomeIcon icon={faSpinner} className="status-icon warning spin" />;
            case 'rejected':
                return <FontAwesomeIcon icon={faTriangleExclamation} className="status-icon danger" />;
            default:
                return null;
        }
    };

    const filteredEvents = activeFilter === 'all'
        ? lifeEvents
        : lifeEvents.filter(event => event.type === activeFilter);

    return (
        <div className="life-events-container">
            <div className="life-events-header">
                <div>
                    <h1>Life Events</h1>
                    <p className="text-secondary">Track and manage your important life events and related documents</p>
                </div>
                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} />
                    Add Life Event
                </button>
            </div>

            <div className="events-filter-bar card">
                <button
                    className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('all')}
                >
                    All Events
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'education' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('education')}
                >
                    Education
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'marriage' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('marriage')}
                >
                    Marriage
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'employment' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('employment')}
                >
                    Employment
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'property' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('property')}
                >
                    Property
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'travel' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('travel')}
                >
                    Travel
                </button>
            </div>

            <div className="events-grid">
                {filteredEvents.map((event, index) => (
                    <div
                        key={event.id}
                        className={`event-card card slide-in-up ${event.status}`}
                        style={{ "--delay": `${index * 0.1}s` }}
                    >
                        <div className="event-header">
                            <div className="event-icon">
                                <FontAwesomeIcon icon={event.icon} />
                            </div>
                            {getStatusIcon(event.status)}
                        </div>

                        <div className="event-content">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <span className="event-date">{event.date}</span>
                        </div>

                        <div className="event-documents">
                            <h4>Related Documents</h4>
                            <ul>
                                {event.documents.map((doc, i) => (
                                    <li key={i}>{doc}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="event-actions">
                            <button className="btn btn-icon" title="Edit">
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                            <button className="btn btn-icon" title="Delete">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LifeEvents;