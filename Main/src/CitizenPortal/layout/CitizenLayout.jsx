import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faFileAlt,
    faFileInvoiceDollar,
    faClockRotateLeft,
    faCalendarDay,
    faUsers,
    faCog,
    faUser,
    faBars,
    faFile,
    faChain,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import './CitizenLayout.css';

const CitizenLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const navigationItems = [
        {
            path: "/citizen",
            icon: faHome,
            label: "Dashboard"
        },
        {
            path: "/citizen/documents",
            icon: faFileAlt,
            label: "Documents"
        },
        {
            path: "/citizen/Tax",
            icon: faFileInvoiceDollar,
            label: "Tax Records"
        },
        {
            path: "/citizen/activities",
            icon: faClockRotateLeft,
            label: "Activities"
        },
        {
            path: "/citizen/life-events",
            icon: faCalendarDay,
            label: "Life Events"
        },
        {
            path: "/citizen/relatives",
            icon: faUsers,
            label: "Relatives"
        },
        {
            path: "/citizen/settings",
            icon: faCog,
            label: "Settings"
        },

        {
            path: "/citizen/reportsandclaims",
            icon: faFile,
            label: "Reports & Claims"
        },


        {
            path: "/citizen/citizenblockchain",
            icon: faChain,
            label: "Blockchain"
        }
    ];

    return (
        <div className="citizen-layout">
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <h1>Citizen Portal</h1>
                    </div>
                    <button
                        className="toggle-sidebar"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
                    </button>
                </div>

                <div className="user-brief">
                    <div className="user-avatar">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="user-info">
                        <h3>John Doe</h3>
                        <span>Citizen Portal</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navigationItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/citizen'}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <main className="main-content">
                <div className="mobile-header">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className="mobile-logo">
                        <h1>ZRA</h1>
                    </div>
                </div>

                <div className="content-wrapper">
                    <Outlet />
                </div>
            </main>

            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default CitizenLayout;