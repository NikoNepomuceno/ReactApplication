import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Close sidebar when a link is clicked (for mobile)
    const handleLinkClick = () => {
        if (window.innerWidth <= 768) {
            setIsOpen(false);
        }
    };

    return (
        <>
            <button className="mobile-toggle-btn" onClick={toggleSidebar}>
                {isOpen ? '[X]' : '[MENU]'}
            </button>

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        NEXUS<span>_OS</span>
                    </div>
                </div>

                <nav className="sidebar-menu">
                    <NavLink
                        to="/home"
                        className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
                        onClick={handleLinkClick}
                    >
                        <span className="menu-icon">[H]</span>
                        DASHBOARD
                    </NavLink>

                    <NavLink
                        to="/operations"
                        className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
                        onClick={handleLinkClick}
                    >
                        <span className="menu-icon">[O]</span>
                        OPERATIONS
                    </NavLink>

                    <NavLink
                        to="/intel"
                        className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
                        onClick={handleLinkClick}
                    >
                        <span className="menu-icon">[I]</span>
                        INTEL_FEED
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
                        onClick={handleLinkClick}
                    >
                        <span className="menu-icon">[S]</span>
                        SYSTEM_CONFIG
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="system-status">
                        <div><span className="status-indicator"></span>ONLINE</div>
                        <div>LATENCY: 12ms</div>
                        <div>ENCRYPTION: ON</div>
                    </div>
                </div>
            </aside>

            {/* Simple Overlay for mobile when sidebar is open */}
            {isOpen && <div
                style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100vw', height: '100vh',
                    zIndex: 90,
                    display: window.innerWidth > 768 ? 'none' : 'block'
                }}
                onClick={() => setIsOpen(false)}
            ></div>}
        </>
    );
};

export default Sidebar;
