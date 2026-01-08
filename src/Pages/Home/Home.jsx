import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Home.css';

const Home = () => {
    const { user, logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutConfirm = () => {
        logout();
        setShowLogoutModal(false);
    };

    return (
        <div className="home-layout">
            <Sidebar />

            <div className="home-container">
                <header className="dashboard-header">
                    <div className="header-title">
                        <div className="header-meta">:: SYSTEM DASHBOARD_</div>
                        <h1>OPERATOR HUB</h1>
                    </div>

                    <div className="user-badge">
                        <div className="badge-status"></div>
                        <span className="badge-name">{user.name || 'UNKNOWNOP'}</span>
                    </div>
                </header>

                <main className="dashboard-grid">
                    {/* System Metrics Card */}
                    <div className="cyber-card">
                        <div className="card-header">
                            <h3>METRICS</h3>
                            <span className="card-icon">[01]</span>
                        </div>
                        <div className="card-content">
                            <p>CPU LOAD: 12%</p>
                            <p>MEMORY: 512MB / 4096MB</p>
                            <p>NETWORK: ONLINE</p>
                            <p>LATENCY: 24ms</p>
                        </div>
                    </div>

                    {/* Notifications Card */}
                    <div className="cyber-card">
                        <div className="card-header">
                            <h3>LOGS</h3>
                            <span className="card-icon">[02]</span>
                        </div>
                        <div className="card-content">
                            <p>&gt; System initialized.</p>
                            <p>&gt; User {user.name} authenticated.</p>
                            <p>&gt; Connection metrics stable.</p>
                        </div>
                    </div>

                    {/* Settings / Actions */}
                    <div className="cyber-card">
                        <div className="card-header">
                            <h3>CONTROLS</h3>
                            <span className="card-icon">[03]</span>
                        </div>
                        <div className="card-content">
                            <p>Manage session parameters and protocols.</p>

                            <button
                                className="action-btn danger"
                                onClick={() => setShowLogoutModal(true)}
                            >
                                TERMINATE SESSION
                            </button>
                        </div>
                    </div>
                </main>

                <ConfirmationModal
                    isOpen={showLogoutModal}
                    title="CONFIRM TERMINATION"
                    message="Are you sure you want to terminate this session?"
                    onConfirm={handleLogoutConfirm}
                    onCancel={() => setShowLogoutModal(false)}
                />
            </div>
        </div>
    );
};

export default Home;