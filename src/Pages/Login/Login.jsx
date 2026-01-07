import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Random coordinates for decoration
    const [coords, setCoords] = useState({ lat: '00.0000', lng: '00.0000' });

    useEffect(() => {
        const interval = setInterval(() => {
            setCoords({
                lat: (Math.random() * 90).toFixed(4),
                lng: (Math.random() * 180).toFixed(4)
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const { login } = useAuth();
    const { success, error: toastError } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            success('ACCESS GRANTED_');
            navigate('/home');
        } catch (error) {
            setError(error.response?.data?.message || 'AUTHENTICATION FAILED');
            // toastError shows below, we can skip if we show inline
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Background Decorations */}
            <div className="wireframe-cube"></div>

            <div className="corner-text top-left">
                <div>LOCATION: CLASSIFIED</div>
                <div>LAT: {coords.lat} N</div>
                <div>LNG: {coords.lng} W</div>
                <div className="security-warning">SECURITY_LEVEL: OMEGA</div>
            </div>

            <div className="corner-text bottom-right">
                <div>SYSTEM_UPTIME: 99.9%</div>
                <div>VERSION: 4.0.2-BETA</div>
                <div>BUILD_SIG: 0x9928AF</div>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <span className="system-status">SYSTEM STATUS: READY</span>
                    <h2 className="login-title">AUTHENTICATE<span style={{ color: '#FACC15' }}>_</span></h2>
                    <p className="login-subtitle">Enter credentials to access the central node.</p>
                </div>

                {error && <div className="error-message">ERROR: {error}</div>}

                <div className="form-group">
                    <label htmlFor="email">ID ADDRESS</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@nexus.io"
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label htmlFor="password">ENCRYPTION KEY</label>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666' }}>LOST KEY?</span>
                    </div>

                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "[-]" : "[+]"}
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'PROCESSING...' : 'GRANT ACCESS'}
                </button>

                <div className="visual-modules">
                    <span>&gt; ANALYZING PACKETS... OK</span>
                    <span>&gt; NO INTRUSION DETECTED</span>
                </div>

                <p className="register-link">
                    New operative? <Link to="/register" style={{ color: '#FACC15' }}>Initialize Profile</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;