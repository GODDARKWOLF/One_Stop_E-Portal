import React, { useState } from 'react'

const GovTopNavBar = ({ onMenuClick }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <div className="gov-top-nav">
            <div className="left-section">
                <button className="menu-toggle" onClick={onMenuClick}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="gov-brand">
                    <img src="/zra-logo.png" alt="ZRA" className="gov-logo-small" />
                    <span>Zambia Revenue Authority</span>
                </div>
            </div>

            <div className="gov-search">
                <input
                    type="text"
                    placeholder="Search citizens, tax records, applications..."
                />
            </div>

            <div className="gov-profile">
                <div className="notifications">
                    <i className="fa-solid fa-bell"></i>
                    <span className="notification-badge">3</span>
                </div>

                <div className="profile-section" onClick={() => setShowDropdown(!showDropdown)}>
                    <div className="gov-avatar">A</div>
                    <span className="admin-name">Admin</span>
                    <i className="fa-solid fa-chevron-down"></i>

                    {showDropdown && (
                        <div className="profile-dropdown">
                            <a href="/gov/profile">
                                <i className="fa-solid fa-user"></i>
                                Profile
                            </a>
                            <a href="/gov/settings">
                                <i className="fa-solid fa-gear"></i>
                                Settings
                            </a>
                            <hr />
                            <a href="/logout" className="logout">
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GovTopNavBar