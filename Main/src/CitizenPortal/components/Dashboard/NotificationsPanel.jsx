import React from 'react'

const notifications = [
    { id: 1, type: 'Life event', title: 'Passport Renewal', desc: 'Your passport renewal is in process', date: '2h ago' },
    { id: 2, type: 'Emergency', title: 'Weather Alert', desc: 'Storm warning in your area', date: '5h ago' },
    { id: 3, type: 'License', title: 'Driver License', desc: 'License expires in 30 days', date: '1d ago' },
]

export default function NotificationsPanel() {
    return (
        <div className="card fadeIn">
            <h3>Notifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {notifications.map(n => (
                    <div key={n.id} className="notification-card">
                        <div style={{ width: 24, height: 24, background: '#EEF3FF', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {n.type === 'Life event' ? '📅' : n.type === 'Emergency' ? '⚠️' : '📄'}
                        </div>
                        <div>
                            <strong>{n.title}</strong>
                            <div style={{ fontSize: 12, color: '#666' }}>{n.desc}</div>
                            <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{n.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
