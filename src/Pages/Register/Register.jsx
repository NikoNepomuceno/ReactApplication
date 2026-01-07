import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("ENCRYPTION KEYS DO NOT MATCH");
        }

        if (password.length < 8) {
            return setError("KEY STRENGTH INSUFFICIENT (MIN 8 CHARS)");
        }

        setLoading(true);

        try {
            await register(name, email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "INITIALIZATION FAILED");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="register-container">
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

            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-header">
                    <span className="system-status">SYSTEM STATUS: READY</span>
                    <h2 className="register-title">INITIALIZE<span style={{ color: '#FACC15' }}>_</span></h2>
                    <p className="register-subtitle">Register your signature on the global registry.</p>
                </div>

                {error && <div className="error-message">ERROR: {error}</div>}

                <div className="form-group">
                    <label htmlFor="name">OPERATOR NAME</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="operator_01"
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>

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
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666' }}>STRENGTH: LOW</span>
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

                <div className="form-group">
                    <label htmlFor="confirmPassword">VERIFY KEY</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "[-]" : "[+]"}
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "INITIALIZING..." : "CREATE OPERATOR"}
                </button>

                <div className="visual-modules">
                    <span>&gt; REGISTERING HASH... WAIT</span>
                    <span>&gt; ENCRYPTION: AES-256</span>
                </div>

                <p className="login-link">
                    Already registered? <Link to="/" style={{ color: '#FACC15' }}>Authenticate Now</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;