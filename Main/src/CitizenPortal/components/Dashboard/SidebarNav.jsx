import React from 'react'

const links = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'life', label: 'My Life Events', icon: '📅' },
    { key: 'relatives', label: 'My Relatives', icon: '👥' },
    { key: 'data', label: 'My Data', icon: '📁' },
    { key: 'balance', label: 'My Balance', icon: '💳' },
    { key: 'messages', label: 'Messages', icon: '✉️' },
]

export default function SidebarNav() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div>
                <div className="logo">CITIZEN PORTAL</div>
                <nav className="nav-list">
                    {links.map((l, i) => (
                        <div key={l.key} className={"nav-item " + (i === 0 ? 'active' : '')}>
                            <div className="icon">{l.icon}</div>
                            <div className="label">{l.label}</div>
                        </div>
                    ))}
                </nav>
            </div>
            <div className="help">Help & Support</div>
        </div>
    )
}

