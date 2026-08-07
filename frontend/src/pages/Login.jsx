import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, clearError, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="glass-container">
            <h2 className="title">Welcome Back</h2>
            <p className="subtitle">Enter your credentials to access your account</p>
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
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
                        placeholder="••••••••" 
                        required 
                    />
                </div>
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? <span className="loader"></span> : 'Log In'}
                </button>
            </form>
            
            <p className="link-text">
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
