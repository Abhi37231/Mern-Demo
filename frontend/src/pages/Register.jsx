import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, error, clearError, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(name, email, password);
        if (success) {
            navigate('/verify-otp', { state: { email } });
        }
    };

    return (
        <div className="glass-container">
            <h2 className="title">Create Account</h2>
            <p className="subtitle">Join us to experience the future</p>
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="John Doe" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="you@example.com" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Create a password" 
                        required 
                        minLength={6}
                    />
                </div>
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? <span className="loader"></span> : 'Sign Up'}
                </button>
            </form>
            
            <p className="link-text">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
};

export default Register;
