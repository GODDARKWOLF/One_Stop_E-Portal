import React from 'react'

const events = [
    { id: 1, title: 'Passport Renewal', date: '2025-11-01', status: 'In Progress' },
    { id: 2, title: 'Marriage Registration', date: '2025-12-15', status: 'Active' },
]

export default function OngoingLifeEvents() {
    return (
        <div className="card fadeIn">
            <h3>Ongoing Life Events</h3>
            <div className="events-grid">
                {events.map(e => (
                    <div key={e.id} className="event-card slideUp">
                        <div style={{ fontSize: 24 }}>{e.title.slice(0, 1)}</div>
                        <div>
                            <strong>{e.title}</strong>
                            <div style={{ fontSize: 12, color: '#666' }}>{e.date}</div>
                        </div>
                        <div style={{ marginLeft: 'auto' }} className="badge">{e.status}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

