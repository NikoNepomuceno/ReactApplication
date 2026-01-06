import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if(password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (password.length < 8) {
            return setError('Password must be at least 8 characters');
        }
        
        setLoading(true);

        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response ?.data ?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text"
                    id="name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Min. 8 Characters"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>

                    <input 
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your password"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <p className="login-link">
                    Already have an account? <Link to="/">Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;